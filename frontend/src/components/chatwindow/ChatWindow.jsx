import React from "react";
import MessageBubble from "../messagebubble/MessageBubble";
import "../chatwindow/chatwindow.scss";

const ChatWindow = () => {
  return (
    <div className="chat-window">
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

    </div>
  );
};

export default ChatWindow;