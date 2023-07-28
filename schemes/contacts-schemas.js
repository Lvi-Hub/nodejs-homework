import Joi from "joi";

import {
  releaseEmailRegexp,
  releasePhoneRegexp,
} from "../constants/contact-constans.js";

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(releaseEmailRegexp).required(),
  phone: Joi.string().pattern(releasePhoneRegexp).required().messages({
    "string.pattern.base":
      "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +",
  }),
  favorite: Joi.boolean().default(false),
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export default {
  contactsAddSchema,
  contactUpdateFavoriteSchema,
};
