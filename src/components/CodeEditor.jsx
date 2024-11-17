import React, { useRef, useState, useEffect } from "react";
import { Box, Flex, Tooltip, useColorModeValue, Text } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { FaFileImport } from "react-icons/fa";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import OutputConsole from "./OutputConsole";
import CodeRunnerButton from "./CodeRunnerButton";
import LoadCodeButton from "./LoadCodeButton";
import SaveCodeButton from "./SaveCodeButton";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("java");
  const [output, setOutput] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [sidebarWidth] = useState(50);
  const [selectedButton, setSelectedButton] = useState(null);

  const [isMobile, setIsMobile] = useState(false);

  const sidebarBgColor = useColorModeValue("gray.200", "gray.800");
  const bgColor = "linear-gradient(to bottom right, #4F44E0, #32B67A)";
  const buttonBgColor = "white";
  const buttonHoverColor = "cyan.400";

  const codeEditorWidth = "70%";
  const consoleWidth = "30%";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const handleLoadCode = (fileContent) => {
    setValue(fileContent);
  };

  const handleSaveCode = () => {
    SaveCodeButton({ code: value, language });
  };

  const handleSubmitInput = (input) => {
    setInputValue(input);
  };

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <Flex
      p={4}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg={bgColor}
      width="100%"
      height="100vh"
      flexDirection={["column", "row"]}
      justifyContent="space-between"
    >
      {isMobile ? (
        <Box
          width="100%"
          height="100vh"
          bg="red.500"
          color="white"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="lg" fontWeight="bold" textAlign="center">
            For Optimal Coding Experience, Please Use A Tablet Or PC Screen...
          </Text>
        </Box>
      ) : (
        <>
          <Box
            width={["100%", `${sidebarWidth}px`]}
            bg={sidebarBgColor}
            p={2}
            boxShadow="md"
            borderRight="1px solid"
            borderColor="gray.600"
            position="relative"
            mb={[4, 0]}
            borderRadius="md"
          >
            <Flex direction={["column", "column"]}>
              <Box m={2}>
                <LoadCodeButton
                  onLoadCode={handleLoadCode}
                  onClick={() => handleButtonClick("load")}
                  selected={selectedButton === "load"}
                  bg={
                    selectedButton === "load" ? buttonHoverColor : buttonBgColor
                  }
                  borderRadius="md"
                  p={2}
                  color="black"
                  _hover={{ bg: buttonHoverColor }}
                />
              </Box>
              <Box m={2}>
                <SaveCodeButton
                  code={value}
                  language={language}
                  onClick={() => handleButtonClick("save")}
                  selected={selectedButton === "save"}
                  bg={
                    selectedButton === "save" ? buttonHoverColor : buttonBgColor
                  }
                  borderRadius="md"
                  p={2}
                  color="black"
                  _hover={{ bg: buttonHoverColor }}
                />
              </Box>
              <Box m={2}>
                <Tooltip label="Select Language">
                  <LanguageSelector language={language} onSelect={onSelect} />
                </Tooltip>
              </Box>
              <Box m={2}>
                <Tooltip label="Run Code">
                  <CodeRunnerButton
                    editorRef={editorRef}
                    language={language}
                    setValue={setOutput}
                    onClick={() => handleButtonClick("run")}
                    selected={selectedButton === "run"}
                    bg={
                      selectedButton === "run"
                        ? buttonHoverColor
                        : buttonBgColor
                    }
                    borderRadius="md"
                    p={2}
                    color="black"
                    _hover={{ bg: buttonHoverColor }}
                  />
                </Tooltip>
              </Box>
            </Flex>
          </Box>
          <Box
            flex="1"
            p={4}
            bg="transparent"
            minWidth="0"
            width={["100%", codeEditorWidth]}
            mb={[4, 0]}
          >
            <Editor
              options={{ minimap: { enabled: false } }}
              theme="vs-dark"
              language={language}
              defaultValue={CODE_SNIPPETS[language]}
              onMount={onMount}
              value={value}
              onChange={(value) => setValue(value)}
            />
          </Box>
          <Box
            width={["100%", consoleWidth]}
            bg="gray.700"
            p={4}
            boxShadow="md"
            flex="1"
            ml={[0, 4]}
            display="flex"
            flexDirection="column"
          >
            <Box textColor="white" borderRadius="md" flexGrow={1} height="100%">
              <OutputConsole output={output} />
            </Box>
          </Box>
        </>
      )}
    </Flex>
  );
};

export default CodeEditor;
