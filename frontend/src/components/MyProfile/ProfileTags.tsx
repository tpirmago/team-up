import { RxCross2 } from "react-icons/rx"
import styles from "./ProfileTags.module.css"
import Button from "../Button"

interface Tags {
    id: number
    name: string
}

interface ProfileTagsProps {
    title: string
    editMode: boolean
    selectedId: number
    setSelectedId: React.Dispatch<React.SetStateAction<number>>
    allTags: Tags[]
    userTags: Tags[]
    handleAdd: (id: number) => void
    handleDelete: (id: number) => void
    error: string | null
}

export default function ProfileTags({
    title,
    editMode,
    selectedId,
    setSelectedId,
    userTags,
    allTags,
    handleAdd,
    handleDelete,
    error }: ProfileTagsProps) {
    return (
        <div>
            <header className={styles.skillsHeader} >
                <h3 className={styles.headerTitle} >{title}</h3>
                {
                    editMode
                        ? <div className={styles.selectWrapper} >
                            {error && <p className={styles.error}>{error}</p>}
                            <div className={styles.selectDropdown} >
                                <select className={styles.selectNew} value={selectedId} onChange={(e) => setSelectedId(Number(e.target.value))}>
                                    {
                                        allTags.map(i => <option key={i.id} value={i.id} >{i.name}</option>)
                                    }
                                </select>
                                <Button
                                    label="+ Add"
                                    className={styles.blackButton}
                                    onClick={() => handleAdd(selectedId)}
                                />
                            </div>
                        </div>
                        : null
                }
            </header>
            <div className={styles.skillsSection} >
                {
                    userTags.map(i =>
                        editMode
                            ? <button
                                key={i.id}
                                className={styles.deleteInfo}
                                onClick={() => handleDelete(i.id)}
                            > <RxCross2 color="red" />[{i.name}]</button>
                            : <p key={i.id} className={styles.tagName} >[{i.name}]</p>
                    )
                }
            </div>
        </div>
    )
}