import styles from './FindProject.module.css'
import useProjects from '../../hooks/useProjects'
import { useState } from 'react'
import Button from '../../components/Button'
import SecondaryButton from '../../components/SecondaryButton'
import SearchBar from '../../components/SearchBar'
import Pagination from '../../components/pagination/Pagination'
import ProjectCard from '../../components/findProject/ProjectCard'

interface FindProjectViewProps {
    onOpenProject?: (id: number) => void
    onBack?: () => void
    onCreateNew?: () => void
}

export default function FindProjectView({ onOpenProject, onBack, onCreateNew }: FindProjectViewProps) {
    const { projects, loading, error } = useProjects()
    const [page, setPage] = useState(0)
    const PAGE_SIZE = 9

    if (loading) return <p>Loading projects…</p>
    if (error) return <p>{error}</p>

    const pageProjects = projects.slice(
        page * PAGE_SIZE,
        (page + 1) * PAGE_SIZE
    )

    return (
        <main className={styles.findProjectPage}>
            {(onBack || onCreateNew) && (
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
                    {onCreateNew && (
                        <Button
                            label="Create New Project"
                            className={styles.createBtn}
                            onClick={onCreateNew}
                        />
                    )}
                </section>
            )}
            <section className={styles.findProjectBackground}>
                <header className={styles.headerRow}>
                    <h1 className={styles.pageTitle}>Find a new project</h1>

                    <div className={styles.projectsActions}>
                        <SecondaryButton label={'Filters'} />
                        <SearchBar placeholder="Search project" />
                    </div>
                </header>

                <div className={styles.projectsGrid}>
                    {pageProjects.map(project => (
                        <ProjectCard
                            key={project.project_id}
                            label={project.title}
                            description={project.description}
                            topic={project.topic}
                            id={project.project_id}
                            location_mode={project.location_mode}
                            team_size_min={project.team_size_min}
                            team_size_max={project.team_size_max}
                            duration={project.duration}
                            onOpen={onOpenProject}
                        />
                    ))}
                </div>

                <div className={styles.pagination}>
                    <Pagination
                        page={page}
                        totalItems={projects.length}
                        pageSize={PAGE_SIZE}
                        onPageChange={(newPage) => setPage(newPage)}
                    />
                </div>
            </section>
        </main>
    )
}