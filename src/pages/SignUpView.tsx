import styles from './SignUpView.module.css'
import Input from '../components/Input'
import Button from '../components/Button'

interface SignUpViewProps {
    onLogIn: () => void
}

export default function SignUpView({ onLogIn }: SignUpViewProps) {
    return (
        <div className={styles.formCard}>
            <h2 className={styles.title}>Get started</h2>

            <Input label="Username" type="text" />
            <Input label="Email" type="email" />
            <Input label="Password" type="password" />

            <Button label="Sign up" />

            <p className={styles.loginText}>
                Already have an account? <a href="#" className={styles.loginLink} onClick={onLogIn}>Log in here</a>
            </p>
        </div>
    )
}
