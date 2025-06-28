const { Router } = require("express");
const branchRouter = Router();
const { getBranches, getNewBranch, postNewBranch, getSingleBranch } = require("../controllers/branchController");

branchRouter.get("/new", getNewBranch);
branchRouter.post("/new", postNewBranch);
branchRouter.get("/:branch", getSingleBranch);
branchRouter.post("/:branch", (req, res) => {res.send("Coming soon: Post updates to stock from Branches")})
branchRouter.get("/", getBranches);

module.exports = branchRouter;