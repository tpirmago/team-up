import styles from "./ProjectCard.module.css"
import { IoIosInformationCircleOutline } from "react-icons/io";
import ConfirmDialog from "./ConfirmDialog";


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
            <div className={styles.infoColumn} >
                <header className={styles.projectHeaderRow} >
                    <h3 className={styles.projectHeader} >{label}</h3>
                </header>

                <h4 className={styles.projectTopic} >Topic: {topic}</h4>
                <p className={styles.projectDescription} >{description}</p>
            </div>
            <div className={styles.buttonColumn} >
                <button className={styles.infoButton} ><IoIosInformationCircleOutline size={25} /></button>
                {
                    ownerId === userId
                        ? <ConfirmDialog onDelete={onClick} id={id} />
                        : null
                }
            </div>
        </div>
    )
}