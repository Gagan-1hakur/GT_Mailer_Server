// import { sendMailFromAWS } from "../../utils";

import nodemailer from "nodemailer";
import { SendRawEmailCommand } from "@aws-sdk/client-ses";
import ses from "../../config/aws.js";

const sendMailFromAWS = async (emailOptions, batchNo) => {
  const transporter = nodemailer.createTransport({
    SES: { ses, aws: { SendRawEmailCommand } }, // No need for SendRawEmailCommand here
  });

  const Options = {
    ...emailOptions,
    replyTo: emailOptions.replyTo,
  };

  let mail = null;

  try {
    mail = await transporter.sendMail(Options);
    console.log("Email sent successfully:", mail.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error; // Rethrow the error for the controller to handle
  }
};

export const sendMail = async (req, res) => {
  console.log("sendmail");
  try {
    await sendMailFromAWS({
      from: "no-reply@pb77mailer.com",
      to: "gtmailer.dev@gmail.com",
      subject: "Test mail",
      html: "<h1>Test mail</h1>",
    });

    return res.status(201).json({ message: "Sent successfully" });
  } catch (error) {
    console.error("Error during send-mail:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
