أكيد، هذه مهام كاملة ومرتبة لتنفيذ دمج **QZ Tray + الشهادة + الطباعة Raw ZPL/TSPL** داخل Barcode Studio بنفس فكرة POSNext:

# Tasks: دمج QZ Tray مع Barcode Studio مع توليد شهادة آمنة من الباكند

## الهدف العام

المطلوب تعديل Barcode Studio الحالي داخل تطبيق Frappe/ERPNext بحيث يدعم الطباعة المباشرة عبر QZ Tray بدون فتح نافذة الطباعة وبدون تعديل إعدادات الطابعة يدوياً.

يجب أن يكون التنفيذ بنفس فكرة POSNext:

* توليد شهادة QZ Tray من الباكند.
* حفظ الشهادة والمفتاح الخاص داخل `sites/{site}/private/qz`.
* عدم وضع `private-key.pem` داخل ملفات public أو JavaScript.
* الواجهة تحصل فقط على الشهادة العامة.
* الواجهة ترسل رسائل QZ Tray للباكند ليتم توقيعها.
* الباكند يوقع الرسائل باستخدام المفتاح الخاص.
* Barcode Studio يرسل أوامر Raw Print مثل ZPL أو TSPL عبر QZ Tray.

---

## Task 1: مراجعة Barcode Studio الحالي

افحص ملفات Barcode Studio الحالية وحدد أماكن الآتي:

* تحميل القالب.
* حفظ القالب.
* قراءة عناصر التصميم.
* عرض Design.
* عرض Preview.
* زر Print الحالي.
* طريقة الطباعة الحالية HTML / Vector.
* مصدر `frappe.route_options.render_data`.

المطلوب عدم إعادة بناء Barcode Studio من الصفر، بل إضافة QZ Tray كمسار طباعة جديد مع الحفاظ على الطباعة الحالية كخيار احتياطي.

---

## Task 2: إضافة إعدادات الطباعة داخل Barcode Template

أضف الحقول التالية إلى DocType القالب الحالي، غالباً `Barcode Template`:

```text
printer_mode
Select:
- HTML
- QZ ZPL
- QZ TSPL

printer_name
Data

printer_dpi
Select:
- 203
- 300

label_width_mm
Float

label_height_mm
Float

gap_mm
Float
Default: 2

copies
Int
Default: 1
```

ملاحظات:

* `printer_mode = HTML` يستخدم الطباعة الحالية.
* `printer_mode = QZ ZPL` يولد أوامر ZPL ويرسلها عبر QZ Tray.
* `printer_mode = QZ TSPL` يولد أوامر TSPL ويرسلها عبر QZ Tray.
* `label_width_mm` و `label_height_mm` يجب أن تكون نفس مقاسات الاستيكر في المصمم.
* إذا كانت الحقول موجودة مسبقاً لا تكررها، فقط استخدمها.

---

## Task 3: إنشاء API خاص بـ QZ Tray في الباكند

أنشئ ملف:

```text
mysys_barcode/api/qz.py
```

ويحتوي على الدوال التالية:

```python
get_certificate()
get_certificate_download()
sign_message(message)
setup_qz_certificate()
```

---

## Task 4: تحديد مسارات الشهادة والمفتاح الخاص

داخل `mysys_barcode/api/qz.py` أضف دوال داخلية لتحديد المسارات:

```python
def _qz_dir():
    return frappe.get_site_path("private", "qz")

def _cert_path():
    return os.path.join(_qz_dir(), "digital-certificate.crt")

def _key_path():
    return os.path.join(_qz_dir(), "private-key.pem")
```

المطلوب حفظ الملفات هنا:

```text
sites/{site}/private/qz/digital-certificate.crt
sites/{site}/private/qz/private-key.pem
```

مهم:

* لا تحفظ `private-key.pem` داخل `public`.
* لا تحفظه داخل assets.
* لا ترسله للمتصفح أبداً.
* الشهادة العامة فقط يمكن تحميلها.

