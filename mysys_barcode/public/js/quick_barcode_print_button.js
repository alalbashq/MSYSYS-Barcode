(function () {
	frappe.provide("mysys.barcode");

	mysys.barcode.has_item_rows = function (frm) {
		if (!frm?.doc) return false;

		return Object.values(frm.doc).some((value) => (
			Array.isArray(value)
			&& value.some((row) => row && row.item_code)
		));
	};

	mysys.barcode.open_quick_barcode_print = function (frm) {
		const docParam = `${encodeURIComponent(frm.doctype)}/${encodeURIComponent(frm.doc.name)}`;
		const url = `${frappe.urllib.get_base_url()}/app/quick-barcode-print?doc=${docParam}`;
		window.open(url, "_blank", "noopener");
	};

	const quick_barcode_print_doctype = frappe.get_route?.()[1]
		|| (typeof cur_frm !== "undefined" ? cur_frm?.doctype : null);

	if (quick_barcode_print_doctype) {
		frappe.ui.form.on(quick_barcode_print_doctype, {
			refresh(frm) {
				if (frm.doc.__islocal || !mysys.barcode.has_item_rows(frm)) return;

				frm.add_custom_button(
					__("Quick Barcode Print"),
					() => mysys.barcode.open_quick_barcode_print(frm),
					__("Print")
				);
			},
		});
	}
})();
