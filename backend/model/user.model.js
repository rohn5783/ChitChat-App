import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    profilePic: {
      type: String,
      default: ""
    },

    bio: {
      type: String,
      default: ""
    },

    isOnline: {
      type: Boolean,
      default: false
    },

    lastSeen: {
      type: Date,
      default: Date.now
    },

    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    isEmailVerified: {
      type: Boolean,
      default: false
    },

    emailOtp: {
      type: String,
      default: ""
    },

    emailOtpExpiry: {
      type: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);