import User from "../db/User.js";
export const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({ msg: "Email is required", status: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ msg: "User not found", status: false });
    } else {
      return res.json({ msg: "User Found", status: true, data: user });
    }
  } catch (error) {
    next(error);
  }
};

export const onBoardUser = async (req, res, next) => {
  try {
    const { email, name, about, image: profilePicture } = req.body;
    if (!email || !name || !profilePicture) {
      res.send("Email,Name and Image are required");
    }
    const user = await User.create({ email, name, about, profilePicture });
    return res.json({ msg: "Success", status: true, user });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find(
      {}, //filters
      ["_id", "email", "name", "profilePicture", "about"], // returns
      { sort: { name: 1 } } //sort
    );
    const usersGroup = {};

    users.forEach((user) => {
      const initialLetter = user.name.charAt(0).toUpperCase();
      if (!usersGroup[initialLetter]) {
        usersGroup[initialLetter] = [];
      }
      usersGroup[initialLetter].push(user);
    });
    return res.status(200).send({ users: usersGroup });
  } catch (error) {
    next(error);
  }
};
