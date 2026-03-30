import styles from "./ProfileView.module.css"
import avatar from "../assets/Background.png"
import { GrEdit } from "react-icons/gr";

export default function ProfileView() {
    return (
        <main className={styles.profilePage} >
            <nav>
                <ul className={styles.navigation} >
                    <li >Dashboard</li>
                    <li>My Projects</li>
                    <li>Events</li>
                </ul>
            </nav>
            <section className={styles.profileCard} >
                <header className={styles.headerRow} >
                    <h1 className={styles.profileHeader} >My profile</h1>
                    <button className={styles.editProfile} > <GrEdit size={20} /> Edit</button>
                </header>
                <div className={styles.profileInfo} >
                    <img className={styles.profileImg} src={avatar} alt="" />
                    <div className={styles.userName} >
                        <h2>Username</h2>
                        <p>username@gmail.com</p>
                    </div>
                </div>
                <div className={styles.info} >
                    <div className={styles.personalDetails} >
                        <h3>Personal details</h3>
                        <h4>Full name</h4>
                        <div className={styles.infoBox} ></div>
                        <h4>Username</h4>
                        <div className={styles.infoBox} ></div>
                        <h4>Email</h4>
                        <div className={styles.infoBox} ></div>
                        <h4>Password</h4>
                        <div className={`${styles.infoBox} ${styles.lastInfoBox}`} ></div>
                        <div className={styles.passwordRow} >
                            <button className={styles.passwordButton} >Change password</button>
                        </div>
                    </div>
                    <div className={styles.skills} >
                        <h3>My skills</h3>
                        <div className={styles.skillsSection} >
                            <div className={styles.techSkills} >
                                <h4 className={styles.skillHeader} >Technical Skills</h4>
                                <ul className={styles.skillsList} >
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                            <div className={styles.softSkills} >
                                <h4 className={styles.skillHeader} >Soft Skills</h4>
                                <ul className={styles.skillsList} >
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}