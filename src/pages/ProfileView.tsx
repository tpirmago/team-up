import styles from "./ProfileView.module.css"
import avatar from "../assets/Background.png"

export default function ProfileView() {
    return (
        <div className={styles.profilePage} >
            <nav>
                <ul className={styles.navigation} >
                    <li >Dashboard</li>
                    <li>My Projects</li>
                    <li>Events</li>
                </ul>
            </nav>
            <div className={styles.profileCard} >
                <h1 className={styles.profileHeader} >My profile</h1>
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
                        <div className={styles.infoBox} ></div>
                        <p>Change password</p>
                    </div>
                    <div className={styles.skills} >
                        <h3>My skills</h3>
                        <div className={styles.skillsList} >
                            <div>
                                <h4>Technical Skills</h4>
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                            <div>
                                <h4>Soft Skills</h4>
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}