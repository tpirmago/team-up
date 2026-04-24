export interface Interest {
  interest_id: number
  interest_name: string
}

export interface Skill {
  skill_id: number
  skill_name: string
}

export interface User  {
  user_id: number
  name: string
  email: string
  username: string
  firebase_id: string
  study_program: string
  avatar_url: string | null
  interests: Interest[]
  skills: Skill[]
}
