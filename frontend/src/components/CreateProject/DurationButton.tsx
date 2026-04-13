import styles from "./DurationButton.module.css"

interface DurationButtonProps {
    monthName: string
    checked: boolean
    onToggle: (month: string) => void
}

export default function DurationButton({ monthName, checked, onToggle }: DurationButtonProps) {
    return (
        <div >
            <label className={`${styles.month} ${checked ? styles.active : null}`} >
                <input
                    type="checkbox" value={monthName}
                    onChange={() => onToggle(monthName)}/>
                {monthName}
            </label>
        </div>
    )
}