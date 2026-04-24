import { useState, useEffect } from 'react';
import type { User } from '../types/community';

const API_BASE = import.meta.env.VITE_API_URL ?? '';

if (!API_BASE) {
    throw new Error('VITE_API_URL environment variable is not defined');
}

export default function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(`${API_BASE}/users/community`)

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to fetch users: ${errorText}`)
                }
                
                const usersData = await response.json()
                setUsers(usersData);
            } catch (err: any) {   
                console.error("users/community error:", err);
                setError(err.message);
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    return { users, loading, error }
}