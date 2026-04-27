import { useEffect, useState } from "react"
import ProjectForm from "../components/CreateProject/ProjectForm"
import styles from "./CreateProjectView.module.css"
import type { Skills } from "./ProfileView"
import { RxCross1 } from "react-icons/rx";
import Button from "../components/Button"
import SecundaryButton from "../components/SecondaryButton"
import { authFetch } from "../utils/authFetch";
import type { SidebarItem } from "../components/Sidebar";
import { API_BASE } from "../config/config";

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

interface CreateProjectViewProps {
    onNavigate: (item: SidebarItem) => void
    onBack?: () => void
    onFindNew?: () => void
}

export default function CreateProjectView({onNavigate, onBack, onFindNew}: CreateProjectViewProps) {

    const [projectAdded, setProjectAdded] = useState(false)

    const [addedSkills, setAddedSkills] = useState<Skills[]>([])
    const [formInfo, setFormInfo] = useState<Form>(defaultForm)

    const [allSkills, setAllSkills] = useState<Skills[]>([])

    const getSkillsData = async () => {
        const skillsResponse = await fetch(`${API_BASE}/skills`)
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
            await authFetch(`${API_BASE}/projects`, {
                method: "POST",
                body: JSON.stringify(newProject)
            })

            setProjectAdded(true)
            setFormInfo(defaultForm)
            setAddedSkills([])
        } catch (error) {
            console.error("ERROR:", error)
        }

    }

    return (
        <main className={styles.createProjectPage} >
            {(onBack || onFindNew) && (
                <section className={styles.topBar}>
                    {onBack ? (
                        <button type="button" onClick={onBack} className={styles.backBtn}>
                            <svg
                                className={styles.backArrow}
                                width="52"
                                height="12"
                                viewBox="0 0 52 12"
                                aria-hidden="true"
                            >
                                <line x1="1" y1="6" x2="52" y2="6" stroke="currentColor" strokeWidth="1.5" />
                                <polyline
                                    points="7,1 1,6 7,11"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>Back</span>
                        </button>
                    ) : <span />}
                    {onFindNew && (
                        <Button
                            label="Find New Project"
                            className={styles.findBtn}
                            onClick={onFindNew}
                        />
                    )}
                </section>
            )}
            <section className={styles.formSection} >
                {
                    projectAdded
                        ? <section className={styles.messageBackground} >
                            <h3 className={styles.messageTitle} >Project created successfully!</h3>
                            <div className={styles.buttonBox} >
                                <SecundaryButton
                                    variant="view"
                                    label="View My Projects"
                                    onClick={() => onNavigate('my-projects')}
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
                        title="Create New Project"
                    />
                </section>
            </section>
        </main>
    )
}