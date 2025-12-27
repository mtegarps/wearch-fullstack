-- Wearch Database Seed Data
-- PostgreSQL

-- ==================== USER ====================
-- Password: admin123 (bcrypt hashed)
INSERT INTO "User" ("email", "password", "name", "role") VALUES
('admin@wearch.id', '$2a$10$rQnM1.C5Z5eL5H5zL5cQ5eQn5H5zL5cQ5eQn5H5zL5cQ5eQn5H5zL', 'Admin', 'admin');

-- ==================== PROJECTS ====================
INSERT INTO "Project" ("title", "location", "year", "image", "category", "area", "duration", "client", "description", "status") VALUES
('Modern Villa', 'Dago', '2024', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', 'Residence', '450 m²', '8 Months', 'Private Client', 'A contemporary residential masterpiece that harmoniously blends indoor and outdoor living spaces.', 'Published'),
('Creative Hub', 'Bandung', '2023', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', 'Commercial', '1200 m²', '14 Months', 'Tech Startup Inc', 'A dynamic workspace designed to inspire innovation and foster creative collaboration.', 'Published'),
('Eco House', 'Lembang', '2024', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'Residence', '320 m²', '10 Months', 'Green Living Co', 'A sustainable home that demonstrates how eco-friendly design can enhance quality of life.', 'Published'),
('Office Tower', 'Bandung', '2023', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Commercial', '3500 m²', '18 Months', 'Corporate Group Ltd', 'A landmark commercial tower that redefines premium office space in the city center.', 'Draft');

-- Project 1 Gallery (Modern Villa)
INSERT INTO "ProjectGallery" ("projectId", "url", "title", "description", "order") VALUES
(1, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', 'Exterior View', 'The facade combines clean geometric lines with natural stone elements.', 1),
(1, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80', 'Living Space', 'Double-height ceilings and floor-to-ceiling windows flood the interior with natural light.', 2),
(1, 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80', 'Kitchen Design', 'The gourmet kitchen features custom Italian cabinetry and integrated appliances.', 3),
(1, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', 'Garden Integration', 'Landscape architecture blurs the boundaries between indoor and outdoor living.', 4);

-- Project 2 Gallery (Creative Hub)
INSERT INTO "ProjectGallery" ("projectId", "url", "title", "description", "order") VALUES
(2, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80', 'Tower Facade', 'The crystalline glass facade responds dynamically to sunlight.', 1),
(2, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80', 'Collaborative Spaces', 'Flexible work environments designed to foster creativity.', 2),
(2, 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80', 'Innovation Lab', 'Dedicated spaces for experimentation and prototyping.', 3),
(2, 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1200&q=80', 'Rooftop Terrace', 'A green rooftop retreat offering panoramic city views.', 4);

-- Project 3 Gallery (Eco House)
INSERT INTO "ProjectGallery" ("projectId", "url", "title", "description", "order") VALUES
(3, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', 'Sustainable Design', 'Passive solar design and natural ventilation reduce energy consumption.', 1),
(3, 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80', 'Natural Materials', 'Locally-sourced bamboo and reclaimed wood create warm interiors.', 2),
(3, 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80', 'Indoor Garden', 'A central atrium brings nature inside, improving air quality.', 3),
(3, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80', 'Energy Systems', 'Integrated solar panels and rainwater harvesting systems.', 4);

-- Project 4 Gallery (Office Tower)
INSERT INTO "ProjectGallery" ("projectId", "url", "title", "description", "order") VALUES
(4, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80', 'Urban Presence', 'Rising 25 stories, the tower establishes a new benchmark.', 1),
(4, 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&q=80', 'Grand Lobby', 'The dramatic entrance features a triple-height lobby.', 2),
(4, 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80', 'Executive Suite', 'Premium office floors offer unobstructed views.', 3),
(4, 'https://images.unsplash.com/photo-1577412647305-991150c7d163?w=1200&q=80', 'Sky Garden', 'Sky gardens provide communal retreats every five floors.', 4);

-- ==================== TEAM ====================
INSERT INTO "TeamMember" ("name", "role", "specialty", "image", "email", "phone", "order") VALUES
('Taufiq Ibrahim', 'Lead Architect', 'Conceptual Design', 'https://i.ibb.co/S75HHXPg/taufiq.jpg', 'taufiq@wearch.id', '+62 812 1234 5678', 1),
('Azmi Azzami', 'Design Director', 'Urban Planning', 'https://i.ibb.co/67RYqQfk/azmi.jpg', 'azmi@wearch.id', '+62 812 2345 6789', 2),
('Alfiadi Rakhman', 'Project Manager', 'Execution & Quality', 'https://i.ibb.co/Y4dq0226/alfiadi.jpg', 'alfiadi@wearch.id', '+62 812 3456 7890', 3);

-- ==================== SERVICES ====================
INSERT INTO "Service" ("title", "icon", "description", "order") VALUES
('Architecture', '▲', 'Innovative spatial design solutions that blend form and function seamlessly, creating timeless structures that inspire.', 1),
('Interior Design', '●', 'Curated interior experiences that reflect your vision and lifestyle, transforming spaces into personal sanctuaries.', 2),
('Consulting', '■', 'Strategic project guidance from concept to completion, ensuring excellence at every stage of development.', 3);

-- Service Items
INSERT INTO "ServiceItem" ("serviceId", "name", "order") VALUES
(1, 'Residence Design', 1),
(1, 'Commercial Spaces', 2),
(1, 'Urban Planning', 3),
(1, 'Conceptual Design', 4),
(2, 'Space Planning', 1),
(2, 'Furniture Design', 2),
(2, 'Material Selection', 3),
(2, 'Lighting Design', 4),
(3, 'Project Management', 1),
(3, 'Feasibility Studies', 2),
(3, 'Technical Advisory', 3),
(3, 'Quality Assurance', 4);

-- ==================== CONTACT ====================
INSERT INTO "Contact" ("email", "phone", "address", "fullAddress", "workingHours", "instagram", "linkedin") VALUES
('hello@wearch.id', '+62 812 3456 7890', 'Bandung, Indonesia', 'Jl. Setiabudi No. 123, Bandung 40154, West Java, Indonesia', 'Mon - Fri: 09:00 - 18:00', 'https://instagram.com/wearch.id', 'https://linkedin.com/company/wearch');

-- ==================== SETTINGS ====================
INSERT INTO "Settings" (
    "siteName", "tagline", "established", 
    "heroTitle", "heroSubtitle", "heroButtonText",
    "aboutSectionTitle", "aboutSectionSubtitle",
    "aboutQuote", "aboutQuoteAuthor", "aboutDescription1", "aboutDescription2",
    "projectsCompleted", "projectsLabel", "projectsDesc",
    "yearsExperience", "yearsLabel", "yearsDesc",
    "awardsWon", "awardsLabel", "awardsDesc",
    "teamSectionTitle", "teamSectionSubtitle",
    "servicesSectionTitle", "servicesSectionSubtitle",
    "contactSectionTitle", "contactSectionSubtitle", "contactCTA", "contactButtonText",
    "footerDescription", "copyrightText",
    "primaryColor", "darkBg", "lightBg", "metaTitle", "metaDescription"
) VALUES (
    'Wearch Studio',
    'Architecture Studio · Bandung',
    '2018',
    'Creating spaces that inspire life',
    'We transform ideas into architectural excellence through innovative design and meticulous attention to detail',
    'View Projects',
    'Our Philosophy',
    'Architecture is the art of thoughtfully creating spaces that enhance human connection and inspire daily life',
    'Architecture is the thoughtful making of space',
    'Louis Kahn',
    'At our core, we believe architecture transcends mere buildings—it''s about creating experiences. We transform visions into architectural poetry that stands the test of time, blending innovation with timeless design principles.',
    'Our approach combines sustainable practices with cutting-edge technology, ensuring every structure we create is not only beautiful but also environmentally responsible and built for future generations.',
    '150+',
    'Projects Completed',
    'Across residential & commercial sectors',
    '12',
    'Years Experience',
    'Of architectural excellence and innovation',
    '28',
    'Awards Won',
    'National & international recognitions',
    'Meet Our Team',
    'Passionate architects dedicated to excellence',
    'Our Expertise',
    'Comprehensive architectural solutions tailored to bring your vision to life',
    'Let''s Create Together',
    'Ready to transform your vision into architectural excellence? Let''s start a conversation.',
    'Whether it''s a residential dream home, a commercial space, or an urban development—we''re here to bring your vision to life with innovative design and precision.',
    'Start Your Project',
    'Creating architectural excellence in Bandung and beyond. Transforming visions into timeless spaces.',
    '© 2024 Wearch',
    '#BBFF00',
    '#242222',
    '#F5F5F5',
    'Wearch Studio - Architecture & Design',
    'Creating architectural excellence in Bandung and beyond. We transform visions into timeless spaces.'
);
