const mongoose = require("mongoose");
const { sendMailFromMailgun } = require("../../utils");
const { ContactSchema } = require("../contact/contactSchema");
const { TemplateSchema } = require("../templates/templateSchema");
const { CampaignSchema } = require("./campaignSchema");

const sendMail = async (req, res) => {
  try {
    const {
      campaignName,
      senderEmail,
      groupId,
      subjectLine,
      templateId,
      batchSize = 1, // Default batch size
      delayBetweenBatches = 10000, // Delay in ms (10 seconds) between batches
    } = req.body;

    // Validate input fields
    if (!senderEmail || !groupId || !subjectLine || !templateId) {
      return res.status(400).json({ message: "Incomplete Input" });
    }

    // Fetch the template
    const template = await TemplateSchema.findById(templateId);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    // Validate groupId and fetch contacts
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ message: "Invalid group ID" });
    }

    const contacts = await ContactSchema.find({
      "group.id": new mongoose.Types.ObjectId(groupId),
    });

    if (!contacts || contacts.length === 0) {
      return res
        .status(404)
        .json({ message: "No contacts found for the group" });
    }

    const totalContacts = contacts.length;
    let batchIndex = 0;

    console.log(`Total contacts to send: ${totalContacts}`);

    // Function to process a single batch
    const processBatch = async (batch, batchNumber) => {
      console.log(
        `Processing batch ${batchNumber} with ${batch.length} emails...`
      );
      await Promise.all(
        batch.map(async (contact) => {
          if (contact.email) {
            try {
              await sendMailFromMailgun({
                from: senderEmail,
                to: contact.email,
                subject: subjectLine,
                html: template.content,
              });
              console.log(`Email sent to: ${contact.email}`);
            } catch (error) {
              console.error(
                `Failed to send email to: ${contact.email}. Error: ${error.message}`
              );
            }
          } else {
            console.warn(`Skipping contact with missing email: ${contact._id}`);
          }
        })
      );
    };

    // Process emails in batches
    while (batchIndex < totalContacts) {
      const batch = contacts.slice(batchIndex, batchIndex + batchSize);
      const batchNumber = Math.ceil(batchIndex / batchSize) + 1;

      await processBatch(batch, batchNumber);

      batchIndex += batchSize;

      // Delay between batches
      if (batchIndex < totalContacts) {
        console.log(
          `Waiting for ${delayBetweenBatches}ms before next batch...`
        );
        await new Promise((resolve) =>
          setTimeout(resolve, delayBetweenBatches)
        );
      }
    }

    // Save campaign details in the database
    const campaign = new CampaignSchema({
      name: campaignName,
      group: {
        id: groupId,
        name: contacts[0]?.group?.name || "Unknown Group", // Ensure group name is saved
      },
      template: {
        id: templateId,
        name: template.name,
      },
      senderEmail,
      subjectLine,
    });

    await campaign.save();

    console.log("Campaign details saved successfully.");

    return res.status(201).json({
      message: "Emails sent in batches and campaign saved successfully",
    });
  } catch (error) {
    console.error("Error during send-mail:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { sendMail };
