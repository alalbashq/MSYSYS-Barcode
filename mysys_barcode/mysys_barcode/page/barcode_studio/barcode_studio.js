// file: mysys_barcode/mysys_barcode/page/barcode_studio/barcode_studio.js

frappe.pages["barcode-studio"].on_page_load = function (wrapper) {
  window.__barcode_studio__ = new BarcodeStudioPage(wrapper);
};

if (frappe.router && frappe.router.on) {
  frappe.router.on("change", () => {
    const r = frappe.get_route();
    if (r[0] === "barcode-studio" && window.__barcode_studio__) {
      window.__barcode_studio__.onRoute && window.__barcode_studio__.onRoute();
    }
  });
}

class BarcodeStudioPage {
  constructor(wrapper) {
    this.wrapper = wrapper;

    // /app/barcode-studio/<doctype>/<name>/<template?>?ctx=<json|b64json>
    const r = frappe.get_route();
    this.doctype = r[1] || "Item";
    this.docname = r[2] || "";
    this.templateName = r[3] || null;

    // units & layout
    this.mmToPx = 3.779528; // ≈96 DPI
    this.pageWidthMM = 50;
    this.pageHeightMM = 30;
    this.scale = 1;
    this.snapMM = 1;

    // state
    this.meta = null;
    this.fields = [];
    this.canvas = null;
    this.docFromRoute = this._parseCtxFromRoute() || this._parseCtxFromRouteOptions();
    this.doc = null;

    // preview
    this.previewDebounced = frappe.utils ? frappe.utils.debounce(() => this.preview(), 200) : (() => this.preview());

    this.initPage();

    (async () => {
      await this.loadMetaAndDoc();
      this.initCanvas();
      this.buildFieldPalette();
      if (this.templateName) this.loadTemplate(this.templateName);
      this.preview();
      const c = this._resolveCopiesFromData();
      if (c) $("#bs-copies").val(c);
    })();
  }

  /* --------------------- utils --------------------- */
  _toStr(v) { if (v === null || v === undefined) return ""; try { return String(v); } catch { return (v + ""); } }

  _parseCtxFromRoute() {
    try {
      const hash = window.location.hash || "";
      const qIndex = hash.indexOf("?");
      if (qIndex === -1) return null;
      const query = hash.slice(qIndex + 1);
      const params = new URLSearchParams(query);
      if (!params.has("ctx")) return null;
      const raw = decodeURIComponent(params.get("ctx") || "");
      try { return JSON.parse(raw); } catch { try { return JSON.parse(atob(raw)); } catch { return null; } }
    } catch { return null; }
  }
  _parseCtxFromRouteOptions() {
    try {
      const ro = frappe.route_options || {};
      if (!ro.ctx) return null;
      if (typeof ro.ctx === "string") { try { return JSON.parse(ro.ctx); } catch { return null; } }
      if (typeof ro.ctx === "object") return ro.ctx;
      return null;
    } catch { return null; }
  }

  async onRoute() {
    const r = frappe.get_route();
    const d = r[1] || this.doctype;
    const n = r[2] || this.docname;
    const t = r[3] || null;
    const ctxRoute = this._parseCtxFromRoute();
    const changed = d !== this.doctype || n !== this.docname || t !== this.templateName || !!ctxRoute;
    if (!changed) return;

    this.doctype = d; this.docname = n; this.templateName = t;
    this.docFromRoute = ctxRoute || this._parseCtxFromRouteOptions();

    $("#bs-dt").val(this.doctype);
    $("#bs-name").val(this.docname);

    await this.loadMetaAndDoc();
    this.buildFieldPalette();
    if (this.templateName) this.loadTemplate(this.templateName);
    this.preview();

    const c = this._resolveCopiesFromData();
    if (c) $("#bs-copies").val(c);
  }

