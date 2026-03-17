import Chat from "../model/chat.model.js";
import Message from "../model/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let chat = await Chat.findOne({
      users: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      chat = await Chat.create({
        users: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      sender: senderId,
      chat: chat._id,
      content,
    });

    await newMessage.save();

    chat.lastMessage = newMessage._id;
    await chat.save();

    // Socket functionality
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const chat = await Chat.findOne({
      users: { $all: [senderId, userToChatId] },
    });

    if (!chat) return res.status(200).json([]);

    const messages = await Message.find({ chat: chat._id });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