---

## Task 5: تنفيذ setup_qz_certificate

أنشئ دالة Whitelisted:

```python
@frappe.whitelist()
def setup_qz_certificate():
```

وظيفتها:

1. السماح فقط للمستخدم الذي لديه Role:

```text
System Manager
```

2. إذا كانت الملفات موجودة مسبقاً:

   * لا تعيد توليدها.
   * أرجع status = exists.

3. إذا لم تكن موجودة:

   * أنشئ مجلد:

```text
private/qz
```

4. ولّد RSA Private Key:

```text
2048-bit
```

5. احفظ المفتاح الخاص في:

```text
private-key.pem
```

6. اجعل صلاحية الملف:

```text
chmod 600
```

7. ولّد شهادة X.509 Self-Signed.

8. اجعل معلومات الشهادة مثلاً:

```text
Common Name: Barcode Studio QZ Tray Signing
Organization Name: اسم الشركة الافتراضية من Frappe أو اسم التطبيق
```

9. اجعل مدة الصلاحية طويلة، مثلاً 10 سنوات أو أكثر.

10. احفظ الشهادة في:

```text
digital-certificate.crt
```

11. أرجع نتيجة واضحة:

```json
{
  "status": "created",
  "message": "QZ certificate generated successfully.",
  "cert_path": "..."
}
```

---

## Task 6: تنفيذ get_certificate

أنشئ دالة:

```python
@frappe.whitelist()
def get_certificate():
```

وظيفتها:

* قراءة ملف:

```text
digital-certificate.crt
```

* إرجاع نص الشهادة PEM للواجهة.
* إذا لم توجد الشهادة، أظهر رسالة واضحة:

```text
QZ Tray certificate not found. Ask an administrator to run Setup QZ Certificate.
```

هذه الدالة تستخدمها الواجهة داخل:

```javascript
qz.security.setCertificatePromise(...)
```

---

## Task 7: تنفيذ get_certificate_download

أنشئ دالة:

```python
@frappe.whitelist()
def get_certificate_download():
```

وظيفتها:

* ترجع نص الشهادة PEM.
* ترجع اسم الشركة لاستخدامه في اسم ملف التحميل.

مثال:

```json
{
  "pem": "-----BEGIN CERTIFICATE-----...",
  "company": "Dar Ozen"
}
```

تستخدمها الواجهة لتنزيل ملف:

```text
Dar Ozen.crt
```

ثم يقوم المستخدم بتثبيته داخل QZ Tray.

---

## Task 8: تنفيذ sign_message

أنشئ دالة:

```python
@frappe.whitelist()
def sign_message(message):
```

وظيفتها:

1. تستقبل الرسالة التي يرسلها QZ Tray للتوقيع.
2. تقرأ المفتاح الخاص من:

```text
private-key.pem
```

3. توقع الرسالة باستخدام:

```text
RSA PKCS1v15 + SHA512
```

4. ترجع التوقيع بصيغة Base64.

مهم:

* لا ترجع المفتاح الخاص.
* لا تطبع المفتاح في logs.
* لا تسمح بتحميل المفتاح من الواجهة.
* إذا المفتاح غير موجود، أظهر رسالة واضحة.

---

## Task 9: إضافة dependency cryptography

إذا لم تكن مكتبة `cryptography` موجودة، أضفها للتطبيق.

يمكن إضافتها في:

```text
requirements.txt
```

أو تثبيتها بالأمر:

```bash
bench pip install cryptography
```

ثم:

```bash
bench restart
```

---

## Task 10: إضافة qz-tray JavaScript

أضف مكتبة QZ Tray للواجهة.

إذا كان المشروع يستخدم bundler مثل Vite/Vue:

```bash
npm install qz-tray
```

ثم:

```javascript
import qz from "qz-tray"
```

أما إذا كان Barcode Studio داخل Desk Page عادي:

