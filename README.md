# Ecommerce Catalog

**E-commerce Catalog** adalah web app berbasis **React.js** dan **Node.js (REST API)** yang dirancang dengan UI modern, responsif, dan reusable component.  
Aplikasi ini mendukung **Manajemen Produk & Kategori**, upload gambar, serta tampilan adaptif untuk **mobile, tablet, dan desktop**.

---

## Live Demo

### Frontend

kamu dapat melihat web appnya [di sini](https://frontend-ecommerce-catalog.vercel.app/)

atau

`https://frontend-ecommerce-catalog.vercel.app/`

**Account** : 
* Email : admin@email.com
* Password : 123

### Backend

**Base_URL_API** :

`https://backendapi-ecommerce-catalog.vercel.app`

### Product

| Method | Endpoint           | Deskripsi                              | Perizinan |
| -----: | ------------------ | -------------------------------------- | --------- |
|    GET | `/api/product`     | Mengambil semua data produk            | Public    |
|    GET | `/api/product/:id` | Mengambil 1 data produk berdasarkan ID | Public    |
|   POST | `/api/product`     | Menambahkan produk baru                | Protected |
|    PUT | `/api/product/:id` | Mengubah data produk                   | Protected |
| DELETE | `/api/product/:id` | Menghapus data produk                  | Protected |

### Catagory

| Method | Endpoint            | Deskripsi                                | Perizinan |
| -----: | ------------------- | ---------------------------------------- | --------- |
|    GET | `/api/category`     | Mengambil semua data kategori            | Public    |
|    GET | `/api/category/:id` | Mengambil 1 data kategori berdasarkan ID | Public    |
|   POST | `/api/category`     | Menambahkan kategori baru                | Protected |
|    PUT | `/api/category/:id` | Mengubah data kategori                   | Protected |
| DELETE | `/api/category/:id` | Menghapus data kategori                  | Protected |

### Users

| Method | Endpoint         | Deskripsi                             | Perizinan |
| -----: | ---------------- | ------------------------------------- | --------- |
|    GET | `/api/users`     | Mengambil semua data users            | Protected |
|    GET | `/api/users/:id` | Mengambil 1 data users berdasarkan ID | Protected |
|   POST | `/api/users`     | Menambahkan users baru                | Protected |
|    PUT | `/api/users/:id` | Mengubah data users                   | Protected |
| DELETE | `/api/users/:id` | Menghapus data users                  | Protected |

### Auth

| Method | Endpoint             | Deskripsi                 | Perizinan |
| -----: | -------------------- | ------------------------- | --------- |
|   POST | `/api/auth/register` | melakukan registrasi akun | Public    |
|   POST | `/api/auth/login`    | melakukan login akun      | Public    |

---

## Alur Web App

### Admin

```
Admin membuka Web App -> Halaman Home -> Halaman Login -> Halaman Manajemen Product(Tambah, Edit, Hapus, Detail Product) -> Manajemen Catagory(Tambah, Edit, Hapus Catagory) -> Manajemen Users(Tambah, Edit, Hapus Users) -> Logout
```

### User

```
User membuka Web App -> Halaman Home -> List Product(Product status Aktif) -> Lihat Detail
```

## Fitur Utama

### Admin Panel

- Manajemen Produk (Tambah, Edit, Hapus)
- Manajemen Kategori (Tambah, Edit, Hapus)
- Upload & preview gambar produk
- Status tampil produk (Aktif / Nonaktif)
- Modal form interaktif

### Katalog Publik

- Menampilkan hanya produk dengan status **Aktif**
- Detail produk lengkap
- Harga, berat, ukuran, perawatan, temperamen

### Responsive UI (3 Device)

- **Desktop** → Tampilan tabel
- **Tablet & Mobile** → Tampilan card
- Sidebar collapsible (hamburger menu)
- Layout konsisten & reusable

---

## Teknologi yang Digunakan

### Frontend

- React.js
- Tailwind CSS
- React Icons
- Axios
- SweetAlert2
- React Hot Toast
- Vercel (Deployment)

### Backend

- Node.js
- Cors
- Express.js
- MySQL (Filess.io)
- Multer (upload gambar)
- JWT
- Cloudinary
- Vercel (Deployment)

---

## Struktur Folder (Frontend)

```
📦frontend
 ┣ 📂public
 ┃ ┗ 📜vite.svg
 ┣ 📂src
 ┃ ┣ 📂assets
 ┃ ┃ ┗ 📜react.svg
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜ActionButton.jsx
 ┃ ┃ ┣ 📜AuthButton.jsx
 ┃ ┃ ┣ 📜Loading.jsx
 ┃ ┃ ┣ 📜Modal.jsx
 ┃ ┃ ┣ 📜ProtectedRoute.jsx
 ┃ ┃ ┣ 📜ResponsiveList.jsx
 ┃ ┃ ┣ 📜Sidebar.jsx
 ┃ ┃ ┗ 📜StatusBadge.jsx
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜Home.jsx
 ┃ ┃ ┣ 📜Kategori.jsx
 ┃ ┃ ┣ 📜Login.jsx
 ┃ ┃ ┣ 📜NotFound.jsx
 ┃ ┃ ┣ 📜Produk.jsx
 ┃ ┃ ┣ 📜ProdukDetail.jsx
 ┃ ┃ ┣ 📜Register.jsx
 ┃ ┃ ┗ 📜Users.jsx
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜Api.jsx
 ┃ ┃ ┗ 📜Auth.jsx
 ┃ ┣ 📜App.jsx
 ┃ ┣ 📜index.css
 ┃ ┗ 📜main.jsx
 ┣ 📜.env
 ┣ 📜.env.example
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜eslint.config.js
 ┣ 📜index.html
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜vite.config.js
```

## Struktur Folder (Backend)

```
📦backend
 ┣ 📂src
 ┃ ┣ 📂config
 ┃ ┃ ┣ 📜cloudinary.js
 ┃ ┃ ┣ 📜db.js
 ┃ ┃ ┗ 📜init.sql
 ┃ ┣ 📂controllers
 ┃ ┃ ┣ 📜authController.js
 ┃ ┃ ┣ 📜categoryController.js
 ┃ ┃ ┣ 📜productController.js
 ┃ ┃ ┗ 📜userController.js
 ┃ ┣ 📂middlewares
 ┃ ┃ ┣ 📜auth.js
 ┃ ┃ ┣ 📜cors.js
 ┃ ┃ ┣ 📜upload.js
 ┃ ┃ ┗ 📜validate.js
 ┃ ┣ 📂routes
 ┃ ┃ ┣ 📜authRoute.js
 ┃ ┃ ┣ 📜categoryRoute.js
 ┃ ┃ ┣ 📜productRoute.js
 ┃ ┃ ┗ 📜userRoute.js
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜cloudinaryDelete.js
 ┃ ┃ ┗ 📜cloudinaryUpload.js
 ┃ ┗ 📜index.js
 ┣ 📜.env
 ┣ 📜.env.example
 ┣ 📜.gitignore
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜vercel.json
```

## Cara Menjalankan Project

kamu dapat mencoba web appnya tanpa melakukan instalasi di lokal dengan cara [ini](#live-demo)

### 1. Clone Repository

```
git clone https://github.com/machfudn/ecommerce_catalog.git
```

### 2. Jalakan Backend

```
# membuka folder backend
cd backend

# melakukan instalasi depedenci
npm install

# Import src/config/init.sql pada mysql
CREATE DATABASE db_ecommerce_catalog;
USE db_ecommerce_catalog;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    nama VARCHAR(255) NOT NULL,
    id_kategori INT,
    harga INT NOT NULL,
    stok INT DEFAULT 0,
    ukuran VARCHAR(50),
    perawatan ENUM('Mudah', 'Menengah', 'Ahli') DEFAULT 'Mudah',
    temperamen ENUM('Damai', 'Semi-Agresif', 'Agresif') DEFAULT 'Damai',
    deskripsi TEXT,
    image_url TEXT,
    image_public_id VARCHAR(255),
    berat INT DEFAULT 500,
    status_tampil ENUM('Aktif', 'Nonaktif') DEFAULT 'Aktif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_kategori) REFERENCES categories(id) ON DELETE SET NULL
);

INSERT INTO products (sku, nama, id_kategori, harga, stok, ukuran, perawatan, temperamen, deskripsi, image_url, image_public_id, berat, status_tampil) VALUES
(
    'FISH-001',
    'Guppy Blue Grass',
    1,
    25000,
    50,
    '3-4 cm',
    'Mudah',
    'Damai',
    'Ikan hias dengan ekor lebar berwarna biru bercak hitam, sangat cantik untuk pemula.',
    'https://res.cloudinary.com/demo/image/upload/guppy.jpg',
    'products/guppy_01',
    100,
    'Aktif'
),
(
    'FISH-002',
    'Arwana Silver',
    3,
    150000,
    4,
    '20-25 cm',
    'Menengah',
    'Semi-Agresif',
    'Ikan predator eksotis dengan sisik perak yang berkilau. Membutuhkan akuarium besar.',
    'https://res.cloudinary.com/demo/image/upload/arwana.jpg',
    'products/arwana_01',
    1500,
    'Aktif'
),
(
    'FISH-003',
    'Neon Tetra',
    3,
    3000,
    200,
    '1-2 cm',
    'Mudah',
    'Damai',
    'Ikan sekolah (schooling fish) yang memberikan efek cahaya biru elektrik di aquascape.',
    'https://res.cloudinary.com/demo/image/upload/neon_tetra.jpg',
    'products/neon_01',
    50,
    'Aktif'
),
(
    'FISH-004',
    'Clownfish (Nemo)',
    2,
    45000,
    20,
    '5-7 cm',
    'Menengah',
    'Damai',
    'Ikan air laut yang ikonik, hidup berdampingan dengan anemon.',
    'https://res.cloudinary.com/demo/image/upload/clownfish.jpg',
    'products/clown_01',
    300,
    'Aktif'
);

INSERT INTO categories (nama) VALUES
('Air Tawar'),
('Air Laut'),
('Predator'),
('Aquascape');

# melakuakn copy paste untuk .env
cp .env.example .env

# lakukan configurasi isi .env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123
DB_NAME=db_ecommerce_catalog
DB_PORT=3306
JWT_SECRET=isi_password_bebas
JWT_EXPIRES=sesuaikan_waktunya
CLOUDINARY_CLOUD_NAME=isi_dari_akun_cloudinary_kamu
CLOUDINARY_API_KEY=isi_dari_akun_cloudinary_kamu
CLOUDINARY_API_SECRET=isi_dari_akun_cloudinary_kamu
CORS_ORIGIN=isi_website_apa_saja_yang_boleh_akses

# jalankan backend
npm run dev
```

### 3. Jalankan Frontend

```
# membuka folder frontend
cd frontend

# melakukan instalasi depedensi
npm install

# melakukan copy paste .env
cp .env.example .env

# konfigurasi isi .env
(untuk lokal API)
VITE_API_URL=http://localhost:3000/api

(untuk online API)
VITE_API_URL=https://backendapi-ecommerce-catalog.vercel.app/api

# menjalankan frontend
npm run dev
```

## Author

dibuat oleh [Machfudin](https://github.com/machfudn)
