# Profile Intelligence Query Engine

## Overview

This project is a production-style demographic intelligence API built for the Stage 2 Backend Assessment.

It upgrades a basic profile storage system into a queryable intelligence engine capable of:

- Advanced filtering
- Combined conditional queries
- Sorting
- Pagination
- Rule-based natural language search
- Seeded demographic analysis across 2026 profiles
  

## Base URL

https://your-railway-domain.up.railway.app


## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Railway


## Database Schema

Each profile contains:

- id (UUID v7)
- name
- gender
- gender_probability
- age
- age_group
- country_id
- country_name
- country_probability
- created_at



## Seed Data

Database is seeded using:

data/profiles-2026.json

Seed process is idempotent.

Running seed multiple times does not create duplicates.

Run:

```bash
node seed.js
```

---

## API Endpoints

## Root

GET /

Health check.

---

## Advanced Filtering

GET /api/profiles

Supported filters:

- gender
- age_group
- country_id
- min_age
- max_age
- min_gender_probability
- min_country_probability

Example:

```http
/api/profiles?gender=male&country_id=NG&min_age=25
```

---

## Sorting

```http
/api/profiles?sort_by=age&order=desc
```

Supported:

- age
- created_at
- gender_probability


## Pagination

```http
/api/profiles?page=2&limit=20
```

Defaults:

- page=1
- limit=10

Max:

- limit=50


## Natural Language Query

GET /api/profiles/search

Example:

```http
/api/profiles/search?q=young males from nigeria
```

Supported mappings:

- young males
- females above 30
- people from angola
- adult males from kenya
- male and female teenagers above 17

Rule-based parsing only.

No AI or LLM used.


## Error Format

All errors follow:

```json
{
 "status":"error",
 "message":"<error message>"
}
```

---

## CORS

Enabled:

Access-Control-Allow-Origin: *


## Deployment

Hosted on Railway.


## Conventional Commit Used

```bash
feat(query-engine): add advanced filtering sorting pagination and nl search
```

---

## Author

Abubakar Muhammad Magami