أضف ملف:

```text
mysys_barcode/public/js/qz-tray.js
```

ثم أضفه في `hooks.py`:

```python
app_include_js = [
    "/assets/mysys_barcode/js/qz-tray.js"
]
```

حسب بنية المشروع الحالية.

---

## Task 11: إنشاء ملف qz_security.js أو qzTray.js

أنشئ ملف للواجهة، مثلاً:

```text
mysys_barcode/public/js/qz_security.js
```

أو إذا كان المشروع Vue:

```text
src/utils/qzTray.js
```

المطلوب أن يحتوي على:

```javascript
setupSecurity()
connect()
disconnect()
findPrinters()
getSavedPrinterName()
savePrinterName()
printRaw()
```

---

## Task 12: تنفيذ setupSecurity في JavaScript

داخل `setupSecurity()`:

1. لا تكرر الإعداد أكثر من مرة.
2. استخدم:

```javascript
qz.security.setCertificatePromise(...)
```

لجلب الشهادة من:

```text
mysys_barcode.api.qz.get_certificate
```

3. استخدم:

```javascript
qz.security.setSignatureAlgorithm("SHA512")
```

4. استخدم:

```javascript
qz.security.setSignaturePromise(...)
```

لإرسال الرسالة إلى:

```text
mysys_barcode.api.qz.sign_message
```

5. إذا فشل جلب الشهادة أو التوقيع:

   * لا تكسر الصفحة.
   * أظهر أن الحالة untrusted.
   * يمكن أن تظهر رسائل موافقة من QZ Tray.

---

## Task 13: إدارة حالة اتصال QZ Tray

أضف حالات في الواجهة:

```text
qzConnected
qzConnecting
qzCertStatus
```

حالة الشهادة:

```text
unknown
trusted
untrusted
```

عند الاتصال:

1. استدعِ `setupSecurity()`.
2. اتصل بـ:

```javascript
qz.websocket.connect()
```

3. بعد الاتصال نفذ:

```javascript
qz.printers.find()
```

حتى يتم اختبار التوقيع ومعرفة هل الشهادة trusted أو untrusted.

---

## Task 14: إدارة الطابعات

أضف دوال:

```javascript
findPrinters()
getSavedPrinterName()
savePrinterName(name)
```

المطلوب:

* جلب قائمة الطابعات من QZ Tray.
* حفظ الطابعة المختارة في `localStorage`.
* إذا كان في الجهاز طابعة واحدة فقط، يمكن اختيارها تلقائياً.
* إذا لم توجد طابعات، أظهر رسالة واضحة.

---

## Task 15: إضافة واجهة إعدادات QZ داخل Barcode Studio أو Settings

أضف قسم إعدادات QZ Tray يحتوي على:

* حالة الاتصال:

  * Connected
  * Not Connected
  * Connecting

* زر:

```text
Connect / Retry
```

* قائمة اختيار الطابعة.

* زر:

```text
Refresh Printers
```

* حالة الشهادة:

  * unknown
  * trusted
  * untrusted

* زر:

```text
Generate Certificate
```

* زر:

```text
Download Certificate
```

* تعليمات للمستخدم:

```text
Download the certificate and import it into QZ Tray, then restart QZ Tray.
```

---

## Task 16: تنزيل الشهادة من الواجهة

أنشئ دالة JavaScript:

```javascript
downloadCertificate()
```

وظيفتها:

1. تستدعي:

```text
mysys_barcode.api.qz.get_certificate_download
```

2. تستقبل:

```json
{
  "pem": "...",
  "company": "..."
}
```

3. تنشئ Blob.
4. تنزل الملف باسم:

```text
{company}.crt
```

أو:

```text
qz-certificate.crt
```

---

## Task 17: طريقة تثبيت الشهادة داخل QZ Tray

أضف تعليمات واضحة للمستخدم داخل الواجهة أو في الوثائق:

