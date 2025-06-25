const { Router } = require("express");
const branchRouter = Router();
const { getBranches, getNewBranch, postNewBranch, getSingleBranch } = require("../controllers/branchController");

branchRouter.get("/new", getNewBranch);
branchRouter.post("/new", postNewBranch);
branchRouter.get("/:branch", getSingleBranch);
branchRouter.get("/", getBranches);

module.exports = branchRouter;