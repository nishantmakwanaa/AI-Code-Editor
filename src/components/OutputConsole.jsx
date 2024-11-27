import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

const OutputConsole = ({ output }) => {
  const consoleBgColor = useColorModeValue("#1e1e1e", "#1e1e1e");
  const consoleTextColor = useColorModeValue("white", "white");

  return (
    <Box
      w="100%"
      h="100%"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      maxWidth="100vw"
      maxHeight="100vh"
    >
      <Text
        mb={2}
        fontSize="lg"
        fontWeight="bold"
        p={2}
        bg={consoleBgColor}
        color="blue.600"
        borderTopRadius="md"
      >
        Console :
      </Text>
      <Box
        overflowY="auto"
        p={4}
        bg={consoleBgColor}
        color={consoleTextColor}
        borderBottomRadius="md"
        fontSize="lg"
        height="calc(100% - 40px)"
      >
        <pre
          style={{
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
            wordWrap: "break-word",
            color: consoleTextColor,
          }}
        >
          {output}
        </pre>
      </Box>
    </Box>
  );
};

export default OutputConsole;