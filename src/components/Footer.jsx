import React, { useState } from 'react';
import { Box, Container, Flex, Link, Text } from "@chakra-ui/react";
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { AiFillYoutube } from 'react-icons/ai';

const Footer = () => {
  const [iconHovered, setIconHovered] = useState(null);

  return (
    <Box bg="rgba(0, 0, 0, 0.5)" color="white" py={8}>
      <Container maxW="container.xl">
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          justify="space-between"
          alignItems="center"
          textAlign={{ base: 'center', md: 'left' }} // Align text to the left on small screens and center on medium screens and above
        >
          <Box flex="1" mb={{ base: 4, md: 0 }}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>Created By Nishant Makwana</Text>
            <Text>CodeCraft Is Full-Fledged AI Powered Coding IDE, Designed For Programmers...</Text>
          </Box>
          <Flex
            justify="flex-end" // Align icons to the right side of the page
            flex="1"
            mt={{ base: 4, md: 0 }}
          >
            <Link href='https://twitter.com/NishantMakwanaa' isExternal mx={2} _hover={{ color: 'teal.500' }} _active={{ color: 'blue' }} onMouseEnter={() => setIconHovered('twitter')} onMouseLeave={() => setIconHovered(null)}><FaTwitter size={24} color={iconHovered === 'twitter' ? 'gray' : 'white'} /></Link>
            <Link href='https://www.linkedin.com/in/nishantmakwanaa' isExternal mx={2} _hover={{ color: 'teal.500' }} _active={{ color: 'blue' }} onMouseEnter={() => setIconHovered('linkedin')} onMouseLeave={() => setIconHovered(null)}><FaLinkedin size={24} color={iconHovered === 'linkedin' ? 'gray' : 'white'} /></Link>
            <Link href='https://github.com/nishantmakwanaa' isExternal mx={2} _hover={{ color: 'teal.500' }} _active={{ color: 'blue' }} onMouseEnter={() => setIconHovered('github')} onMouseLeave={() => setIconHovered(null)}><FaGithub size={24} color={iconHovered === 'github' ? 'gray' : 'white'} /></Link>
            <Link href='https://youtube.com/@nishantmakwanaa' isExternal mx={2} _hover={{ color: 'teal.500' }} _active={{ color: 'blue' }} onMouseEnter={() => setIconHovered('youtube')} onMouseLeave={() => setIconHovered(null)}><AiFillYoutube size={24} color={iconHovered === 'youtube' ? 'gray' : 'white'} /></Link>
          </Flex>
        </Flex>
        <Box textAlign="center" mt={8}>
          <Text>&copy; {new Date().getFullYear()} All Rights Reserved.</Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