  /* --------------------- UI --------------------- */
  initPage() {
    this.page = frappe.ui.make_app_page({ parent: this.wrapper, title: "Barcode Studio", single_column: true });
    const body = this.page.wrapper.find(".page-body");

    $(`
      <div class="bs-wrap p-3">
        <div class="d-flex align-items-center mb-2" style="gap:10px">
          <input id="bs-dt" class="form-control form-control-sm" style="max-width:200px" />
          <input id="bs-name" class="form-control form-control-sm" style="max-width:220px" placeholder="NAME"/>
          <select id="bs-template" class="form-control form-control-sm" style="max-width:220px"></select>
          <button id="bs-reload" class="btn btn-sm btn-light">Reload</button>
          <div class="ml-auto d-flex" style="gap:8px">
            <select id="bs-output" class="form-control form-control-sm" style="width:140px">
              <option value="html" selected>HTML (Vector)</option>
              <option value="image">Image (HiDPI)</option>
            </select>
            <select id="bs-dpi" class="form-control form-control-sm" style="width:110px" title="Image DPI">
              <option value="300" selected>300 DPI</option>
              <option value="600">600 DPI</option>
              <option value="96">96 DPI</option>
            </select>
            <input id="bs-copies" type="number" min="1" class="form-control form-control-sm" style="width:90px" placeholder="Copies"/>
            <input id="bs-w" type="number" class="form-control form-control-sm" style="width:90px" />
            <input id="bs-h" type="number" class="form-control form-control-sm" style="width:90px" />
            <input id="bs-scale" type="number" step="0.1" class="form-control form-control-sm" style="width:90px" />
            <button id="bs-apply" class="btn btn-sm btn-primary">Apply</button>
            <button id="bs-clear" class="btn btn-sm btn-warning">Clear</button>
            <button id="bs-print" class="btn btn-sm btn-primary">Print</button>
            <button id="bs-save" class="btn btn-sm btn-secondary">Save</button>
          </div>
        </div>

        <div class="row" style="gap:10px">
          <div class="col-auto">
            <div class="card p-2" style="width:260px">
              <div class="font-weight-bold mb-1">Fields</div>
              <div id="bs-fields" class="bs-fields small"
                   style="height:420px; overflow:auto; border:1px dashed #ddd; padding:6px"></div>
              <hr/>
              <div class="font-weight-bold mb-1">Components</div>
              <div class="d-flex flex-wrap" style="gap:6px">
                <button class="btn btn-sm btn-outline-secondary" data-add="text">+ Text</button>
                <button class="btn btn-sm btn-outline-secondary" data-add="barcode">+ Barcode</button>
              </div>
              <hr/>
              <div class="font-weight-bold mb-1">Align</div>
              <div class="d-flex flex-wrap" style="gap:6px">
                <button class="btn btn-sm btn-light" data-align="left">Left</button>
                <button class="btn btn-sm btn-light" data-align="center">Center</button>
                <button class="btn btn-sm btn-light" data-align="right">Right</button>
                <button class="btn btn-sm btn-light" data-align="top">Top</button>
                <button class="btn btn-sm btn-light" data-align="middle">Middle</button>
                <button class="btn btn-sm btn-light" data-align="bottom">Bottom</button>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card p-2">
              <div class="bb-stage" style="transform-origin:top left">
                <canvas id="bs-canvas"></canvas>
              </div>
            </div>
            <div class="card mt-2 p-2">
              <div class="font-weight-bold mb-1">Preview</div>
              <div id="bs-preview"></div>
            </div>
          </div>

          <div class="col-auto">
            <div class="card p-2" style="width:280px">
              <div class="font-weight-bold mb-2">Properties</div>
              <div id="bs-props" class="small text-muted"><em>Select an object</em></div>
            </div>
          </div>
        </div>
      </div>
    `).appendTo(body);

    $("#bs-dt").val(this.doctype);
    $("#bs-name").val(this.docname);
    $("#bs-w").val(this.pageWidthMM);
    $("#bs-h").val(this.pageHeightMM);
    $("#bs-scale").val(this.scale);

    // actions
    $("#bs-apply").on("click", () => { this.applyPage(); this.previewDebounced(); });
    $("#bs-reload").on("click", () => this.loadMetaAndDoc().then(() => { this.preview(); const c=this._resolveCopiesFromData(); if(c) $("#bs-copies").val(c); }));
    $("#bs-print").on("click", () => this.doPrint());
    $("#bs-save").on("click", () => this.saveTemplateDialog());

    // CLEAR design
    $("#bs-clear").on("click", () => {
      if (!this.canvas) return;
      const doClear = () => {
        this.canvas.clear();
        this.renderProps(null);
        this.canvas.setWidth(this.pageWidthMM * this.mmToPx);
        this.canvas.setHeight(this.pageHeightMM * this.mmToPx);
        this.canvas.calcOffset();
        this.canvas.requestRenderAll();
        this.preview();
        frappe.show_alert({ message: __("Canvas cleared"), indicator: "orange" });
      };
      if (frappe.confirm) {
        frappe.confirm(
          __("Clear current design? This will remove all objects from the canvas."),
          doClear,
          () => {}
        );
      } else {
        if (window.confirm("Clear current design?")) doClear();
      }
    });

    // quick add & align
    $('[data-add]').on('click', (e) => { this.addComponent(e.currentTarget.getAttribute('data-add')); this.previewDebounced(); });
    $('[data-align]').on('click', (e) => { this.alignSelected(e.currentTarget.getAttribute('data-align')); this.previewDebounced(); });

    // load templates
    this.fillTemplates();
    $("#bs-template").on("change", (e) => {
      const t = e.target.value || "";
      frappe.set_route("barcode-studio", this.doctype, this.docname || "", t || "");
      if (t) this.loadTemplate(t);
    });

    // doctype/name change
    const delayedReload = frappe.utils ? frappe.utils.debounce(async () => {
      await this.loadMetaAndDoc();
      this.buildFieldPalette();
      this.preview();
      const c = this._resolveCopiesFromData();
      if (c) $("#bs-copies").val(c);
    }, 300) : async () => {
      await this.loadMetaAndDoc(); this.buildFieldPalette(); this.preview();
      const c = this._resolveCopiesFromData(); if (c) $("#bs-copies").val(c);
    };
    $("#bs-dt, #bs-name").on("change input", delayedReload);
  }

