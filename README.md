# Wearch Studio - Architecture Website

A modern architecture studio website with admin panel, built with Next.js 16, PostgreSQL, and Prisma.

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: JWT with HTTP-only cookies

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

## Getting Started

### 1. Clone and Install

```bash
npm install
```

### 2. Setup Environment

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/wearch_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
```

### 3. Setup Database

**Option A: Using Prisma (Recommended)**

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database
npm run db:seed
```

**Option B: Using SQL directly**

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE wearch_db;

# Connect to database
\c wearch_db

# Run migration
\i prisma/migrations/001_init/migration.sql

# Run seed
\i prisma/seed.sql
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## URLs

| URL | Description |
|-----|-------------|
| `/` | Landing page |
| `/login` | Admin login |
| `/admin/dashboard` | Admin dashboard |
| `/admin/projects` | Manage projects |
| `/admin/team` | Manage team members |
| `/admin/services` | Manage services |
| `/admin/contact` | Manage contact info |
| `/admin/settings` | Site settings |

## Default Admin Credentials

- **Email**: admin@wearch.id
- **Password**: admin123

⚠️ **Change these in production!**

## Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes
npm run db:push

# Create migration
npm run db:migrate

# Seed database
npm run db:seed

# Reset database
npm run db:reset

# Open Prisma Studio
npm run db:studio
```

## API Endpoints

### Auth
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Current user

### Projects
- `GET /api/projects` - Get published projects
- `GET /api/projects?all=true` - Get all projects
- `POST /api/projects` - Create project
- `GET /api/projects/[id]` - Get project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Team
- `GET /api/team` - Get team members
- `POST /api/team` - Create member
- `PUT /api/team/[id]` - Update member
- `DELETE /api/team/[id]` - Delete member

### Services
- `GET /api/services` - Get services
- `POST /api/services` - Create service
- `PATCH /api/services` - Reorder services
- `PUT /api/services/[id]` - Update service
- `DELETE /api/services/[id]` - Delete service

### Contact & Settings
- `GET /api/contact` - Get contact info
- `PUT /api/contact` - Update contact info
- `GET /api/settings` - Get settings
- `PUT /api/settings` - Update settings

## License

MIT
