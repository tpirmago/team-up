import styles from "./ProjectCard.module.css"
import { IoIosInformationCircleOutline } from "react-icons/io";
import ConfirmDialog from "./ConfirmDialog";
import Button from "../Button";


interface ProjectCardProps {
    label: string
    description: string
    topic: string
    id: number
    onClick: (id: number) => void
    ownerId: number
    userId: number | undefined
}

export default function ProjectCard({ label, description, topic, id, onClick, ownerId, userId }: ProjectCardProps) {
    return (
        <div className={styles.projectBox} >
            <div className={styles.textColumn} >
                <h3 className={styles.projectHeader} >{label}</h3>
                <h4 className={styles.projectTopic} >Topic: {topic}</h4>
                <p className={styles.projectDescription} >{description}</p>
            </div>
            <div className={styles.buttonColumn} >
                <Button label="View Project" className={styles.secondaryButton} />
                {
                    ownerId === userId
                        ? <ConfirmDialog onDelete={onClick} id={id} />
                        : null
                }
            </div>
        </div>
    )
}