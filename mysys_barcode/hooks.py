app_name = "mysys_barcode"
app_title = "MYSYS Barcode"
app_publisher = "Albashq Alshwmy"
app_description = "MYSYS Barcode"
app_email = "al.alshwmy@gmail.com"
app_license = "mit"

# Apps
# ------------------

# required_apps = []

# Each item in the list will be shown as an app in the apps page
# add_to_apps_screen = [
# 	{
# 		"name": "mysys_barcode",
# 		"logo": "/assets/mysys_barcode/logo.png",
# 		"title": "MYSYS Barcode",
# 		"route": "/mysys_barcode",
# 		"has_permission": "mysys_barcode.api.permission.has_app_permission"
# 	}
# ]

# Includes in <head>
# ------------------
pp_include_css = [
	"/assets/mysys_barcode/css/barcode.css",
	"/assets/mysys_barcode/css/tabulator/tabulator.min.css",
	"/assets/mysys_barcode/css/tabulator-c.css",
]
app_include_js = [
	"/assets/mysys_barcode/js/tabulator/tabulator.min.js",
	"mysys_barcode_tool.bundle.js",
	"/assets/mysys_barcode/js/fabric.js",
	"/assets/mysys_barcode/js/JsBarcode.all.min.js",
	"/assets/mysys_barcode/js/dialog.js",
]
# include js, css files in header of desk.html
# app_include_css = "/assets/mysys_barcode/css/mysys_barcode.css"
# app_include_js = "/assets/mysys_barcode/js/mysys_barcode.js"

# include js, css files in header of web template
# web_include_css = "/assets/mysys_barcode/css/mysys_barcode.css"
# web_include_js = "/assets/mysys_barcode/js/mysys_barcode.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "mysys_barcode/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "mysys_barcode/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "mysys_barcode.utils.jinja_methods",
# 	"filters": "mysys_barcode.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "mysys_barcode.install.before_install"
# after_install = "mysys_barcode.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "mysys_barcode.uninstall.before_uninstall"
# after_uninstall = "mysys_barcode.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "mysys_barcode.utils.before_app_install"
# after_app_install = "mysys_barcode.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "mysys_barcode.utils.before_app_uninstall"
# after_app_uninstall = "mysys_barcode.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "mysys_barcode.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"mysys_barcode.tasks.all"
# 	],
# 	"daily": [
# 		"mysys_barcode.tasks.daily"
# 	],
# 	"hourly": [
# 		"mysys_barcode.tasks.hourly"
# 	],
# 	"weekly": [
# 		"mysys_barcode.tasks.weekly"
# 	],
# 	"monthly": [
# 		"mysys_barcode.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "mysys_barcode.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "mysys_barcode.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "mysys_barcode.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["mysys_barcode.utils.before_request"]
# after_request = ["mysys_barcode.utils.after_request"]

# Job Events
# ----------
# before_job = ["mysys_barcode.utils.before_job"]
# after_job = ["mysys_barcode.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"mysys_barcode.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }
