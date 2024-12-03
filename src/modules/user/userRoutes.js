import { Router } from "express";
import { signUp } from "./signUpController.js";
import { signIn } from "./signInController.js";

const userRouter = Router();

// Routes
userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);

export default userRouter;
