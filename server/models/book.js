const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publishDate: {
    type: Date,
    default: Date.now(),
  },
  price: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  mode: {
    type: String,
    enum: ["public", "draft"],
    default: "public",
  },
  images: {
    type: String,
    // default: "",
  },
});

bookSchema.methods.saveBook = async function () {
  try {
    // Ensure that the document has been modified before attempting to save
    if (this.isModified()) {
      await this.save(); // Save the document with updated values
      return this; // Return the updated document
    } else {
      throw new Error("No changes to save");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("Book", bookSchema);
