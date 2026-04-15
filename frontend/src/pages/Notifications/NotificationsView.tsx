import { useEffect, useState } from "react"
import NotificationsHeader from "../../components/Notifications/NotificationsHeader"
import styles from "./NotificationsView.module.css"
import NotificationRow from "../../components/Notifications/NotificationRow"
import type { User } from "../ProfileView"

export interface Notifications {
    notification_id: number
    type: string
    project_id: number
    sender_user_id: number
    receiver_user_id: number
    status: string
    read: boolean
    created_at: string

}

export default function NotificationsView() {

    const [listStatus, setListStatus] = useState("all")
    const [notificationList, setNotificationList] = useState<Notifications[]>([])
    const [userList, setUserList] = useState<User[]>([])

    useEffect(() => {
        const getNotifications = async () => {
            const notifResponse = await fetch("http://localhost:3000/notifications/2")
            const notifData = await notifResponse.json()

            const userResponse = await fetch ("http://localhost:3000/users")
            const userData = await userResponse.json()

            setNotificationList(notifData)
            setUserList(userData)
        }
        getNotifications()
    }, [])

    function changeNotificationStatus(id: number) {
        setNotificationList(prev =>
            prev.map ( n => 
                n.notification_id === id
                ? {...n, read: true}
                : n
            )
        )
    }

    return (
        <main className={styles.notificationsPage} >
            <section className={styles.notificationsSection} >
                <section className={styles.notificationsBackground} >
                    <NotificationsHeader
                        status={listStatus}
                        setStatus={setListStatus}
                    />
                    <section className={styles.listSection} >
                        {notificationList && 
                            (
                                notificationList.map(n =>
                                    <NotificationRow 
                                        key={n.notification_id}
                                        notification={n}
                                        openNotification={changeNotificationStatus}
                                        users={userList}
                                    />
                                )

                            )
                        }
                    </section>
                </section>
            </section>
        </main>
    )
}