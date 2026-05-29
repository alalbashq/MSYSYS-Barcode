# Copyright (c) 2025, Albashq Alshwmy and contributors
# For license information, please see license.txt

from __future__ import annotations

import json

import frappe
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


class BarcodeTemplate(Document):
	def validate(self):
		# basic sanity for schema JSON
		try:
			data = json.loads(self.schema or "{}")
			assert isinstance(data, dict)
			assert isinstance(data.get("elements", []), list)
		except Exception as e:
			frappe.throw(f"Invalid schema JSON: {e}")

		self._validate_design_fields()

	def _validate_design_fields(self):
		rows = list(self.get("design_fields") or [])
		if not rows:
			return

		if not self.source_doctype:
			frappe.throw("Source DocType is required when Design Fields are configured.")

		meta = frappe.get_meta(self.source_doctype)
		root_fields = {
			df.fieldname: df
			for df in meta.fields
			if df.fieldtype in BARCODE_ALLOWED_FIELD_TYPES
		}
		child_tables = {
			df.fieldname: df
			for df in meta.fields
			if df.fieldtype == "Table" and df.options
		}

		for row in rows:
			row.scope = row.scope or "Document"
			if row.scope == "Document":
				df = root_fields.get(row.fieldname)
				if not df:
					frappe.throw(f"Field '{row.fieldname}' is not available in DocType '{self.source_doctype}'.")
				row.label = row.label or df.label or df.fieldname
				row.fieldtype = row.fieldtype or df.fieldtype
				row.bind_path = row.bind_path or df.fieldname
				row.parent_fieldname = ""
				row.child_doctype = ""
				continue

			if not row.parent_fieldname:
				frappe.throw("Child Table is required for child-scope design fields.")

			table_df = child_tables.get(row.parent_fieldname)
			if not table_df:
				frappe.throw(
					f"Child Table '{row.parent_fieldname}' is not available in DocType '{self.source_doctype}'."
				)

			child_meta = frappe.get_meta(table_df.options)
			child_fields = {
				df.fieldname: df
				for df in child_meta.fields
				if df.fieldtype in BARCODE_ALLOWED_FIELD_TYPES
			}
			df = child_fields.get(row.fieldname)
			if not df:
				frappe.throw(
					f"Field '{row.fieldname}' is not available in Child Table '{table_df.options}'."
				)

			row.label = row.label or df.label or df.fieldname
			row.fieldtype = row.fieldtype or df.fieldtype
			row.bind_path = row.bind_path or f"{row.parent_fieldname}[].{df.fieldname}"
			row.child_doctype = table_df.options
