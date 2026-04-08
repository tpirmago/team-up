import { useState } from "react"
import styles from "./MyProjectView.module.css"
import { allProjects, testUser } from "./testData"
import type { Projects, User } from "./ProfileView"
import ProjectCard from "../components/ProjectCard"
import ProjectForm, { type Form } from "../components/ProjectForm"
import Button from "../components/Button"

export default function MyProjectView() {

    const [user, setUser] = useState<User>(testUser)
    const [projectList, setProjectList] = useState<Projects[]>(allProjects)
    const [createMode, setCreateMode] = useState(false)

    function handleDeleteProject(id: number) {
        setUser(prev => ({
            ...prev,
            projects: prev.projects.filter(p => p.project_id !== id)
        }))

        setProjectList(prev => [...prev.filter(p => p.project_id !== id)])
    }

    function handleAddProject(form: Form) {
        const nextId = projectList.length > 0 ? projectList.at(-1)!.project_id + 1 : 1 
        
        const newProject ={
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

        setCreateMode(false)
    }

    console.log(projectList)

    return (
        <main className={styles.myProjectPage} >
            <nav>
                <ul className={styles.navigation} >
                    <li >Dashboard</li>
                    <li>My Projects</li>
                    <li>Events</li>
                </ul>
            </nav>
            <section className={styles.projectSection} >
                <section className={styles.projectBackground} >
                    <h1 className={styles.sectionHeader} >
                        {
                            createMode
                                ? "Create New Project"
                                : "My projects"
                        }
                    </h1>
                    {
                        createMode
                            ? <ProjectForm
                                createMode={createMode}
                                setCreateMode={setCreateMode}
                                onSubmit={handleAddProject}
                            />
                            : <section className={styles.addButtonSection} >
                                <Button
                                    label={createMode ? "Add New Project" : "Create New Project"}
                                    onClick={() => setCreateMode(prev => !prev)}
                                    className={styles.blackButton} />
                                <div className={styles.projectGrid} >
                                    {
                                        user.projects.map(p =>
                                            <ProjectCard
                                                key={p.project_id}
                                                label={p.title}
                                                description={p.description}
                                                topic={p.topic}
                                                id={p.project_id}
                                                onClick={handleDeleteProject}
                                                />)
                                    }
                                </div>
                            </section>
                    }
                </section>
            </section>
        </main>
    )
}