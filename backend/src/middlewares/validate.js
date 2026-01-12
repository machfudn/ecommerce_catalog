exports.validateProduk = (req, res, next) => {
  const { sku, nama, harga, stok, id_kategori } = req.body;

  if (!sku || !nama || harga == null || stok == null || !id_kategori) {
    return res.status(400).json({
      message: "SKU, Nama, Kategori, Harga, dan Stok wajib diisi",
    });
  }

  if (harga <= 0) {
    return res.status(400).json({ message: "Harga harus lebih dari 0" });
  }

  if (stok < 0) {
    return res.status(400).json({ message: "Stok tidak boleh negatif" });
  }

  next();
};
exports.validateKategori = (req, res, next) => {
  const { nama } = req.body;

  if (!nama || nama.trim() === "") {
    return res.status(400).json({ message: "Nama kategori wajib diisi" });
  }

  next();
};
