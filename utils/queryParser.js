function parseNaturalQuery(q) {
  if (!q || !q.trim()) return null;

  const s = q.toLowerCase();

  const filters = {};

  if (s.includes("young")) {
    filters.min_age = 16;
    filters.max_age = 24;
  }

  if (s.includes("male")) {
    filters.gender = "male";
  }

  if (s.includes("female")) {
    filters.gender = "female";
  }

  if (s.includes("adult")) {
    filters.age_group = "adult";
  }

  if (s.includes("teenager")) {
    filters.age_group = "teenager";
  }

  if (s.includes("above 30")) {
    filters.min_age = 30;
  }

  if (s.includes("nigeria")) {
    filters.country_id = "NG";
  }

  if (s.includes("kenya")) {
    filters.country_id = "KE";
  }

  if (s.includes("angola")) {
    filters.country_id = "AO";
  }

  if (Object.keys(filters).length === 0) {
    return null;
  }

  return filters;
}

module.exports = parseNaturalQuery;