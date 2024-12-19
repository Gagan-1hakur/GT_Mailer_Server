import nodemailer from "nodemailer";
import aws from "@aws-sdk/client-ses";

export const sendMailFromAWS = async (emailOptions, batchNo) => {
  const transporter = nodemailer.createTransport({
    SES: new aws.SES(), // No need for SendRawEmailCommand here
  });

  const Options = {
    ...emailOptions,
    replyTo: emailOptions.replyTo ?? env.defaultReplyTo,
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
