(function () {
  var _securitySetupPromise = null;
  var _connectionPromise = null;
  var _connectionState = { connected: false, connecting: false, certStatus: "unknown" };
  var _stateListeners = [];

  function fireStateChange() {
    var state = { connected: _connectionState.connected, connecting: _connectionState.connecting, certStatus: _connectionState.certStatus };
    for (var i = 0; i < _stateListeners.length; i++) {
      try { _stateListeners[i](state); } catch (e) {}
    }
  }

  function isQzActive() {
    try {
      return typeof qz !== "undefined" && qz.websocket && qz.websocket.isActive();
    } catch (e) {
      return false;
    }
  }

  function setupSecurity() {
    if (_securitySetupPromise) return _securitySetupPromise;
    _securitySetupPromise = frappe.call({ method: "mysys_barcode.api.qz.get_certificate" }).then(function (r) {
      var pem = r.message && r.message.pem;
      if (!pem) { _securitySetupPromise = null; return Promise.reject(new Error("QZ certificate not found. Generate one first.")); }
      if (typeof qz === "undefined") { _securitySetupPromise = null; return Promise.reject(new Error("QZ Tray library not loaded")); }
      qz.security.setCertificatePromise(function (resolve) { resolve(pem); });
      qz.security.setSignatureAlgorithm("SHA512");
      qz.security.setSignaturePromise(function (toSign) {
        return function (resolve) {
          frappe.call({ method: "mysys_barcode.api.qz.sign_message", args: { message: toSign } }).then(function (resp) {
            resolve((resp.message && resp.message.signature) || undefined);
          }).catch(function (err) {
            console.warn("QZ Tray: Signing failed", err);
            resolve();
          });
        };
      });
    }).catch(function (err) {
      _securitySetupPromise = null;
      console.warn("QZ Tray: Security setup failed", err);
      throw err;
    });
    return _securitySetupPromise;
  }

  function connect() {
    if (_connectionState.connected && isQzActive()) return Promise.resolve(true);
    if (_connectionPromise) return _connectionPromise;
    _connectionState.connecting = true;
    _connectionState.certStatus = "unknown";
    fireStateChange();
    _connectionPromise = setupSecurity().then(function () {
      if (typeof qz === "undefined") throw new Error("QZ Tray library not loaded");
      if (!isQzActive()) return qz.websocket.connect();
    }).then(function () {
      return qz.printers.find();
    }).then(function () {
      _connectionState.connected = true;
      _connectionState.connecting = false;
      _connectionState.certStatus = "trusted";
      fireStateChange();
      return true;
    }).catch(function (err) {
      _connectionState.connected = false;
      _connectionState.connecting = false;
      _connectionState.certStatus = "untrusted";
      fireStateChange();
      console.warn("QZ Tray: Connection failed", err);
      return false;
    }).then(function (connected) {
      _connectionPromise = null;
      return connected;
    });
    return _connectionPromise;
  }

  function disconnect() {
    try { if (isQzActive()) qz.websocket.disconnect(); } catch (e) {}
    _connectionState.connected = false;
    _connectionState.connecting = false;
    fireStateChange();
    return Promise.resolve();
  }

  function findPrinters() {
    if (!isQzActive()) return connect().then(function (ok) { if (!ok) throw new Error("QZ Tray is not connected"); return qz.printers.find(); });
    return qz.printers.find();
  }

  function getSavedPrinterName() {
    try { return localStorage.getItem("qz_printer_name") || ""; } catch (e) { return ""; }
  }

  function savePrinterName(name) {
    try { localStorage.setItem("qz_printer_name", name || ""); } catch (e) {}
  }

  function printRaw(opts) {
    var printerName = opts.printerName, raw = opts.raw, copies = opts.copies || 1;
    if (!isQzActive()) return connect().then(function (ok) { if (!ok) throw new Error("QZ Tray is not connected"); return doPrint(printerName, raw, copies); });
    return doPrint(printerName, raw, copies);
  }

  function doPrint(printerName, raw, copies) {
    var printer = printerName || getSavedPrinterName();
    if (!printer) return Promise.reject(new Error("Printer name is not specified"));
    var config = qz.configs.create(printer, { copies: Number(copies || 1) });
    return qz.print(config, [raw]);
  }

  function downloadCertificate() {
    return frappe.call({ method: "mysys_barcode.api.qz.get_certificate_download" }).then(function (r) {
      var data = r.message || {};
      if (!data.pem) throw new Error("No certificate PEM received");
      var blob = new Blob([data.pem], { type: "application/x-x509-ca-cert" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = data.company ? data.company + ".crt" : "qz-certificate.crt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }).catch(function (err) {
      console.error("Download certificate failed", err);
      frappe.msgprint(__("Failed to download QZ Tray certificate."));
    });
  }

  function onStateChange(fn) {
    _stateListeners.push(fn);
    return function () { var idx = _stateListeners.indexOf(fn); if (idx >= 0) _stateListeners.splice(idx, 1); };
  }

  function getConnectionState() {
    var active = isQzActive();
    _connectionState.connected = active;
    if (active) _connectionState.connecting = false;
    return { connected: _connectionState.connected, connecting: _connectionState.connecting, certStatus: _connectionState.certStatus };
  }

  window.__qz_security__ = {
    setupSecurity: setupSecurity,
    connect: connect,
    disconnect: disconnect,
    findPrinters: findPrinters,
    getSavedPrinterName: getSavedPrinterName,
    savePrinterName: savePrinterName,
    printRaw: printRaw,
    downloadCertificate: downloadCertificate,
    onStateChange: onStateChange,
    getConnectionState: getConnectionState,
  };
})();
