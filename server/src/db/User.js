import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
});
export default model("User", userSchema);
