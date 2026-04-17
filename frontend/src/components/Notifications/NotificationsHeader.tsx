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
                <button onClick={() => setStatus("all")} className={status === "all" ? styles.active : styles.switchButton} >All</button>
                <button onClick={() => setStatus("unread")} className={status === "unread" ? styles.active : styles.switchButton} >Unread</button>
            </div>
        </section>
    )
}