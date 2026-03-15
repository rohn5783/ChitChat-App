import React from "react";
import { motion } from "framer-motion";
import "../sidebar/sidebar.scss";

const Sidebar = () => {
  return (
    <motion.div
      className="sidebar"
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >

      <div className="search">
        <input placeholder="Search..." />
      </div>

      <div className="chat-list">

        <div className="chat-item">
          <img src="https://i.pravatar.cc/40" />
          <div>
            <h4>Ram Kumar</h4>
            <p>Last message preview...</p>
          </div>
        </div>

        <div className="chat-item">
          <img src="https://i.pravatar.cc/41" />
          <div>
            <h4>Daisy</h4>
            <p>Last message preview...</p>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Sidebar;