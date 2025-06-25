const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const indexRouter = require("./routes/indexRouter");
const booksRouter = require("./routes/booksRouter");
const branchRouter = require("./routes/branchRouter");
require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true}));
app.use(express.static(assetsPath));

app.use("/books", booksRouter);
app.use("/branches", branchRouter);
app.use("/", indexRouter);

app.use("/", (err, req, res, next) => {
    console.error(err);
    res.status(500).send(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("App is running");
});