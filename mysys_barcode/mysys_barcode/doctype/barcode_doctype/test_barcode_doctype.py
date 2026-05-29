import frappe
from frappe.tests.utils import FrappeTestCase


class TestBarcodeDocType(FrappeTestCase):
	def test_document_field_binding_key(self):
		doc = frappe.get_doc(
			{
				"doctype": "Barcode DocType",
				"title": "_Test Item Barcode Config",
				"target_doctype": "Item",
				"fields": [
					{
						"source_level": "Document",
						"fieldname": "item_code",
					}
				],
			}
		)
		doc.validate()

		row = doc.fields[0]
		self.assertEqual(row.binding_key, "item_code")
		self.assertEqual(row.source_level, "Document")

