import React from "react";
import "../sidebar/sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">

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

    </div>
  );
};

export default Sidebar;