import Chatboticon from "./components/Chatboticon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import { useState } from "react";


const App = () => {
  const [chatHistory, setChatHistory] = useState([]);

  const generateBotResponse = (history) =>{
    console.log(history);
  }



  return (
    <div className='container'>
      <div className="chatbot-popup">
        {/* Chatbot header */}
        <div className="chat-header">
          <div className="header-info">
            <Chatboticon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button><ion-icon name="chevron-down-outline"></ion-icon></button>
        </div>

        {/* Chatbot body */}
        <div className="chat-body">
          <div className="message bot-message">
            <Chatboticon />
            <p className="message-text">
              Hey there 👋 <br /> How can I help you today?
            </p>
          </div>

          {/* Render the chat history dynamically */}
          {chatHistory.map((chat, index) =>(
            <ChatMessage key={index} chat={chat}/>
          ))}
        </div>

        {/* Chatbot footer */}
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
        </div>
      </div>
    </div>
  );
};



export default App