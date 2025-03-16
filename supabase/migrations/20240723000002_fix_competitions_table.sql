CREATE TABLE IF NOT EXISTS competitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  deadline TEXT NOT NULL,
  prize_value TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  requirements TEXT NOT NULL,
  rules TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS saved_competitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  competition_id UUID NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, competition_id)
);

CREATE TABLE IF NOT EXISTS competition_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  competition_id UUID NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
  submission_data JSONB,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, competition_id)
);

-- Insert sample data
INSERT INTO competitions (title, image_url, category, deadline, prize_value, difficulty, requirements, rules) VALUES
('Summer Photography Contest', 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80', 'Photography', 'Jul 15, 2024', '$2,500', 'easy', 'Submit up to 3 original summer-themed photographs taken within the last 6 months.', 'All entries must be original work. No watermarks or signatures on images.'),
('Mobile App Innovation Challenge', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80', 'Technology', 'Aug 30, 2024', '$10,000', 'hard', 'Develop a working prototype of a mobile app that addresses a social or environmental issue.', 'Apps must be original and not previously published on any app store.'),
('Sustainable Fashion Design', 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80', 'Fashion', 'Sep 10, 2024', '$5,000', 'medium', 'Create a fashion design using sustainable or recycled materials.', 'Designs must be original and include a written explanation of sustainability features.'),
('Short Story Competition', 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80', 'Writing', 'Jul 20, 2024', '$1,500', 'medium', 'Write a short story (max 3,000 words) on the theme of "New Beginnings".', 'Stories must be original and not previously published elsewhere.'),
('Culinary Innovation Award', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80', 'Food', 'Aug 5, 2024', '$3,000', 'easy', 'Create an original recipe using a specific seasonal ingredient (to be announced).', 'Recipe must be original and include high-quality photos of the finished dish.'),
('Game Development Hackathon', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80', 'Technology', 'Oct 15, 2024', '$7,500', 'hard', 'Develop a playable game prototype in 48 hours based on a provided theme.', 'All code and assets must be created during the hackathon period.'),
('Urban Mural Design Contest', 'https://images.unsplash.com/photo-1551913902-c92207136625?w=800&q=80', 'Art', 'Sep 30, 2024', '$4,000', 'medium', 'Design a mural concept for a specific urban location (details provided upon registration).', 'Design must be original and consider the cultural context of the location.'),
('Fitness Challenge', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80', 'Health', 'Ongoing', '$1,000 Monthly', 'easy', 'Complete a series of fitness challenges and document your progress.', 'Participants must submit weekly updates with photo or video evidence.');