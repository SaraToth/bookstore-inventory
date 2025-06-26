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

async function getBranchesByBookId(bookId) {
    const { rows } = await pool.query("SELECT branches.name, stock FROM branches INNER JOIN inventory ON branches.id = inventory.branch_id WHERE inventory.book_id = $1", [bookId]);
    return rows;
}

async function addBranch(branchName) {
    //Add to branches
    await pool.query("INSERT INTO branches (name) VALUES ($1)", [branchName]);

    //get new branch id
    const result = await pool.query("SELECT id FROM branches WHERE branches.name = $1", [branchName]);
    const branchId = result.rows[0].id;

    //Add all books to that branch with stock 0
    await pool.query("INSERT INTO inventory (book_id, branch_id, stock) SELECT books.id, $1, 0 FROM books", [branchId]);
};

async function doesBranchExist(branchName) {
    const result = await pool.query("SELECT branches.name FROM branches WHERE branches.name = $1", [branchName]);
    return result.rows.length > 0;
}



module.exports = { getBranches, getBooks, getBookById, getBooksByBranch, getBranchesByBookId, addBranch, doesBranchExist };