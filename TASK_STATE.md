أنت تعمل داخل مشروع Frappe/ERPNext موجود مسبقاً، وفيه صفحة Barcode Studio موجودة بالفعل على الروت:

/barcode-studio

الصفحة الحالية فيها مصمم باركود تقريباً يحتوي على:

* اختيار Template
* أزرار Reload / Save
* Insert / Text / Barcode / Clear
* Zoom
* Guides / Grid
* تحديد حجم الاستيكر
* منطقة Design
* منطقة Preview
* Fields Sidebar
* Properties Panel
* زر Print

المطلوب الآن هو إكمال النظام الحالي وليس إعادة بنائه من الصفر.

==================================================
الفكرة العامة
=============

أريد إنشاء DocType جديد باسم:

Barcode DocType

وظيفته تحديد الـ DocType الذي سيتم تصميم الباركود له، وتحديد الحقول المسموح ظهورها في Barcode Studio.

حالياً لا أريد أن تظهر كل حقول الـ DocType في المصمم.

المطلوب أن تظهر فقط الحقول التي يتم تحديدها داخل Barcode DocType.

كذلك يجب دعم الحقول من:

1. مستوى المستند الرئيسي Document
2. مستوى Child Table

لكن مع ملاحظة مهمة جداً:

Barcode Studio لا يتعامل مع الجداول الفرعية مباشرة.
Barcode Studio لا يقرأ doc.items أو أي Arrays أو Nested Objects.
Barcode Studio يستقبل فقط قاموس بيانات جاهز Flat Dictionary من:

frappe.route_options

ويستخدم binding_key فقط لجلب القيمة.

مثال:

const value = renderData[element.binding_key];

ولا يتم استخدام أي منطق مثل:
doc.items[0]
child.items
nested paths
eval

==================================================

1. إنشاء DocType رئيسي: Barcode DocType
   ==================================================

أنشئ DocType جديد باسم:

Barcode DocType

الحقول المطلوبة:

1. title

* Type: Data
* Label: Title
* Mandatory: Yes

2. target_doctype

* Type: Link
* Options: DocType
* Label: Target DocType
* Mandatory: Yes
* يمثل الـ DocType الذي سيتم تصميم الباركود له، مثل:

  * Item
  * Sales Invoice
  * Purchase Receipt
  * Stock Entry

3. enabled

* Type: Check
* Label: Enabled
* Default: 1

4. fields

* Type: Table
* Options: Barcode DocType Field
* Label: Allowed Fields
* يحتوي على الحقول المسموح ظهورها في Barcode Studio

==================================================
2. إنشاء Child Table: Barcode DocType Field
===========================================

أنشئ Child Table باسم:

Barcode DocType Field

الحقول المطلوبة:

1. source_level

* Type: Select
* Label: Source Level
* Options:
  Document
  Child Table
* Mandatory: Yes
* إذا كان Document يتم اختيار الحقل من مستوى المستند الرئيسي.
* إذا كان Child Table يتم اختيار حقل جدول فرعي ثم حقل من داخل هذا الجدول.

2. child_table_field

* Type: Link أو Data حسب الأنسب فنياً
* Label: Child Table
* يظهر فقط إذا source_level = Child Table
* يجب أن يعرض فقط الحقول من نوع Table الموجودة داخل target_doctype.
* مثال:
  إذا target_doctype = Sales Invoice
  تظهر حقول مثل:
  items
  taxes
  payment_schedule

3. child_doctype

* Type: Link
* Options: DocType
* Label: Child DocType
* Read Only
* يتم تعبئته تلقائياً من options الخاص بحقل child_table_field.
* مثال:
  child_table_field = items
  child_doctype = Sales Invoice Item

4. fieldname

* Type: Link أو Data حسب الأنسب
* Label: Field
* Mandatory: Yes
* إذا source_level = Document:
  يعرض حقول target_doctype فقط.
* إذا source_level = Child Table:
  يعرض حقول child_doctype فقط.

5. label

* Type: Data
* Label: Display Label
* يتم تعبئته تلقائياً من Label الحقيقي للحقل.
* يمكن للمستخدم تعديله.
* هذا هو الاسم الذي يظهر للمستخدم داخل Barcode Studio في وضع التصميم.

6. fieldtype

* Type: Data
* Label: Field Type
* Read Only
* يتم تعبئته تلقائياً من DocField.

7. options

* Type: Data
* Label: Options
* Read Only
* يتم تعبئته تلقائياً من DocField Options.

8. binding_key

