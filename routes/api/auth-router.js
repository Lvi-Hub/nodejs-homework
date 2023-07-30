import express from "express";

import { validateBody } from "../../decorators/index.js";

import usersSchemas from "../../schemes/users-schemas.js";

const authRouter = express.Router();

authRouter.post("/singup", validateBody(usersSchemas.userSignupSchema));

export default authRouter;
