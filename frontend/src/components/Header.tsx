import styles from './Header.module.css'
import bellIcon from '../assets/icons/bell-icon.png'
import userIcon from '../assets/icons/user-icon.png'

interface HeaderProps {
    btnLabel: string
    onBtnClick: () => void
    onLogoClick?: () => void
    username?: string
    onBellClick?: () => void
    onUserClick?: () => void
}

export default function Header({
    btnLabel,
    onBtnClick,
    onLogoClick,
    username,
    onBellClick,
    onUserClick,
}: HeaderProps) {
    return (
        <header className={styles.header}>
            <span
                className={styles.logo}
                onClick={onLogoClick}
                style={{ cursor: onLogoClick ? 'pointer' : undefined }}
            >
                TeamUp
            </span>
            <div className={styles.right}>
                {username && (
                    <>
                        <button
                            type="button"
                            className={styles.iconBtn}
                            onClick={onBellClick}
                            aria-label="Notifications"
                        >
                            <img src={bellIcon} alt="" className={styles.icon} />
                        </button>
                        <button
                            type="button"
                            className={styles.userBtn}
                            onClick={onUserClick}
                            aria-label="Account"
                        >
                            <span className={styles.username}>{username}</span>
                            <img src={userIcon} alt="" className={styles.icon} />
                        </button>
                    </>
                )}
                <button className={styles.btn} onClick={onBtnClick}>{btnLabel}</button>
            </div>
        </header>
    )
}
