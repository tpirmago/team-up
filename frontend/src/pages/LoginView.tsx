import styles from './LoginView.module.css'
import Input from '../components/Input'
import Button from '../components/Button'

interface LoginViewProps {
    onSignUp: () => void
}

export default function LoginView({ onSignUp }: LoginViewProps) {
    return (
        <div className={styles.formCard}>
            <h2 className={styles.title}>Log in to TeamUp</h2>

            <Input label="Email" type="email" />
            <Input label="Password" type="password" />

            <Button label="Log in" fullWidth />

            <p className={styles.signUpText}>
                Not a member yet? <a href="#" className={styles.signUpLink} onClick={onSignUp}>Sign up here</a>
            </p>
        </div>
    )
}
