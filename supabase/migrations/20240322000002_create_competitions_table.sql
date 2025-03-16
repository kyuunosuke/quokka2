CREATE TABLE IF NOT EXISTS competitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  deadline TEXT NOT NULL,
  prize_value TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  requirements TEXT NOT NULL,
  rules TEXT NOT NULL,
  external_url TEXT,
  is_archived BOOLEAN DEFAULT FALSE,
  is_custom_game BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

alter publication supabase_realtime add table competitions;