1. افتح QZ Tray من أيقونة البرنامج بجانب الساعة.
2. افتح:

```text
Advanced > Site Manager
```

3. أضف الشهادة التي تم تنزيلها.
4. اختر ملف `.crt`.
5. احفظ.
6. أعد تشغيل QZ Tray.
7. ارجع إلى Barcode Studio واضغط Connect.
8. يجب أن تصبح الحالة:

```text
trusted
```

---

## Task 18: إضافة printRaw

أضف دالة:

```javascript
async function printRaw({ printerName, raw, copies })
```

وظيفتها:

1. تتأكد أن QZ Tray متصل.
2. إذا لم يكن متصلاً، تحاول الاتصال.
3. تحدد الطابعة:

   * من `printerName`
   * أو من الطابعة المحفوظة في `localStorage`
   * أو من `template.printer_name`
4. تنشئ config:

```javascript
qz.configs.create(printer, {
  copies: Number(copies || 1)
})
```

5. ترسل البيانات:

```javascript
qz.print(config, [raw])
```

---

## Task 19: توليد ZPL من عناصر Barcode Studio

أضف دالة:

```javascript
buildZPL({ template, elements, renderData })
```

وظيفتها:

1. قراءة:

```text
template.label_width_mm
template.label_height_mm
template.printer_dpi
```

2. تحويل mm إلى dots:

```javascript
dots = Math.round(mm * dpi / 25.4)
```

3. بداية الأمر:

```zpl
^XA
^PW{widthDots}
^LL{heightDots}
```

4. المرور على عناصر التصميم.

### Text Element

يولد:

```zpl
^FO{x},{y}^A0N,{fontSize},{fontSize}^FD{value}^FS
```

### Barcode Element

يولد:

```zpl
^FO{x},{y}
^BY{moduleWidth}
^BCN,{height},N,N,N
^FD{value}^FS
```

5. نهاية الأمر:

```zpl
^XZ
```

---

## Task 20: توليد TSPL من عناصر Barcode Studio

أضف دالة:

```javascript
buildTSPL({ template, elements, renderData })
```

وظيفتها:

1. قراءة:

```text
template.label_width_mm
template.label_height_mm
template.gap_mm
```

2. بداية الأمر:

```tspl
SIZE {width_mm} mm,{height_mm} mm
GAP {gap_mm} mm,0
CLS
```

3. Text Element:

```tspl
TEXT x,y,"3",0,1,1,"value"
```

4. Barcode Element:

```tspl
BARCODE x,y,"128",height,0,0,2,2,"value"
```

5. نهاية الأمر:

```tspl
PRINT 1
```

---

## Task 21: استخدام render_data من route_options

Barcode Studio يجب أن يستخدم:

```javascript
frappe.route_options.render_data
```

كمصدر البيانات.

عند تحميل الصفحة:

```javascript
const routeOptions = frappe.route_options || {};

const studioContext = {
  doctype: routeOptions.doctype || null,
  name: routeOptions.name || null,
  template: routeOptions.template || null,
  barcode_doctype: routeOptions.barcode_doctype || null,
  render_data: routeOptions.render_data || {}
};
```

احفظ `studioContext` داخل state داخلي.

لا تستخدم داخل Barcode Studio:

```text
doc.items[0]
child.items
nested objects
arrays
eval
```

الرندرة فقط:

```javascript
value = renderData[element.binding_key]
```

---

## Task 22: دالة getElementValue

أضف دالة:

```javascript
getElementValue(element, renderData)
```

المنطق:

1. إذا كان `element.binding_key` موجوداً وله قيمة داخل `renderData`، استخدمها.
2. إذا لم توجد، استخدم `element.sample_value`.
3. إذا لم توجد، استخدم `element.label`.
4. إذا لم توجد، استخدم `element.fieldname`.

---

## Task 23: تعديل زر Print داخل Barcode Studio

