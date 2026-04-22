app.get("/seed", async (req, res) => {
  try {
    const fs = require("fs");
    const path = require("path");

    const filePath = path.join(__dirname, "data", "profiles-2026.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(raw);

    const profiles = json.profiles;

    if (!profiles || !Array.isArray(profiles)) {
      return res.status(500).json({
        status: "error",
        message: "Invalid JSON structure"
      });
    }

    console.log("Profiles loaded:", profiles.length);

    // 🔥 HARD RESET DATABASE
    await Profile.deleteMany({});

    const formatted = profiles.map((p, i) => ({
      id: `${Date.now()}-${i}`,
      name: p.name,
      gender: p.gender,
      gender_probability: Number(p.gender_probability),
      age: Number(p.age),
      age_group: p.age_group,
      country_id: p.country_id,
      country_name: p.country_name,
      country_probability: Number(p.country_probability),
      created_at: new Date().toISOString()
    }));

    const result = await Profile.insertMany(formatted);

    console.log("Inserted:", result.length);

    const count = await Profile.countDocuments();

    return res.json({
      status: "success",
      message: "Database seeded successfully",
      total: count
    });

  } catch (err) {
    console.error("SEED ERROR FULL:", err);

    return res.status(500).json({
      status: "error",
      message: "Failed to seed database"
    });
  }
});
