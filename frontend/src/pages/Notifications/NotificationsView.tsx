import { useEffect, useState } from "react"
import styles from "./NotificationsView.module.css"
import { type Projects, type User } from "../ProfileView"
import NotificationsHeader from "../../components/Notifications/NotificationsHeader"
import NotificationRow from "../../components/Notifications/NotificationRow"
import NotificationDialog from "../../components/Notifications/NotificationDialog"


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

    const getNotifications = async () => {
        const notifResponse = await fetch("http://192.168.101.105:3000/notifications/2")
        const notifData = await notifResponse.json()

        const userResponse = await fetch("http://192.168.101.105:3000/users")
        const userData = await userResponse.json()

        const projectResponse = await fetch("http://192.168.101.105:3000/projects")
        const projectData = await projectResponse.json()

        setNotificationList(notifData)
        setUserList(userData)
        setProjectList(projectData)
    }

    useEffect(() => {
        getNotifications()
    }, [])

    async function changeNotificationStatus(notification: Notifications) {

        await fetch(`http://192.168.101.105:3000/notifications/${notification.notification_id}/read`, {
            method: "PATCH"
        })

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

    const handleDecline = async (notification_id: number) => {
        closeDialog()
        setSelectedNotification(undefined)
        setSenderUser(undefined)
        setSelectedProject(undefined)

        await fetch(`http://192.168.101.105:3000/notifications/${notification_id}/decline`, {
            method: "POST"
        })

        getNotifications()
    }

    const handleAccept = async (notification_id: number) => {
        closeDialog()
        setSelectedNotification(undefined)
        setSenderUser(undefined)
        setSelectedProject(undefined)

        await fetch(`http://192.168.101.105:3000/notifications/${notification_id}/accept`, {
            method: "POST"
        })

        getNotifications()
    }

    const filtered = listStatus === "unread"
        ? notificationList.filter(n => n.read === false)
        : notificationList


    return (
        <main className={styles.notificationsPage} >
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
                                    acceptRequest={handleAccept}
                                    declineRequest={handleDecline}
                                />
                            )}
                    </section>
                </section>
            </section>
        </main>
    )
}