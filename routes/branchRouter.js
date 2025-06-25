// Branches:
// - Displays a list of branches / with a link like "Add new branch"
// - Click on a branch -> Displays a list of books (title and author)
//                     -> Click on title or author to sort books by title or author
//                     -> Displays a form element next to each book (column) of availability with update buttons

// Views
// Branches, Branch, newBranch

const { Router } = require("express");
const branchRouter = Router();
const { getBranches, getNewBranch, postNewBranch, getSingleBranch } = require("../controllers/branchController");

branchRouter.get("/new", getNewBranch);
branchRouter.post("/new", postNewBranch);
branchRouter.get("/:branch", getSingleBranch);
branchRouter.get("/", getBranches);

module.exports = branchRouter;