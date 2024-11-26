import UserSchema from "./userSchema.js";
import bcryptjs from "bcryptjs";

export const userController = {
  signUp: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Incomplete Input" });
      }
      let user = await UserSchema.findOne({ email: email });
      if (user) return res.status(400).json({ message: "User Already Exist " });

      const hashedPassword = await bcryptjs.hash(password.trim(), 10);

      console.log(hashedPassword);

      const newUser = new UserSchema({
        name,
        email,
        password: hashedPassword,
        role,
      });

      await newUser.save();

      return res.status(200).json({ message: "Successfully Signed up" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
