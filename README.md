# JobConnect

A modern job board application built with **Next.js 15**, **Supabase**, and **TypeScript**. Users can browse jobs, post listings, save favorites, and manage their profiles with secure authentication.

## Quick Local Setup

### Prerequisites
- Node.js 18+
- Supabase account (free tier works)

### 1. Install & Configure
```bash
# Clone and install
git clone <repository-url>
cd jobconnect
npm install

# Create environment file
cp .env.example .env.local
```

### 2. Supabase Setup
1. Create project at [supabase.com](https://supabase.com)
2. Go to **Connect → App Frameworks -> .env.local** and copy your credentials
3. Update `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
4. In **SQL Editor**, execute the schema from `src/lib/database.sql`

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 4. Test the App
- Register at `/auth/register`
- Browse jobs on homepage
- Try posting a job (requires login)
- Test job saving/filtering features

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Backend**: Supabase (Auth, Database, RLS)
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Row Level Security

## Key Features

- **Authentication**: Email/password + Google OAuth
- **Job Management**: Browse, search, post, and save jobs
- **User Dashboard**: Manage job postings and profile
- **Security**: Row Level Security (RLS) policies
- **Responsive**: Mobile-first design

## Project Structure

```
src/
├── app/           # Next.js pages (auth, jobs, dashboard)
├── components/    # Reusable components (auth, UI)
├── hooks/         # Custom React hooks (useAuth)
├── lib/          # Services and utilities
├── utils/        # Supabase client configurations
└── middleware.ts  # Next.js middleware for auth protection
```

## What Would I Improve Given More Time?

### Core Features
- **Real-time notifications** and email alerts for job updates
- **File uploads** for resumes/logos and advanced search filters
- **Job application tracking** with status management
- **Company profiles** and admin dashboard for moderation

### Technical Enhancements
- **Comprehensive testing** (unit, integration, e2e)
- **Performance optimization** and better error handling
- **CI/CD pipeline** with Docker containerization

---

