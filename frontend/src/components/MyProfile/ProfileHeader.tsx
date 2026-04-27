import { GrEdit } from "react-icons/gr"
import styles from "./ProfileHeader.module.css"
import Button from "../Button"
import type { User } from "../../pages/ProfileView"
import type React from "react"
import { API_BASE } from "../../config/config"

interface ProfileHeaderProps {
    editMode: boolean
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
    cancelEdit: () => void
    saveProfile: () => void
    user: User
    setAvatar: React.Dispatch<React.SetStateAction<string>>
    avatar: string
}

export default function ProfileHeader({ editMode, setEditMode, saveProfile, cancelEdit, setAvatar, avatar, user }: ProfileHeaderProps) {

    return (
        <>
            <header className={styles.headerRow} >
                <h1 className={styles.profileTitle} >My profile</h1>
                <div className={styles.buttonBox} >
                    <button onClick={() => editMode ? cancelEdit() : setEditMode(true)} className={styles.editButton} >
                        {editMode ? "Cancel" : <> <GrEdit /> Edit</>}
                    </button>
                    {
                        editMode ? <Button label="Save" onClick={saveProfile} className={styles.blackButton} /> : null
                    }
                </div>
            </header>
            <div className={styles.profileInfo} >
                <img className={styles.profileImg} src={`${API_BASE}${avatar}`} alt="" />
                {editMode && (
                    <div className={styles.avatarOptionsBox}>
                        <div className={styles.avatarGrid}>
                            {[
                                "/avatars/avatar1.png",
                                "/avatars/avatar2.png",
                                "/avatars/avatar3.png",
                                "/avatars/avatar4.png",
                                "/avatars/avatar5.png",
                                "/avatars/avatar6.png",
                            ].map((path) => (
                                <img
                                    key={path}
                                    src={`${API_BASE}${path}`}
                                    className={styles.avatarOption}
                                    onClick={() => setAvatar(path)}
                                />
                            ))}
                        </div>
                    </div>
                )}
                <div className={styles.userName} >
                    <h2>{user.username}</h2>
                </div>
            </div>
        </>
    )
}