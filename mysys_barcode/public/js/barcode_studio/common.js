export const BARCODE_STUDIO_UI_KEY = "bs_ui";
export const BARCODE_STUDIO_DEFAULT_WIDTH_MM = 50;
export const BARCODE_STUDIO_DEFAULT_HEIGHT_MM = 30;
export const BARCODE_STUDIO_DEFAULT_UNIT = "mm";
export const BARCODE_STUDIO_MM_TO_PX = 3.779528; // 96 DPI
export const BARCODE_STUDIO_PX_TO_MM = 1 / BARCODE_STUDIO_MM_TO_PX;

export const BARCODE_STUDIO_DIMENSION_UNITS = {
  mm: {
    label: "mm",
    factor: 1,
    step: 0.1,
    digits: 1,
  },
  in: {
    label: "in",
    factor: 25.4,
    step: 0.01,
    digits: 2,
  },
};

export const BARCODE_STUDIO_MM_FIELD_MAP = {
  left: "left_mm",
  top: "top_mm",
  width: "width_mm",
  height: "height_mm",
  fontSize: "font_size_mm",
  barWidth: "bar_width_mm",
  barHeight: "bar_height_mm",
  marginTop: "margin_top_mm",
  marginRight: "margin_right_mm",
  marginBottom: "margin_bottom_mm",
  marginLeft: "margin_left_mm",
  boxWidth: "box_width_mm",
  boxHeight: "box_height_mm",
};

export const BARCODE_STUDIO_FIELD_TYPES = new Set([
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

export function safeJsonParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function escapeHtml(value) {
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

export function toNumber(value, fallback = 0) {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : fallback;
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function getRouteState() {
  const route = frappe.get_route?.() || [];
  return {
    doctype: route[1] || "Item",
    docname: route[2] || "",
    templateName: route[3] || null,
  };
}

export function normalizeCtx(ctx) {
  if (!ctx || typeof ctx !== "object") return null;
  if (ctx.doctype || ctx.name || ctx.__child_field) return ctx;
  if (ctx.doc && typeof ctx.doc === "object") return ctx.doc;
  return ctx;
}
