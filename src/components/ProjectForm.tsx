import Input from "./Input"
import styles from "./ProjectForm.module.css"
import Button from "./Button"
import React, { useState } from "react"
import type { Skills } from "../pages/ProfileView"

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
    duration: string
    skills: Skills[]
}

export default function ProjectForm({createMode, setCreateMode, onSubmit}: ProjectFormProps) {

    const [formInfo, setFormInfo] = useState<Form>(
        {
            title: "",
            topic: "",
            description: "",
            location: "on-site",
            teamMin: 1,
            teamMax: 1,
            duration: "",
            skills: [
                { skill_id: 7, skill_name: "Mobile development", category: "Software" },
                { skill_id: 2, skill_name: "TypeScript", category: "Programming" }
            ]
        })

        function handleForm(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
            setFormInfo(prev => ( {
                ...prev,
                [e.target.name]: e.target.value,
            }))
        }

        function handleSubmit(e: React.FormEvent) {
            e.preventDefault()
            onSubmit(formInfo)
        }

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
            <form className={styles.formGrid} id="project-form" onSubmit={handleSubmit} >
                <div className={styles.leftColumn} >
                    <div>
                        <h2 className={styles.formHeader} >Title</h2>
                        <Input name="title" value={formInfo.title} onChange={handleForm} required />
                    </div>
                    <div >
                        <h2 className={styles.formHeader} >Topic</h2>
                        <Input name="topic" value={formInfo.topic} onChange={handleForm} required />
                    </div>
                    <div>
                        <h2 className={styles.formHeader} >Description</h2>
                        <textarea name="description" value={formInfo.description} rows={7} className={styles.description} onChange={handleForm} required ></textarea>
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
                    <div>
                        <h2 className={styles.formHeader} >Team size (min)</h2>
                        <Input name="teamMin" value={formInfo.teamMin} type="number" onChange={handleForm} min={1} />
                    </div>
                    <div >
                        <h2 className={styles.formHeader} >Team size (max)</h2>
                        <Input name="teamMax" value={formInfo.teamMax} type="number" onChange={handleForm} min={1} />
                    </div>
                    <div >
                        <h2 className={styles.formHeader} >Duration</h2>
                        <Input name="duration" value={formInfo.duration} onChange={handleForm} required />
                    </div>
                </div>
            </form>
        </>
    )
}