import React, { useState, useEffect } from "react";
import axios from "axios";

function OnlineChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const defaultMessage = "How can I assist you today?";
    setMessages([{ sender: "ai", text: defaultMessage }]);
  }, []);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: input },
    ]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://aicodeeditor.vercel.app/api/chat",
        {
          message: input,
        }
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: response.data.response },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: "Error: Could Not Retrieve Response..." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="app"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "Poppins",
        backgroundImage: "linear-gradient(to bottom right, #4F44E0, #32B67A)",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "2em",
          marginBottom: "20px",
        }}
      >
        Chat With <span style={{ color: "#32B67A" }}>AI</span>
      </h1>
      <div
        className="chat-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "50px",
          overflowY: "auto",
          maxHeight: "500px",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender}-box`}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              overflowY: "auto",
              backgroundColor: "white",
              color: "black",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
              {message.sender === "user" ? "User :" : "AI :"}
            </div>
            <span>{message.text}</span>
          </div>
        ))}
        {isLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Loading...
          </div>
        )}
      </div>
      <div
        className="input-container"
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Type Your Message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#32B67A",
            color: "#fff",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseDown={(e) =>
            (e.currentTarget.style.backgroundColor = "#28a745")
          }
          onMouseUp={(e) => (e.currentTarget.style.backgroundColor = "#32B67A")}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default OnlineChatBot;
