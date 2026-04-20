import styles from "./MyProjectHeader.module.css"
import Button from "../Button"

export default function MyProjectHeader() {

    return (
        <section className={styles.headerRow} >
            <h1 className={styles.myProjectTitle} >My Projects</h1>
            <div className={styles.headerButton} >
                <Button label="Create New Project" className={styles.blackButton} />
            </div>
        </section>
    )
}