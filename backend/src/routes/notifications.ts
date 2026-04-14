import { Router } from "express";
import { db } from "../db";

const router = Router()

router.get("/:id", async (req, res) => {
    const userId = req.params.id

    try {
        const result = await db.query(
            `SELECT *
            FROM notifications
            WHERE receiver_user_id = $1`, 
            [userId]
        )
        res.send(result.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to fetch notifications"})
    }
})

export default router