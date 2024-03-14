import React from "react";
import { Text } from "@chakra-ui/react";
export default function Tag({ text }) {
  return (
    <Text
      fontSize="sm"
      color="gray.600"
      mr={2}
      paddingX={3}
      paddingY={1}
      borderRadius={5}
      background={"gray.300"}
    >
      {text}
    </Text>
  );
}
