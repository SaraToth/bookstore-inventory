const { error } = require("console");
const queries = require("../db/queries/queries");
const asyncHandler = require("express-async-handler");

const toProperNoun = (rawName) => {
    return rawName
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());
};

const getNewBranch = (req, res) => {
    return res.render("newBranch");
};

const postNewBranch = asyncHandler(async (req, res) => {
    const {branchName } = req.body;

    const newBranch = toProperNoun(branchName);

    // Don't allow duplicate branches
    const branchExists = await queries.doesBranchExist(newBranch);
    if (branchExists) {
        return res.status(400).render("newBranch", { errors: [{msg: "That branch already exists"}]});
    }

    // Add non-duplicate branches
    await queries.addBranch(newBranch);

    const rows = await queries.getBranches();
    return res.redirect("/branches")
});

const getBranches = asyncHandler(async (req, res) => {
    const rows = await queries.getBranches();
    return res.render("branches", { branches: rows });
});

const getSingleBranch = asyncHandler(async (req, res) => {
    const branch = req.params.branch;
    const books = await queries.getBooksByBranch(branch);
    return res.render("branchPage", {branchTitle: branch, books});
});

module.exports = { getNewBranch, postNewBranch, getBranches, getSingleBranch };

// Branches:
// - Displays a list of branches / with a link like "Add new branch"
// - Click on a branch -> Displays a list of books (title and author)
//                     -> Click on title or author to sort books by title or author
//                     -> Displays a form element next to each book (column) of availability with update buttons

// Views
// Branches, Branch, newBranch
