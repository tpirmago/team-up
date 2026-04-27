import type React from "react"
import styles from "./NotificationsHeader.module.css"

interface NotificationsHeaderProps {
    status: string
    setStatus: React.Dispatch<React.SetStateAction<string>>
}

export default function NotificationsHeader({status, setStatus}: NotificationsHeaderProps) {

    return (
        <section className={styles.headerRow} >
            <h1 className={styles.notificationTitle} >Notifications</h1>
            <div className={styles.headerButtons} >
                <button
                    onClick={() => setStatus("all")}
                    className={`${styles.switchButton} ${status === "all" ? styles.activeAll : ""}`}
                >
                    All
                </button>
                <button
                    onClick={() => setStatus("unread")}
                    className={`${styles.switchButton} ${status === "unread" ? styles.activeUnread : ""}`}
                >
                    Unread
                </button>
            </div>
        </section>
    )
}