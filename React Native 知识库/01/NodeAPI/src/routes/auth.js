const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getPool = require("../config/db");

const router = express.Router();

// 注册
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const pool = await getPool();

    // 检查是否存在
    const check = await pool
      .request()
      .input("Email", email)
      .query("SELECT * FROM Users WHERE Email = @Email");
    if (check.recordset.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool
      .request()
      .input("FullName", fullName)
      .input("Email", email)
      .input("PasswordHash", hashedPassword)
      .query(
        `INSERT INTO Users (FullName, Email, PasswordHash)
         VALUES (@FullName, @Email, @PasswordHash);
         SELECT SCOPE_IDENTITY() AS UserID;`
      );

    const userId = result.recordset[0].UserID;
    res.json({ message: "Registration successful", userId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 登录
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const pool = await getPool();

    const result = await pool
      .request()
      .input("Email", email)
      .query("SELECT * FROM Users WHERE Email = @Email");

    if (result.recordset.length === 0) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const user = result.recordset[0];
    const validPassword = await bcrypt.compare(password, user.PasswordHash);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user.UserID, email: user.Email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;