# Copyright (c) 2025, Albashq Alshwmy and contributors
# For license information, please see license.txt

from __future__ import annotations

import json

import frappe
from frappe.model.document import Document


class BarcodeTemplate(Document):
	def validate(self):
		# basic sanity for schema JSON
		try:
			data = json.loads(self.schema or "{}")
			assert isinstance(data, dict)
			assert isinstance(data.get("elements", []), list)
		except Exception as e:
			frappe.throw(f"Invalid schema JSON: {e}")
