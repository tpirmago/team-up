import styles from './Header.module.css'
import { FaRegUserCircle } from "react-icons/fa";


interface HeaderProps {
    btnLabel: string
    onBtnClick: () => void
    onLogoClick?: () => void
    onUserClick?: () => void 
}

export default function Header({ btnLabel, onBtnClick, onLogoClick, onUserClick }: HeaderProps) {
    return (
        <header className={styles.header}>
            <span className={styles.logo} onClick={onLogoClick} style={{ cursor: onLogoClick ? 'pointer' : undefined }}>TeamUp</span>
            <div className={styles.buttonBox} >
                {
                    btnLabel === "Log out"
                        ? <button className={styles.userNameButton} onClick={onUserClick}>Username <FaRegUserCircle size={20} /></button>
                        : null
                }
                <button className={styles.btn} onClick={onBtnClick}>{btnLabel}</button>
            </div>
        </header>
    )
}
