import styles from './Header.module.css'

interface HeaderProps {
    btnLabel: string
    onBtnClick: () => void
}

export default function Header({ btnLabel, onBtnClick }: HeaderProps) {
    return (
        <header className={styles.header}>
            <span className={styles.logo}>TeamUp</span>
            <button className={styles.btn} onClick={onBtnClick}>{btnLabel}</button>
        </header>
    )
}
