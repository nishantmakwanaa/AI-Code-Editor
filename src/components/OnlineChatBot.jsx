import React, { useState, useEffect } from "react";
import axios from "axios";

function OnlineChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Default AI welcome message
    const defaultMessage = "How can I assist you today?";
    setMessages([{ sender: "ai", text: defaultMessage }]);
  }, []);

  const sendMessage = async () => {
    if (input.trim() === "") return; // Prevent empty messages from being sent

    // Add the user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: input },
    ]);

    setInput(""); // Clear the input field
    setIsLoading(true); // Show loading state

    try {
      // Send request to the API with the user's input as a query parameter
      const response = await axios.get(
        `https://aicodeeditor-backend.vercel.app/api/chat?message=${encodeURIComponent(input)}`
      );

      // Add the AI's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: response.data.message || "No response received." },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Display an error message if the request fails
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: "Error: Could not retrieve response." },
      ]);
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-5 bg-gradient-to-br from-[#4F44E0] to-[#32B67A] font-poppins">
      <h1 className="text-center text-2xl font-bold mb-5 md:text-3xl">
        Chat With <span className="text-[#32B67A]">AI</span>
      </h1>
      <div className="chat-container flex flex-col gap-5 mt-5 overflow-y-auto max-h-[500px] md:max-h-[70vh]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender}-box border rounded-lg p-3 bg-white text-black`}
          >
            <div className="font-bold mb-2">
              {message.sender === "user" ? "User :" : "AI :"}
            </div>
            <span>{message.text}</span>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center items-center py-3 text-white font-semibold">
            Loading...
          </div>
        )}
      </div>
      <div className="input-container flex items-center mt-5 pb-5">
        <input
          type="text"
          placeholder="Type Your Message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-3 text-base border rounded-lg mr-3 focus:outline-none focus:ring-2 focus:ring-[#32B67A]"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading} // Disable button while loading
          className="px-6 py-3 text-base font-semibold bg-[#32B67A] text-white rounded-lg hover:bg-[#28a745] transition-colors duration-300 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default OnlineChatBot;
