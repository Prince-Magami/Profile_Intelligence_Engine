require("dotenv").config();

const fs = require("fs");
const connectDB = require("./db");
const Profile = require("./models/Profile");

async function seed() {
  await connectDB();

  const raw = fs.readFileSync("./data/profiles-2026.json");
  const json = JSON.parse(raw);

  const profiles = json.profiles; 

  if (!Array.isArray(profiles)) {
    throw new Error("Seed data is not an array");
  }

  await Profile.deleteMany({}); 

  await Profile.insertMany(profiles);

  console.log("Seeding completed:", profiles.length);
  process.exit(0);
}

seed();
