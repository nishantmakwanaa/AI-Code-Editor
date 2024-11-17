import React, { useRef, useState } from "react";
import { Box, Flex, Tooltip, useColorModeValue } from "@chakra-ui/react";
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
  const [sidebarWidth] = useState(50); // Set sidebar width to 50px
  const [selectedButton, setSelectedButton] = useState(null); // Track selected button

  const sidebarBgColor = useColorModeValue("gray.200", "gray.800");
  const bgColor = "linear-gradient(to bottom right, #4F44E0, #32B67A)";
  const buttonBgColor = "gray.300"; // Button background color
  const buttonHoverColor = "cyan.400"; // Button hover color

  // Adjusted horizontal width for the components
  const codeEditorWidth = "70%";
  const consoleWidth = "30%";

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
    SaveCodeButton({ code: value, language }); // Trigger the save action
  };

  const handleSubmitInput = (input) => {
    setInputValue(input);
  };

  // Function to handle button click
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    // Add your custom styling or animation logic here
  };

  return (
    <Flex
      p={4}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg={bgColor} // Apply background gradient
      width="100" // Set width to take up the whole viewport
      height="100vh" // Set height to take up the whole viewport
      flexDirection="row" // Align children in a row
      justifyContent="space-between" // Add space between children
    >
      {/* Sidebar */}
      <Box
        width={`${sidebarWidth}px`}
        bg={sidebarBgColor}
        p={2}
        boxShadow="md"
        borderRight="1px solid"
        borderColor="gray.600"
        position="relative"
        mr={4} // Margin right
        borderRadius="md" // Sidebar border radius
      >
        <Flex direction="column">
          <Box m={10}>
            <LoadCodeButton onLoadCode={handleLoadCode} onClick={() => handleButtonClick("load")} selected={selectedButton === "load"} bg={selectedButton === "load" ? buttonHoverColor : buttonBgColor} borderRadius="md" p={2} _hover={{ bg: buttonHoverColor }} />
          </Box>
          <Box m={10}>
            <SaveCodeButton code={value} language={language} onClick={() => handleButtonClick("save")} selected={selectedButton === "save"} bg={selectedButton === "save" ? buttonHoverColor : buttonBgColor} borderRadius="md" p={2} _hover={{ bg: buttonHoverColor }} />
          </Box>
          <Box m={10}>
            <Tooltip label="Select Language">
              <LanguageSelector language={language} onSelect={onSelect} />
            </Tooltip>
          </Box>
          <Box m={10}>
            <Tooltip label="Run Code">
              <CodeRunnerButton editorRef={editorRef} language={language} setValue={setOutput} onClick={() => handleButtonClick("run")} selected={selectedButton === "run"} bg={selectedButton === "run" ? buttonHoverColor : buttonBgColor} borderRadius="md" p={2} _hover={{ bg: buttonHoverColor }} />
            </Tooltip>
          </Box>
        </Flex>
      </Box>
      {/* Code editor */}
      <Box flex="1" p={4} bg="transparent" minWidth="0" width={codeEditorWidth}> {/* Set width to codeEditorWidth */}
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
      {/* Console */}
      <Box width={consoleWidth} bg="gray.700" p={4} boxShadow="md" flex="1" ml={4} display="flex" flexDirection="column"> {/* Set width to consoleWidth */}
        {/* Input Console */}
        {/* Output Console */}
        <Box textColor="white" borderRadius="md" flexGrow={1} height="100%">
          <OutputConsole output={output} />
        </Box>
      </Box>
    </Flex>
  );
};

export default CodeEditor;
