const { poolPromise, sql } = require('../config/db');

exports.getPosts = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
      SELECT p.PostId, p.Title, p.Content, p.CreatedAt, u.UserName
      FROM Posts p
      JOIN Users u ON p.UserId = u.UserId
    `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.userId; // 从 JWT 获取

        const pool = await poolPromise;
        await pool.request()
            .input('UserId', sql.Int, userId)
            .input('Title', sql.NVarChar, title)
            .input('Content', sql.NVarChar, content)
            .query('INSERT INTO Posts (UserId, Title, Content) VALUES (@UserId, @Title, @Content)');

        res.json({ message: 'Post created' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};