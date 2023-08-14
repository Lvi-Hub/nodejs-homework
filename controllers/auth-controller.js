import bcrypt from "bcryptjs";

import fs from "fs/promises";

import jwt from "jsonwebtoken";

import User from "../models/user.js";

import path from "path";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

import gravatar from "gravatar";

import Jimp from "jimp";

const { JWT_SECRET } = process.env;

const avatarPath = path.resolve("public", "avatars");

//--SignUP
const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const avatarURL = gravatar.url(email);

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
  });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
  });
};

//--SignIN
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
  });
};

//--Current token
const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

//--SignOut
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "Logout success",
  });
};

//Update Avatar
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  console.log( _id);
  console.log(`req: ${req.user}`);
  
  //--
  if (req.file === undefined ){
    throw HttpError(401, `Not authorized`);
  }
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", filename);
  
  //--
  await User.findByIdAndUpdate(_id, { avatarURL : avatarURL });

  res.status(200).json({
    message: `avatarURL : ${avatarURL} `,
  });
};


export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
