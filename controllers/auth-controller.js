import bcrypt from "bcryptjs";

import { nanoid } from "nanoid";

import fs from "fs/promises";

import jwt from "jsonwebtoken";

import User from "../models/user.js";

import path from "path";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError, sendEmail, createVerifyEmail } from "../helpers/index.js";

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
  const verificationCode = nanoid();

  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
    verificationCode,
  });

  const verifyEmail = createVerifyEmail({ email, verificationCode });

  await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
  });
};

//--Verify
const verify = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) {
    throw HttpError(404, "Email not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });

  res.json({
    message: "Verify success",
  });
};

//Resend Verify Email
const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "Email not found");
  }

  if (user.verify) {
    throw HttpError(400, "Email already verify");
  }

  const verifyEmail = createVerifyEmail({
    email,
    verificationCode: user.verificationCode,
  });

  await sendEmail(verifyEmail);

  res.json({
    message: "Resend email success",
  });
};

//--SignIN
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verify");
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
  console.log(_id);
  console.log(`req: ${req.user}`);

  //--
  if (req.file === undefined) {
    throw HttpError(401, `Not authorized`);
  }
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", filename);

  //--
  await User.findByIdAndUpdate(_id, { avatarURL: avatarURL });

  res.status(200).json({
    message: `avatarURL : ${avatarURL} `,
  });
};

export default {
  register: ctrlWrapper(register),
  verify: ctrlWrapper(verify),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
