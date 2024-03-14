import React from "react";
import bookimg from "../assets/Purple Watercolor Notebook Book Cover small.png";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import Tag from "./Tag";

export default function Book({
  draft = false,
  title,
  author,
  description,
  genre,
  images,
  publishDate,
  price,
  _id,
  tags,
}) {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mb="4"
      display="flex"
      width={"500px"}
    >
      {/* Image */}
      <Box flex="2" mr="2">
        <Image src={images} />
      </Box>

      <Flex flexDir={"column"} justifyContent={"center"} flex="2" p="6">
        <Text fontWeight="bold" fontSize="xl" mb="2">
          {title}
        </Text>
        <Text fontSize="sm" color="gray.600">
          {description}
        </Text>

        <Flex mt="4" flexWrap={"wrap-reverse"} gap={2} mb={3}>
          {tags.map((tag) => {
            return <Tag text={tag} />;
          })}
        </Flex>
        {/* Explore Button */}
        <Flex justify="flex-end" mt="4" gap={2}>
          <Button colorScheme="blue">Explore</Button>
          {draft && <Button colorScheme="green">Public</Button>}
        </Flex>

        <Flex justifyContent="space-around">
          <span>$ {price}</span>
          <span>{formatDate(publishDate)}</span>
        </Flex>
      </Flex>
    </Box>
  );
}
