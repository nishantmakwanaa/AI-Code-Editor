import React from 'react';
import { Flex, Link, Spacer, Box } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation(); // Get current location
  
  return (
    <Flex
      as="nav"
      bg="rgba(0, 0, 0, 0.5)" // Transparent black background
      p={4}
      alignItems="center"
      height="60px"
      color="white" // White text color
    >
      <Link
        as={RouterLink}
        to="/"
        fontWeight="bold"
        _hover={{ textDecoration: 'none' }}
      >
        CodeCraft
      </Link>
      <Spacer />
      <Box>
        <Link
          as={RouterLink}
          to="/"
          mx={4}
          color={location.pathname === '/' ? '#00FFFF' : 'white'} // Cyan color if on Home page, otherwise white
          _hover={{ color: 'gray', textDecoration: 'none' }} // Grey color on hover, no underline
        >
          Home
        </Link>
        <Link
          as={RouterLink}
          to="/code-editor"
          mx={4}
          color={location.pathname === '/code-editor' ? '#00FFFF' : 'white'} // Cyan color if on Code Editor page, otherwise white
          _hover={{ color: 'gray', textDecoration: 'none' }} // Grey color on hover, no underline
        >
          Workspace
        </Link>
        <Link
          as={RouterLink}
          to="/online-chat-bot"
          mx={4}
          color={location.pathname === '/online-chat-bot' ? '#00FFFF' : 'white'} // Cyan color if on Chat Bot page, otherwise white
          _hover={{ color: 'gray', textDecoration: 'none' }} // Grey color on hover, no underline
        >
          Chat
        </Link>
        <Link
          as={RouterLink}
          to="/youtube-learning"
          mx={4}
          color={location.pathname === '/youtube-learning' ? '#00FFFF' : 'white'} // Cyan color if on Learn To Code page, otherwise white
          _hover={{ color: 'gray', textDecoration: 'none' }} // Grey color on hover, no underline
        >
          Learn
        </Link>
        <Link
          as={RouterLink}
          to="/notes"
          mx={4}
          color={location.pathname === '/notes' ? '#00FFFF' : 'white'} // Cyan color if on Notes page, otherwise white
          _hover={{ color: 'gray', textDecoration: 'none' }} // Grey color on hover, no underline
        >
          Notes
        </Link>
      </Box>
    </Flex>
  );
};

export default NavBar;