عدّل زر الطباعة الحالي بحيث يفحص:

```javascript
template.printer_mode
```

المنطق:

```javascript
if (template.printer_mode === "QZ ZPL") {
    const zpl = buildZPL({ template, elements, renderData });
    await printRaw({ printerName: template.printer_name, raw: zpl, copies: template.copies });
} else if (template.printer_mode === "QZ TSPL") {
    const tspl = buildTSPL({ template, elements, renderData });
    await printRaw({ printerName: template.printer_name, raw: tspl, copies: template.copies });
} else {
    printHtmlVector();
}
```

عند نجاح الإرسال:

```text
تم إرسال أمر الطباعة إلى QZ Tray
```

عند الفشل:

```text
تعذر الإرسال إلى QZ Tray. تأكد أن QZ Tray مثبت ويعمل وأن الطابعة صحيحة.
```

---

## Task 24: إضافة Test Print

أضف زر:

```text
Test QZ Print
```

وظيفته:

* يجرب الاتصال بـ QZ Tray.
* يرسل أمر بسيط للطابعة المحددة.

مثال ZPL:

```zpl
^XA
^PW400
^LL240
^FO30,30^A0N,30,30^FDQZ Tray Test^FS
^XZ
```

مثال TSPL:

```tspl
SIZE 50 mm,30 mm
GAP 2 mm,0
CLS
TEXT 30,30,"3",0,1,1,"QZ Tray Test"
PRINT 1
```

---

## Task 25: معالجة أخطاء QZ Tray

تعامل مع الأخطاء التالية:

1. QZ Tray غير مثبت.
2. QZ Tray غير شغال.
3. الاتصال مرفوض.
4. الشهادة غير موجودة.
5. الشهادة غير مثبتة داخل QZ Tray.
6. المفتاح الخاص غير موجود.
7. المستخدم ليس System Manager عند توليد الشهادة.
8. اسم الطابعة غير صحيح.
9. لا توجد طابعات.
10. printer_mode غير محدد.
11. printer_dpi غير محدد.
12. label_width_mm أو label_height_mm غير محددة.
13. render_data فارغة.
14. binding_key غير موجود في العنصر.
15. قيمة الباركود فارغة.
16. الطابعة لا تدعم ZPL أو TSPL حسب الاختيار.

كل خطأ يجب أن يظهر برسالة واضحة للمستخدم.

---

## Task 26: الحفاظ على HTML Print كخيار احتياطي

لا تحذف طريقة الطباعة الحالية.

إذا كان:

```text
printer_mode = HTML
```

استخدم الطباعة الحالية.

إذا فشل QZ Tray، يمكن عرض خيار للمستخدم:

```text
استخدام طباعة المتصفح بدلاً من QZ Tray
```

---

## Task 27: صلاحيات وأمان

طبّق الآتي:

* `setup_qz_certificate` فقط لـ System Manager.
* `private-key.pem` محفوظ في `private/qz`.
* صلاحية المفتاح الخاص `600`.
* لا توجد API لتحميل المفتاح الخاص.
* `sign_message` لا يطبع الرسائل أو التوقيع في logs.
* لا تضع private key في JavaScript.
* لا تضع private key في public.
* لا ترفع private key إلى Git.
* أضف `.gitignore` إذا لزم:

```gitignore
sites/*/private/qz/private-key.pem
sites/*/private/qz/digital-certificate.crt
```

---

## Task 28: اختبار Backend APIs

اختبر:

```python
mysys_barcode.api.qz.setup_qz_certificate
mysys_barcode.api.qz.get_certificate
mysys_barcode.api.qz.get_certificate_download
mysys_barcode.api.qz.sign_message
```

تأكد من:

* إنشاء الملفات في `private/qz`.
* صلاحية private key = 600.
* الشهادة ترجع للواجهة.
* التوقيع يرجع Base64.
* المستخدم غير System Manager لا يستطيع توليد شهادة.

