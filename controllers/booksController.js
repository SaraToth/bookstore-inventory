const { title } = require("process");
const queries = require("../db/queries/queries");
const asyncHandler = require("express-async-handler");
const { raw } = require("body-parser");

const toTitleCase = (rawTitle) => {
    const smallWords = ["and", "or", "the", "of", "a", "an", "in", "on", "at", "of", "for", "to", "by", "with", "from", "but"];

    return rawTitle
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
        if (smallWords.includes(word) && index !== 0) {
            return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

} 

const toProperNoun = (rawName) => {
    return rawName
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());
};

const getNewBook = (req, res) => {
    res.render("newBook");
};

const postNewBook = asyncHandler(async (req, res) => {
    const { title, author } = req.body;
    
    const newTitle = toTitleCase(title);
    const newAuthor = toProperNoun(author);
    
    // Don't allow duplicate books
    const bookExists = await queries.doesBookExist(newTitle, newAuthor);
    if (bookExists) {
        return res.status(400).render("newBook", { errors: [{msg: "That book already exists"}]});
    }

    //Add non-duplicate books
    await queries.addBook(newTitle, newAuthor);

    //Reload books and redirect
    const rows = await queries.getBooks();
    return res.redirect("/books");
});

const getBooks = asyncHandler(async (req, res) => {
    const rows = await queries.getBooks();
    res.render("books", { books: rows });
});

const getSingleBook = asyncHandler(async (req, res) => {
    const {bookId} = req.params;
    const book = await queries.getBookById(bookId);
    const branches = await queries.getBranchesByBookId(bookId);
    res.render("bookPage", {bookTitle: book.title, branches});
});

module.exports = { getNewBook, postNewBook, getBooks, getSingleBook };

// Books:
// - Displays a list of books (title and author) / with a link like "Add a book"
// - Click on title or author to sort books by title or author
// - Click on a book -> Displays availability across branches in a form, with a X button and a update button


// Views:
// Books, BookModal, newBook