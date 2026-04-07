import { useState } from "react"
import ProjectSection from "../components/ProjectSection"
import styles from "./MyProjectView.module.css"
import { testUser } from "./testData"
import type { User } from "./ProfileView"


export default function MyProjectView() {

    const [mockUser, setMockUser] = useState<User>(testUser)
    const [createMode, setCreateMode] = useState(false)

    function handleDeleteProject(id: number) {
        setMockUser(prev => ({
            ...prev,
            projects: prev.projects.filter(p => p.project_id !== id)
        }))
    }

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
                    <ProjectSection
                        createMode={createMode}
                        deleteProject={handleDeleteProject}
                        setCreateMode={setCreateMode}
                        user={mockUser}
                    />
                </section>
            </section>
        </main>
    )
}