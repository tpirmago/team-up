export interface Interest {
  interest_id: number
  name: string
}

export interface Skill {
  skill_id: number
  name: string
}

export interface CommunityUser  {
  id: number
  name: string
  avatar_url: string | null
  studyProgram: string
  interests: Interest[]
  skills: Skill[]
}
