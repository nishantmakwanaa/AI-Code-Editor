import React, { useState } from "react";
import { Button, Icon, Tooltip } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { executeCode } from "../api";

const CodeRunnerButton = ({ editorRef, language, setValue }) => {
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
        variant="outline"
        size="sm"
        isLoading={isLoading}
        style={{ transition: "background-color 0.3s, color 0.3s" }}
        _hover={{ backgroundColor: "blue.500", color: "white" }}
      >
        <Icon as={FaPlay} />
      </Button>
    </Tooltip>
  );
};

export default CodeRunnerButton;
