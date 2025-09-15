const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { poolPromise, sql } = require('../config/db');

exports.register = async (req, res) => {
    try {
        const { email, password, userName } = req.body;
        const pool = await poolPromise;

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.request()
            .input('Email', sql.NVarChar, email)
            .input('PasswordHash', sql.NVarChar, hashedPassword)
            .input('UserName', sql.NVarChar, userName)
            .query(`INSERT INTO Users (Email, PasswordHash, UserName) VALUES (@Email, @PasswordHash, @UserName)`);

        res.json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const pool = await poolPromise;

        const result = await pool.request()
            .input('Email', sql.NVarChar, email)
            .query(`SELECT * FROM Users WHERE Email = @Email`);

        const user = result.recordset[0];
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const validPassword = await bcrypt.compare(password, user.PasswordHash);
        if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user.UserId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};