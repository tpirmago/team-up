import { RxCross2 } from "react-icons/rx";
import Button from "./Button";
import styles from "./SkillsSelector.module.css"
import { useState } from "react";
import type { Skills } from "../pages/ProfileView";

interface SkillsSelectorProps {
    addedSkills: Skills[]
    allSkills: Skills[]
    addSkill: (id: number) => void
    deleteSkill: (id: number) => void
}

export default function SkillsSelector({addedSkills, allSkills, addSkill, deleteSkill}: SkillsSelectorProps) {

    const [selectedId, setSelectedId] = useState<number>(allSkills[0].skill_id)

    return (
        <div>
            <h2 className={styles.formHeader} >Required skills</h2>
            <div className={styles.selectWrapper} >
                <div className={styles.tags} >
                    {addedSkills.length === 0 && (<p className={styles.placeholderText} >Add skills that are required to join the team</p>)}
                    {addedSkills.map(i => (
                        <div key={i.skill_id}>
                            <button
                                type="button"
                                className={styles.deleteInfo}
                                onClick={() => deleteSkill(i.skill_id)}
                            >
                                <RxCross2 color="red" /> [{i.skill_name}]
                            </button>
                        </div>
                    ))}
                </div>
                <div className={styles.selectDropdown} >
                    <select className={styles.selectNew} value={selectedId} onChange={(e) => setSelectedId(Number(e.target.value))}>
                        {
                            allSkills.map(i => <option key={i.skill_id} value={i.skill_id} >{i.skill_name}</option>)
                        }
                    </select>
                    <Button
                        type="button"
                        label="+ Add"
                        className={styles.blackButton}
                        onClick={() => addSkill(selectedId)}
                    />
                </div>
            </div>
        </div>
    )
}