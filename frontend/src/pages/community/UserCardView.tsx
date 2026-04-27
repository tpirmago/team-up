import { useEffect, useState } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import styles from "./UserCardView.module.css"
import defaultAvatar from "../../assets/avatars/defaultAvatar.png"
import { mockCommunityUsers } from "../../data/mockCommunityUsers"
import Button from "../../components/Button"
import useUsers from "../../hooks/useUsers"
import { API_BASE } from "../../config/config"
import type { Projects } from "../ProfileView"
import { authFetch } from "../../utils/authFetch"
import type { User } from "../../types/community"

interface UserCardViewProps {
    userId: number
    onBack: () => void
}

export default function UserCardView({ userId, onBack }: UserCardViewProps) {
    const { users } = useUsers()
    const [user, setUser] = useState<User>()
    const [projectList, setProjectList] = useState<Projects[]>([])
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
    // const [favorited, setFavorited] = useState(false)

    useEffect(() => {
        setUser(users.find(u => u.user_id === userId))
    }, [users])

    useEffect(() => {
        getData()
    }, [])

    if (!user) {
        return (
            <main className={styles.page}>
                <p className={styles.error}>User not found</p>
            </main>
        )
    }

    async function getData() {
        const me = await authFetch(`${API_BASE}/auth/me`)

        const projectResponse = await fetch(`${API_BASE}/users/${me.user_id}/projects`)
        const projectData = await projectResponse.json()
        setProjectList(projectData)
    }

    async function handleRequestJoin(userId: number, projectId: number) {
        if (!projectId || !userId) return

        await authFetch(`${API_BASE}/projects/${projectId}/invite`, {
            method: "POST",
            body: JSON.stringify({ invited_user_id: userId })
        })
        window.alert("Join request sent!")
    }

    return (
        <main className={styles.page}>
            <section className={styles.topBar}>
                <button type="button" onClick={onBack} className={styles.backBtn}>
                    <svg
                        className={styles.backArrow}
                        width="52"
                        height="12"
                        viewBox="0 0 52 12"
                        aria-hidden="true"
                    >
                        <line x1="1" y1="6" x2="52" y2="6" stroke="currentColor" strokeWidth="1.5" />
                        <polyline
                            points="7,1 1,6 7,11"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span>Back</span>
                </button>
            </section>

            <section className={styles.card}>
                <header className={styles.cardHeader}>
                    <div className={styles.avatar}>
                        <img
                            src={`${API_BASE}${user?.avatar_url}`}
                            alt="User profile"
                            onError={(e) => {
                                e.currentTarget.src = defaultAvatar
                            }}
                        />
                    </div>
                    <div className={styles.nameBlock}>
                        <h1>{user.name}</h1>
                        <p>{user.study_program || ""}</p>
                    </div>
                    {/* <button
                        type="button"
                        className={`${styles.favBtn} ${favorited ? styles.favBtnActive : ""}`}
                        onClick={() => setFavorited(v => !v)}
                        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
                        aria-pressed={favorited}
                    >
                        {favorited ? <FaHeart /> : <FaRegHeart />}
                    </button> */}
                </header>

                <section className={styles.detailsSection}>
                    <h3 className={styles.subSectionTitle}>Skills</h3>
                    <div className={styles.skillsList}>
                        {user?.skills.length === 0
                            ? <p className={styles.placeholder}>No skills specified</p>
                            : user?.skills.map(s => (
                                <span key={s.skill_id} className={styles.skillPill}>
                                    [{s.skill_name}]
                                </span>
                            ))}
                    </div>
                </section>

                <section className={styles.detailsSection}>
                    <h3 className={styles.subSectionTitle}>Interests</h3>
                    <div className={styles.skillsList}>
                        {user?.interests.length === 0
                            ? <p className={styles.placeholder}>No interests specified</p>
                            : user?.interests.map(i => (
                                <span key={i.interest_id} className={styles.skillPill}>
                                    [{i.interest_name}]
                                </span>
                            ))}
                    </div>
                </section>

                <div className={styles.footerActions}>
                    {
                        projectList.length !== 0 && (
                            <div>
                                <h3 className={styles.requestTitle}>Invite user to join your project</h3>
                                <div className={styles.selectDropdown} >
                                    <select
                                        className={styles.selectNew}
                                        value={selectedProjectId ?? ""}
                                        onChange={e => setSelectedProjectId(Number(e.target.value))}>
                                        <option value="">Select a project</option>
                                        {
                                            projectList.map(p => <option key={p.project_id} value={p.project_id} >{p.title}</option>)
                                        }
                                    </select>
                                    <Button
                                        label="Send request"
                                        className={styles.joinBtn}
                                        onClick={() => handleRequestJoin(user!.user_id, selectedProjectId!)}
                                    />
                                </div>
                            </div>
                        )
                    }
                    {/* <Button
                        label="Request to connect"
                        className={styles.connectBtn}
                        onClick={handleRequestJoin}
                    /> */}
                </div>
            </section>
        </main>
    )
}
