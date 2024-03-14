import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

const BookFilter = ({ endpoint, defaultSortBy, setBooks }) => {
  const [sortBy, setSortBy] = useState(defaultSortBy || "publishDate");
  const [status, setStatus] = useState("public");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(endpoint, {
          params: { sortBy, status, title },
        });
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [endpoint, sortBy, status, title]);

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <Flex direction="column" mb={10}>
      <FormControl>
        <FormLabel>Sort By:</FormLabel>
        <Select value={sortBy} onChange={handleSortByChange}>
          <option value="publishDate">Publish Date</option>
          <option value="price">Price</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Status:</FormLabel>
        <Select value={status} onChange={handleStatusChange}>
          <option value="public">Public</option>
          <option value="draft">Draft</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Title:</FormLabel>
        <Input
          placeholder="Enter title"
          value={title}
          onChange={handleTitleChange}
        />
      </FormControl>
    </Flex>
  );
};

export default BookFilter;
