import { Router } from "express";
import { db } from "../db";

const router = Router()

// Get all interests
router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM interests ORDER BY interest_name ASC")
        res.json(result.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Failer to fetch interests"})
    }
})

export default router