import { auth } from "../firebase"

export async function authFetch(url: string, options: RequestInit = {}) {
    const token = await auth.currentUser?.getIdToken()

    try {
        const res = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })

        if(!res.ok) {
            throw new Error("Failed to fetch data")
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.log("There was an error:", error)
    }
}