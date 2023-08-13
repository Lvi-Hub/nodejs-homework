import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import contactsSchemas from "../../schemes/contacts-schemas.js";

import { validateBody } from "../../decorators/index.js";

import {
  authenticate,
  upload,
  isEmptyBody,
  isValidId,
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
  upload.single("poster"),
  //  upload.array("poster", 8); Якщо ми хочемо завантажити декілька файдів в одному полі
  //  upload.fields([{name: "poster", maxCount: 1}]) Якщо ми хочемо завандажити кілька файлів у різних полях. maxCount макс кількість полів
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

//
// contactsRouter.patch(
//   "/avatars",
//   authenticate,
//   upload.single("avatar"),
//   ctrl.updateAvatar
// );

export default contactsRouter;
