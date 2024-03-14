import React, { useState, useEffect } from "react";
import { Container, Flex } from "@chakra-ui/react";
import Book from "../components/Book";
import { Link } from "react-router-dom";
const Draft = () => {
  // State to store draft books
  const [draftBooks, setDraftBooks] = useState([]);

  useEffect(() => {
    // Function to fetch draft books
    const fetchDraftBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/book/mode/draft");
        if (response.ok) {
          const data = await response.json();
          setDraftBooks(data.books);
        } else {
          console.error("Failed to fetch draft books");
        }
      } catch (error) {
        console.error("Error fetching draft books:", error);
      }
    };

    // Call the fetchDraftBooks function
    fetchDraftBooks();
  }, []); // Empty dependency array to fetch draft books only once when the component mounts

  return (
    <Container maxW="xl" py="8">
      <Flex
        gap={2}
        width="100%"
        height="100%"
        justifyContent={"center"}
        flexWrap={"wrap"}
      >
        {/* Map over draft books and render Book component for each */}
        {draftBooks.map((book) => (
          <Link
            to={`/book/${book._id}`}
            key={book._id}
            style={{ width: "100%", height: "100%", margin: 0 }}
          >
            <Book key={book._id} {...book} draft={true} />
          </Link>
        ))}
      </Flex>
    </Container>
  );
};

export default Draft;
