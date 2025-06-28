const { Router } = require("express");
const branchRouter = Router();
const { getBranches, getNewBranch, postNewBranch, getSingleBranch, postStockFromBranch } = require("../controllers/branchController");

branchRouter.get("/new", getNewBranch);
branchRouter.post("/new", postNewBranch);
branchRouter.get("/:branch", getSingleBranch);
branchRouter.post("/:branch", postStockFromBranch)
branchRouter.get("/", getBranches);

module.exports = branchRouter;