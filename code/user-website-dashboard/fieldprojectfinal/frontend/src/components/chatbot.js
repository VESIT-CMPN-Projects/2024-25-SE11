import React, { useState } from "react";
import "../styles.css";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you with fire safety today?" }
  ]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (input.trim() === "") return;
  
    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
  
    try {
      const response = await axios.post("http://localhost:3001/api/chatbot/chat", { message: input });

      console.log("🟢 Response from server:", response.data);
      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("❌ Chatbot request failed:", error);
      setMessages(prev => [...prev, { sender: "bot", text: "Error fetching response." }]);
    }
  };
  

  return isMinimized ? (
    <div className="chatbot-minimized" onClick={() => setIsMinimized(false)}>
      <div className="chatbot-minimized-content">
        <span>🔥 Fire Safety Help</span>
      </div>
    </div>
  ) : (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>Fire Safety Assistant</h3>
        <button className="minimize-btn" onClick={() => setIsMinimized(true)}>
          &ndash;
        </button>
      </div>

      <div className="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <div className="message-bubble">{msg.text}</div>
          </div>
        ))}
      </div>

      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about fire safety..."
          autoFocus
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
