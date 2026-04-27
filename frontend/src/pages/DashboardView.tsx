import { useEffect, useState } from "react"
import styles from "./DashboardView.module.css"
import Button from "../components/Button"
import Sidebar from "../components/Sidebar"
import type { SidebarItem } from "../components/Sidebar"
import MyProjectView from "./myProjects/MyProjectView"
import CreateProjectView from "./CreateProjectView"
import NotificationsView from "./notifications/NotificationsView"
import CommunityView from "./community/CommunityView"
import UserCardView from "./community/UserCardView"
import FindProjectView from "./projects/FindProjectView"
import ProjectCardView from "./projects/ProjectCardView"
import ProfileView from "./ProfileView"
// import { testUser } from "../testing/testData"
import { authFetch } from "../utils/authFetch"
import { API_BASE } from "../config/config"
import type { Projects } from "./ProfileView"
import { formatDuration } from "../utils/formatDuration"
import arrowIcon from "../assets/icons/arrow-icon.png"
import bellIcon from "../assets/icons/bell-icon.png"
import teammatesIcon from "../assets/icons/teammates-icon.png"
import projectsIcon from "../assets/icons/projects-icon.png"

interface ToggleCardProps {
    label: string
    value: boolean
    onChange: (v: boolean) => void
}

function ToggleCard({ label, value, onChange }: ToggleCardProps) {
    return (
        <div className={styles.toggleCard}>
            <p className={styles.toggleLabel}>{label}</p>
            <div className={styles.toggle}>
                <button
                    type="button"
                    className={`${styles.toggleBtn} ${value ? styles.toggleOn : ""}`}
                    onClick={() => onChange(true)}
                >
                    ON
                </button>
                <button
                    type="button"
                    className={`${styles.toggleBtn} ${!value ? styles.toggleOff : ""}`}
                    onClick={() => onChange(false)}
                >
                    OFF
                </button>
            </div>
        </div>
    )
}

interface DashboardViewProps {
    username?: string
    activeNav: SidebarItem
    onNavigate: (item: SidebarItem) => void
}

