import { Router } from "express";
import { db } from "../db";
import { authMiddleware } from "../middleware/auth";
import { auth } from "firebase-admin";

const router = Router()

// GET user notifications by user_id
router.get("/:user_id", authMiddleware, async (req, res) => {
    const userId = req.params.user_id

    try {
        const result = await db.query(
            `SELECT *
            FROM notifications
            WHERE receiver_user_id = $1
            ORDER BY created_at DESC`,
            [userId]
        )
        res.send(result.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to fetch notifications" })
    }
})

// Mark notification as read
router.patch("/:notification_id/read", authMiddleware, async (req, res) => {
    const notifID = req.params.notification_id

    try {
        await db.query(
            `UPDATE notifications
            SET read = true
            WHERE notification_id = $1`,
            [notifID]
        )
        res.json({ message: "Notification marked as read" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to mark notification as read" })
    }
})

// Mark notification as declined
router.post("/:notification_id/decline", authMiddleware, async (req, res) => {
    const notifID = req.params.notification_id

    try {
        const result = await db.query(
            `UPDATE notifications
            SET status = 'declined'
            WHERE notification_id = $1
                AND status = 'pending'    
            RETURNING notification_id`,
            [notifID]
        )

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Notification not found" })
        }
        res.json({ message: "Request declined" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to mark notification as declined" })
    }
})

// Mark notification as accepted and add user to project
router.post("/:notification_id/accept", authMiddleware, async (req, res) => {
    const notifID = req.params.notification_id

    try {
        const result = await db.query(
            `SELECT *
            FROM notifications
            WHERE notification_id = $1
                AND status = 'pending'`,
            [notifID]
        )

        const notification = result.rows[0]

        if (!notification) {
            return res.status(404).json({ error: "Notification not found" })
        }

        const addedUser =
            notification.type === "invite"
                ? notification.receiver_user_id
                : notification.sender_user_id

        await db.query(
            `INSERT INTO project_members (project_id, user_id)
            VALUES ($1, $2)
            ON CONFLICT DO NOTHING`,
            [notification.project_id, addedUser]
        )

        await db.query(
            `UPDATE notifications
            SET status = 'accepted'
            WHERE notification_id = $1`,
            [notifID]
        )

        res.json({ message: "Request accepted and user added to project" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to mark notification as accepted" })
    }
})

export default router