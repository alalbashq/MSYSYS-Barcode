frappe.ui.form.on('Item', {
  refresh(frm) {
    frm.add_custom_button(__('Barcode Studio'), () => {
      const ctx = JSON.parse(JSON.stringify(frm.doc || {}));
      frappe.route_options = { ctx };
      frappe.set_route('barcode-studio', frm.doctype, frm.doc.name);
    }, __('Barcode'));
  }
});
