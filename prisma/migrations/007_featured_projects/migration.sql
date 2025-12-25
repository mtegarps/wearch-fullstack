-- Add featured on homepage fields to Project table
ALTER TABLE "Project" ADD COLUMN "featuredOnHome" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Project" ADD COLUMN "homeOrder" INTEGER NOT NULL DEFAULT 0;

-- Add homepage projects count setting to Settings table
ALTER TABLE "Settings" ADD COLUMN "homeProjectsCount" INTEGER NOT NULL DEFAULT 3;
