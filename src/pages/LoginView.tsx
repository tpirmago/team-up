import styles from './LoginView.module.css'

export default function LoginView() {
    return (
        <div className={styles.formCard}>
            <h2 className={styles.title}>Log in to TeamUp</h2>

            <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input className={styles.input} type="email" />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Password</label>
                <input className={styles.input} type="password" />
            </div>

            <button className={styles.loginBtn}>Log in</button>

            <p className={styles.signUpText}>
                Not a member yet? <a href="#" className={styles.signUpLink}>Sign up here</a>
            </p>
        </div>
    )
}
