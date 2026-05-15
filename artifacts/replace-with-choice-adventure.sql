-- Remove the previous reflection board game
DELETE FROM games WHERE game_slug = 'emotion-reflection-board';

-- Register Personal Choice Adventure levels
INSERT INTO games (name, game_slug, area, level, description, is_active)
VALUES 
  ('Personal Choice Adventure', 'personal-choice-adventure', 'self_awareness', 1, 'Focus on basic needs and simple self-care in everyday situations.', true),
  ('Personal Choice Adventure', 'personal-choice-adventure', 'self_awareness', 2, 'Practice routine choices and behaviour at home or school.', true),
  ('Personal Choice Adventure', 'personal-choice-adventure', 'self_awareness', 3, 'Learn calm problem-solving and safe social choices.', true)
ON CONFLICT (game_slug, level) DO UPDATE SET 
  name = EXCLUDED.name, 
  area = EXCLUDED.area,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active;
