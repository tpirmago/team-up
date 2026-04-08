import styles from './Input.module.css'

interface InputProps {
    label?: string
    type?: string
    className?: string
    [key: string]: any
}

export default function Input({ label, className, type = 'text', ...rest }: InputProps) {
    return (
        <div className={styles.field}>
            <label className={`${styles.label} ${className}`}>{label}</label>
            <input
                className={`${styles.input} ${className}`}
                type={type}
                {...rest} />
        </div>
    )
}
