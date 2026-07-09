-- Everglow Travel Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tours table
CREATE TABLE tours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('domestic', 'outbound')),
  country TEXT,
  province TEXT,
  title_th TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  description_th TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  price NUMERIC(10, 2),
  duration TEXT,
  duration_numeric INTEGER DEFAULT 0,
  image TEXT,
  airline TEXT,
  transport_info JSONB DEFAULT '[]',
  badge TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tour images (additional photos)
CREATE TABLE tour_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tour_id UUID REFERENCES tours(id) ON DELETE CASCADE,
  image TEXT NOT NULL,
  caption_th TEXT DEFAULT '',
  caption_en TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tour itinerary (day-by-day)
CREATE TABLE tour_itinerary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tour_id UUID REFERENCES tours(id) ON DELETE CASCADE,
  day INTEGER NOT NULL,
  title_th TEXT DEFAULT '',
  title_en TEXT DEFAULT '',
  description_th TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL DEFAULT '',
  image TEXT,
  rating INTEGER DEFAULT 5,
  tag_th TEXT DEFAULT '',
  tag_en TEXT DEFAULT '',
  text_th TEXT DEFAULT '',
  text_en TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Articles
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_th TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  content_th TEXT DEFAULT '',
  content_en TEXT DEFAULT '',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image TEXT NOT NULL,
  caption_th TEXT DEFAULT '',
  caption_en TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact messages
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_itinerary ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read tours" ON tours FOR SELECT USING (true);
CREATE POLICY "Public read tour_images" ON tour_images FOR SELECT USING (true);
CREATE POLICY "Public read tour_itinerary" ON tour_itinerary FOR SELECT USING (true);
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public read articles" ON articles FOR SELECT USING (published = true);
CREATE POLICY "Public read gallery" ON gallery FOR SELECT USING (true);

-- Authenticated write policies
CREATE POLICY "Authenticated write tours" ON tours FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write tour_images" ON tour_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write tour_itinerary" ON tour_itinerary FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write reviews" ON reviews FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write articles" ON articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated insert contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated read contact_messages" ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tours_updated_at
  BEFORE UPDATE ON tours FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
