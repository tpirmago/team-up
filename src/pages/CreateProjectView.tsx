import { useEffect, useState } from "react"
import ProjectForm from "../components/CreateProject/ProjectForm"
import styles from "./CreateProjectView.module.css"
import type { Projects, Skills, User } from "./ProfileView"
import { allProjects, testSkills, testUser } from "../testing/testData"
import { RxCross1 } from "react-icons/rx";
import Button from "../components/Button"

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

export default function CreateProjectView() {

    const [user, setUser] = useState<User>(testUser)
    const [projectList, setProjectList] = useState<Projects[]>(allProjects)
    const [projectAdded, setProjectAdded] = useState(false)

    const [addedSkills, setAddedSkills] = useState<Skills[]>([])
    const [formInfo, setFormInfo] = useState<Form>(defaultForm)

    const allSkills = testSkills

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

    function handleAddProject(form: Form) {
        const nextId = projectList.length > 0 ? projectList.at(-1)!.project_id + 1 : 1

        const newProject = {
            project_id: nextId,
            owner_user_id: user.user_id,
            title: form.title,
            topic: form.topic,
            description: form.description,
            location_mode: form.location,
            team_size_min: Number(form.teamMin),
            team_size_max: Number(form.teamMax),
            duration: form.duration,
            skills: form.skills
        }

        setUser(prev => ({
            ...prev,
            projects: [...prev.projects, newProject]
        }))

        setProjectList(prev => [...prev, newProject])
        setProjectAdded(true)

        setFormInfo(defaultForm)
        setAddedSkills([])
    }

    return (
        <main className={styles.createProjectPage} >
            <nav className={styles.navigation} >
                <ul className={styles.navigationList} >
                    <li >Dashboard</li>
                    <li>My Projects</li>
                    <li>Events</li>
                </ul>
            </nav>
            <section className={styles.formSection} >
                {
                    projectAdded
                        ? <section className={styles.messageBackground} >
                            <h3>Project created successfully!</h3>
                            <div className={styles.buttonBox} >
                                <Button
                                    label="View My Projects"
                                    className={styles.blackButton}
                                />
                                <button className={styles.closeButton} onClick={() => setProjectAdded(false)} > <RxCross1 size={25} /></button>
                            </div>
                        </section>
                        : null
                }
                <section className={styles.formBackground} >
                    <header className={styles.sectionHeader} >
                        <h1>Create New Project</h1>
                    </header>
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