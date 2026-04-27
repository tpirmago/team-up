import { Router, Response } from "express";
import { db } from "../db";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

// GET all projects
router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM projects ORDER BY project_id DESC");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch projects" });
    }
});

// POST a new project
router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
    const ownerUid = req.uid
    const {
        title,
        description,
        topic,
        location_mode,
        team_size_min,
        team_size_max,
        duration
    } = req.body;

    try {
        const userResult = await db.query(
            `SELECT user_id
            FROM users
            WHERE firebase_id = $1`,
            [ownerUid]
        )

        if (userResult.rowCount === 0) {
            return res.status(404).json({ error: "User not found" })
        }

        const ownerId = userResult.rows[0].user_id

        const result = await db.query(
            `INSERT INTO projects 
            (owner_user_id, title, description, topic, location_mode, team_size_min, team_size_max, duration)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING * `,
            [
                ownerId,
                title,
                description,
                topic,
                location_mode,
                team_size_min,
                team_size_max,
                duration
            ])

        await db.query(
            `INSERT INTO project_members (project_id, user_id)
                VALUES ($1, $2)`,
            [result.rows[0].project_id, ownerId]
        )

        res.status(201).json({ message: "Project created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create project" });
    }
});

// POST users to a team
router.post("/:id/join", authMiddleware, async (req: AuthRequest, res) => {
    const projectId = req.params.id;
    const firebaseUid = req.uid

    try {

        const userResult = await db.query(
            `SELECT user_id
            FROM users
            WHERE firebase_id = $1`,
            [firebaseUid]
        )

        if (userResult.rowCount === 0) {
            return res.status(404).json({ error: "User not found" })
        }

        const ownerId = userResult.rows[0].user_id

        await db.query(
            `INSERT INTO project_members (project_id, user_id)
            VALUES ($1, $2)`, [projectId, ownerId]
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

// POST apply notification to a project
router.post("/:project_id/apply", authMiddleware, async (req: AuthRequest, res) => {
    const projectId = req.params.project_id
    const firebaseUid = req.uid

    try {

        // 1️⃣ Find user_id of current user (sent the request) 
        const currentUserResult = await db.query(
            `SELECT user_id
            FROM users
            WHERE firebase_id = $1`,
            [firebaseUid]
        )

        // 2️⃣ Find user_id of project owner (will receive the request)
        const projectOwnerResult = await db.query(
            `SELECT owner_user_id
            FROM projects
            WHERE project_id = $1`,
            [projectId]
        )

        if (currentUserResult.rowCount === 0 || projectOwnerResult.rowCount === 0) {
            return res.status(404).json({ error: "User not found" })
        }

        const currentUserID = currentUserResult.rows[0].user_id
        const projectOwnerId = projectOwnerResult.rows[0].owner_user_id

        // 3️⃣ Insert a new notification to database
        await db.query(
            `
            INSERT INTO notifications (type, project_id, sender_user_id, receiver_user_id)
            VALUES ('apply', $1, $2, $3)
            ON CONFLICT DO NOTHING
            `, [projectId, currentUserID, projectOwnerId]
        )
        res.json({ message: "Join request sent" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to create an apply notification" })
    }
})

// POST invite notification to a project
router.post("/:project_id/invite", authMiddleware, async (req: AuthRequest, res) => {
    const projectId = req.params.project_id
    const firebaseUid = req.uid
    const invitedUserId = req.body.invited_user_id

    try {

        // 1️⃣ Find user_id of project owner (sent the invitation) 
        const projectOwnerResult = await db.query(
            `SELECT user_id
            FROM users
            WHERE firebase_id = $1`,
            [firebaseUid]
        )

        if (projectOwnerResult.rowCount === 0) {
            return res.status(404).json({ error: "User not found" })
        }

        const projectOwnerId = projectOwnerResult.rows[0].user_id

        // 2️⃣ Insert a new notification to database
        await db.query(
            `
            INSERT INTO notifications (type, project_id, sender_user_id, receiver_user_id)
            VALUES ('invite', $1, $2, $3)
            ON CONFLICT DO NOTHING
            `, [projectId, projectOwnerId, invitedUserId]
        )
        res.json({ message: "Invitation sent" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to create an invite notification" })
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
router.get("/:id", async (req, res) => {
    const projectId = req.params.id;
    try {
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

// DELETE a project by id
router.delete("/:project_id", authMiddleware, async (req: AuthRequest, res: Response) => {
    const projectId = req.params.project_id
    const firebaseUid = req.uid

    try {

        const userResult = await db.query(
            `SELECT user_id
            FROM users
            WHERE firebase_id = $1`,
            [firebaseUid]
        )

        const userId = userResult.rows[0]?.user_id

        if (!userId) {
            res.status(401).json({ error: "User not found" })
        }

        const result = await db.query(
            `SELECT owner_user_id
            FROM projects
            WHERE project_id = $1`,
            [projectId]
        )

        const project = result.rows[0]

        if (!project) {
            return res.status(404).json({ error: "Project not found" })
        }

        if (project.owner_user_id !== userId) {
            return res.status(403).json({ error: "Not authorized to delete this project" })
        }

        await db.query(
            `DELETE FROM projects
            WHERE project_id = $1`,
            [projectId,]
        )
        res.json({ message: "Project deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to delete project" })
    }
})

export default router;