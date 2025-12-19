-- Wearch Database Schema
-- PostgreSQL

-- Drop tables if exist (for fresh start)
DROP TABLE IF EXISTS "ProjectGallery" CASCADE;
DROP TABLE IF EXISTS "Project" CASCADE;
DROP TABLE IF EXISTS "ServiceItem" CASCADE;
DROP TABLE IF EXISTS "Service" CASCADE;
DROP TABLE IF EXISTS "TeamMember" CASCADE;
DROP TABLE IF EXISTS "Contact" CASCADE;
DROP TABLE IF EXISTS "Settings" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;

-- ==================== USER ====================
CREATE TABLE "User" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "role" VARCHAR(50) DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- ==================== PROJECT ====================
CREATE TABLE "Project" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "year" VARCHAR(10) NOT NULL,
    "image" VARCHAR(500),
    "category" VARCHAR(100) NOT NULL,
    "area" VARCHAR(50),
    "duration" VARCHAR(50),
    "client" VARCHAR(255),
    "description" TEXT,
    "status" VARCHAR(50) DEFAULT 'Draft',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "ProjectGallery" (
    "id" SERIAL PRIMARY KEY,
    "projectId" INTEGER NOT NULL REFERENCES "Project"("id") ON DELETE CASCADE,
    "url" VARCHAR(500) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "order" INTEGER DEFAULT 0
);

-- ==================== TEAM ====================
CREATE TABLE "TeamMember" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "specialty" VARCHAR(255),
    "image" VARCHAR(500),
    "email" VARCHAR(255),
    "phone" VARCHAR(50),
    "linkedin" VARCHAR(500),
    "instagram" VARCHAR(500),
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- ==================== SERVICE ====================
CREATE TABLE "Service" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "icon" VARCHAR(10) DEFAULT '▲',
    "description" TEXT,
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "ServiceItem" (
    "id" SERIAL PRIMARY KEY,
    "serviceId" INTEGER NOT NULL REFERENCES "Service"("id") ON DELETE CASCADE,
    "name" VARCHAR(255) NOT NULL,
    "order" INTEGER DEFAULT 0
);

-- ==================== CONTACT ====================
CREATE TABLE "Contact" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255),
    "phone" VARCHAR(50),
    "address" VARCHAR(255),
    "fullAddress" TEXT,
    "workingHours" VARCHAR(255),
    "mapEmbed" TEXT,
    "instagram" VARCHAR(500),
    "linkedin" VARCHAR(500),
    "facebook" VARCHAR(500),
    "twitter" VARCHAR(500)
);

-- ==================== SETTINGS ====================
CREATE TABLE "Settings" (
    "id" SERIAL PRIMARY KEY,
    "siteName" VARCHAR(255) DEFAULT 'Wearch Studio',
    "tagline" VARCHAR(255),
    "established" VARCHAR(10),
    "heroTitle" VARCHAR(255),
    "heroSubtitle" TEXT,
    "heroButtonText" VARCHAR(100),
    "aboutQuote" TEXT,
    "aboutQuoteAuthor" VARCHAR(255),
    "aboutDescription1" TEXT,
    "aboutDescription2" TEXT,
    "projectsCompleted" VARCHAR(50),
    "yearsExperience" VARCHAR(50),
    "awardsWon" VARCHAR(50),
    "primaryColor" VARCHAR(20) DEFAULT '#BBFF00',
    "darkBg" VARCHAR(20) DEFAULT '#242222',
    "lightBg" VARCHAR(20) DEFAULT '#F5F5F5',
    "metaTitle" VARCHAR(255),
    "metaDescription" TEXT
);

-- Create indexes
CREATE INDEX "ProjectGallery_projectId_idx" ON "ProjectGallery"("projectId");
CREATE INDEX "ServiceItem_serviceId_idx" ON "ServiceItem"("serviceId");
CREATE INDEX "Project_status_idx" ON "Project"("status");
CREATE INDEX "User_email_idx" ON "User"("email");
