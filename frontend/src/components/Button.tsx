import styles from './Button.module.css'

interface ButtonProps {
    label: string
    onClick?: () => void
    fullWidth?: boolean
    className?: string
    [key: string]: any
}

export default function Button({ label, onClick, className, fullWidth = false, ...rest }: ButtonProps) {
    return (
        <button
            className={`${styles.btn} ${fullWidth ? styles.fullWidth : ''} ${className}`}
            onClick={onClick}
            {...rest}
        >
            {label}
        </button>
    )
}
