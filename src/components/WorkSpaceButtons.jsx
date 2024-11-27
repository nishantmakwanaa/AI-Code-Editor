import React, { useState, useRef } from "react";
import {
  Button,
  Icon,
  Tooltip,
  Box,
  Center,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { FaUpload, FaSave, FaPlay, FaGlobe } from "react-icons/fa";
import { LANGUAGE_VERSIONS } from "../constants";
import { executeCode } from "../api";

export const LanguageSelector = ({ language, onSelect }) => {
  const bgColor = useColorModeValue("gray.200", "gray.800");
  const languages = Object.entries(LANGUAGE_VERSIONS);
  const ACTIVE_COLOR = "blue.400";

  return (
    <Tooltip label="Select Language" aria-label="Select Language" hasArrow>
      <Menu isLazy>
        <MenuButton
          as={Button}
          variant="solid"
          colorScheme="blue"
          size="lg"
          aria-label="Select Language"
          _hover={{ backgroundColor: bgColor }}
          border="2px solid"
          borderColor="blue.400"
          width="auto"
        >
          <Center>
            <FaGlobe />
          </Center>
        </MenuButton>
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

export const LoadCodeButton = ({ onLoadCode }) => {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const fileContent = e.target.result;
        onLoadCode(fileContent);
      };
      fileReader.readAsText(file);
    } catch (error) {
      console.error("Error while reading file:", error);
    }
  };

  return (
    <Tooltip label="Load Code" aria-label="Load Code" placement="bottom">
      <Box as="span" width="24px" height="24px">
        <input
          type="file"
          id="fileInput"
          accept=".txt,.js,.jsx,.java,.py"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <Button
          onClick={() => document.getElementById("fileInput").click()}
          colorScheme="blue"
          variant="solid"
          size="lg"
          style={{ transition: "background-color 0.3s, color 0.3s" }}
          _hover={{ backgroundColor: "blue.500", color: "white" }}
          border="2px solid"
          borderColor="blue.400"
          width="auto"
        >
          <Icon as={FaUpload} />
        </Button>
      </Box>
    </Tooltip>
  );
};

export const SaveCodeButton = ({ code, language }) => {
  const getFileExtension = (language) => {
    const extensions = {
      python: "py",
      javascript: "js",
      java: "java",
      php: "php",
      csharp: "cs",
      typescript: "ts",
    };
    return extensions[language.toLowerCase()] || language.toLowerCase();
  };

  const handleSave = () => {
    const filename = `code.${getFileExtension(language)}`;
    const blob = new Blob([code], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <Tooltip label="Save Code" aria-label="Save Code" placement="bottom">
      <Button
        onClick={handleSave}
        colorScheme="blue"
        variant="solid"
        size="lg"
        aria-label="Save Code"
        border="2px solid"
        borderColor="blue.400"
        width="auto"
      >
        <Icon as={FaSave} />
      </Button>
    </Tooltip>
  );
};

export const CodeRunnerButton = ({ editorRef, language, setValue }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRunCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setValue(result.output);
    } catch (error) {
      console.error("Error while running code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tooltip label="Run Code" aria-label="Run Code" placement="bottom">
      <Button
        onClick={handleRunCode}
        colorScheme="blue"
        variant="solid"
        size="lg"
        isLoading={isLoading}
        style={{ transition: "background-color 0.3s, color 0.3s" }}
        _hover={{ backgroundColor: "blue.500", color: "white" }}
        border="2px solid"
        borderColor="blue.400"
        width="auto"
      >
        <Icon as={FaPlay} />
      </Button>
    </Tooltip>
  );
};

const WorkSpaceButtons = () => {
  const editorRef = useRef(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const loadCode = (newCode) => {
    setCode(newCode);
  };

  const handleLanguageChange = (newLang) => {
    console.log(`Language changed to ${newLang}`);
  };

  return (
    <HStack spacing={6} justify="center" align="center" p={4}>
      <LoadCodeButton onLoadCode={loadCode} />
      <SaveCodeButton code={code} language="javascript" />
      <LanguageSelector language="javascript" onSelect={handleLanguageChange} />
      <CodeRunnerButton
        editorRef={editorRef}
        language="javascript"
        setValue={setOutput}
      />
    </HStack>
  );
};

export default WorkSpaceButtons;