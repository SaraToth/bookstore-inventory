const queries = require("../db/queries/queries");
const asyncHandler = require("express-async-handler");

const getNewBook = (req, res) => {
    res.render("newBook");
};

const postNewBook = (req, res) => {
    res.send("This is where my form will post to before redirecting to index");
};

const getBooks = asyncHandler(async (req, res) => {
    const rows = await queries.getBooks();
    res.render("books", { books: rows });
});

const getSingleBook = asyncHandler(async (req, res) => {
    const {bookId} = req.params;
    const book = await queries.getBookById(bookId);
    res.render("bookPage", {bookTitle: book.title});
});

module.exports = { getNewBook, postNewBook, getBooks, getSingleBook };

// Books:
// - Displays a list of books (title and author) / with a link like "Add a book"
// - Click on title or author to sort books by title or author
// - Click on a book -> Displays availability across branches in a form, with a X button and a update button


// Views:
// Books, BookModal, newBook