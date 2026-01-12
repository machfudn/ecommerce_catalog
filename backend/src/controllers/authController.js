const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const [exist] = await db.query(
      "SELECT id FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (exist.length)
      return res
        .status(400)
        .json({ message: "Username / Email sudah terdaftar" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.json({ message: "Register berhasil" });
  } catch (err) {
    res.status(500).json({ message: "Gagal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (!rows.length)
      return res.status(401).json({ message: "Email tidak terdaftar" });

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Password salah" });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Gagal Server Error" });
  }
};
