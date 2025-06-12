# 🌾 Sahabat Tani - Frontend

Layanan antarmuka untuk aplikasi Sahabat Tani yang menyediakan berbagai fitur seperti deteksi penyakit pada tanaman pertanian, melihat riwayat deteksi penyakit,melihat peta persebaran penyakit disekitar, pencegahan dan solusi penyakit pada tanaman serta interaksi antar petani melalui forum diskusi. Sistem frontend ini dibangun menggunakan **React.js** dan **Tailwindcss**.

🚀 **Production URL:**  
[https://sahabattani.netlify.app](https://sahabattani.netlify.app)

---

## 🛠️ Teknologi yang Digunakan

- Node.js
- Vite.js
- React.js
- Tailwindcss
- Leaflet
- Netlify (Deployment)

---

## ⚙️ Persiapan & Instalasi di Lokal

Ikuti langkah-langkah berikut untuk menjalankan project ini di lokal (port default: **5173**):

### 1. Clone Repositori

```bash
git clone https://github.com/SahabatTani/Front-End.git
cd Front-End
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Environment Variables

Buat file `.env` 

Isi file `.env` sesuai dengan konfigurasi lokal kamu:

```
VITE_API_ENDPOINT=api_endpoint
VITE_ML_API_ENDPOINT=ml_api_endpoint
VITE_USER_AVATAR=https://ui-avatars.com/api/?background=244331&color=ffffff
```

### 4. Jalankan Aplikasi di local

```bash
npm run dev
```

### 5. Build Aplikasi 

```bash
npm run build
```

---

## 🔗 Link Terkait

- 🌐 [Website](https://sahabattani.netlify.app/)
- 📄 [Dokumentasi API](https://sahabattani.up.railway.app/)
- 🌾 [Machine Learning API](https://sahabattani-ml.up.railway.app/)