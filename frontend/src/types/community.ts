export type Interest = {
  interest_id: number
  name: string
}

export type Skill = {
  skill_id: number
  name: string
}

export type CommunityUser = {
  id: number
  name: string
  avatar_url: string | null
  studyProgram: string
  interests: Interest[]
  skills: Skill[]
}
