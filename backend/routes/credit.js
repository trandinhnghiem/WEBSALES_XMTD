const express = require("express");
const router  = express.Router();
const db      = require("../db");

/*  LẤY THÔNG TIN HẠN MỨC  ------------------------------------
    Trả về  id, name, credit_limit, credit_used, credit_left
------------------------------------------------------------ */
router.get("/", async (_req, res) => {
  try {
    /*  Giả sử bảng orders có:
          - customer_id  (khớp với accounts.id)
          - total_amount (giá trị đơn hàng)
          - status != 'canceled'  => tính vào đã sử dụng
    */
    const [rows] = await db.execute(`
      SELECT  a.id,
              a.name,
              a.credit_limit,
              IFNULL(SUM(o.total_amount),0) AS credit_used,
              a.credit_limit - IFNULL(SUM(o.total_amount),0) AS credit_left
      FROM    accounts a
      LEFT JOIN orders o ON o.customer_id = a.id
           AND o.status <> 'canceled'
      GROUP BY a.id, a.name, a.credit_limit
      ORDER BY a.name;
    `);

    res.json(rows);
  } catch (err) {
    console.error("Lỗi lấy thông tin hạn mức:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
