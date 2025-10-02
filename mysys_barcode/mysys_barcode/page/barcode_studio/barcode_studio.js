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

    // zoom (design-time only)
    this.scale = 1;       // 1 = 100%
    this.snapMM = 1;

    // state
    this.meta = null;
    this.fields = [];            // top-level fields
    this.childFieldGroups = {};  // child tables palette
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

  // deep getter: a.b, items[0].code, items[].code (first row)
  _getByPath(obj, path) {
    if (!obj || !path) return undefined;
    const segs = path.replace(/\[(\d*)\]/g, '.$1').split('.').filter(Boolean);
    let cur = obj;
    for (let i = 0; i < segs.length; i++) {
      const k = segs[i];
      if (Array.isArray(cur)) {
        const idx = (k === '' ? 0 : parseInt(k, 10));
        cur = cur?.[idx];
      } else {
        cur = cur?.[k];
      }
      if (cur === undefined || cur === null) break;
    }
    return cur;
  }

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
        <div class="d-flex align-items-center mb-2 flex-wrap" style="gap:10px">
          <input id="bs-dt" class="form-control form-control-sm" style="max-width:200px" />
          <input id="bs-name" class="form-control form-control-sm" style="max-width:220px" placeholder="NAME"/>
          <select id="bs-template" class="form-control form-control-sm" style="max-width:220px"></select>
          <button id="bs-reload" class="btn btn-sm btn-light">Reload</button>

          <div class="d-flex align-items-center" style="gap:6px">
            <span class="text-muted small">Zoom</span>
            <button id="bs-zoom-out" class="btn btn-sm btn-light">−</button>
            <input id="bs-zoom" type="range" min="10" max="400" value="100" style="width:140px"/>
            <button id="bs-zoom-in" class="btn btn-sm btn-light">+</button>
            <button id="bs-zoom-reset" class="btn btn-sm btn-light" title="100%">Reset</button>
            <span id="bs-zoom-label" class="small text-muted">100%</span>
          </div>

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
            <button id="bs-apply" class="btn btn-sm btn-primary">Apply</button>
            <button id="bs-clear" class="btn btn-sm btn-warning">Clear</button>
            <button id="bs-print" class="btn btn-sm btn-primary">Print</button>
            <button id="bs-save" class="btn btn-sm btn-secondary">Save</button>
          </div>
        </div>

        <div class="row" style="gap:10px">
          <div class="col-auto">
            <div class="card p-2" style="width:280px">
              <div class="font-weight-bold mb-1">Fields</div>
              <div id="bs-fields" class="bs-fields small"
                   style="max-height:440px; overflow:auto; border:1px dashed #ddd; padding:6px"></div>
            </div>
          </div>

          <div class="col">
            <div class="card p-2">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <div class="font-weight-bold">Canvas</div>
                <div class="btn-group btn-group-sm" role="group">
                  <button class="btn btn-light" data-align="left" title="Align Left">⟸</button>
                  <button class="btn btn-light" data-align="center" title="Align Center">↔</button>
                  <button class="btn btn-light" data-align="right" title="Align Right">⟹</button>
                  <button class="btn btn-light" data-align="top" title="Align Top">⟰</button>
                  <button class="btn btn-light" data-align="middle" title="Align Middle">↕</button>
                  <button class="btn btn-light" data-align="bottom" title="Align Bottom">⟱</button>
                </div>
                <div class="btn-group btn-group-sm" role="group" id="text-style-group">
                  <button class="btn btn-outline-secondary" data-textalign="left" title="Text Left">L</button>
                  <button class="btn btn-outline-secondary" data-textalign="center" title="Text Center">C</button>
                  <button class="btn btn-outline-secondary" data-textalign="right" title="Text Right">R</button>
                  <button class="btn btn-outline-secondary" id="btn-clear-value" title="Clear Value">Clear Value</button>
                </div>
              </div>
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
            <div class="card p-2" style="width:300px">
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

    // --- Zoom controls ---
    this._applyZoomUI(1); // 100%
    $("#bs-zoom").on("input", (e)=> this.setZoom(parseInt(e.target.value,10)/100));
    $("#bs-zoom-in").on("click", ()=> this.setZoom(this.scale + 0.1));
    $("#bs-zoom-out").on("click", ()=> this.setZoom(this.scale - 0.1));
    $("#bs-zoom-reset").on("click", ()=> this.setZoom(1));

    // actions
    $("#bs-apply").on("click", () => { this.applyPage(); this.previewDebounced(); });
    $("#bs-reload").on("click", () => this.loadMetaAndDoc().then(() => { this.buildFieldPalette(); this.preview(); const c=this._resolveCopiesFromData(); if(c) $("#bs-copies").val(c); }));
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
          doClear, () => {}
        );
      } else {
        if (window.confirm("Clear current design?")) doClear();
      }
    });

    // canvas align buttons
    $('[data-align]').on('click', (e) => { this.alignSelected(e.currentTarget.getAttribute('data-align')); this.previewDebounced(); });

    // text align quick buttons (only if textbox)
    $('[data-textalign]').on('click', (e) => {
      const o = this.canvas?.getActiveObject();
      if (o && o.isType && o.isType("textbox")) {
        o.set("textAlign", e.currentTarget.getAttribute('data-textalign'));
        o.setCoords(); this.canvas.requestRenderAll(); this.previewDebounced();
      }
    });

    // "Clear Value" button — لا يحذف الـComponent
    $('#btn-clear-value').on('click', () => {
      const o = this.canvas?.getActiveObject();
      if (!o) return;
      if (o.isType && o.isType("textbox")) {
        o.set("text", ""); o.setCoords();
      } else if (o.customType === "barcode") {
        o.set("barcodeValue", "");
        const url = this._barcodeDataURL(" ", o.format || "CODE128",
          parseInt(o.barWidth || 2), parseInt(o.barHeight || 60),
          !!o.displayValue,
          { mt:o.marginTop||0, mr:o.marginRight||0, mb:o.marginBottom||0, ml:o.marginLeft||0 }
        );
        o.setSrc(url);
      }
      this.canvas.requestRenderAll(); this.previewDebounced();
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

    // templates dropdown
    this.fillTemplates();
    $("#bs-template").on("change", (e) => {
      const t = e.target.value || "";
      frappe.set_route("barcode-studio", this.doctype, this.docname || "", t || "");
      if (t) this.loadTemplate(t);
    });
  }

  _applyZoomUI(scale) {
    // clamp & apply css transform
    this.scale = Math.max(0.1, Math.min(4, scale));
    $(".bb-stage").css("transform", `scale(${this.scale})`);
    $("#bs-zoom").val(Math.round(this.scale * 100));
    $("#bs-zoom-label").text(`${Math.round(this.scale * 100)}%`);
  }
  setZoom(scale) { this._applyZoomUI(scale); }

  /* --------------------- data --------------------- */
  async loadMetaAndDoc() {
    this.doctype = ($("#bs-dt").val() || this.doctype).trim();
    this.docname = ($("#bs-name").val() || this.docname).trim();

    // Meta
    await new Promise((res) =>
      frappe.model.with_doctype(this.doctype, async () => {
        this.meta = frappe.get_meta(this.doctype);

        // top-level
        this.fields = (this.meta.fields || [])
          .filter((df) => ["Data","Small Text","Long Text","Select","Link","Dynamic Link","Int","Float","Currency","Percent","Date","Datetime","Time","Read Only","Barcode","Text Editor"].includes(df.fieldtype))
          .map((df) => ({ label: df.label || df.fieldname, fieldname: df.fieldname, fieldtype: df.fieldtype }));

        if (!this.fields.find((f) => f.fieldname === "name"))
          this.fields.unshift({ label: "name", fieldname: "name", fieldtype: "Data" });

        // child tables
        const childTables = (this.meta.fields || []).filter(df => df.fieldtype === "Table");
        this.childFieldGroups = {};
        for (const ct of childTables) {
          if (!ct.options) continue;
          await new Promise((done) => frappe.model.with_doctype(ct.options, () => done()));
          const childMeta = frappe.get_meta(ct.options);
          const chFields = (childMeta.fields || [])
            .filter((df) => ["Data","Small Text","Long Text","Select","Link","Dynamic Link","Int","Float","Currency","Percent","Date","Datetime","Time","Read Only","Barcode","Text Editor"].includes(df.fieldtype))
            .map((df) => ({
              label: `${ct.label || ct.fieldname} › ${df.label || df.fieldname}`,
              fieldname: `${ct.fieldname}.${df.fieldname}`,
              fieldname_indexed: `${ct.fieldname}[].${df.fieldname}`,
              fieldtype: df.fieldtype,
              child_table: ct.fieldname
            }));
          this.childFieldGroups[ct.fieldname] = { child_dt: ct.options, fields: chFields };
        }
        res();
      })
    );

    // Document
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

    // Top-level
    const top = $(`<div class="mb-2">
        <div class="text-muted mb-1">Top-level</div>
        <div class="d-flex flex-wrap" style="gap:6px"></div>
      </div>`).appendTo($p);
    const topWrap = top.find('div.d-flex');
    (this.fields || []).forEach((f) => {
      const chip = $(
        `<div class="badge badge-light" draggable="true"
            data-path="${frappe.utils.escape_html(f.fieldname)}"
            data-field="${frappe.utils.escape_html(f.fieldname)}"
            data-type="${f.fieldtype}"
            style="cursor:grab; padding:6px 8px;">${frappe.utils.escape_html(f.label || f.fieldname)}</div>`
      );
      chip.on("dragstart", (ev) => ev.originalEvent.dataTransfer.setData("text/plain", JSON.stringify({ path: f.fieldname, fieldname: f.fieldname, fieldtype: f.fieldtype })));
      topWrap.append(chip);
    });

    // Child tables
    Object.keys(this.childFieldGroups).forEach(ct => {
      const grp = this.childFieldGroups[ct];
      const box = $(`<div class="mb-2">
        <div class="text-muted mb-1">${frappe.utils.escape_html(ct)} (Child Table)</div>
        <div class="d-flex flex-wrap" style="gap:6px"></div>
      </div>`).appendTo($p);
      const wrap = box.find('div.d-flex');
      grp.fields.forEach((f) => {
        const chip = $(
          `<div class="badge badge-info" draggable="true"
             data-path="${frappe.utils.escape_html(f.fieldname)}"
             data-path-indexed="${frappe.utils.escape_html(f.fieldname_indexed)}"
             data-type="${f.fieldtype}"
             style="cursor:grab; padding:6px 8px;">
             ${frappe.utils.escape_html(f.label)}
           </div>`
        );
        chip.on("dragstart", (ev) => {
          const payload = { path: f.fieldname_indexed, fieldname: f.fieldname_indexed, fieldtype: f.fieldtype, is_child: true };
          ev.originalEvent.dataTransfer.setData("text/plain", JSON.stringify(payload));
        });
        wrap.append(chip);
      });
    });

    if (!$p.children().length) {
      $p.html(`<div class="text-muted">No fields</div>`);
    }
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

    // drag from fields → chooser (Text / Barcode)
    const cEl = this.canvas.upperCanvasEl;
    cEl.addEventListener("dragover", (e) => e.preventDefault());
    cEl.addEventListener("drop", (e) => {
      e.preventDefault();
      const data = JSON.parse(e.dataTransfer.getData("text/plain") || "{}");
      const p = this.canvas.getPointer(e);
      this._chooseAddAs(data, p.x, p.y);
    });

    // Keyboard handling:
    // - Delete: يحذف الـComponent لكن فقط إذا التركيز على الكانفس، وليس في وضع تحرير النص.
    // - Backspace: لا نفعل شيء (يُترك لسياق الإدخال).
    document.addEventListener("keydown", (e) => {
      const tag = (e.target && e.target.tagName || "").toLowerCase();
      const isInput = tag === "input" || tag === "textarea" || (e.target && e.target.isContentEditable);
      if (isInput) return; // اترك المفاتيح للنماذج

      const active = this.canvas?.getActiveObject();

      // حذف فقط مع Delete ومع وجود تركيز فعلي على الكانفس، وليس أثناء تحرير Textbox
      if (e.key === "Delete") {
        const canvasHasFocus = document.activeElement === this.canvas?.upperCanvasEl;
        const isEditingTextbox = active && active.isType && active.isType("textbox") && active.isEditing;
        if (active && canvasHasFocus && !isEditingTextbox) {
          e.preventDefault();
          this.canvas.remove(active);
          this.canvas.discardActiveObject();
          this.renderProps(null);
          this.previewDebounced();
        }
      }

      // Zoom shortcuts: Ctrl/Cmd + +/-
      if ((e.ctrlKey || e.metaKey) && (e.key === "+" || e.key === "=")) {
        e.preventDefault(); this.setZoom(this.scale + 0.1);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "-") {
        e.preventDefault(); this.setZoom(this.scale - 0.1);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "0") {
        e.preventDefault(); this.setZoom(1);
      }

      // Ctrl/Cmd+K: clear all
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        $("#bs-clear").click();
      }
    });

    // Ctrl+Wheel zoom (nice to have)
    this.canvas.upperCanvasEl.addEventListener("wheel", (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const delta = Math.sign(e.deltaY);
        this.setZoom(this.scale + (delta < 0 ? 0.05 : -0.05));
      }
    }, { passive: false });
  }

  applyPage() {
    const w = parseFloat($("#bs-w").val());
    const h = parseFloat($("#bs-h").val());
    if (w > 0 && h > 0) {
      this.pageWidthMM = w; this.pageHeightMM = h;
      this.canvas.setWidth(w * this.mmToPx); this.canvas.setHeight(h * this.mmToPx);
      this.canvas.calcOffset();
      this.canvas.requestRenderAll();
    }
  }

  /* --------------------- components --------------------- */
  addComponent(type) { if (type === "text") this.addTextAt(20, 20, "New Text", ""); else if (type === "barcode") this.addBarcodeAt(20, 20, "123456789012", ""); }

  addTextAt(x, y, text, bindPath = "") {
    const o = new fabric.Textbox(text || "Text", {
      left:x, top:y, fontSize:12, padding:2, textAlign:"left",
      customType:"text", bindField: bindPath
    });
    this.canvas.add(o).setActiveObject(o); this.renderProps(o);
  }

  addBarcodeAt(x, y, value, bindPath = "") {
    const fmt = "CODE128", bw = 2, bh = 60;
    const url = this._barcodeDataURL(value || " ", fmt, bw, bh, false, {mt:0,mr:0,mb:0,ml:0});
    fabric.Image.fromURL(url, (img) => {
      img.set({
        left:x, top:y, customType:"barcode",
        barcodeValue:value||"", format:fmt, barWidth:bw, barHeight:bh, displayValue:false,
        marginTop:0, marginRight:0, marginBottom:0, marginLeft:0,
        bindField: bindPath
      });
      this.canvas.add(img).setActiveObject(img); this.renderProps(img);
    });
  }

  // Generate barcode PNG dataURL with margins baked in
  _barcodeDataURL(value, format, width, height, displayValue, margins = {mt:0,mr:0,mb:0,ml:0}) {
    const tmp = document.createElement("canvas");
    try { JsBarcode(tmp, value || " ", { format, width, height, displayValue }); } catch(e) {}
    const mt = margins.mt|0, mr = margins.mr|0, mb = margins.mb|0, ml = margins.ml|0;
    const out = document.createElement("canvas");
    out.width  = tmp.width  + ml + mr;
    out.height = tmp.height + mt + mb;
    const ctx = out.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, out.width, out.height);
    ctx.drawImage(tmp, ml, mt);
    return out.toDataURL();
  }

  // chooser: Add as Text or Barcode
  _chooseAddAs(fieldPayload, x, y) {
    const guessBarcode = /barcode|item_code|ean|upc|code/i.test(fieldPayload.fieldname || fieldPayload.path || "");
    const d = new frappe.ui.Dialog({
      title: __("Add Field"),
      fields: [
        { fieldname:"path", fieldtype:"Data", label:"Binding Path", default: fieldPayload.path || fieldPayload.fieldname, reqd:1, description: __("Supports child paths like items[0].item_code or items[].item_code") },
        { fieldname:"as_type", fieldtype:"Select", label:"Add as", options:["Text","Barcode"], default: guessBarcode ? "Barcode" : "Text" },
        { fieldname:"static_text", fieldtype:"Data", label:"Static Text (if not bound)", default:"" },
      ],
      primary_action_label: __("Add"),
      primary_action: () => {
        const path = d.get_value("path") || "";
        const asType = d.get_value("as_type") || "Text";
        let initial = this._getByPath(this.docFromRoute || this.doc || {}, path);
        if (initial === undefined || initial === null || initial === "") {
          initial = d.get_value("static_text") || "";
        }
        if (asType === "Barcode") this.addBarcodeAt(x, y, this._toStr(initial), path);
        else this.addTextAt(x, y, this._toStr(initial) || `{{ ${path} }}`, path);
        d.hide(); this.previewDebounced();
      }
    });
    d.show();
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
    const bindInput = () => {
      const el = $(`<div class="form-group mb-1">
          <label class="small text-muted">Bind Path</label>
          <input class="form-control form-control-sm" name="bindField" value="${obj.bindField || ""}"
            placeholder="e.g. item_code or items[0].item_name or items[].rate"/>
          <small class="text-muted">Supports child paths. Leave empty for static.</small>
        </div>`);
      el.on("input", "input", () => this.previewDebounced());
      return el;
    };

    $p.append(input("Left (px)","left",Math.round(obj.left),"number"));
    $p.append(input("Top (px)","top",Math.round(obj.top),"number"));
    $p.append(bindInput());

    if (obj.isType && obj.isType("textbox")) {
      $p.append(input("Text","text",obj.text,"text"));
      $p.append(input("Font Size","fontSize",obj.fontSize,"number"));
      const ta = $(`<div class="form-group mb-1">
        <label class="small text-muted">Text Align</label>
        <select class="form-control form-control-sm" name="textAlign">
          <option value="left">left</option><option value="center">center</option><option value="right">right</option><option value="justify">justify</option>
        </select>
      </div>`);
      ta.find('select').val(obj.textAlign || 'left');
      $p.append(ta);

    } else if (obj.customType === "barcode") {
      $p.append(input("Value","barcodeValue",obj.barcodeValue,"text"));
      $p.append(input("Format","format",obj.format || "CODE128","text"));
      $p.append(input("Bar Width","barWidth",obj.barWidth,"number"));
      $p.append(input("Bar Height","barHeight",obj.barHeight,"number"));

      // margins (px)
      const mRow = $(`<div class="form-row">
        <div class="col-6">${input("Margin Top (px)","marginTop",obj.marginTop||0,"number").prop('outerHTML')}</div>
        <div class="col-6">${input("Margin Right (px)","marginRight",obj.marginRight||0,"number").prop('outerHTML')}</div>
        <div class="col-6">${input("Margin Bottom (px)","marginBottom",obj.marginBottom||0,"number").prop('outerHTML')}</div>
        <div class="col-6">${input("Margin Left (px)","marginLeft",obj.marginLeft||0,"number").prop('outerHTML')}</div>
      </div>`);
      $p.append(mRow);

      const disp = $(`<div class="form-group mb-1">
        <label class="small text-muted">Display Value</label>
        <select class="form-control form-control-sm" name="displayValue"><option value="0">No</option><option value="1">Yes</option></select>
      </div>`);
      disp.find('select').val(obj.displayValue ? "1" : "0");
      $p.append(disp);
    }

    $p.find("input,select").on("input change", (e)=>{
      const k = e.target.name;
      let v = e.target.type==="number" ? parseFloat(e.target.value) : e.target.value;
      if (k === "displayValue") v = e.target.value === "1";
      obj.set(k, v);
      if (obj.customType==="barcode" && [
        "barcodeValue","barWidth","barHeight","format","displayValue",
        "marginTop","marginRight","marginBottom","marginLeft"
      ].includes(k)) {
        const url = this._barcodeDataURL(
          obj.barcodeValue||" ", obj.format||"CODE128",
          parseInt(obj.barWidth||2), parseInt(obj.barHeight||60),
          !!obj.displayValue,
          { mt:obj.marginTop|0, mr:obj.marginRight|0, mb:obj.marginBottom|0, ml:obj.marginLeft|0 }
        );
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
          const t = new fabric.Textbox(o.text || "", Object.assign({}, o, { customType:"text", bindField: o.bindField || "" }));
          this.canvas.add(t);
        } else if (o.type==="image" && (o.barcodeValue || o.src || o.customType==="barcode")) {
          const url = this._barcodeDataURL(
            o.barcodeValue || " ", o.format||"CODE128",
            parseInt(o.barWidth||2), parseInt(o.barHeight||60), !!o.displayValue,
            { mt:o.marginTop||0, mr:o.marginRight||0, mb:o.marginBottom||0, ml:o.marginLeft||0 }
          );
          fabric.Image.fromURL(url, img=> {
            img.set(Object.assign({}, o, {
              customType:"barcode", bindField: o.bindField || "",
              marginTop:o.marginTop||0, marginRight:o.marginRight||0, marginBottom:o.marginBottom||0, marginLeft:o.marginLeft||0
            }));
            this.canvas.add(img);
          });
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
        return Object.assign(base, {
          src:o.toDataURL(), barcodeValue:o.barcodeValue, format:o.format||"CODE128",
          barWidth:o.barWidth||2, barHeight:o.barHeight||60, displayValue: !!o.displayValue,
          marginTop:o.marginTop||0, marginRight:o.marginRight||0, marginBottom:o.marginBottom||0, marginLeft:o.marginLeft||0,
          customType:"barcode", type:"image"
        });
      return base;
    });
  }

  /* --------------------- preview & print --------------------- */
  preview() {
    const data = this.docFromRoute || this.doc || null;
    if (data) {
      this.canvas.getObjects().forEach(obj => {
        if (obj.isType && obj.isType("textbox")) {
          if (obj.bindField) obj.text = this._toStr(this._getByPath(data, obj.bindField) ?? obj.text);
        } else if (obj.customType==="barcode") {
          if (obj.bindField) obj.barcodeValue = this._toStr(this._getByPath(data, obj.bindField) ?? obj.barcodeValue);
          const url = this._barcodeDataURL(
            obj.barcodeValue || " ", obj.format || "CODE128",
            parseInt(obj.barWidth || 2), parseInt(obj.barHeight || 60),
            !!obj.displayValue,
            { mt:obj.marginTop||0, mr:obj.marginRight||0, mb:obj.marginBottom||0, ml:obj.marginLeft||0 }
          );
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

  // HTML Vector mode (SVG/text in mm) with margins as padding
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
          const text = esc(o.bindField ? (this._getByPath(data, o.bindField) ?? o.text) : o.text);
          const fontMM = px2mm(o.fontSize || 12).toFixed(3);
          parts.push(
            `<div style="position:absolute;left:${leftMM}mm;top:${topMM}mm;width:${widthMM}mm;height:${heightMM}mm;`+
            `font-size:${fontMM}mm;line-height:1;white-space:nowrap;text-align:${o.textAlign||'left'};">${text}</div>`
          );
        } else if (o.customType === "barcode") {
          const val = esc(o.bindField ? (this._getByPath(data, o.bindField) ?? o.barcodeValue) : o.barcodeValue);
          const fmt = o.format || "CODE128";
          const barWidth = parseInt(o.barWidth || 2, 10);
          const barHeight= parseInt(o.barHeight|| 60, 10);

          const mt = px2mm(o.marginTop||0).toFixed(3);
          const mr = px2mm(o.marginRight||0).toFixed(3);
          const mb = px2mm(o.marginBottom||0).toFixed(3);
          const ml = px2mm(o.marginLeft||0).toFixed(3);

          const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          try {
            JsBarcode(svg, val || " ", { format: fmt, width: barWidth, height: barHeight, displayValue: !!o.displayValue });
          } catch(e) {}
          svg.setAttribute("width", `100%`);
          svg.setAttribute("height", `100%`);
          const svgHtml = svg.outerHTML;

          parts.push(
            `<div style="position:absolute;left:${leftMM}mm;top:${topMM}mm;width:${widthMM}mm;height:${heightMM}mm;` +
            `padding:${mt}mm ${mr}mm ${mb}mm ${ml}mm; box-sizing:border-box;">${svgHtml}</div>`
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
