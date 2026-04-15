import { Router } from "express";
import { db } from "../db";

const router = Router();

//// Get users ////

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
// Update the user status

//// USER SKILLS ////

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
// Update all users skills
router.put("/:id/skills", async (req, res) => {
  const userId = req.params.id;
  const { skills } = req.body;
  
  if (!Array.isArray(skills)) {
    return res.status(400).json({ error: "skills must be an array of skill IDs" });
  }
  
  const client = await db.connect();

  try {
    await client.query("BEGIN");
    
    // 1️⃣ Remove all existing skills of user
    await client.query(
      `DELETE FROM user_skills WHERE user_id = $1`,
      [userId]
    );

    // 2️⃣ Insert new skills
    for (const skillId of skills) {
      await client.query(
        `INSERT INTO user_skills (user_id, skill_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [userId, skillId]
      );
    }

    await client.query("COMMIT");

    res.status(200).json({ message: "Skills udated successfully" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ error: "Failed to update skills" });
  } finally {
    client.release();
  }
});
// DELETE one skill
router.delete("/:id/skills/:skillId", async (req, res) => {
  const userId = req.params.id;
  const skillId = req.params.skillId;
  
  try {
    const result = await db.query(
      `DELETE FROM user_skills
       WHERE user_id = $1 AND skill_id = $2
       RETURNING *`,
      [userId, skillId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Skill not found for user" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete skill" });
  }
});

//// USER INTEREST ////

// GET users interests
router.get("/:id/interests", async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await db.query(
      `SELECT i.*
      FROM user_interests ui
      JOIN interests i ON ui.interest_id = i.interest_id
      WHERE ui.user_id = $1`, [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user interests" });
  }
});
// POST interests to a user
router.post("/:id/interests", async (req, res) => {
  const userId = req.params.id;
  const { interest_ids } = req.body;

  if (!Array.isArray(interest_ids) || interest_ids.length === 0) {
    return res
      .status(400)
      .json({ error: "Interest_ids must be a non-empty array" });
  }

  try {
    for (const interestId of interest_ids) {
      await db.query(
        `
        INSERT INTO user_interests (user_id, interest_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        `,
        [userId, interestId]
      );
    }
    res.json({ message: "Interests added to the user successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to define interests to the user" });
  }
});
// Update all users interests
router.put("/:id/interests", async (req, res) => {
  const userId = req.params.id;
  const { interests } = req.body;
  
  if (!Array.isArray(interests)) {
    return res.status(400).json({ error: "Interests must be an array of interest IDs" });
  }
  
  const client = await db.connect();

  try {
    await client.query("BEGIN");
    
    // 1️⃣ Remove all existing interests of user
    await client.query(
      `DELETE FROM user_interests WHERE user_id = $1`,
      [userId]
    );

    // 2️⃣ Insert new interests
    for (const interestId of interests) {
      await client.query(
        `INSERT INTO user_interests (user_id, interest_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [userId, interestId]
      );
    }

    await client.query("COMMIT");

    res.status(200).json({ message: "Interests updated successfully" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ error: "Failed to update interests" });
  } finally {
    client.release();
  }
});
// DELETE one interest
router.delete("/:id/interests/:interestId", async (req, res) => {
  const userId = req.params.id;
  const interestId = req.params.interestId;
  
  try {
    const result = await db.query(
      `DELETE FROM user_interests
       WHERE user_id = $1 AND interest_id = $2
       RETURNING *`,
      [userId, interestId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Interest not found for user" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete interest" });
  }
});

//// UPDATE PROFILE ////
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
// Update user status

// Get users projects
router.get("/:id/projects", async (req, res) => {
  const userId = req.params.id

  try {
    const result = await db.query(
      `SELECT p.*
      FROM projects p
      JOIN project_members pm ON pm.project_id = p.project_id
      WHERE pm.user_id = $1`, [userId]
    )
    res.json(result.rows)
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "Failed to fetch user projects"})
  }
})

export default router;