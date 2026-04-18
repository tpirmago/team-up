export type Project = {
  project_id: number
  title: string
  description: string
  topic: string
  location_mode: 'Remote' | 'Hybrid' | 'On-site'
  team_size_min: number
  team_size_max: number
  duration: string
}
