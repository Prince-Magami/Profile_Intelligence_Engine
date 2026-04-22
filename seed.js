require("dotenv").config();

const fs = require("fs");
const connectDB = require("./db");
const Profile = require("./models/Profile");

async function seed() {
  await connectDB();

  const raw = fs.readFileSync("./data/profiles-2026.json", "utf-8");
  const json = JSON.parse(raw);

  const profiles = json.profiles; 

  if (!Array.isArray(profiles)) {
    throw new Error("Profiles is not an array");
  }

  app.get("/debug-seed", async (req, res) => {
  const fs = require("fs");

  const raw = fs.readFileSync("./data/profiles-2026.json", "utf-8");
  const json = JSON.parse(raw);

  res.json({
    type: typeof json,
    hasProfilesKey: Object.prototype.hasOwnProperty.call(json, "profiles"),
    profilesIsArray: Array.isArray(json.profiles),
    profilesLength: json.profiles?.length,
    firstProfile: json.profiles?.[0]
  });
});

  await Profile.deleteMany({});

  const result = await Profile.insertMany(profiles);

  console.log("Inserted:", result.length);

  process.exit(0);
}

seed();
