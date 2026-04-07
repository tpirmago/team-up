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