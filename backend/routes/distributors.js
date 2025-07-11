const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.post("/create", async (req, res) => {
  const { id, name, password, taxCode, address, provinces } = req.body;

  if (!id || !name || !password) {
    return res.status(400).json({ message: "Thiếu thông tin bắt buộc." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      "INSERT INTO customer (id, name, password, tax_code, address, provinces) VALUES (?, ?, ?, ?, ?, ?)",
      [id, name, hashedPassword, taxCode, address, JSON.stringify(provinces)]
    );

    res.status(201).json({ message: "Tạo khách hàng thành công." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server." });
  }
});

module.exports = router;
