const { Router } = require("express");
const booksRouter = Router();
const { getNewBook, postNewBook, getBooks, getSingleBook, updateBookStock } = require("../controllers/booksController");

booksRouter.get("/new", getNewBook);
booksRouter.post("/new", postNewBook);
booksRouter.get("/:bookId", getSingleBook);
booksRouter.post("/:bookId", (req, res) => {res.send("Coming soon: Post updates to stock from Book Page")})
booksRouter.get("/", getBooks);

module.exports = booksRouter;