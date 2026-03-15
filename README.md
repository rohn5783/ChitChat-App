# 💬 ChitChat - Real-Time Chat Application

ChitChat is a modern real-time chat application that allows users to communicate instantly with each other.  
It is designed to provide a smooth messaging experience with secure authentication and an intuitive UI.

This project is built as a full-stack application using modern web technologies and is intended for learning, portfolio demonstration, and real-time communication experimentation.

---

# 🚀 Features

- 🔐 User Authentication (Register / Login / Logout)
- 💬 Real-time messaging system
- 👤 User profiles with profile pictures
- 📝 Create and manage chats
- 📡 Instant message updates
- 📱 Responsive UI (works on desktop and mobile)
- 🔒 Secure backend APIs
- ⚡ Fast and scalable architecture

---

# 🏗️ Tech Stack

### Frontend
- React.js
- JavaScript
- CSS / Tailwind (if used)
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT (JSON Web Token)
- Cookies

### Other Tools
- REST APIs
- Git & GitHub

---

# 📁 Project Structure
ChitChat-App
│
├── backend
│ ├── controllers
│ ├── middleware
│ ├── models
│ ├── routes
│ ├── config
│ └── server.js
│
├── frontend
│ ├── src
│ │ ├── components
│ │ ├── pages
│ │ ├── services
│ │ └── App.jsx
│ │
│ └── package.json
│
└── README.md


---

# ⚙️ Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/rohn5783/ChitChat-App.git
cd ChitChat-App
📦 Backend Setup
cd backend
npm install

Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

Start backend server:

npm run dev
🎨 Frontend Setup

Open a new terminal:

cd frontend
npm install

Start frontend:

npm run dev
🌐 Environment Variables

Example .env

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
NODE_ENV=development
🔐 Authentication Flow

User registers an account

Credentials stored securely in database

User logs in

Server generates JWT token

Token stored in cookies

Protected routes verify authentication

📡 API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
User
GET /api/user/profile
PUT /api/user/update
Chat
GET /api/chat
POST /api/chat/message
🧠 Future Improvements

📱 Mobile app version

🔔 Real-time notifications

🧑‍🤝‍🧑 Group chats

🟢 Online/offline user status

📎 File and image sharing

🔍 Message search

🔐 End-to-end encryption

🎥 Video / Voice calling

🧪 Testing

Future improvements include:

Unit testing

API testing

Integration testing

🤝 Contributing

Contributions are welcome!

Steps to contribute:

Fork the repository

Create a new branch

git checkout -b feature-name

Commit your changes

git commit -m "Added new feature"

Push to GitHub

git push origin feature-name

Create a Pull Request

📄 License

This project is open-source and available under the MIT License.

👨‍💻 Author

Rohit

GitHub
https://github.com/rohn5783

⭐ Support

If you like this project, please give it a ⭐ on GitHub.
It helps others discover the project and motivates further development.
