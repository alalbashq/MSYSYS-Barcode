(() => {
  function printHtmlInCurrentTab(html) {
    return new Promise((resolve) => {
      const frame = document.createElement('iframe');
      Object.assign(frame.style, {
        position: 'fixed',
        right: '0',
        bottom: '0',
        width: '0',
        height: '0',
        border: '0',
        visibility: 'hidden',
      });
      frame.setAttribute('aria-hidden', 'true');
      document.body.appendChild(frame);

      let cleaned = false;
      let didPrint = false;
      let started = false;
      let fallbackTimer = null;

      const cleanup = () => {
        if (cleaned) return;
        cleaned = true;
        if (fallbackTimer) window.clearTimeout(fallbackTimer);
        window.removeEventListener('focus', onFocus);
        try {
          frame.remove();
        } catch {
          // ignore cleanup errors
        }
        resolve();
      };

      const onFocus = () => {
        if (didPrint) window.setTimeout(cleanup, 500);
      };

      const fail = () => {
        cleanup();
        frappe.msgprint(__('Unable to open print preview.'));
      };

      const printWindow = frame.contentWindow;
      const doc = frame.contentDocument || printWindow?.document;
      if (!printWindow || !doc) {
        fail();
        return;
      }

      const startPrint = () => {
        if (started || cleaned) return;
        started = true;
        didPrint = true;
        printWindow.onafterprint = cleanup;
        window.addEventListener('focus', onFocus);
        fallbackTimer = window.setTimeout(cleanup, 120000);

        try {
          printWindow.focus();
          printWindow.print();
        } catch (error) {
          console.error('print failed', error);
          fail();
        }
      };

      const waitForAssetsThenPrint = () => {
        const images = Array.from(doc.images || []).filter((img) => !img.complete);
        if (!images.length) {
          window.setTimeout(startPrint, 50);
          return;
        }

        let pending = images.length;
        const done = () => {
          pending -= 1;
          if (pending <= 0) window.setTimeout(startPrint, 50);
        };
        for (const image of images) {
          image.addEventListener('load', done, { once: true });
          image.addEventListener('error', done, { once: true });
        }
        window.setTimeout(startPrint, 1500);
      };

      doc.open();
      doc.write(html);
      doc.close();
      window.setTimeout(waitForAssetsThenPrint, 100);
    });
  }

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
                await printHtmlInCurrentTab(res.html);
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
