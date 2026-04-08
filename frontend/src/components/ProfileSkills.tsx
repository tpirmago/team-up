import { RxCross2 } from "react-icons/rx"
import Button from "./Button"
import styles from "./ProfileSkills.module.css"
import type { Skills, User } from "../pages/ProfileView"

interface ProfileSkillsProps {
    editMode: boolean
    selectedSkillId: number
    setSelectedSkillId: React.Dispatch<React.SetStateAction<number>>
    allSkills: Skills[]
    handleAddSkill: (id: number) => void
    user: User
    handleDeleteSkill: (id: number) => void
}

export default function ProfileSkills({ editMode, selectedSkillId, setSelectedSkillId, allSkills, handleAddSkill, user, handleDeleteSkill }: ProfileSkillsProps) {
    return (
            <div>
                <div className={styles.skillsHeader} >
                    <h3>My skills</h3>
                    {
                        editMode
                            ? <div className={styles.selectDropdown} >
                                <select className={styles.selectNew} onChange={(e) => setSelectedSkillId(Number(e.target.value))}>
                                    {
                                        allSkills.map(s => <option key={s.skill_id} value={s.skill_id} >{s.skill_name}</option>)
                                    }
                                </select>
                                <Button
                                    label="+ Add"
                                    className={styles.blackButton}
                                    onClick={() => handleAddSkill(selectedSkillId)}
                                />
                            </div>
                            : null
                    }
                </div>
                <div className={styles.skillsSection} >

                    {
                        user.skills.map(s =>
                            editMode
                                ? <button
                                    key={s.skill_id}
                                    className={styles.deleteInfo}
                                    onClick={() => handleDeleteSkill(s.skill_id)}
                                > <RxCross2 color="red" />[{s.skill_name}]</button>
                                : <p key={s.skill_id} className={styles.tagName} >[{s.skill_name}]</p>
                        )
                    }
                </div>
            </div>
    )
}