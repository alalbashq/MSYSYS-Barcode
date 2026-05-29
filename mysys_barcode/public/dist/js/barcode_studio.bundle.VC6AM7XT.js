(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

  // ../mysys_barcode/mysys_barcode/public/js/barcode_studio/common.js
  var BARCODE_STUDIO_UI_KEY = "bs_ui";
  var BARCODE_STUDIO_DEFAULT_WIDTH_MM = 50;
  var BARCODE_STUDIO_DEFAULT_HEIGHT_MM = 30;
  var BARCODE_STUDIO_DEFAULT_UNIT = "mm";
  var BARCODE_STUDIO_MM_TO_PX = 3.779528;
  var BARCODE_STUDIO_PX_TO_MM = 1 / BARCODE_STUDIO_MM_TO_PX;
  var BARCODE_STUDIO_DIMENSION_UNITS = {
    mm: {
      label: "mm",
      factor: 1,
      step: 0.1,
      digits: 1
    },
    in: {
      label: "in",
      factor: 25.4,
      step: 0.01,
      digits: 2
    }
  };
  var BARCODE_STUDIO_MM_FIELD_MAP = {
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
    boxHeight: "box_height_mm"
  };
  var BARCODE_STUDIO_FIELD_TYPES = /* @__PURE__ */ new Set([
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
    "Text Editor"
  ]);
  function safeJsonParse(raw, fallback) {
    try {
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function escapeHtml(value) {
    var _a2;
    if ((_a2 = frappe.utils) == null ? void 0 : _a2.escape_html) {
      return frappe.utils.escape_html(value == null ? "" : String(value));
    }
    return String(value == null ? "" : value).replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[ch]);
  }
  function toNumber(value, fallback = 0) {
    const n = Number.parseFloat(value);
    return Number.isFinite(n) ? n : fallback;
  }
  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }
  function getRouteState() {
    var _a2;
    const route = ((_a2 = frappe.get_route) == null ? void 0 : _a2.call(frappe)) || [];
    return {
      doctype: route[1] || "Item",
      docname: route[2] || "",
      templateName: route[3] || null
    };
  }
  function normalizeCtx(ctx) {
    if (!ctx || typeof ctx !== "object")
      return null;
    if (ctx.doctype || ctx.name || ctx.__child_field)
      return ctx;
    if (ctx.doc && typeof ctx.doc === "object")
      return ctx.doc;
    return ctx;
  }

  // ../mysys_barcode/mysys_barcode/public/js/barcode_studio/state_store.js
  var BarcodeStudioStateStore = class {
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
        preview_h: null
      };
      const raw = safeJsonParse(localStorage.getItem(this.key), {});
      return __spreadProps(__spreadValues(__spreadValues({}, defaults), raw), {
        dark: !!raw.dark,
        grid: !!raw.grid,
        snap: toNumber(raw.snap, 1),
        preview_h: raw.preview_h || raw.previewHeight || null
      });
    }
    _write() {
      try {
        localStorage.setItem(this.key, JSON.stringify(this.state));
      } catch (e) {
      }
    }
    get(name, fallback = null) {
      var _a2;
      return (_a2 = this.state[name]) != null ? _a2 : fallback;
    }
    set(patch) {
      this.state = __spreadValues(__spreadValues({}, this.state), patch);
      this._write();
      return this.state;
    }
  };

  // ../mysys_barcode/mysys_barcode/public/js/barcode_studio/canvas_controller.js
  var BarcodeStudioCanvasController = class {
    constructor(page) {
      var _a2;
      this.page = page;
      this.state = page.state;
      this.fabricCanvas = null;
      this.canvasEl = null;
      this.mmToPx = BARCODE_STUDIO_MM_TO_PX;
      this.pageWidthMM = BARCODE_STUDIO_DEFAULT_WIDTH_MM;
      this.pageHeightMM = BARCODE_STUDIO_DEFAULT_HEIGHT_MM;
      this.scale = 1;
      this.snapMM = 1;
      this.gridVisible = false;
      this._suspendPreview = false;
      this._previewTicket = 0;
      this.previewDebounced = ((_a2 = frappe.utils) == null ? void 0 : _a2.debounce(() => {
        void this.preview();
      }, 180)) || (() => void this.preview());
      this._boundKeydown = this._handleKeydown.bind(this);
      this._boundWheel = this._handleWheel.bind(this);
      this._boundDragOver = (ev) => ev.preventDefault();
      this._boundDrop = this._handleDrop.bind(this);
    }
    _pxToMm(value, digits = 3) {
      return Number((toNumber(value, 0) * BARCODE_STUDIO_PX_TO_MM).toFixed(digits));
    }
    _mmToPx(value) {
      return toNumber(value, 0) * BARCODE_STUDIO_MM_TO_PX;
    }
    _layoutValuePx(item, key, fallback = 0) {
      const mmKey = BARCODE_STUDIO_MM_FIELD_MAP[key];
      if (mmKey && item && Object.prototype.hasOwnProperty.call(item, mmKey)) {
        const mmValue = toNumber(item[mmKey], NaN);
        if (Number.isFinite(mmValue))
          return this._mmToPx(mmValue);
      }
      if (item && Object.prototype.hasOwnProperty.call(item, key)) {
        const rawValue = toNumber(item[key], NaN);
        if (Number.isFinite(rawValue))
          return rawValue;
      }
      return fallback;
    }
    _layoutValueMm(item, key, fallback = 0) {
      const pxValue = this._layoutValuePx(item, key, NaN);
      if (Number.isFinite(pxValue))
        return this._pxToMm(pxValue);
      const mmKey = BARCODE_STUDIO_MM_FIELD_MAP[key];
      if (mmKey && item && Object.prototype.hasOwnProperty.call(item, mmKey)) {
        const mmValue = toNumber(item[mmKey], NaN);
        if (Number.isFinite(mmValue))
          return mmValue;
      }
      return fallback;
    }
    _sizeMm(value) {
      return `${this._pxToMm(value).toFixed(3)} mm`;
    }
    _currentObjectWidthMm(obj) {
      var _a2, _b, _c;
      return this._pxToMm((_c = (_b = (_a2 = obj == null ? void 0 : obj.getScaledWidth) == null ? void 0 : _a2.call(obj)) != null ? _b : obj == null ? void 0 : obj.width) != null ? _c : 0);
    }
    _currentObjectHeightMm(obj) {
      var _a2, _b, _c;
      return this._pxToMm((_c = (_b = (_a2 = obj == null ? void 0 : obj.getScaledHeight) == null ? void 0 : _a2.call(obj)) != null ? _b : obj == null ? void 0 : obj.height) != null ? _c : 0);
    }
    init() {
      const canvasEl = document.getElementById("bs-canvas");
      if (!canvasEl)
        return;
      this.canvasEl = canvasEl;
      this.fabricCanvas = new fabric.Canvas(canvasEl, {
        width: this.pageWidthMM * this.mmToPx,
        height: this.pageHeightMM * this.mmToPx,
        backgroundColor: "#fff",
        selection: true,
        preserveObjectStacking: true
      });
      this.fabricCanvas.upperCanvasEl.tabIndex = 0;
      this._bindCanvasEvents();
      this.setPageSize(this.pageWidthMM, this.pageHeightMM, { persist: false });
      this.setZoom(1, { persist: false });
    }
    destroy() {
      if (this.canvasEl) {
        this.canvasEl.removeEventListener("dragover", this._boundDragOver);
        this.canvasEl.removeEventListener("drop", this._boundDrop);
        this.canvasEl.removeEventListener("wheel", this._boundWheel);
      }
      document.removeEventListener("keydown", this._boundKeydown);
      if (this.fabricCanvas) {
        try {
          this.fabricCanvas.off();
          this.fabricCanvas.dispose();
        } catch (e) {
        }
        this.fabricCanvas = null;
      }
    }
    _bindCanvasEvents() {
      const canvas = this.fabricCanvas;
      if (!canvas)
        return;
      canvas.on("selection:created", (e) => {
        var _a2;
        this._focusCanvas();
        this.renderProps(((_a2 = e.selected) == null ? void 0 : _a2[0]) || e.target || null);
      });
      canvas.on("selection:updated", (e) => {
        var _a2;
        this._focusCanvas();
        this.renderProps(((_a2 = e.selected) == null ? void 0 : _a2[0]) || e.target || null);
      });
      canvas.on("selection:cleared", () => this.renderProps(null));
      canvas.on("object:moving", ({ target }) => {
        this._keepInsideCanvas(target);
        if (!this._suspendPreview)
          this.previewDebounced();
      });
      canvas.on("object:scaled", ({ target }) => {
        this._keepInsideCanvas(target);
        this._syncBarcodeBox(target);
        this.renderProps(target);
        if (!this._suspendPreview)
          this.previewDebounced();
      });
      canvas.on("object:modified", (e) => {
        this._syncBarcodeBox(e.target);
        this.renderProps(e.target);
        if (!this._suspendPreview)
          this.previewDebounced();
      });
      canvas.on("object:added", () => {
        if (!this._suspendPreview)
          this.previewDebounced();
      });
      canvas.on("object:removed", () => {
        if (!this._suspendPreview)
          this.previewDebounced();
      });
      this.canvasEl.addEventListener("dragover", this._boundDragOver);
      this.canvasEl.addEventListener("drop", this._boundDrop);
      this.canvasEl.addEventListener("wheel", this._boundWheel, { passive: false });
      document.addEventListener("keydown", this._boundKeydown);
    }
    _focusCanvas() {
      var _a2, _b, _c;
      (_c = (_b = (_a2 = this.fabricCanvas) == null ? void 0 : _a2.upperCanvasEl) == null ? void 0 : _b.focus) == null ? void 0 : _c.call(_b);
    }
    _handleDrop(ev) {
      ev.preventDefault();
      if (!this.fabricCanvas)
        return;
      const payload = safeJsonParse(ev.dataTransfer.getData("text/plain"), {});
      const pointer = this.fabricCanvas.getPointer(ev);
      this._chooseAddAs(payload, pointer.x, pointer.y);
    }
    _chooseAddAs(payload, x, y) {
      const kind = String((payload == null ? void 0 : payload.kind) || ((payload == null ? void 0 : payload.fieldtype) === "Barcode" ? "barcode" : "text")).toLowerCase();
      const label = (payload == null ? void 0 : payload.displayLabel) || (payload == null ? void 0 : payload.label) || (payload == null ? void 0 : payload.fieldLabel) || (payload == null ? void 0 : payload.fieldname) || (payload == null ? void 0 : payload.path) || "Text";
      const bindPath = (payload == null ? void 0 : payload.path) || (payload == null ? void 0 : payload.fieldname) || "";
      if (kind === "barcode") {
        this.addBarcodeAt(x, y, (payload == null ? void 0 : payload.baseValue) || (payload == null ? void 0 : payload.value) || label || bindPath || "123456789012", bindPath);
        return;
      }
      this.addTextAt(x, y, label, bindPath);
    }
    _handleKeydown(ev) {
      var _a2, _b, _c, _d, _e;
      if (!this.fabricCanvas)
        return;
      const tag = (((_a2 = ev.target) == null ? void 0 : _a2.tagName) || "").toLowerCase();
      const isInput = tag === "input" || tag === "textarea" || ((_b = ev.target) == null ? void 0 : _b.isContentEditable);
      if (isInput)
        return;
      const active = this.fabricCanvas.getActiveObject();
      const canvasHasFocus = document.activeElement === this.fabricCanvas.upperCanvasEl;
      const isEditingTextbox = active && ((_c = active.isType) == null ? void 0 : _c.call(active, "textbox")) && active.isEditing;
      if ((ev.key === "Delete" || ev.key === "Backspace") && active && canvasHasFocus && !isEditingTextbox) {
        ev.preventDefault();
        this.fabricCanvas.remove(active);
        this.fabricCanvas.discardActiveObject();
        this.renderProps(null);
        if (!this._suspendPreview)
          this.previewDebounced();
      }
      if ((ev.ctrlKey || ev.metaKey) && (ev.key === "+" || ev.key === "=")) {
        ev.preventDefault();
        this.setZoom(this.scale + 0.1);
      }
      if ((ev.ctrlKey || ev.metaKey) && ev.key === "-") {
        ev.preventDefault();
        this.setZoom(this.scale - 0.1);
      }
      if ((ev.ctrlKey || ev.metaKey) && ev.key === "0") {
        ev.preventDefault();
        this.setZoom(1);
      }
      if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === "k") {
        ev.preventDefault();
        (_e = (_d = this.page.canvasClearButton) == null ? void 0 : _d.trigger) == null ? void 0 : _e.call(_d, "click");
      }
    }
    _handleWheel(ev) {
      if (!this.fabricCanvas || !ev.ctrlKey)
        return;
      ev.preventDefault();
      const delta = Math.sign(ev.deltaY);
      this.setZoom(this.scale + (delta < 0 ? 0.05 : -0.05));
    }
    _keepInsideCanvas(obj) {
      if (!this.fabricCanvas || !obj)
        return;
      const snap = Math.max(1, this.snapMM * this.mmToPx);
      const bounds = obj.getBoundingRect(true);
      const maxLeft = Math.max(0, this.fabricCanvas.getWidth() - bounds.width);
      const maxTop = Math.max(0, this.fabricCanvas.getHeight() - bounds.height);
      obj.left = clamp(Math.round((obj.left || 0) / snap) * snap, 0, maxLeft);
      obj.top = clamp(Math.round((obj.top || 0) / snap) * snap, 0, maxTop);
      obj.setCoords();
    }
    _syncBarcodeBox(obj) {
      if ((obj == null ? void 0 : obj.customType) === "barcode") {
        obj.boxWidth = obj.getScaledWidth();
        obj.boxHeight = obj.getScaledHeight();
      }
    }
    _cloneFabricObject(obj) {
      return new Promise((resolve) => {
        if (!(obj == null ? void 0 : obj.clone)) {
          resolve(null);
          return;
        }
        const props = [
          "baseText",
          "baseBarcodeValue",
          "bindField",
          "customType",
          "barcodeValue",
          "format",
          "barWidth",
          "barHeight",
          "displayValue",
          "marginTop",
          "marginRight",
          "marginBottom",
          "marginLeft",
          "boxWidth",
          "boxHeight"
        ];
        obj.clone((cloned) => {
          resolve(cloned || null);
        }, props);
      });
    }
    async _renderPreviewImageData(multiplier = Math.max(1, window.devicePixelRatio || 1)) {
      var _a2, _b, _c, _d, _e;
      if (!this.fabricCanvas)
        return "";
      const width = this.fabricCanvas.getWidth();
      const height = this.fabricCanvas.getHeight();
      const previewCanvasEl = document.createElement("canvas");
      previewCanvasEl.width = width;
      previewCanvasEl.height = height;
      const previewCanvas = new fabric.StaticCanvas(previewCanvasEl, {
        backgroundColor: "#fff",
        renderOnAddRemove: false,
        selection: false
      });
      const data = this.page.resolveDoc();
      for (const source of this.fabricCanvas.getObjects()) {
        const clone = await this._cloneFabricObject(source);
        if (!clone)
          continue;
        if ((_a2 = clone.isType) == null ? void 0 : _a2.call(clone, "textbox")) {
          const baseText = (_c = (_b = source.baseText) != null ? _b : source.text) != null ? _c : "";
          const resolved = source.bindField ? this._getByPath(data, source.bindField) : void 0;
          const nextText = resolved === void 0 || resolved === null ? baseText : this._toStr(resolved);
          clone.set("text", nextText);
          clone.baseText = baseText;
        } else if (source.customType === "barcode") {
          const baseValue = (_e = (_d = source.baseBarcodeValue) != null ? _d : source.barcodeValue) != null ? _e : "";
          const resolved = source.bindField ? this._getByPath(data, source.bindField) : void 0;
          const nextValue = resolved === void 0 || resolved === null ? baseValue : this._toStr(resolved);
          const boxWidth = source.boxWidth || source.getScaledWidth() || source.width || 0;
          const boxHeight = source.boxHeight || source.getScaledHeight() || source.height || 0;
          clone.set({
            barcodeValue: nextValue,
            baseBarcodeValue: baseValue,
            bindField: source.bindField || "",
            customType: "barcode",
            format: source.format || "CODE128",
            barWidth: source.barWidth || 2,
            barHeight: source.barHeight || 60,
            displayValue: !!source.displayValue,
            marginTop: source.marginTop || 0,
            marginRight: source.marginRight || 0,
            marginBottom: source.marginBottom || 0,
            marginLeft: source.marginLeft || 0,
            boxWidth,
            boxHeight
          });
          const url = this._barcodeDataURL(
            nextValue || " ",
            source.format || "CODE128",
            toNumber(source.barWidth, 2),
            toNumber(source.barHeight, 60),
            !!source.displayValue,
            {
              mt: toNumber(source.marginTop, 0),
              mr: toNumber(source.marginRight, 0),
              mb: toNumber(source.marginBottom, 0),
              ml: toNumber(source.marginLeft, 0)
            }
          );
          await this._setImageSource(clone, url, boxWidth, boxHeight);
        }
        previewCanvas.add(clone);
      }
      previewCanvas.renderAll();
      const imageData = previewCanvas.toDataURL({ format: "png", multiplier });
      try {
        previewCanvas.dispose();
      } catch (e) {
      }
      return imageData;
    }
    _toStr(value) {
      if (value === null || value === void 0)
        return "";
      try {
        return String(value);
      } catch (e) {
        return `${value}`;
      }
    }
    _getByPath(obj, path) {
      if (!obj || !path)
        return void 0;
      const normalizedPath = String(path).replace(/\[\]/g, "[0]");
      const segments = normalizedPath.replace(/\[(\d*)\]/g, ".$1").split(".").filter(Boolean);
      let current = obj;
      for (const segment of segments) {
        if (Array.isArray(current)) {
          const idx = segment === "" ? 0 : Number.parseInt(segment, 10);
          current = current == null ? void 0 : current[idx];
        } else {
          current = current == null ? void 0 : current[segment];
        }
        if (current === void 0 || current === null)
          break;
      }
      return current;
    }
    _barcodeDataURL(value, format, width, height, displayValue, margins = { mt: 0, mr: 0, mb: 0, ml: 0 }) {
      const tmp = document.createElement("canvas");
      try {
        JsBarcode(tmp, value || " ", {
          format,
          width: Math.max(1, Math.round(width || 1)),
          height: Math.max(1, Math.round(height || 1)),
          displayValue
        });
      } catch (e) {
      }
      const mt = Math.max(0, Math.round(margins.mt || 0));
      const mr = Math.max(0, Math.round(margins.mr || 0));
      const mb = Math.max(0, Math.round(margins.mb || 0));
      const ml = Math.max(0, Math.round(margins.ml || 0));
      const out = document.createElement("canvas");
      out.width = tmp.width + ml + mr;
      out.height = tmp.height + mt + mb;
      const ctx = out.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, out.width, out.height);
      ctx.drawImage(tmp, ml, mt);
      return out.toDataURL();
    }
    _barcodeSignature(obj) {
      return JSON.stringify([
        obj.barcodeValue || "",
        obj.format || "CODE128",
        Number(toNumber(obj.barWidth, 2).toFixed(3)),
        Number(toNumber(obj.barHeight, 60).toFixed(3)),
        !!obj.displayValue,
        Number(toNumber(obj.marginTop, 0).toFixed(3)),
        Number(toNumber(obj.marginRight, 0).toFixed(3)),
        Number(toNumber(obj.marginBottom, 0).toFixed(3)),
        Number(toNumber(obj.marginLeft, 0).toFixed(3))
      ]);
    }
    _fitImageToBox(img, width, height) {
      const imageWidth = img.width || width || 1;
      const imageHeight = img.height || height || 1;
      img.scaleX = (width || imageWidth) / imageWidth;
      img.scaleY = (height || imageHeight) / imageHeight;
      img.setCoords();
    }
    _loadFabricImage(url) {
      return new Promise((resolve) => {
        fabric.Image.fromURL(url, (img) => resolve(img));
      });
    }
    async _setImageSource(img, url, boxWidth, boxHeight) {
      return new Promise((resolve) => {
        img.setSrc(url, () => {
          this._fitImageToBox(img, boxWidth, boxHeight);
          resolve();
        });
      });
    }
    async _refreshBarcodeObject(obj) {
      if (!obj || obj.customType !== "barcode")
        return;
      const signature = this._barcodeSignature(obj);
      if (obj._barcodeSignature === signature)
        return;
      obj._barcodeSignature = signature;
      const url = this._barcodeDataURL(
        obj.barcodeValue || " ",
        obj.format || "CODE128",
        toNumber(obj.barWidth, 2),
        toNumber(obj.barHeight, 60),
        !!obj.displayValue,
        {
          mt: toNumber(obj.marginTop, 0),
          mr: toNumber(obj.marginRight, 0),
          mb: toNumber(obj.marginBottom, 0),
          ml: toNumber(obj.marginLeft, 0)
        }
      );
      const boxWidth = obj.boxWidth || obj.getScaledWidth();
      const boxHeight = obj.boxHeight || obj.getScaledHeight();
      await this._setImageSource(obj, url, boxWidth, boxHeight);
    }
    setPageSize(widthMM, heightMM, { persist = false } = {}) {
      const nextWidth = toNumber(widthMM, this.pageWidthMM || BARCODE_STUDIO_DEFAULT_WIDTH_MM);
      const nextHeight = toNumber(heightMM, this.pageHeightMM || BARCODE_STUDIO_DEFAULT_HEIGHT_MM);
      if (!(nextWidth > 0) || !(nextHeight > 0))
        return;
      this.pageWidthMM = nextWidth;
      this.pageHeightMM = nextHeight;
      this.page.pageWidthMM = nextWidth;
      this.page.pageHeightMM = nextHeight;
      this.page.refreshDimensionControls();
      if (this.fabricCanvas) {
        this.fabricCanvas.setWidth(nextWidth * this.mmToPx);
        this.fabricCanvas.setHeight(nextHeight * this.mmToPx);
        this.fabricCanvas.calcOffset();
        this.fabricCanvas.requestRenderAll();
      }
      if (persist) {
        this.page.state.set({
          page_width_mm: nextWidth,
          page_height_mm: nextHeight
        });
      }
    }
    setZoom(scale, { persist = false } = {}) {
      var _a2, _b;
      this.scale = clamp(scale, 0.1, 4);
      this.page.scale = this.scale;
      $(".bb-stage").css("transform", `scale(${this.scale})`);
      $("#bs-zoom").val(Math.round(this.scale * 100));
      $("#bs-zoom-label").text(`${Math.round(this.scale * 100)}%`);
      (_b = (_a2 = this.fabricCanvas) == null ? void 0 : _a2.calcOffset) == null ? void 0 : _b.call(_a2);
      if (persist) {
        this.page.state.set({ zoom: this.scale });
      }
    }
    setSnap(snapMM, { persist = false } = {}) {
      this.snapMM = clamp(toNumber(snapMM, 1), 0.1, 100);
      this.page.snapMM = this.snapMM;
      $("#bs-snap").val(String(this.snapMM));
      $("#bs-snap-label").text(`${this.snapMM}mm`);
      if (persist) {
        this.page.state.set({ snap: this.snapMM });
      }
    }
    toggleGrid(enabled = !this.gridVisible, { persist = false } = {}) {
      this.gridVisible = !!enabled;
      this.page.gridVisible = this.gridVisible;
      $("#bs-canvas-wrap").toggleClass("grid-visible", this.gridVisible);
      $("#bs-toggle-grid").toggleClass("active", this.gridVisible);
      if (persist) {
        this.page.state.set({ grid: this.gridVisible });
      }
      return this.gridVisible;
    }
    addComponent(type) {
      if (type === "text")
        this.addTextAt(20, 20, "New Text", "");
      if (type === "barcode")
        this.addBarcodeAt(20, 20, "123456789012", "");
    }
    addTextAt(x, y, text, bindPath = "") {
      if (!this.fabricCanvas)
        return;
      const baseText = text || "Text";
      const obj = new fabric.Textbox(baseText, {
        left: x,
        top: y,
        fontSize: 12,
        padding: 2,
        textAlign: "left",
        customType: "text",
        bindField: bindPath || "",
        baseText
      });
      this.fabricCanvas.add(obj).setActiveObject(obj);
      this.renderProps(obj);
      if (!this._suspendPreview)
        this.previewDebounced();
    }
    addBarcodeAt(x, y, value, bindPath = "") {
      if (!this.fabricCanvas)
        return;
      const baseValue = value || "123456789012";
      const format = "CODE128";
      const barWidth = 2;
      const barHeight = 60;
      const url = this._barcodeDataURL(baseValue || " ", format, barWidth, barHeight, false, {
        mt: 0,
        mr: 0,
        mb: 0,
        ml: 0
      });
      void this._loadFabricImage(url).then((img) => {
        if (!img)
          return;
        img.set({
          left: x,
          top: y,
          customType: "barcode",
          barcodeValue: baseValue,
          baseBarcodeValue: baseValue,
          format,
          barWidth,
          barHeight,
          displayValue: false,
          marginTop: 0,
          marginRight: 0,
          marginBottom: 0,
          marginLeft: 0,
          bindField: bindPath || ""
        });
        img.boxWidth = img.getScaledWidth();
        img.boxHeight = img.getScaledHeight();
        img._barcodeSignature = this._barcodeSignature(img);
        this.fabricCanvas.add(img).setActiveObject(img);
        this.renderProps(img);
        if (!this._suspendPreview)
          this.previewDebounced();
      });
    }
    clearCanvas() {
      if (!this.fabricCanvas)
        return;
      this.fabricCanvas.discardActiveObject();
      this.fabricCanvas.clear();
      this.renderProps(null);
      this.fabricCanvas.requestRenderAll();
      if (!this._suspendPreview)
        this.previewDebounced();
    }
    clearActiveValue() {
      var _a2, _b;
      const obj = (_a2 = this.fabricCanvas) == null ? void 0 : _a2.getActiveObject();
      if (!obj)
        return;
      if ((_b = obj.isType) == null ? void 0 : _b.call(obj, "textbox")) {
        obj.baseText = "";
        obj.set("text", "");
        obj.setCoords();
        this.fabricCanvas.requestRenderAll();
      } else if (obj.customType === "barcode") {
        obj.baseBarcodeValue = "";
        obj.set("barcodeValue", "");
        obj._barcodeSignature = null;
        void this._refreshBarcodeObject(obj).then(() => {
          this.fabricCanvas.requestRenderAll();
        });
      }
      if (!this._suspendPreview)
        this.previewDebounced();
    }
    alignSelected(direction) {
      var _a2;
      const obj = (_a2 = this.fabricCanvas) == null ? void 0 : _a2.getActiveObject();
      if (!obj)
        return;
      const width = this.fabricCanvas.getWidth();
      const height = this.fabricCanvas.getHeight();
      const bounds = obj.getBoundingRect(true);
      if (direction === "left")
        obj.left = 0;
      if (direction === "right")
        obj.left = width - bounds.width;
      if (direction === "center")
        obj.left = (width - bounds.width) / 2;
      if (direction === "top")
        obj.top = 0;
      if (direction === "bottom")
        obj.top = height - bounds.height;
      if (direction === "middle")
        obj.top = (height - bounds.height) / 2;
      obj.setCoords();
      this.fabricCanvas.requestRenderAll();
      if (!this._suspendPreview)
        this.previewDebounced();
    }
    async loadTemplate(doc) {
      var _a2, _b, _c, _d;
      if (!this.fabricCanvas || !doc)
        return;
      this._suspendPreview = true;
      this.renderProps(null);
      this.fabricCanvas.discardActiveObject();
      this.fabricCanvas.clear();
      const widthMM = toNumber(doc.page_width_mm || doc.width_mm, this.pageWidthMM);
      const heightMM = toNumber(doc.page_height_mm || doc.height_mm, this.pageHeightMM);
      this.setPageSize(widthMM, heightMM);
      const layout = safeJsonParse(doc.layout_json || "[]", []);
      const items = Array.isArray(layout) ? layout : [];
      for (const item of items) {
        if (item.type === "textbox") {
          const baseText = (_b = (_a2 = item.baseText) != null ? _a2 : item.text) != null ? _b : "";
          const obj = new fabric.Textbox(baseText, Object.assign({}, item, {
            left: this._layoutValuePx(item, "left", 0),
            top: this._layoutValuePx(item, "top", 0),
            width: this._layoutValuePx(item, "width", 120),
            fontSize: this._layoutValuePx(item, "fontSize", 12),
            text: baseText,
            customType: "text",
            bindField: item.bindField || "",
            baseText
          }));
          this.fabricCanvas.add(obj);
        } else if (item.type === "image" && (item.barcodeValue || item.src || item.customType === "barcode")) {
          const baseValue = (_d = (_c = item.baseBarcodeValue) != null ? _c : item.barcodeValue) != null ? _d : "";
          const url = this._barcodeDataURL(
            baseValue || " ",
            item.format || "CODE128",
            this._layoutValuePx(item, "barWidth", 2),
            this._layoutValuePx(item, "barHeight", 60),
            !!item.displayValue,
            {
              mt: this._layoutValuePx(item, "marginTop", 0),
              mr: this._layoutValuePx(item, "marginRight", 0),
              mb: this._layoutValuePx(item, "marginBottom", 0),
              ml: this._layoutValuePx(item, "marginLeft", 0)
            }
          );
          const img = await this._loadFabricImage(url);
          if (!img)
            continue;
          img.set(Object.assign({}, item, {
            left: this._layoutValuePx(item, "left", item.left || 0),
            top: this._layoutValuePx(item, "top", item.top || 0),
            customType: "barcode",
            bindField: item.bindField || "",
            barcodeValue: baseValue,
            baseBarcodeValue: baseValue,
            barWidth: this._layoutValuePx(item, "barWidth", 2),
            barHeight: this._layoutValuePx(item, "barHeight", 60),
            marginTop: this._layoutValuePx(item, "marginTop", 0),
            marginRight: this._layoutValuePx(item, "marginRight", 0),
            marginBottom: this._layoutValuePx(item, "marginBottom", 0),
            marginLeft: this._layoutValuePx(item, "marginLeft", 0)
          }));
          img.boxWidth = this._layoutValuePx(item, "boxWidth", item.width || img.getScaledWidth());
          img.boxHeight = this._layoutValuePx(item, "boxHeight", item.height || img.getScaledHeight());
          this._fitImageToBox(img, img.boxWidth, img.boxHeight);
          img._barcodeSignature = this._barcodeSignature(img);
          this.fabricCanvas.add(img);
        }
      }
      this.fabricCanvas.requestRenderAll();
      this._suspendPreview = false;
      await this.preview();
    }
    _serializeObject(obj) {
      var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      const left = toNumber(obj.left, 0);
      const top = toNumber(obj.top, 0);
      const width = toNumber((_c = (_b = (_a2 = obj.getScaledWidth) == null ? void 0 : _a2.call(obj)) != null ? _b : obj.width) != null ? _c : 0, 0);
      const height = toNumber((_f = (_e = (_d = obj.getScaledHeight) == null ? void 0 : _d.call(obj)) != null ? _e : obj.height) != null ? _f : 0, 0);
      const base = {
        type: obj.type,
        left,
        top,
        width,
        height,
        left_mm: this._pxToMm(left),
        top_mm: this._pxToMm(top),
        width_mm: this._pxToMm(width),
        height_mm: this._pxToMm(height),
        bindField: obj.bindField || ""
      };
      if ((_g = obj.isType) == null ? void 0 : _g.call(obj, "textbox")) {
        const baseText = (_i = (_h = obj.baseText) != null ? _h : obj.text) != null ? _i : "";
        const fontSize = toNumber(obj.fontSize, 12);
        return Object.assign(base, {
          text: baseText,
          baseText,
          fontSize,
          font_size_mm: this._pxToMm(fontSize),
          fontFamily: obj.fontFamily || "Times New Roman",
          fontWeight: obj.fontWeight || "normal",
          fontStyle: obj.fontStyle || "normal",
          fill: obj.fill || "#000000",
          textAlign: obj.textAlign || "left",
          padding: obj.padding,
          padding_mm: this._pxToMm(obj.padding || 0),
          customType: "text"
        });
      }
      if (obj.customType === "barcode") {
        const baseValue = (_k = (_j = obj.baseBarcodeValue) != null ? _j : obj.barcodeValue) != null ? _k : "";
        const barWidth = toNumber(obj.barWidth, 2);
        const barHeight = toNumber(obj.barHeight, 60);
        const marginTop = toNumber(obj.marginTop, 0);
        const marginRight = toNumber(obj.marginRight, 0);
        const marginBottom = toNumber(obj.marginBottom, 0);
        const marginLeft = toNumber(obj.marginLeft, 0);
        const boxWidth = toNumber(obj.boxWidth || obj.getScaledWidth(), width);
        const boxHeight = toNumber(obj.boxHeight || obj.getScaledHeight(), height);
        return Object.assign(base, {
          src: obj.toDataURL(),
          barcodeValue: baseValue,
          baseBarcodeValue: baseValue,
          format: obj.format || "CODE128",
          barWidth,
          bar_width_mm: this._pxToMm(barWidth),
          barHeight,
          bar_height_mm: this._pxToMm(barHeight),
          displayValue: !!obj.displayValue,
          marginTop,
          margin_top_mm: this._pxToMm(marginTop),
          marginRight,
          margin_right_mm: this._pxToMm(marginRight),
          marginBottom,
          margin_bottom_mm: this._pxToMm(marginBottom),
          marginLeft,
          margin_left_mm: this._pxToMm(marginLeft),
          boxWidth,
          box_width_mm: this._pxToMm(boxWidth),
          boxHeight,
          box_height_mm: this._pxToMm(boxHeight),
          customType: "barcode",
          type: "image"
        });
      }
      return base;
    }
    serializeObjects() {
      if (!this.fabricCanvas)
        return [];
      return this.fabricCanvas.getObjects().map((obj) => this._serializeObject(obj));
    }
    async preview() {
      if (!this.fabricCanvas)
        return;
      const ticket = ++this._previewTicket;
      const imageData = await this._renderPreviewImageData(Math.max(1, window.devicePixelRatio || 1));
      if (ticket !== this._previewTicket)
        return;
      this._syncPreviewPane(imageData);
    }
    _buildLabelMarkup(objects = ((_a2) => (_a2 = this.fabricCanvas) == null ? void 0 : _a2.getObjects())() || [], data = this.page.resolveDoc() || {}) {
      var _a3, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      const parts = [];
      for (const obj of objects) {
        const leftMM = this._pxToMm(obj.left || 0).toFixed(3);
        const topMM = this._pxToMm(obj.top || 0).toFixed(3);
        const widthPx = (_c = (_b = (_a3 = obj.getScaledWidth) == null ? void 0 : _a3.call(obj)) != null ? _b : obj.width) != null ? _c : 0;
        const heightPx = (_f = (_e = (_d = obj.getScaledHeight) == null ? void 0 : _d.call(obj)) != null ? _e : obj.height) != null ? _f : 0;
        const widthMM = this._pxToMm(widthPx).toFixed(3);
        const heightMM = this._pxToMm(heightPx).toFixed(3);
        if ((_g = obj.isType) == null ? void 0 : _g.call(obj, "textbox")) {
          const baseText = (_i = (_h = obj.baseText) != null ? _h : obj.text) != null ? _i : "";
          const resolved = obj.bindField ? this._getByPath(data, obj.bindField) : void 0;
          const text = escapeHtml(resolved === void 0 || resolved === null ? baseText : this._toStr(resolved));
          const fontSizeMM = this._pxToMm(obj.fontSize || 12).toFixed(3);
          const fontFamily = escapeHtml(obj.fontFamily || "Times New Roman");
          const fontWeight = escapeHtml(obj.fontWeight || "normal");
          const fontStyle = escapeHtml(obj.fontStyle || "normal");
          const fill = escapeHtml(obj.fill || "#000000");
          const paddingMM = this._pxToMm(obj.padding || 0).toFixed(3);
          parts.push(
            `<div class="bs-print-item bs-print-text" style="left:${leftMM}mm;top:${topMM}mm;width:${widthMM}mm;height:${heightMM}mm;padding:${paddingMM}mm;box-sizing:border-box;overflow:hidden;font-size:${fontSizeMM}mm;font-family:${fontFamily};font-weight:${fontWeight};font-style:${fontStyle};color:${fill};text-align:${obj.textAlign || "left"};">${text}</div>`
          );
        } else if (obj.customType === "barcode") {
          const baseValue = (_k = (_j = obj.baseBarcodeValue) != null ? _j : obj.barcodeValue) != null ? _k : "";
          const resolved = obj.bindField ? this._getByPath(data, obj.bindField) : void 0;
          const value = escapeHtml(resolved === void 0 || resolved === null ? baseValue : this._toStr(resolved) || " ");
          const format = obj.format || "CODE128";
          const barWidth = Math.max(1, Math.round(toNumber(obj.barWidth, 2)));
          const barHeight = Math.max(1, Math.round(toNumber(obj.barHeight, 60)));
          const mt = this._pxToMm(obj.marginTop || 0).toFixed(3);
          const mr = this._pxToMm(obj.marginRight || 0).toFixed(3);
          const mb = this._pxToMm(obj.marginBottom || 0).toFixed(3);
          const ml = this._pxToMm(obj.marginLeft || 0).toFixed(3);
          const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          try {
            JsBarcode(svg, value || " ", {
              format,
              width: barWidth,
              height: barHeight,
              displayValue: !!obj.displayValue
            });
          } catch (e) {
          }
          svg.setAttribute("width", "100%");
          svg.setAttribute("height", "100%");
          parts.push(
            `<div class="bs-print-item bs-print-barcode" style="left:${leftMM}mm;top:${topMM}mm;width:${widthMM}mm;height:${heightMM}mm;padding:${mt}mm ${mr}mm ${mb}mm ${ml}mm;box-sizing:border-box;overflow:hidden;">${svg.outerHTML}</div>`
          );
        }
      }
      return parts.join("");
    }
    _buildSheetMarkup(data = this.page.resolveDoc() || {}) {
      const widthMM = this.pageWidthMM;
      const heightMM = this.pageHeightMM;
      return `<div class="bs-print-sheet" style="width:${widthMM}mm;height:${heightMM}mm;">${this._buildLabelMarkup(void 0, data)}</div>`;
    }
    _buildPreviewMarkup(imageData) {
      const widthMM = this.pageWidthMM;
      const heightMM = this.pageHeightMM;
      return `
      <div class="bs-print-sheet bs-preview-sheet" style="width:${widthMM}mm;height:${heightMM}mm;">
        <img class="bs-preview-image" src="${imageData}" alt="Label preview" />
      </div>
    `;
    }
    _syncPreviewPane(imageData) {
      const preview = $("#bs-preview");
      if (!preview.length || !this.fabricCanvas)
        return;
      preview.html(this._buildPreviewMarkup(imageData));
    }
    _resolvePrintPayload(copies, templateName) {
      const data = this.page.resolveDoc() || {};
      const parentDoctype = data.doctype || this.page.doctype;
      const parentName = data.name || this.page.docname;
      const childField = data.__child_field || null;
      const childRows = [];
      if (childField && Array.isArray(data[childField])) {
        for (const row of data[childField]) {
          if (row == null ? void 0 : row.name)
            childRows.push(row.name);
        }
      }
      return {
        parent_doctype: parentDoctype,
        parent_name: parentName,
        child_field: childField,
        child_row_names: JSON.stringify(childRows),
        copies,
        template_name: templateName || null
      };
    }
    async _logPrint(copies, templateName) {
      const payload = this._resolvePrintPayload(copies, templateName);
      try {
        await frappe.call({
          method: "mysys_barcode.api.record_barcode_print",
          args: payload
        });
      } catch (error) {
        console.warn("print log failed", error);
      }
    }
    async _printAsHiDpiImage(copies, dpi, templateName) {
      const multiplier = Math.max(1, dpi / 96);
      const imageData = await this._renderPreviewImageData(multiplier);
      const widthMM = this.pageWidthMM;
      const heightMM = this.pageHeightMM;
      await this._logPrint(copies, templateName);
      const images = Array.from({ length: copies }, () => `<img src="${imageData}" />`).join("");
      const html = `<!doctype html><html><head><meta charset="utf-8"><style>
      @page{size:${widthMM}mm ${heightMM}mm;margin:0}
      html,body{margin:0;padding:0}
      body{display:block}
      img{display:block;width:${widthMM}mm;height:${heightMM}mm;image-rendering:crisp-edges;image-rendering:-webkit-optimize-contrast;page-break-after:always;break-after:page}
      img:last-child{page-break-after:auto;break-after:auto}
    </style></head><body>${images}</body></html>`;
      const win = window.open("about:blank");
      if (!win) {
        frappe.msgprint(__("Popup blocked. Allow popups for printing."));
        return;
      }
      win.document.write(html);
      win.document.close();
      win.focus();
      win.print();
    }
    async _printAsVectorHTML(copies, templateName) {
      const widthMM = this.pageWidthMM;
      const heightMM = this.pageHeightMM;
      await this._logPrint(copies, templateName);
      const label = this._buildSheetMarkup();
      const content = Array.from({ length: copies }, () => label).join("");
      const html = `<!doctype html><html><head><meta charset="utf-8"><style>
      @page{size:${widthMM}mm ${heightMM}mm;margin:0}
      html,body{margin:0;padding:0}
      .sheet{display:block}
      .bs-print-sheet{position:relative;break-after:page;page-break-after:always;overflow:hidden;box-sizing:border-box}
      .bs-print-sheet:last-child{break-after:auto;page-break-after:auto}
      .bs-print-item{position:absolute;box-sizing:border-box}
      .bs-print-text{line-height:1;white-space:nowrap}
      svg{shape-rendering:crispEdges}
    </style></head><body><div class="sheet">${content}</div></body></html>`;
      const win = window.open("about:blank");
      if (!win) {
        frappe.msgprint(__("Popup blocked. Allow popups for printing."));
        return;
      }
      win.document.write(html);
      win.document.close();
      win.focus();
      win.print();
    }
    async print({ mode = "html", copies = 1, dpi = 300, templateName = null } = {}) {
      if (!this.fabricCanvas) {
        frappe.msgprint(__("Canvas is not ready."));
        return;
      }
      await this.preview();
      const outputMode = String(mode || "html").toLowerCase();
      if (outputMode === "image") {
        return this._printAsHiDpiImage(copies, dpi, templateName);
      }
      return this._printAsVectorHTML(copies, templateName);
    }
    _makeFieldRow(label, name, value, type = "text", extra = {}) {
      const attrs = [
        `class="form-control form-control-sm"`,
        `name="${escapeHtml(name)}"`,
        `type="${escapeHtml(type)}"`,
        `value="${escapeHtml(value != null ? value : "")}"`
      ];
      if (extra.min !== void 0)
        attrs.push(`min="${escapeHtml(extra.min)}"`);
      if (extra.max !== void 0)
        attrs.push(`max="${escapeHtml(extra.max)}"`);
      if (extra.step !== void 0)
        attrs.push(`step="${escapeHtml(extra.step)}"`);
      if (extra.placeholder)
        attrs.push(`placeholder="${escapeHtml(extra.placeholder)}"`);
      const readonly = extra.readonly ? "readonly" : "";
      return $(`
      <div class="form-group mb-1">
        <label class="small text-muted">${escapeHtml(label)}</label>
        <input ${attrs.join(" ")} ${readonly} />
      </div>
    `);
    }
    _makeSelectRow(label, name, value, options = []) {
      const opts = options.map((option) => `<option value="${escapeHtml(option.value)}"${option.value === value ? " selected" : ""}>${escapeHtml(option.label)}</option>`).join("");
      return $(`
      <div class="form-group mb-1">
        <label class="small text-muted">${escapeHtml(label)}</label>
        <select class="form-control form-control-sm" name="${escapeHtml(name)}">${opts}</select>
      </div>
    `);
    }
    renderProps(obj) {
      var _a2, _b, _c, _d, _e;
      const $panel = $("#bs-props").empty();
      if (!obj) {
        $panel.html("<em>Select an object</em>");
        return;
      }
      const unit = this.page.getDimensionUnit();
      const unitLabel = this.page.getDimensionLabel(unit);
      const unitStep = this.page.getDimensionStep(unit);
      const unitDigits = this.page.getDimensionConfig(unit).digits;
      const pxToUnit = (px) => this.page.mmToUnit(this._pxToMm(px), unit);
      const unitToPx = (value) => this._mmToPx(this.page.unitToMm(value, unit));
      const bindRow = () => $(`
      <div class="form-group mb-1">
        <label class="small text-muted">Bind Path</label>
        <input
          class="form-control form-control-sm"
          name="bindField"
          value="${escapeHtml(obj.bindField || "")}"
          placeholder="e.g. item_code or items[0].item_name or items[].rate"
        />
        <small class="text-muted">Supports child paths. Leave empty for static.</small>
      </div>
    `);
      $panel.append(this._makeFieldRow(`Left (${unitLabel})`, "left", pxToUnit(obj.left || 0).toFixed(unitDigits), "number", { min: 0, step: unitStep }));
      $panel.append(this._makeFieldRow(`Top (${unitLabel})`, "top", pxToUnit(obj.top || 0).toFixed(unitDigits), "number", { min: 0, step: unitStep }));
      $panel.append(bindRow());
      $panel.append(this._makeFieldRow(`Width (${unitLabel})`, "width", this.page.mmToUnit(this._currentObjectWidthMm(obj), unit).toFixed(unitDigits), "number", { readonly: true }));
      $panel.append(this._makeFieldRow(`Height (${unitLabel})`, "height", this.page.mmToUnit(this._currentObjectHeightMm(obj), unit).toFixed(unitDigits), "number", { readonly: true }));
      if ((_a2 = obj.isType) == null ? void 0 : _a2.call(obj, "textbox")) {
        $panel.append(this._makeFieldRow("Text", "text", (_c = (_b = obj.baseText) != null ? _b : obj.text) != null ? _c : "", "text"));
        $panel.append(this._makeFieldRow(`Font Size (${unitLabel})`, "fontSize", pxToUnit(obj.fontSize || 12).toFixed(unitDigits), "number", { min: 0.1, step: unitStep }));
        $panel.append(this._makeSelectRow("Text Align", "textAlign", obj.textAlign || "left", [
          { value: "left", label: "left" },
          { value: "center", label: "center" },
          { value: "right", label: "right" },
          { value: "justify", label: "justify" }
        ]));
      } else if (obj.customType === "barcode") {
        $panel.append(this._makeFieldRow("Value", "barcodeValue", (_e = (_d = obj.baseBarcodeValue) != null ? _d : obj.barcodeValue) != null ? _e : "", "text"));
        $panel.append(this._makeFieldRow("Format", "format", obj.format || "CODE128", "text"));
        $panel.append(this._makeFieldRow(`Bar Width (${unitLabel})`, "barWidth", pxToUnit(obj.barWidth || 2).toFixed(unitDigits), "number", { min: 0.1, step: unitStep }));
        $panel.append(this._makeFieldRow(`Bar Height (${unitLabel})`, "barHeight", pxToUnit(obj.barHeight || 60).toFixed(unitDigits), "number", { min: 0.1, step: unitStep }));
        $panel.append(this._makeFieldRow(`Margin Top (${unitLabel})`, "marginTop", pxToUnit(obj.marginTop || 0).toFixed(unitDigits), "number", { min: 0, step: unitStep }));
        $panel.append(this._makeFieldRow(`Margin Right (${unitLabel})`, "marginRight", pxToUnit(obj.marginRight || 0).toFixed(unitDigits), "number", { min: 0, step: unitStep }));
        $panel.append(this._makeFieldRow(`Margin Bottom (${unitLabel})`, "marginBottom", pxToUnit(obj.marginBottom || 0).toFixed(unitDigits), "number", { min: 0, step: unitStep }));
        $panel.append(this._makeFieldRow(`Margin Left (${unitLabel})`, "marginLeft", pxToUnit(obj.marginLeft || 0).toFixed(unitDigits), "number", { min: 0, step: unitStep }));
        $panel.append(this._makeSelectRow("Display Value", "displayValue", obj.displayValue ? "1" : "0", [
          { value: "0", label: "No" },
          { value: "1", label: "Yes" }
        ]));
      }
      const updateObject = (name, rawValue) => {
        var _a3, _b2, _c2;
        let value = rawValue;
        if (name === "displayValue")
          value = rawValue === "1";
        const unitNames = ["left", "top", "fontSize", "barWidth", "barHeight", "marginTop", "marginRight", "marginBottom", "marginLeft"];
        if (name !== "displayValue" && rawValue === "" && unitNames.includes(name)) {
          value = 0;
        }
        if (unitNames.includes(name)) {
          const unitValue = Number.isFinite(Number.parseFloat(value)) ? Number.parseFloat(value) : 0;
          value = unitToPx(unitValue);
        }
        if (name === "width" || name === "height") {
          return;
        }
        obj.set(name, value);
        if (name === "text") {
          obj.baseText = value;
        }
        if (name === "barcodeValue") {
          obj.baseBarcodeValue = value;
        }
        if (name === "bindField" && !value) {
          if ((_a3 = obj.isType) == null ? void 0 : _a3.call(obj, "textbox")) {
            obj.set("text", (_b2 = obj.baseText) != null ? _b2 : "");
          } else if (obj.customType === "barcode") {
            obj.set("barcodeValue", (_c2 = obj.baseBarcodeValue) != null ? _c2 : "");
            obj._barcodeSignature = null;
            void this._refreshBarcodeObject(obj);
          }
        }
        if (obj.customType === "barcode" && [
          "barcodeValue",
          "barWidth",
          "barHeight",
          "format",
          "displayValue",
          "marginTop",
          "marginRight",
          "marginBottom",
          "marginLeft"
        ].includes(name)) {
          obj._barcodeSignature = null;
          void this._refreshBarcodeObject(obj);
        }
        obj.setCoords();
        this._keepInsideCanvas(obj);
        this.fabricCanvas.requestRenderAll();
        if (!this._suspendPreview)
          this.previewDebounced();
      };
      $panel.find("input,select").on("input change", (event) => {
        updateObject(event.target.name, event.target.value);
      });
    }
  };

  // ../mysys_barcode/mysys_barcode/public/js/barcode_studio/page.js
  var _a;
  if (!window.__barcode_studio_route_bound__ && ((_a = frappe.router) == null ? void 0 : _a.on)) {
    window.__barcode_studio_route_bound__ = true;
    frappe.router.on("change", () => {
      var _a2, _b;
      const route = frappe.get_route();
      if (route[0] === "barcode-studio" && window.__barcode_studio__) {
        (_b = (_a2 = window.__barcode_studio__).onRoute) == null ? void 0 : _b.call(_a2);
      }
    });
  }
  var BarcodeStudioPage = class {
    constructor(wrapper) {
      this.wrapper = wrapper;
      const route = getRouteState();
      this.doctype = route.doctype;
      this.docname = route.docname;
      this.templateName = route.templateName;
      this.pageWidthMM = BARCODE_STUDIO_DEFAULT_WIDTH_MM;
      this.pageHeightMM = BARCODE_STUDIO_DEFAULT_HEIGHT_MM;
      this.scale = 1;
      this.snapMM = 1;
      this.gridVisible = false;
      this.meta = null;
      this.fields = [];
      this.childFieldGroups = {};
      this.templateDesignFields = [];
      this.templateSourceDoctype = "";
      this.doc = null;
      this.docFromRoute = normalizeCtx(this._parseCtxFromRoute() || this._parseCtxFromRouteOptions());
      this.state = new BarcodeStudioStateStore();
      this.dimensionUnit = this.state.get("unit", BARCODE_STUDIO_DEFAULT_UNIT);
      this._loadToken = 0;
      this.canvas = new BarcodeStudioCanvasController(this);
      this.canvasClearButton = null;
      this.initPage();
      this.bindUi();
      this.applyStoredUiState();
      void this.bootstrap();
    }
    getDimensionUnit() {
      return BARCODE_STUDIO_DIMENSION_UNITS[this.dimensionUnit] ? this.dimensionUnit : BARCODE_STUDIO_DEFAULT_UNIT;
    }
    getDimensionConfig(unit = this.getDimensionUnit()) {
      return BARCODE_STUDIO_DIMENSION_UNITS[unit] || BARCODE_STUDIO_DIMENSION_UNITS[BARCODE_STUDIO_DEFAULT_UNIT];
    }
    mmToUnit(mm, unit = this.getDimensionUnit()) {
      const config = this.getDimensionConfig(unit);
      return toNumber(mm, 0) / config.factor;
    }
    unitToMm(value, unit = this.getDimensionUnit()) {
      const config = this.getDimensionConfig(unit);
      return toNumber(value, 0) * config.factor;
    }
    formatDimension(mm, unit = this.getDimensionUnit()) {
      const config = this.getDimensionConfig(unit);
      return this.mmToUnit(mm, unit).toFixed(config.digits);
    }
    getDimensionLabel(unit = this.getDimensionUnit()) {
      return this.getDimensionConfig(unit).label;
    }
    getDimensionStep(unit = this.getDimensionUnit()) {
      return this.getDimensionConfig(unit).step;
    }
    refreshDimensionControls() {
      const unit = this.getDimensionUnit();
      const widthValue = this.formatDimension(this.pageWidthMM, unit);
      const heightValue = this.formatDimension(this.pageHeightMM, unit);
      $("#bs-unit").val(unit);
      $("#bs-w").val(widthValue);
      $("#bs-h").val(heightValue);
      $("#bs-w, #bs-h").attr("step", this.getDimensionStep(unit));
      $("#bs-size-label").text(`${widthValue} \xD7 ${heightValue} ${this.getDimensionLabel(unit)}`);
    }
    setDimensionUnit(unit, { persist = true, refresh = true } = {}) {
      const next = BARCODE_STUDIO_DIMENSION_UNITS[unit] ? unit : BARCODE_STUDIO_DEFAULT_UNIT;
      this.dimensionUnit = next;
      if (persist) {
        this.state.set({ unit: next });
      }
      if (refresh) {
        this.refreshDimensionControls();
        this.refreshActiveProps();
      }
      return next;
    }
    refreshActiveProps() {
      var _a2, _b, _c, _d, _e;
      const active = ((_c = (_b = (_a2 = this.canvas) == null ? void 0 : _a2.fabricCanvas) == null ? void 0 : _b.getActiveObject) == null ? void 0 : _c.call(_b)) || null;
      (_e = (_d = this.canvas) == null ? void 0 : _d.renderProps) == null ? void 0 : _e.call(_d, active);
    }
    destroy() {
      var _a2, _b;
      this._loadToken += 1;
      (_b = (_a2 = this.canvas) == null ? void 0 : _a2.destroy) == null ? void 0 : _b.call(_a2);
    }
    resolveDoc() {
      return this.docFromRoute || this.doc || null;
    }
    _parseCtxFromRoute() {
      try {
        const sources = [window.location.hash || "", window.location.search || ""];
        for (const source of sources) {
          const qIndex = source.indexOf("?");
          if (qIndex === -1)
            continue;
          const params = new URLSearchParams(source.slice(qIndex + 1));
          if (!params.has("ctx"))
            continue;
          const raw = decodeURIComponent(params.get("ctx") || "");
          try {
            return JSON.parse(raw);
          } catch (e) {
            try {
              return JSON.parse(atob(raw));
            } catch (e2) {
              continue;
            }
          }
        }
      } catch (e) {
        return null;
      }
      return null;
    }
    _parseCtxFromRouteOptions() {
      try {
        const routeOptions = frappe.route_options || {};
        if (!routeOptions.ctx)
          return null;
        if (typeof routeOptions.ctx === "string") {
          try {
            return JSON.parse(routeOptions.ctx);
          } catch (e) {
            return null;
          }
        }
        if (typeof routeOptions.ctx === "object")
          return routeOptions.ctx;
        return null;
      } catch (e) {
        return null;
      }
    }
    initPage() {
      var _a2;
      this.page = frappe.ui.make_app_page({
        parent: this.wrapper,
        title: "Barcode Studio",
        single_column: true
      });
      const ctx = {
        doctype: this.doctype || "Item",
        docname: this.docname || "",
        width_mm: this.pageWidthMM,
        height_mm: this.pageHeightMM
      };
      const tplName = "barcode_studio";
      const tplSrc = (_a2 = frappe.templates) == null ? void 0 : _a2[tplName];
      const html = tplSrc ? frappe.render_template(tplSrc, ctx) : "<div class='alert alert-danger m-3'>Template not built. Run <code>bench build</code>.</div>";
      this.page.wrapper.find(".page-body").html(html);
      $("#bs-dt").val(this.doctype);
      $("#bs-name").val(this.docname);
      this.refreshDimensionControls();
      this.canvas.init();
      this.canvas.setPageSize(this.pageWidthMM, this.pageHeightMM, { persist: false });
      this.canvas.setZoom(1, { persist: false });
    }
    bindUi() {
      var _a2;
      $("#bs-top-tabs .nav-link").on("click", function(event) {
        event.preventDefault();
        $("#bs-top-tabs .nav-link").removeClass("active");
        $(this).addClass("active");
        const target = $(this).attr("href");
        $(".tab-pane").removeClass("show active");
        $(target).addClass("show active");
      });
      this._bindPreviewSplitter();
      $("#bs-toggle-fields").on("click", () => {
        const body = $("#bs-fields-box .body");
        const hidden = body.is(":visible");
        body.toggle(!hidden);
        $("#bs-toggle-fields").text(hidden ? "Show" : "Hide");
      });
      $("#bs-toggle-props").on("click", () => {
        const body = $("#bs-props-box .body");
        const hidden = body.is(":visible");
        body.toggle(!hidden);
        $("#bs-toggle-props").text(hidden ? "Show" : "Hide");
      });
      $("#bs-field-search").on("input", (event) => {
        this.buildFieldPalette(event.target.value || "");
      });
      $("#bs-fields-collapse-toggle").on("click", () => {
        const uiKey = "bs_field_groups";
        const stored = safeJsonParse(localStorage.getItem(uiKey), {});
        const groups = $(".bs-field-group[data-ct]");
        const anyOpen = groups.toArray().some((el) => el.classList.contains("open"));
        groups.each((_, el) => {
          const ct = el.getAttribute("data-ct");
          if (anyOpen)
            el.classList.remove("open");
          else
            el.classList.add("open");
          $(el).find(".fg-toggle").text(el.classList.contains("open") ? "\u2212" : "+");
          stored[ct] = el.classList.contains("open");
        });
        localStorage.setItem(uiKey, JSON.stringify(stored));
        $("#bs-fields-collapse-toggle").text(anyOpen ? "Expand All" : "Collapse All");
      });
      $("#bs-apply").on("click", () => this.applyPage());
      $("#bs-reload").on("click", () => void this.bootstrap());
      $("#bs-print").on("click", () => void this.doPrint());
      $("#bs-save").on("click", () => this.saveTemplateDialog());
      $("#bs-add-text").on("click", () => this.canvas.addComponent("text"));
      $("#bs-add-barcode").on("click", () => this.canvas.addComponent("barcode"));
      $("#bs-unit").on("change", (event) => this.setDimensionUnit(event.target.value, { persist: true, refresh: true }));
      $("#bs-toggle-grid").on("click", () => this.toggleGrid());
      $("#bs-snap").on("change", (event) => this.canvas.setSnap(event.target.value || 1, { persist: true }));
      $("#bs-dark").on("click", () => this.toggleTheme());
      $("#bs-fullscreen").on("click", () => this.toggleFullscreen());
      $("#bs-clear").on("click", () => this.canvas.clearCanvas());
      this.canvasClearButton = $("#bs-clear");
      $("#bs-dt, #bs-name").on("change input", ((_a2 = frappe.utils) == null ? void 0 : _a2.debounce(() => {
        void this.bootstrap();
      }, 300)) || (() => void this.bootstrap()));
      $("#bs-template").on("change", (event) => {
        const templateName = event.target.value || "";
        frappe.set_route("barcode-studio", this.doctype, this.docname || "", templateName || "");
      });
      this.page.wrapper.on("click", ".bs-clear-value", () => this.canvas.clearActiveValue());
      this.page.wrapper.on("click", "[data-align]", (event) => {
        this.canvas.alignSelected(event.currentTarget.getAttribute("data-align"));
      });
      this.page.wrapper.on("click", "[data-textalign]", (event) => {
        var _a3, _b;
        const obj = (_a3 = this.canvas.fabricCanvas) == null ? void 0 : _a3.getActiveObject();
        if ((_b = obj == null ? void 0 : obj.isType) == null ? void 0 : _b.call(obj, "textbox")) {
          obj.set("textAlign", event.currentTarget.getAttribute("data-textalign"));
          obj.setCoords();
          this.canvas.fabricCanvas.requestRenderAll();
          if (!this.canvas._suspendPreview)
            this.canvas.previewDebounced();
        }
      });
    }
    _bindPreviewSplitter() {
      const previewPane = document.getElementById("bs-preview-pane");
      const splitter = document.getElementById("bs-splitter");
      if (!previewPane || !splitter)
        return;
      const stored = safeJsonParse(localStorage.getItem(BARCODE_STUDIO_UI_KEY), {});
      if (stored.preview_h) {
        previewPane.style.height = stored.preview_h;
      }
      let startY = 0;
      let startHeight = 0;
      const onMove = (event) => {
        const delta = event.clientY - startY;
        const nextHeight = clamp(startHeight + delta, 120, Math.floor(window.innerHeight * 0.6));
        previewPane.style.height = `${nextHeight}px`;
        this.state.set({ preview_h: previewPane.style.height });
      };
      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };
      splitter.addEventListener("mousedown", (event) => {
        startY = event.clientY;
        startHeight = previewPane.offsetHeight;
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
      });
    }
    applyStoredUiState() {
      const dark = !!this.state.get("dark", false);
      const grid = !!this.state.get("grid", false);
      const snap = this.state.get("snap", 1);
      const unit = this.state.get("unit", BARCODE_STUDIO_DEFAULT_UNIT);
      this.toggleTheme(dark, { persist: false });
      this.setDimensionUnit(unit, { persist: false, refresh: true });
      this.canvas.setSnap(snap, { persist: false });
      this.canvas.toggleGrid(grid, { persist: false });
      $("#bs-snap-label").text(`${this.canvas.snapMM}mm`);
    }
    toggleTheme(force, { persist = true } = {}) {
      const enabled = typeof force === "boolean" ? force : !document.body.classList.contains("dark");
      document.body.classList.toggle("dark", enabled);
      $("#bs-dark").toggleClass("active", enabled);
      if (persist) {
        this.state.set({ dark: enabled });
      }
      return enabled;
    }
    toggleGrid(force) {
      return this.canvas.toggleGrid(force, { persist: true });
    }
    toggleFullscreen() {
      var _a2, _b;
      const element = this.page.wrapper.get(0);
      if (!document.fullscreenElement)
        (_a2 = element.requestFullscreen) == null ? void 0 : _a2.call(element);
      else
        (_b = document.exitFullscreen) == null ? void 0 : _b.call(document);
    }
    async bootstrap() {
      const token = ++this._loadToken;
      $("#bs-dt").val(this.doctype);
      $("#bs-name").val(this.docname);
      this.templateDesignFields = [];
      this.templateSourceDoctype = "";
      await this.loadMetaAndDoc();
      if (token !== this._loadToken)
        return;
      await this.fillTemplates();
      if (token !== this._loadToken)
        return;
      if (this.templateName) {
        await this.loadTemplateByName(this.templateName);
      } else {
        this.canvas.setPageSize(this.pageWidthMM, this.pageHeightMM, { persist: false });
        await this.canvas.preview();
      }
      this.buildFieldPalette();
      if (token !== this._loadToken)
        return;
      const copies = this.resolveCopiesFromData();
      if (copies)
        $("#bs-copies").val(copies);
    }
    async onRoute() {
      const route = getRouteState();
      const ctx = normalizeCtx(this._parseCtxFromRoute() || this._parseCtxFromRouteOptions());
      const changed = route.doctype !== this.doctype || route.docname !== this.docname || route.templateName !== this.templateName || !!ctx;
      if (!changed)
        return;
      this.doctype = route.doctype;
      this.docname = route.docname;
      this.templateName = route.templateName;
      this.docFromRoute = ctx;
      $("#bs-dt").val(this.doctype);
      $("#bs-name").val(this.docname);
      void this.bootstrap();
    }
    async _withDoctype(doctype) {
      return new Promise((resolve) => {
        frappe.model.with_doctype(doctype, () => resolve());
      });
    }
    async loadMetaAndDoc() {
      this.doctype = ($("#bs-dt").val() || this.doctype || "Item").trim();
      this.docname = ($("#bs-name").val() || this.docname || "").trim();
      this.fields = [];
      this.childFieldGroups = {};
      try {
        await this._withDoctype(this.doctype);
        this.meta = frappe.get_meta(this.doctype);
        this.fields = (this.meta.fields || []).filter((df) => BARCODE_STUDIO_FIELD_TYPES.has(df.fieldtype)).map((df) => ({
          label: df.label || df.fieldname,
          fieldname: df.fieldname,
          fieldtype: df.fieldtype
        }));
        if (!this.fields.find((field) => field.fieldname === "name")) {
          this.fields.unshift({ label: "name", fieldname: "name", fieldtype: "Data" });
        }
        const childTables = (this.meta.fields || []).filter((df) => df.fieldtype === "Table");
        for (const ct of childTables) {
          if (!ct.options)
            continue;
          await this._withDoctype(ct.options);
          const childMeta = frappe.get_meta(ct.options);
          const childFields = (childMeta.fields || []).filter((df) => BARCODE_STUDIO_FIELD_TYPES.has(df.fieldtype)).map((df) => ({
            label: `${ct.label || ct.fieldname} \u203A ${df.label || df.fieldname}`,
            fieldname: `${ct.fieldname}.${df.fieldname}`,
            fieldname_indexed: `${ct.fieldname}[].${df.fieldname}`,
            fieldtype: df.fieldtype,
            child_table: ct.fieldname
          }));
          this.childFieldGroups[ct.fieldname] = {
            child_dt: ct.options,
            fields: childFields
          };
        }
      } catch (error) {
        console.error("Failed to load meta/doc", error);
        this.meta = null;
      }
      const routeDoc = this.docFromRoute && typeof this.docFromRoute === "object" ? this.docFromRoute : null;
      const canUseRouteDoc = routeDoc && (!routeDoc.doctype || routeDoc.doctype === this.doctype) && (!routeDoc.name || routeDoc.name === this.docname || !this.docname);
      if (canUseRouteDoc) {
        this.doc = routeDoc;
      } else if (this.docname) {
        try {
          const response = await frappe.call({
            method: "frappe.client.get",
            args: { doctype: this.doctype, name: this.docname }
          });
          this.doc = response.message || null;
        } catch (error) {
          console.error("Failed to load document", error);
          this.doc = null;
        }
      } else {
        this.doc = null;
      }
    }
    async fillTemplates() {
      try {
        const response = await frappe.call({
          method: "frappe.client.get_list",
          args: { doctype: "Barcode Template", fields: ["name"], limit_page_length: 200 }
        });
        const select = $("#bs-template").empty().append("<option value=''>-- Template --</option>");
        for (const item of response.message || []) {
          select.append(`<option value="${escapeHtml(item.name)}">${escapeHtml(item.name)}</option>`);
        }
        if (this.templateName)
          select.val(this.templateName);
        return response.message || [];
      } catch (error) {
        console.error("Failed to list templates", error);
        return [];
      }
    }
    buildFieldPalette(searchText = "") {
      const $panel = $("#bs-fields").empty();
      const query = (searchText || "").trim().toLowerCase();
      const uiKey = "bs_field_groups";
      const saved = safeJsonParse(localStorage.getItem(uiKey), {});
      const forceOpen = !!query;
      const makeChip = (label, dataset, pathShown) => {
        const chip = $(`
        <div class="bs-field-chip" draggable="true" title="${escapeHtml(pathShown || dataset.path || "")}">
          <div class="label">${escapeHtml(label || "")}</div>
          <div class="path">${escapeHtml(pathShown || dataset.path || "")}</div>
        </div>
      `);
        chip.on("dragstart", (event) => {
          event.originalEvent.dataTransfer.setData("text/plain", JSON.stringify(dataset));
        });
        if (query) {
          const haystack = [label || "", dataset.path || "", pathShown || ""].join(" ").toLowerCase();
          if (haystack.includes(query))
            chip.addClass("match");
        }
        return chip;
      };
      const makeGroup = (title, groupClass, open, bodyHtml, hasToggle = true) => {
        const group = $(`
        <div class="bs-field-group ${open ? "open" : ""}" ${groupClass ? `data-ct="${escapeHtml(groupClass)}"` : ""}>
          <div class="fg-head">
            <div class="fg-title">${escapeHtml(title)}</div>
            <div class="fg-actions${hasToggle ? "" : " text-muted small"}">
              ${hasToggle ? `<button class="btn btn-xs btn-light fg-toggle" type="button">${open ? "\u2212" : "+"}</button>` : "Fields"}
            </div>
          </div>
          <div class="fg-body"><div class="d-flex flex-wrap"></div></div>
        </div>
      `).appendTo($panel);
        group.find(".fg-body .d-flex").append(bodyHtml);
        if (hasToggle) {
          group.find(".fg-toggle").on("click", (event) => {
            event.stopPropagation();
            group.toggleClass("open");
            group.find(".fg-toggle").text(group.hasClass("open") ? "\u2212" : "+");
            const storedState = safeJsonParse(localStorage.getItem(uiKey), {});
            storedState[groupClass] = group.hasClass("open");
            localStorage.setItem(uiKey, JSON.stringify(storedState));
          });
          group.find(".fg-head").on("click", (event) => {
            if ($(event.target).closest(".fg-actions").length)
              return;
            group.toggleClass("open");
            group.find(".fg-toggle").text(group.hasClass("open") ? "\u2212" : "+");
            const storedState = safeJsonParse(localStorage.getItem(uiKey), {});
            storedState[groupClass] = group.hasClass("open");
            localStorage.setItem(uiKey, JSON.stringify(storedState));
          });
        }
        return group;
      };
      const templateFields = Array.isArray(this.templateDesignFields) ? this.templateDesignFields.filter(Boolean) : [];
      if (templateFields.length) {
        const documentFields = [];
        const childGroups = /* @__PURE__ */ new Map();
        for (const row of templateFields) {
          const scope = row.scope || "Document";
          const label = row.label || row.fieldname || row.bind_path || "";
          const path = row.bind_path || row.path || row.fieldname || "";
          const kind = String(row.fieldtype || "").toLowerCase() === "barcode" ? "barcode" : "text";
          const dataset = {
            path,
            fieldname: row.fieldname || path,
            fieldtype: row.fieldtype || "Data",
            label,
            displayLabel: label,
            scope,
            parent_fieldname: row.parent_fieldname || "",
            child_doctype: row.child_doctype || "",
            kind
          };
          const haystack = [label, path, row.fieldname || "", row.parent_fieldname || "", row.child_doctype || ""].join(" ").toLowerCase();
          if (query && !haystack.includes(query))
            continue;
          if (scope === "Child Table") {
            const groupKey = row.parent_fieldname || row.child_doctype || "child";
            if (!childGroups.has(groupKey)) {
              childGroups.set(groupKey, {
                title: row.child_doctype || row.parent_fieldname || __("Child Table"),
                open: forceOpen || saved[groupKey] === true,
                items: []
              });
            }
            childGroups.get(groupKey).items.push(makeChip(label, dataset, path));
          } else {
            documentFields.push(makeChip(label, dataset, path));
          }
        }
        if (documentFields.length) {
          makeGroup("Document", "", true, documentFields, false);
        }
        for (const [groupKey, groupInfo] of childGroups.entries()) {
          makeGroup(groupInfo.title, groupKey, groupInfo.open, groupInfo.items);
        }
        if (!$panel.children().length) {
          $panel.html("<div class='text-muted'>No fields</div>");
        }
        const anyOpen2 = $(".bs-field-group[data-ct]").toArray().some((el) => el.classList.contains("open"));
        $("#bs-fields-collapse-toggle").text(anyOpen2 ? "Collapse All" : "Expand All");
        return;
      }
      const topWrap = [];
      for (const field of this.fields || []) {
        if (query) {
          const haystack = [field.label || field.fieldname || "", field.fieldname || ""].join(" ").toLowerCase();
          if (!haystack.includes(query))
            continue;
        }
        topWrap.push(makeChip(field.label || field.fieldname, {
          path: field.fieldname,
          fieldname: field.fieldname,
          fieldtype: field.fieldtype,
          displayLabel: field.label || field.fieldname,
          kind: String(field.fieldtype || "").toLowerCase() === "barcode" ? "barcode" : "text"
        }));
      }
      makeGroup("Top-level", "", true, topWrap, false);
      for (const [ct, groupInfo] of Object.entries(this.childFieldGroups || {})) {
        const open = forceOpen || saved[ct] === true;
        const chips = [];
        for (const field of groupInfo.fields || []) {
          if (query) {
            const haystack = [field.label || "", field.fieldname || "", field.fieldname_indexed || ""].join(" ").toLowerCase();
            if (!haystack.includes(query))
              continue;
          }
          chips.push(makeChip(field.label, {
            path: field.fieldname_indexed,
            fieldname: field.fieldname_indexed,
            fieldtype: field.fieldtype,
            is_child: true,
            displayLabel: field.label || field.fieldname_indexed,
            kind: String(field.fieldtype || "").toLowerCase() === "barcode" ? "barcode" : "text"
          }, field.fieldname_indexed));
        }
        makeGroup(`${ct} (Child)`, ct, open, chips);
      }
      if (!$panel.children().length) {
        $panel.html("<div class='text-muted'>No fields</div>");
      }
      const anyOpen = $(".bs-field-group[data-ct]").toArray().some((el) => el.classList.contains("open"));
      $("#bs-fields-collapse-toggle").text(anyOpen ? "Collapse All" : "Expand All");
    }
    applyPage() {
      const unit = this.getDimensionUnit();
      const width = this.unitToMm($("#bs-w").val(), unit);
      const height = this.unitToMm($("#bs-h").val(), unit);
      if (width > 0 && height > 0) {
        this.canvas.setPageSize(width, height, { persist: false });
        void this.canvas.preview();
      }
    }
    resolveCopiesFromData() {
      const data = this.resolveDoc();
      if (!data)
        return null;
      const pick = ["print_qty", "qty_to_print", "quantity", "qty"];
      for (const key of pick) {
        const hit = Object.keys(data).find((candidate) => candidate.toLowerCase() === key);
        if (hit && !Number.isNaN(Number.parseFloat(data[hit]))) {
          const value = Number.parseInt(data[hit], 10);
          if (value > 0)
            return value;
        }
      }
      return null;
    }
    async loadTemplateByName(name) {
      if (!name)
        return false;
      try {
        const response = await frappe.call({
          method: "frappe.client.get",
          args: { doctype: "Barcode Template", name }
        });
        const doc = response.message;
        if (!doc)
          return false;
        this.templateName = doc.name;
        this.templateSourceDoctype = doc.source_doctype || "";
        this.templateDesignFields = Array.isArray(doc.design_fields) ? doc.design_fields : [];
        await this.canvas.loadTemplate(doc);
        $("#bs-template").val(this.templateName);
        return true;
      } catch (error) {
        console.error("Failed to load template", error);
        this.templateSourceDoctype = "";
        this.templateDesignFields = [];
        return false;
      }
    }
    async saveTemplateDialog() {
      const isEdit = !!this.templateName;
      const unit = this.getDimensionUnit();
      const unitLabel = this.getDimensionLabel(unit);
      const dialog = new frappe.ui.Dialog({
        title: __(isEdit ? "Update Template" : "Save Template"),
        fields: [
          {
            fieldname: "template_name",
            fieldtype: "Data",
            label: "Template Name",
            reqd: 1,
            default: this.templateName || "",
            read_only: isEdit ? 1 : 0
          },
          {
            fieldname: "page_width_mm",
            fieldtype: "Float",
            label: `Width (${unitLabel})`,
            reqd: 1,
            default: this.formatDimension(this.canvas.pageWidthMM, unit)
          },
          {
            fieldname: "page_height_mm",
            fieldtype: "Float",
            label: `Height (${unitLabel})`,
            reqd: 1,
            default: this.formatDimension(this.canvas.pageHeightMM, unit)
          }
        ],
        primary_action_label: __(isEdit ? "Update" : "Save"),
        primary_action: async () => {
          const name = dialog.get_value("template_name");
          const pageWidthMM = this.unitToMm(dialog.get_value("page_width_mm"), unit);
          const pageHeightMM = this.unitToMm(dialog.get_value("page_height_mm"), unit);
          const layout = this.canvas.serializeObjects();
          const payload = {
            layout_json: JSON.stringify(layout),
            page_width_mm: pageWidthMM,
            page_height_mm: pageHeightMM,
            width_mm: pageWidthMM,
            height_mm: pageHeightMM,
            source_doctype: this.doctype
          };
          try {
            if (isEdit) {
              await frappe.call({
                method: "frappe.client.set_value",
                args: {
                  doctype: "Barcode Template",
                  name: this.templateName,
                  fieldname: "source_doctype",
                  value: this.doctype
                }
              });
              await frappe.call({
                method: "frappe.client.set_value",
                args: {
                  doctype: "Barcode Template",
                  name: this.templateName,
                  fieldname: "layout_json",
                  value: payload.layout_json
                }
              });
              await frappe.call({
                method: "frappe.client.set_value",
                args: {
                  doctype: "Barcode Template",
                  name: this.templateName,
                  fieldname: "page_width_mm",
                  value: pageWidthMM
                }
              });
              await frappe.call({
                method: "frappe.client.set_value",
                args: {
                  doctype: "Barcode Template",
                  name: this.templateName,
                  fieldname: "page_height_mm",
                  value: pageHeightMM
                }
              });
              await frappe.call({
                method: "frappe.client.set_value",
                args: {
                  doctype: "Barcode Template",
                  name: this.templateName,
                  fieldname: "width_mm",
                  value: pageWidthMM
                }
              });
              await frappe.call({
                method: "frappe.client.set_value",
                args: {
                  doctype: "Barcode Template",
                  name: this.templateName,
                  fieldname: "height_mm",
                  value: pageHeightMM
                }
              });
              dialog.hide();
              frappe.show_alert({ message: __("Template updated"), indicator: "green" });
            } else {
              const response = await frappe.call({
                method: "frappe.client.insert",
                args: {
                  doc: Object.assign({ doctype: "Barcode Template", template_name: name }, payload)
                }
              });
              this.templateName = response.message.name;
              $("#bs-template").val(this.templateName);
              dialog.hide();
              frappe.show_alert({ message: __("Template saved"), indicator: "green" });
              frappe.set_route("barcode-studio", this.doctype, this.docname || "", this.templateName);
            }
          } catch (error) {
            console.error("Failed to save template", error);
            frappe.msgprint(__("Unable to save template."));
          }
        }
      });
      dialog.show();
    }
    async doPrint() {
      const mode = ($("#bs-output").val() || "html").toLowerCase();
      let copies = Number.parseInt($("#bs-copies").val() || "0", 10);
      if (!(copies > 0)) {
        copies = this.resolveCopiesFromData() || 1;
        $("#bs-copies").val(copies);
      }
      const dpi = Number.parseInt($("#bs-dpi").val() || "300", 10);
      return this.canvas.print({ mode, copies, dpi, templateName: this.templateName || null });
    }
  };
  function mountBarcodeStudio(wrapper) {
    var _a2;
    if ((_a2 = window.__barcode_studio__) == null ? void 0 : _a2.destroy) {
      window.__barcode_studio__.destroy();
    }
    window.__barcode_studio__ = new BarcodeStudioPage(wrapper);
    return window.__barcode_studio__;
  }

  // ../mysys_barcode/mysys_barcode/public/js/barcode_studio.bundle.js
  window.mysysBarcodeStudio = window.mysysBarcodeStudio || {};
  window.mysysBarcodeStudio.mountBarcodeStudio = mountBarcodeStudio;
})();
//# sourceMappingURL=barcode_studio.bundle.VC6AM7XT.js.map
