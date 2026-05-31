from __future__ import annotations

import json

import frappe
from frappe import _
from frappe.utils import cint, cstr
from frappe.utils.safe_exec import safe_eval

from ..zpl.render import render_zpl


BARCODE_FIELD_TYPES = {
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
	"Read Only",
	"Barcode",
	"Text Editor",
}


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


STANDARD_BARCODE_FIELDS = {
	"name": {
		"label": "Name",
		"fieldname": "name",
		"fieldtype": "Data",
		"options": "",
	}
}


@frappe.whitelist()
def get_meta_fields(doctype: str, force: bool = False) -> list[dict]:
	"""أرجع قائمة مختصرة من الحقول القابلة للربط (binding) من الـ DocType."""
	meta = get_meta(doctype)
	out = []
	for df in meta.fields:
		if df.fieldtype in BARCODE_FIELD_TYPES:
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
def get_doc_field_catalog(doctype: str) -> dict:
	"""ترجع الحقول الجذرية وحقول child tables مع المسار البرمجي الجاهز للرندر."""
	meta = get_meta(doctype)

	def build_field(df, path, scope, parent_fieldname="", child_doctype=""):
		return {
			"label": df.label or df.fieldname,
			"fieldname": df.fieldname,
			"fieldtype": df.fieldtype,
			"path": path,
			"scope": scope,
			"parent_fieldname": parent_fieldname,
			"child_doctype": child_doctype,
		}

	root_fields: list[dict] = []
	child_tables: list[dict] = []

	for df in meta.fields:
		if df.fieldtype in BARCODE_FIELD_TYPES:
			root_fields.append(build_field(df, df.fieldname, "Document"))
			continue

		if df.fieldtype != "Table" or not df.options:
			continue

		try:
			child_meta = get_meta(df.options)
		except Exception:
			continue

		child_fields: list[dict] = []
		for child_df in child_meta.fields:
			if child_df.fieldtype not in BARCODE_FIELD_TYPES:
				continue
			child_fields.append(
				build_field(
					child_df,
					f"{df.fieldname}[].{child_df.fieldname}",
					"Child Table",
					parent_fieldname=df.fieldname,
					child_doctype=df.options,
				)
			)

		child_tables.append(
			{
				"label": df.label or df.fieldname,
				"fieldname": df.fieldname,
				"child_doctype": df.options,
				"fields": child_fields,
			}
		)

	if not any(field["fieldname"] == "name" for field in root_fields):
		root_fields.insert(
			0,
			{
				"label": "Name",
				"fieldname": "name",
				"fieldtype": "Data",
				"path": "name",
				"scope": "Document",
				"parent_fieldname": "",
				"child_doctype": "",
			},
		)

	return {
		"doctype": doctype,
		"root_fields": root_fields,
		"child_tables": child_tables,
	}


@frappe.whitelist()
def get_barcode_doctype_config(target_doctype: str, barcode_doctype: str | None = None) -> dict:
	"""Return the active Barcode DocType configuration for a target DocType."""
	config = _get_barcode_doctype_doc(target_doctype, barcode_doctype)
	return _serialize_barcode_doctype_config(config)


@frappe.whitelist()
def prepare_barcode_route_options(
	doctype: str,
	name: str,
	template: str | None = None,
	barcode_doctype: str | None = None,
	child_table_field: str | None = None,
	child_row_name: str | None = None,
) -> dict:
	"""Build flat route options for Barcode Studio.

	Barcode Studio renders only with render_data[binding_key]. This function is
	the boundary that may read the ERPNext document and child-table rows.
	"""
	if not doctype or not frappe.db.exists("DocType", doctype):
		frappe.throw(_("DocType {0} does not exist.").format(frappe.bold(doctype)))

	doc = frappe.get_doc(doctype, name)
	if not frappe.has_permission(doctype, "read", doc=doc):
		frappe.throw(_("Not permitted"), frappe.PermissionError)

	return _build_barcode_route_options(
		doc,
		doctype=doctype,
		name=name,
		template=template,
		barcode_doctype=barcode_doctype,
		child_table_field=child_table_field,
		child_row_name=child_row_name,
	)


