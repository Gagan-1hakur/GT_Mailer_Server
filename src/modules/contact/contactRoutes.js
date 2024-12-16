import { Router } from "express";
import {
  addContact,
  getContacts,
  editContact,
  deleteContact,
  getGroups,
  getContactsByGroup,
} from "./contactController.js";

const contactRouter = Router();

contactRouter.post("/add", addContact); // Add a contact
contactRouter.get("/all", getContacts); // Get all contacts
contactRouter.put("/edit/:id", editContact); // Edit a contact by ID
contactRouter.delete("/delete/:id", deleteContact); // Delete a contact by ID
contactRouter.get("/groups", getGroups); // Get unique groups
contactRouter.get("/contacts-by-group", getContactsByGroup); // Get unique groups

export default contactRouter;
