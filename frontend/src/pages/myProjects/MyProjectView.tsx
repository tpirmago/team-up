import { useEffect, useState } from "react"
import styles from "./MyProjectView.module.css"
import type { Projects, User } from "../ProfileView"
import ProjectCard from "../../components/MyProjects/ProjectCard"
import { authFetch } from "../../utils/authFetch"
import { LuFolderCode } from "react-icons/lu";
import MyProjectHeader from "../../components/MyProjects/MyProjectHeader"
import type { SidebarItem } from "../../components/Sidebar"
import { API_BASE } from "../../config/config"

interface MyProjectViewProps {
    onNavigate: (item: SidebarItem) => void
    onOpenProject?: (id: number) => void
}

export default function MyProjectView({ onNavigate, onOpenProject }: MyProjectViewProps) {

    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [projectList, setProjectList] = useState<Projects[]>([])

    // Fetches projects owned by current user from the database 
    const getMyProjects = async () => {

        const me = await authFetch(`${API_BASE}/auth/me`)
        setCurrentUser(me)

        const projectResponse = await fetch(`${API_BASE}/users/${me.user_id}/projects`)
        const projectData = await projectResponse.json()
        setProjectList(projectData)
    }

    useEffect(() => {
        getMyProjects()
    }, [])


    async function handleDeleteProject(id: number) {
        await authFetch(`${API_BASE}/projects/${id}`, { method: "DELETE" })
        getMyProjects()

        setProjectList(prev => [...prev.filter(p => p.project_id !== id)])
    }

    return (
        <main className={styles.myProjectPage} >
            <section className={styles.projectSection} >
                <section className={styles.projectBackground} >
                    <MyProjectHeader onNavigate={onNavigate} />
                    <section className={styles.projectGrid} >
                        {
                            projectList.length === 0
                                ? <p className={styles.noMessage} > <LuFolderCode size={24} /> No projects yet</p>
                                : projectList.map(p =>
                                    <ProjectCard
                                        key={p.project_id}
                                        label={p.title}
                                        description={p.description}
                                        topic={p.topic}
                                        id={p.project_id}
                                        onClick={handleDeleteProject}
                                        onOpen={onOpenProject}
                                        ownerId={p.owner_user_id}
                                        userId={currentUser?.user_id}
                                    />)

                        }
                    </section>
                </section>
            </section>
        </main>
    )
}