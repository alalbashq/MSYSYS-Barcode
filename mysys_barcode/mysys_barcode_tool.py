
import click
import random
import string
import frappe
import json
from frappe import _
from frappe.utils.file_manager import save_file
from frappe.www.printview import get_html_and_style, get_print_style
from frappe.utils.jinja_globals import bundled_asset, is_rtl
import os
from frappe.utils import get_url, getdate, now
from frappe.translate import print_language
@frappe.whitelist()
def get_barcode(items):
    if not items:
        return {}

    # Load items from JSON string if needed
    if isinstance(items, str):
        items = json.loads(items)

    # Ensure items is a list for SQL IN clause
    if not isinstance(items, list):
        items = [items]

    # Prepare the SQL query with dynamic placeholders
    query = """
        SELECT DISTINCT `tabItem`.`item_code`, `tabItem Barcode`.`barcode`
        FROM `tabItem`
        LEFT JOIN `tabItem Barcode` ON `tabItem`.`name` = `tabItem Barcode`.`parent`
        WHERE `tabItem`.`item_code` IN ({})
    """.format(', '.join(['%s'] * len(items)))  # Create placeholders based on the number of items

    # Execute the SQL query
    barcodes = frappe.db.sql(query, items, as_dict=True)

    data = []
    for row in barcodes:
        # Generate barcode if not present
        if not row.barcode:
            row.barcode = generate_barcode(row.item_code)  # Fixed typo in function name

        # Get price for the item
        rate = get_price(row.item_code)
        
        # Append the item details to data list
        data.append({
            "item_code": row.item_code, 
            "barcode": row.barcode,  
            "item_price": rate
        })

    default_print_format = frappe.get_meta("Item").default_print_format
    return data, default_print_format

def check_duplicate_barcode(barcode):
    if frappe.db.get_value("Item Barcode",{"barcode":barcode}):
        return True
    return False

def get_price(item_code):
  data = frappe.db.sql("""
    SELECT price_list_rate from `tabItem Price` where item_code = %s and selling=1
    ORDER BY valid_from DESC
    """, item_code, as_dict=1)
  if not data: return 0
  return data[0].price_list_rate
def generate_barcode(item_code):
    item = frappe.get_doc("Item", item_code)
    barcode  = get_random_number(5)
    while check_duplicate_barcode(barcode):
        barcode = get_random_number(5)

    data=item.append('barcodes', {})
    data.barcode = barcode
    item.save() 
    return  barcode

 
def get_random_number(length):
	# choose from all lowercase letter
	letters = string.ascii_uppercase
	# call random.choices() string module to find the string in Uppercase + numeric data.
	result_str = ''.join(random.choices(string.digits, k = length))    
	return result_str
@frappe.whitelist()
def get_url_path():
    return get_url()
@frappe.whitelist()
def get_barcode_template(items, print_format):
    if isinstance(items,str):
        items = json.loads(items)
    if not items: frappe.throw(_("Please select item(s)"))
    row = items[0]
    return get_main_html(items, print_format)

def get_main_html(doc, print_format):    
    html = frappe.get_doc("Print Format", print_format).html
    print_settings = frappe.get_doc("Print Settings")
    print_format = frappe.get_doc("Print Format", print_format)
    css =  get_print_style(style=None, print_format=print_format, for_legacy=False)
   
     
    # print_css= bundled_asset("print.bundle.css").lstrip("/")   
    print_css= "/assets/frappe/dist/css/print.bundle.B2MFNDL3.css"  
  
    custom_css = """
      @import url('https://fonts.googleapis.com/css2?family=Amiri&display=swap');
      .print-format {
        padding: 0 !important;
      }
      body, html{
        font-family:  'Arial', 'Amiri', serif !important;
        padding: 0 !important;
        margin: 0 !important;
      }
    """
    
    html = frappe.render_template(html,{"doc": doc} )
    url = get_url()
    url += print_css
    html_rendered = f"""
      <html lang="en" dir="rtl">
        <head>
            <link href="{url}" rel="stylesheet">
            <style>
              {css}
              {custom_css}
            </style>
           
            <meta charset="utf-8">
        </head>
        <body>
          <div class="print-format">
            {html }
          </div>
        </body>
      </html>"""
    return html_rendered

