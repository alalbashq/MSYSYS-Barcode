window.mysys = {};

mysys.print_barcode = function (cur_frm) {
    cur_frm.add_custom_button(
        __("Print Barcode"), function () {
            let pstyle = 'border: 1px solid #efefef; padding: 5px';

            var items = [];
            if (cur_frm?.doc?.items) {
                cur_frm.doc.items.forEach(i => {
                    items.push(i.item_code);
                });
            }
            console.log(items);
            if (items.length > 0) {
                frappe.call({
                    args: {
                        items: items,
                    },
                    freeze: true,
                    freeze_message: __("Fetching Barcode ..."),
                    method: "mysys.mysys_barcode_tool.get_barcode",
                    callback: function (r) {
                        console.log(r);
                        if (!r.message) return;

                        var barcode = r.message[0];
                        var printFormat = r.message[1];
                        var item_price = r.message[2];
                        var dynamicId = "example-table-" + Math.random().toString(36).substr(2, 9); // توليد ID ديناميكي

                        var d = new frappe.ui.Dialog({
                            title: __("Print Barcode"),
                            size: "extra-large",
                            fields: [
                                {
                                    "fieldname": "company",
                                    "fieldtype": "Data",
                                    "label": __("Company"),                                   
                                    "reqd": 1,
                                },
                                {
                                    "fieldname": "clreomunw",
                                    "fieldtype": "Column Break",
                                },
                                {
                                    "fieldname": "print_format",
                                    "fieldtype": "Link",
                                    "label": __("Print Format"),
                                    "options": "Print Format",
                                    "reqd": 1,
                                    "default": printFormat,
                                },
                                {
                                    "fieldname": "clreomunw",
                                    "fieldtype": "Column Break",
                                },
                                {
                                    "fieldname": "print",
                                    "fieldtype": "Button",
                                    "label": __("Print"),
                                    onclick: function () {
                                        console.log(barcode);
                                    }
                                },
                                {
                                    "fieldname": "crerlomunw",
                                    "fieldtype": "Section Break",
                                },
                                {
                                    "fieldname": "html",
                                    "fieldtype": "HTML",
                                    "label": __("Items"),
                                    options: `<div id="${dynamicId}"></div>`, // استخدام ID الديناميكي
                                },
                            ],
                        });
                        d.fields_dict.print.onclick = function () {
                            console.log(d.get_value("print_format"))
                            // if (d.get_value("print_format")) {
                                var barcodes = cur_frm.currentTabulator.getSelectedRows();
                                var bat = [];
                                barcodes.forEach(b => {
                                    var roww = {
                                        item_code: b.getData().item_code,
                                        barcode: b.getData().barcode,
                                        item_name: b.getData().item_name,
                                        qty: (b.getData().print_qty? b.getData().print_qty: b.getData().qty) || 1,
                                        item_price: b.getData().item_price
                                    };

                                    bat.push(roww);
                                });

                                frappe.call({
                                    method: "mysys.mysys_barcode_tool.get_url_path",
                                    callback: function (r) {
                                        // Check if the response has a valid message
                                        if (r.message) {
                                            // Construct the URL correctly
                                            if(bat.length > 0){
                                                localStorage.setItem('print_parcode', JSON.stringify(bat));
                                                let newUrl = r.message.includes('?') ? `${r.message}/mysys_print&company=${d.get_value("company")}` : `${r.message}/mysys_print?company=${d.get_value("company")}`;
                                                window.open(newUrl, '_blank');  
                                            }else{
                                                frappe.msgprint("الرجاء تحدد عنصر واحد على الاقل");
                                            }
                                            
                                        } else {
                                            console.error("Invalid URL received.");
                                        }
                                    }
                                });
                            // }
                        }
                        d.show();

                        // تأكد من تدمير Tabulator القديم إذا كان موجودًا
                        if (cur_frm.currentTabulator) {
                            cur_frm.currentTabulator.destroy();
                        }

                        setTimeout(() => {
                            render_table(cur_frm, barcode, dynamicId); // تمرير ID الديناميكي إلى الدالة
                        }, 500);
                    }
                });
            }
        }
    );
}

let render_table = (frm, barcode, dynamicId) => {
    console.log("render_table", frm, barcode);
    var action_column = [
        {
            headerHozAlign: "center",
            hozAlign: "center",
            field: "idx",
            title: __("#"),
        },
        {
            headerHozAlign: "center",
            hozAlign: "center",
            formatter: "rowSelection",
            titleFormatter: "rowSelection",
            cellClick: function (e, cell) {
                cell.getRow().toggleSelect();
            },
        },
        {
            field: "item_code",
            title: __("Item"),
            formatter: function (cell) {
                if (!cell.getRow().getData()?.is_group)
                    return `<span style="display: inline-block;">${cell.getValue()}</span> : <span style="display: inline-block;" class="item-name">${cell.getRow().getData().item_name}</span>`;
                else
                    return "";
            },
            width: 270,
        },
        {
            title: __("Qty"),
            field: "qty",
            width: 120,
            formatter: "money",
            formatterParams: {
                decimal: ".",
                thousand: ",",
                precision: false,
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
                precision: false,
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
                precision: false,
            },
            // editor: true
        },
        // {
        //     field: "reviews",
        //     title: __("Print Reviews"),
        //     width: 120,
        //     formatter: function (cell) {
        //         if (!cell.getRow().getData()?.is_group)
        //             return `<span class="activity-status-${cell.getRow().getData().receipt == 1 ? "closed" : "open"}" data-type="Reviews">${__("Print")}</span>`;
        //         else
        //             return ``;
        //     },
        // },
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
        },
    ];

    // بناء البيانات
    var data = [];
    cur_frm.doc.items.forEach(ro => {
        // Find the matching item in the barcode array
        const item = barcode.find(i => i.item_code === ro.item_code);
        console.log(item)
        // Check if the item exists to avoid TypeError
        if (item) {
            var row = {
                ...ro, // Spread the original item properties
                barcode: item.barcode, // Assign the found barcode
                item_price: item.item_price // Assign the found item price
            };
            data.push(row); // Add the new row to the data array
        } else {
            // Optionally handle items not found in the barcode array
            console.warn(`Item not found for item_code: ${ro.item_code}`);
        }
    });
    
    // Now 'data' contains the updated items with barcodes and prices
    console.log(data);
 
    // إنشاء Tabulator جديد باستخدام ID الديناميكي
    cur_frm.currentTabulator = new Tabulator(`#${dynamicId}`, {
        data: data,
        dataTree: true,
        columnDefaults: {
            headerSort: false,
            resizable: "header",
        },
        index: "name",
        selectableRows: true,
        columns: action_column,
    })
    cur_frm.currentTabulator.on("rowClick", function (e, row) {
        var data = row.getData();
        var type = $(e.target).data("type");
        if (type != "Reviews") {
            // أي منطق آخر هنا...
        }
    });

    console.log("Tabulator initialized with data:", cur_frm.currentTabulator, data);
}