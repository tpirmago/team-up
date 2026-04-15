Backend README – TeamUp API

Overview

This is the backend API for TeamUp, a student collaboration platform where users can create projects, define required skills, and join teams.

The backend is built with:
- Node.js
- Express
- TypeScript
- PostgreSQL (Neon)
- REST API architecture

Getting Started

Prerequisites: 
Node.js, npm, PostgreSQL (Neon)

## Running the backend

Install dependencies:

npm install

Start the development server:

npm run dev

The API will be available at:
http://localhost:3000


Create a .env file in the backend/ folder and make sure it is ignored by Git:

PORT=3000
DATABASE_URL=your_neon_database_url_here

## Testing notes

POST, PUT and DELETE endpoints modify real database data.

When testing:
- Use clearly marked test data (e.g. titles starting with [TEST])
- Remove test data after testing using SQL queries


## Available endpoints

GET /users                (Get all users)
    /users/:id            (Get user by ID)
PUT /users/:id            (Update user profile)
GET /users/:id/skills     (Get users skills)
POST /users/:id/skills    (Post skills to a user)
PUT /users/:id/skills     (Update user skills)
DELETE /users/:id/skills/:skillId (Delete user skill)
GET /users/:id/interests  (Get users interests )
POST /users/:id/interests (Post interests to a user)
PUT /users/:id/interests  (Update users interests)
DELETE /users/:id/interests/:interestsId (Delete users interest by id)

GET /skills               (Get all skills)

GET /interests            (Get all interests)

GET /projects             (Get all projects)
GET /projects/:id         (Get a project with id)
POST /projects            (Create a new project)
POST /projects/:id/skills (Assign required skills to a project)
GET /projects/:id/skills  (Get required project skills)

## Example request body:
// POST /projects
{
  "owner_user_id": 1,
  "title": "AI Study Group",
  "description": "Learning machine learning basics together",
  "topic": "Data & AI",
  "location_mode": "Hybrid",
  "team_size_min": 2,
  "team_size_max": 5,
  "duration": "2–4 weeks"
}

## Design notes

- Skills are predefined and referenced by ID to ensure data consistency
- User skills and project skills are stored using join tables
- Filtering and matching are planned future features and were intentionally postponed to keep the MVP scope manageable
- Authentication (Firebase) will be integrated in a later phase
