import React from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CodeEditor from "./components/CodeEditor";
import OnlineChatBot from "./components/OnlineChatBot";
import YouTubeLearning from "./components/YouTubeLearning";
import Notes from "./components/Notes";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import "./index.css";

const theme = {
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Container
          display="flex"
          flexDirection="column"
          minHeight="100vh"
          justifyContent="space-between"
          bg="gray.100"
        >
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/code-editor" element={<CodeEditor />} />
            <Route path="/online-chat-bot" element={<OnlineChatBot />} />
            <Route path="/youtube-learning" element={<YouTubeLearning />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
          <Footer />
        </Container>
      </Router>
    </ChakraProvider>
  );
}

export default App;