require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const connectDB = require("./db");
const Profile = require("./models/Profile"); //
const profileRoutes = require("./routes/profiles");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Intelligence Query Engine running"
  });
});


app.get("/seed", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "data", "profiles-2026.json");
    const rawData = fs.readFileSync(filePath);
    const profiles = JSON.parse(rawData);

    const existingCount = await Profile.countDocuments();
    if (existingCount > 0) {
      return res.json({
        status: "success",
        message: "Database already seeded",
        total: existingCount
      });
    }

    await Profile.insertMany(profiles);

    res.json({
      status: "success",
      message: "Database seeded successfully",
      total: profiles.length
    });

  } catch (error) {
    console.error("SEED ERROR:", error.message);

    res.status(500).json({
      status: "error",
      message: "Failed to seed database"
    });
  }
});

app.use("/api/profiles", profileRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