* Type: Data
* Label: Binding Key
* Read Only
* يتم توليده تلقائياً.
* هذا المفتاح هو الذي يستخدمه Barcode Studio للحصول على القيمة من frappe.route_options
* لا يحتوي على مسارات معقدة.
* لا يحتوي على doc.
* لا يحتوي على child.
* لا يحتوي على indexes.

طريقة توليد binding_key:

إذا كان source_level = Document:

binding_key = fieldname

أمثلة:
item_code
item_name
stock_uom
barcode

إذا كان source_level = Child Table:

binding_key = child_table_field + "_" + fieldname

أمثلة:
items_item_code
items_qty
items_rate
taxes_rate
taxes_tax_amount

9. sample_value

* Type: Data
* Label: Sample Value
* اختياري
* يستخدم في Preview إذا لم تصل render_data أو لم توجد قيمة لهذا binding_key.

10. hidden

* Type: Check
* Label: Hidden
* إذا تم تفعيله لا يظهر الحقل في Barcode Studio.

11. idx

* يستخدم للترتيب الطبيعي داخل الجدول.
* ترتيب الحقول في Barcode Studio يكون حسب ترتيبها في الجدول.

==================================================
3. منطق اختيار الحقول داخل Barcode DocType
==========================================

عند اختيار target_doctype في Barcode DocType:

* جدول fields يعتمد عليه.

إذا اختار المستخدم source_level = Document:

* child_table_field يختفي أو يصبح فارغاً.
* child_doctype يختفي أو يصبح فارغاً.
* fieldname يعرض فقط حقول target_doctype.
* عند اختيار fieldname يتم تعبئة:
  label
  fieldtype
  options
  binding_key = fieldname

إذا اختار المستخدم source_level = Child Table:

* يظهر child_table_field.
* child_table_field يعرض فقط حقول نوعها Table من target_doctype.
* بعد اختيار child_table_field يتم معرفة child_doctype من options الخاص بالحقل.
* fieldname يعرض فقط حقول child_doctype.
* عند اختيار fieldname يتم تعبئة:
  label
  fieldtype
  options
  binding_key = child_table_field + "_" + fieldname

مهم:
يجب تنفيذ هذا المنطق داخل Client Script أو Controller مناسب للـ DocType.

==================================================
4. تعديل Barcode Studio
=======================

في صفحة Barcode Studio الحالية:

لا تعرض كل حقول الـ DocType.

بدلاً من ذلك:

* يتم قراءة إعداد Barcode DocType حسب target_doctype.
* تعرض فقط الحقول الموجودة في جدول fields.
* لا تعرض الحقول التي hidden = 1.

واجهة Fields Sidebar يجب أن تعرض:

* label واضح للمستخدم.
* binding_key أو fieldname بشكل صغير تحت الاسم.

مثال عرض الحقول:

Item Code
item_code

Item Name
item_name

Qty
items_qty

Rate
items_rate

لا تعرض الحقول غير المحددة داخل Barcode DocType.

إذا لم توجد إعدادات Barcode DocType للـ target_doctype المختار، أظهر رسالة واضحة:

No Barcode DocType configuration found for this DocType. Please create one first.

==================================================
5. مصدر بيانات الرندرة داخل Barcode Studio
==========================================

مصدر البيانات الحقيقي داخل Barcode Studio هو:

frappe.route_options

وليس المستند نفسه.

يعني Barcode Studio لا يقوم بجلب المستند ولا تجهيز البيانات ولا قراءة الجداول الفرعية.

مثال فتح Barcode Studio:

frappe.route_options = {
doctype: "Item",
name: "ITEM-0001",
template: "Template-001",
barcode_doctype: "Item Barcode Config",
render_data: {
item_code: "ITEM-0001",
item_name: "غطاء مقود",
stock_uom: "Nos",
barcode: "6281000000012",
items_item_code: "ITEM-0001",
items_qty: "1",
items_rate: "25"
}
};

frappe.set_route("barcode-studio");

داخل Barcode Studio عند التحميل:

const routeOptions = frappe.route_options || {};
const renderData = routeOptions || {};
const selectedDoctype = routeOptions.doctype;
const selectedDocname = routeOptions.name;
const selectedTemplate = routeOptions.template;
const selectedBarcodeDoctype = routeOptions.barcode_doctype;

بعد قراءة frappe.route_options يجب حفظها داخل state داخلي للصفحة حتى لا تضيع عند إعادة الرندرة.

==================================================
6. قاعدة الرندرة الأساسية
=========================

