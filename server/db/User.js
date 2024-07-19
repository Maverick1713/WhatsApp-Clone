import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
  },
  sentMessages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  receivedMessages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});
export default model("User", userSchema);
