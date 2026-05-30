import {
  BARCODE_STUDIO_DEFAULT_HEIGHT_MM,
  BARCODE_STUDIO_DEFAULT_UNIT,
  BARCODE_STUDIO_DEFAULT_WIDTH_MM,
  BARCODE_STUDIO_DIMENSION_UNITS,
  BARCODE_STUDIO_UI_KEY,
} from "./common.js";
import {
  clamp,
  escapeHtml,
  getRouteState,
  safeJsonParse,
  toNumber,
} from "./common.js";
import { BarcodeStudioStateStore } from "./state_store.js";
import { BarcodeStudioCanvasController } from "./canvas_controller.js";

if (!window.__barcode_studio_route_bound__ && frappe.router?.on) {
  window.__barcode_studio_route_bound__ = true;
  frappe.router.on("change", () => {
    const route = frappe.get_route();
    if (route[0] === "barcode-studio" && window.__barcode_studio__) {
      window.__barcode_studio__.onRoute?.();
    }
  });
}

export class BarcodeStudioPage {
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
    this._warnedBindings = new Set();
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
    $("#bs-size-label").text(`${widthValue} × ${heightValue} ${this.getDimensionLabel(unit)}`);
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
    const active = this.canvas?.fabricCanvas?.getActiveObject?.() || null;
    this.canvas?.renderProps?.(active);
  }

  destroy() {
    this._loadToken += 1;
    this.canvas?.destroy?.();
  }

  resolveDoc() {
    return this.getRenderData();
  }

  getStudioContext() {
    return this.studioContext || {};
  }

  getRenderData() {
    const data = this.studioContext?.render_data;
    return data && typeof data === "object" ? data : {};
  }

  getAllowedBindingKeys() {
    return new Set((this.fields || []).map((field) => field.binding_key || field.fieldname).filter(Boolean));
  }

  isBindingAllowed(bindingKey) {
    if (!bindingKey) return true;
    return this.getAllowedBindingKeys().has(bindingKey);
  }

  getElementDisplayValue(element, mode = "design") {
    const key = element?.binding_key || element?.bindField || element?.fieldname || "";
    const label = element?.label || element?.baseText || element?.text || element?.fieldname || key || "";

    if (mode === "design") {
      return label;
    }

    if (!key) {
      return element?.baseBarcodeValue ?? element?.barcodeValue ?? element?.baseText ?? element?.text ?? label;
    }

    if (!this.isBindingAllowed(key)) {
      this._warnUnauthorizedBinding(key);
      return "";
    }

    const renderData = this.getRenderData();
    if (renderData && renderData[key] !== undefined && renderData[key] !== null) {
      return String(renderData[key]);
    }

    if (element?.sample_value) {
      return String(element.sample_value);
    }

    return label;
  }

  _warnUnauthorizedBinding(bindingKey) {
    if (!bindingKey || this._warnedBindings.has(bindingKey)) return;
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
        render_data: hasRenderData ? routeOptions.render_data : this._flatRouteOptions(routeOptions),
      };
    } catch {
      return {
        doctype: route.doctype || null,
        name: route.docname || "",
        template: route.templateName || null,
        barcode_doctype: null,
        render_data: {},
      };
    }
  }

  _flatRouteOptions(routeOptions) {
    if (!routeOptions || typeof routeOptions !== "object") return {};
    const out = {};
    for (const [key, value] of Object.entries(routeOptions)) {
      if (key === "render_data") continue;
      if (value === null || value === undefined) continue;
      if (typeof value === "object") continue;
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
    return (
      fieldtype === "barcode" ||
      fieldname === "barcode" ||
      label === "barcode" ||
      bindingParts[bindingParts.length - 1] === "barcode"
    );
  }

  initPage() {
    this.page = frappe.ui.make_app_page({
      parent: this.wrapper,
      title: "Barcode Studio",
      single_column: true,
    });

    const ctx = {
      doctype: this.doctype || "Item",
      docname: this.docname || "",
      width_mm: this.pageWidthMM,
      height_mm: this.pageHeightMM,
    };

    const tplName = "barcode_studio";
    const tplSrc = frappe.templates?.[tplName];
    const html = tplSrc
      ? frappe.render_template(tplSrc, ctx)
      : "<div class='alert alert-danger m-3'>Template not built. Run <code>bench build</code>.</div>";

    this.page.wrapper.find(".page-body").html(html);
    $("#bs-dt").val(this.doctype);
    $("#bs-name").val(this.docname);
    this.refreshDimensionControls();

    this.canvas.init();
    this.canvas.setPageSize(this.pageWidthMM, this.pageHeightMM, { persist: false });
    this.canvas.setZoom(1, { persist: false });
  }

  bindUi() {
    $("#bs-top-tabs .nav-link").on("click", function (event) {
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

    $("#bs-toggle-props").on("click", () => this.setPropertiesPanelVisible(false));
    $("#bs-show-props").on("click", () => this.setPropertiesPanelVisible(true));

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
        if (anyOpen) el.classList.remove("open");
        else el.classList.add("open");
        $(el).find(".fg-toggle").text(el.classList.contains("open") ? "−" : "+");
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
    $("#bs-zoom-out").on("click", () => this.canvas.setZoom(this.canvas.scale - 0.1, { persist: true }));
    $("#bs-zoom-in").on("click", () => this.canvas.setZoom(this.canvas.scale + 0.1, { persist: true }));
    $("#bs-zoom-reset").on("click", () => this.canvas.setZoom(1, { persist: true }));
    $("#bs-zoom").on("input change", (event) => this.canvas.setZoom((Number.parseInt(event.target.value, 10) || 100) / 100, { persist: true }));
    $("#bs-unit").on("change", (event) => this.setDimensionUnit(event.target.value, { persist: true, refresh: true }));
    $("#bs-toggle-grid").on("click", () => this.toggleGrid());
    $("#bs-snap").on("change", (event) => this.canvas.setSnap(event.target.value || 1, { persist: true }));
    $("#bs-dark").on("click", () => this.toggleTheme());
    $("#bs-fullscreen").on("click", () => this.toggleFullscreen());
    $("#bs-clear").on("click", () => this.canvas.clearCanvas());
    this.canvasClearButton = $("#bs-clear");

    $("#bs-dt, #bs-name").on("change input", frappe.utils?.debounce(() => {
      void this.bootstrap();
    }, 300) || (() => void this.bootstrap()));

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
      const obj = this.canvas.fabricCanvas?.getActiveObject();
      if (obj?.isType?.("textbox")) {
        obj.set("textAlign", event.currentTarget.getAttribute("data-textalign"));
        obj.setCoords();
        this.canvas.fabricCanvas.requestRenderAll();
        if (!this.canvas._suspendPreview) this.canvas.previewDebounced();
      }
    });
  }

  _bindPreviewSplitter() {
    const previewPane = document.getElementById("bs-preview-pane");
    const splitter = document.getElementById("bs-splitter");
    if (!previewPane || !splitter) return;

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
    const propsVisible = !this.state.get("props_collapsed", false);

    this.toggleTheme(dark, { persist: false });
    this.setDimensionUnit(unit, { persist: false, refresh: true });
    this.setPropertiesPanelVisible(propsVisible, { persist: false });
    this.canvas.setSnap(snap, { persist: false });
    this.canvas.toggleGrid(grid, { persist: false });
    $("#bs-snap-label").text(`${this.canvas.snapMM}mm`);
  }

  setPropertiesPanelVisible(visible, { persist = true } = {}) {
    const isVisible = !!visible;
    $(".bs-layout").toggleClass("props-collapsed", !isVisible);
    $("#bs-toggle-props").text(isVisible ? "Hide" : "Show");
    $("#bs-show-props").toggle(!isVisible);
    this.canvas?.fabricCanvas?.calcOffset?.();
    this.canvas?.fabricCanvas?.requestRenderAll?.();
    if (persist) {
      this.state.set({ props_collapsed: !isVisible });
    }
    return isVisible;
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
    const element = this.page.wrapper.get(0);
    if (!document.fullscreenElement) element.requestFullscreen?.();
    else document.exitFullscreen?.();
  }

  async bootstrap() {
    const token = ++this._loadToken;
    $("#bs-dt").val(this.doctype);
    $("#bs-name").val(this.docname);
    this.templateDesignFields = [];
    this.templateSourceDoctype = "";

    await this.loadBarcodeConfig();
    if (token !== this._loadToken) return;

    await this.fillTemplates();
    if (token !== this._loadToken) return;

    if (this.templateName) {
      await this.loadTemplateByName(this.templateName);
    } else {
      this.canvas.setPageSize(this.pageWidthMM, this.pageHeightMM, { persist: false });
      await this.canvas.preview();
    }

    this.buildFieldPalette();

    if (token !== this._loadToken) return;
    const copies = this.resolveCopiesFromData();
    if (copies) $("#bs-copies").val(copies);
  }

  async onRoute() {
    const route = getRouteState();
    const context = this._readStudioContext(route);
    const changed = (
      context.doctype !== this.doctype ||
      context.name !== this.docname ||
      context.template !== this.templateName ||
      context.barcode_doctype !== this.selectedBarcodeDoctype ||
      Object.keys(context.render_data || {}).length
    );
    if (!changed) return;

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
    const previousContext = this.studioContext || {};
    this.doctype = ($("#bs-dt").val() || this.doctype || "Item").trim();
    this.docname = ($("#bs-name").val() || this.docname || "").trim();
    const sameSource = previousContext.doctype === this.doctype && (previousContext.name || "") === this.docname;
    if (previousContext.doctype && previousContext.doctype !== this.doctype) {
      this.selectedBarcodeDoctype = null;
    }

    this.studioContext = {
      ...previousContext,
      doctype: this.doctype,
      name: this.docname,
      template: this.templateName || null,
      barcode_doctype: this.selectedBarcodeDoctype || null,
      render_data: sameSource ? this.getRenderData() : {},
    };
    this.fields = [];
    this.childFieldGroups = {};
    this.barcodeConfig = null;
    this.configMessage = "";

    try {
      const response = await frappe.call({
        method: "mysys_barcode.api.get_barcode_doctype_config",
        args: {
          target_doctype: this.doctype,
          barcode_doctype: this.selectedBarcodeDoctype || null,
        },
      });
      this.barcodeConfig = response.message || null;
      this.selectedBarcodeDoctype = this.barcodeConfig?.name || this.selectedBarcodeDoctype || null;
      this.fields = Array.isArray(this.barcodeConfig?.fields) ? this.barcodeConfig.fields : [];
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
        args: { doctype: "Barcode Template", fields: ["name"], limit_page_length: 200 },
      });
      const select = $("#bs-template").empty().append("<option value=''>-- Template --</option>");
      for (const item of response.message || []) {
        select.append(`<option value="${escapeHtml(item.name)}">${escapeHtml(item.name)}</option>`);
      }
      if (this.templateName) select.val(this.templateName);
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
          pathShown || "",
        ].join(" ").toLowerCase();
        if (haystack.includes(query)) chip.addClass("match");
      }
      return chip;
    };

    const makeGroup = (title, groupClass, open, bodyHtml, hasToggle = true) => {
      const group = $(`
        <div class="bs-field-group ${open ? "open" : ""}" ${groupClass ? `data-ct="${escapeHtml(groupClass)}"` : ""}>
          <div class="fg-head">
            <div class="fg-title">${escapeHtml(title)}</div>
            <div class="fg-actions${hasToggle ? "" : " text-muted small"}">
              ${hasToggle ? `<button class="btn btn-xs btn-light fg-toggle" type="button">${open ? "−" : "+"}</button>` : "Fields"}
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
          group.find(".fg-toggle").text(group.hasClass("open") ? "−" : "+");
          const storedState = safeJsonParse(localStorage.getItem(uiKey), {});
          storedState[groupClass] = group.hasClass("open");
          localStorage.setItem(uiKey, JSON.stringify(storedState));
        });
        group.find(".fg-head").on("click", (event) => {
          if ($(event.target).closest(".fg-actions").length) return;
          group.toggleClass("open");
          group.find(".fg-toggle").text(group.hasClass("open") ? "−" : "+");
          const storedState = safeJsonParse(localStorage.getItem(uiKey), {});
          storedState[groupClass] = group.hasClass("open");
          localStorage.setItem(uiKey, JSON.stringify(storedState));
        });
      }
      return group;
    };

    const documentFields = [];
    const childGroups = new Map();

    for (const field of this.fields || []) {
      const bindingKey = field.binding_key || field.fieldname || "";
      const label = field.label || field.fieldname || bindingKey;
      if (query) {
        const haystack = [
          label,
          field.fieldname || "",
          bindingKey,
          field.child_table_field || "",
          field.child_doctype || "",
        ].join(" ").toLowerCase();
        if (!haystack.includes(query)) continue;
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
        sample_value: field.sample_value || "",
      };
      dataset.kind = this.isBarcodeField(dataset) ? "barcode" : "text";

      if (dataset.source_level === "Child Table") {
        const groupKey = field.child_table_field || field.child_doctype || "child";
        if (!childGroups.has(groupKey)) {
          childGroups.set(groupKey, {
            title: field.child_table_field || field.child_doctype || __("Child Table"),
            open: forceOpen || saved[groupKey] === true,
            items: [],
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
    if (!data) return null;
    const pick = ["print_qty", "qty_to_print", "quantity", "qty"];
    for (const key of pick) {
      const hit = Object.keys(data).find((candidate) => candidate.toLowerCase() === key);
      if (hit && !Number.isNaN(Number.parseFloat(data[hit]))) {
        const value = Number.parseInt(data[hit], 10);
        if (value > 0) return value;
      }
    }
    return null;
  }

  async loadTemplateByName(name) {
    if (!name) return false;
    try {
      const response = await frappe.call({
        method: "frappe.client.get",
        args: { doctype: "Barcode Template", name },
      });
      const doc = response.message;
      if (!doc) return false;
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
          read_only: isEdit ? 1 : 0,
        },
        {
          fieldname: "page_width_mm",
          fieldtype: "Float",
          label: `Width (${unitLabel})`,
          reqd: 1,
          default: this.formatDimension(this.canvas.pageWidthMM, unit),
        },
        {
          fieldname: "page_height_mm",
          fieldtype: "Float",
          label: `Height (${unitLabel})`,
          reqd: 1,
          default: this.formatDimension(this.canvas.pageHeightMM, unit),
        },
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
          source_doctype: this.doctype,
        };

        try {
          if (isEdit) {
            await frappe.call({
              method: "frappe.client.set_value",
              args: {
                doctype: "Barcode Template",
                name: this.templateName,
                fieldname: "source_doctype",
                value: this.doctype,
              },
            });
            await frappe.call({
              method: "frappe.client.set_value",
              args: {
                doctype: "Barcode Template",
                name: this.templateName,
                fieldname: "layout_json",
                value: payload.layout_json,
              },
            });
            await frappe.call({
              method: "frappe.client.set_value",
              args: {
                doctype: "Barcode Template",
                name: this.templateName,
                fieldname: "page_width_mm",
                value: pageWidthMM,
              },
            });
            await frappe.call({
              method: "frappe.client.set_value",
              args: {
                doctype: "Barcode Template",
                name: this.templateName,
                fieldname: "page_height_mm",
                value: pageHeightMM,
              },
            });
            await frappe.call({
              method: "frappe.client.set_value",
              args: {
                doctype: "Barcode Template",
                name: this.templateName,
                fieldname: "width_mm",
                value: pageWidthMM,
              },
            });
            await frappe.call({
              method: "frappe.client.set_value",
              args: {
                doctype: "Barcode Template",
                name: this.templateName,
                fieldname: "height_mm",
                value: pageHeightMM,
              },
            });
            dialog.hide();
            frappe.show_alert({ message: __("Template updated"), indicator: "green" });
          } else {
            const response = await frappe.call({
              method: "frappe.client.insert",
              args: {
                doc: Object.assign({ doctype: "Barcode Template", template_name: name }, payload),
              },
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
      },
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
}

export function mountBarcodeStudio(wrapper) {
  if (window.__barcode_studio__?.destroy) {
    window.__barcode_studio__.destroy();
  }
  window.__barcode_studio__ = new BarcodeStudioPage(wrapper);
  return window.__barcode_studio__;
}
