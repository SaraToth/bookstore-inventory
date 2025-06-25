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

async function getBooksByBranch(branch) {
    const { rows } = await pool.query("SELECT title, author, stock FROM books INNER JOIN inventory ON books.id = inventory.book_id INNER JOIN branches ON inventory.branch_id = branches.id WHERE branches.name = $1", [branch]);
    return rows;
}

module.exports = { getBranches, getBooks, getBookById, getBooksByBranch };