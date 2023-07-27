import Contact from "../models/contact.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

//--GET All
const getAll = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

// //--GET by ID
const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

// //--POST conntact
const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

// //--Put by ID (update)
const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

//--delete (remote contact by ID)
// const deleteById = async (req, res) => {
//   const { id } = req.params;
//   const result = await contactsService.removeContact(id);
//   if (!result) {
//     throw HttpError(404, `Movie with id=${id} not found`);
//   }
//   // If for delete contatct we are need status 204: No Content (Standart is status 200)
//   //res.status(204).send();
//   res.json({
//     message: "Delete success",
//   });
// };

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  // deleteById: ctrlWrapper(deleteById),
};
