import { Router } from "express";
import { sendMail } from "./campaignController.js";

const campaignRouter = Router();

campaignRouter.post("/send-mail", sendMail); // Route to send mail

export default campaignRouter;
