import Joi from "joi";

import { releaseEmailRegexp } from "../constants/contact-constans.js";

import { subscriptionList } from "../constants/user-constants.js";

const userSignupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(releaseEmailRegexp).required(),
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

const userSigninSchema = Joi.object({
  email: Joi.string().pattern(releaseEmailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const userEmailSchema = Joi.object({
  email: Joi.string().pattern(releaseEmailRegexp).required(),
});

export default {
  userSignupSchema,
  userSigninSchema,
  userEmailSchema,
};
