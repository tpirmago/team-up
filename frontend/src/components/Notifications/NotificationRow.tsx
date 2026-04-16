import type { Notifications } from "../../pages/notifications/NotificationsView"
import type { User } from "../../pages/ProfileView"
import styles from "./NotificationRow.module.css"

interface NotificationRowProps {
    notification: Notifications
    openNotification: (notification: Notifications) => void
    users: User[]
}

export default function NotificationRow({ notification, openNotification, users }: NotificationRowProps) {

    const date = new Date(notification.created_at).toLocaleDateString("fi-Fi")

    return (
        <button
            type="button"
            className={` ${styles.button} ${notification.read ? styles.read : styles.unread}`}
            onClick={() => openNotification(notification)}
        >
            {
                notification.read
                    ? <p></p>
                    : <p>New</p>
            }
            {
                users.map(u =>
                    u.user_id === notification.sender_user_id
                        ? < p > {u.username}</p>
                        : null
                )
            }
            {
                notification.type === "apply"
                    ? <p>Your project has received a new join request!</p>
                    : <p>You have received a new project invitation!</p>
            }
            <p>{date}</p>
        </button >
    )
}