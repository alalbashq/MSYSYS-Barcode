import {
  BARCODE_STUDIO_DEFAULT_HEIGHT_MM,
  BARCODE_STUDIO_DEFAULT_WIDTH_MM,
  BARCODE_STUDIO_MM_FIELD_MAP,
  BARCODE_STUDIO_MM_TO_PX,
  BARCODE_STUDIO_PX_TO_MM,
} from "./common.js";
import {
  clamp,
  escapeHtml,
  safeJsonParse,
  toNumber,
} from "./common.js";

export class BarcodeStudioCanvasController {
  constructor(page) {
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

    this.previewDebounced = frappe.utils?.debounce(() => {
      void this.preview();
    }, 180) || (() => void this.preview());

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
      if (Number.isFinite(mmValue)) return this._mmToPx(mmValue);
    }

    if (item && Object.prototype.hasOwnProperty.call(item, key)) {
      const rawValue = toNumber(item[key], NaN);
      if (Number.isFinite(rawValue)) return rawValue;
    }

    return fallback;
  }

  _layoutValueMm(item, key, fallback = 0) {
    const pxValue = this._layoutValuePx(item, key, NaN);
    if (Number.isFinite(pxValue)) return this._pxToMm(pxValue);

    const mmKey = BARCODE_STUDIO_MM_FIELD_MAP[key];
    if (mmKey && item && Object.prototype.hasOwnProperty.call(item, mmKey)) {
      const mmValue = toNumber(item[mmKey], NaN);
      if (Number.isFinite(mmValue)) return mmValue;
    }

    return fallback;
  }

  _sizeMm(value) {
    return `${this._pxToMm(value).toFixed(3)} mm`;
  }

  _currentObjectWidthMm(obj) {
    return this._pxToMm(obj?.getScaledWidth?.() ?? obj?.width ?? 0);
  }

  _currentObjectHeightMm(obj) {
    return this._pxToMm(obj?.getScaledHeight?.() ?? obj?.height ?? 0);
  }

  init() {
    const canvasEl = document.getElementById("bs-canvas");
    if (!canvasEl) return;

    this.canvasEl = canvasEl;
    this.fabricCanvas = new fabric.Canvas(canvasEl, {
      width: this.pageWidthMM * this.mmToPx,
      height: this.pageHeightMM * this.mmToPx,
      backgroundColor: "#fff",
      selection: true,
      preserveObjectStacking: true,
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
      } catch {
        // ignore disposal errors
      }
      this.fabricCanvas = null;
    }
  }

  _bindCanvasEvents() {
    const canvas = this.fabricCanvas;
    if (!canvas) return;

    canvas.on("selection:created", (e) => {
      this._focusCanvas();
      this.renderProps(e.selected?.[0] || e.target || null);
    });
    canvas.on("selection:updated", (e) => {
      this._focusCanvas();
      this.renderProps(e.selected?.[0] || e.target || null);
    });
    canvas.on("selection:cleared", () => this.renderProps(null));
    canvas.on("object:moving", ({ target }) => {
      this._keepInsideCanvas(target);
      if (!this._suspendPreview) this.previewDebounced();
    });
    canvas.on("object:scaled", ({ target }) => {
      this._keepInsideCanvas(target);
      this._syncBarcodeBox(target);
      this.renderProps(target);
      if (!this._suspendPreview) this.previewDebounced();
    });
    canvas.on("object:modified", (e) => {
      this._syncBarcodeBox(e.target);
      this.renderProps(e.target);
      if (!this._suspendPreview) this.previewDebounced();
    });
    canvas.on("object:added", () => {
      if (!this._suspendPreview) this.previewDebounced();
    });
    canvas.on("object:removed", () => {
      if (!this._suspendPreview) this.previewDebounced();
    });

    this.canvasEl.addEventListener("dragover", this._boundDragOver);
    this.canvasEl.addEventListener("drop", this._boundDrop);
    this.canvasEl.addEventListener("wheel", this._boundWheel, { passive: false });
    document.addEventListener("keydown", this._boundKeydown);
  }

  _focusCanvas() {
    this.fabricCanvas?.upperCanvasEl?.focus?.();
  }

  _handleDrop(ev) {
    ev.preventDefault();
    if (!this.fabricCanvas) return;
    const payload = safeJsonParse(ev.dataTransfer.getData("text/plain"), {});
    const pointer = this.fabricCanvas.getPointer(ev);
    this._chooseAddAs(payload, pointer.x, pointer.y);
  }

  _chooseAddAs(payload, x, y) {
    const kind = String(payload?.kind || (payload?.fieldtype === "Barcode" ? "barcode" : "text")).toLowerCase();
    const label = payload?.displayLabel || payload?.label || payload?.fieldLabel || payload?.fieldname || payload?.path || "Text";
    const bindPath = payload?.path || payload?.fieldname || "";

    if (kind === "barcode") {
      this.addBarcodeAt(x, y, payload?.baseValue || payload?.value || label || bindPath || "123456789012", bindPath);
      return;
    }

    this.addTextAt(x, y, label, bindPath);
  }

  _handleKeydown(ev) {
    if (!this.fabricCanvas) return;
    const tag = (ev.target?.tagName || "").toLowerCase();
    const isInput = tag === "input" || tag === "textarea" || ev.target?.isContentEditable;
    if (isInput) return;

    const active = this.fabricCanvas.getActiveObject();
    const canvasHasFocus = document.activeElement === this.fabricCanvas.upperCanvasEl;
    const isEditingTextbox = active && active.isType?.("textbox") && active.isEditing;

    if ((ev.key === "Delete" || ev.key === "Backspace") && active && canvasHasFocus && !isEditingTextbox) {
      ev.preventDefault();
      this.fabricCanvas.remove(active);
      this.fabricCanvas.discardActiveObject();
      this.renderProps(null);
      if (!this._suspendPreview) this.previewDebounced();
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
      this.page.canvasClearButton?.trigger?.("click");
    }
  }

  _handleWheel(ev) {
    if (!this.fabricCanvas || !ev.ctrlKey) return;
    ev.preventDefault();
    const delta = Math.sign(ev.deltaY);
    this.setZoom(this.scale + (delta < 0 ? 0.05 : -0.05));
  }

  _keepInsideCanvas(obj) {
    if (!this.fabricCanvas || !obj) return;
    const snap = Math.max(1, this.snapMM * this.mmToPx);
    const bounds = obj.getBoundingRect(true);
    const maxLeft = Math.max(0, this.fabricCanvas.getWidth() - bounds.width);
    const maxTop = Math.max(0, this.fabricCanvas.getHeight() - bounds.height);
    obj.left = clamp(Math.round((obj.left || 0) / snap) * snap, 0, maxLeft);
    obj.top = clamp(Math.round((obj.top || 0) / snap) * snap, 0, maxTop);
    obj.setCoords();
  }

  _syncBarcodeBox(obj) {
    if (obj?.customType === "barcode") {
      obj.boxWidth = obj.getScaledWidth();
      obj.boxHeight = obj.getScaledHeight();
    }
  }

  _cloneFabricObject(obj) {
    return new Promise((resolve) => {
      if (!obj?.clone) {
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
        "boxHeight",
      ];
      obj.clone((cloned) => {
        resolve(cloned || null);
      }, props);
    });
  }

  async _renderPreviewImageData(multiplier = Math.max(1, window.devicePixelRatio || 1)) {
    if (!this.fabricCanvas) return "";

    const width = this.fabricCanvas.getWidth();
    const height = this.fabricCanvas.getHeight();
    const previewCanvasEl = document.createElement("canvas");
    previewCanvasEl.width = width;
    previewCanvasEl.height = height;

    const previewCanvas = new fabric.StaticCanvas(previewCanvasEl, {
      backgroundColor: "#fff",
      renderOnAddRemove: false,
      selection: false,
    });

    const data = this.page.resolveDoc();

    for (const source of this.fabricCanvas.getObjects()) {
      const clone = await this._cloneFabricObject(source);
      if (!clone) continue;

      if (clone.isType?.("textbox")) {
        const baseText = source.baseText ?? source.text ?? "";
        const resolved = source.bindField ? this._getByPath(data, source.bindField) : undefined;
        const nextText = resolved === undefined || resolved === null ? baseText : this._toStr(resolved);
        clone.set("text", nextText);
        clone.baseText = baseText;
      } else if (source.customType === "barcode") {
        const baseValue = source.baseBarcodeValue ?? source.barcodeValue ?? "";
        const resolved = source.bindField ? this._getByPath(data, source.bindField) : undefined;
        const nextValue = resolved === undefined || resolved === null ? baseValue : this._toStr(resolved);
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
          boxHeight,
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
            ml: toNumber(source.marginLeft, 0),
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
    } catch {
      // ignore preview canvas disposal errors
    }
    return imageData;
  }

  _toStr(value) {
    if (value === null || value === undefined) return "";
    try {
      return String(value);
    } catch {
      return `${value}`;
    }
  }

  _getByPath(obj, path) {
    if (!obj || !path) return undefined;
    const normalizedPath = String(path).replace(/\[\]/g, "[0]");
    const segments = normalizedPath.replace(/\[(\d*)\]/g, ".$1").split(".").filter(Boolean);
    let current = obj;
    for (const segment of segments) {
      if (Array.isArray(current)) {
        const idx = segment === "" ? 0 : Number.parseInt(segment, 10);
        current = current?.[idx];
      } else {
        current = current?.[segment];
      }
      if (current === undefined || current === null) break;
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
        displayValue,
      });
    } catch {
      // keep blank canvas on invalid barcode values
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
      Number((toNumber(obj.barWidth, 2)).toFixed(3)),
      Number((toNumber(obj.barHeight, 60)).toFixed(3)),
      !!obj.displayValue,
      Number((toNumber(obj.marginTop, 0)).toFixed(3)),
      Number((toNumber(obj.marginRight, 0)).toFixed(3)),
      Number((toNumber(obj.marginBottom, 0)).toFixed(3)),
      Number((toNumber(obj.marginLeft, 0)).toFixed(3)),
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
    if (!obj || obj.customType !== "barcode") return;
    const signature = this._barcodeSignature(obj);
    if (obj._barcodeSignature === signature) return;
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
        ml: toNumber(obj.marginLeft, 0),
      }
    );
    const boxWidth = obj.boxWidth || obj.getScaledWidth();
    const boxHeight = obj.boxHeight || obj.getScaledHeight();
    await this._setImageSource(obj, url, boxWidth, boxHeight);
  }

  setPageSize(widthMM, heightMM, { persist = false } = {}) {
    const nextWidth = toNumber(widthMM, this.pageWidthMM || BARCODE_STUDIO_DEFAULT_WIDTH_MM);
    const nextHeight = toNumber(heightMM, this.pageHeightMM || BARCODE_STUDIO_DEFAULT_HEIGHT_MM);
    if (!(nextWidth > 0) || !(nextHeight > 0)) return;

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
        page_height_mm: nextHeight,
      });
    }
  }

  setZoom(scale, { persist = false } = {}) {
    this.scale = clamp(scale, 0.1, 4);
    this.page.scale = this.scale;
    $(".bb-stage").css("transform", `scale(${this.scale})`);
    $("#bs-zoom").val(Math.round(this.scale * 100));
    $("#bs-zoom-label").text(`${Math.round(this.scale * 100)}%`);
    this.fabricCanvas?.calcOffset?.();
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
    if (type === "text") this.addTextAt(20, 20, "New Text", "");
    if (type === "barcode") this.addBarcodeAt(20, 20, "123456789012", "");
  }

  addTextAt(x, y, text, bindPath = "") {
    if (!this.fabricCanvas) return;
    const baseText = text || "Text";
    const obj = new fabric.Textbox(baseText, {
      left: x,
      top: y,
      fontSize: 12,
      padding: 2,
      textAlign: "left",
      customType: "text",
      bindField: bindPath || "",
      baseText,
    });
    this.fabricCanvas.add(obj).setActiveObject(obj);
    this.renderProps(obj);
    if (!this._suspendPreview) this.previewDebounced();
  }

  addBarcodeAt(x, y, value, bindPath = "") {
    if (!this.fabricCanvas) return;
    const baseValue = value || "123456789012";
    const format = "CODE128";
    const barWidth = 2;
    const barHeight = 60;
    const url = this._barcodeDataURL(baseValue || " ", format, barWidth, barHeight, false, {
      mt: 0,
      mr: 0,
      mb: 0,
      ml: 0,
    });

    void this._loadFabricImage(url).then((img) => {
      if (!img) return;
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
        bindField: bindPath || "",
      });
      img.boxWidth = img.getScaledWidth();
      img.boxHeight = img.getScaledHeight();
      img._barcodeSignature = this._barcodeSignature(img);
      this.fabricCanvas.add(img).setActiveObject(img);
      this.renderProps(img);
      if (!this._suspendPreview) this.previewDebounced();
    });
  }

  clearCanvas() {
    if (!this.fabricCanvas) return;
    this.fabricCanvas.discardActiveObject();
    this.fabricCanvas.clear();
    this.renderProps(null);
    this.fabricCanvas.requestRenderAll();
    if (!this._suspendPreview) this.previewDebounced();
  }

  clearActiveValue() {
    const obj = this.fabricCanvas?.getActiveObject();
    if (!obj) return;

    if (obj.isType?.("textbox")) {
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

    if (!this._suspendPreview) this.previewDebounced();
  }

  alignSelected(direction) {
    const obj = this.fabricCanvas?.getActiveObject();
    if (!obj) return;

    const width = this.fabricCanvas.getWidth();
    const height = this.fabricCanvas.getHeight();
    const bounds = obj.getBoundingRect(true);

    if (direction === "left") obj.left = 0;
    if (direction === "right") obj.left = width - bounds.width;
    if (direction === "center") obj.left = (width - bounds.width) / 2;
    if (direction === "top") obj.top = 0;
    if (direction === "bottom") obj.top = height - bounds.height;
    if (direction === "middle") obj.top = (height - bounds.height) / 2;

    obj.setCoords();
    this.fabricCanvas.requestRenderAll();
    if (!this._suspendPreview) this.previewDebounced();
  }

  async loadTemplate(doc) {
    if (!this.fabricCanvas || !doc) return;
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
        const baseText = item.baseText ?? item.text ?? "";
        const obj = new fabric.Textbox(baseText, Object.assign({}, item, {
          left: this._layoutValuePx(item, "left", 0),
          top: this._layoutValuePx(item, "top", 0),
          width: this._layoutValuePx(item, "width", 120),
          fontSize: this._layoutValuePx(item, "fontSize", 12),
          text: baseText,
          customType: "text",
          bindField: item.bindField || "",
          baseText,
        }));
        this.fabricCanvas.add(obj);
      } else if (item.type === "image" && (item.barcodeValue || item.src || item.customType === "barcode")) {
        const baseValue = item.baseBarcodeValue ?? item.barcodeValue ?? "";
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
            ml: this._layoutValuePx(item, "marginLeft", 0),
          }
        );
        const img = await this._loadFabricImage(url);
        if (!img) continue;
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
          marginLeft: this._layoutValuePx(item, "marginLeft", 0),
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
    const left = toNumber(obj.left, 0);
    const top = toNumber(obj.top, 0);
    const width = toNumber(obj.getScaledWidth?.() ?? obj.width ?? 0, 0);
    const height = toNumber(obj.getScaledHeight?.() ?? obj.height ?? 0, 0);
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
      bindField: obj.bindField || "",
    };

    if (obj.isType?.("textbox")) {
      const baseText = obj.baseText ?? obj.text ?? "";
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
        customType: "text",
      });
    }

    if (obj.customType === "barcode") {
      const baseValue = obj.baseBarcodeValue ?? obj.barcodeValue ?? "";
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
        type: "image",
      });
    }

    return base;
  }

  serializeObjects() {
    if (!this.fabricCanvas) return [];
    return this.fabricCanvas.getObjects().map((obj) => this._serializeObject(obj));
  }

  async preview() {
    if (!this.fabricCanvas) return;
    const ticket = ++this._previewTicket;
    const imageData = await this._renderPreviewImageData(Math.max(1, window.devicePixelRatio || 1));
    if (ticket !== this._previewTicket) return;
    this._syncPreviewPane(imageData);
  }

  _buildLabelMarkup(objects = this.fabricCanvas?.getObjects() || [], data = this.page.resolveDoc() || {}) {
    const parts = [];

    for (const obj of objects) {
      const leftMM = this._pxToMm(obj.left || 0).toFixed(3);
      const topMM = this._pxToMm(obj.top || 0).toFixed(3);
      const widthPx = obj.getScaledWidth?.() ?? obj.width ?? 0;
      const heightPx = obj.getScaledHeight?.() ?? obj.height ?? 0;
      const widthMM = this._pxToMm(widthPx).toFixed(3);
      const heightMM = this._pxToMm(heightPx).toFixed(3);

      if (obj.isType?.("textbox")) {
        const baseText = obj.baseText ?? obj.text ?? "";
        const resolved = obj.bindField ? this._getByPath(data, obj.bindField) : undefined;
        const text = escapeHtml(resolved === undefined || resolved === null ? baseText : this._toStr(resolved));
        const fontSizeMM = this._pxToMm(obj.fontSize || 12).toFixed(3);
        const fontFamily = escapeHtml(obj.fontFamily || "Times New Roman");
        const fontWeight = escapeHtml(obj.fontWeight || "normal");
        const fontStyle = escapeHtml(obj.fontStyle || "normal");
        const fill = escapeHtml(obj.fill || "#000000");
        const paddingMM = this._pxToMm(obj.padding || 0).toFixed(3);
        parts.push(
          `<div class="bs-print-item bs-print-text" style="left:${leftMM}mm;top:${topMM}mm;width:${widthMM}mm;height:${heightMM}mm;` +
          `padding:${paddingMM}mm;box-sizing:border-box;overflow:hidden;font-size:${fontSizeMM}mm;font-family:${fontFamily};font-weight:${fontWeight};font-style:${fontStyle};color:${fill};text-align:${obj.textAlign || "left"};">` +
          `${text}</div>`
        );
      } else if (obj.customType === "barcode") {
        const baseValue = obj.baseBarcodeValue ?? obj.barcodeValue ?? "";
        const resolved = obj.bindField ? this._getByPath(data, obj.bindField) : undefined;
        const value = escapeHtml(resolved === undefined || resolved === null ? baseValue : this._toStr(resolved) || " ");
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
            displayValue: !!obj.displayValue,
          });
        } catch {
          // keep empty barcode if the value is invalid
        }
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        parts.push(
          `<div class="bs-print-item bs-print-barcode" style="left:${leftMM}mm;top:${topMM}mm;width:${widthMM}mm;height:${heightMM}mm;` +
          `padding:${mt}mm ${mr}mm ${mb}mm ${ml}mm;box-sizing:border-box;overflow:hidden;">${svg.outerHTML}</div>`
        );
      }
    }

    return parts.join("");
  }

  _buildSheetMarkup(data = this.page.resolveDoc() || {}) {
    const widthMM = this.pageWidthMM;
    const heightMM = this.pageHeightMM;
    return `<div class="bs-print-sheet" style="width:${widthMM}mm;height:${heightMM}mm;">${this._buildLabelMarkup(undefined, data)}</div>`;
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
    if (!preview.length || !this.fabricCanvas) return;
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
        if (row?.name) childRows.push(row.name);
      }
    }

    return {
      parent_doctype: parentDoctype,
      parent_name: parentName,
      child_field: childField,
      child_row_names: JSON.stringify(childRows),
      copies,
      template_name: templateName || null,
    };
  }

  async _logPrint(copies, templateName) {
    const payload = this._resolvePrintPayload(copies, templateName);
    try {
      await frappe.call({
        method: "mysys_barcode.api.record_barcode_print",
        args: payload,
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
      `value="${escapeHtml(value ?? "")}"`,
    ];
    if (extra.min !== undefined) attrs.push(`min="${escapeHtml(extra.min)}"`);
    if (extra.max !== undefined) attrs.push(`max="${escapeHtml(extra.max)}"`);
    if (extra.step !== undefined) attrs.push(`step="${escapeHtml(extra.step)}"`);
    if (extra.placeholder) attrs.push(`placeholder="${escapeHtml(extra.placeholder)}"`);
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

    if (obj.isType?.("textbox")) {
      $panel.append(this._makeFieldRow("Text", "text", obj.baseText ?? obj.text ?? "", "text"));
      $panel.append(this._makeFieldRow(`Font Size (${unitLabel})`, "fontSize", pxToUnit(obj.fontSize || 12).toFixed(unitDigits), "number", { min: 0.1, step: unitStep }));
      $panel.append(this._makeSelectRow("Text Align", "textAlign", obj.textAlign || "left", [
        { value: "left", label: "left" },
        { value: "center", label: "center" },
        { value: "right", label: "right" },
        { value: "justify", label: "justify" },
      ]));
    } else if (obj.customType === "barcode") {
      $panel.append(this._makeFieldRow("Value", "barcodeValue", obj.baseBarcodeValue ?? obj.barcodeValue ?? "", "text"));
      $panel.append(this._makeFieldRow("Format", "format", obj.format || "CODE128", "text"));
      $panel.append(this._makeFieldRow(`Bar Width (${unitLabel})`, "barWidth", pxToUnit(obj.barWidth || 2).toFixed(unitDigits), "number", { min: 0.1, step: unitStep }));
      $panel.append(this._makeFieldRow(`Bar Height (${unitLabel})`, "barHeight", pxToUnit(obj.barHeight || 60).toFixed(unitDigits), "number", { min: 0.1, step: unitStep }));
      $panel.append(this._makeFieldRow(`Margin Top (${unitLabel})`, "marginTop", pxToUnit(obj.marginTop || 0).toFixed(unitDigits), "number", { min: 0, step: unitStep }));
      $panel.append(this._makeFieldRow(`Margin Right (${unitLabel})`, "marginRight", pxToUnit(obj.marginRight || 0).toFixed(unitDigits), "number", { min: 0, step: unitStep }));
      $panel.append(this._makeFieldRow(`Margin Bottom (${unitLabel})`, "marginBottom", pxToUnit(obj.marginBottom || 0).toFixed(unitDigits), "number", { min: 0, step: unitStep }));
      $panel.append(this._makeFieldRow(`Margin Left (${unitLabel})`, "marginLeft", pxToUnit(obj.marginLeft || 0).toFixed(unitDigits), "number", { min: 0, step: unitStep }));
      $panel.append(this._makeSelectRow("Display Value", "displayValue", obj.displayValue ? "1" : "0", [
        { value: "0", label: "No" },
        { value: "1", label: "Yes" },
      ]));
    }

    const updateObject = (name, rawValue) => {
      let value = rawValue;
      if (name === "displayValue") value = rawValue === "1";
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
        if (obj.isType?.("textbox")) {
          obj.set("text", obj.baseText ?? "");
        } else if (obj.customType === "barcode") {
          obj.set("barcodeValue", obj.baseBarcodeValue ?? "");
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
        "marginLeft",
      ].includes(name)) {
        obj._barcodeSignature = null;
        void this._refreshBarcodeObject(obj);
      }

      obj.setCoords();
      this._keepInsideCanvas(obj);
      this.fabricCanvas.requestRenderAll();
      if (!this._suspendPreview) this.previewDebounced();
    };

    $panel.find("input,select").on("input change", (event) => {
      updateObject(event.target.name, event.target.value);
    });
  }
}
