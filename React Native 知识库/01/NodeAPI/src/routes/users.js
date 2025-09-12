const express = require("express");
const getPool = require("../config/db");
const auth = require("../middleware/auth");

const router = express.Router();

// 获取所有用户（需要登录）
router.get("/", auth, async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT UserID, FullName, Email, CreatedAt FROM Users");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;