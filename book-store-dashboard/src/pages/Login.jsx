import React from "react";
import { Flex, Container } from "@chakra-ui/react";
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";

export default function Register() {
  return (
    <Container maxW="lg" centerContent>
      <Flex
        mt="10"
        p="6"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        width="80%"
        mx="auto"
      >
        <LoginForm />
      </Flex>
    </Container>
  );
}
