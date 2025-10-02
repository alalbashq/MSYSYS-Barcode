from __future__ import annotations

import json

import frappe
from frappe import _
from frappe.utils.safe_exec import safe_eval

from .zpl.render import render_zpl


@frappe.whitelist()
def preview_template(template: str) -> dict:
	doc = frappe.get_doc("Barcode Template", template)
	ctx = _load_ctx(doc.sample_context) or {"doc": {"item_code": "ABC123", "item_name": "Sample"}}
	html = _render_html(doc, ctx)
	return {"html": html}


@frappe.whitelist()
def preview_with_doc(template: str, doctype: str, name: str) -> dict:
	doc = frappe.get_doc("Barcode Template", template)
	src = frappe.get_doc(doctype, name)
	ctx = {"doc": src.as_dict()}
	html = _render_html(doc, ctx)
	return {"html": html}


@frappe.whitelist()
def print_from_doc(doctype: str, name: str, template: str, copies: int = 1) -> dict:
	bt = frappe.get_doc("Barcode Template", template)
	src = frappe.get_doc(doctype, name)
	ctx = {"doc": src.as_dict()}

	if (bt.output_type or "HTML") == "HTML":
		html = _render_html(bt, ctx, copies=copies)
		return {"mode": "HTML", "html": html}
	else:
		zpl = render_zpl(bt, ctx, copies=copies)
		return {"mode": "ZPL", "zpl": zpl}


# ------------------------- helpers -------------------------


def _load_ctx(raw: str | None):
	if not raw:
		return None
	try:
		return json.loads(raw)
	except Exception:
		return None


HTML_BASE = """
<html><head>
<meta charset='utf-8'>
<style>
  @page { size: {W}mm {H}mm; margin: 0; }
  body { margin: 0; }
  .label { width: {W}mm; height: {H}mm; position: relative; overflow: hidden; }
  .el { position: absolute; }
  .txt { font-family: Arial, sans-serif; white-space: nowrap; }
  svg { position:absolute; }
</style>
</head><body>
{BODY}
<script>/* JsBarcode is loaded via hooks */</script>
<script>
(function(){
  const payload = {payload};
  (payload.elements||[]).forEach((el,i)=>{
    if(el.type==='barcode'){
      const id = 'bc_'+i;
      const s = document.getElementById(id);
      if (window.JsBarcode) {
        try {
          JsBarcode(s, el.value, {
            format: el.symbology || 'code128',
            width: el.bar_width || 2,
            height: el.bar_height || 40,
            displayValue: !!el.text,
            fontSize: el.text_size || 10
          });
        } catch(e){ console.error('JsBarcode', e); }
      }
    }
  });
})();
</script>
</body></html>
"""

# Render HTML using simple schema fields
# schema example: {"elements": [{"type":"barcode","x":4,"y":6,"w":38,"h":16,"symbology":"code128","value_expr":"{{ doc.item_code }}","text":true,"text_size":8},{"type":"text","x":4,"y":22,"text_expr":"{{ doc.item_name }}","font_size":9}]}


def _render_html(bt, ctx: dict, copies: int = 1) -> str:
	try:
		schema = json.loads(bt.schema)
	except Exception:
		schema = {"elements": []}

	# resolve expressions → values
	elements = []
	for el in schema.get("elements", []):
		el = dict(el)
		if el.get("value_expr"):
			el["value"] = frappe.render_template(el["value_expr"], ctx)
		if el.get("text_expr"):
			el["text_value"] = frappe.render_template(el["text_expr"], ctx)
		elements.append(el)

	# build labels
	label_div = []
	for _ in range(int(copies or 1)):
		parts = [f"<div class='label' style='width:{bt.width_mm}mm;height:{bt.height_mm}mm'>"]
		for i, el in enumerate(elements):
			x = el.get("x", 0)
			y = el.get("y", 0)
			w = el.get("w", 30)
			h = el.get("h", 10)
			if el.get("type") == "barcode":
				parts.append(
					f"<svg id='bc_{i}' class='el' style='left:{x}mm;top:{y}mm;width:{w}mm;height:{h}mm'></svg>"
				)
			elif el.get("type") == "text":
				txt = el.get("text_value", "")
				fs = el.get("font_size", 9)
				parts.append(
					f"<div class='el txt' style='left:{x}mm;top:{y}mm;font-size:{fs}pt'>{frappe.utils.escape_html(txt)}</div>"
				)
		parts.append("</div>")
		label_div.append("".join(parts))

	body = "".join(label_div)
	payload = json.dumps({"elements": elements})
	return (
		HTML_BASE.replace("{W}", str(bt.width_mm))
		.replace("{H}", str(bt.height_mm))
		.replace("{BODY}", body)
		.replace("{payload}", payload)
	)


