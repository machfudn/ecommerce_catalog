const db = require("../config/db");

// GET semua kategori
exports.getAllCategories = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM categories ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data kategori" });
  }
};

// GET kategori berdasarkan ID
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil detail kategori" });
  }
};

// CREATE kategori baru
exports.createCategory = async (req, res) => {
  const { nama } = req.body;

  if (!nama) {
    return res.status(400).json({ message: "Nama kategori wajib diisi" });
  }

  try {
    const query = "INSERT INTO categories (nama) VALUES (?)";
    const [result] = await db.query(query, [nama]);

    res.status(201).json({
      message: "Kategori berhasil ditambahkan",
      categoryId: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menambahkan kategori" });
  }
};

// UPDATE kategori
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { nama } = req.body;

  try {
    const query = "UPDATE categories SET nama = ? WHERE id = ?";
    const [result] = await db.query(query, [nama, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }

    res.json({ message: "Kategori berhasil diperbarui" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal memperbarui kategori" });
  }
};

// DELETE kategori
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    // Catatan: Jika ada foreign key di tabel produk,
    // pastikan menangani relasinya (ON DELETE SET NULL atau lainnya)
    const [result] = await db.query("DELETE FROM categories WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }

    res.json({ message: "Kategori berhasil dihapus" });
  } catch (err) {
    console.error(err);
    // Error biasanya terjadi jika kategori masih digunakan oleh produk (Integrity Constraint)
    res.status(500).json({
      message:
        "Gagal menghapus kategori. Pastikan kategori tidak sedang digunakan oleh produk apapun.",
    });
  }
};
