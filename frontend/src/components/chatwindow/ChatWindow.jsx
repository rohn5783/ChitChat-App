import React from "react";
import { motion } from "framer-motion";
import MessageBubble from "../messagebubble/MessageBubble";
import "../chatwindow/chatwindow.scss";

const ChatWindow = () => {
  return (
    <motion.div
      className="chat-window"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="chat-header">
        <h3>Ram Kumar</h3>
        <span className="status-pill">Online</span>
      </div>

      <div className="messages">
        <MessageBubble text="Hi... How are you?" />
        <MessageBubble text="I'm good! How about you?" own />
      </div>

      <div className="chat-input">
        <input placeholder="Type a message..." />
        <button>Send</button>
      </div>

    </motion.div>
  );
};

export default ChatWindow;