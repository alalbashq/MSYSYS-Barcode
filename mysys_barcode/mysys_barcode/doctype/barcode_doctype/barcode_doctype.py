from __future__ import annotations

import frappe
from frappe import _
from frappe.model.document import Document


BARCODE_ALLOWED_FIELD_TYPES = {
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

STANDARD_BARCODE_FIELDS = {
	"name": {
		"label": "Name",
		"fieldname": "name",
		"fieldtype": "Data",
		"options": "",
	}
}


class BarcodeDocType(Document):
	def validate(self):
		self._validate_target_doctype()
		self._normalize_allowed_fields()

	def _validate_target_doctype(self):
		if not self.target_doctype:
			frappe.throw(_("Target DocType is required."))
		if not frappe.db.exists("DocType", self.target_doctype):
			frappe.throw(_("Target DocType {0} does not exist.").format(frappe.bold(self.target_doctype)))

	def _normalize_allowed_fields(self):
		seen: set[str] = set()

		for row in self.get("fields") or []:
			row.source_level = row.source_level or "Document"
			if row.source_level not in {"Document", "Child Table"}:
				frappe.throw(_("Invalid Source Level in row {0}.").format(row.idx))

			if row.source_level == "Document":
				field = self._get_bindable_field(self.target_doctype, row.fieldname)
				row.child_table_field = ""
				row.child_doctype = ""
				row.binding_key = row.fieldname
			else:
				if not row.child_table_field:
					frappe.throw(_("Child Table is required in row {0}.").format(row.idx))

				table_df = self._get_child_table_field(row.child_table_field)
				row.child_doctype = table_df.options
				field = self._get_bindable_field(row.child_doctype, row.fieldname)
				row.binding_key = f"{row.child_table_field}_{row.fieldname}"

			row.label = row.label or field["label"] or row.fieldname
			row.fieldtype = field["fieldtype"] or ""
			row.options = field["options"] or ""

			if row.binding_key in seen:
				frappe.throw(_("Duplicate Binding Key {0} in row {1}.").format(frappe.bold(row.binding_key), row.idx))
			seen.add(row.binding_key)

	def _get_child_table_field(self, fieldname: str):
		meta = frappe.get_meta(self.target_doctype)
		for df in meta.fields:
			if df.fieldname == fieldname and df.fieldtype == "Table" and df.options:
				return df
		frappe.throw(
			_("Child Table {0} is not available in DocType {1}.").format(
				frappe.bold(fieldname), frappe.bold(self.target_doctype)
			)
		)

	def _get_bindable_field(self, doctype: str, fieldname: str) -> dict[str, str]:
		if not fieldname:
			frappe.throw(_("Field is required."))

		if fieldname in STANDARD_BARCODE_FIELDS:
			return STANDARD_BARCODE_FIELDS[fieldname]

		meta = frappe.get_meta(doctype)
		for df in meta.fields:
			if df.fieldname != fieldname:
				continue
			if df.fieldtype not in BARCODE_ALLOWED_FIELD_TYPES:
				frappe.throw(
					_("Field {0} in DocType {1} has unsupported type {2}.").format(
						frappe.bold(fieldname), frappe.bold(doctype), frappe.bold(df.fieldtype)
					)
				)
			return {
				"label": df.label or df.fieldname,
				"fieldname": df.fieldname,
				"fieldtype": df.fieldtype,
				"options": df.options or "",
			}

		frappe.throw(_("Field {0} is not available in DocType {1}.").format(frappe.bold(fieldname), frappe.bold(doctype)))
