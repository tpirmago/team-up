import { Router } from "express";
import { db } from "../db";

const router = Router();

// GET all skills
router.get("/", async (req ,res) => {
    try{
        const result = await db.query("SELECT * FROM skills ORDER BY skill_name ASC");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch skills" });
    }
});

export default router;