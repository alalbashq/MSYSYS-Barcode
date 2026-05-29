// file: mysys_barcode/mysys_barcode/page/quick_barcode_print/quick_barcode_print.js
frappe.provide('mysys.qbp');

frappe.pages['quick-barcode-print'].on_page_load = function (wrapper) {
  mysys.qbp.page = new mysys.qbp.Page(wrapper);
};

mysys.qbp.Page = class {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.page = frappe.ui.make_app_page({
      parent: wrapper,
      title: __('Quick Barcode Print'),
      single_column: true
    });

    // --- State ---
    this.mmToPx = 3.779528;
    this.pageW = 50; this.pageH = 30;
    this.doc = null; this.items = [];
    this.child_field = 'items';
    this.templates = [];
    this.templateLayout = [];      // layout_json بعد اختيار القالب
    this.templateSourceDoctype = "";
    this.extra_by_row = {};        // بيانات إضافية لكل صف من دالة py
    this.route_options_by_row = {};

    // /app/quick-barcode-print?doc=Sales%20Invoice/SINV-0001
    const q = frappe.utils.get_query_params();
    const docParam = q.doc ? decodeURIComponent(q.doc) : "";
    this.doctype = docParam.split('/')[0] || 'Sales Invoice';
    this.name = docParam.split('/')[1] || '';

    this.load().then(() => this.init_ui());
  }

  /* =========================================================
   * Boot
   * =======================================================*/
  async load() {
    const r = await frappe.call({
      method: 'mysys_barcode.api.qbp_boot',
      args: { doctype: this.doctype, name: this.name }
    });
    const m = r.message || {};
    this.doc         = m.doc || {};
    this.items       = m.items || [];
    this.pageW       = m.width_mm  || 50;
    this.pageH       = m.height_mm || 30;
    this.child_field = m.child_field || 'items';
    this.templates   = m.templates || [];
  }

  /* =========================================================
   * Utils
   * =======================================================*/
  _toStr(v){ if(v==null) return ""; try{ return String(v); }catch{ return v+""; } }
  _esc(s){ return (s==null?"":String(s)).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

  _getByPath(obj, path){
    if (!obj || !path) return undefined;
    path = String(path).replace(/\[\]/g, '[0]');
    const segs = path.replace(/\[(\d*)\]/g, '.$1').split('.').filter(Boolean);
    let cur = obj;
    for (let i=0;i<segs.length;i++){
      const k = segs[i];
      cur = Array.isArray(cur) ? cur[(k===''?0:parseInt(k,10))] : cur?.[k];
      if (cur===undefined || cur===null) break;
    }
    return cur;
  }

  _buildDataForRow(row){
    const cf = this.child_field || 'items';
    // ننسخ الأب ثم ننسخ حقول السطر فوقه (الأسماء المشتركة تأخذ من السطر)
    const data = Object.assign({}, this.doc, row);
    // لتمكين مسارات items[0].field
    data[cf] = [row];
    // دمج أي بيانات إضافية من بايثون حسب صف معين
    const ex = this.extra_by_row && this.extra_by_row[row.name];
    if (ex) Object.assign(data, ex);
    return data;
  }

  _getRowByCdn(cdn){
    return (this.items || []).find(x => x.name === cdn) || null;
  }

  _routeOptionsCacheKey(row, template){
    return `${row?.name || ""}::${template || ""}::${this.templateSourceDoctype || ""}`;
  }

  async _prepareRouteOptionsForRow(row, { force = false } = {}){
    if (!row) return null;
    const template = $("#qbp-template").val() || "";
    const key = this._routeOptionsCacheKey(row, template);
    if (!force && this.route_options_by_row[key]) {
      return this.route_options_by_row[key];
    }

    const response = await frappe.call({
      method: 'mysys_barcode.api.prepare_quick_barcode_route_options',
      args: {
        parent_doctype: this.doc.doctype,
        parent_name: this.doc.name,
        child_field: this.child_field || 'items',
        child_row_name: row.name,
        template,
        target_doctype: this.templateSourceDoctype || null,
      },
    });
    const routeOptions = response.message || {};
    this.route_options_by_row[key] = routeOptions;
    return routeOptions;
  }

  async _prepareRouteOptionsForRows(rows, { force = false } = {}){
    const out = {};
    await Promise.all((rows || []).map(async (entry) => {
      const routeOptions = await this._prepareRouteOptionsForRow(entry.row, { force });
      if (routeOptions) out[entry.cdn] = routeOptions;
    }));
    return out;
  }

  _getRenderValue(layoutObject, routeOptions, legacyData){
    const renderData = routeOptions?.render_data || {};
    const key = layoutObject?.binding_key || layoutObject?.bindField || layoutObject?.fieldname || "";
    if (key && Object.prototype.hasOwnProperty.call(renderData, key)) {
      return renderData[key];
    }

    if (layoutObject?.sample_value) return layoutObject.sample_value;

    if (legacyData && layoutObject?.bindField) {
      const legacyValue = this._getByPath(legacyData, layoutObject.bindField);
      if (legacyValue !== undefined && legacyValue !== null) return legacyValue;
    }

    return layoutObject?.label || layoutObject?.baseText || layoutObject?.text || layoutObject?.barcodeValue || key || "";
  }

  // توليد SVG نصّي بالعميل
  _svgBarcodeString(value, format, width=2, height=60, displayValue=false){
    try{
      const el = document.createElementNS("http://www.w3.org/2000/svg","svg");
      JsBarcode(el, value || " ", { format, width, height, displayValue });
      el.setAttribute("width","100%"); el.setAttribute("height","100%");
      return el.outerHTML;
    }catch(e){
      return `<div style="color:#a00;font-size:10px">${this._esc(value||"")}</div>`;
    }
  }

  /* =========================================================
   * Printed marks (localStorage)
   * =======================================================*/
  _get_printed_key(){
    return `qbp_printed::${this.doc?.doctype || ''}::${this.doc?.name || ''}`;
  }
  _load_printed_set(){
    try{
      const raw = localStorage.getItem(this._get_printed_key());
      const arr = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(arr)?arr:[]);
    }catch{ return new Set(); }
  }
  _save_printed_set(set){
    try{ localStorage.setItem(this._get_printed_key(), JSON.stringify(Array.from(set))); }catch{}
  }
  _apply_print_marks(){
    const printed = this._load_printed_set();
    $("#qbp-items-body tr[data-cdn]").each((_, tr) => {
      const $tr = $(tr);
      const cdn = $tr.attr("data-cdn");
      const mark = printed.has(cdn);
      $tr.toggleClass("qbp-row-printed", !!mark);
      const $nameCell = $tr.find("td").eq(1);
      if (mark){
        if (!$nameCell.find(".qbp-printed-badge").length){
          $nameCell.append(`<span class="qbp-printed-badge">• ${__("Printed")}</span>`);
        }
      }else{
        $nameCell.find(".qbp-printed-badge").remove();
      }
    });

    // تفعيل فلتر "غير مطبوعة فقط" إن كان مفعّل
    if ($("#qbp-only-unprinted").prop("checked")){
      $("#qbp-items-body tr[data-cdn].qbp-row-printed").hide();
    }
  }
  _mark_rows_printed(row_names){
    if (!row_names || !row_names.length) return;
    const printed = this._load_printed_set();
    row_names.forEach(n => printed.add(n));
    this._save_printed_set(printed);
    this._apply_print_marks(); // تلوين لحظي
  }
  _reset_print_marks(){
    this._save_printed_set(new Set());
    this._apply_print_marks();
  }

  /* =========================================================
   * Template-driven label build
   * =======================================================*/
  _buildLabelFromLayout(layout, routeOptions, legacyData){
    const px2mm = (px)=> (px / this.mmToPx).toFixed(3);
    const esc = this._esc;
    const renderValue = (layoutObject) => this._getRenderValue(layoutObject, routeOptions, legacyData);

    // Placeholders الشائعة ("Smartphone" ... إلخ)
    const PLACEHOLDER_RE = /^(smart\s*phone|smartphone|sample|example|item\s*name|product\s*name)$/i;
    const coercePlaceholder = (txt, data)=>{
      if (typeof txt !== 'string') return txt;
      if (PLACEHOLDER_RE.test(txt.trim())){
        return data.item_name || data.item_code || data.barcode || data.batch_no || data.name || "";
      }
      return txt;
    };

    const svgBarcode = (value, format, width=2, height=60, displayValue=false)=>{
      try{
        const el = document.createElementNS("http://www.w3.org/2000/svg","svg");
        JsBarcode(el, value || " ", { format, width, height, displayValue });
        el.setAttribute("width","100%"); el.setAttribute("height","100%");
        return el.outerHTML;
      }catch{
        return `<div style="color:#a00;font-size:10px">${esc(value||"")}</div>`;
      }
    };

    const parts = [];
    (layout || []).forEach(o=>{
      const left = px2mm(o.left || 0);
      const top  = px2mm(o.top  || 0);
      const w    = px2mm(o.width  || o.boxWidth  || 0);
      const h    = px2mm(o.height || o.boxHeight || 0);

      if (o.type === "textbox" || o.customType === "text"){
        let txt = renderValue(o);
        if (txt === "" && o.bindField){
          const v = this._getByPath(legacyData, o.bindField);
          txt = (v==null ? "" : v);
        }else if (typeof o.text === 'string' && o.text.includes('{{')){
          txt = o.text.replace(/{{\s*([^}]+)\s*}}/g, (_m,p1)=>{
            const v = this._getByPath(legacyData, String(p1).trim());
            return (v==null?'':v);
          });
        }else if (!txt){
          txt = coercePlaceholder(o.text, legacyData || {});
        }
        const fontMM = px2mm(o.fontSize || 12);
        parts.push(
          `<div style="position:absolute;left:${left}mm;top:${top}mm;width:${w}mm;height:${h}mm;`+
          `font-size:${fontMM}mm;line-height:1;white-space:nowrap;text-align:${o.textAlign||'left'};">${esc(txt)}</div>`
        );
      }
      else if (o.customType === "barcode" || o.type === "image"){
        const val = renderValue(o) || "";
        const fmt = o.format || "CODE128";
        const barWidth  = parseInt(o.barWidth  || 2, 10);
        const barHeight = parseInt(o.barHeight || 60, 10);
        const mt = px2mm(o.marginTop    || 0);
        const mr = px2mm(o.marginRight  || 0);
        const mb = px2mm(o.marginBottom || 0);
        const ml = px2mm(o.marginLeft   || 0);
        const svg = svgBarcode(String(val), fmt, barWidth, barHeight, !!o.displayValue);

        parts.push(
          `<div style="position:absolute;left:${left}mm;top:${top}mm;width:${w}mm;height:${h}mm;`+
          `padding:${mt}mm ${mr}mm ${mb}mm ${ml}mm;box-sizing:border-box;">${svg}</div>`
        );
      }
    });

    return `<div class="label" style="position:relative;width:${this.pageW}mm;height:${this.pageH}mm;">${parts.join("")}</div>`;
  }

  /* =========================================================
   * UI
   * =======================================================*/
  init_ui(){
    const body = this.page.body;
    body.empty();

    const html = frappe.render_template('quick_barcode_print', {
      doc: this.doc,
      items: this.items,
      width_mm: this.pageW,
      height_mm: this.pageH
    });
    $(html).appendTo(body);

    // تعبئة قائمة القوالب
    const $tpl = $("#qbp-template").empty();
    (this.templates || []).forEach(t=>{
      $tpl.append(`<option value="${frappe.utils.escape_html(t.name)}">${frappe.utils.escape_html(t.name)}</option>`);
    });

    // عناصر تحكم المقاس
    $("#qbp-w").val(this.pageW); $("#qbp-h").val(this.pageH);

    // تبديل القالب
    $("#qbp-template").on("change", async (e)=>{
      const name = e.target.value || "";
      if (!name) return;
      await this._load_template(name);
      this.render_preview();
    });

    // زر إعادة تحميل القالب
    if (!document.getElementById('qbp-reload-template')){
      const $btn = $(
        `<button id="qbp-reload-template" class="btn btn-light btn-sm">
           <i class="fa fa-rotate-right"></i> ${__("Reload Template")}
         </button>`
      );
      $("#qbp-toolbar-extra").append($btn);
      $btn.on("click", async ()=>{
        const name = $("#qbp-template").val();
        if (!name) return frappe.show_alert({ message: __("Select a template first."), indicator: "orange" });
        await this._load_template(name);
        this.render_preview();
        frappe.show_alert({ message: __("Template reloaded."), indicator: "green" });
      });
    }

    // زر تحديث بيانات الصفوف من py
    if (!document.getElementById('qbp-refresh-extra')){
      const $btn = $(
        `<button id="qbp-refresh-extra" class="btn btn-light btn-sm">
           <i class="fa fa-database"></i> ${__("Refresh Row Data")}
         </button>`
      );
      $("#qbp-toolbar-extra").append($btn);
      $btn.on("click", async ()=>{
        const rows = this._collect_rows();
        this.extra_by_row = await this._fetch_rows_extra(rows);
        this.route_options_by_row = {};
        this.render_preview();
        frappe.show_alert({ message: __("Row data refreshed."), indicator: "green" });
      });
    }

    // فلتر “عرض غير المطبوعة فقط” + تصفير العلامات
    if (!document.getElementById('qbp-only-unprinted')){
      const $filter = $(`
        <label class="qbp-check">
          <input id="qbp-only-unprinted" type="checkbox" />
          ${__("Show only unprinted")}
        </label>
      `);
      $("#qbp-toolbar-extra").append($filter);
      $("#qbp-only-unprinted").on("change", ()=>{
        const only = $("#qbp-only-unprinted").prop("checked");
        if (only) $("#qbp-items-body tr[data-cdn].qbp-row-printed").hide();
        else $("#qbp-items-body tr[data-cdn]").show();
      });
    }
    if (!document.getElementById('qbp-reset-marks')){
      const $reset = $(`<button id="qbp-reset-marks" class="btn btn-light btn-sm">${__("Reset marks")}</button>`);
      $("#qbp-toolbar-extra").append($reset);
      $("#qbp-reset-marks").on("click", ()=>{
        this._reset_print_marks();
        frappe.show_alert({ message: __("Marks cleared"), indicator: "orange" });
      });
    }

    // تطبيق المقاس يدويًا
    $("#qbp-apply-size").on("click", ()=>{
      const w = parseFloat($("#qbp-w").val());
      const h = parseFloat($("#qbp-h").val());
      if (w>0 && h>0){ this.pageW=w; this.pageH=h; this.render_preview(); }
    });

    // تحديد الكل
    $("#qbp-select-all").on("change", (e)=>{
      $("#qbp-items-body .qbp-include").prop("checked", $(e.currentTarget).prop("checked"));
    });

    // إضافة/حذف كبسولات الباركود
    $("#qbp-items-body").on("click",".add-bc",(ev)=>{
      const cdn = ev.currentTarget.getAttribute("data-cdn");
      const type = $(`.bc-type[data-cdn="${cdn}"]`).val();
      const val  = $(`.bc-value[data-cdn="${cdn}"]`).val();
      if (!val) return;
      const host = $(`.pills[data-cdn="${cdn}"]`);
      host.append(
        `<span class="pill" data-type="${frappe.utils.escape_html(type)}" data-value="${frappe.utils.escape_html(val)}">
           <b>${frappe.utils.escape_html(type)}</b><code>${frappe.utils.escape_html(val)}</code><span class="rm">×</span>
         </span>`
      );
      $(`.bc-value[data-cdn="${cdn}"]`).val("");
      this.render_preview();
    });
    $("#qbp-items-body").on("click",".pill .rm",(ev)=>{
      $(ev.currentTarget).closest(".pill").remove();
      this.render_preview();
    });
    $("#qbp-items-body").on("click",".qbp-row-studio",(ev)=>{
      const cdn = ev.currentTarget.getAttribute("data-cdn");
      const row = this._getRowByCdn(cdn);
      void this.open_in_studio(row ? { cdn, row } : null);
    });

    // أزرار رئيسية
    $("#qbp-open-studio").on("click", ()=> this.open_in_studio());
    $("#qbp-print").on("click", ()=> this.direct_print());
    $("#qbp-output, #qbp-dpi, #qbp-copies").on("change", ()=> this.render_preview());

    // Dock Resize
    (function dockResize(){
      const dock = document.getElementById("qbp-dock");
      const grip = document.getElementById("qbp-grip");
      if (!dock || !grip) return;
      let startY=0, startH=0;
      grip.addEventListener("mousedown",(e)=>{
        startY = e.clientY; startH = dock.querySelector(".dock-body").offsetHeight;
        const move = (ev)=>{
          const dy = ev.clientY - startY;
          const nh = Math.max(140, Math.min(window.innerHeight*0.6, startH - dy));
          dock.querySelector(".dock-body").style.maxHeight = nh+"px";
        };
        const up = ()=>{ document.removeEventListener("mousemove",move); document.removeEventListener("mouseup",up); };
        document.addEventListener("mousemove",move);
        document.addEventListener("mouseup",up);
      });
    })();

    // أول معاينة + أول تطبيق لعلامات المطبوعة
    void (async () => {
      const initialTemplate = $("#qbp-template").val();
      if (initialTemplate) {
        await this._load_template(initialTemplate);
      }
      await this.render_preview();
      this._apply_print_marks();
    })();
  }

  /* =========================================================
   * Server helpers
   * =======================================================*/
  async reload_templates(){
    const r = await frappe.call({ method: 'mysys_barcode.api.qbp_templates' });
    this.templates = r.message || [];
    const $tpl = $("#qbp-template").empty();
    this.templates.forEach(t=>{
      $tpl.append(`<option value="${frappe.utils.escape_html(t.name)}">${frappe.utils.escape_html(t.name)}</option>`);
    });
  }

  async _load_template(name){
    try{
      const r = await frappe.call({
        method: 'mysys_barcode.api.qbp_template_info',
        args: { name }
      });
      const d = r.message || {};
      this.templateSourceDoctype = d.source_doctype || "";
      this.route_options_by_row = {};
      if (d.page_width_mm && d.page_height_mm){
        this.pageW = parseFloat(d.page_width_mm);
        this.pageH = parseFloat(d.page_height_mm);
        $("#qbp-w").val(this.pageW);
        $("#qbp-h").val(this.pageH);
      }
      try{ this.templateLayout = JSON.parse(d.layout_json || "[]") || []; }
      catch{ this.templateLayout = []; }
      $("#qbp-templates-info").text(
        this.templateLayout.length
          ? `${__('Applied template')} ${name} — ${this.pageW}×${this.pageH}mm`
          : __('Template has no layout.')
      );
    }catch(err){
      console.error(err);
      this.templateLayout = [];
      this.templateSourceDoctype = "";
      this.route_options_by_row = {};
      $("#qbp-templates-info").text(__('Failed to load template info.'));
    }
  }

  async _fetch_rows_extra(selectedRows){
    const names = (selectedRows||[]).map(r=>r.cdn);
    if (!names.length) return {};
    try{
      const r = await frappe.call({
        method: 'mysys_barcode.api.qbp_rows_extra',
        args: {
          parent_doctype: this.doc.doctype,
          parent_name: this.doc.name,
          child_field: this.child_field || 'items',
          row_names_json: JSON.stringify(names)
        }
      });
      return r.message || {};
    }catch(e){
      console.warn('qbp_rows_extra failed', e);
      return {};
    }
  }

  /* =========================================================
   * Rows collect / preview
   * =======================================================*/
  _collect_rows(){
    const rows = [];
    $("#qbp-items-body tr[data-cdn]").each((_, tr)=>{
      const $tr = $(tr);
      if (!$tr.find(".qbp-include").prop("checked")) return;
      const cdn = $tr.attr("data-cdn");
      const row = (this.items||[]).find(x=>x.name===cdn);
      if (!row) return;
      const copies = parseInt($tr.find(".row-copies, .qbp-row-copies").val() || "1", 10) || 1;
      const pills = [];
      $tr.find(".pills .pill, .qbp-bc-pills .qbp-pill").each((_, el)=>{
        pills.push({ type: el.getAttribute("data-type"), value: el.getAttribute("data-value") });
      });
      rows.push({ cdn, row, copies, barcodes: pills });
    });
    return rows;
  }

  async render_preview(){
    const $pv = $("#qbp-preview").empty();
    const rows = this._collect_rows();
    if (!rows.length){
      $pv.html(`<div class="text-muted">${__('No items selected')}</div>`);
      return;
    }

    if ((this.templateLayout||[]).length){
      // اجلب بيانات إضافية حسب الصفوف المختارة ليتوحّد الناتج مع الاستوديو
      this.extra_by_row = await this._fetch_rows_extra(rows);
      let routeOptionsByRow = {};
      try {
        routeOptionsByRow = await this._prepareRouteOptionsForRows(rows);
      } catch (error) {
        console.error('Unable to prepare row route options', error);
        $pv.html(`<div class="text-danger">${__('Unable to prepare Barcode Studio data.')}</div>`);
        return;
      }

      const limit = Math.min(8, rows.reduce((s,r)=> s + r.copies, 0));
      let count = 0;
      const htmls = [];

      for (const r of rows){
        for (let i=0;i<r.copies;i++){
          if (count>=limit) break;
          const legacyData = this._buildDataForRow(r.row);
          htmls.push(this._buildLabelFromLayout(this.templateLayout, routeOptionsByRow[r.cdn], legacyData));
          count++;
        }
        if (count>=limit) break;
      }
      $pv.html(htmls.join(''));
      return;
    }

    $pv.html(`<div class="text-muted">${__('Select a template')}</div>`);
  }

  /* =========================================================
   * Print
   * =======================================================*/
  async direct_print(){
    const rows = this._collect_rows();
    if (!rows.length) { return frappe.msgprint(__('No rows selected')); }

    // مزامنة بيانات إضافية قبل الطباعة
    this.extra_by_row = await this._fetch_rows_extra(rows);

    const mode = $("#qbp-output").val() || "html";
    const globalCopies = parseInt($("#qbp-copies").val() || "1", 10);

    if (mode !== 'html'){
      return frappe.msgprint(__('Image mode not implemented; use HTML (Vector).'));
    }
    if (!(this.templateLayout||[]).length){
      return frappe.msgprint(__('Select a template first.'));
    }

    let routeOptionsByRow = {};
    try {
      routeOptionsByRow = await this._prepareRouteOptionsForRows(rows, { force: true });
    } catch (error) {
      console.error('Unable to prepare row route options', error);
      return frappe.msgprint(__('Unable to prepare Barcode Studio data.'));
    }

    // 👇 نعلّم الصفوف كمطبوعة مباشرة لردّ فعل لحظي
    const printedNames = rows.map(r=>r.cdn);
    this._mark_rows_printed(printedNames);

    // ابنِ صفحات الطباعة
    const labels = [];
    rows.forEach(r=>{
      const repeats = Math.max(1, r.copies) * Math.max(1, globalCopies);
      for (let i=0;i<repeats;i++){
        const legacyData = this._buildDataForRow(r.row);
        labels.push(this._buildLabelFromLayout(this.templateLayout, routeOptionsByRow[r.cdn], legacyData));
      }
    });

    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
      @page{size:${this.pageW}mm ${this.pageH}mm;margin:0}
      html,body{margin:0;padding:0}
      .sheet{display:flex;flex-direction:column}
      .label{break-inside:avoid}
      svg{shape-rendering:crispEdges}
    </style></head><body><div class="sheet">${labels.join('')}</div></body></html>`;

    const w = window.open("about:blank");
    w.document.write(html); w.document.close(); w.focus(); w.print();

    // (اختياري) استدعِ API للتسجيل؛ ولو فشل ممكن تعمل rollback بإزالة العلامات
    // try { await frappe.call({ method:'...', args:{ ... } }); }
    // catch(e){ this._undo_mark(printedNames); }
  }

  /* =========================================================
   * Studio
   * =======================================================*/
  async open_in_studio(rowInfo = null){
    const rows = rowInfo ? [rowInfo] : this._collect_rows();
    if (!rows.length) {
      return frappe.msgprint(__('No rows selected'));
    }
    if (!rowInfo && rows.length > 1) {
      frappe.show_alert({ message: __('Opening the first selected item in Barcode Studio.'), indicator: 'blue' });
    }

    const target = rows[0];
    try {
      const route_options = await this._prepareRouteOptionsForRow(target.row, { force: true });
      frappe.route_options = {
        ...route_options,
        ...(route_options.render_data || {}),
      };
      frappe.set_route('barcode-studio', route_options.doctype || this.doc.doctype, route_options.name || this.doc.name, route_options.template || '');
    } catch (error) {
      console.error('Failed to open Barcode Studio', error);
      frappe.msgprint(__('Unable to prepare Barcode Studio data.'));
    }
  }
};
