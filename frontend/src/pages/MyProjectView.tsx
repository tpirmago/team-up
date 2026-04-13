import { useEffect, useState } from "react"
import styles from "./MyProjectView.module.css"
import { allProjects, testSkills, testUser } from "../testing/testData"
import type { Projects, Skills, User } from "./ProfileView"

import ProjectForm from "../components/CreateProject/ProjectForm"
import Button from "../components/Button"
import ProjectCard from "../components/MyProjects/ProjectCard"
import type { Form } from "./CreateProjectView"

export default function MyProjectView() {

    const [user, setUser] = useState<User>(testUser)
    const [projectList, setProjectList] = useState<Projects[]>(allProjects)
    const [createMode, setCreateMode] = useState(false)
    const [addedSkills, setAddedSkills] = useState<Skills[]>([])
    const defaultForm: Form = {
        title: "",
        topic: "",
        description: "",
        location: "on-site",
        teamMin: 1,
        teamMax: 1,
        duration: [],
        skills: []
    }
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
        setAddedSkills(prev => prev.filter(i => i.skill_id !== id))
    }

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
            <nav className={styles.navigation} >
                <ul className={styles.navigationList} >
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
                                onSubmit={handleAddProject}
                                allSkills={allSkills}
                                addedSkills={addedSkills}
                                formInfo={formInfo}
                                setFormInfo={setFormInfo}
                                addSkill={addSkill}
                                deleteSkill={deleteSkill}
                            />
                            : <section className={styles.addButtonSection} >
                                <Button
                                    label="Create New Project"
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