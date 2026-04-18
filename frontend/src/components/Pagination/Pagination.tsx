import Button from '../Button'
import styles from './Pagination.module.css'

type PaginationProps = {
  page: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
}

export default function Pagination({ page, totalItems, pageSize, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize)

  return(
    <div className={styles.pagination}>
        <Button 
            label="Previous"
            onClick={() => {if (page > 0) onPageChange(page - 1)}}
            className={styles.paginationButton}
        />

        <span> Page {page + 1} of {totalPages} </span>

        <Button 
            label="Next"
            onClick={() => onPageChange(page + 1)} 
            className={styles.paginationButton}
        />
     </div>
  )}