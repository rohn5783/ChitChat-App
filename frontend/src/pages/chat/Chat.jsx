import React from "react";
import Sidebar from "../../components/sidebar/SideBar";
import ChatWindow from "../../components/chatwindow/ChatWindow";
import "../chat/chat.scss";

const Chat = () => {
  return (
    <div className="chat-page">
      <div className="container">
        <Sidebar />
        <ChatWindow />
      </div>
    </div>
  );
};

export default Chat;