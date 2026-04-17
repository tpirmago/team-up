import styles from './SearchBar.module.css'
interface SearchBarProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "community" | "projects";
}

export default function SearchBar({
  variant = "community",
  className,
  ...props
}: SearchBarProps) {
  return (
    <input
      type="search"
      aria-label={
        variant === "projects"
          ? "Search projects"
          : "Search community members"
      }
      className={`${styles.searchBar} ${className ?? ""}`}
      {...props}
    />
  );
}
