import React from "react";
import { Button, Icon, Tooltip } from "@chakra-ui/react";
import { FaSave } from "react-icons/fa";

const SaveCodeButton = ({ code, language }) => {
  // Function to map language to file extension
  const getFileExtension = (language) => {
    const extensions = {
      python: "py",
      javascript: "js",
      java: "java",
      php: "php",
      csharp: "cs",
      typescript: "ts",
    };
    return extensions[language.toLowerCase()] || language.toLowerCase(); // Return the corresponding extension, or the language name in lowercase if not found
  };

  const handleSave = () => {
    const filename = `code.${getFileExtension(language)}`; // Set filename with proper extension
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
        variant="outline"
        size="sm"
        aria-label="Save Code"
      >
        <Icon as={FaSave} />
      </Button>
    </Tooltip>
  );
};

export default SaveCodeButton;
