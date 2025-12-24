# NGOMIK – Web Comic Reader

NGOMIK adalah aplikasi web berbasis **Flask** yang berfungsi sebagai **web pembaca komik**. Dan Web ini menggunakan fitur mirroring
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
