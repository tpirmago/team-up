import { Router } from "express";
import { db } from "../db";

const router = Router();

// GET all users
router.get("/", async (req ,res) => {
    try{
        const result = await db.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// GET one user by id
router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE user_id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" })
    } 

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// GET users skills
router.get("/:id/skills", async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await db.query(
      `SELECT s.*
      FROM user_skills us
      JOIN skills s ON us.skill_id = s.skill_id
      WHERE us.user_id = $1`, [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user skills" });
  }
});

// POST skills to a user
router.post("/:id/skills", async (req, res) => {
  const userId = req.params.id;
  const { skill_ids } = req.body;

  if (!Array.isArray(skill_ids) || skill_ids.length === 0) {
    return res
      .status(400)
      .json({ error: "skill_ids must be a non-empty array" });
  }

  try {
    for (const skillId of skill_ids) {
      await db.query(
        `
        INSERT INTO user_skills (user_id, skill_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        `,
        [userId, skillId]
      );
    }

    res.json({ message: "Skills added to the user successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to define skills to the user" });
  }
});

// UPDATE user profile
router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, study_program, avatar_url } = req.body;

  try {
    const result = await db.query(
      `UPDATE users
       SET name = $1,
           study_program = $2,
           avatar_url = $3
       WHERE user_id = $4
       RETURNING *`,
      [name, study_program, avatar_url, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

export default router;