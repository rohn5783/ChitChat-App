import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSocketContext } from "../../auth/SocketContext";
import "../chat/ChatPage.scss";

const ChatPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { socket, onlineUsers } = useSocketContext();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchUserAndMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Fetch User Info
        const userRes = await axios.get(`/api/user/chat/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        // Fetch Messages
        const msgRes = await axios.get(`/api/messages/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(msgRes.data);

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchUserAndMessages();
  }, [userId]);

  // Listen for new messages via Socket.io
  useEffect(() => {
    if (!socket) return;
    
    const handleNewMessage = (newMessage) => {
        // Only add if the message belongs to the current open chat
        if (newMessage.sender === userId || newMessage.receiver === userId || newMessage.sender === user?._id) {
            setMessages((prev) => [...prev, newMessage]);
        }
    };

    socket.on("newMessage", handleNewMessage);

    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, userId, user]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(`/api/messages/send/${userId}`, 
        { content: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
        );

        setMessages((prev) => [...prev, res.data]);
        setNewMessage("");
    } catch (err) {
        console.error("Error sending message:", err);
    }
  };

  const handleBack = () => {
      navigate("/allusers");
  }

  if (!user) return <div className="loading-chat">Loading chat...</div>;

  const isOnline = onlineUsers.includes(user._id);
  const myUserId = JSON.parse(localStorage.getItem("user"))?._id;

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-header">
         <button onClick={handleBack} className="back-btn">← Back</button>
         <div className="user-info">
             <img src={user.profilePic || "/default-profile.png"} alt={user.name} className="header-avatar" />
             <div className="user-details">
                 <h3>{user.name}</h3>
                 <span className={isOnline ? "status online" : "status offline"}>
                     {isOnline ? "Online" : "Offline"}
                 </span>
             </div>
         </div>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages">
        {messages.map((msg, idx) => {
          const fromMe = msg.sender === myUserId;
          return (
          <div key={idx} className={`message-bubble ${fromMe ? "sent" : "received"}`}>
            <span>{msg.content}</span>
          </div>
        )})}
        <div ref={messagesEndRef} />
      </div>

      {/* Send Message Input */}
      <div className="send-message">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage} disabled={!newMessage.trim()}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;