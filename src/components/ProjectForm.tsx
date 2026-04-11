import Input from "./Input"
import styles from "./ProjectForm.module.css"
import Button from "./Button"
import React, { useState } from "react"
import { type Skills } from "../pages/ProfileView"
import { testSkills } from "../pages/testData"
import { RxCross2 } from "react-icons/rx"
import SkillsSelector from "./SkillsSelector"

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
    skills: [
        { skill_id: 7, skill_name: "Mobile development", category: "Software" },
        { skill_id: 2, skill_name: "TypeScript", category: "Programming" }
    ]
}

export default function ProjectForm({ createMode, setCreateMode, onSubmit }: ProjectFormProps) {

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
                        <FormBox handleForm={handleForm} label="Title" name="title" type="text" value={formInfo.title} />
                        <FormBox handleForm={handleForm} label="Topic" name="topic" type="text" value={formInfo.topic} />
                        <div >
                            <h2 className={styles.formHeader} >Duration</h2>
                            <div className={styles.monthSection} >
                                <MonthBox monthName={"January"} />
                                <MonthBox monthName={"February"} />
                                <MonthBox monthName={"March"} />
                                <MonthBox monthName={"April"} />
                                <MonthBox monthName={"May"} />
                                <MonthBox monthName={"June"} />
                                <MonthBox monthName={"July"} />
                                <MonthBox monthName={"August"} />
                                <MonthBox monthName={"September"} />
                                <MonthBox monthName={"October"} />
                                <MonthBox monthName={"November"} />
                                <MonthBox monthName={"December"} />
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
                        <FormBox handleForm={handleForm} type="number" label="Team size (min)" name="teamMin" value={formInfo.teamMin} />
                        <FormBox handleForm={handleForm} type="number" label="Team size (max)" name="teamMax" value={formInfo.teamMax} />
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

interface MonthBoxProps {
    monthName: string
}

function MonthBox({ monthName }: MonthBoxProps) {
    return (
        <div >
            <label className={styles.month} >
                <input
                    type="checkbox" value={monthName} />
                {monthName}
            </label>
        </div>
    )
}

interface FormBoxProps {
    label: string
    name: string
    value: string | number
    type: string
    handleForm: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function FormBox({ label, name, value, type, handleForm }: FormBoxProps) {
    return (
        <div>
            <h2 className={styles.formHeader} >{label}</h2>
            <Input name={name} value={value} type={type} onChange={handleForm} required />
        </div>
    )
}