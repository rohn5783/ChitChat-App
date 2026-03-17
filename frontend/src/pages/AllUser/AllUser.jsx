import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AllUser.scss";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT token from login
        const res = await axios.get("/api/user/chat/all", {
          headers: { Authorization: `Bearer ${token}` }, // send token
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleUserClick = (userId) => {
    navigate(`/chat/${userId}`); // Click → Chat page
  };

  return (
    <div className="all-users">
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id} onClick={() => handleUserClick(user._id)}>
            <img
              src={user.profilePic || "/default-profile.png"}
              alt={user.name}
              width={50}
            />
            <span>{user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllUsers;