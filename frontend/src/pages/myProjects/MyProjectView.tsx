import { useEffect, useState } from "react"
import styles from "./MyProjectView.module.css"
import type { Projects, User } from "../ProfileView"
import Button from "../../components/Button"
import ProjectCard from "../../components/MyProjects/ProjectCard"
import { authFetch } from "../../utils/authFetch"
import { LuFolderCode } from "react-icons/lu";

export default function MyProjectView() {

    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [projectList, setProjectList] = useState<Projects[]>([])

    // Fetches projects owned by current user from the database 
    const getMyProjects = async () => {

        const meResponse = await authFetch("http://localhost:4000/auth/me")
        const me = await meResponse.json()

        setCurrentUser(me)

        const projectResponse = await fetch(`http://localhost:4000/users/${me.user_id}/projects`)
        const projectData = await projectResponse.json()

        setProjectList(projectData)
    }

    useEffect(() => {
        getMyProjects()
    }, [])


    async function handleDeleteProject(id: number) {
        await authFetch(`http://localhost:4000/projects/${id}`, { method: "DELETE" })
        getMyProjects()

        setProjectList(prev => [...prev.filter(p => p.project_id !== id)])
    }

    return (
        <main className={styles.myProjectPage} >
            <section className={styles.projectSection} >
                <section className={styles.projectBackground} >
                    <h1 className={styles.sectionHeader} >Create New Project</h1>
                    <section className={styles.addButtonSection} >
                        <Button
                            label="Create New Project"
                            className={styles.blackButton} />
                        {
                            projectList.length === 0
                                ? <p className={styles.noMessage} > <LuFolderCode size={24} /> No projects yet</p>
                                : <div className={styles.projectGrid} >
                                    {
                                        projectList.map(p =>
                                            <ProjectCard
                                                key={p.project_id}
                                                label={p.title}
                                                description={p.description}
                                                topic={p.topic}
                                                id={p.project_id}
                                                onClick={handleDeleteProject}
                                                ownerId={p.owner_user_id}
                                                userId={currentUser?.user_id}
                                            />)
                                    }
                                </div>
                        }
                    </section>
                </section>
            </section>
        </main>
    )
}