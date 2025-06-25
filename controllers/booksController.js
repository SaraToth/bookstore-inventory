const getNewBook = (req, res) => {
    res.render("newBook");
};

const postNewBook = (req, res) => {
    res.send("This is where my form will post to before redirecting to index");
};

const getBooks = (req, res) => {
    res.render("books");
};

const getSingleBook = (req, res) => {
    res.send("This is where I will display one book and you can see its inventory in many locations");
};

module.exports = { getNewBook, postNewBook, getBooks, getSingleBook };

// Books:
// - Displays a list of books (title and author) / with a link like "Add a book"
// - Click on title or author to sort books by title or author
// - Click on a book -> Displays availability across branches in a form, with a X button and a update button


// Views:
// Books, BookModal, newBook