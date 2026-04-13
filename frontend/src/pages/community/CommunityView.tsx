import UserCard from '../../components/community/UserCard'
import type { CommunityUser, Interest, Skill } from '../../types/community'
import Button from '../../components/Button'
import Input from '../../components/Input'
import PickRandom from '../../components/PickRandom'
import styles from './CommunityView.module.css'

const mockInterests: Interest[] = [
  { interest_id: 1, name: 'UX Design' },
  { interest_id: 2, name: 'Healthcare' },
  { interest_id: 3, name: 'AI & Machine Learning' },
  { interest_id: 4, name: 'Sustainability' },
  { interest_id: 5, name: 'Entrepreneurship' },
]
const mockSkills: Skill[] = [
      { skill_id: 1, name: 'Figma' },
      { skill_id: 2, name: 'React' },
      { skill_id: 3, name: 'TypeScript' },
      { skill_id: 4, name: 'Data Analysis' },
      { skill_id: 5, name: 'UX Research' },
    ]
const mockUsers: CommunityUser[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    studyProgram: 'Information Technology',
    interests: PickRandom(mockInterests, 2),
    skills: PickRandom(mockSkills, 3),
  },
  {
    id: 2,
    name: 'Matti Virtanen',
    studyProgram: 'Bussiness Information Technology',
    interests: PickRandom(mockInterests, 2),
    skills: PickRandom(mockSkills, 3),
  },
  {
    id: 3,
    name: 'Maija Korhonen',
    studyProgram: 'Business Analytics',
    interests: PickRandom(mockInterests, 2),
    skills: PickRandom(mockSkills, 3),
  },]

export default function CommunityView() { 
  return (
    <section className={styles.community}>
      <header className={styles.headerRow}>
        <h1>Connect with other students</h1>

        <div className={styles.communityActions}>
          <Button className={styles.filterButton} label={'Filters'} />
          <Input placeholder="Search profile" />
        </div>
      </header>

      <div className={styles.communityGrid}>
        {mockUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </section>
  )
}
