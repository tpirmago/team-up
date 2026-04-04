import styles from "./ProfileView.module.css"
import avatar from "../assets/Background.png"
import { GrEdit } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import { useRef, useState } from "react";
import Button from "../components/Button";
import DetailRow from "../components/DetailRow";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectForm } from "../components/ProjectForm";

interface User {
    user_id: number,
    name: string,
    email: string,
    username: string,
    firebase_id: number,
    study_program: string,
    avatar_url: string
    skills: Skills[]
    interests: Interests[]
    projects: Projects[]
}

interface Skills {
    skill_id: number
    skill_name: string
    category: string
}

interface Interests {
    interest_id: number
    interest_name: string
    category: string

}

interface Projects {
    project_id: number
    owner_user_id: number
    title: string
    description: string
    topic: string
    team_size_min: number
    team_size_max: number
    duration: string
    location_mode: string
    skills: Skills[]

}

export default function ProfileView() {

    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const programRef = useRef<HTMLInputElement>(null)

    const [user, setUser] = useState<User>({
        user_id: 1,
        name: "Johanna Ranki",
        email: "jranki24@students.oamk.fi",
        username: "jranki24",
        firebase_id: 123456,
        study_program: "TIK24SP",
        avatar_url: "...",
        skills: [
            { skill_id: 1, skill_name: "React", category: "Frontend" },
            { skill_id: 2, skill_name: "TypeScript", category: "Programming" },
            { skill_id: 3, skill_name: "UI Design", category: "Design" },
            { skill_id: 4, skill_name: "SQL", category: "Databases" }
        ],
        interests: [
            { interest_id: 1, interest_name: "Web development", category: "Software" },
            { interest_id: 2, interest_name: "UI/UX design", category: "Design" },
            { interest_id: 3, interest_name: "Data visualization", category: "Data" },
        ],
        projects: [
            {
                project_id: 1,
                owner_user_id: 1,
                title: "Interactive Data Dashboard",
                description: "A web-based dashboard for visualizing real-time data streams.",
                topic: "data visualization",
                team_size_min: 2,
                team_size_max: 5,
                duration: "6 weeks",
                location_mode: "hybrid",
                skills: [
                    { skill_id: 1, skill_name: "React", category: "Frontend" },
                    { skill_id: 3, skill_name: "UI Design", category: "Design" },
                    { skill_id: 12, skill_name: "SQL", category: "Databases" }
                ]
            },
            {
                project_id: 2,
                owner_user_id: 3,
                title: "Mobile Habit Tracker",
                description: "A cross-platform mobile app for tracking daily habits.",
                topic: "mobile development",
                team_size_min: 3,
                team_size_max: 6,
                duration: "8 weeks",
                location_mode: "remote",
                skills: [
                    { skill_id: 7, skill_name: "Mobile development", category: "Software" },
                    { skill_id: 2, skill_name: "TypeScript", category: "Programming" }
                ]
            },
            {
                project_id: 1,
                owner_user_id: 1,
                title: "Interactive Data Dashboard",
                description: "A web-based dashboard for visualizing real-time data streams.",
                topic: "data visualization",
                team_size_min: 2,
                team_size_max: 5,
                duration: "6 weeks",
                location_mode: "hybrid",
                skills: [
                    { skill_id: 1, skill_name: "React", category: "Frontend" },
                    { skill_id: 3, skill_name: "UI Design", category: "Design" },
                    { skill_id: 12, skill_name: "SQL", category: "Databases" }
                ]
            },
            {
                project_id: 2,
                owner_user_id: 3,
                title: "Mobile Habit Tracker",
                description: "A cross-platform mobile app for tracking daily habits.",
                topic: "mobile development",
                team_size_min: 3,
                team_size_max: 6,
                duration: "8 weeks",
                location_mode: "remote",
                skills: [
                    { skill_id: 7, skill_name: "Mobile development", category: "Software" },
                    { skill_id: 2, skill_name: "TypeScript", category: "Programming" }
                ]
            }
        ]
    })

    const [editMode, setEditMode] = useState(false)
    const [createMode, setCreateMode] = useState(false)

    function saveProfile() {
        setUser(prev => ({
            ...prev,
            name: nameRef.current?.value ?? prev.name,
            username: usernameRef.current?.value ?? prev.username,
            email: emailRef.current?.value ?? prev.email,
            study_program: programRef.current?.value ?? prev.study_program
        }))
        setEditMode(false)
    }

    return (
        <main className={styles.profilePage} >
            <nav>
                <ul className={styles.navigation} >
                    <li >Dashboard</li>
                    <li>My Projects</li>
                    <li>Events</li>
                </ul>
            </nav>
            <section className={styles.profileSection} >
                <section className={styles.profileCard} >
                    <header className={styles.headerRow} >
                        <h1 className={styles.profileHeader} >My profile</h1>
                        <div className={styles.buttonBox} >
                            <button onClick={() => setEditMode(prev => !prev)} className={styles.editProfile} >
                                {editMode ? "Cancel" : <> <GrEdit size={20} /> Edit</>}
                            </button>
                            {
                                editMode ? <Button label="Save" onClick={saveProfile} className={styles.blackButton} /> : null
                            }
                        </div>
                    </header>
                    <div className={styles.profileInfo} >
                        <img className={styles.profileImg} src={avatar} alt="" />
                        <div className={styles.userName} >
                            <h2>{user.username}</h2>
                        </div>
                    </div>
                    <div className={styles.info} >
                        <div className={styles.personalDetails} >
                            <h3>Personal details</h3>
                            <DetailRow
                                editMode={editMode}
                                label={"Full name"}
                                value={user.name}
                                inputRef={nameRef}
                            />
                            <DetailRow
                                editMode={editMode}
                                label={"Username"}
                                value={user.username}
                                inputRef={usernameRef}
                            />
                            <DetailRow
                                editMode={editMode}
                                label={"Study Program"}
                                value={user.study_program}
                                inputRef={programRef}
                            />
                            <DetailRow
                                editMode={editMode}
                                label={"Email"}
                                value={user.email}
                                inputRef={emailRef}
                            />
                            <div className={styles.detailBox} >
                                <h4 className={styles.detailHeader} >Password</h4>
                                {
                                    editMode
                                        ? <button className={styles.pwButton} >Change password</button>
                                        : <p className={styles.detailText} >••••••</p>
                                }
                            </div>
                        </div>
                        <div className={styles.otherInfo} >
                            <div>
                                <h3>My skills</h3>
                                <div className={styles.skillsSection} >

                                    {
                                        user.skills.map(s =>
                                            editMode
                                                ? <button className={styles.deleteInfo} > <RxCross2 color="red" />[{s.skill_name}]</button>
                                                : <p className={styles.extraInfo} >[{s.skill_name}]</p>
                                        )
                                    }
                                    {
                                        editMode
                                            ? <Button label="+ Add new" className={`${styles.blackButton} ${styles.addButton}`} />
                                            : null
                                    }
                                </div>
                            </div>
                            <div>
                                <h3>My interests</h3>
                                <div className={styles.skillsSection} >
                                    {
                                        user.interests.map(i =>
                                            editMode
                                                ? <button className={styles.deleteInfo} > <RxCross2 color="red" />[{i.interest_name}]</button>
                                                : <p className={styles.extraInfo} >[{i.interest_name}]</p>
                                        )
                                    }
                                    {
                                        editMode
                                            ? <Button label="+ Add new" className={`${styles.blackButton} ${styles.addButton}`} />
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.projectSection} >
                    <header className={styles.headerRow} >
                        <h2 className={styles.profileHeader} >
                            {
                                createMode
                                    ? "Create New Project"
                                    : "My projects"
                            }
                        </h2>
                        <div className={styles.buttonBox} >
                            <Button label={createMode ? "Add New Project" : "Create New Project"} onClick={() => setCreateMode(prev => !prev)} className={styles.blackButton} />
                        </div>
                    </header>

                    {
                        createMode
                            ? <ProjectForm />
                            : <div className={styles.projectGrid} >
                                {
                                    user.projects.map(p => <ProjectCard label={p.title} description={p.description} topic={p.topic} />)
                                }
                            </div>
                    }

                </section>
            </section>
        </main>
    )
}