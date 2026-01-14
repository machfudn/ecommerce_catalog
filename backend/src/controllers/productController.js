const db = require("../config/db");
const uploadToCloudinary = require("../utils/cloudinaryUpload");
const deleteCloudinaryFile = require("../utils/cloudinaryDelete");

// GET all produk
exports.getAllProduk = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
      p.id,
      p.sku,
      p.nama,
      p.harga,
      p.berat,
      p.deskripsi,
      p.stok,
      p.ukuran,
      p.image_url,
      p.status_tampil,
      p.created_at,
      c.nama AS nama_kategori
      FROM products p
      LEFT JOIN categories c ON p.id_kategori = c.id
      ORDER BY p.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil produk" });
  }
};

// GET produk by id
exports.getProdukById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      `
      SELECT 
      p.*,
      c.nama AS nama_kategori
      FROM products p
      LEFT JOIN categories c ON p.id_kategori = c.id
      WHERE p.id = ?
      LIMIT 1
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Produk tidak ditemukan",
      });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error getProdukById:", err);
    res.status(500).json({
      message: "Gagal mengambil detail produk",
    });
  }
};

// CREATE produk
exports.createProduk = async (req, res) => {
  try {
    let imageUrl = null;
    let imagePublicId = null;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    const {
      sku,
      nama,
      id_kategori,
      harga,
      stok,
      ukuran,
      perawatan,
      temperamen,
      deskripsi,
      berat,
      status_tampil,
    } = req.body;

    await db.query(
      `
      INSERT INTO products
      (sku, nama, id_kategori, harga, stok, ukuran, perawatan, temperamen,
       deskripsi, image_url, image_public_id, berat, status_tampil)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        sku,
        nama,
        id_kategori,
        harga,
        stok ?? 0,
        ukuran,
        perawatan ?? "Mudah",
        temperamen ?? "Damai",
        deskripsi,
        imageUrl,
        imagePublicId,
        berat ?? 500,
        status_tampil ?? "Aktif",
      ]
    );

    res.json({ message: "Produk berhasil ditambahkan" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menambahkan produk" });
  }
};

// UPDATE produk
exports.updateProduk = async (req, res) => {
  const { id } = req.params;

  try {
    const [[old]] = await db.query(
      "SELECT image_public_id FROM products WHERE id = ?",
      [id]
    );

    if (!old)
      return res.status(404).json({ message: "Produk tidak ditemukan" });

    let imageUrl = null;
    let imagePublicId = old.image_public_id;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;

      if (old.image_public_id) await deleteCloudinaryFile(old.image_public_id);
    }

    const data = { ...req.body };
    if (imageUrl) {
      data.image_url = imageUrl;
      data.image_public_id = imagePublicId;
    }

    await db.query("UPDATE products SET ? WHERE id = ?", [data, id]);

    res.json({ message: "Produk berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ message: "Gagal update produk" });
  }
};

// DELETE produk
exports.deleteProduk = async (req, res) => {
  const { id } = req.params;

  try {
    const [[row]] = await db.query(
      "SELECT image_public_id FROM products WHERE id = ?",
      [id]
    );

    if (!row)
      return res.status(404).json({ message: "Produk tidak ditemukan" });

    await db.query("DELETE FROM products WHERE id = ?", [id]);

    if (row.image_public_id) await deleteCloudinaryFile(row.image_public_id);

    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus produk" });
  }
};
