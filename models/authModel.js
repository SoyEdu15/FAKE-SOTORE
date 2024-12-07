const bcrypt = require('bcrypt');
const pool = require('../config/db');

const createUser = async (username, password, role) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await pool.query(
        'INSERT INTO users (username, password, role) VALUES ($1, $2, $3)',
        [username, hashedPassword, role || 'user']
    );
};

const findUserByUsername = async (username) => {
    return await pool.query('SELECT * FROM users WHERE username = $1', [username]);
};

module.exports = { createUser, findUserByUsername };
