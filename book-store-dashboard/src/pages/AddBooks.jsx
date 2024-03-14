import React, { useState, useEffect } from "react";
import { Container, Flex } from "@chakra-ui/react";
import AddBookModal from "../components/AddBookModal";
import Book from "../components/Book";
import { Link } from "react-router-dom";
import BookFilter from "../components/BookFilter";


const AddBooks = () => {
  const [books, setBooks] = useState([]);

  const [newbook, setnewBook] = useState(0);



  useEffect(() => {
    fetch("http://localhost:5000/book")
      .then((response) => response.json())
      .then((data) => setBooks(data.books))
      .catch((error) => console.error("Error fetching books:", error));
  }, [newbook]);

  return (
    <Container maxW="xl" py="8">
      <BookFilter
        endpoint="http://localhost:5000/book/"
        defaultSortBy="publishDate"
        setBooks={setBooks}
      />

      <Flex
        gap={2}
        width="100%"
        height="100%"
        justifyContent="center"
        flexWrap="wrap"
      >
        {books.length > 0 ? (
          books.map((book) => (
            <Link
              to={`/book/${book._id}`}
              key={book.id}
              style={{ width: "100%", height: "100%", margin: 0 }}
            >
              <Book {...book} />
            </Link>
          ))
        ) : (
          <h1>No books uploaded</h1>
        )}
      </Flex>
      <AddBookModal setnewBook={setnewBook} newbook={newbook} />
    </Container>
  );
};

export default AddBooks;
