# NGOMIK – Web Comic Reader

NGOMIK adalah aplikasi web berbasis **Flask** yang berfungsi sebagai **web pembaca komik**.  
Pengguna dapat login, register, mencari komik, memfilter berdasarkan genre, menyimpan bookmark, serta melihat riwayat komik yang pernah dibuka.

---

## 📌 Fitur Utama

- 🔐 **Login & Register**
- 👤 **Manajemen akun (email)**
- ⭐ **Bookmark komik**
- 🕒 **Riwayat komik (History)**
- 🔍 **Pencarian komik**
- 🏷️ **Filter genre (Comedy, Action, Fantasy, dll)**
- 📖 **Mirror reader (iframe)**  
- 💾 **Penyimpanan data user menggunakan LocalStorage**

---

## 🛠️ Teknologi yang Digunakan

- **Backend**: Python, Flask
- **Frontend**: HTML, CSS, JavaScript
- **UI Icon**: Font Awesome
- **Storage**: Browser LocalStorage (tanpa database)

---

## 📂 Struktur Project

```text
project/
│
├── app.py                  # File utama Flask
├── templates/
│   └── home.html            # Tampilan utama web
│
├── static/
│   ├── css/
│   │   └── style.css        # Styling web
│   ├── js/
│   │   └── web.js           # Logic JavaScript (login, bookmark, dll)
│   └── gambar/              # Asset gambar komik
│
└── README.md
```
## ⚙️ Instalasi Python
1. Download Python

Unduh Python dari: 
```text 
https://www.python.org/downloads/
```

Saat instalasi centang:

```text
☑ Add Python to PATH
```

2. Cek instalasi Python

Buka Command Prompt / Terminal:

```text 
python --version
```

Jika muncul versi Python, berarti berhasil.

## ⚙️ Instalasi Flask
1. (Opsional) Buat Virtual Environment
```text
python -m venv venv
```

Aktifkan:

Windows:
```text
venv\Scripts\activate
```

Linux / Mac:
```text
source venv/bin/activate
```
2. Install Flask
```text
pip install flask
```

Cek Flask:
```text
flask --version
```
## ▶️ Cara Menjalankan Aplikasi
1. Pastikan struktur folder sudah benar

home.html berada di folder templates

style.css di static/css

web.js di static/js

2. Jalankan Flask
```text
python app.py
```

atau
```text
flask run
```
3. Buka browser

Akses:
```text
http://127.0.0.1:5000
```
## 🧠 Cara Kerja Web

Flask bertugas merender halaman home.html

HTML menampilkan struktur halaman

CSS mengatur tampilan UI

JavaScript (web.js) menangani:

Login & Register

Bookmark

History

Filter genre

Search

Data user disimpan di LocalStorage, bukan database

## ⚠️ Catatan Penting

Sistem login belum menggunakan database

Password tidak dienkripsi

Cocok untuk:

Project kuliah

Tugas akhir

Prototype web
