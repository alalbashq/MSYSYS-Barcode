(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
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
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // ../mysys_barcode/mysys_barcode/public/js/tabulator/tabulator.min.js
  var require_tabulator_min = __commonJS({
    "../mysys_barcode/mysys_barcode/public/js/tabulator/tabulator.min.js"(exports, module) {
      !function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Tabulator = t();
      }(exports, function() {
        var _a, _b, _c, _d, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r2, _s, _t;
        "use strict";
        var e = { debugEventsExternal: false, debugEventsInternal: false, debugInvalidOptions: true, debugInvalidComponentFuncs: true, debugInitialization: true, debugDeprecation: true, height: false, minHeight: false, maxHeight: false, columnHeaderVertAlign: "top", popupContainer: false, columns: [], columnDefaults: {}, rowHeader: false, data: false, autoColumns: false, autoColumnsDefinitions: false, nestedFieldSeparator: ".", footerElement: false, index: "id", textDirection: "auto", addRowPos: "bottom", headerVisible: true, renderVertical: "virtual", renderHorizontal: "basic", renderVerticalBuffer: 0, scrollToRowPosition: "top", scrollToRowIfVisible: true, scrollToColumnPosition: "left", scrollToColumnIfVisible: true, rowFormatter: false, rowFormatterPrint: null, rowFormatterClipboard: null, rowFormatterHtmlOutput: null, rowHeight: null, placeholder: false, dataLoader: true, dataLoaderLoading: false, dataLoaderError: false, dataLoaderErrorTimeout: 3e3, dataSendParams: {}, dataReceiveParams: {} };
        class t {
          constructor(e2) {
            this.table = e2;
          }
          reloadData(e2, t2, i2) {
            return this.table.dataLoader.load(e2, void 0, void 0, void 0, t2, i2);
          }
          langText() {
            return this.table.modules.localize.getText(...arguments);
          }
          langBind() {
            return this.table.modules.localize.bind(...arguments);
          }
          langLocale() {
            return this.table.modules.localize.getLocale(...arguments);
          }
          commsConnections() {
            return this.table.modules.comms.getConnections(...arguments);
          }
          commsSend() {
            return this.table.modules.comms.send(...arguments);
          }
          layoutMode() {
            return this.table.modules.layout.getMode();
          }
          layoutRefresh(e2) {
            return this.table.modules.layout.layout(e2);
          }
          subscribe() {
            return this.table.eventBus.subscribe(...arguments);
          }
          unsubscribe() {
            return this.table.eventBus.unsubscribe(...arguments);
          }
          subscribed(e2) {
            return this.table.eventBus.subscribed(e2);
          }
          subscriptionChange() {
            return this.table.eventBus.subscriptionChange(...arguments);
          }
          dispatch() {
            return this.table.eventBus.dispatch(...arguments);
          }
          chain() {
            return this.table.eventBus.chain(...arguments);
          }
          confirm() {
            return this.table.eventBus.confirm(...arguments);
          }
          dispatchExternal() {
            return this.table.externalEvents.dispatch(...arguments);
          }
          subscribedExternal(e2) {
            return this.table.externalEvents.subscribed(e2);
          }
          subscriptionChangeExternal() {
            return this.table.externalEvents.subscriptionChange(...arguments);
          }
          options(e2) {
            return this.table.options[e2];
          }
          setOption(e2, t2) {
            return void 0 !== t2 && (this.table.options[e2] = t2), this.table.options[e2];
          }
          deprecationCheck(e2, t2, i2) {
            return this.table.deprecationAdvisor.check(e2, t2, i2);
          }
          deprecationCheckMsg(e2, t2) {
            return this.table.deprecationAdvisor.checkMsg(e2, t2);
          }
          deprecationMsg(e2) {
            return this.table.deprecationAdvisor.msg(e2);
          }
          module(e2) {
            return this.table.module(e2);
          }
        }
        class i {
          constructor(e2) {
            return this._column = e2, this.type = "ColumnComponent", new Proxy(this, { get: function(e3, t2, i2) {
              return void 0 !== e3[t2] ? e3[t2] : e3._column.table.componentFunctionBinder.handle("column", e3._column, t2);
            } });
          }
          getElement() {
            return this._column.getElement();
          }
          getDefinition() {
            return this._column.getDefinition();
          }
          getField() {
            return this._column.getField();
          }
          getTitleDownload() {
            return this._column.getTitleDownload();
          }
          getCells() {
            var e2 = [];
            return this._column.cells.forEach(function(t2) {
              e2.push(t2.getComponent());
            }), e2;
          }
          isVisible() {
            return this._column.visible;
          }
          show() {
            this._column.isGroup ? this._column.columns.forEach(function(e2) {
              e2.show();
            }) : this._column.show();
          }
          hide() {
            this._column.isGroup ? this._column.columns.forEach(function(e2) {
              e2.hide();
            }) : this._column.hide();
          }
          toggle() {
            this._column.visible ? this.hide() : this.show();
          }
          delete() {
            return this._column.delete();
          }
          getSubColumns() {
            var e2 = [];
            return this._column.columns.length && this._column.columns.forEach(function(t2) {
              e2.push(t2.getComponent());
            }), e2;
          }
          getParentColumn() {
            return this._column.getParentComponent();
          }
          _getSelf() {
            return this._column;
          }
          scrollTo(e2, t2) {
            return this._column.table.columnManager.scrollToColumn(this._column, e2, t2);
          }
          getTable() {
            return this._column.table;
          }
          move(e2, t2) {
            var i2 = this._column.table.columnManager.findColumn(e2);
            i2 ? this._column.table.columnManager.moveColumn(this._column, i2, t2) : console.warn("Move Error - No matching column found:", i2);
          }
          getNextColumn() {
            var e2 = this._column.nextColumn();
            return !!e2 && e2.getComponent();
          }
          getPrevColumn() {
            var e2 = this._column.prevColumn();
            return !!e2 && e2.getComponent();
          }
          updateDefinition(e2) {
            return this._column.updateDefinition(e2);
          }
          getWidth() {
            return this._column.getWidth();
          }
          setWidth(e2) {
            var t2;
            return t2 = true === e2 ? this._column.reinitializeWidth(true) : this._column.setWidth(e2), this._column.table.columnManager.rerenderColumns(true), t2;
          }
        }
        var s = { title: void 0, field: void 0, columns: void 0, visible: void 0, hozAlign: void 0, vertAlign: void 0, width: void 0, minWidth: 40, maxWidth: void 0, maxInitialWidth: void 0, cssClass: void 0, variableHeight: void 0, headerVertical: void 0, headerHozAlign: void 0, headerWordWrap: false, editableTitle: void 0 };
        class o {
          constructor(e2) {
            return this._cell = e2, new Proxy(this, { get: function(e3, t2, i2) {
              return void 0 !== e3[t2] ? e3[t2] : e3._cell.table.componentFunctionBinder.handle("cell", e3._cell, t2);
            } });
          }
          getValue() {
            return this._cell.getValue();
          }
          getOldValue() {
            return this._cell.getOldValue();
          }
          getInitialValue() {
            return this._cell.initialValue;
          }
          getElement() {
            return this._cell.getElement();
          }
          getRow() {
            return this._cell.row.getComponent();
          }
          getData(e2) {
            return this._cell.row.getData(e2);
          }
          getType() {
            return "cell";
          }
          getField() {
            return this._cell.column.getField();
          }
          getColumn() {
            return this._cell.column.getComponent();
          }
          setValue(e2, t2) {
            void 0 === t2 && (t2 = true), this._cell.setValue(e2, t2);
          }
          restoreOldValue() {
            this._cell.setValueActual(this._cell.getOldValue());
          }
          restoreInitialValue() {
            this._cell.setValueActual(this._cell.initialValue);
          }
          checkHeight() {
            this._cell.checkHeight();
          }
          getTable() {
            return this._cell.table;
          }
          _getSelf() {
            return this._cell;
          }
        }
        class n extends t {
          constructor(e2, t2) {
            super(e2.table), this.table = e2.table, this.column = e2, this.row = t2, this.element = null, this.value = null, this.initialValue, this.oldValue = null, this.modules = {}, this.height = null, this.width = null, this.minWidth = null, this.component = null, this.loaded = false, this.build();
          }
          build() {
            this.generateElement(), this.setWidth(), this._configureCell(), this.setValueActual(this.column.getFieldValue(this.row.data)), this.initialValue = this.value;
          }
          generateElement() {
            this.element = document.createElement("div"), this.element.className = "tabulator-cell", this.element.setAttribute("role", "gridcell"), this.column.isRowHeader && this.element.classList.add("tabulator-row-header");
          }
          _configureCell() {
            var e2 = this.element, t2 = this.column.getField();
            (e2.style.textAlign = this.column.hozAlign, this.column.vertAlign && (e2.style.display = "inline-flex", e2.style.alignItems = { top: "flex-start", bottom: "flex-end", middle: "center" }[this.column.vertAlign] || "", this.column.hozAlign && (e2.style.justifyContent = { left: "flex-start", right: "flex-end", center: "center" }[this.column.hozAlign] || "")), t2 && e2.setAttribute("tabulator-field", t2), this.column.definition.cssClass) && this.column.definition.cssClass.split(" ").forEach((t3) => {
              e2.classList.add(t3);
            });
            this.dispatch("cell-init", this), this.column.visible || this.hide();
          }
          _generateContents() {
            var e2;
            switch (typeof (e2 = this.chain("cell-format", this, null, () => this.element.innerHTML = this.value))) {
              case "object":
                if (e2 instanceof Node) {
                  for (; this.element.firstChild; )
                    this.element.removeChild(this.element.firstChild);
                  this.element.appendChild(e2);
                } else
                  this.element.innerHTML = "", null != e2 && console.warn("Format Error - Formatter has returned a type of object, the only valid formatter object return is an instance of Node, the formatter returned:", e2);
                break;
              case "undefined":
                this.element.innerHTML = "";
                break;
              default:
                this.element.innerHTML = e2;
            }
          }
          cellRendered() {
            this.dispatch("cell-rendered", this);
          }
          getElement(e2) {
            return this.loaded || (this.loaded = true, e2 || this.layoutElement()), this.element;
          }
          getValue() {
            return this.value;
          }
          getOldValue() {
            return this.oldValue;
          }
          setValue(e2, t2, i2) {
            this.setValueProcessData(e2, t2, i2) && (this.dispatch("cell-value-updated", this), this.cellRendered(), this.column.definition.cellEdited && this.column.definition.cellEdited.call(this.table, this.getComponent()), this.dispatchExternal("cellEdited", this.getComponent()), this.subscribedExternal("dataChanged") && this.dispatchExternal("dataChanged", this.table.rowManager.getData()));
          }
          setValueProcessData(e2, t2, i2) {
            var s2 = false;
            return (this.value !== e2 || i2) && (s2 = true, t2 && (e2 = this.chain("cell-value-changing", [this, e2], null, e2))), this.setValueActual(e2), s2 && this.dispatch("cell-value-changed", this), s2;
          }
          setValueActual(e2) {
            this.oldValue = this.value, this.value = e2, this.dispatch("cell-value-save-before", this), this.column.setFieldValue(this.row.data, e2), this.dispatch("cell-value-save-after", this), this.loaded && this.layoutElement();
          }
          layoutElement() {
            this._generateContents(), this.dispatch("cell-layout", this);
          }
          setWidth() {
            this.width = this.column.width, this.element.style.width = this.column.widthStyled;
          }
          clearWidth() {
            this.width = "", this.element.style.width = "";
          }
          getWidth() {
            return this.width || this.element.offsetWidth;
          }
          setMinWidth() {
            this.minWidth = this.column.minWidth, this.element.style.minWidth = this.column.minWidthStyled;
          }
          setMaxWidth() {
            this.maxWidth = this.column.maxWidth, this.element.style.maxWidth = this.column.maxWidthStyled;
          }
          checkHeight() {
            this.row.reinitializeHeight();
          }
          clearHeight() {
            this.element.style.height = "", this.height = null, this.dispatch("cell-height", this, "");
          }
          setHeight() {
            this.height = this.row.height, this.element.style.height = this.row.heightStyled, this.dispatch("cell-height", this, this.row.heightStyled);
          }
          getHeight() {
            return this.height || this.element.offsetHeight;
          }
          show() {
            this.element.style.display = this.column.vertAlign ? "inline-flex" : "";
          }
          hide() {
            this.element.style.display = "none";
          }
          delete() {
            this.dispatch("cell-delete", this), !this.table.rowManager.redrawBlock && this.element.parentNode && this.element.parentNode.removeChild(this.element), this.element = false, this.column.deleteCell(this), this.row.deleteCell(this), this.calcs = {};
          }
          getIndex() {
            return this.row.getCellIndex(this);
          }
          getComponent() {
            return this.component || (this.component = new o(this)), this.component;
          }
        }
        const _r = class extends t {
          constructor(e2, t2, i2) {
            super(t2.table), this.definition = e2, this.parent = t2, this.type = "column", this.columns = [], this.cells = [], this.isGroup = false, this.isRowHeader = i2, this.element = this.createElement(), this.contentElement = false, this.titleHolderElement = false, this.titleElement = false, this.groupElement = this.createGroupElement(), this.hozAlign = "", this.vertAlign = "", this.field = "", this.fieldStructure = "", this.getFieldValue = "", this.setFieldValue = "", this.titleDownload = null, this.titleFormatterRendered = false, this.mapDefinitions(), this.setField(this.definition.field), this.modules = {}, this.width = null, this.widthStyled = "", this.maxWidth = null, this.maxWidthStyled = "", this.maxInitialWidth = null, this.minWidth = null, this.minWidthStyled = "", this.widthFixed = false, this.visible = true, this.component = null, this.definition.columns ? (this.isGroup = true, this.definition.columns.forEach((e3, t3) => {
              var i3 = new _r(e3, this);
              this.attachColumn(i3);
            }), this.checkColumnVisibility()) : t2.registerColumnField(this), this._initialize();
          }
          createElement() {
            var e2 = document.createElement("div");
            switch (e2.classList.add("tabulator-col"), e2.setAttribute("role", "columnheader"), e2.setAttribute("aria-sort", "none"), this.isRowHeader && e2.classList.add("tabulator-row-header"), this.table.options.columnHeaderVertAlign) {
              case "middle":
                e2.style.justifyContent = "center";
                break;
              case "bottom":
                e2.style.justifyContent = "flex-end";
            }
            return e2;
          }
          createGroupElement() {
            var e2 = document.createElement("div");
            return e2.classList.add("tabulator-col-group-cols"), e2;
          }
          mapDefinitions() {
            var e2 = this.table.options.columnDefaults;
            if (e2)
              for (let t2 in e2)
                void 0 === this.definition[t2] && (this.definition[t2] = e2[t2]);
            this.definition = this.table.columnManager.optionsList.generate(_r.defaultOptionList, this.definition);
          }
          checkDefinition() {
            Object.keys(this.definition).forEach((e2) => {
              -1 === _r.defaultOptionList.indexOf(e2) && console.warn("Invalid column definition option in '" + (this.field || this.definition.title) + "' column:", e2);
            });
          }
          setField(e2) {
            this.field = e2, this.fieldStructure = e2 ? this.table.options.nestedFieldSeparator ? e2.split(this.table.options.nestedFieldSeparator) : [e2] : [], this.getFieldValue = this.fieldStructure.length > 1 ? this._getNestedData : this._getFlatData, this.setFieldValue = this.fieldStructure.length > 1 ? this._setNestedData : this._setFlatData;
          }
          registerColumnPosition(e2) {
            this.parent.registerColumnPosition(e2);
          }
          registerColumnField(e2) {
            this.parent.registerColumnField(e2);
          }
          reRegisterPosition() {
            this.isGroup ? this.columns.forEach(function(e2) {
              e2.reRegisterPosition();
            }) : this.registerColumnPosition(this);
          }
          _initialize() {
            for (var e2 = this.definition; this.element.firstChild; )
              this.element.removeChild(this.element.firstChild);
            e2.headerVertical && (this.element.classList.add("tabulator-col-vertical"), "flip" === e2.headerVertical && this.element.classList.add("tabulator-col-vertical-flip")), this.contentElement = this._buildColumnHeaderContent(), this.element.appendChild(this.contentElement), this.isGroup ? this._buildGroupHeader() : this._buildColumnHeader(), this.dispatch("column-init", this);
          }
          _buildColumnHeader() {
            var e2 = this.definition;
            (this.dispatch("column-layout", this), void 0 !== e2.visible && (e2.visible ? this.show(true) : this.hide(true)), e2.cssClass) && e2.cssClass.split(" ").forEach((e3) => {
              this.element.classList.add(e3);
            });
            e2.field && this.element.setAttribute("tabulator-field", e2.field), this.setMinWidth(parseInt(e2.minWidth)), e2.maxInitialWidth && (this.maxInitialWidth = parseInt(e2.maxInitialWidth)), e2.maxWidth && this.setMaxWidth(parseInt(e2.maxWidth)), this.reinitializeWidth(), this.hozAlign = this.definition.hozAlign, this.vertAlign = this.definition.vertAlign, this.titleElement.style.textAlign = this.definition.headerHozAlign;
          }
          _buildColumnHeaderContent() {
            var e2 = document.createElement("div");
            return e2.classList.add("tabulator-col-content"), this.titleHolderElement = document.createElement("div"), this.titleHolderElement.classList.add("tabulator-col-title-holder"), e2.appendChild(this.titleHolderElement), this.titleElement = this._buildColumnHeaderTitle(), this.titleHolderElement.appendChild(this.titleElement), e2;
          }
          _buildColumnHeaderTitle() {
            var e2 = this.definition, t2 = document.createElement("div");
            if (t2.classList.add("tabulator-col-title"), e2.headerWordWrap && t2.classList.add("tabulator-col-title-wrap"), e2.editableTitle) {
              var i2 = document.createElement("input");
              i2.classList.add("tabulator-title-editor"), i2.addEventListener("click", (e3) => {
                e3.stopPropagation(), i2.focus();
              }), i2.addEventListener("mousedown", (e3) => {
                e3.stopPropagation();
              }), i2.addEventListener("change", () => {
                e2.title = i2.value, this.dispatchExternal("columnTitleChanged", this.getComponent());
              }), t2.appendChild(i2), e2.field ? this.langBind("columns|" + e2.field, (t3) => {
                i2.value = t3 || e2.title || "&nbsp;";
              }) : i2.value = e2.title || "&nbsp;";
            } else
              e2.field ? this.langBind("columns|" + e2.field, (i3) => {
                this._formatColumnHeaderTitle(t2, i3 || e2.title || "&nbsp;");
              }) : this._formatColumnHeaderTitle(t2, e2.title || "&nbsp;");
            return t2;
          }
          _formatColumnHeaderTitle(e2, t2) {
            var i2 = this.chain("column-format", [this, t2, e2], null, () => t2);
            switch (typeof i2) {
              case "object":
                i2 instanceof Node ? e2.appendChild(i2) : (e2.innerHTML = "", console.warn("Format Error - Title formatter has returned a type of object, the only valid formatter object return is an instance of Node, the formatter returned:", i2));
                break;
              case "undefined":
                e2.innerHTML = "";
                break;
              default:
                e2.innerHTML = i2;
            }
          }
          _buildGroupHeader() {
            (this.element.classList.add("tabulator-col-group"), this.element.setAttribute("role", "columngroup"), this.element.setAttribute("aria-title", this.definition.title), this.definition.cssClass) && this.definition.cssClass.split(" ").forEach((e2) => {
              this.element.classList.add(e2);
            });
            this.titleElement.style.textAlign = this.definition.headerHozAlign, this.element.appendChild(this.groupElement);
          }
          _getFlatData(e2) {
            return e2[this.field];
          }
          _getNestedData(e2) {
            var t2, i2 = e2, s2 = this.fieldStructure, o2 = s2.length;
            for (let e3 = 0; e3 < o2 && (t2 = i2 = i2[s2[e3]], i2); e3++)
              ;
            return t2;
          }
          _setFlatData(e2, t2) {
            this.field && (e2[this.field] = t2);
          }
          _setNestedData(e2, t2) {
            var i2 = e2, s2 = this.fieldStructure, o2 = s2.length;
            for (let e3 = 0; e3 < o2; e3++)
              if (e3 == o2 - 1)
                i2[s2[e3]] = t2;
              else {
                if (!i2[s2[e3]]) {
                  if (void 0 === t2)
                    break;
                  i2[s2[e3]] = {};
                }
                i2 = i2[s2[e3]];
              }
          }
          attachColumn(e2) {
            this.groupElement ? (this.columns.push(e2), this.groupElement.appendChild(e2.getElement()), e2.columnRendered()) : console.warn("Column Warning - Column being attached to another column instead of column group");
          }
          verticalAlign(e2, t2) {
            var i2 = this.parent.isGroup ? this.parent.getGroupElement().clientHeight : t2 || this.parent.getHeadersElement().clientHeight;
            this.element.style.height = i2 + "px", this.dispatch("column-height", this, this.element.style.height), this.isGroup && (this.groupElement.style.minHeight = i2 - this.contentElement.offsetHeight + "px"), this.columns.forEach(function(t3) {
              t3.verticalAlign(e2);
            });
          }
          clearVerticalAlign() {
            this.element.style.paddingTop = "", this.element.style.height = "", this.element.style.minHeight = "", this.groupElement.style.minHeight = "", this.columns.forEach(function(e2) {
              e2.clearVerticalAlign();
            }), this.dispatch("column-height", this, "");
          }
          getElement() {
            return this.element;
          }
          getGroupElement() {
            return this.groupElement;
          }
          getField() {
            return this.field;
          }
          getTitleDownload() {
            return this.titleDownload;
          }
          getFirstColumn() {
            return this.isGroup ? !!this.columns.length && this.columns[0].getFirstColumn() : this;
          }
          getLastColumn() {
            return this.isGroup ? !!this.columns.length && this.columns[this.columns.length - 1].getLastColumn() : this;
          }
          getColumns(e2) {
            var t2 = [];
            return e2 ? this.columns.forEach((e3) => {
              t2.push(e3), t2 = t2.concat(e3.getColumns(true));
            }) : t2 = this.columns, t2;
          }
          getCells() {
            return this.cells;
          }
          getTopColumn() {
            return this.parent.isGroup ? this.parent.getTopColumn() : this;
          }
          getDefinition(e2) {
            var t2 = [];
            return this.isGroup && e2 && (this.columns.forEach(function(e3) {
              t2.push(e3.getDefinition(true));
            }), this.definition.columns = t2), this.definition;
          }
          checkColumnVisibility() {
            var e2 = false;
            this.columns.forEach(function(t2) {
              t2.visible && (e2 = true);
            }), e2 ? (this.show(), this.dispatchExternal("columnVisibilityChanged", this.getComponent(), false)) : this.hide();
          }
          show(e2, t2) {
            this.visible || (this.visible = true, this.element.style.display = "", this.parent.isGroup && this.parent.checkColumnVisibility(), this.cells.forEach(function(e3) {
              e3.show();
            }), this.isGroup || null !== this.width || this.reinitializeWidth(), this.table.columnManager.verticalAlignHeaders(), this.dispatch("column-show", this, t2), e2 || this.dispatchExternal("columnVisibilityChanged", this.getComponent(), true), this.parent.isGroup && this.parent.matchChildWidths(), this.silent || this.table.columnManager.rerenderColumns());
          }
          hide(e2, t2) {
            this.visible && (this.visible = false, this.element.style.display = "none", this.table.columnManager.verticalAlignHeaders(), this.parent.isGroup && this.parent.checkColumnVisibility(), this.cells.forEach(function(e3) {
              e3.hide();
            }), this.dispatch("column-hide", this, t2), e2 || this.dispatchExternal("columnVisibilityChanged", this.getComponent(), false), this.parent.isGroup && this.parent.matchChildWidths(), this.silent || this.table.columnManager.rerenderColumns());
          }
          matchChildWidths() {
            var e2 = 0;
            this.contentElement && this.columns.length && (this.columns.forEach(function(t2) {
              t2.visible && (e2 += t2.getWidth());
            }), this.contentElement.style.maxWidth = e2 - 1 + "px", this.parent.isGroup && this.parent.matchChildWidths());
          }
          removeChild(e2) {
            var t2 = this.columns.indexOf(e2);
            t2 > -1 && this.columns.splice(t2, 1), this.columns.length || this.delete();
          }
          setWidth(e2) {
            this.widthFixed = true, this.setWidthActual(e2);
          }
          setWidthActual(e2) {
            isNaN(e2) && (e2 = Math.floor(this.table.element.clientWidth / 100 * parseInt(e2))), e2 = Math.max(this.minWidth, e2), this.maxWidth && (e2 = Math.min(this.maxWidth, e2)), this.width = e2, this.widthStyled = e2 ? e2 + "px" : "", this.element.style.width = this.widthStyled, this.isGroup || this.cells.forEach(function(e3) {
              e3.setWidth();
            }), this.parent.isGroup && this.parent.matchChildWidths(), this.dispatch("column-width", this), this.subscribedExternal("columnWidth") && this.dispatchExternal("columnWidth", this.getComponent());
          }
          checkCellHeights() {
            var e2 = [];
            this.cells.forEach(function(t2) {
              t2.row.heightInitialized && (null !== t2.row.getElement().offsetParent ? (e2.push(t2.row), t2.row.clearCellHeight()) : t2.row.heightInitialized = false);
            }), e2.forEach(function(e3) {
              e3.calcHeight();
            }), e2.forEach(function(e3) {
              e3.setCellHeight();
            });
          }
          getWidth() {
            var e2 = 0;
            return this.isGroup ? this.columns.forEach(function(t2) {
              t2.visible && (e2 += t2.getWidth());
            }) : e2 = this.width, e2;
          }
          getLeftOffset() {
            var e2 = this.element.offsetLeft;
            return this.parent.isGroup && (e2 += this.parent.getLeftOffset()), e2;
          }
          getHeight() {
            return Math.ceil(this.element.getBoundingClientRect().height);
          }
          setMinWidth(e2) {
            this.maxWidth && e2 > this.maxWidth && (e2 = this.maxWidth, console.warn("the minWidth (" + e2 + "px) for column '" + this.field + "' cannot be bigger that its maxWidth (" + this.maxWidthStyled + ")")), this.minWidth = e2, this.minWidthStyled = e2 ? e2 + "px" : "", this.element.style.minWidth = this.minWidthStyled, this.cells.forEach(function(e3) {
              e3.setMinWidth();
            });
          }
          setMaxWidth(e2) {
            this.minWidth && e2 < this.minWidth && (e2 = this.minWidth, console.warn("the maxWidth (" + e2 + "px) for column '" + this.field + "' cannot be smaller that its minWidth (" + this.minWidthStyled + ")")), this.maxWidth = e2, this.maxWidthStyled = e2 ? e2 + "px" : "", this.element.style.maxWidth = this.maxWidthStyled, this.cells.forEach(function(e3) {
              e3.setMaxWidth();
            });
          }
          delete() {
            return new Promise((e2, t2) => {
              this.isGroup && this.columns.forEach(function(e3) {
                e3.delete();
              }), this.dispatch("column-delete", this);
              var i2 = this.cells.length;
              for (let e3 = 0; e3 < i2; e3++)
                this.cells[0].delete();
              this.element.parentNode && this.element.parentNode.removeChild(this.element), this.element = false, this.contentElement = false, this.titleElement = false, this.groupElement = false, this.parent.isGroup && this.parent.removeChild(this), this.table.columnManager.deregisterColumn(this), this.table.columnManager.rerenderColumns(true), this.dispatch("column-deleted", this), e2();
            });
          }
          columnRendered() {
            this.titleFormatterRendered && this.titleFormatterRendered(), this.dispatch("column-rendered", this);
          }
          generateCell(e2) {
            var t2 = new n(this, e2);
            return this.cells.push(t2), t2;
          }
          nextColumn() {
            var e2 = this.table.columnManager.findColumnIndex(this);
            return e2 > -1 && this._nextVisibleColumn(e2 + 1);
          }
          _nextVisibleColumn(e2) {
            var t2 = this.table.columnManager.getColumnByIndex(e2);
            return !t2 || t2.visible ? t2 : this._nextVisibleColumn(e2 + 1);
          }
          prevColumn() {
            var e2 = this.table.columnManager.findColumnIndex(this);
            return e2 > -1 && this._prevVisibleColumn(e2 - 1);
          }
          _prevVisibleColumn(e2) {
            var t2 = this.table.columnManager.getColumnByIndex(e2);
            return !t2 || t2.visible ? t2 : this._prevVisibleColumn(e2 - 1);
          }
          reinitializeWidth(e2) {
            this.widthFixed = false, void 0 === this.definition.width || e2 || this.setWidth(this.definition.width), this.dispatch("column-width-fit-before", this), this.fitToData(e2), this.dispatch("column-width-fit-after", this);
          }
          fitToData(e2) {
            if (!this.isGroup) {
              this.widthFixed || (this.element.style.width = "", this.cells.forEach((e3) => {
                e3.clearWidth();
              }));
              var t2 = this.element.offsetWidth;
              if ((!this.width || !this.widthFixed) && (this.cells.forEach((e3) => {
                var i3 = e3.getWidth();
                i3 > t2 && (t2 = i3);
              }), t2)) {
                var i2 = t2 + 1;
                this.maxInitialWidth && !e2 && (i2 = Math.min(i2, this.maxInitialWidth)), this.setWidthActual(i2);
              }
            }
          }
          updateDefinition(e2) {
            var t2;
            return this.isGroup || this.parent.isGroup ? (console.error("Column Update Error - The updateDefinition function is only available on ungrouped columns"), Promise.reject("Column Update Error - The updateDefinition function is only available on columns, not column groups")) : (t2 = Object.assign({}, this.getDefinition()), t2 = Object.assign(t2, e2), this.table.columnManager.addColumn(t2, false, this).then((e3) => (t2.field == this.field && (this.field = false), this.delete().then(() => e3.getComponent()))));
          }
          deleteCell(e2) {
            var t2 = this.cells.indexOf(e2);
            t2 > -1 && this.cells.splice(t2, 1);
          }
          getComponent() {
            return this.component || (this.component = new i(this)), this.component;
          }
          getPosition() {
            return this.table.columnManager.getVisibleColumnsByIndex().indexOf(this) + 1;
          }
          getParentComponent() {
            return this.parent instanceof _r && this.parent.getComponent();
          }
        };
        let r = _r;
        __publicField(r, "defaultOptionList", s);
        class a {
          static elVisible(e2) {
            return !(e2.offsetWidth <= 0 && e2.offsetHeight <= 0);
          }
          static elOffset(e2) {
            var t2 = e2.getBoundingClientRect();
            return { top: t2.top + window.pageYOffset - document.documentElement.clientTop, left: t2.left + window.pageXOffset - document.documentElement.clientLeft };
          }
          static retrieveNestedData(e2, t2, i2) {
            var s2, o2 = e2 ? t2.split(e2) : [t2], n2 = o2.length;
            for (let e3 = 0; e3 < n2 && (s2 = i2 = i2[o2[e3]], i2); e3++)
              ;
            return s2;
          }
          static deepClone(e2, t2, i2 = []) {
            var s2 = {}.__proto__, o2 = [].__proto__;
            for (var n2 in t2 || (t2 = Object.assign(Array.isArray(e2) ? [] : {}, e2)), e2) {
              let r2, a2, l2 = e2[n2];
              null == l2 || "object" != typeof l2 || l2.__proto__ !== s2 && l2.__proto__ !== o2 || (r2 = i2.findIndex((e3) => e3.subject === l2), r2 > -1 ? t2[n2] = i2[r2].copy : (a2 = Object.assign(Array.isArray(l2) ? [] : {}, l2), i2.unshift({ subject: l2, copy: a2 }), t2[n2] = this.deepClone(l2, a2, i2)));
            }
            return t2;
          }
        }
        class l {
          constructor(e2, t2, i2 = {}) {
            this.table = e2, this.msgType = t2, this.registeredDefaults = Object.assign({}, i2);
          }
          register(e2, t2) {
            this.registeredDefaults[e2] = t2;
          }
          generate(e2, t2 = {}) {
            var i2 = Object.assign({}, this.registeredDefaults), s2 = this.table.options.debugInvalidOptions || true === t2.debugInvalidOptions;
            Object.assign(i2, e2);
            for (let e3 in t2)
              i2.hasOwnProperty(e3) || (s2 && console.warn("Invalid " + this.msgType + " option:", e3), i2[e3] = t2.key);
            for (let e3 in i2)
              e3 in t2 ? i2[e3] = t2[e3] : Array.isArray(i2[e3]) ? i2[e3] = Object.assign([], i2[e3]) : "object" == typeof i2[e3] && null !== i2[e3] ? i2[e3] = Object.assign({}, i2[e3]) : void 0 === i2[e3] && delete i2[e3];
            return i2;
          }
        }
        class h extends t {
          constructor(e2) {
            super(e2), this.elementVertical = e2.rowManager.element, this.elementHorizontal = e2.columnManager.element, this.tableElement = e2.rowManager.tableElement, this.verticalFillMode = "fit";
          }
          initialize() {
          }
          clearRows() {
          }
          clearColumns() {
          }
          reinitializeColumnWidths(e2) {
          }
          renderRows() {
          }
          renderColumns() {
          }
          rerenderRows(e2) {
            e2 && e2();
          }
          rerenderColumns(e2, t2) {
          }
          renderRowCells(e2) {
          }
          rerenderRowCells(e2, t2) {
          }
          scrollColumns(e2, t2) {
          }
          scrollRows(e2, t2) {
          }
          resize() {
          }
          scrollToRow(e2) {
          }
          scrollToRowNearestTop(e2) {
          }
          visibleRows(e2) {
            return [];
          }
          rows() {
            return this.table.rowManager.getDisplayRows();
          }
          styleRow(e2, t2) {
            var i2 = e2.getElement();
            t2 % 2 ? (i2.classList.add("tabulator-row-even"), i2.classList.remove("tabulator-row-odd")) : (i2.classList.add("tabulator-row-odd"), i2.classList.remove("tabulator-row-even"));
          }
          clear() {
            this.clearRows(), this.clearColumns();
          }
          render() {
            this.renderRows(), this.renderColumns();
          }
          rerender(e2) {
            this.rerenderRows(), this.rerenderColumns();
          }
          scrollToRowPosition(e2, t2, i2) {
            var s2 = this.rows().indexOf(e2), o2 = e2.getElement(), n2 = 0;
            return new Promise((r2, l2) => {
              if (s2 > -1) {
                if (void 0 === i2 && (i2 = this.table.options.scrollToRowIfVisible), !i2 && a.elVisible(o2) && (n2 = a.elOffset(o2).top - a.elOffset(this.elementVertical).top) > 0 && n2 < this.elementVertical.clientHeight - o2.offsetHeight)
                  return r2(), false;
                switch (void 0 === t2 && (t2 = this.table.options.scrollToRowPosition), "nearest" === t2 && (t2 = this.scrollToRowNearestTop(e2) ? "top" : "bottom"), this.scrollToRow(e2), t2) {
                  case "middle":
                  case "center":
                    this.elementVertical.scrollHeight - this.elementVertical.scrollTop == this.elementVertical.clientHeight ? this.elementVertical.scrollTop = this.elementVertical.scrollTop + (o2.offsetTop - this.elementVertical.scrollTop) - (this.elementVertical.scrollHeight - o2.offsetTop) / 2 : this.elementVertical.scrollTop = this.elementVertical.scrollTop - this.elementVertical.clientHeight / 2;
                    break;
                  case "bottom":
                    this.elementVertical.scrollHeight - this.elementVertical.scrollTop == this.elementVertical.clientHeight ? this.elementVertical.scrollTop = this.elementVertical.scrollTop - (this.elementVertical.scrollHeight - o2.offsetTop) + o2.offsetHeight : this.elementVertical.scrollTop = this.elementVertical.scrollTop - this.elementVertical.clientHeight + o2.offsetHeight;
                    break;
                  case "top":
                    this.elementVertical.scrollTop = o2.offsetTop;
                }
                r2();
              } else
                console.warn("Scroll Error - Row not visible"), l2("Scroll Error - Row not visible");
            });
          }
        }
        class d extends h {
          constructor(e2) {
            super(e2);
          }
          renderRowCells(e2, t2) {
            const i2 = document.createDocumentFragment();
            e2.cells.forEach((e3) => {
              i2.appendChild(e3.getElement());
            }), e2.element.appendChild(i2), t2 || e2.cells.forEach((e3) => {
              e3.cellRendered();
            });
          }
          reinitializeColumnWidths(e2) {
            e2.forEach(function(e3) {
              e3.reinitializeWidth();
            });
          }
        }
        class c extends h {
          constructor(e2) {
            super(e2), this.leftCol = 0, this.rightCol = 0, this.scrollLeft = 0, this.vDomScrollPosLeft = 0, this.vDomScrollPosRight = 0, this.vDomPadLeft = 0, this.vDomPadRight = 0, this.fitDataColAvg = 0, this.windowBuffer = 200, this.visibleRows = null, this.initialized = false, this.isFitData = false, this.columns = [];
          }
          initialize() {
            this.compatibilityCheck(), this.layoutCheck(), this.vertScrollListen();
          }
          compatibilityCheck() {
            "fitDataTable" == this.options("layout") && console.warn("Horizontal Virtual DOM is not compatible with fitDataTable layout mode"), this.options("responsiveLayout") && console.warn("Horizontal Virtual DOM is not compatible with responsive columns"), this.options("rtl") && console.warn("Horizontal Virtual DOM is not currently compatible with RTL text direction");
          }
          layoutCheck() {
            this.isFitData = this.options("layout").startsWith("fitData");
          }
          vertScrollListen() {
            this.subscribe("scroll-vertical", this.clearVisRowCache.bind(this)), this.subscribe("data-refreshed", this.clearVisRowCache.bind(this));
          }
          clearVisRowCache() {
            this.visibleRows = null;
          }
          renderColumns(e2, t2) {
            this.dataChange();
          }
          scrollColumns(e2, t2) {
            this.scrollLeft != e2 && (this.scrollLeft = e2, this.scroll(e2 - (this.vDomScrollPosLeft + this.windowBuffer)));
          }
          calcWindowBuffer() {
            var e2 = this.elementVertical.clientWidth;
            this.table.columnManager.columnsByIndex.forEach((t2) => {
              if (t2.visible) {
                var i2 = t2.getWidth();
                i2 > e2 && (e2 = i2);
              }
            }), this.windowBuffer = 2 * e2;
          }
          rerenderColumns(e2, t2) {
            var i2 = { cols: this.columns, leftCol: this.leftCol, rightCol: this.rightCol }, s2 = 0;
            e2 && !this.initialized || (this.clear(), this.calcWindowBuffer(), this.scrollLeft = this.elementVertical.scrollLeft, this.vDomScrollPosLeft = this.scrollLeft - this.windowBuffer, this.vDomScrollPosRight = this.scrollLeft + this.elementVertical.clientWidth + this.windowBuffer, this.table.columnManager.columnsByIndex.forEach((e3) => {
              var t3, i3 = {};
              e3.visible && (e3.modules.frozen || (t3 = e3.getWidth(), i3.leftPos = s2, i3.rightPos = s2 + t3, i3.width = t3, this.isFitData && (i3.fitDataCheck = !e3.modules.vdomHoz || e3.modules.vdomHoz.fitDataCheck), s2 + t3 > this.vDomScrollPosLeft && s2 < this.vDomScrollPosRight ? (-1 == this.leftCol && (this.leftCol = this.columns.length, this.vDomPadLeft = s2), this.rightCol = this.columns.length) : -1 !== this.leftCol && (this.vDomPadRight += t3), this.columns.push(e3), e3.modules.vdomHoz = i3, s2 += t3));
            }), this.tableElement.style.paddingLeft = this.vDomPadLeft + "px", this.tableElement.style.paddingRight = this.vDomPadRight + "px", this.initialized = true, t2 || e2 && !this.reinitChanged(i2) || this.reinitializeRows(), this.elementVertical.scrollLeft = this.scrollLeft);
          }
          renderRowCells(e2) {
            if (this.initialized)
              this.initializeRow(e2);
            else {
              const t2 = document.createDocumentFragment();
              e2.cells.forEach((e3) => {
                t2.appendChild(e3.getElement());
              }), e2.element.appendChild(t2), e2.cells.forEach((e3) => {
                e3.cellRendered();
              });
            }
          }
          rerenderRowCells(e2, t2) {
            this.reinitializeRow(e2, t2);
          }
          reinitializeColumnWidths(e2) {
            for (let e3 = this.leftCol; e3 <= this.rightCol; e3++)
              this.columns[e3].reinitializeWidth();
          }
          deinitialize() {
            this.initialized = false;
          }
          clear() {
            this.columns = [], this.leftCol = -1, this.rightCol = 0, this.vDomScrollPosLeft = 0, this.vDomScrollPosRight = 0, this.vDomPadLeft = 0, this.vDomPadRight = 0;
          }
          dataChange() {
            var e2, t2, i2 = false;
            if (this.isFitData) {
              if (this.table.columnManager.columnsByIndex.forEach((e3) => {
                !e3.definition.width && e3.visible && (i2 = true);
              }), i2 && this.table.rowManager.getDisplayRows().length && (this.vDomScrollPosRight = this.scrollLeft + this.elementVertical.clientWidth + this.windowBuffer, e2 = this.chain("rows-sample", [1], [], () => this.table.rowManager.getDisplayRows())[0])) {
                t2 = e2.getElement(), e2.generateCells(), this.tableElement.appendChild(t2);
                for (let i3 = 0; i3 < e2.cells.length; i3++) {
                  let s2 = e2.cells[i3];
                  t2.appendChild(s2.getElement()), s2.column.reinitializeWidth();
                }
                t2.parentNode.removeChild(t2), this.rerenderColumns(false, true);
              }
            } else
              "fitColumns" === this.options("layout") && (this.layoutRefresh(), this.rerenderColumns(false, true));
          }
          reinitChanged(e2) {
            var t2 = true;
            return e2.cols.length !== this.columns.length || e2.leftCol !== this.leftCol || e2.rightCol !== this.rightCol || (e2.cols.forEach((e3, i2) => {
              e3 !== this.columns[i2] && (t2 = false);
            }), !t2);
          }
          reinitializeRows() {
            var e2 = this.getVisibleRows(), t2 = this.table.rowManager.getRows().filter((t3) => !e2.includes(t3));
            e2.forEach((e3) => {
              this.reinitializeRow(e3, true);
            }), t2.forEach((e3) => {
              e3.deinitialize();
            });
          }
          getVisibleRows() {
            return this.visibleRows || (this.visibleRows = this.table.rowManager.getVisibleRows()), this.visibleRows;
          }
          scroll(e2) {
            this.vDomScrollPosLeft += e2, this.vDomScrollPosRight += e2, Math.abs(e2) > this.windowBuffer / 2 ? this.rerenderColumns() : e2 > 0 ? (this.addColRight(), this.removeColLeft()) : (this.addColLeft(), this.removeColRight());
          }
          colPositionAdjust(e2, t2, i2) {
            for (let s2 = e2; s2 < t2; s2++) {
              let e3 = this.columns[s2];
              e3.modules.vdomHoz.leftPos += i2, e3.modules.vdomHoz.rightPos += i2;
            }
          }
          addColRight() {
            for (var e2 = false, t2 = true; t2; ) {
              let i2 = this.columns[this.rightCol + 1];
              i2 && i2.modules.vdomHoz.leftPos <= this.vDomScrollPosRight ? (e2 = true, this.getVisibleRows().forEach((e3) => {
                if ("group" !== e3.type) {
                  var t3 = e3.getCell(i2);
                  e3.getElement().insertBefore(t3.getElement(), e3.getCell(this.columns[this.rightCol]).getElement().nextSibling), t3.cellRendered();
                }
              }), this.fitDataColActualWidthCheck(i2), this.rightCol++, this.getVisibleRows().forEach((e3) => {
                "group" !== e3.type && (e3.modules.vdomHoz.rightCol = this.rightCol);
              }), this.rightCol >= this.columns.length - 1 ? this.vDomPadRight = 0 : this.vDomPadRight -= i2.getWidth()) : t2 = false;
            }
            e2 && (this.tableElement.style.paddingRight = this.vDomPadRight + "px");
          }
          addColLeft() {
            for (var e2 = false, t2 = true; t2; ) {
              let i2 = this.columns[this.leftCol - 1];
              if (i2)
                if (i2.modules.vdomHoz.rightPos >= this.vDomScrollPosLeft) {
                  e2 = true, this.getVisibleRows().forEach((e3) => {
                    if ("group" !== e3.type) {
                      var t4 = e3.getCell(i2);
                      e3.getElement().insertBefore(t4.getElement(), e3.getCell(this.columns[this.leftCol]).getElement()), t4.cellRendered();
                    }
                  }), this.leftCol--, this.getVisibleRows().forEach((e3) => {
                    "group" !== e3.type && (e3.modules.vdomHoz.leftCol = this.leftCol);
                  }), this.leftCol <= 0 ? this.vDomPadLeft = 0 : this.vDomPadLeft -= i2.getWidth();
                  let t3 = this.fitDataColActualWidthCheck(i2);
                  t3 && (this.scrollLeft = this.elementVertical.scrollLeft = this.elementVertical.scrollLeft + t3, this.vDomPadRight -= t3);
                } else
                  t2 = false;
              else
                t2 = false;
            }
            e2 && (this.tableElement.style.paddingLeft = this.vDomPadLeft + "px");
          }
          removeColRight() {
            for (var e2 = false, t2 = true; t2; ) {
              let i2 = this.columns[this.rightCol];
              i2 && i2.modules.vdomHoz.leftPos > this.vDomScrollPosRight ? (e2 = true, this.getVisibleRows().forEach((e3) => {
                if ("group" !== e3.type) {
                  var t3 = e3.getCell(i2);
                  try {
                    e3.getElement().removeChild(t3.getElement());
                  } catch (e4) {
                    console.warn("Could not removeColRight", e4.message);
                  }
                }
              }), this.vDomPadRight += i2.getWidth(), this.rightCol--, this.getVisibleRows().forEach((e3) => {
                "group" !== e3.type && (e3.modules.vdomHoz.rightCol = this.rightCol);
              })) : t2 = false;
            }
            e2 && (this.tableElement.style.paddingRight = this.vDomPadRight + "px");
          }
          removeColLeft() {
            for (var e2 = false, t2 = true; t2; ) {
              let i2 = this.columns[this.leftCol];
              i2 && i2.modules.vdomHoz.rightPos < this.vDomScrollPosLeft ? (e2 = true, this.getVisibleRows().forEach((e3) => {
                if ("group" !== e3.type) {
                  var t3 = e3.getCell(i2);
                  try {
                    e3.getElement().removeChild(t3.getElement());
                  } catch (e4) {
                    console.warn("Could not removeColLeft", e4.message);
                  }
                }
              }), this.vDomPadLeft += i2.getWidth(), this.leftCol++, this.getVisibleRows().forEach((e3) => {
                "group" !== e3.type && (e3.modules.vdomHoz.leftCol = this.leftCol);
              })) : t2 = false;
            }
            e2 && (this.tableElement.style.paddingLeft = this.vDomPadLeft + "px");
          }
          fitDataColActualWidthCheck(e2) {
            var t2, i2;
            return e2.modules.vdomHoz.fitDataCheck && (e2.reinitializeWidth(), (i2 = (t2 = e2.getWidth()) - e2.modules.vdomHoz.width) && (e2.modules.vdomHoz.rightPos += i2, e2.modules.vdomHoz.width = t2, this.colPositionAdjust(this.columns.indexOf(e2) + 1, this.columns.length, i2)), e2.modules.vdomHoz.fitDataCheck = false), i2;
          }
          initializeRow(e2) {
            if ("group" !== e2.type) {
              e2.modules.vdomHoz = { leftCol: this.leftCol, rightCol: this.rightCol }, this.table.modules.frozenColumns && this.table.modules.frozenColumns.leftColumns.forEach((t2) => {
                this.appendCell(e2, t2);
              });
              for (let t2 = this.leftCol; t2 <= this.rightCol; t2++)
                this.appendCell(e2, this.columns[t2]);
              this.table.modules.frozenColumns && this.table.modules.frozenColumns.rightColumns.forEach((t2) => {
                this.appendCell(e2, t2);
              });
            }
          }
          appendCell(e2, t2) {
            if (t2 && t2.visible) {
              let i2 = e2.getCell(t2);
              e2.getElement().appendChild(i2.getElement()), i2.cellRendered();
            }
          }
          reinitializeRow(e2, t2) {
            if ("group" !== e2.type && (t2 || !e2.modules.vdomHoz || e2.modules.vdomHoz.leftCol !== this.leftCol || e2.modules.vdomHoz.rightCol !== this.rightCol)) {
              for (var i2 = e2.getElement(); i2.firstChild; )
                i2.removeChild(i2.firstChild);
              this.initializeRow(e2);
            }
          }
        }
        class u extends t {
          constructor(e2) {
            super(e2), this.blockHozScrollEvent = false, this.headersElement = null, this.contentsElement = null, this.rowHeader = null, this.element = null, this.columns = [], this.columnsByIndex = [], this.columnsByField = {}, this.scrollLeft = 0, this.optionsList = new l(this.table, "column definition", s), this.redrawBlock = false, this.redrawBlockUpdate = null, this.renderer = null;
          }
          initialize() {
            this.initializeRenderer(), this.headersElement = this.createHeadersElement(), this.contentsElement = this.createHeaderContentsElement(), this.element = this.createHeaderElement(), this.contentsElement.insertBefore(this.headersElement, this.contentsElement.firstChild), this.element.insertBefore(this.contentsElement, this.element.firstChild), this.initializeScrollWheelWatcher(), this.subscribe("scroll-horizontal", this.scrollHorizontal.bind(this)), this.subscribe("scrollbar-vertical", this.padVerticalScrollbar.bind(this));
          }
          padVerticalScrollbar(e2) {
            this.table.rtl ? this.headersElement.style.marginLeft = e2 + "px" : this.headersElement.style.marginRight = e2 + "px";
          }
          initializeRenderer() {
            var e2, t2 = { virtual: c, basic: d };
            (e2 = "string" == typeof this.table.options.renderHorizontal ? t2[this.table.options.renderHorizontal] : this.table.options.renderHorizontal) ? (this.renderer = new e2(this.table, this.element, this.tableElement), this.renderer.initialize()) : console.error("Unable to find matching renderer:", this.table.options.renderHorizontal);
          }
          createHeadersElement() {
            var e2 = document.createElement("div");
            return e2.classList.add("tabulator-headers"), e2.setAttribute("role", "row"), e2;
          }
          createHeaderContentsElement() {
            var e2 = document.createElement("div");
            return e2.classList.add("tabulator-header-contents"), e2.setAttribute("role", "rowgroup"), e2;
          }
          createHeaderElement() {
            var e2 = document.createElement("div");
            return e2.classList.add("tabulator-header"), e2.setAttribute("role", "rowgroup"), this.table.options.headerVisible || e2.classList.add("tabulator-header-hidden"), e2;
          }
          getElement() {
            return this.element;
          }
          getContentsElement() {
            return this.contentsElement;
          }
          getHeadersElement() {
            return this.headersElement;
          }
          scrollHorizontal(e2) {
            this.contentsElement.scrollLeft = e2, this.scrollLeft = e2, this.renderer.scrollColumns(e2);
          }
          initializeScrollWheelWatcher() {
            this.contentsElement.addEventListener("wheel", (e2) => {
              var t2;
              e2.deltaX && (t2 = this.contentsElement.scrollLeft + e2.deltaX, this.table.rowManager.scrollHorizontal(t2), this.table.columnManager.scrollHorizontal(t2));
            });
          }
          generateColumnsFromRowData(e2) {
            var t2 = [], i2 = {}, s2 = "full" === this.table.options.autoColumns ? e2 : [e2[0]], o2 = this.table.options.autoColumnsDefinitions;
            if (e2 && e2.length) {
              if (s2.forEach((e3) => {
                Object.keys(e3).forEach((s3, o3) => {
                  let n2, r2 = e3[s3];
                  i2[s3] ? true !== i2[s3] && void 0 !== r2 && (i2[s3].sorter = this.calculateSorterFromValue(r2), i2[s3] = true) : (n2 = { field: s3, title: s3, sorter: this.calculateSorterFromValue(r2) }, t2.splice(o3, 0, n2), i2[s3] = void 0 !== r2 || n2);
                });
              }), o2)
                switch (typeof o2) {
                  case "function":
                    this.table.options.columns = o2.call(this.table, t2);
                    break;
                  case "object":
                    Array.isArray(o2) ? t2.forEach((e3) => {
                      var t3 = o2.find((t4) => t4.field === e3.field);
                      t3 && Object.assign(e3, t3);
                    }) : t2.forEach((e3) => {
                      o2[e3.field] && Object.assign(e3, o2[e3.field]);
                    }), this.table.options.columns = t2;
                }
              else
                this.table.options.columns = t2;
              this.setColumns(this.table.options.columns);
            }
          }
          calculateSorterFromValue(e2) {
            var t2;
            switch (typeof e2) {
              case "undefined":
                t2 = "string";
                break;
              case "boolean":
                t2 = "boolean";
                break;
              case "number":
                t2 = "number";
                break;
              case "object":
                t2 = Array.isArray(e2) ? "array" : "string";
                break;
              default:
                t2 = isNaN(e2) || "" === e2 ? e2.match(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+$/i) ? "alphanum" : "string" : "number";
            }
            return t2;
          }
          setColumns(e2, t2) {
            for (; this.headersElement.firstChild; )
              this.headersElement.removeChild(this.headersElement.firstChild);
            this.columns = [], this.columnsByIndex = [], this.columnsByField = {}, this.dispatch("columns-loading"), this.dispatchExternal("columnsLoading"), this.table.options.rowHeader && (this.rowHeader = new r(true === this.table.options.rowHeader ? {} : this.table.options.rowHeader, this, true), this.columns.push(this.rowHeader), this.headersElement.appendChild(this.rowHeader.getElement()), this.rowHeader.columnRendered()), e2.forEach((e3, t3) => {
              this._addColumn(e3);
            }), this._reIndexColumns(), this.dispatch("columns-loaded"), this.subscribedExternal("columnsLoaded") && this.dispatchExternal("columnsLoaded", this.getComponents()), this.rerenderColumns(false, true), this.redraw(true);
          }
          _addColumn(e2, t2, i2) {
            var s2 = new r(e2, this), o2 = s2.getElement(), n2 = i2 ? this.findColumnIndex(i2) : i2;
            if (!t2 || !this.rowHeader || i2 && i2 !== this.rowHeader || (t2 = false, i2 = this.rowHeader, n2 = 0), i2 && n2 > -1) {
              var a2 = i2.getTopColumn(), l2 = this.columns.indexOf(a2), h2 = a2.getElement();
              t2 ? (this.columns.splice(l2, 0, s2), h2.parentNode.insertBefore(o2, h2)) : (this.columns.splice(l2 + 1, 0, s2), h2.parentNode.insertBefore(o2, h2.nextSibling));
            } else
              t2 ? (this.columns.unshift(s2), this.headersElement.insertBefore(s2.getElement(), this.headersElement.firstChild)) : (this.columns.push(s2), this.headersElement.appendChild(s2.getElement()));
            return s2.columnRendered(), s2;
          }
          registerColumnField(e2) {
            e2.definition.field && (this.columnsByField[e2.definition.field] = e2);
          }
          registerColumnPosition(e2) {
            this.columnsByIndex.push(e2);
          }
          _reIndexColumns() {
            this.columnsByIndex = [], this.columns.forEach(function(e2) {
              e2.reRegisterPosition();
            });
          }
          verticalAlignHeaders() {
            var e2 = 0;
            this.redrawBlock || (this.headersElement.style.height = "", this.columns.forEach((e3) => {
              e3.clearVerticalAlign();
            }), this.columns.forEach((t2) => {
              var i2 = t2.getHeight();
              i2 > e2 && (e2 = i2);
            }), this.headersElement.style.height = e2 + "px", this.columns.forEach((t2) => {
              t2.verticalAlign(this.table.options.columnHeaderVertAlign, e2);
            }), this.table.rowManager.adjustTableSize());
          }
          findColumn(e2) {
            var t2;
            if ("object" != typeof e2)
              return this.columnsByField[e2] || false;
            if (e2 instanceof r)
              return e2;
            if (e2 instanceof i)
              return e2._getSelf() || false;
            if ("undefined" != typeof HTMLElement && e2 instanceof HTMLElement) {
              return t2 = [], this.columns.forEach((e3) => {
                t2.push(e3), t2 = t2.concat(e3.getColumns(true));
              }), t2.find((t3) => t3.element === e2) || false;
            }
            return false;
          }
          getColumnByField(e2) {
            return this.columnsByField[e2];
          }
          getColumnsByFieldRoot(e2) {
            var t2 = [];
            return Object.keys(this.columnsByField).forEach((i2) => {
              (this.table.options.nestedFieldSeparator ? i2.split(this.table.options.nestedFieldSeparator)[0] : i2) === e2 && t2.push(this.columnsByField[i2]);
            }), t2;
          }
          getColumnByIndex(e2) {
            return this.columnsByIndex[e2];
          }
          getFirstVisibleColumn() {
            var e2 = this.columnsByIndex.findIndex((e3) => e3.visible);
            return e2 > -1 && this.columnsByIndex[e2];
          }
          getVisibleColumnsByIndex() {
            return this.columnsByIndex.filter((e2) => e2.visible);
          }
          getColumns() {
            return this.columns;
          }
          findColumnIndex(e2) {
            return this.columnsByIndex.findIndex((t2) => e2 === t2);
          }
          getRealColumns() {
            return this.columnsByIndex;
          }
          traverse(e2) {
            this.columnsByIndex.forEach((t2, i2) => {
              e2(t2, i2);
            });
          }
          getDefinitions(e2) {
            var t2 = [];
            return this.columnsByIndex.forEach((i2) => {
              (!e2 || e2 && i2.visible) && t2.push(i2.getDefinition());
            }), t2;
          }
          getDefinitionTree() {
            var e2 = [];
            return this.columns.forEach((t2) => {
              e2.push(t2.getDefinition(true));
            }), e2;
          }
          getComponents(e2) {
            var t2 = [];
            return (e2 ? this.columns : this.columnsByIndex).forEach((e3) => {
              t2.push(e3.getComponent());
            }), t2;
          }
          getWidth() {
            var e2 = 0;
            return this.columnsByIndex.forEach((t2) => {
              t2.visible && (e2 += t2.getWidth());
            }), e2;
          }
          moveColumn(e2, t2, i2) {
            t2.element.parentNode.insertBefore(e2.element, t2.element), i2 && t2.element.parentNode.insertBefore(t2.element, e2.element), this.moveColumnActual(e2, t2, i2), this.verticalAlignHeaders(), this.table.rowManager.reinitialize();
          }
          moveColumnActual(e2, t2, i2) {
            e2.parent.isGroup ? this._moveColumnInArray(e2.parent.columns, e2, t2, i2) : this._moveColumnInArray(this.columns, e2, t2, i2), this._moveColumnInArray(this.columnsByIndex, e2, t2, i2, true), this.rerenderColumns(true), this.dispatch("column-moved", e2, t2, i2), this.subscribedExternal("columnMoved") && this.dispatchExternal("columnMoved", e2.getComponent(), this.table.columnManager.getComponents());
          }
          _moveColumnInArray(e2, t2, i2, s2, o2) {
            var n2, r2 = e2.indexOf(t2);
            r2 > -1 && (e2.splice(r2, 1), (n2 = e2.indexOf(i2)) > -1 ? s2 && (n2 += 1) : n2 = r2, e2.splice(n2, 0, t2), o2 && (this.chain("column-moving-rows", [t2, i2, s2], null, []) || []).concat(this.table.rowManager.rows).forEach(function(e3) {
              if (e3.cells.length) {
                var t3 = e3.cells.splice(r2, 1)[0];
                e3.cells.splice(n2, 0, t3);
              }
            }));
          }
          scrollToColumn(e2, t2, i2) {
            var s2 = 0, o2 = e2.getLeftOffset(), n2 = 0, r2 = e2.getElement();
            return new Promise((a2, l2) => {
              if (void 0 === t2 && (t2 = this.table.options.scrollToColumnPosition), void 0 === i2 && (i2 = this.table.options.scrollToColumnIfVisible), e2.visible) {
                switch (t2) {
                  case "middle":
                  case "center":
                    n2 = -this.element.clientWidth / 2;
                    break;
                  case "right":
                    n2 = r2.clientWidth - this.headersElement.clientWidth;
                }
                if (!i2 && o2 > 0 && o2 + r2.offsetWidth < this.element.clientWidth)
                  return false;
                s2 = o2 + n2, s2 = Math.max(Math.min(s2, this.table.rowManager.element.scrollWidth - this.table.rowManager.element.clientWidth), 0), this.table.rowManager.scrollHorizontal(s2), this.scrollHorizontal(s2), a2();
              } else
                console.warn("Scroll Error - Column not visible"), l2("Scroll Error - Column not visible");
            });
          }
          generateCells(e2) {
            var t2 = [];
            return this.columnsByIndex.forEach((i2) => {
              t2.push(i2.generateCell(e2));
            }), t2;
          }
          getFlexBaseWidth() {
            var e2 = this.table.element.clientWidth, t2 = 0;
            return this.table.rowManager.element.scrollHeight > this.table.rowManager.element.clientHeight && (e2 -= this.table.rowManager.element.offsetWidth - this.table.rowManager.element.clientWidth), this.columnsByIndex.forEach(function(i2) {
              var s2, o2, n2;
              i2.visible && (s2 = i2.definition.width || 0, o2 = parseInt(i2.minWidth), n2 = "string" == typeof s2 ? s2.indexOf("%") > -1 ? e2 / 100 * parseInt(s2) : parseInt(s2) : s2, t2 += n2 > o2 ? n2 : o2);
            }), t2;
          }
          addColumn(e2, t2, i2) {
            return new Promise((s2, o2) => {
              var n2 = this._addColumn(e2, t2, i2);
              this._reIndexColumns(), this.dispatch("column-add", e2, t2, i2), "fitColumns" != this.layoutMode() && n2.reinitializeWidth(), this.redraw(true), this.table.rowManager.reinitialize(), this.rerenderColumns(), s2(n2);
            });
          }
          deregisterColumn(e2) {
            var t2, i2 = e2.getField();
            i2 && delete this.columnsByField[i2], (t2 = this.columnsByIndex.indexOf(e2)) > -1 && this.columnsByIndex.splice(t2, 1), (t2 = this.columns.indexOf(e2)) > -1 && this.columns.splice(t2, 1), this.verticalAlignHeaders(), this.redraw();
          }
          rerenderColumns(e2, t2) {
            this.redrawBlock ? (false === e2 || true === e2 && null === this.redrawBlockUpdate) && (this.redrawBlockUpdate = e2) : this.renderer.rerenderColumns(e2, t2);
          }
          blockRedraw() {
            this.redrawBlock = true, this.redrawBlockUpdate = null;
          }
          restoreRedraw() {
            this.redrawBlock = false, this.verticalAlignHeaders(), this.renderer.rerenderColumns(this.redrawBlockUpdate);
          }
          redraw(e2) {
            a.elVisible(this.element) && this.verticalAlignHeaders(), e2 && (this.table.rowManager.resetScroll(), this.table.rowManager.reinitialize()), this.confirm("table-redrawing", e2) || this.layoutRefresh(e2), this.dispatch("table-redraw", e2), this.table.footerManager.redraw();
          }
        }
        class m {
          constructor(e2) {
            return this._row = e2, new Proxy(this, { get: function(e3, t2, i2) {
              return void 0 !== e3[t2] ? e3[t2] : e3._row.table.componentFunctionBinder.handle("row", e3._row, t2);
            } });
          }
          getData(e2) {
            return this._row.getData(e2);
          }
          getElement() {
            return this._row.getElement();
          }
          getCells() {
            var e2 = [];
            return this._row.getCells().forEach(function(t2) {
              e2.push(t2.getComponent());
            }), e2;
          }
          getCell(e2) {
            var t2 = this._row.getCell(e2);
            return !!t2 && t2.getComponent();
          }
          getIndex() {
            return this._row.getData("data")[this._row.table.options.index];
          }
          getPosition() {
            return this._row.getPosition();
          }
          watchPosition(e2) {
            return this._row.watchPosition(e2);
          }
          delete() {
            return this._row.delete();
          }
          scrollTo(e2, t2) {
            return this._row.table.rowManager.scrollToRow(this._row, e2, t2);
          }
          move(e2, t2) {
            this._row.moveToRow(e2, t2);
          }
          update(e2) {
            return this._row.updateData(e2);
          }
          normalizeHeight() {
            this._row.normalizeHeight(true);
          }
          _getSelf() {
            return this._row;
          }
          reformat() {
            return this._row.reinitialize();
          }
          getTable() {
            return this._row.table;
          }
          getNextRow() {
            var e2 = this._row.nextRow();
            return e2 ? e2.getComponent() : e2;
          }
          getPrevRow() {
            var e2 = this._row.prevRow();
            return e2 ? e2.getComponent() : e2;
          }
        }
        class p extends t {
          constructor(e2, t2, i2 = "row") {
            super(t2.table), this.parent = t2, this.data = {}, this.type = i2, this.element = false, this.modules = {}, this.cells = [], this.height = 0, this.heightStyled = "", this.manualHeight = false, this.outerHeight = 0, this.initialized = false, this.heightInitialized = false, this.position = 0, this.positionWatchers = [], this.component = null, this.created = false, this.setData(e2);
          }
          create() {
            this.created || (this.created = true, this.generateElement());
          }
          createElement() {
            var e2 = document.createElement("div");
            e2.classList.add("tabulator-row"), e2.setAttribute("role", "row"), this.element = e2;
          }
          getElement() {
            return this.create(), this.element;
          }
          detachElement() {
            this.element && this.element.parentNode && this.element.parentNode.removeChild(this.element);
          }
          generateElement() {
            this.createElement(), this.dispatch("row-init", this);
          }
          generateCells() {
            this.cells = this.table.columnManager.generateCells(this);
          }
          initialize(e2, t2) {
            if (this.create(), !this.initialized || e2) {
              for (this.deleteCells(); this.element.firstChild; )
                this.element.removeChild(this.element.firstChild);
              this.dispatch("row-layout-before", this), this.generateCells(), this.initialized = true, this.table.columnManager.renderer.renderRowCells(this, t2), e2 && this.normalizeHeight(), this.dispatch("row-layout", this), this.table.options.rowFormatter && this.table.options.rowFormatter(this.getComponent()), this.dispatch("row-layout-after", this);
            } else
              this.table.columnManager.renderer.rerenderRowCells(this, t2);
          }
          rendered() {
            this.cells.forEach((e2) => {
              e2.cellRendered();
            });
          }
          reinitializeHeight() {
            this.heightInitialized = false, this.element && null !== this.element.offsetParent && this.normalizeHeight(true);
          }
          deinitialize() {
            this.initialized = false;
          }
          deinitializeHeight() {
            this.heightInitialized = false;
          }
          reinitialize(e2) {
            this.initialized = false, this.heightInitialized = false, this.manualHeight || (this.height = 0, this.heightStyled = ""), this.element && null !== this.element.offsetParent && this.initialize(true), this.dispatch("row-relayout", this);
          }
          calcHeight(e2) {
            var t2 = 0, i2 = 0;
            this.table.options.rowHeight ? this.height = this.table.options.rowHeight : (i2 = this.calcMinHeight(), t2 = this.calcMaxHeight(), this.height = e2 ? Math.max(t2, i2) : this.manualHeight ? this.height : Math.max(t2, i2)), this.heightStyled = this.height ? this.height + "px" : "", this.outerHeight = this.element.offsetHeight;
          }
          calcMinHeight() {
            return this.table.options.resizableRows ? this.element.clientHeight : 0;
          }
          calcMaxHeight() {
            var e2 = 0;
            return this.cells.forEach(function(t2) {
              var i2 = t2.getHeight();
              i2 > e2 && (e2 = i2);
            }), e2;
          }
          setCellHeight() {
            this.cells.forEach(function(e2) {
              e2.setHeight();
            }), this.heightInitialized = true;
          }
          clearCellHeight() {
            this.cells.forEach(function(e2) {
              e2.clearHeight();
            });
          }
          normalizeHeight(e2) {
            e2 && !this.table.options.rowHeight && this.clearCellHeight(), this.calcHeight(e2), this.setCellHeight();
          }
          setHeight(e2, t2) {
            (this.height != e2 || t2) && (this.manualHeight = true, this.height = e2, this.heightStyled = e2 ? e2 + "px" : "", this.setCellHeight(), this.outerHeight = this.element.offsetHeight, this.subscribedExternal("rowHeight") && this.dispatchExternal("rowHeight", this.getComponent()));
          }
          getHeight() {
            return this.outerHeight;
          }
          getWidth() {
            return this.element.offsetWidth;
          }
          deleteCell(e2) {
            var t2 = this.cells.indexOf(e2);
            t2 > -1 && this.cells.splice(t2, 1);
          }
          setData(e2) {
            this.data = this.chain("row-data-init-before", [this, e2], void 0, e2), this.dispatch("row-data-init-after", this);
          }
          updateData(e2) {
            var t2, i2 = this.element && a.elVisible(this.element), s2 = {};
            return new Promise((o2, n2) => {
              "string" == typeof e2 && (e2 = JSON.parse(e2)), this.dispatch("row-data-save-before", this), this.subscribed("row-data-changing") && (s2 = Object.assign(s2, this.data), s2 = Object.assign(s2, e2)), t2 = this.chain("row-data-changing", [this, s2, e2], null, e2);
              for (let e3 in t2)
                this.data[e3] = t2[e3];
              this.dispatch("row-data-save-after", this);
              for (let s3 in e2) {
                this.table.columnManager.getColumnsByFieldRoot(s3).forEach((e3) => {
                  let s4 = this.getCell(e3.getField());
                  if (s4) {
                    let o3 = e3.getFieldValue(t2);
                    s4.getValue() !== o3 && (s4.setValueProcessData(o3), i2 && s4.cellRendered());
                  }
                });
              }
              i2 ? (this.normalizeHeight(true), this.table.options.rowFormatter && this.table.options.rowFormatter(this.getComponent())) : (this.initialized = false, this.height = 0, this.heightStyled = ""), this.dispatch("row-data-changed", this, i2, e2), this.dispatchExternal("rowUpdated", this.getComponent()), this.subscribedExternal("dataChanged") && this.dispatchExternal("dataChanged", this.table.rowManager.getData()), o2();
            });
          }
          getData(e2) {
            return e2 ? this.chain("row-data-retrieve", [this, e2], null, this.data) : this.data;
          }
          getCell(e2) {
            return e2 = this.table.columnManager.findColumn(e2), this.initialized || 0 !== this.cells.length || this.generateCells(), this.cells.find(function(t2) {
              return t2.column === e2;
            });
          }
          getCellIndex(e2) {
            return this.cells.findIndex(function(t2) {
              return t2 === e2;
            });
          }
          findCell(e2) {
            return this.cells.find((t2) => t2.element === e2);
          }
          getCells() {
            return this.initialized || 0 !== this.cells.length || this.generateCells(), this.cells;
          }
          nextRow() {
            return this.table.rowManager.nextDisplayRow(this, true) || false;
          }
          prevRow() {
            return this.table.rowManager.prevDisplayRow(this, true) || false;
          }
          moveToRow(e2, t2) {
            var i2 = this.table.rowManager.findRow(e2);
            i2 ? (this.table.rowManager.moveRowActual(this, i2, !t2), this.table.rowManager.refreshActiveData("display", false, true)) : console.warn("Move Error - No matching row found:", e2);
          }
          delete() {
            return this.dispatch("row-delete", this), this.deleteActual(), Promise.resolve();
          }
          deleteActual(e2) {
            this.detachModules(), this.table.rowManager.deleteRow(this, e2), this.deleteCells(), this.initialized = false, this.heightInitialized = false, this.element = false, this.dispatch("row-deleted", this);
          }
          detachModules() {
            this.dispatch("row-deleting", this);
          }
          deleteCells() {
            var e2 = this.cells.length;
            for (let t2 = 0; t2 < e2; t2++)
              this.cells[0].delete();
          }
          wipe() {
            if (this.detachModules(), this.deleteCells(), this.element) {
              for (; this.element.firstChild; )
                this.element.removeChild(this.element.firstChild);
              this.element.parentNode && this.element.parentNode.removeChild(this.element);
            }
            this.element = false, this.modules = {};
          }
          isDisplayed() {
            return this.table.rowManager.getDisplayRows().includes(this);
          }
          getPosition() {
            return !!this.isDisplayed() && this.position;
          }
          setPosition(e2) {
            e2 != this.position && (this.position = e2, this.positionWatchers.forEach((e3) => {
              e3(this.position);
            }));
          }
          watchPosition(e2) {
            this.positionWatchers.push(e2), e2(this.position);
          }
          getGroup() {
            return this.modules.group || false;
          }
          getComponent() {
            return this.component || (this.component = new m(this)), this.component;
          }
        }
        class g extends h {
          constructor(e2) {
            super(e2), this.verticalFillMode = "fill", this.scrollTop = 0, this.scrollLeft = 0, this.scrollTop = 0, this.scrollLeft = 0;
          }
          clearRows() {
            for (var e2 = this.tableElement; e2.firstChild; )
              e2.removeChild(e2.firstChild);
            e2.scrollTop = 0, e2.scrollLeft = 0, e2.style.minWidth = "", e2.style.minHeight = "", e2.style.display = "", e2.style.visibility = "";
          }
          renderRows() {
            var e2 = this.tableElement, t2 = true, i2 = document.createDocumentFragment(), s2 = this.rows();
            s2.forEach((e3, s3) => {
              this.styleRow(e3, s3), e3.initialize(false, true), "group" !== e3.type && (t2 = false), i2.appendChild(e3.getElement());
            }), e2.appendChild(i2), s2.forEach((e3) => {
              e3.rendered(), e3.heightInitialized || e3.calcHeight(true);
            }), s2.forEach((e3) => {
              e3.heightInitialized || e3.setCellHeight();
            }), e2.style.minWidth = t2 ? this.table.columnManager.getWidth() + "px" : "";
          }
          rerenderRows(e2) {
            this.clearRows(), e2 && e2(), this.renderRows(), this.rows().length || this.table.rowManager.tableEmpty();
          }
          scrollToRowNearestTop(e2) {
            var t2 = a.elOffset(e2.getElement()).top;
            return !(Math.abs(this.elementVertical.scrollTop - t2) > Math.abs(this.elementVertical.scrollTop + this.elementVertical.clientHeight - t2));
          }
          scrollToRow(e2) {
            var t2 = e2.getElement();
            this.elementVertical.scrollTop = a.elOffset(t2).top - a.elOffset(this.elementVertical).top + this.elementVertical.scrollTop;
          }
          visibleRows(e2) {
            return this.rows();
          }
        }
        class b extends h {
          constructor(e2) {
            super(e2), this.verticalFillMode = "fill", this.scrollTop = 0, this.scrollLeft = 0, this.vDomRowHeight = 20, this.vDomTop = 0, this.vDomBottom = 0, this.vDomScrollPosTop = 0, this.vDomScrollPosBottom = 0, this.vDomTopPad = 0, this.vDomBottomPad = 0, this.vDomMaxRenderChain = 90, this.vDomWindowBuffer = 0, this.vDomWindowMinTotalRows = 20, this.vDomWindowMinMarginRows = 5, this.vDomTopNewRows = [], this.vDomBottomNewRows = [];
          }
          clearRows() {
            for (var e2 = this.tableElement; e2.firstChild; )
              e2.removeChild(e2.firstChild);
            e2.style.paddingTop = "", e2.style.paddingBottom = "", e2.style.minHeight = "", e2.style.display = "", e2.style.visibility = "", this.elementVertical.scrollTop = 0, this.elementVertical.scrollLeft = 0, this.scrollTop = 0, this.scrollLeft = 0, this.vDomTop = 0, this.vDomBottom = 0, this.vDomTopPad = 0, this.vDomBottomPad = 0, this.vDomScrollPosTop = 0, this.vDomScrollPosBottom = 0;
          }
          renderRows() {
            this._virtualRenderFill();
          }
          rerenderRows(e2) {
            for (var t2 = this.elementVertical.scrollTop, i2 = false, s2 = false, o2 = this.table.rowManager.scrollLeft, n2 = this.rows(), r2 = this.vDomTop; r2 <= this.vDomBottom; r2++)
              if (n2[r2]) {
                var a2 = t2 - n2[r2].getElement().offsetTop;
                if (!(false === s2 || Math.abs(a2) < s2))
                  break;
                s2 = a2, i2 = r2;
              }
            n2.forEach((e3) => {
              e3.deinitializeHeight();
            }), e2 && e2(), this.rows().length ? this._virtualRenderFill(false === i2 ? this.rows.length - 1 : i2, true, s2 || 0) : (this.clear(), this.table.rowManager.tableEmpty()), this.scrollColumns(o2);
          }
          scrollColumns(e2) {
            this.table.rowManager.scrollHorizontal(e2);
          }
          scrollRows(e2, t2) {
            var i2 = e2 - this.vDomScrollPosTop, s2 = e2 - this.vDomScrollPosBottom, o2 = 2 * this.vDomWindowBuffer, n2 = this.rows();
            if (this.scrollTop = e2, -i2 > o2 || s2 > o2) {
              var r2 = this.table.rowManager.scrollLeft;
              this._virtualRenderFill(Math.floor(this.elementVertical.scrollTop / this.elementVertical.scrollHeight * n2.length)), this.scrollColumns(r2);
            } else
              t2 ? (i2 < 0 && this._addTopRow(n2, -i2), s2 < 0 && (this.vDomScrollHeight - this.scrollTop > this.vDomWindowBuffer ? this._removeBottomRow(n2, -s2) : this.vDomScrollPosBottom = this.scrollTop)) : (s2 >= 0 && this._addBottomRow(n2, s2), i2 >= 0 && (this.scrollTop > this.vDomWindowBuffer ? this._removeTopRow(n2, i2) : this.vDomScrollPosTop = this.scrollTop));
          }
          resize() {
            this.vDomWindowBuffer = this.table.options.renderVerticalBuffer || this.elementVertical.clientHeight;
          }
          scrollToRowNearestTop(e2) {
            var t2 = this.rows().indexOf(e2);
            return !(Math.abs(this.vDomTop - t2) > Math.abs(this.vDomBottom - t2));
          }
          scrollToRow(e2) {
            var t2 = this.rows().indexOf(e2);
            t2 > -1 && this._virtualRenderFill(t2, true);
          }
          visibleRows(e2) {
            var t2 = this.elementVertical.scrollTop, i2 = this.elementVertical.clientHeight + t2, s2 = false, o2 = 0, n2 = 0, r2 = this.rows();
            if (e2)
              o2 = this.vDomTop, n2 = this.vDomBottom;
            else
              for (var a2 = this.vDomTop; a2 <= this.vDomBottom; a2++)
                if (r2[a2])
                  if (s2) {
                    if (!(i2 - r2[a2].getElement().offsetTop >= 0))
                      break;
                    n2 = a2;
                  } else if (t2 - r2[a2].getElement().offsetTop >= 0)
                    o2 = a2;
                  else {
                    if (s2 = true, !(i2 - r2[a2].getElement().offsetTop >= 0))
                      break;
                    n2 = a2;
                  }
            return r2.slice(o2, n2 + 1);
          }
          _virtualRenderFill(e2, t2, i2) {
            var s2, o2, n2 = this.tableElement, r2 = this.elementVertical, l2 = 0, h2 = 0, d2 = 0, c2 = 0, u2 = 0, m2 = 0, p2 = this.rows(), g2 = p2.length, b2 = 0, f2 = [], v2 = 0, w2 = 0, C2 = this.table.rowManager.fixedHeight, E2 = this.elementVertical.clientHeight, y2 = this.table.options.rowHeight, R2 = true;
            if (i2 = i2 || 0, e2 = e2 || 0) {
              for (; n2.firstChild; )
                n2.removeChild(n2.firstChild);
              (c2 = (g2 - e2 + 1) * this.vDomRowHeight) < E2 && (e2 -= Math.ceil((E2 - c2) / this.vDomRowHeight)) < 0 && (e2 = 0), e2 -= l2 = Math.min(Math.max(Math.floor(this.vDomWindowBuffer / this.vDomRowHeight), this.vDomWindowMinMarginRows), e2);
            } else
              this.clear();
            if (g2 && a.elVisible(this.elementVertical)) {
              for (this.vDomTop = e2, this.vDomBottom = e2 - 1, C2 || this.table.options.maxHeight ? (y2 && (w2 = E2 / y2 + this.vDomWindowBuffer / y2), w2 = Math.max(this.vDomWindowMinTotalRows, Math.ceil(w2))) : w2 = g2; (w2 == g2 || h2 <= E2 + this.vDomWindowBuffer || v2 < this.vDomWindowMinTotalRows) && this.vDomBottom < g2 - 1; ) {
                for (f2 = [], o2 = document.createDocumentFragment(), m2 = 0; m2 < w2 && this.vDomBottom < g2 - 1; )
                  s2 = p2[b2 = this.vDomBottom + 1], this.styleRow(s2, b2), s2.initialize(false, true), s2.heightInitialized || this.table.options.rowHeight || s2.clearCellHeight(), o2.appendChild(s2.getElement()), f2.push(s2), this.vDomBottom++, m2++;
                if (!f2.length)
                  break;
                n2.appendChild(o2), f2.forEach((e3) => {
                  e3.rendered(), e3.heightInitialized || e3.calcHeight(true);
                }), f2.forEach((e3) => {
                  e3.heightInitialized || e3.setCellHeight();
                }), f2.forEach((e3) => {
                  d2 = e3.getHeight(), v2 < l2 ? u2 += d2 : h2 += d2, d2 > this.vDomWindowBuffer && (this.vDomWindowBuffer = 2 * d2), v2++;
                }), R2 = this.table.rowManager.adjustTableSize(), E2 = this.elementVertical.clientHeight, R2 && (C2 || this.table.options.maxHeight) && (y2 = h2 / v2, w2 = Math.max(this.vDomWindowMinTotalRows, Math.ceil(E2 / y2 + this.vDomWindowBuffer / y2)));
              }
              e2 ? (this.vDomTopPad = t2 ? this.vDomRowHeight * this.vDomTop + i2 : this.scrollTop - u2, this.vDomBottomPad = this.vDomBottom == g2 - 1 ? 0 : Math.max(this.vDomScrollHeight - this.vDomTopPad - h2 - u2, 0)) : (this.vDomTopPad = 0, this.vDomRowHeight = Math.floor((h2 + u2) / v2), this.vDomBottomPad = this.vDomRowHeight * (g2 - this.vDomBottom - 1), this.vDomScrollHeight = u2 + h2 + this.vDomBottomPad - E2), n2.style.paddingTop = this.vDomTopPad + "px", n2.style.paddingBottom = this.vDomBottomPad + "px", t2 && (this.scrollTop = this.vDomTopPad + u2 + i2 - (this.elementVertical.scrollWidth > this.elementVertical.clientWidth ? this.elementVertical.offsetHeight - E2 : 0)), this.scrollTop = Math.min(this.scrollTop, this.elementVertical.scrollHeight - E2), this.elementVertical.scrollWidth > this.elementVertical.clientWidth && t2 && (this.scrollTop += this.elementVertical.offsetHeight - E2), this.vDomScrollPosTop = this.scrollTop, this.vDomScrollPosBottom = this.scrollTop, r2.scrollTop = this.scrollTop, this.dispatch("render-virtual-fill");
            }
          }
          _addTopRow(e2, t2) {
            for (var i2 = this.tableElement, s2 = [], o2 = 0, n2 = this.vDomTop - 1, r2 = 0, a2 = true; a2; )
              if (this.vDomTop) {
                let l2, h2, d2 = e2[n2];
                d2 && r2 < this.vDomMaxRenderChain ? (l2 = d2.getHeight() || this.vDomRowHeight, h2 = d2.initialized, t2 >= l2 ? (this.styleRow(d2, n2), i2.insertBefore(d2.getElement(), i2.firstChild), d2.initialized && d2.heightInitialized || s2.push(d2), d2.initialize(), h2 || (l2 = d2.getElement().offsetHeight, l2 > this.vDomWindowBuffer && (this.vDomWindowBuffer = 2 * l2)), t2 -= l2, o2 += l2, this.vDomTop--, n2--, r2++) : a2 = false) : a2 = false;
              } else
                a2 = false;
            for (let e3 of s2)
              e3.clearCellHeight();
            this._quickNormalizeRowHeight(s2), o2 && (this.vDomTopPad -= o2, this.vDomTopPad < 0 && (this.vDomTopPad = n2 * this.vDomRowHeight), n2 < 1 && (this.vDomTopPad = 0), i2.style.paddingTop = this.vDomTopPad + "px", this.vDomScrollPosTop -= o2);
          }
          _removeTopRow(e2, t2) {
            for (var i2 = [], s2 = 0, o2 = 0, n2 = true; n2; ) {
              let r2, a2 = e2[this.vDomTop];
              a2 && o2 < this.vDomMaxRenderChain ? (r2 = a2.getHeight() || this.vDomRowHeight, t2 >= r2 ? (this.vDomTop++, t2 -= r2, s2 += r2, i2.push(a2), o2++) : n2 = false) : n2 = false;
            }
            for (let e3 of i2) {
              let t3 = e3.getElement();
              t3.parentNode && t3.parentNode.removeChild(t3);
            }
            s2 && (this.vDomTopPad += s2, this.tableElement.style.paddingTop = this.vDomTopPad + "px", this.vDomScrollPosTop += this.vDomTop ? s2 : s2 + this.vDomWindowBuffer);
          }
          _addBottomRow(e2, t2) {
            for (var i2 = this.tableElement, s2 = [], o2 = 0, n2 = this.vDomBottom + 1, r2 = 0, a2 = true; a2; ) {
              let l2, h2, d2 = e2[n2];
              d2 && r2 < this.vDomMaxRenderChain ? (l2 = d2.getHeight() || this.vDomRowHeight, h2 = d2.initialized, t2 >= l2 ? (this.styleRow(d2, n2), i2.appendChild(d2.getElement()), d2.initialized && d2.heightInitialized || s2.push(d2), d2.initialize(), h2 || (l2 = d2.getElement().offsetHeight, l2 > this.vDomWindowBuffer && (this.vDomWindowBuffer = 2 * l2)), t2 -= l2, o2 += l2, this.vDomBottom++, n2++, r2++) : a2 = false) : a2 = false;
            }
            for (let e3 of s2)
              e3.clearCellHeight();
            this._quickNormalizeRowHeight(s2), o2 && (this.vDomBottomPad -= o2, (this.vDomBottomPad < 0 || n2 == e2.length - 1) && (this.vDomBottomPad = 0), i2.style.paddingBottom = this.vDomBottomPad + "px", this.vDomScrollPosBottom += o2);
          }
          _removeBottomRow(e2, t2) {
            for (var i2 = [], s2 = 0, o2 = 0, n2 = true; n2; ) {
              let r2, a2 = e2[this.vDomBottom];
              a2 && o2 < this.vDomMaxRenderChain ? (r2 = a2.getHeight() || this.vDomRowHeight, t2 >= r2 ? (this.vDomBottom--, t2 -= r2, s2 += r2, i2.push(a2), o2++) : n2 = false) : n2 = false;
            }
            for (let e3 of i2) {
              let t3 = e3.getElement();
              t3.parentNode && t3.parentNode.removeChild(t3);
            }
            s2 && (this.vDomBottomPad += s2, this.vDomBottomPad < 0 && (this.vDomBottomPad = 0), this.tableElement.style.paddingBottom = this.vDomBottomPad + "px", this.vDomScrollPosBottom -= s2);
          }
          _quickNormalizeRowHeight(e2) {
            for (let t2 of e2)
              t2.calcHeight();
            for (let t2 of e2)
              t2.setCellHeight();
          }
        }
        class f extends t {
          constructor(e2) {
            super(e2), this.element = this.createHolderElement(), this.tableElement = this.createTableElement(), this.heightFixer = this.createTableElement(), this.placeholder = null, this.placeholderContents = null, this.firstRender = false, this.renderMode = "virtual", this.fixedHeight = false, this.rows = [], this.activeRowsPipeline = [], this.activeRows = [], this.activeRowsCount = 0, this.displayRows = [], this.displayRowsCount = 0, this.scrollTop = 0, this.scrollLeft = 0, this.redrawBlock = false, this.redrawBlockRestoreConfig = false, this.redrawBlockRenderInPosition = false, this.dataPipeline = [], this.displayPipeline = [], this.scrollbarWidth = 0, this.renderer = null;
          }
          createHolderElement() {
            var e2 = document.createElement("div");
            return e2.classList.add("tabulator-tableholder"), e2.setAttribute("tabindex", 0), e2;
          }
          createTableElement() {
            var e2 = document.createElement("div");
            return e2.classList.add("tabulator-table"), e2.setAttribute("role", "rowgroup"), e2;
          }
          initializePlaceholder() {
            var e2 = this.table.options.placeholder;
            if ("function" == typeof e2 && (e2 = e2.call(this.table)), e2 = this.chain("placeholder", [e2], e2, e2) || e2) {
              let t2 = document.createElement("div");
              if (t2.classList.add("tabulator-placeholder"), "string" == typeof e2) {
                let i2 = document.createElement("div");
                i2.classList.add("tabulator-placeholder-contents"), i2.innerHTML = e2, t2.appendChild(i2), this.placeholderContents = i2;
              } else
                "undefined" != typeof HTMLElement && e2 instanceof HTMLElement ? (t2.appendChild(e2), this.placeholderContents = e2) : (console.warn("Invalid placeholder provided, must be string or HTML Element", e2), this.el = null);
              this.placeholder = t2;
            }
          }
          getElement() {
            return this.element;
          }
          getTableElement() {
            return this.tableElement;
          }
          initialize() {
            this.initializePlaceholder(), this.initializeRenderer(), this.element.appendChild(this.tableElement), this.firstRender = true, this.element.addEventListener("scroll", () => {
              var e2 = this.element.scrollLeft, t2 = this.scrollLeft > e2, i2 = this.element.scrollTop, s2 = this.scrollTop > i2;
              this.scrollLeft != e2 && (this.scrollLeft = e2, this.dispatch("scroll-horizontal", e2, t2), this.dispatchExternal("scrollHorizontal", e2, t2), this._positionPlaceholder()), this.scrollTop != i2 && (this.scrollTop = i2, this.renderer.scrollRows(i2, s2), this.dispatch("scroll-vertical", i2, s2), this.dispatchExternal("scrollVertical", i2, s2));
            });
          }
          findRow(e2) {
            if ("object" != typeof e2) {
              if (void 0 === e2)
                return false;
              return this.rows.find((t2) => t2.data[this.table.options.index] == e2) || false;
            }
            if (e2 instanceof p)
              return e2;
            if (e2 instanceof m)
              return e2._getSelf() || false;
            if ("undefined" != typeof HTMLElement && e2 instanceof HTMLElement) {
              return this.rows.find((t2) => t2.getElement() === e2) || false;
            }
            return false;
          }
          getRowFromDataObject(e2) {
            return this.rows.find((t2) => t2.data === e2) || false;
          }
          getRowFromPosition(e2) {
            return this.getDisplayRows().find((t2) => "row" === t2.type && t2.getPosition() === e2 && t2.isDisplayed());
          }
          scrollToRow(e2, t2, i2) {
            return this.renderer.scrollToRowPosition(e2, t2, i2);
          }
          setData(e2, t2, i2) {
            return new Promise((s2, o2) => {
              t2 && this.getDisplayRows().length ? this.table.options.pagination ? this._setDataActual(e2, true) : this.reRenderInPosition(() => {
                this._setDataActual(e2);
              }) : (this.table.options.autoColumns && i2 && this.table.initialized && this.table.columnManager.generateColumnsFromRowData(e2), this.resetScroll(), this._setDataActual(e2)), s2();
            });
          }
          _setDataActual(e2, t2) {
            this.dispatchExternal("dataProcessing", e2), this._wipeElements(), Array.isArray(e2) ? (this.dispatch("data-processing", e2), e2.forEach((e3, t3) => {
              if (e3 && "object" == typeof e3) {
                var i2 = new p(e3, this);
                this.rows.push(i2);
              } else
                console.warn("Data Loading Warning - Invalid row data detected and ignored, expecting object but received:", e3);
            }), this.refreshActiveData(false, false, t2), this.dispatch("data-processed", e2), this.dispatchExternal("dataProcessed", e2)) : console.error("Data Loading Error - Unable to process data due to invalid data type \nExpecting: array \nReceived: ", typeof e2, "\nData:     ", e2);
          }
          _wipeElements() {
            this.dispatch("rows-wipe"), this.destroy(), this.adjustTableSize(), this.dispatch("rows-wiped");
          }
          destroy() {
            this.rows.forEach((e2) => {
              e2.wipe();
            }), this.rows = [], this.activeRows = [], this.activeRowsPipeline = [], this.activeRowsCount = 0, this.displayRows = [], this.displayRowsCount = 0;
          }
          deleteRow(e2, t2) {
            var i2 = this.rows.indexOf(e2), s2 = this.activeRows.indexOf(e2);
            s2 > -1 && this.activeRows.splice(s2, 1), i2 > -1 && this.rows.splice(i2, 1), this.setActiveRows(this.activeRows), this.displayRowIterator((t3) => {
              var i3 = t3.indexOf(e2);
              i3 > -1 && t3.splice(i3, 1);
            }), t2 || this.reRenderInPosition(), this.regenerateRowPositions(), this.dispatchExternal("rowDeleted", e2.getComponent()), this.displayRowsCount || this.tableEmpty(), this.subscribedExternal("dataChanged") && this.dispatchExternal("dataChanged", this.getData());
          }
          addRow(e2, t2, i2, s2) {
            return this.addRowActual(e2, t2, i2, s2);
          }
          addRows(e2, t2, i2, s2) {
            var o2 = [];
            return new Promise((n2, r2) => {
              t2 = this.findAddRowPos(t2), Array.isArray(e2) || (e2 = [e2]), (void 0 === i2 && t2 || void 0 !== i2 && !t2) && e2.reverse(), e2.forEach((e3, s3) => {
                var n3 = this.addRow(e3, t2, i2, true);
                o2.push(n3), this.dispatch("row-added", n3, e3, t2, i2);
              }), this.refreshActiveData(!!s2 && "displayPipeline", false, true), this.regenerateRowPositions(), this.displayRowsCount && this._clearPlaceholder(), n2(o2);
            });
          }
          findAddRowPos(e2) {
            return void 0 === e2 && (e2 = this.table.options.addRowPos), "pos" === e2 && (e2 = true), "bottom" === e2 && (e2 = false), e2;
          }
          addRowActual(e2, t2, i2, s2) {
            var o2, n2, r2 = e2 instanceof p ? e2 : new p(e2 || {}, this), a2 = this.findAddRowPos(t2), l2 = -1;
            return i2 || (n2 = this.chain("row-adding-position", [r2, a2], null, { index: i2, top: a2 }), i2 = n2.index, a2 = n2.top), void 0 !== i2 && (i2 = this.findRow(i2)), (i2 = this.chain("row-adding-index", [r2, i2, a2], null, i2)) && (l2 = this.rows.indexOf(i2)), i2 && l2 > -1 ? (o2 = this.activeRows.indexOf(i2), this.displayRowIterator(function(e3) {
              var t3 = e3.indexOf(i2);
              t3 > -1 && e3.splice(a2 ? t3 : t3 + 1, 0, r2);
            }), o2 > -1 && this.activeRows.splice(a2 ? o2 : o2 + 1, 0, r2), this.rows.splice(a2 ? l2 : l2 + 1, 0, r2)) : a2 ? (this.displayRowIterator(function(e3) {
              e3.unshift(r2);
            }), this.activeRows.unshift(r2), this.rows.unshift(r2)) : (this.displayRowIterator(function(e3) {
              e3.push(r2);
            }), this.activeRows.push(r2), this.rows.push(r2)), this.setActiveRows(this.activeRows), this.dispatchExternal("rowAdded", r2.getComponent()), this.subscribedExternal("dataChanged") && this.dispatchExternal("dataChanged", this.table.rowManager.getData()), s2 || this.reRenderInPosition(), r2;
          }
          moveRow(e2, t2, i2) {
            this.dispatch("row-move", e2, t2, i2), this.moveRowActual(e2, t2, i2), this.regenerateRowPositions(), this.dispatch("row-moved", e2, t2, i2), this.dispatchExternal("rowMoved", e2.getComponent());
          }
          moveRowActual(e2, t2, i2) {
            this.moveRowInArray(this.rows, e2, t2, i2), this.moveRowInArray(this.activeRows, e2, t2, i2), this.displayRowIterator((s2) => {
              this.moveRowInArray(s2, e2, t2, i2);
            }), this.dispatch("row-moving", e2, t2, i2);
          }
          moveRowInArray(e2, t2, i2, s2) {
            var o2, n2, r2;
            if (t2 !== i2 && ((o2 = e2.indexOf(t2)) > -1 && (e2.splice(o2, 1), (n2 = e2.indexOf(i2)) > -1 ? s2 ? e2.splice(n2 + 1, 0, t2) : e2.splice(n2, 0, t2) : e2.splice(o2, 0, t2)), e2 === this.getDisplayRows())) {
              r2 = n2 > o2 ? n2 : o2 + 1;
              for (let t3 = o2 < n2 ? o2 : n2; t3 <= r2; t3++)
                e2[t3] && this.styleRow(e2[t3], t3);
            }
          }
          clearData() {
            this.setData([]);
          }
          getRowIndex(e2) {
            return this.findRowIndex(e2, this.rows);
          }
          getDisplayRowIndex(e2) {
            var t2 = this.getDisplayRows().indexOf(e2);
            return t2 > -1 && t2;
          }
          nextDisplayRow(e2, t2) {
            var i2 = this.getDisplayRowIndex(e2), s2 = false;
            return false !== i2 && i2 < this.displayRowsCount - 1 && (s2 = this.getDisplayRows()[i2 + 1]), !s2 || s2 instanceof p && "row" == s2.type ? s2 : this.nextDisplayRow(s2, t2);
          }
          prevDisplayRow(e2, t2) {
            var i2 = this.getDisplayRowIndex(e2), s2 = false;
            return i2 && (s2 = this.getDisplayRows()[i2 - 1]), !t2 || !s2 || s2 instanceof p && "row" == s2.type ? s2 : this.prevDisplayRow(s2, t2);
          }
          findRowIndex(e2, t2) {
            var i2;
            return !!((e2 = this.findRow(e2)) && (i2 = t2.indexOf(e2)) > -1) && i2;
          }
          getData(e2, t2) {
            var i2 = [];
            return this.getRows(e2).forEach(function(e3) {
              "row" == e3.type && i2.push(e3.getData(t2 || "data"));
            }), i2;
          }
          getComponents(e2) {
            var t2 = [];
            return this.getRows(e2).forEach(function(e3) {
              t2.push(e3.getComponent());
            }), t2;
          }
          getDataCount(e2) {
            return this.getRows(e2).length;
          }
          scrollHorizontal(e2) {
            this.scrollLeft = e2, this.element.scrollLeft = e2, this.dispatch("scroll-horizontal", e2);
          }
          registerDataPipelineHandler(e2, t2) {
            void 0 !== t2 ? (this.dataPipeline.push({ handler: e2, priority: t2 }), this.dataPipeline.sort((e3, t3) => e3.priority - t3.priority)) : console.error("Data pipeline handlers must have a priority in order to be registered");
          }
          registerDisplayPipelineHandler(e2, t2) {
            void 0 !== t2 ? (this.displayPipeline.push({ handler: e2, priority: t2 }), this.displayPipeline.sort((e3, t3) => e3.priority - t3.priority)) : console.error("Display pipeline handlers must have a priority in order to be registered");
          }
          refreshActiveData(e2, t2, i2) {
            var s2 = this.table, o2 = "", n2 = 0, r2 = ["all", "dataPipeline", "display", "displayPipeline", "end"];
            if (!this.table.destroyed) {
              if ("function" == typeof e2)
                if ((n2 = this.dataPipeline.findIndex((t3) => t3.handler === e2)) > -1)
                  o2 = "dataPipeline", t2 && (n2 == this.dataPipeline.length - 1 ? o2 = "display" : n2++);
                else {
                  if (!((n2 = this.displayPipeline.findIndex((t3) => t3.handler === e2)) > -1))
                    return void console.error("Unable to refresh data, invalid handler provided", e2);
                  o2 = "displayPipeline", t2 && (n2 == this.displayPipeline.length - 1 ? o2 = "end" : n2++);
                }
              else
                o2 = e2 || "all", n2 = 0;
              if (this.redrawBlock)
                return void ((!this.redrawBlockRestoreConfig || this.redrawBlockRestoreConfig && (this.redrawBlockRestoreConfig.stage === o2 && n2 < this.redrawBlockRestoreConfig.index || r2.indexOf(o2) < r2.indexOf(this.redrawBlockRestoreConfig.stage))) && (this.redrawBlockRestoreConfig = { handler: e2, skipStage: t2, renderInPosition: i2, stage: o2, index: n2 }));
              a.elVisible(this.element) ? i2 ? this.reRenderInPosition(this.refreshPipelines.bind(this, e2, o2, n2, i2)) : (this.refreshPipelines(e2, o2, n2, i2), e2 || this.table.columnManager.renderer.renderColumns(), this.renderTable(), s2.options.layoutColumnsOnNewData && this.table.columnManager.redraw(true)) : this.refreshPipelines(e2, o2, n2, i2), this.dispatch("data-refreshed");
            }
          }
          refreshPipelines(e2, t2, i2, s2) {
            switch (this.dispatch("data-refreshing"), e2 && this.activeRowsPipeline[0] || (this.activeRowsPipeline[0] = this.rows.slice(0)), t2) {
              case "all":
              case "dataPipeline":
                for (let e3 = i2; e3 < this.dataPipeline.length; e3++) {
                  let t3 = this.dataPipeline[e3].handler(this.activeRowsPipeline[e3].slice(0));
                  this.activeRowsPipeline[e3 + 1] = t3 || this.activeRowsPipeline[e3].slice(0);
                }
                this.setActiveRows(this.activeRowsPipeline[this.dataPipeline.length]);
              case "display":
                i2 = 0, this.resetDisplayRows();
              case "displayPipeline":
                for (let e3 = i2; e3 < this.displayPipeline.length; e3++) {
                  let t3 = this.displayPipeline[e3].handler((e3 ? this.getDisplayRows(e3 - 1) : this.activeRows).slice(0), s2);
                  this.setDisplayRows(t3 || this.getDisplayRows(e3 - 1).slice(0), e3);
                }
              case "end":
                this.regenerateRowPositions();
            }
            this.getDisplayRows().length && this._clearPlaceholder();
          }
          regenerateRowPositions() {
            var e2 = this.getDisplayRows(), t2 = 1;
            e2.forEach((e3) => {
              "row" === e3.type && (e3.setPosition(t2), t2++);
            });
          }
          setActiveRows(e2) {
            this.activeRows = this.activeRows = Object.assign([], e2), this.activeRowsCount = this.activeRows.length;
          }
          resetDisplayRows() {
            this.displayRows = [], this.displayRows.push(this.activeRows.slice(0)), this.displayRowsCount = this.displayRows[0].length;
          }
          setDisplayRows(e2, t2) {
            this.displayRows[t2] = e2, t2 == this.displayRows.length - 1 && (this.displayRowsCount = this.displayRows[this.displayRows.length - 1].length);
          }
          getDisplayRows(e2) {
            return void 0 === e2 ? this.displayRows.length ? this.displayRows[this.displayRows.length - 1] : [] : this.displayRows[e2] || [];
          }
          getVisibleRows(e2, t2) {
            var i2 = Object.assign([], this.renderer.visibleRows(!t2));
            return e2 && (i2 = this.chain("rows-visible", [t2], i2, i2)), i2;
          }
          displayRowIterator(e2) {
            this.activeRowsPipeline.forEach(e2), this.displayRows.forEach(e2), this.displayRowsCount = this.displayRows[this.displayRows.length - 1].length;
          }
          getRows(e2) {
            var t2 = [];
            switch (e2) {
              case "active":
                t2 = this.activeRows;
                break;
              case "display":
                t2 = this.table.rowManager.getDisplayRows();
                break;
              case "visible":
                t2 = this.getVisibleRows(false, true);
                break;
              default:
                t2 = this.chain("rows-retrieve", e2, null, this.rows) || this.rows;
            }
            return t2;
          }
          reRenderInPosition(e2) {
            this.redrawBlock ? e2 ? e2() : this.redrawBlockRenderInPosition = true : (this.dispatchExternal("renderStarted"), this.renderer.rerenderRows(e2), this.fixedHeight || this.adjustTableSize(), this.scrollBarCheck(), this.dispatchExternal("renderComplete"));
          }
          scrollBarCheck() {
            var e2 = 0;
            this.element.scrollHeight > this.element.clientHeight && (e2 = this.element.offsetWidth - this.element.clientWidth), e2 !== this.scrollbarWidth && (this.scrollbarWidth = e2, this.dispatch("scrollbar-vertical", e2));
          }
          initializeRenderer() {
            var e2, t2 = { virtual: b, basic: g };
            (e2 = "string" == typeof this.table.options.renderVertical ? t2[this.table.options.renderVertical] : this.table.options.renderVertical) ? (this.renderMode = this.table.options.renderVertical, this.renderer = new e2(this.table, this.element, this.tableElement), this.renderer.initialize(), !this.table.element.clientHeight && !this.table.options.height || this.table.options.minHeight && this.table.options.maxHeight ? this.fixedHeight = false : this.fixedHeight = true) : console.error("Unable to find matching renderer:", this.table.options.renderVertical);
          }
          getRenderMode() {
            return this.renderMode;
          }
          renderTable() {
            this.dispatchExternal("renderStarted"), this.element.scrollTop = 0, this._clearTable(), this.displayRowsCount ? (this.renderer.renderRows(), this.firstRender && (this.firstRender = false, this.fixedHeight || this.adjustTableSize(), this.layoutRefresh(true))) : this.renderEmptyScroll(), this.fixedHeight || this.adjustTableSize(), this.dispatch("table-layout"), this.displayRowsCount || this._showPlaceholder(), this.scrollBarCheck(), this.dispatchExternal("renderComplete");
          }
          renderEmptyScroll() {
            this.placeholder ? this.tableElement.style.display = "none" : this.tableElement.style.minWidth = this.table.columnManager.getWidth() + "px";
          }
          _clearTable() {
            this._clearPlaceholder(), this.scrollTop = 0, this.scrollLeft = 0, this.renderer.clearRows();
          }
          tableEmpty() {
            this.renderEmptyScroll(), this._showPlaceholder();
          }
          checkPlaceholder() {
            this.displayRowsCount ? this._clearPlaceholder() : this.tableEmpty();
          }
          _showPlaceholder() {
            this.placeholder && (this.placeholder && this.placeholder.parentNode && this.placeholder.parentNode.removeChild(this.placeholder), this.initializePlaceholder(), this.placeholder.setAttribute("tabulator-render-mode", this.renderMode), this.getElement().appendChild(this.placeholder), this._positionPlaceholder(), this.adjustTableSize());
          }
          _clearPlaceholder() {
            this.placeholder && this.placeholder.parentNode && this.placeholder.parentNode.removeChild(this.placeholder), this.tableElement.style.minWidth = "", this.tableElement.style.display = "";
          }
          _positionPlaceholder() {
            this.placeholder && this.placeholder.parentNode && (this.placeholder.style.width = this.table.columnManager.getWidth() + "px", this.placeholderContents.style.width = this.table.rowManager.element.clientWidth + "px", this.placeholderContents.style.marginLeft = this.scrollLeft + "px");
          }
          styleRow(e2, t2) {
            var i2 = e2.getElement();
            t2 % 2 ? (i2.classList.add("tabulator-row-even"), i2.classList.remove("tabulator-row-odd")) : (i2.classList.add("tabulator-row-odd"), i2.classList.remove("tabulator-row-even"));
          }
          normalizeHeight() {
            this.activeRows.forEach(function(e2) {
              e2.normalizeHeight();
            });
          }
          adjustTableSize() {
            let e2, t2 = this.element.clientHeight, i2 = false;
            if ("fill" === this.renderer.verticalFillMode) {
              let s2 = Math.floor(this.table.columnManager.getElement().getBoundingClientRect().height + (this.table.footerManager && this.table.footerManager.active && !this.table.footerManager.external ? this.table.footerManager.getElement().getBoundingClientRect().height : 0));
              if (this.fixedHeight) {
                e2 = isNaN(this.table.options.minHeight) ? this.table.options.minHeight : this.table.options.minHeight + "px";
                const t3 = "calc(100% - " + s2 + "px)";
                this.element.style.minHeight = e2 || "calc(100% - " + s2 + "px)", this.element.style.height = t3, this.element.style.maxHeight = t3;
              } else
                this.element.style.height = "", this.element.style.height = this.table.element.clientHeight - s2 + "px", this.element.scrollTop = this.scrollTop;
              this.renderer.resize(), this.fixedHeight || t2 == this.element.clientHeight || (i2 = true, this.subscribed("table-resize") ? this.dispatch("table-resize") : this.redraw()), this.scrollBarCheck();
            }
            return this._positionPlaceholder(), i2;
          }
          reinitialize() {
            this.rows.forEach(function(e2) {
              e2.reinitialize(true);
            });
          }
          blockRedraw() {
            this.redrawBlock = true, this.redrawBlockRestoreConfig = false;
          }
          restoreRedraw() {
            this.redrawBlock = false, this.redrawBlockRestoreConfig ? (this.refreshActiveData(this.redrawBlockRestoreConfig.handler, this.redrawBlockRestoreConfig.skipStage, this.redrawBlockRestoreConfig.renderInPosition), this.redrawBlockRestoreConfig = false) : this.redrawBlockRenderInPosition && this.reRenderInPosition(), this.redrawBlockRenderInPosition = false;
          }
          redraw(e2) {
            this.adjustTableSize(), this.table.tableWidth = this.table.element.clientWidth, e2 ? this.renderTable() : (this.reRenderInPosition(), this.scrollHorizontal(this.scrollLeft));
          }
          resetScroll() {
            if (this.element.scrollLeft = 0, this.element.scrollTop = 0, "ie" === this.table.browser) {
              var e2 = document.createEvent("Event");
              e2.initEvent("scroll", false, true), this.element.dispatchEvent(e2);
            } else
              this.element.dispatchEvent(new Event("scroll"));
          }
        }
        class v extends t {
          constructor(e2) {
            super(e2), this.active = false, this.element = this.createElement(), this.containerElement = this.createContainerElement(), this.external = false;
          }
          initialize() {
            this.initializeElement();
          }
          createElement() {
            var e2 = document.createElement("div");
            return e2.classList.add("tabulator-footer"), e2;
          }
          createContainerElement() {
            var e2 = document.createElement("div");
            return e2.classList.add("tabulator-footer-contents"), this.element.appendChild(e2), e2;
          }
          initializeElement() {
            if (this.table.options.footerElement)
              if ("string" == typeof this.table.options.footerElement)
                "<" === this.table.options.footerElement[0] ? this.containerElement.innerHTML = this.table.options.footerElement : (this.external = true, this.containerElement = document.querySelector(this.table.options.footerElement));
              else
                this.element = this.table.options.footerElement;
          }
          getElement() {
            return this.element;
          }
          append(e2) {
            this.activate(), this.containerElement.appendChild(e2), this.table.rowManager.adjustTableSize();
          }
          prepend(e2) {
            this.activate(), this.element.insertBefore(e2, this.element.firstChild), this.table.rowManager.adjustTableSize();
          }
          remove(e2) {
            e2.parentNode.removeChild(e2), this.deactivate();
          }
          deactivate(e2) {
            this.element.firstChild && !e2 || (this.external || this.element.parentNode.removeChild(this.element), this.active = false);
          }
          activate() {
            this.active || (this.active = true, this.external || (this.table.element.appendChild(this.getElement()), this.table.element.style.display = ""));
          }
          redraw() {
            this.dispatch("footer-redraw");
          }
        }
        class w extends t {
          constructor(e2) {
            super(e2), this.el = null, this.abortClasses = ["tabulator-headers", "tabulator-table"], this.previousTargets = {}, this.listeners = ["click", "dblclick", "contextmenu", "mouseenter", "mouseleave", "mouseover", "mouseout", "mousemove", "mouseup", "mousedown", "touchstart", "touchend"], this.componentMap = { "tabulator-cell": "cell", "tabulator-row": "row", "tabulator-group": "group", "tabulator-col": "column" }, this.pseudoTrackers = { row: { subscriber: null, target: null }, cell: { subscriber: null, target: null }, group: { subscriber: null, target: null }, column: { subscriber: null, target: null } }, this.pseudoTracking = false;
          }
          initialize() {
            this.el = this.table.element, this.buildListenerMap(), this.bindSubscriptionWatchers();
          }
          buildListenerMap() {
            var e2 = {};
            this.listeners.forEach((t2) => {
              e2[t2] = { handler: null, components: [] };
            }), this.listeners = e2;
          }
          bindPseudoEvents() {
            Object.keys(this.pseudoTrackers).forEach((e2) => {
              this.pseudoTrackers[e2].subscriber = this.pseudoMouseEnter.bind(this, e2), this.subscribe(e2 + "-mouseover", this.pseudoTrackers[e2].subscriber);
            }), this.pseudoTracking = true;
          }
          pseudoMouseEnter(e2, t2, i2) {
            this.pseudoTrackers[e2].target !== i2 && (this.pseudoTrackers[e2].target && this.dispatch(e2 + "-mouseleave", t2, this.pseudoTrackers[e2].target), this.pseudoMouseLeave(e2, t2), this.pseudoTrackers[e2].target = i2, this.dispatch(e2 + "-mouseenter", t2, i2));
          }
          pseudoMouseLeave(e2, t2) {
            var i2 = Object.keys(this.pseudoTrackers), s2 = { row: ["cell"], cell: ["row"] };
            (i2 = i2.filter((t3) => {
              var i3 = s2[e2];
              return t3 !== e2 && (!i3 || i3 && !i3.includes(t3));
            })).forEach((e3) => {
              var i3 = this.pseudoTrackers[e3].target;
              this.pseudoTrackers[e3].target && (this.dispatch(e3 + "-mouseleave", t2, i3), this.pseudoTrackers[e3].target = null);
            });
          }
          bindSubscriptionWatchers() {
            var e2 = Object.keys(this.listeners), t2 = Object.values(this.componentMap);
            for (let i2 of t2)
              for (let t3 of e2) {
                let e3 = i2 + "-" + t3;
                this.subscriptionChange(e3, this.subscriptionChanged.bind(this, i2, t3));
              }
            this.subscribe("table-destroy", this.clearWatchers.bind(this));
          }
          subscriptionChanged(e2, t2, i2) {
            var s2 = this.listeners[t2].components, o2 = s2.indexOf(e2), n2 = false;
            i2 ? -1 === o2 && (s2.push(e2), n2 = true) : this.subscribed(e2 + "-" + t2) || o2 > -1 && (s2.splice(o2, 1), n2 = true), "mouseenter" !== t2 && "mouseleave" !== t2 || this.pseudoTracking || this.bindPseudoEvents(), n2 && this.updateEventListeners();
          }
          updateEventListeners() {
            for (let e2 in this.listeners) {
              let t2 = this.listeners[e2];
              t2.components.length ? t2.handler || (t2.handler = this.track.bind(this, e2), this.el.addEventListener(e2, t2.handler)) : t2.handler && (this.el.removeEventListener(e2, t2.handler), t2.handler = null);
            }
          }
          track(e2, t2) {
            var i2 = t2.composedPath && t2.composedPath() || t2.path, s2 = this.findTargets(i2);
            s2 = this.bindComponents(e2, s2), this.triggerEvents(e2, t2, s2), !this.pseudoTracking || "mouseover" != e2 && "mouseleave" != e2 || Object.keys(s2).length || this.pseudoMouseLeave("none", t2);
          }
          findTargets(e2) {
            var t2 = {};
            let i2 = Object.keys(this.componentMap);
            for (let s2 of e2) {
              let e3 = s2.classList ? [...s2.classList] : [];
              if (e3.filter((e4) => this.abortClasses.includes(e4)).length)
                break;
              let o2 = e3.filter((e4) => i2.includes(e4));
              for (let e4 of o2)
                t2[this.componentMap[e4]] || (t2[this.componentMap[e4]] = s2);
            }
            return t2.group && t2.group === t2.row && delete t2.row, t2;
          }
          bindComponents(e2, t2) {
            var i2 = Object.keys(t2).reverse(), s2 = this.listeners[e2], o2 = {}, n2 = {};
            for (let e3 of i2) {
              let i3, r2 = t2[e3], a2 = this.previousTargets[e3];
              if (a2 && a2.target === r2)
                i3 = a2.component;
              else
                switch (e3) {
                  case "row":
                  case "group":
                    if (s2.components.includes("row") || s2.components.includes("cell") || s2.components.includes("group")) {
                      i3 = this.table.rowManager.getVisibleRows(true).find((e4) => e4.getElement() === r2), t2.row && t2.row.parentNode && t2.row.parentNode.closest(".tabulator-row") && (t2[e3] = false);
                    }
                    break;
                  case "column":
                    s2.components.includes("column") && (i3 = this.table.columnManager.findColumn(r2));
                    break;
                  case "cell":
                    s2.components.includes("cell") && (o2.row instanceof p ? i3 = o2.row.findCell(r2) : t2.row && console.warn("Event Target Lookup Error - The row this cell is attached to cannot be found, has the table been reinitialized without being destroyed first?"));
                }
              i3 && (o2[e3] = i3, n2[e3] = { target: r2, component: i3 });
            }
            return this.previousTargets = n2, o2;
          }
          triggerEvents(e2, t2, i2) {
            var s2 = this.listeners[e2];
            for (let o2 in i2)
              i2[o2] && s2.components.includes(o2) && this.dispatch(o2 + "-" + e2, t2, i2[o2]);
          }
          clearWatchers() {
            for (let e2 in this.listeners) {
              let t2 = this.listeners[e2];
              t2.handler && (this.el.removeEventListener(e2, t2.handler), t2.handler = null);
            }
          }
        }
        class C {
          constructor(e2) {
            this.table = e2, this.bindings = {};
          }
          bind(e2, t2, i2) {
            this.bindings[e2] || (this.bindings[e2] = {}), this.bindings[e2][t2] ? console.warn("Unable to bind component handler, a matching function name is already bound", e2, t2, i2) : this.bindings[e2][t2] = i2;
          }
          handle(e2, t2, i2) {
            if (this.bindings[e2] && this.bindings[e2][i2] && "function" == typeof this.bindings[e2][i2].bind)
              return this.bindings[e2][i2].bind(null, t2);
            "then" === i2 || "string" != typeof i2 || i2.startsWith("_") || this.table.options.debugInvalidComponentFuncs && console.error("The " + e2 + " component does not have a " + i2 + " function, have you checked that you have the correct Tabulator module installed?");
          }
        }
        class E extends t {
          constructor(e2) {
            super(e2), this.requestOrder = 0, this.loading = false;
          }
          initialize() {
          }
          load(e2, t2, i2, s2, o2, n2) {
            var r2 = ++this.requestOrder;
            return this.table.destroyed ? Promise.resolve() : (this.dispatchExternal("dataLoading", e2), !e2 || 0 != e2.indexOf("{") && 0 != e2.indexOf("[") || (e2 = JSON.parse(e2)), this.confirm("data-loading", [e2, t2, i2, o2]) ? (this.loading = true, o2 || this.alertLoader(), t2 = this.chain("data-params", [e2, i2, o2], t2 || {}, t2 || {}), t2 = this.mapParams(t2, this.table.options.dataSendParams), this.chain("data-load", [e2, t2, i2, o2], false, Promise.resolve([])).then((e3) => {
              if (this.table.destroyed)
                console.warn("Data Load Response Blocked - Table has been destroyed");
              else {
                Array.isArray(e3) || "object" != typeof e3 || (e3 = this.mapParams(e3, this.objectInvert(this.table.options.dataReceiveParams)));
                var t3 = this.chain("data-loaded", [e3], null, e3);
                r2 == this.requestOrder ? (this.clearAlert(), false !== t3 && (this.dispatchExternal("dataLoaded", t3), this.table.rowManager.setData(t3, s2, void 0 === n2 ? !s2 : n2))) : console.warn("Data Load Response Blocked - An active data load request was blocked by an attempt to change table data while the request was being made");
              }
            }).catch((e3) => {
              console.error("Data Load Error: ", e3), this.dispatchExternal("dataLoadError", e3), o2 || this.alertError(), setTimeout(() => {
                this.clearAlert();
              }, this.table.options.dataLoaderErrorTimeout);
            }).finally(() => {
              this.loading = false;
            })) : (this.dispatchExternal("dataLoaded", e2), e2 || (e2 = []), this.table.rowManager.setData(e2, s2, void 0 === n2 ? !s2 : n2), Promise.resolve()));
          }
          mapParams(e2, t2) {
            var i2 = {};
            for (let s2 in e2)
              i2[t2.hasOwnProperty(s2) ? t2[s2] : s2] = e2[s2];
            return i2;
          }
          objectInvert(e2) {
            var t2 = {};
            for (let i2 in e2)
              t2[e2[i2]] = i2;
            return t2;
          }
          blockActiveLoad() {
            this.requestOrder++;
          }
          alertLoader() {
            ("function" == typeof this.table.options.dataLoader ? this.table.options.dataLoader() : this.table.options.dataLoader) && this.table.alertManager.alert(this.table.options.dataLoaderLoading || this.langText("data|loading"));
          }
          alertError() {
            this.table.alertManager.alert(this.table.options.dataLoaderError || this.langText("data|error"), "error");
          }
          clearAlert() {
            this.table.alertManager.clear();
          }
        }
        class y {
          constructor(e2, t2, i2) {
            this.table = e2, this.events = {}, this.optionsList = t2 || {}, this.subscriptionNotifiers = {}, this.dispatch = i2 ? this._debugDispatch.bind(this) : this._dispatch.bind(this), this.debug = i2;
          }
          subscriptionChange(e2, t2) {
            this.subscriptionNotifiers[e2] || (this.subscriptionNotifiers[e2] = []), this.subscriptionNotifiers[e2].push(t2), this.subscribed(e2) && this._notifySubscriptionChange(e2, true);
          }
          subscribe(e2, t2) {
            this.events[e2] || (this.events[e2] = []), this.events[e2].push(t2), this._notifySubscriptionChange(e2, true);
          }
          unsubscribe(e2, t2) {
            var i2;
            if (this.events[e2]) {
              if (t2) {
                if (!((i2 = this.events[e2].findIndex((e3) => e3 === t2)) > -1))
                  return void console.warn("Cannot remove event, no matching event found:", e2, t2);
                this.events[e2].splice(i2, 1);
              } else
                delete this.events[e2];
              this._notifySubscriptionChange(e2, false);
            } else
              console.warn("Cannot remove event, no events set on:", e2);
          }
          subscribed(e2) {
            return this.events[e2] && this.events[e2].length;
          }
          _notifySubscriptionChange(e2, t2) {
            var i2 = this.subscriptionNotifiers[e2];
            i2 && i2.forEach((e3) => {
              e3(t2);
            });
          }
          _dispatch() {
            var e2, t2 = Array.from(arguments), i2 = t2.shift();
            return this.events[i2] && this.events[i2].forEach((i3, s2) => {
              let o2 = i3.apply(this.table, t2);
              s2 || (e2 = o2);
            }), e2;
          }
          _debugDispatch() {
            var e2 = Array.from(arguments), t2 = e2[0];
            return e2[0] = "ExternalEvent:" + e2[0], (true === this.debug || this.debug.includes(t2)) && console.log(...e2), this._dispatch(...arguments);
          }
        }
        class R {
          constructor(e2) {
            this.events = {}, this.subscriptionNotifiers = {}, this.dispatch = e2 ? this._debugDispatch.bind(this) : this._dispatch.bind(this), this.chain = e2 ? this._debugChain.bind(this) : this._chain.bind(this), this.confirm = e2 ? this._debugConfirm.bind(this) : this._confirm.bind(this), this.debug = e2;
          }
          subscriptionChange(e2, t2) {
            this.subscriptionNotifiers[e2] || (this.subscriptionNotifiers[e2] = []), this.subscriptionNotifiers[e2].push(t2), this.subscribed(e2) && this._notifySubscriptionChange(e2, true);
          }
          subscribe(e2, t2, i2 = 1e4) {
            this.events[e2] || (this.events[e2] = []), this.events[e2].push({ callback: t2, priority: i2 }), this.events[e2].sort((e3, t3) => e3.priority - t3.priority), this._notifySubscriptionChange(e2, true);
          }
          unsubscribe(e2, t2) {
            var i2;
            if (this.events[e2]) {
              if (t2) {
                if (!((i2 = this.events[e2].findIndex((e3) => e3.callback === t2)) > -1))
                  return void console.warn("Cannot remove event, no matching event found:", e2, t2);
                this.events[e2].splice(i2, 1);
              }
              this._notifySubscriptionChange(e2, false);
            } else
              console.warn("Cannot remove event, no events set on:", e2);
          }
          subscribed(e2) {
            return this.events[e2] && this.events[e2].length;
          }
          _chain(e2, t2, i2, s2) {
            var o2 = i2;
            return Array.isArray(t2) || (t2 = [t2]), this.subscribed(e2) ? (this.events[e2].forEach((e3, i3) => {
              o2 = e3.callback.apply(this, t2.concat([o2]));
            }), o2) : "function" == typeof s2 ? s2() : s2;
          }
          _confirm(e2, t2) {
            var i2 = false;
            return Array.isArray(t2) || (t2 = [t2]), this.subscribed(e2) && this.events[e2].forEach((e3, s2) => {
              e3.callback.apply(this, t2) && (i2 = true);
            }), i2;
          }
          _notifySubscriptionChange(e2, t2) {
            var i2 = this.subscriptionNotifiers[e2];
            i2 && i2.forEach((e3) => {
              e3(t2);
            });
          }
          _dispatch() {
            var e2 = Array.from(arguments), t2 = e2.shift();
            this.events[t2] && this.events[t2].forEach((t3) => {
              t3.callback.apply(this, e2);
            });
          }
          _debugDispatch() {
            var e2 = Array.from(arguments), t2 = e2[0];
            return e2[0] = "InternalEvent:" + t2, (true === this.debug || this.debug.includes(t2)) && console.log(...e2), this._dispatch(...arguments);
          }
          _debugChain() {
            var e2 = Array.from(arguments), t2 = e2[0];
            return e2[0] = "InternalEvent:" + t2, (true === this.debug || this.debug.includes(t2)) && console.log(...e2), this._chain(...arguments);
          }
          _debugConfirm() {
            var e2 = Array.from(arguments), t2 = e2[0];
            return e2[0] = "InternalEvent:" + t2, (true === this.debug || this.debug.includes(t2)) && console.log(...e2), this._confirm(...arguments);
          }
        }
        class x extends t {
          constructor(e2) {
            super(e2);
          }
          _warnUser() {
            this.options("debugDeprecation") && console.warn(...arguments);
          }
          check(e2, t2, i2) {
            var s2 = "";
            return void 0 === this.options(e2) || (s2 = "Deprecated Setup Option - Use of the %c" + e2 + "%c option is now deprecated", t2 ? (s2 = s2 + ", Please use the %c" + t2 + "%c option instead", this._warnUser(s2, "font-weight: bold;", "font-weight: normal;", "font-weight: bold;", "font-weight: normal;"), i2 && (this.table.options[t2] = this.table.options[e2])) : this._warnUser(s2, "font-weight: bold;", "font-weight: normal;"), false);
          }
          checkMsg(e2, t2) {
            return void 0 === this.options(e2) || (this._warnUser("%cDeprecated Setup Option - Use of the %c" + e2 + " %c option is now deprecated, " + t2, "font-weight: normal;", "font-weight: bold;", "font-weight: normal;"), false);
          }
          msg(e2) {
            this._warnUser(e2);
          }
        }
        let T = class e2 extends t {
          constructor(e3, t2, i2) {
            super(e3), this.element = t2, this.container = this._lookupContainer(), this.parent = i2, this.reversedX = false, this.childPopup = null, this.blurable = false, this.blurCallback = null, this.blurEventsBound = false, this.renderedCallback = null, this.visible = false, this.hideable = true, this.element.classList.add("tabulator-popup-container"), this.blurEvent = this.hide.bind(this, false), this.escEvent = this._escapeCheck.bind(this), this.destroyBinding = this.tableDestroyed.bind(this), this.destroyed = false;
          }
          tableDestroyed() {
            this.destroyed = true, this.hide(true);
          }
          _lookupContainer() {
            var e3 = this.table.options.popupContainer;
            return "string" == typeof e3 ? (e3 = document.querySelector(e3)) || console.warn("Menu Error - no container element found matching selector:", this.table.options.popupContainer, "(defaulting to document body)") : true === e3 && (e3 = this.table.element), e3 && !this._checkContainerIsParent(e3) && (e3 = false, console.warn("Menu Error - container element does not contain this table:", this.table.options.popupContainer, "(defaulting to document body)")), e3 || (e3 = document.body), e3;
          }
          _checkContainerIsParent(e3, t2 = this.table.element) {
            return e3 === t2 || !!t2.parentNode && this._checkContainerIsParent(e3, t2.parentNode);
          }
          renderCallback(e3) {
            this.renderedCallback = e3;
          }
          containerEventCoords(e3) {
            var t2 = !(e3 instanceof MouseEvent), i2 = t2 ? e3.touches[0].pageX : e3.pageX, s2 = t2 ? e3.touches[0].pageY : e3.pageY;
            if (this.container !== document.body) {
              let e4 = a.elOffset(this.container);
              i2 -= e4.left, s2 -= e4.top;
            }
            return { x: i2, y: s2 };
          }
          elementPositionCoords(e3, t2 = "right") {
            var i2, s2, o2, n2 = a.elOffset(e3);
            switch (this.container !== document.body && (i2 = a.elOffset(this.container), n2.left -= i2.left, n2.top -= i2.top), t2) {
              case "right":
                s2 = n2.left + e3.offsetWidth, o2 = n2.top - 1;
                break;
              case "bottom":
                s2 = n2.left, o2 = n2.top + e3.offsetHeight;
                break;
              case "left":
                s2 = n2.left, o2 = n2.top - 1;
                break;
              case "top":
                s2 = n2.left, o2 = n2.top;
                break;
              case "center":
                s2 = n2.left + e3.offsetWidth / 2, o2 = n2.top + e3.offsetHeight / 2;
            }
            return { x: s2, y: o2, offset: n2 };
          }
          show(e3, t2) {
            var i2, s2, o2, n2, r2;
            return this.destroyed || this.table.destroyed || (e3 instanceof HTMLElement ? (o2 = e3, n2 = (r2 = this.elementPositionCoords(e3, t2)).offset, i2 = r2.x, s2 = r2.y) : "number" == typeof e3 ? (n2 = { top: 0, left: 0 }, i2 = e3, s2 = t2) : (i2 = (r2 = this.containerEventCoords(e3)).x, s2 = r2.y, this.reversedX = false), this.element.style.top = s2 + "px", this.element.style.left = i2 + "px", this.container.appendChild(this.element), "function" == typeof this.renderedCallback && this.renderedCallback(), this._fitToScreen(i2, s2, o2, n2, t2), this.visible = true, this.subscribe("table-destroy", this.destroyBinding), this.element.addEventListener("mousedown", (e4) => {
              e4.stopPropagation();
            })), this;
          }
          _fitToScreen(e3, t2, i2, s2, o2) {
            var n2 = this.container === document.body ? document.documentElement.scrollTop : this.container.scrollTop;
            (e3 + this.element.offsetWidth >= this.container.offsetWidth || this.reversedX) && (this.element.style.left = "", this.element.style.right = i2 ? this.container.offsetWidth - s2.left + "px" : this.container.offsetWidth - e3 + "px", this.reversedX = true);
            let r2 = Math.max(this.container.offsetHeight, n2 ? this.container.scrollHeight : 0);
            if (t2 + this.element.offsetHeight > r2)
              if (i2)
                if ("bottom" === o2)
                  this.element.style.top = parseInt(this.element.style.top) - this.element.offsetHeight - i2.offsetHeight - 1 + "px";
                else
                  this.element.style.top = parseInt(this.element.style.top) - this.element.offsetHeight + i2.offsetHeight + 1 + "px";
              else
                this.element.style.height = r2 + "px";
          }
          isVisible() {
            return this.visible;
          }
          hideOnBlur(e3) {
            return this.blurable = true, this.visible && (setTimeout(() => {
              this.visible && (this.table.rowManager.element.addEventListener("scroll", this.blurEvent), this.subscribe("cell-editing", this.blurEvent), document.body.addEventListener("click", this.blurEvent), document.body.addEventListener("contextmenu", this.blurEvent), document.body.addEventListener("mousedown", this.blurEvent), window.addEventListener("resize", this.blurEvent), document.body.addEventListener("keydown", this.escEvent), this.blurEventsBound = true);
            }, 100), this.blurCallback = e3), this;
          }
          _escapeCheck(e3) {
            27 == e3.keyCode && this.hide();
          }
          blockHide() {
            this.hideable = false;
          }
          restoreHide() {
            this.hideable = true;
          }
          hide(e3 = false) {
            return this.visible && this.hideable && (this.blurable && this.blurEventsBound && (document.body.removeEventListener("keydown", this.escEvent), document.body.removeEventListener("click", this.blurEvent), document.body.removeEventListener("contextmenu", this.blurEvent), document.body.removeEventListener("mousedown", this.blurEvent), window.removeEventListener("resize", this.blurEvent), this.table.rowManager.element.removeEventListener("scroll", this.blurEvent), this.unsubscribe("cell-editing", this.blurEvent), this.blurEventsBound = false), this.childPopup && this.childPopup.hide(), this.parent && (this.parent.childPopup = null), this.element.parentNode && this.element.parentNode.removeChild(this.element), this.visible = false, this.blurCallback && !e3 && this.blurCallback(), this.unsubscribe("table-destroy", this.destroyBinding)), this;
          }
          child(t2) {
            return this.childPopup && this.childPopup.hide(), this.childPopup = new e2(this.table, t2, this), this.childPopup;
          }
        };
        class M extends t {
          constructor(e2, t2) {
            super(e2), this._handler = null;
          }
          initialize() {
          }
          registerTableOption(e2, t2) {
            this.table.optionsList.register(e2, t2);
          }
          registerColumnOption(e2, t2) {
            this.table.columnManager.optionsList.register(e2, t2);
          }
          registerTableFunction(e2, t2) {
            void 0 === this.table[e2] ? this.table[e2] = (...i2) => (this.table.initGuard(e2), t2(...i2)) : console.warn("Unable to bind table function, name already in use", e2);
          }
          registerComponentFunction(e2, t2, i2) {
            return this.table.componentFunctionBinder.bind(e2, t2, i2);
          }
          registerDataHandler(e2, t2) {
            this.table.rowManager.registerDataPipelineHandler(e2, t2), this._handler = e2;
          }
          registerDisplayHandler(e2, t2) {
            this.table.rowManager.registerDisplayPipelineHandler(e2, t2), this._handler = e2;
          }
          displayRows(e2) {
            var t2, i2 = this.table.rowManager.displayRows.length - 1;
            if (this._handler && (t2 = this.table.rowManager.displayPipeline.findIndex((e3) => e3.handler === this._handler)) > -1 && (i2 = t2), e2 && (i2 += e2), this._handler)
              return i2 > -1 ? this.table.rowManager.getDisplayRows(i2) : this.activeRows();
          }
          activeRows() {
            return this.table.rowManager.activeRows;
          }
          refreshData(e2, t2) {
            t2 || (t2 = this._handler), t2 && this.table.rowManager.refreshActiveData(t2, false, e2);
          }
          footerAppend(e2) {
            return this.table.footerManager.append(e2);
          }
          footerPrepend(e2) {
            return this.table.footerManager.prepend(e2);
          }
          footerRemove(e2) {
            return this.table.footerManager.remove(e2);
          }
          popup(e2, t2) {
            return new T(this.table, e2, t2);
          }
          alert(e2, t2) {
            return this.table.alertManager.alert(e2, t2);
          }
          clearAlert() {
            return this.table.alertManager.clear();
          }
        }
        function k(e2, t2) {
          e2.forEach(function(e3) {
            e3.reinitializeWidth();
          }), this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true) && this.table.modules.responsiveLayout.update();
        }
        var L = { fitData: function(e2, t2) {
          t2 && this.table.columnManager.renderer.reinitializeColumnWidths(e2), this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true) && this.table.modules.responsiveLayout.update();
        }, fitDataFill: k, fitDataTable: k, fitDataStretch: function(e2, t2) {
          var i2 = 0, s2 = this.table.rowManager.element.clientWidth, o2 = 0, n2 = false;
          e2.forEach((e3, t3) => {
            e3.widthFixed || e3.reinitializeWidth(), (this.table.options.responsiveLayout ? e3.modules.responsive.visible : e3.visible) && (n2 = e3), e3.visible && (i2 += e3.getWidth());
          }), n2 ? (o2 = s2 - i2 + n2.getWidth(), this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true) && (n2.setWidth(0), this.table.modules.responsiveLayout.update()), o2 > 0 ? n2.setWidth(o2) : n2.reinitializeWidth()) : this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true) && this.table.modules.responsiveLayout.update();
        }, fitColumns: function(e2, t2) {
          var i2, s2, o2 = this.table.rowManager.element.getBoundingClientRect().width, n2 = 0, r2 = 0, a2 = 0, l2 = [], h2 = [], d2 = 0, c2 = 0;
          function u2(e3) {
            return "string" == typeof e3 ? e3.indexOf("%") > -1 ? o2 / 100 * parseInt(e3) : parseInt(e3) : e3;
          }
          function m2(e3, t3, i3, s3) {
            var o3 = [], n3 = 0, r3 = 0, l3 = 0, h3 = a2, d3 = 0, c3 = 0, p2 = [];
            function g2(e4) {
              return i3 * (e4.column.definition.widthGrow || 1);
            }
            function b2(e4) {
              return u2(e4.width) - i3 * (e4.column.definition.widthShrink || 0);
            }
            return e3.forEach(function(e4, n4) {
              var r4 = s3 ? b2(e4) : g2(e4);
              e4.column.minWidth >= r4 ? o3.push(e4) : e4.column.maxWidth && e4.column.maxWidth < r4 ? (e4.width = e4.column.maxWidth, t3 -= e4.column.maxWidth, (h3 -= s3 ? e4.column.definition.widthShrink || 1 : e4.column.definition.widthGrow || 1) && (i3 = Math.floor(t3 / h3))) : (p2.push(e4), c3 += s3 ? e4.column.definition.widthShrink || 1 : e4.column.definition.widthGrow || 1);
            }), o3.length ? (o3.forEach(function(e4) {
              n3 += s3 ? e4.width - e4.column.minWidth : e4.column.minWidth, e4.width = e4.column.minWidth;
            }), r3 = t3 - n3, l3 = c3 ? Math.floor(r3 / c3) : r3, d3 = m2(p2, r3, l3, s3)) : (d3 = c3 ? t3 - Math.floor(t3 / c3) * c3 : t3, p2.forEach(function(e4) {
              e4.width = s3 ? b2(e4) : g2(e4);
            })), d3;
          }
          this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true) && this.table.modules.responsiveLayout.update(), this.table.rowManager.element.scrollHeight > this.table.rowManager.element.clientHeight && (o2 -= this.table.rowManager.element.offsetWidth - this.table.rowManager.element.clientWidth), e2.forEach(function(e3) {
            var t3, i3, s3;
            e3.visible && (t3 = e3.definition.width, i3 = parseInt(e3.minWidth), t3 ? (s3 = u2(t3), n2 += s3 > i3 ? s3 : i3, e3.definition.widthShrink && (h2.push({ column: e3, width: s3 > i3 ? s3 : i3 }), d2 += e3.definition.widthShrink)) : (l2.push({ column: e3, width: 0 }), a2 += e3.definition.widthGrow || 1));
          }), r2 = o2 - n2, i2 = Math.floor(r2 / a2), c2 = m2(l2, r2, i2, false), l2.length && c2 > 0 && (l2[l2.length - 1].width += c2), l2.forEach(function(e3) {
            r2 -= e3.width;
          }), (s2 = Math.abs(c2) + r2) > 0 && d2 && (c2 = m2(h2, s2, Math.floor(s2 / d2), true)), c2 && h2.length && (h2[h2.length - 1].width -= c2), l2.forEach(function(e3) {
            e3.column.setWidth(e3.width);
          }), h2.forEach(function(e3) {
            e3.column.setWidth(e3.width);
          });
        } };
        const _S = class extends M {
          constructor(e2) {
            super(e2, "layout"), this.mode = null, this.registerTableOption("layout", "fitData"), this.registerTableOption("layoutColumnsOnNewData", false), this.registerColumnOption("widthGrow"), this.registerColumnOption("widthShrink");
          }
          initialize() {
            var e2 = this.table.options.layout;
            _S.modes[e2] ? this.mode = e2 : (console.warn("Layout Error - invalid mode set, defaulting to 'fitData' : " + e2), this.mode = "fitData"), this.table.element.setAttribute("tabulator-layout", this.mode), this.subscribe("column-init", this.initializeColumn.bind(this));
          }
          initializeColumn(e2) {
            e2.definition.widthGrow && (e2.definition.widthGrow = Number(e2.definition.widthGrow)), e2.definition.widthShrink && (e2.definition.widthShrink = Number(e2.definition.widthShrink));
          }
          getMode() {
            return this.mode;
          }
          layout(e2) {
            this.dispatch("layout-refreshing"), _S.modes[this.mode].call(this, this.table.columnManager.columnsByIndex, e2), this.dispatch("layout-refreshed");
          }
        };
        let S = _S;
        __publicField(S, "moduleName", "layout");
        __publicField(S, "modes", L);
        var D = { default: { groups: { item: "item", items: "items" }, columns: {}, data: { loading: "Loading", error: "Error" }, pagination: { page_size: "Page Size", page_title: "Show Page", first: "First", first_title: "First Page", last: "Last", last_title: "Last Page", prev: "Prev", prev_title: "Prev Page", next: "Next", next_title: "Next Page", all: "All", counter: { showing: "Showing", of: "of", rows: "rows", pages: "pages" } }, headerFilters: { default: "filter column...", columns: {} } } };
        const _z = class extends M {
          constructor(e2) {
            super(e2), this.locale = "default", this.lang = false, this.bindings = {}, this.langList = {}, this.registerTableOption("locale", false), this.registerTableOption("langs", {});
          }
          initialize() {
            this.langList = a.deepClone(_z.langs), false !== this.table.options.columnDefaults.headerFilterPlaceholder && this.setHeaderFilterPlaceholder(this.table.options.columnDefaults.headerFilterPlaceholder);
            for (let e2 in this.table.options.langs)
              this.installLang(e2, this.table.options.langs[e2]);
            this.setLocale(this.table.options.locale), this.registerTableFunction("setLocale", this.setLocale.bind(this)), this.registerTableFunction("getLocale", this.getLocale.bind(this)), this.registerTableFunction("getLang", this.getLang.bind(this));
          }
          setHeaderFilterPlaceholder(e2) {
            this.langList.default.headerFilters.default = e2;
          }
          installLang(e2, t2) {
            this.langList[e2] ? this._setLangProp(this.langList[e2], t2) : this.langList[e2] = t2;
          }
          _setLangProp(e2, t2) {
            for (let i2 in t2)
              e2[i2] && "object" == typeof e2[i2] ? this._setLangProp(e2[i2], t2[i2]) : e2[i2] = t2[i2];
          }
          setLocale(e2) {
            if (true === (e2 = e2 || "default") && navigator.language && (e2 = navigator.language.toLowerCase()), e2 && !this.langList[e2]) {
              let t2 = e2.split("-")[0];
              this.langList[t2] ? (console.warn("Localization Error - Exact matching locale not found, using closest match: ", e2, t2), e2 = t2) : (console.warn("Localization Error - Matching locale not found, using default: ", e2), e2 = "default");
            }
            this.locale = e2, this.lang = a.deepClone(this.langList.default || {}), "default" != e2 && function e3(t2, i2) {
              for (var s2 in t2)
                "object" == typeof t2[s2] ? (i2[s2] || (i2[s2] = {}), e3(t2[s2], i2[s2])) : i2[s2] = t2[s2];
            }(this.langList[e2], this.lang), this.dispatchExternal("localized", this.locale, this.lang), this._executeBindings();
          }
          getLocale(e2) {
            return this.locale;
          }
          getLang(e2) {
            return e2 ? this.langList[e2] : this.lang;
          }
          getText(e2, t2) {
            var i2 = (t2 ? e2 + "|" + t2 : e2).split("|");
            return this._getLangElement(i2, this.locale) || "";
          }
          _getLangElement(e2, t2) {
            var i2 = this.lang;
            return e2.forEach(function(e3) {
              var t3;
              i2 && (t3 = i2[e3], i2 = void 0 !== t3 && t3);
            }), i2;
          }
          bind(e2, t2) {
            this.bindings[e2] || (this.bindings[e2] = []), this.bindings[e2].push(t2), t2(this.getText(e2), this.lang);
          }
          _executeBindings() {
            for (let e2 in this.bindings)
              this.bindings[e2].forEach((t2) => {
                t2(this.getText(e2), this.lang);
              });
          }
        };
        let z = _z;
        __publicField(z, "moduleName", "localize");
        __publicField(z, "langs", D);
        var P = Object.freeze({ __proto__: null, CommsModule: (_a = class extends M {
          constructor(e2) {
            super(e2);
          }
          initialize() {
            this.registerTableFunction("tableComms", this.receive.bind(this));
          }
          getConnections(e2) {
            var t2 = [];
            return this.table.constructor.registry.lookupTable(e2).forEach((e3) => {
              this.table !== e3 && t2.push(e3);
            }), t2;
          }
          send(e2, t2, i2, s2) {
            var o2 = this.getConnections(e2);
            o2.forEach((e3) => {
              e3.tableComms(this.table.element, t2, i2, s2);
            }), !o2.length && e2 && console.warn("Table Connection Error - No tables matching selector found", e2);
          }
          receive(e2, t2, i2, s2) {
            if (this.table.modExists(t2))
              return this.table.modules[t2].commsReceived(e2, i2, s2);
            console.warn("Inter-table Comms Error - no such module:", t2);
          }
        }, __publicField(_a, "moduleName", "comms"), _a), LayoutModule: S, LocalizeModule: z });
        const _F = class {
          static findTable(e2) {
            var t2 = _F.registry.lookupTable(e2, true);
            return !(Array.isArray(t2) && !t2.length) && t2;
          }
        };
        let F = _F;
        __publicField(F, "registry", { tables: [], register(e2) {
          _F.registry.tables.push(e2);
        }, deregister(e2) {
          var t2 = _F.registry.tables.indexOf(e2);
          t2 > -1 && _F.registry.tables.splice(t2, 1);
        }, lookupTable(e2, t2) {
          var i2, s2, o2 = [];
          if ("string" == typeof e2) {
            if ((i2 = document.querySelectorAll(e2)).length)
              for (var n2 = 0; n2 < i2.length; n2++)
                (s2 = _F.registry.matchElement(i2[n2])) && o2.push(s2);
          } else
            "undefined" != typeof HTMLElement && e2 instanceof HTMLElement || e2 instanceof _F ? (s2 = _F.registry.matchElement(e2)) && o2.push(s2) : Array.isArray(e2) ? e2.forEach(function(e3) {
              o2 = o2.concat(_F.registry.lookupTable(e3));
            }) : t2 || console.warn("Table Connection Error - Invalid Selector", e2);
          return o2;
        }, matchElement: (e2) => _F.registry.tables.find(function(t2) {
          return e2 instanceof _F ? t2 === e2 : t2.element === e2;
        }) });
        const _H = class extends F {
          constructor() {
            super();
          }
          static initializeModuleBinder(e2) {
            _H.modulesRegistered || (_H.modulesRegistered = true, _H._registerModules(P, true), e2 && _H._registerModules(e2));
          }
          static _extendModule(e2, t2, i2) {
            if (_H.moduleBindings[e2]) {
              var s2 = _H.moduleBindings[e2][t2];
              if (s2)
                if ("object" == typeof i2)
                  for (let e3 in i2)
                    s2[e3] = i2[e3];
                else
                  console.warn("Module Error - Invalid value type, it must be an object");
              else
                console.warn("Module Error - property does not exist:", t2);
            } else
              console.warn("Module Error - module does not exist:", e2);
          }
          static _registerModules(e2, t2) {
            var i2 = Object.values(e2);
            t2 && i2.forEach((e3) => {
              e3.prototype.moduleCore = true;
            }), _H._registerModule(i2);
          }
          static _registerModule(e2) {
            Array.isArray(e2) || (e2 = [e2]), e2.forEach((e3) => {
              _H._registerModuleBinding(e3), _H._registerModuleExtensions(e3);
            });
          }
          static _registerModuleBinding(e2) {
            e2.moduleName ? _H.moduleBindings[e2.moduleName] = e2 : console.error("Unable to bind module, no moduleName defined", e2.moduleName);
          }
          static _registerModuleExtensions(e2) {
            var t2 = e2.moduleExtensions;
            if (e2.moduleExtensions)
              for (let e3 in t2) {
                let i2 = t2[e3];
                if (_H.moduleBindings[e3])
                  for (let t3 in i2)
                    _H._extendModule(e3, t3, i2[t3]);
                else {
                  _H.moduleExtensions[e3] || (_H.moduleExtensions[e3] = {});
                  for (let t3 in i2)
                    _H.moduleExtensions[e3][t3] || (_H.moduleExtensions[e3][t3] = {}), Object.assign(_H.moduleExtensions[e3][t3], i2[t3]);
                }
              }
            _H._extendModuleFromQueue(e2);
          }
          static _extendModuleFromQueue(e2) {
            var t2 = _H.moduleExtensions[e2.moduleName];
            if (t2)
              for (let i2 in t2)
                _H._extendModule(e2.moduleName, i2, t2[i2]);
          }
          _bindModules() {
            var e2 = [], t2 = [], i2 = [];
            for (var s2 in this.modules = {}, _H.moduleBindings) {
              let o2 = _H.moduleBindings[s2], n2 = new o2(this);
              this.modules[s2] = n2, o2.prototype.moduleCore ? this.modulesCore.push(n2) : o2.moduleInitOrder ? o2.moduleInitOrder < 0 ? e2.push(n2) : t2.push(n2) : i2.push(n2);
            }
            e2.sort((e3, t3) => e3.moduleInitOrder > t3.moduleInitOrder ? 1 : -1), t2.sort((e3, t3) => e3.moduleInitOrder > t3.moduleInitOrder ? 1 : -1), this.modulesRegular = e2.concat(i2.concat(t2));
          }
        };
        let H = _H;
        __publicField(H, "moduleBindings", {});
        __publicField(H, "moduleExtensions", {});
        __publicField(H, "modulesRegistered", false);
        __publicField(H, "defaultModules", false);
        class _ extends t {
          constructor(e2) {
            super(e2), this.element = this._createAlertElement(), this.msgElement = this._createMsgElement(), this.type = null, this.element.appendChild(this.msgElement);
          }
          _createAlertElement() {
            var e2 = document.createElement("div");
            return e2.classList.add("tabulator-alert"), e2;
          }
          _createMsgElement() {
            var e2 = document.createElement("div");
            return e2.classList.add("tabulator-alert-msg"), e2.setAttribute("role", "alert"), e2;
          }
          _typeClass() {
            return "tabulator-alert-state-" + this.type;
          }
          alert(e2, t2 = "msg") {
            if (e2) {
              for (this.clear(), this.dispatch("alert-show", t2), this.type = t2; this.msgElement.firstChild; )
                this.msgElement.removeChild(this.msgElement.firstChild);
              this.msgElement.classList.add(this._typeClass()), "function" == typeof e2 && (e2 = e2()), e2 instanceof HTMLElement ? this.msgElement.appendChild(e2) : this.msgElement.innerHTML = e2, this.table.element.appendChild(this.element);
            }
          }
          clear() {
            this.dispatch("alert-hide", this.type), this.element.parentNode && this.element.parentNode.removeChild(this.element), this.msgElement.classList.remove(this._typeClass());
          }
        }
        const _O = class extends H {
          static extendModule() {
            _O.initializeModuleBinder(), _O._extendModule(...arguments);
          }
          static registerModule() {
            _O.initializeModuleBinder(), _O._registerModule(...arguments);
          }
          constructor(e2, t2, i2) {
            super(), _O.initializeModuleBinder(i2), this.options = {}, this.columnManager = null, this.rowManager = null, this.footerManager = null, this.alertManager = null, this.vdomHoz = null, this.externalEvents = null, this.eventBus = null, this.interactionMonitor = false, this.browser = "", this.browserSlow = false, this.browserMobile = false, this.rtl = false, this.originalElement = null, this.componentFunctionBinder = new C(this), this.dataLoader = false, this.modules = {}, this.modulesCore = [], this.modulesRegular = [], this.deprecationAdvisor = new x(this), this.optionsList = new l(this, "table constructor"), this.initialized = false, this.destroyed = false, this.initializeElement(e2) && (this.initializeCoreSystems(t2), setTimeout(() => {
              this._create();
            })), this.constructor.registry.register(this);
          }
          initializeElement(e2) {
            return "undefined" != typeof HTMLElement && e2 instanceof HTMLElement ? (this.element = e2, true) : "string" == typeof e2 ? (this.element = document.querySelector(e2), !!this.element || (console.error("Tabulator Creation Error - no element found matching selector: ", e2), false)) : (console.error("Tabulator Creation Error - Invalid element provided:", e2), false);
          }
          initializeCoreSystems(e2) {
            this.columnManager = new u(this), this.rowManager = new f(this), this.footerManager = new v(this), this.dataLoader = new E(this), this.alertManager = new _(this), this._bindModules(), this.options = this.optionsList.generate(_O.defaultOptions, e2), this._clearObjectPointers(), this._mapDeprecatedFunctionality(), this.externalEvents = new y(this, this.options, this.options.debugEventsExternal), this.eventBus = new R(this.options.debugEventsInternal), this.interactionMonitor = new w(this), this.dataLoader.initialize(), this.footerManager.initialize();
          }
          _mapDeprecatedFunctionality() {
          }
          _clearSelection() {
            this.element.classList.add("tabulator-block-select"), window.getSelection ? window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges() : document.selection && document.selection.empty(), this.element.classList.remove("tabulator-block-select");
          }
          _create() {
            this.externalEvents.dispatch("tableBuilding"), this.eventBus.dispatch("table-building"), this._rtlCheck(), this._buildElement(), this._initializeTable(), this.initialized = true, this._loadInitialData().finally(() => {
              this.eventBus.dispatch("table-initialized"), this.externalEvents.dispatch("tableBuilt");
            });
          }
          _rtlCheck() {
            var e2 = window.getComputedStyle(this.element);
            switch (this.options.textDirection) {
              case "auto":
                if ("rtl" !== e2.direction)
                  break;
              case "rtl":
                this.element.classList.add("tabulator-rtl"), this.rtl = true;
                break;
              case "ltr":
                this.element.classList.add("tabulator-ltr");
              default:
                this.rtl = false;
            }
          }
          _clearObjectPointers() {
            this.options.columns = this.options.columns.slice(0), Array.isArray(this.options.data) && !this.options.reactiveData && (this.options.data = this.options.data.slice(0));
          }
          _buildElement() {
            var e2, t2 = this.element, i2 = this.options;
            if ("TABLE" === t2.tagName) {
              this.originalElement = this.element, e2 = document.createElement("div");
              var s2 = t2.attributes;
              for (var o2 in s2)
                "object" == typeof s2[o2] && e2.setAttribute(s2[o2].name, s2[o2].value);
              t2.parentNode.replaceChild(e2, t2), this.element = t2 = e2;
            }
            for (t2.classList.add("tabulator"), t2.setAttribute("role", "grid"); t2.firstChild; )
              t2.removeChild(t2.firstChild);
            i2.height && (i2.height = isNaN(i2.height) ? i2.height : i2.height + "px", t2.style.height = i2.height), false !== i2.minHeight && (i2.minHeight = isNaN(i2.minHeight) ? i2.minHeight : i2.minHeight + "px", t2.style.minHeight = i2.minHeight), false !== i2.maxHeight && (i2.maxHeight = isNaN(i2.maxHeight) ? i2.maxHeight : i2.maxHeight + "px", t2.style.maxHeight = i2.maxHeight);
          }
          _initializeTable() {
            var e2 = this.element, t2 = this.options;
            this.interactionMonitor.initialize(), this.columnManager.initialize(), this.rowManager.initialize(), this._detectBrowser(), this.modulesCore.forEach((e3) => {
              e3.initialize();
            }), e2.appendChild(this.columnManager.getElement()), e2.appendChild(this.rowManager.getElement()), t2.footerElement && this.footerManager.activate(), t2.autoColumns && t2.data && this.columnManager.generateColumnsFromRowData(this.options.data), this.modulesRegular.forEach((e3) => {
              e3.initialize();
            }), this.columnManager.setColumns(t2.columns), this.eventBus.dispatch("table-built");
          }
          _loadInitialData() {
            return this.dataLoader.load(this.options.data).finally(() => {
              this.columnManager.verticalAlignHeaders();
            });
          }
          destroy() {
            var e2 = this.element;
            for (this.destroyed = true, this.constructor.registry.deregister(this), this.eventBus.dispatch("table-destroy"), this.rowManager.destroy(); e2.firstChild; )
              e2.removeChild(e2.firstChild);
            e2.classList.remove("tabulator"), this.externalEvents.dispatch("tableDestroyed");
          }
          _detectBrowser() {
            var e2 = navigator.userAgent || navigator.vendor || window.opera;
            e2.indexOf("Trident") > -1 ? (this.browser = "ie", this.browserSlow = true) : e2.indexOf("Edge") > -1 ? (this.browser = "edge", this.browserSlow = true) : e2.indexOf("Firefox") > -1 ? (this.browser = "firefox", this.browserSlow = false) : e2.indexOf("Mac OS") > -1 ? (this.browser = "safari", this.browserSlow = false) : (this.browser = "other", this.browserSlow = false), this.browserMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e2) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(e2.slice(0, 4));
          }
          initGuard(e2, t2) {
            var i2, s2;
            return this.options.debugInitialization && !this.initialized && (e2 || (e2 = " " == (s2 = "Error" == (i2 = new Error().stack.split("\n"))[0] ? i2[2] : i2[1])[0] ? s2.trim().split(" ")[1].split(".")[1] : s2.trim().split("@")[0]), console.warn("Table Not Initialized - Calling the " + e2 + " function before the table is initialized may result in inconsistent behavior, Please wait for the `tableBuilt` event before calling this function." + (t2 ? " " + t2 : ""))), this.initialized;
          }
          blockRedraw() {
            this.initGuard(), this.eventBus.dispatch("redraw-blocking"), this.rowManager.blockRedraw(), this.columnManager.blockRedraw(), this.eventBus.dispatch("redraw-blocked");
          }
          restoreRedraw() {
            this.initGuard(), this.eventBus.dispatch("redraw-restoring"), this.rowManager.restoreRedraw(), this.columnManager.restoreRedraw(), this.eventBus.dispatch("redraw-restored");
          }
          setData(e2, t2, i2) {
            return this.initGuard(false, "To set initial data please use the 'data' property in the table constructor."), this.dataLoader.load(e2, t2, i2, false);
          }
          clearData() {
            this.initGuard(), this.dataLoader.blockActiveLoad(), this.rowManager.clearData();
          }
          getData(e2) {
            return this.rowManager.getData(e2);
          }
          getDataCount(e2) {
            return this.rowManager.getDataCount(e2);
          }
          replaceData(e2, t2, i2) {
            return this.initGuard(), this.dataLoader.load(e2, t2, i2, true, true);
          }
          updateData(e2) {
            var t2 = 0;
            return this.initGuard(), new Promise((i2, s2) => {
              this.dataLoader.blockActiveLoad(), "string" == typeof e2 && (e2 = JSON.parse(e2)), e2 && e2.length > 0 ? e2.forEach((e3) => {
                var o2 = this.rowManager.findRow(e3[this.options.index]);
                o2 ? (t2++, o2.updateData(e3).then(() => {
                  --t2 || i2();
                }).catch((t3) => {
                  s2("Update Error - Unable to update row", e3, t3);
                })) : s2("Update Error - Unable to find row", e3);
              }) : (console.warn("Update Error - No data provided"), s2("Update Error - No data provided"));
            });
          }
          addData(e2, t2, i2) {
            return this.initGuard(), new Promise((s2, o2) => {
              this.dataLoader.blockActiveLoad(), "string" == typeof e2 && (e2 = JSON.parse(e2)), e2 ? this.rowManager.addRows(e2, t2, i2).then((e3) => {
                var t3 = [];
                e3.forEach(function(e4) {
                  t3.push(e4.getComponent());
                }), s2(t3);
              }) : (console.warn("Update Error - No data provided"), o2("Update Error - No data provided"));
            });
          }
          updateOrAddData(e2) {
            var t2 = [], i2 = 0;
            return this.initGuard(), new Promise((s2, o2) => {
              this.dataLoader.blockActiveLoad(), "string" == typeof e2 && (e2 = JSON.parse(e2)), e2 && e2.length > 0 ? e2.forEach((e3) => {
                var o3 = this.rowManager.findRow(e3[this.options.index]);
                i2++, o3 ? o3.updateData(e3).then(() => {
                  i2--, t2.push(o3.getComponent()), i2 || s2(t2);
                }) : this.rowManager.addRows(e3).then((e4) => {
                  i2--, t2.push(e4[0].getComponent()), i2 || s2(t2);
                });
              }) : (console.warn("Update Error - No data provided"), o2("Update Error - No data provided"));
            });
          }
          getRow(e2) {
            var t2 = this.rowManager.findRow(e2);
            return t2 ? t2.getComponent() : (console.warn("Find Error - No matching row found:", e2), false);
          }
          getRowFromPosition(e2) {
            var t2 = this.rowManager.getRowFromPosition(e2);
            return t2 ? t2.getComponent() : (console.warn("Find Error - No matching row found:", e2), false);
          }
          deleteRow(e2) {
            var t2 = [];
            this.initGuard(), Array.isArray(e2) || (e2 = [e2]);
            for (let i2 of e2) {
              let e3 = this.rowManager.findRow(i2, true);
              if (!e3)
                return console.error("Delete Error - No matching row found:", i2), Promise.reject("Delete Error - No matching row found");
              t2.push(e3);
            }
            return t2.sort((e3, t3) => this.rowManager.rows.indexOf(e3) > this.rowManager.rows.indexOf(t3) ? 1 : -1), t2.forEach((e3) => {
              e3.delete();
            }), this.rowManager.reRenderInPosition(), Promise.resolve();
          }
          addRow(e2, t2, i2) {
            return this.initGuard(), "string" == typeof e2 && (e2 = JSON.parse(e2)), this.rowManager.addRows(e2, t2, i2, true).then((e3) => e3[0].getComponent());
          }
          updateOrAddRow(e2, t2) {
            var i2 = this.rowManager.findRow(e2);
            return this.initGuard(), "string" == typeof t2 && (t2 = JSON.parse(t2)), i2 ? i2.updateData(t2).then(() => i2.getComponent()) : this.rowManager.addRows(t2).then((e3) => e3[0].getComponent());
          }
          updateRow(e2, t2) {
            var i2 = this.rowManager.findRow(e2);
            return this.initGuard(), "string" == typeof t2 && (t2 = JSON.parse(t2)), i2 ? i2.updateData(t2).then(() => Promise.resolve(i2.getComponent())) : (console.warn("Update Error - No matching row found:", e2), Promise.reject("Update Error - No matching row found"));
          }
          scrollToRow(e2, t2, i2) {
            var s2 = this.rowManager.findRow(e2);
            return s2 ? this.rowManager.scrollToRow(s2, t2, i2) : (console.warn("Scroll Error - No matching row found:", e2), Promise.reject("Scroll Error - No matching row found"));
          }
          moveRow(e2, t2, i2) {
            var s2 = this.rowManager.findRow(e2);
            this.initGuard(), s2 ? s2.moveToRow(t2, i2) : console.warn("Move Error - No matching row found:", e2);
          }
          getRows(e2) {
            return this.rowManager.getComponents(e2);
          }
          getRowPosition(e2) {
            var t2 = this.rowManager.findRow(e2);
            return t2 ? t2.getPosition() : (console.warn("Position Error - No matching row found:", e2), false);
          }
          setColumns(e2) {
            this.initGuard(false, "To set initial columns please use the 'columns' property in the table constructor"), this.columnManager.setColumns(e2);
          }
          getColumns(e2) {
            return this.columnManager.getComponents(e2);
          }
          getColumn(e2) {
            var t2 = this.columnManager.findColumn(e2);
            return t2 ? t2.getComponent() : (console.warn("Find Error - No matching column found:", e2), false);
          }
          getColumnDefinitions() {
            return this.columnManager.getDefinitionTree();
          }
          showColumn(e2) {
            var t2 = this.columnManager.findColumn(e2);
            if (this.initGuard(), !t2)
              return console.warn("Column Show Error - No matching column found:", e2), false;
            t2.show();
          }
          hideColumn(e2) {
            var t2 = this.columnManager.findColumn(e2);
            if (this.initGuard(), !t2)
              return console.warn("Column Hide Error - No matching column found:", e2), false;
            t2.hide();
          }
          toggleColumn(e2) {
            var t2 = this.columnManager.findColumn(e2);
            if (this.initGuard(), !t2)
              return console.warn("Column Visibility Toggle Error - No matching column found:", e2), false;
            t2.visible ? t2.hide() : t2.show();
          }
          addColumn(e2, t2, i2) {
            var s2 = this.columnManager.findColumn(i2);
            return this.initGuard(), this.columnManager.addColumn(e2, t2, s2).then((e3) => e3.getComponent());
          }
          deleteColumn(e2) {
            var t2 = this.columnManager.findColumn(e2);
            return this.initGuard(), t2 ? t2.delete() : (console.warn("Column Delete Error - No matching column found:", e2), Promise.reject());
          }
          updateColumnDefinition(e2, t2) {
            var i2 = this.columnManager.findColumn(e2);
            return this.initGuard(), i2 ? i2.updateDefinition(t2) : (console.warn("Column Update Error - No matching column found:", e2), Promise.reject());
          }
          moveColumn(e2, t2, i2) {
            var s2 = this.columnManager.findColumn(e2), o2 = this.columnManager.findColumn(t2);
            this.initGuard(), s2 ? o2 ? this.columnManager.moveColumn(s2, o2, i2) : console.warn("Move Error - No matching column found:", o2) : console.warn("Move Error - No matching column found:", e2);
          }
          scrollToColumn(e2, t2, i2) {
            return new Promise((s2, o2) => {
              var n2 = this.columnManager.findColumn(e2);
              return n2 ? this.columnManager.scrollToColumn(n2, t2, i2) : (console.warn("Scroll Error - No matching column found:", e2), Promise.reject("Scroll Error - No matching column found"));
            });
          }
          redraw(e2) {
            this.initGuard(), this.columnManager.redraw(e2), this.rowManager.redraw(e2);
          }
          setHeight(e2) {
            this.options.height = isNaN(e2) ? e2 : e2 + "px", this.element.style.height = this.options.height, this.rowManager.initializeRenderer(), this.rowManager.redraw(true);
          }
          on(e2, t2) {
            this.externalEvents.subscribe(e2, t2);
          }
          off(e2, t2) {
            this.externalEvents.unsubscribe(e2, t2);
          }
          dispatchEvent() {
            Array.from(arguments).shift(), this.externalEvents.dispatch(...arguments);
          }
          alert(e2, t2) {
            this.initGuard(), this.alertManager.alert(e2, t2);
          }
          clearAlert() {
            this.initGuard(), this.alertManager.clear();
          }
          modExists(e2, t2) {
            return !!this.modules[e2] || (t2 && console.error("Tabulator Module Not Installed: " + e2), false);
          }
          module(e2) {
            var t2 = this.modules[e2];
            return t2 || console.error("Tabulator module not installed: " + e2), t2;
          }
        };
        let O = _O;
        __publicField(O, "defaultOptions", e);
        var A = { rownum: function(e2, t2, i2, s2, o2, n2) {
          return n2.getPosition();
        } };
        const _B = class extends M {
          constructor(e2) {
            super(e2), this.allowedTypes = ["", "data", "download", "clipboard", "print", "htmlOutput"], this.registerColumnOption("accessor"), this.registerColumnOption("accessorParams"), this.registerColumnOption("accessorData"), this.registerColumnOption("accessorDataParams"), this.registerColumnOption("accessorDownload"), this.registerColumnOption("accessorDownloadParams"), this.registerColumnOption("accessorClipboard"), this.registerColumnOption("accessorClipboardParams"), this.registerColumnOption("accessorPrint"), this.registerColumnOption("accessorPrintParams"), this.registerColumnOption("accessorHtmlOutput"), this.registerColumnOption("accessorHtmlOutputParams");
          }
          initialize() {
            this.subscribe("column-layout", this.initializeColumn.bind(this)), this.subscribe("row-data-retrieve", this.transformRow.bind(this));
          }
          initializeColumn(e2) {
            var t2 = false, i2 = {};
            this.allowedTypes.forEach((s2) => {
              var o2, n2 = "accessor" + (s2.charAt(0).toUpperCase() + s2.slice(1));
              e2.definition[n2] && (o2 = this.lookupAccessor(e2.definition[n2])) && (t2 = true, i2[n2] = { accessor: o2, params: e2.definition[n2 + "Params"] || {} });
            }), t2 && (e2.modules.accessor = i2);
          }
          lookupAccessor(e2) {
            var t2 = false;
            switch (typeof e2) {
              case "string":
                _B.accessors[e2] ? t2 = _B.accessors[e2] : console.warn("Accessor Error - No such accessor found, ignoring: ", e2);
                break;
              case "function":
                t2 = e2;
            }
            return t2;
          }
          transformRow(e2, t2) {
            var i2 = "accessor" + (t2.charAt(0).toUpperCase() + t2.slice(1)), s2 = e2.getComponent(), o2 = a.deepClone(e2.data || {});
            return this.table.columnManager.traverse(function(e3) {
              var n2, r2, a2, l2;
              e3.modules.accessor && (r2 = e3.modules.accessor[i2] || e3.modules.accessor.accessor || false) && "undefined" != (n2 = e3.getFieldValue(o2)) && (l2 = e3.getComponent(), a2 = "function" == typeof r2.params ? r2.params(n2, o2, t2, l2, s2) : r2.params, e3.setFieldValue(o2, r2.accessor(n2, o2, t2, a2, l2, s2)));
            }), o2;
          }
        };
        let B = _B;
        __publicField(B, "moduleName", "accessor");
        __publicField(B, "accessors", A);
        var V = { method: "GET" };
        function I(e2, t2) {
          var i2 = [];
          if (t2 = t2 || "", Array.isArray(e2))
            e2.forEach((e3, s3) => {
              i2 = i2.concat(I(e3, t2 ? t2 + "[" + s3 + "]" : s3));
            });
          else if ("object" == typeof e2)
            for (var s2 in e2)
              i2 = i2.concat(I(e2[s2], t2 ? t2 + "[" + s2 + "]" : s2));
          else
            i2.push({ key: t2, value: e2 });
          return i2;
        }
        function N(e2) {
          var t2 = I(e2), i2 = [];
          return t2.forEach(function(e3) {
            i2.push(encodeURIComponent(e3.key) + "=" + encodeURIComponent(e3.value));
          }), i2.join("&");
        }
        function W(e2, t2, i2) {
          return e2 && i2 && Object.keys(i2).length && (t2.method && "get" != t2.method.toLowerCase() || (t2.method = "get", e2 += (e2.includes("?") ? "&" : "?") + N(i2))), e2;
        }
        function j(e2, t2, i2) {
          var s2;
          return new Promise((o2, n2) => {
            if (e2 = this.urlGenerator.call(this.table, e2, t2, i2), "GET" != t2.method.toUpperCase())
              if (s2 = "object" == typeof this.table.options.ajaxContentType ? this.table.options.ajaxContentType : this.contentTypeFormatters[this.table.options.ajaxContentType]) {
                for (var r2 in s2.headers)
                  t2.headers || (t2.headers = {}), void 0 === t2.headers[r2] && (t2.headers[r2] = s2.headers[r2]);
                t2.body = s2.body.call(this, e2, t2, i2);
              } else
                console.warn("Ajax Error - Invalid ajaxContentType value:", this.table.options.ajaxContentType);
            e2 ? (void 0 === t2.headers && (t2.headers = {}), void 0 === t2.headers.Accept && (t2.headers.Accept = "application/json"), void 0 === t2.headers["X-Requested-With"] && (t2.headers["X-Requested-With"] = "XMLHttpRequest"), void 0 === t2.mode && (t2.mode = "cors"), "cors" == t2.mode ? (void 0 === t2.headers.Origin && (t2.headers.Origin = window.location.origin), void 0 === t2.credentials && (t2.credentials = "same-origin")) : void 0 === t2.credentials && (t2.credentials = "include"), fetch(e2, t2).then((e3) => {
              e3.ok ? e3.json().then((e4) => {
                o2(e4);
              }).catch((e4) => {
                n2(e4), console.warn("Ajax Load Error - Invalid JSON returned", e4);
              }) : (console.error("Ajax Load Error - Connection Error: " + e3.status, e3.statusText), n2(e3));
            }).catch((e3) => {
              console.error("Ajax Load Error - Connection Error: ", e3), n2(e3);
            })) : (console.warn("Ajax Load Error - No URL Set"), o2([]));
          });
        }
        function G(e2, t2) {
          var i2 = [];
          if (t2 = t2 || "", Array.isArray(e2))
            e2.forEach((e3, s3) => {
              i2 = i2.concat(G(e3, t2 ? t2 + "[" + s3 + "]" : s3));
            });
          else if ("object" == typeof e2)
            for (var s2 in e2)
              i2 = i2.concat(G(e2[s2], t2 ? t2 + "[" + s2 + "]" : s2));
          else
            i2.push({ key: t2, value: e2 });
          return i2;
        }
        var U = { json: { headers: { "Content-Type": "application/json" }, body: function(e2, t2, i2) {
          return JSON.stringify(i2);
        } }, form: { headers: {}, body: function(e2, t2, i2) {
          var s2 = G(i2), o2 = new FormData();
          return s2.forEach(function(e3) {
            o2.append(e3.key, e3.value);
          }), o2;
        } } };
        const _X = class extends M {
          constructor(e2) {
            super(e2), this.config = {}, this.url = "", this.urlGenerator = false, this.params = false, this.loaderPromise = false, this.registerTableOption("ajaxURL", false), this.registerTableOption("ajaxURLGenerator", false), this.registerTableOption("ajaxParams", {}), this.registerTableOption("ajaxConfig", "get"), this.registerTableOption("ajaxContentType", "form"), this.registerTableOption("ajaxRequestFunc", false), this.registerTableOption("ajaxRequesting", function() {
            }), this.registerTableOption("ajaxResponse", false), this.contentTypeFormatters = _X.contentTypeFormatters;
          }
          initialize() {
            this.loaderPromise = this.table.options.ajaxRequestFunc || _X.defaultLoaderPromise, this.urlGenerator = this.table.options.ajaxURLGenerator || _X.defaultURLGenerator, this.table.options.ajaxURL && this.setUrl(this.table.options.ajaxURL), this.setDefaultConfig(this.table.options.ajaxConfig), this.registerTableFunction("getAjaxUrl", this.getUrl.bind(this)), this.subscribe("data-loading", this.requestDataCheck.bind(this)), this.subscribe("data-params", this.requestParams.bind(this)), this.subscribe("data-load", this.requestData.bind(this));
          }
          requestParams(e2, t2, i2, s2) {
            var o2 = this.table.options.ajaxParams;
            return o2 && ("function" == typeof o2 && (o2 = o2.call(this.table)), s2 = Object.assign(Object.assign({}, o2), s2)), s2;
          }
          requestDataCheck(e2, t2, i2, s2) {
            return !((e2 || !this.url) && "string" != typeof e2);
          }
          requestData(e2, t2, i2, s2, o2) {
            var n2;
            return !o2 && this.requestDataCheck(e2) ? (e2 && this.setUrl(e2), n2 = this.generateConfig(i2), this.sendRequest(this.url, t2, n2)) : o2;
          }
          setDefaultConfig(e2 = {}) {
            this.config = Object.assign({}, _X.defaultConfig), "string" == typeof e2 ? this.config.method = e2 : Object.assign(this.config, e2);
          }
          generateConfig(e2 = {}) {
            var t2 = Object.assign({}, this.config);
            return "string" == typeof e2 ? t2.method = e2 : Object.assign(t2, e2), t2;
          }
          setUrl(e2) {
            this.url = e2;
          }
          getUrl() {
            return this.url;
          }
          sendRequest(e2, t2, i2) {
            return false !== this.table.options.ajaxRequesting.call(this.table, e2, t2) ? this.loaderPromise(e2, i2, t2).then((i3) => (this.table.options.ajaxResponse && (i3 = this.table.options.ajaxResponse.call(this.table, e2, t2, i3)), i3)) : Promise.reject();
          }
        };
        let X = _X;
        __publicField(X, "moduleName", "ajax");
        __publicField(X, "defaultConfig", V);
        __publicField(X, "defaultURLGenerator", W);
        __publicField(X, "defaultLoaderPromise", j);
        __publicField(X, "contentTypeFormatters", U);
        var J = { replace: function(e2) {
          return this.table.setData(e2);
        }, update: function(e2) {
          return this.table.updateOrAddData(e2);
        }, insert: function(e2) {
          return this.table.addData(e2);
        } }, q = { table: function(e2) {
          var t2 = [], i2 = true, s2 = this.table.columnManager.columns, o2 = [], n2 = [];
          return (e2 = e2.split("\n")).forEach(function(e3) {
            t2.push(e3.split("	"));
          }), !(!t2.length || 1 === t2.length && t2[0].length < 2) && (t2[0].forEach(function(e3) {
            var t3 = s2.find(function(t4) {
              return e3 && t4.definition.title && e3.trim() && t4.definition.title.trim() === e3.trim();
            });
            t3 ? o2.push(t3) : i2 = false;
          }), i2 || (i2 = true, o2 = [], t2[0].forEach(function(e3) {
            var t3 = s2.find(function(t4) {
              return e3 && t4.field && e3.trim() && t4.field.trim() === e3.trim();
            });
            t3 ? o2.push(t3) : i2 = false;
          }), i2 || (o2 = this.table.columnManager.columnsByIndex)), i2 && t2.shift(), t2.forEach(function(e3) {
            var t3 = {};
            e3.forEach(function(e4, i3) {
              o2[i3] && (t3[o2[i3].field] = e4);
            }), n2.push(t3);
          }), n2);
        } }, K = { keybindings: { bindings: { copyToClipboard: ["ctrl + 67", "meta + 67"] }, actions: { copyToClipboard: function(e2) {
          this.table.modules.edit.currentCell || this.table.modExists("clipboard", true) && this.table.modules.clipboard.copy(false, true);
        } } } };
        const _Y = class extends M {
          constructor(e2) {
            super(e2), this.mode = true, this.pasteParser = function() {
            }, this.pasteAction = function() {
            }, this.customSelection = false, this.rowRange = false, this.blocked = true, this.registerTableOption("clipboard", false), this.registerTableOption("clipboardCopyStyled", true), this.registerTableOption("clipboardCopyConfig", false), this.registerTableOption("clipboardCopyFormatter", false), this.registerTableOption("clipboardCopyRowRange", "active"), this.registerTableOption("clipboardPasteParser", "table"), this.registerTableOption("clipboardPasteAction", "insert"), this.registerColumnOption("clipboard"), this.registerColumnOption("titleClipboard");
          }
          initialize() {
            this.mode = this.table.options.clipboard, this.rowRange = this.table.options.clipboardCopyRowRange, true !== this.mode && "copy" !== this.mode || this.table.element.addEventListener("copy", (e2) => {
              var t2, i2, s2;
              this.blocked || (e2.preventDefault(), this.customSelection ? (t2 = this.customSelection, this.table.options.clipboardCopyFormatter && (t2 = this.table.options.clipboardCopyFormatter("plain", t2))) : (s2 = this.table.modules.export.generateExportList(this.table.options.clipboardCopyConfig, this.table.options.clipboardCopyStyled, this.rowRange, "clipboard"), t2 = (i2 = this.table.modules.export.generateHTMLTable(s2)) ? this.generatePlainContent(s2) : "", this.table.options.clipboardCopyFormatter && (t2 = this.table.options.clipboardCopyFormatter("plain", t2), i2 = this.table.options.clipboardCopyFormatter("html", i2))), window.clipboardData && window.clipboardData.setData ? window.clipboardData.setData("Text", t2) : e2.clipboardData && e2.clipboardData.setData ? (e2.clipboardData.setData("text/plain", t2), i2 && e2.clipboardData.setData("text/html", i2)) : e2.originalEvent && e2.originalEvent.clipboardData.setData && (e2.originalEvent.clipboardData.setData("text/plain", t2), i2 && e2.originalEvent.clipboardData.setData("text/html", i2)), this.dispatchExternal("clipboardCopied", t2, i2), this.reset());
            }), true !== this.mode && "paste" !== this.mode || this.table.element.addEventListener("paste", (e2) => {
              this.paste(e2);
            }), this.setPasteParser(this.table.options.clipboardPasteParser), this.setPasteAction(this.table.options.clipboardPasteAction), this.registerTableFunction("copyToClipboard", this.copy.bind(this));
          }
          reset() {
            this.blocked = true, this.customSelection = false;
          }
          generatePlainContent(e2) {
            var t2 = [];
            return e2.forEach((e3) => {
              var i2 = [];
              e3.columns.forEach((t3) => {
                var s2 = "";
                if (t3)
                  if ("group" === e3.type && (t3.value = t3.component.getKey()), null === t3.value)
                    s2 = "";
                  else
                    switch (typeof t3.value) {
                      case "object":
                        s2 = JSON.stringify(t3.value);
                        break;
                      case "undefined":
                        s2 = "";
                        break;
                      default:
                        s2 = t3.value;
                    }
                i2.push(s2);
              }), t2.push(i2.join("	"));
            }), t2.join("\n");
          }
          copy(e2, t2) {
            var i2, s2;
            this.blocked = false, this.customSelection = false, true !== this.mode && "copy" !== this.mode || (this.rowRange = e2 || this.table.options.clipboardCopyRowRange, void 0 !== window.getSelection && void 0 !== document.createRange ? ((e2 = document.createRange()).selectNodeContents(this.table.element), (i2 = window.getSelection()).toString() && t2 && (this.customSelection = i2.toString()), i2.removeAllRanges(), i2.addRange(e2)) : void 0 !== document.selection && void 0 !== document.body.createTextRange && ((s2 = document.body.createTextRange()).moveToElementText(this.table.element), s2.select()), document.execCommand("copy"), i2 && i2.removeAllRanges());
          }
          setPasteAction(e2) {
            switch (typeof e2) {
              case "string":
                this.pasteAction = _Y.pasteActions[e2], this.pasteAction || console.warn("Clipboard Error - No such paste action found:", e2);
                break;
              case "function":
                this.pasteAction = e2;
            }
          }
          setPasteParser(e2) {
            switch (typeof e2) {
              case "string":
                this.pasteParser = _Y.pasteParsers[e2], this.pasteParser || console.warn("Clipboard Error - No such paste parser found:", e2);
                break;
              case "function":
                this.pasteParser = e2;
            }
          }
          paste(e2) {
            var t2, i2, s2;
            this.checkPasteOrigin(e2) && (t2 = this.getPasteData(e2), (i2 = this.pasteParser.call(this, t2)) ? (e2.preventDefault(), this.table.modExists("mutator") && (i2 = this.mutateData(i2)), s2 = this.pasteAction.call(this, i2), this.dispatchExternal("clipboardPasted", t2, i2, s2)) : this.dispatchExternal("clipboardPasteError", t2));
          }
          mutateData(e2) {
            var t2 = [];
            return Array.isArray(e2) ? e2.forEach((e3) => {
              t2.push(this.table.modules.mutator.transformRow(e3, "clipboard"));
            }) : t2 = e2, t2;
          }
          checkPasteOrigin(e2) {
            var t2 = true;
            return !this.confirm("clipboard-paste", [e2]) && ["DIV", "SPAN"].includes(e2.target.tagName) || (t2 = false), t2;
          }
          getPasteData(e2) {
            var t2;
            return window.clipboardData && window.clipboardData.getData ? t2 = window.clipboardData.getData("Text") : e2.clipboardData && e2.clipboardData.getData ? t2 = e2.clipboardData.getData("text/plain") : e2.originalEvent && e2.originalEvent.clipboardData.getData && (t2 = e2.originalEvent.clipboardData.getData("text/plain")), t2;
          }
        };
        let Y = _Y;
        __publicField(Y, "moduleName", "clipboard");
        __publicField(Y, "moduleExtensions", K);
        __publicField(Y, "pasteActions", J);
        __publicField(Y, "pasteParsers", q);
        class $2 {
          constructor(e2) {
            return this._row = e2, new Proxy(this, { get: function(e3, t2, i2) {
              return void 0 !== e3[t2] ? e3[t2] : e3._row.table.componentFunctionBinder.handle("row", e3._row, t2);
            } });
          }
          getData(e2) {
            return this._row.getData(e2);
          }
          getElement() {
            return this._row.getElement();
          }
          getTable() {
            return this._row.table;
          }
          getCells() {
            var e2 = [];
            return this._row.getCells().forEach(function(t2) {
              e2.push(t2.getComponent());
            }), e2;
          }
          getCell(e2) {
            var t2 = this._row.getCell(e2);
            return !!t2 && t2.getComponent();
          }
          _getSelf() {
            return this._row;
          }
        }
        var Q = { avg: function(e2, t2, i2) {
          var s2 = 0, o2 = void 0 !== i2.precision ? i2.precision : 2;
          return e2.length && (s2 = e2.reduce(function(e3, t3) {
            return Number(e3) + Number(t3);
          }), s2 /= e2.length, s2 = false !== o2 ? s2.toFixed(o2) : s2), parseFloat(s2).toString();
        }, max: function(e2, t2, i2) {
          var s2 = null, o2 = void 0 !== i2.precision && i2.precision;
          return e2.forEach(function(e3) {
            ((e3 = Number(e3)) > s2 || null === s2) && (s2 = e3);
          }), null !== s2 ? false !== o2 ? s2.toFixed(o2) : s2 : "";
        }, min: function(e2, t2, i2) {
          var s2 = null, o2 = void 0 !== i2.precision && i2.precision;
          return e2.forEach(function(e3) {
            ((e3 = Number(e3)) < s2 || null === s2) && (s2 = e3);
          }), null !== s2 ? false !== o2 ? s2.toFixed(o2) : s2 : "";
        }, sum: function(e2, t2, i2) {
          var s2 = 0, o2 = void 0 !== i2.precision && i2.precision;
          return e2.length && e2.forEach(function(e3) {
            e3 = Number(e3), s2 += isNaN(e3) ? 0 : Number(e3);
          }), false !== o2 ? s2.toFixed(o2) : s2;
        }, concat: function(e2, t2, i2) {
          var s2 = 0;
          return e2.length && (s2 = e2.reduce(function(e3, t3) {
            return String(e3) + String(t3);
          })), s2;
        }, count: function(e2, t2, i2) {
          var s2 = 0;
          return e2.length && e2.forEach(function(e3) {
            e3 && s2++;
          }), s2;
        }, unique: function(e2, t2, i2) {
          return e2.filter((t3, i3) => (e2 || 0 === t3) && e2.indexOf(t3) === i3).length;
        } };
        const _Z = class extends M {
          constructor(e2) {
            super(e2), this.topCalcs = [], this.botCalcs = [], this.genColumn = false, this.topElement = this.createElement(), this.botElement = this.createElement(), this.topRow = false, this.botRow = false, this.topInitialized = false, this.botInitialized = false, this.blocked = false, this.recalcAfterBlock = false, this.registerTableOption("columnCalcs", true), this.registerColumnOption("topCalc"), this.registerColumnOption("topCalcParams"), this.registerColumnOption("topCalcFormatter"), this.registerColumnOption("topCalcFormatterParams"), this.registerColumnOption("bottomCalc"), this.registerColumnOption("bottomCalcParams"), this.registerColumnOption("bottomCalcFormatter"), this.registerColumnOption("bottomCalcFormatterParams");
          }
          createElement() {
            var e2 = document.createElement("div");
            return e2.classList.add("tabulator-calcs-holder"), e2;
          }
          initialize() {
            this.genColumn = new r({ field: "value" }, this), this.subscribe("cell-value-changed", this.cellValueChanged.bind(this)), this.subscribe("column-init", this.initializeColumnCheck.bind(this)), this.subscribe("row-deleted", this.rowsUpdated.bind(this)), this.subscribe("scroll-horizontal", this.scrollHorizontal.bind(this)), this.subscribe("row-added", this.rowsUpdated.bind(this)), this.subscribe("column-moved", this.recalcActiveRows.bind(this)), this.subscribe("column-add", this.recalcActiveRows.bind(this)), this.subscribe("data-refreshed", this.recalcActiveRowsRefresh.bind(this)), this.subscribe("table-redraw", this.tableRedraw.bind(this)), this.subscribe("rows-visible", this.visibleRows.bind(this)), this.subscribe("scrollbar-vertical", this.adjustForScrollbar.bind(this)), this.subscribe("redraw-blocked", this.blockRedraw.bind(this)), this.subscribe("redraw-restored", this.restoreRedraw.bind(this)), this.subscribe("table-redrawing", this.resizeHolderWidth.bind(this)), this.subscribe("column-resized", this.resizeHolderWidth.bind(this)), this.subscribe("column-show", this.resizeHolderWidth.bind(this)), this.subscribe("column-hide", this.resizeHolderWidth.bind(this)), this.registerTableFunction("getCalcResults", this.getResults.bind(this)), this.registerTableFunction("recalc", this.userRecalc.bind(this)), this.resizeHolderWidth();
          }
          resizeHolderWidth() {
            this.topElement.style.minWidth = this.table.columnManager.headersElement.offsetWidth + "px";
          }
          tableRedraw(e2) {
            this.recalc(this.table.rowManager.activeRows), e2 && this.redraw();
          }
          blockRedraw() {
            this.blocked = true, this.recalcAfterBlock = false;
          }
          restoreRedraw() {
            this.blocked = false, this.recalcAfterBlock && (this.recalcAfterBlock = false, this.recalcActiveRowsRefresh());
          }
          userRecalc() {
            this.recalc(this.table.rowManager.activeRows);
          }
          blockCheck() {
            return this.blocked && (this.recalcAfterBlock = true), this.blocked;
          }
          visibleRows(e2, t2) {
            return this.topRow && t2.unshift(this.topRow), this.botRow && t2.push(this.botRow), t2;
          }
          rowsUpdated(e2) {
            this.table.options.groupBy ? this.recalcRowGroup(e2) : this.recalcActiveRows();
          }
          recalcActiveRowsRefresh() {
            this.table.options.groupBy && this.table.options.dataTreeStartExpanded && this.table.options.dataTree ? this.recalcAll() : this.recalcActiveRows();
          }
          recalcActiveRows() {
            this.recalc(this.table.rowManager.activeRows);
          }
          cellValueChanged(e2) {
            (e2.column.definition.topCalc || e2.column.definition.bottomCalc) && (this.table.options.groupBy ? ("table" != this.table.options.columnCalcs && "both" != this.table.options.columnCalcs || this.recalcActiveRows(), "table" != this.table.options.columnCalcs && this.recalcRowGroup(e2.row)) : this.recalcActiveRows());
          }
          initializeColumnCheck(e2) {
            (e2.definition.topCalc || e2.definition.bottomCalc) && this.initializeColumn(e2);
          }
          initializeColumn(e2) {
            var t2 = e2.definition, i2 = { topCalcParams: t2.topCalcParams || {}, botCalcParams: t2.bottomCalcParams || {} };
            if (t2.topCalc) {
              switch (typeof t2.topCalc) {
                case "string":
                  _Z.calculations[t2.topCalc] ? i2.topCalc = _Z.calculations[t2.topCalc] : console.warn("Column Calc Error - No such calculation found, ignoring: ", t2.topCalc);
                  break;
                case "function":
                  i2.topCalc = t2.topCalc;
              }
              i2.topCalc && (e2.modules.columnCalcs = i2, this.topCalcs.push(e2), "group" != this.table.options.columnCalcs && this.initializeTopRow());
            }
            if (t2.bottomCalc) {
              switch (typeof t2.bottomCalc) {
                case "string":
                  _Z.calculations[t2.bottomCalc] ? i2.botCalc = _Z.calculations[t2.bottomCalc] : console.warn("Column Calc Error - No such calculation found, ignoring: ", t2.bottomCalc);
                  break;
                case "function":
                  i2.botCalc = t2.bottomCalc;
              }
              i2.botCalc && (e2.modules.columnCalcs = i2, this.botCalcs.push(e2), "group" != this.table.options.columnCalcs && this.initializeBottomRow());
            }
          }
          registerColumnField() {
          }
          removeCalcs() {
            var e2 = false;
            this.topInitialized && (this.topInitialized = false, this.topElement.parentNode.removeChild(this.topElement), e2 = true), this.botInitialized && (this.botInitialized = false, this.footerRemove(this.botElement), e2 = true), e2 && this.table.rowManager.adjustTableSize();
          }
          reinitializeCalcs() {
            this.topCalcs.length && this.initializeTopRow(), this.botCalcs.length && this.initializeBottomRow();
          }
          initializeTopRow() {
            var e2 = document.createDocumentFragment();
            this.topInitialized || (e2.appendChild(document.createElement("br")), e2.appendChild(this.topElement), this.table.columnManager.getContentsElement().insertBefore(e2, this.table.columnManager.headersElement.nextSibling), this.topInitialized = true);
          }
          initializeBottomRow() {
            this.botInitialized || (this.footerPrepend(this.botElement), this.botInitialized = true);
          }
          scrollHorizontal(e2) {
            this.botInitialized && this.botRow && (this.botElement.scrollLeft = e2);
          }
          recalc(e2) {
            var t2, i2;
            if (!this.blockCheck() && (this.topInitialized || this.botInitialized)) {
              if (t2 = this.rowsToData(e2), this.topInitialized) {
                for (this.topRow && this.topRow.deleteCells(), i2 = this.generateRow("top", t2), this.topRow = i2; this.topElement.firstChild; )
                  this.topElement.removeChild(this.topElement.firstChild);
                this.topElement.appendChild(i2.getElement()), i2.initialize(true);
              }
              if (this.botInitialized) {
                for (this.botRow && this.botRow.deleteCells(), i2 = this.generateRow("bottom", t2), this.botRow = i2; this.botElement.firstChild; )
                  this.botElement.removeChild(this.botElement.firstChild);
                this.botElement.appendChild(i2.getElement()), i2.initialize(true);
              }
              this.table.rowManager.adjustTableSize(), this.table.modExists("frozenColumns") && this.table.modules.frozenColumns.layout();
            }
          }
          recalcRowGroup(e2) {
            this.recalcGroup(this.table.modules.groupRows.getRowGroup(e2));
          }
          recalcAll() {
            (this.topCalcs.length || this.botCalcs.length) && ("group" !== this.table.options.columnCalcs && this.recalcActiveRows(), this.table.options.groupBy && "table" !== this.table.options.columnCalcs && this.table.modules.groupRows.getChildGroups().forEach((e2) => {
              this.recalcGroup(e2);
            }));
          }
          recalcGroup(e2) {
            var t2, i2;
            this.blockCheck() || e2 && e2.calcs && (e2.calcs.bottom && (t2 = this.rowsToData(e2.rows), i2 = this.generateRowData("bottom", t2), e2.calcs.bottom.updateData(i2), e2.calcs.bottom.reinitialize()), e2.calcs.top && (t2 = this.rowsToData(e2.rows), i2 = this.generateRowData("top", t2), e2.calcs.top.updateData(i2), e2.calcs.top.reinitialize()));
          }
          generateTopRow(e2) {
            return this.generateRow("top", this.rowsToData(e2));
          }
          generateBottomRow(e2) {
            return this.generateRow("bottom", this.rowsToData(e2));
          }
          rowsToData(e2) {
            var t2 = [], i2 = this.table.options.dataTree && this.table.options.dataTreeChildColumnCalcs, s2 = this.table.modules.dataTree;
            return e2.forEach((e3) => {
              var _a2;
              t2.push(e3.getData()), i2 && ((_a2 = e3.modules.dataTree) == null ? void 0 : _a2.open) && this.rowsToData(s2.getFilteredTreeChildren(e3)).forEach((i3) => {
                t2.push(e3);
              });
            }), t2;
          }
          generateRow(e2, t2) {
            var i2, s2 = this.generateRowData(e2, t2);
            return this.table.modExists("mutator") && this.table.modules.mutator.disable(), i2 = new p(s2, this, "calc"), this.table.modExists("mutator") && this.table.modules.mutator.enable(), i2.getElement().classList.add("tabulator-calcs", "tabulator-calcs-" + e2), i2.component = false, i2.getComponent = () => (i2.component || (i2.component = new $2(i2)), i2.component), i2.generateCells = () => {
              var t3 = [];
              this.table.columnManager.columnsByIndex.forEach((s3) => {
                this.genColumn.setField(s3.getField()), this.genColumn.hozAlign = s3.hozAlign, s3.definition[e2 + "CalcFormatter"] && this.table.modExists("format") ? this.genColumn.modules.format = { formatter: this.table.modules.format.getFormatter(s3.definition[e2 + "CalcFormatter"]), params: s3.definition[e2 + "CalcFormatterParams"] || {} } : this.genColumn.modules.format = { formatter: this.table.modules.format.getFormatter("plaintext"), params: {} }, this.genColumn.definition.cssClass = s3.definition.cssClass;
                var o2 = new n(this.genColumn, i2);
                o2.getElement(), o2.column = s3, o2.setWidth(), s3.cells.push(o2), t3.push(o2), s3.visible || o2.hide();
              }), i2.cells = t3;
            }, i2;
          }
          generateRowData(e2, t2) {
            var i2, s2, o2 = {}, n2 = "top" == e2 ? this.topCalcs : this.botCalcs, r2 = "top" == e2 ? "topCalc" : "botCalc";
            return n2.forEach(function(e3) {
              var n3 = [];
              e3.modules.columnCalcs && e3.modules.columnCalcs[r2] && (t2.forEach(function(t3) {
                n3.push(e3.getFieldValue(t3));
              }), s2 = r2 + "Params", i2 = "function" == typeof e3.modules.columnCalcs[s2] ? e3.modules.columnCalcs[s2](n3, t2) : e3.modules.columnCalcs[s2], e3.setFieldValue(o2, e3.modules.columnCalcs[r2](n3, t2, i2)));
            }), o2;
          }
          hasTopCalcs() {
            return !!this.topCalcs.length;
          }
          hasBottomCalcs() {
            return !!this.botCalcs.length;
          }
          redraw() {
            this.topRow && this.topRow.normalizeHeight(true), this.botRow && this.botRow.normalizeHeight(true);
          }
          getResults() {
            var e2 = {};
            return this.table.options.groupBy && this.table.modExists("groupRows") ? this.table.modules.groupRows.getGroups(true).forEach((t2) => {
              e2[t2.getKey()] = this.getGroupResults(t2);
            }) : e2 = { top: this.topRow ? this.topRow.getData() : {}, bottom: this.botRow ? this.botRow.getData() : {} }, e2;
          }
          getGroupResults(e2) {
            var t2 = e2._getSelf(), i2 = e2.getSubGroups(), s2 = {};
            return i2.forEach((e3) => {
              s2[e3.getKey()] = this.getGroupResults(e3);
            }), { top: t2.calcs.top ? t2.calcs.top.getData() : {}, bottom: t2.calcs.bottom ? t2.calcs.bottom.getData() : {}, groups: s2 };
          }
          adjustForScrollbar(e2) {
            this.botRow && (this.table.rtl ? this.botElement.style.paddingLeft = e2 + "px" : this.botElement.style.paddingRight = e2 + "px");
          }
        };
        let Z = _Z;
        __publicField(Z, "moduleName", "columnCalcs");
        __publicField(Z, "calculations", Q);
        var ee = { csv: function(e2, t2 = {}, i2) {
          var s2 = t2.delimiter ? t2.delimiter : ",", o2 = [], n2 = [];
          e2.forEach((e3) => {
            var t3 = [];
            switch (e3.type) {
              case "group":
                console.warn("Download Warning - CSV downloader cannot process row groups");
                break;
              case "calc":
                console.warn("Download Warning - CSV downloader cannot process column calculations");
                break;
              case "header":
                e3.columns.forEach((e4, t4) => {
                  e4 && 1 === e4.depth && (n2[t4] = void 0 === e4.value || null === e4.value ? "" : '"' + String(e4.value).split('"').join('""') + '"');
                });
                break;
              case "row":
                e3.columns.forEach((e4) => {
                  if (e4) {
                    switch (typeof e4.value) {
                      case "object":
                        e4.value = null !== e4.value ? JSON.stringify(e4.value) : "";
                        break;
                      case "undefined":
                        e4.value = "";
                    }
                    t3.push('"' + String(e4.value).split('"').join('""') + '"');
                  }
                }), o2.push(t3.join(s2));
            }
          }), n2.length && o2.unshift(n2.join(s2)), o2 = o2.join("\n"), t2.bom && (o2 = "\uFEFF" + o2), i2(o2, "text/csv");
        }, json: function(e2, t2, i2) {
          var s2 = [];
          e2.forEach((e3) => {
            var t3 = {};
            switch (e3.type) {
              case "header":
                break;
              case "group":
                console.warn("Download Warning - JSON downloader cannot process row groups");
                break;
              case "calc":
                console.warn("Download Warning - JSON downloader cannot process column calculations");
                break;
              case "row":
                e3.columns.forEach((e4) => {
                  e4 && (t3[e4.component.getTitleDownload() || e4.component.getField()] = e4.value);
                }), s2.push(t3);
            }
          }), i2(s2 = JSON.stringify(s2, null, "	"), "application/json");
        }, jsonLines: function(e2, t2, i2) {
          const s2 = [];
          e2.forEach((e3) => {
            const t3 = {};
            switch (e3.type) {
              case "header":
                break;
              case "group":
                console.warn("Download Warning - JSON downloader cannot process row groups");
                break;
              case "calc":
                console.warn("Download Warning - JSON downloader cannot process column calculations");
                break;
              case "row":
                e3.columns.forEach((e4) => {
                  e4 && (t3[e4.component.getTitleDownload() || e4.component.getField()] = e4.value);
                }), s2.push(JSON.stringify(t3));
            }
          }), i2(s2.join("\n"), "application/x-ndjson");
        }, pdf: function(e2, t2 = {}, i2) {
          var s2 = [], o2 = [], n2 = {}, r2 = t2.rowGroupStyles || { fontStyle: "bold", fontSize: 12, cellPadding: 6, fillColor: 220 }, a2 = t2.rowCalcStyles || { fontStyle: "bold", fontSize: 10, cellPadding: 4, fillColor: 232 }, l2 = t2.jsPDF || {}, h2 = t2.title ? t2.title : "";
          function d2(e3, t3) {
            var i3 = [];
            return e3.columns.forEach((e4) => {
              var s3;
              if (e4) {
                switch (typeof e4.value) {
                  case "object":
                    e4.value = null !== e4.value ? JSON.stringify(e4.value) : "";
                    break;
                  case "undefined":
                    e4.value = "";
                }
                s3 = { content: e4.value, colSpan: e4.width, rowSpan: e4.height }, t3 && (s3.styles = t3), i3.push(s3);
              }
            }), i3;
          }
          l2.orientation || (l2.orientation = t2.orientation || "landscape"), l2.unit || (l2.unit = "pt"), e2.forEach((e3) => {
            switch (e3.type) {
              case "header":
                s2.push(d2(e3));
                break;
              case "group":
                o2.push(d2(e3, r2));
                break;
              case "calc":
                o2.push(d2(e3, a2));
                break;
              case "row":
                o2.push(d2(e3));
            }
          });
          var c2 = new jspdf.jsPDF(l2);
          t2.autoTable && (n2 = "function" == typeof t2.autoTable ? t2.autoTable(c2) || {} : t2.autoTable), h2 && (n2.didDrawPage = function(e3) {
            c2.text(h2, 40, 30);
          }), n2.head = s2, n2.body = o2, c2.autoTable(n2), t2.documentProcessing && t2.documentProcessing(c2), i2(c2.output("arraybuffer"), "application/pdf");
        }, xlsx: function(e2, i2, s2) {
          var o2 = i2.sheetName || "Sheet1", n2 = XLSX.utils.book_new(), r2 = new t(this), a2 = !("compress" in i2) || i2.compress, l2 = i2.writeOptions || { bookType: "xlsx", bookSST: true, compression: a2 };
          function h2() {
            var t2 = [], i3 = [], s3 = {}, o3 = { s: { c: 0, r: 0 }, e: { c: e2[0] ? e2[0].columns.reduce((e3, t3) => e3 + (t3 && t3.width ? t3.width : 1), 0) : 0, r: e2.length } };
            return e2.forEach((e3, s4) => {
              var o4 = [];
              e3.columns.forEach(function(e4, t3) {
                e4 ? (o4.push(e4.value instanceof Date || "object" != typeof e4.value ? e4.value : JSON.stringify(e4.value)), (e4.width > 1 || e4.height > -1) && (e4.height > 1 || e4.width > 1) && i3.push({ s: { r: s4, c: t3 }, e: { r: s4 + e4.height - 1, c: t3 + e4.width - 1 } })) : o4.push("");
              }), t2.push(o4);
            }), XLSX.utils.sheet_add_aoa(s3, t2), s3["!ref"] = XLSX.utils.encode_range(o3), i3.length && (s3["!merges"] = i3), s3;
          }
          if (l2.type = "binary", n2.SheetNames = [], n2.Sheets = {}, i2.sheetOnly)
            s2(h2());
          else {
            if (i2.sheets)
              for (var d2 in i2.sheets)
                true === i2.sheets[d2] ? (n2.SheetNames.push(d2), n2.Sheets[d2] = h2()) : (n2.SheetNames.push(d2), r2.commsSend(i2.sheets[d2], "download", "intercept", { type: "xlsx", options: { sheetOnly: true }, active: this.active, intercept: function(e3) {
                  n2.Sheets[d2] = e3;
                } }));
            else
              n2.SheetNames.push(o2), n2.Sheets[o2] = h2();
            i2.documentProcessing && (n2 = i2.documentProcessing(n2)), s2(function(e3) {
              for (var t2 = new ArrayBuffer(e3.length), i3 = new Uint8Array(t2), s3 = 0; s3 != e3.length; ++s3)
                i3[s3] = 255 & e3.charCodeAt(s3);
              return t2;
            }(XLSX.write(n2, l2)), "application/octet-stream");
          }
        }, html: function(e2, t2, i2) {
          this.modExists("export", true) && i2(this.modules.export.generateHTMLTable(e2), "text/html");
        } };
        const _te = class extends M {
          constructor(e2) {
            super(e2), this.registerTableOption("downloadEncoder", function(e3, t2) {
              return new Blob([e3], { type: t2 });
            }), this.registerTableOption("downloadConfig", {}), this.registerTableOption("downloadRowRange", "active"), this.registerColumnOption("download"), this.registerColumnOption("titleDownload");
          }
          initialize() {
            this.deprecatedOptionsCheck(), this.registerTableFunction("download", this.download.bind(this)), this.registerTableFunction("downloadToTab", this.downloadToTab.bind(this));
          }
          deprecatedOptionsCheck() {
          }
          downloadToTab(e2, t2, i2, s2) {
            this.download(e2, t2, i2, s2, true);
          }
          download(e2, t2, i2, s2, o2) {
            var n2 = false;
            if ("function" == typeof e2 ? n2 = e2 : _te.downloaders[e2] ? n2 = _te.downloaders[e2] : console.warn("Download Error - No such download type found: ", e2), n2) {
              var r2 = this.generateExportList(s2);
              n2.call(this.table, r2, i2 || {}, function(i3, s3) {
                o2 ? true === o2 ? this.triggerDownload(i3, s3, e2, t2, true) : o2(i3) : this.triggerDownload(i3, s3, e2, t2);
              }.bind(this));
            }
          }
          generateExportList(e2) {
            var t2 = this.table.modules.export.generateExportList(this.table.options.downloadConfig, false, e2 || this.table.options.downloadRowRange, "download"), i2 = this.table.options.groupHeaderDownload;
            return i2 && !Array.isArray(i2) && (i2 = [i2]), t2.forEach((e3) => {
              var t3;
              "group" === e3.type && (t3 = e3.columns[0], i2 && i2[e3.indent] && (t3.value = i2[e3.indent](t3.value, e3.component._group.getRowCount(), e3.component._group.getData(), e3.component)));
            }), t2;
          }
          triggerDownload(e2, t2, i2, s2, o2) {
            var n2 = document.createElement("a"), r2 = this.table.options.downloadEncoder(e2, t2);
            r2 && (o2 ? window.open(window.URL.createObjectURL(r2)) : (s2 = s2 || "Tabulator." + ("function" == typeof i2 ? "txt" : i2), navigator.msSaveOrOpenBlob ? navigator.msSaveOrOpenBlob(r2, s2) : (n2.setAttribute("href", window.URL.createObjectURL(r2)), n2.setAttribute("download", s2), n2.style.display = "none", document.body.appendChild(n2), n2.click(), document.body.removeChild(n2))), this.dispatchExternal("downloadComplete"));
          }
          commsReceived(e2, t2, i2) {
            if ("intercept" === t2)
              this.download(i2.type, "", i2.options, i2.active, i2.intercept);
          }
        };
        let te = _te;
        __publicField(te, "moduleName", "download");
        __publicField(te, "downloaders", ee);
        function ie(e2, t2) {
          var i2 = t2.mask, s2 = void 0 !== t2.maskLetterChar ? t2.maskLetterChar : "A", o2 = void 0 !== t2.maskNumberChar ? t2.maskNumberChar : "9", n2 = void 0 !== t2.maskWildcardChar ? t2.maskWildcardChar : "*";
          function r2(t3) {
            var a2 = i2[t3];
            void 0 !== a2 && a2 !== n2 && a2 !== s2 && a2 !== o2 && (e2.value = e2.value + "" + a2, r2(t3 + 1));
          }
          e2.addEventListener("keydown", (t3) => {
            var r3 = e2.value.length, a2 = t3.key;
            if (t3.keyCode > 46 && !t3.ctrlKey && !t3.metaKey) {
              if (r3 >= i2.length)
                return t3.preventDefault(), t3.stopPropagation(), false;
              switch (i2[r3]) {
                case s2:
                  if (a2.toUpperCase() == a2.toLowerCase())
                    return t3.preventDefault(), t3.stopPropagation(), false;
                  break;
                case o2:
                  if (isNaN(a2))
                    return t3.preventDefault(), t3.stopPropagation(), false;
                  break;
                case n2:
                  break;
                default:
                  if (a2 !== i2[r3])
                    return t3.preventDefault(), t3.stopPropagation(), false;
              }
            }
          }), e2.addEventListener("keyup", (i3) => {
            i3.keyCode > 46 && t2.maskAutoFill && r2(e2.value.length);
          }), e2.placeholder || (e2.placeholder = i2), t2.maskAutoFill && r2(e2.value.length);
        }
        let se = class {
          constructor(e2, t2, i2, s2, o2, n2) {
            this.edit = e2, this.table = e2.table, this.cell = t2, this.params = this._initializeParams(n2), this.data = [], this.displayItems = [], this.currentItems = [], this.focusedItem = null, this.input = this._createInputElement(), this.listEl = this._createListElement(), this.initialValues = null, this.isFilter = "header" === t2.getType(), this.filterTimeout = null, this.filtered = false, this.typing = false, this.values = [], this.popup = null, this.listIteration = 0, this.lastAction = "", this.filterTerm = "", this.blurable = true, this.actions = { success: s2, cancel: o2 }, this._deprecatedOptionsCheck(), this._initializeValue(), i2(this._onRendered.bind(this));
          }
          _deprecatedOptionsCheck() {
          }
          _initializeValue() {
            var e2 = this.cell.getValue();
            void 0 === e2 && void 0 !== this.params.defaultValue && (e2 = this.params.defaultValue), this.initialValues = this.params.multiselect ? e2 : [e2], this.isFilter && (this.input.value = this.initialValues ? this.initialValues.join(",") : "", this.headerFilterInitialListGen());
          }
          _onRendered() {
            var e2 = this.cell.getElement();
            function t2(e3) {
              e3.stopPropagation();
            }
            this.isFilter || (this.input.style.height = "100%", this.input.focus({ preventScroll: true })), e2.addEventListener("click", t2), setTimeout(() => {
              e2.removeEventListener("click", t2);
            }, 1e3), this.input.addEventListener("mousedown", this._preventPopupBlur.bind(this));
          }
          _createListElement() {
            var e2 = document.createElement("div");
            return e2.classList.add("tabulator-edit-list"), e2.addEventListener("mousedown", this._preventBlur.bind(this)), e2.addEventListener("keydown", this._inputKeyDown.bind(this)), e2;
          }
          _setListWidth() {
            var e2 = this.isFilter ? this.input : this.cell.getElement();
            this.listEl.style.minWidth = e2.offsetWidth + "px", this.params.maxWidth && (true === this.params.maxWidth ? this.listEl.style.maxWidth = e2.offsetWidth + "px" : "number" == typeof this.params.maxWidth ? this.listEl.style.maxWidth = this.params.maxWidth + "px" : this.listEl.style.maxWidth = this.params.maxWidth);
          }
          _createInputElement() {
            var e2 = this.params.elementAttributes, t2 = document.createElement("input");
            if (t2.setAttribute("type", this.params.clearable ? "search" : "text"), t2.style.padding = "4px", t2.style.width = "100%", t2.style.boxSizing = "border-box", this.params.autocomplete || (t2.style.cursor = "default", t2.style.caretColor = "transparent"), e2 && "object" == typeof e2)
              for (let i2 in e2)
                "+" == i2.charAt(0) ? (i2 = i2.slice(1), t2.setAttribute(i2, t2.getAttribute(i2) + e2["+" + i2])) : t2.setAttribute(i2, e2[i2]);
            return this.params.mask && ie(t2, this.params), this._bindInputEvents(t2), t2;
          }
          _initializeParams(e2) {
            var t2, i2 = ["values", "valuesURL", "valuesLookup"];
            return (e2 = Object.assign({}, e2)).verticalNavigation = e2.verticalNavigation || "editor", e2.placeholderLoading = void 0 === e2.placeholderLoading ? "Searching ..." : e2.placeholderLoading, e2.placeholderEmpty = void 0 === e2.placeholderEmpty ? "No Results Found" : e2.placeholderEmpty, e2.filterDelay = void 0 === e2.filterDelay ? 300 : e2.filterDelay, e2.emptyValue = Object.keys(e2).includes("emptyValue") ? e2.emptyValue : "", (t2 = Object.keys(e2).filter((e3) => i2.includes(e3)).length) ? t2 > 1 && console.warn("list editor config error - only one of the values, valuesURL, or valuesLookup options can be set on the same editor") : console.warn("list editor config error - either the values, valuesURL, or valuesLookup option must be set"), e2.autocomplete ? e2.multiselect && (e2.multiselect = false, console.warn("list editor config error - multiselect option is not available when autocomplete is enabled")) : (e2.freetext && (e2.freetext = false, console.warn("list editor config error - freetext option is only available when autocomplete is enabled")), e2.filterFunc && (e2.filterFunc = false, console.warn("list editor config error - filterFunc option is only available when autocomplete is enabled")), e2.filterRemote && (e2.filterRemote = false, console.warn("list editor config error - filterRemote option is only available when autocomplete is enabled")), e2.mask && (e2.mask = false, console.warn("list editor config error - mask option is only available when autocomplete is enabled")), e2.allowEmpty && (e2.allowEmpty = false, console.warn("list editor config error - allowEmpty option is only available when autocomplete is enabled")), e2.listOnEmpty && (e2.listOnEmpty = false, console.warn("list editor config error - listOnEmpty option is only available when autocomplete is enabled"))), e2.filterRemote && "function" != typeof e2.valuesLookup && !e2.valuesURL && (e2.filterRemote = false, console.warn("list editor config error - filterRemote option should only be used when values list is populated from a remote source")), e2;
          }
          _bindInputEvents(e2) {
            e2.addEventListener("focus", this._inputFocus.bind(this)), e2.addEventListener("click", this._inputClick.bind(this)), e2.addEventListener("blur", this._inputBlur.bind(this)), e2.addEventListener("keydown", this._inputKeyDown.bind(this)), e2.addEventListener("search", this._inputSearch.bind(this)), this.params.autocomplete && e2.addEventListener("keyup", this._inputKeyUp.bind(this));
          }
          _inputFocus(e2) {
            this.rebuildOptionsList();
          }
          _filter() {
            this.params.filterRemote ? (clearTimeout(this.filterTimeout), this.filterTimeout = setTimeout(() => {
              this.rebuildOptionsList();
            }, this.params.filterDelay)) : this._filterList();
          }
          _inputClick(e2) {
            e2.stopPropagation();
          }
          _inputBlur(e2) {
            this.blurable && (this.popup ? this.popup.hide() : this._resolveValue(true));
          }
          _inputSearch() {
            this._clearChoices();
          }
          _inputKeyDown(e2) {
            switch (e2.keyCode) {
              case 38:
                this._keyUp(e2);
                break;
              case 40:
                this._keyDown(e2);
                break;
              case 37:
              case 39:
                this._keySide(e2);
                break;
              case 13:
                this._keyEnter();
                break;
              case 27:
                this._keyEsc();
                break;
              case 36:
              case 35:
                this._keyHomeEnd(e2);
                break;
              case 9:
                this._keyTab(e2);
                break;
              default:
                this._keySelectLetter(e2);
            }
          }
          _inputKeyUp(e2) {
            switch (e2.keyCode) {
              case 38:
              case 37:
              case 39:
              case 40:
              case 13:
              case 27:
                break;
              default:
                this._keyAutoCompLetter(e2);
            }
          }
          _preventPopupBlur() {
            this.popup && this.popup.blockHide(), setTimeout(() => {
              this.popup && this.popup.restoreHide();
            }, 10);
          }
          _preventBlur() {
            this.blurable = false, setTimeout(() => {
              this.blurable = true;
            }, 10);
          }
          _keyTab(e2) {
            this.params.autocomplete && "typing" === this.lastAction ? this._resolveValue(true) : this.focusedItem && this._chooseItem(this.focusedItem, true);
          }
          _keyUp(e2) {
            var t2 = this.displayItems.indexOf(this.focusedItem);
            ("editor" == this.params.verticalNavigation || "hybrid" == this.params.verticalNavigation && t2) && (e2.stopImmediatePropagation(), e2.stopPropagation(), e2.preventDefault(), t2 > 0 && this._focusItem(this.displayItems[t2 - 1]));
          }
          _keyDown(e2) {
            var t2 = this.displayItems.indexOf(this.focusedItem);
            ("editor" == this.params.verticalNavigation || "hybrid" == this.params.verticalNavigation && t2 < this.displayItems.length - 1) && (e2.stopImmediatePropagation(), e2.stopPropagation(), e2.preventDefault(), t2 < this.displayItems.length - 1 && (-1 == t2 ? this._focusItem(this.displayItems[0]) : this._focusItem(this.displayItems[t2 + 1])));
          }
          _keySide(e2) {
            this.params.autocomplete || (e2.stopImmediatePropagation(), e2.stopPropagation(), e2.preventDefault());
          }
          _keyEnter(e2) {
            this.params.autocomplete && "typing" === this.lastAction ? this._resolveValue(true) : this.focusedItem && this._chooseItem(this.focusedItem);
          }
          _keyEsc(e2) {
            this._cancel();
          }
          _keyHomeEnd(e2) {
            this.params.autocomplete && e2.stopImmediatePropagation();
          }
          _keySelectLetter(e2) {
            this.params.autocomplete || (e2.preventDefault(), e2.keyCode >= 38 && e2.keyCode <= 90 && this._scrollToValue(e2.keyCode));
          }
          _keyAutoCompLetter(e2) {
            this._filter(), this.lastAction = "typing", this.typing = true;
          }
          _scrollToValue(e2) {
            clearTimeout(this.filterTimeout);
            var t2 = String.fromCharCode(e2).toLowerCase();
            this.filterTerm += t2.toLowerCase();
            var i2 = this.displayItems.find((e3) => void 0 !== e3.label && e3.label.toLowerCase().startsWith(this.filterTerm));
            i2 && this._focusItem(i2), this.filterTimeout = setTimeout(() => {
              this.filterTerm = "";
            }, 800);
          }
          _focusItem(e2) {
            this.lastAction = "focus", this.focusedItem && this.focusedItem.element && this.focusedItem.element.classList.remove("focused"), this.focusedItem = e2, e2 && e2.element && (e2.element.classList.add("focused"), e2.element.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" }));
          }
          headerFilterInitialListGen() {
            this._generateOptions(true);
          }
          rebuildOptionsList() {
            this._generateOptions().then(this._sortOptions.bind(this)).then(this._buildList.bind(this)).then(this._showList.bind(this)).catch((e2) => {
              Number.isInteger(e2) || console.error("List generation error", e2);
            });
          }
          _filterList() {
            this._buildList(this._filterOptions()), this._showList();
          }
          _generateOptions(e2) {
            var t2 = [], i2 = ++this.listIteration;
            return this.filtered = false, this.params.values ? t2 = this.params.values : this.params.valuesURL ? t2 = this._ajaxRequest(this.params.valuesURL, this.input.value) : "function" == typeof this.params.valuesLookup ? t2 = this.params.valuesLookup(this.cell, this.input.value) : this.params.valuesLookup && (t2 = this._uniqueColumnValues(this.params.valuesLookupField)), t2 instanceof Promise ? (e2 || this._addPlaceholder(this.params.placeholderLoading), t2.then().then((e3) => this.listIteration === i2 ? this._parseList(e3) : Promise.reject(i2))) : Promise.resolve(this._parseList(t2));
          }
          _addPlaceholder(e2) {
            var t2 = document.createElement("div");
            "function" == typeof e2 && (e2 = e2(this.cell.getComponent(), this.listEl)), e2 && (this._clearList(), e2 instanceof HTMLElement ? t2 = e2 : (t2.classList.add("tabulator-edit-list-placeholder"), t2.innerHTML = e2), this.listEl.appendChild(t2), this._showList());
          }
          _ajaxRequest(e2, t2) {
            return e2 = W(e2, {}, this.params.filterRemote ? { term: t2 } : {}), fetch(e2).then((e3) => e3.ok ? e3.json().catch((e4) => (console.warn("List Ajax Load Error - Invalid JSON returned", e4), Promise.reject(e4))) : (console.error("List Ajax Load Error - Connection Error: " + e3.status, e3.statusText), Promise.reject(e3))).catch((e3) => (console.error("List Ajax Load Error - Connection Error: ", e3), Promise.reject(e3)));
          }
          _uniqueColumnValues(e2) {
            var t2, i2 = {}, s2 = this.table.getData(this.params.valuesLookup);
            return (t2 = e2 ? this.table.columnManager.getColumnByField(e2) : this.cell.getColumn()._getSelf()) ? s2.forEach((e3) => {
              var s3 = t2.getFieldValue(e3);
              null != s3 && "" !== s3 && (i2[s3] = true);
            }) : (console.warn("unable to find matching column to create select lookup list:", e2), i2 = []), Object.keys(i2);
          }
          _parseList(e2) {
            var t2 = [];
            return Array.isArray(e2) || (e2 = Object.entries(e2).map(([e3, t3]) => ({ label: t3, value: e3 }))), e2.forEach((e3) => {
              "object" != typeof e3 && (e3 = { label: e3, value: e3 }), this._parseListItem(e3, t2, 0);
            }), !this.currentItems.length && this.params.freetext && (this.input.value = this.initialValues, this.typing = true, this.lastAction = "typing"), this.data = t2, t2;
          }
          _parseListItem(e2, t2, i2) {
            var s2 = {};
            e2.options ? s2 = this._parseListGroup(e2, i2 + 1) : (s2 = { label: e2.label, value: e2.value, itemParams: e2.itemParams, elementAttributes: e2.elementAttributes, element: false, selected: false, visible: true, level: i2, original: e2 }, this.initialValues && this.initialValues.indexOf(e2.value) > -1 && this._chooseItem(s2, true)), t2.push(s2);
          }
          _parseListGroup(e2, t2) {
            var i2 = { label: e2.label, group: true, itemParams: e2.itemParams, elementAttributes: e2.elementAttributes, element: false, visible: true, level: t2, options: [], original: e2 };
            return e2.options.forEach((e3) => {
              this._parseListItem(e3, i2.options, t2);
            }), i2;
          }
          _sortOptions(e2) {
            var t2;
            return this.params.sort && (t2 = "function" == typeof this.params.sort ? this.params.sort : this._defaultSortFunction.bind(this), this._sortGroup(t2, e2)), e2;
          }
          _sortGroup(e2, t2) {
            t2.sort((t3, i2) => e2(t3.label, i2.label, t3.value, i2.value, t3.original, i2.original)), t2.forEach((t3) => {
              t3.group && this._sortGroup(e2, t3.options);
            });
          }
          _defaultSortFunction(e2, t2) {
            var i2, s2, o2, n2, r2, a2 = 0, l2 = /(\d+)|(\D+)/g, h2 = /\d/, d2 = 0;
            if ("desc" === this.params.sort && ([e2, t2] = [t2, e2]), e2 || 0 === e2) {
              if (t2 || 0 === t2) {
                if (isFinite(e2) && isFinite(t2))
                  return e2 - t2;
                if ((i2 = String(e2).toLowerCase()) === (s2 = String(t2).toLowerCase()))
                  return 0;
                if (!h2.test(i2) || !h2.test(s2))
                  return i2 > s2 ? 1 : -1;
                for (i2 = i2.match(l2), s2 = s2.match(l2), r2 = i2.length > s2.length ? s2.length : i2.length; a2 < r2; )
                  if ((o2 = i2[a2]) !== (n2 = s2[a2++]))
                    return isFinite(o2) && isFinite(n2) ? ("0" === o2.charAt(0) && (o2 = "." + o2), "0" === n2.charAt(0) && (n2 = "." + n2), o2 - n2) : o2 > n2 ? 1 : -1;
                return i2.length > s2.length;
              }
              d2 = 1;
            } else
              d2 = t2 || 0 === t2 ? -1 : 0;
            return d2;
          }
          _filterOptions() {
            var e2 = this.params.filterFunc || this._defaultFilterFunc, t2 = this.input.value;
            return t2 ? (this.filtered = true, this.data.forEach((i2) => {
              this._filterItem(e2, t2, i2);
            })) : this.filtered = false, this.data;
          }
          _filterItem(e2, t2, i2) {
            var s2 = false;
            return i2.group ? (i2.options.forEach((i3) => {
              this._filterItem(e2, t2, i3) && (s2 = true);
            }), i2.visible = s2) : i2.visible = e2(t2, i2.label, i2.value, i2.original), i2.visible;
          }
          _defaultFilterFunc(e2, t2, i2, s2) {
            return e2 = String(e2).toLowerCase(), null != t2 && (String(t2).toLowerCase().indexOf(e2) > -1 || String(i2).toLowerCase().indexOf(e2) > -1);
          }
          _clearList() {
            for (; this.listEl.firstChild; )
              this.listEl.removeChild(this.listEl.firstChild);
            this.displayItems = [];
          }
          _buildList(e2) {
            this._clearList(), e2.forEach((e3) => {
              this._buildItem(e3);
            }), this.displayItems.length || this._addPlaceholder(this.params.placeholderEmpty);
          }
          _buildItem(e2) {
            var t2, i2 = e2.element;
            if (!this.filtered || e2.visible) {
              if (!i2) {
                if ((i2 = document.createElement("div")).tabIndex = 0, (t2 = this.params.itemFormatter ? this.params.itemFormatter(e2.label, e2.value, e2.original, i2) : e2.label) instanceof HTMLElement ? i2.appendChild(t2) : i2.innerHTML = t2, e2.group ? i2.classList.add("tabulator-edit-list-group") : i2.classList.add("tabulator-edit-list-item"), i2.classList.add("tabulator-edit-list-group-level-" + e2.level), e2.elementAttributes && "object" == typeof e2.elementAttributes)
                  for (let t3 in e2.elementAttributes)
                    "+" == t3.charAt(0) ? (t3 = t3.slice(1), i2.setAttribute(t3, this.input.getAttribute(t3) + e2.elementAttributes["+" + t3])) : i2.setAttribute(t3, e2.elementAttributes[t3]);
                e2.group ? i2.addEventListener("click", this._groupClick.bind(this, e2)) : i2.addEventListener("click", this._itemClick.bind(this, e2)), i2.addEventListener("mousedown", this._preventBlur.bind(this)), e2.element = i2;
              }
              this._styleItem(e2), this.listEl.appendChild(i2), e2.group ? e2.options.forEach((e3) => {
                this._buildItem(e3);
              }) : this.displayItems.push(e2);
            }
          }
          _showList() {
            var e2 = this.popup && this.popup.isVisible();
            if (this.input.parentNode) {
              if (this.params.autocomplete && "" === this.input.value && !this.params.listOnEmpty)
                return void (this.popup && this.popup.hide(true));
              this._setListWidth(), this.popup || (this.popup = this.edit.popup(this.listEl)), this.popup.show(this.cell.getElement(), "bottom"), e2 || setTimeout(() => {
                this.popup.hideOnBlur(this._resolveValue.bind(this, true));
              }, 10);
            }
          }
          _styleItem(e2) {
            e2 && e2.element && (e2.selected ? e2.element.classList.add("active") : e2.element.classList.remove("active"));
          }
          _itemClick(e2, t2) {
            t2.stopPropagation(), this._chooseItem(e2);
          }
          _groupClick(e2, t2) {
            t2.stopPropagation();
          }
          _cancel() {
            this.popup.hide(true), this.actions.cancel();
          }
          _clearChoices() {
            this.typing = true, this.currentItems.forEach((e2) => {
              e2.selected = false, this._styleItem(e2);
            }), this.currentItems = [], this.focusedItem = null;
          }
          _chooseItem(e2, t2) {
            var i2;
            this.typing = false, this.params.multiselect ? ((i2 = this.currentItems.indexOf(e2)) > -1 ? (this.currentItems.splice(i2, 1), e2.selected = false) : (this.currentItems.push(e2), e2.selected = true), this.input.value = this.currentItems.map((e3) => e3.label).join(","), this._styleItem(e2)) : (this.currentItems = [e2], e2.selected = true, this.input.value = e2.label, this._styleItem(e2), t2 || this._resolveValue()), this._focusItem(e2);
          }
          _resolveValue(e2) {
            var t2, i2;
            if (this.popup && this.popup.hide(true), this.params.multiselect)
              t2 = this.currentItems.map((e3) => e3.value);
            else if (e2 && this.params.autocomplete && this.typing) {
              if (!(this.params.freetext || this.params.allowEmpty && "" === this.input.value))
                return void this.actions.cancel();
              t2 = this.input.value;
            } else
              t2 = this.currentItems[0] ? this.currentItems[0].value : null == (i2 = Array.isArray(this.initialValues) ? this.initialValues[0] : this.initialValues) || "" === i2 ? i2 : this.params.emptyValue;
            "" === t2 && (t2 = this.params.emptyValue), this.actions.success(t2), this.isFilter && (this.initialValues = t2 && !Array.isArray(t2) ? [t2] : t2, this.currentItems = []);
          }
        };
        var oe = { input: function(e2, t2, i2, s2, o2) {
          var n2 = e2.getValue(), r2 = document.createElement("input");
          if (r2.setAttribute("type", o2.search ? "search" : "text"), r2.style.padding = "4px", r2.style.width = "100%", r2.style.boxSizing = "border-box", o2.elementAttributes && "object" == typeof o2.elementAttributes)
            for (let e3 in o2.elementAttributes)
              "+" == e3.charAt(0) ? (e3 = e3.slice(1), r2.setAttribute(e3, r2.getAttribute(e3) + o2.elementAttributes["+" + e3])) : r2.setAttribute(e3, o2.elementAttributes[e3]);
          function a2(e3) {
            null == n2 && "" !== r2.value || r2.value !== n2 ? i2(r2.value) && (n2 = r2.value) : s2();
          }
          return r2.value = void 0 !== n2 ? n2 : "", t2(function() {
            "cell" === e2.getType() && (r2.focus({ preventScroll: true }), r2.style.height = "100%", o2.selectContents && r2.select());
          }), r2.addEventListener("change", a2), r2.addEventListener("blur", a2), r2.addEventListener("keydown", function(e3) {
            switch (e3.keyCode) {
              case 13:
                a2();
                break;
              case 27:
                s2();
                break;
              case 35:
              case 36:
                e3.stopPropagation();
            }
          }), o2.mask && ie(r2, o2), r2;
        }, textarea: function(e2, t2, i2, s2, o2) {
          var n2 = e2.getValue(), r2 = o2.verticalNavigation || "hybrid", a2 = String(null != n2 ? n2 : ""), l2 = document.createElement("textarea"), h2 = 0;
          if (l2.style.display = "block", l2.style.padding = "2px", l2.style.height = "100%", l2.style.width = "100%", l2.style.boxSizing = "border-box", l2.style.whiteSpace = "pre-wrap", l2.style.resize = "none", o2.elementAttributes && "object" == typeof o2.elementAttributes)
            for (let e3 in o2.elementAttributes)
              "+" == e3.charAt(0) ? (e3 = e3.slice(1), l2.setAttribute(e3, l2.getAttribute(e3) + o2.elementAttributes["+" + e3])) : l2.setAttribute(e3, o2.elementAttributes[e3]);
          function d2(t3) {
            null == n2 && "" !== l2.value || l2.value !== n2 ? (i2(l2.value) && (n2 = l2.value), setTimeout(function() {
              e2.getRow().normalizeHeight();
            }, 300)) : s2();
          }
          return l2.value = a2, t2(function() {
            "cell" === e2.getType() && (l2.focus({ preventScroll: true }), l2.style.height = "100%", l2.scrollHeight, l2.style.height = l2.scrollHeight + "px", e2.getRow().normalizeHeight(), o2.selectContents && l2.select());
          }), l2.addEventListener("change", d2), l2.addEventListener("blur", d2), l2.addEventListener("keyup", function() {
            l2.style.height = "";
            var t3 = l2.scrollHeight;
            l2.style.height = t3 + "px", t3 != h2 && (h2 = t3, e2.getRow().normalizeHeight());
          }), l2.addEventListener("keydown", function(e3) {
            switch (e3.keyCode) {
              case 13:
                e3.shiftKey && o2.shiftEnterSubmit && d2();
                break;
              case 27:
                s2();
                break;
              case 38:
                ("editor" == r2 || "hybrid" == r2 && l2.selectionStart) && (e3.stopImmediatePropagation(), e3.stopPropagation());
                break;
              case 40:
                ("editor" == r2 || "hybrid" == r2 && l2.selectionStart !== l2.value.length) && (e3.stopImmediatePropagation(), e3.stopPropagation());
                break;
              case 35:
              case 36:
                e3.stopPropagation();
            }
          }), o2.mask && ie(l2, o2), l2;
        }, number: function(e2, t2, i2, s2, o2) {
          var n2 = e2.getValue(), r2 = o2.verticalNavigation || "editor", a2 = document.createElement("input");
          if (a2.setAttribute("type", "number"), void 0 !== o2.max && a2.setAttribute("max", o2.max), void 0 !== o2.min && a2.setAttribute("min", o2.min), void 0 !== o2.step && a2.setAttribute("step", o2.step), a2.style.padding = "4px", a2.style.width = "100%", a2.style.boxSizing = "border-box", o2.elementAttributes && "object" == typeof o2.elementAttributes)
            for (let e3 in o2.elementAttributes)
              "+" == e3.charAt(0) ? (e3 = e3.slice(1), a2.setAttribute(e3, a2.getAttribute(e3) + o2.elementAttributes["+" + e3])) : a2.setAttribute(e3, o2.elementAttributes[e3]);
          a2.value = n2;
          var l2 = function(e3) {
            h2();
          };
          function h2() {
            var e3 = a2.value;
            isNaN(e3) || "" === e3 || (e3 = Number(e3)), e3 !== n2 ? i2(e3) && (n2 = e3) : s2();
          }
          return t2(function() {
            "cell" === e2.getType() && (a2.removeEventListener("blur", l2), a2.focus({ preventScroll: true }), a2.style.height = "100%", a2.addEventListener("blur", l2), o2.selectContents && a2.select());
          }), a2.addEventListener("keydown", function(e3) {
            switch (e3.keyCode) {
              case 13:
                h2();
                break;
              case 27:
                s2();
                break;
              case 38:
              case 40:
                "editor" == r2 && (e3.stopImmediatePropagation(), e3.stopPropagation());
                break;
              case 35:
              case 36:
                e3.stopPropagation();
            }
          }), o2.mask && ie(a2, o2), a2;
        }, range: function(e2, t2, i2, s2, o2) {
          var n2 = e2.getValue(), r2 = document.createElement("input");
          if (r2.setAttribute("type", "range"), void 0 !== o2.max && r2.setAttribute("max", o2.max), void 0 !== o2.min && r2.setAttribute("min", o2.min), void 0 !== o2.step && r2.setAttribute("step", o2.step), r2.style.padding = "4px", r2.style.width = "100%", r2.style.boxSizing = "border-box", o2.elementAttributes && "object" == typeof o2.elementAttributes)
            for (let e3 in o2.elementAttributes)
              "+" == e3.charAt(0) ? (e3 = e3.slice(1), r2.setAttribute(e3, r2.getAttribute(e3) + o2.elementAttributes["+" + e3])) : r2.setAttribute(e3, o2.elementAttributes[e3]);
          function a2() {
            var e3 = r2.value;
            isNaN(e3) || "" === e3 || (e3 = Number(e3)), e3 != n2 ? i2(e3) && (n2 = e3) : s2();
          }
          return r2.value = n2, t2(function() {
            "cell" === e2.getType() && (r2.focus({ preventScroll: true }), r2.style.height = "100%");
          }), r2.addEventListener("blur", function(e3) {
            a2();
          }), r2.addEventListener("keydown", function(e3) {
            switch (e3.keyCode) {
              case 13:
                a2();
                break;
              case 27:
                s2();
            }
          }), r2;
        }, date: function(e2, t2, i2, s2, o2) {
          var n2 = o2.format, r2 = o2.verticalNavigation || "editor", a2 = n2 ? window.DateTime || luxon.DateTime : null, l2 = e2.getValue(), h2 = document.createElement("input");
          function d2(e3) {
            return (a2.isDateTime(e3) ? e3 : "iso" === n2 ? a2.fromISO(String(e3)) : a2.fromFormat(String(e3), n2)).toFormat("yyyy-MM-dd");
          }
          if (h2.type = "date", h2.style.padding = "4px", h2.style.width = "100%", h2.style.boxSizing = "border-box", o2.max && h2.setAttribute("max", n2 ? d2(o2.max) : o2.max), o2.min && h2.setAttribute("min", n2 ? d2(o2.min) : o2.min), o2.elementAttributes && "object" == typeof o2.elementAttributes)
            for (let e3 in o2.elementAttributes)
              "+" == e3.charAt(0) ? (e3 = e3.slice(1), h2.setAttribute(e3, h2.getAttribute(e3) + o2.elementAttributes["+" + e3])) : h2.setAttribute(e3, o2.elementAttributes[e3]);
          function c2() {
            var e3, t3 = h2.value;
            if (null == l2 && "" !== t3 || t3 !== l2) {
              if (t3 && n2)
                switch (e3 = a2.fromFormat(String(t3), "yyyy-MM-dd"), n2) {
                  case true:
                    t3 = e3;
                    break;
                  case "iso":
                    t3 = e3.toISO();
                    break;
                  default:
                    t3 = e3.toFormat(n2);
                }
              i2(t3) && (l2 = h2.value);
            } else
              s2();
          }
          return l2 = void 0 !== l2 ? l2 : "", n2 && (a2 ? l2 = d2(l2) : console.error("Editor Error - 'date' editor 'format' param is dependant on luxon.js")), h2.value = l2, t2(function() {
            "cell" === e2.getType() && (h2.focus({ preventScroll: true }), h2.style.height = "100%", o2.selectContents && h2.select());
          }), h2.addEventListener("blur", function(e3) {
            (e3.relatedTarget || e3.rangeParent || e3.explicitOriginalTarget !== h2) && c2();
          }), h2.addEventListener("keydown", function(e3) {
            switch (e3.keyCode) {
              case 13:
                c2();
                break;
              case 27:
                s2();
                break;
              case 35:
              case 36:
                e3.stopPropagation();
                break;
              case 38:
              case 40:
                "editor" == r2 && (e3.stopImmediatePropagation(), e3.stopPropagation());
            }
          }), h2;
        }, time: function(e2, t2, i2, s2, o2) {
          var n2, r2 = o2.format, a2 = o2.verticalNavigation || "editor", l2 = r2 ? window.DateTime || luxon.DateTime : null, h2 = e2.getValue(), d2 = document.createElement("input");
          if (d2.type = "time", d2.style.padding = "4px", d2.style.width = "100%", d2.style.boxSizing = "border-box", o2.elementAttributes && "object" == typeof o2.elementAttributes)
            for (let e3 in o2.elementAttributes)
              "+" == e3.charAt(0) ? (e3 = e3.slice(1), d2.setAttribute(e3, d2.getAttribute(e3) + o2.elementAttributes["+" + e3])) : d2.setAttribute(e3, o2.elementAttributes[e3]);
          function c2() {
            var e3, t3 = d2.value;
            if (null == h2 && "" !== t3 || t3 !== h2) {
              if (t3 && r2)
                switch (e3 = l2.fromFormat(String(t3), "hh:mm"), r2) {
                  case true:
                    t3 = e3;
                    break;
                  case "iso":
                    t3 = e3.toISO();
                    break;
                  default:
                    t3 = e3.toFormat(r2);
                }
              i2(t3) && (h2 = d2.value);
            } else
              s2();
          }
          return h2 = void 0 !== h2 ? h2 : "", r2 && (l2 ? (n2 = l2.isDateTime(h2) ? h2 : "iso" === r2 ? l2.fromISO(String(h2)) : l2.fromFormat(String(h2), r2), h2 = n2.toFormat("HH:mm")) : console.error("Editor Error - 'date' editor 'format' param is dependant on luxon.js")), d2.value = h2, t2(function() {
            "cell" == e2.getType() && (d2.focus({ preventScroll: true }), d2.style.height = "100%", o2.selectContents && d2.select());
          }), d2.addEventListener("blur", function(e3) {
            (e3.relatedTarget || e3.rangeParent || e3.explicitOriginalTarget !== d2) && c2();
          }), d2.addEventListener("keydown", function(e3) {
            switch (e3.keyCode) {
              case 13:
                c2();
                break;
              case 27:
                s2();
                break;
              case 35:
              case 36:
                e3.stopPropagation();
                break;
              case 38:
              case 40:
                "editor" == a2 && (e3.stopImmediatePropagation(), e3.stopPropagation());
            }
          }), d2;
        }, datetime: function(e2, t2, i2, s2, o2) {
          var n2, r2 = o2.format, a2 = o2.verticalNavigation || "editor", l2 = r2 ? window.DateTime || luxon.DateTime : null, h2 = e2.getValue(), d2 = document.createElement("input");
          if (d2.type = "datetime-local", d2.style.padding = "4px", d2.style.width = "100%", d2.style.boxSizing = "border-box", o2.elementAttributes && "object" == typeof o2.elementAttributes)
            for (let e3 in o2.elementAttributes)
              "+" == e3.charAt(0) ? (e3 = e3.slice(1), d2.setAttribute(e3, d2.getAttribute(e3) + o2.elementAttributes["+" + e3])) : d2.setAttribute(e3, o2.elementAttributes[e3]);
          function c2() {
            var e3, t3 = d2.value;
            if (null == h2 && "" !== t3 || t3 !== h2) {
              if (t3 && r2)
                switch (e3 = l2.fromISO(String(t3)), r2) {
                  case true:
                    t3 = e3;
                    break;
                  case "iso":
                    t3 = e3.toISO();
                    break;
                  default:
                    t3 = e3.toFormat(r2);
                }
              i2(t3) && (h2 = d2.value);
            } else
              s2();
          }
          return h2 = void 0 !== h2 ? h2 : "", r2 && (l2 ? (n2 = l2.isDateTime(h2) ? h2 : "iso" === r2 ? l2.fromISO(String(h2)) : l2.fromFormat(String(h2), r2), h2 = n2.toFormat("yyyy-MM-dd") + "T" + n2.toFormat("HH:mm")) : console.error("Editor Error - 'date' editor 'format' param is dependant on luxon.js")), d2.value = h2, t2(function() {
            "cell" === e2.getType() && (d2.focus({ preventScroll: true }), d2.style.height = "100%", o2.selectContents && d2.select());
          }), d2.addEventListener("blur", function(e3) {
            (e3.relatedTarget || e3.rangeParent || e3.explicitOriginalTarget !== d2) && c2();
          }), d2.addEventListener("keydown", function(e3) {
            switch (e3.keyCode) {
              case 13:
                c2();
                break;
              case 27:
                s2();
                break;
              case 35:
              case 36:
                e3.stopPropagation();
                break;
              case 38:
              case 40:
                "editor" == a2 && (e3.stopImmediatePropagation(), e3.stopPropagation());
            }
          }), d2;
        }, list: function(e2, t2, i2, s2, o2) {
          return new se(this, e2, t2, i2, s2, o2).input;
        }, star: function(e2, t2, i2, s2, o2) {
          var n2 = this, r2 = e2.getElement(), a2 = e2.getValue(), l2 = r2.getElementsByTagName("svg").length || 5, h2 = r2.getElementsByTagName("svg")[0] ? r2.getElementsByTagName("svg")[0].getAttribute("width") : 14, d2 = [], c2 = document.createElement("div"), u2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          function m2(e3) {
            d2.forEach(function(t3, i3) {
              i3 < e3 ? ("ie" == n2.table.browser ? t3.setAttribute("class", "tabulator-star-active") : t3.classList.replace("tabulator-star-inactive", "tabulator-star-active"), t3.innerHTML = '<polygon fill="#488CE9" stroke="#014AAE" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>') : ("ie" == n2.table.browser ? t3.setAttribute("class", "tabulator-star-inactive") : t3.classList.replace("tabulator-star-active", "tabulator-star-inactive"), t3.innerHTML = '<polygon fill="#010155" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>');
            });
          }
          function p2(e3) {
            var t3 = document.createElement("span"), s3 = u2.cloneNode(true);
            d2.push(s3), t3.addEventListener("mouseenter", function(t4) {
              t4.stopPropagation(), t4.stopImmediatePropagation(), m2(e3);
            }), t3.addEventListener("mousemove", function(e4) {
              e4.stopPropagation(), e4.stopImmediatePropagation();
            }), t3.addEventListener("click", function(t4) {
              t4.stopPropagation(), t4.stopImmediatePropagation(), i2(e3), r2.blur();
            }), t3.appendChild(s3), c2.appendChild(t3);
          }
          function g2(e3) {
            a2 = e3, m2(e3);
          }
          if (r2.style.whiteSpace = "nowrap", r2.style.overflow = "hidden", r2.style.textOverflow = "ellipsis", c2.style.verticalAlign = "middle", c2.style.display = "inline-block", c2.style.padding = "4px", u2.setAttribute("width", h2), u2.setAttribute("height", h2), u2.setAttribute("viewBox", "0 0 512 512"), u2.setAttribute("xml:space", "preserve"), u2.style.padding = "0 1px", o2.elementAttributes && "object" == typeof o2.elementAttributes)
            for (let e3 in o2.elementAttributes)
              "+" == e3.charAt(0) ? (e3 = e3.slice(1), c2.setAttribute(e3, c2.getAttribute(e3) + o2.elementAttributes["+" + e3])) : c2.setAttribute(e3, o2.elementAttributes[e3]);
          for (var b2 = 1; b2 <= l2; b2++)
            p2(b2);
          return m2(a2 = Math.min(parseInt(a2), l2)), c2.addEventListener("mousemove", function(e3) {
            m2(0);
          }), c2.addEventListener("click", function(e3) {
            i2(0);
          }), r2.addEventListener("blur", function(e3) {
            s2();
          }), r2.addEventListener("keydown", function(e3) {
            switch (e3.keyCode) {
              case 39:
                g2(a2 + 1);
                break;
              case 37:
                g2(a2 - 1);
                break;
              case 13:
                i2(a2);
                break;
              case 27:
                s2();
            }
          }), c2;
        }, progress: function(e2, t2, i2, s2, o2) {
          var n2, r2, a2 = e2.getElement(), l2 = void 0 === o2.max ? a2.getElementsByTagName("div")[0] && a2.getElementsByTagName("div")[0].getAttribute("max") || 100 : o2.max, h2 = void 0 === o2.min ? a2.getElementsByTagName("div")[0] && a2.getElementsByTagName("div")[0].getAttribute("min") || 0 : o2.min, d2 = (l2 - h2) / 100, c2 = e2.getValue() || 0, u2 = document.createElement("div"), m2 = document.createElement("div");
          function p2() {
            var e3 = window.getComputedStyle(a2, null), t3 = d2 * Math.round(m2.offsetWidth / ((a2.clientWidth - parseInt(e3.getPropertyValue("padding-left")) - parseInt(e3.getPropertyValue("padding-right"))) / 100)) + h2;
            i2(t3), a2.setAttribute("aria-valuenow", t3), a2.setAttribute("aria-label", c2);
          }
          if (u2.style.position = "absolute", u2.style.right = "0", u2.style.top = "0", u2.style.bottom = "0", u2.style.width = "5px", u2.classList.add("tabulator-progress-handle"), m2.style.display = "inline-block", m2.style.position = "relative", m2.style.height = "100%", m2.style.backgroundColor = "#488CE9", m2.style.maxWidth = "100%", m2.style.minWidth = "0%", o2.elementAttributes && "object" == typeof o2.elementAttributes)
            for (let e3 in o2.elementAttributes)
              "+" == e3.charAt(0) ? (e3 = e3.slice(1), m2.setAttribute(e3, m2.getAttribute(e3) + o2.elementAttributes["+" + e3])) : m2.setAttribute(e3, o2.elementAttributes[e3]);
          return a2.style.padding = "4px 4px", c2 = Math.min(parseFloat(c2), l2), c2 = Math.max(parseFloat(c2), h2), c2 = Math.round((c2 - h2) / d2), m2.style.width = c2 + "%", a2.setAttribute("aria-valuemin", h2), a2.setAttribute("aria-valuemax", l2), m2.appendChild(u2), u2.addEventListener("mousedown", function(e3) {
            n2 = e3.screenX, r2 = m2.offsetWidth;
          }), u2.addEventListener("mouseover", function() {
            u2.style.cursor = "ew-resize";
          }), a2.addEventListener("mousemove", function(e3) {
            n2 && (m2.style.width = r2 + e3.screenX - n2 + "px");
          }), a2.addEventListener("mouseup", function(e3) {
            n2 && (e3.stopPropagation(), e3.stopImmediatePropagation(), n2 = false, r2 = false, p2());
          }), a2.addEventListener("keydown", function(e3) {
            switch (e3.keyCode) {
              case 39:
                e3.preventDefault(), m2.style.width = m2.clientWidth + a2.clientWidth / 100 + "px";
                break;
              case 37:
                e3.preventDefault(), m2.style.width = m2.clientWidth - a2.clientWidth / 100 + "px";
                break;
              case 9:
              case 13:
                p2();
                break;
              case 27:
                s2();
            }
          }), a2.addEventListener("blur", function() {
            s2();
          }), m2;
        }, tickCross: function(e2, t2, i2, s2, o2) {
          var n2 = e2.getValue(), r2 = document.createElement("input"), a2 = o2.tristate, l2 = void 0 === o2.indeterminateValue ? null : o2.indeterminateValue, h2 = false, d2 = Object.keys(o2).includes("trueValue"), c2 = Object.keys(o2).includes("falseValue");
          if (r2.setAttribute("type", "checkbox"), r2.style.marginTop = "5px", r2.style.boxSizing = "border-box", o2.elementAttributes && "object" == typeof o2.elementAttributes)
            for (let e3 in o2.elementAttributes)
              "+" == e3.charAt(0) ? (e3 = e3.slice(1), r2.setAttribute(e3, r2.getAttribute(e3) + o2.elementAttributes["+" + e3])) : r2.setAttribute(e3, o2.elementAttributes[e3]);
          function u2(e3) {
            var t3 = r2.checked;
            return d2 && t3 ? t3 = o2.trueValue : c2 && !t3 && (t3 = o2.falseValue), a2 ? e3 ? h2 ? l2 : t3 : r2.checked && !h2 ? (r2.checked = false, r2.indeterminate = true, h2 = true, l2) : (h2 = false, t3) : t3;
          }
          return r2.value = n2, !a2 || void 0 !== n2 && n2 !== l2 && "" !== n2 || (h2 = true, r2.indeterminate = true), "firefox" != this.table.browser && "safari" != this.table.browser && t2(function() {
            "cell" === e2.getType() && r2.focus({ preventScroll: true });
          }), r2.checked = d2 ? n2 === o2.trueValue : true === n2 || "true" === n2 || "True" === n2 || 1 === n2, r2.addEventListener("change", function(e3) {
            i2(u2());
          }), r2.addEventListener("blur", function(e3) {
            i2(u2(true));
          }), r2.addEventListener("keydown", function(e3) {
            13 == e3.keyCode && i2(u2()), 27 == e3.keyCode && s2();
          }), r2;
        } };
        const _ne = class extends M {
          constructor(e2) {
            super(e2), this.currentCell = false, this.mouseClick = false, this.recursionBlock = false, this.invalidEdit = false, this.editedCells = [], this.convertEmptyValues = false, this.editors = _ne.editors, this.registerTableOption("editTriggerEvent", "focus"), this.registerTableOption("editorEmptyValue"), this.registerTableOption("editorEmptyValueFunc", this.emptyValueCheck.bind(this)), this.registerColumnOption("editable"), this.registerColumnOption("editor"), this.registerColumnOption("editorParams"), this.registerColumnOption("editorEmptyValue"), this.registerColumnOption("editorEmptyValueFunc"), this.registerColumnOption("cellEditing"), this.registerColumnOption("cellEdited"), this.registerColumnOption("cellEditCancelled"), this.registerTableFunction("getEditedCells", this.getEditedCells.bind(this)), this.registerTableFunction("clearCellEdited", this.clearCellEdited.bind(this)), this.registerTableFunction("navigatePrev", this.navigatePrev.bind(this)), this.registerTableFunction("navigateNext", this.navigateNext.bind(this)), this.registerTableFunction("navigateLeft", this.navigateLeft.bind(this)), this.registerTableFunction("navigateRight", this.navigateRight.bind(this)), this.registerTableFunction("navigateUp", this.navigateUp.bind(this)), this.registerTableFunction("navigateDown", this.navigateDown.bind(this)), this.registerComponentFunction("cell", "isEdited", this.cellIsEdited.bind(this)), this.registerComponentFunction("cell", "clearEdited", this.clearEdited.bind(this)), this.registerComponentFunction("cell", "edit", this.editCell.bind(this)), this.registerComponentFunction("cell", "cancelEdit", this.cellCancelEdit.bind(this)), this.registerComponentFunction("cell", "navigatePrev", this.navigatePrev.bind(this)), this.registerComponentFunction("cell", "navigateNext", this.navigateNext.bind(this)), this.registerComponentFunction("cell", "navigateLeft", this.navigateLeft.bind(this)), this.registerComponentFunction("cell", "navigateRight", this.navigateRight.bind(this)), this.registerComponentFunction("cell", "navigateUp", this.navigateUp.bind(this)), this.registerComponentFunction("cell", "navigateDown", this.navigateDown.bind(this));
          }
          initialize() {
            this.subscribe("cell-init", this.bindEditor.bind(this)), this.subscribe("cell-delete", this.clearEdited.bind(this)), this.subscribe("cell-value-changed", this.updateCellClass.bind(this)), this.subscribe("column-layout", this.initializeColumnCheck.bind(this)), this.subscribe("column-delete", this.columnDeleteCheck.bind(this)), this.subscribe("row-deleting", this.rowDeleteCheck.bind(this)), this.subscribe("row-layout", this.rowEditableCheck.bind(this)), this.subscribe("data-refreshing", this.cancelEdit.bind(this)), this.subscribe("clipboard-paste", this.pasteBlocker.bind(this)), this.subscribe("keybinding-nav-prev", this.navigatePrev.bind(this, void 0)), this.subscribe("keybinding-nav-next", this.keybindingNavigateNext.bind(this)), this.subscribe("keybinding-nav-up", this.navigateUp.bind(this, void 0)), this.subscribe("keybinding-nav-down", this.navigateDown.bind(this, void 0)), Object.keys(this.table.options).includes("editorEmptyValue") && (this.convertEmptyValues = true);
          }
          pasteBlocker(e2) {
            if (this.currentCell)
              return true;
          }
          keybindingNavigateNext(e2) {
            var t2 = this.currentCell, i2 = this.options("tabEndNewRow");
            t2 && (this.navigateNext(t2, e2) || i2 && (t2.getElement().firstChild.blur(), this.invalidEdit || (i2 = true === i2 ? this.table.addRow({}) : "function" == typeof i2 ? this.table.addRow(i2(t2.row.getComponent())) : this.table.addRow(Object.assign({}, i2))).then(() => {
              setTimeout(() => {
                t2.getComponent().navigateNext();
              });
            })));
          }
          cellIsEdited(e2) {
            return !!e2.modules.edit && e2.modules.edit.edited;
          }
          cellCancelEdit(e2) {
            e2 === this.currentCell ? this.table.modules.edit.cancelEdit() : console.warn("Cancel Editor Error - This cell is not currently being edited ");
          }
          updateCellClass(e2) {
            this.allowEdit(e2) ? e2.getElement().classList.add("tabulator-editable") : e2.getElement().classList.remove("tabulator-editable");
          }
          clearCellEdited(e2) {
            e2 || (e2 = this.table.modules.edit.getEditedCells()), Array.isArray(e2) || (e2 = [e2]), e2.forEach((e3) => {
              this.table.modules.edit.clearEdited(e3._getSelf());
            });
          }
          navigatePrev(e2 = this.currentCell, t2) {
            var i2, s2;
            if (e2) {
              if (t2 && t2.preventDefault(), i2 = this.navigateLeft())
                return true;
              if ((s2 = this.table.rowManager.prevDisplayRow(e2.row, true)) && (i2 = this.findPrevEditableCell(s2, s2.cells.length)))
                return i2.getComponent().edit(), true;
            }
            return false;
          }
          navigateNext(e2 = this.currentCell, t2) {
            var i2, s2;
            if (e2) {
              if (t2 && t2.preventDefault(), i2 = this.navigateRight())
                return true;
              if ((s2 = this.table.rowManager.nextDisplayRow(e2.row, true)) && (i2 = this.findNextEditableCell(s2, -1)))
                return i2.getComponent().edit(), true;
            }
            return false;
          }
          navigateLeft(e2 = this.currentCell, t2) {
            var i2, s2;
            return !!(e2 && (t2 && t2.preventDefault(), i2 = e2.getIndex(), s2 = this.findPrevEditableCell(e2.row, i2))) && (s2.getComponent().edit(), true);
          }
          navigateRight(e2 = this.currentCell, t2) {
            var i2, s2;
            return !!(e2 && (t2 && t2.preventDefault(), i2 = e2.getIndex(), s2 = this.findNextEditableCell(e2.row, i2))) && (s2.getComponent().edit(), true);
          }
          navigateUp(e2 = this.currentCell, t2) {
            var i2, s2;
            return !!(e2 && (t2 && t2.preventDefault(), i2 = e2.getIndex(), s2 = this.table.rowManager.prevDisplayRow(e2.row, true))) && (s2.cells[i2].getComponent().edit(), true);
          }
          navigateDown(e2 = this.currentCell, t2) {
            var i2, s2;
            return !!(e2 && (t2 && t2.preventDefault(), i2 = e2.getIndex(), s2 = this.table.rowManager.nextDisplayRow(e2.row, true))) && (s2.cells[i2].getComponent().edit(), true);
          }
          findNextEditableCell(e2, t2) {
            var i2 = false;
            if (t2 < e2.cells.length - 1)
              for (var s2 = t2 + 1; s2 < e2.cells.length; s2++) {
                let t3 = e2.cells[s2];
                if (t3.column.modules.edit && a.elVisible(t3.getElement())) {
                  if (this.allowEdit(t3)) {
                    i2 = t3;
                    break;
                  }
                }
              }
            return i2;
          }
          findPrevEditableCell(e2, t2) {
            var i2 = false;
            if (t2 > 0)
              for (var s2 = t2 - 1; s2 >= 0; s2--) {
                let t3 = e2.cells[s2];
                if (t3.column.modules.edit && a.elVisible(t3.getElement())) {
                  if (this.allowEdit(t3)) {
                    i2 = t3;
                    break;
                  }
                }
              }
            return i2;
          }
          initializeColumnCheck(e2) {
            void 0 !== e2.definition.editor && this.initializeColumn(e2);
          }
          columnDeleteCheck(e2) {
            this.currentCell && this.currentCell.column === e2 && this.cancelEdit();
          }
          rowDeleteCheck(e2) {
            this.currentCell && this.currentCell.row === e2 && this.cancelEdit();
          }
          rowEditableCheck(e2) {
            e2.getCells().forEach((e3) => {
              e3.column.modules.edit && "function" == typeof e3.column.modules.edit.check && this.updateCellClass(e3);
            });
          }
          initializeColumn(e2) {
            var t2 = Object.keys(e2.definition).includes("editorEmptyValue"), i2 = { editor: false, blocked: false, check: e2.definition.editable, params: e2.definition.editorParams || {}, convertEmptyValues: t2, editorEmptyValue: e2.definition.editorEmptyValue, editorEmptyValueFunc: e2.definition.editorEmptyValueFunc };
            switch (typeof e2.definition.editor) {
              case "string":
                this.editors[e2.definition.editor] ? i2.editor = this.editors[e2.definition.editor] : console.warn("Editor Error - No such editor found: ", e2.definition.editor);
                break;
              case "function":
                i2.editor = e2.definition.editor;
                break;
              case "boolean":
                true === e2.definition.editor && ("function" != typeof e2.definition.formatter ? this.editors[e2.definition.formatter] ? i2.editor = this.editors[e2.definition.formatter] : i2.editor = this.editors.input : console.warn("Editor Error - Cannot auto lookup editor for a custom formatter: ", e2.definition.formatter));
            }
            i2.editor && (e2.modules.edit = i2);
          }
          getCurrentCell() {
            return !!this.currentCell && this.currentCell.getComponent();
          }
          clearEditor(e2) {
            var t2, i2 = this.currentCell;
            if (this.invalidEdit = false, i2) {
              for (this.currentCell = false, t2 = i2.getElement(), this.dispatch("edit-editor-clear", i2, e2), t2.classList.remove("tabulator-editing"); t2.firstChild; )
                t2.removeChild(t2.firstChild);
              i2.row.getElement().classList.remove("tabulator-editing"), i2.table.element.classList.remove("tabulator-editing");
            }
          }
          cancelEdit() {
            if (this.currentCell) {
              var e2 = this.currentCell, t2 = this.currentCell.getComponent();
              this.clearEditor(true), e2.setValueActual(e2.getValue()), e2.cellRendered(), ("textarea" == e2.column.definition.editor || e2.column.definition.variableHeight) && e2.row.normalizeHeight(true), e2.column.definition.cellEditCancelled && e2.column.definition.cellEditCancelled.call(this.table, t2), this.dispatch("edit-cancelled", e2), this.dispatchExternal("cellEditCancelled", t2);
            }
          }
          bindEditor(e2) {
            if (e2.column.modules.edit) {
              var t2 = this, i2 = e2.getElement(true);
              this.updateCellClass(e2), i2.setAttribute("tabindex", 0), i2.addEventListener("mousedown", function(e3) {
                2 === e3.button ? e3.preventDefault() : t2.mouseClick = true;
              }), "dblclick" === this.options("editTriggerEvent") && i2.addEventListener("dblclick", function(s2) {
                i2.classList.contains("tabulator-editing") || (i2.focus({ preventScroll: true }), t2.edit(e2, s2, false));
              }), "focus" !== this.options("editTriggerEvent") && "click" !== this.options("editTriggerEvent") || i2.addEventListener("click", function(s2) {
                i2.classList.contains("tabulator-editing") || (i2.focus({ preventScroll: true }), t2.edit(e2, s2, false));
              }), "focus" === this.options("editTriggerEvent") && i2.addEventListener("focus", function(i3) {
                t2.recursionBlock || t2.edit(e2, i3, false);
              });
            }
          }
          focusCellNoEvent(e2, t2) {
            this.recursionBlock = true, t2 && "ie" === this.table.browser || e2.getElement().focus({ preventScroll: true }), this.recursionBlock = false;
          }
          editCell(e2, t2) {
            this.focusCellNoEvent(e2), this.edit(e2, false, t2);
          }
          focusScrollAdjust(e2) {
            if ("virtual" == this.table.rowManager.getRenderMode()) {
              var t2 = this.table.rowManager.element.scrollTop, i2 = this.table.rowManager.element.clientHeight + this.table.rowManager.element.scrollTop, s2 = e2.row.getElement();
              s2.offsetTop < t2 ? this.table.rowManager.element.scrollTop -= t2 - s2.offsetTop : s2.offsetTop + s2.offsetHeight > i2 && (this.table.rowManager.element.scrollTop += s2.offsetTop + s2.offsetHeight - i2);
              var o2 = this.table.rowManager.element.scrollLeft, n2 = this.table.rowManager.element.clientWidth + this.table.rowManager.element.scrollLeft, r2 = e2.getElement();
              this.table.modExists("frozenColumns") && (o2 += parseInt(this.table.modules.frozenColumns.leftMargin || 0), n2 -= parseInt(this.table.modules.frozenColumns.rightMargin || 0)), "virtual" === this.table.options.renderHorizontal && (o2 -= parseInt(this.table.columnManager.renderer.vDomPadLeft), n2 -= parseInt(this.table.columnManager.renderer.vDomPadLeft)), r2.offsetLeft < o2 ? this.table.rowManager.element.scrollLeft -= o2 - r2.offsetLeft : r2.offsetLeft + r2.offsetWidth > n2 && (this.table.rowManager.element.scrollLeft += r2.offsetLeft + r2.offsetWidth - n2);
            }
          }
          allowEdit(e2) {
            var t2 = !!e2.column.modules.edit;
            if (e2.column.modules.edit)
              switch (typeof e2.column.modules.edit.check) {
                case "function":
                  e2.row.initialized && (t2 = e2.column.modules.edit.check(e2.getComponent()));
                  break;
                case "string":
                  t2 = !!e2.row.data[e2.column.modules.edit.check];
                  break;
                case "boolean":
                  t2 = e2.column.modules.edit.check;
              }
            return t2;
          }
          edit(e2, t2, i2) {
            var s2, o2, n2, r2 = this, a2 = function() {
            }, l2 = e2.getElement(), h2 = false;
            if (!this.currentCell) {
              if (e2.column.modules.edit.blocked)
                return this.mouseClick = false, this.blur(l2), false;
              if (t2 && t2.stopPropagation(), this.allowEdit(e2) || i2) {
                if (r2.cancelEdit(), r2.currentCell = e2, this.focusScrollAdjust(e2), o2 = e2.getComponent(), this.mouseClick && (this.mouseClick = false, e2.column.definition.cellClick && e2.column.definition.cellClick.call(this.table, t2, o2)), e2.column.definition.cellEditing && e2.column.definition.cellEditing.call(this.table, o2), this.dispatch("cell-editing", e2), this.dispatchExternal("cellEditing", o2), n2 = "function" == typeof e2.column.modules.edit.params ? e2.column.modules.edit.params(o2) : e2.column.modules.edit.params, s2 = e2.column.modules.edit.editor.call(r2, o2, function(e3) {
                  a2 = e3;
                }, function(t3) {
                  if (r2.currentCell === e2 && !h2) {
                    var i3 = r2.chain("edit-success", [e2, t3], true, true);
                    return true === i3 || "highlight" === r2.table.options.validationMode ? (h2 = true, r2.clearEditor(), e2.modules.edit || (e2.modules.edit = {}), e2.modules.edit.edited = true, -1 == r2.editedCells.indexOf(e2) && r2.editedCells.push(e2), t3 = r2.transformEmptyValues(t3, e2), e2.setValue(t3, true), true === i3) : (h2 = true, r2.invalidEdit = true, r2.focusCellNoEvent(e2, true), a2(), setTimeout(() => {
                      h2 = false;
                    }, 10), false);
                  }
                }, function() {
                  r2.currentCell !== e2 || h2 || r2.cancelEdit();
                }, n2), !this.currentCell || false === s2)
                  return this.blur(l2), false;
                if (!(s2 instanceof Node))
                  return console.warn("Edit Error - Editor should return an instance of Node, the editor returned:", s2), this.blur(l2), false;
                for (l2.classList.add("tabulator-editing"), e2.row.getElement().classList.add("tabulator-editing"), e2.table.element.classList.add("tabulator-editing"); l2.firstChild; )
                  l2.removeChild(l2.firstChild);
                l2.appendChild(s2), a2();
                for (var d2 = l2.children, c2 = 0; c2 < d2.length; c2++)
                  d2[c2].addEventListener("click", function(e3) {
                    e3.stopPropagation();
                  });
                return true;
              }
              return this.mouseClick = false, this.blur(l2), false;
            }
            this.invalidEdit || this.currentCell === e2 || this.cancelEdit();
          }
          emptyValueCheck(e2) {
            return "" === e2 || null == e2;
          }
          transformEmptyValues(e2, t2) {
            var i2, s2 = t2.column.modules.edit;
            return (s2.convertEmptyValues || this.convertEmptyValues) && (i2 = s2.editorEmptyValueFunc || this.options("editorEmptyValueFunc")) && i2(e2) && (e2 = s2.convertEmptyValues ? s2.editorEmptyValue : this.options("editorEmptyValue")), e2;
          }
          blur(e2) {
            this.confirm("edit-blur", [e2]) || e2.blur();
          }
          getEditedCells() {
            var e2 = [];
            return this.editedCells.forEach((t2) => {
              e2.push(t2.getComponent());
            }), e2;
          }
          clearEdited(e2) {
            var t2;
            e2.modules.edit && e2.modules.edit.edited && (e2.modules.edit.edited = false, this.dispatch("edit-edited-clear", e2)), (t2 = this.editedCells.indexOf(e2)) > -1 && this.editedCells.splice(t2, 1);
          }
        };
        let ne = _ne;
        __publicField(ne, "moduleName", "edit");
        __publicField(ne, "editors", oe);
        class re {
          constructor(e2, t2, i2, s2) {
            this.type = e2, this.columns = t2, this.component = i2 || false, this.indent = s2 || 0;
          }
        }
        class ae {
          constructor(e2, t2, i2, s2, o2) {
            this.value = e2, this.component = t2 || false, this.width = i2, this.height = s2, this.depth = o2;
          }
        }
        var le = {}, he = { visible: function() {
          return this.rowManager.getVisibleRows(false, true);
        }, all: function() {
          return this.rowManager.rows;
        }, selected: function() {
          return this.modules.selectRow.selectedRows;
        }, active: function() {
          return this.options.pagination ? this.rowManager.getDisplayRows(this.rowManager.displayRows.length - 2) : this.rowManager.getDisplayRows();
        } };
        const _de = class extends M {
          constructor(e2) {
            super(e2), this.config = {}, this.cloneTableStyle = true, this.colVisProp = "", this.colVisPropAttach = "", this.registerTableOption("htmlOutputConfig", false), this.registerColumnOption("htmlOutput"), this.registerColumnOption("titleHtmlOutput");
          }
          initialize() {
            this.registerTableFunction("getHtml", this.getHtml.bind(this));
          }
          generateExportList(e2, t2, i2, s2) {
            var o2, n2, r2, a2;
            return this.cloneTableStyle = t2, this.config = e2 || {}, this.colVisProp = s2, this.colVisPropAttach = this.colVisProp.charAt(0).toUpperCase() + this.colVisProp.slice(1), (a2 = _de.columnLookups[i2]) && (r2 = (r2 = a2.call(this.table)).filter((e3) => this.columnVisCheck(e3))), o2 = false !== this.config.columnHeaders ? this.headersToExportRows(this.generateColumnGroupHeaders(r2)) : [], r2 && (r2 = r2.map((e3) => e3.getComponent())), n2 = this.bodyToExportRows(this.rowLookup(i2), r2), o2.concat(n2);
          }
          generateTable(e2, t2, i2, s2) {
            var o2 = this.generateExportList(e2, t2, i2, s2);
            return this.generateTableElement(o2);
          }
          rowLookup(e2) {
            var t2, i2 = [];
            return "function" == typeof e2 ? e2.call(this.table).forEach((e3) => {
              (e3 = this.table.rowManager.findRow(e3)) && i2.push(e3);
            }) : (t2 = _de.rowLookups[e2] || _de.rowLookups.active, i2 = t2.call(this.table)), Object.assign([], i2);
          }
          generateColumnGroupHeaders(e2) {
            var t2 = [];
            return e2 || (e2 = false !== this.config.columnGroups ? this.table.columnManager.columns : this.table.columnManager.columnsByIndex), e2.forEach((e3) => {
              var i2 = this.processColumnGroup(e3);
              i2 && t2.push(i2);
            }), t2;
          }
          processColumnGroup(e2) {
            var t2 = e2.columns, i2 = 0, s2 = { title: e2.definition["title" + this.colVisPropAttach] || e2.definition.title, column: e2, depth: 1 };
            if (t2.length) {
              if (s2.subGroups = [], s2.width = 0, t2.forEach((e3) => {
                var t3 = this.processColumnGroup(e3);
                t3 && (s2.width += t3.width, s2.subGroups.push(t3), t3.depth > i2 && (i2 = t3.depth));
              }), s2.depth += i2, !s2.width)
                return false;
            } else {
              if (!this.columnVisCheck(e2))
                return false;
              s2.width = 1;
            }
            return s2;
          }
          columnVisCheck(e2) {
            var t2 = e2.definition[this.colVisProp];
            return (false !== this.config.rowHeaders || !e2.isRowHeader) && ("function" == typeof t2 && (t2 = t2.call(this.table, e2.getComponent())), false === t2 || true === t2 ? t2 : e2.visible && e2.field);
          }
          headersToExportRows(e2) {
            var t2 = [], i2 = 0, s2 = [];
            function o2(e3, s3) {
              var n2 = i2 - s3;
              if (void 0 === t2[s3] && (t2[s3] = []), e3.height = e3.subGroups ? 1 : n2 - e3.depth + 1, t2[s3].push(e3), e3.height > 1)
                for (let i3 = 1; i3 < e3.height; i3++)
                  void 0 === t2[s3 + i3] && (t2[s3 + i3] = []), t2[s3 + i3].push(false);
              if (e3.width > 1)
                for (let i3 = 1; i3 < e3.width; i3++)
                  t2[s3].push(false);
              e3.subGroups && e3.subGroups.forEach(function(e4) {
                o2(e4, s3 + 1);
              });
            }
            return e2.forEach(function(e3) {
              e3.depth > i2 && (i2 = e3.depth);
            }), e2.forEach(function(e3) {
              o2(e3, 0);
            }), t2.forEach((e3) => {
              var t3 = [];
              e3.forEach((e4) => {
                if (e4) {
                  let i3 = void 0 === e4.title ? "" : e4.title;
                  t3.push(new ae(i3, e4.column.getComponent(), e4.width, e4.height, e4.depth));
                } else
                  t3.push(null);
              }), s2.push(new re("header", t3));
            }), s2;
          }
          bodyToExportRows(e2, t2 = []) {
            var i2 = [];
            return 0 === t2.length && this.table.columnManager.columnsByIndex.forEach((e3) => {
              this.columnVisCheck(e3) && t2.push(e3.getComponent());
            }), false !== this.config.columnCalcs && this.table.modExists("columnCalcs") && (this.table.modules.columnCalcs.topInitialized && e2.unshift(this.table.modules.columnCalcs.topRow), this.table.modules.columnCalcs.botInitialized && e2.push(this.table.modules.columnCalcs.botRow)), (e2 = e2.filter((e3) => {
              switch (e3.type) {
                case "group":
                  return false !== this.config.rowGroups;
                case "calc":
                  return false !== this.config.columnCalcs;
                case "row":
                  return !(this.table.options.dataTree && false === this.config.dataTree && e3.modules.dataTree.parent);
              }
              return true;
            })).forEach((e3, s2) => {
              var o2 = e3.getData(this.colVisProp), n2 = [], r2 = 0;
              switch (e3.type) {
                case "group":
                  r2 = e3.level, n2.push(new ae(e3.key, e3.getComponent(), t2.length, 1));
                  break;
                case "calc":
                case "row":
                  t2.forEach((e4) => {
                    n2.push(new ae(e4._column.getFieldValue(o2), e4, 1, 1));
                  }), this.table.options.dataTree && false !== this.config.dataTree && (r2 = e3.modules.dataTree.index);
              }
              i2.push(new re(e3.type, n2, e3.getComponent(), r2));
            }), i2;
          }
          generateTableElement(e2) {
            var t2 = document.createElement("table"), i2 = document.createElement("thead"), s2 = document.createElement("tbody"), o2 = this.lookupTableStyles(), n2 = this.table.options["rowFormatter" + this.colVisPropAttach], r2 = {};
            return r2.rowFormatter = null !== n2 ? n2 : this.table.options.rowFormatter, this.table.options.dataTree && false !== this.config.dataTree && this.table.modExists("columnCalcs") && (r2.treeElementField = this.table.modules.dataTree.elementField), r2.groupHeader = this.table.options["groupHeader" + this.colVisPropAttach], r2.groupHeader && !Array.isArray(r2.groupHeader) && (r2.groupHeader = [r2.groupHeader]), t2.classList.add("tabulator-print-table"), this.mapElementStyles(this.table.columnManager.getHeadersElement(), i2, ["border-top", "border-left", "border-right", "border-bottom", "background-color", "color", "font-weight", "font-family", "font-size"]), e2.length > 1e3 && console.warn("It may take a long time to render an HTML table with more than 1000 rows"), e2.forEach((e3, t3) => {
              let n3;
              switch (e3.type) {
                case "header":
                  i2.appendChild(this.generateHeaderElement(e3, r2, o2));
                  break;
                case "group":
                  s2.appendChild(this.generateGroupElement(e3, r2, o2));
                  break;
                case "calc":
                  s2.appendChild(this.generateCalcElement(e3, r2, o2));
                  break;
                case "row":
                  n3 = this.generateRowElement(e3, r2, o2), this.mapElementStyles(t3 % 2 && o2.evenRow ? o2.evenRow : o2.oddRow, n3, ["border-top", "border-left", "border-right", "border-bottom", "color", "font-weight", "font-family", "font-size", "background-color"]), s2.appendChild(n3);
              }
            }), i2.innerHTML && t2.appendChild(i2), t2.appendChild(s2), this.mapElementStyles(this.table.element, t2, ["border-top", "border-left", "border-right", "border-bottom"]), t2;
          }
          lookupTableStyles() {
            var e2 = {};
            return this.cloneTableStyle && window.getComputedStyle && (e2.oddRow = this.table.element.querySelector(".tabulator-row-odd:not(.tabulator-group):not(.tabulator-calcs)"), e2.evenRow = this.table.element.querySelector(".tabulator-row-even:not(.tabulator-group):not(.tabulator-calcs)"), e2.calcRow = this.table.element.querySelector(".tabulator-row.tabulator-calcs"), e2.firstRow = this.table.element.querySelector(".tabulator-row:not(.tabulator-group):not(.tabulator-calcs)"), e2.firstGroup = this.table.element.getElementsByClassName("tabulator-group")[0], e2.firstRow && (e2.styleCells = e2.firstRow.getElementsByClassName("tabulator-cell"), e2.styleRowHeader = e2.firstRow.getElementsByClassName("tabulator-row-header")[0], e2.firstCell = e2.styleCells[0], e2.lastCell = e2.styleCells[e2.styleCells.length - 1])), e2;
          }
          generateHeaderElement(e2, t2, i2) {
            var s2 = document.createElement("tr");
            return e2.columns.forEach((e3) => {
              if (e3) {
                var t3 = document.createElement("th"), i3 = e3.component._column.definition.cssClass ? e3.component._column.definition.cssClass.split(" ") : [];
                t3.colSpan = e3.width, t3.rowSpan = e3.height, t3.innerHTML = e3.value, this.cloneTableStyle && (t3.style.boxSizing = "border-box"), i3.forEach(function(e4) {
                  t3.classList.add(e4);
                }), this.mapElementStyles(e3.component.getElement(), t3, ["text-align", "border-left", "border-right", "background-color", "color", "font-weight", "font-family", "font-size"]), this.mapElementStyles(e3.component._column.contentElement, t3, ["padding-top", "padding-left", "padding-right", "padding-bottom"]), e3.component._column.visible ? this.mapElementStyles(e3.component.getElement(), t3, ["width"]) : e3.component._column.definition.width && (t3.style.width = e3.component._column.definition.width + "px"), e3.component._column.parent && e3.component._column.parent.isGroup ? this.mapElementStyles(e3.component._column.parent.groupElement, t3, ["border-top"]) : this.mapElementStyles(e3.component.getElement(), t3, ["border-top"]), e3.component._column.isGroup ? this.mapElementStyles(e3.component.getElement(), t3, ["border-bottom"]) : this.mapElementStyles(this.table.columnManager.getElement(), t3, ["border-bottom"]), s2.appendChild(t3);
              }
            }), s2;
          }
          generateGroupElement(e2, t2, i2) {
            var s2 = document.createElement("tr"), o2 = document.createElement("td"), n2 = e2.columns[0];
            return s2.classList.add("tabulator-print-table-row"), t2.groupHeader && t2.groupHeader[e2.indent] ? n2.value = t2.groupHeader[e2.indent](n2.value, e2.component._group.getRowCount(), e2.component._group.getData(), e2.component) : false !== t2.groupHeader && (n2.value = e2.component._group.generator(n2.value, e2.component._group.getRowCount(), e2.component._group.getData(), e2.component)), o2.colSpan = n2.width, o2.innerHTML = n2.value, s2.classList.add("tabulator-print-table-group"), s2.classList.add("tabulator-group-level-" + e2.indent), n2.component.isVisible() && s2.classList.add("tabulator-group-visible"), this.mapElementStyles(i2.firstGroup, s2, ["border-top", "border-left", "border-right", "border-bottom", "color", "font-weight", "font-family", "font-size", "background-color"]), this.mapElementStyles(i2.firstGroup, o2, ["padding-top", "padding-left", "padding-right", "padding-bottom"]), s2.appendChild(o2), s2;
          }
          generateCalcElement(e2, t2, i2) {
            var s2 = this.generateRowElement(e2, t2, i2);
            return s2.classList.add("tabulator-print-table-calcs"), this.mapElementStyles(i2.calcRow, s2, ["border-top", "border-left", "border-right", "border-bottom", "color", "font-weight", "font-family", "font-size", "background-color"]), s2;
          }
          generateRowElement(e2, t2, i2) {
            var s2 = document.createElement("tr");
            if (s2.classList.add("tabulator-print-table-row"), e2.columns.forEach((o2, n2) => {
              if (o2) {
                var r2, a2, l2 = document.createElement("td"), h2 = o2.component._column, d2 = this.table, c2 = d2.columnManager.findColumnIndex(h2), u2 = o2.value, m2 = { modules: {}, getValue: function() {
                  return u2;
                }, getField: function() {
                  return h2.definition.field;
                }, getElement: function() {
                  return l2;
                }, getType: function() {
                  return "cell";
                }, getColumn: function() {
                  return h2.getComponent();
                }, getData: function() {
                  return e2.component.getData();
                }, getRow: function() {
                  return e2.component;
                }, getTable: function() {
                  return d2;
                }, getComponent: function() {
                  return m2;
                }, column: h2 };
                if ((h2.definition.cssClass ? h2.definition.cssClass.split(" ") : []).forEach(function(e3) {
                  l2.classList.add(e3);
                }), this.table.modExists("format") && false !== this.config.formatCells)
                  u2 = this.table.modules.format.formatExportValue(m2, this.colVisProp);
                else
                  switch (typeof u2) {
                    case "object":
                      u2 = null !== u2 ? JSON.stringify(u2) : "";
                      break;
                    case "undefined":
                      u2 = "";
                  }
                u2 instanceof Node ? l2.appendChild(u2) : l2.innerHTML = u2, a2 = ["padding-top", "padding-left", "padding-right", "padding-bottom", "border-top", "border-left", "border-right", "border-bottom", "color", "font-weight", "font-family", "font-size", "text-align"], h2.isRowHeader ? (r2 = i2.styleRowHeader, a2.push("background-color")) : r2 = i2.styleCells && i2.styleCells[c2] ? i2.styleCells[c2] : i2.firstCell, r2 && (this.mapElementStyles(r2, l2, a2), h2.definition.align && (l2.style.textAlign = h2.definition.align)), this.table.options.dataTree && false !== this.config.dataTree && (t2.treeElementField && t2.treeElementField == h2.field || !t2.treeElementField && 0 == n2) && (e2.component._row.modules.dataTree.controlEl && l2.insertBefore(e2.component._row.modules.dataTree.controlEl.cloneNode(true), l2.firstChild), e2.component._row.modules.dataTree.branchEl && l2.insertBefore(e2.component._row.modules.dataTree.branchEl.cloneNode(true), l2.firstChild)), s2.appendChild(l2), m2.modules.format && m2.modules.format.renderedCallback && m2.modules.format.renderedCallback();
              }
            }), t2.rowFormatter && "row" === e2.type && false !== this.config.formatCells) {
              Object.assign(e2.component).getElement = function() {
                return s2;
              }, t2.rowFormatter(e2.component);
            }
            return s2;
          }
          generateHTMLTable(e2) {
            var t2 = document.createElement("div");
            return t2.appendChild(this.generateTableElement(e2)), t2.innerHTML;
          }
          getHtml(e2, t2, i2, s2) {
            var o2 = this.generateExportList(i2 || this.table.options.htmlOutputConfig, t2, e2, s2 || "htmlOutput");
            return this.generateHTMLTable(o2);
          }
          mapElementStyles(e2, t2, i2) {
            if (this.cloneTableStyle && e2 && t2) {
              var s2 = { "background-color": "backgroundColor", color: "fontColor", width: "width", "font-weight": "fontWeight", "font-family": "fontFamily", "font-size": "fontSize", "text-align": "textAlign", "border-top": "borderTop", "border-left": "borderLeft", "border-right": "borderRight", "border-bottom": "borderBottom", "padding-top": "paddingTop", "padding-left": "paddingLeft", "padding-right": "paddingRight", "padding-bottom": "paddingBottom" };
              if (window.getComputedStyle) {
                var o2 = window.getComputedStyle(e2);
                i2.forEach(function(e3) {
                  t2.style[s2[e3]] || (t2.style[s2[e3]] = o2.getPropertyValue(e3));
                });
              }
            }
          }
        };
        let de = _de;
        __publicField(de, "moduleName", "export");
        __publicField(de, "columnLookups", le);
        __publicField(de, "rowLookups", he);
        var ce = { "=": function(e2, t2, i2, s2) {
          return t2 == e2;
        }, "<": function(e2, t2, i2, s2) {
          return t2 < e2;
        }, "<=": function(e2, t2, i2, s2) {
          return t2 <= e2;
        }, ">": function(e2, t2, i2, s2) {
          return t2 > e2;
        }, ">=": function(e2, t2, i2, s2) {
          return t2 >= e2;
        }, "!=": function(e2, t2, i2, s2) {
          return t2 != e2;
        }, regex: function(e2, t2, i2, s2) {
          return "string" == typeof e2 && (e2 = new RegExp(e2)), e2.test(t2);
        }, like: function(e2, t2, i2, s2) {
          return null == e2 ? t2 === e2 : null != t2 && String(t2).toLowerCase().indexOf(e2.toLowerCase()) > -1;
        }, keywords: function(e2, t2, i2, s2) {
          var o2 = e2.toLowerCase().split(void 0 === s2.separator ? " " : s2.separator), n2 = String(null == t2 ? "" : t2).toLowerCase(), r2 = [];
          return o2.forEach((e3) => {
            n2.includes(e3) && r2.push(true);
          }), s2.matchAll ? r2.length === o2.length : !!r2.length;
        }, starts: function(e2, t2, i2, s2) {
          return null == e2 ? t2 === e2 : null != t2 && String(t2).toLowerCase().startsWith(e2.toLowerCase());
        }, ends: function(e2, t2, i2, s2) {
          return null == e2 ? t2 === e2 : null != t2 && String(t2).toLowerCase().endsWith(e2.toLowerCase());
        }, in: function(e2, t2, i2, s2) {
          return Array.isArray(e2) ? !e2.length || e2.indexOf(t2) > -1 : (console.warn("Filter Error - filter value is not an array:", e2), false);
        } };
        const _ue = class extends M {
          constructor(e2) {
            super(e2), this.filterList = [], this.headerFilters = {}, this.headerFilterColumns = [], this.prevHeaderFilterChangeCheck = "", this.prevHeaderFilterChangeCheck = "{}", this.changed = false, this.tableInitialized = false, this.registerTableOption("filterMode", "local"), this.registerTableOption("initialFilter", false), this.registerTableOption("initialHeaderFilter", false), this.registerTableOption("headerFilterLiveFilterDelay", 300), this.registerTableOption("placeholderHeaderFilter", false), this.registerColumnOption("headerFilter"), this.registerColumnOption("headerFilterPlaceholder"), this.registerColumnOption("headerFilterParams"), this.registerColumnOption("headerFilterEmptyCheck"), this.registerColumnOption("headerFilterFunc"), this.registerColumnOption("headerFilterFuncParams"), this.registerColumnOption("headerFilterLiveFilter"), this.registerTableFunction("searchRows", this.searchRows.bind(this)), this.registerTableFunction("searchData", this.searchData.bind(this)), this.registerTableFunction("setFilter", this.userSetFilter.bind(this)), this.registerTableFunction("refreshFilter", this.userRefreshFilter.bind(this)), this.registerTableFunction("addFilter", this.userAddFilter.bind(this)), this.registerTableFunction("getFilters", this.getFilters.bind(this)), this.registerTableFunction("setHeaderFilterFocus", this.userSetHeaderFilterFocus.bind(this)), this.registerTableFunction("getHeaderFilterValue", this.userGetHeaderFilterValue.bind(this)), this.registerTableFunction("setHeaderFilterValue", this.userSetHeaderFilterValue.bind(this)), this.registerTableFunction("getHeaderFilters", this.getHeaderFilters.bind(this)), this.registerTableFunction("removeFilter", this.userRemoveFilter.bind(this)), this.registerTableFunction("clearFilter", this.userClearFilter.bind(this)), this.registerTableFunction("clearHeaderFilter", this.userClearHeaderFilter.bind(this)), this.registerComponentFunction("column", "headerFilterFocus", this.setHeaderFilterFocus.bind(this)), this.registerComponentFunction("column", "reloadHeaderFilter", this.reloadHeaderFilter.bind(this)), this.registerComponentFunction("column", "getHeaderFilterValue", this.getHeaderFilterValue.bind(this)), this.registerComponentFunction("column", "setHeaderFilterValue", this.setHeaderFilterValue.bind(this));
          }
          initialize() {
            this.subscribe("column-init", this.initializeColumnHeaderFilter.bind(this)), this.subscribe("column-width-fit-before", this.hideHeaderFilterElements.bind(this)), this.subscribe("column-width-fit-after", this.showHeaderFilterElements.bind(this)), this.subscribe("table-built", this.tableBuilt.bind(this)), this.subscribe("placeholder", this.generatePlaceholder.bind(this)), "remote" === this.table.options.filterMode && this.subscribe("data-params", this.remoteFilterParams.bind(this)), this.registerDataHandler(this.filter.bind(this), 10);
          }
          tableBuilt() {
            this.table.options.initialFilter && this.setFilter(this.table.options.initialFilter), this.table.options.initialHeaderFilter && this.table.options.initialHeaderFilter.forEach((e2) => {
              var t2 = this.table.columnManager.findColumn(e2.field);
              if (!t2)
                return console.warn("Column Filter Error - No matching column found:", e2.field), false;
              this.setHeaderFilterValue(t2, e2.value);
            }), this.tableInitialized = true;
          }
          remoteFilterParams(e2, t2, i2, s2) {
            return s2.filter = this.getFilters(true, true), s2;
          }
          generatePlaceholder(e2) {
            if (this.table.options.placeholderHeaderFilter && Object.keys(this.headerFilters).length)
              return this.table.options.placeholderHeaderFilter;
          }
          userSetFilter(e2, t2, i2, s2) {
            this.setFilter(e2, t2, i2, s2), this.refreshFilter();
          }
          userRefreshFilter() {
            this.refreshFilter();
          }
          userAddFilter(e2, t2, i2, s2) {
            this.addFilter(e2, t2, i2, s2), this.refreshFilter();
          }
          userSetHeaderFilterFocus(e2) {
            var t2 = this.table.columnManager.findColumn(e2);
            if (!t2)
              return console.warn("Column Filter Focus Error - No matching column found:", e2), false;
            this.setHeaderFilterFocus(t2);
          }
          userGetHeaderFilterValue(e2) {
            var t2 = this.table.columnManager.findColumn(e2);
            if (t2)
              return this.getHeaderFilterValue(t2);
            console.warn("Column Filter Error - No matching column found:", e2);
          }
          userSetHeaderFilterValue(e2, t2) {
            var i2 = this.table.columnManager.findColumn(e2);
            if (!i2)
              return console.warn("Column Filter Error - No matching column found:", e2), false;
            this.setHeaderFilterValue(i2, t2);
          }
          userRemoveFilter(e2, t2, i2) {
            this.removeFilter(e2, t2, i2), this.refreshFilter();
          }
          userClearFilter(e2) {
            this.clearFilter(e2), this.refreshFilter();
          }
          userClearHeaderFilter() {
            this.clearHeaderFilter(), this.refreshFilter();
          }
          searchRows(e2, t2, i2) {
            return this.search("rows", e2, t2, i2);
          }
          searchData(e2, t2, i2) {
            return this.search("data", e2, t2, i2);
          }
          initializeColumnHeaderFilter(e2) {
            e2.definition.headerFilter && this.initializeColumn(e2);
          }
          initializeColumn(e2, t2) {
            var i2 = this, s2 = e2.getField();
            e2.modules.filter = { success: function(t3) {
              var o2, n2 = "input" == e2.modules.filter.tagType && "text" == e2.modules.filter.attrType || "textarea" == e2.modules.filter.tagType ? "partial" : "match", r2 = "", a2 = "";
              if (void 0 === e2.modules.filter.prevSuccess || e2.modules.filter.prevSuccess !== t3) {
                if (e2.modules.filter.prevSuccess = t3, e2.modules.filter.emptyFunc(t3))
                  delete i2.headerFilters[s2];
                else {
                  switch (e2.modules.filter.value = t3, typeof e2.definition.headerFilterFunc) {
                    case "string":
                      _ue.filters[e2.definition.headerFilterFunc] ? (r2 = e2.definition.headerFilterFunc, o2 = function(i3) {
                        var s3 = e2.definition.headerFilterFuncParams || {}, o3 = e2.getFieldValue(i3);
                        return s3 = "function" == typeof s3 ? s3(t3, o3, i3) : s3, _ue.filters[e2.definition.headerFilterFunc](t3, o3, i3, s3);
                      }) : console.warn("Header Filter Error - Matching filter function not found: ", e2.definition.headerFilterFunc);
                      break;
                    case "function":
                      r2 = o2 = function(i3) {
                        var s3 = e2.definition.headerFilterFuncParams || {}, o3 = e2.getFieldValue(i3);
                        return s3 = "function" == typeof s3 ? s3(t3, o3, i3) : s3, e2.definition.headerFilterFunc(t3, o3, i3, s3);
                      };
                  }
                  if (!o2)
                    if ("partial" === n2)
                      o2 = function(i3) {
                        var s3 = e2.getFieldValue(i3);
                        return null != s3 && String(s3).toLowerCase().indexOf(String(t3).toLowerCase()) > -1;
                      }, r2 = "like";
                    else
                      o2 = function(i3) {
                        return e2.getFieldValue(i3) == t3;
                      }, r2 = "=";
                  i2.headerFilters[s2] = { value: t3, func: o2, type: r2 };
                }
                e2.modules.filter.value = t3, a2 = JSON.stringify(i2.headerFilters), i2.prevHeaderFilterChangeCheck !== a2 && (i2.prevHeaderFilterChangeCheck = a2, i2.trackChanges(), i2.refreshFilter());
              }
              return true;
            }, attrType: false, tagType: false, emptyFunc: false }, this.generateHeaderFilterElement(e2);
          }
          generateHeaderFilterElement(e2, t2, i2) {
            var s2, o2, n2, r2, a2, l2, h2, d2, c2 = this, u2 = e2.modules.filter.success, m2 = e2.getField();
            if (e2.modules.filter.value = t2, e2.modules.filter.headerElement && e2.modules.filter.headerElement.parentNode && e2.contentElement.removeChild(e2.modules.filter.headerElement.parentNode), m2) {
              switch (e2.modules.filter.emptyFunc = e2.definition.headerFilterEmptyCheck || function(e3) {
                return !e3 && 0 !== e3;
              }, (s2 = document.createElement("div")).classList.add("tabulator-header-filter"), typeof e2.definition.headerFilter) {
                case "string":
                  c2.table.modules.edit.editors[e2.definition.headerFilter] ? (o2 = c2.table.modules.edit.editors[e2.definition.headerFilter], "tick" !== e2.definition.headerFilter && "tickCross" !== e2.definition.headerFilter || e2.definition.headerFilterEmptyCheck || (e2.modules.filter.emptyFunc = function(e3) {
                    return true !== e3 && false !== e3;
                  })) : console.warn("Filter Error - Cannot build header filter, No such editor found: ", e2.definition.editor);
                  break;
                case "function":
                  o2 = e2.definition.headerFilter;
                  break;
                case "boolean":
                  e2.modules.edit && e2.modules.edit.editor ? o2 = e2.modules.edit.editor : e2.definition.formatter && c2.table.modules.edit.editors[e2.definition.formatter] ? (o2 = c2.table.modules.edit.editors[e2.definition.formatter], "tick" !== e2.definition.formatter && "tickCross" !== e2.definition.formatter || e2.definition.headerFilterEmptyCheck || (e2.modules.filter.emptyFunc = function(e3) {
                    return true !== e3 && false !== e3;
                  })) : o2 = c2.table.modules.edit.editors.input;
              }
              if (o2) {
                if (r2 = { getValue: function() {
                  return void 0 !== t2 ? t2 : "";
                }, getField: function() {
                  return e2.definition.field;
                }, getElement: function() {
                  return s2;
                }, getColumn: function() {
                  return e2.getComponent();
                }, getTable: () => this.table, getType: () => "header", getRow: function() {
                  return { normalizeHeight: function() {
                  } };
                } }, h2 = "function" == typeof (h2 = e2.definition.headerFilterParams || {}) ? h2.call(c2.table, r2) : h2, !(n2 = o2.call(this.table.modules.edit, r2, function(e3) {
                  d2 = e3;
                }, u2, function() {
                }, h2)))
                  return void console.warn("Filter Error - Cannot add filter to " + m2 + " column, editor returned a value of false");
                if (!(n2 instanceof Node))
                  return void console.warn("Filter Error - Cannot add filter to " + m2 + " column, editor should return an instance of Node, the editor returned:", n2);
                c2.langBind("headerFilters|columns|" + e2.definition.field, function(t3) {
                  n2.setAttribute("placeholder", void 0 !== t3 && t3 ? t3 : e2.definition.headerFilterPlaceholder || c2.langText("headerFilters|default"));
                }), n2.addEventListener("click", function(e3) {
                  e3.stopPropagation(), n2.focus();
                }), n2.addEventListener("focus", (e3) => {
                  var t3 = this.table.columnManager.contentsElement.scrollLeft;
                  t3 !== this.table.rowManager.element.scrollLeft && (this.table.rowManager.scrollHorizontal(t3), this.table.columnManager.scrollHorizontal(t3));
                }), a2 = false, l2 = function(e3) {
                  a2 && clearTimeout(a2), a2 = setTimeout(function() {
                    u2(n2.value);
                  }, c2.table.options.headerFilterLiveFilterDelay);
                }, e2.modules.filter.headerElement = n2, e2.modules.filter.attrType = n2.hasAttribute("type") ? n2.getAttribute("type").toLowerCase() : "", e2.modules.filter.tagType = n2.tagName.toLowerCase(), false !== e2.definition.headerFilterLiveFilter && ("autocomplete" !== e2.definition.headerFilter && "tickCross" !== e2.definition.headerFilter && ("autocomplete" !== e2.definition.editor && "tickCross" !== e2.definition.editor || true !== e2.definition.headerFilter) && (n2.addEventListener("keyup", l2), n2.addEventListener("search", l2), "number" == e2.modules.filter.attrType && n2.addEventListener("change", function(e3) {
                  u2(n2.value);
                }), "text" == e2.modules.filter.attrType && "ie" !== this.table.browser && n2.setAttribute("type", "search")), "input" != e2.modules.filter.tagType && "select" != e2.modules.filter.tagType && "textarea" != e2.modules.filter.tagType || n2.addEventListener("mousedown", function(e3) {
                  e3.stopPropagation();
                })), s2.appendChild(n2), e2.contentElement.appendChild(s2), i2 || c2.headerFilterColumns.push(e2), d2 && d2();
              }
            } else
              console.warn("Filter Error - Cannot add header filter, column has no field set:", e2.definition.title);
          }
          hideHeaderFilterElements() {
            this.headerFilterColumns.forEach(function(e2) {
              e2.modules.filter && e2.modules.filter.headerElement && (e2.modules.filter.headerElement.style.display = "none");
            });
          }
          showHeaderFilterElements() {
            this.headerFilterColumns.forEach(function(e2) {
              e2.modules.filter && e2.modules.filter.headerElement && (e2.modules.filter.headerElement.style.display = "");
            });
          }
          setHeaderFilterFocus(e2) {
            e2.modules.filter && e2.modules.filter.headerElement ? e2.modules.filter.headerElement.focus() : console.warn("Column Filter Focus Error - No header filter set on column:", e2.getField());
          }
          getHeaderFilterValue(e2) {
            if (e2.modules.filter && e2.modules.filter.headerElement)
              return e2.modules.filter.value;
            console.warn("Column Filter Error - No header filter set on column:", e2.getField());
          }
          setHeaderFilterValue(e2, t2) {
            e2 && (e2.modules.filter && e2.modules.filter.headerElement ? (this.generateHeaderFilterElement(e2, t2, true), e2.modules.filter.success(t2)) : console.warn("Column Filter Error - No header filter set on column:", e2.getField()));
          }
          reloadHeaderFilter(e2) {
            e2 && (e2.modules.filter && e2.modules.filter.headerElement ? this.generateHeaderFilterElement(e2, e2.modules.filter.value, true) : console.warn("Column Filter Error - No header filter set on column:", e2.getField()));
          }
          refreshFilter() {
            this.tableInitialized && ("remote" === this.table.options.filterMode ? this.reloadData(null, false, false) : this.refreshData(true));
          }
          trackChanges() {
            this.changed = true, this.dispatch("filter-changed");
          }
          hasChanged() {
            var e2 = this.changed;
            return this.changed = false, e2;
          }
          setFilter(e2, t2, i2, s2) {
            this.filterList = [], Array.isArray(e2) || (e2 = [{ field: e2, type: t2, value: i2, params: s2 }]), this.addFilter(e2);
          }
          addFilter(e2, t2, i2, s2) {
            var o2 = false;
            Array.isArray(e2) || (e2 = [{ field: e2, type: t2, value: i2, params: s2 }]), e2.forEach((e3) => {
              (e3 = this.findFilter(e3)) && (this.filterList.push(e3), o2 = true);
            }), o2 && this.trackChanges();
          }
          findFilter(e2) {
            var t2;
            if (Array.isArray(e2))
              return this.findSubFilters(e2);
            var i2 = false;
            return "function" == typeof e2.field ? i2 = function(t3) {
              return e2.field(t3, e2.type || {});
            } : _ue.filters[e2.type] ? i2 = (t2 = this.table.columnManager.getColumnByField(e2.field)) ? function(i3) {
              return _ue.filters[e2.type](e2.value, t2.getFieldValue(i3), i3, e2.params || {});
            } : function(t3) {
              return _ue.filters[e2.type](e2.value, t3[e2.field], t3, e2.params || {});
            } : console.warn("Filter Error - No such filter type found, ignoring: ", e2.type), e2.func = i2, !!e2.func && e2;
          }
          findSubFilters(e2) {
            var t2 = [];
            return e2.forEach((e3) => {
              (e3 = this.findFilter(e3)) && t2.push(e3);
            }), !!t2.length && t2;
          }
          getFilters(e2, t2) {
            var i2 = [];
            return e2 && (i2 = this.getHeaderFilters()), t2 && i2.forEach(function(e3) {
              "function" == typeof e3.type && (e3.type = "function");
            }), i2 = i2.concat(this.filtersToArray(this.filterList, t2));
          }
          filtersToArray(e2, t2) {
            var i2 = [];
            return e2.forEach((e3) => {
              var s2;
              Array.isArray(e3) ? i2.push(this.filtersToArray(e3, t2)) : (s2 = { field: e3.field, type: e3.type, value: e3.value }, t2 && "function" == typeof s2.type && (s2.type = "function"), i2.push(s2));
            }), i2;
          }
          getHeaderFilters() {
            var e2 = [];
            for (var t2 in this.headerFilters)
              e2.push({ field: t2, type: this.headerFilters[t2].type, value: this.headerFilters[t2].value });
            return e2;
          }
          removeFilter(e2, t2, i2) {
            Array.isArray(e2) || (e2 = [{ field: e2, type: t2, value: i2 }]), e2.forEach((e3) => {
              var t3 = -1;
              (t3 = "object" == typeof e3.field ? this.filterList.findIndex((t4) => e3 === t4) : this.filterList.findIndex((t4) => e3.field === t4.field && e3.type === t4.type && e3.value === t4.value)) > -1 ? this.filterList.splice(t3, 1) : console.warn("Filter Error - No matching filter type found, ignoring: ", e3.type);
            }), this.trackChanges();
          }
          clearFilter(e2) {
            this.filterList = [], e2 && this.clearHeaderFilter(), this.trackChanges();
          }
          clearHeaderFilter() {
            this.headerFilters = {}, this.prevHeaderFilterChangeCheck = "{}", this.headerFilterColumns.forEach((e2) => {
              void 0 !== e2.modules.filter.value && delete e2.modules.filter.value, e2.modules.filter.prevSuccess = void 0, this.reloadHeaderFilter(e2);
            }), this.trackChanges();
          }
          search(e2, t2, i2, s2) {
            var o2 = [], n2 = [];
            return Array.isArray(t2) || (t2 = [{ field: t2, type: i2, value: s2 }]), t2.forEach((e3) => {
              (e3 = this.findFilter(e3)) && n2.push(e3);
            }), this.table.rowManager.rows.forEach((t3) => {
              var i3 = true;
              n2.forEach((e3) => {
                this.filterRecurse(e3, t3.getData()) || (i3 = false);
              }), i3 && o2.push("data" === e2 ? t3.getData("data") : t3.getComponent());
            }), o2;
          }
          filter(e2, t2) {
            var i2 = [], s2 = [];
            return this.subscribedExternal("dataFiltering") && this.dispatchExternal("dataFiltering", this.getFilters(true)), "remote" !== this.table.options.filterMode && (this.filterList.length || Object.keys(this.headerFilters).length) ? e2.forEach((e3) => {
              this.filterRow(e3) && i2.push(e3);
            }) : i2 = e2.slice(0), this.subscribedExternal("dataFiltered") && (i2.forEach((e3) => {
              s2.push(e3.getComponent());
            }), this.dispatchExternal("dataFiltered", this.getFilters(true), s2)), i2;
          }
          filterRow(e2, t2) {
            var i2 = true, s2 = e2.getData();
            for (var o2 in this.filterList.forEach((e3) => {
              this.filterRecurse(e3, s2) || (i2 = false);
            }), this.headerFilters)
              this.headerFilters[o2].func(s2) || (i2 = false);
            return i2;
          }
          filterRecurse(e2, t2) {
            var i2 = false;
            return Array.isArray(e2) ? e2.forEach((e3) => {
              this.filterRecurse(e3, t2) && (i2 = true);
            }) : i2 = e2.func(t2), i2;
          }
        };
        let ue = _ue;
        __publicField(ue, "moduleName", "filter");
        __publicField(ue, "filters", ce);
        var me = { plaintext: function(e2, t2, i2) {
          return this.emptyToSpace(this.sanitizeHTML(e2.getValue()));
        }, html: function(e2, t2, i2) {
          return e2.getValue();
        }, textarea: function(e2, t2, i2) {
          return e2.getElement().style.whiteSpace = "pre-wrap", this.emptyToSpace(this.sanitizeHTML(e2.getValue()));
        }, money: function(e2, t2, i2) {
          var s2, o2, n2, r2, a2, l2 = parseFloat(e2.getValue()), h2 = "", d2 = t2.decimal || ".", c2 = t2.thousand || ",", u2 = t2.negativeSign || "-", m2 = t2.symbol || "", p2 = !!t2.symbolAfter, g2 = void 0 !== t2.precision ? t2.precision : 2;
          if (isNaN(l2))
            return this.emptyToSpace(this.sanitizeHTML(e2.getValue()));
          if (l2 < 0 && (l2 = Math.abs(l2), h2 = u2), s2 = false !== g2 ? l2.toFixed(g2) : l2, o2 = (s2 = String(s2).split("."))[0], n2 = s2.length > 1 ? d2 + s2[1] : "", false !== t2.thousand)
            for (r2 = /(\d+)(\d{3})/; r2.test(o2); )
              o2 = o2.replace(r2, "$1" + c2 + "$2");
          return a2 = o2 + n2, true === h2 ? (a2 = "(" + a2 + ")", p2 ? a2 + m2 : m2 + a2) : p2 ? h2 + a2 + m2 : h2 + m2 + a2;
        }, link: function(e2, t2, i2) {
          var s2, o2 = e2.getValue(), n2 = t2.urlPrefix || "", r2 = t2.download, l2 = o2, h2 = document.createElement("a");
          if (t2.labelField && (s2 = e2.getData(), l2 = function e3(t3, i3) {
            var s3 = i3[t3.shift()];
            return t3.length && "object" == typeof s3 ? e3(t3, s3) : s3;
          }(t2.labelField.split(this.table.options.nestedFieldSeparator), s2)), t2.label)
            switch (typeof t2.label) {
              case "string":
                l2 = t2.label;
                break;
              case "function":
                l2 = t2.label(e2);
            }
          if (l2) {
            if (t2.urlField && (s2 = e2.getData(), o2 = a.retrieveNestedData(this.table.options.nestedFieldSeparator, t2.urlField, s2)), t2.url)
              switch (typeof t2.url) {
                case "string":
                  o2 = t2.url;
                  break;
                case "function":
                  o2 = t2.url(e2);
              }
            return h2.setAttribute("href", n2 + o2), t2.target && h2.setAttribute("target", t2.target), t2.download && (r2 = "function" == typeof r2 ? r2(e2) : true === r2 ? "" : r2, h2.setAttribute("download", r2)), h2.innerHTML = this.emptyToSpace(this.sanitizeHTML(l2)), h2;
          }
          return "&nbsp;";
        }, image: function(e2, t2, i2) {
          var s2 = document.createElement("img"), o2 = e2.getValue();
          switch (t2.urlPrefix && (o2 = t2.urlPrefix + e2.getValue()), t2.urlSuffix && (o2 += t2.urlSuffix), s2.setAttribute("src", o2), typeof t2.height) {
            case "number":
              s2.style.height = t2.height + "px";
              break;
            case "string":
              s2.style.height = t2.height;
          }
          switch (typeof t2.width) {
            case "number":
              s2.style.width = t2.width + "px";
              break;
            case "string":
              s2.style.width = t2.width;
          }
          return s2.addEventListener("load", function() {
            e2.getRow().normalizeHeight();
          }), s2;
        }, tickCross: function(e2, t2, i2) {
          var s2 = e2.getValue(), o2 = e2.getElement(), n2 = t2.allowEmpty, r2 = t2.allowTruthy, a2 = Object.keys(t2).includes("trueValue"), l2 = void 0 !== t2.tickElement ? t2.tickElement : '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>', h2 = void 0 !== t2.crossElement ? t2.crossElement : '<svg enable-background="new 0 0 24 24" height="14" width="14"  viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';
          return a2 && s2 === t2.trueValue || !a2 && (r2 && s2 || true === s2 || "true" === s2 || "True" === s2 || 1 === s2 || "1" === s2) ? (o2.setAttribute("aria-checked", true), l2 || "") : !n2 || "null" !== s2 && "" !== s2 && null != s2 ? (o2.setAttribute("aria-checked", false), h2 || "") : (o2.setAttribute("aria-checked", "mixed"), "");
        }, datetime: function(e2, t2, i2) {
          var s2, o2 = window.DateTime || luxon.DateTime, n2 = t2.inputFormat || "yyyy-MM-dd HH:mm:ss", r2 = t2.outputFormat || "dd/MM/yyyy HH:mm:ss", a2 = void 0 !== t2.invalidPlaceholder ? t2.invalidPlaceholder : "", l2 = e2.getValue();
          if (void 0 !== o2)
            return (s2 = o2.isDateTime(l2) ? l2 : "iso" === n2 ? o2.fromISO(String(l2)) : o2.fromFormat(String(l2), n2)).isValid ? (t2.timezone && (s2 = s2.setZone(t2.timezone)), s2.toFormat(r2)) : true !== a2 && l2 ? "function" == typeof a2 ? a2(l2) : a2 : l2;
          console.error("Format Error - 'datetime' formatter is dependant on luxon.js");
        }, datetimediff: function(e2, t2, i2) {
          var s2, o2 = window.DateTime || luxon.DateTime, n2 = t2.inputFormat || "yyyy-MM-dd HH:mm:ss", r2 = void 0 !== t2.invalidPlaceholder ? t2.invalidPlaceholder : "", a2 = void 0 !== t2.suffix && t2.suffix, l2 = void 0 !== t2.unit ? t2.unit : "days", h2 = void 0 !== t2.humanize && t2.humanize, d2 = void 0 !== t2.date ? t2.date : o2.now(), c2 = e2.getValue();
          if (void 0 !== o2)
            return (s2 = o2.isDateTime(c2) ? c2 : "iso" === n2 ? o2.fromISO(String(c2)) : o2.fromFormat(String(c2), n2)).isValid ? h2 ? s2.diff(d2, l2).toHuman() + (a2 ? " " + a2 : "") : parseInt(s2.diff(d2, l2)[l2]) + (a2 ? " " + a2 : "") : true === r2 ? c2 : "function" == typeof r2 ? r2(c2) : r2;
          console.error("Format Error - 'datetimediff' formatter is dependant on luxon.js");
        }, lookup: function(e2, t2, i2) {
          var s2 = e2.getValue();
          return void 0 === t2[s2] ? (console.warn("Missing display value for " + s2), s2) : t2[s2];
        }, star: function(e2, t2, i2) {
          var s2 = e2.getValue(), o2 = e2.getElement(), n2 = t2 && t2.stars ? t2.stars : 5, r2 = document.createElement("span"), a2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          r2.style.verticalAlign = "middle", a2.setAttribute("width", "14"), a2.setAttribute("height", "14"), a2.setAttribute("viewBox", "0 0 512 512"), a2.setAttribute("xml:space", "preserve"), a2.style.padding = "0 1px", s2 = s2 && !isNaN(s2) ? parseInt(s2) : 0, s2 = Math.max(0, Math.min(s2, n2));
          for (var l2 = 1; l2 <= n2; l2++) {
            var h2 = a2.cloneNode(true);
            h2.innerHTML = l2 <= s2 ? '<polygon fill="#FFEA00" stroke="#C1AB60" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>' : '<polygon fill="#D2D2D2" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>', r2.appendChild(h2);
          }
          return o2.style.whiteSpace = "nowrap", o2.style.overflow = "hidden", o2.style.textOverflow = "ellipsis", o2.setAttribute("aria-label", s2), r2;
        }, traffic: function(e2, t2, i2) {
          var s2, o2, n2 = this.sanitizeHTML(e2.getValue()) || 0, r2 = document.createElement("span"), a2 = t2 && t2.max ? t2.max : 100, l2 = t2 && t2.min ? t2.min : 0, h2 = t2 && void 0 !== t2.color ? t2.color : ["red", "orange", "green"], d2 = "#666666";
          if (!isNaN(n2) && void 0 !== e2.getValue()) {
            switch (r2.classList.add("tabulator-traffic-light"), o2 = parseFloat(n2) <= a2 ? parseFloat(n2) : a2, o2 = parseFloat(o2) >= l2 ? parseFloat(o2) : l2, s2 = (a2 - l2) / 100, o2 = Math.round((o2 - l2) / s2), typeof h2) {
              case "string":
                d2 = h2;
                break;
              case "function":
                d2 = h2(n2);
                break;
              case "object":
                if (Array.isArray(h2)) {
                  var c2 = 100 / h2.length, u2 = Math.floor(o2 / c2);
                  u2 = Math.min(u2, h2.length - 1), d2 = h2[u2 = Math.max(u2, 0)];
                  break;
                }
            }
            return r2.style.backgroundColor = d2, r2;
          }
        }, progress: function(e2, t2 = {}, i2) {
          var s2, n2, r2, a2, l2, h2 = this.sanitizeHTML(e2.getValue()) || 0, d2 = e2.getElement(), c2 = t2.max ? t2.max : 100, u2 = t2.min ? t2.min : 0, m2 = t2.legendAlign ? t2.legendAlign : "center";
          switch (n2 = parseFloat(h2) <= c2 ? parseFloat(h2) : c2, n2 = parseFloat(n2) >= u2 ? parseFloat(n2) : u2, s2 = (c2 - u2) / 100, n2 = Math.round((n2 - u2) / s2), typeof t2.color) {
            case "string":
              r2 = t2.color;
              break;
            case "function":
              r2 = t2.color(h2);
              break;
            case "object":
              if (Array.isArray(t2.color)) {
                let e3 = 100 / t2.color.length, i3 = Math.floor(n2 / e3);
                i3 = Math.min(i3, t2.color.length - 1), i3 = Math.max(i3, 0), r2 = t2.color[i3];
                break;
              }
            default:
              r2 = "#2DC214";
          }
          switch (typeof t2.legend) {
            case "string":
              a2 = t2.legend;
              break;
            case "function":
              a2 = t2.legend(h2);
              break;
            case "boolean":
              a2 = h2;
              break;
            default:
              a2 = false;
          }
          switch (typeof t2.legendColor) {
            case "string":
              l2 = t2.legendColor;
              break;
            case "function":
              l2 = t2.legendColor(h2);
              break;
            case "object":
              if (Array.isArray(t2.legendColor)) {
                let e3 = 100 / t2.legendColor.length, i3 = Math.floor(n2 / e3);
                i3 = Math.min(i3, t2.legendColor.length - 1), i3 = Math.max(i3, 0), l2 = t2.legendColor[i3];
              }
              break;
            default:
              l2 = "#000";
          }
          d2.style.minWidth = "30px", d2.style.position = "relative", d2.setAttribute("aria-label", n2);
          var p2 = document.createElement("div");
          p2.style.display = "inline-block", p2.style.width = n2 + "%", p2.style.backgroundColor = r2, p2.style.height = "100%", p2.setAttribute("data-max", c2), p2.setAttribute("data-min", u2);
          var g2 = document.createElement("div");
          if (g2.style.position = "relative", g2.style.width = "100%", g2.style.height = "100%", a2) {
            var b2 = document.createElement("div");
            b2.style.position = "absolute", b2.style.top = 0, b2.style.left = 0, b2.style.textAlign = m2, b2.style.width = "100%", b2.style.color = l2, b2.innerHTML = a2;
          }
          return i2(function() {
            if (!(e2 instanceof o)) {
              var t3 = document.createElement("div");
              t3.style.position = "absolute", t3.style.top = "4px", t3.style.bottom = "4px", t3.style.left = "4px", t3.style.right = "4px", d2.appendChild(t3), d2 = t3;
            }
            d2.appendChild(g2), g2.appendChild(p2), a2 && g2.appendChild(b2);
          }), "";
        }, color: function(e2, t2, i2) {
          return e2.getElement().style.backgroundColor = this.sanitizeHTML(e2.getValue()), "";
        }, buttonTick: function(e2, t2, i2) {
          return '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>';
        }, buttonCross: function(e2, t2, i2) {
          return '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';
        }, toggle: function(e2, t2, i2) {
          var s2, o2, n2 = e2.getValue(), r2 = t2.size || 15, a2 = r2 + "px", l2 = !t2.hasOwnProperty("onValue") || t2.onValue, h2 = !!t2.hasOwnProperty("offValue") && t2.offValue, d2 = t2.onTruthy ? n2 : n2 === l2;
          return (s2 = document.createElement("div")).classList.add("tabulator-toggle"), d2 ? (s2.classList.add("tabulator-toggle-on"), s2.style.flexDirection = "row-reverse", t2.onColor && (s2.style.background = t2.onColor)) : t2.offColor && (s2.style.background = t2.offColor), s2.style.width = 2.5 * r2 + "px", s2.style.borderRadius = a2, t2.clickable && s2.addEventListener("click", (t3) => {
            e2.setValue(d2 ? h2 : l2);
          }), (o2 = document.createElement("div")).classList.add("tabulator-toggle-switch"), o2.style.height = a2, o2.style.width = a2, o2.style.borderRadius = a2, s2.appendChild(o2), s2;
        }, rownum: function(e2, t2, i2) {
          var s2 = document.createElement("span"), o2 = e2.getRow(), n2 = e2.getTable();
          return o2.watchPosition((e3) => {
            t2.relativeToPage && (e3 += n2.modules.page.getPageSize() * (n2.modules.page.getPage() - 1)), s2.innerText = e3;
          }), s2;
        }, handle: function(e2, t2, i2) {
          return e2.getElement().classList.add("tabulator-row-handle"), "<div class='tabulator-row-handle-box'><div class='tabulator-row-handle-bar'></div><div class='tabulator-row-handle-bar'></div><div class='tabulator-row-handle-bar'></div></div>";
        } };
        const _pe = class extends M {
          constructor(e2) {
            super(e2), this.registerColumnOption("formatter"), this.registerColumnOption("formatterParams"), this.registerColumnOption("formatterPrint"), this.registerColumnOption("formatterPrintParams"), this.registerColumnOption("formatterClipboard"), this.registerColumnOption("formatterClipboardParams"), this.registerColumnOption("formatterHtmlOutput"), this.registerColumnOption("formatterHtmlOutputParams"), this.registerColumnOption("titleFormatter"), this.registerColumnOption("titleFormatterParams");
          }
          initialize() {
            this.subscribe("cell-format", this.formatValue.bind(this)), this.subscribe("cell-rendered", this.cellRendered.bind(this)), this.subscribe("column-layout", this.initializeColumn.bind(this)), this.subscribe("column-format", this.formatHeader.bind(this));
          }
          initializeColumn(e2) {
            e2.modules.format = this.lookupFormatter(e2, ""), void 0 !== e2.definition.formatterPrint && (e2.modules.format.print = this.lookupFormatter(e2, "Print")), void 0 !== e2.definition.formatterClipboard && (e2.modules.format.clipboard = this.lookupFormatter(e2, "Clipboard")), void 0 !== e2.definition.formatterHtmlOutput && (e2.modules.format.htmlOutput = this.lookupFormatter(e2, "HtmlOutput"));
          }
          lookupFormatter(e2, t2) {
            var i2 = { params: e2.definition["formatter" + t2 + "Params"] || {} }, s2 = e2.definition["formatter" + t2];
            switch (typeof s2) {
              case "string":
                _pe.formatters[s2] ? i2.formatter = _pe.formatters[s2] : (console.warn("Formatter Error - No such formatter found: ", s2), i2.formatter = _pe.formatters.plaintext);
                break;
              case "function":
                i2.formatter = s2;
                break;
              default:
                i2.formatter = _pe.formatters.plaintext;
            }
            return i2;
          }
          cellRendered(e2) {
            e2.modules.format && e2.modules.format.renderedCallback && !e2.modules.format.rendered && (e2.modules.format.renderedCallback(), e2.modules.format.rendered = true);
          }
          formatHeader(e2, t2, i2) {
            var s2, o2, n2, r2;
            return e2.definition.titleFormatter ? (s2 = this.getFormatter(e2.definition.titleFormatter), n2 = (t3) => {
              e2.titleFormatterRendered = t3;
            }, r2 = { getValue: function() {
              return t2;
            }, getElement: function() {
              return i2;
            }, getType: function() {
              return "header";
            }, getColumn: function() {
              return e2.getComponent();
            }, getTable: () => this.table }, o2 = "function" == typeof (o2 = e2.definition.titleFormatterParams || {}) ? o2() : o2, s2.call(this, r2, o2, n2)) : t2;
          }
          formatValue(e2) {
            var t2 = e2.getComponent(), i2 = "function" == typeof e2.column.modules.format.params ? e2.column.modules.format.params(t2) : e2.column.modules.format.params;
            return e2.column.modules.format.formatter.call(this, t2, i2, function(t3) {
              e2.modules.format || (e2.modules.format = {}), e2.modules.format.renderedCallback = t3, e2.modules.format.rendered = false;
            });
          }
          formatExportValue(e2, t2) {
            var i2, s2 = e2.column.modules.format[t2];
            if (s2) {
              let o2 = function(t3) {
                e2.modules.format || (e2.modules.format = {}), e2.modules.format.renderedCallback = t3, e2.modules.format.rendered = false;
              };
              return i2 = "function" == typeof s2.params ? s2.params(e2.getComponent()) : s2.params, s2.formatter.call(this, e2.getComponent(), i2, o2);
            }
            return this.formatValue(e2);
          }
          sanitizeHTML(e2) {
            if (e2) {
              var t2 = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;", "`": "&#x60;", "=": "&#x3D;" };
              return String(e2).replace(/[&<>"'`=/]/g, function(e3) {
                return t2[e3];
              });
            }
            return e2;
          }
          emptyToSpace(e2) {
            return null == e2 || "" === e2 ? "&nbsp;" : e2;
          }
          getFormatter(e2) {
            switch (typeof e2) {
              case "string":
                _pe.formatters[e2] ? e2 = _pe.formatters[e2] : (console.warn("Formatter Error - No such formatter found: ", e2), e2 = _pe.formatters.plaintext);
                break;
              case "function":
                break;
              default:
                e2 = _pe.formatters.plaintext;
            }
            return e2;
          }
        };
        let pe = _pe;
        __publicField(pe, "moduleName", "format");
        __publicField(pe, "formatters", me);
        class ge {
          constructor(e2) {
            return this._group = e2, this.type = "GroupComponent", new Proxy(this, { get: function(e3, t2, i2) {
              return void 0 !== e3[t2] ? e3[t2] : e3._group.groupManager.table.componentFunctionBinder.handle("group", e3._group, t2);
            } });
          }
          getKey() {
            return this._group.key;
          }
          getField() {
            return this._group.field;
          }
          getElement() {
            return this._group.element;
          }
          getRows() {
            return this._group.getRows(true);
          }
          getSubGroups() {
            return this._group.getSubGroups(true);
          }
          getParentGroup() {
            return !!this._group.parent && this._group.parent.getComponent();
          }
          isVisible() {
            return this._group.visible;
          }
          show() {
            this._group.show();
          }
          hide() {
            this._group.hide();
          }
          toggle() {
            this._group.toggleVisibility();
          }
          scrollTo(e2, t2) {
            return this._group.groupManager.table.rowManager.scrollToRow(this._group, e2, t2);
          }
          _getSelf() {
            return this._group;
          }
          getTable() {
            return this._group.groupManager.table;
          }
        }
        class be {
          constructor(e2, t2, i2, s2, o2, n2, r2) {
            this.groupManager = e2, this.parent = t2, this.key = s2, this.level = i2, this.field = o2, this.hasSubGroups = i2 < e2.groupIDLookups.length - 1, this.addRow = this.hasSubGroups ? this._addRowToGroup : this._addRow, this.type = "group", this.old = r2, this.rows = [], this.groups = [], this.groupList = [], this.generator = n2, this.element = false, this.elementContents = false, this.height = 0, this.outerHeight = 0, this.initialized = false, this.calcs = {}, this.initialized = false, this.modules = {}, this.arrowElement = false, this.visible = r2 ? r2.visible : void 0 !== e2.startOpen[i2] ? e2.startOpen[i2] : e2.startOpen[0], this.component = null, this.createElements(), this.addBindings(), this.createValueGroups();
          }
          wipe(e2) {
            e2 || (this.groupList.length ? this.groupList.forEach(function(e3) {
              e3.wipe();
            }) : this.rows.forEach((e3) => {
              e3.modules && delete e3.modules.group;
            })), this.element = false, this.arrowElement = false, this.elementContents = false;
          }
          createElements() {
            var e2 = document.createElement("div");
            e2.classList.add("tabulator-arrow"), this.element = document.createElement("div"), this.element.classList.add("tabulator-row"), this.element.classList.add("tabulator-group"), this.element.classList.add("tabulator-group-level-" + this.level), this.element.setAttribute("role", "rowgroup"), this.arrowElement = document.createElement("div"), this.arrowElement.classList.add("tabulator-group-toggle"), this.arrowElement.appendChild(e2), false !== this.groupManager.table.options.movableRows && this.groupManager.table.modExists("moveRow") && this.groupManager.table.modules.moveRow.initializeGroupHeader(this);
          }
          createValueGroups() {
            var e2 = this.level + 1;
            this.groupManager.allowedValues && this.groupManager.allowedValues[e2] && this.groupManager.allowedValues[e2].forEach((t2) => {
              this._createGroup(t2, e2);
            });
          }
          addBindings() {
            this.groupManager.table.options.groupToggleElement && ("arrow" == this.groupManager.table.options.groupToggleElement ? this.arrowElement : this.element).addEventListener("click", (e2) => {
              "arrow" === this.groupManager.table.options.groupToggleElement && (e2.stopPropagation(), e2.stopImmediatePropagation()), setTimeout(() => {
                this.toggleVisibility();
              });
            });
          }
          _createGroup(e2, t2) {
            var i2 = t2 + "_" + e2, s2 = new be(this.groupManager, this, t2, e2, this.groupManager.groupIDLookups[t2].field, this.groupManager.headerGenerator[t2] || this.groupManager.headerGenerator[0], !!this.old && this.old.groups[i2]);
            this.groups[i2] = s2, this.groupList.push(s2);
          }
          _addRowToGroup(e2) {
            var t2 = this.level + 1;
            if (this.hasSubGroups) {
              var i2 = this.groupManager.groupIDLookups[t2].func(e2.getData()), s2 = t2 + "_" + i2;
              this.groupManager.allowedValues && this.groupManager.allowedValues[t2] ? this.groups[s2] && this.groups[s2].addRow(e2) : (this.groups[s2] || this._createGroup(i2, t2), this.groups[s2].addRow(e2));
            }
          }
          _addRow(e2) {
            this.rows.push(e2), e2.modules.group = this;
          }
          insertRow(e2, t2, i2) {
            var s2 = this.conformRowData({});
            e2.updateData(s2);
            var o2 = this.rows.indexOf(t2);
            o2 > -1 ? i2 ? this.rows.splice(o2 + 1, 0, e2) : this.rows.splice(o2, 0, e2) : i2 ? this.rows.push(e2) : this.rows.unshift(e2), e2.modules.group = this, this.groupManager.table.modExists("columnCalcs") && "table" != this.groupManager.table.options.columnCalcs && this.groupManager.table.modules.columnCalcs.recalcGroup(this), this.groupManager.updateGroupRows(true);
          }
          scrollHeader(e2) {
            this.arrowElement && (this.arrowElement.style.marginLeft = e2, this.groupList.forEach(function(t2) {
              t2.scrollHeader(e2);
            }));
          }
          getRowIndex(e2) {
          }
          conformRowData(e2) {
            return this.field ? e2[this.field] = this.key : console.warn("Data Conforming Error - Cannot conform row data to match new group as groupBy is a function"), this.parent && (e2 = this.parent.conformRowData(e2)), e2;
          }
          removeRow(e2) {
            var t2 = this.rows.indexOf(e2), i2 = e2.getElement();
            t2 > -1 && this.rows.splice(t2, 1), this.groupManager.table.options.groupValues || this.rows.length ? (i2.parentNode && i2.parentNode.removeChild(i2), this.groupManager.blockRedraw || (this.generateGroupHeaderContents(), this.groupManager.table.modExists("columnCalcs") && "table" != this.groupManager.table.options.columnCalcs && this.groupManager.table.modules.columnCalcs.recalcGroup(this))) : (this.parent ? this.parent.removeGroup(this) : this.groupManager.removeGroup(this), this.groupManager.updateGroupRows(true));
          }
          removeGroup(e2) {
            var t2, i2 = e2.level + "_" + e2.key;
            this.groups[i2] && (delete this.groups[i2], (t2 = this.groupList.indexOf(e2)) > -1 && this.groupList.splice(t2, 1), this.groupList.length || (this.parent ? this.parent.removeGroup(this) : this.groupManager.removeGroup(this)));
          }
          getHeadersAndRows() {
            var e2 = [];
            return e2.push(this), this._visSet(), this.calcs.top && (this.calcs.top.detachElement(), this.calcs.top.deleteCells()), this.calcs.bottom && (this.calcs.bottom.detachElement(), this.calcs.bottom.deleteCells()), this.visible ? this.groupList.length ? this.groupList.forEach(function(t2) {
              e2 = e2.concat(t2.getHeadersAndRows());
            }) : ("table" != this.groupManager.table.options.columnCalcs && this.groupManager.table.modExists("columnCalcs") && this.groupManager.table.modules.columnCalcs.hasTopCalcs() && (this.calcs.top = this.groupManager.table.modules.columnCalcs.generateTopRow(this.rows), e2.push(this.calcs.top)), e2 = e2.concat(this.rows), "table" != this.groupManager.table.options.columnCalcs && this.groupManager.table.modExists("columnCalcs") && this.groupManager.table.modules.columnCalcs.hasBottomCalcs() && (this.calcs.bottom = this.groupManager.table.modules.columnCalcs.generateBottomRow(this.rows), e2.push(this.calcs.bottom))) : this.groupList.length || "table" == this.groupManager.table.options.columnCalcs || this.groupManager.table.modExists("columnCalcs") && (this.groupManager.table.modules.columnCalcs.hasTopCalcs() && this.groupManager.table.options.groupClosedShowCalcs && (this.calcs.top = this.groupManager.table.modules.columnCalcs.generateTopRow(this.rows), e2.push(this.calcs.top)), this.groupManager.table.modules.columnCalcs.hasBottomCalcs() && this.groupManager.table.options.groupClosedShowCalcs && (this.calcs.bottom = this.groupManager.table.modules.columnCalcs.generateBottomRow(this.rows), e2.push(this.calcs.bottom))), e2;
          }
          getData(e2, t2) {
            var i2 = [];
            return this._visSet(), (!e2 || e2 && this.visible) && this.rows.forEach((e3) => {
              i2.push(e3.getData(t2 || "data"));
            }), i2;
          }
          getRowCount() {
            var e2 = 0;
            return this.groupList.length ? this.groupList.forEach((t2) => {
              e2 += t2.getRowCount();
            }) : e2 = this.rows.length, e2;
          }
          toggleVisibility() {
            this.visible ? this.hide() : this.show();
          }
          hide() {
            this.visible = false, "basic" != this.groupManager.table.rowManager.getRenderMode() || this.groupManager.table.options.pagination || (this.element.classList.remove("tabulator-group-visible"), this.groupList.length ? this.groupList.forEach((e2) => {
              e2.getHeadersAndRows().forEach((e3) => {
                e3.detachElement();
              });
            }) : this.rows.forEach((e2) => {
              var t2 = e2.getElement();
              t2.parentNode.removeChild(t2);
            })), this.groupManager.updateGroupRows(true), this.groupManager.table.externalEvents.dispatch("groupVisibilityChanged", this.getComponent(), false);
          }
          show() {
            if (this.visible = true, "basic" != this.groupManager.table.rowManager.getRenderMode() || this.groupManager.table.options.pagination)
              this.groupManager.updateGroupRows(true);
            else {
              this.element.classList.add("tabulator-group-visible");
              var e2 = this.generateElement();
              this.groupList.length ? this.groupList.forEach((t2) => {
                t2.getHeadersAndRows().forEach((t3) => {
                  var i2 = t3.getElement();
                  e2.parentNode.insertBefore(i2, e2.nextSibling), t3.initialize(), e2 = i2;
                });
              }) : this.rows.forEach((t2) => {
                var i2 = t2.getElement();
                e2.parentNode.insertBefore(i2, e2.nextSibling), t2.initialize(), e2 = i2;
              }), this.groupManager.updateGroupRows(true);
            }
            this.groupManager.table.externalEvents.dispatch("groupVisibilityChanged", this.getComponent(), true);
          }
          _visSet() {
            var e2 = [];
            "function" == typeof this.visible && (this.rows.forEach(function(t2) {
              e2.push(t2.getData());
            }), this.visible = this.visible(this.key, this.getRowCount(), e2, this.getComponent()));
          }
          getRowGroup(e2) {
            var t2 = false;
            return this.groupList.length ? this.groupList.forEach(function(i2) {
              var s2 = i2.getRowGroup(e2);
              s2 && (t2 = s2);
            }) : this.rows.find(function(t3) {
              return t3 === e2;
            }) && (t2 = this), t2;
          }
          getSubGroups(e2) {
            var t2 = [];
            return this.groupList.forEach(function(i2) {
              t2.push(e2 ? i2.getComponent() : i2);
            }), t2;
          }
          getRows(e2, t2) {
            var i2 = [];
            return t2 && this.groupList.length ? this.groupList.forEach((s2) => {
              i2 = i2.concat(s2.getRows(e2, t2));
            }) : this.rows.forEach(function(t3) {
              i2.push(e2 ? t3.getComponent() : t3);
            }), i2;
          }
          generateGroupHeaderContents() {
            var e2 = [];
            for (this.getRows(false, true).forEach(function(t2) {
              e2.push(t2.getData());
            }), this.elementContents = this.generator(this.key, this.getRowCount(), e2, this.getComponent()); this.element.firstChild; )
              this.element.removeChild(this.element.firstChild);
            "string" == typeof this.elementContents ? this.element.innerHTML = this.elementContents : this.element.appendChild(this.elementContents), this.element.insertBefore(this.arrowElement, this.element.firstChild);
          }
          getPath(e2 = []) {
            return e2.unshift(this.key), this.parent && this.parent.getPath(e2), e2;
          }
          getElement() {
            return this.elementContents ? this.element : this.generateElement();
          }
          generateElement() {
            this.addBindings = false, this._visSet(), this.visible ? this.element.classList.add("tabulator-group-visible") : this.element.classList.remove("tabulator-group-visible");
            for (var e2 = 0; e2 < this.element.childNodes.length; ++e2)
              this.element.childNodes[e2].parentNode.removeChild(this.element.childNodes[e2]);
            return this.generateGroupHeaderContents(), this.element;
          }
          detachElement() {
            this.element && this.element.parentNode && this.element.parentNode.removeChild(this.element);
          }
          normalizeHeight() {
            this.setHeight(this.element.clientHeight);
          }
          initialize(e2) {
            this.initialized && !e2 || (this.normalizeHeight(), this.initialized = true);
          }
          reinitialize() {
            this.initialized = false, this.height = 0, a.elVisible(this.element) && this.initialize(true);
          }
          setHeight(e2) {
            this.height != e2 && (this.height = e2, this.outerHeight = this.element.offsetHeight);
          }
          getHeight() {
            return this.outerHeight;
          }
          getGroup() {
            return this;
          }
          reinitializeHeight() {
          }
          calcHeight() {
          }
          setCellHeight() {
          }
          clearCellHeight() {
          }
          deinitializeHeight() {
          }
          rendered() {
          }
          getComponent() {
            return this.component || (this.component = new ge(this)), this.component;
          }
        }
        var fe = { cellEdit: function(e2) {
          e2.component.setValueProcessData(e2.data.oldValue), e2.component.cellRendered();
        }, rowAdd: function(e2) {
          e2.component.deleteActual(), this.table.rowManager.checkPlaceholder();
        }, rowDelete: function(e2) {
          var t2 = this.table.rowManager.addRowActual(e2.data.data, e2.data.pos, e2.data.index);
          this.table.options.groupBy && this.table.modExists("groupRows") && this.table.modules.groupRows.updateGroupRows(true), this._rebindRow(e2.component, t2), this.table.rowManager.checkPlaceholder();
        }, rowMove: function(e2) {
          var t2 = e2.data.posFrom - e2.data.posTo > 0;
          this.table.rowManager.moveRowActual(e2.component, this.table.rowManager.getRowFromPosition(e2.data.posFrom), t2), this.table.rowManager.regenerateRowPositions(), this.table.rowManager.reRenderInPosition();
        } }, ve = { cellEdit: function(e2) {
          e2.component.setValueProcessData(e2.data.newValue), e2.component.cellRendered();
        }, rowAdd: function(e2) {
          var t2 = this.table.rowManager.addRowActual(e2.data.data, e2.data.pos, e2.data.index);
          this.table.options.groupBy && this.table.modExists("groupRows") && this.table.modules.groupRows.updateGroupRows(true), this._rebindRow(e2.component, t2), this.table.rowManager.checkPlaceholder();
        }, rowDelete: function(e2) {
          e2.component.deleteActual(), this.table.rowManager.checkPlaceholder();
        }, rowMove: function(e2) {
          this.table.rowManager.moveRowActual(e2.component, this.table.rowManager.getRowFromPosition(e2.data.posTo), e2.data.after), this.table.rowManager.regenerateRowPositions(), this.table.rowManager.reRenderInPosition();
        } }, we = { keybindings: { bindings: { undo: ["ctrl + 90", "meta + 90"], redo: ["ctrl + 89", "meta + 89"] }, actions: { undo: function(e2) {
          this.table.options.history && this.table.modExists("history") && this.table.modExists("edit") && (this.table.modules.edit.currentCell || (e2.preventDefault(), this.table.modules.history.undo()));
        }, redo: function(e2) {
          this.table.options.history && this.table.modExists("history") && this.table.modExists("edit") && (this.table.modules.edit.currentCell || (e2.preventDefault(), this.table.modules.history.redo()));
        } } } };
        const _Ce = class extends M {
          constructor(e2) {
            super(e2), this.history = [], this.index = -1, this.registerTableOption("history", false);
          }
          initialize() {
            this.table.options.history && (this.subscribe("cell-value-updated", this.cellUpdated.bind(this)), this.subscribe("cell-delete", this.clearComponentHistory.bind(this)), this.subscribe("row-delete", this.rowDeleted.bind(this)), this.subscribe("rows-wipe", this.clear.bind(this)), this.subscribe("row-added", this.rowAdded.bind(this)), this.subscribe("row-move", this.rowMoved.bind(this))), this.registerTableFunction("undo", this.undo.bind(this)), this.registerTableFunction("redo", this.redo.bind(this)), this.registerTableFunction("getHistoryUndoSize", this.getHistoryUndoSize.bind(this)), this.registerTableFunction("getHistoryRedoSize", this.getHistoryRedoSize.bind(this)), this.registerTableFunction("clearHistory", this.clear.bind(this));
          }
          rowMoved(e2, t2, i2) {
            this.action("rowMove", e2, { posFrom: e2.getPosition(), posTo: t2.getPosition(), to: t2, after: i2 });
          }
          rowAdded(e2, t2, i2, s2) {
            this.action("rowAdd", e2, { data: t2, pos: i2, index: s2 });
          }
          rowDeleted(e2) {
            var t2, i2;
            this.table.options.groupBy ? (t2 = (i2 = e2.getComponent().getGroup()._getSelf().rows).indexOf(e2)) && (t2 = i2[t2 - 1]) : (t2 = e2.table.rowManager.getRowIndex(e2)) && (t2 = e2.table.rowManager.rows[t2 - 1]), this.action("rowDelete", e2, { data: e2.getData(), pos: !t2, index: t2 });
          }
          cellUpdated(e2) {
            this.action("cellEdit", e2, { oldValue: e2.oldValue, newValue: e2.value });
          }
          clear() {
            this.history = [], this.index = -1;
          }
          action(e2, t2, i2) {
            this.history = this.history.slice(0, this.index + 1), this.history.push({ type: e2, component: t2, data: i2 }), this.index++;
          }
          getHistoryUndoSize() {
            return this.index + 1;
          }
          getHistoryRedoSize() {
            return this.history.length - (this.index + 1);
          }
          clearComponentHistory(e2) {
            var t2 = this.history.findIndex(function(t3) {
              return t3.component === e2;
            });
            t2 > -1 && (this.history.splice(t2, 1), t2 <= this.index && this.index--, this.clearComponentHistory(e2));
          }
          undo() {
            if (this.index > -1) {
              let e2 = this.history[this.index];
              return _Ce.undoers[e2.type].call(this, e2), this.index--, this.dispatchExternal("historyUndo", e2.type, e2.component.getComponent(), e2.data), true;
            }
            return console.warn(this.options("history") ? "History Undo Error - No more history to undo" : "History module not enabled"), false;
          }
          redo() {
            if (this.history.length - 1 > this.index) {
              this.index++;
              let e2 = this.history[this.index];
              return _Ce.redoers[e2.type].call(this, e2), this.dispatchExternal("historyRedo", e2.type, e2.component.getComponent(), e2.data), true;
            }
            return console.warn(this.options("history") ? "History Redo Error - No more history to redo" : "History module not enabled"), false;
          }
          _rebindRow(e2, t2) {
            this.history.forEach(function(i2) {
              if (i2.component instanceof p)
                i2.component === e2 && (i2.component = t2);
              else if (i2.component instanceof n && i2.component.row === e2) {
                var s2 = i2.component.column.getField();
                s2 && (i2.component = t2.getCell(s2));
              }
            });
          }
        };
        let Ce = _Ce;
        __publicField(Ce, "moduleName", "history");
        __publicField(Ce, "moduleExtensions", we);
        __publicField(Ce, "undoers", fe);
        __publicField(Ce, "redoers", ve);
        var Ee = { csv: function(e2) {
          var t2 = [], i2 = 0, s2 = 0, o2 = false;
          for (let n2 = 0; n2 < e2.length; n2++) {
            let r2 = e2[n2], a2 = e2[n2 + 1];
            t2[i2] || (t2[i2] = []), t2[i2][s2] || (t2[i2][s2] = ""), '"' == r2 && o2 && '"' == a2 ? (t2[i2][s2] += r2, n2++) : '"' != r2 ? "," != r2 || o2 ? "\r" != r2 || "\n" != a2 || o2 ? "\r" != r2 && "\n" != r2 || o2 ? t2[i2][s2] += r2 : (s2 = 0, i2++) : (s2 = 0, i2++, n2++) : s2++ : o2 = !o2;
          }
          return t2;
        }, json: function(e2) {
          try {
            return JSON.parse(e2);
          } catch (e3) {
            return console.warn("JSON Import Error - File contents is invalid JSON", e3), Promise.reject();
          }
        }, array: function(e2) {
          return e2;
        }, xlsx: function(e2, t2) {
          var i2 = XLSX.read(e2), s2 = i2.Sheets[i2.SheetNames[0]];
          return XLSX.utils.sheet_to_json(s2, {});
        } };
        const _ye = class extends M {
          constructor(e2) {
            super(e2), this.registerTableOption("importFormat"), this.registerTableOption("importReader", "text");
          }
          initialize() {
            this.registerTableFunction("import", this.importFromFile.bind(this)), this.table.options.importFormat && (this.subscribe("data-loading", this.loadDataCheck.bind(this), 10), this.subscribe("data-load", this.loadData.bind(this), 10));
          }
          loadDataCheck(e2) {
            return this.table.options.importFormat && ("string" == typeof e2 || Array.isArray(e2) && e2.length && Array.isArray(e2));
          }
          loadData(e2, t2, i2, s2, o2) {
            return this.importData(this.lookupImporter(), e2).then(this.structureData.bind(this)).catch((e3) => (console.error("Import Error:", e3 || "Unable to import data"), Promise.reject(e3)));
          }
          lookupImporter(e2) {
            var t2;
            return e2 || (e2 = this.table.options.importFormat), (t2 = "string" == typeof e2 ? _ye.importers[e2] : e2) || console.error("Import Error - Importer not found:", e2), t2;
          }
          importFromFile(e2, t2, i2) {
            var s2 = this.lookupImporter(e2);
            if (s2)
              return this.pickFile(t2, i2).then(this.importData.bind(this, s2)).then(this.structureData.bind(this)).then(this.setData.bind(this)).catch((e3) => (this.dispatch("import-error", e3), this.dispatchExternal("importError", e3), console.error("Import Error:", e3 || "Unable to import file"), Promise.reject(e3)));
          }
          pickFile(e2, t2) {
            return new Promise((i2, s2) => {
              var o2 = document.createElement("input");
              o2.type = "file", o2.accept = e2, o2.addEventListener("change", (e3) => {
                var n2 = o2.files[0], r2 = new FileReader();
                switch (this.dispatch("import-importing", o2.files), this.dispatchExternal("importImporting", o2.files), t2 || this.table.options.importReader) {
                  case "buffer":
                    r2.readAsArrayBuffer(n2);
                    break;
                  case "binary":
                    r2.readAsBinaryString(n2);
                    break;
                  case "url":
                    r2.readAsDataURL(n2);
                    break;
                  default:
                    r2.readAsText(n2);
                }
                r2.onload = (e4) => {
                  i2(r2.result);
                }, r2.onerror = (e4) => {
                  console.warn("File Load Error - Unable to read file"), s2();
                };
              }), this.dispatch("import-choose"), this.dispatchExternal("importChoose"), o2.click();
            });
          }
          importData(e2, t2) {
            var i2 = e2.call(this.table, t2);
            return i2 instanceof Promise ? i2 : i2 ? Promise.resolve(i2) : Promise.reject();
          }
          structureData(e2) {
            return Array.isArray(e2) && e2.length && Array.isArray(e2[0]) ? this.table.options.autoColumns ? this.structureArrayToObject(e2) : this.structureArrayToColumns(e2) : e2;
          }
          structureArrayToObject(e2) {
            var t2 = e2.shift();
            return e2.map((e3) => {
              var i2 = {};
              return t2.forEach((t3, s2) => {
                i2[t3] = e3[s2];
              }), i2;
            });
          }
          structureArrayToColumns(e2) {
            var t2 = [], i2 = this.table.getColumns();
            return i2[0] && e2[0][0] && i2[0].getDefinition().title === e2[0][0] && e2.shift(), e2.forEach((e3) => {
              var s2 = {};
              e3.forEach((e4, t3) => {
                var o2 = i2[t3];
                o2 && (s2[o2.getField()] = e4);
              }), t2.push(s2);
            }), t2;
          }
          setData(e2) {
            return this.dispatch("import-imported", e2), this.dispatchExternal("importImported", e2), this.table.setData(e2);
          }
        };
        let ye = _ye;
        __publicField(ye, "moduleName", "import");
        __publicField(ye, "importers", Ee);
        var Re = { navPrev: "shift + 9", navNext: 9, navUp: 38, navDown: 40, navLeft: 37, navRight: 39, scrollPageUp: 33, scrollPageDown: 34, scrollToStart: 36, scrollToEnd: 35 }, xe = { keyBlock: function(e2) {
          e2.stopPropagation(), e2.preventDefault();
        }, scrollPageUp: function(e2) {
          var t2 = this.table.rowManager, i2 = t2.scrollTop - t2.element.clientHeight;
          e2.preventDefault(), t2.displayRowsCount && (i2 >= 0 ? t2.element.scrollTop = i2 : t2.scrollToRow(t2.getDisplayRows()[0])), this.table.element.focus();
        }, scrollPageDown: function(e2) {
          var t2 = this.table.rowManager, i2 = t2.scrollTop + t2.element.clientHeight, s2 = t2.element.scrollHeight;
          e2.preventDefault(), t2.displayRowsCount && (i2 <= s2 ? t2.element.scrollTop = i2 : t2.scrollToRow(t2.getDisplayRows()[t2.displayRowsCount - 1])), this.table.element.focus();
        }, scrollToStart: function(e2) {
          var t2 = this.table.rowManager;
          e2.preventDefault(), t2.displayRowsCount && t2.scrollToRow(t2.getDisplayRows()[0]), this.table.element.focus();
        }, scrollToEnd: function(e2) {
          var t2 = this.table.rowManager;
          e2.preventDefault(), t2.displayRowsCount && t2.scrollToRow(t2.getDisplayRows()[t2.displayRowsCount - 1]), this.table.element.focus();
        }, navPrev: function(e2) {
          this.dispatch("keybinding-nav-prev", e2);
        }, navNext: function(e2) {
          this.dispatch("keybinding-nav-next", e2);
        }, navLeft: function(e2) {
          this.dispatch("keybinding-nav-left", e2);
        }, navRight: function(e2) {
          this.dispatch("keybinding-nav-right", e2);
        }, navUp: function(e2) {
          this.dispatch("keybinding-nav-up", e2);
        }, navDown: function(e2) {
          this.dispatch("keybinding-nav-down", e2);
        } };
        const _Te = class extends M {
          constructor(e2) {
            super(e2), this.watchKeys = null, this.pressedKeys = null, this.keyupBinding = false, this.keydownBinding = false, this.registerTableOption("keybindings", {}), this.registerTableOption("tabEndNewRow", false);
          }
          initialize() {
            var e2 = this.table.options.keybindings, t2 = {};
            this.watchKeys = {}, this.pressedKeys = [], false !== e2 && (Object.assign(t2, _Te.bindings), Object.assign(t2, e2), this.mapBindings(t2), this.bindEvents()), this.subscribe("table-destroy", this.clearBindings.bind(this));
          }
          mapBindings(e2) {
            for (let t2 in e2)
              _Te.actions[t2] ? e2[t2] && ("object" != typeof e2[t2] && (e2[t2] = [e2[t2]]), e2[t2].forEach((e3) => {
                (Array.isArray(e3) ? e3 : [e3]).forEach((e4) => {
                  this.mapBinding(t2, e4);
                });
              })) : console.warn("Key Binding Error - no such action:", t2);
          }
          mapBinding(e2, t2) {
            var i2 = { action: _Te.actions[e2], keys: [], ctrl: false, shift: false, meta: false };
            t2.toString().toLowerCase().split(" ").join("").split("+").forEach((e3) => {
              switch (e3) {
                case "ctrl":
                  i2.ctrl = true;
                  break;
                case "shift":
                  i2.shift = true;
                  break;
                case "meta":
                  i2.meta = true;
                  break;
                default:
                  e3 = isNaN(e3) ? e3.toUpperCase().charCodeAt(0) : parseInt(e3), i2.keys.push(e3), this.watchKeys[e3] || (this.watchKeys[e3] = []), this.watchKeys[e3].push(i2);
              }
            });
          }
          bindEvents() {
            var e2 = this;
            this.keyupBinding = function(t2) {
              var i2 = t2.keyCode, s2 = e2.watchKeys[i2];
              s2 && (e2.pressedKeys.push(i2), s2.forEach(function(i3) {
                e2.checkBinding(t2, i3);
              }));
            }, this.keydownBinding = function(t2) {
              var i2 = t2.keyCode;
              if (e2.watchKeys[i2]) {
                var s2 = e2.pressedKeys.indexOf(i2);
                s2 > -1 && e2.pressedKeys.splice(s2, 1);
              }
            }, this.table.element.addEventListener("keydown", this.keyupBinding), this.table.element.addEventListener("keyup", this.keydownBinding);
          }
          clearBindings() {
            this.keyupBinding && this.table.element.removeEventListener("keydown", this.keyupBinding), this.keydownBinding && this.table.element.removeEventListener("keyup", this.keydownBinding);
          }
          checkBinding(e2, t2) {
            var i2 = true;
            return e2.ctrlKey == t2.ctrl && e2.shiftKey == t2.shift && e2.metaKey == t2.meta && (t2.keys.forEach((e3) => {
              -1 == this.pressedKeys.indexOf(e3) && (i2 = false);
            }), i2 && t2.action.call(this, e2), true);
          }
        };
        let Te = _Te;
        __publicField(Te, "moduleName", "keybindings");
        __publicField(Te, "bindings", Re);
        __publicField(Te, "actions", xe);
        var Me = { delete: function(e2, t2, i2) {
          e2.delete();
        } }, ke = { insert: function(e2, t2, i2) {
          return this.table.addRow(e2.getData(), void 0, t2), true;
        }, add: function(e2, t2, i2) {
          return this.table.addRow(e2.getData()), true;
        }, update: function(e2, t2, i2) {
          return !!t2 && (t2.update(e2.getData()), true);
        }, replace: function(e2, t2, i2) {
          return !!t2 && (this.table.addRow(e2.getData(), void 0, t2), t2.delete(), true);
        } };
        const _Le = class extends M {
          constructor(e2) {
            super(e2), this.placeholderElement = this.createPlaceholderElement(), this.hoverElement = false, this.checkTimeout = false, this.checkPeriod = 150, this.moving = false, this.toRow = false, this.toRowAfter = false, this.hasHandle = false, this.startY = 0, this.startX = 0, this.moveHover = this.moveHover.bind(this), this.endMove = this.endMove.bind(this), this.tableRowDropEvent = false, this.touchMove = false, this.connection = false, this.connectionSelectorsTables = false, this.connectionSelectorsElements = false, this.connectionElements = [], this.connections = [], this.connectedTable = false, this.connectedRow = false, this.registerTableOption("movableRows", false), this.registerTableOption("movableRowsConnectedTables", false), this.registerTableOption("movableRowsConnectedElements", false), this.registerTableOption("movableRowsSender", false), this.registerTableOption("movableRowsReceiver", "insert"), this.registerColumnOption("rowHandle");
          }
          createPlaceholderElement() {
            var e2 = document.createElement("div");
            return e2.classList.add("tabulator-row"), e2.classList.add("tabulator-row-placeholder"), e2;
          }
          initialize() {
            this.table.options.movableRows && (this.connectionSelectorsTables = this.table.options.movableRowsConnectedTables, this.connectionSelectorsElements = this.table.options.movableRowsConnectedElements, this.connection = this.connectionSelectorsTables || this.connectionSelectorsElements, this.subscribe("cell-init", this.initializeCell.bind(this)), this.subscribe("column-init", this.initializeColumn.bind(this)), this.subscribe("row-init", this.initializeRow.bind(this)));
          }
          initializeGroupHeader(e2) {
            var t2 = this, i2 = {};
            i2.mouseup = function(i3) {
              t2.tableRowDrop(i3, e2);
            }.bind(t2), i2.mousemove = function(i3) {
              var s2;
              i3.pageY - a.elOffset(e2.element).top + t2.table.rowManager.element.scrollTop > e2.getHeight() / 2 ? t2.toRow === e2 && t2.toRowAfter || ((s2 = e2.getElement()).parentNode.insertBefore(t2.placeholderElement, s2.nextSibling), t2.moveRow(e2, true)) : (t2.toRow !== e2 || t2.toRowAfter) && (s2 = e2.getElement()).previousSibling && (s2.parentNode.insertBefore(t2.placeholderElement, s2), t2.moveRow(e2, false));
            }.bind(t2), e2.modules.moveRow = i2;
          }
          initializeRow(e2) {
            var t2, i2 = this, s2 = {};
            s2.mouseup = function(t3) {
              i2.tableRowDrop(t3, e2);
            }.bind(i2), s2.mousemove = function(t3) {
              var s3 = e2.getElement();
              t3.pageY - a.elOffset(s3).top + i2.table.rowManager.element.scrollTop > e2.getHeight() / 2 ? i2.toRow === e2 && i2.toRowAfter || (s3.parentNode.insertBefore(i2.placeholderElement, s3.nextSibling), i2.moveRow(e2, true)) : (i2.toRow !== e2 || i2.toRowAfter) && (s3.parentNode.insertBefore(i2.placeholderElement, s3), i2.moveRow(e2, false));
            }.bind(i2), this.hasHandle || ((t2 = e2.getElement()).addEventListener("mousedown", function(t3) {
              1 === t3.which && (i2.checkTimeout = setTimeout(function() {
                i2.startMove(t3, e2);
              }, i2.checkPeriod));
            }), t2.addEventListener("mouseup", function(e3) {
              1 === e3.which && i2.checkTimeout && clearTimeout(i2.checkTimeout);
            }), this.bindTouchEvents(e2, e2.getElement())), e2.modules.moveRow = s2;
          }
          initializeColumn(e2) {
            e2.definition.rowHandle && false !== this.table.options.movableRows && (this.hasHandle = true);
          }
          initializeCell(e2) {
            if (e2.column.definition.rowHandle && false !== this.table.options.movableRows) {
              var t2 = this, i2 = e2.getElement(true);
              i2.addEventListener("mousedown", function(i3) {
                1 === i3.which && (t2.checkTimeout = setTimeout(function() {
                  t2.startMove(i3, e2.row);
                }, t2.checkPeriod));
              }), i2.addEventListener("mouseup", function(e3) {
                1 === e3.which && t2.checkTimeout && clearTimeout(t2.checkTimeout);
              }), this.bindTouchEvents(e2.row, i2);
            }
          }
          bindTouchEvents(e2, t2) {
            var i2, s2, o2, n2, r2, a2, l2 = false;
            t2.addEventListener("touchstart", (t3) => {
              this.checkTimeout = setTimeout(() => {
                this.touchMove = true, i2 = e2.nextRow(), o2 = i2 ? i2.getHeight() / 2 : 0, s2 = e2.prevRow(), n2 = s2 ? s2.getHeight() / 2 : 0, r2 = 0, a2 = 0, l2 = false, this.startMove(t3, e2);
              }, this.checkPeriod);
            }, { passive: true }), this.moving, this.toRow, this.toRowAfter, t2.addEventListener("touchmove", (t3) => {
              var h2, d2;
              this.moving && (t3.preventDefault(), this.moveHover(t3), l2 || (l2 = t3.touches[0].pageY), (h2 = t3.touches[0].pageY - l2) > 0 ? i2 && h2 - r2 > o2 && (d2 = i2) !== e2 && (l2 = t3.touches[0].pageY, d2.getElement().parentNode.insertBefore(this.placeholderElement, d2.getElement().nextSibling), this.moveRow(d2, true)) : s2 && -h2 - a2 > n2 && (d2 = s2) !== e2 && (l2 = t3.touches[0].pageY, d2.getElement().parentNode.insertBefore(this.placeholderElement, d2.getElement()), this.moveRow(d2, false)), d2 && (i2 = d2.nextRow(), r2 = o2, o2 = i2 ? i2.getHeight() / 2 : 0, s2 = d2.prevRow(), a2 = n2, n2 = s2 ? s2.getHeight() / 2 : 0));
            }), t2.addEventListener("touchend", (e3) => {
              this.checkTimeout && clearTimeout(this.checkTimeout), this.moving && (this.endMove(e3), this.touchMove = false);
            });
          }
          _bindMouseMove() {
            this.table.rowManager.getDisplayRows().forEach((e2) => {
              ("row" === e2.type || "group" === e2.type) && e2.modules.moveRow && e2.modules.moveRow.mousemove && e2.getElement().addEventListener("mousemove", e2.modules.moveRow.mousemove);
            });
          }
          _unbindMouseMove() {
            this.table.rowManager.getDisplayRows().forEach((e2) => {
              ("row" === e2.type || "group" === e2.type) && e2.modules.moveRow && e2.modules.moveRow.mousemove && e2.getElement().removeEventListener("mousemove", e2.modules.moveRow.mousemove);
            });
          }
          startMove(e2, t2) {
            var i2 = t2.getElement();
            this.setStartPosition(e2, t2), this.moving = t2, this.table.element.classList.add("tabulator-block-select"), this.placeholderElement.style.width = t2.getWidth() + "px", this.placeholderElement.style.height = t2.getHeight() + "px", this.connection ? (this.table.element.classList.add("tabulator-movingrow-sending"), this.connectToTables(t2)) : (i2.parentNode.insertBefore(this.placeholderElement, i2), i2.parentNode.removeChild(i2)), this.hoverElement = i2.cloneNode(true), this.hoverElement.classList.add("tabulator-moving"), this.connection ? (document.body.appendChild(this.hoverElement), this.hoverElement.style.left = "0", this.hoverElement.style.top = "0", this.hoverElement.style.width = this.table.element.clientWidth + "px", this.hoverElement.style.whiteSpace = "nowrap", this.hoverElement.style.overflow = "hidden", this.hoverElement.style.pointerEvents = "none") : (this.table.rowManager.getTableElement().appendChild(this.hoverElement), this.hoverElement.style.left = "0", this.hoverElement.style.top = "0", this._bindMouseMove()), document.body.addEventListener("mousemove", this.moveHover), document.body.addEventListener("mouseup", this.endMove), this.dispatchExternal("rowMoving", t2.getComponent()), this.moveHover(e2);
          }
          setStartPosition(e2, t2) {
            var i2, s2, o2 = this.touchMove ? e2.touches[0].pageX : e2.pageX, n2 = this.touchMove ? e2.touches[0].pageY : e2.pageY;
            i2 = t2.getElement(), this.connection ? (s2 = i2.getBoundingClientRect(), this.startX = s2.left - o2 + window.pageXOffset, this.startY = s2.top - n2 + window.pageYOffset) : this.startY = n2 - i2.getBoundingClientRect().top;
          }
          endMove(e2) {
            e2 && 1 !== e2.which && !this.touchMove || (this._unbindMouseMove(), this.connection || (this.placeholderElement.parentNode.insertBefore(this.moving.getElement(), this.placeholderElement.nextSibling), this.placeholderElement.parentNode.removeChild(this.placeholderElement)), this.hoverElement.parentNode.removeChild(this.hoverElement), this.table.element.classList.remove("tabulator-block-select"), this.toRow ? this.table.rowManager.moveRow(this.moving, this.toRow, this.toRowAfter) : this.dispatchExternal("rowMoveCancelled", this.moving.getComponent()), this.moving = false, this.toRow = false, this.toRowAfter = false, document.body.removeEventListener("mousemove", this.moveHover), document.body.removeEventListener("mouseup", this.endMove), this.connection && (this.table.element.classList.remove("tabulator-movingrow-sending"), this.disconnectFromTables()));
          }
          moveRow(e2, t2) {
            this.toRow = e2, this.toRowAfter = t2;
          }
          moveHover(e2) {
            this.connection ? this.moveHoverConnections.call(this, e2) : this.moveHoverTable.call(this, e2);
          }
          moveHoverTable(e2) {
            var t2 = this.table.rowManager.getElement(), i2 = t2.scrollTop, s2 = (this.touchMove ? e2.touches[0].pageY : e2.pageY) - t2.getBoundingClientRect().top + i2;
            this.hoverElement.style.top = Math.min(s2 - this.startY, this.table.rowManager.element.scrollHeight - this.hoverElement.offsetHeight) + "px";
          }
          moveHoverConnections(e2) {
            this.hoverElement.style.left = this.startX + (this.touchMove ? e2.touches[0].pageX : e2.pageX) + "px", this.hoverElement.style.top = this.startY + (this.touchMove ? e2.touches[0].pageY : e2.pageY) + "px";
          }
          elementRowDrop(e2, t2, i2) {
            this.dispatchExternal("movableRowsElementDrop", e2, t2, !!i2 && i2.getComponent());
          }
          connectToTables(e2) {
            var t2;
            this.connectionSelectorsTables && (t2 = this.commsConnections(this.connectionSelectorsTables), this.dispatchExternal("movableRowsSendingStart", t2), this.commsSend(this.connectionSelectorsTables, "moveRow", "connect", { row: e2 })), this.connectionSelectorsElements && (this.connectionElements = [], Array.isArray(this.connectionSelectorsElements) || (this.connectionSelectorsElements = [this.connectionSelectorsElements]), this.connectionSelectorsElements.forEach((e3) => {
              "string" == typeof e3 ? this.connectionElements = this.connectionElements.concat(Array.prototype.slice.call(document.querySelectorAll(e3))) : this.connectionElements.push(e3);
            }), this.connectionElements.forEach((e3) => {
              var t3 = (t4) => {
                this.elementRowDrop(t4, e3, this.moving);
              };
              e3.addEventListener("mouseup", t3), e3.tabulatorElementDropEvent = t3, e3.classList.add("tabulator-movingrow-receiving");
            }));
          }
          disconnectFromTables() {
            var e2;
            this.connectionSelectorsTables && (e2 = this.commsConnections(this.connectionSelectorsTables), this.dispatchExternal("movableRowsSendingStop", e2), this.commsSend(this.connectionSelectorsTables, "moveRow", "disconnect")), this.connectionElements.forEach((e3) => {
              e3.classList.remove("tabulator-movingrow-receiving"), e3.removeEventListener("mouseup", e3.tabulatorElementDropEvent), delete e3.tabulatorElementDropEvent;
            });
          }
          connect(e2, t2) {
            return this.connectedTable ? (console.warn("Move Row Error - Table cannot accept connection, already connected to table:", this.connectedTable), false) : (this.connectedTable = e2, this.connectedRow = t2, this.table.element.classList.add("tabulator-movingrow-receiving"), this.table.rowManager.getDisplayRows().forEach((e3) => {
              "row" === e3.type && e3.modules.moveRow && e3.modules.moveRow.mouseup && e3.getElement().addEventListener("mouseup", e3.modules.moveRow.mouseup);
            }), this.tableRowDropEvent = this.tableRowDrop.bind(this), this.table.element.addEventListener("mouseup", this.tableRowDropEvent), this.dispatchExternal("movableRowsReceivingStart", t2, e2), true);
          }
          disconnect(e2) {
            e2 === this.connectedTable ? (this.connectedTable = false, this.connectedRow = false, this.table.element.classList.remove("tabulator-movingrow-receiving"), this.table.rowManager.getDisplayRows().forEach((e3) => {
              "row" === e3.type && e3.modules.moveRow && e3.modules.moveRow.mouseup && e3.getElement().removeEventListener("mouseup", e3.modules.moveRow.mouseup);
            }), this.table.element.removeEventListener("mouseup", this.tableRowDropEvent), this.dispatchExternal("movableRowsReceivingStop", e2)) : console.warn("Move Row Error - trying to disconnect from non connected table");
          }
          dropComplete(e2, t2, i2) {
            var s2 = false;
            if (i2) {
              switch (typeof this.table.options.movableRowsSender) {
                case "string":
                  s2 = _Le.senders[this.table.options.movableRowsSender];
                  break;
                case "function":
                  s2 = this.table.options.movableRowsSender;
              }
              s2 ? s2.call(this, this.moving ? this.moving.getComponent() : void 0, t2 ? t2.getComponent() : void 0, e2) : this.table.options.movableRowsSender && console.warn("Mover Row Error - no matching sender found:", this.table.options.movableRowsSender), this.dispatchExternal("movableRowsSent", this.moving.getComponent(), t2 ? t2.getComponent() : void 0, e2);
            } else
              this.dispatchExternal("movableRowsSentFailed", this.moving.getComponent(), t2 ? t2.getComponent() : void 0, e2);
            this.endMove();
          }
          tableRowDrop(e2, t2) {
            var i2 = false, s2 = false;
            switch (e2.stopImmediatePropagation(), typeof this.table.options.movableRowsReceiver) {
              case "string":
                i2 = _Le.receivers[this.table.options.movableRowsReceiver];
                break;
              case "function":
                i2 = this.table.options.movableRowsReceiver;
            }
            i2 ? s2 = i2.call(this, this.connectedRow.getComponent(), t2 ? t2.getComponent() : void 0, this.connectedTable) : console.warn("Mover Row Error - no matching receiver found:", this.table.options.movableRowsReceiver), s2 ? this.dispatchExternal("movableRowsReceived", this.connectedRow.getComponent(), t2 ? t2.getComponent() : void 0, this.connectedTable) : this.dispatchExternal("movableRowsReceivedFailed", this.connectedRow.getComponent(), t2 ? t2.getComponent() : void 0, this.connectedTable), this.commsSend(this.connectedTable, "moveRow", "dropcomplete", { row: t2, success: s2 });
          }
          commsReceived(e2, t2, i2) {
            switch (t2) {
              case "connect":
                return this.connect(e2, i2.row);
              case "disconnect":
                return this.disconnect(e2);
              case "dropcomplete":
                return this.dropComplete(e2, i2.row, i2.success);
            }
          }
        };
        let Le = _Le;
        __publicField(Le, "moduleName", "moveRow");
        __publicField(Le, "senders", Me);
        __publicField(Le, "receivers", ke);
        var Se = {};
        const _De = class extends M {
          constructor(e2) {
            super(e2), this.allowedTypes = ["", "data", "edit", "clipboard"], this.enabled = true, this.registerColumnOption("mutator"), this.registerColumnOption("mutatorParams"), this.registerColumnOption("mutatorData"), this.registerColumnOption("mutatorDataParams"), this.registerColumnOption("mutatorEdit"), this.registerColumnOption("mutatorEditParams"), this.registerColumnOption("mutatorClipboard"), this.registerColumnOption("mutatorClipboardParams"), this.registerColumnOption("mutateLink");
          }
          initialize() {
            this.subscribe("cell-value-changing", this.transformCell.bind(this)), this.subscribe("cell-value-changed", this.mutateLink.bind(this)), this.subscribe("column-layout", this.initializeColumn.bind(this)), this.subscribe("row-data-init-before", this.rowDataChanged.bind(this)), this.subscribe("row-data-changing", this.rowDataChanged.bind(this));
          }
          rowDataChanged(e2, t2, i2) {
            return this.transformRow(t2, "data", i2);
          }
          initializeColumn(e2) {
            var t2 = false, i2 = {};
            this.allowedTypes.forEach((s2) => {
              var o2, n2 = "mutator" + (s2.charAt(0).toUpperCase() + s2.slice(1));
              e2.definition[n2] && (o2 = this.lookupMutator(e2.definition[n2])) && (t2 = true, i2[n2] = { mutator: o2, params: e2.definition[n2 + "Params"] || {} });
            }), t2 && (e2.modules.mutate = i2);
          }
          lookupMutator(e2) {
            var t2 = false;
            switch (typeof e2) {
              case "string":
                _De.mutators[e2] ? t2 = _De.mutators[e2] : console.warn("Mutator Error - No such mutator found, ignoring: ", e2);
                break;
              case "function":
                t2 = e2;
            }
            return t2;
          }
          transformRow(e2, t2, i2) {
            var s2, o2 = "mutator" + (t2.charAt(0).toUpperCase() + t2.slice(1));
            return this.enabled && this.table.columnManager.traverse((n2) => {
              var r2, a2, l2;
              n2.modules.mutate && (r2 = n2.modules.mutate[o2] || n2.modules.mutate.mutator || false) && (s2 = n2.getFieldValue(void 0 !== i2 ? i2 : e2), ("data" == t2 && !i2 || void 0 !== s2) && (l2 = n2.getComponent(), a2 = "function" == typeof r2.params ? r2.params(s2, e2, t2, l2) : r2.params, n2.setFieldValue(e2, r2.mutator(s2, e2, t2, a2, l2))));
            }), e2;
          }
          transformCell(e2, t2) {
            if (e2.column.modules.mutate) {
              var i2 = e2.column.modules.mutate.mutatorEdit || e2.column.modules.mutate.mutator || false, s2 = {};
              if (i2)
                return s2 = Object.assign(s2, e2.row.getData()), e2.column.setFieldValue(s2, t2), i2.mutator(t2, s2, "edit", i2.params, e2.getComponent());
            }
            return t2;
          }
          mutateLink(e2) {
            var t2 = e2.column.definition.mutateLink;
            t2 && (Array.isArray(t2) || (t2 = [t2]), t2.forEach((t3) => {
              var i2 = e2.row.getCell(t3);
              i2 && i2.setValue(i2.getValue(), true, true);
            }));
          }
          enable() {
            this.enabled = true;
          }
          disable() {
            this.enabled = false;
          }
        };
        let De = _De;
        __publicField(De, "moduleName", "mutator");
        __publicField(De, "mutators", Se);
        var ze = { rows: function(e2, t2, i2, s2, o2) {
          var n2 = document.createElement("span"), r2 = document.createElement("span"), a2 = document.createElement("span"), l2 = document.createElement("span"), h2 = document.createElement("span"), d2 = document.createElement("span");
          return this.table.modules.localize.langBind("pagination|counter|showing", (e3) => {
            r2.innerHTML = e3;
          }), this.table.modules.localize.langBind("pagination|counter|of", (e3) => {
            l2.innerHTML = e3;
          }), this.table.modules.localize.langBind("pagination|counter|rows", (e3) => {
            d2.innerHTML = e3;
          }), s2 ? (a2.innerHTML = " " + t2 + "-" + Math.min(t2 + e2 - 1, s2) + " ", h2.innerHTML = " " + s2 + " ", n2.appendChild(r2), n2.appendChild(a2), n2.appendChild(l2), n2.appendChild(h2), n2.appendChild(d2)) : (a2.innerHTML = " 0 ", n2.appendChild(r2), n2.appendChild(a2), n2.appendChild(d2)), n2;
        }, pages: function(e2, t2, i2, s2, o2) {
          var n2 = document.createElement("span"), r2 = document.createElement("span"), a2 = document.createElement("span"), l2 = document.createElement("span"), h2 = document.createElement("span"), d2 = document.createElement("span");
          return this.table.modules.localize.langBind("pagination|counter|showing", (e3) => {
            r2.innerHTML = e3;
          }), a2.innerHTML = " " + i2 + " ", this.table.modules.localize.langBind("pagination|counter|of", (e3) => {
            l2.innerHTML = e3;
          }), h2.innerHTML = " " + o2 + " ", this.table.modules.localize.langBind("pagination|counter|pages", (e3) => {
            d2.innerHTML = e3;
          }), n2.appendChild(r2), n2.appendChild(a2), n2.appendChild(l2), n2.appendChild(h2), n2.appendChild(d2), n2;
        } };
        const _Pe = class extends M {
          constructor(e2) {
            super(e2), this.mode = "local", this.progressiveLoad = false, this.element = null, this.pageCounterElement = null, this.pageCounter = null, this.size = 0, this.page = 1, this.count = 5, this.max = 1, this.remoteRowCountEstimate = null, this.initialLoad = true, this.dataChanging = false, this.pageSizes = [], this.registerTableOption("pagination", false), this.registerTableOption("paginationMode", "local"), this.registerTableOption("paginationSize", false), this.registerTableOption("paginationInitialPage", 1), this.registerTableOption("paginationCounter", false), this.registerTableOption("paginationCounterElement", false), this.registerTableOption("paginationButtonCount", 5), this.registerTableOption("paginationSizeSelector", false), this.registerTableOption("paginationElement", false), this.registerTableOption("paginationAddRow", "page"), this.registerTableOption("progressiveLoad", false), this.registerTableOption("progressiveLoadDelay", 0), this.registerTableOption("progressiveLoadScrollMargin", 0), this.registerTableFunction("setMaxPage", this.setMaxPage.bind(this)), this.registerTableFunction("setPage", this.setPage.bind(this)), this.registerTableFunction("setPageToRow", this.userSetPageToRow.bind(this)), this.registerTableFunction("setPageSize", this.userSetPageSize.bind(this)), this.registerTableFunction("getPageSize", this.getPageSize.bind(this)), this.registerTableFunction("previousPage", this.previousPage.bind(this)), this.registerTableFunction("nextPage", this.nextPage.bind(this)), this.registerTableFunction("getPage", this.getPage.bind(this)), this.registerTableFunction("getPageMax", this.getPageMax.bind(this)), this.registerComponentFunction("row", "pageTo", this.setPageToRow.bind(this));
          }
          initialize() {
            this.table.options.pagination ? (this.subscribe("row-deleted", this.rowsUpdated.bind(this)), this.subscribe("row-added", this.rowsUpdated.bind(this)), this.subscribe("data-processed", this.initialLoadComplete.bind(this)), this.subscribe("table-built", this.calculatePageSizes.bind(this)), this.subscribe("footer-redraw", this.footerRedraw.bind(this)), "page" == this.table.options.paginationAddRow && this.subscribe("row-adding-position", this.rowAddingPosition.bind(this)), "remote" === this.table.options.paginationMode && (this.subscribe("data-params", this.remotePageParams.bind(this)), this.subscribe("data-loaded", this._parseRemoteData.bind(this))), this.table.options.progressiveLoad && console.error("Progressive Load Error - Pagination and progressive load cannot be used at the same time"), this.registerDisplayHandler(this.restOnRenderBefore.bind(this), 40), this.registerDisplayHandler(this.getRows.bind(this), 50), this.createElements(), this.initializePageCounter(), this.initializePaginator()) : this.table.options.progressiveLoad && (this.subscribe("data-params", this.remotePageParams.bind(this)), this.subscribe("data-loaded", this._parseRemoteData.bind(this)), this.subscribe("table-built", this.calculatePageSizes.bind(this)), this.subscribe("data-processed", this.initialLoadComplete.bind(this)), this.initializeProgressive(this.table.options.progressiveLoad), "scroll" === this.table.options.progressiveLoad && this.subscribe("scroll-vertical", this.scrollVertical.bind(this)));
          }
          rowAddingPosition(e2, t2) {
            var i2, s2 = this.table.rowManager, o2 = s2.getDisplayRows();
            return t2 ? o2.length ? i2 = o2[0] : s2.activeRows.length && (i2 = s2.activeRows[s2.activeRows.length - 1], t2 = false) : o2.length && (i2 = o2[o2.length - 1], t2 = !(o2.length < this.size)), { index: i2, top: t2 };
          }
          calculatePageSizes() {
            var e2, t2;
            this.table.options.paginationSize ? this.size = this.table.options.paginationSize : ((e2 = document.createElement("div")).classList.add("tabulator-row"), e2.style.visibility = "hidden", (t2 = document.createElement("div")).classList.add("tabulator-cell"), t2.innerHTML = "Page Row Test", e2.appendChild(t2), this.table.rowManager.getTableElement().appendChild(e2), this.size = Math.floor(this.table.rowManager.getElement().clientHeight / e2.offsetHeight), this.table.rowManager.getTableElement().removeChild(e2)), this.dispatchExternal("pageSizeChanged", this.size), this.generatePageSizeSelectList();
          }
          initialLoadComplete() {
            this.initialLoad = false;
          }
          remotePageParams(e2, t2, i2, s2) {
            return this.initialLoad || (this.progressiveLoad && !i2 || !this.progressiveLoad && !this.dataChanging) && this.reset(true), s2.page = this.page, this.size && (s2.size = this.size), s2;
          }
          userSetPageToRow(e2) {
            return this.table.options.pagination && (e2 = this.table.rowManager.findRow(e2)) ? this.setPageToRow(e2) : Promise.reject();
          }
          userSetPageSize(e2) {
            return !!this.table.options.pagination && (this.setPageSize(e2), this.setPage(1));
          }
          scrollVertical(e2, t2) {
            var i2;
            t2 || this.table.dataLoader.loading || (i2 = this.table.rowManager.getElement()).scrollHeight - i2.clientHeight - e2 < (this.table.options.progressiveLoadScrollMargin || 2 * i2.clientHeight) && this.nextPage().catch(() => {
            });
          }
          restOnRenderBefore(e2, t2) {
            return t2 || "local" === this.mode && this.reset(), e2;
          }
          rowsUpdated() {
            this.refreshData(true, "all");
          }
          createElements() {
            var e2;
            this.element = document.createElement("span"), this.element.classList.add("tabulator-paginator"), this.pagesElement = document.createElement("span"), this.pagesElement.classList.add("tabulator-pages"), (e2 = document.createElement("button")).classList.add("tabulator-page"), e2.setAttribute("type", "button"), e2.setAttribute("role", "button"), e2.setAttribute("aria-label", ""), e2.setAttribute("title", ""), this.firstBut = e2.cloneNode(true), this.firstBut.setAttribute("data-page", "first"), this.prevBut = e2.cloneNode(true), this.prevBut.setAttribute("data-page", "prev"), this.nextBut = e2.cloneNode(true), this.nextBut.setAttribute("data-page", "next"), this.lastBut = e2.cloneNode(true), this.lastBut.setAttribute("data-page", "last"), this.table.options.paginationSizeSelector && (this.pageSizeSelect = document.createElement("select"), this.pageSizeSelect.classList.add("tabulator-page-size"));
          }
          generatePageSizeSelectList() {
            var e2 = [];
            if (this.pageSizeSelect) {
              if (Array.isArray(this.table.options.paginationSizeSelector))
                e2 = this.table.options.paginationSizeSelector, this.pageSizes = e2, -1 == this.pageSizes.indexOf(this.size) && e2.unshift(this.size);
              else if (-1 == this.pageSizes.indexOf(this.size)) {
                e2 = [];
                for (let t2 = 1; t2 < 5; t2++)
                  e2.push(this.size * t2);
                this.pageSizes = e2;
              } else
                e2 = this.pageSizes;
              for (; this.pageSizeSelect.firstChild; )
                this.pageSizeSelect.removeChild(this.pageSizeSelect.firstChild);
              e2.forEach((e3) => {
                var t2 = document.createElement("option");
                t2.value = e3, true === e3 ? this.langBind("pagination|all", function(e4) {
                  t2.innerHTML = e4;
                }) : t2.innerHTML = e3, this.pageSizeSelect.appendChild(t2);
              }), this.pageSizeSelect.value = this.size;
            }
          }
          initializePageCounter() {
            var e2 = this.table.options.paginationCounter, t2 = null;
            e2 && ((t2 = "function" == typeof e2 ? e2 : _Pe.pageCounters[e2]) ? (this.pageCounter = t2, this.pageCounterElement = document.createElement("span"), this.pageCounterElement.classList.add("tabulator-page-counter")) : console.warn("Pagination Error - No such page counter found: ", e2));
          }
          initializePaginator(e2) {
            var t2, i2;
            e2 || (this.langBind("pagination|first", (e3) => {
              this.firstBut.innerHTML = e3;
            }), this.langBind("pagination|first_title", (e3) => {
              this.firstBut.setAttribute("aria-label", e3), this.firstBut.setAttribute("title", e3);
            }), this.langBind("pagination|prev", (e3) => {
              this.prevBut.innerHTML = e3;
            }), this.langBind("pagination|prev_title", (e3) => {
              this.prevBut.setAttribute("aria-label", e3), this.prevBut.setAttribute("title", e3);
            }), this.langBind("pagination|next", (e3) => {
              this.nextBut.innerHTML = e3;
            }), this.langBind("pagination|next_title", (e3) => {
              this.nextBut.setAttribute("aria-label", e3), this.nextBut.setAttribute("title", e3);
            }), this.langBind("pagination|last", (e3) => {
              this.lastBut.innerHTML = e3;
            }), this.langBind("pagination|last_title", (e3) => {
              this.lastBut.setAttribute("aria-label", e3), this.lastBut.setAttribute("title", e3);
            }), this.firstBut.addEventListener("click", () => {
              this.setPage(1);
            }), this.prevBut.addEventListener("click", () => {
              this.previousPage();
            }), this.nextBut.addEventListener("click", () => {
              this.nextPage();
            }), this.lastBut.addEventListener("click", () => {
              this.setPage(this.max);
            }), this.table.options.paginationElement && (this.element = this.table.options.paginationElement), this.pageSizeSelect && (t2 = document.createElement("label"), this.langBind("pagination|page_size", (e3) => {
              this.pageSizeSelect.setAttribute("aria-label", e3), this.pageSizeSelect.setAttribute("title", e3), t2.innerHTML = e3;
            }), this.element.appendChild(t2), this.element.appendChild(this.pageSizeSelect), this.pageSizeSelect.addEventListener("change", (e3) => {
              this.setPageSize("true" == this.pageSizeSelect.value || this.pageSizeSelect.value), this.setPage(1);
            })), this.element.appendChild(this.firstBut), this.element.appendChild(this.prevBut), this.element.appendChild(this.pagesElement), this.element.appendChild(this.nextBut), this.element.appendChild(this.lastBut), this.table.options.paginationElement || (this.table.options.paginationCounter && (this.table.options.paginationCounterElement ? this.table.options.paginationCounterElement instanceof HTMLElement ? this.table.options.paginationCounterElement.appendChild(this.pageCounterElement) : "string" == typeof this.table.options.paginationCounterElement && ((i2 = document.querySelector(this.table.options.paginationCounterElement)) ? i2.appendChild(this.pageCounterElement) : console.warn("Pagination Error - Unable to find element matching paginationCounterElement selector:", this.table.options.paginationCounterElement)) : this.footerAppend(this.pageCounterElement)), this.footerAppend(this.element)), this.page = this.table.options.paginationInitialPage, this.count = this.table.options.paginationButtonCount), this.mode = this.table.options.paginationMode;
          }
          initializeProgressive(e2) {
            this.initializePaginator(true), this.mode = "progressive_" + e2, this.progressiveLoad = true;
          }
          trackChanges() {
            this.dispatch("page-changed");
          }
          setMaxRows(e2) {
            this.max = e2 ? true === this.size ? 1 : Math.ceil(e2 / this.size) : 1, this.page > this.max && (this.page = this.max);
          }
          reset(e2) {
            this.initialLoad || ("local" == this.mode || e2) && (this.page = 1, this.trackChanges());
          }
          setMaxPage(e2) {
            e2 = parseInt(e2), this.max = e2 || 1, this.page > this.max && (this.page = this.max, this.trigger());
          }
          setPage(e2) {
            switch (e2) {
              case "first":
                return this.setPage(1);
              case "prev":
                return this.previousPage();
              case "next":
                return this.nextPage();
              case "last":
                return this.setPage(this.max);
            }
            return (e2 = parseInt(e2)) > 0 && e2 <= this.max || "local" !== this.mode ? (this.page = e2, this.trackChanges(), this.trigger()) : (console.warn("Pagination Error - Requested page is out of range of 1 - " + this.max + ":", e2), Promise.reject());
          }
          setPageToRow(e2) {
            var t2 = this.displayRows(-1).indexOf(e2);
            if (t2 > -1) {
              var i2 = true === this.size ? 1 : Math.ceil((t2 + 1) / this.size);
              return this.setPage(i2);
            }
            return console.warn("Pagination Error - Requested row is not visible"), Promise.reject();
          }
          setPageSize(e2) {
            true !== e2 && (e2 = parseInt(e2)), e2 > 0 && (this.size = e2, this.dispatchExternal("pageSizeChanged", e2)), this.pageSizeSelect && this.generatePageSizeSelectList(), this.trackChanges();
          }
          _setPageCounter(e2, t2, i2) {
            var s2;
            if (this.pageCounter)
              switch ("remote" === this.mode && (t2 = this.size, i2 = (this.page - 1) * this.size + 1, e2 = this.remoteRowCountEstimate), typeof (s2 = this.pageCounter.call(this, t2, i2, this.page, e2, this.max))) {
                case "object":
                  if (s2 instanceof Node) {
                    for (; this.pageCounterElement.firstChild; )
                      this.pageCounterElement.removeChild(this.pageCounterElement.firstChild);
                    this.pageCounterElement.appendChild(s2);
                  } else
                    this.pageCounterElement.innerHTML = "", null != s2 && console.warn("Page Counter Error - Page Counter has returned a type of object, the only valid page counter object return is an instance of Node, the page counter returned:", s2);
                  break;
                case "undefined":
                  this.pageCounterElement.innerHTML = "";
                  break;
                default:
                  this.pageCounterElement.innerHTML = s2;
              }
          }
          _setPageButtons() {
            let e2 = Math.floor((this.count - 1) / 2), t2 = Math.ceil((this.count - 1) / 2), i2 = this.max - this.page + e2 + 1 < this.count ? this.max - this.count + 1 : Math.max(this.page - e2, 1), s2 = this.page <= t2 ? Math.min(this.count, this.max) : Math.min(this.page + t2, this.max);
            for (; this.pagesElement.firstChild; )
              this.pagesElement.removeChild(this.pagesElement.firstChild);
            1 == this.page ? (this.firstBut.disabled = true, this.prevBut.disabled = true) : (this.firstBut.disabled = false, this.prevBut.disabled = false), this.page == this.max ? (this.lastBut.disabled = true, this.nextBut.disabled = true) : (this.lastBut.disabled = false, this.nextBut.disabled = false);
            for (let e3 = i2; e3 <= s2; e3++)
              e3 > 0 && e3 <= this.max && this.pagesElement.appendChild(this._generatePageButton(e3));
            this.footerRedraw();
          }
          _generatePageButton(e2) {
            var t2 = document.createElement("button");
            return t2.classList.add("tabulator-page"), e2 == this.page && t2.classList.add("active"), t2.setAttribute("type", "button"), t2.setAttribute("role", "button"), this.langBind("pagination|page_title", (i2) => {
              t2.setAttribute("aria-label", i2 + " " + e2), t2.setAttribute("title", i2 + " " + e2);
            }), t2.setAttribute("data-page", e2), t2.textContent = e2, t2.addEventListener("click", (t3) => {
              this.setPage(e2);
            }), t2;
          }
          previousPage() {
            return this.page > 1 ? (this.page--, this.trackChanges(), this.trigger()) : (console.warn("Pagination Error - Previous page would be less than page 1:", 0), Promise.reject());
          }
          nextPage() {
            return this.page < this.max ? (this.page++, this.trackChanges(), this.trigger()) : (this.progressiveLoad || console.warn("Pagination Error - Next page would be greater than maximum page of " + this.max + ":", this.max + 1), Promise.reject());
          }
          getPage() {
            return this.page;
          }
          getPageMax() {
            return this.max;
          }
          getPageSize(e2) {
            return this.size;
          }
          getMode() {
            return this.mode;
          }
          getRows(e2) {
            var t2, i2, s2, o2, n2 = 0, r2 = e2.filter((e3) => "row" === e3.type);
            if ("local" == this.mode) {
              t2 = [], this.setMaxRows(e2.length), true === this.size ? (i2 = 0, s2 = e2.length) : s2 = (i2 = this.size * (this.page - 1)) + parseInt(this.size), this._setPageButtons();
              for (let r3 = i2; r3 < s2; r3++) {
                let i3 = e2[r3];
                i3 && (t2.push(i3), "row" === i3.type && (o2 || (o2 = i3), n2++));
              }
              return this._setPageCounter(r2.length, n2, o2 ? r2.indexOf(o2) + 1 : 0), t2;
            }
            return this._setPageButtons(), this._setPageCounter(r2.length), e2.slice(0);
          }
          trigger() {
            var e2;
            switch (this.mode) {
              case "local":
                return e2 = this.table.rowManager.scrollLeft, this.refreshData(), this.table.rowManager.scrollHorizontal(e2), this.dispatchExternal("pageLoaded", this.getPage()), Promise.resolve();
              case "remote":
                return this.dataChanging = true, this.reloadData(null).finally(() => {
                  this.dataChanging = false;
                });
              case "progressive_load":
              case "progressive_scroll":
                return this.reloadData(null, true);
              default:
                return console.warn("Pagination Error - no such pagination mode:", this.mode), Promise.reject();
            }
          }
          _parseRemoteData(e2) {
            var t2;
            if (void 0 === e2.last_page && console.warn("Remote Pagination Error - Server response missing '" + (this.options("dataReceiveParams").last_page || "last_page") + "' property"), e2.data) {
              if (this.max = parseInt(e2.last_page) || 1, this.remoteRowCountEstimate = void 0 !== e2.last_row ? e2.last_row : e2.last_page * this.size - (this.page == e2.last_page ? this.size - e2.data.length : 0), this.progressiveLoad) {
                switch (this.mode) {
                  case "progressive_load":
                    1 == this.page ? this.table.rowManager.setData(e2.data, false, 1 == this.page) : this.table.rowManager.addRows(e2.data), this.page < this.max && setTimeout(() => {
                      this.nextPage();
                    }, this.table.options.progressiveLoadDelay);
                    break;
                  case "progressive_scroll":
                    e2 = 1 === this.page ? e2.data : this.table.rowManager.getData().concat(e2.data), this.table.rowManager.setData(e2, 1 !== this.page, 1 == this.page), t2 = this.table.options.progressiveLoadScrollMargin || 2 * this.table.rowManager.element.clientHeight, this.table.rowManager.element.scrollHeight <= this.table.rowManager.element.clientHeight + t2 && this.page < this.max && setTimeout(() => {
                      this.nextPage();
                    });
                }
                return false;
              }
              this.dispatchExternal("pageLoaded", this.getPage());
            } else
              console.warn("Remote Pagination Error - Server response missing '" + (this.options("dataReceiveParams").data || "data") + "' property");
            return e2.data;
          }
          footerRedraw() {
            var e2 = this.table.footerManager.containerElement;
            Math.ceil(e2.clientWidth) - e2.scrollWidth < 0 ? this.pagesElement.style.display = "none" : (this.pagesElement.style.display = "", Math.ceil(e2.clientWidth) - e2.scrollWidth < 0 && (this.pagesElement.style.display = "none"));
          }
        };
        let Pe = _Pe;
        __publicField(Pe, "moduleName", "page");
        __publicField(Pe, "pageCounters", ze);
        var Fe = { local: function(e2, t2) {
          var i2 = localStorage.getItem(e2 + "-" + t2);
          return !!i2 && JSON.parse(i2);
        }, cookie: function(e2, t2) {
          var i2, s2, o2 = document.cookie, n2 = e2 + "-" + t2, r2 = o2.indexOf(n2 + "=");
          return r2 > -1 && ((i2 = (o2 = o2.slice(r2)).indexOf(";")) > -1 && (o2 = o2.slice(0, i2)), s2 = o2.replace(n2 + "=", "")), !!s2 && JSON.parse(s2);
        } }, He = { local: function(e2, t2, i2) {
          localStorage.setItem(e2 + "-" + t2, JSON.stringify(i2));
        }, cookie: function(e2, t2, i2) {
          var s2 = new Date();
          s2.setDate(s2.getDate() + 1e4), document.cookie = e2 + "-" + t2 + "=" + JSON.stringify(i2) + "; expires=" + s2.toUTCString();
        } };
        const __e = class extends M {
          constructor(e2) {
            super(e2), this.mode = "", this.id = "", this.defWatcherBlock = false, this.config = {}, this.readFunc = false, this.writeFunc = false, this.registerTableOption("persistence", false), this.registerTableOption("persistenceID", ""), this.registerTableOption("persistenceMode", true), this.registerTableOption("persistenceReaderFunc", false), this.registerTableOption("persistenceWriterFunc", false);
          }
          localStorageTest() {
            var e2 = "_tabulator_test";
            try {
              return window.localStorage.setItem(e2, e2), window.localStorage.removeItem(e2), true;
            } catch (e3) {
              return false;
            }
          }
          initialize() {
            if (this.table.options.persistence) {
              var e2, t2 = this.table.options.persistenceMode, i2 = this.table.options.persistenceID;
              this.mode = true !== t2 ? t2 : this.localStorageTest() ? "local" : "cookie", this.table.options.persistenceReaderFunc ? "function" == typeof this.table.options.persistenceReaderFunc ? this.readFunc = this.table.options.persistenceReaderFunc : __e.readers[this.table.options.persistenceReaderFunc] ? this.readFunc = __e.readers[this.table.options.persistenceReaderFunc] : console.warn("Persistence Read Error - invalid reader set", this.table.options.persistenceReaderFunc) : __e.readers[this.mode] ? this.readFunc = __e.readers[this.mode] : console.warn("Persistence Read Error - invalid reader set", this.mode), this.table.options.persistenceWriterFunc ? "function" == typeof this.table.options.persistenceWriterFunc ? this.writeFunc = this.table.options.persistenceWriterFunc : __e.writers[this.table.options.persistenceWriterFunc] ? this.writeFunc = __e.writers[this.table.options.persistenceWriterFunc] : console.warn("Persistence Write Error - invalid reader set", this.table.options.persistenceWriterFunc) : __e.writers[this.mode] ? this.writeFunc = __e.writers[this.mode] : console.warn("Persistence Write Error - invalid writer set", this.mode), this.id = "tabulator-" + (i2 || this.table.element.getAttribute("id") || ""), this.config = { sort: true === this.table.options.persistence || this.table.options.persistence.sort, filter: true === this.table.options.persistence || this.table.options.persistence.filter, headerFilter: true === this.table.options.persistence || this.table.options.persistence.headerFilter, group: true === this.table.options.persistence || this.table.options.persistence.group, page: true === this.table.options.persistence || this.table.options.persistence.page, columns: true === this.table.options.persistence ? ["title", "width", "visible"] : this.table.options.persistence.columns }, this.config.page && (e2 = this.retrieveData("page")) && (void 0 === e2.paginationSize || true !== this.config.page && !this.config.page.size || (this.table.options.paginationSize = e2.paginationSize), void 0 === e2.paginationInitialPage || true !== this.config.page && !this.config.page.page || (this.table.options.paginationInitialPage = e2.paginationInitialPage)), this.config.group && (e2 = this.retrieveData("group")) && (void 0 === e2.groupBy || true !== this.config.group && !this.config.group.groupBy || (this.table.options.groupBy = e2.groupBy), void 0 === e2.groupStartOpen || true !== this.config.group && !this.config.group.groupStartOpen || (this.table.options.groupStartOpen = e2.groupStartOpen), void 0 === e2.groupHeader || true !== this.config.group && !this.config.group.groupHeader || (this.table.options.groupHeader = e2.groupHeader)), this.config.columns && (this.table.options.columns = this.load("columns", this.table.options.columns), this.subscribe("column-init", this.initializeColumn.bind(this)), this.subscribe("column-show", this.save.bind(this, "columns")), this.subscribe("column-hide", this.save.bind(this, "columns")), this.subscribe("column-moved", this.save.bind(this, "columns"))), this.subscribe("table-built", this.tableBuilt.bind(this), 0), this.subscribe("table-redraw", this.tableRedraw.bind(this)), this.subscribe("filter-changed", this.eventSave.bind(this, "filter")), this.subscribe("filter-changed", this.eventSave.bind(this, "headerFilter")), this.subscribe("sort-changed", this.eventSave.bind(this, "sort")), this.subscribe("group-changed", this.eventSave.bind(this, "group")), this.subscribe("page-changed", this.eventSave.bind(this, "page")), this.subscribe("column-resized", this.eventSave.bind(this, "columns")), this.subscribe("column-width", this.eventSave.bind(this, "columns")), this.subscribe("layout-refreshed", this.eventSave.bind(this, "columns"));
            }
            this.registerTableFunction("getColumnLayout", this.getColumnLayout.bind(this)), this.registerTableFunction("setColumnLayout", this.setColumnLayout.bind(this));
          }
          eventSave(e2) {
            this.config[e2] && this.save(e2);
          }
          tableBuilt() {
            var e2, t2, i2;
            this.config.sort && false == !(e2 = this.load("sort")) && (this.table.options.initialSort = e2), this.config.filter && false == !(t2 = this.load("filter")) && (this.table.options.initialFilter = t2), this.config.headerFilter && false == !(i2 = this.load("headerFilter")) && (this.table.options.initialHeaderFilter = i2);
          }
          tableRedraw(e2) {
            e2 && this.config.columns && this.save("columns");
          }
          getColumnLayout() {
            return this.parseColumns(this.table.columnManager.getColumns());
          }
          setColumnLayout(e2) {
            return this.table.columnManager.setColumns(this.mergeDefinition(this.table.options.columns, e2, true)), true;
          }
          initializeColumn(e2) {
            var t2;
            this.config.columns && (this.defWatcherBlock = true, t2 = e2.getDefinition(), (true === this.config.columns ? Object.keys(t2) : this.config.columns).forEach((e3) => {
              var i2 = Object.getOwnPropertyDescriptor(t2, e3), s2 = t2[e3];
              i2 && Object.defineProperty(t2, e3, { set: (e4) => {
                s2 = e4, this.defWatcherBlock || this.save("columns"), i2.set && i2.set(e4);
              }, get: () => (i2.get && i2.get(), s2) });
            }), this.defWatcherBlock = false);
          }
          load(e2, t2) {
            var i2 = this.retrieveData(e2);
            return t2 && (i2 = i2 ? this.mergeDefinition(t2, i2) : t2), i2;
          }
          retrieveData(e2) {
            return !!this.readFunc && this.readFunc(this.id, e2);
          }
          mergeDefinition(e2, t2, i2) {
            var s2 = [];
            return (t2 = t2 || []).forEach((t3, o2) => {
              var n2, r2 = this._findColumn(e2, t3);
              r2 && (i2 ? n2 = Object.keys(t3) : true === this.config.columns || null == this.config.columns ? (n2 = Object.keys(r2)).push("width") : n2 = this.config.columns, n2.forEach((e3) => {
                "columns" !== e3 && void 0 !== t3[e3] && (r2[e3] = t3[e3]);
              }), r2.columns && (r2.columns = this.mergeDefinition(r2.columns, t3.columns)), s2.push(r2));
            }), e2.forEach((e3, i3) => {
              this._findColumn(t2, e3) || (s2.length > i3 ? s2.splice(i3, 0, e3) : s2.push(e3));
            }), s2;
          }
          _findColumn(e2, t2) {
            var i2 = t2.columns ? "group" : t2.field ? "field" : "object";
            return e2.find(function(e3) {
              switch (i2) {
                case "group":
                  return e3.title === t2.title && e3.columns.length === t2.columns.length;
                case "field":
                  return e3.field === t2.field;
                case "object":
                  return e3 === t2;
              }
            });
          }
          save(e2) {
            var t2 = {};
            switch (e2) {
              case "columns":
                t2 = this.parseColumns(this.table.columnManager.getColumns());
                break;
              case "filter":
                t2 = this.table.modules.filter.getFilters();
                break;
              case "headerFilter":
                t2 = this.table.modules.filter.getHeaderFilters();
                break;
              case "sort":
                t2 = this.validateSorters(this.table.modules.sort.getSort());
                break;
              case "group":
                t2 = this.getGroupConfig();
                break;
              case "page":
                t2 = this.getPageConfig();
            }
            this.writeFunc && this.writeFunc(this.id, e2, t2);
          }
          validateSorters(e2) {
            return e2.forEach(function(e3) {
              e3.column = e3.field, delete e3.field;
            }), e2;
          }
          getGroupConfig() {
            var e2 = {};
            return this.config.group && ((true === this.config.group || this.config.group.groupBy) && (e2.groupBy = this.table.options.groupBy), (true === this.config.group || this.config.group.groupStartOpen) && (e2.groupStartOpen = this.table.options.groupStartOpen), (true === this.config.group || this.config.group.groupHeader) && (e2.groupHeader = this.table.options.groupHeader)), e2;
          }
          getPageConfig() {
            var e2 = {};
            return this.config.page && ((true === this.config.page || this.config.page.size) && (e2.paginationSize = this.table.modules.page.getPageSize()), (true === this.config.page || this.config.page.page) && (e2.paginationInitialPage = this.table.modules.page.getPage())), e2;
          }
          parseColumns(e2) {
            var t2 = [], i2 = ["headerContextMenu", "headerMenu", "contextMenu", "clickMenu"];
            return e2.forEach((e3) => {
              var s2, o2 = {}, n2 = e3.getDefinition();
              e3.isGroup ? (o2.title = n2.title, o2.columns = this.parseColumns(e3.getColumns())) : (o2.field = e3.getField(), true === this.config.columns || null == this.config.columns ? ((s2 = Object.keys(n2)).push("width"), s2.push("visible")) : s2 = this.config.columns, s2.forEach((t3) => {
                switch (t3) {
                  case "width":
                    o2.width = e3.getWidth();
                    break;
                  case "visible":
                    o2.visible = e3.visible;
                    break;
                  default:
                    "function" != typeof n2[t3] && -1 === i2.indexOf(t3) && (o2[t3] = n2[t3]);
                }
              })), t2.push(o2);
            }), t2;
          }
        };
        let _e = __e;
        __publicField(_e, "moduleName", "persistence");
        __publicField(_e, "moduleInitOrder", -10);
        __publicField(_e, "readers", Fe);
        __publicField(_e, "writers", He);
        var Oe = { format: { formatters: { responsiveCollapse: function(e2, t2, i2) {
          var s2 = document.createElement("div"), o2 = e2.getRow()._row.modules.responsiveLayout;
          function n2(e3) {
            var t3 = o2.element;
            o2.open = e3, t3 && (o2.open ? (s2.classList.add("open"), t3.style.display = "") : (s2.classList.remove("open"), t3.style.display = "none"));
          }
          return s2.classList.add("tabulator-responsive-collapse-toggle"), s2.innerHTML = `<svg class='tabulator-responsive-collapse-toggle-open' viewbox="0 0 24 24">
  <line x1="7" y1="12" x2="17" y2="12" fill="none" stroke-width="3" stroke-linecap="round" />
  <line y1="7" x1="12" y2="17" x2="12" fill="none" stroke-width="3" stroke-linecap="round" />
</svg>

<svg class='tabulator-responsive-collapse-toggle-close' viewbox="0 0 24 24">
  <line x1="7" y1="12" x2="17" y2="12"  fill="none" stroke-width="3" stroke-linecap="round" />
</svg>`, e2.getElement().classList.add("tabulator-row-handle"), s2.addEventListener("click", function(t3) {
            t3.stopImmediatePropagation(), n2(!o2.open), e2.getTable().rowManager.adjustTableSize();
          }), n2(o2.open), s2;
        } } } };
        var Ae = { format: { formatters: { rowSelection: function(e2, t2, i2) {
          var s2 = document.createElement("input"), o2 = false;
          if (s2.type = "checkbox", s2.setAttribute("aria-label", "Select Row"), this.table.modExists("selectRow", true))
            if (s2.addEventListener("click", (e3) => {
              e3.stopPropagation();
            }), "function" == typeof e2.getRow) {
              var n2 = e2.getRow();
              n2 instanceof m ? (s2.addEventListener("change", (e3) => {
                "click" === this.table.options.selectableRowsRangeMode && o2 ? o2 = false : n2.toggleSelect();
              }), "click" === this.table.options.selectableRowsRangeMode && s2.addEventListener("click", (e3) => {
                o2 = true, this.table.modules.selectRow.handleComplexRowClick(n2._row, e3);
              }), s2.checked = n2.isSelected && n2.isSelected(), this.table.modules.selectRow.registerRowSelectCheckbox(n2, s2)) : s2 = "";
            } else
              s2.addEventListener("change", (e3) => {
                this.table.modules.selectRow.selectedRows.length ? this.table.deselectRow() : this.table.selectRow(t2.rowRange);
              }), this.table.modules.selectRow.registerHeaderSelectCheckbox(s2);
          return s2;
        } } } };
        class Be {
          constructor(e2) {
            return this._range = e2, new Proxy(this, { get: function(e3, t2, i2) {
              return void 0 !== e3[t2] ? e3[t2] : e3._range.table.componentFunctionBinder.handle("range", e3._range, t2);
            } });
          }
          getElement() {
            return this._range.element;
          }
          getData() {
            return this._range.getData();
          }
          getCells() {
            return this._range.getCells(true, true);
          }
          getStructuredCells() {
            return this._range.getStructuredCells();
          }
          getRows() {
            return this._range.getRows().map((e2) => e2.getComponent());
          }
          getColumns() {
            return this._range.getColumns().map((e2) => e2.getComponent());
          }
          getBounds() {
            return this._range.getBounds();
          }
          getTopEdge() {
            return this._range.top;
          }
          getBottomEdge() {
            return this._range.bottom;
          }
          getLeftEdge() {
            return this._range.left;
          }
          getRightEdge() {
            return this._range.right;
          }
          setBounds(e2, t2) {
            this._range.destroyedGuard("setBounds") && this._range.setBounds(e2 ? e2._cell : e2, t2 ? t2._cell : t2);
          }
          setStartBound(e2) {
            this._range.destroyedGuard("setStartBound") && (this._range.setEndBound(e2 ? e2._cell : e2), this._range.rangeManager.layoutElement());
          }
          setEndBound(e2) {
            this._range.destroyedGuard("setEndBound") && (this._range.setEndBound(e2 ? e2._cell : e2), this._range.rangeManager.layoutElement());
          }
          clearValues() {
            this._range.destroyedGuard("clearValues") && this._range.clearValues();
          }
          remove() {
            this._range.destroyedGuard("remove") && this._range.destroy(true);
          }
        }
        class Ve extends t {
          constructor(e2, t2, i2, s2) {
            super(e2), this.rangeManager = t2, this.element = null, this.initialized = false, this.initializing = { start: false, end: false }, this.destroyed = false, this.top = 0, this.bottom = 0, this.left = 0, this.right = 0, this.table = e2, this.start = { row: 0, col: 0 }, this.end = { row: 0, col: 0 }, this.rangeManager.rowHeader && (this.left = 1, this.right = 1, this.start.col = 1, this.end.col = 1), this.initElement(), setTimeout(() => {
              this.initBounds(i2, s2);
            });
          }
          initElement() {
            this.element = document.createElement("div"), this.element.classList.add("tabulator-range");
          }
          initBounds(e2, t2) {
            this._updateMinMax(), e2 && this.setBounds(e2, t2 || e2);
          }
          setStart(e2, t2) {
            this.start.row === e2 && this.start.col === t2 || (this.start.row = e2, this.start.col = t2, this.initializing.start = true, this._updateMinMax());
          }
          setEnd(e2, t2) {
            this.end.row === e2 && this.end.col === t2 || (this.end.row = e2, this.end.col = t2, this.initializing.end = true, this._updateMinMax());
          }
          setBounds(e2, t2, i2) {
            e2 && this.setStartBound(e2), this.setEndBound(t2 || e2), this.rangeManager.layoutElement(i2);
          }
          setStartBound(e2) {
            var t2, i2;
            "column" === e2.type ? this.rangeManager.columnSelection && this.setStart(0, e2.getPosition() - 1) : (t2 = e2.row.position - 1, i2 = e2.column.getPosition() - 1, e2.column === this.rangeManager.rowHeader ? this.setStart(t2, 1) : this.setStart(t2, i2));
          }
          setEndBound(e2) {
            var t2, i2, s2, o2 = this._getTableRows().length;
            "column" === e2.type ? this.rangeManager.columnSelection && ("column" === this.rangeManager.selecting ? this.setEnd(o2 - 1, e2.getPosition() - 1) : "cell" === this.rangeManager.selecting && this.setEnd(0, e2.getPosition() - 1)) : (t2 = e2.row.position - 1, i2 = e2.column.getPosition() - 1, s2 = e2.column === this.rangeManager.rowHeader, "row" === this.rangeManager.selecting ? this.setEnd(t2, this._getTableColumns().length - 1) : "row" !== this.rangeManager.selecting && s2 ? this.setEnd(t2, 0) : "column" === this.rangeManager.selecting ? this.setEnd(o2 - 1, i2) : this.setEnd(t2, i2));
          }
          _updateMinMax() {
            this.top = Math.min(this.start.row, this.end.row), this.bottom = Math.max(this.start.row, this.end.row), this.left = Math.min(this.start.col, this.end.col), this.right = Math.max(this.start.col, this.end.col), this.initialized ? this.dispatchExternal("rangeChanged", this.getComponent()) : this.initializing.start && this.initializing.end && (this.initialized = true, this.dispatchExternal("rangeAdded", this.getComponent()));
          }
          _getTableColumns() {
            return this.table.columnManager.getVisibleColumnsByIndex();
          }
          _getTableRows() {
            return this.table.rowManager.getDisplayRows().filter((e2) => "row" === e2.type);
          }
          layout() {
            var e2, t2, i2, s2, o2, n2, r2, a2, l2, h2, d2 = this.table.rowManager.renderer.vDomTop, c2 = this.table.rowManager.renderer.vDomBottom, u2 = this.table.columnManager.renderer.leftCol, m2 = this.table.columnManager.renderer.rightCol;
            "virtual" === this.table.options.renderHorizontal && this.rangeManager.rowHeader && (m2 += 1), null == d2 && (d2 = 0), null == c2 && (c2 = 1 / 0), null == u2 && (u2 = 0), null == m2 && (m2 = 1 / 0), this.overlaps(u2, d2, m2, c2) && (e2 = Math.max(this.top, d2), t2 = Math.min(this.bottom, c2), i2 = Math.max(this.left, u2), s2 = Math.min(this.right, m2), o2 = this.rangeManager.getCell(e2, i2), n2 = this.rangeManager.getCell(t2, s2), r2 = o2.getElement(), a2 = n2.getElement(), l2 = o2.row.getElement(), h2 = n2.row.getElement(), this.element.classList.add("tabulator-range-active"), this.table.rtl ? (this.element.style.right = l2.offsetWidth - r2.offsetLeft - r2.offsetWidth + "px", this.element.style.width = r2.offsetLeft + r2.offsetWidth - a2.offsetLeft + "px") : (this.element.style.left = l2.offsetLeft + r2.offsetLeft + "px", this.element.style.width = a2.offsetLeft + a2.offsetWidth - r2.offsetLeft + "px"), this.element.style.top = l2.offsetTop + "px", this.element.style.height = h2.offsetTop + h2.offsetHeight - l2.offsetTop + "px");
          }
          atTopLeft(e2) {
            return e2.row.position - 1 === this.top && e2.column.getPosition() - 1 === this.left;
          }
          atBottomRight(e2) {
            return e2.row.position - 1 === this.bottom && e2.column.getPosition() - 1 === this.right;
          }
          occupies(e2) {
            return this.occupiesRow(e2.row) && this.occupiesColumn(e2.column);
          }
          occupiesRow(e2) {
            return this.top <= e2.position - 1 && e2.position - 1 <= this.bottom;
          }
          occupiesColumn(e2) {
            return this.left <= e2.getPosition() - 1 && e2.getPosition() - 1 <= this.right;
          }
          overlaps(e2, t2, i2, s2) {
            return !(this.left > i2 || e2 > this.right || this.top > s2 || t2 > this.bottom);
          }
          getData() {
            var e2 = [], t2 = this.getRows(), i2 = this.getColumns();
            return t2.forEach((t3) => {
              var s2 = t3.getData(), o2 = {};
              i2.forEach((e3) => {
                o2[e3.field] = s2[e3.field];
              }), e2.push(o2);
            }), e2;
          }
          getCells(e2, t2) {
            var i2 = [], s2 = this.getRows(), o2 = this.getColumns();
            return e2 ? i2 = s2.map((e3) => {
              var i3 = [];
              return e3.getCells().forEach((e4) => {
                o2.includes(e4.column) && i3.push(t2 ? e4.getComponent() : e4);
              }), i3;
            }) : s2.forEach((e3) => {
              e3.getCells().forEach((e4) => {
                o2.includes(e4.column) && i2.push(t2 ? e4.getComponent() : e4);
              });
            }), i2;
          }
          getStructuredCells() {
            return this.getCells(true, true);
          }
          getRows() {
            return this._getTableRows().slice(this.top, this.bottom + 1);
          }
          getColumns() {
            return this._getTableColumns().slice(this.left, this.right + 1);
          }
          clearValues() {
            var e2 = this.getCells(), t2 = this.table.options.selectableRangeClearCellsValue;
            this.table.blockRedraw(), e2.forEach((e3) => {
              e3.setValue(t2);
            }), this.table.restoreRedraw();
          }
          getBounds(e2) {
            var t2 = this.getCells(false, e2), i2 = { start: null, end: null };
            return t2.length ? (i2.start = t2[0], i2.end = t2[t2.length - 1]) : console.warn("No bounds defined on range"), i2;
          }
          getComponent() {
            return this.component || (this.component = new Be(this)), this.component;
          }
          destroy(e2) {
            this.destroyed = true, this.element.remove(), e2 && this.rangeManager.rangeRemoved(this), this.initialized && this.dispatchExternal("rangeRemoved", this.getComponent());
          }
          destroyedGuard(e2) {
            return this.destroyed && console.warn("You cannot call the " + e2 + " function on a destroyed range"), !this.destroyed;
          }
        }
        var Ie = { keybindings: { bindings: { rangeJumpUp: ["ctrl + 38", "meta + 38"], rangeJumpDown: ["ctrl + 40", "meta + 40"], rangeJumpLeft: ["ctrl + 37", "meta + 37"], rangeJumpRight: ["ctrl + 39", "meta + 39"], rangeExpandUp: "shift + 38", rangeExpandDown: "shift + 40", rangeExpandLeft: "shift + 37", rangeExpandRight: "shift + 39", rangeExpandJumpUp: ["ctrl + shift + 38", "meta + shift + 38"], rangeExpandJumpDown: ["ctrl + shift + 40", "meta + shift + 40"], rangeExpandJumpLeft: ["ctrl + shift + 37", "meta + shift + 37"], rangeExpandJumpRight: ["ctrl + shift + 39", "meta + shift + 39"] }, actions: { rangeJumpLeft: function(e2) {
          this.dispatch("keybinding-nav-range", e2, "left", true, false);
        }, rangeJumpRight: function(e2) {
          this.dispatch("keybinding-nav-range", e2, "right", true, false);
        }, rangeJumpUp: function(e2) {
          this.dispatch("keybinding-nav-range", e2, "up", true, false);
        }, rangeJumpDown: function(e2) {
          this.dispatch("keybinding-nav-range", e2, "down", true, false);
        }, rangeExpandLeft: function(e2) {
          this.dispatch("keybinding-nav-range", e2, "left", false, true);
        }, rangeExpandRight: function(e2) {
          this.dispatch("keybinding-nav-range", e2, "right", false, true);
        }, rangeExpandUp: function(e2) {
          this.dispatch("keybinding-nav-range", e2, "up", false, true);
        }, rangeExpandDown: function(e2) {
          this.dispatch("keybinding-nav-range", e2, "down", false, true);
        }, rangeExpandJumpLeft: function(e2) {
          this.dispatch("keybinding-nav-range", e2, "left", true, true);
        }, rangeExpandJumpRight: function(e2) {
          this.dispatch("keybinding-nav-range", e2, "right", true, true);
        }, rangeExpandJumpUp: function(e2) {
          this.dispatch("keybinding-nav-range", e2, "up", true, true);
        }, rangeExpandJumpDown: function(e2) {
          this.dispatch("keybinding-nav-range", e2, "down", true, true);
        } } }, clipboard: { pasteActions: { range: function(e2) {
          var t2, i2, s2, o2, n2, r2 = [], a2 = this.table.modules.selectRange.activeRange, l2 = false;
          return n2 = e2.length, a2 && (i2 = (t2 = a2.getBounds()).start, t2.start === t2.end && (l2 = true), i2 && (s2 = (r2 = this.table.rowManager.activeRows.slice()).indexOf(i2.row), o2 = l2 ? e2.length : r2.indexOf(t2.end.row) - s2 + 1, s2 > -1 && (this.table.blockRedraw(), (r2 = r2.slice(s2, s2 + o2)).forEach((t3, i3) => {
            t3.updateData(e2[i3 % n2]);
          }), this.table.restoreRedraw()))), r2;
        } }, pasteParsers: { range: function(e2) {
          var t2, i2, s2, o2, n2, r2 = [], a2 = [], l2 = this.table.modules.selectRange.activeRange, h2 = false;
          return !!(l2 && (i2 = (t2 = l2.getBounds()).start, t2.start === t2.end && (h2 = true), i2 && ((e2 = e2.split("\n")).forEach(function(e3) {
            r2.push(e3.split("	"));
          }), r2.length && (n2 = (o2 = this.table.columnManager.getVisibleColumnsByIndex()).indexOf(i2.column)) > -1))) && (s2 = h2 ? r2[0].length : o2.indexOf(t2.end.column) - n2 + 1, o2 = o2.slice(n2, n2 + s2), r2.forEach((e3) => {
            var t3 = {}, i3 = e3.length;
            o2.forEach(function(s3, o3) {
              t3[s3.field] = e3[o3 % i3];
            }), a2.push(t3);
          }), a2);
        } } }, export: { columnLookups: { range: function() {
          var e2 = this.modules.selectRange.selectedColumns();
          return this.columnManager.rowHeader && e2.unshift(this.columnManager.rowHeader), e2;
        } }, rowLookups: { range: function() {
          return this.modules.selectRange.selectedRows();
        } } } };
        function Ne(e2, t2, i2, s2, o2, n2, r2) {
          var a2 = window.DateTime || luxon.DateTime, l2 = r2.format || "dd/MM/yyyy HH:mm:ss", h2 = r2.alignEmptyValues, d2 = 0;
          if (void 0 !== a2) {
            if (a2.isDateTime(e2) || (e2 = "iso" === l2 ? a2.fromISO(String(e2)) : a2.fromFormat(String(e2), l2)), a2.isDateTime(t2) || (t2 = "iso" === l2 ? a2.fromISO(String(t2)) : a2.fromFormat(String(t2), l2)), e2.isValid) {
              if (t2.isValid)
                return e2 - t2;
              d2 = 1;
            } else
              d2 = t2.isValid ? -1 : 0;
            return ("top" === h2 && "desc" === n2 || "bottom" === h2 && "asc" === n2) && (d2 *= -1), d2;
          }
          console.error("Sort Error - 'datetime' sorter is dependant on luxon.js");
        }
        var We = { number: function(e2, t2, i2, s2, o2, n2, r2) {
          var a2 = r2.alignEmptyValues, l2 = r2.decimalSeparator, h2 = r2.thousandSeparator, d2 = 0;
          if (e2 = String(e2), t2 = String(t2), h2 && (e2 = e2.split(h2).join(""), t2 = t2.split(h2).join("")), l2 && (e2 = e2.split(l2).join("."), t2 = t2.split(l2).join(".")), e2 = parseFloat(e2), t2 = parseFloat(t2), isNaN(e2))
            d2 = isNaN(t2) ? 0 : -1;
          else {
            if (!isNaN(t2))
              return e2 - t2;
            d2 = 1;
          }
          return ("top" === a2 && "desc" === n2 || "bottom" === a2 && "asc" === n2) && (d2 *= -1), d2;
        }, string: function(e2, t2, i2, s2, o2, n2, r2) {
          var a2, l2 = r2.alignEmptyValues, h2 = 0;
          if (e2) {
            if (t2) {
              switch (typeof r2.locale) {
                case "boolean":
                  r2.locale && (a2 = this.langLocale());
                  break;
                case "string":
                  a2 = r2.locale;
              }
              return String(e2).toLowerCase().localeCompare(String(t2).toLowerCase(), a2);
            }
            h2 = 1;
          } else
            h2 = t2 ? -1 : 0;
          return ("top" === l2 && "desc" === n2 || "bottom" === l2 && "asc" === n2) && (h2 *= -1), h2;
        }, date: function(e2, t2, i2, s2, o2, n2, r2) {
          return r2.format || (r2.format = "dd/MM/yyyy"), Ne.call(this, e2, t2, i2, s2, o2, n2, r2);
        }, time: function(e2, t2, i2, s2, o2, n2, r2) {
          return r2.format || (r2.format = "HH:mm"), Ne.call(this, e2, t2, i2, s2, o2, n2, r2);
        }, datetime: Ne, boolean: function(e2, t2, i2, s2, o2, n2, r2) {
          return (true === e2 || "true" === e2 || "True" === e2 || 1 === e2 ? 1 : 0) - (true === t2 || "true" === t2 || "True" === t2 || 1 === t2 ? 1 : 0);
        }, array: function(e2, t2, i2, s2, o2, n2, r2) {
          var a2 = r2.type || "length", l2 = r2.alignEmptyValues, h2 = 0;
          function d2(e3) {
            var t3;
            switch (a2) {
              case "length":
                t3 = e3.length;
                break;
              case "sum":
                t3 = e3.reduce(function(e4, t4) {
                  return e4 + t4;
                });
                break;
              case "max":
                t3 = Math.max.apply(null, e3);
                break;
              case "min":
                t3 = Math.min.apply(null, e3);
                break;
              case "avg":
                t3 = e3.reduce(function(e4, t4) {
                  return e4 + t4;
                }) / e3.length;
            }
            return t3;
          }
          if (Array.isArray(e2)) {
            if (Array.isArray(t2))
              return d2(t2) - d2(e2);
            h2 = 1;
          } else
            h2 = Array.isArray(t2) ? -1 : 0;
          return ("top" === l2 && "desc" === n2 || "bottom" === l2 && "asc" === n2) && (h2 *= -1), h2;
        }, exists: function(e2, t2, i2, s2, o2, n2, r2) {
          return (void 0 === e2 ? 0 : 1) - (void 0 === t2 ? 0 : 1);
        }, alphanum: function(e2, t2, i2, s2, o2, n2, r2) {
          var a2, l2, h2, d2, c2, u2 = 0, m2 = /(\d+)|(\D+)/g, p2 = /\d/, g2 = r2.alignEmptyValues, b2 = 0;
          if (e2 || 0 === e2) {
            if (t2 || 0 === t2) {
              if (isFinite(e2) && isFinite(t2))
                return e2 - t2;
              if ((a2 = String(e2).toLowerCase()) === (l2 = String(t2).toLowerCase()))
                return 0;
              if (!p2.test(a2) || !p2.test(l2))
                return a2 > l2 ? 1 : -1;
              for (a2 = a2.match(m2), l2 = l2.match(m2), c2 = a2.length > l2.length ? l2.length : a2.length; u2 < c2; )
                if ((h2 = a2[u2]) !== (d2 = l2[u2++]))
                  return isFinite(h2) && isFinite(d2) ? ("0" === h2.charAt(0) && (h2 = "." + h2), "0" === d2.charAt(0) && (d2 = "." + d2), h2 - d2) : h2 > d2 ? 1 : -1;
              return a2.length > l2.length;
            }
            b2 = 1;
          } else
            b2 = t2 || 0 === t2 ? -1 : 0;
          return ("top" === g2 && "desc" === n2 || "bottom" === g2 && "asc" === n2) && (b2 *= -1), b2;
        } };
        const _je = class extends M {
          constructor(e2) {
            super(e2), this.sortList = [], this.changed = false, this.registerTableOption("sortMode", "local"), this.registerTableOption("initialSort", false), this.registerTableOption("columnHeaderSortMulti", true), this.registerTableOption("sortOrderReverse", false), this.registerTableOption("headerSortElement", "<div class='tabulator-arrow'></div>"), this.registerTableOption("headerSortClickElement", "header"), this.registerColumnOption("sorter"), this.registerColumnOption("sorterParams"), this.registerColumnOption("headerSort", true), this.registerColumnOption("headerSortStartingDir"), this.registerColumnOption("headerSortTristate");
          }
          initialize() {
            this.subscribe("column-layout", this.initializeColumn.bind(this)), this.subscribe("table-built", this.tableBuilt.bind(this)), this.registerDataHandler(this.sort.bind(this), 20), this.registerTableFunction("setSort", this.userSetSort.bind(this)), this.registerTableFunction("getSorters", this.getSort.bind(this)), this.registerTableFunction("clearSort", this.clearSort.bind(this)), "remote" === this.table.options.sortMode && this.subscribe("data-params", this.remoteSortParams.bind(this));
          }
          tableBuilt() {
            this.table.options.initialSort && this.setSort(this.table.options.initialSort);
          }
          remoteSortParams(e2, t2, i2, s2) {
            var o2 = this.getSort();
            return o2.forEach((e3) => {
              delete e3.column;
            }), s2.sort = o2, s2;
          }
          userSetSort(e2, t2) {
            this.setSort(e2, t2), this.refreshSort();
          }
          clearSort() {
            this.clear(), this.refreshSort();
          }
          initializeColumn(e2) {
            var t2, i2, s2 = false;
            switch (typeof e2.definition.sorter) {
              case "string":
                _je.sorters[e2.definition.sorter] ? s2 = _je.sorters[e2.definition.sorter] : console.warn("Sort Error - No such sorter found: ", e2.definition.sorter);
                break;
              case "function":
                s2 = e2.definition.sorter;
            }
            if (e2.modules.sort = { sorter: s2, dir: "none", params: e2.definition.sorterParams || {}, startingDir: e2.definition.headerSortStartingDir || "asc", tristate: e2.definition.headerSortTristate }, false !== e2.definition.headerSort) {
              if ((t2 = e2.getElement()).classList.add("tabulator-sortable"), (i2 = document.createElement("div")).classList.add("tabulator-col-sorter"), "icon" === this.table.options.headerSortClickElement)
                i2.classList.add("tabulator-col-sorter-element");
              else
                t2.classList.add("tabulator-col-sorter-element");
              switch (this.table.options.headerSortElement) {
                case "function":
                  break;
                case "object":
                  i2.appendChild(this.table.options.headerSortElement);
                  break;
                default:
                  i2.innerHTML = this.table.options.headerSortElement;
              }
              e2.titleHolderElement.appendChild(i2), e2.modules.sort.element = i2, this.setColumnHeaderSortIcon(e2, "none"), "icon" === this.table.options.headerSortClickElement && i2.addEventListener("mousedown", (e3) => {
                e3.stopPropagation();
              }), ("icon" === this.table.options.headerSortClickElement ? i2 : t2).addEventListener("click", (t3) => {
                var i3 = "", s3 = [], o2 = false;
                if (e2.modules.sort) {
                  if (e2.modules.sort.tristate)
                    i3 = "none" == e2.modules.sort.dir ? e2.modules.sort.startingDir : e2.modules.sort.dir == e2.modules.sort.startingDir ? "asc" == e2.modules.sort.dir ? "desc" : "asc" : "none";
                  else
                    switch (e2.modules.sort.dir) {
                      case "asc":
                        i3 = "desc";
                        break;
                      case "desc":
                        i3 = "asc";
                        break;
                      default:
                        i3 = e2.modules.sort.startingDir;
                    }
                  this.table.options.columnHeaderSortMulti && (t3.shiftKey || t3.ctrlKey) ? (o2 = (s3 = this.getSort()).findIndex((t4) => t4.field === e2.getField()), o2 > -1 ? (s3[o2].dir = i3, o2 = s3.splice(o2, 1)[0], "none" != i3 && s3.push(o2)) : "none" != i3 && s3.push({ column: e2, dir: i3 }), this.setSort(s3)) : "none" == i3 ? this.clear() : this.setSort(e2, i3), this.refreshSort();
                }
              });
            }
          }
          refreshSort() {
            "remote" === this.table.options.sortMode ? this.reloadData(null, false, false) : this.refreshData(true);
          }
          hasChanged() {
            var e2 = this.changed;
            return this.changed = false, e2;
          }
          getSort() {
            var e2 = [];
            return this.sortList.forEach(function(t2) {
              t2.column && e2.push({ column: t2.column.getComponent(), field: t2.column.getField(), dir: t2.dir });
            }), e2;
          }
          setSort(e2, t2) {
            var i2 = this, s2 = [];
            Array.isArray(e2) || (e2 = [{ column: e2, dir: t2 }]), e2.forEach(function(e3) {
              var t3;
              (t3 = i2.table.columnManager.findColumn(e3.column)) ? (e3.column = t3, s2.push(e3), i2.changed = true) : console.warn("Sort Warning - Sort field does not exist and is being ignored: ", e3.column);
            }), i2.sortList = s2, this.dispatch("sort-changed");
          }
          clear() {
            this.setSort([]);
          }
          findSorter(e2) {
            var t2, i2 = this.table.rowManager.activeRows[0], s2 = "string";
            if (i2 && (i2 = i2.getData(), e2.getField()))
              switch (typeof (t2 = e2.getFieldValue(i2))) {
                case "undefined":
                  s2 = "string";
                  break;
                case "boolean":
                  s2 = "boolean";
                  break;
                default:
                  isNaN(t2) || "" === t2 ? t2.match(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+$/i) && (s2 = "alphanum") : s2 = "number";
              }
            return _je.sorters[s2];
          }
          sort(e2, t2) {
            var i2 = this, s2 = this.table.options.sortOrderReverse ? i2.sortList.slice().reverse() : i2.sortList, o2 = [], n2 = [];
            return this.subscribedExternal("dataSorting") && this.dispatchExternal("dataSorting", i2.getSort()), t2 || i2.clearColumnHeaders(), "remote" !== this.table.options.sortMode ? (s2.forEach(function(e3, s3) {
              var n3;
              e3.column && ((n3 = e3.column.modules.sort) && (n3.sorter || (n3.sorter = i2.findSorter(e3.column)), e3.params = "function" == typeof n3.params ? n3.params(e3.column.getComponent(), e3.dir) : n3.params, o2.push(e3)), t2 || i2.setColumnHeader(e3.column, e3.dir));
            }), o2.length && i2._sortItems(e2, o2)) : t2 || s2.forEach(function(e3, t3) {
              i2.setColumnHeader(e3.column, e3.dir);
            }), this.subscribedExternal("dataSorted") && (e2.forEach((e3) => {
              n2.push(e3.getComponent());
            }), this.dispatchExternal("dataSorted", i2.getSort(), n2)), e2;
          }
          clearColumnHeaders() {
            this.table.columnManager.getRealColumns().forEach((e2) => {
              e2.modules.sort && (e2.modules.sort.dir = "none", e2.getElement().setAttribute("aria-sort", "none"), this.setColumnHeaderSortIcon(e2, "none"));
            });
          }
          setColumnHeader(e2, t2) {
            e2.modules.sort.dir = t2, e2.getElement().setAttribute("aria-sort", "asc" === t2 ? "ascending" : "descending"), this.setColumnHeaderSortIcon(e2, t2);
          }
          setColumnHeaderSortIcon(e2, t2) {
            var i2, s2 = e2.modules.sort.element;
            if (e2.definition.headerSort && "function" == typeof this.table.options.headerSortElement) {
              for (; s2.firstChild; )
                s2.removeChild(s2.firstChild);
              "object" == typeof (i2 = this.table.options.headerSortElement.call(this.table, e2.getComponent(), t2)) ? s2.appendChild(i2) : s2.innerHTML = i2;
            }
          }
          _sortItems(e2, t2) {
            var i2 = t2.length - 1;
            e2.sort((e3, s2) => {
              for (var o2, n2 = i2; n2 >= 0; n2--) {
                let i3 = t2[n2];
                if (0 !== (o2 = this._sortRow(e3, s2, i3.column, i3.dir, i3.params)))
                  break;
              }
              return o2;
            });
          }
          _sortRow(e2, t2, i2, s2, o2) {
            var n2, r2, a2 = "asc" == s2 ? e2 : t2, l2 = "asc" == s2 ? t2 : e2;
            return e2 = void 0 !== (e2 = i2.getFieldValue(a2.getData())) ? e2 : "", t2 = void 0 !== (t2 = i2.getFieldValue(l2.getData())) ? t2 : "", n2 = a2.getComponent(), r2 = l2.getComponent(), i2.modules.sort.sorter.call(this, e2, t2, n2, r2, i2.getComponent(), s2, o2);
          }
        };
        let je = _je;
        __publicField(je, "moduleName", "sort");
        __publicField(je, "sorters", We);
        class Ge {
          constructor(e2, t2) {
            this.columnCount = e2, this.rowCount = t2, this.columnString = [], this.columns = [], this.rows = [];
          }
          genColumns(e2) {
            var t2 = Math.max(this.columnCount, Math.max(...e2.map((e3) => e3.length)));
            this.columnString = [], this.columns = [];
            for (let e3 = 1; e3 <= t2; e3++)
              this.incrementChar(this.columnString.length - 1), this.columns.push(this.columnString.join(""));
            return this.columns;
          }
          genRows(e2) {
            var t2 = Math.max(this.rowCount, e2.length);
            this.rows = [];
            for (let e3 = 1; e3 <= t2; e3++)
              this.rows.push(e3);
            return this.rows;
          }
          incrementChar(e2) {
            let t2 = this.columnString[e2];
            t2 ? "Z" !== t2 ? this.columnString[e2] = String.fromCharCode(this.columnString[e2].charCodeAt(0) + 1) : (this.columnString[e2] = "A", e2 ? this.incrementChar(e2 - 1) : this.columnString.push("A")) : this.columnString.push("A");
          }
          setRowCount(e2) {
            this.rowCount = e2;
          }
          setColumnCount(e2) {
            this.columnCount = e2;
          }
        }
        class Ue {
          constructor(e2) {
            return this._sheet = e2, new Proxy(this, { get: function(e3, t2, i2) {
              return void 0 !== e3[t2] ? e3[t2] : e3._sheet.table.componentFunctionBinder.handle("sheet", e3._sheet, t2);
            } });
          }
          getTitle() {
            return this._sheet.title;
          }
          getKey() {
            return this._sheet.key;
          }
          getDefinition() {
            return this._sheet.getDefinition();
          }
          getData() {
            return this._sheet.getData();
          }
          setData(e2) {
            return this._sheet.setData(e2);
          }
          clear() {
            return this._sheet.clear();
          }
          remove() {
            return this._sheet.remove();
          }
          active() {
            return this._sheet.active();
          }
          setTitle(e2) {
            return this._sheet.setTitle(e2);
          }
          setRows(e2) {
            return this._sheet.setRows(e2);
          }
          setColumns(e2) {
            return this._sheet.setColumns(e2);
          }
        }
        class Xe extends t {
          constructor(e2, t2) {
            super(e2.table), this.spreadsheetManager = e2, this.definition = t2, this.title = this.definition.title || "", this.key = this.definition.key || this.definition.title, this.rowCount = this.definition.rows, this.columnCount = this.definition.columns, this.data = this.definition.data || [], this.element = null, this.isActive = false, this.grid = new Ge(this.columnCount, this.rowCount), this.defaultColumnDefinition = { width: 100, headerHozAlign: "center", headerSort: false }, this.columnDefinition = Object.assign(this.defaultColumnDefinition, this.options("spreadsheetColumnDefinition")), this.columnDefs = [], this.rowDefs = [], this.columnFields = [], this.columns = [], this.rows = [], this.scrollTop = null, this.scrollLeft = null, this.initialize(), this.dispatchExternal("sheetAdded", this.getComponent());
          }
          initialize() {
            this.initializeElement(), this.initializeColumns(), this.initializeRows();
          }
          reinitialize() {
            this.initializeColumns(), this.initializeRows();
          }
          initializeElement() {
            this.element = document.createElement("div"), this.element.classList.add("tabulator-spreadsheet-tab"), this.element.innerText = this.title, this.element.addEventListener("click", () => {
              this.spreadsheetManager.loadSheet(this);
            });
          }
          initializeColumns() {
            this.grid.setColumnCount(this.columnCount), this.columnFields = this.grid.genColumns(this.data), this.columnDefs = [], this.columnFields.forEach((e2) => {
              var t2 = Object.assign({}, this.columnDefinition);
              t2.field = e2, t2.title = e2, this.columnDefs.push(t2);
            });
          }
          initializeRows() {
            var e2;
            this.grid.setRowCount(this.rowCount), e2 = this.grid.genRows(this.data), this.rowDefs = [], e2.forEach((e3, t2) => {
              var i2 = { _id: e3 }, s2 = this.data[t2];
              s2 && s2.forEach((e4, t3) => {
                var s3 = this.columnFields[t3];
                s3 && (i2[s3] = e4);
              }), this.rowDefs.push(i2);
            });
          }
          unload() {
            this.isActive = false, this.scrollTop = this.table.rowManager.scrollTop, this.scrollLeft = this.table.rowManager.scrollLeft, this.data = this.getData(true), this.element.classList.remove("tabulator-spreadsheet-tab-active");
          }
          load() {
            var e2 = !this.isActive;
            this.isActive = true, this.table.blockRedraw(), this.table.setData([]), this.table.setColumns(this.columnDefs), this.table.setData(this.rowDefs), this.table.restoreRedraw(), e2 && null !== this.scrollTop && (this.table.rowManager.element.scrollLeft = this.scrollLeft, this.table.rowManager.element.scrollTop = this.scrollTop), this.element.classList.add("tabulator-spreadsheet-tab-active"), this.dispatchExternal("sheetLoaded", this.getComponent());
          }
          getComponent() {
            return new Ue(this);
          }
          getDefinition() {
            return { title: this.title, key: this.key, rows: this.rowCount, columns: this.columnCount, data: this.getData() };
          }
          getData(e2) {
            var t2, i2, s2, o2 = [];
            return this.rowDefs.forEach((e3) => {
              var t3 = [];
              this.columnFields.forEach((i3) => {
                t3.push(e3[i3]);
              }), o2.push(t3);
            }), e2 || this.options("spreadsheetOutputFull") || (t2 = o2.map((e3) => e3.findLastIndex((e4) => void 0 !== e4) + 1), i2 = Math.max(...t2), s2 = t2.findLastIndex((e3) => e3 > 0) + 1, o2 = (o2 = o2.slice(0, s2)).map((e3) => e3.slice(0, i2))), o2;
          }
          setData(e2) {
            this.data = e2, this.reinitialize(), this.dispatchExternal("sheetUpdated", this.getComponent()), this.isActive && this.load();
          }
          clear() {
            this.setData([]);
          }
          setTitle(e2) {
            this.title = e2, this.element.innerText = e2, this.dispatchExternal("sheetUpdated", this.getComponent());
          }
          setRows(e2) {
            this.rowCount = e2, this.initializeRows(), this.dispatchExternal("sheetUpdated", this.getComponent()), this.isActive && this.load();
          }
          setColumns(e2) {
            this.columnCount = e2, this.reinitialize(), this.dispatchExternal("sheetUpdated", this.getComponent()), this.isActive && this.load();
          }
          remove() {
            this.spreadsheetManager.removeSheet(this);
          }
          destroy() {
            this.element.parentNode && this.element.parentNode.removeChild(this.element), this.dispatchExternal("sheetRemoved", this.getComponent());
          }
          active() {
            this.spreadsheetManager.loadSheet(this);
          }
        }
        var Je = { integer: function(e2, t2, i2) {
          return "" === t2 || null == t2 || (t2 = Number(t2), !isNaN(t2) && isFinite(t2) && Math.floor(t2) === t2);
        }, float: function(e2, t2, i2) {
          return "" === t2 || null == t2 || (t2 = Number(t2), !isNaN(t2) && isFinite(t2) && t2 % 1 != 0);
        }, numeric: function(e2, t2, i2) {
          return "" === t2 || null == t2 || !isNaN(t2);
        }, string: function(e2, t2, i2) {
          return "" === t2 || null == t2 || isNaN(t2);
        }, alphanumeric: function(e2, t2, i2) {
          return "" === t2 || null == t2 || new RegExp(/^[a-z0-9]+$/i).test(t2);
        }, max: function(e2, t2, i2) {
          return "" === t2 || null == t2 || parseFloat(t2) <= i2;
        }, min: function(e2, t2, i2) {
          return "" === t2 || null == t2 || parseFloat(t2) >= i2;
        }, starts: function(e2, t2, i2) {
          return "" === t2 || null == t2 || String(t2).toLowerCase().startsWith(String(i2).toLowerCase());
        }, ends: function(e2, t2, i2) {
          return "" === t2 || null == t2 || String(t2).toLowerCase().endsWith(String(i2).toLowerCase());
        }, minLength: function(e2, t2, i2) {
          return "" === t2 || null == t2 || String(t2).length >= i2;
        }, maxLength: function(e2, t2, i2) {
          return "" === t2 || null == t2 || String(t2).length <= i2;
        }, in: function(e2, t2, i2) {
          return "" === t2 || null == t2 || ("string" == typeof i2 && (i2 = i2.split("|")), i2.indexOf(t2) > -1);
        }, regex: function(e2, t2, i2) {
          return "" === t2 || null == t2 || new RegExp(i2).test(t2);
        }, unique: function(e2, t2, i2) {
          if ("" === t2 || null == t2)
            return true;
          var s2 = true, o2 = e2.getData(), n2 = e2.getColumn()._getSelf();
          return this.table.rowManager.rows.forEach(function(e3) {
            var i3 = e3.getData();
            i3 !== o2 && t2 == n2.getFieldValue(i3) && (s2 = false);
          }), s2;
        }, required: function(e2, t2, i2) {
          return "" !== t2 && null != t2;
        } };
        const _qe = class extends M {
          constructor(e2) {
            super(e2), this.invalidCells = [], this.registerTableOption("validationMode", "blocking"), this.registerColumnOption("validator"), this.registerTableFunction("getInvalidCells", this.getInvalidCells.bind(this)), this.registerTableFunction("clearCellValidation", this.userClearCellValidation.bind(this)), this.registerTableFunction("validate", this.userValidate.bind(this)), this.registerComponentFunction("cell", "isValid", this.cellIsValid.bind(this)), this.registerComponentFunction("cell", "clearValidation", this.clearValidation.bind(this)), this.registerComponentFunction("cell", "validate", this.cellValidate.bind(this)), this.registerComponentFunction("column", "validate", this.columnValidate.bind(this)), this.registerComponentFunction("row", "validate", this.rowValidate.bind(this));
          }
          initialize() {
            this.subscribe("cell-delete", this.clearValidation.bind(this)), this.subscribe("column-layout", this.initializeColumnCheck.bind(this)), this.subscribe("edit-success", this.editValidate.bind(this)), this.subscribe("edit-editor-clear", this.editorClear.bind(this)), this.subscribe("edit-edited-clear", this.editedClear.bind(this));
          }
          editValidate(e2, t2, i2) {
            var s2 = "manual" === this.table.options.validationMode || this.validate(e2.column.modules.validate, e2, t2);
            return true !== s2 && setTimeout(() => {
              e2.getElement().classList.add("tabulator-validation-fail"), this.dispatchExternal("validationFailed", e2.getComponent(), t2, s2);
            }), s2;
          }
          editorClear(e2, t2) {
            t2 && e2.column.modules.validate && this.cellValidate(e2), e2.getElement().classList.remove("tabulator-validation-fail");
          }
          editedClear(e2) {
            e2.modules.validate && (e2.modules.validate.invalid = false);
          }
          cellIsValid(e2) {
            return e2.modules.validate && e2.modules.validate.invalid || true;
          }
          cellValidate(e2) {
            return this.validate(e2.column.modules.validate, e2, e2.getValue());
          }
          columnValidate(e2) {
            var t2 = [];
            return e2.cells.forEach((e3) => {
              true !== this.cellValidate(e3) && t2.push(e3.getComponent());
            }), !t2.length || t2;
          }
          rowValidate(e2) {
            var t2 = [];
            return e2.cells.forEach((e3) => {
              true !== this.cellValidate(e3) && t2.push(e3.getComponent());
            }), !t2.length || t2;
          }
          userClearCellValidation(e2) {
            e2 || (e2 = this.getInvalidCells()), Array.isArray(e2) || (e2 = [e2]), e2.forEach((e3) => {
              this.clearValidation(e3._getSelf());
            });
          }
          userValidate(e2) {
            var t2 = [];
            return this.table.rowManager.rows.forEach((e3) => {
              var i2 = (e3 = e3.getComponent()).validate();
              true !== i2 && (t2 = t2.concat(i2));
            }), !t2.length || t2;
          }
          initializeColumnCheck(e2) {
            void 0 !== e2.definition.validator && this.initializeColumn(e2);
          }
          initializeColumn(e2) {
            var t2, i2 = this, s2 = [];
            e2.definition.validator && (Array.isArray(e2.definition.validator) ? e2.definition.validator.forEach((e3) => {
              (t2 = i2._extractValidator(e3)) && s2.push(t2);
            }) : (t2 = this._extractValidator(e2.definition.validator)) && s2.push(t2), e2.modules.validate = !!s2.length && s2);
          }
          _extractValidator(e2) {
            var t2, i2, s2;
            switch (typeof e2) {
              case "string":
                return (s2 = e2.indexOf(":")) > -1 ? (t2 = e2.substring(0, s2), i2 = e2.substring(s2 + 1)) : t2 = e2, this._buildValidator(t2, i2);
              case "function":
                return this._buildValidator(e2);
              case "object":
                return this._buildValidator(e2.type, e2.parameters);
            }
          }
          _buildValidator(e2, t2) {
            var i2 = "function" == typeof e2 ? e2 : _qe.validators[e2];
            return i2 ? { type: "function" == typeof e2 ? "function" : e2, func: i2, params: t2 } : (console.warn("Validator Setup Error - No matching validator found:", e2), false);
          }
          validate(e2, t2, i2) {
            var s2 = this, o2 = [], n2 = this.invalidCells.indexOf(t2);
            return e2 && e2.forEach((e3) => {
              e3.func.call(s2, t2.getComponent(), i2, e3.params) || o2.push({ type: e3.type, parameters: e3.params });
            }), t2.modules.validate || (t2.modules.validate = {}), o2.length ? (t2.modules.validate.invalid = o2, "manual" !== this.table.options.validationMode && t2.getElement().classList.add("tabulator-validation-fail"), -1 == n2 && this.invalidCells.push(t2)) : (t2.modules.validate.invalid = false, t2.getElement().classList.remove("tabulator-validation-fail"), n2 > -1 && this.invalidCells.splice(n2, 1)), !o2.length || o2;
          }
          getInvalidCells() {
            var e2 = [];
            return this.invalidCells.forEach((t2) => {
              e2.push(t2.getComponent());
            }), e2;
          }
          clearValidation(e2) {
            var t2;
            e2.modules.validate && e2.modules.validate.invalid && (e2.getElement().classList.remove("tabulator-validation-fail"), e2.modules.validate.invalid = false, (t2 = this.invalidCells.indexOf(e2)) > -1 && this.invalidCells.splice(t2, 1));
          }
        };
        let qe = _qe;
        __publicField(qe, "moduleName", "validate");
        __publicField(qe, "validators", Je);
        var Ke = Object.freeze({ __proto__: null, AccessorModule: B, AjaxModule: X, ClipboardModule: Y, ColumnCalcsModule: Z, DataTreeModule: (_b = class extends M {
          constructor(e2) {
            super(e2), this.indent = 10, this.field = "", this.collapseEl = null, this.expandEl = null, this.branchEl = null, this.elementField = false, this.startOpen = function() {
            }, this.registerTableOption("dataTree", false), this.registerTableOption("dataTreeFilter", true), this.registerTableOption("dataTreeSort", true), this.registerTableOption("dataTreeElementColumn", false), this.registerTableOption("dataTreeBranchElement", true), this.registerTableOption("dataTreeChildIndent", 9), this.registerTableOption("dataTreeChildField", "_children"), this.registerTableOption("dataTreeCollapseElement", false), this.registerTableOption("dataTreeExpandElement", false), this.registerTableOption("dataTreeStartExpanded", false), this.registerTableOption("dataTreeChildColumnCalcs", false), this.registerTableOption("dataTreeSelectPropagate", false), this.registerComponentFunction("row", "treeCollapse", this.collapseRow.bind(this)), this.registerComponentFunction("row", "treeExpand", this.expandRow.bind(this)), this.registerComponentFunction("row", "treeToggle", this.toggleRow.bind(this)), this.registerComponentFunction("row", "getTreeParent", this.getTreeParent.bind(this)), this.registerComponentFunction("row", "getTreeChildren", this.getRowChildren.bind(this)), this.registerComponentFunction("row", "addTreeChild", this.addTreeChildRow.bind(this)), this.registerComponentFunction("row", "isTreeExpanded", this.isRowExpanded.bind(this));
          }
          initialize() {
            if (this.table.options.dataTree) {
              var e2 = null, t2 = this.table.options;
              switch (this.field = t2.dataTreeChildField, this.indent = t2.dataTreeChildIndent, this.options("movableRows") && console.warn("The movableRows option is not available with dataTree enabled, moving of child rows could result in unpredictable behavior"), t2.dataTreeBranchElement ? true === t2.dataTreeBranchElement ? (this.branchEl = document.createElement("div"), this.branchEl.classList.add("tabulator-data-tree-branch")) : "string" == typeof t2.dataTreeBranchElement ? ((e2 = document.createElement("div")).innerHTML = t2.dataTreeBranchElement, this.branchEl = e2.firstChild) : this.branchEl = t2.dataTreeBranchElement : (this.branchEl = document.createElement("div"), this.branchEl.classList.add("tabulator-data-tree-branch-empty")), t2.dataTreeCollapseElement ? "string" == typeof t2.dataTreeCollapseElement ? ((e2 = document.createElement("div")).innerHTML = t2.dataTreeCollapseElement, this.collapseEl = e2.firstChild) : this.collapseEl = t2.dataTreeCollapseElement : (this.collapseEl = document.createElement("div"), this.collapseEl.classList.add("tabulator-data-tree-control"), this.collapseEl.tabIndex = 0, this.collapseEl.innerHTML = "<div class='tabulator-data-tree-control-collapse'></div>"), t2.dataTreeExpandElement ? "string" == typeof t2.dataTreeExpandElement ? ((e2 = document.createElement("div")).innerHTML = t2.dataTreeExpandElement, this.expandEl = e2.firstChild) : this.expandEl = t2.dataTreeExpandElement : (this.expandEl = document.createElement("div"), this.expandEl.classList.add("tabulator-data-tree-control"), this.expandEl.tabIndex = 0, this.expandEl.innerHTML = "<div class='tabulator-data-tree-control-expand'></div>"), typeof t2.dataTreeStartExpanded) {
                case "boolean":
                  this.startOpen = function(e3, i2) {
                    return t2.dataTreeStartExpanded;
                  };
                  break;
                case "function":
                  this.startOpen = t2.dataTreeStartExpanded;
                  break;
                default:
                  this.startOpen = function(e3, i2) {
                    return t2.dataTreeStartExpanded[i2];
                  };
              }
              this.subscribe("row-init", this.initializeRow.bind(this)), this.subscribe("row-layout-after", this.layoutRow.bind(this)), this.subscribe("row-deleted", this.rowDelete.bind(this), 0), this.subscribe("row-data-changed", this.rowDataChanged.bind(this), 10), this.subscribe("cell-value-updated", this.cellValueChanged.bind(this)), this.subscribe("edit-cancelled", this.cellValueChanged.bind(this)), this.subscribe("column-moving-rows", this.columnMoving.bind(this)), this.subscribe("table-built", this.initializeElementField.bind(this)), this.subscribe("table-redrawing", this.tableRedrawing.bind(this)), this.registerDisplayHandler(this.getRows.bind(this), 30);
            }
          }
          tableRedrawing(e2) {
            e2 && this.table.rowManager.getRows().forEach((e3) => {
              this.reinitializeRowChildren(e3);
            });
          }
          initializeElementField() {
            var e2 = this.table.columnManager.getFirstVisibleColumn();
            this.elementField = this.table.options.dataTreeElementColumn || !!e2 && e2.field;
          }
          getRowChildren(e2) {
            return this.getTreeChildren(e2, true);
          }
          columnMoving() {
            var e2 = [];
            return this.table.rowManager.rows.forEach((t2) => {
              e2 = e2.concat(this.getTreeChildren(t2, false, true));
            }), e2;
          }
          rowDataChanged(e2, t2, i2) {
            this.redrawNeeded(i2) && (this.initializeRow(e2), t2 && (this.layoutRow(e2), this.refreshData(true)));
          }
          cellValueChanged(e2) {
            e2.column.getField() === this.elementField && this.layoutRow(e2.row);
          }
          initializeRow(e2) {
            var t2 = e2.getData()[this.field], i2 = Array.isArray(t2), s2 = i2 || !i2 && "object" == typeof t2 && null !== t2;
            !s2 && e2.modules.dataTree && e2.modules.dataTree.branchEl && e2.modules.dataTree.branchEl.parentNode.removeChild(e2.modules.dataTree.branchEl), !s2 && e2.modules.dataTree && e2.modules.dataTree.controlEl && e2.modules.dataTree.controlEl.parentNode.removeChild(e2.modules.dataTree.controlEl), e2.modules.dataTree = { index: e2.modules.dataTree ? e2.modules.dataTree.index : 0, open: !!s2 && (e2.modules.dataTree ? e2.modules.dataTree.open : this.startOpen(e2.getComponent(), 0)), controlEl: !(!e2.modules.dataTree || !s2) && e2.modules.dataTree.controlEl, branchEl: !(!e2.modules.dataTree || !s2) && e2.modules.dataTree.branchEl, parent: !!e2.modules.dataTree && e2.modules.dataTree.parent, children: s2 };
          }
          reinitializeRowChildren(e2) {
            this.getTreeChildren(e2, false, true).forEach(function(e3) {
              e3.reinitialize(true);
            });
          }
          layoutRow(e2) {
            var t2 = (this.elementField ? e2.getCell(this.elementField) : e2.getCells()[0]).getElement(), i2 = e2.modules.dataTree;
            i2.branchEl && (i2.branchEl.parentNode && i2.branchEl.parentNode.removeChild(i2.branchEl), i2.branchEl = false), i2.controlEl && (i2.controlEl.parentNode && i2.controlEl.parentNode.removeChild(i2.controlEl), i2.controlEl = false), this.generateControlElement(e2, t2), e2.getElement().classList.add("tabulator-tree-level-" + i2.index), i2.index && (this.branchEl ? (i2.branchEl = this.branchEl.cloneNode(true), t2.insertBefore(i2.branchEl, t2.firstChild), this.table.rtl ? i2.branchEl.style.marginRight = (i2.branchEl.offsetWidth + i2.branchEl.style.marginLeft) * (i2.index - 1) + i2.index * this.indent + "px" : i2.branchEl.style.marginLeft = (i2.branchEl.offsetWidth + i2.branchEl.style.marginRight) * (i2.index - 1) + i2.index * this.indent + "px") : this.table.rtl ? t2.style.paddingRight = parseInt(window.getComputedStyle(t2, null).getPropertyValue("padding-right")) + i2.index * this.indent + "px" : t2.style.paddingLeft = parseInt(window.getComputedStyle(t2, null).getPropertyValue("padding-left")) + i2.index * this.indent + "px");
          }
          generateControlElement(e2, t2) {
            var i2 = e2.modules.dataTree, s2 = i2.controlEl;
            t2 = t2 || e2.getCells()[0].getElement(), false !== i2.children && (i2.open ? (i2.controlEl = this.collapseEl.cloneNode(true), i2.controlEl.addEventListener("click", (t3) => {
              t3.stopPropagation(), this.collapseRow(e2);
            })) : (i2.controlEl = this.expandEl.cloneNode(true), i2.controlEl.addEventListener("click", (t3) => {
              t3.stopPropagation(), this.expandRow(e2);
            })), i2.controlEl.addEventListener("mousedown", (e3) => {
              e3.stopPropagation();
            }), s2 && s2.parentNode === t2 ? s2.parentNode.replaceChild(i2.controlEl, s2) : t2.insertBefore(i2.controlEl, t2.firstChild));
          }
          getRows(e2) {
            var t2 = [];
            return e2.forEach((e3, i2) => {
              var s2;
              t2.push(e3), e3 instanceof p && (e3.create(), (s2 = e3.modules.dataTree).index || false === s2.children || this.getChildren(e3, false, true).forEach((e4) => {
                e4.create(), t2.push(e4);
              }));
            }), t2;
          }
          getChildren(e2, t2, i2) {
            var s2 = e2.modules.dataTree, o2 = [], n2 = [];
            return false !== s2.children && (s2.open || t2) && (Array.isArray(s2.children) || (s2.children = this.generateChildren(e2)), o2 = this.table.modExists("filter") && this.table.options.dataTreeFilter ? this.table.modules.filter.filter(s2.children) : s2.children, this.table.modExists("sort") && this.table.options.dataTreeSort && this.table.modules.sort.sort(o2, i2), o2.forEach((e3) => {
              n2.push(e3), this.getChildren(e3, false, true).forEach((e4) => {
                n2.push(e4);
              });
            })), n2;
          }
          generateChildren(e2) {
            var t2 = [], i2 = e2.getData()[this.field];
            return Array.isArray(i2) || (i2 = [i2]), i2.forEach((i3) => {
              var s2 = new p(i3 || {}, this.table.rowManager);
              s2.create(), s2.modules.dataTree.index = e2.modules.dataTree.index + 1, s2.modules.dataTree.parent = e2, s2.modules.dataTree.children && (s2.modules.dataTree.open = this.startOpen(s2.getComponent(), s2.modules.dataTree.index)), t2.push(s2);
            }), t2;
          }
          expandRow(e2, t2) {
            var i2 = e2.modules.dataTree;
            false !== i2.children && (i2.open = true, e2.reinitialize(), this.refreshData(true), this.dispatchExternal("dataTreeRowExpanded", e2.getComponent(), e2.modules.dataTree.index));
          }
          collapseRow(e2) {
            var t2 = e2.modules.dataTree;
            false !== t2.children && (t2.open = false, e2.reinitialize(), this.refreshData(true), this.dispatchExternal("dataTreeRowCollapsed", e2.getComponent(), e2.modules.dataTree.index));
          }
          toggleRow(e2) {
            var t2 = e2.modules.dataTree;
            false !== t2.children && (t2.open ? this.collapseRow(e2) : this.expandRow(e2));
          }
          isRowExpanded(e2) {
            return e2.modules.dataTree.open;
          }
          getTreeParent(e2) {
            return !!e2.modules.dataTree.parent && e2.modules.dataTree.parent.getComponent();
          }
          getTreeParentRoot(e2) {
            return e2.modules.dataTree && e2.modules.dataTree.parent ? this.getTreeParentRoot(e2.modules.dataTree.parent) : e2;
          }
          getFilteredTreeChildren(e2) {
            var t2 = e2.modules.dataTree, i2 = [];
            return t2.children && (Array.isArray(t2.children) || (t2.children = this.generateChildren(e2)), (this.table.modExists("filter") && this.table.options.dataTreeFilter ? this.table.modules.filter.filter(t2.children) : t2.children).forEach((e3) => {
              e3 instanceof p && i2.push(e3);
            })), i2;
          }
          rowDelete(e2) {
            var t2, i2 = e2.modules.dataTree.parent;
            i2 && (false !== (t2 = this.findChildIndex(e2, i2)) && i2.data[this.field].splice(t2, 1), i2.data[this.field].length || delete i2.data[this.field], this.initializeRow(i2), this.layoutRow(i2)), this.refreshData(true);
          }
          addTreeChildRow(e2, t2, i2, s2) {
            var o2 = false;
            "string" == typeof t2 && (t2 = JSON.parse(t2)), Array.isArray(e2.data[this.field]) || (e2.data[this.field] = [], e2.modules.dataTree.open = this.startOpen(e2.getComponent(), e2.modules.dataTree.index)), void 0 !== s2 && false !== (o2 = this.findChildIndex(s2, e2)) && e2.data[this.field].splice(i2 ? o2 : o2 + 1, 0, t2), false === o2 && (i2 ? e2.data[this.field].unshift(t2) : e2.data[this.field].push(t2)), this.initializeRow(e2), this.layoutRow(e2), this.refreshData(true);
          }
          findChildIndex(e2, t2) {
            var i2 = false;
            return "object" == typeof e2 ? e2 instanceof p ? i2 = e2.data : e2 instanceof m ? i2 = e2._getSelf().data : "undefined" != typeof HTMLElement && e2 instanceof HTMLElement ? t2.modules.dataTree && (i2 = t2.modules.dataTree.children.find((t3) => t3 instanceof p && t3.element === e2)) && (i2 = i2.data) : null === e2 && (i2 = false) : i2 = void 0 !== e2 && t2.data[this.field].find((t3) => t3.data[this.table.options.index] == e2), i2 && (Array.isArray(t2.data[this.field]) && (i2 = t2.data[this.field].indexOf(i2)), -1 == i2 && (i2 = false)), i2;
          }
          getTreeChildren(e2, t2, i2) {
            var s2 = e2.modules.dataTree, o2 = [];
            return s2 && s2.children && (Array.isArray(s2.children) || (s2.children = this.generateChildren(e2)), s2.children.forEach((e3) => {
              e3 instanceof p && (o2.push(t2 ? e3.getComponent() : e3), i2 && this.getTreeChildren(e3, t2, i2).forEach((e4) => {
                o2.push(e4);
              }));
            })), o2;
          }
          getChildField() {
            return this.field;
          }
          redrawNeeded(e2) {
            return !!this.field && void 0 !== e2[this.field] || !!this.elementField && void 0 !== e2[this.elementField];
          }
        }, __publicField(_b, "moduleName", "dataTree"), _b), DownloadModule: te, EditModule: ne, ExportModule: de, FilterModule: ue, FormatModule: pe, FrozenColumnsModule: (_c = class extends M {
          constructor(e2) {
            super(e2), this.leftColumns = [], this.rightColumns = [], this.initializationMode = "left", this.active = false, this.blocked = true, this.registerColumnOption("frozen");
          }
          reset() {
            this.initializationMode = "left", this.leftColumns = [], this.rightColumns = [], this.active = false;
          }
          initialize() {
            this.subscribe("cell-layout", this.layoutCell.bind(this)), this.subscribe("column-init", this.initializeColumn.bind(this)), this.subscribe("column-width", this.layout.bind(this)), this.subscribe("row-layout-after", this.layoutRow.bind(this)), this.subscribe("table-layout", this.layout.bind(this)), this.subscribe("columns-loading", this.reset.bind(this)), this.subscribe("column-add", this.reinitializeColumns.bind(this)), this.subscribe("column-deleted", this.reinitializeColumns.bind(this)), this.subscribe("column-hide", this.reinitializeColumns.bind(this)), this.subscribe("column-show", this.reinitializeColumns.bind(this)), this.subscribe("columns-loaded", this.reinitializeColumns.bind(this)), this.subscribe("table-redraw", this.layout.bind(this)), this.subscribe("layout-refreshing", this.blockLayout.bind(this)), this.subscribe("layout-refreshed", this.unblockLayout.bind(this)), this.subscribe("scrollbar-vertical", this.adjustForScrollbar.bind(this));
          }
          blockLayout() {
            this.blocked = true;
          }
          unblockLayout() {
            this.blocked = false;
          }
          layoutCell(e2) {
            this.layoutElement(e2.element, e2.column);
          }
          reinitializeColumns() {
            this.reset(), this.table.columnManager.columnsByIndex.forEach((e2) => {
              this.initializeColumn(e2);
            }), this.layout();
          }
          initializeColumn(e2) {
            var t2 = { margin: 0, edge: false };
            e2.isGroup || (this.frozenCheck(e2) ? (t2.position = this.initializationMode, "left" == this.initializationMode ? this.leftColumns.push(e2) : this.rightColumns.unshift(e2), this.active = true, e2.modules.frozen = t2) : this.initializationMode = "right");
          }
          frozenCheck(e2) {
            return e2.parent.isGroup && e2.definition.frozen && console.warn("Frozen Column Error - Parent column group must be frozen, not individual columns or sub column groups"), e2.parent.isGroup ? this.frozenCheck(e2.parent) : e2.definition.frozen;
          }
          layoutCalcRows() {
            this.table.modExists("columnCalcs") && (this.table.modules.columnCalcs.topInitialized && this.table.modules.columnCalcs.topRow && this.layoutRow(this.table.modules.columnCalcs.topRow), this.table.modules.columnCalcs.botInitialized && this.table.modules.columnCalcs.botRow && this.layoutRow(this.table.modules.columnCalcs.botRow), this.table.modExists("groupRows") && this.layoutGroupCalcs(this.table.modules.groupRows.getGroups()));
          }
          layoutGroupCalcs(e2) {
            e2.forEach((e3) => {
              e3.calcs.top && this.layoutRow(e3.calcs.top), e3.calcs.bottom && this.layoutRow(e3.calcs.bottom), e3.groupList && e3.groupList.length && this.layoutGroupCalcs(e3.groupList);
            });
          }
          layoutColumnPosition(e2) {
            var t2 = [], i2 = 0, s2 = 0;
            this.leftColumns.forEach((s3, o2) => {
              if (s3.modules.frozen.marginValue = i2, s3.modules.frozen.margin = s3.modules.frozen.marginValue + "px", s3.visible && (i2 += s3.getWidth()), o2 == this.leftColumns.length - 1 ? s3.modules.frozen.edge = true : s3.modules.frozen.edge = false, s3.parent.isGroup) {
                var n2 = this.getColGroupParentElement(s3);
                t2.includes(n2) || (this.layoutElement(n2, s3), t2.push(n2)), n2.classList.toggle("tabulator-frozen-left", s3.modules.frozen.edge && "left" === s3.modules.frozen.position), n2.classList.toggle("tabulator-frozen-right", s3.modules.frozen.edge && "right" === s3.modules.frozen.position);
              } else
                this.layoutElement(s3.getElement(), s3);
              e2 && s3.cells.forEach((e3) => {
                this.layoutElement(e3.getElement(true), s3);
              });
            }), this.rightColumns.forEach((t3, i3) => {
              t3.modules.frozen.marginValue = s2, t3.modules.frozen.margin = t3.modules.frozen.marginValue + "px", t3.visible && (s2 += t3.getWidth()), i3 == this.rightColumns.length - 1 ? t3.modules.frozen.edge = true : t3.modules.frozen.edge = false, t3.parent.isGroup ? this.layoutElement(this.getColGroupParentElement(t3), t3) : this.layoutElement(t3.getElement(), t3), e2 && t3.cells.forEach((e3) => {
                this.layoutElement(e3.getElement(true), t3);
              });
            });
          }
          getColGroupParentElement(e2) {
            return e2.parent.isGroup ? this.getColGroupParentElement(e2.parent) : e2.getElement();
          }
          layout() {
            this.active && !this.blocked && (this.layoutColumnPosition(), this.reinitializeRows(), this.layoutCalcRows());
          }
          reinitializeRows() {
            var e2 = this.table.rowManager.getVisibleRows(true);
            this.table.rowManager.getRows().filter((t2) => !e2.includes(t2)).forEach((e3) => {
              e3.deinitialize();
            }), e2.forEach((e3) => {
              "row" === e3.type && this.layoutRow(e3);
            });
          }
          layoutRow(e2) {
            "fitDataFill" === this.table.options.layout && this.rightColumns.length && (this.table.rowManager.getTableElement().style.minWidth = "calc(100% - " + this.rightMargin + ")"), this.leftColumns.forEach((t2) => {
              var i2 = e2.getCell(t2);
              i2 && this.layoutElement(i2.getElement(true), t2);
            }), this.rightColumns.forEach((t2) => {
              var i2 = e2.getCell(t2);
              i2 && this.layoutElement(i2.getElement(true), t2);
            });
          }
          layoutElement(e2, t2) {
            var i2;
            t2.modules.frozen && e2 && (e2.style.position = "sticky", i2 = this.table.rtl ? "left" === t2.modules.frozen.position ? "right" : "left" : t2.modules.frozen.position, e2.style[i2] = t2.modules.frozen.margin, e2.classList.add("tabulator-frozen"), e2.classList.toggle("tabulator-frozen-left", t2.modules.frozen.edge && "left" === t2.modules.frozen.position), e2.classList.toggle("tabulator-frozen-right", t2.modules.frozen.edge && "right" === t2.modules.frozen.position));
          }
          adjustForScrollbar(e2) {
            this.rightColumns.length && (this.table.columnManager.getContentsElement().style.width = "calc(100% - " + e2 + "px)");
          }
          getFrozenColumns() {
            return this.leftColumns.concat(this.rightColumns);
          }
          _calcSpace(e2, t2) {
            var i2 = 0;
            for (let s2 = 0; s2 < t2; s2++)
              e2[s2].visible && (i2 += e2[s2].getWidth());
            return i2;
          }
        }, __publicField(_c, "moduleName", "frozenColumns"), _c), FrozenRowsModule: (_d = class extends M {
          constructor(e2) {
            super(e2), this.topElement = document.createElement("div"), this.rows = [], this.registerComponentFunction("row", "freeze", this.freezeRow.bind(this)), this.registerComponentFunction("row", "unfreeze", this.unfreezeRow.bind(this)), this.registerComponentFunction("row", "isFrozen", this.isRowFrozen.bind(this)), this.registerTableOption("frozenRowsField", "id"), this.registerTableOption("frozenRows", false);
          }
          initialize() {
            var e2 = document.createDocumentFragment();
            this.rows = [], this.topElement.classList.add("tabulator-frozen-rows-holder"), e2.appendChild(document.createElement("br")), e2.appendChild(this.topElement), this.table.columnManager.getContentsElement().insertBefore(e2, this.table.columnManager.headersElement.nextSibling), this.subscribe("row-deleting", this.detachRow.bind(this)), this.subscribe("rows-visible", this.visibleRows.bind(this)), this.registerDisplayHandler(this.getRows.bind(this), 10), this.table.options.frozenRows && (this.subscribe("data-processed", this.initializeRows.bind(this)), this.subscribe("row-added", this.initializeRow.bind(this)), this.subscribe("table-redrawing", this.resizeHolderWidth.bind(this)), this.subscribe("column-resized", this.resizeHolderWidth.bind(this)), this.subscribe("column-show", this.resizeHolderWidth.bind(this)), this.subscribe("column-hide", this.resizeHolderWidth.bind(this))), this.resizeHolderWidth();
          }
          resizeHolderWidth() {
            this.topElement.style.minWidth = this.table.columnManager.headersElement.offsetWidth + "px";
          }
          initializeRows() {
            this.table.rowManager.getRows().forEach((e2) => {
              this.initializeRow(e2);
            });
          }
          initializeRow(e2) {
            var t2 = this.table.options.frozenRows, i2 = typeof t2;
            "number" === i2 ? e2.getPosition() && e2.getPosition() + this.rows.length <= t2 && this.freezeRow(e2) : "function" === i2 ? t2.call(this.table, e2.getComponent()) && this.freezeRow(e2) : Array.isArray(t2) && t2.includes(e2.data[this.options("frozenRowsField")]) && this.freezeRow(e2);
          }
          isRowFrozen(e2) {
            return this.rows.indexOf(e2) > -1;
          }
          isFrozen() {
            return !!this.rows.length;
          }
          visibleRows(e2, t2) {
            return this.rows.forEach((e3) => {
              t2.push(e3);
            }), t2;
          }
          getRows(e2) {
            var t2 = e2.slice(0);
            return this.rows.forEach(function(e3) {
              var i2 = t2.indexOf(e3);
              i2 > -1 && t2.splice(i2, 1);
            }), t2;
          }
          freezeRow(e2) {
            e2.modules.frozen ? console.warn("Freeze Error - Row is already frozen") : (e2.modules.frozen = true, this.topElement.appendChild(e2.getElement()), e2.initialize(), e2.normalizeHeight(), this.rows.push(e2), this.refreshData(false, "display"), this.table.rowManager.adjustTableSize(), this.styleRows());
          }
          unfreezeRow(e2) {
            e2.modules.frozen ? (e2.modules.frozen = false, this.detachRow(e2), this.table.rowManager.adjustTableSize(), this.refreshData(false, "display"), this.rows.length && this.styleRows()) : console.warn("Freeze Error - Row is already unfrozen");
          }
          detachRow(e2) {
            var t2 = this.rows.indexOf(e2);
            if (t2 > -1) {
              var i2 = e2.getElement();
              i2.parentNode && i2.parentNode.removeChild(i2), this.rows.splice(t2, 1);
            }
          }
          styleRows(e2) {
            this.rows.forEach((e3, t2) => {
              this.table.rowManager.styleRow(e3, t2);
            });
          }
        }, __publicField(_d, "moduleName", "frozenRows"), _d), GroupRowsModule: (_e2 = class extends M {
          constructor(e2) {
            super(e2), this.groupIDLookups = false, this.startOpen = [function() {
              return false;
            }], this.headerGenerator = [function() {
              return "";
            }], this.groupList = [], this.allowedValues = false, this.groups = {}, this.displayHandler = this.getRows.bind(this), this.blockRedraw = false, this.registerTableOption("groupBy", false), this.registerTableOption("groupStartOpen", true), this.registerTableOption("groupValues", false), this.registerTableOption("groupUpdateOnCellEdit", false), this.registerTableOption("groupHeader", false), this.registerTableOption("groupHeaderPrint", null), this.registerTableOption("groupHeaderClipboard", null), this.registerTableOption("groupHeaderHtmlOutput", null), this.registerTableOption("groupHeaderDownload", null), this.registerTableOption("groupToggleElement", "arrow"), this.registerTableOption("groupClosedShowCalcs", false), this.registerTableFunction("setGroupBy", this.setGroupBy.bind(this)), this.registerTableFunction("setGroupValues", this.setGroupValues.bind(this)), this.registerTableFunction("setGroupStartOpen", this.setGroupStartOpen.bind(this)), this.registerTableFunction("setGroupHeader", this.setGroupHeader.bind(this)), this.registerTableFunction("getGroups", this.userGetGroups.bind(this)), this.registerTableFunction("getGroupedData", this.userGetGroupedData.bind(this)), this.registerComponentFunction("row", "getGroup", this.rowGetGroup.bind(this));
          }
          initialize() {
            this.subscribe("table-destroy", this._blockRedrawing.bind(this)), this.subscribe("rows-wipe", this._blockRedrawing.bind(this)), this.subscribe("rows-wiped", this._restore_redrawing.bind(this)), this.table.options.groupBy && (this.table.options.groupUpdateOnCellEdit && (this.subscribe("cell-value-updated", this.cellUpdated.bind(this)), this.subscribe("row-data-changed", this.reassignRowToGroup.bind(this), 0)), this.subscribe("table-built", this.configureGroupSetup.bind(this)), this.subscribe("row-deleting", this.rowDeleting.bind(this)), this.subscribe("row-deleted", this.rowsUpdated.bind(this)), this.subscribe("scroll-horizontal", this.scrollHeaders.bind(this)), this.subscribe("rows-wipe", this.wipe.bind(this)), this.subscribe("rows-added", this.rowsUpdated.bind(this)), this.subscribe("row-moving", this.rowMoving.bind(this)), this.subscribe("row-adding-index", this.rowAddingIndex.bind(this)), this.subscribe("rows-sample", this.rowSample.bind(this)), this.subscribe("render-virtual-fill", this.virtualRenderFill.bind(this)), this.registerDisplayHandler(this.displayHandler, 20), this.initialized = true);
          }
          _blockRedrawing() {
            this.blockRedraw = true;
          }
          _restore_redrawing() {
            this.blockRedraw = false;
          }
          configureGroupSetup() {
            if (this.table.options.groupBy) {
              var e2 = this.table.options.groupBy, t2 = this.table.options.groupStartOpen, i2 = this.table.options.groupHeader;
              if (this.allowedValues = this.table.options.groupValues, Array.isArray(e2) && Array.isArray(i2) && e2.length > i2.length && console.warn("Error creating group headers, groupHeader array is shorter than groupBy array"), this.headerGenerator = [function() {
                return "";
              }], this.startOpen = [function() {
                return false;
              }], this.langBind("groups|item", (e3, t3) => {
                this.headerGenerator[0] = (i3, s2, o2) => (void 0 === i3 ? "" : i3) + "<span>(" + s2 + " " + (1 === s2 ? e3 : t3.groups.items) + ")</span>";
              }), this.groupIDLookups = [], e2)
                this.table.modExists("columnCalcs") && "table" != this.table.options.columnCalcs && "both" != this.table.options.columnCalcs && this.table.modules.columnCalcs.removeCalcs();
              else if (this.table.modExists("columnCalcs") && "group" != this.table.options.columnCalcs)
                this.table.columnManager.getRealColumns().forEach((e3) => {
                  e3.definition.topCalc && this.table.modules.columnCalcs.initializeTopRow(), e3.definition.bottomCalc && this.table.modules.columnCalcs.initializeBottomRow();
                });
              Array.isArray(e2) || (e2 = [e2]), e2.forEach((e3, t3) => {
                var i3, s2;
                i3 = "function" == typeof e3 ? e3 : (s2 = this.table.columnManager.getColumnByField(e3)) ? function(e4) {
                  return s2.getFieldValue(e4);
                } : function(t4) {
                  return t4[e3];
                }, this.groupIDLookups.push({ field: "function" != typeof e3 && e3, func: i3, values: !!this.allowedValues && this.allowedValues[t3] });
              }), t2 && (Array.isArray(t2) || (t2 = [t2]), t2.forEach((e3) => {
              }), this.startOpen = t2), i2 && (this.headerGenerator = Array.isArray(i2) ? i2 : [i2]);
            } else
              this.groupList = [], this.groups = {};
          }
          rowSample(e2, t2) {
            if (this.table.options.groupBy) {
              var i2 = this.getGroups(false)[0];
              t2.push(i2.getRows(false)[0]);
            }
            return t2;
          }
          virtualRenderFill() {
            var e2 = this.table.rowManager.tableElement, t2 = this.table.rowManager.getVisibleRows();
            if (!this.table.options.groupBy)
              return t2;
            t2 = t2.filter((e3) => "group" !== e3.type), e2.style.minWidth = t2.length ? "" : this.table.columnManager.getWidth() + "px";
          }
          rowAddingIndex(e2, t2, i2) {
            if (this.table.options.groupBy) {
              this.assignRowToGroup(e2);
              var s2 = e2.modules.group.rows;
              return s2.length > 1 && (!t2 || t2 && -1 == s2.indexOf(t2) ? i2 ? s2[0] !== e2 && (t2 = s2[0], this.table.rowManager.moveRowInArray(e2.modules.group.rows, e2, t2, !i2)) : s2[s2.length - 1] !== e2 && (t2 = s2[s2.length - 1], this.table.rowManager.moveRowInArray(e2.modules.group.rows, e2, t2, !i2)) : this.table.rowManager.moveRowInArray(e2.modules.group.rows, e2, t2, !i2)), t2;
            }
          }
          trackChanges() {
            this.dispatch("group-changed");
          }
          setGroupBy(e2) {
            this.table.options.groupBy = e2, this.initialized || this.initialize(), this.configureGroupSetup(), !e2 && this.table.modExists("columnCalcs") && true === this.table.options.columnCalcs && this.table.modules.columnCalcs.reinitializeCalcs(), this.refreshData(), this.trackChanges();
          }
          setGroupValues(e2) {
            this.table.options.groupValues = e2, this.configureGroupSetup(), this.refreshData(), this.trackChanges();
          }
          setGroupStartOpen(e2) {
            this.table.options.groupStartOpen = e2, this.configureGroupSetup(), this.table.options.groupBy ? (this.refreshData(), this.trackChanges()) : console.warn("Grouping Update - cant refresh view, no groups have been set");
          }
          setGroupHeader(e2) {
            this.table.options.groupHeader = e2, this.configureGroupSetup(), this.table.options.groupBy ? (this.refreshData(), this.trackChanges()) : console.warn("Grouping Update - cant refresh view, no groups have been set");
          }
          userGetGroups(e2) {
            return this.getGroups(true);
          }
          userGetGroupedData() {
            return this.table.options.groupBy ? this.getGroupedData() : this.getData();
          }
          rowGetGroup(e2) {
            return !!e2.modules.group && e2.modules.group.getComponent();
          }
          rowMoving(e2, t2, i2) {
            if (this.table.options.groupBy) {
              !i2 && t2 instanceof be && (t2 = this.table.rowManager.prevDisplayRow(e2) || t2);
              var s2 = t2 instanceof be ? t2 : t2.modules.group, o2 = e2 instanceof be ? e2 : e2.modules.group;
              s2 === o2 ? this.table.rowManager.moveRowInArray(s2.rows, e2, t2, i2) : (o2 && o2.removeRow(e2), s2.insertRow(e2, t2, i2));
            }
          }
          rowDeleting(e2) {
            this.table.options.groupBy && e2.modules.group && e2.modules.group.removeRow(e2);
          }
          rowsUpdated(e2) {
            this.table.options.groupBy && this.updateGroupRows(true);
          }
          cellUpdated(e2) {
            this.table.options.groupBy && this.reassignRowToGroup(e2.row);
          }
          getRows(e2) {
            return this.table.options.groupBy && this.groupIDLookups.length ? (this.dispatchExternal("dataGrouping"), this.generateGroups(e2), this.subscribedExternal("dataGrouped") && this.dispatchExternal("dataGrouped", this.getGroups(true)), this.updateGroupRows()) : e2.slice(0);
          }
          getGroups(e2) {
            var t2 = [];
            return this.groupList.forEach(function(i2) {
              t2.push(e2 ? i2.getComponent() : i2);
            }), t2;
          }
          getChildGroups(e2) {
            var t2 = [];
            return e2 || (e2 = this), e2.groupList.forEach((e3) => {
              e3.groupList.length ? t2 = t2.concat(this.getChildGroups(e3)) : t2.push(e3);
            }), t2;
          }
          wipe() {
            this.table.options.groupBy && (this.groupList.forEach(function(e2) {
              e2.wipe();
            }), this.groupList = [], this.groups = {});
          }
          pullGroupListData(e2) {
            var t2 = [];
            return e2.forEach((e3) => {
              var i2 = { level: 0, rowCount: 0, headerContent: "" }, s2 = [];
              e3.hasSubGroups ? (s2 = this.pullGroupListData(e3.groupList), i2.level = e3.level, i2.rowCount = s2.length - e3.groupList.length, i2.headerContent = e3.generator(e3.key, i2.rowCount, e3.rows, e3), t2.push(i2), t2 = t2.concat(s2)) : (i2.level = e3.level, i2.headerContent = e3.generator(e3.key, e3.rows.length, e3.rows, e3), i2.rowCount = e3.getRows().length, t2.push(i2), e3.getRows().forEach((e4) => {
                t2.push(e4.getData("data"));
              }));
            }), t2;
          }
          getGroupedData() {
            return this.pullGroupListData(this.groupList);
          }
          getRowGroup(e2) {
            var t2 = false;
            return this.options("dataTree") && (e2 = this.table.modules.dataTree.getTreeParentRoot(e2)), this.groupList.forEach((i2) => {
              var s2 = i2.getRowGroup(e2);
              s2 && (t2 = s2);
            }), t2;
          }
          countGroups() {
            return this.groupList.length;
          }
          generateGroups(e2) {
            var t2 = this.groups;
            this.groups = {}, this.groupList = [], this.allowedValues && this.allowedValues[0] ? (this.allowedValues[0].forEach((e3) => {
              this.createGroup(e3, 0, t2);
            }), e2.forEach((e3) => {
              this.assignRowToExistingGroup(e3, t2);
            })) : e2.forEach((e3) => {
              this.assignRowToGroup(e3, t2);
            }), Object.values(t2).forEach((e3) => {
              e3.wipe(true);
            });
          }
          createGroup(e2, t2, i2) {
            var s2, o2 = t2 + "_" + e2;
            i2 = i2 || [], s2 = new be(this, false, t2, e2, this.groupIDLookups[0].field, this.headerGenerator[0], i2[o2]), this.groups[o2] = s2, this.groupList.push(s2);
          }
          assignRowToExistingGroup(e2, t2) {
            var i2 = "0_" + this.groupIDLookups[0].func(e2.getData());
            this.groups[i2] && this.groups[i2].addRow(e2);
          }
          assignRowToGroup(e2, t2) {
            var i2 = this.groupIDLookups[0].func(e2.getData()), s2 = !this.groups["0_" + i2];
            return s2 && this.createGroup(i2, 0, t2), this.groups["0_" + i2].addRow(e2), !s2;
          }
          reassignRowToGroup(e2) {
            if ("row" === e2.type) {
              var t2 = e2.modules.group, i2 = t2.getPath(), s2 = this.getExpectedPath(e2);
              i2.length == s2.length && i2.every((e3, t3) => e3 === s2[t3]) || (t2.removeRow(e2), this.assignRowToGroup(e2, this.groups), this.refreshData(true));
            }
          }
          getExpectedPath(e2) {
            var t2 = [], i2 = e2.getData();
            return this.groupIDLookups.forEach((e3) => {
              t2.push(e3.func(i2));
            }), t2;
          }
          updateGroupRows(e2) {
            var t2 = [];
            return this.blockRedraw || (this.groupList.forEach((e3) => {
              t2 = t2.concat(e3.getHeadersAndRows());
            }), e2 && this.refreshData(true)), t2;
          }
          scrollHeaders(e2) {
            this.table.options.groupBy && ("virtual" === this.table.options.renderHorizontal && (e2 -= this.table.columnManager.renderer.vDomPadLeft), e2 += "px", this.groupList.forEach((t2) => {
              t2.scrollHeader(e2);
            }));
          }
          removeGroup(e2) {
            var t2, i2 = e2.level + "_" + e2.key;
            this.groups[i2] && (delete this.groups[i2], (t2 = this.groupList.indexOf(e2)) > -1 && this.groupList.splice(t2, 1));
          }
          checkBasicModeGroupHeaderWidth() {
            var e2 = this.table.rowManager.tableElement, t2 = true;
            this.table.rowManager.getDisplayRows().forEach((i2, s2) => {
              this.table.rowManager.styleRow(i2, s2), e2.appendChild(i2.getElement()), i2.initialize(true), "group" !== i2.type && (t2 = false);
            }), e2.style.minWidth = t2 ? this.table.columnManager.getWidth() + "px" : "";
          }
        }, __publicField(_e2, "moduleName", "groupRows"), _e2), HistoryModule: Ce, HtmlTableImportModule: (_f = class extends M {
          constructor(e2) {
            super(e2), this.fieldIndex = [], this.hasIndex = false;
          }
          initialize() {
            this.tableElementCheck();
          }
          tableElementCheck() {
            this.table.originalElement && "TABLE" === this.table.originalElement.tagName && (this.table.originalElement.childNodes.length ? this.parseTable() : console.warn("Unable to parse data from empty table tag, Tabulator should be initialized on a div tag unless importing data from a table element."));
          }
          parseTable() {
            var e2 = this.table.originalElement, t2 = this.table.options, i2 = e2.getElementsByTagName("th"), s2 = e2.getElementsByTagName("tbody")[0], o2 = [];
            this.hasIndex = false, this.dispatchExternal("htmlImporting"), s2 = s2 ? s2.getElementsByTagName("tr") : [], this._extractOptions(e2, t2), i2.length ? this._extractHeaders(i2, s2) : this._generateBlankHeaders(i2, s2);
            for (var n2 = 0; n2 < s2.length; n2++) {
              var r2 = s2[n2].getElementsByTagName("td"), a2 = {};
              this.hasIndex || (a2[t2.index] = n2);
              for (var l2 = 0; l2 < r2.length; l2++) {
                var h2 = r2[l2];
                void 0 !== this.fieldIndex[l2] && (a2[this.fieldIndex[l2]] = h2.innerHTML);
              }
              o2.push(a2);
            }
            t2.data = o2, this.dispatchExternal("htmlImported");
          }
          _extractOptions(e2, t2, i2) {
            var s2 = e2.attributes, o2 = i2 ? Object.keys(i2) : Object.keys(t2), n2 = {};
            for (var r2 in o2.forEach((e3) => {
              n2[e3.toLowerCase()] = e3;
            }), s2) {
              var a2, l2 = s2[r2];
              l2 && "object" == typeof l2 && l2.name && 0 === l2.name.indexOf("tabulator-") && (a2 = l2.name.replace("tabulator-", ""), void 0 !== n2[a2] && (t2[n2[a2]] = this._attribValue(l2.value)));
            }
          }
          _attribValue(e2) {
            return "true" === e2 || "false" !== e2 && e2;
          }
          _findCol(e2) {
            return this.table.options.columns.find((t2) => t2.title === e2) || false;
          }
          _extractHeaders(e2, t2) {
            for (var i2 = 0; i2 < e2.length; i2++) {
              var s2, o2 = e2[i2], n2 = false, r2 = this._findCol(o2.textContent);
              r2 ? n2 = true : r2 = { title: o2.textContent.trim() }, r2.field || (r2.field = o2.textContent.trim().toLowerCase().replaceAll(" ", "_")), (s2 = o2.getAttribute("width")) && !r2.width && (r2.width = s2), this._extractOptions(o2, r2, this.table.columnManager.optionsList.registeredDefaults), this.fieldIndex[i2] = r2.field, r2.field == this.table.options.index && (this.hasIndex = true), n2 || this.table.options.columns.push(r2);
            }
          }
          _generateBlankHeaders(e2, t2) {
            for (var i2 = 0; i2 < e2.length; i2++) {
              var s2 = e2[i2], o2 = { title: "", field: "col" + i2 };
              this.fieldIndex[i2] = o2.field;
              var n2 = s2.getAttribute("width");
              n2 && (o2.width = n2), this.table.options.columns.push(o2);
            }
          }
        }, __publicField(_f, "moduleName", "htmlTableImport"), _f), ImportModule: ye, InteractionModule: (_g = class extends M {
          constructor(e2) {
            super(e2), this.eventMap = { rowClick: "row-click", rowDblClick: "row-dblclick", rowContext: "row-contextmenu", rowMouseEnter: "row-mouseenter", rowMouseLeave: "row-mouseleave", rowMouseOver: "row-mouseover", rowMouseOut: "row-mouseout", rowMouseMove: "row-mousemove", rowMouseDown: "row-mousedown", rowMouseUp: "row-mouseup", rowTap: "row", rowDblTap: "row", rowTapHold: "row", cellClick: "cell-click", cellDblClick: "cell-dblclick", cellContext: "cell-contextmenu", cellMouseEnter: "cell-mouseenter", cellMouseLeave: "cell-mouseleave", cellMouseOver: "cell-mouseover", cellMouseOut: "cell-mouseout", cellMouseMove: "cell-mousemove", cellMouseDown: "cell-mousedown", cellMouseUp: "cell-mouseup", cellTap: "cell", cellDblTap: "cell", cellTapHold: "cell", headerClick: "column-click", headerDblClick: "column-dblclick", headerContext: "column-contextmenu", headerMouseEnter: "column-mouseenter", headerMouseLeave: "column-mouseleave", headerMouseOver: "column-mouseover", headerMouseOut: "column-mouseout", headerMouseMove: "column-mousemove", headerMouseDown: "column-mousedown", headerMouseUp: "column-mouseup", headerTap: "column", headerDblTap: "column", headerTapHold: "column", groupClick: "group-click", groupDblClick: "group-dblclick", groupContext: "group-contextmenu", groupMouseEnter: "group-mouseenter", groupMouseLeave: "group-mouseleave", groupMouseOver: "group-mouseover", groupMouseOut: "group-mouseout", groupMouseMove: "group-mousemove", groupMouseDown: "group-mousedown", groupMouseUp: "group-mouseup", groupTap: "group", groupDblTap: "group", groupTapHold: "group" }, this.subscribers = {}, this.touchSubscribers = {}, this.columnSubscribers = {}, this.touchWatchers = { row: { tap: null, tapDbl: null, tapHold: null }, cell: { tap: null, tapDbl: null, tapHold: null }, column: { tap: null, tapDbl: null, tapHold: null }, group: { tap: null, tapDbl: null, tapHold: null } }, this.registerColumnOption("headerClick"), this.registerColumnOption("headerDblClick"), this.registerColumnOption("headerContext"), this.registerColumnOption("headerMouseEnter"), this.registerColumnOption("headerMouseLeave"), this.registerColumnOption("headerMouseOver"), this.registerColumnOption("headerMouseOut"), this.registerColumnOption("headerMouseMove"), this.registerColumnOption("headerMouseDown"), this.registerColumnOption("headerMouseUp"), this.registerColumnOption("headerTap"), this.registerColumnOption("headerDblTap"), this.registerColumnOption("headerTapHold"), this.registerColumnOption("cellClick"), this.registerColumnOption("cellDblClick"), this.registerColumnOption("cellContext"), this.registerColumnOption("cellMouseEnter"), this.registerColumnOption("cellMouseLeave"), this.registerColumnOption("cellMouseOver"), this.registerColumnOption("cellMouseOut"), this.registerColumnOption("cellMouseMove"), this.registerColumnOption("cellMouseDown"), this.registerColumnOption("cellMouseUp"), this.registerColumnOption("cellTap"), this.registerColumnOption("cellDblTap"), this.registerColumnOption("cellTapHold");
          }
          initialize() {
            this.initializeExternalEvents(), this.subscribe("column-init", this.initializeColumn.bind(this)), this.subscribe("cell-dblclick", this.cellContentsSelectionFixer.bind(this)), this.subscribe("scroll-horizontal", this.clearTouchWatchers.bind(this)), this.subscribe("scroll-vertical", this.clearTouchWatchers.bind(this));
          }
          clearTouchWatchers() {
            Object.values(this.touchWatchers).forEach((e2) => {
              for (let t2 in e2)
                e2[t2] = null;
            });
          }
          cellContentsSelectionFixer(e2, t2) {
            var i2;
            if (!this.table.modExists("edit") || this.table.modules.edit.currentCell !== t2) {
              e2.preventDefault();
              try {
                document.selection ? ((i2 = document.body.createTextRange()).moveToElementText(t2.getElement()), i2.select()) : window.getSelection && ((i2 = document.createRange()).selectNode(t2.getElement()), window.getSelection().removeAllRanges(), window.getSelection().addRange(i2));
              } catch (e3) {
              }
            }
          }
          initializeExternalEvents() {
            for (let e2 in this.eventMap)
              this.subscriptionChangeExternal(e2, this.subscriptionChanged.bind(this, e2));
          }
          subscriptionChanged(e2, t2) {
            t2 ? this.subscribers[e2] || (this.eventMap[e2].includes("-") ? (this.subscribers[e2] = this.handle.bind(this, e2), this.subscribe(this.eventMap[e2], this.subscribers[e2])) : this.subscribeTouchEvents(e2)) : this.eventMap[e2].includes("-") ? !this.subscribers[e2] || this.columnSubscribers[e2] || this.subscribedExternal(e2) || (this.unsubscribe(this.eventMap[e2], this.subscribers[e2]), delete this.subscribers[e2]) : this.unsubscribeTouchEvents(e2);
          }
          subscribeTouchEvents(e2) {
            var t2 = this.eventMap[e2];
            this.touchSubscribers[t2 + "-touchstart"] || (this.touchSubscribers[t2 + "-touchstart"] = this.handleTouch.bind(this, t2, "start"), this.touchSubscribers[t2 + "-touchend"] = this.handleTouch.bind(this, t2, "end"), this.subscribe(t2 + "-touchstart", this.touchSubscribers[t2 + "-touchstart"]), this.subscribe(t2 + "-touchend", this.touchSubscribers[t2 + "-touchend"])), this.subscribers[e2] = true;
          }
          unsubscribeTouchEvents(e2) {
            var t2 = true, i2 = this.eventMap[e2];
            if (this.subscribers[e2] && !this.subscribedExternal(e2)) {
              delete this.subscribers[e2];
              for (let e3 in this.eventMap)
                this.eventMap[e3] === i2 && this.subscribers[e3] && (t2 = false);
              t2 && (this.unsubscribe(i2 + "-touchstart", this.touchSubscribers[i2 + "-touchstart"]), this.unsubscribe(i2 + "-touchend", this.touchSubscribers[i2 + "-touchend"]), delete this.touchSubscribers[i2 + "-touchstart"], delete this.touchSubscribers[i2 + "-touchend"]);
            }
          }
          initializeColumn(e2) {
            var t2 = e2.definition;
            for (let i2 in this.eventMap)
              t2[i2] && (this.subscriptionChanged(i2, true), this.columnSubscribers[i2] || (this.columnSubscribers[i2] = []), this.columnSubscribers[i2].push(e2));
          }
          handle(e2, t2, i2) {
            this.dispatchEvent(e2, t2, i2);
          }
          handleTouch(e2, t2, i2, s2) {
            var o2 = this.touchWatchers[e2];
            switch ("column" === e2 && (e2 = "header"), t2) {
              case "start":
                o2.tap = true, clearTimeout(o2.tapHold), o2.tapHold = setTimeout(() => {
                  clearTimeout(o2.tapHold), o2.tapHold = null, o2.tap = null, clearTimeout(o2.tapDbl), o2.tapDbl = null, this.dispatchEvent(e2 + "TapHold", i2, s2);
                }, 1e3);
                break;
              case "end":
                o2.tap && (o2.tap = null, this.dispatchEvent(e2 + "Tap", i2, s2)), o2.tapDbl ? (clearTimeout(o2.tapDbl), o2.tapDbl = null, this.dispatchEvent(e2 + "DblTap", i2, s2)) : o2.tapDbl = setTimeout(() => {
                  clearTimeout(o2.tapDbl), o2.tapDbl = null;
                }, 300), clearTimeout(o2.tapHold), o2.tapHold = null;
            }
          }
          dispatchEvent(e2, t2, i2) {
            var s2, o2 = i2.getComponent();
            this.columnSubscribers[e2] && (i2 instanceof n ? s2 = i2.column.definition[e2] : i2 instanceof r && (s2 = i2.definition[e2]), s2 && s2(t2, o2)), this.dispatchExternal(e2, t2, o2);
          }
        }, __publicField(_g, "moduleName", "interaction"), _g), KeybindingsModule: Te, MenuModule: (_h = class extends M {
          constructor(e2) {
            super(e2), this.menuContainer = null, this.nestedMenuBlock = false, this.currentComponent = null, this.rootPopup = null, this.columnSubscribers = {}, this.registerTableOption("rowContextMenu", false), this.registerTableOption("rowClickMenu", false), this.registerTableOption("rowDblClickMenu", false), this.registerTableOption("groupContextMenu", false), this.registerTableOption("groupClickMenu", false), this.registerTableOption("groupDblClickMenu", false), this.registerColumnOption("headerContextMenu"), this.registerColumnOption("headerClickMenu"), this.registerColumnOption("headerDblClickMenu"), this.registerColumnOption("headerMenu"), this.registerColumnOption("headerMenuIcon"), this.registerColumnOption("contextMenu"), this.registerColumnOption("clickMenu"), this.registerColumnOption("dblClickMenu");
          }
          initialize() {
            this.deprecatedOptionsCheck(), this.initializeRowWatchers(), this.initializeGroupWatchers(), this.subscribe("column-init", this.initializeColumn.bind(this));
          }
          deprecatedOptionsCheck() {
          }
          initializeRowWatchers() {
            this.table.options.rowContextMenu && (this.subscribe("row-contextmenu", this.loadMenuEvent.bind(this, this.table.options.rowContextMenu)), this.table.on("rowTapHold", this.loadMenuEvent.bind(this, this.table.options.rowContextMenu))), this.table.options.rowClickMenu && this.subscribe("row-click", this.loadMenuEvent.bind(this, this.table.options.rowClickMenu)), this.table.options.rowDblClickMenu && this.subscribe("row-dblclick", this.loadMenuEvent.bind(this, this.table.options.rowDblClickMenu));
          }
          initializeGroupWatchers() {
            this.table.options.groupContextMenu && (this.subscribe("group-contextmenu", this.loadMenuEvent.bind(this, this.table.options.groupContextMenu)), this.table.on("groupTapHold", this.loadMenuEvent.bind(this, this.table.options.groupContextMenu))), this.table.options.groupClickMenu && this.subscribe("group-click", this.loadMenuEvent.bind(this, this.table.options.groupClickMenu)), this.table.options.groupDblClickMenu && this.subscribe("group-dblclick", this.loadMenuEvent.bind(this, this.table.options.groupDblClickMenu));
          }
          initializeColumn(e2) {
            var t2 = e2.definition;
            t2.headerContextMenu && !this.columnSubscribers.headerContextMenu && (this.columnSubscribers.headerContextMenu = this.loadMenuTableColumnEvent.bind(this, "headerContextMenu"), this.subscribe("column-contextmenu", this.columnSubscribers.headerContextMenu), this.table.on("headerTapHold", this.loadMenuTableColumnEvent.bind(this, "headerContextMenu"))), t2.headerClickMenu && !this.columnSubscribers.headerClickMenu && (this.columnSubscribers.headerClickMenu = this.loadMenuTableColumnEvent.bind(this, "headerClickMenu"), this.subscribe("column-click", this.columnSubscribers.headerClickMenu)), t2.headerDblClickMenu && !this.columnSubscribers.headerDblClickMenu && (this.columnSubscribers.headerDblClickMenu = this.loadMenuTableColumnEvent.bind(this, "headerDblClickMenu"), this.subscribe("column-dblclick", this.columnSubscribers.headerDblClickMenu)), t2.headerMenu && this.initializeColumnHeaderMenu(e2), t2.contextMenu && !this.columnSubscribers.contextMenu && (this.columnSubscribers.contextMenu = this.loadMenuTableCellEvent.bind(this, "contextMenu"), this.subscribe("cell-contextmenu", this.columnSubscribers.contextMenu), this.table.on("cellTapHold", this.loadMenuTableCellEvent.bind(this, "contextMenu"))), t2.clickMenu && !this.columnSubscribers.clickMenu && (this.columnSubscribers.clickMenu = this.loadMenuTableCellEvent.bind(this, "clickMenu"), this.subscribe("cell-click", this.columnSubscribers.clickMenu)), t2.dblClickMenu && !this.columnSubscribers.dblClickMenu && (this.columnSubscribers.dblClickMenu = this.loadMenuTableCellEvent.bind(this, "dblClickMenu"), this.subscribe("cell-dblclick", this.columnSubscribers.dblClickMenu));
          }
          initializeColumnHeaderMenu(e2) {
            var t2, i2 = e2.definition.headerMenuIcon;
            (t2 = document.createElement("span")).classList.add("tabulator-header-popup-button"), i2 ? ("function" == typeof i2 && (i2 = i2(e2.getComponent())), i2 instanceof HTMLElement ? t2.appendChild(i2) : t2.innerHTML = i2) : t2.innerHTML = "&vellip;", t2.addEventListener("click", (t3) => {
              t3.stopPropagation(), t3.preventDefault(), this.loadMenuEvent(e2.definition.headerMenu, t3, e2);
            }), e2.titleElement.insertBefore(t2, e2.titleElement.firstChild);
          }
          loadMenuTableCellEvent(e2, t2, i2) {
            i2._cell && (i2 = i2._cell), i2.column.definition[e2] && this.loadMenuEvent(i2.column.definition[e2], t2, i2);
          }
          loadMenuTableColumnEvent(e2, t2, i2) {
            i2._column && (i2 = i2._column), i2.definition[e2] && this.loadMenuEvent(i2.definition[e2], t2, i2);
          }
          loadMenuEvent(e2, t2, i2) {
            i2._group ? i2 = i2._group : i2._row && (i2 = i2._row), e2 = "function" == typeof e2 ? e2.call(this.table, t2, i2.getComponent()) : e2, this.loadMenu(t2, i2, e2);
          }
          loadMenu(e2, t2, i2, s2, o2) {
            var n2, r2 = !(e2 instanceof MouseEvent), a2 = document.createElement("div");
            if (a2.classList.add("tabulator-menu"), r2 || e2.preventDefault(), i2 && i2.length) {
              if (s2)
                n2 = o2.child(a2);
              else {
                if (this.nestedMenuBlock) {
                  if (this.rootPopup)
                    return;
                } else
                  this.nestedMenuBlock = setTimeout(() => {
                    this.nestedMenuBlock = false;
                  }, 100);
                this.rootPopup && this.rootPopup.hide(), this.rootPopup = n2 = this.popup(a2);
              }
              i2.forEach((e3) => {
                var i3 = document.createElement("div"), s3 = e3.label, o3 = e3.disabled;
                e3.separator ? i3.classList.add("tabulator-menu-separator") : (i3.classList.add("tabulator-menu-item"), "function" == typeof s3 && (s3 = s3.call(this.table, t2.getComponent())), s3 instanceof Node ? i3.appendChild(s3) : i3.innerHTML = s3, "function" == typeof o3 && (o3 = o3.call(this.table, t2.getComponent())), o3 ? (i3.classList.add("tabulator-menu-item-disabled"), i3.addEventListener("click", (e4) => {
                  e4.stopPropagation();
                })) : e3.menu && e3.menu.length ? i3.addEventListener("click", (s4) => {
                  s4.stopPropagation(), this.loadMenu(s4, t2, e3.menu, i3, n2);
                }) : e3.action && i3.addEventListener("click", (i4) => {
                  e3.action(i4, t2.getComponent());
                }), e3.menu && e3.menu.length && i3.classList.add("tabulator-menu-item-submenu")), a2.appendChild(i3);
              }), a2.addEventListener("click", (e3) => {
                this.rootPopup && this.rootPopup.hide();
              }), n2.show(s2 || e2), n2 === this.rootPopup && (this.rootPopup.hideOnBlur(() => {
                this.rootPopup = null, this.currentComponent && (this.dispatch("menu-closed", i2, n2), this.dispatchExternal("menuClosed", this.currentComponent.getComponent()), this.currentComponent = null);
              }), this.currentComponent = t2, this.dispatch("menu-opened", i2, n2), this.dispatchExternal("menuOpened", t2.getComponent()));
            }
          }
        }, __publicField(_h, "moduleName", "menu"), _h), MoveColumnsModule: (_i = class extends M {
          constructor(e2) {
            super(e2), this.placeholderElement = this.createPlaceholderElement(), this.hoverElement = false, this.checkTimeout = false, this.checkPeriod = 250, this.moving = false, this.toCol = false, this.toColAfter = false, this.startX = 0, this.autoScrollMargin = 40, this.autoScrollStep = 5, this.autoScrollTimeout = false, this.touchMove = false, this.moveHover = this.moveHover.bind(this), this.endMove = this.endMove.bind(this), this.registerTableOption("movableColumns", false);
          }
          createPlaceholderElement() {
            var e2 = document.createElement("div");
            return e2.classList.add("tabulator-col"), e2.classList.add("tabulator-col-placeholder"), e2;
          }
          initialize() {
            this.table.options.movableColumns && (this.subscribe("column-init", this.initializeColumn.bind(this)), this.subscribe("alert-show", this.abortMove.bind(this)));
          }
          abortMove() {
            clearTimeout(this.checkTimeout);
          }
          initializeColumn(e2) {
            var t2, i2 = this, s2 = {};
            e2.modules.frozen || e2.isGroup || e2.isRowHeader || (t2 = e2.getElement(), s2.mousemove = function(s3) {
              e2.parent === i2.moving.parent && ((i2.touchMove ? s3.touches[0].pageX : s3.pageX) - a.elOffset(t2).left + i2.table.columnManager.contentsElement.scrollLeft > e2.getWidth() / 2 ? i2.toCol === e2 && i2.toColAfter || (t2.parentNode.insertBefore(i2.placeholderElement, t2.nextSibling), i2.moveColumn(e2, true)) : (i2.toCol !== e2 || i2.toColAfter) && (t2.parentNode.insertBefore(i2.placeholderElement, t2), i2.moveColumn(e2, false)));
            }.bind(i2), t2.addEventListener("mousedown", function(t3) {
              i2.touchMove = false, 1 === t3.which && (i2.checkTimeout = setTimeout(function() {
                i2.startMove(t3, e2);
              }, i2.checkPeriod));
            }), t2.addEventListener("mouseup", function(e3) {
              1 === e3.which && i2.checkTimeout && clearTimeout(i2.checkTimeout);
            }), i2.bindTouchEvents(e2)), e2.modules.moveColumn = s2;
          }
          bindTouchEvents(e2) {
            var t2, i2, s2, o2, n2, r2, a2 = e2.getElement(), l2 = false;
            a2.addEventListener("touchstart", (a3) => {
              this.checkTimeout = setTimeout(() => {
                this.touchMove = true, t2 = e2.nextColumn(), s2 = t2 ? t2.getWidth() / 2 : 0, i2 = e2.prevColumn(), o2 = i2 ? i2.getWidth() / 2 : 0, n2 = 0, r2 = 0, l2 = false, this.startMove(a3, e2);
              }, this.checkPeriod);
            }, { passive: true }), a2.addEventListener("touchmove", (a3) => {
              var h2, d2;
              this.moving && (this.moveHover(a3), l2 || (l2 = a3.touches[0].pageX), (h2 = a3.touches[0].pageX - l2) > 0 ? t2 && h2 - n2 > s2 && (d2 = t2) !== e2 && (l2 = a3.touches[0].pageX, d2.getElement().parentNode.insertBefore(this.placeholderElement, d2.getElement().nextSibling), this.moveColumn(d2, true)) : i2 && -h2 - r2 > o2 && (d2 = i2) !== e2 && (l2 = a3.touches[0].pageX, d2.getElement().parentNode.insertBefore(this.placeholderElement, d2.getElement()), this.moveColumn(d2, false)), d2 && (t2 = d2.nextColumn(), n2 = s2, s2 = t2 ? t2.getWidth() / 2 : 0, i2 = d2.prevColumn(), r2 = o2, o2 = i2 ? i2.getWidth() / 2 : 0));
            }, { passive: true }), a2.addEventListener("touchend", (e3) => {
              this.checkTimeout && clearTimeout(this.checkTimeout), this.moving && this.endMove(e3);
            });
          }
          startMove(e2, t2) {
            var i2 = t2.getElement(), s2 = this.table.columnManager.getContentsElement(), o2 = this.table.columnManager.getHeadersElement();
            this.table.modules.selectRange && this.table.modules.selectRange.columnSelection && this.table.modules.selectRange.mousedown && "column" === this.table.modules.selectRange.selecting || (this.moving = t2, this.startX = (this.touchMove ? e2.touches[0].pageX : e2.pageX) - a.elOffset(i2).left, this.table.element.classList.add("tabulator-block-select"), this.placeholderElement.style.width = t2.getWidth() + "px", this.placeholderElement.style.height = t2.getHeight() + "px", i2.parentNode.insertBefore(this.placeholderElement, i2), i2.parentNode.removeChild(i2), this.hoverElement = i2.cloneNode(true), this.hoverElement.classList.add("tabulator-moving"), s2.appendChild(this.hoverElement), this.hoverElement.style.left = "0", this.hoverElement.style.bottom = s2.clientHeight - o2.offsetHeight + "px", this.touchMove || (this._bindMouseMove(), document.body.addEventListener("mousemove", this.moveHover), document.body.addEventListener("mouseup", this.endMove)), this.moveHover(e2), this.dispatch("column-moving", e2, this.moving));
          }
          _bindMouseMove() {
            this.table.columnManager.columnsByIndex.forEach(function(e2) {
              e2.modules.moveColumn.mousemove && e2.getElement().addEventListener("mousemove", e2.modules.moveColumn.mousemove);
            });
          }
          _unbindMouseMove() {
            this.table.columnManager.columnsByIndex.forEach(function(e2) {
              e2.modules.moveColumn.mousemove && e2.getElement().removeEventListener("mousemove", e2.modules.moveColumn.mousemove);
            });
          }
          moveColumn(e2, t2) {
            var i2 = this.moving.getCells();
            this.toCol = e2, this.toColAfter = t2, t2 ? e2.getCells().forEach(function(e3, t3) {
              var s2 = e3.getElement(true);
              s2.parentNode && i2[t3] && s2.parentNode.insertBefore(i2[t3].getElement(), s2.nextSibling);
            }) : e2.getCells().forEach(function(e3, t3) {
              var s2 = e3.getElement(true);
              s2.parentNode && i2[t3] && s2.parentNode.insertBefore(i2[t3].getElement(), s2);
            });
          }
          endMove(e2) {
            (1 === e2.which || this.touchMove) && (this._unbindMouseMove(), this.placeholderElement.parentNode.insertBefore(this.moving.getElement(), this.placeholderElement.nextSibling), this.placeholderElement.parentNode.removeChild(this.placeholderElement), this.hoverElement.parentNode.removeChild(this.hoverElement), this.table.element.classList.remove("tabulator-block-select"), this.toCol && this.table.columnManager.moveColumnActual(this.moving, this.toCol, this.toColAfter), this.moving = false, this.toCol = false, this.toColAfter = false, this.touchMove || (document.body.removeEventListener("mousemove", this.moveHover), document.body.removeEventListener("mouseup", this.endMove)));
          }
          moveHover(e2) {
            var t2, i2 = this.table.columnManager.getContentsElement(), s2 = i2.scrollLeft, o2 = (this.touchMove ? e2.touches[0].pageX : e2.pageX) - a.elOffset(i2).left + s2;
            this.hoverElement.style.left = o2 - this.startX + "px", o2 - s2 < this.autoScrollMargin && (this.autoScrollTimeout || (this.autoScrollTimeout = setTimeout(() => {
              t2 = Math.max(0, s2 - 5), this.table.rowManager.getElement().scrollLeft = t2, this.autoScrollTimeout = false;
            }, 1))), s2 + i2.clientWidth - o2 < this.autoScrollMargin && (this.autoScrollTimeout || (this.autoScrollTimeout = setTimeout(() => {
              t2 = Math.min(i2.clientWidth, s2 + 5), this.table.rowManager.getElement().scrollLeft = t2, this.autoScrollTimeout = false;
            }, 1)));
          }
        }, __publicField(_i, "moduleName", "moveColumn"), _i), MoveRowsModule: Le, MutatorModule: De, PageModule: Pe, PersistenceModule: _e, PopupModule: (_j = class extends M {
          constructor(e2) {
            super(e2), this.columnSubscribers = {}, this.registerTableOption("rowContextPopup", false), this.registerTableOption("rowClickPopup", false), this.registerTableOption("rowDblClickPopup", false), this.registerTableOption("groupContextPopup", false), this.registerTableOption("groupClickPopup", false), this.registerTableOption("groupDblClickPopup", false), this.registerColumnOption("headerContextPopup"), this.registerColumnOption("headerClickPopup"), this.registerColumnOption("headerDblClickPopup"), this.registerColumnOption("headerPopup"), this.registerColumnOption("headerPopupIcon"), this.registerColumnOption("contextPopup"), this.registerColumnOption("clickPopup"), this.registerColumnOption("dblClickPopup"), this.registerComponentFunction("cell", "popup", this._componentPopupCall.bind(this)), this.registerComponentFunction("column", "popup", this._componentPopupCall.bind(this)), this.registerComponentFunction("row", "popup", this._componentPopupCall.bind(this)), this.registerComponentFunction("group", "popup", this._componentPopupCall.bind(this));
          }
          initialize() {
            this.initializeRowWatchers(), this.initializeGroupWatchers(), this.subscribe("column-init", this.initializeColumn.bind(this));
          }
          _componentPopupCall(e2, t2, i2) {
            this.loadPopupEvent(t2, null, e2, i2);
          }
          initializeRowWatchers() {
            this.table.options.rowContextPopup && (this.subscribe("row-contextmenu", this.loadPopupEvent.bind(this, this.table.options.rowContextPopup)), this.table.on("rowTapHold", this.loadPopupEvent.bind(this, this.table.options.rowContextPopup))), this.table.options.rowClickPopup && this.subscribe("row-click", this.loadPopupEvent.bind(this, this.table.options.rowClickPopup)), this.table.options.rowDblClickPopup && this.subscribe("row-dblclick", this.loadPopupEvent.bind(this, this.table.options.rowDblClickPopup));
          }
          initializeGroupWatchers() {
            this.table.options.groupContextPopup && (this.subscribe("group-contextmenu", this.loadPopupEvent.bind(this, this.table.options.groupContextPopup)), this.table.on("groupTapHold", this.loadPopupEvent.bind(this, this.table.options.groupContextPopup))), this.table.options.groupClickPopup && this.subscribe("group-click", this.loadPopupEvent.bind(this, this.table.options.groupClickPopup)), this.table.options.groupDblClickPopup && this.subscribe("group-dblclick", this.loadPopupEvent.bind(this, this.table.options.groupDblClickPopup));
          }
          initializeColumn(e2) {
            var t2 = e2.definition;
            t2.headerContextPopup && !this.columnSubscribers.headerContextPopup && (this.columnSubscribers.headerContextPopup = this.loadPopupTableColumnEvent.bind(this, "headerContextPopup"), this.subscribe("column-contextmenu", this.columnSubscribers.headerContextPopup), this.table.on("headerTapHold", this.loadPopupTableColumnEvent.bind(this, "headerContextPopup"))), t2.headerClickPopup && !this.columnSubscribers.headerClickPopup && (this.columnSubscribers.headerClickPopup = this.loadPopupTableColumnEvent.bind(this, "headerClickPopup"), this.subscribe("column-click", this.columnSubscribers.headerClickPopup)), t2.headerDblClickPopup && !this.columnSubscribers.headerDblClickPopup && (this.columnSubscribers.headerDblClickPopup = this.loadPopupTableColumnEvent.bind(this, "headerDblClickPopup"), this.subscribe("column-dblclick", this.columnSubscribers.headerDblClickPopup)), t2.headerPopup && this.initializeColumnHeaderPopup(e2), t2.contextPopup && !this.columnSubscribers.contextPopup && (this.columnSubscribers.contextPopup = this.loadPopupTableCellEvent.bind(this, "contextPopup"), this.subscribe("cell-contextmenu", this.columnSubscribers.contextPopup), this.table.on("cellTapHold", this.loadPopupTableCellEvent.bind(this, "contextPopup"))), t2.clickPopup && !this.columnSubscribers.clickPopup && (this.columnSubscribers.clickPopup = this.loadPopupTableCellEvent.bind(this, "clickPopup"), this.subscribe("cell-click", this.columnSubscribers.clickPopup)), t2.dblClickPopup && !this.columnSubscribers.dblClickPopup && (this.columnSubscribers.dblClickPopup = this.loadPopupTableCellEvent.bind(this, "dblClickPopup"), this.subscribe("cell-click", this.columnSubscribers.dblClickPopup));
          }
          initializeColumnHeaderPopup(e2) {
            var t2, i2 = e2.definition.headerPopupIcon;
            (t2 = document.createElement("span")).classList.add("tabulator-header-popup-button"), i2 ? ("function" == typeof i2 && (i2 = i2(e2.getComponent())), i2 instanceof HTMLElement ? t2.appendChild(i2) : t2.innerHTML = i2) : t2.innerHTML = "&vellip;", t2.addEventListener("click", (t3) => {
              t3.stopPropagation(), t3.preventDefault(), this.loadPopupEvent(e2.definition.headerPopup, t3, e2);
            }), e2.titleElement.insertBefore(t2, e2.titleElement.firstChild);
          }
          loadPopupTableCellEvent(e2, t2, i2) {
            i2._cell && (i2 = i2._cell), i2.column.definition[e2] && this.loadPopupEvent(i2.column.definition[e2], t2, i2);
          }
          loadPopupTableColumnEvent(e2, t2, i2) {
            i2._column && (i2 = i2._column), i2.definition[e2] && this.loadPopupEvent(i2.definition[e2], t2, i2);
          }
          loadPopupEvent(e2, t2, i2, s2) {
            var o2;
            i2._group ? i2 = i2._group : i2._row && (i2 = i2._row), e2 = "function" == typeof e2 ? e2.call(this.table, t2, i2.getComponent(), function(e3) {
              o2 = e3;
            }) : e2, this.loadPopup(t2, i2, e2, o2, s2);
          }
          loadPopup(e2, t2, i2, s2, o2) {
            var n2, r2, a2 = !(e2 instanceof MouseEvent);
            i2 instanceof HTMLElement ? n2 = i2 : (n2 = document.createElement("div")).innerHTML = i2, n2.classList.add("tabulator-popup"), n2.addEventListener("click", (e3) => {
              e3.stopPropagation();
            }), a2 || e2.preventDefault(), r2 = this.popup(n2), "function" == typeof s2 && r2.renderCallback(s2), e2 ? r2.show(e2) : r2.show(t2.getElement(), o2 || "center"), r2.hideOnBlur(() => {
              this.dispatchExternal("popupClosed", t2.getComponent());
            }), this.dispatchExternal("popupOpened", t2.getComponent());
          }
        }, __publicField(_j, "moduleName", "popup"), _j), PrintModule: (_k = class extends M {
          constructor(e2) {
            super(e2), this.element = false, this.manualBlock = false, this.beforeprintEventHandler = null, this.afterprintEventHandler = null, this.registerTableOption("printAsHtml", false), this.registerTableOption("printFormatter", false), this.registerTableOption("printHeader", false), this.registerTableOption("printFooter", false), this.registerTableOption("printStyled", true), this.registerTableOption("printRowRange", "visible"), this.registerTableOption("printConfig", {}), this.registerColumnOption("print"), this.registerColumnOption("titlePrint");
          }
          initialize() {
            this.table.options.printAsHtml && (this.beforeprintEventHandler = this.replaceTable.bind(this), this.afterprintEventHandler = this.cleanup.bind(this), window.addEventListener("beforeprint", this.beforeprintEventHandler), window.addEventListener("afterprint", this.afterprintEventHandler), this.subscribe("table-destroy", this.destroy.bind(this))), this.registerTableFunction("print", this.printFullscreen.bind(this));
          }
          destroy() {
            this.table.options.printAsHtml && (window.removeEventListener("beforeprint", this.beforeprintEventHandler), window.removeEventListener("afterprint", this.afterprintEventHandler));
          }
          replaceTable() {
            this.manualBlock || (this.element = document.createElement("div"), this.element.classList.add("tabulator-print-table"), this.element.appendChild(this.table.modules.export.generateTable(this.table.options.printConfig, this.table.options.printStyled, this.table.options.printRowRange, "print")), this.table.element.style.display = "none", this.table.element.parentNode.insertBefore(this.element, this.table.element));
          }
          cleanup() {
            document.body.classList.remove("tabulator-print-fullscreen-hide"), this.element && this.element.parentNode && (this.element.parentNode.removeChild(this.element), this.table.element.style.display = "");
          }
          printFullscreen(e2, t2, i2) {
            var s2, o2, n2 = window.scrollX, r2 = window.scrollY, a2 = document.createElement("div"), l2 = document.createElement("div"), h2 = this.table.modules.export.generateTable(void 0 !== i2 ? i2 : this.table.options.printConfig, void 0 !== t2 ? t2 : this.table.options.printStyled, e2 || this.table.options.printRowRange, "print");
            this.manualBlock = true, this.element = document.createElement("div"), this.element.classList.add("tabulator-print-fullscreen"), this.table.options.printHeader && (a2.classList.add("tabulator-print-header"), "string" == typeof (s2 = "function" == typeof this.table.options.printHeader ? this.table.options.printHeader.call(this.table) : this.table.options.printHeader) ? a2.innerHTML = s2 : a2.appendChild(s2), this.element.appendChild(a2)), this.element.appendChild(h2), this.table.options.printFooter && (l2.classList.add("tabulator-print-footer"), "string" == typeof (o2 = "function" == typeof this.table.options.printFooter ? this.table.options.printFooter.call(this.table) : this.table.options.printFooter) ? l2.innerHTML = o2 : l2.appendChild(o2), this.element.appendChild(l2)), document.body.classList.add("tabulator-print-fullscreen-hide"), document.body.appendChild(this.element), this.table.options.printFormatter && this.table.options.printFormatter(this.element, h2), window.print(), this.cleanup(), window.scrollTo(n2, r2), this.manualBlock = false;
          }
        }, __publicField(_k, "moduleName", "print"), _k), ReactiveDataModule: (_l = class extends M {
          constructor(e2) {
            super(e2), this.data = false, this.blocked = false, this.origFuncs = {}, this.currentVersion = 0, this.registerTableOption("reactiveData", false);
          }
          initialize() {
            this.table.options.reactiveData && (this.subscribe("cell-value-save-before", this.block.bind(this, "cellsave")), this.subscribe("cell-value-save-after", this.unblock.bind(this, "cellsave")), this.subscribe("row-data-save-before", this.block.bind(this, "rowsave")), this.subscribe("row-data-save-after", this.unblock.bind(this, "rowsave")), this.subscribe("row-data-init-after", this.watchRow.bind(this)), this.subscribe("data-processing", this.watchData.bind(this)), this.subscribe("table-destroy", this.unwatchData.bind(this)));
          }
          watchData(e2) {
            var t2, i2 = this;
            this.currentVersion++, t2 = this.currentVersion, this.unwatchData(), this.data = e2, this.origFuncs.push = e2.push, Object.defineProperty(this.data, "push", { enumerable: false, configurable: true, value: function() {
              var s2, o2 = Array.from(arguments);
              return i2.blocked || t2 !== i2.currentVersion || (i2.block("data-push"), o2.forEach((e3) => {
                i2.table.rowManager.addRowActual(e3, false);
              }), s2 = i2.origFuncs.push.apply(e2, arguments), i2.unblock("data-push")), s2;
            } }), this.origFuncs.unshift = e2.unshift, Object.defineProperty(this.data, "unshift", { enumerable: false, configurable: true, value: function() {
              var s2, o2 = Array.from(arguments);
              return i2.blocked || t2 !== i2.currentVersion || (i2.block("data-unshift"), o2.forEach((e3) => {
                i2.table.rowManager.addRowActual(e3, true);
              }), s2 = i2.origFuncs.unshift.apply(e2, arguments), i2.unblock("data-unshift")), s2;
            } }), this.origFuncs.shift = e2.shift, Object.defineProperty(this.data, "shift", { enumerable: false, configurable: true, value: function() {
              var s2, o2;
              return i2.blocked || t2 !== i2.currentVersion || (i2.block("data-shift"), i2.data.length && (s2 = i2.table.rowManager.getRowFromDataObject(i2.data[0])) && s2.deleteActual(), o2 = i2.origFuncs.shift.call(e2), i2.unblock("data-shift")), o2;
            } }), this.origFuncs.pop = e2.pop, Object.defineProperty(this.data, "pop", { enumerable: false, configurable: true, value: function() {
              var s2, o2;
              return i2.blocked || t2 !== i2.currentVersion || (i2.block("data-pop"), i2.data.length && (s2 = i2.table.rowManager.getRowFromDataObject(i2.data[i2.data.length - 1])) && s2.deleteActual(), o2 = i2.origFuncs.pop.call(e2), i2.unblock("data-pop")), o2;
            } }), this.origFuncs.splice = e2.splice, Object.defineProperty(this.data, "splice", { enumerable: false, configurable: true, value: function() {
              var s2, o2, n2 = Array.from(arguments), r2 = n2[0] < 0 ? e2.length + n2[0] : n2[0], a2 = n2[1], l2 = !!n2[2] && n2.slice(2);
              if (!i2.blocked && t2 === i2.currentVersion) {
                if (i2.block("data-splice"), l2 && ((s2 = !!e2[r2] && i2.table.rowManager.getRowFromDataObject(e2[r2])) ? l2.forEach((e3) => {
                  i2.table.rowManager.addRowActual(e3, true, s2, true);
                }) : (l2 = l2.slice().reverse()).forEach((e3) => {
                  i2.table.rowManager.addRowActual(e3, true, false, true);
                })), 0 !== a2) {
                  var h2 = e2.slice(r2, void 0 === n2[1] ? n2[1] : r2 + a2);
                  h2.forEach((e3, t3) => {
                    var s3 = i2.table.rowManager.getRowFromDataObject(e3);
                    s3 && s3.deleteActual(t3 !== h2.length - 1);
                  });
                }
                (l2 || 0 !== a2) && i2.table.rowManager.reRenderInPosition(), o2 = i2.origFuncs.splice.apply(e2, arguments), i2.unblock("data-splice");
              }
              return o2;
            } });
          }
          unwatchData() {
            if (false !== this.data)
              for (var e2 in this.origFuncs)
                Object.defineProperty(this.data, e2, { enumerable: true, configurable: true, writable: true, value: this.origFuncs.key });
          }
          watchRow(e2) {
            var t2 = e2.getData();
            for (var i2 in t2)
              this.watchKey(e2, t2, i2);
            this.table.options.dataTree && this.watchTreeChildren(e2);
          }
          watchTreeChildren(e2) {
            var t2 = this, i2 = e2.getData()[this.table.options.dataTreeChildField], s2 = {};
            i2 && (s2.push = i2.push, Object.defineProperty(i2, "push", { enumerable: false, configurable: true, value: () => {
              if (!t2.blocked) {
                t2.block("tree-push");
                var o2 = s2.push.apply(i2, arguments);
                this.rebuildTree(e2), t2.unblock("tree-push");
              }
              return o2;
            } }), s2.unshift = i2.unshift, Object.defineProperty(i2, "unshift", { enumerable: false, configurable: true, value: () => {
              if (!t2.blocked) {
                t2.block("tree-unshift");
                var o2 = s2.unshift.apply(i2, arguments);
                this.rebuildTree(e2), t2.unblock("tree-unshift");
              }
              return o2;
            } }), s2.shift = i2.shift, Object.defineProperty(i2, "shift", { enumerable: false, configurable: true, value: () => {
              if (!t2.blocked) {
                t2.block("tree-shift");
                var o2 = s2.shift.call(i2);
                this.rebuildTree(e2), t2.unblock("tree-shift");
              }
              return o2;
            } }), s2.pop = i2.pop, Object.defineProperty(i2, "pop", { enumerable: false, configurable: true, value: () => {
              if (!t2.blocked) {
                t2.block("tree-pop");
                var o2 = s2.pop.call(i2);
                this.rebuildTree(e2), t2.unblock("tree-pop");
              }
              return o2;
            } }), s2.splice = i2.splice, Object.defineProperty(i2, "splice", { enumerable: false, configurable: true, value: () => {
              if (!t2.blocked) {
                t2.block("tree-splice");
                var o2 = s2.splice.apply(i2, arguments);
                this.rebuildTree(e2), t2.unblock("tree-splice");
              }
              return o2;
            } }));
          }
          rebuildTree(e2) {
            this.table.modules.dataTree.initializeRow(e2), this.table.modules.dataTree.layoutRow(e2), this.table.rowManager.refreshActiveData("tree", false, true);
          }
          watchKey(e2, t2, i2) {
            var s2 = this, o2 = Object.getOwnPropertyDescriptor(t2, i2), n2 = t2[i2], r2 = this.currentVersion;
            Object.defineProperty(t2, i2, { set: (t3) => {
              if (n2 = t3, !s2.blocked && r2 === s2.currentVersion) {
                s2.block("key");
                var a2 = {};
                a2[i2] = t3, e2.updateData(a2), s2.unblock("key");
              }
              o2.set && o2.set(t3);
            }, get: () => (o2.get && o2.get(), n2) });
          }
          unwatchRow(e2) {
            var t2 = e2.getData();
            for (var i2 in t2)
              Object.defineProperty(t2, i2, { value: t2[i2] });
          }
          block(e2) {
            this.blocked || (this.blocked = e2);
          }
          unblock(e2) {
            this.blocked === e2 && (this.blocked = false);
          }
        }, __publicField(_l, "moduleName", "reactiveData"), _l), ResizeColumnsModule: (_m = class extends M {
          constructor(e2) {
            super(e2), this.startColumn = false, this.startX = false, this.startWidth = false, this.latestX = false, this.handle = null, this.initialNextColumn = null, this.nextColumn = null, this.initialized = false, this.registerColumnOption("resizable", true), this.registerTableOption("resizableColumnFit", false), this.registerTableOption("resizableColumnGuide", false);
          }
          initialize() {
            this.subscribe("column-rendered", this.layoutColumnHeader.bind(this));
          }
          initializeEventWatchers() {
            this.initialized || (this.subscribe("cell-rendered", this.layoutCellHandles.bind(this)), this.subscribe("cell-delete", this.deInitializeComponent.bind(this)), this.subscribe("cell-height", this.resizeHandle.bind(this)), this.subscribe("column-moved", this.columnLayoutUpdated.bind(this)), this.subscribe("column-hide", this.deInitializeColumn.bind(this)), this.subscribe("column-show", this.columnLayoutUpdated.bind(this)), this.subscribe("column-width", this.columnWidthUpdated.bind(this)), this.subscribe("column-delete", this.deInitializeComponent.bind(this)), this.subscribe("column-height", this.resizeHandle.bind(this)), this.initialized = true);
          }
          layoutCellHandles(e2) {
            "row" === e2.row.type && (this.deInitializeComponent(e2), this.initializeColumn("cell", e2, e2.column, e2.element));
          }
          layoutColumnHeader(e2) {
            e2.definition.resizable && (this.initializeEventWatchers(), this.deInitializeComponent(e2), this.initializeColumn("header", e2, e2, e2.element));
          }
          columnLayoutUpdated(e2) {
            var t2 = e2.prevColumn();
            this.reinitializeColumn(e2), t2 && this.reinitializeColumn(t2);
          }
          columnWidthUpdated(e2) {
            e2.modules.frozen && (this.table.modules.frozenColumns.leftColumns.includes(e2) ? this.table.modules.frozenColumns.leftColumns.forEach((e3) => {
              this.reinitializeColumn(e3);
            }) : this.table.modules.frozenColumns.rightColumns.includes(e2) && this.table.modules.frozenColumns.rightColumns.forEach((e3) => {
              this.reinitializeColumn(e3);
            }));
          }
          frozenColumnOffset(e2) {
            var t2 = false;
            return e2.modules.frozen && (t2 = e2.modules.frozen.marginValue, "left" === e2.modules.frozen.position ? t2 += e2.getWidth() - 3 : t2 && (t2 -= 3)), false !== t2 && t2 + "px";
          }
          reinitializeColumn(e2) {
            var t2 = this.frozenColumnOffset(e2);
            e2.cells.forEach((i2) => {
              i2.modules.resize && i2.modules.resize.handleEl && (t2 && (i2.modules.resize.handleEl.style[e2.modules.frozen.position] = t2, i2.modules.resize.handleEl.style["z-index"] = 11), i2.element.after(i2.modules.resize.handleEl));
            }), e2.modules.resize && e2.modules.resize.handleEl && (t2 && (e2.modules.resize.handleEl.style[e2.modules.frozen.position] = t2), e2.element.after(e2.modules.resize.handleEl));
          }
          initializeColumn(e2, t2, i2, s2) {
            var o2 = this, n2 = i2.definition.resizable, r2 = {}, a2 = i2.getLastColumn();
            if ("header" === e2 && (r2 = { variableHeight: "textarea" == i2.definition.formatter || i2.definition.variableHeight }), (true === n2 || n2 == e2) && this._checkResizability(a2)) {
              var l2 = document.createElement("span");
              l2.className = "tabulator-col-resize-handle", l2.addEventListener("click", function(e3) {
                e3.stopPropagation();
              });
              var h2 = function(e3) {
                o2.startColumn = i2, o2.initialNextColumn = o2.nextColumn = a2.nextColumn(), o2._mouseDown(e3, a2, l2);
              };
              l2.addEventListener("mousedown", h2), l2.addEventListener("touchstart", h2, { passive: true }), l2.addEventListener("dblclick", (e3) => {
                var t3 = a2.getWidth();
                e3.stopPropagation(), a2.reinitializeWidth(true), t3 !== a2.getWidth() && (o2.dispatch("column-resized", a2), o2.dispatchExternal("columnResized", a2.getComponent()));
              }), i2.modules.frozen && (l2.style.position = "sticky", l2.style[i2.modules.frozen.position] = this.frozenColumnOffset(i2)), r2.handleEl = l2, s2.parentNode && i2.visible && s2.after(l2);
            }
            t2.modules.resize = r2;
          }
          deInitializeColumn(e2) {
            this.deInitializeComponent(e2), e2.cells.forEach((e3) => {
              this.deInitializeComponent(e3);
            });
          }
          deInitializeComponent(e2) {
            var t2;
            e2.modules.resize && (t2 = e2.modules.resize.handleEl) && t2.parentElement && t2.parentElement.removeChild(t2);
          }
          resizeHandle(e2, t2) {
            e2.modules.resize && e2.modules.resize.handleEl && (e2.modules.resize.handleEl.style.height = t2);
          }
          resize(e2, t2) {
            var i2, s2, o2 = void 0 === e2.clientX ? e2.touches[0].clientX : e2.clientX, n2 = o2 - this.startX, r2 = o2 - this.latestX;
            if (this.latestX = o2, this.table.rtl && (n2 = -n2, r2 = -r2), i2 = t2.width == t2.minWidth || t2.width == t2.maxWidth, t2.setWidth(this.startWidth + n2), s2 = t2.width == t2.minWidth || t2.width == t2.maxWidth, r2 < 0 && (this.nextColumn = this.initialNextColumn), this.table.options.resizableColumnFit && this.nextColumn && (!i2 || !s2)) {
              let e3 = this.nextColumn.getWidth();
              r2 > 0 && e3 <= this.nextColumn.minWidth && (this.nextColumn = this.nextColumn.nextColumn()), this.nextColumn && this.nextColumn.setWidth(this.nextColumn.getWidth() - r2);
            }
            this.table.columnManager.rerenderColumns(true), !this.table.browserSlow && t2.modules.resize && t2.modules.resize.variableHeight && t2.checkCellHeights();
          }
          calcGuidePosition(e2, t2, i2) {
            var s2 = void 0 === e2.clientX ? e2.touches[0].clientX : e2.clientX, o2 = i2.getBoundingClientRect().x - this.table.element.getBoundingClientRect().x, n2 = this.table.element.getBoundingClientRect().x, r2 = t2.element.getBoundingClientRect().left - n2, a2 = s2 - this.startX, l2 = Math.max(o2 + a2, r2 + t2.minWidth);
            return t2.maxWidth && (l2 = Math.min(l2, r2 + t2.maxWidth)), l2;
          }
          _checkResizability(e2) {
            return e2.definition.resizable;
          }
          _mouseDown(e2, t2, i2) {
            var s2, o2 = this;
            function n2(e3) {
              o2.table.options.resizableColumnGuide ? s2.style.left = o2.calcGuidePosition(e3, t2, i2) + "px" : o2.resize(e3, t2);
            }
            function r2(e3) {
              o2.table.options.resizableColumnGuide && (o2.resize(e3, t2), s2.remove()), o2.startColumn.modules.edit && (o2.startColumn.modules.edit.blocked = false), o2.table.browserSlow && t2.modules.resize && t2.modules.resize.variableHeight && t2.checkCellHeights(), document.body.removeEventListener("mouseup", r2), document.body.removeEventListener("mousemove", n2), i2.removeEventListener("touchmove", n2), i2.removeEventListener("touchend", r2), o2.table.element.classList.remove("tabulator-block-select"), o2.startWidth !== t2.getWidth() && (o2.table.columnManager.verticalAlignHeaders(), o2.dispatch("column-resized", t2), o2.dispatchExternal("columnResized", t2.getComponent()));
            }
            this.dispatchExternal("columnResizing", t2.getComponent()), o2.table.options.resizableColumnGuide && ((s2 = document.createElement("span")).classList.add("tabulator-col-resize-guide"), o2.table.element.appendChild(s2), setTimeout(() => {
              s2.style.left = o2.calcGuidePosition(e2, t2, i2) + "px";
            })), o2.table.element.classList.add("tabulator-block-select"), e2.stopPropagation(), o2.startColumn.modules.edit && (o2.startColumn.modules.edit.blocked = true), o2.startX = void 0 === e2.clientX ? e2.touches[0].clientX : e2.clientX, o2.latestX = o2.startX, o2.startWidth = t2.getWidth(), document.body.addEventListener("mousemove", n2), document.body.addEventListener("mouseup", r2), i2.addEventListener("touchmove", n2, { passive: true }), i2.addEventListener("touchend", r2);
          }
        }, __publicField(_m, "moduleName", "resizeColumns"), _m), ResizeRowsModule: (_n = class extends M {
          constructor(e2) {
            super(e2), this.startColumn = false, this.startY = false, this.startHeight = false, this.handle = null, this.prevHandle = null, this.registerTableOption("resizableRows", false), this.registerTableOption("resizableRowGuide", false);
          }
          initialize() {
            this.table.options.resizableRows && this.subscribe("row-layout-after", this.initializeRow.bind(this));
          }
          initializeRow(e2) {
            var t2 = this, i2 = e2.getElement(), s2 = document.createElement("div");
            s2.className = "tabulator-row-resize-handle";
            var o2 = document.createElement("div");
            o2.className = "tabulator-row-resize-handle prev", s2.addEventListener("click", function(e3) {
              e3.stopPropagation();
            });
            var n2 = function(i3) {
              t2.startRow = e2, t2._mouseDown(i3, e2, s2);
            };
            s2.addEventListener("mousedown", n2), s2.addEventListener("touchstart", n2, { passive: true }), o2.addEventListener("click", function(e3) {
              e3.stopPropagation();
            });
            var r2 = function(i3) {
              var s3 = t2.table.rowManager.prevDisplayRow(e2);
              s3 && (t2.startRow = s3, t2._mouseDown(i3, s3, o2));
            };
            o2.addEventListener("mousedown", r2), o2.addEventListener("touchstart", r2, { passive: true }), i2.appendChild(s2), i2.appendChild(o2);
          }
          resize(e2, t2) {
            t2.setHeight(this.startHeight + ((void 0 === e2.screenY ? e2.touches[0].screenY : e2.screenY) - this.startY));
          }
          calcGuidePosition(e2, t2, i2) {
            var s2 = void 0 === e2.screenY ? e2.touches[0].screenY : e2.screenY, o2 = i2.getBoundingClientRect().y - this.table.element.getBoundingClientRect().y, n2 = this.table.element.getBoundingClientRect().y, r2 = t2.element.getBoundingClientRect().top - n2, a2 = s2 - this.startY;
            return Math.max(o2 + a2, r2);
          }
          _mouseDown(e2, t2, i2) {
            var s2, o2 = this;
            function n2(e3) {
              o2.table.options.resizableRowGuide ? s2.style.top = o2.calcGuidePosition(e3, t2, i2) + "px" : o2.resize(e3, t2);
            }
            function r2(e3) {
              o2.table.options.resizableRowGuide && (o2.resize(e3, t2), s2.remove()), document.body.removeEventListener("mouseup", n2), document.body.removeEventListener("mousemove", n2), i2.removeEventListener("touchmove", n2), i2.removeEventListener("touchend", r2), o2.table.element.classList.remove("tabulator-block-select"), o2.dispatchExternal("rowResized", t2.getComponent());
            }
            o2.dispatchExternal("rowResizing", t2.getComponent()), o2.table.options.resizableRowGuide && ((s2 = document.createElement("span")).classList.add("tabulator-row-resize-guide"), o2.table.element.appendChild(s2), setTimeout(() => {
              s2.style.top = o2.calcGuidePosition(e2, t2, i2) + "px";
            })), o2.table.element.classList.add("tabulator-block-select"), e2.stopPropagation(), o2.startY = void 0 === e2.screenY ? e2.touches[0].screenY : e2.screenY, o2.startHeight = t2.getHeight(), document.body.addEventListener("mousemove", n2), document.body.addEventListener("mouseup", r2), i2.addEventListener("touchmove", n2, { passive: true }), i2.addEventListener("touchend", r2);
          }
        }, __publicField(_n, "moduleName", "resizeRows"), _n), ResizeTableModule: (_o = class extends M {
          constructor(e2) {
            super(e2), this.binding = false, this.visibilityObserver = false, this.resizeObserver = false, this.containerObserver = false, this.tableHeight = 0, this.tableWidth = 0, this.containerHeight = 0, this.containerWidth = 0, this.autoResize = false, this.visible = false, this.initialized = false, this.initialRedraw = false, this.registerTableOption("autoResize", true);
          }
          initialize() {
            if (this.table.options.autoResize) {
              var e2, t2 = this.table;
              this.tableHeight = t2.element.clientHeight, this.tableWidth = t2.element.clientWidth, t2.element.parentNode && (this.containerHeight = t2.element.parentNode.clientHeight, this.containerWidth = t2.element.parentNode.clientWidth), "undefined" != typeof IntersectionObserver && "undefined" != typeof ResizeObserver && "virtual" === t2.rowManager.getRenderMode() ? (this.initializeVisibilityObserver(), this.autoResize = true, this.resizeObserver = new ResizeObserver((e3) => {
                if (!t2.browserMobile || t2.browserMobile && (!t2.modules.edit || t2.modules.edit && !t2.modules.edit.currentCell)) {
                  var i2 = Math.floor(e3[0].contentRect.height), s2 = Math.floor(e3[0].contentRect.width);
                  this.tableHeight == i2 && this.tableWidth == s2 || (this.tableHeight = i2, this.tableWidth = s2, t2.element.parentNode && (this.containerHeight = t2.element.parentNode.clientHeight, this.containerWidth = t2.element.parentNode.clientWidth), this.redrawTable());
                }
              }), this.resizeObserver.observe(t2.element), e2 = window.getComputedStyle(t2.element), this.table.element.parentNode && !this.table.rowManager.fixedHeight && (e2.getPropertyValue("max-height") || e2.getPropertyValue("min-height")) && (this.containerObserver = new ResizeObserver((e3) => {
                if (!t2.browserMobile || t2.browserMobile && (!t2.modules.edit || t2.modules.edit && !t2.modules.edit.currentCell)) {
                  var i2 = Math.floor(e3[0].contentRect.height), s2 = Math.floor(e3[0].contentRect.width);
                  this.containerHeight == i2 && this.containerWidth == s2 || (this.containerHeight = i2, this.containerWidth = s2, this.tableHeight = t2.element.clientHeight, this.tableWidth = t2.element.clientWidth), this.redrawTable();
                }
              }), this.containerObserver.observe(this.table.element.parentNode)), this.subscribe("table-resize", this.tableResized.bind(this))) : (this.binding = function() {
                (!t2.browserMobile || t2.browserMobile && (!t2.modules.edit || t2.modules.edit && !t2.modules.edit.currentCell)) && (t2.columnManager.rerenderColumns(true), t2.redraw());
              }, window.addEventListener("resize", this.binding)), this.subscribe("table-destroy", this.clearBindings.bind(this));
            }
          }
          initializeVisibilityObserver() {
            this.visibilityObserver = new IntersectionObserver((e2) => {
              this.visible = e2[0].isIntersecting, this.initialized ? this.visible && (this.redrawTable(this.initialRedraw), this.initialRedraw = false) : (this.initialized = true, this.initialRedraw = !this.visible);
            }), this.visibilityObserver.observe(this.table.element);
          }
          redrawTable(e2) {
            this.initialized && this.visible && (this.table.columnManager.rerenderColumns(true), this.table.redraw(e2));
          }
          tableResized() {
            this.table.rowManager.redraw();
          }
          clearBindings() {
            this.binding && window.removeEventListener("resize", this.binding), this.resizeObserver && this.resizeObserver.unobserve(this.table.element), this.visibilityObserver && this.visibilityObserver.unobserve(this.table.element), this.containerObserver && this.containerObserver.unobserve(this.table.element.parentNode);
          }
        }, __publicField(_o, "moduleName", "resizeTable"), _o), ResponsiveLayoutModule: (_p = class extends M {
          constructor(e2) {
            super(e2), this.columns = [], this.hiddenColumns = [], this.mode = "", this.index = 0, this.collapseFormatter = [], this.collapseStartOpen = true, this.collapseHandleColumn = false, this.registerTableOption("responsiveLayout", false), this.registerTableOption("responsiveLayoutCollapseStartOpen", true), this.registerTableOption("responsiveLayoutCollapseUseFormatters", true), this.registerTableOption("responsiveLayoutCollapseFormatter", false), this.registerColumnOption("responsive");
          }
          initialize() {
            this.table.options.responsiveLayout && (this.subscribe("column-layout", this.initializeColumn.bind(this)), this.subscribe("column-show", this.updateColumnVisibility.bind(this)), this.subscribe("column-hide", this.updateColumnVisibility.bind(this)), this.subscribe("columns-loaded", this.initializeResponsivity.bind(this)), this.subscribe("column-moved", this.initializeResponsivity.bind(this)), this.subscribe("column-add", this.initializeResponsivity.bind(this)), this.subscribe("column-delete", this.initializeResponsivity.bind(this)), this.subscribe("table-redrawing", this.tableRedraw.bind(this)), "collapse" === this.table.options.responsiveLayout && (this.subscribe("row-data-changed", this.generateCollapsedRowContent.bind(this)), this.subscribe("row-init", this.initializeRow.bind(this)), this.subscribe("row-layout", this.layoutRow.bind(this))));
          }
          tableRedraw(e2) {
            -1 === ["fitColumns", "fitDataStretch"].indexOf(this.layoutMode()) && (e2 || this.update());
          }
          initializeResponsivity() {
            var e2 = [];
            this.mode = this.table.options.responsiveLayout, this.collapseFormatter = this.table.options.responsiveLayoutCollapseFormatter || this.formatCollapsedData, this.collapseStartOpen = this.table.options.responsiveLayoutCollapseStartOpen, this.hiddenColumns = [], this.collapseFormatter && (this.collapseFormatter = this.collapseFormatter.bind(this.table)), this.table.columnManager.columnsByIndex.forEach((t2, i2) => {
              t2.modules.responsive && t2.modules.responsive.order && t2.modules.responsive.visible && (t2.modules.responsive.index = i2, e2.push(t2), t2.visible || "collapse" !== this.mode || this.hiddenColumns.push(t2));
            }), e2 = (e2 = e2.reverse()).sort((e3, t2) => t2.modules.responsive.order - e3.modules.responsive.order || t2.modules.responsive.index - e3.modules.responsive.index), this.columns = e2, "collapse" === this.mode && this.generateCollapsedContent();
            for (let e3 of this.table.columnManager.columnsByIndex)
              if ("responsiveCollapse" == e3.definition.formatter) {
                this.collapseHandleColumn = e3;
                break;
              }
            this.collapseHandleColumn && (this.hiddenColumns.length ? this.collapseHandleColumn.show() : this.collapseHandleColumn.hide());
          }
          initializeColumn(e2) {
            var t2 = e2.getDefinition();
            e2.modules.responsive = { order: void 0 === t2.responsive ? 1 : t2.responsive, visible: false !== t2.visible };
          }
          initializeRow(e2) {
            var t2;
            "calc" !== e2.type && ((t2 = document.createElement("div")).classList.add("tabulator-responsive-collapse"), e2.modules.responsiveLayout = { element: t2, open: this.collapseStartOpen }, this.collapseStartOpen || (t2.style.display = "none"));
          }
          layoutRow(e2) {
            var t2 = e2.getElement();
            e2.modules.responsiveLayout && (t2.appendChild(e2.modules.responsiveLayout.element), this.generateCollapsedRowContent(e2));
          }
          updateColumnVisibility(e2, t2) {
            !t2 && e2.modules.responsive && (e2.modules.responsive.visible = e2.visible, this.initializeResponsivity());
          }
          hideColumn(e2) {
            var t2 = this.hiddenColumns.length;
            e2.hide(false, true), "collapse" === this.mode && (this.hiddenColumns.unshift(e2), this.generateCollapsedContent(), this.collapseHandleColumn && !t2 && this.collapseHandleColumn.show());
          }
          showColumn(e2) {
            var t2;
            e2.show(false, true), e2.setWidth(e2.getWidth()), "collapse" === this.mode && ((t2 = this.hiddenColumns.indexOf(e2)) > -1 && this.hiddenColumns.splice(t2, 1), this.generateCollapsedContent(), this.collapseHandleColumn && !this.hiddenColumns.length && this.collapseHandleColumn.hide());
          }
          update() {
            for (var e2 = true; e2; ) {
              let t2 = "fitColumns" == this.table.modules.layout.getMode() ? this.table.columnManager.getFlexBaseWidth() : this.table.columnManager.getWidth(), i2 = (this.table.options.headerVisible ? this.table.columnManager.element.clientWidth : this.table.element.clientWidth) - t2;
              if (i2 < 0) {
                let t3 = this.columns[this.index];
                t3 ? (this.hideColumn(t3), this.index++) : e2 = false;
              } else {
                let t3 = this.columns[this.index - 1];
                t3 && i2 > 0 && i2 >= t3.getWidth() ? (this.showColumn(t3), this.index--) : e2 = false;
              }
              this.table.rowManager.activeRowsCount || this.table.rowManager.renderEmptyScroll();
            }
          }
          generateCollapsedContent() {
            this.table.rowManager.getDisplayRows().forEach((e2) => {
              this.generateCollapsedRowContent(e2);
            });
          }
          generateCollapsedRowContent(e2) {
            var t2, i2;
            if (e2.modules.responsiveLayout) {
              for (t2 = e2.modules.responsiveLayout.element; t2.firstChild; )
                t2.removeChild(t2.firstChild);
              (i2 = this.collapseFormatter(this.generateCollapsedRowData(e2))) && t2.appendChild(i2), e2.calcHeight(true);
            }
          }
          generateCollapsedRowData(e2) {
            var t2, i2 = e2.getData(), s2 = [];
            return this.hiddenColumns.forEach((o2) => {
              var n2 = o2.getFieldValue(i2);
              if (o2.definition.title && o2.field)
                if (o2.modules.format && this.table.options.responsiveLayoutCollapseUseFormatters) {
                  let r2 = function(e3) {
                    e3();
                  };
                  t2 = { value: false, data: {}, getValue: function() {
                    return n2;
                  }, getData: function() {
                    return i2;
                  }, getType: function() {
                    return "cell";
                  }, getElement: function() {
                    return document.createElement("div");
                  }, getRow: function() {
                    return e2.getComponent();
                  }, getColumn: function() {
                    return o2.getComponent();
                  }, getTable: () => this.table }, s2.push({ field: o2.field, title: o2.definition.title, value: o2.modules.format.formatter.call(this.table.modules.format, t2, o2.modules.format.params, r2) });
                } else
                  s2.push({ field: o2.field, title: o2.definition.title, value: n2 });
            }), s2;
          }
          formatCollapsedData(e2) {
            var t2 = document.createElement("table");
            return e2.forEach((e3) => {
              var i2, s2 = document.createElement("tr"), o2 = document.createElement("td"), n2 = document.createElement("td"), r2 = document.createElement("strong");
              o2.appendChild(r2), this.modules.localize.bind("columns|" + e3.field, function(t3) {
                r2.innerHTML = t3 || e3.title;
              }), e3.value instanceof Node ? ((i2 = document.createElement("div")).appendChild(e3.value), n2.appendChild(i2)) : n2.innerHTML = e3.value, s2.appendChild(o2), s2.appendChild(n2), t2.appendChild(s2);
            }), Object.keys(e2).length ? t2 : "";
          }
        }, __publicField(_p, "moduleName", "responsiveLayout"), __publicField(_p, "moduleExtensions", Oe), _p), SelectRangeModule: (_q = class extends M {
          constructor(e2) {
            super(e2), this.selecting = "cell", this.mousedown = false, this.ranges = [], this.overlay = null, this.rowHeader = null, this.layoutChangeTimeout = null, this.columnSelection = false, this.rowSelection = false, this.maxRanges = 0, this.activeRange = false, this.blockKeydown = false, this.keyDownEvent = this._handleKeyDown.bind(this), this.mouseUpEvent = this._handleMouseUp.bind(this), this.registerTableOption("selectableRange", false), this.registerTableOption("selectableRangeColumns", false), this.registerTableOption("selectableRangeRows", false), this.registerTableOption("selectableRangeClearCells", false), this.registerTableOption("selectableRangeClearCellsValue", void 0), this.registerTableFunction("getRangesData", this.getRangesData.bind(this)), this.registerTableFunction("getRanges", this.getRanges.bind(this)), this.registerTableFunction("addRange", this.addRangeFromComponent.bind(this)), this.registerComponentFunction("cell", "getRanges", this.cellGetRanges.bind(this)), this.registerComponentFunction("row", "getRanges", this.rowGetRanges.bind(this)), this.registerComponentFunction("column", "getRanges", this.colGetRanges.bind(this));
          }
          initialize() {
            this.options("selectableRange") && (this.options("selectableRows") ? console.warn("SelectRange functionality cannot be used in conjunction with row selection") : (this.maxRanges = this.options("selectableRange"), this.initializeTable(), this.initializeWatchers()), this.options("columns").findIndex((e2) => e2.frozen) > 0 && console.warn("Having frozen column in arbitrary position with selectRange option may result in unpredictable behavior."), this.options("columns").filter((e2) => e2.frozen) > 1 && console.warn("Having multiple frozen columns with selectRange option may result in unpredictable behavior."));
          }
          initializeTable() {
            this.overlay = document.createElement("div"), this.overlay.classList.add("tabulator-range-overlay"), this.rangeContainer = document.createElement("div"), this.rangeContainer.classList.add("tabulator-range-container"), this.activeRangeCellElement = document.createElement("div"), this.activeRangeCellElement.classList.add("tabulator-range-cell-active"), this.overlay.appendChild(this.rangeContainer), this.overlay.appendChild(this.activeRangeCellElement), this.table.rowManager.element.addEventListener("keydown", this.keyDownEvent), this.resetRanges(), this.table.rowManager.element.appendChild(this.overlay), this.table.columnManager.element.setAttribute("tabindex", 0), this.table.element.classList.add("tabulator-ranges");
          }
          initializeWatchers() {
            this.columnSelection = this.options("selectableRangeColumns"), this.rowSelection = this.options("selectableRangeRows"), this.subscribe("column-init", this.initializeColumn.bind(this)), this.subscribe("column-mousedown", this.handleColumnMouseDown.bind(this)), this.subscribe("column-mousemove", this.handleColumnMouseMove.bind(this)), this.subscribe("column-resized", this.handleColumnResized.bind(this)), this.subscribe("column-moving", this.handleColumnMoving.bind(this)), this.subscribe("column-moved", this.handleColumnMoved.bind(this)), this.subscribe("column-width", this.layoutChange.bind(this)), this.subscribe("column-height", this.layoutChange.bind(this)), this.subscribe("column-resized", this.layoutChange.bind(this)), this.subscribe("columns-loaded", this.updateHeaderColumn.bind(this)), this.subscribe("cell-height", this.layoutChange.bind(this)), this.subscribe("cell-rendered", this.renderCell.bind(this)), this.subscribe("cell-mousedown", this.handleCellMouseDown.bind(this)), this.subscribe("cell-mousemove", this.handleCellMouseMove.bind(this)), this.subscribe("cell-click", this.handleCellClick.bind(this)), this.subscribe("cell-editing", this.handleEditingCell.bind(this)), this.subscribe("page-changed", this.redraw.bind(this)), this.subscribe("scroll-vertical", this.layoutChange.bind(this)), this.subscribe("scroll-horizontal", this.layoutChange.bind(this)), this.subscribe("data-destroy", this.tableDestroyed.bind(this)), this.subscribe("data-processed", this.resetRanges.bind(this)), this.subscribe("table-layout", this.layoutElement.bind(this)), this.subscribe("table-redraw", this.redraw.bind(this)), this.subscribe("table-destroy", this.tableDestroyed.bind(this)), this.subscribe("edit-editor-clear", this.finishEditingCell.bind(this)), this.subscribe("edit-blur", this.restoreFocus.bind(this)), this.subscribe("keybinding-nav-prev", this.keyNavigate.bind(this, "left")), this.subscribe("keybinding-nav-next", this.keyNavigate.bind(this, "right")), this.subscribe("keybinding-nav-left", this.keyNavigate.bind(this, "left")), this.subscribe("keybinding-nav-right", this.keyNavigate.bind(this, "right")), this.subscribe("keybinding-nav-up", this.keyNavigate.bind(this, "up")), this.subscribe("keybinding-nav-down", this.keyNavigate.bind(this, "down")), this.subscribe("keybinding-nav-range", this.keyNavigateRange.bind(this));
          }
          initializeColumn(e2) {
            this.columnSelection && e2.definition.headerSort && "icon" !== this.options("headerSortClickElement") && console.warn("Using column headerSort with selectableRangeColumns option may result in unpredictable behavior. Consider using headerSortClickElement: 'icon'."), e2.modules.edit;
          }
          updateHeaderColumn() {
            var e2;
            this.rowSelection && (this.rowHeader = this.table.columnManager.getVisibleColumnsByIndex()[0], this.rowHeader && (this.rowHeader.definition.cssClass = this.rowHeader.definition.cssClass + " tabulator-range-row-header", this.rowHeader.definition.headerSort && console.warn("Using column headerSort with selectableRangeRows option may result in unpredictable behavior"), this.rowHeader.definition.editor && console.warn("Using column editor with selectableRangeRows option may result in unpredictable behavior"))), this.table.modules.frozenColumns && this.table.modules.frozenColumns.active && ((e2 = this.table.modules.frozenColumns.getFrozenColumns()).length > 1 || 1 === e2.length && e2[0] !== this.rowHeader) && console.warn("Using frozen columns that are not the range header in combination with the selectRange option may result in unpredictable behavior");
          }
          getRanges() {
            return this.ranges.map((e2) => e2.getComponent());
          }
          getRangesData() {
            return this.ranges.map((e2) => e2.getData());
          }
          addRangeFromComponent(e2, t2) {
            return e2 = e2 ? e2._cell : null, t2 = t2 ? t2._cell : null, this.addRange(e2, t2);
          }
          cellGetRanges(e2) {
            var t2 = [];
            return t2 = e2.column === this.rowHeader ? this.ranges.filter((t3) => t3.occupiesRow(e2.row)) : this.ranges.filter((t3) => t3.occupies(e2)), t2.map((e3) => e3.getComponent());
          }
          rowGetRanges(e2) {
            var t2 = this.ranges.filter((t3) => t3.occupiesRow(e2));
            return t2.map((e3) => e3.getComponent());
          }
          colGetRanges(e2) {
            var t2 = this.ranges.filter((t3) => t3.occupiesColumn(e2));
            return t2.map((e3) => e3.getComponent());
          }
          _handleMouseUp(e2) {
            this.mousedown = false, document.removeEventListener("mouseup", this.mouseUpEvent);
          }
          _handleKeyDown(e2) {
            if (!this.blockKeydown && (!this.table.modules.edit || this.table.modules.edit && !this.table.modules.edit.currentCell)) {
              if ("Enter" === e2.key) {
                if (this.table.modules.edit && this.table.modules.edit.currentCell)
                  return;
                this.table.modules.edit.editCell(this.getActiveCell()), e2.preventDefault();
              }
              "Backspace" !== e2.key && "Delete" !== e2.key || !this.options("selectableRangeClearCells") || this.activeRange && this.activeRange.clearValues();
            }
          }
          initializeFocus(e2) {
            var t2;
            this.restoreFocus();
            try {
              document.selection ? ((t2 = document.body.createTextRange()).moveToElementText(e2.getElement()), t2.select()) : window.getSelection && ((t2 = document.createRange()).selectNode(e2.getElement()), window.getSelection().removeAllRanges(), window.getSelection().addRange(t2));
            } catch (e3) {
            }
          }
          restoreFocus(e2) {
            return this.table.rowManager.element.focus(), true;
          }
          handleColumnResized(e2) {
            var t2;
            "column" !== this.selecting && "all" !== this.selecting || (t2 = this.ranges.some((t3) => t3.occupiesColumn(e2)), t2 && this.ranges.forEach((t3) => {
              t3.getColumns(true).forEach((t4) => {
                t4 !== e2 && t4.setWidth(e2.width);
              });
            }));
          }
          handleColumnMoving(e2, t2) {
            this.resetRanges().setBounds(t2), this.overlay.style.visibility = "hidden";
          }
          handleColumnMoved(e2, t2, i2) {
            this.activeRange.setBounds(e2), this.layoutElement();
          }
          handleColumnMouseDown(e2, t2) {
            (2 !== e2.button || "column" !== this.selecting && "all" !== this.selecting || !this.activeRange.occupiesColumn(t2)) && (this.table.options.movableColumns && "column" === this.selecting && this.activeRange.occupiesColumn(t2) || (this.mousedown = true, document.addEventListener("mouseup", this.mouseUpEvent), this.newSelection(e2, t2)));
          }
          handleColumnMouseMove(e2, t2) {
            t2 !== this.rowHeader && this.mousedown && "all" !== this.selecting && this.activeRange.setBounds(false, t2, true);
          }
          renderCell(e2) {
            var t2 = e2.getElement(), i2 = this.ranges.findIndex((t3) => t3.occupies(e2));
            t2.classList.toggle("tabulator-range-selected", -1 !== i2), t2.classList.toggle("tabulator-range-only-cell-selected", 1 === this.ranges.length && this.ranges[0].atTopLeft(e2) && this.ranges[0].atBottomRight(e2)), t2.dataset.range = i2;
          }
          handleCellMouseDown(e2, t2) {
            2 === e2.button && (this.activeRange.occupies(t2) || ("row" === this.selecting || "all" === this.selecting) && this.activeRange.occupiesRow(t2.row)) || (this.mousedown = true, document.addEventListener("mouseup", this.mouseUpEvent), this.newSelection(e2, t2));
          }
          handleCellMouseMove(e2, t2) {
            this.mousedown && "all" !== this.selecting && this.activeRange.setBounds(false, t2, true);
          }
          handleCellClick(e2, t2) {
            this.initializeFocus(t2);
          }
          handleEditingCell(e2) {
            this.activeRange && this.activeRange.setBounds(e2);
          }
          finishEditingCell() {
            this.blockKeydown = true, this.table.rowManager.element.focus(), setTimeout(() => {
              this.blockKeydown = false;
            }, 10);
          }
          keyNavigate(e2, t2) {
            this.navigate(false, false, e2), t2.preventDefault();
          }
          keyNavigateRange(e2, t2, i2, s2) {
            this.navigate(i2, s2, t2), e2.preventDefault();
          }
          navigate(e2, t2, i2) {
            var s2, o2, n2, r2, a2, l2, h2;
            if (this.table.modules.edit && this.table.modules.edit.currentCell)
              return false;
            if (this.ranges.length > 1 && (this.ranges = this.ranges.filter((e3) => e3 === this.activeRange ? (e3.setEnd(e3.start.row, e3.start.col), true) : (e3.destroy(), false))), o2 = this.activeRange, r2 = (n2 = t2 ? o2.end : o2.start).row, a2 = n2.col, e2)
              switch (i2) {
                case "left":
                  a2 = this.findJumpCellLeft(o2.start.row, n2.col);
                  break;
                case "right":
                  a2 = this.findJumpCellRight(o2.start.row, n2.col);
                  break;
                case "up":
                  r2 = this.findJumpCellUp(n2.row, o2.start.col);
                  break;
                case "down":
                  r2 = this.findJumpCellDown(n2.row, o2.start.col);
              }
            else {
              if (t2 && ("row" === this.selecting && ("left" === i2 || "right" === i2) || "column" === this.selecting && ("up" === i2 || "down" === i2)))
                return;
              switch (i2) {
                case "left":
                  a2 = Math.max(a2 - 1, 0);
                  break;
                case "right":
                  a2 = Math.min(a2 + 1, this.getTableColumns().length - 1);
                  break;
                case "up":
                  r2 = Math.max(r2 - 1, 0);
                  break;
                case "down":
                  r2 = Math.min(r2 + 1, this.getTableRows().length - 1);
              }
            }
            return this.rowHeader && 0 === a2 && (a2 = 1), s2 = a2 !== n2.col || r2 !== n2.row, t2 || o2.setStart(r2, a2), o2.setEnd(r2, a2), t2 || (this.selecting = "cell"), s2 ? (l2 = this.getRowByRangePos(o2.end.row), h2 = this.getColumnByRangePos(o2.end.col), "left" !== i2 && "right" !== i2 || null !== h2.getElement().parentNode ? "up" !== i2 && "down" !== i2 || null !== l2.getElement().parentNode ? this.autoScroll(o2, l2.getElement(), h2.getElement()) : l2.getComponent().scrollTo(void 0, false) : h2.getComponent().scrollTo(void 0, false), this.layoutElement(), true) : void 0;
          }
          rangeRemoved(e2) {
            this.ranges = this.ranges.filter((t2) => t2 !== e2), this.activeRange === e2 && (this.ranges.length ? this.activeRange = this.ranges[this.ranges.length - 1] : this.addRange()), this.layoutElement();
          }
          findJumpRow(e2, t2, i2, s2, o2) {
            return i2 && (t2 = t2.reverse()), this.findJumpItem(s2, o2, t2, function(t3) {
              return t3.getData()[e2.getField()];
            });
          }
          findJumpCol(e2, t2, i2, s2, o2) {
            return i2 && (t2 = t2.reverse()), this.findJumpItem(s2, o2, t2, function(t3) {
              return e2.getData()[t3.getField()];
            });
          }
          findJumpItem(e2, t2, i2, s2) {
            var o2;
            for (let n2 of i2) {
              let i3 = s2(n2);
              if (e2) {
                if (o2 = n2, i3)
                  break;
              } else if (t2) {
                if (o2 = n2, i3)
                  break;
              } else {
                if (!i3)
                  break;
                o2 = n2;
              }
            }
            return o2;
          }
          findJumpCellLeft(e2, t2) {
            var i2 = this.getRowByRangePos(e2), s2 = this.getTableColumns(), o2 = this.isEmpty(i2.getData()[s2[t2].getField()]), n2 = !!s2[t2 - 1] && this.isEmpty(i2.getData()[s2[t2 - 1].getField()]), r2 = this.rowHeader ? s2.slice(1, t2) : s2.slice(0, t2), a2 = this.findJumpCol(i2, r2, true, o2, n2);
            return a2 ? a2.getPosition() - 1 : t2;
          }
          findJumpCellRight(e2, t2) {
            var i2 = this.getRowByRangePos(e2), s2 = this.getTableColumns(), o2 = this.isEmpty(i2.getData()[s2[t2].getField()]), n2 = !!s2[t2 + 1] && this.isEmpty(i2.getData()[s2[t2 + 1].getField()]), r2 = this.findJumpCol(i2, s2.slice(t2 + 1, s2.length), false, o2, n2);
            return r2 ? r2.getPosition() - 1 : t2;
          }
          findJumpCellUp(e2, t2) {
            var i2 = this.getColumnByRangePos(t2), s2 = this.getTableRows(), o2 = this.isEmpty(s2[e2].getData()[i2.getField()]), n2 = !!s2[e2 - 1] && this.isEmpty(s2[e2 - 1].getData()[i2.getField()]), r2 = this.findJumpRow(i2, s2.slice(0, e2), true, o2, n2);
            return r2 ? r2.position - 1 : e2;
          }
          findJumpCellDown(e2, t2) {
            var i2 = this.getColumnByRangePos(t2), s2 = this.getTableRows(), o2 = this.isEmpty(s2[e2].getData()[i2.getField()]), n2 = !!s2[e2 + 1] && this.isEmpty(s2[e2 + 1].getData()[i2.getField()]), r2 = this.findJumpRow(i2, s2.slice(e2 + 1, s2.length), false, o2, n2);
            return r2 ? r2.position - 1 : e2;
          }
          newSelection(e2, t2) {
            var i2;
            if ("column" === t2.type) {
              if (!this.columnSelection)
                return;
              if (t2 === this.rowHeader) {
                i2 = this.resetRanges(), this.selecting = "all";
                var s2, o2 = this.getCell(-1, -1);
                return s2 = this.rowHeader ? this.getCell(0, 1) : this.getCell(0, 0), void i2.setBounds(s2, o2);
              }
              this.selecting = "column";
            } else
              t2.column === this.rowHeader ? this.selecting = "row" : this.selecting = "cell";
            e2.shiftKey ? this.activeRange.setBounds(false, t2) : e2.ctrlKey ? this.addRange().setBounds(t2) : this.resetRanges().setBounds(t2);
          }
          autoScroll(e2, t2, i2) {
            var s2, o2, n2, r2, a2, l2 = this.table.rowManager.element;
            void 0 === t2 && (t2 = this.getRowByRangePos(e2.end.row).getElement()), void 0 === i2 && (i2 = this.getColumnByRangePos(e2.end.col).getElement()), this.rowHeader && (s2 = this.rowHeader.getElement()), o2 = { left: i2.offsetLeft, right: i2.offsetLeft + i2.offsetWidth, top: t2.offsetTop, bottom: t2.offsetTop + t2.offsetHeight }, n2 = { left: l2.scrollLeft, right: Math.ceil(l2.scrollLeft + l2.clientWidth), top: l2.scrollTop, bottom: l2.scrollTop + l2.offsetHeight - this.table.rowManager.scrollbarWidth }, s2 && (n2.left += s2.offsetWidth), r2 = n2.left < o2.left && o2.left < n2.right && n2.left < o2.right && o2.right < n2.right, a2 = n2.top < o2.top && o2.top < n2.bottom && n2.top < o2.bottom && o2.bottom < n2.bottom, r2 || (o2.left < n2.left ? (l2.scrollLeft = o2.left, s2 && (l2.scrollLeft -= s2.offsetWidth)) : o2.right > n2.right && (l2.scrollLeft = o2.right - l2.clientWidth)), a2 || (o2.top < n2.top ? l2.scrollTop = o2.top : o2.bottom > n2.bottom && (l2.scrollTop = o2.bottom - l2.clientHeight));
          }
          layoutChange() {
            this.overlay.style.visibility = "hidden", clearTimeout(this.layoutChangeTimeout), this.layoutChangeTimeout = setTimeout(this.layoutRanges.bind(this), 200);
          }
          redraw(e2) {
            e2 && (this.selecting = "cell", this.resetRanges(), this.layoutElement());
          }
          layoutElement(e2) {
            (e2 ? this.table.rowManager.getVisibleRows(true) : this.table.rowManager.getRows()).forEach((e3) => {
              "row" === e3.type && (this.layoutRow(e3), e3.cells.forEach((e4) => this.renderCell(e4)));
            }), this.getTableColumns().forEach((e3) => {
              this.layoutColumn(e3);
            }), this.layoutRanges();
          }
          layoutRow(e2) {
            var t2 = e2.getElement(), i2 = false, s2 = this.ranges.some((t3) => t3.occupiesRow(e2));
            "row" === this.selecting ? i2 = s2 : "all" === this.selecting && (i2 = true), t2.classList.toggle("tabulator-range-selected", i2), t2.classList.toggle("tabulator-range-highlight", s2);
          }
          layoutColumn(e2) {
            var t2 = e2.getElement(), i2 = false, s2 = this.ranges.some((t3) => t3.occupiesColumn(e2));
            "column" === this.selecting ? i2 = s2 : "all" === this.selecting && (i2 = true), t2.classList.toggle("tabulator-range-selected", i2), t2.classList.toggle("tabulator-range-highlight", s2);
          }
          layoutRanges() {
            var e2, t2, i2;
            this.table.initialized && (e2 = this.getActiveCell()) && (t2 = e2.getElement(), i2 = e2.row.getElement(), this.table.rtl ? this.activeRangeCellElement.style.right = i2.offsetWidth - t2.offsetLeft - t2.offsetWidth + "px" : this.activeRangeCellElement.style.left = i2.offsetLeft + t2.offsetLeft + "px", this.activeRangeCellElement.style.top = i2.offsetTop + "px", this.activeRangeCellElement.style.width = t2.offsetWidth + "px", this.activeRangeCellElement.style.height = i2.offsetHeight + "px", this.ranges.forEach((e3) => e3.layout()), this.overlay.style.visibility = "visible");
          }
          getCell(e2, t2) {
            var i2;
            return t2 < 0 && (t2 = this.getTableColumns().length + t2) < 0 ? null : (e2 < 0 && (e2 = this.getTableRows().length + e2), (i2 = this.table.rowManager.getRowFromPosition(e2 + 1)) ? i2.getCells(false, true).filter((e3) => e3.column.visible)[t2] : null);
          }
          getActiveCell() {
            return this.getCell(this.activeRange.start.row, this.activeRange.start.col);
          }
          getRowByRangePos(e2) {
            return this.getTableRows()[e2];
          }
          getColumnByRangePos(e2) {
            return this.getTableColumns()[e2];
          }
          getTableRows() {
            return this.table.rowManager.getDisplayRows().filter((e2) => "row" === e2.type);
          }
          getTableColumns() {
            return this.table.columnManager.getVisibleColumnsByIndex();
          }
          addRange(e2, t2) {
            var i2;
            return true !== this.maxRanges && this.ranges.length >= this.maxRanges && this.ranges.shift().destroy(), i2 = new Ve(this.table, this, e2, t2), this.activeRange = i2, this.ranges.push(i2), this.rangeContainer.appendChild(i2.element), i2;
          }
          resetRanges() {
            var e2, t2, i2;
            return this.ranges.forEach((e3) => e3.destroy()), this.ranges = [], e2 = this.addRange(), this.table.rowManager.activeRows.length && (i2 = this.table.rowManager.activeRows[0].cells.filter((e3) => e3.column.visible), (t2 = i2[this.rowHeader ? 1 : 0]) && (e2.setBounds(t2), this.initializeFocus(t2))), e2;
          }
          tableDestroyed() {
            document.removeEventListener("mouseup", this.mouseUpEvent), this.table.rowManager.element.removeEventListener("keydown", this.keyDownEvent);
          }
          selectedRows(e2) {
            return e2 ? this.activeRange.getRows().map((e3) => e3.getComponent()) : this.activeRange.getRows();
          }
          selectedColumns(e2) {
            return e2 ? this.activeRange.getColumns().map((e3) => e3.getComponent()) : this.activeRange.getColumns();
          }
          isEmpty(e2) {
            return null == e2 || "" === e2;
          }
        }, __publicField(_q, "moduleName", "selectRange"), __publicField(_q, "moduleInitOrder", 1), __publicField(_q, "moduleExtensions", Ie), _q), SelectRowModule: (_r2 = class extends M {
          constructor(e2) {
            super(e2), this.selecting = false, this.lastClickedRow = false, this.selectPrev = [], this.selectedRows = [], this.headerCheckboxElement = null, this.registerTableOption("selectableRows", "highlight"), this.registerTableOption("selectableRowsRangeMode", "drag"), this.registerTableOption("selectableRowsRollingSelection", true), this.registerTableOption("selectableRowsPersistence", true), this.registerTableOption("selectableRowsCheck", function(e3, t2) {
              return true;
            }), this.registerTableFunction("selectRow", this.selectRows.bind(this)), this.registerTableFunction("deselectRow", this.deselectRows.bind(this)), this.registerTableFunction("toggleSelectRow", this.toggleRow.bind(this)), this.registerTableFunction("getSelectedRows", this.getSelectedRows.bind(this)), this.registerTableFunction("getSelectedData", this.getSelectedData.bind(this)), this.registerComponentFunction("row", "select", this.selectRows.bind(this)), this.registerComponentFunction("row", "deselect", this.deselectRows.bind(this)), this.registerComponentFunction("row", "toggleSelect", this.toggleRow.bind(this)), this.registerComponentFunction("row", "isSelected", this.isRowSelected.bind(this));
          }
          initialize() {
            this.deprecatedOptionsCheck(), "highlight" === this.table.options.selectableRows && this.table.options.selectableRange && (this.table.options.selectableRows = false), false !== this.table.options.selectableRows && (this.subscribe("row-init", this.initializeRow.bind(this)), this.subscribe("row-deleting", this.rowDeleted.bind(this)), this.subscribe("rows-wipe", this.clearSelectionData.bind(this)), this.subscribe("rows-retrieve", this.rowRetrieve.bind(this)), this.table.options.selectableRows && !this.table.options.selectableRowsPersistence && this.subscribe("data-refreshing", this.deselectRows.bind(this)));
          }
          deprecatedOptionsCheck() {
          }
          rowRetrieve(e2, t2) {
            return "selected" === e2 ? this.selectedRows : t2;
          }
          rowDeleted(e2) {
            this._deselectRow(e2, true);
          }
          clearSelectionData(e2) {
            var t2 = this.selectedRows.length;
            this.selecting = false, this.lastClickedRow = false, this.selectPrev = [], this.selectedRows = [], t2 && true !== e2 && this._rowSelectionChanged();
          }
          initializeRow(e2) {
            var t2 = this, i2 = t2.checkRowSelectability(e2), s2 = e2.getElement(), o2 = function() {
              setTimeout(function() {
                t2.selecting = false;
              }, 50), document.body.removeEventListener("mouseup", o2);
            };
            e2.modules.select = { selected: false }, s2.classList.toggle("tabulator-selectable", i2), s2.classList.toggle("tabulator-unselectable", !i2), t2.checkRowSelectability(e2) && t2.table.options.selectableRows && "highlight" != t2.table.options.selectableRows && ("click" === t2.table.options.selectableRowsRangeMode ? s2.addEventListener("click", this.handleComplexRowClick.bind(this, e2)) : (s2.addEventListener("click", function(i3) {
              t2.table.modExists("edit") && t2.table.modules.edit.getCurrentCell() || t2.table._clearSelection(), t2.selecting || t2.toggleRow(e2);
            }), s2.addEventListener("mousedown", function(i3) {
              if (i3.shiftKey)
                return t2.table._clearSelection(), t2.selecting = true, t2.selectPrev = [], document.body.addEventListener("mouseup", o2), document.body.addEventListener("keyup", o2), t2.toggleRow(e2), false;
            }), s2.addEventListener("mouseenter", function(i3) {
              t2.selecting && (t2.table._clearSelection(), t2.toggleRow(e2), t2.selectPrev[1] == e2 && t2.toggleRow(t2.selectPrev[0]));
            }), s2.addEventListener("mouseout", function(i3) {
              t2.selecting && (t2.table._clearSelection(), t2.selectPrev.unshift(e2));
            })));
          }
          handleComplexRowClick(e2, t2) {
            if (t2.shiftKey) {
              this.table._clearSelection(), this.lastClickedRow = this.lastClickedRow || e2;
              var i2 = this.table.rowManager.getDisplayRowIndex(this.lastClickedRow), s2 = this.table.rowManager.getDisplayRowIndex(e2), o2 = i2 <= s2 ? i2 : s2, n2 = i2 >= s2 ? i2 : s2, r2 = this.table.rowManager.getDisplayRows().slice(0).splice(o2, n2 - o2 + 1);
              t2.ctrlKey || t2.metaKey ? (r2.forEach((t3) => {
                t3 !== this.lastClickedRow && (true === this.table.options.selectableRows || this.isRowSelected(e2) || this.selectedRows.length < this.table.options.selectableRows) && this.toggleRow(t3);
              }), this.lastClickedRow = e2) : (this.deselectRows(void 0, true), true !== this.table.options.selectableRows && r2.length > this.table.options.selectableRows && (r2 = r2.slice(0, this.table.options.selectableRows)), this.selectRows(r2)), this.table._clearSelection();
            } else
              t2.ctrlKey || t2.metaKey ? (this.toggleRow(e2), this.lastClickedRow = e2) : (this.deselectRows(void 0, true), this.selectRows(e2), this.lastClickedRow = e2);
          }
          checkRowSelectability(e2) {
            return !(!e2 || "row" !== e2.type) && this.table.options.selectableRowsCheck.call(this.table, e2.getComponent());
          }
          toggleRow(e2) {
            this.checkRowSelectability(e2) && (e2.modules.select && e2.modules.select.selected ? this._deselectRow(e2) : this._selectRow(e2));
          }
          selectRows(e2) {
            var t2, i2, s2 = [];
            switch (typeof e2) {
              case "undefined":
                t2 = this.table.rowManager.rows;
                break;
              case "number":
                t2 = this.table.rowManager.findRow(e2);
                break;
              case "string":
                (t2 = this.table.rowManager.findRow(e2)) || (t2 = this.table.rowManager.getRows(e2));
                break;
              default:
                t2 = e2;
            }
            Array.isArray(t2) ? t2.length && (t2.forEach((e3) => {
              (i2 = this._selectRow(e3, true, true)) && s2.push(i2);
            }), this._rowSelectionChanged(false, s2)) : t2 && this._selectRow(t2, false, true);
          }
          _selectRow(e2, t2, i2) {
            if (!isNaN(this.table.options.selectableRows) && true !== this.table.options.selectableRows && !i2 && this.selectedRows.length >= this.table.options.selectableRows) {
              if (!this.table.options.selectableRowsRollingSelection)
                return false;
              this._deselectRow(this.selectedRows[0]);
            }
            var s2 = this.table.rowManager.findRow(e2);
            if (s2) {
              if (-1 == this.selectedRows.indexOf(s2))
                return s2.getElement().classList.add("tabulator-selected"), s2.modules.select || (s2.modules.select = {}), s2.modules.select.selected = true, s2.modules.select.checkboxEl && (s2.modules.select.checkboxEl.checked = true), this.selectedRows.push(s2), this.table.options.dataTreeSelectPropagate && this.childRowSelection(s2, true), this.dispatchExternal("rowSelected", s2.getComponent()), this._rowSelectionChanged(t2, s2), s2;
            } else
              t2 || console.warn("Selection Error - No such row found, ignoring selection:" + e2);
          }
          isRowSelected(e2) {
            return -1 !== this.selectedRows.indexOf(e2);
          }
          deselectRows(e2, t2) {
            var i2, s2, o2 = [];
            switch (typeof e2) {
              case "undefined":
                i2 = Object.assign([], this.selectedRows);
                break;
              case "number":
                i2 = this.table.rowManager.findRow(e2);
                break;
              case "string":
                (i2 = this.table.rowManager.findRow(e2)) || (i2 = this.table.rowManager.getRows(e2));
                break;
              default:
                i2 = e2;
            }
            Array.isArray(i2) ? i2.length && (i2.forEach((e3) => {
              (s2 = this._deselectRow(e3, true, true)) && o2.push(s2);
            }), this._rowSelectionChanged(t2, [], o2)) : i2 && this._deselectRow(i2, t2, true);
          }
          _deselectRow(e2, t2) {
            var i2, s2, o2 = this, n2 = o2.table.rowManager.findRow(e2);
            if (n2) {
              if ((i2 = o2.selectedRows.findIndex(function(e3) {
                return e3 == n2;
              })) > -1)
                return (s2 = n2.getElement()) && s2.classList.remove("tabulator-selected"), n2.modules.select || (n2.modules.select = {}), n2.modules.select.selected = false, n2.modules.select.checkboxEl && (n2.modules.select.checkboxEl.checked = false), o2.selectedRows.splice(i2, 1), this.table.options.dataTreeSelectPropagate && this.childRowSelection(n2, false), this.dispatchExternal("rowDeselected", n2.getComponent()), o2._rowSelectionChanged(t2, void 0, n2), n2;
            } else
              t2 || console.warn("Deselection Error - No such row found, ignoring selection:" + e2);
          }
          getSelectedData() {
            var e2 = [];
            return this.selectedRows.forEach(function(t2) {
              e2.push(t2.getData());
            }), e2;
          }
          getSelectedRows() {
            var e2 = [];
            return this.selectedRows.forEach(function(t2) {
              e2.push(t2.getComponent());
            }), e2;
          }
          _rowSelectionChanged(e2, t2 = [], i2 = []) {
            this.headerCheckboxElement && (0 === this.selectedRows.length ? (this.headerCheckboxElement.checked = false, this.headerCheckboxElement.indeterminate = false) : this.table.rowManager.rows.length === this.selectedRows.length ? (this.headerCheckboxElement.checked = true, this.headerCheckboxElement.indeterminate = false) : (this.headerCheckboxElement.indeterminate = true, this.headerCheckboxElement.checked = false)), e2 || (Array.isArray(t2) || (t2 = [t2]), t2 = t2.map((e3) => e3.getComponent()), Array.isArray(i2) || (i2 = [i2]), i2 = i2.map((e3) => e3.getComponent()), this.dispatchExternal("rowSelectionChanged", this.getSelectedData(), this.getSelectedRows(), t2, i2));
          }
          registerRowSelectCheckbox(e2, t2) {
            e2._row.modules.select || (e2._row.modules.select = {}), e2._row.modules.select.checkboxEl = t2;
          }
          registerHeaderSelectCheckbox(e2) {
            this.headerCheckboxElement = e2;
          }
          childRowSelection(e2, t2) {
            var i2 = this.table.modules.dataTree.getChildren(e2, true, true);
            if (t2)
              for (let e3 of i2)
                this._selectRow(e3, true);
            else
              for (let e3 of i2)
                this._deselectRow(e3, true);
          }
        }, __publicField(_r2, "moduleName", "selectRow"), __publicField(_r2, "moduleExtensions", Ae), _r2), SortModule: je, SpreadsheetModule: (_s = class extends M {
          constructor(e2) {
            super(e2), this.sheets = [], this.element = null, this.registerTableOption("spreadsheet", false), this.registerTableOption("spreadsheetRows", 50), this.registerTableOption("spreadsheetColumns", 50), this.registerTableOption("spreadsheetColumnDefinition", {}), this.registerTableOption("spreadsheetOutputFull", false), this.registerTableOption("spreadsheetData", false), this.registerTableOption("spreadsheetSheets", false), this.registerTableOption("spreadsheetSheetTabs", false), this.registerTableOption("spreadsheetSheetTabsElement", false), this.registerTableFunction("setSheets", this.setSheets.bind(this)), this.registerTableFunction("addSheet", this.addSheet.bind(this)), this.registerTableFunction("getSheets", this.getSheets.bind(this)), this.registerTableFunction("getSheetDefinitions", this.getSheetDefinitions.bind(this)), this.registerTableFunction("setSheetData", this.setSheetData.bind(this)), this.registerTableFunction("getSheet", this.getSheet.bind(this)), this.registerTableFunction("getSheetData", this.getSheetData.bind(this)), this.registerTableFunction("clearSheet", this.clearSheet.bind(this)), this.registerTableFunction("removeSheet", this.removeSheetFunc.bind(this)), this.registerTableFunction("activeSheet", this.activeSheetFunc.bind(this));
          }
          initialize() {
            this.options("spreadsheet") && (this.subscribe("table-initialized", this.tableInitialized.bind(this)), this.subscribe("data-loaded", this.loadRemoteData.bind(this)), this.table.options.index = "_id", this.options("spreadsheetData") && this.options("spreadsheetSheets") && (console.warn("You cannot use spreadsheetData and spreadsheetSheets at the same time, ignoring spreadsheetData"), this.table.options.spreadsheetData = false), this.compatibilityCheck(), this.options("spreadsheetSheetTabs") && this.initializeTabset());
          }
          compatibilityCheck() {
            this.options("data") && console.warn("Do not use the data option when working with spreadsheets, use either spreadsheetData or spreadsheetSheets to pass data into the table"), this.options("pagination") && console.warn("The spreadsheet module is not compatible with the pagination module"), this.options("groupBy") && console.warn("The spreadsheet module is not compatible with the row grouping module"), this.options("responsiveCollapse") && console.warn("The spreadsheet module is not compatible with the responsive collapse module");
          }
          initializeTabset() {
            this.element = document.createElement("div"), this.element.classList.add("tabulator-spreadsheet-tabs");
            var e2 = this.options("spreadsheetSheetTabsElement");
            !e2 || e2 instanceof HTMLElement || (e2 = document.querySelector(e2)) || console.warn("Unable to find element matching spreadsheetSheetTabsElement selector:", this.options("spreadsheetSheetTabsElement")), e2 ? e2.appendChild(this.element) : this.footerAppend(this.element);
          }
          tableInitialized() {
            this.sheets.length ? this.loadSheet(this.sheets[0]) : this.options("spreadsheetSheets") ? this.loadSheets(this.options("spreadsheetSheets")) : this.options("spreadsheetData") && this.loadData(this.options("spreadsheetData"));
          }
          loadRemoteData(e2, t2, i2) {
            return console.log("data", e2, t2, i2), Array.isArray(e2) ? (this.table.dataLoader.clearAlert(), this.dispatchExternal("dataLoaded", e2), !e2.length || Array.isArray(e2[0]) ? this.loadData(e2) : this.loadSheets(e2)) : console.error("Spreadsheet Loading Error - Unable to process remote data due to invalid data type \nExpecting: array \nReceived: ", typeof e2, "\nData:     ", e2), false;
          }
          loadData(e2) {
            var t2 = { data: e2 };
            this.loadSheet(this.newSheet(t2));
          }
          destroySheets() {
            this.sheets.forEach((e2) => {
              e2.destroy();
            }), this.sheets = [], this.activeSheet = null;
          }
          loadSheets(e2) {
            Array.isArray(e2) || (e2 = []), this.destroySheets(), e2.forEach((e3) => {
              this.newSheet(e3);
            }), this.loadSheet(this.sheets[0]);
          }
          loadSheet(e2) {
            this.activeSheet !== e2 && (this.activeSheet && this.activeSheet.unload(), this.activeSheet = e2, e2.load());
          }
          newSheet(e2 = {}) {
            var t2;
            return e2.rows || (e2.rows = this.options("spreadsheetRows")), e2.columns || (e2.columns = this.options("spreadsheetColumns")), t2 = new Xe(this, e2), this.sheets.push(t2), this.element && this.element.appendChild(t2.element), t2;
          }
          removeSheet(e2) {
            var t2, i2 = this.sheets.indexOf(e2);
            this.sheets.length > 1 ? i2 > -1 && (this.sheets.splice(i2, 1), e2.destroy(), this.activeSheet === e2 && ((t2 = this.sheets[i2 - 1] || this.sheets[0]) ? this.loadSheet(t2) : this.activeSheet = null)) : console.warn("Unable to remove sheet, at least one sheet must be active");
          }
          lookupSheet(e2) {
            return e2 ? e2 instanceof Xe ? e2 : e2 instanceof Ue ? e2._sheet : this.sheets.find((t2) => t2.key === e2) || false : this.activeSheet;
          }
          setSheets(e2) {
            return this.loadSheets(e2), this.getSheets();
          }
          addSheet(e2) {
            return this.newSheet(e2).getComponent();
          }
          getSheetDefinitions() {
            return this.sheets.map((e2) => e2.getDefinition());
          }
          getSheets() {
            return this.sheets.map((e2) => e2.getComponent());
          }
          getSheet(e2) {
            var t2 = this.lookupSheet(e2);
            return !!t2 && t2.getComponent();
          }
          setSheetData(e2, t2) {
            e2 && !t2 && (t2 = e2, e2 = false);
            var i2 = this.lookupSheet(e2);
            return !!i2 && i2.setData(t2);
          }
          getSheetData(e2) {
            var t2 = this.lookupSheet(e2);
            return !!t2 && t2.getData();
          }
          clearSheet(e2) {
            var t2 = this.lookupSheet(e2);
            return !!t2 && t2.clear();
          }
          removeSheetFunc(e2) {
            var t2 = this.lookupSheet(e2);
            t2 && this.removeSheet(t2);
          }
          activeSheetFunc(e2) {
            var t2 = this.lookupSheet(e2);
            return !!t2 && this.loadSheet(t2);
          }
        }, __publicField(_s, "moduleName", "spreadsheet"), _s), TooltipModule: (_t = class extends M {
          constructor(e2) {
            super(e2), this.tooltipSubscriber = null, this.headerSubscriber = null, this.timeout = null, this.popupInstance = null, this.registerTableOption("tooltipDelay", 300), this.registerColumnOption("tooltip"), this.registerColumnOption("headerTooltip");
          }
          initialize() {
            this.deprecatedOptionsCheck(), this.subscribe("column-init", this.initializeColumn.bind(this));
          }
          deprecatedOptionsCheck() {
          }
          initializeColumn(e2) {
            e2.definition.headerTooltip && !this.headerSubscriber && (this.headerSubscriber = true, this.subscribe("column-mousemove", this.mousemoveCheck.bind(this, "headerTooltip")), this.subscribe("column-mouseout", this.mouseoutCheck.bind(this, "headerTooltip"))), e2.definition.tooltip && !this.tooltipSubscriber && (this.tooltipSubscriber = true, this.subscribe("cell-mousemove", this.mousemoveCheck.bind(this, "tooltip")), this.subscribe("cell-mouseout", this.mouseoutCheck.bind(this, "tooltip")));
          }
          mousemoveCheck(e2, t2, i2) {
            var s2 = "tooltip" === e2 ? i2.column.definition.tooltip : i2.definition.headerTooltip;
            s2 && (this.clearPopup(), this.timeout = setTimeout(this.loadTooltip.bind(this, t2, i2, s2), this.table.options.tooltipDelay));
          }
          mouseoutCheck(e2, t2, i2) {
            this.popupInstance || this.clearPopup();
          }
          clearPopup(e2, t2, i2) {
            clearTimeout(this.timeout), this.timeout = null, this.popupInstance && this.popupInstance.hide();
          }
          loadTooltip(e2, t2, i2) {
            var s2, o2, r2;
            "function" == typeof i2 && (i2 = i2(e2, t2.getComponent(), function(e3) {
              o2 = e3;
            })), i2 instanceof HTMLElement ? s2 = i2 : (s2 = document.createElement("div"), true === i2 && (t2 instanceof n ? i2 = t2.value : t2.definition.field ? this.langBind("columns|" + t2.definition.field, (e3) => {
              s2.innerHTML = i2 = e3 || t2.definition.title;
            }) : i2 = t2.definition.title), s2.innerHTML = i2), (i2 || 0 === i2 || false === i2) && (s2.classList.add("tabulator-tooltip"), s2.addEventListener("mousemove", (e3) => e3.preventDefault()), this.popupInstance = this.popup(s2), "function" == typeof o2 && this.popupInstance.renderCallback(o2), r2 = this.popupInstance.containerEventCoords(e2), this.popupInstance.show(r2.x + 15, r2.y + 15).hideOnBlur(() => {
              this.dispatchExternal("TooltipClosed", t2.getComponent()), this.popupInstance = null;
            }), this.dispatchExternal("TooltipOpened", t2.getComponent()));
          }
        }, __publicField(_t, "moduleName", "tooltip"), _t), ValidateModule: qe });
        var Ye = class extends O {
          static extendModule() {
            O.initializeModuleBinder(Ke), O._extendModule(...arguments);
          }
          static registerModule() {
            O.initializeModuleBinder(Ke), O._registerModule(...arguments);
          }
          constructor(e2, t2, i2) {
            super(e2, t2, Ke);
          }
        };
        return Ye;
      });
    }
  });

  // ../mysys_barcode/mysys_barcode/public/js/mysys_barcode_tool.bundle.js
  var import_tabulator_min = __toESM(require_tabulator_min());

  // ../mysys_barcode/mysys_barcode/public/js/mysys_barcode_tool.js
  window.mysys = {};
  mysys.print_barcode = function(cur_frm2) {
    cur_frm2.add_custom_button(
      __("Print Barcode"),
      function() {
        var _a;
        let pstyle = "border: 1px solid #efefef; padding: 5px";
        var items = [];
        if ((_a = cur_frm2 == null ? void 0 : cur_frm2.doc) == null ? void 0 : _a.items) {
          cur_frm2.doc.items.forEach((i) => {
            items.push(i.item_code);
          });
        }
        console.log(items);
        if (items.length > 0) {
          frappe.call({
            args: {
              items
            },
            freeze: true,
            freeze_message: __("Fetching Barcode ..."),
            method: "mysys.mysys_barcode_tool.get_barcode",
            callback: function(r) {
              console.log(r);
              if (!r.message)
                return;
              var barcode = r.message[0];
              var printFormat = r.message[1];
              var item_price = r.message[2];
              var dynamicId = "example-table-" + Math.random().toString(36).substr(2, 9);
              var d = new frappe.ui.Dialog({
                title: __("Print Barcode"),
                size: "extra-large",
                fields: [
                  {
                    "fieldname": "company",
                    "fieldtype": "Data",
                    "label": __("Company"),
                    "reqd": 1
                  },
                  {
                    "fieldname": "clreomunw",
                    "fieldtype": "Column Break"
                  },
                  {
                    "fieldname": "print_format",
                    "fieldtype": "Link",
                    "label": __("Print Format"),
                    "options": "Print Format",
                    "reqd": 1,
                    "default": printFormat
                  },
                  {
                    "fieldname": "clreomunw",
                    "fieldtype": "Column Break"
                  },
                  {
                    "fieldname": "print",
                    "fieldtype": "Button",
                    "label": __("Print"),
                    onclick: function() {
                      console.log(barcode);
                    }
                  },
                  {
                    "fieldname": "crerlomunw",
                    "fieldtype": "Section Break"
                  },
                  {
                    "fieldname": "html",
                    "fieldtype": "HTML",
                    "label": __("Items"),
                    options: `<div id="${dynamicId}"></div>`
                  }
                ]
              });
              d.fields_dict.print.onclick = function() {
                console.log(d.get_value("print_format"));
                var barcodes = cur_frm2.currentTabulator.getSelectedRows();
                var bat = [];
                barcodes.forEach((b) => {
                  var roww = {
                    item_code: b.getData().item_code,
                    barcode: b.getData().barcode,
                    item_name: b.getData().item_name,
                    qty: (b.getData().print_qty ? b.getData().print_qty : b.getData().qty) || 1,
                    item_price: b.getData().item_price
                  };
                  bat.push(roww);
                });
                frappe.call({
                  method: "mysys.mysys_barcode_tool.get_url_path",
                  callback: function(r2) {
                    if (r2.message) {
                      if (bat.length > 0) {
                        localStorage.setItem("print_parcode", JSON.stringify(bat));
                        let newUrl = r2.message.includes("?") ? `${r2.message}/mysys_print&company=${d.get_value("company")}` : `${r2.message}/mysys_print?company=${d.get_value("company")}`;
                        window.open(newUrl, "_blank");
                      } else {
                        frappe.msgprint("\u0627\u0644\u0631\u062C\u0627\u0621 \u062A\u062D\u062F\u062F \u0639\u0646\u0635\u0631 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0627\u0642\u0644");
                      }
                    } else {
                      console.error("Invalid URL received.");
                    }
                  }
                });
              };
              d.show();
              if (cur_frm2.currentTabulator) {
                cur_frm2.currentTabulator.destroy();
              }
              setTimeout(() => {
                render_table(cur_frm2, barcode, dynamicId);
              }, 500);
            }
          });
        }
      }
    );
  };
  var render_table = (frm, barcode, dynamicId) => {
    console.log("render_table", frm, barcode);
    var action_column = [
      {
        headerHozAlign: "center",
        hozAlign: "center",
        field: "idx",
        title: __("#")
      },
      {
        headerHozAlign: "center",
        hozAlign: "center",
        formatter: "rowSelection",
        titleFormatter: "rowSelection",
        cellClick: function(e, cell) {
          cell.getRow().toggleSelect();
        }
      },
      {
        field: "item_code",
        title: __("Item"),
        formatter: function(cell) {
          var _a;
          if (!((_a = cell.getRow().getData()) == null ? void 0 : _a.is_group))
            return `<span style="display: inline-block;">${cell.getValue()}</span> : <span style="display: inline-block;" class="item-name">${cell.getRow().getData().item_name}</span>`;
          else
            return "";
        },
        width: 270
      },
      {
        title: __("Qty"),
        field: "qty",
        width: 120,
        formatter: "money",
        formatterParams: {
          decimal: ".",
          thousand: ",",
          precision: false
        }
      },
      {
        title: __("Print Qty"),
        field: "print_qty",
        width: 144,
        formatter: "money",
        formatterParams: {
          decimal: ".",
          thousand: ",",
          precision: false
        },
        editor: true
      },
      {
        title: __("Rate"),
        field: "item_price",
        width: 144,
        formatter: "money",
        formatterParams: {
          decimal: ".",
          thousand: ",",
          precision: false
        }
      },
      {
        field: "barcode",
        title: __("Barcode"),
        visible: true
      },
      {
        field: "row_id",
        title: __("Detail Name"),
        visible: false
      },
      {
        field: "name",
        title: __("Name"),
        visible: false
      }
    ];
    var data = [];
    cur_frm.doc.items.forEach((ro) => {
      const item = barcode.find((i) => i.item_code === ro.item_code);
      console.log(item);
      if (item) {
        var row = __spreadProps(__spreadValues({}, ro), {
          barcode: item.barcode,
          item_price: item.item_price
        });
        data.push(row);
      } else {
        console.warn(`Item not found for item_code: ${ro.item_code}`);
      }
    });
    console.log(data);
    cur_frm.currentTabulator = new Tabulator(`#${dynamicId}`, {
      data,
      dataTree: true,
      columnDefaults: {
        headerSort: false,
        resizable: "header"
      },
      index: "name",
      selectableRows: true,
      columns: action_column
    });
    cur_frm.currentTabulator.on("rowClick", function(e, row) {
      var data2 = row.getData();
      var type = $(e.target).data("type");
      if (type != "Reviews") {
      }
    });
    console.log("Tabulator initialized with data:", cur_frm.currentTabulator, data);
  };
})();
//# sourceMappingURL=mysys_barcode_tool.bundle.RMTCISPW.js.map
