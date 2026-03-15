import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth.api";
import { motion } from "framer-motion";
import "../profile/profile.scss";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="profile-page">
      <motion.div
        className="profile-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <img src="https://i.pravatar.cc/100" />
        <h2>John Doe</h2>
        <p>john@email.com</p>
        <button>Edit Profile</button>
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </motion.div>
    </div>
  );
};

export default Profile;