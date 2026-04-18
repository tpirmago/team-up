import styles from "./FindProject.module.css"
import { mockProjects } from "../../data/mockProjects"
import { useState } from "react"
import Button from "../../components/Button"
import Input from "../../components/Input"
import Pagination from "../../components/Pagination/Pagination"
import ProjectCard from "../../components/findProject/ProjectCard"

export default function FindProjectView() { 
    const [page, setPage] = useState(0)
    const PAGE_SIZE = 9
    const pageProjects = mockProjects.slice(
      page * PAGE_SIZE,
      (page + 1) * PAGE_SIZE
    )
    
    return (
        <section className={styles.community}>
            <header className={styles.headerRow}>
                <h1>Find a new project</h1>

                <div className={styles.communityActions}>
                <Button className={styles.filterButton} label={'Filters'} />
                <Input placeholder="Search project" />
                </div>
            </header>

            <div className={styles.projectsGrid}>
                {pageProjects.map(project => (
                    <ProjectCard 
                        key={project.project_id}
                        label={project.title}
                        description={project.description}
                        topic={project.topic} id={0}                       
                        location_mode={project.location_mode}
                        team_size_min={project.team_size_min}
                        team_size_max={project.team_size_max}
                        duration={project.duration}
                    />
                ))}
            </div>

            <Pagination
                page={page}
                totalItems={mockProjects.length}
                pageSize={PAGE_SIZE}
                onPageChange={(newPage) => setPage(newPage)}
            />
        </section>
    )}