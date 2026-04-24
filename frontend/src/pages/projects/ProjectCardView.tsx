import { useEffect, useState } from "react"
import { GrEdit } from "react-icons/gr"
import { RiDeleteBin6Line } from "react-icons/ri"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import styles from "./ProjectCardView.module.css"
import useProject from "../../hooks/useProject"
import { formatDuration } from "../../utils/formatDuration"
import Button from "../../components/Button"
import ProjectForm from "../../components/CreateProject/ProjectForm"
import type { Form } from "../CreateProjectView"
import type { Skills } from "../ProfileView"
import { testSkills } from "../../testing/testData"

interface ProjectCardViewProps {
    projectId: number
    onBack: () => void
    onFindNew: () => void
    onDeleted?: (id: number) => void
    variant?: "owner" | "find"
}

const capitalize = (value: string | undefined | null) =>
    value ? value.charAt(0).toUpperCase() + value.slice(1) : ""

export default function ProjectCardView({ projectId, onBack, onFindNew, onDeleted, variant = "owner" }: ProjectCardViewProps) {
    const { project, setProject, loading, error } = useProject(projectId)
    const allSkills = testSkills

    const [editMode, setEditMode] = useState(false)
    const [favorited, setFavorited] = useState(false)
    const [formInfo, setFormInfo] = useState<Form>({
        title: "",
        topic: "",
        description: "",
        location: "on-site",
        teamMin: 1,
        teamMax: 1,
        duration: [],
        skills: [],
    })
    const [addedSkills, setAddedSkills] = useState<Skills[]>([])

    useEffect(() => {
        if (!project) return
        setFormInfo({
            title: project.title,
            topic: project.topic,
            description: project.description,
            location: project.location_mode,
            teamMin: project.team_size_min,
            teamMax: project.team_size_max,
            duration: project.duration,
            skills: project.skills,
        })
        setAddedSkills(project.skills)
    }, [project])

    useEffect(() => {
        setFormInfo(prev => ({ ...prev, skills: addedSkills }))
    }, [addedSkills])

    function addSkill(selectedId: number) {
        if (addedSkills.some(s => s.skill_id === selectedId)) return
        const skill = allSkills.find(s => s.skill_id === selectedId)
        if (skill) setAddedSkills(prev => [...prev, skill])
    }

    function deleteSkill(id: number) {
        setAddedSkills(prev => prev.filter(s => s.skill_id !== id))
    }

    function handleSave(form: Form) {
        if (!project) return
        // TODO: replace with PATCH /projects/:id once backend endpoint is ready
        setProject({
            ...project,
            title: form.title,
            topic: form.topic,
            description: form.description,
            location_mode: form.location as typeof project.location_mode,
            team_size_min: Number(form.teamMin),
            team_size_max: Number(form.teamMax),
            duration: form.duration,
            skills: form.skills,
        })
        setEditMode(false)
    }

    function handleDelete() {
        if (!project) return
        const confirmed = window.confirm("Are you sure you want to delete this project?")
        if (!confirmed) return
        // TODO: replace with DELETE /projects/:id once backend endpoint is ready
        onDeleted?.(project.project_id)
        onBack()
    }

    function handleRequestJoin() {
        if (!project) return
        // TODO: replace with POST /projects/:id/join-requests once backend endpoint is ready
        window.alert("Join request sent!")
    }

    if (loading) return <main className={styles.page}><p>Loading project…</p></main>
    if (error) return <main className={styles.page}><p className={styles.error}>{error}</p></main>
    if (!project) return null

    return (
        <main className={styles.page}>
            <section className={styles.topBar}>
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
                <Button
                    label="Find New Project"
                    className={styles.findBtn}
                    onClick={onFindNew}
                />
            </section>

            <section className={styles.card}>
                {editMode ? (
                    <ProjectForm
                        onSubmit={handleSave}
                        allSkills={allSkills}
                        addedSkills={addedSkills}
                        formInfo={formInfo}
                        setFormInfo={setFormInfo}
                        addSkill={addSkill}
                        deleteSkill={deleteSkill}
                        submitLabel="Save changes"
                        onCancel={() => setEditMode(false)}
                    />
                ) : (
                    <>
                        <header className={styles.cardHeader}>
                            <h1 className={styles.title}>{project.title}</h1>
                            {variant === "owner" ? (
                                <button
                                    type="button"
                                    className={styles.editBtn}
                                    onClick={() => setEditMode(true)}
                                    aria-label="Edit project"
                                >
                                    <GrEdit /> <span>Edit</span>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className={`${styles.favBtn} ${favorited ? styles.favBtnActive : ""}`}
                                    onClick={() => setFavorited(v => !v)}
                                    aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
                                    aria-pressed={favorited}
                                >
                                    {favorited ? <FaHeart /> : <FaRegHeart />}
                                </button>
                            )}
                        </header>

                        <section className={styles.detailsSection}>
                            <h2 className={styles.sectionTitle}>Project details</h2>

                            <div className={styles.detailsGrid}>
                                <span className={styles.label}>Duration</span>
                                <span className={styles.value}>
                                    {formatDuration(project.duration) || "—"}
                                </span>

                                <span className={styles.label}>Category</span>
                                <span className={styles.value}>
                                    {capitalize(project.topic) || "—"}
                                </span>

                                <span className={styles.label}>Location</span>
                                <span className={styles.value}>
                                    {capitalize(project.location_mode) || "—"}
                                </span>

                                <span className={styles.label}>Description</span>
                                <p className={styles.value}>{project.description}</p>
                            </div>
                        </section>

                        <section className={styles.detailsSection}>
                            <h3 className={styles.subSectionTitle}>Required skills</h3>
                            <div className={styles.skillsList}>
                                {project.skills.length === 0
                                    ? <p className={styles.placeholder}>No skills specified</p>
                                    : project.skills.map(s => (
                                        <span key={s.skill_id} className={styles.skillPill}>
                                            [{s.skill_name}]
                                        </span>
                                    ))}
                            </div>
                        </section>

                        <section className={styles.detailsSection}>
                            <h3 className={styles.subSectionTitle}>Participants</h3>
                            {/* TODO: replace with list from GET /projects/:id/members */}
                            <p className={styles.placeholder}>
                                Team size: {project.team_size_min}–{project.team_size_max} people
                            </p>
                        </section>

                        <div className={styles.footerActions}>
                            {variant === "owner" ? (
                                <button
                                    type="button"
                                    className={styles.deleteBtn}
                                    onClick={handleDelete}
                                >
                                    <RiDeleteBin6Line />
                                    <span>Delete project</span>
                                </button>
                            ) : (
                                <Button
                                    label="Request to join"
                                    className={styles.joinBtn}
                                    onClick={handleRequestJoin}
                                />
                            )}
                        </div>
                    </>
                )}
            </section>
        </main>
    )
}
