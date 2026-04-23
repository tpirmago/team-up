import DetailRow from "./DetailRow"
import styles from "./DetailsSection.module.css"
import type { User } from "../../pages/ProfileView"

interface ProfileDetailsProps {
    editMode: boolean
    user: User
    setName: React.Dispatch<React.SetStateAction<string>>
    setUserName: React.Dispatch<React.SetStateAction<string>>
    setProgram: React.Dispatch<React.SetStateAction<string>>
}

export default function DetailsSection({ editMode, user, setName, setUserName, setProgram }: ProfileDetailsProps) {
    return (
        <div className={styles.info} >
            <div className={styles.personalDetails} >
                <h3 className={styles.sectionHeader} >Personal details</h3>
                <DetailRow
                    editMode={editMode}
                    label={"Full name"}
                    value={user.name}
                    setValue={setName}
                />
                <DetailRow
                    editMode={editMode}
                    label={"Username"}
                    value={user.username}
                    setValue={setUserName}
                />
                <DetailRow
                    editMode={editMode}
                    label={"Study Program"}
                    value={user.study_program}
                    setValue={setProgram}
                />
                <div className={styles.detailBox} >
                    <h4 className={styles.detailHeader} >Email</h4>
                    <p className={styles.detailText} >{user.email}</p>
                </div>
                <div className={styles.detailBox} >
                    <h4 className={styles.detailHeader} >Password</h4>
                    {
                        editMode
                            ? <button className={styles.pwButton} >Forgot password?</button>
                            : <p className={styles.detailText} >••••••</p>
                    }
                </div>
            </div>
        </div>
    )
}