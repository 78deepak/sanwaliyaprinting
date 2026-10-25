# 🏛️ Sanwaliya Printing Press (सांवलिया प्रिंटिंग प्रेस)
### Bespoke Fine Print Studio & Wedding Stationery Catalogue

> **Estd. 1994 • Suwasra (Dist. Mandsaur, M.P.)**  
> Handcrafted bespoke wedding invitations, luxury gold foil visiting cards, hardbound bill books, flex banners, and custom shagun lifafas.

---

## 🌟 Overview & Key Features

Sanwaliya Printing Press is a modern, high-performance web catalogue and shopkeeper management system built entirely with **Next.js 16 (App Router + Turbopack)**, **React 19**, **MongoDB Atlas**, **Cloudinary**, and **Tailwind CSS v4**.

* **No Checkout Queues**: Designed specifically for custom printing workflows in India. Customers browse real specimens, curate a personalized **Shortlist Dossier**, and dispatch their consolidated requirements directly to the master pressman on WhatsApp in one click.
* **Shopkeeper Admin Portal (`/admin`)**: Fully integrated administrative desk with protected JWT session authentication, brute-force rate-limiting, live slug uniqueness validation, Cloudinary image upload/CDN optimization, and product/settings management.
* **Instant Fuzzy Search**: High-speed bilingual search (English & Devanagari Hindi) powered by Fuse.js and dynamic MongoDB published index (`/api/search-index` and `/search`).
* **SEO & Social Share Ready**: Auto-generated dynamic `sitemap.xml`, `robots.txt`, Schema.org `PrintShop` LocalBusiness structured data, `Product` JSON-LD schemas, and `BreadcrumbList`.
* **Atelier Design System**: Refined aesthetic inspired by royal Indian stationery, featuring rich burgundy & antique gold accents, dark/light mode via `next-themes`, and custom Devanagari typography.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16.4.3 (App Router, Turbopack, React 19) |
| **Database** | MongoDB Atlas with Mongoose ODM (Connection Pooling & Schema Indexing) |
| **Authentication** | Jose (Signed HS256 JWT in HTTP-Only Cookies) + Bcryptjs Password Hashing |
| **Validation** | Zod (End-to-End Type Safety & Runtime Validation) |
| **Media & CDN** | Cloudinary (Signed Direct Streaming Uploads, `f_auto`, `q_auto`, Auto-Cleanup) |
| **Styling** | Tailwind CSS v4 + Vanilla CSS Design Tokens (Light/Dark Mode) |
| **Icons & Search** | Lucide React + Fuse.js (Fuzzy Multilingual Search) |
| **Test Runner** | Node.js 22 Native Test Runner + TSX |

---

## 📂 Project Structure

```
Sanwaliya Printing Press/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── (public routes)          # Homepage, Category [category], Product [slug]
│   │   ├── admin/                   # Shopkeeper Portal
│   │   │   ├── (dashboard)/         # Overview, Products, Edit, Categories, Settings
│   │   │   ├── login/               # Secure Admin Login with Rate-Limiting
│   │   │   ├── actions.ts           # Admin Product & Settings Server Actions
│   │   │   └── auth-actions.ts      # Authentication Server Actions
│   │   ├── api/
│   │   │   ├── admin/upload/        # Cloudinary Signed Image Upload API
│   │   │   ├── admin/delete-image/  # Cloudinary Image Removal API
│   │   │   └── search-index/        # Published Search Index API
│   │   ├── custom-enquiry/          # Bespoke Order Request Desk
│   │   ├── search/                  # Full Search Page with Real Data
│   │   ├── selection/               # Shortlist Dossier & WhatsApp Dispatch
│   │   ├── error.tsx                # Client-Side Error Boundary
│   │   ├── not-found.tsx            # Custom 404 Royal Atelier Page
│   │   ├── robots.ts                # Dynamic robots.txt
│   │   └── sitemap.ts               # Dynamic sitemap.xml
│   ├── components/                  # Reusable UI & Layout Components
│   │   ├── admin/                   # ImageUploader, ProductForm, AdminTable
│   │   ├── home/                    # Hero, Featured, Categories, SwatchBanner
│   │   ├── layout/                  # Header, Footer, ThemeToggle
│   │   ├── products/                # ProductCard, Gallery, Lightbox
│   │   └── search/                  # SearchDialog Modal
│   ├── context/                     # SelectionContext (Shortlist Dossier State)
│   ├── lib/
│   │   ├── auth.ts                  # Jose Session Tokens & Cookie Helpers
│   │   ├── cloudinary.ts            # Cloudinary Upload & Deletion SDK
│   │   ├── mongodb.ts               # Mongoose Connection Cache & Pooling
│   │   ├── products.ts              # Product Repository & Queries
│   │   ├── rate-limit.ts            # Login Rate Limiting & Lockout
│   │   ├── site-config.ts           # Global Brand & Contact Config
│   │   ├── validation.ts            # Zod Schemas for Products & Settings
│   │   └── whatsapp.ts              # WhatsApp Concierge Message Builders
│   ├── models/
│   │   ├── Product.ts               # Mongoose Product Schema & Indexes
│   │   └── SiteSettings.ts          # Mongoose Site Settings Schema
│   └── proxy.ts                     # Next.js 16 Lightweight Edge Proxy
├── scripts/
│   ├── hash-password.ts             # CLI Utility to Generate Bcrypt Hashes
│   └── seed.ts                      # Initial Catalogue Database Seeder
├── tests/
│   └── backend.test.ts              # Automated Backend Test Suite
├── .env.example                     # Environment Variables Template
└── next.config.ts                   # Turbopack & Security Headers
```