def _build_barcode_route_options(
	doc,
	doctype: str,
	name: str,
	template: str | None = None,
	barcode_doctype: str | None = None,
	child_table_field: str | None = None,
	child_row_name: str | None = None,
) -> dict:
	config = _get_barcode_doctype_doc(doctype, barcode_doctype)
	fields = _get_allowed_barcode_fields(config, include_hidden=False)
	render_data = {}

	for row in fields:
		key = row["binding_key"]
		value = None
		if row["source_level"] == "Child Table":
			value = _get_child_value(
				doc,
				row["child_table_field"],
				row["fieldname"],
				child_row_name if row["child_table_field"] == child_table_field else None,
			)
		else:
			value = _get_document_value(doc, row["fieldname"])
		render_data[key] = _format_route_value(value)

	return {
		"doctype": doctype,
		"name": name,
		"template": template,
		"barcode_doctype": config.name,
		"render_data": render_data,
	}


@frappe.whitelist()
def prepare_quick_barcode_route_options(
	parent_doctype: str,
	parent_name: str,
	child_field: str,
	child_row_name: str,
	template: str | None = None,
	target_doctype: str | None = None,
	barcode_doctype: str | None = None,
) -> dict:
	"""Build route options for a single Quick Barcode Print child row.

	If the selected template was designed for Item, values are still taken from
	the invoice row first, then from the Item document. This lets a reusable Item
	template print invoice-specific values such as row rate and qty.
	"""
	if not parent_doctype or not frappe.db.exists("DocType", parent_doctype):
		frappe.throw(_("DocType {0} does not exist.").format(frappe.bold(parent_doctype)))

	parent_doc = frappe.get_doc(parent_doctype, parent_name)
	if not frappe.has_permission(parent_doctype, "read", doc=parent_doc):
		frappe.throw(_("Not permitted"), frappe.PermissionError)

	child_row = _get_child_row(parent_doc, child_field, child_row_name)
	template_source_doctype = _get_template_source_doctype(template)
	resolved_target = target_doctype or template_source_doctype or ("Item" if child_row.get("item_code") else parent_doctype)

	if resolved_target == parent_doctype:
		out = _build_barcode_route_options(
			parent_doc,
			doctype=parent_doctype,
			name=parent_name,
			template=template,
			barcode_doctype=barcode_doctype,
			child_table_field=child_field,
			child_row_name=child_row_name,
		)
	else:
		out = _build_route_options_from_child_row(
			child_row=child_row,
			target_doctype=resolved_target,
			template=template,
			barcode_doctype=barcode_doctype,
		)

	out.update(
		{
			"parent_doctype": parent_doctype,
			"parent_name": parent_name,
			"child_field": child_field,
			"child_row_name": child_row_name,
		}
	)
	return out


def _get_barcode_doctype_doc(target_doctype: str, barcode_doctype: str | None = None):
	if not target_doctype:
		frappe.throw(_("Target DocType is required."))

	if barcode_doctype:
		config = frappe.get_doc("Barcode DocType", barcode_doctype)
		if config.target_doctype != target_doctype:
			frappe.throw(
				_("Barcode DocType {0} is configured for {1}, not {2}.").format(
					frappe.bold(barcode_doctype), frappe.bold(config.target_doctype), frappe.bold(target_doctype)
				)
			)
		if not config.enabled:
			frappe.throw(_("Barcode DocType {0} is disabled.").format(frappe.bold(barcode_doctype)))
		return config

	matches = frappe.get_all(
		"Barcode DocType",
		filters={"target_doctype": target_doctype, "enabled": 1},
		fields=["name"],
		order_by="modified desc",
		limit_page_length=1,
	)
	if not matches:
		frappe.throw(
			_("No Barcode DocType configuration found for this DocType. Please create one first."),
			frappe.DoesNotExistError,
		)
	return frappe.get_doc("Barcode DocType", matches[0].name)


def _serialize_barcode_doctype_config(config) -> dict:
	return {
		"name": config.name,
		"title": config.title,
		"target_doctype": config.target_doctype,
		"fields": _get_allowed_barcode_fields(config, include_hidden=False),
	}


