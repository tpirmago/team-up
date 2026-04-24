import { renderHook, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from 'vitest'
import useUsers from "../hooks/useUsers";
import type { User } from "../types/community";
import AnnaAvatar from '../assets/avatars/AnnaAaltoAvatar.png'

describe('useUsers', () => {
  test('fetches and returns users', async () => {
    const mockUsers: User[] = [
      {
        user_id: 1,
        name: 'Minna Mansikka',
        avatar_url: AnnaAvatar,
        study_program: 'Computer Science',
        interests: [{ interest_id: 1, name: 'UX Design' }],
        skills: [{ skill_id: 2, name: 'React' }],
        email: "",
        username: "",
        firebase_id: ""
      }
    ]

    // Mock fetch
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      } as Response)
    ))

    const { result } = renderHook(() => useUsers())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Verify results
    expect(result.current.users).toEqual(mockUsers)
    expect(result.current.error).toBeNull()
  })
})
