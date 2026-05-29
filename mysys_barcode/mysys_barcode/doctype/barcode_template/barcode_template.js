// Copyright (c) 2025, Albashq Alshwmy and contributors
// For license information, please see license.txt

function escapeHtml(value) {
	if (frappe.utils?.escape_html) {
		return frappe.utils.escape_html(value == null ? "" : String(value));
	}
	return String(value == null ? "" : value).replace(/[&<>"']/g, (ch) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#39;",
	}[ch]));
}

function createFieldChip(item, selected = false) {
	const $chip = $(`
		<button type="button" class="btn btn-sm ${selected ? "btn-primary" : "btn-light"} border text-start mb-2 me-2" style="min-width: 220px;">
			<div class="fw-semibold">${escapeHtml(item.label || item.fieldname || "")}</div>
			<div class="small ${selected ? "text-white-50" : "text-muted"}">${escapeHtml(item.path || item.fieldname || "")}</div>
		</button>
	`);
	return $chip;
}

async function loadFieldCatalog(doctype) {
	const response = await frappe.call({
		method: "mysys_barcode.api.get_doc_field_catalog",
		args: { doctype },
	});
	return response.message || { root_fields: [], child_tables: [] };
}

function appendDesignField(frm, payload) {
	frm.add_child("design_fields", payload);
	frm.refresh_field("design_fields");
}

frappe.ui.form.on("Barcode Template", {
	refresh(frm) {
		frm.add_custom_button(
			__("Add Design Field"),
			() => void openFieldPicker(frm),
			__("Actions")
		);

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

async function openFieldPicker(frm) {
	const sourceDoctype = frm.doc.source_doctype;
	if (!sourceDoctype) {
		frappe.msgprint(__("Select Source DocType first."));
		return;
	}

	const catalog = await loadFieldCatalog(sourceDoctype);
	const rootFields = catalog.root_fields || [];
	const childTables = catalog.child_tables || [];

	const dialog = new frappe.ui.Dialog({
		title: __("Add Design Field"),
		size: "extra-large",
		fields: [
			{
				fieldname: "scope",
				fieldtype: "Select",
				label: __("Scope"),
				options: "Document\nChild Table",
				default: "Document",
				reqd: 1,
			},
			{
				fieldname: "search",
				fieldtype: "Data",
				label: __("Search"),
				placeholder: __("Search labels or fieldnames..."),
			},
			{ fieldname: "selected_box", fieldtype: "HTML" },
			{ fieldname: "child_table_box", fieldtype: "HTML" },
			{ fieldname: "field_box", fieldtype: "HTML" },
		],
		primary_action_label: __("Add"),
		primary_action() {
			if (!dialog._selectedField) {
				frappe.throw(__("Pick a field first."));
			}

			appendDesignField(frm, dialog._selectedField);
			dialog.hide();
			frappe.show_alert({ message: __("Field added"), indicator: "green" });
		},
	});

	const $selected = dialog.fields_dict.selected_box.$wrapper;
	const $childTableBox = dialog.fields_dict.child_table_box.$wrapper;
	const $fieldBox = dialog.fields_dict.field_box.$wrapper;

	const state = {
		scope: "Document",
		search: "",
		childTable: null,
		selectedField: null,
	};

	const matchesQuery = (item) => {
		const query = (state.search || "").trim().toLowerCase();
		if (!query) return true;
		const haystack = [
			item.label || "",
			item.fieldname || "",
			item.path || "",
			item.parent_fieldname || "",
			item.child_doctype || "",
		].join(" ").toLowerCase();
		return haystack.includes(query);
	};

	const renderSelection = () => {
		if (!state.selectedField) {
			$selected.html(`<div class="text-muted small">${__("Pick a field from the list below.")}</div>`);
			return;
		}
		const item = state.selectedField;
		$selected.html(`
			<div class="border rounded bg-light p-3 mb-2">
				<div class="small text-muted mb-1">${escapeHtml(item.scope || "Document")}</div>
				<div class="fw-semibold">${escapeHtml(item.label || item.fieldname || "")}</div>
				<div class="small text-muted">${escapeHtml(item.path || item.fieldname || "")}</div>
			</div>
		`);
	};

	const setSelectedField = (item) => {
		state.selectedField = item;
		dialog._selectedField = item;
		renderSelection();
	};

	const renderDocumentFields = () => {
		const fields = rootFields.filter(matchesQuery);
		if (!fields.length) {
			$fieldBox.html(`<div class="text-muted small">${__("No matching document fields.")}</div>`);
			return;
		}

		const $wrap = $('<div class="d-flex flex-wrap"></div>');
		fields.forEach((item) => {
			const $chip = createFieldChip(item);
			$chip.on("click", () => setSelectedField({
				scope: "Document",
				parent_fieldname: "",
				child_doctype: "",
				fieldname: item.fieldname,
				label: item.label || item.fieldname,
				fieldtype: item.fieldtype || "",
				bind_path: item.path || item.fieldname,
				path: item.path || item.fieldname,
			}));
			$wrap.append($chip);
		});
		$fieldBox.empty().append($wrap);
	};

	const renderChildTables = () => {
		const tables = childTables.filter((item) => matchesQuery(item));
		if (!tables.length) {
			$childTableBox.html(`<div class="text-muted small">${__("No matching child tables.")}</div>`);
			$fieldBox.html(`<div class="text-muted small">${__("Pick a child table to see its fields.")}</div>`);
			return;
		}

		if (!state.childTable || !tables.some((item) => item.fieldname === state.childTable.fieldname)) {
			state.childTable = tables[0];
		}

		const $tableWrap = $('<div class="d-flex flex-wrap mb-2"></div>');
		tables.forEach((table) => {
			const active = state.childTable && state.childTable.fieldname === table.fieldname;
			const $chip = createFieldChip({
				label: table.label || table.fieldname,
				fieldname: table.fieldname,
				path: table.fieldname,
			}, active);
			$chip.on("click", () => {
				state.childTable = table;
				render();
			});
			$tableWrap.append($chip);
		});

		$childTableBox.empty().append($tableWrap);

		const activeTable = state.childTable || tables[0];

		const childFields = (activeTable?.fields || []).filter(matchesQuery);
		if (!childFields.length) {
			$fieldBox.html(`<div class="text-muted small">${__("No matching fields in the selected child table.")}</div>`);
			return;
		}

		const $fieldWrap = $('<div class="d-flex flex-wrap"></div>');
		childFields.forEach((item) => {
			const $chip = createFieldChip(item);
			$chip.on("click", () => setSelectedField({
				scope: "Child Table",
				parent_fieldname: activeTable.fieldname,
				child_doctype: activeTable.child_doctype || "",
				fieldname: item.fieldname,
				label: item.label || item.fieldname,
				fieldtype: item.fieldtype || "",
				bind_path: item.path || `${activeTable.fieldname}[].${item.fieldname}`,
				path: item.path || `${activeTable.fieldname}[].${item.fieldname}`,
			}));
			$fieldWrap.append($chip);
		});
		$fieldBox.empty().append($fieldWrap);
	};

	const render = () => {
		state.scope = dialog.get_value("scope") || "Document";
		state.search = dialog.get_value("search") || "";
		state.selectedField = null;
		dialog._selectedField = null;

		dialog.set_df_property("child_table_box", "hidden", state.scope !== "Child Table");
		renderSelection();

		if (state.scope === "Document") {
			$childTableBox.empty();
			renderDocumentFields();
			return;
		}

		renderChildTables();
	};

	dialog.fields_dict.scope.$input.on("change", render);
	dialog.fields_dict.search.$input.on("input", render);

	render();
	dialog.show();
}
