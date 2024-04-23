const fs = require("fs");

const deleteBook = (req, res, next) => {
  //delete input validation
  try {
    const { bookId } = req.params;
    //delete processing logic
    let db = fs.readFileSync("db.json", "utf-8");
    db = JSON.parse(db);
    const { books } = db;
    //find book by id
    const targetIndex = books.findIndex((book) => book.id === bookId);
    if (targetIndex < 0) {
      const exception = new Error(`Book not found`);
      exception.statusCode = 404;
      throw exception;
    }
    //filter db books object
    db.books = books.filter((book) => book.id !== bookId);
    //db JSobject to JSON string

    db = JSON.stringify(db);
    //write and save to db.json

    fs.writeFileSync("db.json", db);
    //delete send response
    res.status(200).send({});
  } catch (error) {
    next(error);
  }
};

module.exports = deleteBook;