@frappe.whitelist()
def download_pdf(doctype, name, print_format, letterhead=None):
  doc = frappe.get_doc(doctype, name)
  doc.check_permission("print")
  generator = PrintFormatGenerator(print_format, doc, letterhead)
  pdf = generator.render_pdf()
  
  frappe.local.response.filename = "{name}.pdf".format(
    name=name.replace(" ", "-").replace("/", "-")
  )
  frappe.local.response.filecontent = pdf
  frappe.local.response.type = "pdf"

@frappe.whitelist()
def get_print_html(doctype, name, print_format, lang="en", letterhead=None, is_private = 0):
  with print_language(lang):
    document = frappe.get_doc(doctype, name)
    html = get_html_and_style(doc=document.as_json(), print_format=print_format, no_letterhead=1)
    print_css = bundled_asset("print.bundle.css").lstrip("/")
  
    custom_css = """
      @import url('https://fonts.googleapis.com/css2?family=Amiri&display=swap');
      .print-format {
        padding: 0 !important;
      }
      body, html{
        font-family:  'Arial', 'Amiri', serif !important;
        padding: 0 !important;
        margin: 0 !important;
      }
    """
    html_rendered = f"""
      <html lang="{lang}" dir='{"rtl" if is_rtl(lang) else "ltr"}'>
        <head>
            <style>
              {html['style']}
              {custom_css}
            </style>
            <meta charset="utf-8">
        </head>
        <body>
          <div class="print-format">
            {html['html']}
          </div>
        </body>
      </html>
    """
    document.check_permission("print")
    generator = PrintFormatGenerator(print_format=print_format, doc=document, html=html_rendered, letterhead=letterhead, print_css=print_css)
    pdf = generator.get_pdf()
    attachment = save_file(
      fname=f"{name}.pdf",
      content=pdf,
      dt=doctype,
      dn=name,
      is_private=is_private,
      decode=False,
    )
    if attachment:
      document.reload()
    
    return attachment
    

def get_html(doctype, name, print_format, html=None, letterhead=None):
  doc = frappe.get_doc(doctype, name)
  doc.check_permission("print")
  generator = PrintFormatGenerator(print_format, doc, html, letterhead)
  return generator.get_html_preview()

def get_html_custom_doc(doctype, name, custom_doc, print_format, html=None, letterhead=None):
  doc = frappe.get_doc(doctype, name)
  doc.set("_doc" ,custom_doc)
  data = doc.as_json()
  
  doc.check_permission("print")
  generator = PrintFormatGenerator(print_format, data, html, letterhead)
  return generator.get_html_preview()


