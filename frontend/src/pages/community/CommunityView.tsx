import { useState } from 'react'
import UserCard from '../../components/community/UserCard'
import SecondaryButton from '../../components/SecondaryButton'
import SearchBar from '../../components/SearchBar'
import styles from './CommunityView.module.css'
import Pagination from '../../components/Pagination/Pagination'
import { mockCommunityUsers as mockUsers } from '../../data/mockCommunityUsers'

interface CommunityViewProps {
  onOpenUser?: (id: number) => void
}

export default function CommunityView({ onOpenUser }: CommunityViewProps = {}) {
  const [page, setPage] = useState(0)
  const PAGE_SIZE = 12
  const pageUsers = mockUsers.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE
  )
  
  return (
    <section className={styles.community}>
      <header className={styles.headerRow}>
        <h1>Connect with other students</h1>

        <div className={styles.communityActions}>
          <SecondaryButton label={'Filters'} variant="filter" />
          <SearchBar className={styles.searchUsers} placeholder="Search profile" />
        </div>
      </header>

      <div className={styles.communityGrid}>
        {pageUsers.map(user => (
          <UserCard key={user.id} user={user} onViewProfile={onOpenUser} />
        ))}
      </div>
      
      <div className={styles.pagination}>
        <Pagination
          page={page}
          totalItems={mockUsers.length}
          pageSize={PAGE_SIZE}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </section>
  )
}
