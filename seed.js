app.get("/seed", async (req, res) => {
  try {
    const fs = require("fs");
    const path = require("path");

    console.log("STEP 1: Starting seed...");

    const filePath = path.join(__dirname, "data", "profiles-2026.json");
    console.log("STEP 2: File path:", filePath);

    if (!fs.existsSync(filePath)) {
      throw new Error("File does not exist");
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    console.log("STEP 3: File read success");

    const json = JSON.parse(raw);
    console.log("STEP 4: JSON parsed");

    console.log("JSON KEYS:", Object.keys(json));

    const profiles = json.profiles;
    console.log("STEP 5: Extracted profiles");

    if (!Array.isArray(profiles)) {
      throw new Error("profiles is not an array");
    }

    console.log("STEP 6: Profiles length:", profiles.length);

    await Profile.deleteMany({});
    console.log("STEP 7: Database cleared");

    await Profile.insertMany(profiles);app.get("/seed", async (req, res) => {
  try {
    const fs = require("fs");
    const path = require("path");

    const filePath = path.join(__dirname, "data", "profiles-2026.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(raw);

    const profiles = json.profiles;

    if (!Array.isArray(profiles)) {
      return res.status(500).json({
        status: "error",
        message: "Invalid profiles format"
      });
    }

    // 🔥 Clear database
    await Profile.deleteMany({});

    let successCount = 0;
    let failCount = 0;

    for (const p of profiles) {
      try {
        if (!p.name) continue;

        await Profile.create({
          name: String(p.name),
          gender: String(p.gender || ""),
          gender_probability: Number(p.gender_probability || 0),
          age: Number(p.age || 0),
          age_group: String(p.age_group || ""),
          country_id: String(p.country_id || ""),
          country_name: String(p.country_name || ""),
          country_probability: Number(p.country_probability || 0),
          created_at: new Date().toISOString()
        });

        successCount++;
      } catch (err) {
        failCount++;
      }
    }

    return res.json({
      status: "success",
      message: "Seeding completed",
      inserted: successCount,
      failed: failCount
    });

  } catch (err) {
    console.error("SEED ERROR:", err);

    return res.status(500).json({
      status: "error",
      message: err.message
    });
  }
});
    console.log("STEP 8: Inserted into DB");

    const count = await Profile.countDocuments();
    console.log("STEP 9: Count =", count);

    return res.json({
      status: "success",
      total: count
    });

  } catch (err) {
    console.error("❌ EXACT ERROR:", err);

    return res.status(500).json({
      status: "error",
      message: err.message
    });
  }
});
