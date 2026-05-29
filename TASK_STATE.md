# TASK STATE

Date: 2026-05-29 17:02 UTC

Project: `mysys_barcode` -> `barcode-studio`

## Current Status

- The page layout is now side by side:
  - Fields panel on the left
  - Design editor in the center
  - Preview beside the design
  - Properties panel on the right
- Sticker size controls support `mm` and `in`.
- Internal storage still uses `mm` so the design and print output stay on the same physical measurements.
- Preview uses the Fabric canvas snapshot so the editor and preview stay aligned.
- The design canvas now uses a white background, and the preview/print size is tied to the same sticker dimensions.
- `Barcode Studio` logic has been split into modules under `mysys_barcode/public/js/barcode_studio/`.
- `mysys_barcode/public/js/barcode_studio.bundle.js` now acts as the on-demand entry bundle, and the page file only loads it.
- `Item` now opens `Barcode Studio` with the full document in `frappe.route_options`.
- `quick_barcode_print` now opens `Barcode Studio` with the current document, child table key, and selected template in the route.
- Child-table binding paths like `items[].field` resolve correctly in the studio preview and print output.
- `bench build --app mysys_barcode` passed after the refactor.

## Recently Touched Files

- `mysys_barcode/public/js/barcode_studio.bundle.js`
- `mysys_barcode/public/js/barcode_studio/common.js`
- `mysys_barcode/public/js/barcode_studio/state_store.js`
- `mysys_barcode/public/js/barcode_studio/canvas_controller.js`
- `mysys_barcode/public/js/barcode_studio/page.js`
- `mysys_barcode/mysys_barcode/page/barcode_studio/barcode_studio.js`
- `mysys_barcode/mysys_barcode/page/barcode_studio/barcode_studio.css`
- `mysys_barcode/mysys_barcode/page/barcode_studio/barcode_studio.html`
- Earlier support files were also modified:
  - `mysys_barcode/api.py`
  - `mysys_barcode/hooks.py`
  - `mysys_barcode/mysys_barcode/doctype/barcode_template/barcode_template.js`
  - `mysys_barcode/mysys_barcode/doctype/barcode_template/barcode_template.json`
  - `mysys_barcode/mysys_barcode/doctype/barcode_template/barcode_template.py`

## Remaining Check

- The new modular bundle should now be verified in the browser after a hard refresh.
- `bench migrate` still stops later because `mysys_pos.patches.v1_0.add_mobile_payment_request_indexes` is missing. That is unrelated to this app's changes.

## Notes

- `mysys_barcode/public/dist/` is generated build output and should not be edited manually.
- There is an ongoing untracked directory in the barcode app: `mysys_barcode/mysys_barcode/doctype/barcode_template_field/`.
- Do not reset unrelated changes in the app; keep the current worktree state intact.
