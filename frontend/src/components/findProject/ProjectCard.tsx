import styles from "./ProjectCard.module.css"
import SecondaryButton from "../SecondaryButton"

interface ProjectCardProps {
    label: string
    description: string
    topic: string
    location_mode: string
    team_size_min: number
    team_size_max: number
    duration: string[]
    id: number
    onOpen?: (id: number) => void
}

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1)

export default function ProjectCard({ label, description, topic, location_mode, team_size_min, team_size_max, duration, id, onOpen }: ProjectCardProps) {
    const openCard = () => {
        onOpen?.(id)
    }

    return (
        <div
            className={styles.projectCard}
            role="button"
            tabIndex={0}
            onClick={() => openCard()}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    openCard()
                }
            }}>
            <div className={styles.infoColumn} >
                <header className={styles.projectHeaderRow} >
                    <h3 className={styles.projectHeader} >{label}</h3>
                </header>

                <h4 className={styles.projectTopic} >Topic: {capitalize(topic)}</h4>
                <p className={styles.projectDescription} >{description}</p>
            </div>
            
            <div className={styles.projectMeta}>
                <span>{capitalize(location_mode)}</span>
                <span>•</span>
                <span>{team_size_min}–{team_size_max} people</span>
                <span>•</span>
                <span>{duration.map(capitalize).join(', ')}</span>
            </div>
            <SecondaryButton label="View project" variant="view" />
        </div>
    )
}