import React from "react";
import "../profile/profile.scss";

const Profile = () => {
  return (
    <div className="profile-page">

      <div className="profile-card">

        <img src="https://i.pravatar.cc/100" />

        <h2>John Doe</h2>

        <p>john@email.com</p>

        <button>Edit Profile</button>

      </div>

    </div>
  );
};

export default Profile;