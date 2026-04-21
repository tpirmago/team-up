import { renderHook, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from 'vitest'
import useProjects from "../hooks/useProjects";
import type { Project } from "../types/projects";

describe('useProjects', () => {
  test('fetches and returns projects', async () => {
    const mockProjects: Project[] = [
      {
        project_id: 1,
        title: 'Test Project',
        description: 'Test Description',
        topic: 'Web',
        location_mode: 'Remote',
        team_size_min: 2,
        team_size_max: 4,
        duration: ['June', 'July']
      }
    ]

    // Mock fetch
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProjects),
      } as Response)
    ))

    const { result } = renderHook(() => useProjects())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Verify results
    expect(result.current.projects).toEqual(mockProjects)
    expect(result.current.error).toBeNull()
  })
})
