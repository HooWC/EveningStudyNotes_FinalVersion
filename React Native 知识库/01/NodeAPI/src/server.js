require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

const app = express();
app.use(cors()); // 这样 React (http://localhost:3000) 就能请求 Node (http://localhost:5000)。
app.use(express.json()); // 让后端能读取 JSON 请求体

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5567;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));