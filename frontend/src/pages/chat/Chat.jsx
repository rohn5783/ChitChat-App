import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/SideBar";
import ChatWindow from "../../components/chatwindow/ChatWindow";
import "../chat/chat.scss";

const Chat = () => {
  const navigate = useNavigate();

  return (
    <div className="chat-page">
      <div className="container">
        <Sidebar className="chat-sidebar" />
        <ChatWindow className="chat-window" />
        
        {/* Floating Back Button for navigation */}
        <button 
          className="chat-back-btn"
          onClick={() => navigate("/profile")}
        >
          &larr; Back to Profile
        </button>
      </div>
    </div>
  );
};

export default Chat;