require("dotenv").config();

const fs = require("fs");
const { v7: uuidv7 } = require("uuid");
const connectDB = require("./db");
const Profile = require("./models/Profile");

async function seed() {
  await connectDB();

  const raw = fs.readFileSync("./data/profiles-2026.json");
  const profiles = JSON.parse(raw);

  for (const p of profiles) {
    await Profile.updateOne(
      { name: p.name },
      {
        $setOnInsert: {
          id: uuidv7(),
          name: p.name,
          gender: p.gender,
          gender_probability: p.gender_probability,
          age: p.age,
          age_group: p.age_group,
          country_id: p.country_id,
          country_name: p.country_name,
          country_probability: p.country_probability,
          created_at: new Date().toISOString()
        }
      },
      { upsert: true }
    );
  }

  console.log("Seeding completed.");
  process.exit(0);
}

seed();