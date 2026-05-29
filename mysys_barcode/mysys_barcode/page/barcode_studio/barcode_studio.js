const BARCODE_STUDIO_BUNDLE_URL = "/assets/mysys_barcode/js/barcode_studio.bundle.js";

function loadBarcodeStudioBundle() {
  if (!window.__barcode_studio_bundle_promise__) {
    window.__barcode_studio_bundle_promise__ = import(BARCODE_STUDIO_BUNDLE_URL).catch((error) => {
      window.__barcode_studio_bundle_promise__ = null;
      throw error;
    });
  }
  return window.__barcode_studio_bundle_promise__;
}

frappe.pages["barcode-studio"] = frappe.pages["barcode-studio"] || {};
frappe.pages["barcode-studio"].on_page_load = function (wrapper) {
  loadBarcodeStudioBundle()
    .then(({ mountBarcodeStudio }) => mountBarcodeStudio(wrapper))
    .catch((error) => {
      console.error("Failed to load Barcode Studio bundle", error);
      const $wrapper = wrapper?.jquery ? wrapper : $(wrapper);
      $wrapper?.empty?.();
      $wrapper?.html?.("<div class='alert alert-danger m-3'>Failed to load Barcode Studio bundle.</div>");
    });
};
