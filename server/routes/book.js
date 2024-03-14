const express = require("express");
const router = express.Router();
const authorization = require("../middleware/authentication.js");
const {
  addBook,
  getAllBooks,
  getBookById,
  getBooksByMode,
  updateBook,
  changeMode,
  getBooks,
} = require("../controllers/book.js");

const { uploadProductImages }= require("../controllers/uploadProductImage");
// router.get("/", getAllBooks);
router.get("/", getBooks);

// GET /books/:id
router.get("/:id", getBookById);

// GET /books/mode/:mode
router.get("/mode/:mode", getBooksByMode);

// POST /books/add
router.post("/add", authorization, addBook);
router.post("/upload", uploadProductImages);

router.patch("/:id", authorization, updateBook);
router.patch("/mode/:id", authorization, changeMode);
// router.get("/filter", sortBooks);

module.exports = router;
