import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import styles from './SignUpView.module.css'
import Input from '../components/Input'
import Button from '../components/Button'

interface SignUpViewProps {
    onLogIn: () => void
}

export default function SignUpView({ onLogIn }: SignUpViewProps) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function handleSignUp() {
        setError('')
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const token = await userCredential.user.getIdToken()

            await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ username, email }),
            })
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Sign up failed'
            setError(message)
        }
    }

    return (
        <div className={styles.formCard}>
            <h2 className={styles.title}>Get started</h2>

            {error && <p className={styles.error}>{error}</p>}

            <Input label="Username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
            <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

            <Button label="Sign up" onClick={handleSignUp} />

            <p className={styles.loginText}>
                Already have an account? <a href="#" className={styles.loginLink} onClick={onLogIn}>Log in here</a>
            </p>
        </div>
    )
}
