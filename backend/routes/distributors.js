const express = require("express");
const router  = express.Router();
const db      = require("../db");
const bcrypt  = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

/* -------------------------------
   LẤY DANH SÁCH TÀI KHOẢN
   GET /api/accounts 
   GET /api/accounts?role=employee
-------------------------------- */
router.get("/", async (req, res) => {
  const { role } = req.query;

  const sql = role
    ? `SELECT id, name, email, password, tax_code, address, credit_limit, provinces, role
         FROM accounts WHERE role = ?`
    : `SELECT id, name, email, password, tax_code, address, credit_limit, provinces, role
         FROM accounts`;

  try {
    const [rows] = role ? await db.execute(sql, [role]) : await db.execute(sql);

    const data = rows.map((r) => ({
      ...r,
      provinces: r.provinces ? JSON.parse(r.provinces) : [],
    }));

    res.json(data);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách:", err);
    res.status(500).json({ message: "Lỗi server." });
  }
});
/* -------------------------------  CẬP NHẬT TÀI KHOẢN  ----------------------------- */
/* PUT /api/accounts/:id
   – Frontend gửi bất kỳ trường nào cần đổi
----------------------------------------------------------------------------- */
router.put("/:id", async (req, res) => {
  const { name, password, email, tax_code, address, credit_limit, provinces } = req.body;
  if (!name) return res.status(400).json({ message: "Thiếu tên." });

  try {
    /* build SET động */
    const sets = ["name = ?"];
    const params = [name];

    if (email       !== undefined) { sets.push("email = ?");        params.push(email); }
    if (tax_code    !== undefined) { sets.push("tax_code = ?");     params.push(tax_code); }
    if (address     !== undefined) { sets.push("address = ?");      params.push(address); }
    if (credit_limit!== undefined) { sets.push("credit_limit = ?"); params.push(credit_limit); }
    if (provinces   !== undefined) { sets.push("provinces = ?");    params.push(JSON.stringify(provinces)); }
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      sets.push("password = ?");
      params.push(hash);
    }

    params.push(req.params.id); // WHERE id = ?

    await db.execute(
      `UPDATE accounts SET ${sets.join(", ")} WHERE id = ?`,
      params
    );
    res.json({ message: "Cập nhật thành công." });
  } catch (err) {
    console.error("Lỗi cập nhật:", err);
    res.status(500).json({ message: "Server error" });
  }
});


/* ---------------------------------------------
   TẠO TÀI KHOẢN (chung cho khách + nhân viên)
   Nếu không truyền role → mặc định là 'customer'
---------------------------------------------- */
router.post("/create", async (req, res) => {
  const {
    id,
    name,
    password,
    email        = "",
    tax_code     = "",
    address      = "",
    credit_limit = 0,
    provinces    = [],
    role         = "customer",
  } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Thiếu tên hoặc mật khẩu." });
  }

  const userId = id || uuidv4();

  try {
    const hashed = await bcrypt.hash(password, 10);

    await db.execute(
      `INSERT INTO accounts
         (id, name, email, password, tax_code, address, credit_limit, provinces, role)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        name,
        email,
        hashed,
        tax_code,
        address,
        credit_limit,
        JSON.stringify(provinces),
        role,
      ]
    );

    res.status(201).json({ message: "Tạo tài khoản thành công." });
  } catch (err) {
    console.error("Lỗi tạo tài khoản:", err);
    res.status(500).json({ message: "Lỗi server." });
  }
});

/* -------------------------
   XOÁ TÀI KHOẢN THEO ID
   DELETE /api/accounts/:id
-------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    await db.execute("DELETE FROM accounts WHERE id = ?", [req.params.id]);
    res.json({ message: "Đã xoá tài khoản thành công." });
  } catch (err) {
    console.error("Lỗi xoá tài khoản:", err);
    res.status(500).json({ message: "Lỗi server khi xoá." });
  }
});

module.exports = router;
