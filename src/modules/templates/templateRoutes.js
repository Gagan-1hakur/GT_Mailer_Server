import express from "express";
import {
  createTemplate,
  getAllTemplates,
  deleteTemplate,
} from "./templateController.js";

const router = express.Router();

// Define routes
router.post("/", createTemplate); // Create a new template
router.get("/", getAllTemplates); // Get all templates
router.delete("/:id", deleteTemplate); // Delete a template by ID

export default router;
