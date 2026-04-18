import type { CommunityUser } from '../types/community'
import MattiAvatar from '../assets/avatars/MattiMeikalainenAvatar.png'
import AnnaAvatar from '../assets/avatars/AnnaAaltoAvatar.png'
import KalleAvatar from '../assets/avatars/KalleKoodariAvatar.png'
import LiisaAvatar from '../assets/avatars/LiisaLintunenAvatar.png'
import MaijaAvatar from '../assets/avatars/MaijaMehilainenAvatar.png'
import PekkaAvatar from '../assets/avatars/PekkaPelotonAvatar.png'


export const mockCommunityUsers: CommunityUser[] = [
    {
        id: 1,
        name: 'Anna Aalto',
        avatar_url: AnnaAvatar,
        studyProgram: 'Information Technology',
        interests: [{ interest_id: 1, name: 'UX Design' }],
        skills: [{ skill_id: 2, name: 'React' }]
    },
    {
        id: 2,
        name: 'Matti Meikäläinen',
        avatar_url: MattiAvatar,
        studyProgram: 'Business Information Technology',
        interests: [{ interest_id: 5, name: 'Entrepreneurship' }],
        skills: [{ skill_id: 1, name: 'Figma' }, { skill_id: 3, name: 'TypeScript' }]
    },
    {
        id: 3,
        name: 'Maija Mehiläinen',
        avatar_url: MaijaAvatar,
        studyProgram: 'Business Analytics',
        interests: [{ interest_id: 3, name: 'AI & Machine Learning' }],
        skills: [{ skill_id: 4, name: 'Data Analysis' }]
    },
    {
        id: 4,
        name: 'Liisa Lintunen',
        avatar_url: LiisaAvatar,
        studyProgram: 'Information Technology',
        interests: [{ interest_id: 4, name: 'Sustainability' }],
        skills: [{ skill_id: 5, name: 'UX Research' }]
    },
    {
        id: 5,
        name: 'Pekka Peloton',
        avatar_url: PekkaAvatar,
        studyProgram: 'Business Information Technology',
        interests: [{ interest_id: 2, name: 'Healthcare' }],
        skills: [{ skill_id: 2, name: 'React' }]
    },
    {
        id: 6,
        name: 'Kalle Koodari',
        avatar_url: KalleAvatar,
        studyProgram: 'Information Technology',
        interests: [{ interest_id: 1, name: 'UX Design' }],
        skills: [{ skill_id: 3, name: 'TypeScript' }]
    },
    {
        id: 7,
        name: 'Topi Topakka',
        avatar_url: null,
        studyProgram: 'Business Administration',
        interests: [{ interest_id: 1, name: 'UX Design' }],
        skills: [{ skill_id: 3, name: 'TypeScript' }]
    },  
    {
    id: 8,
    name: 'Joonas Nieminen',
    avatar_url: null,
    studyProgram: 'Software Engineering',
    interests: [
        { interest_id: 6, name: 'Open Source' },
        { interest_id: 7, name: 'Cybersecurity' },
    ],
    skills: [
        { skill_id: 6, name: 'Python' },
        { skill_id: 7, name: 'Docker' },
    ]
    },
    {
    id: 9,
    name: 'Elina Saarinen',
    avatar_url: null,
    studyProgram: 'Digital Media',
    interests: [
        { interest_id: 8, name: 'Visual Storytelling' },
        { interest_id: 1, name: 'UX Design' },
    ],
    skills: [
        { skill_id: 8, name: 'Adobe XD' },
        { skill_id: 1, name: 'Figma' },
    ]
    },
    {
    id: 10,
    name: 'Tuomas Lahti',
    avatar_url: null,
    studyProgram: 'Data Science',
    interests: [
        { interest_id: 3, name: 'AI & Machine Learning' },
        { interest_id: 9, name: 'Statistics' },
    ],
    skills: [
        { skill_id: 4, name: 'Data Analysis' },
        { skill_id: 9, name: 'SQL' },
    ]
    },
    {
    id: 11,
    name: 'Sara Jokinen',
    avatar_url: null,
    studyProgram: 'Business Administration',
    interests: [
        { interest_id: 5, name: 'Entrepreneurship' },
        { interest_id: 10, name: 'Marketing Strategy' },
    ],
    skills: [
        { skill_id: 10, name: 'Market Research' },
        { skill_id: 11, name: 'Presentation Design' },
    ]
    },
    {
    id: 12,
    name: 'Oskari Lehtonen',
    avatar_url: null,
    studyProgram: 'Game Development',
    interests: [
        { interest_id: 11, name: 'Game Design' },
        { interest_id: 12, name: 'Interactive Media' },
    ],
    skills: [
        { skill_id: 12, name: 'Unity' },
        { skill_id: 13, name: 'C#' },
    ]
    }
]
