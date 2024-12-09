import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import contactRouter from "./modules/contact/contactRoutes.js";
import userRouter from "./modules/user/userRoutes.js";
import templateRouter from "./modules/templates/templateRoutes.js"; // Import template routes

dotenv.config(); // Load environment variables

const app = express();
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Middleware to parse JSON requests

// Define the port
const port = process.env.PORT || 8000;

// MongoDB connection function
const connectToDatabase = async () => {
  try {
    const MONGO_URI =
      process.env.MONGO_URI || "mongodb://localhost:27017/gtMailer";
    await mongoose.connect(MONGO_URI); // Connect to MongoDB
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

// Connect to MongoDB
connectToDatabase();

// Routes
app.use("/contact", contactRouter); // Contact API routes
app.use("/user", userRouter); // User API routes (e.g., signup, signin)
app.use("/templates", templateRouter); // Templates API routes

// Default route for invalid endpoints
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
