const queries = require("../db/queries/queries");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const e = require("express");

const toProperNoun = (rawName) => {
    return rawName
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());
};

const getNewBranch = (req, res) => {
    return res.render("newBranch");
};

const validateBranch = [
    body("branchName").trim()
        .notEmpty().withMessage("Branch name cannot be empty")
        .isAlpha().withMessage("Branch name must only use alphabetical characters")
        .isLength({min: 1, max: 25}).withMessage("Branch name must not exceed 25 characters")
];

const postNewBranch = [
    validateBranch,

    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("newBranch", { errors: errors.array()});
        }

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
    })
];

const getBranches = asyncHandler(async (req, res) => {
    const rows = await queries.getBranches();
    return res.render("branches", { branches: rows });
});

const getSingleBranch = asyncHandler(async (req, res) => {
    const branch = req.params.branch;
    const books = await queries.getBooksByBranch(branch);
    return res.render("branchPage", {branch, books});
});

const postStockFromBranch = asyncHandler(async (req, res) => {
     //Will need to validae form input
    res.send("Coming soon: Post updates to stock from Branches")
});

module.exports = { getNewBranch, postNewBranch, getBranches, getSingleBranch, postStockFromBranch };

// Branches:
//                     -> Click on title or author to sort books by title or author
//                     -> Displays a form element next to each book (column) of availability with update buttons

// Views
// Branches, Branch, newBranch
