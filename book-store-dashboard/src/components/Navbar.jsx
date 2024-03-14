import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="teal.500"
        color="white"
      >
        {/* Title */}
        <Flex align="center" mr={5}>
          <Text
            as={Link}
            to="/"
            fontSize="xl"
            fontWeight="bold"
            textDecoration="none"
          >
            Manage Book
          </Text>
        </Flex>

        {/* Nav items */}
        <Box
          display={{ base: "none", md: "flex" }}
          width={{ base: "auto", md: "auto" }}
          alignItems="center"
        >
          {user ? (
            <>
              <Text as={Link} to="/" mr={5} textDecoration="none">
                Home
              </Text>
              <Text as={Link} to="/draft" mr={5} textDecoration="none">
                Drafts
              </Text>
              <Text as={Link} to="/addbook" mr={5} textDecoration="none">
                Add Book
              </Text>
              <Text
                as={Button}
                onClick={handleLogout}
                mr={5}
                textDecoration="none"
              >
                Log Out
              </Text>
            </>
          ) : (
            <>
              <Text as={Link} to="/login" mr={5} textDecoration="none">
                Log In
              </Text>
              <Text as={Link} to="/register" mr={5} textDecoration="none">
                Sign Up
              </Text>
            </>
          )}
        </Box>
      </Flex>

      <Outlet />
    </>
  );
};

export default Navbar;
