const fs = require("fs");

const updateBook = (req, res, next) => {
  //put input validation
  try {
    const allowUpdate = [
      "author",
      "country",
      "imageLink",
      "language",
      "pages",
      "title",
      "year",
    ];

    const { bookId } = req.params;

    const updates = req.body;
    const updateKeys = Object.keys(updates);
    //find update request that not allow
    const notAllow = updateKeys.filter((el) => !allowUpdate.includes(el));

    if (notAllow.length) {
      const exception = new Error(`Update field not allow`);
      exception.statusCode = 401;
      throw exception;
    }
    //put processing logic
    //Read data from db.json then parse to JSobject
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
    //Update new content to db book JS object
    const updatedBook = { ...db.books[targetIndex], ...updates };
    db.books[targetIndex] = updatedBook;

    //db JSobject to JSON string

    db = JSON.stringify(db);
    //write and save to db.json
    fs.writeFileSync("db.json", db);
    //put send response
    res.status(200).send(updatedBook);
  } catch (error) {
    next(error);
  }
};

module.exports = updateBook;
