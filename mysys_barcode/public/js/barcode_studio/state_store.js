import {
  BARCODE_STUDIO_DEFAULT_UNIT,
  BARCODE_STUDIO_UI_KEY,
} from "./common.js";
import {
  safeJsonParse,
  toNumber,
} from "./common.js";

export class BarcodeStudioStateStore {
  constructor(key = BARCODE_STUDIO_UI_KEY) {
    this.key = key;
    this.state = this._read();
  }

  _read() {
    const defaults = {
      dark: false,
      grid: false,
      snap: 1,
      unit: BARCODE_STUDIO_DEFAULT_UNIT,
      preview_h: null,
    };

    const raw = safeJsonParse(localStorage.getItem(this.key), {});
    return {
      ...defaults,
      ...raw,
      dark: !!raw.dark,
      grid: !!raw.grid,
      snap: toNumber(raw.snap, 1),
      preview_h: raw.preview_h || raw.previewHeight || null,
    };
  }

  _write() {
    try {
      localStorage.setItem(this.key, JSON.stringify(this.state));
    } catch {
      // ignore storage errors
    }
  }

  get(name, fallback = null) {
    return this.state[name] ?? fallback;
  }

  set(patch) {
    this.state = { ...this.state, ...patch };
    this._write();
    return this.state;
  }
}
