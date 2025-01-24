const { sendMailFromMailgun } = require("../../utils");
const { TemplateSchema } = require("../templates/templateSchema");

const sendMail = async (req, res) => {
  try {
    const { from, to, subject, templateId } = req.body;
    if (!from || !to || !subject || !templateId) {
      return res.status(400).json({ message: "Incomplete Input" });
    }

    const template = await TemplateSchema.findById(templateId);
    if (!template) {
      return res.status(400).json({ message: "Template not found" });
    }

    await sendMailFromMailgun({
      from, // Replace with your Mailgun-verified sender email
      to,
      subject,
      html: template.content,
    });

    return res.status(201).json({ message: "Sent successfully" });
  } catch (error) {
    console.error("Error during send-mail:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { sendMail };
