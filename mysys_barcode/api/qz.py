from __future__ import annotations

import base64
import os
from datetime import datetime, timedelta, timezone

import frappe
from cryptography import x509
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding, rsa
from cryptography.x509.oid import NameOID


def _qz_dir() -> str:
	return frappe.get_site_path("private", "qz")


def _cert_path() -> str:
	return os.path.join(_qz_dir(), "digital-certificate.crt")


def _key_path() -> str:
	return os.path.join(_qz_dir(), "private-key.pem")


@frappe.whitelist()
def setup_qz_certificate() -> dict:
	if "System Manager" not in frappe.get_roles():
		frappe.throw("Only System Manager can generate QZ Tray certificate.", frappe.PermissionError)

	if os.path.exists(_cert_path()) and os.path.exists(_key_path()):
		return {"status": "exists", "message": "QZ certificate already exists."}

	os.makedirs(_qz_dir(), exist_ok=True)

	key = rsa.generate_private_key(public_exponent=65537, key_size=2048)

	with open(_key_path(), "wb") as f:
		f.write(
			key.private_bytes(
				encoding=serialization.Encoding.PEM,
				format=serialization.PrivateFormat.TraditionalOpenSSL,
				encryption_algorithm=serialization.NoEncryption(),
			)
		)
	os.chmod(_key_path(), 0o600)

	company = frappe.db.get_single_value("Global Defaults", "default_company") or frappe.get_conf().get("app_name", "Barcode Studio")
	subject = issuer = x509.Name([
		x509.NameAttribute(NameOID.COMMON_NAME, "Barcode Studio QZ Tray Signing"),
		x509.NameAttribute(NameOID.ORGANIZATION_NAME, company),
	])

	cert = (
		x509.CertificateBuilder()
		.subject_name(subject)
		.issuer_name(issuer)
		.public_key(key.public_key())
		.serial_number(x509.random_serial_number())
		.not_valid_before(datetime.now(timezone.utc))
		.not_valid_after(datetime.now(timezone.utc) + timedelta(days=3650))
		.add_extension(
			x509.BasicConstraints(ca=True, path_length=None),
			critical=True,
		)
		.sign(key, hashes.SHA256())
	)

	with open(_cert_path(), "wb") as f:
		f.write(cert.public_bytes(serialization.Encoding.PEM))

	return {
		"status": "created",
		"message": "QZ certificate generated successfully.",
		"cert_path": _cert_path(),
	}


@frappe.whitelist()
def get_certificate() -> dict:
	if not os.path.exists(_cert_path()):
		frappe.throw(
			"QZ Tray certificate not found. Ask an administrator to run Setup QZ Certificate.",
			frappe.DoesNotExistError,
		)

	with open(_cert_path(), "r") as f:
		pem = f.read()

	return {"pem": pem}


@frappe.whitelist()
def get_certificate_download() -> dict:
	if not os.path.exists(_cert_path()):
		frappe.throw(
			"QZ Tray certificate not found. Ask an administrator to run Setup QZ Certificate.",
			frappe.DoesNotExistError,
		)

	with open(_cert_path(), "r") as f:
		pem = f.read()

	company = frappe.db.get_single_value("Global Defaults", "default_company") or "Barcode Studio"

	return {"pem": pem, "company": company}


@frappe.whitelist()
def sign_message(message: str) -> dict:
	if not message:
		frappe.throw("Message is required.")

	if not os.path.exists(_key_path()):
		frappe.throw(
			"QZ Tray private key not found. Ask an administrator to run Setup QZ Certificate.",
			frappe.DoesNotExistError,
		)

	with open(_key_path(), "rb") as f:
		key = serialization.load_pem_private_key(f.read(), password=None)

	signature = key.sign(message.encode("utf-8"), padding.PKCS1v15(), hashes.SHA512())

	return {"signature": base64.b64encode(signature).decode("utf-8")}