كل عنصر داخل القالب يحتوي على binding_key.

في Preview أو Print يتم عرض القيمة بهذا الشكل فقط:

value = renderData[element.binding_key];

مثال:

element.binding_key = "item_code"

يعرض:

renderData["item_code"]

مثال آخر:

element.binding_key = "items_qty"

يعرض:

renderData["items_qty"]

Barcode Studio لا يعرف هل القيمة جاءت من مستند رئيسي أو من جدول فرعي.
هو فقط يتعامل مع قاموس جاهز.

ممنوع داخل Barcode Studio استخدام:

* eval
* doc.items
* child.items
* arrays
* nested objects
* doc.items[0]
* child.items.item_code
* أي path parser معقد

==================================================
7. سلوك Design و Preview
========================

داخل Design:

* عند إدراج حقل، يظهر label فقط.
* الهدف أن المستخدم يفهم التصميم.

مثال في التصميم:
Item Code
Item Name
Qty
Price

داخل Preview:

* تظهر القيمة الحقيقية من render_data.
* مثال:
  ITEM-0001
  غطاء مقود
  1
  25

إذا لم توجد قيمة داخل render_data:

* استخدم sample_value إذا كانت موجودة.
* إذا لم توجد sample_value اعرض label كـ placeholder.
* لا تكسر التصميم.

المنطق المطلوب:

function getElementDisplayValue(element, mode) {
if (mode === "design") {
return element.label || element.fieldname || element.binding_key || "";
}

if (mode === "preview" || mode === "print") {
const key = element.binding_key;
if (key && renderData && renderData[key] !== undefined && renderData[key] !== null) {
return String(renderData[key]);
}

```
if (element.sample_value) {
  return String(element.sample_value);
}

return element.label || element.fieldname || element.binding_key || "";
```

}
}

==================================================
8. سلوك الإدراج داخل التصميم
============================

عند إدراج حقل داخل التصميم من Fields Sidebar:

في وضع التصميم Design:

* يظهر label للمستخدم.

لكن داخل JSON الخاص بالقالب يجب حفظ metadata كاملة:

مثال حقل من المستند الرئيسي:

{
"type": "text",
"label": "Item Code",
"fieldname": "item_code",
"binding_key": "item_code",
"source_level": "Document",
"child_table_field": null,
"child_doctype": null,
"fieldtype": "Data",
"sample_value": "ITEM-0001",
"x": 10,
"y": 5,
"width": 40,
"height": 8,
"font_size": 10,
"align": "left"
}

مثال حقل مصدره Child Table:

{
"type": "text",
"label": "Qty",
"fieldname": "qty",
"binding_key": "items_qty",
"source_level": "Child Table",
"child_table_field": "items",
"child_doctype": "Sales Invoice Item",
"fieldtype": "Float",
"sample_value": "1",
"x": 10,
"y": 15,
"width": 20,
"height": 8,
"font_size": 10,
"align": "left"
}

مهم:
حتى في Child Table، الرندرة لا تستخدم child_table_field للوصول للقيمة.
الرندرة تستخدم فقط binding_key.

child_table_field و child_doctype يتم حفظهما كـ metadata للفهم والتنظيم والتحقق فقط.

==================================================
9. الباركود Barcode Element
===========================

عند إدراج عنصر Barcode مرتبط بحقل:

يتم حفظ نفس metadata:

{
"type": "barcode",
"label": "Barcode",
"fieldname": "barcode",
"binding_key": "barcode",
"source_level": "Document",
"child_table_field": null,
"child_doctype": null,
"fieldtype": "Data",
"barcode_format": "CODE128",
"x": 5,
"y": 20,
"width": 45,
"height": 12
}

في Design:

* يمكن عرض label أو قيمة تجريبية.
* في Preview/Print:
  يتم توليد الباركود من:
  renderData[element.binding_key]

إذا لم توجد قيمة:

* استخدم sample_value.
* إذا لم توجد sample_value لا تكسر الصفحة، واعرض placeholder مناسب.

==================================================
10. زر الطباعة Print
====================

عند الضغط على زر Print داخل Barcode Studio:

* لا يتم تجهيز البيانات من جديد.
* لا يتم جلب المستند.
* لا يتم قراءة الجداول الفرعية.
* يتم استخدام نفس القاموس الموجود في:

frappe.route_options

أو state الداخلي المحفوظ منه عند تحميل الصفحة.

الرندرة للطباعة يجب أن تكون:

element.binding_key => renderData[element.binding_key]

إذا كانت صفحة أخرى تريد الطباعة، فهي المسؤولة عن تجهيز render_data قبل فتح Barcode Studio.

==================================================
11. مسؤولية الدالة التي تفتح Barcode Studio
===========================================

الدالة الخارجية التي تفتح Barcode Studio هي المسؤولة عن تجهيز البيانات.

مثال:

async function open_barcode_studio_for_print({ doctype, name, template }) {
const r = await frappe.call({
method: "your_app.api.prepare_barcode_route_options",
args: {
doctype,
name,
template
}
});

frappe.route_options = {
doctype,
name,
template,
barcode_doctype: r.message.barcode_doctype,
render_data: r.message
};

frappe.set_route("barcode-studio");
}

هذه الدالة أو API هي التي:

1. تعرف doctype.
2. تعرف name.
3. تعرف template.
4. تقرأ Barcode DocType.
5. تجهز render_data كقاموس Flat Dictionary.
6. تضع البيانات في frappe.route_options.
7. تفتح barcode-studio.

Barcode Studio لا يقوم بهذه المسؤولية.

==================================================
12. API لتجهيز route_options
============================

أضف API في الباكند مثلاً:

prepare_barcode_route_options(doctype, name, template=None, barcode_doctype=None)

وظيفتها:

* معرفة Barcode DocType المناسب حسب doctype إذا لم يتم تمريره.
* قراءة الحقول المسموحة من Barcode DocType.
* جلب المستند الحقيقي من ERPNext.
* تجهيز render_data كقاموس Flat Dictionary حسب binding_key الموجود في Barcode DocType Field.
* إرجاع:

  * doctype
  * name
  * template
  * barcode_doctype
  * render_data

مثال Response:

{
"doctype": "Item",
"name": "ITEM-0001",
"template": "Template-001",
"barcode_doctype": "Item Barcode Config",
"render_data": {
"item_code": "ITEM-0001",
"item_name": "غطاء مقود",
"stock_uom": "Nos",
"barcode": "6281000000012",
"items_item_code": "ITEM-0001",
"items_qty": "1",
"items_rate": "25"
}
}

ملاحظة:
حتى لو كان تجهيز قيمة items_qty يحتاج قراءة Child Table، هذا يتم فقط داخل هذا الـ API أو الدالة الخارجية.
لا يتم داخل Barcode Studio.

==================================================
13. API لجلب إعدادات Barcode DocType
====================================

أضف API مثلاً:

get_barcode_doctype_config(target_doctype)

يرجع إعداد Barcode DocType النشط المرتبط بالـ target_doctype.

Response مثال:

{
"name": "Item Barcode Config",
"target_doctype": "Item",
"fields": [
{
"label": "Item Code",
"fieldname": "item_code",
"binding_key": "item_code",
"source_level": "Document",
"child_table_field": null,
"child_doctype": null,
"fieldtype": "Data",
"sample_value": "ITEM-0001"
},
{
"label": "Qty",
"fieldname": "qty",
"binding_key": "items_qty",
"source_level": "Child Table",
"child_table_field": "items",
"child_doctype": "Sales Invoice Item",
"fieldtype": "Float",
"sample_value": "1"
}
]
}

Barcode Studio يستخدم هذه البيانات فقط لعرض Fields Sidebar وإضافة العناصر داخل التصميم.

==================================================
14. التحقق والأمان
==================

يجب ألا يسمح النظام برندرة أي binding_key غير مسموح به داخل Barcode DocType.

عند تحميل القالب أو الطباعة:

* إذا كان العنصر داخل JSON يحتوي binding_key غير موجود ضمن حقول Barcode DocType المسموحة:

  * لا يتم رندرته أو يتم إرجاع قيمة فارغة.
  * أظهر تحذير في console.
  * لا تكسر الصفحة.

لا تستخدم eval نهائياً.

لا تجعل المستخدم يغير binding_key من Properties Panel.

binding_key يتم توليده من Barcode DocType Field فقط.

==================================================
15. التوافق مع القوالب القديمة
==============================

إذا كان يوجد DocType سابق للقوالب مثل:

Barcode Template

لا تنشئ واحداً جديداً إلا إذا كان غير موجود.

عدّل القالب الحالي ليحفظ العناصر مع metadata الجديدة:

* label
* fieldname
* binding_key
* source_level
* child_table_field
* child_doctype
* fieldtype
* sample_value

حافظ على التوافق مع القوالب القديمة قدر الإمكان.

إذا كان عنصر قديم يحتوي fieldname فقط ولا يحتوي binding_key:

