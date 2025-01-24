import nodemailer from "nodemailer";
import mailgunTransport from "nodemailer-mailgun-transport";

// Mailgun configuration
const mailgunOptions = {
  auth: {
    api_key: "320ca93a78df04f8735b1058c2b5583b-9c3f0c68-543f8512", // Replace with your Mailgun API key
    domain: "info.pb77mailer.com", // Replace with your Mailgun domain
  },
};

const mailgunTransporter = nodemailer.createTransport(
  mailgunTransport(mailgunOptions)
);

const sendMailFromMailgun = async (emailOptions, batchNo) => {
  const Options = {
    ...emailOptions,
    replyTo: emailOptions.replyTo,
  };

  let mail = null;

  try {
    mail = await mailgunTransporter.sendMail(Options);
    console.log("Email sent successfully:", mail.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error; // Rethrow the error for the controller to handle
  }
};

export const sendMail = async (req, res) => {
  console.log("sendmail");
  try {
    await sendMailFromMailgun({
      from: "noreply@info.pb77mailer.com", // Replace with your Mailgun-verified sender email
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
