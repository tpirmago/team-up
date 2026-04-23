import { useEffect, useState } from "react"
import ProjectForm from "../components/CreateProject/ProjectForm"
import styles from "./CreateProjectView.module.css"
import type { Skills } from "./ProfileView"
import { RxCross1 } from "react-icons/rx";
import SecundaryButton from "../components/SecondaryButton"
import { authFetch } from "../utils/authFetch";

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

const defaultForm: Form = {
    title: "",
    topic: "",
    description: "",
    location: "on-site",
    teamMin: 1,
    teamMax: 2,
    duration: [],
    skills: []
}

export default function CreateProjectView() {

    const [projectAdded, setProjectAdded] = useState(false)

    const [addedSkills, setAddedSkills] = useState<Skills[]>([])
    const [formInfo, setFormInfo] = useState<Form>(defaultForm)

    const [allSkills, setAllSkills] = useState<Skills[]>([])

    const getSkillsData = async () => {
        const skillsResponse = await fetch("http://192.168.101.105:4000/skills")
        const skillsData = await skillsResponse.json()
        setAllSkills(skillsData)
    }

    useEffect(() => {
        getSkillsData()
    }, [])

    useEffect(() => {
        setFormInfo(prev => ({
            ...prev,
            skills: addedSkills
        }))

    }, [addedSkills])

    function addSkill(selectedId: number) {

        const alreadyAdded = addedSkills.some(i => i.skill_id === selectedId)
        if (alreadyAdded) return

        const skill = allSkills.find(i => i.skill_id === selectedId)
        if (skill) {
            setAddedSkills(prev => [...prev, skill])
        }
    }

    function deleteSkill(id: number) {
        setAddedSkills(prev => prev.filter(i => i.skill_id !== id)
        )
    }

    async function handleAddProject(form: Form) {
        const newProject = {
            title: form.title,
            topic: form.topic,
            description: form.description,
            location_mode: form.location,
            team_size_min: Number(form.teamMin),
            team_size_max: Number(form.teamMax),
            duration: form.duration,
            skills: form.skills
        }

        try {
            await authFetch("http://192.168.101.105:4000/projects", {
                method: "POST",
                body: JSON.stringify(newProject)
            })

            setProjectAdded(true)
            setFormInfo(defaultForm)
            setAddedSkills([])
        } catch (err) {
            console.error("ERROR:", err)
        }

    }

    return (
        <main className={styles.createProjectPage} >
            <section className={styles.formSection} >
                {
                    projectAdded
                        ? <section className={styles.messageBackground} >
                            <h3 className={styles.messageTitle} >Project created successfully!</h3>
                            <div className={styles.buttonBox} >
                                <SecundaryButton
                                    variant="view"
                                    label="View My Projects"
                                />
                                <button className={styles.closeButton} onClick={() => setProjectAdded(false)} > <RxCross1 size={25} color="black" /></button>
                            </div>
                        </section>
                        : null
                }
                <section className={styles.formBackground} >
                    <ProjectForm
                        onSubmit={handleAddProject}
                        allSkills={allSkills}
                        addedSkills={addedSkills}
                        formInfo={formInfo}
                        setFormInfo={setFormInfo}
                        addSkill={addSkill}
                        deleteSkill={deleteSkill}
                    />
                </section>
            </section>
        </main>
    )
}