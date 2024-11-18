# Dokumentasi Technical

Selamat datang di **Dokumentasi Technical** untuk aplikasi khusus yang dikembangkan oleh **Artsys Integrasi Solusindo** untuk klien kami yang berharga. Panduan komprehensif ini dirancang untuk memberikan pemahaman kepada pengguna teknis tentang cara kerja, arsitektur, dan aspek penyesuaian aplikasi **Odoo**.

Dalam dokumentasi ini, Anda akan menemukan wawasan terperinci tentang dasar-dasar teknis dari solusi khusus kami. Dokumentasi ini akan membekali Anda dengan pengetahuan yang diperlukan untuk menavigasi, memperluas, dan memelihara aplikasi secara efektif.

Semoga Anda mengerti 🤪

## Install

Untuk menginstall Odoo dapat dilihat [di sini](https://www.odoo.com/documentation/15.0/administration/install.html){ target='_blank' }.

## Addons/Modul

Selamat datang di dokumentasi **Modul**, dokumentasi yang dirancang untuk membantu programmer dalam mengelola modul dengan keterampilan yang diperlukan untuk membuat, mengelola, dan memelihara modul dalam aplikasi Odoo yang disesuaikan yang dikembangkan oleh **Artsys Integrasi Solusindo**. Bagian ini berfokus pada aspek-aspek utama manajemen modul, memberikan Anda wawasan tentang struktur modul, pembuatan versi, penulisan deskripsi, dan pembuatan ringkasan yang efektif.

[Download module](assets/data/new_module.zip){ target='_blank' }.

#### Membuat Modul

Sebelum membuat modul anda harus paham terlebih dahulu tentang struktur modul. Struktur modul Odoo adalah sebagai berikut.

```bash
your_module
├── controllers
│   ├── __init__.py
│   └── your_controller.xml
├── data
│   └── your_data.xml
├── demo
│   └── your_demo.xml
├── models
│   ├── __init__.py
│   └── your_model.xml
├── security
│   └── ir.model.access.csv
├── static
│   ├── description
│   │   ├── icon.png
│   │   └── index.html
│   └── other_folder
├── views
│   └── your_view.xml
├── __init__.py
└── __manifest__.py
```

##### `controllers`

##### `data`

Folder data digunakan untuk menyimpan data yang ditulis dengan xml. 

```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <data noupdate="1">
        <record id="record_name" model="model_name">
            <field name="field_name">field_value</field>
        </record>
    </data>
</odoo>
```
Penjelasan lebih lengkapnya ada [di sini](https://www.odoo.com/documentation/15.0/developer/reference/backend/data.html){ target='_blank' }.

##### `demo`
##### `models`
##### `security`
##### `static`
##### `views`
##### `__init__.py`
##### `__manifest__.py`
Contoh `__manifest__.py`
```python
{
    'name': 'Module Name',
    'version': '2023.2023.1',
    'description': 'Description text',
    'summary': 'Summary text',
    'author': 'PT Artsys Integrasi Solusindo',
    'website': 'https://artsys.id',
    'license': 'LGPL-3',
    'category': 'Artsys/Artsys',
    'depends': [
        'base'
    ],
    'data': [
        'views/mymodule_view.xml',
    ],
    'demo': [
        'demo/demo_data.xml',
    ],
    'installable': True,
    'auto_install': False,
    'application': False,
    'assets': {
        'web.assets_backend': [
            'module_name/static/src/your_path'
        ],
    }
}
```
`name`

Nama modul yang dapat dibaca manusia, seperti contoh: `Sale Management`. Untuk nama yang kurang baik adalah seperti `sale_management`.

`version`

Dalam menentukan versi untuk sebuah modul, sebaiknya anda mengikuti aturan berikut `x.y.z` agar memudahkan dalam pembacaan versi oleh orang lain. Penjelasan versinya seperti di bawah ini.

- `x` **Tahun Dibuat**
- `y` **Tahun Diperbarui**
- `z` **Iterator** `default 1`{.guilabel}

`description`

Untuk membuat deskripsi untuk sebuah modul anda mempunyai 2 pilihan

- Menuliskan langsung di `__manifest__.py` di bagian `description`
- Membuat file `index.html` di folder `static/description`

```html
<section class="oe_container">
	<div class="oe_row oe_spaced">
		<h2 class="oe_slogan">Nama Modul</h2>
		<h3 class="oe_slogan">Author</h3>
        <p class="oe_mt32 text-center">
            Summary
        </p>
	</div>
</section>

<section class="container">
    <div class="row">
        <div class="col-12">
            <h3 class="oe_slogan">Overview</h3>
        </div>
        <div class="col-12 text-center">
            <h3 class="oe_slogan text-left">Login Form</h3>
            <img src="form_login.png" alt="Login Form" width="90%">
        </div>
        <div class="col-12 text-center">
            <h3 class="oe_slogan text-left">Signup Form</h3>
            <img src="form_signup.png" alt="Signup Form" width="90%">
        </div>
        <div class="col-12 text-center">
            <h3 class="oe_slogan text-left">User Change Password</h3>
            <img src="change_password.png" alt="User Change Password" width="90%">
        </div>
        <div class="col-12 text-center">
            <h3 class="oe_slogan text-left">Tree View</h3>
            <img src="tree_view.png" alt="Tree View" width="90%">
        </div>
        <div class="col-12 text-center">
            <h3 class="oe_slogan text-left">Form View Editable & Readonly</h3>
            <div class="row">
                <div class="col-6 text-right">
                    <img src="form_view_editable.png" alt="Form View Editable" width="90%">
                </div>
                <div class="col-6 text-left">
                    <img src="form_view_readonly.png" alt="Form View Readonly" width="90%">
                </div>
            </div>
        </div>
    </div>
</section>
```

`summary`

Deskripsi singkat tentang modul.

`author`

Untuk author gunakan `PT Artsys Integrasi Solusindo`.

`website`

Alamat website PT Artsys Integrasi Solusindo.

`license`

Lisensi untuk distribusi modul. Daftar lisensi adalah sebagai berikut :

- `GPL-2`
- `GPL-3`
- `GPL-3`
- `AGPL-3`
- `LGPL-3`
- `OEEL-1` (Odoo Enterprise Edition License v1.0)
- `OPL-1` (Odoo Proprietary License v1.0)
- Dan lain-lain

`category`

Dalam menentukan sebuah kategori untuk sebuah modul, sebaiknya menggunakan `Artsys/Artsys` untuk memudahkan dalam mengelola modul tersebut di menu `Apps`.

`depends`

Modul Odoo yang harus dimuat sebelum modul ini, baik karena modul ini menggunakan fitur yang dibuat atau karena mengubah sumber daya yang ditentukan.

Ketika sebuah modul diinstal, semua dependensinya diinstal sebelumnya.  Demikian pula dependensi dimuat sebelum modul dimuat.

!!! Info
    modul `base`{.guilabel} selalu dipasang di setiap instance Odoo.  Namun Anda masih perlu menentukannya sebagai dependensi untuk memastikan modul Anda diperbarui ketika `base`{.guilabel} diperbarui.

`data`


`demo`


`installable` (default `True`)

Apakah pengguna dapat menginstal modul dari UI Web atau tidak. 

`auto_install` (default `False`)

Jika `True`, modul ini akan otomatis terinstal jika semua dependensi nya diinstal. 

`application` (default `True`)

Apakah modul harus dianggap sebagai aplikasi yang lengkap `True` atau hanya modul teknis `False` yang menyediakan beberapa fungsionalitas tambahan ke modul aplikasi yang ada. 

`assets`

Definisi tentang bagaimana semua file statis dimuat dalam berbagai kumpulan aset. Penjelasan lebih lengkap dapat dilihat [di sini](https://www.odoo.com/documentation/15.0/developer/reference/frontend/assets.html){ target='_blank' }.
