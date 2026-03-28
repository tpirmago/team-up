import styles from './Input.module.css'

interface InputProps {
    label: string
    type?: string
}

export default function Input({ label, type = 'text' }: InputProps) {
    return (
        <div className={styles.field}>
            <label className={styles.label}>{label}</label>
            <input className={styles.input} type={type} />
        </div>
    )
}
