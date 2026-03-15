import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true
    },

    groupAvatar: {
      type: String,
      default: ""
    },

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Group", groupSchema);