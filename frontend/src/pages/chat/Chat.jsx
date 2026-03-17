import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/sidebar/SideBar";
import ChatWindow from "../../components/chatwindow/ChatWindow";

import "./chat.scss";

const Chat = () => {

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {

    const closeMenu = () => {
      setShowMenu(false);
    };

    window.addEventListener("click", closeMenu);

    return () => {
      window.removeEventListener("click", closeMenu);
    };

  }, []);

  const goToProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {

    localStorage.clear();

    navigate("/login");

  };

  return (

    <div className="chat-page">

      {/* HEADER */}

      <div className="chat-header">

        <button
          className="chat-back"
          onClick={() => navigate("/404")}
        >
          ←
        </button>

        <h2 className="chat-title">
          ChitChat
        </h2>

        <div className="menu-container">

          <button
            className="menu-btn"
            onClick={toggleMenu}
          >
            ⋮
          </button>

          {showMenu && (

            <div className="menu-dropdown">

              <button
                className="menu-item"
                onClick={goToProfile}
              >
                Update Profile
              </button>

              <button
                className="menu-item logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>

          )}

        </div>

      </div>

      {/* CHAT BODY */}

      <motion.div
        className="container"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >

        <Sidebar />

        <ChatWindow />

      </motion.div>

    </div>

  );

};

export default Chat;