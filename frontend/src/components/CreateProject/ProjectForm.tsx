import styles from "./ProjectForm.module.css"
import Button from "../Button"
import React from "react"
import { type Skills } from "../../pages/ProfileView"
import SkillsSelector from "./SkillsSelector"
import DurationButton from "./DurationButton"
import FormField from "./FormField"
import type { Form } from "../../pages/CreateProjectView"

interface ProjectFormProps {
    onSubmit: (data: Form) => void
    allSkills: Skills[]
    addedSkills: Skills[]
    formInfo: Form
    setFormInfo: React.Dispatch<React.SetStateAction<Form>>
    deleteSkill: (id: number) => void
    addSkill: (id: number) => void
    submitLabel?: string
    onCancel?: () => void
}

export default function ProjectForm({ onSubmit, allSkills, addedSkills, formInfo, setFormInfo, deleteSkill, addSkill, submitLabel = "Add New Project", onCancel }: ProjectFormProps) {

    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]

    function handleForm(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setFormInfo(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    function toggleMonth(month: string) {
        setFormInfo(prev => {
            const exist = prev.duration.includes(month)

            return {
                ...prev,
                duration: exist
                    ? prev.duration.filter(m => m !== month)
                    : [...prev.duration, month]
            }
        })
    }

    return (
        <>
            <header className={styles.headerRow} >
                <h1 className={styles.headerTitle} >Create New Project</h1>
                <div className={styles.buttonBox} >
                    {onCancel && (
                        <button type="button" onClick={onCancel} className={styles.cancelButton}>
                            Cancel
                        </button>
                    )}
                    <Button
                        label={submitLabel}
                        className={styles.blackButton}
                        type="submit"
                        form="project-form"
                    />
                </div>
            </header>
            <form id="project-form" onSubmit={(e) => { e.preventDefault(); onSubmit(formInfo) }} >
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
                                            key={m}
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
                <SkillsSelector
                    addSkill={addSkill}
                    allSkills={allSkills}
                    addedSkills={addedSkills}
                    deleteSkill={deleteSkill}
                />
            </form >
        </>
    )
}