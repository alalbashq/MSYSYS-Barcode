

import frappe
import json

@frappe.whitelist()
def get_barcode(items, groups):
    if not items: return {}
    if isinstance(items,str):
        items = json.loads(items)
    if isinstance(groups,str):
        groups = json.loads(groups)
   
    barcodes = frappe.db.get_all(
        "Item Barcode",
        filters= {"parentfield": "barcodes", "parenttype": "Item", "parent":["in",items]},
        fields = ["parent as item","barcode"])
    
    print_format_barcode = frappe.db.get_all(
        "Item Print Format Barcode",
        filters= {"parentfield": "mysys_stock_print_format_barcode", "parenttype": "Item", "parent":["in",items]},
        fields = ["print_format","parent as `item`"])
    
    print_format_item_group = frappe.db.get_all(
        "Item Print Format Barcode",
        filters= {"parentfield": "mysys_stock_print_format_barcode", "parenttype": "Item Group", "parent":["in",groups]},
        fields = ["print_format","parent as `item_group`"])
    
    data = {}
    for row in barcodes:
        data.setdefault(row.item, []).append(row)

    prints_format_barcode = {}
    for row in print_format_barcode:
        prints_format_barcode.setdefault(row.item, []).append(row)

    prints_format_item_group = {}
    for row in print_format_item_group:
        prints_format_item_group.setdefault(row.item_group, []).append(row)

    return {"data":data, "print_format":prints_format_barcode, "item_group_print_format": prints_format_item_group}

@frappe.whitelist()
def get_barcode_template(item_code, barcode, print_format):
    doc = frappe.get_doc("Item", item_code)
    doc.barcodes = []
    doc.barcodes = [{"barcode":barcode, "default_for_printing":1}]
    return frappe.render_template(frappe.db.get_value("Print Format",print_format, "html"),{"doc":doc} )
@frappe.whitelist()
def render_template_barcodes(param):
    if isinstance(param, str):
        param = json.loads(param)
    return frappe.render_template(param["html"],{"doc":param} )