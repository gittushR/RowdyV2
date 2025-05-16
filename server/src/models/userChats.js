import mongoose from "mongoose";

const userChatsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    chats: [
      {
        _id: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        createdAtDate: {
          type: Date,
          default:Date.now(),
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.userchats ||
  mongoose.model("userchats", userChatsSchema);
