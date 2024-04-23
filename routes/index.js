var express = require("express");
var router = express.Router();
const bookRouter = require("./books.api");

/* GET home page. */
router.use("/books", bookRouter);

module.exports = router;
