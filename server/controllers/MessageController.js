import User from "../db/User.js";
import Message from "../db/Message.js";
import { renameSync } from "fs";

export const addMessage = async (req, res, next) => {
  try {
    const { message, from, to } = req.body;
    const getUser = onlineUsers.get(to);
    if (message && from && to) {
      const newMessage = await Message.create({
        message,
        sender: from,
        receiver: to,
        messageStatus: getUser ? "delivered" : "sent",
      });
      return res.status(201).send({ message: newMessage });
    }
    return res.status(400).send("From,to and message are required");
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.params;
    const messages = await Message.find({
      $or: [
        { $and: [{ sender: from }, { receiver: to }] },
        { $and: [{ sender: to }, { receiver: from }] },
      ],
    }).sort({ createdAt: 1 });
    const unreadMessages = [];

    messages.forEach((message, index) => {
      if ("read" !== message.messageStatus && to == message.sender) {
        messages[index].messageStatus = "read";
        unreadMessages.push(message._id);
      }
    });
    await Message.updateMany(
      {
        _id: { $in: unreadMessages },
      },
      {
        messageStatus: "read",
      }
    );
    res.status(200).json({ messages });
  } catch (error) {
    next(error);
  }
};

export const addImageMessage = async (req, res, next) => {
  try {
    if (req.file) {
      const date = Date.now();
      let fileName = "uploads/images/" + date + req.file.originalname;
      renameSync(req.file.path, fileName);
      const { from, to } = req.query;

      if (from && to) {
        const message = await Message.create({
          message: fileName,
          type: "image",
          sender: from,
          receiver: to,
        });
        return res.status(201).json({ message });
      }
      return res.status(400).send("From , to are require ");
    }
    return res.status(400).send("Image is required");
  } catch (error) {
    next(error);
  }
};
