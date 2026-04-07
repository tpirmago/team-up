import styles from "./ProfileView.module.css"
import { useRef, useState } from "react";
import { testUser, testInterests, testSkills } from "./testData";
import ProjectSection from "../components/ProjectSection";
import ProfileHeader from "../components/ProfileHeader";
import ProfileDetails from "../components/ProfileDetails";
import ProfileSkills from "../components/ProfileSkills";
import ProfileInterest from "../components/ProfileInterests";

export interface User {
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

export interface Skills {
    skill_id: number
    skill_name: string
    category: string
}

export interface Interests {
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

    const [user, setUser] = useState<User>(testUser)
    const allSkills = [...testSkills].sort((a, b) => a.skill_name.localeCompare(b.skill_name))
    const allInterests = [...testInterests].sort((a, b) => a.interest_name.localeCompare(b.interest_name))

    const [editMode, setEditMode] = useState(false)

    const [selectedSkillId, setSelectedSkillId] = useState<number>(allSkills[0].skill_id)
    const [selectedInterestId, setSelectedInterestId] = useState<number>(allInterests[0].interest_id)

    const [skillError, setSkillError] = useState<string | null>(null)
    const [interestError, setInterestError] = useState<string | null>(null)


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

    function handleDeleteSkill(id: number) {
        setUser(prev => ({
            ...prev,
            skills: prev.skills.filter(s => s.skill_id !== id)
        }))
    }

    function handleDeleteInterest(id: number) {
        setUser(prev => ({
            ...prev,
            interests: prev.interests.filter(i => i.interest_id !== id)
        }))

        setSelectedSkillId(allInterests[0].interest_id)
    }

    function handleAddSkill() {

        const alreadyAdded = user.skills.some(s => s.skill_id === selectedSkillId)

        if(alreadyAdded) {
            setSkillError("You already have this skill")    
            return
        }

        const skill = allSkills.find(s => s.skill_id === selectedSkillId)

        if (skill) {
            setUser(prev => ({
                ...prev,
                skills: [...prev.skills,
                { skill_id: skill.skill_id, skill_name: skill.skill_name, category: skill.category }]
            }))
        }

        setSelectedSkillId(allSkills[0].skill_id)
        setSkillError(null)
    }

    function handleAddInterest() {

        const alreadyAdded = user.interests.some(i => i.interest_id === selectedInterestId)

        if(alreadyAdded) {
            setInterestError("You already have this interest")    
            return
        }

        const interest = allInterests.find(i => i.interest_id === selectedInterestId)

        if (interest) {
            setUser(prev => ({
                ...prev,
                interests: [...prev.interests,
                { interest_id: interest.interest_id, interest_name: interest.interest_name, category: interest.category }]
            }))
        }

        setInterestError(null)
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
                <section className={styles.profileBackground} >
                    <ProfileHeader
                        editMode={editMode}
                        setEditMode={setEditMode}
                        saveProfile={saveProfile}
                        user={user}
                    />
                    <section className={styles.info} >
                        <section className={styles.personalDetails} >
                            <ProfileDetails
                                editMode={editMode}
                                user={user}
                                nameRef={nameRef}
                                usernameRef={usernameRef}
                                programRef={programRef}
                                emailRef={emailRef}
                            />
                        </section>
                        <section className={styles.tagSection} >
                            <ProfileSkills
                                editMode={editMode}
                                selectedSkillId={selectedSkillId}
                                setSelectedSkillId={setSelectedSkillId}
                                allSkills={allSkills}
                                handleAddSkill={handleAddSkill}
                                user={user}
                                handleDeleteSkill={handleDeleteSkill}
                                skillError={skillError}
                            />
                            <ProfileInterest
                                editMode={editMode}
                                selectedInterestId={selectedInterestId}
                                setSelectedInterestId={setSelectedInterestId}
                                user={user}
                                allInterests={allInterests}
                                handleAddInterest={handleAddInterest}
                                handleDeleteInterest={handleDeleteInterest}
                                interestError={interestError}
                            />
                        </section>
                    </section>
                </section>
            </section>
        </main>
    )
}