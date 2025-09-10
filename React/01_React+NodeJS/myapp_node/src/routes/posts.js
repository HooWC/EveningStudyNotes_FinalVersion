const express = require('express');
const getPool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// [C] 新建文章
router.post('/', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const pool = await getPool();

    await pool.request()
      .input('UserID', req.user.userId)
      .input('Title', title)
      .input('Content', content)
      .query('INSERT INTO Posts (UserID, Title, Content) VALUES (@UserID, @Title, @Content)');

    res.json({ message: '文章已发布' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// [R] 查询文章
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .query(`
        SELECT p.PostID, p.Title, p.Content, p.CreatedAt, u.FullName
        FROM Posts p
        JOIN Users u ON p.UserID = u.UserID
        ORDER BY p.CreatedAt DESC
      `);

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;