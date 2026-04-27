import { useEffect, useState } from "react"
import styles from "./MyProjectView.module.css"
import type { Projects } from "../ProfileView"
import ProjectCard from "../../components/MyProjects/ProjectCard"
import Button from "../../components/Button"
import { authFetch } from "../../utils/authFetch"
import { LuFolderCode } from "react-icons/lu";
import MyProjectHeader from "../../components/MyProjects/MyProjectHeader"
import type { SidebarItem } from "../../components/Sidebar"
import { API_BASE } from "../../config/config"

interface MyProjectViewProps {
    onNavigate: (item: SidebarItem) => void
    onOpenProject?: (id: number) => void
    onBack?: () => void
    onFindNew?: () => void
}

export default function MyProjectView({ onNavigate, onOpenProject, onBack, onFindNew }: MyProjectViewProps) {

    const [projectList, setProjectList] = useState<Projects[]>([])

    // Fetches projects owned by current user from the database
    const getMyProjects = async () => {

        const me = await authFetch(`${API_BASE}/auth/me`)

        const projectResponse = await fetch(`${API_BASE}/users/${me.user_id}/projects`)
        const projectData = await projectResponse.json()
        setProjectList(projectData)
    }

    useEffect(() => {
        getMyProjects()
    }, [])

    return (
        <main className={styles.myProjectPage} >
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
            <section className={styles.projectSection} >
                <section className={styles.projectBackground} >
                    <MyProjectHeader onNavigate={onNavigate} />
                    <section className={styles.projectGrid} >
                        {
                            projectList.length === 0
                                ? <p className={styles.noMessage} > <LuFolderCode /> No projects yet</p>
                                : projectList.map(p =>
                                    <ProjectCard
                                        key={p.project_id}
                                        label={p.title}
                                        description={p.description}
                                        topic={p.topic}
                                        id={p.project_id}
                                        onOpen={onOpenProject}
                                    />)

                        }
                    </section>
                </section>
            </section>
        </main>
    )
}