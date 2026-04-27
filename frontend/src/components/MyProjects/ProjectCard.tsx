import styles from "./ProjectCard.module.css"
import Button from "../Button";


interface ProjectCardProps {
    label: string
    description: string
    topic: string
    id: number
    onOpen?: (id: number) => void
}

export default function ProjectCard({ label, description, topic, id, onOpen }: ProjectCardProps) {
    return (
        <div
            className={styles.projectBox}
            role={onOpen ? "button" : undefined}
            tabIndex={onOpen ? 0 : undefined}
            onClick={onOpen ? () => onOpen(id) : undefined}
            onKeyDown={onOpen ? (e) => {
                if (e.key === "Enter" || e.key === " ") onOpen(id)
            } : undefined}
        >
            <div className={styles.textColumn} >
                <h3 className={styles.projectHeader} >{label}</h3>
                <h4 className={styles.projectTopic} >Topic: {topic}</h4>
                <p className={styles.projectDescription} >{description}</p>
            </div>
            <div
                className={styles.buttonColumn}
            >
                <Button
                    label="View Project"
                    className={styles.secondaryButton}
                    onClick={onOpen ? () => onOpen(id) : undefined}
                />
            </div>
        </div>
    )
}