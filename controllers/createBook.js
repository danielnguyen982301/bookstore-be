const fs = require("fs");
const crypto = require("crypto");

const createBook = (req, res, next) => {
  //post input validation
  try {
    const { author, country, imageLink, language, pages, title, year } =
      req.body;
    if (
      !author ||
      !country ||
      !imageLink ||
      !language ||
      !pages ||
      !title ||
      !year
    ) {
      const exception = new Error(`Missing body info`);
      exception.statusCode = 401;
      throw exception;
    }
    //post processing logic
    const newBook = {
      author,
      country,
      imageLink,
      language,
      pages: parseInt(pages) || 1,
      title,
      year: parseInt(year) || 0,
      id: crypto.randomBytes(4).toString("hex"),
    };
    //Read data from db.json then parse to JSobject
    let db = fs.readFileSync("db.json", "utf-8");
    db = JSON.parse(db);
    const { books } = db;

    //Add new book to book JS object
    books.push(newBook);
    //Add new book to db JS object
    db.books = books;
    //db JSobject to JSON string
    db = JSON.stringify(db);
    //write and save to db.json
    fs.writeFileSync("db.json", db);
    //post send response
    res.status(200).send(newBook);
  } catch (error) {
    next(error);
  }
};

module.exports = createBook;
