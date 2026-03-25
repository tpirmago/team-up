import styles from './Navbar.module.css'

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <span className={styles.logo}>TeamUp</span>
            <button className={styles.signUpBtn}>Sign up</button>
        </nav>
    )
}
