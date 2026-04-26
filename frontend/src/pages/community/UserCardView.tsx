import { useState } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import styles from "./UserCardView.module.css"
import defaultAvatar from "../../assets/avatars/defaultAvatar.png"
import { mockCommunityUsers } from "../../data/mockCommunityUsers"
import Button from "../../components/Button"

interface UserCardViewProps {
    userId: number
    onBack: () => void
}

export default function UserCardView({ userId, onBack }: UserCardViewProps) {
    // TODO: replace with GET /users/:id once backend endpoint is ready
    const user = mockCommunityUsers.find(u => u.id === userId)
    const [favorited, setFavorited] = useState(false)

    if (!user) {
        return (
            <main className={styles.page}>
                <p className={styles.error}>User not found</p>
            </main>
        )
    }

    function handleRequestConnect() {
        // TODO: POST /users/:id/connect once backend endpoint is ready
        window.alert("Connect request sent!")
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
                            src={user.avatar_url || defaultAvatar}
                            alt="User profile"
                            onError={(e) => {
                                e.currentTarget.src = defaultAvatar
                            }}
                        />
                    </div>
                    <div className={styles.nameBlock}>
                        <h1>{user.name}</h1>
                        <p>{user.studyProgram}</p>
                    </div>
                    <button
                        type="button"
                        className={`${styles.favBtn} ${favorited ? styles.favBtnActive : ""}`}
                        onClick={() => setFavorited(v => !v)}
                        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
                        aria-pressed={favorited}
                    >
                        {favorited ? <FaHeart /> : <FaRegHeart />}
                    </button>
                </header>

                <div className={styles.footerActions}>
                    <Button
                        label="Request to connect"
                        className={styles.connectBtn}
                        onClick={handleRequestConnect}
                    />
                </div>
            </section>
        </main>
    )
}
