-- Sample seed data for Everglow Travel

-- Tours
INSERT INTO tours (type, country, province, title_th, title_en, description_th, description_en, price, duration, badge, sort_order, status) VALUES
('domestic', 'ไทย', 'เชียงใหม่', 'เหนือฝัน เมืองเหนือ', 'Dreaming North', 'สัมผัสบรรยากาศเมืองเหนือ เชียงใหม่ ดอยสุเทพ ปาย แม่ฮ่องสอน', 'Experience the northern charm of Chiang Mai, Pai, and Mae Hong Son', 12900, '4 วัน 3 คืน', 'hot', 1, 'active'),
('domestic', 'ไทย', 'ภูเก็ต', 'ใต้ทะเลอันดามัน', 'Andaman Sea', 'ดำน้ำดูปะการัง พักผ่อนชายหาด ภูเก็ต กระบี่', 'Snorkeling, beach relaxation in Phuket and Krabi', 15900, '5 วัน 4 คืน', 'monthly', 2, 'active'),
('outbound', 'ญี่ปุ่น', 'โตเกียว', 'ซากุระที่ญี่ปุ่น', 'Sakura Japan', 'ชมซากุระบาน เที่ยวโตเกียว เกียวโต โอซาก้า', 'Cherry blossom viewing in Tokyo, Kyoto, Osaka', 45900, '7 วัน 6 คืน', 'hot', 3, 'active'),
('outbound', 'เกาหลีใต้', 'โซล', 'เกาหลีใต้ จุดหมายปลายทาง', 'Korea Destination', 'ชิมกิมจิ เที่ยวโซล ปูซาน', 'Kimchi tasting, Seoul and Busan tour', 25900, '5 วัน 4 คืน', 'monthly', 4, 'active'),
('domestic', 'ไทย', 'กรุงเทพฯ', 'กรุงเทพฯ ไม่รู้จบ', 'Endless Bangkok', 'เที่ยวกรุงเทพฯ พระบรมมหาราชวัง ตลาดน้ำ', 'Bangkok tour, Grand Palace, floating market', 4900, '2 วัน 1 คืน', null, 5, 'active'),
('outbound', 'เวียดนาม', 'ฮานอย', 'เวียดนามเหนือ', 'North Vietnam', 'เที่ยวฮานอย อ่าวฮาลอง ซาปา', 'Hanoi, Ha Long Bay, Sapa', 19900, '6 วัน 5 คืน', null, 6, 'active');

-- Reviews
INSERT INTO reviews (name, tag_th, tag_en, text_th, text_en, sort_order) VALUES
('สมหญิง ใจดี', 'นักท่องเที่ยวตัวจริง', 'Real Traveler', 'ทัวร์สนุกมาก ไกด์น่ารัก ดูแลดีมากๆ', 'The tour was amazing! The guide was friendly and took great care of us.', 1),
('John Smith', 'Foreign Visitor', 'นักท่องเที่ยวต่างชาติ', 'Amazing experience! The cherry blossoms tour was unforgettable.', 'ประสบการณ์ที่ยอดเยี่ยม! ทัวร์ชมซากุระที่ยากจะลืมเลือน', 2),
('มานิตย์ ศรีสุข', 'ครอบครัวสุขสันต์', 'Happy Family', 'พาครอบครัวไปเที่ยวเชียงใหม่ สนุกทุกคน', 'Took the family to Chiang Mai, everyone had a blast.', 3),
('Sarah Johnson', 'Backpacker', 'แบ็คแพ็คเกอร์', 'Best travel agency in Thailand! Highly recommended.', 'เอเจนซี่ท่องเที่ยวที่ดีที่สุดในไทย! แนะนำอย่างยิ่ง', 4);

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
