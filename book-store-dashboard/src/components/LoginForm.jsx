import React, { useState } from "react";
import {
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Flex,
  Container,
} from "@chakra-ui/react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        // Save token to local storage
        localStorage.setItem("token", data.user.token);
        // Call the login function to update the user state
        login(data.user);
        // window.location.href = "/addbook";
        navigate("/addbook");
      } else {
        // Handle error response
        console.error(data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Flex
      mt="2"
      p="6"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      width="80%"
      mx="auto"
    >
      <Heading size="lg" mb={5}>
        Login
      </Heading>
      <VStack
        as="form"
        onSubmit={handleSubmit}
        spacing={4}
        align="stretch"
        w="100%"
      >
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" onClick={login}>
          Login
        </Button>
      </VStack>
    </Flex>
  );
};

export default LoginForm;
