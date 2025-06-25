const getNewBranch = (req, res) => {
    res.render("newBranch");
};

const postNewBranch = (req, res) => {
    res.send("This is where my new branches will post to before redirecting to index");
};

const getBranches = (req, res) => {
    res.render("branches");
};

const getSingleBranch = (req, res) => {
    res.send("This will be a specific branch page like Hongdae Branch");
};

module.exports = { getNewBranch, postNewBranch, getBranches, getSingleBranch };

// Branches:
// - Displays a list of branches / with a link like "Add new branch"
// - Click on a branch -> Displays a list of books (title and author)
//                     -> Click on title or author to sort books by title or author
//                     -> Displays a form element next to each book (column) of availability with update buttons

// Views
// Branches, Branch, newBranch
