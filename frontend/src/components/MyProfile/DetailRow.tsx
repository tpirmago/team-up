import styles from "./DetailRow.module.css"
import Input from "../Input"
import type React from "react"

interface DetailRowProps {
    label: string
    value: string
    editMode: boolean
    type?: string
    setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function DetailRow({ label, value, editMode, setValue, type = "text" }: DetailRowProps) {
    return (
        <div className={styles.detailBox} >
            <h4 className={styles.detailHeader} >{label}</h4>
            {
                editMode
                    ? <Input className={styles.detailInput}
                        type={type}
                        defaultValue={value}
                        onChange={e => setValue(e.target.value)} />
                    : <p className={styles.detailText} >{value}</p>
            }
        </div>
    )
}