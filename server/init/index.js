// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const bodyParser = require("body-parser");
// const fs = require("fs");
// const path = require("path");

// // Models
// const Course = require("../model/CourseModel");
// const CourseVideo = require("../model/CourseVideoModal");

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// const MONGO_URI =process.env.MONGO_URI;

// // Middleware
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "https://training.saumiccraft.com"],
//     methods: "GET,POST,PUT,DELETE,PATCH",
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(bodyParser.json());

// // 🔁 Seed trainingCards.json (Course)
// const seedCourses = async () => {
//   const filePath = path.join(__dirname, "data", "trainingCards.json");

//   try {
//     const data = fs.readFileSync(filePath, "utf8");
//     const parsed = JSON.parse(data);

//     const existingCount = await Course.countDocuments();
//     if (existingCount > 0) {
//       console.log("⚠️ Courses already exist. Skipping seeding.");
//       return;
//     }

//     await Course.insertMany(parsed);
//     console.log(`✅ Seeded ${parsed.length} courses into MongoDB.`);
//   } catch (err) {
//     console.error("❌ Failed to seed courses:", err.message);
//   }
// };

// const seedCourseVideos = async () => {
//   const filePath = path.join(__dirname, "data", "courseVideos.json");

//   try {
//     const data = fs.readFileSync(filePath, "utf8");
//     const parsed = JSON.parse(data);

//     const existingCount = await CourseVideo.countDocuments();
//     if (existingCount > 0) {
//       console.log("⚠️ Course videos already exist. Skipping seeding.");
//       return;
//     }

//     for (const video of parsed) {
//       const newVideo = new CourseVideo({
//         title: video.title,
//         courseCategory: video.courseCategory,
//         courseType: video.courseType,
//         link: video.link,
//       });

//       await newVideo.save(); // This triggers auto-increment
//     }

//     console.log(`✅ Seeded ${parsed.length} course videos into MongoDB.`);
//   } catch (err) {
//     console.error("❌ Failed to seed course videos:", err.message);
//   }
// };

// // 📦 Connect to DB and seed on startup
// mongoose
//   .connect(MONGO_URI)
//   .then(async () => {
//     console.log("✅ Database initialized successfully");

//     // await seedCourses();
//     await seedCourseVideos();

//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("❌ Error connecting to MongoDB:", error.message);
//     process.exit(1);
//   });
