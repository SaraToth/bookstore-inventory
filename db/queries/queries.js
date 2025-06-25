const pool = require("../pool");

async function getBranches() {
    const { rows } = await pool.query("SELECT name FROM branches");
    return rows;
}

async function getBooks() {
    const { rows } = await pool.query("SELECT * FROM books");
    return rows;
}

async function getBookById(bookId) {
    const { rows } = await pool.query("SELECT * FROM books WHERE id = $1", [bookId]);
    return rows[0];
}

module.exports = { getBranches, getBooks, getBookById };