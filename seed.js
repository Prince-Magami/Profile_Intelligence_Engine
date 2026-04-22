app.get("/seed", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "data", "profiles-2026.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(raw);

    const profiles = json.profiles;

    if (!Array.isArray(profiles)) {
      return res.status(500).json({
        status: "error",
        message: "Invalid seed structure"
      });
    }

    await Profile.deleteMany({});

    const formatted = profiles.map(p => ({
      id: require("uuid").v7(),
      name: p.name,
      gender: p.gender,
      gender_probability: p.gender_probability,
      age: p.age,
      age_group: p.age_group,
      country_id: p.country_id,
      country_name: p.country_name,
      country_probability: p.country_probability,
      created_at: new Date().toISOString()
    }));

    await Profile.insertMany(formatted);

    const count = await Profile.countDocuments();

    res.json({
      status: "success",
      message: "Database seeded successfully",
      total: count
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: "error",
      message: "Seeding failed"
    });
  }
});
