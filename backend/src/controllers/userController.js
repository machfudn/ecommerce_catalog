const db = require("../config/db");
const bcrypt = require("bcryptjs");

/* ================= GET ALL USERS ================= */
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, username, email FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data users" });
  }
};

/* ================= GET USER BY ID ================= */
exports.getUserById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, username, email FROM users WHERE id = ?",
      [req.params.id]
    );

    if (!rows.length)
      return res.status(404).json({ message: "User tidak ditemukan" });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data user" });
  }
};

/* ================= CREATE USER ================= */
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "User berhasil ditambahkan" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menambahkan user" });
  }
};

/* ================= UPDATE USER ================= */
exports.updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { id } = req.params;

    let query = "UPDATE users SET username = ?, email = ?";
    let params = [username, email];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += ", password = ?";
      params.push(hashedPassword);
    }

    query += " WHERE id = ?";
    params.push(id);

    const [result] = await db.query(query, params);

    if (!result.affectedRows)
      return res.status(404).json({ message: "User tidak ditemukan" });

    res.json({ message: "User berhasil diupdate" });
  } catch (err) {
    res.status(500).json({ message: "Gagal update user" });
  }
};

/* ================= DELETE USER ================= */
exports.deleteUser = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [
      req.params.id,
    ]);

    if (!result.affectedRows)
      return res.status(404).json({ message: "User tidak ditemukan" });

    res.json({ message: "User berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal hapus user" });
  }
};
