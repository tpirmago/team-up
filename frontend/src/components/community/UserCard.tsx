import type { User } from '../../types/community'
import styles from './UserCard.module.css'
import defaultAvatar from '../../assets/avatars/defaultAvatar.png'
import SecondaryButton from '../SecondaryButton'

type UserCardProps = {
  user: User
  onViewProfile?: (userId: number) => void
}

export default function UserCard({ user, onViewProfile }: UserCardProps) {
  const openCard = () => {
    onViewProfile?.(user.user_id)
  }

  return (
    <div
      className={styles.userCard}
      role="button"
      tabIndex={0}
      onClick={openCard}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          openCard()
        }
      }}
    >
      <div className={styles.userAvatar}>
        <img 
          src={user.avatar_url || defaultAvatar}
          alt='User profile'
          onError={(e) => {
            e.currentTarget.src = defaultAvatar
          }}
        />
      </div>
      <div className={styles.userCardText}>
        <div className={styles.userInfo}>
          <h3>{user.name}</h3>
          <p>{user.study_program}</p>
        </div>

        <div className={styles.userTags}>
          <p>
          <strong>Interests:</strong>{' '}
          <br />
            {user.interests
              ?.slice(0, 2)
              .map(interest => interest.interest_name)
              .join(', ')
              || 'No interests listed'
            }
          </p>

          <p>
            <strong>Skills:</strong>{' '}
            <br />
            {user.skills
              ?.slice(0, 3)
              .map(skill => skill.skill_name)
              .join(', ')
              || 'No skills listed'
            }
          </p>
        </div>
        <SecondaryButton
          label="View profile"
          variant="view"
          onClick={() => onViewProfile?.(user.id)}
        />
      </div>
    </div>
  )
}
