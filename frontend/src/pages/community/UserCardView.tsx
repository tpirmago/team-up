import styles from "./UserCardView.module.css"
import defaultAvatar from "../../assets/avatars/defaultAvatar.png"
import { mockCommunityUsers } from "../../data/mockCommunityUsers"

interface UserCardViewProps {
    userId: number
    onBack: () => void
}

export default function UserCardView({ userId, onBack }: UserCardViewProps) {
    // TODO: replace with GET /users/:id once backend endpoint is ready
    const user = mockCommunityUsers.find(u => u.id === userId)

    if (!user) {
        return (
            <main className={styles.page}>
                <p className={styles.error}>User not found</p>
            </main>
        )
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
                </header>
            </section>
        </main>
    )
}
