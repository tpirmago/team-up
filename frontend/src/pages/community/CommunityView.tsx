import { useState } from 'react'
import useUsers from '../../hooks/useUsers'
import SecondaryButton from '../../components/SecondaryButton'
import SearchBar from '../../components/SearchBar'
import styles from './CommunityView.module.css'
import Pagination from '../../components/Pagination/Pagination'
import UserCard from '../../components/community/UserCard'

export default function CommunityView() { 
  const { users, loading, error } = useUsers()
  const [page, setPage] = useState(0)
  const PAGE_SIZE = 12

  if (loading) return <p>Loading users…</p>
  if (error) return <p>{error}</p>

  const pageUsers = users.slice(
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
          <UserCard key={user.user_id} user={user} />
        ))}
      </div>
      
      <div className={styles.pagination}>
        <Pagination
          page={page}
          totalItems={users.length}
          pageSize={PAGE_SIZE}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </section>
  )
}
