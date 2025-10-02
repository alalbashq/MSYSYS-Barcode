// Copyright (c) 2025, Albashq Alshwmy and contributors
// For license information, please see license.txt

frappe.ui.form.on("Barcode Template", {
	refresh(frm) {
		if (!frm.doc.__islocal) {
			frm.add_custom_button(
				__("Preview"),
				() => {
					frappe
						.call({
							method: "mysys_barcode.api.preview_template",
							args: { template: frm.doc.name },
						})
						.then((r) => {
							const html = r.message?.html || "<p>No preview</p>";
							const d = new frappe.ui.Dialog({
								title: __("Preview"),
								size: "large",
							});
							d.$body.html(html);
							d.show();
						});
				},
				__("Actions")
			);
		}
	},
});
