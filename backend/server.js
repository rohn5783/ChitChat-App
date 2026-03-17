import http from "http";
import app from "./src/app.js";
import { initializeSocket } from "./socket/socket.js";

const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

