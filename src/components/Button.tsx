import styles from './Button.module.css'

interface ButtonProps {
    label: string
    onClick?: () => void
    fullWidth?: boolean
}

export default function Button({ label, onClick, fullWidth = false }: ButtonProps) {
    return (
        <button
            className={`${styles.btn} ${fullWidth ? styles.fullWidth : ''}`}
            onClick={onClick}
        >
            {label}
        </button>
    )
}
