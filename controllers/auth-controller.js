import User from "../models/user.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";


const singup = async (req, res) => {
    
}

export default {
    singup: ctrlWrapper(singup)
}