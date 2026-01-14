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