import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/SideBar";
import ChatWindow from "../../components/chatwindow/ChatWindow";
import "../chat/chat.scss";

const Chat = () => {
  const navigate = useNavigate();

  return (
    <div className="chat-page">
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Sidebar className="chat-sidebar" />
        <ChatWindow className="chat-window" />
        
        {/* Floating Back Button for navigation */}
        <button 
          className="chat-back-btn"
          onClick={() => navigate("/profile")}
        >
          &larr; Back to Profile
        </button>
      </motion.div>
    </div>
  );
};

export default Chat;