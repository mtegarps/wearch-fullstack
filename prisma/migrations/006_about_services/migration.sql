-- CreateTable
CREATE TABLE "AboutService" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "iconUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutService_pkey" PRIMARY KEY ("id")
);

-- Insert default data
INSERT INTO "AboutService" ("title", "description", "iconUrl", "order", "createdAt", "updatedAt") VALUES
('Residence', 'Design a house become a place to live, giving its own character to the owner. Create a space s that offer both aesthetic and function, offering sanctuaries where life can flourish.', '/uploads/general/residence.png', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Commercial', 'We focus on functionality and space optimization. We aim to build something with high business value while providing comfort for its users, while also providing a distinct identity for our clients'' brands. Through this approach, we aim to create attractive, productive, and competitive commercial spaces.', '/uploads/general/commercial.png', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Urban Design', 'Create a beneficial environment for the surrounding users. We envision all as living ecosystems where architecture, landscape, and urban flow come together in harmony, enriching the daily lives of their inhabitants.', '/uploads/general/urbandesign.png', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Landscape', 'Not changing but shaping the nature into immersive experiences, blending art with ecology. Creating spaces where nature and humanity can coexist peacefully and meaningfully.', '/uploads/general/landscape.png', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
