import { useState } from "react"
import styles from "./DashboardView.module.css"
import Button from "../components/Button"
import { testUser } from "../testing/testData"
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
}

export default function DashboardView({ username }: DashboardViewProps = {}) {
    const user = testUser
    const displayName = username ?? user.username
    const [openForProjects, setOpenForProjects] = useState(true)
    const [lookingForTeammates, setLookingForTeammates] = useState(true)

    const recommendedProjects = 12
    const recommendedTeammates = 27
    const newNotifications = 1

    const displayedProjects = user.projects.slice(0, 2)

    return (
        <main className={styles.dashboard}>
            <section className={styles.topBar}>
                <div>
                    <h1 className={styles.greeting}>Welcome back, {displayName}!</h1>
                    <p className={styles.subGreeting}>
                        You're currently working on {user.projects.length} project
                        {user.projects.length === 1 ? "" : "s"}
                    </p>
                </div>
                <Button label="Find New Project" />
            </section>

            <section className={styles.grid}>
                <div className={styles.projectsCard}>
                    <h3 className={styles.cardTitle}>Your projects</h3>

                    {displayedProjects.map((p) => (
                        <div key={p.project_id} className={styles.projectItem}>
                            <p className={styles.projectName}>{p.title}</p>
                            <p className={styles.projectMeta}>Duration: {p.duration}</p>
                            <p className={styles.projectMeta}>Status: In Progress</p>
                            <div className={styles.projectBtn}>
                                <Button label="View Project" />
                            </div>
                        </div>
                    ))}

                    <div className={styles.viewAllWrap}>
                        <Button label="View All" />
                    </div>
                </div>

                <div className={styles.rightColumn}>
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

                    <div className={styles.infoCard}>
                        <h3 className={styles.cardTitle}>Matchmaking</h3>
                        <div className={styles.infoRow}>
                            <img src={projectsIcon} alt="" className={styles.rowIcon} />
                            <span className={styles.rowText}>
                                Recommended Projects: {recommendedProjects}
                            </span>
                            <button type="button" className={styles.arrowBtn}>
                                <img src={arrowIcon} alt="Open" />
                            </button>
                        </div>
                        <div className={styles.infoRow}>
                            <img src={teammatesIcon} alt="" className={styles.rowIcon} />
                            <span className={styles.rowText}>
                                Recommended Teammates: {recommendedTeammates}
                            </span>
                            <button type="button" className={styles.arrowBtn}>
                                <img src={arrowIcon} alt="Open" />
                            </button>
                        </div>
                    </div>

                    <div className={styles.infoCard}>
                        <h3 className={styles.cardTitle}>Notifications</h3>
                        <div className={styles.infoRow}>
                            <img src={bellIcon} alt="" className={styles.rowIcon} />
                            <span className={styles.rowText}>
                                You have {newNotifications} new notification
                                {newNotifications === 1 ? "" : "s"}
                            </span>
                            <button type="button" className={styles.arrowBtn}>
                                <img src={arrowIcon} alt="Open" />
                            </button>
                        </div>
                        <div className={styles.viewAllWrap}>
                            <Button label="View All" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
