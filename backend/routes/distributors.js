const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

// Lấy danh sách khách hàng
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, name, password, tax_code, address, credit_limit, provinces FROM customer"
    );

    const data = rows.map((row) => ({
      ...row,
      provinces: row.provinces ? JSON.parse(row.provinces) : [],
    }));

    res.json(data);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách khách hàng:", err);
    res.status(500).json({ message: "Lỗi server." });
  }
});

// Tạo khách hàng
router.post("/create", async (req, res) => {
  const { id, name, password, tax_code, address, credit_limit, provinces} = req.body;

  if (!id || !name || !password) {
    return res.status(400).json({ message: "Thiếu thông tin bắt buộc." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      `INSERT INTO customer (id, name, password, tax_code, address, credit_limit, provinces)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, name, hashedPassword, tax_code, address, credit_limit || 0, JSON.stringify(provinces)]
    );

    res.status(201).json({ message: "Tạo khách hàng thành công." });
  } catch (err) {
    console.error("Lỗi tạo khách hàng:", err);
    res.status(500).json({ message: "Lỗi server." });
  }
});

module.exports = router;
