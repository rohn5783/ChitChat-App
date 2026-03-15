import mongoose from "mongoose";

const pendingUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600 // Automatically delete document after 10 minutes (600 seconds)
    }
});

export default mongoose.model("PendingUser", pendingUserSchema);
