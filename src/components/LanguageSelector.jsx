import React from "react";
import { Box, Button, Center, Menu, MenuButton, MenuItem, MenuList, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { FaGlobe } from "react-icons/fa";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "blue.400";

const LanguageSelector = ({ language, onSelect }) => {
  const bgColor = useColorModeValue("gray.200", "gray.800");

  return (
    <Tooltip label="Select Language" aria-label="Select Language" hasArrow>
      <Menu isLazy>
        <Tooltip label="Select Language" aria-label="Select Language" hasArrow>
          <MenuButton
            as={Button}
            variant="outline"
            colorScheme="blue"
            size="sm"
            aria-label="Select Language"
            _hover={{ backgroundColor: bgColor }}
          >
            <Center> {/* Center the content */}
              <FaGlobe />
            </Center>
          </MenuButton>
        </Tooltip>
        <MenuList bg={bgColor}>
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              color={lang === language ? ACTIVE_COLOR : ""}
              bg={lang === language ? "gray.900" : "transparent"}
              _hover={{
                color: ACTIVE_COLOR,
                bg: "gray.900",
              }}
              onClick={() => onSelect(lang)}
              size="sm"
            >
              {lang}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Tooltip>
  );
};

export default LanguageSelector;
