from __future__ import annotations

import json

import frappe


def mm_to_dots(mm: float, dpi: int) -> int:
	return int(round((mm / 25.4) * dpi))


def render_zpl(bt, ctx: dict, copies: int = 1) -> str:
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

	pw = mm_to_dots(bt.width_mm, bt.dpi)
	ll = mm_to_dots(bt.height_mm, bt.dpi)

	out = []
	for _ in range(int(copies or 1)):
		z = ["^XA", f"^PW{pw}", f"^LL{ll}"]
		for el in elements:
			x = mm_to_dots(el.get("x", 0), bt.dpi)
			y = mm_to_dots(el.get("y", 0), bt.dpi)
			if el.get("type") == "barcode":
				h = mm_to_dots(el.get("h", 16), bt.dpi)
				z += [f"^FO{x},{y}", "^BY2", f"^BCN,{h},Y,N,N", f"^FD{el.get('value', '')}^FS"]
			elif el.get("type") == "text":
				fs_pt = int(el.get("font_size", 9))
				# A0 ~ roughly 9pt ≈ 18 dots at 203dpi → scale approx 2*dots/pt
				dots = int(fs_pt * 2)
				z += [f"^FO{x},{y}", f"^A0N,{dots},{dots}", f"^FD{el.get('text_value', '')}^FS"]
		z += ["^XZ"]
		out.append("\n".join(z))
	return "\n".join(out)
