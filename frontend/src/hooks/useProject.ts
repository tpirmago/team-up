import { useState, useEffect } from 'react'
import type { Project } from '../types/projects'
import type { Skills } from '../pages/ProfileView'

const API_BASE = import.meta.env.VITE_API_URL

export interface ProjectDetails extends Project {
    skills: Skills[]
    owner_user_id?: number
}

export default function useProject(projectId: number | null) {
    const [project, setProject] = useState<ProjectDetails | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (projectId === null) {
            setProject(null)
            return
        }

        let cancelled = false

        async function fetchProject() {
            setLoading(true)
            setError(null)
            try {
                const [projectRes, skillsRes] = await Promise.all([
                    fetch(`${API_BASE}/projects/${projectId}`),
                    fetch(`${API_BASE}/projects/${projectId}/skills`),
                ])

                if (!projectRes.ok) throw new Error('Failed to fetch project')
                if (!skillsRes.ok) throw new Error('Failed to fetch project skills')

                const projectData: Project & { owner_user_id?: number } = await projectRes.json()
                const skillsData: Skills[] = await skillsRes.json()

                // TODO: replace with GET /projects/:id/members once backend endpoint is ready
                // const membersRes = await fetch(`${API_BASE}/projects/${projectId}/members`)
                // const membersData = await membersRes.json()

                if (!cancelled) {
                    setProject({ ...projectData, skills: skillsData })
                }
            } catch {
                if (!cancelled) setError('Failed to fetch project')
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        fetchProject()
        return () => {
            cancelled = true
        }
    }, [projectId])

    return { project, setProject, loading, error }
}