export default function DashboardView({ username, activeNav, onNavigate }: DashboardViewProps) {
    // const user = testUser
    const displayName = username ?? ""
    const [openForProjects, setOpenForProjects] = useState(true)
    const [lookingForTeammates, setLookingForTeammates] = useState(true)
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

    useEffect(() => {
        setSelectedProjectId(null)
        setSelectedUserId(null)
    }, [activeNav])

    const recommendedProjects = 12
    const recommendedTeammates = 27
    const newNotifications: number = 15

    const [myProjects, setMyProjects] = useState<Projects[]>([])
    const displayedProjects = myProjects.slice(0, 2)

    useEffect(() => {
        async function fetchMyProjects() {
            const me = await authFetch(`${API_BASE}/auth/me`)
            const res = await fetch(`${API_BASE}/users/${me.user_id}/projects`)
            const data: Projects[] = await res.json()
            setMyProjects(data)
        }
        fetchMyProjects()
    }, [])

    function handleProjectDeleted(id: number) {
        setMyProjects(prev => prev.filter(p => p.project_id !== id))
    }

    function openProject(id: number) {
        setSelectedProjectId(id)
    }

    function closeProject() {
        setSelectedProjectId(null)
    }

    function openUser(id: number) {
        setSelectedUserId(id)
    }

    function closeUser() {
        setSelectedUserId(null)
    }

    function goToFindNew() {
        setSelectedProjectId(null)
        onNavigate("find-project")
    }

    function handleNavigate(item: SidebarItem) {
        setSelectedProjectId(null)
        setSelectedUserId(null)
        onNavigate(item)
    }

    function renderPage() {
        if (selectedProjectId !== null) {
            return (
                <ProjectCardView
                    projectId={selectedProjectId}
                    onBack={closeProject}
                    onFindNew={goToFindNew}
                    onDeleted={handleProjectDeleted}
                    variant={activeNav === "find-project" ? "find" : "owner"}
                />
            )
        }

        if (selectedUserId !== null) {
            return (
                <UserCardView
                    userId={selectedUserId}
                    onBack={closeUser}
                    onFindNew={() => onNavigate("find-project")}
                />
            )
        }

        switch (activeNav) {
            case "my-projects":
                return (
                    <MyProjectView
                        onOpenProject={openProject}
                        onNavigate={onNavigate}
                        onBack={() => onNavigate("dashboard")}
                        onFindNew={() => onNavigate("find-project")}
                    />
                )
            case "create-project":
                return (
                    <CreateProjectView
                        onNavigate={onNavigate}
                        onBack={() => onNavigate("dashboard")}
                        onFindNew={() => onNavigate("find-project")}
                    />
                )
            case "notifications":
                return (
                    <NotificationsView
                        onOpenProject={openProject}
                        onOpenUser={openUser}
                        onBack={() => onNavigate("dashboard")}
                        onFindNew={() => onNavigate("find-project")}
                    />
                )
            case "find-project":
                return (
                    <FindProjectView
                        onOpenProject={openProject}
                        onBack={() => onNavigate("dashboard")}
                        onCreateNew={() => onNavigate("create-project")}
                    />
                )
            case "meet-teammates":
                return (
                    <CommunityView
                        onOpenUser={openUser}
                        onBack={() => onNavigate("dashboard")}
                        onFindNew={() => onNavigate("find-project")}
                    />
                )
            case "profile":
                return (
                    <ProfileView
                        onBack={() => onNavigate("dashboard")}
                        onFindNew={() => onNavigate("find-project")}
                    />
                )
            default:
                return (
                    <main className={styles.dashboard}>
                        <section className={styles.topBar}>
                            <div>
                                <h1 className={styles.greeting}>Welcome back, {displayName}!</h1>
                                {/* <p className={styles.subGreeting}>
                                    You're currently working on {user.projects.length} project
                                    {user.projects.length === 1 ? "" : "s"}
                                </p> */}
                            </div>
                            <Button
                                label="Find New Project"
                                className={`${styles.compactBtn} ${styles.findBtn}`}
                                onClick={() => onNavigate("find-project")}
                            />
                        </section>

                        <section className={styles.grid}>
                            <div className={styles.projectsCard}>
                                <h3 className={styles.cardTitle}>Your projects</h3>

                                <div className={styles.projectsList}>
                                    {displayedProjects.map((p) => (
                                        <div
                                            key={p.project_id}
                                            className={styles.projectItem}
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => openProject(p.project_id)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ") {
                                                    e.preventDefault()
                                                    openProject(p.project_id)
                                                }
                                            }}
                                        >
                                            <p className={styles.projectName}>{p.title}</p>
                                            <p className={styles.projectMeta}>Duration: {formatDuration(p.duration) || "—"}</p>
                                            <p className={styles.projectMeta}>Status: In Progress</p>
                                            <div
                                                className={styles.projectBtn}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Button
                                                    label="View Project"
                                                    className={`${styles.compactBtn} ${styles.secondaryBtn}`}
                                                    onClick={() => openProject(p.project_id)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.viewAllWrap}>
                                    <Button
                                        label="View All"
                                        className={`${styles.compactBtn} ${styles.secondaryBtn}`}
                                        onClick={() => onNavigate("my-projects")}
                                    />
                                </div>
                            </div>

                            <div className={styles.togglesRow}>
                                <ToggleCard
                                    label="Open for projects"
                                    value={openForProjects}
                                    onChange={setOpenForProjects}
                                />
                                <ToggleCard
                                    label="Looking for teammates"
                                    value={lookingForTeammates}
                                    onChange={setLookingForTeammates}
                                />
                            </div>

                            <div className={styles.rightColumn}>
                                <div className={styles.infoCard}>
                                    <h3 className={styles.cardTitle}>Notifications</h3>
                                    <div
                                        className={styles.infoRow}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => onNavigate("notifications")}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault()
                                                onNavigate("notifications")
                                            }
                                        }}
                                    >
                                        <img src={bellIcon} alt="" className={styles.rowIcon} />
                                        <span className={styles.rowText}>
                                            You have {newNotifications} new notification
                                            {newNotifications === 1 ? "" : "s"}
                                        </span>
                                        <span className={styles.arrowBtn} aria-hidden="true">
                                            <img src={arrowIcon} alt="" />
                                        </span>
                                    </div>
                                    {/* <div className={styles.viewAllWrap}>
                                        <Button label="View All" className={`${styles.compactBtn} ${styles.secondaryBtn}`} />
                                    </div> */}
                                </div>

                                <div className={styles.infoCard}>
                                    <h3 className={styles.cardTitle}>Matchmaking</h3>
                                    <div
                                        className={styles.infoRow}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => window.alert("Coming soon...")}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault()
                                                window.alert("Coming soon...")
                                            }
                                        }}
                                    >
                                        <img src={projectsIcon} alt="" className={styles.rowIcon} />
                                        <span className={styles.rowText}>
                                            Recommended Projects: {recommendedProjects}
                                        </span>
                                        <span className={styles.arrowBtn} aria-hidden="true">
                                            <img src={arrowIcon} alt="" />
                                        </span>
                                    </div>
                                    <div
                                        className={styles.infoRow}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => window.alert("Coming soon...")}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault()
                                                window.alert("Coming soon...")
                                            }
                                        }}
                                    >
                                        <img src={teammatesIcon} alt="" className={styles.rowIcon} />
                                        <span className={styles.rowText}>
                                            Recommended Teammates: {recommendedTeammates}
                                        </span>
                                        <span className={styles.arrowBtn} aria-hidden="true">
                                            <img src={arrowIcon} alt="" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                )
        }
    }

    return (
        <div className={styles.layout}>
            <Sidebar activeItem={activeNav} onNavigate={handleNavigate} />
            {renderPage()}
        </div>
    )
}
