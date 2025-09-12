const express = require("express");
const getPool = require("../config/db");
const auth = require("../middleware/auth");

const router = express.Router();

// 获取所有文章
router.get("/", async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .query(
        `SELECT p.PostID, p.Title, p.Content, p.CreatedAt, u.FullName
         FROM Posts p
         JOIN Users u ON p.UserID = u.UserID
         ORDER BY p.CreatedAt DESC`
      );
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 创建文章（需要登录）
router.post("/", auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const pool = await getPool();
    const result = await pool
      .request()
      .input("UserID", req.user.userId)
      .input("Title", title)
      .input("Content", content)
      .query(
        `INSERT INTO Posts (UserID, Title, Content)
         VALUES (@UserID, @Title, @Content);
         SELECT SCOPE_IDENTITY() AS PostID;`
      );
    res.json({ postId: result.recordset[0].PostID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 更新文章
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const pool = await getPool();

    await pool
      .request()
      .input("PostID", id)
      .input("UserID", req.user.userId)
      .input("Title", title)
      .input("Content", content)
      .query(
        `UPDATE Posts SET Title = @Title, Content = @Content
         WHERE PostID = @PostID AND UserID = @UserID`
      );

    res.json({ message: "Post updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 删除文章
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getPool();

    await pool
      .request()
      .input("PostID", id)
      .input("UserID", req.user.userId)
      .query("DELETE FROM Posts WHERE PostID = @PostID AND UserID = @UserID");

    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;