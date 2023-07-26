import { Schema, model } from "mongoose";

import { handleSaveError } from "./hooks.js";

import {
  releaseEmailRegexp,
  releasePhoneRegexp,
} from "../constants/contact-constans.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      email: releaseEmailRegexp,
      required: true,
    },
    phone: {
      type: String,
      match: releasePhoneRegexp,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError);

const Contact = model("contact", contactSchema);

export default Contact;
