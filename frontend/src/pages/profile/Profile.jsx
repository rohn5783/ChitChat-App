import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "../../services/auth.api";
import { updateProfile } from "../../services/profile.api";
import { motion } from "framer-motion";
import "../profile/profile.scss";

const Profile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    profilePic: null,
  });

  const [preview, setPreview] = useState("https://i.pravatar.cc/100");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      profilePic: file,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("bio", formData.bio);

      if (formData.profilePic) {
        data.append("profilePic", formData.profilePic);
      }

      await updateProfile(data);

      const user = await getCurrentUser();
      localStorage.setItem("user", JSON.stringify(user));

      alert("Profile Updated Successfully");
      navigate("/chat");
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="profile-page">
      <motion.div
        className="profile-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Setup Your Profile</h2>

        <div className="profile-pic-section">
          <img src={preview} alt="profile" />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />

        <textarea
          name="bio"
          placeholder="Write a short bio..."
          value={formData.bio}
          onChange={handleChange}
        />

        <button onClick={handleSaveProfile}>
          Save Profile
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </motion.div>
    </div>
  );
};

export default Profile;