import Input from "../Input"
import styles from "./FormField.module.css"

interface FormFieldProps {
    label: string
    name: string
    value: string | number
    type: string
    handleForm: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function FormField({ label, name, value, type, handleForm }: FormFieldProps) {
    return (
        <div>
            <h2 className={styles.formHeader} >{label}</h2>
            <Input name={name} value={value} type={type} onChange={handleForm} required />
        </div>
    )
}