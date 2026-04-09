import { useState } from "react"
import ProjectForm, { type Form } from "../components/ProjectForm"
import styles from "./CreateProjectView.module.css"
import type { Projects, User } from "./ProfileView"
import { allProjects, testUser } from "./testData"
import { RxCross1 } from "react-icons/rx";
import Button from "../components/Button"


export default function CreateProjectView() {

    const [createMode, setCreateMode] = useState(true)
    const [user, setUser] = useState<User>(testUser)
    const [projectList, setProjectList] = useState<Projects[]>(allProjects)
    const [added, setAdded] = useState(false)


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

        setAdded(prev => !prev)

        setCreateMode(false)
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
                    added
                        ? <section className={styles.messageBackground} >
                            <h3>Project created successfully!</h3>
                            <div className={styles.buttonBox} >
                                <Button
                                    label="View My Projects"
                                    className={styles.blackButton}
                                />
                                <button className={styles.closeButton} onClick={() => setAdded(false)} > <RxCross1 size={25} /></button>
                            </div>
                        </section>
                        : null
                }
                <section className={styles.formBackground} >
                    <header className={styles.sectionHeader} >
                        <h1>Create New Project</h1>
                    </header>
                    <ProjectForm
                        createMode={createMode}
                        setCreateMode={setCreateMode}
                        onSubmit={handleAddProject}
                    />
                </section>
            </section>
        </main>
    )
}