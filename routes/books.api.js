const express = require("express");
const router = express.Router();
const fs = require("fs");
const crypto = require("crypto");
const getBooks = require("../controllers/getbooks");
const createBook = require("../controllers/createBook");
const updateBook = require("../controllers/updateBook");
const deleteBook = require("../controllers/deleteBook");

/**
 * params: /
 * description: get all books
 * query:
 * method: get
 */

router.get("/", getBooks);

/**
 * params: /
 * description: post a book
 * query:
 * method: post
 */

router.post("/", createBook);

/**
 * params: /
 * description: update a book
 * query:
 * method: put
 */

router.put("/:bookId", updateBook);

/**
 * params: /
 * description: update a book
 * query:
 * method: delete
 */

router.delete("/:bookId", deleteBook);

module.exports = router;
