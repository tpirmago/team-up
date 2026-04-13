import type { CommunityUser } from "../../types/community"

type UserCardProps = {
  user: CommunityUser
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.studyProgram}</p>

      <p>
        <strong>Interests:</strong>{' '}
        {user.interests
            .slice(0, 2)
            .map(interest => interest.name)
            .join(', ')}
      </p>

      <p>
        <strong>Skills:</strong>{' '}
        {user.skills
            .slice(0, 3)
            .map(skill => skill.name)
            .join(', ')}
      </p>

      <button>View profile</button>
    </div>
  )
}
