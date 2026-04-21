import { useEffect, useState } from "react"
import styles from "./Sidebar.module.css"

export type SidebarItem =
    | "dashboard"
    | "my-projects"
    | "create-project"
    | "find-project"
    | "meet-teammates"
    | "notifications"
    | "profile"

interface SidebarProps {
    activeItem: SidebarItem
    onNavigate: (item: SidebarItem) => void
}

const items: { key: SidebarItem; label: string }[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "my-projects", label: "My Projects" },
    { key: "create-project", label: "Create Project" },
    { key: "find-project", label: "Find New Project" },
    { key: "meet-teammates", label: "Meet Teammates" },
    { key: "notifications", label: "Notifications" },
    { key: "profile", label: "Profile" },
]

export default function Sidebar({ activeItem, onNavigate }: SidebarProps) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!open) return
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false)
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [open])

    function handleNavigate(item: SidebarItem) {
        onNavigate(item)
        setOpen(false)
    }

    return (
        <>
            <button
                type="button"
                className={styles.hamburger}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
            >
                <span className={`${styles.bar} ${open ? styles.barTop : ""}`} />
                <span className={`${styles.bar} ${open ? styles.barMid : ""}`} />
                <span className={`${styles.bar} ${open ? styles.barBot : ""}`} />
            </button>

            {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}

            <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
                <nav className={styles.nav}>
                    <ul className={styles.list}>
                        {items.map((item) => {
                            const isActive = item.key === activeItem
                            return (
                                <li key={item.key}>
                                    <button
                                        type="button"
                                        className={`${styles.link} ${isActive ? styles.active : ""}`}
                                        onClick={() => handleNavigate(item.key)}
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    )
}
