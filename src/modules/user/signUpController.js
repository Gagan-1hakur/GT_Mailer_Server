import UserSchema from "./userSchema.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Incomplete Input" });
    }

    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcryptjs.hash(password.trim(), 10);

    const newUser = new UserSchema({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    return res.status(201).json({ message: "Successfully Signed Up" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
