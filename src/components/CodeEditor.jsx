import React, { useRef, useState, useEffect } from "react";
import { Box, Flex, Text, HStack, Button } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import {
  LoadCodeButton,
  SaveCodeButton,
  LanguageSelector,
  CodeRunnerButton,
} from "./WorkSpaceButtons";
import { CODE_SNIPPETS } from "../constants";
import OutputConsole from "./OutputConsole";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("java");
  const [output, setOutput] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [editorWidth, setEditorWidth] = useState("50%");

  const bgGradient = "linear-gradient(to bottom right, #4F44E0, #32B67A)";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
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
    setValue(CODE_SNIPPETS[language] || "");
  };

  const handleLoadCode = (fileContent) => setValue(fileContent);

  // Handle Resizing
  const handleResize = (e, data) => {
    setEditorWidth(data.size.width);
  };

  return (
    <Flex
      direction="column"
      width="100vw"
      height="100vh"
      bgGradient={bgGradient}
      color="white"
      overflow="hidden"
      position="relative"
    >
      <style>
        {`
          @keyframes backgroundMove {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }

          /* Resizing handles */
          .resizable {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .resizable .resizer {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 10px;
            background-color: #aaa;
            cursor: ew-resize;
          }
        `}
      </style>

      <HStack
        spacing={20}
        px={6}
        py={3}
        bg="rgba(0, 0, 0, 0.7)"
        borderBottom="1px solid"
        borderColor="gray.600"
        justify="center"
      >
        <LoadCodeButton onLoadCode={handleLoadCode} size="lg" />
        <SaveCodeButton code={value} language={language} size="lg" />
        <LanguageSelector language={language} onSelect={onSelect} size="lg" />
        <CodeRunnerButton
          editorRef={editorRef}
          language={language}
          setValue={setOutput}
          size="lg"
        />
      </HStack>

      <Flex flex="1" direction="row" overflow="hidden">
        <Box
          flex={`1 1 ${editorWidth}`}
          className="resizable"
          bg="rgba(0, 0, 0, 0.5)"
          p={4}
        >
          <Editor
            options={{
              minimap: { enabled: false },
              wordWrap: "on",
              automaticLayout: true,
            }}
            theme="vs-dark"
            language={language}
            value={value}
            onMount={onMount}
            onChange={(newValue) => setValue(newValue || "")}
          />
          <div className="resizer" onMouseDown={handleResize}></div>
        </Box>
        <Box
          flex="1 1 50%"
          bg="rgba(0, 0, 0, 0.7)"
          p={4}
          borderLeft="1px solid"
          borderColor="gray.600"
        >
          <OutputConsole output={output || "Output will appear here..."} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default CodeEditor;