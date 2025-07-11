const express = require("express");
const router  = express.Router();
const db      = require("../db");
const bcrypt  = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

/* -------------------------------
   LẤY DANH SÁCH TÀI KHOẢN
   GET /api/customers
   GET /api/customers?role=employee
-------------------------------- */
router.get("/", async (req, res) => {
  const { role } = req.query;

  const sql = role
    ? `SELECT id, name, email, password, tax_code, address, credit_limit, provinces, role
         FROM customer WHERE role = ?`
    : `SELECT id, name, email, password, tax_code, address, credit_limit, provinces, role
         FROM customer`;

  try {
<<<<<<< HEAD
    const [rows] = role ? await db.execute(sql, [role]) : await db.execute(sql);

    const data = rows.map((r) => ({
      ...r,
      provinces: r.provinces ? JSON.parse(r.provinces) : [],
=======
    const [rows] = await db.execute(
      "SELECT id, name, password, tax_code, address, credit_limit, provinces FROM customer"
    );

    const data = rows.map((row) => ({
      ...row,
      provinces: row.provinces ? JSON.parse(row.provinces) : [],
>>>>>>> 5ab4cb3a5b2509408d5247796befefbb950cf42b
    }));

    res.json(data);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách:", err);
    res.status(500).json({ message: "Lỗi server." });
  }
});

/* ---------------------------------------------
   TẠO TÀI KHOẢN
   Dùng chung cho cả khách hàng và nhân viên
   Nếu không truyền role → mặc định 'customer'
---------------------------------------------- */
router.post("/create", async (req, res) => {
<<<<<<< HEAD
  const {
    id,
    name,
    password,
    email     = "",
    tax_code  = "",
    address   = "",
    credit_limit,
    provinces = [],
    role      = "customer",
  } = req.body;
=======
  const { id, name, password, tax_code, address, credit_limit, provinces} = req.body;
>>>>>>> 5ab4cb3a5b2509408d5247796befefbb950cf42b

  if (!name || !password) {
    return res.status(400).json({ message: "Thiếu tên hoặc mật khẩu." });
  }

  const userId = id || uuidv4();

  try {
    const hashed = await bcrypt.hash(password, 10);

    await db.execute(
<<<<<<< HEAD
      `INSERT INTO customer
         (id, name, email, password, tax_code, address, credit_limit, provinces, role)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, name, email, hashed, tax_code, address, credit_limit, JSON.stringify(provinces), role]
=======
      `INSERT INTO customer (id, name, password, tax_code, address, credit_limit, provinces)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, name, hashedPassword, tax_code, address, credit_limit || 0, JSON.stringify(provinces)]
>>>>>>> 5ab4cb3a5b2509408d5247796befefbb950cf42b
    );

    res.status(201).json({ message: "Tạo tài khoản thành công." });
  } catch (err) {
<<<<<<< HEAD
    console.error("Lỗi tạo tài khoản:", err);
=======
    console.error("Lỗi tạo khách hàng:", err);
>>>>>>> 5ab4cb3a5b2509408d5247796befefbb950cf42b
    res.status(500).json({ message: "Lỗi server." });
  }
});

module.exports = router;
