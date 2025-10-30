# Hirfa Design Guidelines

## Design Approach

**Reference-Based with Cultural Authenticity**
Drawing inspiration from Airbnb's marketplace trust-building and Etsy's artisan showcase, combined with traditional Arabic design aesthetics. The platform must balance modern digital functionality with cultural authenticity, creating a bridge between traditional craftsmanship and contemporary technology.

**Core Principle**: Create a digital souk - warm, inviting, trustworthy, and culturally rooted while maintaining modern UX standards.

---

## Typography System

**Arabic (Primary for RTL)**
- Headings: Tajawal Bold (700) - Google Fonts
- Body: Tajawal Regular (400) - Google Fonts
- Accent: Amiri (for decorative Arabic calligraphy elements)

**Latin (French/English)**
- Headings: Poppins SemiBold (600) - Google Fonts
- Body: Inter Regular (400) - Google Fonts
- All text maintains consistent hierarchy across languages

**Type Scale**
- Hero Headlines: text-5xl md:text-6xl lg:text-7xl
- Section Headers: text-3xl md:text-4xl
- Card Titles: text-xl md:text-2xl
- Body Text: text-base md:text-lg
- Caption/Meta: text-sm

---

## Layout & Spacing System

**Tailwind Units**: Consistently use 4, 6, 8, 12, 16, 20, 24, 32 for spacing
- Component padding: p-6 md:p-8
- Section spacing: py-16 md:py-24 lg:py-32
- Card gaps: gap-6 md:gap-8
- Container max-widths: max-w-7xl with px-4 md:px-6 lg:px-8

**Grid Philosophy**
- Desktop: 3-column artisan cards (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Category showcase: 4-column grid for service types
- Profile pages: 2-column layout (info + portfolio)
- Mobile: Always stack to single column

**RTL Support**: All layouts must flip gracefully for Arabic - use logical properties (start/end instead of left/right)

---

## Component Library

**Navigation**
- Sticky header with language switcher (AR/FR/EN flags)
- Logo left (or right for RTL), main navigation center, CTA right
- Mobile: Hamburger menu with slide-in drawer
- Include search bar in header for quick artisan lookup

**Artisan Profile Cards**
- Featured image with subtle overlay gradient
- Artisan photo (circular, overlapping card top edge)
- Name, specialty, rating stars, location pin
- Price range indicator
- "View Profile" CTA button with orange accent
- Hover: Gentle lift (transform: translateY(-4px)) with shadow increase

**Service Category Cards**
- Icon representing service (cooking pot, scissors, wrench, etc.)
- Category name in all three languages
- Artisan count badge
- Traditional geometric pattern background (subtle opacity)
- Clickable, leading to filtered artisan directory

**Search & Filter Panel**
- Prominent search bar with location autocomplete
- Filter chips: Service type, Price range, Rating, Availability
- Sort options: Relevance, Rating, Price, Distance
- Mobile: Collapsible filter drawer

**Profile Pages**
- Hero section: Cover photo with artisan portrait overlay
- Service description with pricing table
- Portfolio gallery (masonry grid of work samples)
- Reviews/testimonials carousel
- Contact form (WhatsApp integration button + email)
- Availability calendar

**Forms**
- Generous padding (p-8)
- Clear labels above inputs
- Input fields with border focus states (orange accent)
- Helper text in lighter weight
- Submit buttons: Full-width on mobile, inline on desktop

**Footer**
- 4-column layout (About, Services, Support, Connect)
- Newsletter signup with traditional pattern background
- Social media icons
- Language selector
- Trust indicators: "Supporting 1000+ Algerian Artisans"

---

## Visual Identity Elements

**Arabic Design Integration**
- Geometric pattern library: Use SVG patterns inspired by zellige (Moroccan tiles) as section dividers, card backgrounds (10% opacity), or decorative borders
- Calligraphic accents: Hirfa logo integration in hero, decorative "حِرفة" watermarks
- Arch shapes: Use subtle rounded tops on cards mimicking traditional architecture
- Arabesque motifs: Corner ornaments on premium artisan profiles

**Imagery Strategy**
- Hero Section: Large, warm image of artisan at work (hands crafting, cooking, sewing) with text overlay - implement with backdrop-blur on text container
- Category cards: Authentic photos of each craft type
- Artisan profiles: Require both portrait and work samples
- Testimonial section: Customer photos with artisan work
- About section: Team or community gathering photos

All images should feel warm, authentic, human-centered - avoid stock photos, prefer real artisan photography

---

## Interactive Elements & Micro-Animations

**Purposeful Animation Only**
- Page transitions: Gentle fade-in on route change
- Card interactions: Scale(1.02) on hover, subtle shadow growth
- Arabic pattern reveals: Geometric patterns animate from center outward on section scroll-into-view (once, not repetitive)
- Loading states: Spinning geometric pattern instead of generic spinner
- Language switch: Smooth content fade with 200ms delay for layout flip

**Scroll Behavior**
- Smooth scroll (scroll-behavior: smooth)
- Parallax on hero image (subtle, 0.5 speed)
- Sticky category filter bar on artisan directory page

---

## Accessibility & Localization

**RTL Implementation**
- Use `dir="rtl"` and `lang="ar"` for Arabic
- Mirror all directional elements (chevrons, arrows, layouts)
- Maintain visual hierarchy regardless of text direction

**Contrast & Readability**
- All text meets WCAG AA standards against backgrounds
- Interactive elements have clear focus indicators (orange outline)
- Form labels always visible (no placeholder-only inputs)

**Multilingual Considerations**
- Store language preference in localStorage
- URL structure: /ar/, /fr/, /en/ prefixes
- All UI strings, error messages, CTAs translated
- Number formatting: Arabic numerals for AR, Western for FR/EN
- Date formats: Locale-appropriate

---

## Responsive Breakpoints

- Mobile: < 768px (base styles, single column)
- Tablet: 768px - 1024px (md: breakpoint, 2 columns)
- Desktop: > 1024px (lg: breakpoint, 3+ columns)
- Wide: > 1280px (xl: for max-width containers)

All interactions optimized for touch on mobile, hover states apply only on desktop.