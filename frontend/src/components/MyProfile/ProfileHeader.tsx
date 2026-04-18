import { GrEdit } from "react-icons/gr"
import styles from "./ProfileHeader.module.css"
import Button from "../Button"
import type { User } from "../../pages/ProfileView"
// import avatar from "../../assets/Background.png"

interface ProfileHeaderProps {
    editMode: boolean
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
    saveProfile: () => void
    user: User
}

export default function ProfileHeader({editMode, setEditMode, saveProfile, user}: ProfileHeaderProps) {
    return (
        <>
            <header className={styles.headerRow} >
                <h1 >My profile</h1>
                <div className={styles.buttonBox} >
                    <button onClick={() => setEditMode(prev => !prev)} className={styles.editButton} >
                        {editMode ? "Cancel" : <> <GrEdit size={20} /> Edit</>}
                    </button>
                    {
                        editMode ? <Button label="Save" onClick={saveProfile} className={styles.blackButton} /> : null
                    }
                </div>
            </header>
            <div className={styles.profileInfo} >
                <img className={styles.profileImg} src={user.avatar_url} alt="" />
                <div className={styles.userName} >
                    <h2>{user.username}</h2>
                </div>
            </div>
        </>
    )
}