def _get_allowed_barcode_fields(config, include_hidden: bool = False) -> list[dict]:
	fields = []
	for row in sorted(config.get("fields") or [], key=lambda item: item.idx or 0):
		if row.hidden and not include_hidden:
			continue
		binding_key = row.binding_key or _derive_binding_key(row)
		if not binding_key:
			continue
		fields.append(
			{
				"label": row.label or row.fieldname or binding_key,
				"fieldname": row.fieldname,
				"binding_key": binding_key,
				"source_level": row.source_level or "Document",
				"child_table_field": row.child_table_field or None,
				"child_doctype": row.child_doctype or None,
				"fieldtype": row.fieldtype or "Data",
				"options": row.options or "",
				"sample_value": row.sample_value or "",
				"idx": row.idx,
			}
		)
	return fields


def _derive_binding_key(row) -> str:
	if (row.source_level or "Document") == "Child Table":
		if row.child_table_field and row.fieldname:
			return f"{row.child_table_field}_{row.fieldname}"
		return ""
	return row.fieldname or ""


def _get_document_value(doc, fieldname: str):
	if fieldname == "name":
		return doc.name
	return doc.get(fieldname)


def _get_first_child_value(doc, child_table_field: str | None, fieldname: str):
	return _get_child_value(doc, child_table_field, fieldname)


def _get_child_value(doc, child_table_field: str | None, fieldname: str, child_row_name: str | None = None):
	if not child_table_field:
		return None
	rows = doc.get(child_table_field) or []
	if not rows:
		return None
	first = _find_child_row(rows, child_row_name) if child_row_name else rows[0]
	if not first:
		return None
	if fieldname == "name":
		return first.name
	return first.get(fieldname)


def _find_child_row(rows, child_row_name: str | None):
	if not child_row_name:
		return None
	for row in rows or []:
		if row.name == child_row_name:
			return row
	return None


def _get_child_row(parent_doc, child_field: str | None, child_row_name: str | None):
	if not child_field:
		frappe.throw(_("Child Table is required."))
	rows = parent_doc.get(child_field) or []
	row = _find_child_row(rows, child_row_name)
	if not row:
		frappe.throw(
			_("Row {0} was not found in {1}.").format(frappe.bold(child_row_name or ""), frappe.bold(child_field))
		)
	return row


def _get_template_source_doctype(template: str | None) -> str | None:
	if not template:
		return None
	if not frappe.db.exists("Barcode Template", template):
		return None
	return frappe.db.get_value("Barcode Template", template, "source_doctype") or None


def _build_route_options_from_child_row(
	child_row,
	target_doctype: str,
	template: str | None = None,
	barcode_doctype: str | None = None,
) -> dict:
	source_doc = None
	source_name = None

	if target_doctype == child_row.doctype:
		source_doc = child_row
		source_name = child_row.name
	elif target_doctype == "Item" and child_row.get("item_code"):
		source_name = child_row.get("item_code")
		if frappe.db.exists("Item", source_name):
			source_doc = frappe.get_doc("Item", source_name)
			if not frappe.has_permission("Item", "read", doc=source_doc):
				frappe.throw(_("Not permitted"), frappe.PermissionError)
	else:
		frappe.throw(
			_("Cannot prepare barcode data for {0} from row {1}.").format(
				frappe.bold(target_doctype), frappe.bold(child_row.name)
			)
		)

	config = _get_barcode_doctype_doc(target_doctype, barcode_doctype)
	fields = _get_allowed_barcode_fields(config, include_hidden=False)
	render_data = {}

	for row in fields:
		key = row["binding_key"]
		if row["source_level"] == "Child Table":
			value = _get_qbp_child_value(child_row, source_doc, row)
		else:
			value = _get_qbp_document_value(child_row, source_doc, row["fieldname"])

		if not value and _is_barcode_binding(row):
			value = _get_row_barcode_value(child_row, source_doc)

		render_data[key] = _format_route_value(value)

	return {
		"doctype": target_doctype,
		"name": source_name or child_row.name,
		"template": template,
		"barcode_doctype": config.name,
		"render_data": render_data,
	}


def _get_qbp_document_value(child_row, source_doc, fieldname: str):
	if fieldname == "name":
		return source_doc.name if source_doc else child_row.name

	if fieldname == "standard_rate":
		row_rate = child_row.get("rate")
		if row_rate not in (None, ""):
			return row_rate

	row_value = child_row.get(fieldname)
	if row_value not in (None, ""):
		return row_value

	if source_doc:
		return source_doc.get(fieldname)
	return None