from frappe.model.meta import get_meta


@frappe.whitelist()
def get_meta_fields(doctype: str, force: bool = False) -> list[dict]:
	"""أرجع قائمة مختصرة من الحقول القابلة للربط (binding) من الـ DocType."""
	meta = get_meta(doctype)
	out = []
	for df in meta.fields:
		if df.fieldtype in (
			"Data",
			"Small Text",
			"Long Text",
			"Select",
			"Link",
			"Dynamic Link",
			"Int",
			"Float",
			"Currency",
			"Percent",
			"Date",
			"Datetime",
			"Time",
			"Text Editor",
			"Read Only",
			"Barcode",
		):
			out.append(
				{
					"label": df.label,
					"fieldname": df.fieldname,
					"fieldtype": df.fieldtype,
				}
			)
	# أضف الحقول الأساسية دائمًا
	out.extend(
		[
			{"label": "Name", "fieldname": "name", "fieldtype": "Data"},
			{"label": "Item Code", "fieldname": "item_code", "fieldtype": "Data"},
			{"label": "Item Name", "fieldname": "item_name", "fieldtype": "Data"},
		]
	)
	# إزالة التكرار بالحقل
	seen = set()
	uniq = []
	for f in out:
		if f["fieldname"] in seen:
			continue
		seen.add(f["fieldname"])
		uniq.append(f)
	return uniq


@frappe.whitelist()
def get_template_schema(template: str) -> dict:
	bt = frappe.get_doc("Barcode Template", template)
	import json as _json

	try:
		schema = _json.loads(bt.schema or "{}")
	except Exception:
		schema = {"elements": []}
	return {
		"schema": schema,
		"meta": {
			"width_mm": bt.width_mm,
			"height_mm": bt.height_mm,
			"dpi": bt.dpi,
			"output_type": bt.output_type,
		},
	}


@frappe.whitelist()
def preview_runtime(doctype: str, name: str, template: str, bindings: dict | None = None) -> dict:
	bt = frappe.get_doc("Barcode Template", template)
	src = frappe.get_doc(doctype, name).as_dict()
	schema = _apply_bindings(bt, src, bindings or {})

	# نصنع نسخة مؤقتة دون حفظ: نحقن schema المعدّل ثم نستخدم نفس رندر HTML
	class _Tmp:
		pass

	tmp = _Tmp()
	tmp.width_mm = bt.width_mm
	tmp.height_mm = bt.height_mm
	tmp.dpi = bt.dpi
	import json as _json

	tmp.schema = _json.dumps(schema)
	html = _render_html(tmp, {"doc": src}, copies=1)
	return {"html": html}


@frappe.whitelist()
def print_runtime(
	doctype: str, name: str, template: str, bindings: dict | None = None, copies: int = 1
) -> dict:
	bt = frappe.get_doc("Barcode Template", template)
	src = frappe.get_doc(doctype, name).as_dict()
	schema = _apply_bindings(bt, src, bindings or {})

	class _Tmp:
		pass

	tmp = _Tmp()
	tmp.width_mm = bt.width_mm
	tmp.height_mm = bt.height_mm
	tmp.dpi = bt.dpi
	tmp.output_type = bt.output_type
	import json as _json

	tmp.schema = _json.dumps(schema)

	if (bt.output_type or "HTML") == "HTML":
		html = _render_html(tmp, {"doc": src}, copies=copies)
		return {"mode": "HTML", "html": html}
	else:
		zpl = render_zpl(tmp, {"doc": src}, copies=copies)
		return {"mode": "ZPL", "zpl": zpl}


# ---------------- helpers ----------------


def _apply_bindings(bt, src: dict, bindings: dict) -> dict:
	"""يعدّل schema بحيث يملأ عناصره مباشرة من الحقول المختارة.
	bindings: { index(str|int): fieldname }
	"""
	import json as _json

	try:
		schema = _json.loads(bt.schema or "{}")
	except Exception:
		schema = {"elements": []}

	els = list(schema.get("elements", []))
	for k, fieldname in (bindings or {}).items():
		try:
			idx = int(k)
		except Exception:
			continue
		if idx < 0 or idx >= len(els):
			continue
		val = src.get(fieldname)
		el = dict(els[idx])
		if el.get("type") == "barcode":
			el["value"] = frappe.utils.cstr(val)
			# تعطيل value_expr مؤقتًا
			el.pop("value_expr", None)
		elif el.get("type") == "text":
			el["text_value"] = frappe.utils.cstr(val)
			el.pop("text_expr", None)
		els[idx] = el
	schema["elements"] = els
	return schema
