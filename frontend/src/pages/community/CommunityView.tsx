import { useState } from 'react'
import UserCard from '../../components/community/UserCard'
import SecondaryButton from '../../components/SecondaryButton'
import SearchBar from '../../components/SearchBar'
import styles from './CommunityView.module.css'
import Pagination from '../../components/Pagination/Pagination'
import { mockCommunityUsers as mockUsers } from '../../data/mockCommunityUsers'

export default function CommunityView() { 
  const [page, setPage] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const PAGE_SIZE = 12

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.skills.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const pageUsers = filteredUsers.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE
  )
  
  return (
    <section className={styles.community}>
      <header className={styles.headerRow}>
        <h1>Connect with other students</h1>

        <div className={styles.communityActions}>
          <SecondaryButton label={'Filters'} variant="filter" />
          <SearchBar 
            className={styles.searchUsers} 
            placeholder="Search profile or skill" 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setPage(0)
            }}
          />
        </div>
      </header>

      <div className={styles.communityGrid}>
        {pageUsers.length > 0 ? (
          pageUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          <div className={styles.noResults}>
            <p>No teammates found with "{searchQuery}"</p>
          </div>
        )}
      </div>
      
      <div className={styles.pagination}>
        <Pagination
          page={page}
          totalItems={filteredUsers.length}
          pageSize={PAGE_SIZE}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </section>
  )
}