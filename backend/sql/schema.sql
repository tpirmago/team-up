-- USERS
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    username TEXT UNIQUE,
    firebase_id TEXT UNIQUE NOT NULL,
    study_program TEXT,
    avatar_url TEXT NOT NULL DEFAULT '/avatars/avatar1.png'
);

-- SKILLS
CREATE TABLE skills (
    skill_id SERIAL PRIMARY KEY,
    skill_name TEXT NOT NULL,
    category TEXT
);

-- USER SKILLS
CREATE TABLE user_skills (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    skill_id INT REFERENCES skills(skill_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, skill_id)
);

-- INTERESTS
CREATE TABLE interests (
    interest_id SERIAL PRIMARY KEY,
    interest_name TEXT NOT NULL,
    category TEXT
);

-- USER INTERESTS 
CREATE TABLE user_interests (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    interest_id INT REFERENCES interests(interest_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, interest_id)
);

-- PROJECTS
CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    owner_user_id INT REFERENCES users(user_id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    topic TEXT,
    location_mode TEXT,
    team_size_min INT,
    team_size_max INT,
    duration TEXT[]
);

-- PROJECT MEMBERS
CREATE TABLE project_members (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    project_id INT REFERENCES projects(project_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, project_id)
);

-- PROJECT SKILLS
CREATE TABLE project_skills (
    project_id INT REFERENCES projects(project_id) ON DELETE CASCADE,
    skill_id INT REFERENCES skills(skill_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, skill_id)
);

-- NOTIFICATIONS
CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    project_id INT REFERENCES projects(project_id) ON DELETE CASCADE,
    sender_user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    receiver_user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    read BOOLEAN DEFAULT FALSE
);