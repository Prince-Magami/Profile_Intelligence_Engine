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

    await Profile.insertMany(profiles);
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
