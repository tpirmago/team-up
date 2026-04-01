import { Router } from "express";
import { db } from "../db";

const router = Router();

// GET all users
router.get("/", async (req ,res) => {
    try{
        const result = await db.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// temporary test endpoint
router.post("/add-test", async (req, res) => {
  await db.query(
    "INSERT INTO users (name, email, username, firebase_id) VALUES ($1, $2, $3, $4)",
    ["Backend Insert", "backend@test.com", "backenduser", "firebaseBackend123"]
  );

  res.json({ message: "Inserted test user!" });
});


export default router;