import styles from './Button.module.css'

interface ButtonProps {
    label: string
    onClick?: () => void
    fullWidth?: boolean
    className?: string
}

export default function Button({ label, onClick, className, fullWidth = false }: ButtonProps) {
    return (
        <button
            className={`${styles.btn} ${fullWidth ? styles.fullWidth : ''} ${className}`}
            onClick={onClick}
        >
            {label}
        </button>
    )
}
