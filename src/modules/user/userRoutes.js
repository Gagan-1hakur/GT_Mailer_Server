import { Router } from "express";
import { userController } from "./userController.js";

const userRouter = Router();

userRouter.post("/signup", userController.signUp);

export default userRouter;
