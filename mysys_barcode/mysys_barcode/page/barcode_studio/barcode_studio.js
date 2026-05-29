const BARCODE_STUDIO_BUNDLE_NAME = "barcode_studio.bundle.js";

function getBarcodeStudioBundleUrl() {
  if (frappe.assets?.bundled_asset) {
    return frappe.assets.bundled_asset(BARCODE_STUDIO_BUNDLE_NAME);
  }
  return frappe.boot?.assets_json?.[BARCODE_STUDIO_BUNDLE_NAME] || "/assets/mysys_barcode/js/barcode_studio.bundle.js";
}

function loadBarcodeStudioBundle() {
  const bundleUrl = getBarcodeStudioBundleUrl();
  if (!window.__barcode_studio_bundle_promise__ || window.__barcode_studio_bundle_url__ !== bundleUrl) {
    window.__barcode_studio_bundle_url__ = bundleUrl;
    window.__barcode_studio_bundle_promise__ = new Promise((resolve, reject) => {
      if (window.mysysBarcodeStudio?.mountBarcodeStudio) {
        resolve(window.mysysBarcodeStudio);
        return;
      }

      const script = document.createElement("script");
      script.src = bundleUrl;
      script.onload = () => {
        if (window.mysysBarcodeStudio?.mountBarcodeStudio) {
          resolve(window.mysysBarcodeStudio);
        } else {
          reject(new Error("Barcode Studio bundle loaded without mountBarcodeStudio."));
        }
      };
      script.onerror = () => reject(new Error(`Unable to load ${bundleUrl}`));
      document.head.appendChild(script);
    }).catch((error) => {
      window.__barcode_studio_bundle_promise__ = null;
      window.__barcode_studio_bundle_url__ = null;
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
