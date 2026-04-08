export const testUser = {
    user_id: 1,
    name: "Johanna Ranki",
    email: "jranki24@students.oamk.fi",
    username: "jranki24",
    firebase_id: 123456,
    study_program: "TIK24SP",
    avatar_url: "...",
    skills: [
        { skill_id: 5, skill_name: "Docker", category: "DevOps" },
        { skill_id: 7, skill_name: "Figma", category: "Design" },
        { skill_id: 9, skill_name: "HTML", category: "Frontend" },
        { skill_id: 19, skill_name: "UI Design", category: "Design" },
    ],
    interests: [
        { interest_id: 2, interest_name: "Cloud computing", category: "Infrastructure" },
        { interest_id: 9, interest_name: "Human-computer interaction", category: "Design" },
        { interest_id: 15, interest_name: "Project management", category: "Business" },
        { interest_id: 18, interest_name: "Software architecture", category: "Software" },
    ],
    projects: [
        {
            project_id: 1,
            owner_user_id: 1,
            title: "Interactive Data Dashboard",
            description: "A web-based dashboard for visualizing real-time data streams.",
            topic: "data visualization",
            team_size_min: 2,
            team_size_max: 5,
            duration: "6 weeks",
            location_mode: "hybrid",
            skills: [
                { skill_id: 1, skill_name: "React", category: "Frontend" },
                { skill_id: 3, skill_name: "UI Design", category: "Design" },
                { skill_id: 12, skill_name: "SQL", category: "Databases" }
            ]
        },
        {
            project_id: 2,
            owner_user_id: 3,
            title: "Mobile Habit Tracker",
            description: "A cross-platform mobile app for tracking daily habits.",
            topic: "mobile development",
            team_size_min: 3,
            team_size_max: 6,
            duration: "8 weeks",
            location_mode: "remote",
            skills: [
                { skill_id: 7, skill_name: "Mobile development", category: "Software" },
                { skill_id: 2, skill_name: "TypeScript", category: "Programming" }
            ]
        },
        {
            project_id: 3,
            owner_user_id: 1,
            title: "Interactive Data Dashboard",
            description: "A web-based dashboard for visualizing real-time data streams.",
            topic: "data visualization",
            team_size_min: 2,
            team_size_max: 5,
            duration: "6 weeks",
            location_mode: "hybrid",
            skills: [
                { skill_id: 1, skill_name: "React", category: "Frontend" },
                { skill_id: 3, skill_name: "UI Design", category: "Design" },
                { skill_id: 12, skill_name: "SQL", category: "Databases" }
            ]
        },
        {
            project_id: 4,
            owner_user_id: 3,
            title: "Mobile Habit Tracker",
            description: "A cross-platform mobile app for tracking daily habits.",
            topic: "mobile development",
            team_size_min: 3,
            team_size_max: 6,
            duration: "8 weeks",
            location_mode: "remote",
            skills: [
                { skill_id: 7, skill_name: "Mobile development", category: "Software" },
                { skill_id: 2, skill_name: "TypeScript", category: "Programming" }
            ]
        }
    ]
}

export const testSkills = [
    { skill_id: 1, skill_name: "AWS", category: "Cloud" },
    { skill_id: 2, skill_name: "C#", category: "Programming" },
    { skill_id: 3, skill_name: "CSS", category: "Frontend" },
    { skill_id: 4, skill_name: "Data analysis", category: "Data" },
    { skill_id: 5, skill_name: "Docker", category: "DevOps" },
    { skill_id: 6, skill_name: "Express", category: "Backend" },
    { skill_id: 7, skill_name: "Figma", category: "Design" },
    { skill_id: 8, skill_name: "Git", category: "Tools" },
    { skill_id: 9, skill_name: "HTML", category: "Frontend" },
    { skill_id: 10, skill_name: "Java", category: "Programming" },
    { skill_id: 11, skill_name: "JavaScript", category: "Programming" },
    { skill_id: 12, skill_name: "Kotlin", category: "Programming" },
    { skill_id: 13, skill_name: "Mobile development", category: "Software" },
    { skill_id: 14, skill_name: "Node.js", category: "Backend" },
    { skill_id: 15, skill_name: "Python", category: "Programming" },
    { skill_id: 16, skill_name: "React", category: "Frontend" },
    { skill_id: 17, skill_name: "SQL", category: "Databases" },
    { skill_id: 18, skill_name: "TypeScript", category: "Programming" },
    { skill_id: 19, skill_name: "UI Design", category: "Design" },
    { skill_id: 20, skill_name: "UX Research", category: "Design" },
    { skill_id: 21, skill_name: "GraphQL", category: "Backend" },
    { skill_id: 22, skill_name: "Kubernetes", category: "DevOps" },
    { skill_id: 23, skill_name: "Next.js", category: "Frontend" },
    { skill_id: 24, skill_name: "PostgreSQL", category: "Databases" }
]

