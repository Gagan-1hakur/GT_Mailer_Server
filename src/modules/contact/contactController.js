const Contact = require("./contactSchema.js");

// Add a new contact
const addContact = async (req, res) => {
  console.log(req.body);
  try {
    const { firstName, lastName, email, mobile, group } = req.body;

    if (!email || !group) {
      return res.status(400).json({ message: "Email and Group are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (mobile && (!/^\d{10}$/.test(mobile) || mobile.length !== 10)) {
      return res.status(400).json({ message: "Invalid mobile number." });
    }

    const existingContactByEmail = await Contact.findOne({ email });
    if (existingContactByEmail) {
      return res
        .status(400)
        .json({ message: `Email '${email}' already exists.` });
    }

    if (mobile) {
      const existingContactByMobile = await Contact.findOne({ mobile });
      if (existingContactByMobile) {
        return res
          .status(400)
          .json({ message: `Mobile number '${mobile}' already exists.` });
      }
    }

    // Create a new contact
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      mobile: mobile || null, // Ensure empty mobile is stored as null
      group,
    });
    await newContact.save();

    res.status(201).json({
      message: "Contact added successfully.",
      contact: newContact,
    });
  } catch (error) {
    console.error("Error adding contact:", error.message);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

// Fetch all contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ creationDate: -1 });
    res.status(200).json({ contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error.message);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

// Edit a contact
const editContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, mobile, group } = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { firstName, lastName, email, mobile, group },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found." });
    }

    res.status(200).json({
      message: "Contact updated successfully.",
      contact: updatedContact,
    });
  } catch (error) {
    console.error("Error updating contact:", error.message);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found." });
    }

    res.status(200).json({ message: "Contact deleted successfully." });
  } catch (error) {
    console.error("Error deleting contact:", error.message);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

// Fetch unique groups
const getGroups = async (req, res) => {
  try {
    const groups = await Contact.distinct("group");
    res.status(200).json({ groups });
  } catch (error) {
    console.error("Error fetching groups:", error.message);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

const getContactsByGroup = async (req, res) => {
  console.log(req.query);
  const { groupName } = req.query; // Get the group name from the query parameter
  try {
    if (!groupName) {
      return res.status(400).json({
        success: false,
        message: "Group name is required",
      });
    }

    // Find contacts with the specified group
    const contacts = await Contact.find({ group: groupName });

    if (!contacts.length) {
      return res.status(404).json({
        success: false,
        message: `No contacts found for group: ${groupName}`,
      });
    }

    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts by group:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
      error: error.message,
    });
  }
};

module.exports = {
  addContact,
  getContacts,
  editContact,
  deleteContact,
  getGroups,
  getContactsByGroup,
};
