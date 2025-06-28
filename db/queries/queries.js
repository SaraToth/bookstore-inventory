const pool = require("../pool");

async function getBranches() {
    const { rows } = await pool.query("SELECT name FROM branches ORDER BY name");
    return rows;
}

async function getBooksAlphaTitle() {
    const { rows } = await pool.query("SELECT * FROM books ORDER BY title");
    return rows;
}

async function getBooksAlphaAuthor() {
    const { rows } = await pool.query("SELECT * FROM books ORDER BY author");
    return rows;
}

async function getBookById(bookId) {
    const { rows } = await pool.query("SELECT * FROM books WHERE id = $1", [bookId]);
    return rows[0];
}

async function getBranchId(branchName) {
   const { rows } = await pool.query("SELECT id FROM branches WHERE name = $1", [branchName]);
   return rows[0].id;
}

async function getBooksByBranch(branch) {
    const { rows } = await pool.query("SELECT title, author, stock FROM books INNER JOIN inventory ON books.id = inventory.book_id INNER JOIN branches ON inventory.branch_id = branches.id WHERE branches.name = $1", [branch]);
    return rows;
}

async function getBooksByBranchAlphaTitle(branch) {
    const { rows } = await pool.query("SELECT books.id, title, author, stock FROM books INNER JOIN inventory ON books.id = inventory.book_id INNER JOIN branches ON inventory.branch_id = branches.id WHERE branches.name = $1 ORDER BY books.title", [branch]);
    return rows;
}

async function getBooksByBranchAlphaAuthor(branch) {
    const { rows } = await pool.query("SELECT books.id, title, author, stock FROM books INNER JOIN inventory ON books.id = inventory.book_id INNER JOIN branches ON inventory.branch_id = branches.id WHERE branches.name = $1 ORDER BY books.author", [branch]);
    return rows;
}

async function getBranchesByBookId(bookId) {
    const { rows } = await pool.query("SELECT branches.id, branches.name, stock FROM branches INNER JOIN inventory ON branches.id = inventory.branch_id WHERE inventory.book_id = $1", [bookId]);
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

async function addBook(title, author) {
    //Add to books
    await pool.query("INSERT INTO books (title, author) VALUES ($1, $2)", [title, author]);

    //Get new book id
    const result = await pool.query("SELECT id FROM books WHERE title = $1 AND author = $2", [title, author]);
    const bookId = result.rows[0].id;

    //Add to inventory for all branches with a stock 0
    await pool.query("INSERT INTO inventory (book_id, branch_id, stock) SELECT $1, branches.id, 0 FROM branches", [bookId]);
}

async function doesBookExist(title, author) {
    const result = await pool.query("SELECT id FROM books WHERE books.title = $1 AND books.author = $2", [title, author]);
    
    return result.rows.length > 0;
}

async function updateStockFromBook() {

};

async function updateStockFromBranch(branchId, updates) {
    console.log(updates);
    console.log(branchId);
    const runUpdates = updates.map(({bookId, stock}) => {
        return pool.query("UPDATE inventory SET stock = $1 WHERE book_id = $2 AND branch_id = $3",
            [stock, bookId, branchId]
        );
    });

    await Promise.all(runUpdates);
}



module.exports = { getBranches, getBooksAlphaTitle, getBooksAlphaAuthor, getBookById, getBranchId, getBooksByBranch, getBooksByBranchAlphaTitle, getBooksByBranchAlphaAuthor, getBranchesByBookId, addBranch, doesBranchExist, addBook, doesBookExist, updateStockFromBook, updateStockFromBranch };