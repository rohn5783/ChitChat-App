import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth.api";
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
      <div className="profile-card">
        <img src="https://i.pravatar.cc/100" />
        <h2>John Doe</h2>
        <p>john@email.com</p>
        <button>Edit Profile</button>
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;