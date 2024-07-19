import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import User from "./db/User.js";
dotenv.config();

mongoose.connect(process.env.DATABASE_URL);

// const use = new User({
//   userName: "Pratyush",
//   email: "tpratyush@god.com",
// });
// use.save();

const app = express();
app.use(cors());
app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log("Listening at port 3005");
});
