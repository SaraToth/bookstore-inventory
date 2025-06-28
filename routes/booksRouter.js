const { Router } = require("express");
const booksRouter = Router();
const { getNewBook, postNewBook, getBooks, getSingleBook, postStockFromBook, deleteBook } = require("../controllers/booksController");

booksRouter.get("/new", getNewBook);
booksRouter.post("/new", postNewBook);
booksRouter.post("/:bookId/delete", deleteBook);
booksRouter.get("/:bookId", getSingleBook);
booksRouter.post("/:bookId", postStockFromBook);
booksRouter.get("/", getBooks);

module.exports = booksRouter;