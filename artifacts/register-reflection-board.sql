-- Insert Emotion Reflection Board levels into the games table
INSERT INTO games (name, game_slug, area, level, description, is_active)
VALUES 
  ('Emotion Reflection Board', 'emotion-reflection-board', 'self_awareness', 1, 'Explore basic feelings in a safe and supportive reflection activity.', true),
  ('Emotion Reflection Board', 'emotion-reflection-board', 'self_awareness', 2, 'Explore a wider range of emotions and how they relate to everyday situations.', true),
  ('Emotion Reflection Board', 'emotion-reflection-board', 'self_awareness', 3, 'Reflect on more complex emotional situations with gentle guidance.', true)
ON CONFLICT (game_slug, level) DO UPDATE SET 
  name = EXCLUDED.name, 
  area = EXCLUDED.area,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active;
