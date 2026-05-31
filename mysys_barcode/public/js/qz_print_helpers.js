(function () {
  function getElementValue(element, renderData) {
    var key = element.binding_key || element.bindField || element.fieldname || "";
    if (key && renderData && renderData[key] !== undefined && renderData[key] !== null) return String(renderData[key]);
    if (!key && element.baseBarcodeValue !== undefined) return String(element.baseBarcodeValue || "");
    if (!key && element.barcodeValue !== undefined) return String(element.barcodeValue || "");
    if (!key && element.baseText !== undefined) return String(element.baseText || "");
    if (!key && element.text !== undefined) return String(element.text || "");
    if (element.sample_value) return String(element.sample_value);
    if (element.label) return element.label;
    if (element.fieldname) return element.fieldname;
    return "";
  }

  function mmToDots(mm, dpi) {
    return Math.round((Number(mm || 0) / 25.4) * Number(dpi || 203));
  }

  function cleanZPLValue(value) {
    return String(value == null ? "" : value).replace(/[\^~\r\n]/g, " ");
  }

  function cleanTSPLValue(value) {
    return String(value == null ? "" : value).replace(/[\r\n]/g, " ").replace(/"/g, '\\"');
  }

  function buildZPL(opts) {
    var template = opts.template, elements = opts.elements, renderData = opts.renderData;
    var widthMM = template.label_width_mm || template.width_mm || 40;
    var heightMM = template.label_height_mm || template.height_mm || 25;
    var dpi = template.printer_dpi || template.dpi || 203;
    var pw = mmToDots(widthMM, dpi);
    var ll = mmToDots(heightMM, dpi);
    var lines = ["^XA", "^PW" + pw, "^LL" + ll];
    for (var i = 0; i < (elements || []).length; i++) {
      var el = elements[i];
      var x = mmToDots(el.left_mm || el.x || 0, dpi);
      var y = mmToDots(el.top_mm || el.y || 0, dpi);
      var type = el.customType || el.type || el.barcode_type || "";
      if (type === "barcode" || type === "code128") {
        var value = cleanZPLValue(getElementValue(el, renderData));
        var barHeight = mmToDots(el.bar_height_mm || el.h || 12, dpi);
        var moduleWidth = el.bar_width_mm ? Math.max(1, mmToDots(el.bar_width_mm, dpi)) : 2;
        lines.push("^FO" + x + "," + y);
        lines.push("^BY" + moduleWidth);
        lines.push("^BCN," + barHeight + ",N,N,N");
        lines.push("^FD" + value + "^FS");
      } else if (type === "qrcode") {
        var value = cleanZPLValue(getElementValue(el, renderData));
        lines.push("^FO" + x + "," + y);
        lines.push("^BQN,2,10");
        lines.push("^FDMM,A" + value + "^FS");
      } else if (type === "line" || type === "rect" || type === "rectangle") {
        var w = mmToDots(el.width_mm || el.w || 10, dpi);
        var h = mmToDots(el.height_mm || el.h || 1, dpi);
        var t = Math.max(1, mmToDots(el.thickness_mm || el.thickness || 0.5, dpi));
        lines.push("^FO" + x + "," + y);
        lines.push("^GB" + w + "," + h + "," + t + "^FS");
      } else {
        var value = cleanZPLValue(getElementValue(el, renderData) || el.text || el.baseText || "");
        var fontSize = el.font_size_mm ? mmToDots(el.font_size_mm, dpi) : 18;
        lines.push("^FO" + x + "," + y);
        lines.push("^A0N," + fontSize + "," + fontSize);
        lines.push("^FD" + value + "^FS");
      }
    }
    lines.push("^XZ");
    return lines.join("\n");
  }

  function buildTSPL(opts) {
    var template = opts.template, elements = opts.elements, renderData = opts.renderData;
    var widthMM = template.label_width_mm || template.width_mm || 40;
    var heightMM = template.label_height_mm || template.height_mm || 25;
    var gapMM = template.gap_mm || 2;
    var dpi = template.printer_dpi || template.dpi || 203;
    var lines = ["SIZE " + widthMM + " mm," + heightMM + " mm", "GAP " + gapMM + " mm,0", "CLS"];
    for (var i = 0; i < (elements || []).length; i++) {
      var el = elements[i];
      var x = mmToDots(el.left_mm || el.x || 0, dpi);
      var y = mmToDots(el.top_mm || el.y || 0, dpi);
      var type = el.customType || el.type || el.barcode_type || "";
      if (type === "barcode" || type === "code128") {
        var value = cleanTSPLValue(getElementValue(el, renderData));
        var barHeight = mmToDots(el.bar_height_mm || el.h || 12, dpi);
        lines.push('BARCODE ' + x + ',' + y + ',"128",' + barHeight + ',0,0,2,2,"' + value + '"');
      } else if (type === "qrcode") {
        var value = cleanTSPLValue(getElementValue(el, renderData));
        lines.push('QRCODE ' + x + ',' + y + ',H,5,A,0,M2,S7,"' + value + '"');
      } else if (type === "line" || type === "rect" || type === "rectangle") {
        var w = mmToDots(el.width_mm || el.w || 10, dpi);
        var h = mmToDots(el.height_mm || el.h || 0.5, dpi);
        var t = Math.max(1, mmToDots(el.thickness_mm || el.thickness || 0.5, dpi));
        if (h < 1) h = t;
        lines.push('LINE ' + x + ',' + y + ',' + (x + w) + ',' + (y + h) + ',' + t);
      } else {
        var value = cleanTSPLValue(getElementValue(el, renderData) || el.text || el.baseText || "");
        var fontSize = el.font_size_mm ? Math.max(1, Math.round(el.font_size_mm)) : 3;
        lines.push('TEXT ' + x + ',' + y + ',"' + fontSize + '",0,1,1,"' + value + '"');
      }
    }
    lines.push("PRINT 1");
    return lines.join("\n");
  }

  window.__qz_print_helpers__ = {
    getElementValue: getElementValue,
    mmToDots: mmToDots,
    buildZPL: buildZPL,
    buildTSPL: buildTSPL,
  };
})();
