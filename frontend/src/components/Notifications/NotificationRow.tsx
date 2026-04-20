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
            <div className={styles.firstRowsection} >
                {
                    notification.read
                        ? <p>{notification.status}</p>
                        : <p>new</p>}
                {
                    users.map(u =>
                        u.user_id === notification.sender_user_id
                            ? < p key={u.user_id} className={styles.notificationSender} > {u.username}</p>
                            : null
                    )
                }
            </div>
            <div className={styles.secondRowsection} >{
                notification.type === "apply"
                    ? <p className={styles.notificationText} >Your project has received a new join request!</p>
                    : notification.type === "invite"
                        ?  <p className={styles.notificationText} >You have received a new project invitation!</p>
                        :  <p className={styles.notificationText} >Your request has been answered!</p>
            }
                <p>{date}</p>
            </div>
        </button >
    )
}