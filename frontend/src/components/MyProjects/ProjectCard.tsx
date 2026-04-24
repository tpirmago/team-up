import styles from "./ProjectCard.module.css"
import ConfirmDialog from "./ConfirmDialog";
import Button from "../Button";


interface ProjectCardProps {
    label: string
    description: string
    topic: string
    id: number
    onClick: (id: number) => void
    onOpen?: (id: number) => void
    ownerId: number
    userId: number | undefined
}

export default function ProjectCard({ label, description, topic, id, onClick, onOpen, ownerId, userId }: ProjectCardProps) {
    return (
        <div
            className={styles.projectBox}
        >
            <div className={styles.textColumn} >
                <h3 className={styles.projectHeader} >{label}</h3>
                <h4 className={styles.projectTopic} >Topic: {topic}</h4>
                <p className={styles.projectDescription} >{description}</p>
            </div>
            <div
                className={styles.buttonColumn}
                onClick={(e) => e.stopPropagation()}
            >
                <Button
                    label="View Project"
                    className={styles.secondaryButton}
                    onClick={onOpen ? () => onOpen(id) : undefined}
                />
                {
                    ownerId === userId && (
                    <ConfirmDialog onDelete={onClick} id={id} />
                )}
            </div>
        </div>
    )
}