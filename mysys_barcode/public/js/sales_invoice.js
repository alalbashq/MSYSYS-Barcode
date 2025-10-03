frappe.ui.form.on('Sales Invoice', {
  refresh(frm) {
    frm.add_custom_button(__('Quick Barcode Print'), () => {
      // افتح في تبويب جديد (مستحسن)
      const url = `${frappe.urllib.get_base_url()}/app/quick-barcode-print?doc=${
        encodeURIComponent(frm.doctype)}/${encodeURIComponent(frm.doc.name)
      }`;
      window.open(url, '_blank', 'noopener');

      // لو تريده في نفس التبويب بدل السطرين أعلاه:
      // frappe.set_route('quick-barcode-print');
      // window.location.hash = `#/quick-barcode-print?doc=${encodeURIComponent(frm.doctype)}/${encodeURIComponent(frm.doc.name)}`;
    }, __('Print'));
  }
});