export const testInterests = [
    { interest_id: 1, interest_name: "AI ethics", category: "AI" },
    { interest_id: 2, interest_name: "Cloud computing", category: "Infrastructure" },
    { interest_id: 3, interest_name: "Cybersecurity", category: "Security" },
    { interest_id: 4, interest_name: "Data engineering", category: "Data" },
    { interest_id: 5, interest_name: "Data visualization", category: "Data" },
    { interest_id: 6, interest_name: "DevOps culture", category: "DevOps" },
    { interest_id: 7, interest_name: "Digital art", category: "Design" },
    { interest_id: 8, interest_name: "Game development", category: "Software" },
    { interest_id: 9, interest_name: "Human-computer interaction", category: "Design" },
    { interest_id: 10, interest_name: "IoT devices", category: "Hardware" },
    { interest_id: 11, interest_name: "Machine learning", category: "AI" },
    { interest_id: 12, interest_name: "Mobile apps", category: "Software" },
    { interest_id: 13, interest_name: "Open source projects", category: "Community" },
    { interest_id: 14, interest_name: "Product design", category: "Design" },
    { interest_id: 15, interest_name: "Project management", category: "Business" },
    { interest_id: 16, interest_name: "Quantum computing", category: "Research" },
    { interest_id: 17, interest_name: "Robotics", category: "Hardware" },
    { interest_id: 18, interest_name: "Software architecture", category: "Software" },
    { interest_id: 19, interest_name: "Sustainability tech", category: "Environment" },
    { interest_id: 20, interest_name: "UI/UX design", category: "Design" },
    { interest_id: 21, interest_name: "Virtual reality", category: "Immersive tech" },
    { interest_id: 22, interest_name: "Web accessibility", category: "Frontend" },
    { interest_id: 23, interest_name: "Web development", category: "Software" },
    { interest_id: 24, interest_name: "Wearable technology", category: "Hardware" }
];

export const allProjects = [
    {
        project_id: 1,
        owner_user_id: 1,
        title: "Interactive Data Dashboard",
        description: "A web-based dashboard for visualizing real-time data streams.",
        topic: "data visualization",
        team_size_min: 2,
        team_size_max: 5,
        duration: "6 weeks",
        location_mode: "hybrid",
        skills: [
            { skill_id: 16, skill_name: "React", category: "Frontend" },
            { skill_id: 19, skill_name: "UI Design", category: "Design" },
            { skill_id: 17, skill_name: "SQL", category: "Databases" }
        ]
    },
    {
        project_id: 2,
        owner_user_id: 3,
        title: "Mobile Habit Tracker",
        description: "A cross-platform mobile app for tracking daily habits.",
        topic: "mobile development",
        team_size_min: 3,
        team_size_max: 6,
        duration: "8 weeks",
        location_mode: "remote",
        skills: [
            { skill_id: 13, skill_name: "Mobile development", category: "Software" },
            { skill_id: 18, skill_name: "TypeScript", category: "Programming" },
            { skill_id: 11, skill_name: "JavaScript", category: "Programming" }
        ]
    },
    {
        project_id: 3,
        owner_user_id: 2,
        title: "AI-Powered Study Assistant",
        description: "An AI-driven study assistant that generates quizzes and tracks learning progress.",
        topic: "machine learning",
        team_size_min: 2,
        team_size_max: 4,
        duration: "10 weeks",
        location_mode: "on-site",
        skills: [
            { skill_id: 15, skill_name: "Python", category: "Programming" },
            { skill_id: 4, skill_name: "Data analysis", category: "Data" },
            { skill_id: 20, skill_name: "UX Research", category: "Design" }
        ]
    },
    {
        project_id: 4,
        owner_user_id: 4,
        title: "Sustainability Impact Calculator",
        description: "A tool that helps users estimate their carbon footprint and suggests improvements.",
        topic: "environmental tech",
        team_size_min: 1,
        team_size_max: 3,
        duration: "4 weeks",
        location_mode: "remote",
        skills: [
            { skill_id: 14, skill_name: "Node.js", category: "Backend" },
            { skill_id: 5, skill_name: "Docker", category: "DevOps" },
            { skill_id: 22, skill_name: "Kubernetes", category: "DevOps" }
        ]
    },
    {
        project_id: 5,
        owner_user_id: 1,
        title: "VR Museum Experience",
        description: "A virtual reality museum that allows users to explore historical artifacts.",
        topic: "VR development",
        team_size_min: 3,
        team_size_max: 8,
        duration: "12 weeks",
        location_mode: "on-site",
        skills: [
            { skill_id: 9, skill_name: "HTML", category: "Frontend" },
            { skill_id: 3, skill_name: "CSS", category: "Frontend" },
            { skill_id: 7, skill_name: "Figma", category: "Design" }
        ]
    },
    {
        project_id: 6,
        owner_user_id: 3,
        title: "Community Event Planner",
        description: "A platform for organizing and promoting local community events.",
        topic: "web development",
        team_size_min: 2,
        team_size_max: 5,
        duration: "5 weeks",
        location_mode: "hybrid",
        skills: [
            { skill_id: 16, skill_name: "React", category: "Frontend" },
            { skill_id: 6, skill_name: "Express", category: "Backend" },
            { skill_id: 8, skill_name: "Git", category: "Tools" }
        ]
    }
]
