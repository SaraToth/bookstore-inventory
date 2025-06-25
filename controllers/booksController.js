const getNewBook = (req, res) => {
    res.send("This will load the form to add a book");
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