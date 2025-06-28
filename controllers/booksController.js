const queries = require("../db/queries/queries");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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

const validateBook = [
    body("title").trim()
        .isString().withMessage("Title must be text")
        .isLength({min: 1, max: 150}).withMessage("Titles should be less than 150 characters")
        .matches(/^[\w\s'":,?!.&-]+$/) // Regex for letters, numbers and common characters in titles
        .withMessage("Title contains invalid characters"),
    
    body("author").trim()
        .matches(/^[A-Za-z\s]+$/) // Regex for alphabetical letters or spaces only
        .withMessage("Author names must only contain letters and spaces")
];

const getNewBook = (req, res) => {
    res.render("newBook");
};

const postNewBook = [
    validateBook,

    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("newBook", { errors: errors.array()});
        }

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
        const rows = await queries.getBooksAlphaTitle();
        return res.redirect("/books");
    })
];

const getBooks = asyncHandler(async (req, res) => {
    const { sort } = req.query;
    let books;

    if (sort && sort === "title") {
        books = await queries.getBooksAlphaTitle();
    } else if (sort && sort === "author") {
        books = await queries.getBooksAlphaAuthor();
    } else {
        books = await queries.getBooksAlphaTitle();
    }
    return res.render("books", { books });
});

const getSingleBook = asyncHandler(async (req, res) => {
    const {bookId} = req.params;
    const book = await queries.getBookById(bookId);
    const branches = await queries.getBranchesByBookId(bookId);
    res.render("bookPage", {bookTitle: book.title, bookAuthor: book.author, branches});
});

module.exports = { getNewBook, postNewBook, getBooks, getSingleBook };

// Books:
// - Displays a list of books (title and author) / with a link like "Add a book"
// - Click on title or author to sort books by title or author
// - Click on a book -> Displays availability across branches in a form, with a X button and a update button


// Views:
// Books, BookModal, newBook