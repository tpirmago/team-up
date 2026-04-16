import { useEffect, useState } from "react"
import NotificationsHeader from "../../components/notifications/NotificationsHeader"
import styles from "./NotificationsView.module.css"
import NotificationRow from "../../components/notifications/NotificationRow"
import { type Projects, type User } from "../ProfileView"
import NotificationDialog from "../../components/notifications/NotificationDialog"

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
    const [projectList, setProjectList] = useState<Projects[]>([])

    const [selectedNotification, setSelectedNotification] = useState<Notifications>()
    const [senderUser, setSenderUser] = useState<User>()
    const [selectedProject, setSelectedProject] = useState<Projects>()

    const [dialogOpen, setDialogOpen] = useState(false)

    useEffect(() => {
        const getNotifications = async () => {
            const notifResponse = await fetch("http://localhost:3000/notifications/2")
            const notifData = await notifResponse.json()

            const userResponse = await fetch("http://localhost:3000/users")
            const userData = await userResponse.json()

            const projectResponse = await fetch("http://localhost:3000/projects")
            const projectData = await projectResponse.json()

            setNotificationList(notifData)
            setUserList(userData)
            setProjectList(projectData)
        }
        getNotifications()
    }, [])

    function changeNotificationStatus(notification: Notifications) {
        setNotificationList(prev =>
            prev.map(n =>
                n.notification_id === notification.notification_id
                    ? { ...n, read: true }
                    : n
            )
        )
        setSelectedNotification(notification)
        setSenderUser(userList.find(u => u.user_id === notification.sender_user_id))
        setSelectedProject(projectList.find(p => p.project_id === notification.project_id))
        setDialogOpen(true)
    }

    function closeDialog() {
        setDialogOpen(false)
    }


    const filtered = listStatus === "unread"
        ? notificationList.filter(n => n.read === false)
        : notificationList


    return (
        <main className={styles.notificationsPage} >
            <nav className={styles.navigation} >
                <ul className={styles.navigationList} >
                    <li >Dashboard</li>
                    <li>My Projects</li>
                    <li>Events</li>
                </ul>
            </nav>
            <section className={styles.notificationsSection} >
                <section className={styles.notificationsBackground} >
                    <NotificationsHeader
                        status={listStatus}
                        setStatus={setListStatus}
                    />
                    <div className={styles.rowHeader} >
                        <p className={styles.rowHeaderItem} >sender</p>
                        <p>message</p>
                        <p>date</p>
                    </div>
                    <section className={styles.listSection} >
                        {notificationList &&
                            (
                                filtered.map(n =>
                                    <NotificationRow
                                        key={n.notification_id}
                                        notification={n}
                                        openNotification={changeNotificationStatus}
                                        users={userList}
                                    />
                                )
                            )
                        }
                        {
                            selectedNotification && senderUser && selectedProject && (
                                <NotificationDialog
                                    notification={selectedNotification}
                                    user={senderUser}
                                    project={selectedProject}
                                    dialogOpen={dialogOpen}
                                    closeDialog={closeDialog}
                                    />
                            )}
                    </section>
                </section>
            </section>
        </main>
    )
}