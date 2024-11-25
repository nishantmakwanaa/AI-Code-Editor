import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      position="relative"
      bgGradient="linear(to-br, #4F44E0, #32B67A)"
      animation="backgroundMove 5s infinite alternate"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex="-1"
      />

      <Box textAlign="center" color="white" zIndex="1">
        <Heading
          as="h1"
          fontSize={{ base: "2.5rem", md: "3rem" }}
          fontWeight="bold"
          mb="4"
        >
          Welcome to CodeCraft
        </Heading>
        <Text fontSize={{ base: "1.5rem", md: "2xl" }} mb="8">
          Learn, Practice, and Explore the World of Coding
        </Text>

        <Box display="flex" justifyContent="center" alignItems="center" gap="4">
          <Link to="/code-editor">
            <CustomButton>Workspace</CustomButton>
          </Link>
          <Link to="/youtube-learning">
            <CustomButton>Learn</CustomButton>
          </Link>
        </Box>
      </Box>

      <style>
        {`
          @keyframes backgroundMove {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
        `}
      </style>
    </Box>
  );
};

const CustomButton = ({ children }) => (
  <Button
    bg="black"
    color="white"
    width="125px"
    height="40px"
    borderRadius="8px"
    boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
    transition="all 0.3s ease"
    _hover={{
      bg: "gray.800",
      transform: "scale(1.05)",
      color: "cyan",
    }}
    _active={{ bg: "gray.900", transform: "scale(0.95)" }}
  >
    {children}
  </Button>
);

export default Home;
