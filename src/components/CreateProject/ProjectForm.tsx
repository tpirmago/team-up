import styles from "./ProjectForm.module.css"
import Button from "../Button"
import React, { useEffect, useState } from "react"
import { type Skills } from "../../pages/ProfileView"
import { testSkills } from "../../testing/testData"
import SkillsSelector from "./SkillsSelector"
import DurationButton from "./DurationButton"
import FormField from "./FormField"

interface ProjectFormProps {
    createMode: boolean
    setCreateMode: React.Dispatch<React.SetStateAction<boolean>>
    onSubmit: (data: Form) => void
}

export interface Form {
    title: string
    topic: string
    description: string
    location: string
    teamMin: number
    teamMax: number
    duration: string[]
    skills: Skills[]
}

const defaultForm = {
    title: "",
    topic: "",
    description: "",
    location: "on-site",
    teamMin: 1,
    teamMax: 1,
    duration: [],
    skills: []
}

export default function ProjectForm({ createMode, setCreateMode, onSubmit }: ProjectFormProps) {

    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]
    const [formInfo, setFormInfo] = useState<Form>(defaultForm)
    const [allSkills, setAllSkills] = useState<Skills[]>(testSkills)

    const [addedSkills, setAddedSkills] = useState<Skills[]>([])

    function handleForm(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setFormInfo(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        onSubmit(formInfo)

        setFormInfo(defaultForm)
    }

    function addSkill(selectedId: number) {

        const alreadyAdded = addedSkills.some(i => i.skill_id === selectedId)

        if (alreadyAdded) return

        const skill = allSkills.find(i => i.skill_id === selectedId)

        if (skill) {
            setAddedSkills(prev => [
                ...prev,
                { skill_id: selectedId, skill_name: skill.skill_name, category: skill.category }
            ])
        }
    }

    function deleteSkill(id: number) {
        setAddedSkills(prev => prev.filter(i => i.skill_id !== id)
        )
    }

    function toggleMonth(month: string) {
        setFormInfo(prev => {
        const exist = prev.duration.includes(month)

        return {
            ...prev, 
            duration: exist
            ? prev.duration.filter(m => m !== month)
            : [...prev.duration, month]
    }})
    }

    useEffect(() => {
        setFormInfo(prev => ({
            ...prev,
            skills: addedSkills
        }))
    }, [addedSkills])

    return (
        <>
            <header className={styles.headerRow} >
                <div className={styles.buttonBox} >
                    <button onClick={() => setCreateMode(prev => !prev)} className={styles.editButton} >
                        {createMode ? "Cancel" : null}
                    </button>
                    <Button
                        label={"Add New Project"}
                        className={styles.blackButton}
                        type="submit"
                        form="project-form"
                    />
                </div>
            </header>
            <form id="project-form" onSubmit={handleSubmit} >
                <div className={styles.formGrid}>
                    <div className={styles.leftColumn} >
                        <FormField handleForm={handleForm} label="Title" name="title" type="text" value={formInfo.title} />
                        <FormField handleForm={handleForm} label="Topic" name="topic" type="text" value={formInfo.topic} />
                        <div >
                            <h2 className={styles.formHeader} >Duration</h2>
                            <div className={styles.monthSection} >
                                {
                                    months.map(m =>
                                        <DurationButton
                                            monthName={m} 
                                            checked={formInfo.duration.includes(m)}
                                            onToggle={toggleMonth}
                                            />)
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.rightColumn} >
                        <div>
                            <h2 className={styles.formHeader} >Location mode</h2>
                            <select name="location" value={formInfo.location} className={styles.selectLocation} onChange={handleForm} >
                                <option value="on-site">On site</option>
                                <option value="remote">Remote</option>
                                <option value="hyprid">Hyprid</option>
                                <option value="optional">Optional</option>
                            </select>
                        </div>
                        <FormField handleForm={handleForm} type="number" label="Team size (min)" name="teamMin" value={formInfo.teamMin} />
                        <FormField handleForm={handleForm} type="number" label="Team size (max)" name="teamMax" value={formInfo.teamMax} />
                        <div>
                            <h2 className={styles.formHeader} >Description</h2>
                            <textarea
                                name="description"
                                value={formInfo.description}
                                rows={6}
                                className={styles.description}
                                onChange={handleForm}
                                placeholder="You can write here more information about the project topic, team or schedule."
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div>
                    <SkillsSelector
                        addSkill={addSkill}
                        allSkills={allSkills}
                        addedSkills={addedSkills}
                        deleteSkill={deleteSkill}
                    />
                </div>
            </form >
        </>
    )
}