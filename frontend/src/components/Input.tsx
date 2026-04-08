import styles from './Input.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
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
