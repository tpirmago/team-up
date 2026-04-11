import styles from "./DetailRow.module.css"
import Input from "../Input"

interface DetailRowProps {
    label: string
    value: string
    editMode: boolean
    type?: string
    inputRef: React.RefObject<HTMLInputElement | null>
}

export default function DetailRow({ label, value, editMode, inputRef, type = "text" }: DetailRowProps) {
    return (
        <div className={styles.detailBox} >
            <h4 className={styles.detailHeader} >{label}</h4>
            {
                editMode
                    ? <Input className={styles.detailInput}
                        type={type}
                        defaultValue={value}
                        inputRef={inputRef} />
                    : <p className={styles.detailText} >{value}</p>
            }
        </div>
    )
}