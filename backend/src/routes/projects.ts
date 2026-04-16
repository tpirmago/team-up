import { Router } from "express";
import { db } from "../db";

const router = Router();

// GET all projects
router.get("/", async (req ,res) => {
    try{
        const result = await db.query("SELECT * FROM projects ORDER BY project_id DESC");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch projects" });
    }
});

// POST a new project
router.post("/", async (req, res) => {
    const {
    owner_user_id,
    title,
    description,
    topic,
    location_mode,
    team_size_min,
    team_size_max,
    duration
    } = req.body;

    try{
        const result = await db.query(
            `INSERT INTO projects 
            (owner_user_id, title, description, topic, location_mode, team_size_min, team_size_max, duration)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING * `,
            [
                owner_user_id,
                title,
                description,
                topic,
                location_mode,
                team_size_min,
                team_size_max,
                duration
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create project" });
    }
});

// POST users to a team
router.post("/:id/join", async (req, res) => {
    const projectId = req.params.id;
    const { user_id } = req.body;

    try {
        await db.query(
            `INSERT INTO project_members (project_id, user_id)
            VALUES ($1, $2)`, [projectId, user_id]
        );

        res.json({ message: "User joined project successfully" });
    } catch (error: any) {
        
        if (error.code === "23505") {
        return res.status(400).json({ error: "User already joined this project" });
        }
        
        console.error(error);
        res.status(500).json({ error: "Failed to join project" });
    }
});

// POST invite notification to a project
router.post("/:id/invite", async (req, res) => { 
    const projectId = req.params.id
    const {sender_user_id, receiver_user_id} = req.body

    try {
        await db.query(
            `
            INSERT INTO notifications (type, project_id, sender_user_id, receiver_user_id)
            VALUES ('invite', $1, $2, $3)
            `, [projectId, sender_user_id, receiver_user_id]
        )
        res.json({message: "Invitation sent"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Failed to create an invite notification"})
    }
})

// POST apply notification to a project
router.post("/:id/apply", async (req, res) => { 
    const projectId = req.params.id
    const {sender_user_id, receiver_user_id} = req.body

    try {
        await db.query(
            `
            INSERT INTO notifications (type, project_id, sender_user_id, receiver_user_id)
            VALUES ('apply', $1, $2, $3)
            `, [projectId, sender_user_id, receiver_user_id]
        )
        res.json({message: "Join request sent"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Failed to create an apply notification"})
    }
})

// POST skills to a project
router.post("/:id/skills", async (req, res) => {
  const projectId = req.params.id;
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
        INSERT INTO project_skills (project_id, skill_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        `,
        [projectId, skillId]
      );
    }

    res.json({ message: "Skills added to project successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to assign skills to project" });
  }
});


// GET skills required by a project
router.get("/:id/skills", async (req, res) => {
    const projectId = req.params.id;

    try {
        const result = await db.query(
            `SELECT s.*
            FROM project_skills ps
            JOIN skills s ON ps.skill_id = s.skill_id
            WHERE ps.project_id = $1`, 
            [projectId]
        );

        res.json(result.rows);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch project skills" });
  }
});

// GET a project with id
router.get("/:id", async (req ,res) => {
    const projectId = req.params.id;
    try{
        const result = await db.query(`SELECT * FROM projects WHERE project_id = $1`, [projectId]);
        
        if (result.rows.length === 0) {
        return res.status(404).json({ error: "Project not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch project" });
    }
});

export default router;