def _get_qbp_child_value(child_row, source_doc, config_row: dict):
	if _is_barcode_binding(config_row):
		value = _get_row_barcode_value(child_row, source_doc, fallback_to_item_code=False)
		if value:
			return value

	if source_doc:
		return _get_first_child_value(source_doc, config_row["child_table_field"], config_row["fieldname"])
	return None


def _is_barcode_binding(config_row: dict) -> bool:
	fieldname = cstr(config_row.get("fieldname")).lower()
	binding_key = cstr(config_row.get("binding_key")).lower()
	label = cstr(config_row.get("label")).lower()
	return (
		fieldname == "barcode"
		or label == "barcode"
		or binding_key == "barcode"
		or binding_key.endswith("_barcode")
	)


def _get_row_barcode_value(child_row, source_doc=None, fallback_to_item_code: bool = True):
	value = child_row.get("barcode")
	if value:
		return value

	if source_doc:
		for row in source_doc.get("barcodes") or []:
			if row.get("barcode"):
				return row.get("barcode")

	if fallback_to_item_code:
		return child_row.get("item_code") or (source_doc.name if source_doc else None)
	return None


def _format_route_value(value) -> str:
	if value is None:
		return ""
	return cstr(value)


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


@frappe.whitelist()
def qbp_boot(doctype, name):
	"""يرجّع doc + items + child_field + templates + default page size"""
	doc = frappe.get_doc(doctype, name).as_dict()
	# التعرّف على جدول الأصناف
	child_field = None
	for df in frappe.get_meta(doctype).get("fields", {}):
		if df.fieldtype == "Table" and (
			df.options in ("Sales Invoice Item", "Purchase Invoice Item", "Delivery Note Item")
			or "Item" in (df.options or "")
		):
			child_field = df.fieldname
			break
	if not child_field:
		# fallback: أول جدول
		for df in frappe.get_meta(doctype).get("fields", {}):
			if df.fieldtype == "Table":
				child_field = df.fieldname
				break

	items = list(doc.get(child_field, [])) if child_field else []
	# قوالب الباركود
	templates = frappe.get_all("Barcode Template", fields=["name"], limit_page_length=200)

	# يمكن لاحقاً قراءة الحجم الافتراضي من إعداداتك
	width_mm = cint(frappe.db.get_single_value("Print Barcode Settings", "barcode_width_mm") or 50)
	height_mm = cint(frappe.db.get_single_value("Print Barcode Settings", "barcode_height_mm") or 30)

	return {
		"doc": doc,
		"items": items,
		"child_field": child_field or "items",
		"templates": templates,
		"width_mm": width_mm,
		"height_mm": height_mm,
	}


@frappe.whitelist()
def qbp_templates():
	return frappe.get_all("Barcode Template", fields=["name"], limit_page_length=200)


@frappe.whitelist()
def record_barcode_print(
	parent_doctype, parent_name, child_field=None, child_row_names=None, copies=1, template_name=None, printer_mode="HTML"
):
	import json

	if isinstance(child_row_names, str):
		try:
			child_row_names = json.loads(child_row_names)
		except Exception:
			child_row_names = [child_row_names]
	if not isinstance(child_row_names, (list, tuple)):
		child_row_names = []

	copies = int(copies or 1)

	for cdn in child_row_names or []:
		frappe.get_doc(
			{
				"doctype": "Barcode Print Log",
				"parent_doctype": parent_doctype,
				"parent_name": parent_name,
				"child_field": child_field,
				"child_row_name": cdn,
				"copies": copies,
				"template_name": template_name,
				"printer_mode": printer_mode,
				"printed_by": frappe.session.user,
			}
		).insert(ignore_permissions=True)

	from frappe.utils import now_datetime

	frappe.publish_realtime(
		event="barcode_printed",
		message={
			"parent_doctype": parent_doctype,
			"parent_name": parent_name,
			"child_field": child_field,
			"rows": child_row_names or [],
			"copies": copies,
			"template_name": template_name,
			"printer_mode": printer_mode,
			"printed_on": now_datetime().strftime("%Y-%m-%d %H:%M:%S"),
		},
		doctype=parent_doctype,
		docname=parent_name,
		after_commit=True,
	)
	return {"ok": True}


