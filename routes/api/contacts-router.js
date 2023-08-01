import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import contactsSchemas from "../../schemes/contacts-schemas.js";

import { validateBody } from "../../decorators/index.js";

import {
  isEmptyBody,
  isValidId,
  authenticate,
} from "../../middlewars/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);
//--GET All
contactsRouter.get("/", contactsController.getAll);

// //--GET by ID
contactsRouter.get("/:id", isValidId, contactsController.getById);

// //--POST conntact
contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactsSchemas.contactsAddSchema),
  contactsController.add
);

//--Put by ID (update)
contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactsSchemas.contactsAddSchema),
  contactsController.updateById
);

//--PATCH by ID (update)
contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactsSchemas.contactUpdateFavoriteSchema),
  contactsController.updateFavorite
);

// //--delete (remote contact by ID)
contactsRouter.delete("/:id", isValidId, contactsController.deleteById);

export default contactsRouter;
