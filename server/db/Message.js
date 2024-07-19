import { Schema, model } from "mongoose";

const messagesSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  messageStatus: {
    type: String,
    default: "sent",
  },
  createdAt: { type: Date, default: Date.now },
});
export default model("Messages", messagesSchema);
