import { Router } from "express";
import { db } from "../db";

const router = Router()

// GET user notifications by user_id
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

// Mark notification as read
router.patch("/:id", async (req , res) => {
    const notifID = req.params.id

    try {
        const result = await db.query(
            `UPDATE notifications
            SET read = true
            WHERE notification_id = $1`,
            [notifID]
        )
        res.send(result.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Failed to mark notification as read"})
    }
})



export default router