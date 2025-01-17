import { useState } from "react";
import Chatboticon from "./components/Chatboticon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";


const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);

  const generateBotResponse = async (history) => {
    try {
      // Prepare messages for OpenAI API
      const messages = [
        { role: "system", content: "You are a helpful chatbot." },
        ...history.map((msg) => ({ role: msg.role, content: msg.text })),
      ];
  
      // Make the API request using fetch
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, 
        },
        body: JSON.stringify({
          model: "gpt-4", 
          messages: messages,
          temperature: 0.7,
        }),
      });
  
      // Parse the JSON response
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
  
      const botMessage = data.choices[0].message.content;
  
      // Update chat history with the bot's response
      setChatHistory((prevHistory) => {
        const updatedHistory = [...prevHistory];
        updatedHistory.pop(); // Remove "Thinking..." placeholder
        updatedHistory.push({ role: "model", text: botMessage });
        return updatedHistory;
      });
    } catch (error) {
      console.error("Error generating bot response:", error);
  
      // Handle errors gracefully
      setChatHistory((prevHistory) => {
        const updatedHistory = [...prevHistory];
        updatedHistory.pop(); // Remove "Thinking..." placeholder
        updatedHistory.push({ role: "model", text: "Sorry, something went wrong. Please try again." });
        return updatedHistory;
      });
    }
  };
  


  return (
    <div className={`container ${showChatbot ? 'show-chatbot' : ""}`}>
        <button onClick={()=>setShowChatbot((prev) => !prev)}  id="chatbot-toggler">
          <span className="material-symbols-outlined">mode_comment</span>
          <span className="material-symbols-outlined">close</span>
        </button>

      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <Chatboticon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button onClick={()=>setShowChatbot((prev) => !prev)} className="material-symbols-outlined">keyboard_arrow_down</button>
        </div>

        {/* Chat Body */}
        <div className="chat-body">
          <div className="message bot-message">
            <Chatboticon />
            <p className="message-text">
              Hey there 👋 <br /> How can I help you today?
            </p>
          </div>

          {/* Render the chat history dynamically  */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat}/>
          ))}
        </div>

        {/* Chatbot footer */}
        <div className="chat-footer">
          <ChatForm
          chatHistory={chatHistory} 
          setChatHistory={setChatHistory}
          generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
