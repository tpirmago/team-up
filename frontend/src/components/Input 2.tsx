import styles from './Input.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export default function Input({ label, className, type = 'text', ref, ...rest }: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
    return (
        <div className={styles.field}>
            <label className={`${styles.label} ${className}`}>{label}</label>
            <input
                className={`${styles.input} ${className}`}
                type={type}
                ref={ref}
                {...rest} />
        </div>
    )
}
