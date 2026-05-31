### MYSYS Barcode

MYSYS Barcode

### Installation

You can install this app using the [bench](https://github.com/frappe/bench) CLI:

```bash
cd $PATH_TO_YOUR_BENCH
bench get-app $URL_OF_THIS_REPO --branch develop
bench install-app mysys_barcode
```

### QZ Tray Raw Printing

Barcode Studio supports direct `QZ ZPL` and `QZ TSPL` printing while keeping browser `HTML` printing available.

1. Install QZ Tray on the workstation connected to the label printer.
2. Open Barcode Studio and generate the QZ certificate as a System Manager.
3. Download the certificate.
4. In QZ Tray, open `Advanced > Site Manager`, import the downloaded `.crt` file, save, and restart QZ Tray.
5. Return to Barcode Studio, connect, refresh printers, select a printer, and run `Test QZ`.
6. In the Barcode Template, set `Printer Mode`, `Printer Name`, `Printer DPI`, label dimensions, gap, and default copies.

The private signing key is stored only under `sites/{site}/private/qz/private-key.pem`.

### Contributing

This app uses `pre-commit` for code formatting and linting. Please [install pre-commit](https://pre-commit.com/#installation) and enable it for this repository:

```bash
cd apps/mysys_barcode
pre-commit install
```

Pre-commit is configured to use the following tools for checking and formatting your code:

- ruff
- eslint
- prettier
- pyupgrade

### License

mit