  /* --------------------- data --------------------- */
  async loadMetaAndDoc() {
    this.doctype = ($("#bs-dt").val() || this.doctype).trim();
    this.docname = ($("#bs-name").val() || this.docname).trim();

    await new Promise((res) =>
      frappe.model.with_doctype(this.doctype, () => {
        this.meta = frappe.get_meta(this.doctype);
        this.fields = (this.meta.fields || [])
          .filter((df) => ["Data","Small Text","Long Text","Select","Link","Dynamic Link","Int","Float","Currency","Percent","Date","Datetime","Time","Read Only","Barcode","Text Editor"].includes(df.fieldtype))
          .map((df) => ({ label: df.label || df.fieldname, fieldname: df.fieldname, fieldtype: df.fieldtype }));
        if (!this.fields.find((f) => f.fieldname === "name")) this.fields.unshift({ label: "name", fieldname: "name", fieldtype: "Data" });
        res();
      })
    );

    if (this.docFromRoute && typeof this.docFromRoute === "object") {
      this.doc = this.docFromRoute;
    } else if (this.docname) {
      const r = await frappe.call({ method: "frappe.client.get", args: { doctype: this.doctype, name: this.docname } });
      this.doc = r.message || null;
    } else {
      this.doc = null;
    }
  }

  fillTemplates() {
    frappe.call({
      method: "frappe.client.get_list",
      args: { doctype: "Barcode Template", fields: ["name"], limit_page_length: 200 },
    }).then((r) => {
      const sel = $("#bs-template").empty().append(`<option value="">-- Template --</option>`);
      (r.message || []).forEach((t) => sel.append(`<option value="${t.name}">${t.name}</option>`));
      if (this.templateName) sel.val(this.templateName);
    });
  }

  buildFieldPalette() {
    const $p = $("#bs-fields").empty();
    if (!this.fields.length) { $p.html(`<div class="text-muted">No fields</div>`); return; }
    this.fields.forEach((f) => {
      const chip = $(
        `<div class="bs-chip badge badge-light" draggable="true"
            data-field="${frappe.utils.escape_html(f.fieldname)}"
            data-type="${f.fieldtype}"
            style="cursor:grab; margin:3px; padding:6px 8px; display:inline-block">
            ${frappe.utils.escape_html(f.label || f.fieldname)}
         </div>`
      );
      chip.on("dragstart", (ev) => { ev.originalEvent.dataTransfer.setData("text/plain", JSON.stringify(f)); });
      $p.append(chip);
    });
  }

