# Hirfa - Artisan Marketplace Platform

## Overview

Hirfa is a multilingual marketplace platform connecting local artisans (craftspeople, cooks, seamstresses, repair workers) with clients across Algeria. The platform emphasizes cultural authenticity, trust-building, and accessibility through RTL support for Arabic alongside French and English interfaces. Drawing inspiration from Airbnb's marketplace approach and Etsy's artisan showcase, Hirfa creates a "digital souk" that modernizes traditional artisan services while maintaining cultural roots.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript
- Vite for build tooling and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management
- React Hook Form with Zod validation for form handling
- i18next for internationalization (English, French, Arabic)

**UI Framework:**
- Shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for styling with custom design system
- CVA (Class Variance Authority) for component variants
- Custom theme system supporting light/dark modes

**Design System:**
- Typography: Tajawal (Arabic), Amiri (decorative Arabic), Poppins (Latin headings), Inter (Latin body)
- RTL support with automatic direction switching based on language
- Geometric patterns and Arabic corner decorative elements for cultural authenticity
- Responsive grid system: mobile-first with breakpoints at md (768px) and lg (1024px)
- Spacing system using Tailwind's 4-32 unit scale
- Color scheme with semantic tokens for primary, secondary, muted, accent, and destructive states

**Key Pages:**
- Home: Hero section, category showcase, featured artisans
- Artisans: Filterable/searchable artisan directory with category and rating filters
- Artisan Profile: Detailed view with portfolio, services, contact information
- 404 Not Found handler

**State Management:**
- Query client for API data caching and synchronization
- Theme context for light/dark mode preference
- i18n language switching with localStorage persistence
- Form state managed through React Hook Form

### Backend Architecture

**Technology Stack:**
- Node.js with Express.js
- TypeScript for type safety
- In-memory storage implementation (MemStorage class)
- RESTful API design

**API Endpoints:**
- `GET /api/categories` - Fetch all artisan categories
- `GET /api/categories/:id` - Fetch single category
- `GET /api/artisans` - Fetch artisans with optional filters (category, search, minRating)
- `GET /api/artisans/:id` - Fetch single artisan profile
- `POST /api/contact` - Submit contact message to artisan

**Data Models:**
- Categories: Multilingual names/descriptions, icon references
- Artisans: Multilingual profiles, services arrays, location, contact info, pricing, ratings, portfolio images, featured status
- Contact Messages: Client information, message content, timestamps

**Database Schema (Drizzle ORM):**
- PostgreSQL dialect configured
- Tables: categories, artisans, contact_messages
- UUID primary keys with auto-generation
- Array fields for services and portfolio images
- Full text support for multilingual content

**Validation:**
- Zod schemas derived from Drizzle table definitions
- Type-safe validation for API inputs
- Shared schema definitions between frontend and backend

### Deployment Configuration

**Development:**
- Vite dev server with HMR
- Express middleware integration
- Replit-specific plugins for runtime error overlay and cartographer

**Production Build:**
- Vite builds frontend to `dist/public`
- ESBuild bundles server code to `dist/index.js`
- Static file serving for production assets
- Environment-based configuration

**Build Process:**
- `dev`: Development mode with tsx and Vite HMR
- `build`: Production build (client + server)
- `start`: Production server execution
- `db:push`: Database schema synchronization via Drizzle Kit

## External Dependencies

### Database
- **Neon Database** (@neondatabase/serverless): PostgreSQL serverless database
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **Drizzle Zod**: Schema validation integration
- Connection via `DATABASE_URL` environment variable

### UI Component Libraries
- **Radix UI**: Unstyled, accessible component primitives (20+ components including dialogs, dropdowns, navigation, forms)
- **Shadcn/ui**: Pre-styled components built on Radix UI
- **Lucide React**: Icon library for UI elements
- **CMDK**: Command palette component
- **Embla Carousel**: Touch-friendly carousel component

### Internationalization
- **i18next**: Core internationalization framework
- **react-i18next**: React bindings for i18next
- **i18next-browser-languagedetector**: Automatic language detection

### Form & Validation
- **React Hook Form**: Performant form state management
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### Styling & Design
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing with Autoprefixer
- **class-variance-authority**: Type-safe component variants
- **clsx & tailwind-merge**: Conditional className utilities

### Development Tools
- **TypeScript**: Static type checking
- **Vite**: Fast build tool and dev server
- **ESBuild**: JavaScript bundler for production server
- **TSX**: TypeScript execution for development
- **Replit Plugins**: Development tooling for Replit environment

### Session Management
- **connect-pg-simple**: PostgreSQL session store (currently configured but not actively used with authentication)

### Google Fonts
- Tajawal (Arabic - Regular 400, Medium 500, Bold 700)
- Amiri (Arabic decorative - Regular 400, Bold 700, Italic)
- Poppins (Latin headings - Regular 400, SemiBold 600, Bold 700)
- Inter (Latin body - Regular 400, Medium 500, SemiBold 600)