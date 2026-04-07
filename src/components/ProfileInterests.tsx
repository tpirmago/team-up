import { RxCross2 } from "react-icons/rx"
import type { Interests } from "../pages/ProfileView"
import Button from "./Button"
import styles from "./ProfileInterests.module.css"
import type { User } from "../pages/ProfileView"

interface ProfileInterestProps {
    editMode: boolean
    selectedInterestId: number
    setSelectedInterestId: React.Dispatch<React.SetStateAction<number>>
    allInterests: Interests[]
    handleAddInterest: (id: number) => void
    user: User
    handleDeleteInterest: (id: number) => void
    interestError: string | null
}

export default function ProfileInterest({ editMode, selectedInterestId, user, setSelectedInterestId, allInterests, handleAddInterest, handleDeleteInterest, interestError }: ProfileInterestProps) {
    return (
        <div>
            <header className={styles.skillsHeader} >
                <h3>My interests</h3>
                {
                    editMode
                        ? <div className={styles.selectWrapper} >
                            {interestError && <p className={styles.error}>{interestError}</p>}
                        <div className={styles.selectDropdown} >
                            <select className={styles.selectNew} value={selectedInterestId} onChange={(e) => setSelectedInterestId(Number(e.target.value))}>
                                {
                                    allInterests.map(i => <option key={i.interest_id} value={i.interest_id} >{i.interest_name}</option>)
                                }
                            </select>
                            <Button
                                label="+ Add"
                                className={styles.blackButton}
                                onClick={() => handleAddInterest(selectedInterestId)}
                            />
                        </div>
                        </div>
                        : null
                }
            </header>
            <div className={styles.skillsSection} >
                {
                    user.interests.map(i =>
                        editMode
                            ? <button
                                key={i.interest_id}
                                className={styles.deleteInfo}
                                onClick={() => handleDeleteInterest(i.interest_id)}
                            > <RxCross2 color="red" />[{i.interest_name}]</button>
                            : <p key={i.interest_id} className={styles.tagName} >[{i.interest_name}]</p>
                    )
                }
            </div>
        </div>
    )
}