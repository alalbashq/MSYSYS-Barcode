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
    this._dropTargets = [];
    this.stageEl = null;
    this.zoomShell = null;
    this._panState = null;

    this.previewDebounced = frappe.utils?.debounce(() => {
      void this.preview();
    }, 180) || (() => void this.preview());

    this._boundKeydown = this._handleKeydown.bind(this);
    this._boundWheel = this._handleWheel.bind(this);
    this._boundPanStart = this._handlePanStart.bind(this);
    this._boundPanMove = this._handlePanMove.bind(this);
    this._boundPanEnd = this._handlePanEnd.bind(this);
    this._boundStageScroll = () => this.fabricCanvas?.calcOffset?.();
    this._boundDragOver = (ev) => {
      ev.preventDefault();
      if (ev.dataTransfer) ev.dataTransfer.dropEffect = "copy";
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

  _labelWithUnit(label, unitLabel) {
    return `${__(label)} (${unitLabel})`;
  }

  _pageDirection() {
    return this.page?.layoutDirection || this.page?.getLayoutDirection?.() || "ltr";
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
    this._setupZoomShell();
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
    if (this.stageEl) {
      this.stageEl.removeEventListener("wheel", this._boundWheel);
      this.stageEl.removeEventListener("mousedown", this._boundPanStart);
      this.stageEl.removeEventListener("scroll", this._boundStageScroll);
      this.stageEl.classList.remove("is-panning");
    }
    document.removeEventListener("mousemove", this._boundPanMove);
    document.removeEventListener("mouseup", this._boundPanEnd);
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

  _setupZoomShell() {
    this.stageEl = document.getElementById("bs-canvas-wrap");
    const wrapperEl = this.fabricCanvas?.wrapperEl;
    if (!this.stageEl || !wrapperEl) return;

    let shell = document.getElementById("bs-canvas-zoom-shell");
    if (!shell) {
      shell = document.createElement("div");
      shell.id = "bs-canvas-zoom-shell";
      shell.className = "bs-canvas-zoom-shell";
      wrapperEl.parentNode.insertBefore(shell, wrapperEl);
    }
    if (wrapperEl.parentNode !== shell) {
      shell.appendChild(wrapperEl);
    }

    this.zoomShell = shell;
    this._updateZoomShellDimensions();
  }

  _updateZoomShellDimensions() {
    if (!this.fabricCanvas || !this.zoomShell) return;
    const width = this.fabricCanvas.getWidth();
    const height = this.fabricCanvas.getHeight();
    const scaledWidth = Math.ceil(width * this.scale);
    const scaledHeight = Math.ceil(height * this.scale);
    this.zoomShell.style.width = `${scaledWidth}px`;
    this.zoomShell.style.height = `${scaledHeight}px`;

    const wrapperEl = this.fabricCanvas.wrapperEl;
    if (wrapperEl) {
      wrapperEl.style.transform = `scale(${this.scale})`;
      wrapperEl.style.transformOrigin = "top left";
    }

    if (this.stageEl) {
      this.stageEl.style.setProperty("--bs-grid-minor", `${this.mmToPx * this.scale}px`);
      this.stageEl.style.setProperty("--bs-grid-major", `${this.mmToPx * this.scale * 5}px`);
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
      this._keepInsideCanvas(target, { fitSize: true });
      this._syncBarcodeBox(target);
      this.renderProps(target);
      if (!this._suspendPreview) this.previewDebounced();
    });
    canvas.on("object:modified", (e) => {
      this._keepInsideCanvas(e.target);
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

    this._bindDropTargets();
    this.canvasEl.addEventListener("wheel", this._boundWheel, { passive: false });
    if (this.stageEl) {
      this.stageEl.addEventListener("wheel", this._boundWheel, { passive: false });
      this.stageEl.addEventListener("mousedown", this._boundPanStart);
      this.stageEl.addEventListener("scroll", this._boundStageScroll, { passive: true });
    }
    document.addEventListener("keydown", this._boundKeydown);
  }

  _bindDropTargets() {
    const targets = [
      this.canvasEl,
      this.fabricCanvas?.upperCanvasEl,
      this.fabricCanvas?.wrapperEl,
      document.getElementById("bs-canvas-wrap"),
    ].filter(Boolean);

    this._dropTargets = [...new Set(targets)];
    for (const target of this._dropTargets) {
      target.addEventListener("dragenter", this._boundDragOver);
      target.addEventListener("dragover", this._boundDragOver);
      target.addEventListener("drop", this._boundDrop);
    }
  }

  _focusCanvas() {
    this.fabricCanvas?.upperCanvasEl?.focus?.();
  }

  _handleDrop(ev) {
    ev.preventDefault();
    if (!this.fabricCanvas) return;
    const raw = ev.dataTransfer.getData("application/x-mysys-barcode-field")
      || ev.dataTransfer.getData("text/plain");
    const payload = safeJsonParse(raw, {});
    if (!payload || !Object.keys(payload).length) return;
    const pointer = this._getDropPointer(ev);
    this._chooseAddAs(payload, pointer.x, pointer.y);
  }

  _getDropPointer(ev) {
    const pointer = this.fabricCanvas.getPointer(ev);
    return {
      x: clamp(pointer.x, 0, Math.max(0, this.fabricCanvas.getWidth() - 20)),
      y: clamp(pointer.y, 0, Math.max(0, this.fabricCanvas.getHeight() - 20)),
    };
  }

  _chooseAddAs(payload, x, y) {
    const kind = this._resolveFieldKind(payload, this._normalizeFieldPayload(payload));
    this.addFieldElement(payload, { x, y, kind });
  }

  _handleKeydown(ev) {
    if (!this.fabricCanvas) return;
    const tag = (ev.target?.tagName || "").toLowerCase();
    const isInput = tag === "input" || tag === "textarea" || ev.target?.isContentEditable;
    if (isInput) return;

    const active = this.fabricCanvas.getActiveObject();
    const canvasHasFocus = document.activeElement === this.fabricCanvas.upperCanvasEl;
    const isEditingTextbox = active && active.isType?.("textbox") && active.isEditing;

    if (active && canvasHasFocus && !isEditingTextbox && this._moveActiveWithArrow(ev)) {
      return;
    }

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

  _moveActiveWithArrow(ev) {
    const direction = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    }[ev.key];
    if (!direction) return false;

    const active = this.fabricCanvas?.getActiveObject();
    if (!active) return false;

    ev.preventDefault();
    const step = Math.max(0.1, this.snapMM || 1) * this.mmToPx * (ev.shiftKey ? 5 : 1);
    active.left = toNumber(active.left, 0) + direction[0] * step;
    active.top = toNumber(active.top, 0) + direction[1] * step;
    active.setCoords();
    this._keepInsideCanvas(active);
    this._syncBarcodeBox(active);
    this.renderProps(active);
    this.fabricCanvas.requestRenderAll();
    if (!this._suspendPreview) this.previewDebounced();
    return true;
  }

  _handleWheel(ev) {
    if (!this.fabricCanvas || !ev.ctrlKey) return;
    ev.preventDefault();
    ev.stopPropagation();
    const delta = Math.sign(ev.deltaY);
    this.setZoom(this.scale + (delta < 0 ? 0.05 : -0.05), { anchorEvent: ev });
  }

  _handlePanStart(ev) {
    if (!this.stageEl) return;
    const insideCanvas = !!ev.target?.closest?.(".canvas-container");
    const shouldPan = ev.button === 1 || ev.altKey || !insideCanvas;
    if (!shouldPan) return;

    ev.preventDefault();
    this._panState = {
      x: ev.clientX,
      y: ev.clientY,
      left: this.stageEl.scrollLeft,
      top: this.stageEl.scrollTop,
    };
    this.stageEl.classList.add("is-panning");
    document.addEventListener("mousemove", this._boundPanMove);
    document.addEventListener("mouseup", this._boundPanEnd);
  }

  _handlePanMove(ev) {
    if (!this._panState || !this.stageEl) return;
    ev.preventDefault();
    this.stageEl.scrollLeft = this._panState.left - (ev.clientX - this._panState.x);
    this.stageEl.scrollTop = this._panState.top - (ev.clientY - this._panState.y);
  }

  _handlePanEnd() {
    if (!this._panState) return;
    this._panState = null;
    this.stageEl?.classList.remove("is-panning");
    document.removeEventListener("mousemove", this._boundPanMove);
    document.removeEventListener("mouseup", this._boundPanEnd);
  }

  _keepInsideCanvas(obj, { fitSize = false } = {}) {
    if (!this.fabricCanvas || !obj) return;
    if (fitSize) {
      this._fitObjectInsideCanvas(obj);
    }

    const snap = Math.max(1, this.snapMM * this.mmToPx);
    const bounds = obj.getBoundingRect(true);
    const maxLeft = Math.max(0, this.fabricCanvas.getWidth() - bounds.width);
    const maxTop = Math.max(0, this.fabricCanvas.getHeight() - bounds.height);
    obj.left = clamp(Math.round((obj.left || 0) / snap) * snap, 0, maxLeft);
    obj.top = clamp(Math.round((obj.top || 0) / snap) * snap, 0, maxTop);
    obj.setCoords();
  }

  _fitObjectInsideCanvas(obj) {
    if (!this.fabricCanvas || !obj) return;

    const canvasWidth = this.fabricCanvas.getWidth();
    const canvasHeight = this.fabricCanvas.getHeight();
    const left = clamp(toNumber(obj.left, 0), 0, Math.max(0, canvasWidth - 1));
    const top = clamp(toNumber(obj.top, 0), 0, Math.max(0, canvasHeight - 1));
    const maxWidth = Math.max(1, canvasWidth - left);
    const maxHeight = Math.max(1, canvasHeight - top);
    const currentWidth = obj.getScaledWidth?.() ?? obj.width ?? 0;
    const currentHeight = obj.getScaledHeight?.() ?? obj.height ?? 0;

    if (currentWidth > maxWidth && currentWidth > 0) {
      obj.scaleX = toNumber(obj.scaleX, 1) * (maxWidth / currentWidth);
    }
    if (currentHeight > maxHeight && currentHeight > 0) {
      obj.scaleY = toNumber(obj.scaleY, 1) * (maxHeight / currentHeight);
    }

    obj.setCoords();
  }

  _syncBarcodeBox(obj) {
    if (obj?.customType === "barcode") {
      obj.boxWidth = obj.getScaledWidth();
      obj.boxHeight = obj.getScaledHeight();
    }
  }

  _normalizeFieldPayload(payload = {}, fallbackLabel = "", fallbackBinding = "") {
    const source = typeof payload === "string" ? { binding_key: payload } : (payload || {});
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
      sample_value: source.sample_value || source.sampleValue || "",
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
      sample_value: clean.sample_value || "",
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
      sample_value: obj.sample_value || "",
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
      sample_value: item.sample_value || "",
    });
  }

  _designText(metadata, fallback = "Text") {
    return metadata.label || metadata.fieldname || metadata.binding_key || __(fallback);
  }

  _isBarcodeMetadata(metadata = {}) {
    const fieldtype = String(metadata.fieldtype || "").toLowerCase();
    const fieldname = String(metadata.fieldname || "").toLowerCase();
    const bindingKey = String(metadata.binding_key || metadata.bindField || metadata.path || "").toLowerCase();
    const label = String(metadata.label || metadata.displayLabel || "").toLowerCase();
    const bindingParts = bindingKey.split("_").filter(Boolean);
    return (
      fieldtype === "barcode" ||
      fieldname === "barcode" ||
      label === "barcode" ||
      bindingParts[bindingParts.length - 1] === "barcode"
    );
  }

  _resolveFieldKind(payload = {}, metadata = {}) {
    const explicit = String(payload?.kind || "").toLowerCase();
    if (explicit === "barcode" || explicit === "text") return explicit;
    return this._isBarcodeMetadata(metadata) ? "barcode" : "text";
  }

  addFieldElement(payload, options = {}) {
    const metadata = this._normalizeFieldPayload(payload);
    const kind = this._resolveFieldKind({ ...payload, kind: options.kind || payload?.kind }, metadata);
    const x = options.x ?? 20;
    const y = options.y ?? 20;

    if (kind === "barcode") {
      const renderData = this.page.getRenderData();
      const renderedValue = metadata.binding_key ? renderData?.[metadata.binding_key] : null;
      const value = renderedValue || metadata.sample_value || metadata.binding_key || metadata.label || "123456789012";
      this.addBarcodeAt(x, y, value, metadata);
      return;
    }

    this.addTextAt(x, y, this._designText(metadata), metadata);
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
        "barcodeText",
        "barcodeTextAlign",
        "textPosition",
        "textMargin",
        "barcodeFontSize",
        "fontOptions",
        "barcodeFont",
        "background",
        "lineColor",
        "margin",
        "marginTop",
        "marginRight",
        "marginBottom",
        "marginLeft",
        "flat",
        "ean128",
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

    for (const source of this.fabricCanvas.getObjects()) {
      const clone = await this._cloneFabricObject(source);
      if (!clone) continue;

      if (clone.isType?.("textbox")) {
        const baseText = source.baseText ?? source.text ?? "";
        const nextText = this.page.getElementDisplayValue(source, "preview");
        clone.set("text", nextText);
        clone.baseText = baseText;
      } else if (source.customType === "barcode") {
        const baseValue = source.baseBarcodeValue ?? source.barcodeValue ?? "";
        const nextValue = this.page.getElementDisplayValue(source, "preview");
        const boxWidth = source.boxWidth || source.getScaledWidth() || source.width || 0;
        const boxHeight = source.boxHeight || source.getScaledHeight() || source.height || 0;
        const barcodeState = this._barcodeStateFromSource(source);
        clone.set({
          barcodeValue: nextValue,
          baseBarcodeValue: baseValue,
          bindField: source.binding_key || source.bindField || "",
          binding_key: source.binding_key || source.bindField || "",
          customType: "barcode",
          ...barcodeState,
          boxWidth,
          boxHeight,
        });
        const url = this._barcodeDataURL(nextValue || " ", this._barcodeRenderOptions(clone));
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

  _boolOption(value, fallback = false) {
    if (value === undefined || value === null || value === "") return fallback;
    if (typeof value === "string") {
      return ["1", "true", "yes", "on"].includes(value.toLowerCase());
    }
    return !!value;
  }

  _barcodeFormats() {
    return [
      "auto",
      "CODE128",
      "CODE128A",
      "CODE128B",
      "CODE128C",
      "EAN13",
      "EAN8",
      "EAN5",
      "EAN2",
      "UPC",
      "UPCE",
      "CODE39",
      "ITF14",
      "ITF",
      "MSI",
      "MSI10",
      "MSI11",
      "MSI1010",
      "MSI1110",
      "pharmacode",
      "codabar",
    ];
  }

  _barcodeFormatOptions() {
    return this._barcodeFormats().map((value) => ({
      value,
      label: value === "auto" ? __("Auto") : value,
    }));
  }

  _barcodeStateFromSource(source = {}) {
    return {
      format: source.format || "CODE128",
      barWidth: this._layoutValuePx(source, "barWidth", 2),
      barHeight: this._layoutValuePx(source, "barHeight", 60),
      displayValue: this._boolOption(source.displayValue, false),
      barcodeText: this._toStr(source.barcodeText ?? ""),
      barcodeTextAlign: source.barcodeTextAlign || "center",
      textPosition: source.textPosition || "bottom",
      textMargin: this._layoutValuePx(source, "textMargin", 2),
      barcodeFontSize: this._layoutValuePx(source, "barcodeFontSize", 20),
      fontOptions: source.fontOptions || "",
      barcodeFont: source.barcodeFont || "monospace",
      background: source.background || "#ffffff",
      lineColor: source.lineColor || "#000000",
      margin: this._layoutValuePx(source, "margin", 0),
      marginTop: this._layoutValuePx(source, "marginTop", 0),
      marginRight: this._layoutValuePx(source, "marginRight", 0),
      marginBottom: this._layoutValuePx(source, "marginBottom", 0),
      marginLeft: this._layoutValuePx(source, "marginLeft", 0),
      flat: this._boolOption(source.flat, false),
      ean128: this._boolOption(source.ean128, false),
    };
  }

  _barcodeRenderOptions(source = {}) {
    const state = this._barcodeStateFromSource(source);
    const options = {
      format: state.format,
      width: Math.max(1, Math.round(toNumber(state.barWidth, 2))),
      height: Math.max(1, Math.round(toNumber(state.barHeight, 60))),
      displayValue: state.displayValue,
      textAlign: state.barcodeTextAlign,
      textPosition: state.textPosition,
      textMargin: Math.max(0, Math.round(toNumber(state.textMargin, 2))),
      fontSize: Math.max(1, Math.round(toNumber(state.barcodeFontSize, 20))),
      fontOptions: state.fontOptions,
      font: state.barcodeFont,
      background: state.background,
      lineColor: state.lineColor,
      margin: Math.max(0, Math.round(toNumber(state.margin, 0))),
      marginTop: Math.max(0, Math.round(toNumber(state.marginTop, 0))),
      marginRight: Math.max(0, Math.round(toNumber(state.marginRight, 0))),
      marginBottom: Math.max(0, Math.round(toNumber(state.marginBottom, 0))),
      marginLeft: Math.max(0, Math.round(toNumber(state.marginLeft, 0))),
      flat: state.flat,
      ean128: state.ean128,
    };
    if (state.barcodeText) {
      options.text = state.barcodeText;
    }
    return options;
  }

  _barcodeDataURL(value, options = {}) {
    const tmp = document.createElement("canvas");
    try {
      JsBarcode(tmp, value || " ", options);
    } catch {
      tmp.width = 1;
      tmp.height = 1;
      const ctx = tmp.getContext("2d");
      if (ctx) {
        ctx.fillStyle = options.background || "#ffffff";
        ctx.fillRect(0, 0, tmp.width, tmp.height);
      }
    }
    return tmp.toDataURL();
  }

  _barcodeSignature(obj) {
    return JSON.stringify([
      obj.barcodeValue || "",
      this._barcodeRenderOptions(obj),
    ]);
  }

  _fitImageToBox(img, width, height) {
    const imageWidth = img.width || width || 1;
    const imageHeight = img.height || height || 1;
    img.scaleX = (width || imageWidth) / imageWidth;
    img.scaleY = (height || imageHeight) / imageHeight;
    img.setCoords();
  }

  _defaultBarcodeBox(x = 0, y = 0) {
    const pageWidth = this.fabricCanvas?.getWidth?.() || this._mmToPx(this.pageWidthMM);
    const pageHeight = this.fabricCanvas?.getHeight?.() || this._mmToPx(this.pageHeightMM);
    const margin = this._mmToPx(2);
    const minWidth = this._mmToPx(18);
    const minHeight = this._mmToPx(8);
    const preferredWidth = Math.min(this._mmToPx(36), pageWidth * 0.72);
    const preferredHeight = Math.min(this._mmToPx(12), pageHeight * 0.42);
    const availableWidth = Math.max(1, pageWidth - toNumber(x, 0) - margin);
    const availableHeight = Math.max(1, pageHeight - toNumber(y, 0) - margin);

    return {
      width: clamp(preferredWidth, minWidth, availableWidth),
      height: clamp(preferredHeight, minHeight, availableHeight),
    };
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
    const url = this._barcodeDataURL(obj.barcodeValue || " ", this._barcodeRenderOptions(obj));
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
      this._updateZoomShellDimensions();
    }

    if (persist) {
      this.page.state.set({
        page_width_mm: nextWidth,
        page_height_mm: nextHeight,
      });
    }
  }

  setZoom(scale, { persist = false, anchorEvent = null } = {}) {
    const stage = this.stageEl;
    const oldScale = this.scale || 1;
    const anchor = stage
      ? {
        x: anchorEvent ? anchorEvent.clientX - stage.getBoundingClientRect().left : stage.clientWidth / 2,
        y: anchorEvent ? anchorEvent.clientY - stage.getBoundingClientRect().top : stage.clientHeight / 2,
        left: stage.scrollLeft,
        top: stage.scrollTop,
      }
      : null;

    this.scale = clamp(scale, 0.1, 4);
    this.page.scale = this.scale;
    this._updateZoomShellDimensions();
    $("#bs-zoom").val(Math.round(this.scale * 100));
    $("#bs-zoom-label").text(`${Math.round(this.scale * 100)}%`);
    this.fabricCanvas?.calcOffset?.();

    if (stage && anchor && oldScale > 0) {
      const ratio = this.scale / oldScale;
      stage.scrollLeft = (anchor.left + anchor.x) * ratio - anchor.x;
      stage.scrollTop = (anchor.top + anchor.y) * ratio - anchor.y;
      window.requestAnimationFrame(() => this.fabricCanvas?.calcOffset?.());
    }

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
    if (type === "text") this.addTextAt(20, 20, __("New Text"), "");
    if (type === "barcode") this.addBarcodeAt(20, 20, "123456789012", "");
  }

  addTextAt(x, y, text, metadataInput = "") {
    if (!this.fabricCanvas) return;
    const metadata = this._normalizeFieldPayload(metadataInput, text, typeof metadataInput === "string" ? metadataInput : "");
    const baseText = text || "Text";
    const obj = new fabric.Textbox(baseText, {
      left: x,
      top: y,
      fontSize: 12,
      padding: 2,
      textAlign: "left",
      customType: "text",
      baseText,
    });
    this._applyElementMetadata(obj, metadata);
    this.fabricCanvas.add(obj).setActiveObject(obj);
    this.renderProps(obj);
    if (!this._suspendPreview) this.previewDebounced();
  }

  addBarcodeAt(x, y, value, metadataInput = "") {
    if (!this.fabricCanvas) return;
    const metadata = this._normalizeFieldPayload(metadataInput, value, typeof metadataInput === "string" ? metadataInput : "");
    const baseValue = value || "123456789012";
    const barcodeState = this._barcodeStateFromSource({
      format: "CODE128",
      barWidth: 2,
      barHeight: 60,
      displayValue: false,
    });
    const url = this._barcodeDataURL(baseValue || " ", this._barcodeRenderOptions(barcodeState));

    void this._loadFabricImage(url).then((img) => {
      if (!img) return;
      img.set({
        left: x,
        top: y,
        customType: "barcode",
        barcodeValue: baseValue,
        baseBarcodeValue: baseValue,
        ...barcodeState,
      });
      this._applyElementMetadata(img, metadata);
      const box = this._defaultBarcodeBox(x, y);
      img.boxWidth = box.width;
      img.boxHeight = box.height;
      this._fitImageToBox(img, img.boxWidth, img.boxHeight);
      img._barcodeSignature = this._barcodeSignature(img);
      this.fabricCanvas.add(img).setActiveObject(img);
      this._keepInsideCanvas(img);
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
    if (obj.binding_key) return;

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
      const metadata = this._elementMetadataFromItem(item);
      if (item.type === "textbox" && !this._isBarcodeMetadata(metadata)) {
        const hasBinding = !!metadata.binding_key;
        const baseText = hasBinding ? this._designText(metadata, item.baseText ?? item.text ?? "") : (item.baseText ?? item.text ?? "");
        const obj = new fabric.Textbox(baseText, Object.assign({}, item, {
          left: this._layoutValuePx(item, "left", 0),
          top: this._layoutValuePx(item, "top", 0),
          width: this._layoutValuePx(item, "width", 120),
          fontSize: this._layoutValuePx(item, "fontSize", 12),
          text: baseText,
          customType: "text",
          baseText,
        }));
        this._applyElementMetadata(obj, metadata);
        this.fabricCanvas.add(obj);
      } else if (
        this._isBarcodeMetadata(metadata)
        || (item.type === "image" && (item.barcodeValue || item.src || item.customType === "barcode"))
      ) {
        const hasBinding = !!metadata.binding_key;
        const renderedValue = hasBinding ? this.page.getRenderData()?.[metadata.binding_key] : "";
        const baseValue = hasBinding
          ? (renderedValue || metadata.sample_value || item.baseBarcodeValue || item.barcodeValue || item.baseText || item.text || metadata.label || metadata.binding_key || "123456789012")
          : (item.baseBarcodeValue ?? item.barcodeValue ?? item.baseText ?? item.text ?? "");
        const barcodeState = this._barcodeStateFromSource(item);
        const url = this._barcodeDataURL(baseValue || " ", this._barcodeRenderOptions(barcodeState));
        const img = await this._loadFabricImage(url);
        if (!img) continue;
        img.set(Object.assign({}, item, {
          left: this._layoutValuePx(item, "left", item.left || 0),
          top: this._layoutValuePx(item, "top", item.top || 0),
          type: "image",
          customType: "barcode",
          barcodeValue: baseValue,
          baseBarcodeValue: baseValue,
          ...barcodeState,
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
    const left = toNumber(obj.left, 0);
    const top = toNumber(obj.top, 0);
    const width = toNumber(obj.getScaledWidth?.() ?? obj.width ?? 0, 0);
    const height = toNumber(obj.getScaledHeight?.() ?? obj.height ?? 0, 0);
    const metadata = this._elementMetadataFromObject(obj);
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
      ...metadata,
      bindField: metadata.binding_key || "",
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
      const barcodeState = this._barcodeStateFromSource(obj);
      const barWidth = toNumber(barcodeState.barWidth, 2);
      const barHeight = toNumber(barcodeState.barHeight, 60);
      const textMargin = toNumber(barcodeState.textMargin, 2);
      const barcodeFontSize = toNumber(barcodeState.barcodeFontSize, 20);
      const margin = toNumber(barcodeState.margin, 0);
      const marginTop = toNumber(barcodeState.marginTop, 0);
      const marginRight = toNumber(barcodeState.marginRight, 0);
      const marginBottom = toNumber(barcodeState.marginBottom, 0);
      const marginLeft = toNumber(barcodeState.marginLeft, 0);
      const boxWidth = toNumber(obj.boxWidth || obj.getScaledWidth(), width);
      const boxHeight = toNumber(obj.boxHeight || obj.getScaledHeight(), height);
      return Object.assign(base, {
        src: obj.toDataURL(),
        barcodeValue: baseValue,
        baseBarcodeValue: baseValue,
        format: barcodeState.format,
        barWidth,
        bar_width_mm: this._pxToMm(barWidth),
        barHeight,
        bar_height_mm: this._pxToMm(barHeight),
        displayValue: barcodeState.displayValue,
        barcodeText: barcodeState.barcodeText,
        barcodeTextAlign: barcodeState.barcodeTextAlign,
        textPosition: barcodeState.textPosition,
        textMargin,
        text_margin_mm: this._pxToMm(textMargin),
        barcodeFontSize,
        barcode_font_size_mm: this._pxToMm(barcodeFontSize),
        fontOptions: barcodeState.fontOptions,
        barcodeFont: barcodeState.barcodeFont,
        background: barcodeState.background,
        lineColor: barcodeState.lineColor,
        margin,
        margin_mm: this._pxToMm(margin),
        marginTop,
        margin_top_mm: this._pxToMm(marginTop),
        marginRight,
        margin_right_mm: this._pxToMm(marginRight),
        marginBottom,
        margin_bottom_mm: this._pxToMm(marginBottom),
        marginLeft,
        margin_left_mm: this._pxToMm(marginLeft),
        flat: barcodeState.flat,
        ean128: barcodeState.ean128,
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

  _buildLabelMarkup(objects = this.fabricCanvas?.getObjects() || []) {
    const parts = [];

    for (const obj of objects) {
      const leftMM = this._pxToMm(obj.left || 0).toFixed(3);
      const topMM = this._pxToMm(obj.top || 0).toFixed(3);
      const widthPx = obj.getScaledWidth?.() ?? obj.width ?? 0;
      const heightPx = obj.getScaledHeight?.() ?? obj.height ?? 0;
      const widthMM = this._pxToMm(widthPx).toFixed(3);
      const heightMM = this._pxToMm(heightPx).toFixed(3);

      if (obj.isType?.("textbox")) {
        const text = escapeHtml(this.page.getElementDisplayValue(obj, "print"));
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
        const value = this.page.getElementDisplayValue(obj, "print") || " ";
        const options = this._barcodeRenderOptions(obj);
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        try {
          JsBarcode(svg, value || " ", options);
        } catch {
          // keep empty barcode if the value is invalid
        }
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        parts.push(
          `<div class="bs-print-item bs-print-barcode" style="left:${leftMM}mm;top:${topMM}mm;width:${widthMM}mm;height:${heightMM}mm;` +
          `box-sizing:border-box;overflow:hidden;">${svg.outerHTML}</div>`
        );
      }
    }

    return parts.join("");
  }

  _buildSheetMarkup() {
    const widthMM = this.pageWidthMM;
    const heightMM = this.pageHeightMM;
    const dir = escapeHtml(this._pageDirection());
    return `<div class="bs-print-sheet" dir="${dir}" style="width:${widthMM}mm;height:${heightMM}mm;">${this._buildLabelMarkup()}</div>`;
  }

  _buildPreviewMarkup(imageData) {
    const widthMM = this.pageWidthMM;
    const heightMM = this.pageHeightMM;
    return `
      <div class="bs-print-sheet bs-preview-sheet" style="width:${widthMM}mm;height:${heightMM}mm;">
        <img class="bs-preview-image" src="${imageData}" alt="${escapeHtml(__("Label preview"))}" />
      </div>
    `;
  }

  _syncPreviewPane(imageData) {
    const preview = $("#bs-preview");
    if (!preview.length || !this.fabricCanvas) return;
    preview.html(this._buildPreviewMarkup(imageData));
  }

  _resolvePrintPayload(copies, templateName, printerMode) {
    const context = this.page.getStudioContext();

    return {
      parent_doctype: context.doctype || this.page.doctype,
      parent_name: context.name || this.page.docname,
      child_field: null,
      child_row_names: "[]",
      copies,
      template_name: templateName || null,
      printer_mode: printerMode || "HTML",
    };
  }

  async _logPrint(copies, templateName, printerMode) {
    const payload = this._resolvePrintPayload(copies, templateName, printerMode);
    try {
      await frappe.call({
        method: "mysys_barcode.api.record_barcode_print",
        args: payload,
      });
    } catch (error) {
      console.warn("print log failed", error);
    }
  }

  _printHtmlInCurrentTab(html) {
    return new Promise((resolve) => {
      const frame = document.createElement("iframe");
      Object.assign(frame.style, {
        position: "fixed",
        right: "0",
        bottom: "0",
        width: "0",
        height: "0",
        border: "0",
        visibility: "hidden",
      });
      frame.setAttribute("aria-hidden", "true");
      document.body.appendChild(frame);

      let cleaned = false;
      let didPrint = false;
      let started = false;
      let fallbackTimer = null;

      const cleanup = () => {
        if (cleaned) return;
        cleaned = true;
        if (fallbackTimer) window.clearTimeout(fallbackTimer);
        window.removeEventListener("focus", onFocus);
        try {
          frame.remove();
        } catch {
          // ignore cleanup errors
        }
        resolve();
      };

      const onFocus = () => {
        if (didPrint) window.setTimeout(cleanup, 500);
      };

      const fail = () => {
        cleanup();
        frappe.msgprint(__("Unable to open print preview."));
      };

      const printWindow = frame.contentWindow;
      const doc = frame.contentDocument || printWindow?.document;
      if (!printWindow || !doc) {
        fail();
        return;
      }

      const startPrint = () => {
        if (started || cleaned) return;
        started = true;
        didPrint = true;
        printWindow.onafterprint = cleanup;
        window.addEventListener("focus", onFocus);
        fallbackTimer = window.setTimeout(cleanup, 120000);

        try {
          printWindow.focus();
          printWindow.print();
        } catch (error) {
          console.error("print failed", error);
          fail();
        }
      };

      const waitForAssetsThenPrint = () => {
        const images = Array.from(doc.images || []).filter((img) => !img.complete);
        if (!images.length) {
          window.setTimeout(startPrint, 50);
          return;
        }

        let pending = images.length;
        const done = () => {
          pending -= 1;
          if (pending <= 0) window.setTimeout(startPrint, 50);
        };
        for (const image of images) {
          image.addEventListener("load", done, { once: true });
          image.addEventListener("error", done, { once: true });
        }
        window.setTimeout(startPrint, 1500);
      };

      doc.open();
      doc.write(html);
      doc.close();
      window.setTimeout(waitForAssetsThenPrint, 100);
    });
  }

  async _printAsHiDpiImage(copies, dpi, templateName, printerMode) {
    const multiplier = Math.max(1, dpi / 96);
    const imageData = await this._renderPreviewImageData(multiplier);
    const widthMM = this.pageWidthMM;
    const heightMM = this.pageHeightMM;
    await this._logPrint(copies, templateName, printerMode);

    const images = Array.from({ length: copies }, () => `<img src="${imageData}" />`).join("");
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
      @page{size:${widthMM}mm ${heightMM}mm;margin:0}
      html,body{margin:0;padding:0}
      body{display:block}
      img{display:block;width:${widthMM}mm;height:${heightMM}mm;image-rendering:crisp-edges;image-rendering:-webkit-optimize-contrast;page-break-after:always;break-after:page}
      img:last-child{page-break-after:auto;break-after:auto}
    </style></head><body dir="${escapeHtml(this._pageDirection())}">${images}</body></html>`;

    await this._printHtmlInCurrentTab(html);
  }

  async _printAsVectorHTML(copies, templateName, printerMode) {
    const widthMM = this.pageWidthMM;
    const heightMM = this.pageHeightMM;

    await this._logPrint(copies, templateName, printerMode);

    const label = this._buildSheetMarkup();
    const content = Array.from({ length: copies }, () => label).join("");

    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
      @page{size:${widthMM}mm ${heightMM}mm;margin:0}
      html,body{margin:0;padding:0}
      .sheet{display:block}
      .bs-print-sheet{position:relative;break-after:page;page-break-after:always;overflow:hidden;box-sizing:border-box}
      .bs-print-sheet:last-child{break-after:auto;page-break-after:auto}
      .bs-print-item{position:absolute;box-sizing:border-box}
      .bs-print-text{line-height:1;white-space:nowrap;unicode-bidi:plaintext}
      svg{shape-rendering:crispEdges}
    </style></head><body dir="${escapeHtml(this._pageDirection())}"><div class="sheet">${content}</div></body></html>`;

    await this._printHtmlInCurrentTab(html);
  }

  async print({ mode = "html", copies = 1, dpi = 300, templateName = null, printerMode = "HTML" } = {}) {
    if (!this.fabricCanvas) {
      frappe.msgprint(__("Canvas is not ready."));
      return;
    }
    await this.preview();
    const outputMode = String(mode || "html").toLowerCase();
    if (outputMode === "image") {
      return this._printAsHiDpiImage(copies, dpi, templateName, printerMode);
    }
    return this._printAsVectorHTML(copies, templateName, printerMode);
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
      $panel.html(`<em>${__("Select an object")}</em>`);
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
      [__("Label"), "label", obj.label || ""],
      [__("Field"), "fieldname", obj.fieldname || ""],
      [__("Binding Key"), "binding_key", obj.binding_key || obj.bindField || ""],
      [__("Source Level"), "source_level", obj.source_level ? __(obj.source_level) : ""],
      [__("Child Table"), "child_table_field", obj.child_table_field || ""],
      [__("Child DocType"), "child_doctype", obj.child_doctype ? __(obj.child_doctype) : ""],
      [__("Field Type"), "fieldtype", obj.fieldtype ? __(obj.fieldtype) : ""],
    ];

    $panel.append(this._makeFieldRow(this._labelWithUnit("Left", unitLabel), "left", pxToUnit(obj.left || 0).toFixed(unitDigits), "number", { min: 0, step: unitStep }));
    $panel.append(this._makeFieldRow(this._labelWithUnit("Top", unitLabel), "top", pxToUnit(obj.top || 0).toFixed(unitDigits), "number", { min: 0, step: unitStep }));
    for (const [label, name, value] of bindingRows) {
      if (!value && !hasBinding) continue;
      $panel.append(this._makeFieldRow(label, name, value, "text", { readonly: true }));
    }
    $panel.append(this._makeFieldRow(this._labelWithUnit("Width", unitLabel), "width", this.page.mmToUnit(this._currentObjectWidthMm(obj), unit).toFixed(unitDigits), "number", { readonly: true }));
    $panel.append(this._makeFieldRow(this._labelWithUnit("Height", unitLabel), "height", this.page.mmToUnit(this._currentObjectHeightMm(obj), unit).toFixed(unitDigits), "number", { readonly: true }));

    if (obj.isType?.("textbox")) {
      $panel.append(this._makeFieldRow(__("Text"), "text", obj.baseText ?? obj.text ?? "", "text", { readonly: hasBinding }));
      $panel.append(this._makeFieldRow(this._labelWithUnit("Font Size", unitLabel), "fontSize", pxToUnit(obj.fontSize || 12).toFixed(unitDigits), "number", { min: 0.1, step: unitStep }));
      $panel.append(this._makeSelectRow(__("Font Weight"), "fontWeight", obj.fontWeight || "normal", [
        { value: "normal", label: __("Normal") },
        { value: "bold", label: __("Bold") },
        { value: "100", label: "100" },
        { value: "200", label: "200" },
        { value: "300", label: "300" },
        { value: "400", label: "400" },
        { value: "500", label: "500" },
        { value: "600", label: "600" },
        { value: "700", label: "700" },
        { value: "800", label: "800" },
        { value: "900", label: "900" },
      ]));
      $panel.append(this._makeSelectRow(__("Text Align"), "textAlign", obj.textAlign || "left", [
        { value: "left", label: __("Left") },
        { value: "center", label: __("Center") },
        { value: "right", label: __("Right") },
        { value: "justify", label: __("Justify") },
      ]));
    } else if (obj.customType === "barcode") {
      const barcodeState = this._barcodeStateFromSource(obj);
      $panel.append(this._makeFieldRow(__("Value"), "barcodeValue", obj.baseBarcodeValue ?? obj.barcodeValue ?? "", "text", { readonly: hasBinding }));
      $panel.append(this._makeSelectRow(__("Barcode Format"), "format", barcodeState.format, this._barcodeFormatOptions()));
      $panel.append(this._makeFieldRow(this._labelWithUnit("Bar Width", unitLabel), "barWidth", pxToUnit(barcodeState.barWidth).toFixed(unitDigits), "number", { min: 0.1, step: unitStep }));
      $panel.append(this._makeFieldRow(this._labelWithUnit("Bar Height", unitLabel), "barHeight", pxToUnit(barcodeState.barHeight).toFixed(unitDigits), "number", { min: 0.1, step: unitStep }));
      $panel.append(this._makeSelectRow(__("Display Value"), "displayValue", barcodeState.displayValue ? "1" : "0", [
        { value: "0", label: __("No") },
        { value: "1", label: __("Yes") },
      ]));
      $panel.append(this._makeFieldRow(__("Display Text"), "barcodeText", barcodeState.barcodeText, "text"));
      $panel.append(this._makeSelectRow(__("Text Align"), "barcodeTextAlign", barcodeState.barcodeTextAlign, [
        { value: "left", label: __("Left") },
        { value: "center", label: __("Center") },
        { value: "right", label: __("Right") },
      ]));
      $panel.append(this._makeSelectRow(__("Text Position"), "textPosition", barcodeState.textPosition, [
        { value: "bottom", label: __("Bottom") },
        { value: "top", label: __("Top") },
      ]));
      $panel.append(this._makeFieldRow(this._labelWithUnit("Text Margin", unitLabel), "textMargin", pxToUnit(barcodeState.textMargin).toFixed(unitDigits), "number", { min: 0, step: unitStep }));
      $panel.append(this._makeFieldRow(this._labelWithUnit("Font Size", unitLabel), "barcodeFontSize", pxToUnit(barcodeState.barcodeFontSize).toFixed(unitDigits), "number", { min: 0.1, step: unitStep }));
      $panel.append(this._makeSelectRow(__("Font Options"), "fontOptions", barcodeState.fontOptions, [
        { value: "", label: __("Normal") },
        { value: "bold", label: __("Bold") },
        { value: "italic", label: __("Italic") },
        { value: "bold italic", label: __("Bold Italic") },
      ]));
      $panel.append(this._makeFieldRow(__("Font"), "barcodeFont", barcodeState.barcodeFont, "text"));
      $panel.append(this._makeFieldRow(__("Line Color"), "lineColor", barcodeState.lineColor, "color"));
      $panel.append(this._makeFieldRow(__("Background"), "background", barcodeState.background, "color"));
      $panel.append(this._makeFieldRow(this._labelWithUnit("Margin", unitLabel), "margin", pxToUnit(barcodeState.margin).toFixed(unitDigits), "number", { min: 0, step: unitStep }));
      $panel.append(this._makeFieldRow(this._labelWithUnit("Margin Top", unitLabel), "marginTop", pxToUnit(barcodeState.marginTop).toFixed(unitDigits), "number", { min: 0, step: unitStep }));
      $panel.append(this._makeFieldRow(this._labelWithUnit("Margin Right", unitLabel), "marginRight", pxToUnit(barcodeState.marginRight).toFixed(unitDigits), "number", { min: 0, step: unitStep }));
      $panel.append(this._makeFieldRow(this._labelWithUnit("Margin Bottom", unitLabel), "marginBottom", pxToUnit(barcodeState.marginBottom).toFixed(unitDigits), "number", { min: 0, step: unitStep }));
      $panel.append(this._makeFieldRow(this._labelWithUnit("Margin Left", unitLabel), "marginLeft", pxToUnit(barcodeState.marginLeft).toFixed(unitDigits), "number", { min: 0, step: unitStep }));
      $panel.append(this._makeSelectRow(__("Flat"), "flat", barcodeState.flat ? "1" : "0", [
        { value: "0", label: __("No") },
        { value: "1", label: __("Yes") },
      ]));
      $panel.append(this._makeSelectRow(__("EAN-128"), "ean128", barcodeState.ean128 ? "1" : "0", [
        { value: "0", label: __("No") },
        { value: "1", label: __("Yes") },
      ]));
    }

    const updateObject = (name, rawValue) => {
      const readonlyNames = ["label", "fieldname", "binding_key", "source_level", "child_table_field", "child_doctype", "fieldtype"];
      if (readonlyNames.includes(name)) return;
      if ((name === "text" || name === "barcodeValue") && hasBinding) return;

      let value = rawValue;
      const booleanNames = ["displayValue", "flat", "ean128"];
      if (booleanNames.includes(name)) value = rawValue === "1";
      const unitNames = [
        "left",
        "top",
        "fontSize",
        "barWidth",
        "barHeight",
        "textMargin",
        "barcodeFontSize",
        "margin",
        "marginTop",
        "marginRight",
        "marginBottom",
        "marginLeft",
      ];
      if (!booleanNames.includes(name) && rawValue === "" && unitNames.includes(name)) {
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
        "barcodeText",
        "barcodeTextAlign",
        "textPosition",
        "textMargin",
        "barcodeFontSize",
        "fontOptions",
        "barcodeFont",
        "background",
        "lineColor",
        "margin",
        "marginTop",
        "marginRight",
        "marginBottom",
        "marginLeft",
        "flat",
        "ean128",
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
