const { Router } = require("express");
const booksRouter = Router();
const { getNewBook, postNewBook, getBooks, getSingleBook, updateBookStock } = require("../controllers/booksController");

booksRouter.get("/new", getNewBook);
booksRouter.post("/new", postNewBook);
booksRouter.get("/:bookId", getSingleBook);
booksRouter.post("/:bookId", updateBookStock)
booksRouter.get("/", getBooks);

module.exports = booksRouter;