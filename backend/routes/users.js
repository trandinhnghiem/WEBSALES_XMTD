const express = require("express");
const router  = express.Router();
const db      = require("../db");
const bcrypt  = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

/* ------ TẠO NHÂN VIÊN ------ */
router.post("/employee", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Thiếu dữ liệu nhân viên." });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    await db.execute(
      `INSERT INTO customer
         (id, name, email, password, role)
       VALUES (?, ?, ?, ?, 'employee')`,
      [uuidv4(), name, email, hashed]
    );
    res.status(201).json({ message: "Tạo nhân viên thành công." });
  } catch (err) {
    console.error("Lỗi tạo NV:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ------ LẤY DS NHÂN VIÊN ------ */
router.get("/", async (_req, res) => {
  const [rows] = await db.execute(
    `SELECT id, name, email FROM customer WHERE role = 'employee'`
  );
  res.json(rows);
});

/* ------ XOÁ ------ */
router.delete("/:id", async (req, res) => {
  try {
    await db.execute("DELETE FROM customer WHERE id = ?", [req.params.id]);
    res.json({ message: "Đã xoá" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
