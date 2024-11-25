import React, { useState } from "react";

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { sender: "User", text: input };

      setMessages((prevMessages) => [...prevMessages, userMessage]);

      try {
        const response = await fetch("https://aicodeeditor.onrender.com/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: input }),
        });

        const data = await response.json();

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "Bot", text: data.answer },
        ]);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "Bot",
            text: "Unable To Fetch The Response. Try Again Later.",
          },
        ]);
      }

      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-cyan-500 text-white rounded-full p-4 shadow-lg hover:bg-cyan-600 transition z-50"
      >
        💬
      </button>

      {isChatOpen && (
        <div className="fixed bottom-16 right-4 bg-black bg-opacity-80 backdrop-blur-md text-white w-full max-w-xs sm:max-w-md h-[50vh] sm:h-[30rem] shadow-xl rounded-lg flex flex-col z-50">
          <div className="bg-cyan-500 p-2 flex items-center justify-between rounded-t-lg">
            <span className="font-bold">Programming Chat</span>
            <button
              onClick={toggleChat}
              className="text-white font-bold hover:text-black transition"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {messages.length > 0 ? (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-2 ${
                    msg.sender === "User"
                      ? "text-right text-gray-100"
                      : "text-left text-cyan-300"
                  }`}
                >
                  <span className="inline-block bg-cyan-700 rounded-lg px-3 py-2 max-w-[80%] break-words">
                    {msg.text}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center mt-10">
                Ask Me Anything About Programming !
              </p>
            )}
          </div>

          <div className="p-2 bg-black bg-opacity-90 flex items-center rounded-b-lg">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 bg-gray-700 text-white p-2 rounded-l-md focus:outline-none focus:ring focus:ring-cyan-500"
            />
            <button
              onClick={sendMessage}
              className="bg-cyan-500 px-4 py-2 rounded-r-md text-white hover:bg-cyan-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
