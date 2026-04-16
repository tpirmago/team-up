import styles from "./Sidebar.module.css"

export type SidebarItem =
    | "dashboard"
    | "my-projects"
    | "create-project"
    | "find-project"
    | "meet-teammates"
    | "notifications"

interface SidebarProps {
    activeItem: SidebarItem
    onNavigate: (item: SidebarItem) => void
}

const items: { key: SidebarItem; label: string }[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "my-projects", label: "My Projects" },
    { key: "create-project", label: "Create Project" },
    { key: "find-project", label: "Find New Project" },
    { key: "meet-teammates", label: "Meet teammates" },
    { key: "notifications", label: "Notifications" },
]

export default function Sidebar({ activeItem, onNavigate }: SidebarProps) {
    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    {items.map((item) => {
                        const isActive = item.key === activeItem
                        return (
                            <li key={item.key}>
                                <button
                                    type="button"
                                    className={`${styles.link} ${isActive ? styles.active : ""}`}
                                    onClick={() => onNavigate(item.key)}
                                >
                                    {item.label}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
    )
}
