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

    // design-time zoom
    this.scale = 1;
    this.snapMM = 1;

    // state
    this.meta = null;
    this.fields = [];
    this.childFieldGroups = {};
    this.canvas = null;
    this.docFromRoute = this._parseCtxFromRoute() || this._parseCtxFromRouteOptions();
    this.doc = null;

    // preview debounce
    this.previewDebounced = frappe.utils ? frappe.utils.debounce(() => this.preview(), 200) : (() => this.preview());

    this.initPage();
    $("#bs-top-tabs .nav-link").on("click", function (e) {
      e.preventDefault();
      $("#bs-top-tabs .nav-link").removeClass("active");
      $(this).addClass("active");
      const target = $(this).attr("href");
      $(".tab-pane").removeClass("show active");
      $(target).addClass("show active");
    });

    // --- Splitter (Canvas/Preview vertical) ---
    (function setupVerticalSplitter() {
      const wrap = document.getElementById("bs-canvas-wrap");
      const split = document.getElementById("bs-splitter");
      const prev = document.getElementById("bs-preview-pane");
      if (!wrap || !split || !prev) return;

      // استرجاع آخر ارتفاع محفوظ
      const mem = JSON.parse(localStorage.getItem("bs_ui") || "{}");
      if (mem.preview_h) { prev.style.height = mem.preview_h; }

      let startY = 0, startH = 0;
      split.addEventListener("mousedown", (e) => {
        startY = e.clientY;
        startH = prev.offsetHeight;
        const minH = 120, maxH = Math.floor(window.innerHeight * 0.6);
        const move = (ev) => {
          const dy = (startY - ev.clientY);           // عكس لأننا نجر لأعلى/أسفل
          let nh = Math.min(maxH, Math.max(minH, startH + dy * -1));
          prev.style.height = nh + "px";
          localStorage.setItem("bs_ui", JSON.stringify(Object.assign(mem, { preview_h: prev.style.height })));
          // اختياري: Scroll البروجكشن يبقى واقف
        };
        const up = () => {
          document.removeEventListener("mousemove", move);
          document.removeEventListener("mouseup", up);
        };
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
      });
    })();
    (async () => {
      await this.loadMetaAndDoc();
      this.initCanvas();
      this.buildFieldPalette();
      const doFilter = frappe.utils?.debounce?.((v) => this.buildFieldPalette(v), 200) || ((v) => this.buildFieldPalette(v));
      $("#bs-field-search").on("input", (e) => doFilter(e.target.value || ""));

      // زر طي/فتح الكل (child فقط)
      $("#bs-fields-collapse-toggle").on("click", () => {
        const uiKey = "bs_field_groups";
        const st = JSON.parse(localStorage.getItem(uiKey) || "{}");
        const $groups = $(".bs-field-group[data-ct]");
        const anyOpen = $groups.toArray().some(el => el.classList.contains("open"));
        $groups.each((_, el) => {
          const ct = el.getAttribute("data-ct");
          if (anyOpen) el.classList.remove("open");
          else el.classList.add("open");
          $(el).find(".fg-toggle").text(el.classList.contains("open") ? "−" : "+");
          st[ct] = el.classList.contains("open");
        });
        localStorage.setItem(uiKey, JSON.stringify(st));
        $("#bs-fields-collapse-toggle").text(anyOpen ? "Expand All" : "Collapse All");
      });

      // بعد كل build: حدّث نص الزر
      const _origBuild = this.buildFieldPalette.bind(this);
      this.buildFieldPalette = (q) => {
        _origBuild(q);
        const anyOpen = $(".bs-field-group[data-ct]").toArray().some(el => el.classList.contains("open"));
        $("#bs-fields-collapse-toggle").text(anyOpen ? "Collapse All" : "Expand All");
      };

      if (this.templateName) this.loadTemplate(this.templateName);
      this.preview();
      const c = this._resolveCopiesFromData();
      if (c) $("#bs-copies").val(c);
    })();
  }

  /* --------------------- utils --------------------- */
  _toStr(v) { if (v === null || v === undefined) return ""; try { return String(v); } catch { return (v + ""); } }

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
    this.page = frappe.ui.make_app_page({
      parent: this.wrapper,
      title: "Barcode Studio",
      single_column: true
    });

    // جهّز الـcontext للقالب
    const ctx = {
      doctype: this.doctype || "Item",
      docname: this.docname || "",
      width_mm: this.pageWidthMM,
      height_mm: this.pageHeightMM
    };
    console.log("[BarcodeStudio] initPage", ctx);
    // 1) احضر نص القالب من التسجيلات التي يبنيها Frappe
    //    المفتاح يكون اسم الملف بدون الامتداد (barcode_studio)
    const tpl_name = "barcode_studio";
    let tpl_src = frappe.templates && frappe.templates[tpl_name];
    if (!tpl_src) {
      // Fallback (نادرًا): لو لم يلتقطه الـbuild لأي سبب
      console.warn("[BarcodeStudio] template not found in frappe.templates; ensure you ran `bench build`.");
      tpl_src = "<div class='alert alert-danger m-3'>Template not built. Run <code>bench build</code>.</div>";
    }

    // 2) اعرض القالب داخل جسم الصفحة
    const html = frappe.render_template(tpl_src, ctx);
    const $body = this.page.wrapper.find(".page-body");
    $body.html(html);

    // 3) حدّث القيم الابتدائية
    $("#bs-dt").val(this.doctype);
    $("#bs-name").val(this.docname);
    $("#bs-w").val(this.pageWidthMM);
    $("#bs-h").val(this.pageHeightMM);

    // 4) ربط الأحداث (نفس منطقك السابق)
    this._applyZoomUI(1);
    $("#bs-zoom").on("input", (e) => this.setZoom(parseInt(e.target.value, 10) / 100));
    $("#bs-zoom-in").on("click", () => this.setZoom(this.scale + 0.1));
    $("#bs-zoom-out").on("click", () => this.setZoom(this.scale - 0.1));
    $("#bs-zoom-reset").on("click", () => this.setZoom(1));

    $("#bs-add-text").on("click", () => this.addComponent("text"));
    $("#bs-add-barcode").on("click", () => this.addComponent("barcode"));

    const saved = JSON.parse(localStorage.getItem("bs_ui") || "{}");
    if (saved.dark) document.body.classList.add("dark");
    if (saved.snap) $("#bs-snap").val(saved.snap);
    if (saved.dock_h) $("#bs-dock").css("height", saved.dock_h);
    $("#bs-snap-label").text($("#bs-snap").val() + "mm");

    $("#bs-toggle-grid").on("click", () => this._toggleGrid());
    $("#bs-snap").on("change", (e) => {
      this.snapMM = parseFloat(e.target.value) || 1;
      $("#bs-snap-label").text(this.snapMM + "mm");
      this.canvas && this.canvas.requestRenderAll();
      this._persistUI({ snap: String(this.snapMM) });
    });
    $("#bs-dark").on("click", () => {
      document.body.classList.toggle("dark");
      this._persistUI({ dark: document.body.classList.contains("dark") });
    });
    $("#bs-fullscreen").on("click", () => {
      const el = this.page.wrapper.get(0);
      if (!document.fullscreenElement) el.requestFullscreen?.();
      else document.exitFullscreen?.();
    });

    $(".bs-dock-tabs button").on("click", (e) => {
      const t = e.currentTarget.getAttribute("data-tab");
      $(".bs-dock-tabs button").removeClass("active");
      $(e.currentTarget).addClass("active");
      $("#tab-preview").toggle(t === "preview");
      $("#tab-console").toggle(t === "console");
    });

    (function setupVerticalSplitter() {
      const wrap = document.getElementById("bs-canvas-wrap");
      const split = document.getElementById("bs-splitter");
      const prev = document.getElementById("bs-preview-pane");
      if (!wrap || !split || !prev) return;

      const mem = JSON.parse(localStorage.getItem("bs_ui") || "{}");
      if (mem.preview_h) { prev.style.height = mem.preview_h; }

      let startY = 0, startH = 0;
      split.addEventListener("mousedown", (e) => {
        startY = e.clientY;
        startH = prev.offsetHeight;
        const minH = 120, maxH = Math.floor(window.innerHeight * 0.6);
        const move = (ev) => {
          const dy = ev.clientY - startY;
          let nh = Math.min(maxH, Math.max(minH, startH - dy));
          prev.style.height = nh + "px";
          localStorage.setItem("bs_ui", JSON.stringify({ ...mem, preview_h: prev.style.height }));
        };
        const up = () => {
          document.removeEventListener("mousemove", move);
          document.removeEventListener("mouseup", up);
        };
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
      });
    })();


    $("#bs-toggle-fields").on("click", () => {
      const box = $("#bs-fields-box");
      const body = box.find(".body");
      const hidden = body.is(":visible");
      body.toggle(!hidden); $("#bs-toggle-fields").text(hidden ? "Show" : "Hide");
    });
    $("#bs-toggle-props").on("click", () => {
      const box = $("#bs-props-box");
      const body = box.find(".body");
      const hidden = body.is(":visible");
      body.toggle(!hidden); $("#bs-toggle-props").text(hidden ? "Show" : "Hide");
    });

    $("#bs-apply").on("click", () => { this.applyPage(); this.previewDebounced(); });
    $("#bs-reload").on("click", () => this.loadMetaAndDoc().then(() => { this.buildFieldPalette(); this.preview(); const c = this._resolveCopiesFromData(); if (c) $("#bs-copies").val(c); }));
    $("#bs-print").on("click", () => this.doPrint());
    $("#bs-save").on("click", () => this.saveTemplateDialog());

    $('[data-align]').on('click', (e) => { this.alignSelected(e.currentTarget.getAttribute('data-align')); this.previewDebounced(); });
    $('[data-textalign]').on('click', (e) => {
      const o = this.canvas?.getActiveObject();
      if (o && o.isType && o.isType("textbox")) {
        o.set("textAlign", e.currentTarget.getAttribute('data-textalign'));
        o.setCoords(); this.canvas.requestRenderAll(); this.previewDebounced();
      }
    });
    $('#btn-clear-value').on('click', () => {
      const o = this.canvas?.getActiveObject();
      if (!o) return;
      if (o.isType && o.isType("textbox")) {
        o.set("text", ""); o.setCoords(); this.canvas.requestRenderAll();
      } else if (o.customType === "barcode") {
        o.set("barcodeValue", "");
        const url = this._barcodeDataURL(" ", o.format || "CODE128",
          parseInt(o.barWidth || 2), parseInt(o.barHeight || 60),
          !!o.displayValue,
          { mt: o.marginTop || 0, mr: o.marginRight || 0, mb: o.marginBottom || 0, ml: o.marginLeft || 0 }
        );
        const bw = o.boxWidth || o.getScaledWidth();
        const bh = o.boxHeight || o.getScaledHeight();
        o.setSrc(url, () => { this._fitImageToBox(o, bw, bh); this.canvas.requestRenderAll(); });
      }
      this.previewDebounced();
    });

    const delayedReload = frappe.utils ? frappe.utils.debounce(async () => {
      await this.loadMetaAndDoc(); this.buildFieldPalette(); this.preview();
      const c = this._resolveCopiesFromData(); if (c) $("#bs-copies").val(c);
    }, 300) : async () => {
      await this.loadMetaAndDoc(); this.buildFieldPalette(); this.preview();
      const c = this._resolveCopiesFromData(); if (c) $("#bs-copies").val(c);
    };
    $("#bs-dt, #bs-name").on("change input", delayedReload);

    this.fillTemplates();
    $("#bs-template").on("change", (e) => {
      const t = e.target.value || "";
      frappe.set_route("barcode-studio", this.doctype, this.docname || "", t || "");
      if (t) this.loadTemplate(t);
    });
  }

  _applyZoomUI(scale) {
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

    await new Promise((res) =>
      frappe.model.with_doctype(this.doctype, async () => {
        this.meta = frappe.get_meta(this.doctype);

        this.fields = (this.meta.fields || [])
          .filter((df) => ["Data", "Small Text", "Long Text", "Select", "Link", "Dynamic Link", "Int", "Float", "Currency", "Percent", "Date", "Datetime", "Time", "Read Only", "Barcode", "Text Editor"].includes(df.fieldtype))
          .map((df) => ({ label: df.label || df.fieldname, fieldname: df.fieldname, fieldtype: df.fieldtype }));

        if (!this.fields.find((f) => f.fieldname === "name"))
          this.fields.unshift({ label: "name", fieldname: "name", fieldtype: "Data" });

        const childTables = (this.meta.fields || []).filter(df => df.fieldtype === "Table");
        this.childFieldGroups = {};
        for (const ct of childTables) {
          if (!ct.options) continue;
          await new Promise((done) => frappe.model.with_doctype(ct.options, () => done()));
          const childMeta = frappe.get_meta(ct.options);
          const chFields = (childMeta.fields || [])
            .filter((df) => ["Data", "Small Text", "Long Text", "Select", "Link", "Dynamic Link", "Int", "Float", "Currency", "Percent", "Date", "Datetime", "Time", "Read Only", "Barcode", "Text Editor"].includes(df.fieldtype))
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
  buildFieldPalette(searchText = "") {
    const $p = $("#bs-fields").empty();
    const q = (searchText || "").trim().toLowerCase();

    const uiKey = "bs_field_groups";
    const saved = JSON.parse(localStorage.getItem(uiKey) || "{}"); // { [child_table]: true|false }

    const mkChip = (label, dataset, pathShown) => {
      const chip = $(`
      <div class="bs-field-chip" draggable="true" title="${frappe.utils.escape_html(pathShown || dataset.path || '')}">
        <div class="label">${frappe.utils.escape_html(label || '')}</div>
        <div class="path">${frappe.utils.escape_html(pathShown || dataset.path || '')}</div>
      </div>
    `);
      chip.on("dragstart", (ev) =>
        ev.originalEvent.dataTransfer.setData("text/plain", JSON.stringify(dataset))
      );
      if (q) {
        const hay = [(label || ""), (dataset.path || ""), (pathShown || "")].join(" ").toLowerCase();
        if (hay.includes(q)) chip.addClass("match");
      }
      return chip;
    };

    // --- Top-level ---
    const topBox = $(`
    <div class="bs-field-group open">
      <div class="fg-head">
        <div class="fg-title">Top-level</div>
        <div class="fg-actions text-muted small">Fields</div>
      </div>
      <div class="fg-body"><div class="d-flex flex-wrap"></div></div>
    </div>
  `).appendTo($p);

    const topWrap = topBox.find(".fg-body .d-flex");
    (this.fields || []).forEach((f) => {
      if (q) {
        const hay = [(f.label || f.fieldname || ""), (f.fieldname || "")].join(" ").toLowerCase();
        if (!hay.includes(q)) return;
      }
      topWrap.append(mkChip(f.label || f.fieldname, {
        path: f.fieldname, fieldname: f.fieldname, fieldtype: f.fieldtype
      }));
    });

    // --- Child Tables (collapsible) ---
    const childKeys = Object.keys(this.childFieldGroups || {});
    childKeys.forEach((ct) => {
      const grp = this.childFieldGroups[ct];
      // مغلق افتراضياً، إلا إذا كان محفوظ "مفتوح" في التخزين
      const open = saved[ct] === true;

      const box = $(`
      <div class="bs-field-group ${open ? "open" : ""}" data-ct="${frappe.utils.escape_html(ct)}">
        <div class="fg-head">
          <div class="fg-title">${frappe.utils.escape_html(ct)} <span class="text-muted small">(Child)</span></div>
          <div class="fg-actions">
            <button class="btn btn-xs btn-light fg-toggle" type="button">${open ? "−" : "+"}</button>
          </div>
        </div>
        <div class="fg-body"><div class="d-flex flex-wrap"></div></div>
      </div>
    `).appendTo($p);

      const wrap = box.find(".fg-body .d-flex");

      grp.fields.forEach((f) => {
        if (q) {
          const hay = [f.label || "", f.fieldname || "", f.fieldname_indexed || ""].join(" ").toLowerCase();
          if (!hay.includes(q)) return;
        }
        wrap.append(
          mkChip(
            f.label,
            { path: f.fieldname_indexed, fieldname: f.fieldname_indexed, fieldtype: f.fieldtype, is_child: true },
            f.fieldname_indexed
          )
        );
      });

      // زر الطي يعمل وحده
      box.find(".fg-toggle").on("click", (ev) => {
        ev.stopPropagation();
        box.toggleClass("open");
        box.find(".fg-toggle").text(box.hasClass("open") ? "−" : "+");
        const st = JSON.parse(localStorage.getItem(uiKey) || "{}");
        st[ct] = box.hasClass("open");
        localStorage.setItem(uiKey, JSON.stringify(st));
      });

      // الرأس أيضًا يطوي/يفتح (مع تجاهل النقر على الأزرار داخلها)
      box.find(".fg-head").on("click", (ev) => {
        if ($(ev.target).closest(".fg-actions").length) return;
        box.toggleClass("open");
        box.find(".fg-toggle").text(box.hasClass("open") ? "−" : "+");
        const st = JSON.parse(localStorage.getItem(uiKey) || "{}");
        st[ct] = box.hasClass("open");
        localStorage.setItem(uiKey, JSON.stringify(st));
      });
    });

    if (!$p.children().length) $p.html(`<div class="text-muted">No fields</div>`);
  }


  /* --------------------- canvas --------------------- */
  initCanvas() {
    const wpx = this.pageWidthMM * this.mmToPx;
    const hpx = this.pageHeightMM * this.mmToPx;
    this.canvas = new fabric.Canvas("bs-canvas", {
      width: wpx, height: hpx, selection: true, preserveObjectStacking: true,
    });
    this.canvas.upperCanvasEl.tabIndex = 0;

    // ركّز على الكانفس عند إنشاء/تحديث التحديد
    this.canvas.on("selection:created", () => this.canvas.upperCanvasEl.focus());
    this.canvas.on("selection:updated", () => this.canvas.upperCanvasEl.focus());
    $(".bb-stage").css("transform", `scale(${this.scale})`);

    const snap = this.snapMM * this.mmToPx;
    const keepInside = (obj) => {
      const b = obj.getBoundingRect(true);
      obj.left = Math.min(Math.max(Math.round(obj.left / snap) * snap, 0), this.canvas.getWidth() - b.width);
      obj.top = Math.min(Math.max(Math.round(obj.top / snap) * snap, 0), this.canvas.getHeight() - b.height);
      obj.setCoords();
    };

    this.canvas.on("object:moving", ({ target }) => { keepInside(target); this.previewDebounced(); });
    this.canvas.on("object:scaled", ({ target }) => {
      keepInside(target);
      if (target?.customType === "barcode") {
        target.boxWidth = target.getScaledWidth();
        target.boxHeight = target.getScaledHeight();
      }
      this.previewDebounced();
    });
    ["selection:created", "selection:updated"].forEach(evt => this.canvas.on(evt, e => this.renderProps(e.target)));
    this.canvas.on("selection:cleared", () => this.renderProps(null));
    this.canvas.on("object:modified", e => {
      const o = e.target;
      if (o?.customType === "barcode") {
        o.boxWidth = o.getScaledWidth();
        o.boxHeight = o.getScaledHeight();
      }
      this.renderProps(o);
      this.previewDebounced();
    });
    this.canvas.on("object:added", () => this.previewDebounced());
    this.canvas.on("object:removed", () => this.previewDebounced());

    // drag from fields → chooser
    const cEl = this.canvas.upperCanvasEl;
    cEl.addEventListener("dragover", (e) => e.preventDefault());
    cEl.addEventListener("drop", (e) => {
      e.preventDefault();
      const data = JSON.parse(e.dataTransfer.getData("text/plain") || "{}");
      const p = this.canvas.getPointer(e);
      this._chooseAddAs(data, p.x, p.y);
    });

    // Keyboard handling
    document.addEventListener("keydown", (e) => {
      const tag = (e.target && e.target.tagName || "").toLowerCase();
      const isInput = tag === "input" || tag === "textarea" || (e.target && e.target.isContentEditable);
      if (isInput) return;

      const active = this.canvas?.getActiveObject();

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

      if ((e.ctrlKey || e.metaKey) && (e.key === "+" || e.key === "=")) {
        e.preventDefault(); this.setZoom(this.scale + 0.1);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "-") {
        e.preventDefault(); this.setZoom(this.scale - 0.1);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "0") {
        e.preventDefault(); this.setZoom(1);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        $("#bs-clear").click();
      }
    });

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
      left: x, top: y, fontSize: 12, padding: 2, textAlign: "left",
      customType: "text", bindField: bindPath
    });
    this.canvas.add(o).setActiveObject(o); this.renderProps(o);
  }

  addBarcodeAt(x, y, value, bindPath = "") {
    const fmt = "CODE128", bw = 2, bh = 60;
    const url = this._barcodeDataURL(value || " ", fmt, bw, bh, false, { mt: 0, mr: 0, mb: 0, ml: 0 });
    fabric.Image.fromURL(url, (img) => {
      img.set({
        left: x, top: y, customType: "barcode",
        barcodeValue: value || "", format: fmt, barWidth: bw, barHeight: bh, displayValue: false,
        marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0,
        bindField: bindPath
      });
      // احفظ صندوق التصميم الحالي كقيمة مرجعية
      img.boxWidth = img.getScaledWidth();
      img.boxHeight = img.getScaledHeight();
      this.canvas.add(img).setActiveObject(img); this.renderProps(img);
    });
  }

  // render barcode canvas with optional margins baked in
  _barcodeDataURL(value, format, width, height, displayValue, margins = { mt: 0, mr: 0, mb: 0, ml: 0 }) {
    const tmp = document.createElement("canvas");
    try { JsBarcode(tmp, value || " ", { format, width, height, displayValue }); } catch (e) { }
    const mt = margins.mt | 0, mr = margins.mr | 0, mb = margins.mb | 0, ml = margins.ml | 0;
    const out = document.createElement("canvas");
    out.width = tmp.width + ml + mr;
    out.height = tmp.height + mt + mb;
    const ctx = out.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, out.width, out.height);
    ctx.drawImage(tmp, ml, mt);
    return out.toDataURL();
  }

  // اضبط scale للصورة لتناسب صندوق أبعاده (W,H) بالبيكسل
  _fitImageToBox(img, W, H) {
    const iw = img.width || W || 1;
    const ih = img.height || H || 1;
    img.scaleX = (W || iw) / iw;
    img.scaleY = (H || ih) / ih;
    img.setCoords();
  }

  // chooser: Add as Text or Barcode
  _chooseAddAs(fieldPayload, x, y) {
    const guessBarcode = /barcode|item_code|ean|upc|code/i.test(fieldPayload.fieldname || fieldPayload.path || "");
    const d = new frappe.ui.Dialog({
      title: __("Add Field"),
      fields: [
        { fieldname: "path", fieldtype: "Data", label: "Binding Path", default: fieldPayload.path || fieldPayload.fieldname, reqd: 1, description: __("Supports child paths like items[0].item_code or items[].item_code") },
        { fieldname: "as_type", fieldtype: "Select", label: "Add as", options: ["Text", "Barcode"], default: guessBarcode ? "Barcode" : "Text" },
        { fieldname: "static_text", fieldtype: "Data", label: "Static Text (if not bound)", default: "" },
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

    const input = (lbl, name, val, type = "text") =>
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

    $p.append(input("Left (px)", "left", Math.round(obj.left), "number"));
    $p.append(input("Top (px)", "top", Math.round(obj.top), "number"));
    $p.append(bindInput());

    if (obj.isType && obj.isType("textbox")) {
      $p.append(input("Text", "text", obj.text, "text"));
      $p.append(input("Font Size", "fontSize", obj.fontSize, "number"));
      const ta = $(`<div class="form-group mb-1">
        <label class="small text-muted">Text Align</label>
        <select class="form-control form-control-sm" name="textAlign">
          <option value="left">left</option><option value="center">center</option><option value="right">right</option><option value="justify">justify</option>
        </select>
      </div>`);
      ta.find('select').val(obj.textAlign || 'left');
      $p.append(ta);

    } else if (obj.customType === "barcode") {
      $p.append(input("Value", "barcodeValue", obj.barcodeValue, "text"));
      $p.append(input("Format", "format", obj.format || "CODE128", "text"));
      $p.append(input("Bar Width", "barWidth", obj.barWidth, "number"));
      $p.append(input("Bar Height", "barHeight", obj.barHeight, "number"));

      const mRow = $(`<div class="form-row">
        <div class="col-6">${input("Margin Top (px)", "marginTop", obj.marginTop || 0, "number").prop('outerHTML')}</div>
        <div class="col-6">${input("Margin Right (px)", "marginRight", obj.marginRight || 0, "number").prop('outerHTML')}</div>
        <div class="col-6">${input("Margin Bottom (px)", "marginBottom", obj.marginBottom || 0, "number").prop('outerHTML')}</div>
        <div class="col-6">${input("Margin Left (px)", "marginLeft", obj.marginLeft || 0, "number").prop('outerHTML')}</div>
      </div>`);
      $p.append(mRow);

      const disp = $(`<div class="form-group mb-1">
        <label class="small text-muted">Display Value</label>
        <select class="form-control form-control-sm" name="displayValue"><option value="0">No</option><option value="1">Yes</option></select>
      </div>`);
      disp.find('select').val(obj.displayValue ? "1" : "0");
      $p.append(disp);
    }

    $p.find("input,select").on("input change", (e) => {
      const k = e.target.name;
      let v = e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
      if (k === "displayValue") v = e.target.value === "1";
      obj.set(k, v);

      if (obj.customType === "barcode" && [
        "barcodeValue", "barWidth", "barHeight", "format", "displayValue",
        "marginTop", "marginRight", "marginBottom", "marginLeft"
      ].includes(k)) {
        const url = this._barcodeDataURL(
          obj.barcodeValue || " ", obj.format || "CODE128",
          parseInt(obj.barWidth || 2), parseInt(obj.barHeight || 60),
          !!obj.displayValue,
          { mt: obj.marginTop | 0, mr: obj.marginRight | 0, mb: obj.marginBottom | 0, ml: obj.marginLeft | 0 }
        );
        // أعِد نفس قياس الصندوق بعد تحديث الصورة
        const bw = obj.boxWidth || obj.getScaledWidth();
        const bh = obj.boxHeight || obj.getScaledHeight();
        obj.setSrc(url, () => { this._fitImageToBox(obj, bw, bh); this.canvas.requestRenderAll(); });
      }

      obj.setCoords(); this.canvas.requestRenderAll(); this.previewDebounced();
    });
  }

  /* --------------------- align --------------------- */
  alignSelected(dir) {
    const o = this.canvas.getActiveObject(); if (!o) return;
    const W = this.canvas.getWidth(), H = this.canvas.getHeight();
    const b = o.getBoundingRect(true);
    if (dir === "left") o.left = 0;
    if (dir === "right") o.left = W - b.width;
    if (dir === "center") o.left = (W - b.width) / 2;
    if (dir === "top") o.top = 0;
    if (dir === "bottom") o.top = H - b.height;
    if (dir === "middle") o.top = (H - b.height) / 2;
    o.setCoords(); this.canvas.requestRenderAll(); this.previewDebounced();
  }

  /* --------------------- templates --------------------- */
  loadTemplate(name) {
    frappe.call({ method: "frappe.client.get", args: { doctype: "Barcode Template", name } }).then(r => {
      const doc = r.message;
      if (doc.page_width_mm) this.pageWidthMM = parseFloat(doc.page_width_mm);
      if (doc.page_height_mm) this.pageHeightMM = parseFloat(doc.page_height_mm);
      $("#bs-w").val(this.pageWidthMM); $("#bs-h").val(this.pageHeightMM);
      this.canvas.setWidth(this.pageWidthMM * this.mmToPx);
      this.canvas.setHeight(this.pageHeightMM * this.mmToPx);
      this.canvas.calcOffset();

      this.canvas.clear();
      (JSON.parse(doc.layout_json || "[]") || []).forEach(o => {
        if (o.type === "textbox") {
          const t = new fabric.Textbox(o.text || "", Object.assign({}, o, { customType: "text", bindField: o.bindField || "" }));
          this.canvas.add(t);
        } else if (o.type === "image" && (o.barcodeValue || o.src || o.customType === "barcode")) {
          const url = this._barcodeDataURL(
            o.barcodeValue || " ", o.format || "CODE128",
            parseInt(o.barWidth || 2), parseInt(o.barHeight || 60), !!o.displayValue,
            { mt: o.marginTop || 0, mr: o.marginRight || 0, mb: o.marginBottom || 0, ml: o.marginLeft || 0 }
          );
          fabric.Image.fromURL(url, img => {
            img.set(Object.assign({}, o, {
              customType: "barcode", bindField: o.bindField || "",
              marginTop: o.marginTop || 0, marginRight: o.marginRight || 0, marginBottom: o.marginBottom || 0, marginLeft: o.marginLeft || 0
            }));
            // أعِد ضبط الـscale ليتطابق مع صندوق التصميم المحفوظ
            img.boxWidth = o.boxWidth || o.width || img.getScaledWidth();
            img.boxHeight = o.boxHeight || o.height || img.getScaledHeight();
            this._fitImageToBox(img, img.boxWidth, img.boxHeight);
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
        { fieldname: "template_name", fieldtype: "Data", label: "Template Name", reqd: 1, default: this.templateName || "" },
        { fieldname: "page_width_mm", fieldtype: "Float", label: "Width (mm)", reqd: 1, default: this.pageWidthMM },
        { fieldname: "page_height_mm", fieldtype: "Float", label: "Height (mm)", reqd: 1, default: this.pageHeightMM },
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
            .then(() => frappe.call({ method: "frappe.client.set_value", args: { doctype: "Barcode Template", name: this.templateName, fieldname: "layout_json", value: doc.layout_json } }))
            .then(() => frappe.call({ method: "frappe.client.set_value", args: { doctype: "Barcode Template", name: this.templateName, fieldname: "page_width_mm", value: pw } }))
            .then(() => frappe.call({ method: "frappe.client.set_value", args: { doctype: "Barcode Template", name: this.templateName, fieldname: "page_height_mm", value: ph } }))
            .then(() => { d.hide(); frappe.show_alert({ message: __("Template updated"), indicator: "green" }); });
        } else {
          frappe.call({ method: "frappe.client.insert", args: { doc: Object.assign({ doctype: "Barcode Template", template_name: name }, doc) } })
            .then(r => { this.templateName = r.message.name; $("#bs-template").val(this.templateName); d.hide(); frappe.set_route("barcode-studio", this.doctype, this.docname || "", this.templateName); });
        }
      }
    });
    d.show();
  }

  serializeObjects() {
    return this.canvas.getObjects().map(o => {
      const base = {
        type: o.type, left: o.left, top: o.top,
        width: o.getScaledWidth(), height: o.getScaledHeight(),
        bindField: o.bindField || ""
      };
      if (o.isType && o.isType("textbox"))
        return Object.assign(base, { text: o.text, fontSize: o.fontSize, textAlign: o.textAlign, padding: o.padding, customType: "text" });
      if (o.customType === "barcode")
        return Object.assign(base, {
          src: o.toDataURL(), barcodeValue: o.barcodeValue, format: o.format || "CODE128",
          barWidth: o.barWidth || 2, barHeight: o.barHeight || 60, displayValue: !!o.displayValue,
          marginTop: o.marginTop || 0, marginRight: o.marginRight || 0, marginBottom: o.marginBottom || 0, marginLeft: o.marginLeft || 0,
          // 👇 مهم: خزّن صندوق التصميم ليُعاد تطبيقه بعد أي إعادة توليد صورة
          boxWidth: o.boxWidth || o.getScaledWidth(),
          boxHeight: o.boxHeight || o.getScaledHeight(),
          customType: "barcode", type: "image"
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
        } else if (obj.customType === "barcode") {
          if (obj.bindField) obj.barcodeValue = this._toStr(this._getByPath(data, obj.bindField) ?? obj.barcodeValue);
          const url = this._barcodeDataURL(
            obj.barcodeValue || " ", obj.format || "CODE128",
            parseInt(obj.barWidth || 2), parseInt(obj.barHeight || 60),
            !!obj.displayValue,
            { mt: obj.marginTop || 0, mr: obj.marginRight || 0, mb: obj.marginBottom || 0, ml: obj.marginLeft || 0 }
          );
          const bw = obj.boxWidth || obj.getScaledWidth();
          const bh = obj.boxHeight || obj.getScaledHeight();
          obj.setSrc(url, () => { this._fitImageToBox(obj, bw, bh); this.canvas.requestRenderAll(); });
        }
      });
      this.canvas.requestRenderAll();
    }
    const dataURL = this.canvas.toDataURL({ format: "png" });
    $("#bs-preview").html(`<img src="${dataURL}" style="max-width:100%; border:1px solid #eee"/>`);
  }

  _resolveCopiesFromData() {
    const data = this.docFromRoute || this.doc || null;
    if (!data) return null;
    const keys = Object.keys(data);
    const pick = ['print_qty', 'qty_to_print', 'quantity', 'qty'];
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

    if (mode === "image") return await this._printAsHiDpiImage(copies);
    else return await this._printAsVectorHTML(copies);
  }

  // Image mode (HiDPI raster)
  async _printAsHiDpiImage(copies) {
    const dpi = parseInt($("#bs-dpi").val() || "300", 10);
    const multiplier = Math.max(1, dpi / 96);
    const imgData = this.canvas.toDataURL({ format: "png", multiplier });
    const wmm = this.pageWidthMM, hmm = this.pageHeightMM;
    // داخل doPrint() بعد تحديد copies و قبل طباعة النافذة:
    try {
      const data = this.docFromRoute || this.doc || {};
      const parent_doctype = data.doctype || this.doctype;
      const parent_name = data.name || this.docname;
      const child_field = data.__child_field || null; // نرسلناه من Client Script
      const child_rows = [];
      if (child_field && Array.isArray(data[child_field])) {
        // لو مرّرت صفاً واحداً نرسله، ولو عدة صفوف نرسل أسماءها
        data[child_field].forEach(r => { if (r && r.name) child_rows.push(r.name); });
      }

      await frappe.call({
        method: 'mysys_barcode.api.log_print', // أو docType version
        args: {
          parent_doctype, parent_name,
          child_field, child_row_names: JSON.stringify(child_rows),
          copies, template_name: this.templateName || null
        }
      });
    } catch (e) {
      console.warn("print log failed", e);
    }

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
  async _printAsVectorHTML(copies) {
    const data = this.docFromRoute || this.doc || {};
    const W = this.pageWidthMM, H = this.pageHeightMM;
    const px2mm = (px) => (px / this.mmToPx);
    const esc = (s) => (s == null ? "" : String(s)).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
    // داخل doPrint() بعد تحديد copies و قبل طباعة النافذة:
    try {
      const data = this.docFromRoute || this.doc || {};
      const parent_doctype = data.doctype || this.doctype;
      const parent_name = data.name || this.docname;
      const child_field = data.__child_field || null; // نرسلناه من Client Script
      const child_rows = [];
      if (child_field && Array.isArray(data[child_field])) {
        // لو مرّرت صفاً واحداً نرسله، ولو عدة صفوف نرسل أسماءها
        data[child_field].forEach(r => { if (r && r.name) child_rows.push(r.name); });
      }

      await frappe.call({
        method: 'mysys_barcode.api.log_print', // أو docType version
        args: {
          parent_doctype, parent_name,
          child_field, child_row_names: JSON.stringify(child_rows),
          copies, template_name: this.templateName || null
        }
      });
    } catch (e) {
      console.warn("print log failed", e);
    }

    const buildLabelInner = () => {
      const parts = [];
      this.canvas.getObjects().forEach((o) => {
        const leftMM = px2mm(o.left).toFixed(3);
        const topMM = px2mm(o.top).toFixed(3);
        const widthMM = px2mm(o.getScaledWidth()).toFixed(3);
        const heightMM = px2mm(o.getScaledHeight()).toFixed(3);

        if (o.isType && o.isType("textbox")) {
          const text = esc(o.bindField ? (this._getByPath(data, o.bindField) ?? o.text) : o.text);
          const fontMM = px2mm(o.fontSize || 12).toFixed(3);
          parts.push(
            `<div style="position:absolute;left:${leftMM}mm;top:${topMM}mm;width:${widthMM}mm;height:${heightMM}mm;` +
            `font-size:${fontMM}mm;line-height:1;white-space:nowrap;text-align:${o.textAlign || 'left'};">${text}</div>`
          );
        } else if (o.customType === "barcode") {
          const val = esc(o.bindField ? (this._getByPath(data, o.bindField) ?? o.barcodeValue) : o.barcodeValue);
          const fmt = o.format || "CODE128";
          const barWidth = parseInt(o.barWidth || 2, 10);
          const barHeight = parseInt(o.barHeight || 60, 10);

          const mt = px2mm(o.marginTop || 0).toFixed(3);
          const mr = px2mm(o.marginRight || 0).toFixed(3);
          const mb = px2mm(o.marginBottom || 0).toFixed(3);
          const ml = px2mm(o.marginLeft || 0).toFixed(3);

          const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          try {
            JsBarcode(svg, val || " ", { format: fmt, width: barWidth, height: barHeight, displayValue: !!o.displayValue });
          } catch (e) { }
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
    const content = Array.from({ length: copies }, () => label).join("");

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

