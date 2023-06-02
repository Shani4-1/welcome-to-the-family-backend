
\c memories_dev;

INSERT INTO memories (name, image, description, year, is_favorite) VALUES
('Shani', 'https://live.staticflickr.com/65535/52943856942_a4b45a1751_n.jpg', 'My son''s H.S Graduation!', 2023, true),
('Shani', 'https://live.staticflickr.com/65535/52943855932_ce85f1e173.jpg', 'Quote about stopping short of your goals', 2023, true),
('Shani', 'https://live.staticflickr.com/65535/52944920723_244fa9cf6b_n.jpg', 'Myself and all 4 of my siblings at my sister''s baby shower.', 2021, true);


INSERT INTO comments (commenter, content, is_favorite, memory_id) VALUES
('Shani', 'I love this moment!', true, 1),
('Shani', 'I love the moments when we can all get together!', true, 2);
