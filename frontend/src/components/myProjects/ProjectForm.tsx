import Input from "../Input"
import styles from "./ProjectForm.module.css"

export default function ProjectForm() {
    return (
        <div>
            <form className={styles.formGrid} >
                <div className={styles.leftColumn} >
                    <div>
                        <h3 className={styles.formHeader} >Title</h3>
                        <Input required />
                    </div>

                    <div >
                        <h3 className={styles.formHeader} >Topic</h3>
                        <Input required />
                    </div>
                    <div>
                        <h3 className={styles.formHeader} >Description</h3>
                        <textarea rows={7} className={styles.description} required ></textarea>
                    </div>
                </div>
                <div className={styles.rightColumn} >
                    <div>
                        <h3 className={styles.formHeader} >Location mode</h3>
                        <select className={styles.selectLocation} required >
                            <option value="on-site">On site</option>
                            <option value="remote">Remote</option>
                            <option value="hyprid">Hyprid</option>
                            <option value="optional">Optional</option>
                        </select>
                    </div>
                    <div>
                        <h3 className={styles.formHeader} >Team size (min)</h3>
                        <Input type="number" required min={1} />
                    </div>
                    <div >
                        <h3 className={styles.formHeader} >Team size (max)</h3>
                        <Input type="number" required min={1} />
                    </div>
                    <div >
                        <h3 className={styles.formHeader} >Duration</h3>
                        <Input />
                    </div>
                </div>
            </form>
        </div>
    )
}