class PrintFormatGenerator:
  """
  Generate a PDF of a Document, with repeatable header and footer if letterhead is provided.

  This generator draws its inspiration and, also a bit of its implementation, from this
  discussion in the library github issues: https://github.com/Kozea/WeasyPrint/issues/92
  """

  def __init__(self, print_format, doc, html=None, letterhead=None, print_css=None):
    """
    Parameters
    ----------
    print_format: str
        Name of the Print Format
    doc: str
        Document to print
    letterhead: str
        Letter Head to apply (optional)
    """
    self.base_url = frappe.utils.get_url()
    self.print_format = frappe.get_doc("Print Format", print_format)
    self.doc = doc
    self.html = html
    if letterhead == _("No Letterhead"):
      letterhead = None
    self.letterhead = frappe.get_doc("Letter Head", letterhead) if letterhead else None

    self.build_context()
    if html:
      self.html = html
    if print_css:
      self.print_css = print_css
      self.print_css_code = frappe.read_file(os.path.join(frappe.local.sites_path, self.print_css))
    self.layout = self.get_layout(self.print_format)
    self.context.layout = self.layout

  def get_pdf(self):
    """
    Returns
    -------
    pdf: a bytes sequence
        The rendered PDF.
    """
    HTML, CSS = import_weasyprint()

    self._make_header_footer()

    self.context.update({"header_height": self.header_height, "footer_height": self.footer_height})
    
    main_html = self.get_main_html()
   
    # main_html = self.get_main_html()
    html = HTML(string=main_html, base_url=self.base_url, encoding="UTF-8")

    # html = HTML(string=main_html, base_url=self.base_url)
    # main_doc = html.render(stylesheets=[os.path.join("http://192.168.1.52/", self.print_css)])
    # main_doc = html.render(stylesheets=[CSS(string=self.print_css_code)])
    main_doc = html.render()

    if self.header_html or self.footer_html:
      self._apply_overlay_on_main(main_doc, self.header_body, self.footer_body)
    return main_doc.write_pdf()
      
  def build_context(self):
    self.print_settings = frappe.get_doc("Print Settings")
    page_width_map = {"A4": 210, "Letter": 216}
    page_width = page_width_map.get(self.print_settings.pdf_page_size) or 210
    body_width = page_width - self.print_format.margin_left - self.print_format.margin_right
    print_style = (
      frappe.get_doc("Print Style", self.print_settings.print_style)
      if self.print_settings.print_style
      else None
    )
    context = frappe._dict(
      {
        "doc": self.doc,
        "print_format": self.print_format,
        "print_settings": self.print_settings,
        "print_style": print_style,
        "letterhead": self.letterhead,
        "page_width": page_width,
        "body_width": body_width,
      }
    )
    self.context = context

  def get_html_preview(self):
    header_html, footer_html = self.get_header_footer_html()
    self.context.header = header_html
    self.context.footer = footer_html
    return self.get_main_html()

  def get_main_html(self):
    self.html = frappe.get_doc("Print Format", self.print_format).html  
    self.print_css = "ee"  
    self.context.css = frappe.render_template(
      "templates/print_format/print_format.css", self.context
    )    
   
    self.print_css = bundled_asset("print.bundle.css").lstrip("/")   
    
    print_css = bundled_asset("print.bundle.css").lstrip("/")

    custom_css = """
      @import url('https://fonts.googleapis.com/css2?family=Amiri&display=swap');
      .print-format {
        padding: 0 !important;
      }
      body, html{
        font-family:  'Arial', 'Amiri', serif !important;
        padding: 0 !important;
        margin: 0 !important;
      }
    """
   
    frappe.msgprint("{}<br>:::{}".format(self.html, {"doc":self.doc}))
    
    html = frappe.render_template(self.html,{"doc":json.loads(self.doc)} )
    html_rendered = f"""
      <html lang="en" dir="rtl">
        <head>
            <style>
              {print_css}
              {custom_css}
            </style>
            <meta charset="utf-8">
        </head>
        <body>
          <div class="print-format">
            {html }
          </div>
        </body>
      </html>"""
    return html_rendered

  def get_header_footer_html(self):
    header_html = footer_html = None
    if self.letterhead:
      header_html = frappe.render_template("templates/print_format/print_header.html", self.context)
    if self.letterhead:
      footer_html = frappe.render_template("templates/print_format/print_footer.html", self.context)
    return header_html, footer_html

  def render_pdf(self):
    """
    Returns
    -------
    pdf: a bytes sequence
        The rendered PDF.
    """
    HTML, CSS = import_weasyprint()

    self._make_header_footer()

    self.context.update({"header_height": self.header_height, "footer_height": self.footer_height})
    
    main_html = self.get_main_html()
    if self.html:
      main_html = self.html
    
    # main_html = self.get_main_html()

    html = HTML(string=main_html, base_url=self.base_url)
    main_doc = html.render()

    if self.header_html or self.footer_html:
      self._apply_overlay_on_main(main_doc, self.header_body, self.footer_body)
    return main_doc.write_pdf()

  def _compute_overlay_element(self, element: str):
    """
    Parameters
    ----------
    element: str
        Either 'header' or 'footer'

    Returns
    -------
    element_body: BlockBox
        A Weasyprint pre-rendered representation of an html element
    element_height: float
        The height of this element, which will be then translated in a html height
    """
    HTML, CSS = import_weasyprint()

    html = HTML(
      string=getattr(self, f"{element}_html"),
      base_url=self.base_url,
    )
    element_doc = html.render(stylesheets=[CSS(string="@page {size: A4 portrait; margin: 0; padding: 0;}"), CSS(string=".print-format {padding: 0 !important;}")])
    element_page = element_doc.pages[0]
    element_body = PrintFormatGenerator.get_element(element_page._page_box.all_children(), "body")
    element_body = element_body.copy_with_children(element_body.all_children())
    element_html = PrintFormatGenerator.get_element(element_page._page_box.all_children(), element)

    if element == "header":
      element_height = element_html.height
    if element == "footer":
      element_height = element_page.height - element_html.position_y

    return element_body, element_height

  def _apply_overlay_on_main(self, main_doc, header_body=None, footer_body=None):
    """
    Insert the header and the footer in the main document.

    Parameters
    ----------
    main_doc: Document
        The top level representation for a PDF page in Weasyprint.
    header_body: BlockBox
        A representation for an html element in Weasyprint.
    footer_body: BlockBox
        A representation for an html element in Weasyprint.
    """
    for page in main_doc.pages:
      page_body = PrintFormatGenerator.get_element(page._page_box.all_children(), "body")

      if page_body:
        if header_body:
          page_body.children += header_body.all_children()
        if footer_body:
          page_body.children += footer_body.all_children()

  def _make_header_footer(self):
    self.header_html, self.footer_html = self.get_header_footer_html()

    if self.header_html:
      header_body, header_height = self._compute_overlay_element("header")
    else:
      header_body, header_height = None, 0
    if self.footer_html:
      footer_body, footer_height = self._compute_overlay_element("footer")
    else:
      footer_body, footer_height = None, 0

    self.header_body = header_body
    self.header_height = header_height
    self.footer_body = footer_body
    self.footer_height = footer_height

  def get_layout(self, print_format):
    layout = frappe.parse_json(print_format.format_data)
    layout = self.set_field_renderers(layout)
    # layout = self.process_margin_texts(layout)
    return layout

  def set_field_renderers(self, layout):
    renderers = {"HTML Editor": "HTML", "Markdown Editor": "Markdown"}
    if layout:
      for df in layout:
        if not "fieldtype" in df:
          continue
        fieldtype = df["fieldtype"]
        renderer_name = fieldtype.replace(" ", "")
        df["renderer"] = renderers.get(fieldtype) or renderer_name
        # df["section"] = ""
    return layout

  def process_margin_texts(self, layout):
    margin_texts = [
      "top_left",
      "top_center",
      "top_right",
      "bottom_left",
      "bottom_center",
      "bottom_right",
    ]
    for key in margin_texts:
      text = layout.get("text_" + key)
      if text and "{{" in text:
        layout["text_" + key] = frappe.render_template(text, self.context)

    return layout

  @staticmethod
  def get_element(boxes, element):
    """
    Given a set of boxes representing the elements of a PDF page in a DOM-like way, find the
    box which is named `element`.

    Look at the notes of the class for more details on Weasyprint insides.
    """
    for box in boxes:
      if box.element_tag == element:
        return box
      return PrintFormatGenerator.get_element(box.all_children(), element)


