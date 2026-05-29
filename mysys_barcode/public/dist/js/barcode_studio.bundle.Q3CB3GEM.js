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
      this._dropTargets = [];
      this.previewDebounced = ((_a2 = frappe.utils) == null ? void 0 : _a2.debounce(() => {
        void this.preview();
      }, 180)) || (() => void this.preview());
      this._boundKeydown = this._handleKeydown.bind(this);
      this._boundWheel = this._handleWheel.bind(this);
      this._boundDragOver = (ev) => {
        ev.preventDefault();
        if (ev.dataTransfer)
          ev.dataTransfer.dropEffect = "copy";
      };
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
      for (const target of this._dropTargets || []) {
        target.removeEventListener("dragenter", this._boundDragOver);
        target.removeEventListener("dragover", this._boundDragOver);
        target.removeEventListener("drop", this._boundDrop);
      }
      this._dropTargets = [];
      if (this.canvasEl) {
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
      this._bindDropTargets();
      this.canvasEl.addEventListener("wheel", this._boundWheel, { passive: false });
      document.addEventListener("keydown", this._boundKeydown);
    }
    _bindDropTargets() {
      var _a2, _b;
      const targets = [
        this.canvasEl,
        (_a2 = this.fabricCanvas) == null ? void 0 : _a2.upperCanvasEl,
        (_b = this.fabricCanvas) == null ? void 0 : _b.wrapperEl,
        document.getElementById("bs-canvas-wrap")
      ].filter(Boolean);
      this._dropTargets = [...new Set(targets)];
      for (const target of this._dropTargets) {
        target.addEventListener("dragenter", this._boundDragOver);
        target.addEventListener("dragover", this._boundDragOver);
        target.addEventListener("drop", this._boundDrop);
      }
    }
    _focusCanvas() {
      var _a2, _b, _c;
      (_c = (_b = (_a2 = this.fabricCanvas) == null ? void 0 : _a2.upperCanvasEl) == null ? void 0 : _b.focus) == null ? void 0 : _c.call(_b);
    }
    _handleDrop(ev) {
      ev.preventDefault();
      if (!this.fabricCanvas)
        return;
      const raw = ev.dataTransfer.getData("application/x-mysys-barcode-field") || ev.dataTransfer.getData("text/plain");
      const payload = safeJsonParse(raw, {});
      if (!payload || !Object.keys(payload).length)
        return;
      const pointer = this._getDropPointer(ev);
      this._chooseAddAs(payload, pointer.x, pointer.y);
    }
    _getDropPointer(ev) {
      const pointer = this.fabricCanvas.getPointer(ev);
      return {
        x: clamp(pointer.x, 0, Math.max(0, this.fabricCanvas.getWidth() - 20)),
        y: clamp(pointer.y, 0, Math.max(0, this.fabricCanvas.getHeight() - 20))
      };
    }
    _chooseAddAs(payload, x, y) {
      const kind = this._resolveFieldKind(payload, this._normalizeFieldPayload(payload));
      this.addFieldElement(payload, { x, y, kind });
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
    _normalizeFieldPayload(payload = {}, fallbackLabel = "", fallbackBinding = "") {
      const source = typeof payload === "string" ? { binding_key: payload } : payload || {};
      const bindingKey = source.binding_key || source.bindField || source.path || source.fieldname || fallbackBinding || "";
      const childTable = source.child_table_field || source.parent_fieldname || null;
      return {
        label: source.displayLabel || source.label || source.fieldLabel || fallbackLabel || source.fieldname || bindingKey || "",
        fieldname: source.fieldname || bindingKey || "",
        binding_key: bindingKey,
        source_level: source.source_level || source.scope || (childTable ? "Child Table" : "Document"),
        child_table_field: childTable,
        child_doctype: source.child_doctype || null,
        fieldtype: source.fieldtype || "Data",
        sample_value: source.sample_value || source.sampleValue || ""
      };
    }
    _applyElementMetadata(obj, metadata) {
      const clean = this._normalizeFieldPayload(metadata);
      obj.set({
        label: clean.label || "",
        fieldname: clean.fieldname || "",
        binding_key: clean.binding_key || "",
        bindField: clean.binding_key || "",
        source_level: clean.source_level || "Document",
        child_table_field: clean.child_table_field || "",
        child_doctype: clean.child_doctype || "",
        fieldtype: clean.fieldtype || "",
        sample_value: clean.sample_value || ""
      });
    }
    _elementMetadataFromObject(obj) {
      return {
        label: obj.label || "",
        fieldname: obj.fieldname || "",
        binding_key: obj.binding_key || obj.bindField || "",
        source_level: obj.source_level || "Document",
        child_table_field: obj.child_table_field || "",
        child_doctype: obj.child_doctype || "",
        fieldtype: obj.fieldtype || "",
        sample_value: obj.sample_value || ""
      };
    }
    _elementMetadataFromItem(item) {
      return this._normalizeFieldPayload({
        label: item.label || item.baseText || item.text || item.baseBarcodeValue || item.barcodeValue || "",
        fieldname: item.fieldname || item.bindField || "",
        binding_key: item.binding_key || item.bindField || item.fieldname || "",
        source_level: item.source_level || "Document",
        child_table_field: item.child_table_field || "",
        child_doctype: item.child_doctype || "",
        fieldtype: item.fieldtype || "",
        sample_value: item.sample_value || ""
      });
    }
    _designText(metadata, fallback = "Text") {
      return metadata.label || metadata.fieldname || metadata.binding_key || fallback;
    }
    _isBarcodeMetadata(metadata = {}) {
      const fieldtype = String(metadata.fieldtype || "").toLowerCase();
      const fieldname = String(metadata.fieldname || "").toLowerCase();
      const bindingKey = String(metadata.binding_key || metadata.bindField || metadata.path || "").toLowerCase();
      const label = String(metadata.label || metadata.displayLabel || "").toLowerCase();
      const bindingParts = bindingKey.split("_").filter(Boolean);
      return fieldtype === "barcode" || fieldname === "barcode" || label === "barcode" || bindingParts[bindingParts.length - 1] === "barcode";
    }
    _resolveFieldKind(payload = {}, metadata = {}) {
      const explicit = String((payload == null ? void 0 : payload.kind) || "").toLowerCase();
      if (explicit === "barcode" || explicit === "text")
        return explicit;
      return this._isBarcodeMetadata(metadata) ? "barcode" : "text";
    }
    addFieldElement(payload, options = {}) {
      var _a2, _b;
      const metadata = this._normalizeFieldPayload(payload);
      const kind = this._resolveFieldKind(__spreadProps(__spreadValues({}, payload), { kind: options.kind || (payload == null ? void 0 : payload.kind) }), metadata);
      const x = (_a2 = options.x) != null ? _a2 : 20;
      const y = (_b = options.y) != null ? _b : 20;
      if (kind === "barcode") {
        const renderData = this.page.getRenderData();
        const renderedValue = metadata.binding_key ? renderData == null ? void 0 : renderData[metadata.binding_key] : null;
        const value = renderedValue || metadata.sample_value || metadata.binding_key || metadata.label || "123456789012";
        this.addBarcodeAt(x, y, value, metadata);
        return;
      }
      this.addTextAt(x, y, this._designText(metadata), metadata);
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
          "binding_key",
          "label",
          "fieldname",
          "source_level",
          "child_table_field",
          "child_doctype",
          "fieldtype",
          "sample_value",
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
      for (const source of this.fabricCanvas.getObjects()) {
        const clone = await this._cloneFabricObject(source);
        if (!clone)
          continue;
        if ((_a2 = clone.isType) == null ? void 0 : _a2.call(clone, "textbox")) {
          const baseText = (_c = (_b = source.baseText) != null ? _b : source.text) != null ? _c : "";
          const nextText = this.page.getElementDisplayValue(source, "preview");
          clone.set("text", nextText);
          clone.baseText = baseText;
        } else if (source.customType === "barcode") {
          const baseValue = (_e = (_d = source.baseBarcodeValue) != null ? _d : source.barcodeValue) != null ? _e : "";
          const nextValue = this.page.getElementDisplayValue(source, "preview");
          const boxWidth = source.boxWidth || source.getScaledWidth() || source.width || 0;
          const boxHeight = source.boxHeight || source.getScaledHeight() || source.height || 0;
          clone.set({
            barcodeValue: nextValue,
            baseBarcodeValue: baseValue,
            bindField: source.binding_key || source.bindField || "",
            binding_key: source.binding_key || source.bindField || "",
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
    addTextAt(x, y, text, metadataInput = "") {
      if (!this.fabricCanvas)
        return;
      const metadata = this._normalizeFieldPayload(metadataInput, text, typeof metadataInput === "string" ? metadataInput : "");
      const baseText = text || "Text";
      const obj = new fabric.Textbox(baseText, {
        left: x,
        top: y,
        fontSize: 12,
        padding: 2,
        textAlign: "left",
        customType: "text",
        baseText
      });
      this._applyElementMetadata(obj, metadata);
      this.fabricCanvas.add(obj).setActiveObject(obj);
      this.renderProps(obj);
      if (!this._suspendPreview)
        this.previewDebounced();
    }
    addBarcodeAt(x, y, value, metadataInput = "") {
      if (!this.fabricCanvas)
        return;
      const metadata = this._normalizeFieldPayload(metadataInput, value, typeof metadataInput === "string" ? metadataInput : "");
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
          marginLeft: 0
        });
        this._applyElementMetadata(img, metadata);
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
      if (obj.binding_key)
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
      var _a2, _b, _c, _d, _e, _f, _g, _h, _i;
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
        const metadata = this._elementMetadataFromItem(item);
        if (item.type === "textbox" && !this._isBarcodeMetadata(metadata)) {
          const hasBinding = !!metadata.binding_key;
          const baseText = hasBinding ? this._designText(metadata, (_b = (_a2 = item.baseText) != null ? _a2 : item.text) != null ? _b : "") : (_d = (_c = item.baseText) != null ? _c : item.text) != null ? _d : "";
          const obj = new fabric.Textbox(baseText, Object.assign({}, item, {
            left: this._layoutValuePx(item, "left", 0),
            top: this._layoutValuePx(item, "top", 0),
            width: this._layoutValuePx(item, "width", 120),
            fontSize: this._layoutValuePx(item, "fontSize", 12),
            text: baseText,
            customType: "text",
            baseText
          }));
          this._applyElementMetadata(obj, metadata);
          this.fabricCanvas.add(obj);
        } else if (this._isBarcodeMetadata(metadata) || item.type === "image" && (item.barcodeValue || item.src || item.customType === "barcode")) {
          const hasBinding = !!metadata.binding_key;
          const renderedValue = hasBinding ? (_e = this.page.getRenderData()) == null ? void 0 : _e[metadata.binding_key] : "";
          const baseValue = hasBinding ? renderedValue || metadata.sample_value || item.baseBarcodeValue || item.barcodeValue || item.baseText || item.text || metadata.label || metadata.binding_key || "123456789012" : (_i = (_h = (_g = (_f = item.baseBarcodeValue) != null ? _f : item.barcodeValue) != null ? _g : item.baseText) != null ? _h : item.text) != null ? _i : "";
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
            type: "image",
            customType: "barcode",
            barcodeValue: baseValue,
            baseBarcodeValue: baseValue,
            barWidth: this._layoutValuePx(item, "barWidth", 2),
            barHeight: this._layoutValuePx(item, "barHeight", 60),
            marginTop: this._layoutValuePx(item, "marginTop", 0),
            marginRight: this._layoutValuePx(item, "marginRight", 0),
            marginBottom: this._layoutValuePx(item, "marginBottom", 0),
            marginLeft: this._layoutValuePx(item, "marginLeft", 0)
          }));
          this._applyElementMetadata(img, metadata);
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
      const metadata = this._elementMetadataFromObject(obj);
      const base = __spreadProps(__spreadValues({
        type: obj.type,
        left,
        top,
        width,
        height,
        left_mm: this._pxToMm(left),
        top_mm: this._pxToMm(top),
        width_mm: this._pxToMm(width),
        height_mm: this._pxToMm(height)
      }, metadata), {
        bindField: metadata.binding_key || ""
      });
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
    _buildLabelMarkup(objects = ((_a2) => (_a2 = this.fabricCanvas) == null ? void 0 : _a2.getObjects())() || []) {
      var _a3, _b, _c, _d, _e, _f, _g;
      const parts = [];
      for (const obj of objects) {
        const leftMM = this._pxToMm(obj.left || 0).toFixed(3);
        const topMM = this._pxToMm(obj.top || 0).toFixed(3);
        const widthPx = (_c = (_b = (_a3 = obj.getScaledWidth) == null ? void 0 : _a3.call(obj)) != null ? _b : obj.width) != null ? _c : 0;
        const heightPx = (_f = (_e = (_d = obj.getScaledHeight) == null ? void 0 : _d.call(obj)) != null ? _e : obj.height) != null ? _f : 0;
        const widthMM = this._pxToMm(widthPx).toFixed(3);
        const heightMM = this._pxToMm(heightPx).toFixed(3);
        if ((_g = obj.isType) == null ? void 0 : _g.call(obj, "textbox")) {
          const text = escapeHtml(this.page.getElementDisplayValue(obj, "print"));
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
          const value = this.page.getElementDisplayValue(obj, "print") || " ";
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
    _buildSheetMarkup() {
      const widthMM = this.pageWidthMM;
      const heightMM = this.pageHeightMM;
      return `<div class="bs-print-sheet" style="width:${widthMM}mm;height:${heightMM}mm;">${this._buildLabelMarkup()}</div>`;
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
      const context = this.page.getStudioContext();
      return {
        parent_doctype: context.doctype || this.page.doctype,
        parent_name: context.name || this.page.docname,
        child_field: null,
        child_row_names: "[]",
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
      const hasBinding = !!(obj.binding_key || obj.bindField);
      const bindingRows = [
        ["Label", "label", obj.label || ""],
        ["Field", "fieldname", obj.fieldname || ""],
        ["Binding Key", "binding_key", obj.binding_key || obj.bindField || ""],
        ["Source Level", "source_level", obj.source_level || ""],
        ["Child Table", "child_table_field", obj.child_table_field || ""],
        ["Child DocType", "child_doctype", obj.child_doctype || ""],
        ["Field Type", "fieldtype", obj.fieldtype || ""]
      ];
      $panel.append(this._makeFieldRow(`Left (${unitLabel})`, "left", pxToUnit(obj.left || 0).toFixed(unitDigits), "number", { min: 0, step: unitStep }));
      $panel.append(this._makeFieldRow(`Top (${unitLabel})`, "top", pxToUnit(obj.top || 0).toFixed(unitDigits), "number", { min: 0, step: unitStep }));
      for (const [label, name, value] of bindingRows) {
        if (!value && !hasBinding)
          continue;
        $panel.append(this._makeFieldRow(label, name, value, "text", { readonly: true }));
      }
      $panel.append(this._makeFieldRow(`Width (${unitLabel})`, "width", this.page.mmToUnit(this._currentObjectWidthMm(obj), unit).toFixed(unitDigits), "number", { readonly: true }));
      $panel.append(this._makeFieldRow(`Height (${unitLabel})`, "height", this.page.mmToUnit(this._currentObjectHeightMm(obj), unit).toFixed(unitDigits), "number", { readonly: true }));
      if ((_a2 = obj.isType) == null ? void 0 : _a2.call(obj, "textbox")) {
        $panel.append(this._makeFieldRow("Text", "text", (_c = (_b = obj.baseText) != null ? _b : obj.text) != null ? _c : "", "text", { readonly: hasBinding }));
        $panel.append(this._makeFieldRow(`Font Size (${unitLabel})`, "fontSize", pxToUnit(obj.fontSize || 12).toFixed(unitDigits), "number", { min: 0.1, step: unitStep }));
        $panel.append(this._makeSelectRow("Text Align", "textAlign", obj.textAlign || "left", [
          { value: "left", label: "left" },
          { value: "center", label: "center" },
          { value: "right", label: "right" },
          { value: "justify", label: "justify" }
        ]));
      } else if (obj.customType === "barcode") {
        $panel.append(this._makeFieldRow("Value", "barcodeValue", (_e = (_d = obj.baseBarcodeValue) != null ? _d : obj.barcodeValue) != null ? _e : "", "text", { readonly: hasBinding }));
        $panel.append(this._makeFieldRow("Barcode Format", "format", obj.format || "CODE128", "text"));
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
        const readonlyNames = ["label", "fieldname", "binding_key", "source_level", "child_table_field", "child_doctype", "fieldtype"];
        if (readonlyNames.includes(name))
          return;
        if ((name === "text" || name === "barcodeValue") && hasBinding)
          return;
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
      this.studioContext = this._readStudioContext(route);
      this.doctype = this.studioContext.doctype || route.doctype || "Item";
      this.docname = this.studioContext.name || route.docname || "";
      this.templateName = this.studioContext.template || route.templateName;
      this.selectedBarcodeDoctype = this.studioContext.barcode_doctype || null;
      this.pageWidthMM = BARCODE_STUDIO_DEFAULT_WIDTH_MM;
      this.pageHeightMM = BARCODE_STUDIO_DEFAULT_HEIGHT_MM;
      this.scale = 1;
      this.snapMM = 1;
      this.gridVisible = false;
      this.meta = null;
      this.barcodeConfig = null;
      this.configMessage = "";
      this.fields = [];
      this.childFieldGroups = {};
      this.templateDesignFields = [];
      this.templateSourceDoctype = "";
      this.doc = null;
      this.state = new BarcodeStudioStateStore();
      this.dimensionUnit = this.state.get("unit", BARCODE_STUDIO_DEFAULT_UNIT);
      this._loadToken = 0;
      this._warnedBindings = /* @__PURE__ */ new Set();
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
      return this.getRenderData();
    }
    getStudioContext() {
      return this.studioContext || {};
    }
    getRenderData() {
      var _a2;
      const data = (_a2 = this.studioContext) == null ? void 0 : _a2.render_data;
      return data && typeof data === "object" ? data : {};
    }
    getAllowedBindingKeys() {
      return new Set((this.fields || []).map((field) => field.binding_key || field.fieldname).filter(Boolean));
    }
    isBindingAllowed(bindingKey) {
      if (!bindingKey)
        return true;
      return this.getAllowedBindingKeys().has(bindingKey);
    }
    getElementDisplayValue(element, mode = "design") {
      var _a2, _b, _c, _d;
      const key = (element == null ? void 0 : element.binding_key) || (element == null ? void 0 : element.bindField) || (element == null ? void 0 : element.fieldname) || "";
      const label = (element == null ? void 0 : element.label) || (element == null ? void 0 : element.baseText) || (element == null ? void 0 : element.text) || (element == null ? void 0 : element.fieldname) || key || "";
      if (mode === "design") {
        return label;
      }
      if (!key) {
        return (_d = (_c = (_b = (_a2 = element == null ? void 0 : element.baseBarcodeValue) != null ? _a2 : element == null ? void 0 : element.barcodeValue) != null ? _b : element == null ? void 0 : element.baseText) != null ? _c : element == null ? void 0 : element.text) != null ? _d : label;
      }
      if (!this.isBindingAllowed(key)) {
        this._warnUnauthorizedBinding(key);
        return "";
      }
      const renderData = this.getRenderData();
      if (renderData && renderData[key] !== void 0 && renderData[key] !== null) {
        return String(renderData[key]);
      }
      if (element == null ? void 0 : element.sample_value) {
        return String(element.sample_value);
      }
      return label;
    }
    _warnUnauthorizedBinding(bindingKey) {
      if (!bindingKey || this._warnedBindings.has(bindingKey))
        return;
      this._warnedBindings.add(bindingKey);
      console.warn(`Barcode Studio ignored unauthorized binding_key: ${bindingKey}`);
    }
    _readStudioContext(route = getRouteState()) {
      try {
        const routeOptions = frappe.route_options || {};
        const hasRenderData = routeOptions.render_data && typeof routeOptions.render_data === "object";
        return {
          doctype: routeOptions.doctype || route.doctype || null,
          name: routeOptions.name || routeOptions.docname || route.docname || "",
          template: routeOptions.template || route.templateName || null,
          barcode_doctype: routeOptions.barcode_doctype || null,
          render_data: hasRenderData ? routeOptions.render_data : this._flatRouteOptions(routeOptions)
        };
      } catch (e) {
        return {
          doctype: route.doctype || null,
          name: route.docname || "",
          template: route.templateName || null,
          barcode_doctype: null,
          render_data: {}
        };
      }
    }
    _flatRouteOptions(routeOptions) {
      if (!routeOptions || typeof routeOptions !== "object")
        return {};
      const out = {};
      for (const [key, value] of Object.entries(routeOptions)) {
        if (key === "render_data")
          continue;
        if (value === null || value === void 0)
          continue;
        if (typeof value === "object")
          continue;
        out[key] = value;
      }
      return out;
    }
    isBarcodeField(field = {}) {
      const fieldtype = String(field.fieldtype || "").toLowerCase();
      const fieldname = String(field.fieldname || "").toLowerCase();
      const bindingKey = String(field.binding_key || field.path || field.fieldname || "").toLowerCase();
      const label = String(field.label || field.displayLabel || "").toLowerCase();
      const bindingParts = bindingKey.split("_").filter(Boolean);
      return fieldtype === "barcode" || fieldname === "barcode" || label === "barcode" || bindingParts[bindingParts.length - 1] === "barcode";
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
        this.templateName = templateName || null;
        this.studioContext.template = this.templateName;
        if (frappe.route_options) {
          frappe.route_options.template = this.templateName;
        }
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
      await this.loadBarcodeConfig();
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
      const context = this._readStudioContext(route);
      const changed = context.doctype !== this.doctype || context.name !== this.docname || context.template !== this.templateName || context.barcode_doctype !== this.selectedBarcodeDoctype || Object.keys(context.render_data || {}).length;
      if (!changed)
        return;
      this.studioContext = context;
      this.doctype = context.doctype || route.doctype || "Item";
      this.docname = context.name || route.docname || "";
      this.templateName = context.template || route.templateName;
      this.selectedBarcodeDoctype = context.barcode_doctype || null;
      $("#bs-dt").val(this.doctype);
      $("#bs-name").val(this.docname);
      void this.bootstrap();
    }
    async loadBarcodeConfig() {
      var _a2, _b;
      const previousContext = this.studioContext || {};
      this.doctype = ($("#bs-dt").val() || this.doctype || "Item").trim();
      this.docname = ($("#bs-name").val() || this.docname || "").trim();
      const sameSource = previousContext.doctype === this.doctype && (previousContext.name || "") === this.docname;
      if (previousContext.doctype && previousContext.doctype !== this.doctype) {
        this.selectedBarcodeDoctype = null;
      }
      this.studioContext = __spreadProps(__spreadValues({}, previousContext), {
        doctype: this.doctype,
        name: this.docname,
        template: this.templateName || null,
        barcode_doctype: this.selectedBarcodeDoctype || null,
        render_data: sameSource ? this.getRenderData() : {}
      });
      this.fields = [];
      this.childFieldGroups = {};
      this.barcodeConfig = null;
      this.configMessage = "";
      try {
        const response = await frappe.call({
          method: "mysys_barcode.api.get_barcode_doctype_config",
          args: {
            target_doctype: this.doctype,
            barcode_doctype: this.selectedBarcodeDoctype || null
          }
        });
        this.barcodeConfig = response.message || null;
        this.selectedBarcodeDoctype = ((_a2 = this.barcodeConfig) == null ? void 0 : _a2.name) || this.selectedBarcodeDoctype || null;
        this.fields = Array.isArray((_b = this.barcodeConfig) == null ? void 0 : _b.fields) ? this.barcodeConfig.fields : [];
        this.studioContext.barcode_doctype = this.selectedBarcodeDoctype;
      } catch (error) {
        console.warn("Failed to load Barcode DocType configuration", error);
        this.configMessage = __("No Barcode DocType configuration found for this DocType. Please create one first.");
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
      if (this.configMessage) {
        $panel.html(`<div class="text-muted small">${escapeHtml(this.configMessage)}</div>`);
        $("#bs-fields-collapse-toggle").text("Expand All");
        return;
      }
      const makeChip = (label, dataset, pathShown) => {
        const chip = $(`
        <div class="bs-field-chip" draggable="true" title="${escapeHtml(pathShown || dataset.path || "")}">
          <div class="label">${escapeHtml(label || "")}</div>
          <div class="path">${escapeHtml(pathShown || dataset.path || "")}</div>
        </div>
      `);
        chip.on("dragstart", (event) => {
          const dataTransfer = event.originalEvent.dataTransfer;
          const payload = JSON.stringify(dataset);
          dataTransfer.effectAllowed = "copy";
          dataTransfer.setData("application/x-mysys-barcode-field", payload);
          dataTransfer.setData("text/plain", payload);
        });
        chip.on("click", () => {
          this.canvas.addFieldElement(dataset);
        });
        if (query) {
          const haystack = [
            label || "",
            dataset.fieldname || "",
            dataset.binding_key || "",
            dataset.child_table_field || "",
            dataset.child_doctype || "",
            pathShown || ""
          ].join(" ").toLowerCase();
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
      const documentFields = [];
      const childGroups = /* @__PURE__ */ new Map();
      for (const field of this.fields || []) {
        const bindingKey = field.binding_key || field.fieldname || "";
        const label = field.label || field.fieldname || bindingKey;
        if (query) {
          const haystack = [
            label,
            field.fieldname || "",
            bindingKey,
            field.child_table_field || "",
            field.child_doctype || ""
          ].join(" ").toLowerCase();
          if (!haystack.includes(query))
            continue;
        }
        const dataset = {
          path: bindingKey,
          label,
          displayLabel: label,
          fieldname: field.fieldname || bindingKey,
          binding_key: bindingKey,
          source_level: field.source_level || "Document",
          child_table_field: field.child_table_field || null,
          child_doctype: field.child_doctype || null,
          fieldtype: field.fieldtype,
          sample_value: field.sample_value || ""
        };
        dataset.kind = this.isBarcodeField(dataset) ? "barcode" : "text";
        if (dataset.source_level === "Child Table") {
          const groupKey = field.child_table_field || field.child_doctype || "child";
          if (!childGroups.has(groupKey)) {
            childGroups.set(groupKey, {
              title: field.child_table_field || field.child_doctype || __("Child Table"),
              open: forceOpen || saved[groupKey] === true,
              items: []
            });
          }
          childGroups.get(groupKey).items.push(makeChip(label, dataset, bindingKey));
        } else {
          documentFields.push(makeChip(label, dataset, bindingKey));
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
              this.studioContext.template = this.templateName;
              if (frappe.route_options) {
                frappe.route_options.template = this.templateName;
              }
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
//# sourceMappingURL=barcode_studio.bundle.Q3CB3GEM.js.map
