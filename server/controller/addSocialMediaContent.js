const SocialMedia = require("../model/SocialMediaMode");

module.exports = async (req, res) => {
  try {
    const { title, link, description, type, themeLink } = req.body;

    // Validate required fields
    if (!title || !link || !description || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // If type is 'Theme', ensure themeLink is provided
    if (type === "Theme" && !themeLink) {
      return res
        .status(400)
        .json({ message: "Theme link is required for Theme type" });
    }

    // Create new social media content
    const newContent = new SocialMedia({
      title,
      link,
      description,
      type,
      themeLink: type === "Theme" ? themeLink : undefined, // Store themeLink only if type is Theme
    });

    await newContent.save();

    res.status(200).json({
      message: "Social media content added successfully.",
      content: newContent, // Return the created content object
    });
  } catch (error) {
    console.error("Error adding social media content:", error);

    // Handle server error
    res.status(500).json({
      message: "An error occurred while adding the content.",
      error: error.message,
    });
  }
};
