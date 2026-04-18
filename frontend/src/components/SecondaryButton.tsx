import Button from './Button'
import styles from './SecondaryButton.module.css'

interface SecundaryButtonProps {
  label: string
  variant?: "filter" | "view"
  onClick?: () => void
}

export default function SecundaryButton({ label, variant = "view", onClick }: SecundaryButtonProps) {
  return (
    <Button
      label={label}
      onClick={onClick}
      className={
        variant === "filter"
          ? `${styles.baseButton} ${styles.filterButton}`
          : `${styles.baseButton} ${styles.viewButton}`
      }
    />
  )
}
