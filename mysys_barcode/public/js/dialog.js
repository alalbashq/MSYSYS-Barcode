(() => {
  // Inject a global action on Item form
  frappe.ui.form.on('Item', {
    refresh(frm) {
      if (!frm.is_new()) {
        frm.add_custom_button(__('Print Barcode'), async () => {
          const templates = await frappe.db.get_list('Barcode Template', {fields:['name','template_name','output_type']});
          const d = new frappe.ui.Dialog({
            title: __('Print Barcode'),
            fields: [
              { fieldname: 'template', label: 'Template', fieldtype: 'Link', options: 'Barcode Template', reqd: 1 },
              { fieldname: 'copies', label: 'Copies', fieldtype: 'Int', default: 1 },
              { fieldname: 'preview', fieldtype: 'HTML' },
            ],
            primary_action_label: __('Print'),
            primary_action: async (values) => {
              const r = await frappe.call({
                method: 'mysys_barcode.api.print_from_doc',
                args: {
                  doctype: frm.doctype,
                  name: frm.docname,
                  template: values.template,
                  copies: values.copies || 1,
                }
              });
              const res = r.message || {};
              if (res.mode === 'HTML') {
                const w = window.open('about:blank');
                w.document.write(res.html);
                w.document.close();
                w.focus();
                w.print();
              } else if (res.mode === 'ZPL') {
                // simplest: download .zpl; integrate QZ-Tray later
                const blob = new Blob([res.zpl], {type: 'text/plain'});
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = 'labels.zpl'; a.click();
                URL.revokeObjectURL(url);
                frappe.show_alert({message: __('ZPL generated'), indicator: 'green'});
              }
              d.hide();
            }
          });

          // quick inline preview (HTML mode only)
          d.get_field('template').df.onchange = async () => {
            const tpl = d.get_value('template');
            if (!tpl) return;
            const r = await frappe.call({ method: 'mysys_barcode.api.preview_with_doc', args: { template: tpl, doctype: frm.doctype, name: frm.docname } });
            d.get_field('preview').$wrapper.html(r.message?.html || '<p>No preview</p>');
          };

          d.show();
        });
      }
    }
  });
})();