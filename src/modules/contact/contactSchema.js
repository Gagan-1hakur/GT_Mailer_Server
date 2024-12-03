import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true }, // Email is required and unique
  mobile: { type: String, sparse: true }, // Unique only for non-empty values
  group: { type: String, required: true }, // Group is required
  creationDate: { type: Date, default: Date.now },
});

export default mongoose.model("Contact", ContactSchema);
