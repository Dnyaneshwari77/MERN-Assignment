const Book = require("../models/book");
const { StatusCodes } = require("http-status-codes");

const addBook = async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      publishDate,
      price,
      author,
      tags,
      images,
    } = req.body;

    console.log("Images" + images);

    // Check if all required fields are provided
    if (!title || !description || !genre || !price || !tags) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error:
          "Please provide all required fields: title, description, genre, publishDate, price, tags",
      });
    }

    const book = await Book.create({
      title,
      author,
      description,
      genre,
      publishDate,
      price,
      tags,
      images,
    });

    // Return success response
    return res.status(StatusCodes.CREATED).json({
      book,
      message: "Book added successfully",
    });
  } catch (error) {
    console.error("Error in adding book:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(StatusCodes.OK).json({ books });
  } catch (error) {
    console.error("Error in getting all books:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

// Controller function to get a book by its ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Book not found" });
    }
    return res.status(StatusCodes.OK).json({ book });
  } catch (error) {
    console.error("Error in getting book by ID:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

// Controller function to get books by mode (public or draft)
const getBooksByMode = async (req, res) => {
  try {
    const { mode } = req.params;
    const books = await Book.find({ mode });
    return res.status(StatusCodes.OK).json({ books });
  } catch (error) {
    console.error("Error in getting books by mode:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price } = req.body;

    // Check if at least one field is provided to update
    if (!title && !description && !price) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Please provide at least one field to update",
      });
    }

    // Find the book by ID
    let book = await Book.findById(id);
    if (!book) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Book not found" });
    }

    // Update the provided fields
    if (title) book.title = title;
    if (description) book.description = description;
    if (price) book.price = price;

    // Save the updated book
    book = await book.save();

    // Return success response
    return res.status(StatusCodes.OK).json({
      book,
      message: "Book updated successfully",
    });
  } catch (error) {
    console.error("Error in updating book:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

const changeMode = async (req, res) => {
  try {
    const { id } = req.params;
    const { mode } = req.body;

    // Check if the provided mode is valid
    if (!["public", "draft"].includes(mode)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid mode provided" });
    }

    // Find the book by ID
    const book = await Book.findById(id);
    if (!book) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Book not found" });
    }

    // Update the mode
    book.mode = mode;
    await book.save();

    // Return success response
    return res
      .status(StatusCodes.OK)
      .json({ message: "Mode updated successfully" });
  } catch (error) {
    console.error("Error in changing mode:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

const getBooks = async (req, res) => {
  try {
    const { title, status, genre, sortBy } = req.query;
    let filterCriteria = {};

    // Check if title parameter is provided for search
    if (title) {
      filterCriteria.title = { $regex: title, $options: "i" }; // Case-insensitive search
    }

    // Check if status parameter is provided for filtering (published or draft)
    if (status) {
      filterCriteria.mode = status;
    }

    // Check if genre parameter is provided for filtering
    if (genre) {
      filterCriteria.genre = genre;
    }

    // Find books with filtering criteria
    let books;

    console.log(filterCriteria);
    if (Object.keys(filterCriteria).length > 0) {
      books = await Book.find(filterCriteria);
    } else {
      // If no filtering options provided, return all books without filtering
      books = await Book.find();
    }

    // Check if sortBy parameter is provided for sorting
    if (sortBy) {
      switch (sortBy) {
        case "publishDate":
          books = books.sort(
            (a, b) => new Date(a.publishDate) - new Date(b.publishDate)
          );
          break;
        case "ratings":
          books = books.sort((a, b) => a.ratings - b.ratings);
          break;
        default:
          // Do nothing if sortBy parameter is not recognized
          break;
      }
    }

    res.json({ books });
  } catch (error) {
    console.error("Error retrieving books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  getBooksByMode,
  updateBook,
  changeMode,
  getBooks,
};