---

## Task 29: اختبار الواجهة

اختبر:

1. فتح Barcode Studio.
2. فتح إعدادات QZ.
3. Generate Certificate.
4. Download Certificate.
5. تثبيت الشهادة داخل QZ Tray.
6. إعادة تشغيل QZ Tray.
7. Connect.
8. Refresh Printers.
9. اختيار الطابعة.
10. Test Print.
11. طباعة قالب فعلي QZ ZPL.
12. طباعة قالب فعلي QZ TSPL.
13. تجربة HTML كخيار احتياطي.

---

## Task 30: اختبار المقاسات

اختبر مقاسات مختلفة:

```text
30 × 20 mm
50 × 30 mm
70 × 40 mm
100 × 50 mm
```

وتأكد أن:

* ZPL يرسل:

```zpl
^PW
^LL
```

حسب المقاس و DPI.

* TSPL يرسل:

```tspl
SIZE width mm,height mm
```

---

## Task 31: اختبار بيانات Barcode Studio

اختبر أن القالب يستخدم:

```javascript
renderData[element.binding_key]
```

مثال:

```json
{
  "item_code": "ITEM-0001",
  "item_name": "غطاء مقود",
  "barcode": "6281000000012",
  "standard_rate": "25.00"
}
```

وتأكد أن:

* Design يعرض label.
* Preview يعرض قيمة render_data.
* Print يطبع قيمة render_data.
* إذا لم توجد قيمة، يستخدم sample_value أو label.

---

## Task 32: توثيق طريقة الاستخدام للمستخدم

اكتب شرح مختصر للمستخدم النهائي:

1. تثبيت QZ Tray على جهاز الكاشير.
2. فتح Barcode Studio Settings.
3. الضغط على Generate Certificate.
4. Download Certificate.
5. تثبيت الشهادة داخل QZ Tray.
6. Restart QZ Tray.
7. Connect.
8. اختيار الطابعة.
9. اختيار Printer Mode داخل Barcode Template:

   * HTML
   * QZ ZPL
   * QZ TSPL
10. تحديد:

* Label Width
* Label Height
* DPI
* Printer Name

11. Test Print.
12. Print.

---

## Task 33: أوامر bench المطلوبة

بعد تنفيذ تغييرات الباكند والـ DocTypes:

```bash
bench migrate
```

بعد إضافة ملفات JavaScript أو تعديل frontend:

```bash
bench build --app mysys_barcode
```

ثم:

```bash
bench restart
```

إذا كان المشروع داخل development:

```bash
bench start
```

---

## Task 34: التقرير النهائي بعد التنفيذ

بعد التنفيذ، أرسل تقرير يحتوي على:

1. الملفات التي تم تعديلها.
2. الملفات التي تم إضافتها.
3. APIs التي تم إنشاؤها.
4. الحقول التي تمت إضافتها إلى Barcode Template.
5. طريقة توليد الشهادة.
6. طريقة تنزيل وتثبيت الشهادة في QZ Tray.
7. طريقة اختبار الاتصال والطباعة.
8. طريقة عمل ZPL/TSPL.
9. المشاكل المحتملة وحلولها.
10. هل HTML Print بقي يعمل أم لا.

---

## قاعدة نهائية

Barcode Studio مسؤول عن التصميم والمعاينة فقط.

الطباعة الفعلية عبر QZ Tray تكون Raw Print:

```text
ZPL أو TSPL
```

والبيانات تأتي من:

```javascript
frappe.route_options.render_data
```

والقيمة تطبع بهذه القاعدة فقط:

```javascript
renderData[element.binding_key]
```

أما الشهادة والمفتاح الخاص:

* يتم توليدهما من الباكند.
* المفتاح الخاص يبقى في `private/qz`.
* المتصفح لا يحصل إلا على الشهادة العامة.
* التوقيع يتم في الباكند باستخدام `sign_message`.
