-- Register Shape & Number Match levels into the games table
INSERT INTO games (name, game_slug, area, level, description, is_active)
VALUES 
  ('Shape & Number Match', 'shape-number-match', 'mathematical', 1, 'Learn to match basic quantities (1-5) with their numbers.', true),
  ('Shape & Number Match', 'shape-number-match', 'mathematical', 2, 'Practice matching quantities up to 10 with varied shape groups.', true),
  ('Shape & Number Match', 'shape-number-match', 'mathematical', 3, 'Challenge yourself with larger quantities (up to 15) and mixed layouts.', true)
ON CONFLICT (game_slug, level) DO UPDATE SET 
  name = EXCLUDED.name, 
  area = EXCLUDED.area,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active;
