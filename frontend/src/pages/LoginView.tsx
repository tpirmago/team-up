import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import styles from './LoginView.module.css'
import Input from '../components/Input'
import Button from '../components/Button'

interface LoginViewProps {
    onSignUp: () => void
}

export default function LoginView({ onSignUp }: LoginViewProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function handleLogin() {
        setError('')
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Login failed'
            setError(message)
        }
    }

    return (
        <div className={styles.formCard}>
            <h2 className={styles.title}>Log in to TeamUp</h2>

            {error && <p className={styles.error}>{error}</p>}

            <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

            <Button label="Log in" fullWidth onClick={handleLogin} />

            <p className={styles.signUpText}>
                Not a member yet? <a href="#" className={styles.signUpLink} onClick={onSignUp}>Sign up here</a>
            </p>
        </div>
    )
}
