const { Router } = require("express");
const indexRouter = Router();
const { getIndex } = require("../controllers/indexController");

indexRouter.get("/", getIndex);

module.exports = indexRouter;
