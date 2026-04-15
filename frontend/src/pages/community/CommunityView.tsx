import { useState } from 'react'
import UserCard from '../../components/community/UserCard'
import Button from '../../components/Button'
import Input from '../../components/Input'
import styles from './CommunityView.module.css'
import Pagination from '../../components/Pagination/Pagination'
import { mockCommunityUsers as mockUsers } from '../../data/mockCommunityUsers'

export default function CommunityView() { 
  const [page, setPage] = useState(0)
  const PAGE_SIZE = 9
  const pageUsers = mockUsers.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE
  )
  
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
        {pageUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <Pagination
        page={page}
        totalItems={mockUsers.length}
        pageSize={PAGE_SIZE}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </section>
  )
}
