app.get("/seed", async (req, res) => {
  try {
    const fs = require("fs");
    const path = require("path");

    const filePath = path.join(__dirname, "data", "profiles-2026.json");

    if (!fs.existsSync(filePath)) {
      throw new Error("Seed file not found");
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(raw);

    const profiles = json.profiles;

    if (!Array.isArray(profiles)) {
      throw new Error("Invalid profiles array");
    }

    console.log("Loaded profiles:", profiles.length);

    // 🔥 Clear DB
    await Profile.deleteMany({});

    let inserted = 0;

    // 🔥 INSERT ONE BY ONE (NO SILENT FAILURES)
    for (const p of profiles) {
      if (!p.name || !p.gender || !p.age) continue;

      const doc = new Profile({
        id: `${Date.now()}-${inserted}`,
        name: String(p.name),
        gender: String(p.gender),
        gender_probability: Number(p.gender_probability || 0),
        age: Number(p.age),
        age_group: String(p.age_group),
        country_id: String(p.country_id),
        country_name: String(p.country_name),
        country_probability: Number(p.country_probability || 0),
        created_at: new Date().toISOString()
      });

      await doc.save();
      inserted++;
    }

    return res.json({
      status: "success",
      message: "Database seeded successfully",
      total: inserted
    });

  } catch (err) {
    console.error("🔥 FINAL SEED ERROR:", err);

    return res.status(500).json({
      status: "error",
      message: err.message
    });
  }
});
