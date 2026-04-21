import { useState, useEffect } from 'react';
import type { Project } from '../types/projects';

const API_BASE = import.meta.env.VITE_API_URL

export default function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch(`${API_BASE}/projects`)

                if (!response.ok) {
                    throw new Error('Failed to fetch projects')
                }

                const data: Project[] = await response.json()
                setProjects(data)
            } catch (err) {
                setError('Failed to fetch projects')
            } finally {
                setLoading(false)
            }
        }

        fetchProjects()
}, [])

    return { projects, loading, error }
}