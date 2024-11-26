import { Schema, model } from "mongoose";

const UserSchema = model(
  "User",
  new Schema({
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
    },

    role: {
      type: String,
      default: "admin",
      emun: ["admin", "member"],
    },
  })
);

export default UserSchema;
