const express = require('express');
const getPool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// 获取所有用户（需要登录）
router.get('/', auth, async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT UserID, FullName, Email FROM Users');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 获取指定用户
router.get('/:id', auth, async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('UserID', req.params.id)
      .query('SELECT UserID, FullName, Email FROM Users WHERE UserID = @UserID');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: '用户不存在' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
