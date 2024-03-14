import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";

const AddBookModal = ({ newbook, setnewBook }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImages] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    publishDate: "",
    price: "",
    tags: "",
  });

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImagesChange = async (e) => {
    const selectedImages = e.target.files;

    try {
      const formData = new FormData();

      for (let i = 0; i < selectedImages.length; i++) {
        formData.append("images", selectedImages[i]);
      }

      const response = await fetch(`http://localhost:5000/book/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        if (data.images && data.images.length > 0) {
          setImages(data.images[0].src);
          console.log("Cloud URLs:", data.images);
        }
      } else {
        console.error("Failed to upload images:", data.error);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/book/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, images: image }), // Include image state in formData
      });

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      // Reset form data
      setFormData({
        title: "",
        author: "",
        description: "",
        genre: "",
        publishDate: "",
        price: "",
        tags: "",
      });

      // Close modal
      setnewBook(++newbook);
      handleCloseModal();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await fetch("http://localhost:5000/book/add", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to add book");
  //     }

  //     // Reset form data
  //     setFormData({
  //       title: "",
  //       author: "",
  //       description: "",
  //       genre: "",
  //       publishDate: "",
  //       price: "",
  //       tags: "",
  //     });

  //     // Close modal
  //     setnewBook(++newbook);
  //     handleCloseModal();
  //   } catch (error) {
  //     console.error("Error adding book:", error);
  //   }
  // };

  return (
    <>
      <Button
        position="fixed"
        bottom="4"
        right="4"
        onClick={handleOpenModal}
        backgroundColor="blue.500"
        color="white"
        fontSize="2xl"
        borderRadius="full"
        width="50px"
        height="50px"
        boxShadow="md"
      >
        <IoMdAdd />
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Author</FormLabel>
                <Input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Images</FormLabel>
                <Input
                  type="file"
                  name="images"
                  onChange={handleImagesChange} // Add this line
                  multiple // Add this line if you want to allow selecting multiple images
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Genre</FormLabel>
                <Input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Publish Date</FormLabel>
                <Input
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Tags (comma-separated)</FormLabel>
                <Input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Add
            </Button>
            <Button colorScheme="red" onClick={handleCloseModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddBookModal;
