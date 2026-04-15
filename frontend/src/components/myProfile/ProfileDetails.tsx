import DetailRow from "../myProfile/DetailRow"
import styles from "./ProfileDetails.module.css"
import type { User } from "../../pages/ProfileView"

interface ProfileDetailsProps {
    editMode: boolean
    user: User
    nameRef: React.RefObject<HTMLInputElement | null>
    usernameRef: React.RefObject<HTMLInputElement | null>
    programRef: React.RefObject<HTMLInputElement | null>
    emailRef: React.RefObject<HTMLInputElement | null>
}

export default function ProfileDetails({ editMode, user, nameRef, usernameRef, programRef, emailRef }: ProfileDetailsProps) {
    return (
        <div className={styles.info} >
            <div className={styles.personalDetails} >
                <h3 className={styles.sectionHeader} >Personal details</h3>
                <DetailRow
                    editMode={editMode}
                    label={"Full name"}
                    value={user.name}
                    inputRef={nameRef}
                />
                <DetailRow
                    editMode={editMode}
                    label={"Username"}
                    value={user.username}
                    inputRef={usernameRef}
                />
                <DetailRow
                    editMode={editMode}
                    label={"Study Program"}
                    value={user.study_program}
                    inputRef={programRef}
                />
                <DetailRow
                    editMode={editMode}
                    label={"Email"}
                    value={user.email}
                    inputRef={emailRef}
                />
                <div className={styles.detailBox} >
                    <h4 className={styles.detailHeader} >Password</h4>
                    {
                        editMode
                            ? <button className={styles.pwButton} >Change password</button>
                            : <p className={styles.detailText} >••••••</p>
                    }
                </div>
            </div>
        </div>
    )
}