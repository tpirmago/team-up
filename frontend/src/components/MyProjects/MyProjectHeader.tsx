import styles from "./MyProjectHeader.module.css"
import Button from "../Button"
import type { SidebarItem } from "../Sidebar"

interface MyProjectHeaderProps {
    onNavigate: (item: SidebarItem) => void
}

export default function MyProjectHeader({onNavigate}: MyProjectHeaderProps) {

    return (
        <section className={styles.headerRow} >
            <h1 className={styles.myProjectTitle} >My Projects</h1>
            <div className={styles.headerButton} >
                <Button 
                label="Create New Project" 
                className={styles.blackButton}
                onClick={() => onNavigate("create-project")} />
            </div>
        </section>
    )
}