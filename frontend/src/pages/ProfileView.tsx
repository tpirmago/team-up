import styles from "./ProfileView.module.css"
import { useEffect, useState } from "react";
import ProfileHeader from "../components/MyProfile/ProfileHeader";
import ProfileTags from "../components/MyProfile/ProfileTags";
import DetailsSection from "../components/MyProfile/DetailsSection";
import Button from "../components/Button";
import { authFetch } from "../utils/authFetch";
import { API_BASE } from "../config/config";

export interface User {
    user_id: number,
    name: string,
    email: string,
    username: string,
    firebase_id: string,
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

interface ProfileViewProps {
    onBack?: () => void
    onFindNew?: () => void
}

export default function ProfileView({ onBack, onFindNew }: ProfileViewProps = {}) {

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
        const userData = await authFetch(`${API_BASE}/auth/me`)
        setCurrentUser(userData)

        const skillsData = await authFetch(`${API_BASE}/users/me/skills`)
        setUserSkills(skillsData)

        const interestsData = await authFetch(`${API_BASE}/users/me/interests`)
        setUserInterests(interestsData)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        async function fetchTags() {
            const allSkillsRes = await fetch(`${API_BASE}/skills`)
            setAllSkills(await allSkillsRes.json())

            const allInterestsRes = await fetch(`${API_BASE}/interests`)
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

    await authFetch(`${API_BASE}/users/me/skills`, {
        method: "PUT",
        body: JSON.stringify({ skills: userSkills.map(s => s.skill_id) })
    })

    await authFetch(`${API_BASE}/users/me/interests`, {
        method: "PUT",
        body: JSON.stringify({ interests: userInterests.map(i => i.interest_id) })
    })

    await authFetch(`${API_BASE}/users/me`, {
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