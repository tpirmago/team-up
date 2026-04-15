import styles from "./ProjectCard.module.css"
//import { GoHeart } from "react-icons/go";
//import { IoIosInformationCircleOutline } from "react-icons/io";

interface ProjectCardProps {
    label: string
    description: string
    topic: string   
    location_mode: string
    team_size_min: number
    team_size_max: number
    duration: string
    id: number
}

export default function ProjectCard({ label, description, topic, location_mode, team_size_min, team_size_max, duration }: ProjectCardProps) {
    return (
        <div className={styles.projectCard} >
            <div className={styles.infoColumn} >
                <header className={styles.projectHeaderRow} >
                    <h3 className={styles.projectHeader} >{label}</h3>
                </header>

                <h4 className={styles.projectTopic} >Topic: {topic}</h4>
                <p className={styles.projectDescription} >{description}</p>
            </div>
            
            <div className={styles.projectMeta}>
                <span>{location_mode}</span>
                <span>•</span>
                <span>{team_size_min}–{team_size_max} people</span>
                <span>•</span>
                <span>{duration}</span>
            </div>
            <button className={styles.viewProjectCard}>View Project</button>
            {/* <div className={styles.buttonColumn} >
                <button className={styles.infoButton} ><IoIosInformationCircleOutline size={25} /></button>
                <button className={styles.heartButton} ><GoHeart size={25} /></button>
            </div> */}
        </div>
    )
}