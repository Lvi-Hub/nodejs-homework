import { Schema, model } from "mongoose";

import { releaseEmailRegexp } from "../constants/contact-constans.js";

import { handleSaveError, validateAtUpdate } from "./hooks.js";

import { subscriptionList } from "../constants/user-constants.js";

const userSchema = new Schema({
  password: {
    type: String,
    minlenth: 6,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    match: releaseEmailRegexp,
    unique: true,
    required: [true, "Email is required"],
  },
  subscription: {
    type: String,
    enum: subscriptionList,
    default: "starter",
  },
  token: String,
  avatarURL: {
    type: String,
  },
  verify: {
    type: Boolean,
    default: false,
  },

  verificationCode: {
    type:String,
    required: [ true,'Verify token is required'],
    default:"",

  },
});

userSchema.pre("findOneAndUpdate", validateAtUpdate);

userSchema.post("save", handleSaveError);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
