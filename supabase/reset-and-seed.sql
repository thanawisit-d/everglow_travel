-- ============================================================
-- Everglow Travel — Complete Database Reset & Seed
-- รันทั้งหมดใน SQL Editor (รันทีเดียวทั้งไฟล์)
-- ============================================================

-- Drop ALL existing tables (clean slate)
drop table if exists contact_messages cascade;
drop table if exists gallery cascade;
drop table if exists articles cascade;
drop table if exists reviews cascade;
drop table if exists tour_itinerary cascade;
drop table if exists tour_images cascade;
drop table if exists tours cascade;
drop table if exists site_config cascade;

drop function if exists update_updated_at cascade;

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

-- Tour images
CREATE TABLE tour_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tour_id UUID REFERENCES tours(id) ON DELETE CASCADE,
  image TEXT NOT NULL,
  caption_th TEXT DEFAULT '',
  caption_en TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tour itinerary
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

-- ============================================================
-- Seed Data
-- ============================================================

-- Tours
INSERT INTO tours (type, country, province, title_th, title_en, description_th, description_en, price, duration, duration_numeric, badge, sort_order, status) VALUES
('domestic', 'ไทย', 'เชียงใหม่', 'เหนือฝัน เมืองเหนือ', 'Dreaming North', 'สัมผัสบรรยากาศเมืองเหนือ เชียงใหม่ ดอยสุเทพ ปาย แม่ฮ่องสอน', 'Experience the northern charm of Chiang Mai, Pai, and Mae Hong Son', 12900, '4 วัน 3 คืน', 4, 'hot', 1, 'active'),
('domestic', 'ไทย', 'ภูเก็ต', 'ใต้ทะเลอันดามัน', 'Andaman Sea', 'ดำน้ำดูปะการัง พักผ่อนชายหาด ภูเก็ต กระบี่', 'Snorkeling, beach relaxation in Phuket and Krabi', 15900, '5 วัน 4 คืน', 5, 'monthly', 2, 'active'),
('outbound', 'ญี่ปุ่น', 'โตเกียว', 'ซากุระที่ญี่ปุ่น', 'Sakura Japan', 'ชมซากุระบาน เที่ยวโตเกียว เกียวโต โอซาก้า', 'Cherry blossom viewing in Tokyo, Kyoto, Osaka', 45900, '7 วัน 6 คืน', 7, 'hot', 3, 'active'),
('outbound', 'เกาหลีใต้', 'โซล', 'เกาหลีใต้ จุดหมายปลายทาง', 'Korea Destination', 'ชิมกิมจิ เที่ยวโซล ปูซาน', 'Kimchi tasting, Seoul and Busan tour', 25900, '5 วัน 4 คืน', 5, 'monthly', 4, 'active'),
('domestic', 'ไทย', 'กรุงเทพฯ', 'กรุงเทพฯ ไม่รู้จบ', 'Endless Bangkok', 'เที่ยวกรุงเทพฯ พระบรมมหาราชวัง ตลาดน้ำ', 'Bangkok tour, Grand Palace, floating market', 4900, '2 วัน 1 คืน', 2, '', 5, 'active'),
('outbound', 'เวียดนาม', 'ฮานอย', 'เวียดนามเหนือ', 'North Vietnam', 'เที่ยวฮานอย อ่าวฮาลอง ซาปา', 'Hanoi, Ha Long Bay, Sapa', 19900, '6 วัน 5 คืน', 6, '', 6, 'active');

-- Reviews
INSERT INTO reviews (name, rating, tag_th, tag_en, text_th, text_en, sort_order) VALUES
('สมหญิง ใจดี', 5, 'นักท่องเที่ยวตัวจริง', 'Real Traveler', 'ทัวร์สนุกมาก ไกด์น่ารัก ดูแลดีมากๆ', 'The tour was amazing! The guide was friendly and took great care of us.', 1),
('John Smith', 5, 'Foreign Visitor', 'นักท่องเที่ยวต่างชาติ', 'Amazing experience! The cherry blossoms tour was unforgettable.', 'ประสบการณ์ที่ยอดเยี่ยม! ทัวร์ชมซากุระที่ยากจะลืมเลือน', 2),
('มานิตย์ ศรีสุข', 4, 'ครอบครัวสุขสันต์', 'Happy Family', 'พาครอบครัวไปเที่ยวเชียงใหม่ สนุกทุกคน', 'Took the family to Chiang Mai, everyone had a blast.', 3),
('Sarah Johnson', 5, 'Backpacker', 'แบ็คแพ็คเกอร์', 'Best travel agency in Thailand! Highly recommended.', 'เอเจนซี่ท่องเที่ยวที่ดีที่สุดในไทย! แนะนำอย่างยิ่ง', 4);

-- Articles
INSERT INTO articles (title_th, title_en, content_th, content_en, published) VALUES
('10 ที่เที่ยวเชียงใหม่ห้ามพลาด', '10 Chiang Mai Must-Visits', 'เชียงใหม่มีที่เที่ยวมากมาย ทั้งดอยสุเทพ พระตำหนักภูพิงค์ฯ', 'Chiang Mai has many attractions including Doi Suthep, Phu Phing Palace', true),
('เที่ยวญี่ปุ่นช่วงซากุระบาน', 'Japan Cherry Blossom Season', 'ช่วงซากุระบานคือเดือนมีนาคม-เมษายน เหมาะกับการเที่ยวญี่ปุ่น', 'Cherry blossom season is March-April, perfect for visiting Japan', true);

-- Gallery
INSERT INTO gallery (image, caption_th, caption_en, sort_order) VALUES
('sample/temple', 'วัดไทย', 'Thai Temple', 1),
('sample/beach', 'ชายหาด', 'Beach', 2),
('sample/mountain', 'ภูเขา', 'Mountain', 3),
('sample/city', 'เมือง', 'City', 4),
('sample/food', 'อาหาร', 'Food', 5);
