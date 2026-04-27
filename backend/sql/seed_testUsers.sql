INSERT INTO users (
  name,
  email,
  username,
  firebase_id,
  study_program,
  avatar_url
)
SELECT
  'Test User ' || i,
  'testuser' || i || '@example.com',
  'testuser' || i,
  'firebase_test_' || i,
  CASE
    WHEN i % 3 = 0 THEN 'Computer Science'
    WHEN i % 3 = 1 THEN 'Information Systems'
    ELSE 'Data Science'
  END,
  'https://i.pravatar.cc/150?img=' || i
FROM generate_series(1, 30) AS i
ON CONFLICT (email) DO NOTHING;