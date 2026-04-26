import { useEffect, useState } from "react"
import styles from "./NotificationsView.module.css"
import { type Projects, type User } from "../ProfileView"
import NotificationsHeader from "../../components/notifications/NotificationsHeader"
import NotificationRow from "../../components/notifications/NotificationRow"
import NotificationDialog from "../../components/notifications/NotificationDialog"
import { authFetch } from "../../utils/authFetch"
import { FiInbox } from "react-icons/fi"
import { API_BASE } from "../../config/config"

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

interface NotificationsViewProps {
    onOpenProject?: (id: number) => void
}

export default function NotificationsView({ onOpenProject }: NotificationsViewProps) {

    const [listStatus, setListStatus] = useState("all")
    const [notificationList, setNotificationList] = useState<Notifications[]>([])
    const [userList, setUserList] = useState<User[]>([])
    const [projectList, setProjectList] = useState<Projects[]>([])

    const [selectedNotification, setSelectedNotification] = useState<Notifications>()
    const [senderUser, setSenderUser] = useState<User>()
    const [selectedProject, setSelectedProject] = useState<Projects>()

    const [dialogOpen, setDialogOpen] = useState(false)

    const getNotifications = async () => {

        const me = await authFetch(`${API_BASE}/auth/me`)

        const notifData = await authFetch(`${API_BASE}/notifications/${me.user_id}`)

        const userResponse = await fetch(`${API_BASE}/users`)
        const userData = await userResponse.json()

        const projectResponse = await fetch(`${API_BASE}/projects`)
        const projectData = await projectResponse.json()

        setNotificationList(notifData)
        setUserList(userData)
        setProjectList(projectData)
    }

    useEffect(() => {
        getNotifications()
    }, [])

    async function changeNotificationStatus(notification: Notifications) {

        await authFetch(`${API_BASE}/notifications/${notification.notification_id}/read`, {
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

        await authFetch(`${API_BASE}/notifications/${notification_id}/decline`, {
            method: "POST"
        })

        getNotifications()
    }

    const handleAccept = async (notification_id: number) => {
        closeDialog()
        setSelectedNotification(undefined)
        setSenderUser(undefined)
        setSelectedProject(undefined)

        await authFetch(`${API_BASE}/notifications/${notification_id}/accept`, {
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
                    {notificationList.length === 0
                        ? <p className={styles.noMessage} > <FiInbox size={24} /> No notifications yet</p>
                        : <section className={styles.listSection} >
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
                                        onOpenProject={onOpenProject}
                                    />
                                )}
                        </section>}
                </section>
            </section>
        </main>
    )
}