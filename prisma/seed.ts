import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // ==================== CLEAR EXISTING DATA ====================
  console.log("🧹 Clearing existing data...");
  await prisma.projectGallery.deleteMany();
  await prisma.project.deleteMany();
  await prisma.serviceItem.deleteMany();
  await prisma.service.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.settings.deleteMany();
  await prisma.user.deleteMany();

  // ==================== USERS ====================
  console.log("👤 Creating users...");
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  await prisma.user.create({
    data: {
      email: "admin@wearch.id",
      password: hashedPassword,
      name: "Admin",
      role: "admin",
    },
  });

  // ==================== PROJECTS ====================
  console.log("📁 Creating projects...");
  
  const project1 = await prisma.project.create({
    data: {
      title: "Modern Villa",
      location: "Dago",
      year: "2024",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      category: "Residential",
      area: "450 m²",
      duration: "8 Months",
      client: "Private Client",
      description: "A contemporary residential masterpiece that harmoniously blends indoor and outdoor living spaces.",
      status: "Published",
      gallery: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
            title: "Exterior View",
            description: "The facade combines clean geometric lines with natural stone elements, creating a striking visual balance.",
            order: 1,
          },
          {
            url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
            title: "Living Space",
            description: "Double-height ceilings and floor-to-ceiling windows flood the interior with natural light.",
            order: 2,
          },
          {
            url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
            title: "Kitchen Design",
            description: "The gourmet kitchen features custom Italian cabinetry and integrated appliances.",
            order: 3,
          },
          {
            url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
            title: "Garden Integration",
            description: "Landscape architecture blurs the boundaries between indoor and outdoor living.",
            order: 4,
          },
        ],
      },
    },
  });

  const project2 = await prisma.project.create({
    data: {
      title: "Creative Hub",
      location: "Bandung",
      year: "2023",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      category: "Commercial",
      area: "1200 m²",
      duration: "14 Months",
      client: "Tech Startup Inc",
      description: "A dynamic workspace designed to inspire innovation and foster creative collaboration.",
      status: "Published",
      gallery: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
            title: "Tower Facade",
            description: "The crystalline glass facade responds dynamically to sunlight throughout the day.",
            order: 1,
          },
          {
            url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
            title: "Collaborative Spaces",
            description: "Flexible work environments designed to foster creativity and collaboration.",
            order: 2,
          },
          {
            url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
            title: "Innovation Lab",
            description: "Dedicated spaces for experimentation and prototyping.",
            order: 3,
          },
          {
            url: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1200&q=80",
            title: "Rooftop Terrace",
            description: "A green rooftop retreat offering panoramic city views.",
            order: 4,
          },
        ],
      },
    },
  });

  const project3 = await prisma.project.create({
    data: {
      title: "Eco House",
      location: "Lembang",
      year: "2024",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      category: "Residential",
      area: "320 m²",
      duration: "10 Months",
      client: "Green Living Co",
      description: "A sustainable home that demonstrates how eco-friendly design can enhance quality of life.",
      status: "Published",
      gallery: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
            title: "Sustainable Design",
            description: "Passive solar design and natural ventilation reduce energy consumption.",
            order: 1,
          },
          {
            url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
            title: "Natural Materials",
            description: "Locally-sourced bamboo and reclaimed wood create warm, tactile interiors.",
            order: 2,
          },
          {
            url: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
            title: "Indoor Garden",
            description: "A central atrium brings nature inside, improving air quality.",
            order: 3,
          },
          {
            url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
            title: "Energy Systems",
            description: "Integrated solar panels and rainwater harvesting systems.",
            order: 4,
          },
        ],
      },
    },
  });

  const project4 = await prisma.project.create({
    data: {
      title: "Office Tower",
      location: "Bandung",
      year: "2023",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      category: "Commercial",
      area: "3500 m²",
      duration: "18 Months",
      client: "Corporate Group Ltd",
      description: "A landmark commercial tower that redefines premium office space in the city center.",
      status: "Draft",
      gallery: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
            title: "Urban Presence",
            description: "Rising 25 stories, the tower establishes a new benchmark for commercial architecture.",
            order: 1,
          },
          {
            url: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&q=80",
            title: "Grand Lobby",
            description: "The dramatic entrance sequence features a triple-height lobby.",
            order: 2,
          },
          {
            url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80",
            title: "Executive Suite",
            description: "Premium office floors offer unobstructed views and raised floors.",
            order: 3,
          },
          {
            url: "https://images.unsplash.com/photo-1577412647305-991150c7d163?w=1200&q=80",
            title: "Sky Garden",
            description: "Intermediate sky gardens provide communal retreats every five floors.",
            order: 4,
          },
        ],
      },
    },
  });

  // ==================== TEAM ====================
  console.log("👥 Creating team members...");
  
  await prisma.teamMember.createMany({
    data: [
      {
        name: "Taufiq Ibrahim",
        role: "Lead Architect",
        specialty: "Conceptual Design",
        image: "https://i.ibb.co/S75HHXPg/taufiq.jpg",
        email: "taufiq@wearch.id",
        phone: "+62 812 1234 5678",
        order: 1,
      },
      {
        name: "Azmi Azzami",
        role: "Design Director",
        specialty: "Urban Planning",
        image: "https://i.ibb.co/67RYqQfk/azmi.jpg",
        email: "azmi@wearch.id",
        phone: "+62 812 2345 6789",
        order: 2,
      },
      {
        name: "Alfiadi Rakhman",
        role: "Project Manager",
        specialty: "Execution & Quality",
        image: "https://i.ibb.co/Y4dq0226/alfiadi.jpg",
        email: "alfiadi@wearch.id",
        phone: "+62 812 3456 7890",
        order: 3,
      },
    ],
  });

  // ==================== SERVICES ====================
  console.log("🛠️ Creating services...");
  
  const service1 = await prisma.service.create({
    data: {
      title: "Architecture",
      icon: "▲",
      description: "Innovative spatial design solutions that blend form and function seamlessly, creating timeless structures that inspire.",
      order: 1,
      items: {
        create: [
          { name: "Residential Design", order: 1 },
          { name: "Commercial Spaces", order: 2 },
          { name: "Urban Planning", order: 3 },
          { name: "Conceptual Design", order: 4 },
        ],
      },
    },
  });

  const service2 = await prisma.service.create({
    data: {
      title: "Interior Design",
      icon: "●",
      description: "Curated interior experiences that reflect your vision and lifestyle, transforming spaces into personal sanctuaries.",
      order: 2,
      items: {
        create: [
          { name: "Space Planning", order: 1 },
          { name: "Furniture Design", order: 2 },
          { name: "Material Selection", order: 3 },
          { name: "Lighting Design", order: 4 },
        ],
      },
    },
  });

  const service3 = await prisma.service.create({
    data: {
      title: "Consulting",
      icon: "■",
      description: "Strategic project guidance from concept to completion, ensuring excellence at every stage of development.",
      order: 3,
      items: {
        create: [
          { name: "Project Management", order: 1 },
          { name: "Feasibility Studies", order: 2 },
          { name: "Technical Advisory", order: 3 },
          { name: "Quality Assurance", order: 4 },
        ],
      },
    },
  });

  // ==================== CONTACT ====================
  console.log("📞 Creating contact info...");
  
  await prisma.contact.create({
    data: {
      email: "hello@wearch.id",
      phone: "+62 812 3456 7890",
      address: "Bandung, Indonesia",
      fullAddress: "Jl. Setiabudi No. 123, Bandung 40154, West Java, Indonesia",
      workingHours: "Mon - Fri: 09:00 - 18:00",
      instagram: "https://instagram.com/wearch.id",
      linkedin: "https://linkedin.com/company/wearch",
    },
  });

  // ==================== SETTINGS ====================
  console.log("⚙️ Creating settings...");
  
  await prisma.settings.create({
    data: {
      siteName: "Wearch Studio",
      tagline: "Architecture Studio · Bandung",
      established: "2018",
      heroTitle: "Creating spaces that inspire life",
      heroSubtitle: "We transform ideas into architectural excellence through innovative design and meticulous attention to detail",
      heroButtonText: "View Projects",
      aboutQuote: "Architecture is the thoughtful making of space",
      aboutQuoteAuthor: "Louis Kahn",
      aboutDescription1: "We believe architecture transcends mere buildings—it's about creating experiences that enhance human connection and inspire daily life. Every space tells a story, and we're here to help you tell yours.",
      aboutDescription2: "Every project is a unique dialogue between space, light, and purpose, crafted with precision and passion. We transform visions into architectural poetry that stands the test of time.",
      projectsCompleted: "150+",
      yearsExperience: "12",
      awardsWon: "28",
      primaryColor: "#BBFF00",
      darkBg: "#242222",
      lightBg: "#F5F5F5",
      metaTitle: "Wearch Studio - Architecture & Design",
      metaDescription: "Creating architectural excellence in Bandung and beyond. We transform visions into timeless spaces.",
    },
  });

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