@frappe.whitelist()
def qbp_template_info(name):
	"""إرجاع إعدادات القالب لواجهة الطباعة السريعة"""
	doc = frappe.get_doc("Barcode Template", name)
	return {
		"name": doc.name,
		"source_doctype": doc.source_doctype,
		"page_width_mm": doc.page_width_mm,
		"page_height_mm": doc.page_height_mm,
		"layout_json": doc.layout_json or "[]",
	}


from typing import Dict, List


@frappe.whitelist()
def qbp_rows_extra(
	parent_doctype: str, parent_name: str, child_field: str, row_names_json: str
) -> dict[str, dict]:
	"""
	ترجع بيانات إضافية لكل صف (بالمفتاح: اسم الصف).
	- استدعِها من QBP بتمرير أسماء صفوف الجدول الفرعي.
	- عدّل الاستعلام/الدمج حسب احتياجك.

	return: { "<rowname>": { "brand": "...", "group": "...", "alt_barcode": "...", ... }, ... }
	"""
	import json

	try:
		row_names = json.loads(row_names_json) or []
	except Exception:
		row_names = []

	if not row_names:
		return {}

	# احضر صفوف الجدول الفرعي (مثلاً Sales Invoice Item) لأخذ item_code وربطها بمعلومات إضافية
	# نجيب بالداتا فريم المعتاد (frappe.db.sql) مع باراميترز لتأمين الاستعلام.
	# NOTE: عدّل أسماء الدوال/الجداول حسب دكتورك.
	parent_doc = frappe.get_doc(parent_doctype, parent_name)
	child_dt = None
	for df in parent_doc.meta.get("fields", []):
		if df.fieldtype == "Table" and df.fieldname == child_field:
			child_dt = df.options
			break
	if not child_dt:
		return {}

	# اقرأ الصفوف المطلوبة فقط
	rows = frappe.db.sql(
		f"""
        SELECT name, item_code
        FROM `tab{child_dt}`
        WHERE parent = %(parent_name)s AND name IN %(names)s
        """,
		{"names": tuple(row_names), "parent_name": parent_name},
		as_dict=True,
	)

	# حضّر set من الاكواد للـ JOIN التالي
	item_codes = tuple({r["item_code"] for r in rows if r.get("item_code")})
	extras: dict[str, dict] = {r["name"]: {} for r in rows}

	if item_codes:
		# أمثلة على حقول إضافية من Item (عدّلها كما تحب)
		# - brand, item_group
		# - رمز بديل من جدول Item Barcode (نأخذ أول Barcode مثلاً)
		item_meta = frappe.db.sql(
			"""
            SELECT i.item_code, i.brand, i.item_group
            FROM `tabItem` i
            WHERE i.item_code IN %(ics)s
            """,
			{"ics": item_codes},
			as_dict=True,
		)
		brand_by_code = {
			d["item_code"]: {"brand": d.get("brand"), "item_group": d.get("item_group")} for d in item_meta
		}

		# خذ أول باركود لو موجود
		item_barcodes = frappe.db.sql(
			"""
            SELECT ib.parent AS item_code, ib.barcode
            FROM `tabItem Barcode` ib
            WHERE ib.parent IN %(ics)s
            ORDER BY ib.idx ASC
            """,
			{"ics": item_codes},
			as_dict=True,
		)
		altbc_by_code = {}
		for rec in item_barcodes:
			# أول باركود فقط (غيّره لو تبغى تجمع الكل)
			altbc_by_code.setdefault(rec["item_code"], rec["barcode"])

		# املأ extras لكل صف
		for r in rows:
			ic = r.get("item_code")
			if not ic:
				continue
			e = extras.get(r["name"], {})
			base = brand_by_code.get(ic, {})
			if base:
				e.update(base)  # brand, item_group
			alt = altbc_by_code.get(ic)
			if alt:
				e["barcode"] = alt
				e["alt_barcode"] = alt
			extras[r["name"]] = e

	# مثال إضافي: جلب batch_no الحالي لكل صف من جدول Batch (اختياري)
	# (اتركه معلّقًا لو ما تحتاجه)
	# ...

	return extras
