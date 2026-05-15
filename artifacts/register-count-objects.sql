-- Register Count the Objects levels into the games table
INSERT INTO games (name, game_slug, area, level, description, is_active)
VALUES 
  ('Count the Objects', 'count-the-objects', 'mathematical', 1, 'Learn to count 1 to 5 objects with large, clear visuals.', true),
  ('Count the Objects', 'count-the-objects', 'mathematical', 2, 'Practice counting up to 10 objects with different layouts.', true),
  ('Count the Objects', 'count-the-objects', 'mathematical', 3, 'Challenge yourself with grouped objects and quantities up to 15.', true)
ON CONFLICT (game_slug, level) DO UPDATE SET 
  name = EXCLUDED.name, 
  area = EXCLUDED.area,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active;
