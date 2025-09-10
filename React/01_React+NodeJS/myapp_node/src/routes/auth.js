const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sql = require('mssql'); // ✅ 引入 mssql 类型
const getPool = require('../config/db');

const router = express.Router();

// 注册
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const pool = await getPool();

    // 检查是否已存在
    const check = await pool.request()
      .input('Email', sql.NVarChar(255), email) // ✅ 显式指定类型
      .query('SELECT * FROM Users WHERE Email = @Email');

    if (check.recordset.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash 密码
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.request()
      .input('FullName', sql.NVarChar(255), fullName)
      .input('Email', sql.NVarChar(255), email)
      .input('PasswordHash', sql.NVarChar(sql.MAX), hashedPassword)
      .query(`
        INSERT INTO Users (FullName, Email, PasswordHash)
        VALUES (@FullName, @Email, @PasswordHash);
        SELECT SCOPE_IDENTITY() AS UserID;
      `);

    res.json({ message: 'Registration successful', userId: result.recordset[0].UserID });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 登录
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const pool = await getPool();

    const result = await pool.request()
      .input('Email', sql.NVarChar(255), email) // ✅ 显式指定类型
      .query('SELECT * FROM Users WHERE Email = @Email');

    if (result.recordset.length === 0) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const user = result.recordset[0];

    // ✅ 调试输出
    console.log("Login attempt:", email);
    console.log("Fetched user:", user);

    const validPassword = await bcrypt.compare(password, user.PasswordHash);

    if (!validPassword) {
      console.log("Invalid password, input:", password, "hash in DB:", user.PasswordHash);
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: user.UserID, email: user.Email },
      process.env.JWT_SECRET || 'mysecretkey', // ✅ 防止 JWT_SECRET 没设置时报错
      { expiresIn: '7d' }
    );

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;