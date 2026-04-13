import styles from "./ProjectCard.module.css"
import { GoHeart } from "react-icons/go";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

interface ProjectCardProps {
    label: string
    description: string
    topic: string
    id: number
    onDelete: (id: number) => void
}

export default function ProjectCard({ label, description, topic, id, onDelete }: ProjectCardProps) {
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
                <button className={styles.heartButton} ><GoHeart size={25} /></button>
                <button className={styles.deleteButton} onClick={() => onDelete(id)} ><RiDeleteBin6Line size={25} /></button>
            </div>
        </div>
    )
}