---

## ⚙️ Environment Configuration

Create a `.env.local` file in the project root by copying `.env.example`:

```bash
cp .env.example .env.local
```

Configure the following environment variables:

```env
# 1. MongoDB Database Connection
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/sanwaliya_press?retryWrites=true&w=majority"

# 2. Admin Security Credentials
# Default password for development is RoyalPress@1994
ADMIN_PASSWORD_HASH="$2b$10$z2yvAfXICQShFV19P2.3C.EreX.L/HXgFjtJj/nlXynEuNj3NN0bi"
SESSION_SECRET="at_least_32_characters_random_secret_string_for_jose_jwt_signing"

# 3. Public Studio & WhatsApp Contact Information
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_WHATSAPP_NUMBER="916264350165"
NEXT_PUBLIC_PHONE_NUMBER="+91 62643 50165"

# 4. Cloudinary Media Asset Storage
CLOUDINARY_CLOUD_NAME="aokdwbfg"
CLOUDINARY_API_KEY="694414284852963"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret_here"
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed Database with Initial Specimens
To populate your MongoDB Atlas database with the initial 8 royal stationery items:
```bash
npm run seed
```

### 3. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the live catalogue.

---

## 🔐 Admin Panel Guide (`/admin`)

* **Portal URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
* **Default Password**: `RoyalPress@1994`

### How to Change the Admin Password
Run the interactive password hashing script in your terminal:
```bash
npm run hash-password
```
Enter your new password, copy the generated `$2b$10$...` hash string, and update `ADMIN_PASSWORD_HASH` in `.env.local`.

Alternatively, log into the Admin Panel, navigate to **Settings**, and use the built-in in-browser Bcrypt Hash Generator.

---

## 🧪 Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Starts the Next.js Turbopack development server |
| `npm run build` | Compiles optimized production bundle across all 30 routes |
| `npm run start` | Starts the compiled production server |
| `npm run lint` | Runs ESLint and React Compiler static code analysis |
| `npm test` | Runs the automated Node 22 native backend test suite |
| `npm run seed` | Seeds MongoDB Atlas with initial royal stationery designs |
| `npm run hash-password` | Generates a secure Bcrypt hash for admin passwords |

---

## 📱 WhatsApp Concierge Formatting

When customers click **"Send Shortlist on WhatsApp"**, the application compiles an archival quotation request:

```text
Namaste Sanwaliya Printing Press, I have shortlisted the following designs from your catalogue for a consolidated quote:

1. RM-W-101 - The Jodhpur Kundan Velvet Box (Qty: 250)
   Options: Size: 9" × 7" Box | Paper: Crimson Velvet Mount | Finish: 24k Gold Foil Deboss
   Note: Needs bilingual Hindi/English leaf insert

Special Request: Wedding Date: December 2026, Delivery to Indore

Please share consolidated pricing, sample availability, and delivery timeline.
```

---

## 🛡️ Hardening & Security Standards

* **Proxy Route Guard**: Handled in `src/proxy.ts` using zero-dependency `jose` Web Crypto (no database overhead on edge redirects).
* **Strict Published Filter**: Public store pages and search endpoints enforce `{ published: true }`, ensuring draft designs remain strictly invisible until approved.
* **Asset Cleanliness**: Deleting a product automatically destroys its associated Cloudinary images via the Cloudinary Admin API.
* **HTTP Security Headers**: Enforces `SAMEORIGIN` clickjacking protection, `nosniff` MIME guard, and `strict-origin-when-cross-origin` referrer policy.

---

## 🏛️ Provenance & Ownership
© 1994 – Present **Sanwaliya Printing Press (सांवलिया प्रिंटिंग प्रेस)**  
Ramsnehi Patidar Complex, Sadar Bazar, Suwasra (Dist. Mandsaur, Madhya Pradesh)