  /* --------------------- canvas --------------------- */
  initCanvas() {
    const wpx = this.pageWidthMM * this.mmToPx;
    const hpx = this.pageHeightMM * this.mmToPx;
    this.canvas = new fabric.Canvas("bs-canvas", {
      width: wpx, height: hpx, selection: true, preserveObjectStacking: true,
    });
    $(".bb-stage").css("transform", `scale(${this.scale})`);

    const snap = this.snapMM * this.mmToPx;
    const keepInside = (obj) => {
      const b = obj.getBoundingRect(true);
      obj.left = Math.min(Math.max(Math.round(obj.left / snap) * snap, 0), this.canvas.getWidth() - b.width);
      obj.top  = Math.min(Math.max(Math.round(obj.top  / snap) * snap, 0), this.canvas.getHeight() - b.height);
      obj.setCoords();
    };

    this.canvas.on("object:moving", ({target}) => { keepInside(target); this.previewDebounced(); });
    this.canvas.on("object:scaled", ({target}) => { keepInside(target); this.previewDebounced(); });
    ["selection:created","selection:updated"].forEach(evt => this.canvas.on(evt, e => this.renderProps(e.target)));
    this.canvas.on("selection:cleared", () => this.renderProps(null));
    this.canvas.on("object:modified", e => { this.renderProps(e.target); this.previewDebounced(); });
    this.canvas.on("object:added", () => this.previewDebounced());
    this.canvas.on("object:removed", () => this.previewDebounced());

    // drag from fields
    const cEl = this.canvas.upperCanvasEl;
    cEl.addEventListener("dragover", (e) => e.preventDefault());
    cEl.addEventListener("drop", (e) => {
      e.preventDefault();
      const data = JSON.parse(e.dataTransfer.getData("text/plain") || "{}");
      const p = this.canvas.getPointer(e);
      const isBarcode = /barcode|item_code|ean|upc/i.test(data.fieldname);
      if (isBarcode) this.addBarcodeAt(p.x, p.y, this._toStr(this.doc?.[data.fieldname]) || "", data.fieldname);
      else this.addTextAt(p.x, p.y, this._toStr(this.doc?.[data.fieldname]) || `{{ ${data.fieldname} }}`, data.fieldname);
      this.previewDebounced();
    });

    // delete selected
    document.addEventListener("keydown", (e) => {
      if ((e.key === "Delete" || e.key === "Backspace") && this.canvas.getActiveObject()) {
        this.canvas.remove(this.canvas.getActiveObject());
        this.canvas.discardActiveObject();
        this.renderProps(null);
        this.previewDebounced();
      }
      // Ctrl/Cmd+K to clear
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        $("#bs-clear").click();
      }
    });
  }

  applyPage() {
    const w = parseFloat($("#bs-w").val());
    const h = parseFloat($("#bs-h").val());
    const s = parseFloat($("#bs-scale").val());
    if (w > 0 && h > 0) {
      this.pageWidthMM = w; this.pageHeightMM = h; this.scale = isNaN(s) ? 1 : s;
      this.canvas.setWidth(w * this.mmToPx); this.canvas.setHeight(h * this.mmToPx);
      this.canvas.calcOffset(); $(".bb-stage").css("transform", `scale(${this.scale})`);
      this.canvas.requestRenderAll();
    }
  }

  /* --------------------- components --------------------- */
  addComponent(type) { if (type === "text") this.addTextAt(20, 20, "New Text", ""); else if (type === "barcode") this.addBarcodeAt(20, 20, "123456789012", ""); }
  addTextAt(x, y, text, bindField = "") {
    const o = new fabric.Textbox(text || "Text", { left:x, top:y, fontSize:12, padding:2, textAlign:"left", customType:"text", bindField });
    this.canvas.add(o).setActiveObject(o); this.renderProps(o);
  }
  addBarcodeAt(x, y, value, bindField = "") {
    const fmt = "CODE128", bw = 2, bh = 60;
    const url = this._barcodeDataURL(value || " ", fmt, bw, bh, false);
    fabric.Image.fromURL(url, (img) => {
      img.set({ left:x, top:y, customType:"barcode", barcodeValue:value||"", format:fmt, barWidth:bw, barHeight:bh, displayValue:false, bindField });
      this.canvas.add(img).setActiveObject(img); this.renderProps(img);
    });
  }
  _barcodeDataURL(value, format, width, height, displayValue) {
    const tmp = document.createElement("canvas");
    try { JsBarcode(tmp, value || " ", { format, width, height, displayValue }); } catch(e) {}
    return tmp.toDataURL();
  }

  /* --------------------- properties --------------------- */
  renderProps(obj) {
    const $p = $("#bs-props").empty();
    if (!obj) { $p.html("<em>Select an object</em>"); return; }

    const input = (lbl, name, val, type="text") =>
      $(`<div class="form-group mb-1">
          <label class="small text-muted">${lbl}</label>
          <input class="form-control form-control-sm" name="${name}" type="${type}" value="${val ?? ""}"/>
        </div>`);
    const bindSelect = () => {
      const opts = ['<option value="">-- None --</option>']
        .concat((this.fields||[]).map(f => `<option value="${f.fieldname}">${frappe.utils.escape_html(f.label||f.fieldname)}</option>`));
      const el = $(`<div class="form-group mb-1">
          <label class="small text-muted">Bind to Field</label>
          <select class="form-control form-control-sm" name="bindField">${opts.join("")}</select>
        </div>`);
      el.find("select").val(obj.bindField || "");
      el.on("change","select", () => this.previewDebounced());
      return el;
    };

    $p.append(input("Left (px)","left",Math.round(obj.left),"number"));
    $p.append(input("Top (px)","top",Math.round(obj.top),"number"));

    if (obj.isType && obj.isType("textbox")) {
      $p.append(input("Text","text",obj.text,"text"));
      $p.append(input("Font Size","fontSize",obj.fontSize,"number"));
      $p.append(bindSelect());
    } else if (obj.customType === "barcode") {
      $p.append(input("Value","barcodeValue",obj.barcodeValue,"text"));
      $p.append(input("Bar Width","barWidth",obj.barWidth,"number"));
      $p.append(input("Bar Height","barHeight",obj.barHeight,"number"));
      $p.append(bindSelect());
    }

    $p.find("input,select").on("input change", (e)=>{
      const k = e.target.name;
      const v = e.target.type==="number" ? parseFloat(e.target.value) : e.target.value;
      obj.set(k, v);
      if (obj.customType==="barcode" && ["barcodeValue","barWidth","barHeight"].includes(k)) {
        const url = this._barcodeDataURL(obj.barcodeValue||" ", obj.format||"CODE128", parseInt(obj.barWidth||2), parseInt(obj.barHeight||60), !!obj.displayValue);
        obj.setSrc(url, () => this.canvas.requestRenderAll());
      }
      obj.setCoords(); this.canvas.requestRenderAll(); this.previewDebounced();
    });
  }

  /* --------------------- align --------------------- */
  alignSelected(dir) {
    const o = this.canvas.getActiveObject(); if (!o) return;
    const W = this.canvas.getWidth(), H = this.canvas.getHeight();
    const b = o.getBoundingRect(true);
    if (dir==="left") o.left = 0;
    if (dir==="right") o.left = W - b.width;
    if (dir==="center") o.left = (W - b.width)/2;
    if (dir==="top") o.top = 0;
    if (dir==="bottom") o.top = H - b.height;
    if (dir==="middle") o.top = (H - b.height)/2;
    o.setCoords(); this.canvas.requestRenderAll(); this.previewDebounced();
  }

  /* --------------------- templates --------------------- */
  loadTemplate(name) {
    frappe.call({ method:"frappe.client.get", args:{ doctype:"Barcode Template", name } }).then(r=>{
      const doc = r.message;
      if (doc.page_width_mm) this.pageWidthMM = parseFloat(doc.page_width_mm);
      if (doc.page_height_mm) this.pageHeightMM = parseFloat(doc.page_height_mm);
      $("#bs-w").val(this.pageWidthMM); $("#bs-h").val(this.pageHeightMM);
      this.canvas.setWidth(this.pageWidthMM*this.mmToPx);
      this.canvas.setHeight(this.pageHeightMM*this.mmToPx);
      this.canvas.calcOffset();

      this.canvas.clear();
      (JSON.parse(doc.layout_json||"[]")||[]).forEach(o=>{
        if (o.type==="textbox") {
          const t = new fabric.Textbox(o.text || "", Object.assign({}, o, { customType:"text" }));
          this.canvas.add(t);
        } else if (o.type==="image" && (o.barcodeValue || o.src)) {
          if (o.barcodeValue) {
            const url = this._barcodeDataURL(o.barcodeValue, o.format||"CODE128", parseInt(o.barWidth||2), parseInt(o.barHeight||60), !!o.displayValue);
            fabric.Image.fromURL(url, img=> { img.set(Object.assign({}, o, { customType:"barcode" })); this.canvas.add(img); });
          } else if (o.src) {
            fabric.Image.fromURL(o.src, img=> { img.set(o); this.canvas.add(img); });
          }
        }
      });
      this.canvas.requestRenderAll(); this.preview();
    });
  }

  saveTemplateDialog() {
    const isEdit = !!this.templateName;
    const d = new frappe.ui.Dialog({
      title: __(isEdit ? "Update Template" : "Save Template"),
      fields: [
        { fieldname:"template_name", fieldtype:"Data", label:"Template Name", reqd:1, default:this.templateName || "" },
        { fieldname:"page_width_mm", fieldtype:"Float", label:"Width (mm)", reqd:1, default:this.pageWidthMM },
        { fieldname:"page_height_mm", fieldtype:"Float", label:"Height (mm)", reqd:1, default:this.pageHeightMM },
      ],
      primary_action_label: __(isEdit ? "Update" : "Save"),
      primary_action: () => {
        const name = d.get_value("template_name");
        const pw = d.get_value("page_width_mm");
        const ph = d.get_value("page_height_mm");
        const payload = this.serializeObjects();
        const doc = { layout_json: JSON.stringify(payload), page_width_mm: pw, page_height_mm: ph };

        if (isEdit) {
          Promise.resolve()
            .then(()=> frappe.call({ method:"frappe.client.set_value", args:{ doctype:"Barcode Template", name:this.templateName, fieldname:"layout_json", value:doc.layout_json }}))
            .then(()=> frappe.call({ method:"frappe.client.set_value", args:{ doctype:"Barcode Template", name:this.templateName, fieldname:"page_width_mm", value:pw }}))
            .then(()=> frappe.call({ method:"frappe.client.set_value", args:{ doctype:"Barcode Template", name:this.templateName, fieldname:"page_height_mm", value:ph }}))
            .then(()=> { d.hide(); frappe.show_alert({message:__("Template updated"), indicator:"green"}); });
        } else {
          frappe.call({ method:"frappe.client.insert", args:{ doc:Object.assign({doctype:"Barcode Template", template_name:name}, doc) } })
            .then(r=>{ this.templateName = r.message.name; $("#bs-template").val(this.templateName); d.hide(); frappe.set_route("barcode-studio", this.doctype, this.docname || "", this.templateName); });
        }
      }
    });
    d.show();
  }

  serializeObjects() {
    return this.canvas.getObjects().map(o=>{
      const base = { type:o.type, left:o.left, top:o.top, width:o.getScaledWidth(), height:o.getScaledHeight(), bindField:o.bindField || "" };
      if (o.isType && o.isType("textbox"))
        return Object.assign(base, { text:o.text, fontSize:o.fontSize, textAlign:o.textAlign, padding:o.padding, customType:"text" });
      if (o.customType==="barcode")
        return Object.assign(base, { src:o.toDataURL(), barcodeValue:o.barcodeValue, format:o.format||"CODE128", barWidth:o.barWidth||2, barHeight:o.barHeight||60, displayValue: !!o.displayValue, customType:"barcode", type:"image" });
      return base;
    });
  }

  /* --------------------- preview & print --------------------- */
  preview() {
    const data = this.docFromRoute || this.doc || null;
    if (data) {
      this.canvas.getObjects().forEach(obj => {
        if (obj.isType && obj.isType("textbox") && obj.bindField) {
          obj.text = this._toStr(data[obj.bindField] ?? obj.text);
        } else if (obj.customType==="barcode") {
          if (obj.bindField) obj.barcodeValue = this._toStr(data[obj.bindField] ?? obj.barcodeValue);
          const url = this._barcodeDataURL(obj.barcodeValue || " ", obj.format || "CODE128", parseInt(obj.barWidth || 2), parseInt(obj.barHeight || 60), !!obj.displayValue);
          obj.setSrc(url);
        }
      });
      this.canvas.requestRenderAll();
    }
    const dataURL = this.canvas.toDataURL({ format:"png" });
    $("#bs-preview").html(`<img src="${dataURL}" style="max-width:100%; border:1px solid #eee"/>`);
  }

  _resolveCopiesFromData() {
    const data = this.docFromRoute || this.doc || null;
    if (!data) return null;
    const keys = Object.keys(data);
    const pick = ['print_qty','qty_to_print','quantity','qty'];
    for (const k of pick) {
      const hit = keys.find(x => x.toLowerCase() === k);
      if (hit && !isNaN(parseFloat(data[hit]))) {
        const v = parseInt(data[hit], 10);
        if (v > 0) return v;
      }
    }
    return null;
  }

  async doPrint() {
    const mode = ($("#bs-output").val() || "html").toLowerCase();
    let copies = parseInt($("#bs-copies").val() || "0", 10);
    if (!(copies > 0)) {
      const auto = this._resolveCopiesFromData();
      copies = (auto && auto > 0) ? auto : 1;
      $("#bs-copies").val(copies);
    }

    this.preview(); // ensure latest

    if (mode === "image") return this._printAsHiDpiImage(copies);
    else return this._printAsVectorHTML(copies);
  }

  // Image mode (HiDPI raster)
  async _printAsHiDpiImage(copies) {
    const dpi = parseInt($("#bs-dpi").val() || "300", 10);
    const multiplier = Math.max(1, dpi / 96);
    const imgData = this.canvas.toDataURL({ format: "png", multiplier });
    const wmm = this.pageWidthMM, hmm = this.pageHeightMM;

    const imgs = Array.from({ length: copies }, () => `<img src="${imgData}" />`).join("");
    const html = `<!doctype html><html><head><meta charset='utf-8'><style>
      @page{size:${wmm}mm ${hmm}mm;margin:0}
      body{margin:0;display:flex;flex-direction:column}
      img{width:${wmm}mm;height:${hmm}mm;image-rendering:crisp-edges;image-rendering:-webkit-optimize-contrast;}
    </style></head><body>${imgs}</body></html>`;
    const w = window.open("about:blank");
    w.document.write(html); w.document.close(); w.focus(); w.print();
  }

  // HTML Vector mode (SVG/text in mm)
  _printAsVectorHTML(copies) {
    const data = this.docFromRoute || this.doc || {};
    const W = this.pageWidthMM, H = this.pageHeightMM;
    const px2mm = (px) => (px / this.mmToPx);
    const esc = (s) => (s==null ? "" : String(s)).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

    const buildLabelInner = () => {
      const parts = [];
      this.canvas.getObjects().forEach((o) => {
        const leftMM = px2mm(o.left).toFixed(3);
        const topMM  = px2mm(o.top).toFixed(3);
        const widthMM = px2mm(o.getScaledWidth()).toFixed(3);
        const heightMM= px2mm(o.getScaledHeight()).toFixed(3);

        if (o.isType && o.isType("textbox")) {
          const text = esc(o.bindField ? (data[o.bindField] ?? o.text) : o.text);
          const fontMM = px2mm(o.fontSize || 12).toFixed(3);
          parts.push(
            `<div style="position:absolute;left:${leftMM}mm;top:${topMM}mm;width:${widthMM}mm;height:${heightMM}mm;`+
            `font-size:${fontMM}mm;line-height:1;white-space:nowrap;text-align:${o.textAlign||'left'};">${text}</div>`
          );
        } else if (o.customType === "barcode") {
          const val = esc(o.bindField ? (data[o.bindField] ?? o.barcodeValue) : o.barcodeValue);
          const fmt = o.format || "CODE128";
          const barWidth = parseInt(o.barWidth || 2, 10);
          const barHeight= parseInt(o.barHeight|| 60, 10);

          const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          try {
            JsBarcode(svg, val || " ", { format: fmt, width: barWidth, height: barHeight, displayValue: !!o.displayValue });
          } catch(e) {}
          svg.setAttribute("width", `${widthMM}mm`);
          svg.setAttribute("height", `${heightMM}mm`);
          parts.push(
            `<div style="position:absolute;left:${leftMM}mm;top:${topMM}mm;width:${widthMM}mm;height:${heightMM}mm;">${svg.outerHTML}</div>`
          );
        }
      });
      return parts.join("");
    };

    const label = `<div class="label" style="position:relative;width:${W}mm;height:${H}mm;">${buildLabelInner()}</div>`;
    const content = Array.from({length: copies}, () => label).join("");

    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
      @page{size:${W}mm ${H}mm;margin:0}
      html,body{margin:0;padding:0}
      .sheet{display:flex;flex-direction:column}
      .label{break-inside:avoid}
      svg{shape-rendering:crispEdges}
    </style></head><body><div class="sheet">${content}</div></body></html>`;

    const w = window.open("about:blank");
    w.document.write(html); w.document.close(); w.focus(); w.print();
  }
}
  