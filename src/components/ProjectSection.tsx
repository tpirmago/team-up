import Button from "./Button"
import ProjectCard from "./ProjectCard"
import ProjectForm from "./ProjectForm"
import styles from "./ProjectSection.module.css"
import type { User } from "../pages/ProfileView"

interface ProjectSectionProps {
    createMode: boolean
    setCreateMode: React.Dispatch<React.SetStateAction<boolean>>
    user: User
    deleteProject: (id: number) => void
}

export default function ProjectSection({ createMode, setCreateMode, user, deleteProject, addProject }: ProjectSectionProps) {
    return (
        <section>
            <header className={styles.headerRow} >
                <h2>
                    {
                        createMode
                            ? "Create New Project"
                            : "My projects"
                    }
                </h2>
                <div className={styles.buttonBox} >
                    <button onClick={() => setCreateMode(prev => !prev)} className={styles.editButton} >
                        {createMode ? "Cancel" : null}
                    </button>
                    <Button
                        label={createMode ? "Add New Project" : "Create New Project"}
                        onClick={() => setCreateMode(prev => !prev)}
                        className={styles.blackButton} />
                </div>
            </header>
            {
                createMode
                    ? <ProjectForm />
                    : <div className={styles.projectGrid} >
                        {
                            user.projects.map(p =>
                                <ProjectCard
                                    key={p.project_id}
                                    label={p.title}
                                    description={p.description}
                                    topic={p.topic}
                                    id={p.project_id}
                                    onClick={deleteProject} />)
                        }
                    </div>
            }
        </section>
    )
}