import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Flex,
  Image,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import bookimg from "../assets/Purple Watercolor Notebook Book Cover small.png";
import Tag from "../components/Tag";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookDetail = () => {
  const [book, setBook] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/book/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data.book))
      .catch((error) => console.error("Error fetching book details:", error));
  }, [id]);

  // Function to handle opening and closing of the modal
  const handleModalOpen = () => setIsOpen(true);
  const handleModalClose = () => setIsOpen(false);

  // Function to handle form submission (update book details)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add logic here to handle form submission (update book details)
    console.log("Form submitted");
    // Close the modal after submitting the form
    handleModalClose();
  };

  // Function to handle update button click
  const handleUpdateButtonClick = async () => {
    try {
      console.log(book);
      // Capture values from input fields
      const newTitle = document.getElementById("title").value;
      const newDescription = document.getElementById("description").value;
      const newPrice = parseFloat(document.getElementById("price").value);

      const response = await fetch(`http://localhost:5000/book/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          price: newPrice,
        }),
      });
      if (response.ok) {
        console.log("Book details updated successfully");
        // Update the local state with the updated book details
        setBook((prevBook) => ({
          ...prevBook,
          title: newTitle,
          description: newDescription,
          price: newPrice,
        }));
        toast.success("Book mode updated to draft successfully");
      } else {
        console.error("Failed to update book details");
      }
    } catch (error) {
      console.error("Error updating book details:", error);
    }
  };

  // Function to handle draft button click
  const handleDraftButtonClick = async (mode) => {
    try {
      const response = await fetch(`http://localhost:5000/book/mode/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ mode: mode }), // Pass mode directly
      });
      if (response.ok) {
        console.log("Book mode updated successfully");
        // Update book mode in the local state
        setBook((prevBook) => ({ ...prevBook, mode: mode }));
        toast.success(`Book mode updated to ${mode} successfully`); // Update toast message
      } else {
        console.error("Failed to update book mode");
      }
    } catch (error) {
      console.error("Error updating book mode:", error);
    }
  };

  return (
    <Container
      display="flex"
      minW="100vw"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      p={3}
    >
      <ToastContainer />
      <Box maxW="800px" width="100%" p={4} overflow="hidden" boxShadow="md">
        <Flex justifyContent="center" alignItems="center">
          <Box flex="2">
            {book && <Image src={book.images} alt="Book Image" />}
          </Box>

          {/* Content */}
          <Box flex="3" ml={4}>
            <Flex
              mt="4"
              flexWrap="wrap-reverse"
              alignItems="flex-end"
              justifyContent="flex-end"
              gap={2}
              mb={5}
            >
              {book &&
                book.tags.map((tag, index) => <Tag key={index} text={tag} />)}
            </Flex>
            {/* Render book details */}
            {book && (
              <>
                <Text fontWeight="bold" fontSize="32px" mb={3}>
                  {book.title}
                </Text>
                <Text fontWeight="bold" fontSize="24px" mb={3}>
                  {book.author}
                </Text>
                <Text fontSize="16px" lineHeight={2} mb={3}>
                  {book.description}
                </Text>

                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Text fontWeight="bold" mt="2" fontSize="30px" mb="3">
                    Price: ${book.price}
                  </Text>

                  {/* Update Button */}
                  <Flex gap={2}>
                    <Button colorScheme="blue" onClick={handleModalOpen}>
                      Update
                    </Button>
                    {book.mode === "draft" ? (
                      <Button
                        colorScheme="green" // Change color scheme to green for public mode
                        onClick={() => handleDraftButtonClick("public")} // Pass "public" mode
                      >
                        Public
                      </Button>
                    ) : (
                      <Button
                        colorScheme="red"
                        onClick={() => handleDraftButtonClick("draft")} // Pass "draft" mode
                      >
                        Draft
                      </Button>
                    )}
                  </Flex>
                </Flex>

                {/* Update Modal */}
                <Modal isOpen={isOpen} onClose={handleModalClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Update Book Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <form onSubmit={handleFormSubmit}>
                        <FormControl mt={4}>
                          <FormLabel>Title</FormLabel>
                          <Input
                            type="text"
                            defaultValue={book.title}
                            placeholder="Enter title"
                            id="title"
                          />
                        </FormControl>
                        <FormControl mt={4}>
                          <FormLabel>Description</FormLabel>
                          <Input
                            type="text"
                            defaultValue={book.description}
                            placeholder="Enter description"
                            id="description"
                          />
                        </FormControl>
                        <FormControl mt={4}>
                          <FormLabel>Price</FormLabel>
                          <Input
                            type="number"
                            defaultValue={book.price}
                            placeholder="Enter price"
                            id="price"
                          />
                        </FormControl>
                        <ModalFooter>
                          <Button
                            colorScheme="blue"
                            onClick={handleUpdateButtonClick}
                          >
                            Update
                          </Button>

                          <Button onClick={handleModalClose} ml={3}>
                            Cancel
                          </Button>
                        </ModalFooter>
                      </form>
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </Container>
  );
};

export default BookDetail;
