// Books:
// - Displays a list of books (title and author) / with a link like "Add a book"
// - Click on title or author to sort books by title or author
// - Click on a book -> Displays availability across branches in a form, with a X button and a update button


// Views:
// Books, BookModal, newBook

const { Router } = require("express");
const booksRouter = Router();
const { getNewBook, postNewBook, getBooks, getSingleBook } = require("../controllers/booksController");

booksRouter.get("/new", getNewBook);
booksRouter.post("/new", postNewBook);
booksRouter.get("/:book", getSingleBook);
booksRouter.get("/", getBooks);

module.exports = booksRouter;