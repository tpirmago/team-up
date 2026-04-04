import type React from 'react'
import styles from './Input.module.css'

interface InputProps {
    label?: string
    type?: string
    className?: string
    defaultValue?: string
    inputRef? : React.Ref<HTMLInputElement>
}

export default function Input({ label, className, defaultValue, inputRef, type = 'text' }: InputProps) {
    return (
        <div className={styles.field}>
            <label className={`${styles.label} ${className}`}>{label}</label>
            <input className={`${styles.input} ${className}`} type={type} defaultValue={defaultValue} ref={inputRef} />
        </div>
    )
}