def import_weasyprint():
  try:
    from weasyprint import CSS, HTML

    return HTML, CSS
  except OSError:
    message = "\n".join(
      [
        "WeasyPrint depdends on additional system dependencies.",
        "Follow instructions specific to your operating system:",
        "https://doc.courtbouillon.org/weasyprint/stable/first_steps.html",
      ]
    )
    click.secho(message, fg="yellow")
    frappe.throw(message)



def css_print_style():
  return """
   <style>
		@media screen {
	.print-format-gutter {
		background-color: #d1d8dd;
		padding: 30px 0px;
	}
	.print-format {
		background-color: white;
		border-radius: 8px;
		max-width: 8.3in;
		min-height: 11.69in;
		padding: 0.75in;
		margin: auto;
		color: var(--gray-900);
	}

	.print-format.landscape {
		max-width: 11.69in;
		padding: 0.2in;
	}

	.page-break {
		/* padding: 15px 0px; */
		border-bottom: 1px dashed #888;
	}

	/* .page-break:first-child {
		padding-top: 0px;
	} */

	.page-break:last-child {
		border-bottom: 0px;
	}

	/* mozilla hack for images in table */
	body:last-child .print-format td img {
		width: 100% !important;
	}

	@media(max-width: 767px) {
		.print-format {
			padding: 0.2in;
		}
	}
}

@media print {
	.print-format p {
		margin-left: 1px;
		margin-right: 1px;
	}
}

.disabled-check {
	color: #eee;
}

.data-field {
	margin-top: 5px;
	margin-bottom: 5px;
}

.data-field .value {
	word-wrap: break-word;
}

.important .value {
	font-size: 120%;
	font-weight: bold;
}

.important label {
	line-height: 1.8;
	margin: 0px;
}

.table {
	font-size: inherit;
	margin: 20px 0px;
}

.checkbox-options {
	columns: var(--checkbox-options-columns);
}

.square-image {
	width: 100%;
	height: 0;
	padding: 50% 0;
	background-size: contain;
	/*background-size: cover;*/
	background-repeat: no-repeat !important;
	background-position: center center;
	border-radius: 4px;
}

.print-item-image {
	object-fit: contain;
}

.pdf-variables,
.pdf-variable,
.visible-pdf {
	display: none !important;
}

.print-format {
	font-size: 9pt;
	font-family: Inter, "Helvetica Neue", Helvetica, Arial, "Open Sans", sans-serif;
	-webkit-print-color-adjust:exact;
}

.page-break {
	page-break-after: always;
}

.print-heading {
	border-bottom: 1px solid #aaa;
	margin-bottom: 10px;
}

.print-heading h2 {
	margin: 0px;
}
.print-heading h4 {
	margin-top: 5px;
}

table.no-border, table.no-border td {
	border: 0px;
}

.print-format label {
	/* wkhtmltopdf breaks label into multiple lines when it is inline-block */
	display: block;
	font-weight: 700;
}

.print-format img {
	max-width: 100%;
}

.print-format table td > .primary:first-child {
	font-weight: bold;
}

.print-format td, .print-format th {
	vertical-align: top !important;
	padding: 6px !important;
}

.print-format p {
	margin: 3px 0px 3px;
}

.print-format table td pre {
	white-space: normal;
	word-break: normal;
}

table td div {
	
	/* needed to avoid partial cutting of text between page break in wkhtmltopdf */
	page-break-inside: avoid !important;
	
}

/* hack for webkit specific browser */
@media (-webkit-min-device-pixel-ratio:0) {
	thead, tfoot {
		display: table-header-group;
	}
}

[document-status] {
	margin-bottom: 5mm;
}

.signature-img {
	background: #fff;
	border-radius: 3px;
	margin-top: 5px;
	max-height: 150px;
}

.print-format-preview [data-fieldtype="Table"] {
	overflow: auto;
}
.print-format * {
	color: #000 !important;
}

.print-format .alert {
	background-color: inherit;
	border: 1px dashed #333;
}

.print-format .table-bordered,
.print-format .table-bordered > thead > tr > th,
.print-format .table-bordered > tbody > tr > th,
.print-format .table-bordered > tfoot > tr > th,
.print-format .table-bordered > thead > tr > td,
.print-format .table-bordered > tbody > tr > td,
.print-format .table-bordered > tfoot > tr > td {
	border: 1px solid #333;
}

 

 h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
    font-family: inherit;
    font-weight: 500;
    line-height: 1.3em;
    color: inherit;
    display: inline;
    padding: 0px 18px 0px 0px;
    text-align: center;
}
 
.table>thead>tr>th {
    border: 2px solid #d1d8dd;
}
 

/* classic format: for-test */


 
 

.disabled-check {
	color: #eee;
}

.data-field {
	margin-top: 5px;
	margin-bottom: 5px;
}

.data-field .value {
	word-wrap: break-word;
}

.important .value {
	font-size: 120%;
	font-weight: bold;
}

.important label {
	line-height: 1.8;
	margin: 0px;
}

.table {
	font-size: inherit;
	margin: 20px 0px;
}

.square-image {
	width: 100%;
	height: 0;
	padding: 50% 0;
	background-size: contain;
	/*background-size: cover;*/
	background-repeat: no-repeat !important;
	background-position: center center;
	border-radius: 4px;
}

.print-item-image {
	object-fit: contain;
}

.pdf-variables,
.pdf-variable,
.visible-pdf {
	display: none !important;
}

table.no-border, table.no-border td {
	border: 0px;
}

.print-format label {
	/* wkhtmltopdf breaks label into multiple lines when it is inline-block */
	display: block;
	font-weight: 700;
}

.print-format img {
	max-width: 100%;
}

.print-format table td > .primary:first-child {
	font-weight: bold;
}

.print-format td, .print-format th {
	vertical-align: top !important;
	padding: 6px !important;
}

.print-format p {
	margin: 3px 0px 3px;
}

.print-format table td pre {
	white-space: normal;
	word-break: normal;
}

table td div {
	
	/* needed to avoid partial cutting of text between page break in wkhtmltopdf */
	page-break-inside: avoid !important;
	
}



  
  
  .print-format th {
    background: #fff4dc !important;
    color: #000;
    font-weight: 900;
    border-bottom-width: 1px !important;
    text-align: center;
}



.bold{
  font-weight: 750;
}

 

.print-format td, .print-format th {
    padding: 3px !important;
}

.print-format td, .print-format th {
    vertical-align: middle !important;
    text-align: center !important;
    font-weight: 600;
}

.control-input,.like-disabled-input{
border: .25pt solid #8a8d8f !important;
border-radius: 5px !important;
}
.reqd{
color:red !important;
 
}
.dt-cell{
border: 1px solid #939697;
}
 
     .print-format th {
    background: #efefef;
    color: #000;
    font-weight: normal;
    border-bottom-width: 1px !important;
}
.print-format .table td, .print-format .table th {
    padding: 1px !important;
     border-bottom: 2px solid #959595 !important;
    border-right: 1px solid #959595 !important;
    border-left: 1px solid #959595 !important;
    border-top: 1px solid #959595 !important;
}
.print-format td, .print-format th {
    vertical-align: top !important;
    padding: 3px !important;
}
table {
    border: 1.5pt solid #b7b7b7 !important;
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
}
th, td {
    text-algin: rigth!important;
    border-bottom: 2px solid #b5b5b5!important;
    border-top: 2px solid #b5b5b5!important;
    font-size: 12px;
}
.print-format td, .print-format th {
    vertical-align: middle !important;
    text-align: right !important;
    font-weight: 600;
}

.print-format td, .print-format th {
    vertical-align: middle !important;
    text-align: center !important;
    font-weight: 600;
}
.empty_space {
    width: 27mm !important;
    height: 12mm;
}
		</style>
  """