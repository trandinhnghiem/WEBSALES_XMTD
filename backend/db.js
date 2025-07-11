const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // sửa theo DB của bạn
  database: "distributors",
});

module.exports = pool;
