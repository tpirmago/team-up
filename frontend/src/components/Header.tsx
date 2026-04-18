import styles from './Header.module.css'

interface HeaderProps {
    btnLabel: string
    onBtnClick: () => void
    onLogoClick?: () => void
}

export default function Header({ btnLabel, onBtnClick, onLogoClick }: HeaderProps) {
    return (
        <header className={styles.header}>
            <span className={styles.logo} onClick={onLogoClick} style={{ cursor: onLogoClick ? 'pointer' : undefined }}>TeamUp</span>
            <button className={styles.btn} onClick={onBtnClick}>{btnLabel}</button>
        </header>
    )
}
