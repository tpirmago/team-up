import Input from "./Input"
import styles from "./ProjectForm.module.css"

export function ProjectForm() {
    return (
        <div>
            <form className={styles.formGrid} >
                <div className={styles.leftColumn} >
                    <div >
                        <h3>Title</h3>
                        <Input />
                    </div>

                    <div >
                        <h3>Topic</h3>
                        <Input />
                    </div>
                    <div>
                        <h3>Description</h3>
                        <textarea rows={7} className={styles.description} >htrh</textarea>
                    </div>
                </div>
                <div className={styles.rightColumn} >
                    <div>
                        <h3>Location mode</h3>
                        <select>
                            <option value="on-site">On site</option>
                            <option value="remote">Remote</option>
                            <option value="hyprid">Hyprid</option>
                            <option value="optional">Optional</option>
                        </select>
                    </div>
                    <div>
                        <h3>Team size (min)</h3>
                        <Input type="number" />
                    </div>
                    <div >
                        <h3>Team size (max)</h3>
                        <Input type="number" />
                    </div>
                    <div >
                        <h3>Duration</h3>
                        <Input />
                    </div>
                </div>
            </form>
        </div>
    )
}