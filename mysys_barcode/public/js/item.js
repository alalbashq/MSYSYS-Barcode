frappe.ui.form.on('Item', {
  refresh(frm) {
    frm.add_custom_button(__('Barcode Studio'), async () => {
      try {
        const response = await frappe.call({
          method: 'mysys_barcode.api.prepare_barcode_route_options',
          args: {
            doctype: frm.doctype,
            name: frm.doc.name,
          },
        });
        const route_options = response.message || {};
        frappe.route_options = {
          ...route_options,
          ...(route_options.render_data || {}),
        };
        frappe.set_route('barcode-studio', frm.doctype, frm.doc.name, route_options.template || '');
      } catch (error) {
        console.error('Failed to open Barcode Studio', error);
        frappe.msgprint(__('Unable to prepare Barcode Studio data.'));
      }
    }, __('Barcode'));
  }
});