* افترض أن binding_key = fieldname
* source_level = Document
* ثم أكمل الرندرة.

لا تكسر القوالب القديمة.

==================================================
16. Properties Panel
====================

عند تحديد عنصر داخل التصميم:

اعرض في Properties Panel:

* label
* fieldname
* binding_key
* source_level
* child_table_field
* child_doctype
* fieldtype

لكن اجعل معلومات الربط Read Only.

اسمح فقط بتعديل خصائص التصميم مثل:

* x
* y
* width
* height
* font_size
* align
* rotation
* barcode_format
* text style
* show/hide value
* أي خصائص تصميم موجودة حالياً

لا تسمح بتعديل binding_key يدوياً من الواجهة.

==================================================
17. Fields Sidebar
==================

عدّل Fields Sidebar بحيث:

* يعتمد على Barcode DocType fields فقط.
* لا يعرض كل حقول النظام.
* يخفي الحقول التي hidden = 1.
* يعرض الحقول مرتبة حسب idx.
* يدعم البحث بالـ label و fieldname و binding_key.
* عند الضغط أو السحب على الحقل يتم إدراجه في Design مع metadata كاملة.

تصميم العرض المقترح:

[Item Code]
item_code

[Item Name]
item_name

[Qty]
items_qty

[Rate]
items_rate

==================================================
18. route_options داخل Barcode Studio
=====================================

عند فتح Barcode Studio يجب قراءة:

frappe.route_options

مثال:

const routeOptions = frappe.route_options || {};

const studioContext = {
doctype: routeOptions.doctype || null,
name: routeOptions.name || null,
template: routeOptions.template || null,
barcode_doctype: routeOptions.barcode_doctype || null,
render_data: routeOptions || {}
};

ثم حفظ studioContext داخل state داخلي.

لا تعتمد على frappe.route_options مباشرة في كل مرة أثناء الرندرة، لأن route_options قد تضيع بعد تغيير route أو refresh داخلي.

==================================================
19. حالات عدم وجود render_data
==============================

إذا لم توجد render_data:

* لا تكسر الصفحة.
* Design يعمل بشكل طبيعي بالـ label.
* Preview يستخدم sample_value.
* إذا لم توجد sample_value يستخدم label.

إذا وجدت render_data لكن مفتاح معين غير موجود:

* استخدم sample_value.
* إذا لم توجد sample_value استخدم label.

==================================================
20. طريقة الاستخدام بعد التنفيذ
===============================

بعد التنفيذ يجب أن يكون الاستخدام كالتالي:

1. أذهب إلى Barcode DocType.
2. أنشئ إعداد جديد.
3. أختار Target DocType مثل Item أو Sales Invoice.
4. أضيف الحقول المسموحة:

   * إما Document
   * أو Child Table
5. النظام يولد binding_key تلقائياً.
6. أفتح Barcode Studio.
7. Barcode Studio يعرض فقط الحقول المحددة.
8. في Design تظهر أسماء الحقول label.
9. في Preview و Print تظهر القيم القادمة من frappe.route_options.
10. زر الطباعة يستخدم نفس render_data ولا يجهز البيانات من جديد.

==================================================
21. المطلوب النهائي من التنفيذ
==============================

نفذ المطلوب داخل التطبيق الحالي بدون كسر الموجود.

لا تعيد بناء Barcode Studio من الصفر.
افحص الملفات الحالية واعمل التعديلات اللازمة في نفس البنية الحالية.

بعد الانتهاء أعطني:

1. قائمة الملفات التي تم تعديلها أو إضافتها.
2. أسماء الـ DocTypes التي تم إنشاؤها:

   * Barcode DocType
   * Barcode DocType Field
3. أسماء APIs الجديدة.
4. شرح مختصر لطريقة الاستخدام.
5. أوامر bench المطلوبة، مثل:

   * bench migrate
   * bench build
   * bench restart إذا لزم
6. أي ملاحظات مهمة بخصوص التوافق مع القوالب القديمة.

==================================================
قاعدة نهائية مهمة
=================

Barcode Studio ليس مسؤولاً عن تجهيز البيانات.

Barcode Studio يستقبل فقط:

frappe.route_options

كقاموس Flat Dictionary.

كل الرندرة تتم بهذه القاعدة فقط:

value = renderData[binding_key];

أي منطق متعلق بقراءة المستند أو الجداول الفرعية أو اختيار أول صف يتم خارج Barcode Studio، في الدالة أو API التي تجهز route_options قبل فتح الصفحة.
