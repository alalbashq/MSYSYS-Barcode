const BARCODE_DOCTYPE_FIELD_TYPES = new Set([
  "Data",
  "Small Text",
  "Long Text",
  "Select",
  "Link",
  "Dynamic Link",
  "Int",
  "Float",
  "Currency",
  "Percent",
  "Date",
  "Datetime",
  "Time",
  "Read Only",
  "Barcode",
  "Text Editor",
]);

const STANDARD_BARCODE_FIELDS = [
  { fieldname: "name", label: "Name", fieldtype: "Data", options: "" },
];

function with_doctype(doctype) {
  return new Promise((resolve) => {
    if (!doctype) {
      resolve(null);
      return;
    }
    frappe.model.with_doctype(doctype, () => resolve(frappe.get_meta(doctype)));
  });
}

function bindable_fields(meta) {
  const fields = [
    ...STANDARD_BARCODE_FIELDS,
    ...((meta?.fields || [])
      .filter((df) => BARCODE_DOCTYPE_FIELD_TYPES.has(df.fieldtype))
      .map((df) => ({
        fieldname: df.fieldname,
        label: df.label || df.fieldname,
        fieldtype: df.fieldtype,
        options: df.options || "",
      }))),
  ];

  const seen = new Set();
  return fields.filter((field) => {
    if (!field.fieldname || seen.has(field.fieldname)) return false;
    seen.add(field.fieldname);
    return true;
  });
}

function child_table_fields(meta) {
  return (meta?.fields || [])
    .filter((df) => df.fieldtype === "Table" && df.options)
    .map((df) => ({
      fieldname: df.fieldname,
      label: df.label || df.fieldname,
      options: df.options || "",
    }));
}

function set_select_options(cdt, cdn, fieldname, values) {
  const df = frappe.meta.get_docfield(cdt, fieldname, cdn);
  if (!df) return;
  df.options = ["", ...(values || [])].join("\n");
}

async function refresh_row_options(frm, cdt, cdn) {
  const row = locals[cdt]?.[cdn];
  if (!row || !frm.doc.target_doctype) return;

  const target_meta = await with_doctype(frm.doc.target_doctype);
  const tables = child_table_fields(target_meta);
  set_select_options(cdt, cdn, "child_table_field", tables.map((field) => field.fieldname));

  if (row.source_level === "Child Table") {
    const table = tables.find((field) => field.fieldname === row.child_table_field);
    row.child_doctype = table?.options || "";
    if (row.child_doctype) {
      const child_meta = await with_doctype(row.child_doctype);
      set_select_options(cdt, cdn, "fieldname", bindable_fields(child_meta).map((field) => field.fieldname));
    } else {
      set_select_options(cdt, cdn, "fieldname", []);
    }
  } else {
    row.child_table_field = "";
    row.child_doctype = "";
    set_select_options(cdt, cdn, "fieldname", bindable_fields(target_meta).map((field) => field.fieldname));
  }

  frm.refresh_field("fields");
}

async function resolve_selected_field(frm, row) {
  if (!row?.fieldname || !frm.doc.target_doctype) return null;

  if (row.source_level === "Child Table") {
    const target_meta = await with_doctype(frm.doc.target_doctype);
    const table = child_table_fields(target_meta).find((field) => field.fieldname === row.child_table_field);
    row.child_doctype = table?.options || "";
    if (!row.child_doctype) return null;

    const child_meta = await with_doctype(row.child_doctype);
    return bindable_fields(child_meta).find((field) => field.fieldname === row.fieldname) || null;
  }

  const target_meta = await with_doctype(frm.doc.target_doctype);
  return bindable_fields(target_meta).find((field) => field.fieldname === row.fieldname) || null;
}

async function fill_row_metadata(frm, cdt, cdn) {
  const row = locals[cdt]?.[cdn];
  if (!row) return;

  await refresh_row_options(frm, cdt, cdn);
  const field = await resolve_selected_field(frm, row);
  if (!field) {
    row.label = "";
    row.fieldtype = "";
    row.options = "";
    row.binding_key = "";
    frm.refresh_field("fields");
    return;
  }

  row.label = field.label || row.fieldname;
  row.fieldtype = field.fieldtype || "";
  row.options = field.options || "";
  row.binding_key = row.source_level === "Child Table"
    ? `${row.child_table_field}_${row.fieldname}`
    : row.fieldname;

  frm.refresh_field("fields");
}

frappe.ui.form.on("Barcode DocType", {
  refresh(frm) {
    (frm.doc.fields || []).forEach((row) => {
      void refresh_row_options(frm, row.doctype, row.name);
    });
  },

  target_doctype(frm) {
    (frm.doc.fields || []).forEach((row) => {
      row.child_table_field = "";
      row.child_doctype = "";
      row.fieldname = "";
      row.label = "";
      row.fieldtype = "";
      row.options = "";
      row.binding_key = "";
      void refresh_row_options(frm, row.doctype, row.name);
    });
    frm.refresh_field("fields");
  },

  fields_add(frm, cdt, cdn) {
    const row = locals[cdt][cdn];
    row.source_level = row.source_level || "Document";
    void refresh_row_options(frm, cdt, cdn);
  },
});

frappe.ui.form.on("Barcode DocType Field", {
  form_render(frm, cdt, cdn) {
    void refresh_row_options(frm, cdt, cdn);
  },

  source_level(frm, cdt, cdn) {
    const row = locals[cdt][cdn];
    row.child_table_field = "";
    row.child_doctype = "";
    row.fieldname = "";
    row.label = "";
    row.fieldtype = "";
    row.options = "";
    row.binding_key = "";
    void refresh_row_options(frm, cdt, cdn);
  },

  child_table_field(frm, cdt, cdn) {
    const row = locals[cdt][cdn];
    row.fieldname = "";
    row.label = "";
    row.fieldtype = "";
    row.options = "";
    row.binding_key = "";
    void refresh_row_options(frm, cdt, cdn);
  },

  fieldname(frm, cdt, cdn) {
    void fill_row_metadata(frm, cdt, cdn);
  },
});
