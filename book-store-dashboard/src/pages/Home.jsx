import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import bookimg from "../assets/Purple Watercolor Notebook Book Cover small.png";

const Home = () => {
  return (
    <Container maxW="full" mt={10} display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Flex alignItems="center" justifyContent="center">
        <VStack spacing={8} mr={8} flex={3} align="fle-end">
          <Heading as="h1" fontSize="4xl" fontWeight="bold" color="blue.500">
            Manage Your Books
          </Heading>
          <Text fontSize="xl" maxW="lg">
            Welcome to your book management dashboard! Here you can organize and
            keep track of all your books.
          </Text>
          <HStack spacing={4}>
            <IconButton
              icon={<FaFacebook />}
              colorScheme="blue"
              aria-label="Facebook"
            />
            <IconButton
              icon={<FaTwitter />}
              colorScheme="blue"
              aria-label="Twitter"
            />
            <IconButton
              icon={<FaInstagram />}
              colorScheme="blue"
              aria-label="Instagram"
            />
          </HStack>
          <Text fontSize="md" fontStyle="italic">
            Connect with us on social media for updates and tips!
          </Text>
        </VStack>
        <Box flex={1}>
          <Image src={bookimg} alt="Book Management Image" />
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;
