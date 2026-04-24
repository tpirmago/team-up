import styles from './Header.module.css'
import { FaRegUserCircle } from "react-icons/fa";


interface HeaderProps {
    btnLabel: string
    onBtnClick: () => void
    onLogoClick?: () => void
    onUserClick?: () => void
    username?: string | null
}

export default function Header({ btnLabel, onBtnClick, onLogoClick, onUserClick, username }: HeaderProps) {
    return (
        <header className={styles.header}>
            <span className={styles.logo} onClick={onLogoClick} style={{ cursor: onLogoClick ? 'pointer' : undefined }}>TeamUp</span>
            <div className={styles.buttonBox} >
                <button className={styles.btn} onClick={onBtnClick}>{btnLabel}</button>
                {
                    btnLabel === "Log out"
                        ? <button className={styles.userNameButton} onClick={onUserClick}>
                            <p className={styles.userNameText} >{username}</p>
                            <FaRegUserCircle size={30} />
                        </button>
                        : null
                }
            </div>
        </header>
    )
}
