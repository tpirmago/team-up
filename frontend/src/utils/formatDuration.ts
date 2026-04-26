const MONTHS_ORDER = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

export function formatDuration(months: string[] | undefined | null): string {
    if (!months || months.length === 0) return ""

    const sorted = [...months].sort(
        (a, b) => MONTHS_ORDER.indexOf(a) - MONTHS_ORDER.indexOf(b)
    )

    if (sorted.length === 1) return sorted[0]
    return `${sorted[0]} – ${sorted[sorted.length - 1]}`
}
