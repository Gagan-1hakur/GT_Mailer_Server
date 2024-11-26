import express from "express";
import mongoose from "mongoose"; // Import Mongoose
import userRouter from "./modules/user/userRoutes.js";

const app = express();
app.use(express.json());

const port = 8000;

// MongoDB Connection Function
const connectToDatabase = async () => {
  try {
    const MONGO_URI = "mongodb://localhost:27017/gtMailer";
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

connectToDatabase();

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
