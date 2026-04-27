import { Router, Response } from "express";
import { db } from "../db";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

// POST /auth/register — create user in DB after Firebase sign-up
router.post("/register", authMiddleware, async (req: AuthRequest, res: Response) => {
  const firebaseId = req.uid;
  const { username, email, fullName } = req.body;

  try {
    const existing = await db.query("SELECT * FROM users WHERE firebase_id = $1", [firebaseId]);
    if (existing.rows.length > 0) {
      return res.json(existing.rows[0]);
    }

    const result = await db.query(
      "INSERT INTO users (firebase_id, username, email, name) VALUES ($1, $2, $3, $4) RETURNING *",
      [firebaseId, username, email, fullName]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// GET /auth/me — get current user by Firebase token
router.get("/me", authMiddleware, async (req: AuthRequest, res: Response) => {
  const firebaseId = req.uid;

  try {
    const result = await db.query("SELECT * FROM users WHERE firebase_id = $1", [firebaseId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default router;
