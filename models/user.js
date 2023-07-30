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
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: subscriptionList,
    default: "starter",
  },
  token: String,
});

userSchema.pre("findOneAndUpdate", validateAtUpdate);

userSchema.post("save", handleSaveError);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
