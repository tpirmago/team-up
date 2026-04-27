import { useState } from 'react'
import useUsers from '../../hooks/useUsers'
import Button from '../../components/Button'
import SecondaryButton from '../../components/SecondaryButton'
import SearchBar from '../../components/SearchBar'
import styles from './CommunityView.module.css'
import Pagination from '../../components/pagination/Pagination'
import UserCard from '../../components/community/UserCard'

interface CommunityViewProps {
  onOpenUser?: (id: number) => void
  onBack?: () => void
  onFindNew?: () => void
}

export default function CommunityView({ onOpenUser, onBack, onFindNew }: CommunityViewProps) {
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
    <main className={styles.communityPage}>
      {(onBack || onFindNew) && (
        <section className={styles.topBar}>
          {onBack ? (
            <button type="button" onClick={onBack} className={styles.backBtn}>
              <svg
                className={styles.backArrow}
                width="52"
                height="12"
                viewBox="0 0 52 12"
                aria-hidden="true"
              >
                <line x1="1" y1="6" x2="52" y2="6" stroke="currentColor" strokeWidth="1.5" />
                <polyline
                  points="7,1 1,6 7,11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Back</span>
            </button>
          ) : <span />}
          {onFindNew && (
            <Button
              label="Find New Project"
              className={styles.findBtn}
              onClick={onFindNew}
            />
          )}
        </section>
      )}
      <section className={styles.community}>
        <header className={styles.headerRow}>
          <h1 className={styles.pageTitle}>Connect with other students</h1>

          <div className={styles.communityActions}>
            <SecondaryButton label={'Filters'} />
            <SearchBar placeholder="Search profile" />
          </div>
        </header>

        <div className={styles.communityGrid}>
          {pageUsers.map(user => (
            <UserCard key={user.user_id} user={user} onViewProfile={onOpenUser} />
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
    </main>
  )
}
