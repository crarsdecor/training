const Course = require("../model/CourseModel");

module.exports = async (req, res) => {
  try {
    // Destructure the fields from the request body
    const { title, image, description, bullet1, bullet2, bullet3, bullet4 } =
      req.body;

    // Create a new course instance
    const newCourse = new Course({
      title,
      image,
      description,
      bullet1,
      bullet2,
      bullet3,
      bullet4,
    });

    // Save the new course to the database
    await newCourse.save();

    // Respond with success message
    res.status(201).json({
      message: "Course created successfully.",
      course: newCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);

    // Handle server error
    res.status(500).json({
      message: "An error occurred while creating the course.",
      error: error.message,
    });
  }
};
