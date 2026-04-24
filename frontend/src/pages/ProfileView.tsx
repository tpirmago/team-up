import styles from "./ProfileView.module.css"
import { useEffect, useState } from "react";
import ProfileHeader from "../components/MyProfile/ProfileHeader";
import ProfileTags from "../components/MyProfile/ProfileTags";
import DetailsSection from "../components/MyProfile/DetailsSection";
import { authFetch } from "../utils/authFetch";

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

export interface Projects {
    project_id: number
    owner_user_id: number
    title: string
    description: string
    topic: string
    team_size_min: number
    team_size_max: number
    duration: string[]
    location_mode: string
    skills: Skills[]
}

export default function ProfileView() {

    const [allSkills, setAllSkills] = useState<Skills[]>([])
    const [allInterests, setAllInterests] = useState<Interests[]>([])

    const [userSkills, setUserSkills] = useState<Skills[]>([])
    const [userInterests, setUserInterests] = useState<Interests[]>([])

    const [editMode, setEditMode] = useState(false)

    const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null)
    const [selectedInterestId, setSelectedInterestId] = useState<number | null>(null)

    const [skillError, setSkillError] = useState<string | null>(null)
    const [interestError, setInterestError] = useState<string | null>(null)

    const [currentUser, setCurrentUser] = useState<User | null>(null)

    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [studyProgram, setStudyProgram] = useState("")
    const [avatar, setAvatar] = useState<string>("")

    const fetchData = async () => {
        const userData = await authFetch("http://192.168.101.105:4000/auth/me")
        setCurrentUser(userData)

        const skillsData = await authFetch(`http://192.168.101.105:4000/users/me/skills`)
        setUserSkills(skillsData)

        const interestsData = await authFetch(`http://192.168.101.105:4000/users/me/interests`)
        setUserInterests(interestsData)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        async function fetchTags() {
            const allSkillsRes = await fetch(`http://192.168.101.105:4000/skills`)
            setAllSkills(await allSkillsRes.json())

            const allInterestsRes = await fetch(`http://192.168.101.105:4000/interests`)
            setAllInterests(await allInterestsRes.json())
        }

        fetchTags()
    }, [])

    useEffect(() => {
        if (!currentUser) return

        setName(currentUser.name ?? "")
        setUserName(currentUser.username ?? "")
        setStudyProgram(currentUser.study_program ?? "")
        setAvatar(currentUser.avatar_url)
    }, [currentUser])

    useEffect(() => {
        if (!editMode) return

        setSelectedSkillId(allSkills[0].skill_id)
        setSelectedInterestId(allInterests[0].interest_id)

    }, [editMode])

async function saveProfile() {
    if (!currentUser) return

    await authFetch(`http://192.168.101.105:4000/users/me/skills`, {
        method: "PUT",
        body: JSON.stringify({ skills: userSkills.map(s => s.skill_id) })
    })

    await authFetch(`http://192.168.101.105:4000/users/me/interests`, {
        method: "PUT",
        body: JSON.stringify({ interests: userInterests.map(i => i.interest_id) })
    })

    await authFetch(`http://192.168.101.105:4000/users/me`, {
        method: "PUT",
        body: JSON.stringify({ name, username: userName, study_program: studyProgram, avatar_url: avatar })
    })

    setEditMode(false)
    setSkillError(null)
    setInterestError(null)
    fetchData()
}

function handleDeleteSkill(id: number) {
    setUserSkills(prev => prev.filter(s => s.skill_id !== id))
}

function handleDeleteInterest(id: number) {
    setUserInterests(prev => prev.filter(i => i.interest_id !== id))
}

function handleAddSkill() {
    const alreadyAdded = userSkills.some(s => s.skill_id === selectedSkillId)
    if (alreadyAdded) {
        setSkillError("You already have this skill")
        return
    }

    const skill = allSkills.find(s => s.skill_id === selectedSkillId)
    if (skill) {
        setUserSkills(prev => [
            ...prev,
            { skill_id: skill.skill_id, skill_name: skill.skill_name, category: skill.category }
        ])
    }
    setSkillError(null)
}

function handleAddInterest() {
    const alreadyAdded = userInterests.some(i => i.interest_id === selectedInterestId)
    if (alreadyAdded) {
        setInterestError("You already have this interest")
        return
    }

    const interest = allInterests.find(i => i.interest_id === selectedInterestId)
    if (interest) {
        setUserInterests(prev => [
            ...prev,
            { interest_id: interest.interest_id, interest_name: interest.interest_name, category: interest.category }
        ])
    }
    setInterestError(null)
}

function cancelEdit() {
    fetchData()
    setEditMode(false)
    setSkillError(null)
    setInterestError(null)
}

return (
    <main className={styles.profilePage} >
        <section className={styles.profileSection} >
            <section className={styles.profileBackground} >
                {currentUser && (
                    <ProfileHeader
                        editMode={editMode}
                        setEditMode={setEditMode}
                        cancelEdit={cancelEdit}
                        saveProfile={saveProfile}
                        setAvatar={setAvatar}
                        user={currentUser}
                        avatar={avatar}
                    />)}
                <section className={styles.info} >
                    <section className={styles.personalDetails} >
                        {currentUser && (
                            <DetailsSection
                                editMode={editMode}
                                user={currentUser}
                                setName={setName}
                                setUserName={setUserName}
                                setProgram={setStudyProgram}
                            />
                        )}
                    </section>
                    <section className={styles.tagSection} >
                        {currentUser && (
                            <ProfileTags
                                title="My skills"
                                editMode={editMode}
                                selectedId={selectedSkillId}
                                setSelectedId={setSelectedSkillId}
                                userTags={userSkills.map(s => ({ id: s.skill_id, name: s.skill_name }))}
                                allTags={allSkills.map(s => ({ id: s.skill_id, name: s.skill_name }))}
                                handleAdd={handleAddSkill}
                                handleDelete={handleDeleteSkill}
                                error={skillError}
                            />
                        )}
                        {currentUser && (
                            <ProfileTags
                                title="My interests"
                                editMode={editMode}
                                selectedId={selectedInterestId}
                                setSelectedId={setSelectedInterestId}
                                userTags={userInterests.map(s => ({ id: s.interest_id, name: s.interest_name }))}
                                allTags={allInterests.map(s => ({ id: s.interest_id, name: s.interest_name }))}
                                handleAdd={handleAddInterest}
                                handleDelete={handleDeleteInterest}
                                error={interestError}
                            />)}
                    </section>
                </section>
            </section>
        </section>
    </main>
)
}