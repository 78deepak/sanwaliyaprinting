# Sanwaliya Printing Press — Design System & Specification
**Project:** Sanwaliya Printing Press / Royal Mudran Fine Print Studio Catalogue  
**Stitch Project ID:** `projects/10044991525653135836`  
**Version:** 1.0.0  
**Updated:** October 2026  

---

## 1. Project Overview & Stitch Screen Manifest

Sanwaliya Printing Press (सांवलिया प्रिंटिंग प्रेस • Estd. 1994) is an artisanal print atelier specializing in luxury bespoke wedding stationery, heirloom farman scrolls, velvet hardbound boxes, letterpress business stationery, and large-format event collaterals. 

The digital catalogue bridges traditional royal Indian craftsmanship (gold hot-foil stamping, letterpress debossing, 600+ GSM cotton rag, kundan embellishments) with a modern, high-touch consultation model centered around direct WhatsApp quoting and specimen shortlisting.

### Screen Inventory (Stitch Screens)

| Screen ID | Stitch Screen Title | Type / Layout | Description & Core Features |
|---|---|---|---|
| `d5a6cb8eeadb4d20b99cb992ac3f7c7b` | **Royal Mudran - Fine Print Studio Catalogue** | Desktop (2842 × 12348 px) | **Atelier Landing & Signature Showcase:** Bilingual navigation bar with atelier timings (`Mon-Sat 10AM-8:30PM`) and location (`Suwasra, Mandsaur`); hero with asymmetric collage; 6-category master grid with Devanagari subheadings; featured wedding suites; commercial stationery; free 12-paper swatch kit request form; footer with studio provenance. |
| `5ef607e3a6ad4683b1f69156a17264e8` | **Wedding Invitations Catalogue - Royal Mudran** | Desktop (2842 × 11202 px) | **Bespoke Wedding Collection:** Archival notice ribbon; editorial category hero; sticky 3-column filter sidebar (paper weight, 24k foil techniques, palette swatches, script & Devanagari support); responsive 8-item product grid with shortlist triggers, tag chips, and direct WhatsApp quote buttons. |
| `3a09491ddadc44a29a22ecbd411a5f64` | **Product Detail: Rajwada Velvet Box Suite (RM-W-101)** | Desktop (2842 × 7018 px) | **Interactive Customizer & Specimen Dossier:** 7-column gallery with main lightbox zoom and 4 multi-angle thumbnails (Closed Box, 3 Inserts, Foil Texture, Shagun Lifafa); 5-column bespoke configurator (box silhouette sizes, Dutch velvet color swatches, foil grade, bilingual typography proofing, quantity stepper, custom date/monogram notes, WhatsApp quotation generator). |
| `c8f3828de8d844478f5292e91833e487` | **My Selection & WhatsApp Quote - Royal Mudran** | Desktop (2842 × 6350 px) | **Shortlist Dossier & WhatsApp Dispatch Drawer:** Curated item list with live quantity adjusters, per-item bespoke atelier notes, instant remove/clear actions, sticky summary drawer with dynamic WhatsApp message compiler and copy-to-clipboard trigger. |

---

## 2. Color System & Palettes

The color palette replicates physical atelier materials: handmade unbleached cotton paper, deep lac and vermilion maroon inks, reflective antique gold leaf, and WhatsApp concierge emerald.

### 2.1. Light Palette (Primary Atelier Theme)

| Token Name | Hex Code | Role & Physical Material Association |
|---|---|---|
| **Primary** | `#5B0617` | Deep Maroon Ink (Primary headings, active states, brand badges) |
| **Primary Container** | `#7A1F2B` | Royal Velvet Maroon (Hero badges, primary button surfaces) |
| **On Primary** | `#FFFFFF` | Crisp White text over deep maroon |
| **On Primary Container** | `#FF8B92` | Soft Rose Highlight |
| **Primary Fixed** | `#FFDADA` | Muted blush highlight pill background |
| **Primary Fixed Dim** | `#FFB3B5` | Ambient blush glow circles |
| **Secondary** | `#7D5700` / `#B8892E` | Antique Gold Foil (Bespoke foil badges, gilded borders, decorative rules) |
| **Secondary Container** | `#FCC665` | Warm Yellow Gold (Swatch kit pill container, celebratory accents) |
| **On Secondary Container** | `#755100` | Deep Burnished Gold text |
| **Secondary Fixed** | `#FFDEAA` | Light gold indicator fill |
| **Secondary Fixed Dim** | `#F3BE5E` | Ambient gold glow circles |
| **Tertiary (WhatsApp Emerald)** | `#128C7E` (`#00322C`) | Atelier Concierge Action (High-conversion WhatsApp triggers) |
| **Tertiary Container** | `#004A42` | Deep Emerald Container |
| **On Tertiary** | `#FFFFFF` | White text on emerald triggers |
| **On Tertiary Container** | `#57BEAE` | Soft mint status highlights |
| **Background** | `#FFF8F5` | Warm Ivory Canvas (Atmospheric base) |
| **Surface** | `#FFF8F5` | Natural unbleached rag paper canvas |
| **Surface Dim** | `#E3D8D3` | Image placeholder / shadow substrate |
| **Surface Bright** | `#FFF8F5` | High-luminance ivory surface |
| **Surface Container Lowest** | `#FFFFFF` | Crisp White Cotton Stock (Card tiles, drawers, active controls) |
| **Surface Container Low** | `#FDF1EC` | Muted card backgrounds, secondary sections |
| **Surface Container** | `#F7ECE6` | Input trays, language switcher backgrounds |
| **Surface Container High** | `#F1E6E1` | Top notification ribbons, subtle well trays |
| **Surface Container Highest** | `#EBE0DB` | Inactive chip fills, border accents |
| **On Surface** | `#201B18` | Lampblack Ink (Primary body text, spec labels) |
| **On Surface Variant** | `#564242` | Muted Ink (Descriptions, secondary metadata, captions) |
| **Outline** | `#897172` | Pressed cotton border line |
| **Outline Variant** | `#DCC0C0` | Light dividers, card outline frames (`1px solid`) |
| **Inverse Surface** | `#352F2C` | Deep Carbon (Midnight navy / dark tags) |
| **Inverse On Surface** | `#FAEEE9` | Ivory text on dark tags |
| **Error** | `#BA1A1A` | Vermilion warning / clear actions |

### 2.2. Dark Palette (Nocturne Atelier)

| Token Name | Hex Code | Role & Night Environment Usage |
|---|---|---|
| **Primary** | `#D4707F` | Luminous Rose Maroon |
| **Secondary** | `#E2BC62` | Chased Gold Foil |
| **Tertiary** | `#25D366` | Vibrant WhatsApp Emerald |
| **Background** | `#14110F` | Charcoal Rag Dark Canvas |
| **Surface** | `#1D1916` | Dark Paper Substrate |
| **Surface Container** | `#28231F` | Elevated Cards & Menus |
| **Surface Container High** | `#332D28` | Modal Wells & Active Selection Rings |
| **On Surface** | `#F5EFEB` | Soft Bone Ink Text |
| **On Surface Variant** | `#C9BEB7` | Muted Secondary Copy |
| **Outline / Border** | `#4A413D` | Dark Deboss Borders |

---

## 3. Typography & Bilingual Standards

The typography balances high-contrast classical editorial serifs with geometric, utilitarian modern sans-serifs. Bilingual harmony between English and Devanagari is treated as a fundamental brand pillar.

### 3.1. Font Families

1. **Display & Headings:** `Playfair Display`, serif  
   *Weights:* `500` (Medium), `600` (SemiBold), `700` (Bold), with italic cuts for poetic descriptors and traditional honors.
2. **Body, Technical Specifications & UI Controls:** `Plus Jakarta Sans`, sans-serif  
   *Weights:* `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold).
3. **Indic & Devanagari Scripts:** `Noto Sans Devanagari` / `Plus Jakarta Sans`  
   *Scale Rule:* Rendered at `105%` of the English baseline height to maintain optical equilibrium with Latin uppercase letterforms and ensure vowel diacritics (*matras*) remain clearly legible.
4. **Icons:** Google `Material Symbols Outlined` (filled and unfilled states).

### 3.2. Typographic Scale

| Style Token | Font Family | Size | Line Height | Weight | Letter Spacing | Purpose |
|---|---|---|---|---|---|---|
| `display-lg` | Playfair Display | `56px` | `64px` | `600` | `-0.02em` | Desktop Hero Headlines |
| `display-lg-mobile` | Playfair Display | `38px` | `44px` | `600` | `-0.01em` | Mobile Hero Headlines |
| `display-md` | Playfair Display | `44px` | `52px` | `600` | `-0.01em` | Major Section & Collection Banners |
| `display-md-mobile` | Playfair Display | `32px` | `38px` | `600` | `0em` | Mobile Section Banners |
| `headline-lg` | Playfair Display | `32px` | `40px` | `500` | `0em` | Section Titles & Product Names |
| `headline-md` | Playfair Display | `24px` | `32px` | `500` | `0.01em` | Card Headlines & Pricing Blocks |
| `headline-sm` | Playfair Display | `20px` | `28px` | `600` | `0.01em` | Subtitles, Hindi Ribbons & Card Titles |
| `body-lg` | Plus Jakarta Sans | `18px` | `28px` | `400` | `0em` | Editorial Introductions & Narrative Lead |
| `body-md` | Plus Jakarta Sans | `15px` | `24px` | `400` | `0.01em` | Default Body, Specifications, Descriptions |
| `body-sm` | Plus Jakarta Sans | `13px` | `20px` | `400` | `0.02em` | Footnotes, Card Meta, Filter Labels |
| `label-lg` | Plus Jakarta Sans | `14px` | `20px` | `600` | `0.04em` | Navigation Links, Primary Button Text |
| `label-md` | Plus Jakarta Sans | `12px` | `16px` | `600` | `0.06em` | Chip Selectors, Table Headings |
| `label-sm` | Plus Jakarta Sans | `11px` | `14px` | `700` | `0.08em` | Badges, Overlines, SKU Codes, Tags |

---

## 4. Spacing, Grid & Layout Metrics

The layout draws inspiration from traditional master printer broadsheets and portfolio books: wide generous margins, strict vertical baseline rhythms, and clean alignment channels.

### 4.1. Responsive Breakpoints & Columns

- **Desktop (≥ 1280px):** 12-column grid  
  - Outer Margin: `3rem` (`48px`)  
  - Column Gutter: `1.5rem` (`24px`)  
  - Common Split: `7 cols` (Imagery / Specimen display) + `5 cols` (Order form / Configurator).
- **Tablet (768px – 1279px):** 8-column grid  
  - Outer Margin: `2rem` (`32px`)  
  - Column Gutter: `1.5rem` (`24px`).
- **Mobile (< 768px):** 4-column fluid stack  
  - Outer Margin: `1.25rem` (`20px`)  
  - Column Gutter: `1rem` (`16px`).

### 4.2. Spacing Scale

| Token | Dimension (REM) | Dimension (PX) | Common Usage |
|---|---|---|---|
| `space-xs` | `0.25rem` | `4px` | Micro gaps between icon and text, inline tags |
| `space-sm` | `0.5rem` | `8px` | Button horizontal spacing, chip padding, badge gaps |
| `space-md` | `1.0rem` | `16px` | Card internal padding, form input spacing |
| `space-lg` | `1.5rem` | `24px` | Grid gutter, container padding, modal margins |
| `space-xl` | `2.5rem` | `40px` | Section vertical rhythm, hero padding |
| `margin` | `3.0rem` | `48px` | Maximum container outer borders |

---

## 5. Shapes, Shadows & Physical Layering

Instead of harsh digital drop-shadows, the interface simulates the physical presence of premium cardstocks, pressed cotton boards, debossed metal plates, and foil stamping dies.

### 5.1. Corner Radii

- `sm`: `0.25rem` (`4px`) — Keyboard shortcuts, micro tags, tooltips.
- `DEFAULT` / `md`: `0.5rem` (`8px`) — Form input fields, buttons, interactive chips.
- `lg`: `0.75rem` (`12px`) — Specimen cards, gallery thumbnails, dropdown menus.
- `xl`: `1.0rem` – `1.5rem` (`16px`–`24px`) — Hero cards, drawers, main modal panels.
- `full`: `9999px` — Pill badges, circular wax seals, status dots.

### 5.2. Physical Layering & Depth

1. **The Matting Layer (Canvas):** `#FFF8F5` flat absorbent surface without drop shadow.
2. **The Sheet Layer (Cards & Surfaces):** `#FFFFFF` crisp stock with `1px solid #DCC0C0` or `#E6DCCB` border + micro contact shadow:
   ```css
   box-shadow: 0 2px 8px -2px rgba(31, 26, 23, 0.04);
   ```
3. **The Raised Sample Layer (Floating Drawers & Modals):**
   ```css
   box-shadow: 0 16px 32px -8px rgba(122, 31, 43, 0.12), 0 4px 12px -2px rgba(31, 26, 23, 0.06);
   ```
4. **Debossed Wells (Input Fields & Trays):**
   ```css
   box-shadow: inset 0 1px 2px rgba(31, 26, 23, 0.06);
   ```
5. **Gold Foil Pulse Animation:**
   ```css
   @keyframes pulse-ring {
     0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(184, 137, 46, 0.5); }
     70% { transform: scale(1); box-shadow: 0 0 0 14px rgba(184, 137, 46, 0); }
     100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(184, 137, 46, 0); }
   }
   ```

---

## 6. Core Component Styles

### 6.1. Buttons & Call-to-Actions

1. **Primary CTA (Maroon Wax Button):**
   - Background: `#5B0617` (hover: `#7A1F2B`)
   - Text: `#FFFFFF`, `font-label-lg` (`14px`, weight: `600`)
   - Padding: `12px 24px` (`py-3 px-6`)
   - Border Radius: `8px` (`rounded-lg`)
   - Micro-interaction: `hover:scale-[1.02] active:scale-[0.98]`
2. **Secondary CTA (Gold Leaf / Outline Button):**
   - Background: Transparent or `#FFFFFF`
   - Border: `1px solid #7D5700` (`#B8892E`)
   - Text: `#5B0617`
   - Hover: Warm ivory-gold tint `rgba(184, 137, 46, 0.08)`
3. **Concierge WhatsApp Action (High-Touch Inquiries):**
   - Background: `#128C7E` (hover: `#0E7064`)
   - Text: `#FFFFFF` with embedded `chat` Material Symbol
   - Padding: `12px 20px`
   - Companion Subtext: `Typically replies in 15 mins` with emerald pulse dot.

### 6.2. Interactive Selectors & Chips

- **GSM Paper Weights / Foil Options / Dimensions:**
  - *Default:* `#F7ECE6` or `#FDF1EC`, `1px solid #DCC0C0`, text `#201B18`.
  - *Selected:* `#FFFFFF` fill, `2px solid #5B0617` (or `#7D5700`), text `#5B0617`, bold typography.
- **Velvet Fabric Swatches:**
  - Circular or rounded tile with color preview disk (`24px × 24px` ringed with white border) + swatch name (Maroon, Emerald, Midnight Navy, Mustard).

### 6.3. Product Specimen Cards

- Ratio: `4:5` aspect ratio image container.
- Badges: Top-left SKU code pill (`RM-W-101`), top-right shortlist heart button with instant animation.
- Bottom overlay: Semi-transparent frosted ivory banner (`#FFF8F5/90 backdrop-blur`) displaying layer count and material highlights.
- Dual action footer: `View Details` (Primary) + `WhatsApp Quote` (Emerald).

### 6.4. Quantity Stepper & Tiered Pricing Indicator

- Counter group: `-` button, center numerical input (`w-16`, bold primary color), `+` button, wrapped in `#F7ECE6` pill.
- Tiered Savings Notice: Integrated callout pill highlighting plate casting discounts for larger quantities.

### 6.5. WhatsApp Dispatch Drawer & Shortlist Dossier

- Dossier Table: High-density rows displaying thumbnail, SKU, material choices, quantity stepper, and per-item bespoke note input field (`Atelier Bespoke Note (विशेष निर्देश)`).
- Live Message Compiler: Dynamic preformatted preview box that compiles selections into an instant WhatsApp URL payload (`wa.me/919876543210?text=...`) and clipboard copy button.

### 6.6. Archival Notice & Bilingual Specimen Ribbons

- Archival Notice: Slim strip at top of catalogue pages displaying season lead times (`Standard Atelier Lead Time: 12-16 Days`) and paper certification (`100% Acid-Free Cotton Rag`).
- Bilingual Ribbon: Elegant divider featuring gold hairline rule + Devanagari calligraphy text (e.g. `शाही वैवाहिक निमंत्रण संग्रह • Handcrafted Heirloom Sets`).

---

---

## 8. Admin Console Design System & Specifications

The Admin Console (`/admin`) is tailored for studio owner Ramesh Patidar to manage the atelier catalogue, live inventory, WhatsApp consultation parameters, and shop configuration. It strictly reuses the existing design tokens (light and dark mode via `next-themes`) without creating a separate color or typography system.

### 8.1. Layout Architecture & Responsive Shell
- **Desktop (>= 768px):** 
  - Fixed left sidebar (`w-72`, 288px) on `--surface-low` background.
  - Fixed top bar (`h-16`, 64px) with glassmorphism blur (`bg-surface/80 backdrop-blur-xl`) and border bottom (`border-border`).
  - Main scrollable workspace with `md:pl-72 pt-16` on `--surface` / `--background`.
- **Mobile (< 768px):**
  - Top header (`h-16`) with hamburger menu trigger, shop title, live status pill, and theme toggle.
  - Slide-in drawer navigation with overlay backdrop.
  - Sticky bottom quick-navigation bar with high-frequency actions: **Dashboard**, **Products**, and **+ Add**.
- **Metadata Protection:**
  - The admin layout injects `<meta name="robots" content="noindex, nofollow" />` across all `/admin/*` routes.

### 8.2. Sidebar & Navigation
- **Header:** Press crest insignia, title *Sanwaliya Admin*, subtitle *Shop Management*, and verified owner chip *Ramesh Patidar (Owner)*.
- **Nav Items:**
  - `Dashboard`: `/admin` (Icon: `LayoutDashboard`)
  - `Products`: `/admin/products` (Icon: `Package` or `Layers`, with dynamic total count badge `48`)
  - `+ Add Product`: `/admin/products/new` (Icon: `PlusCircle`)
  - `Categories`: `/admin/categories` (Icon: `FolderTree`, with *View-only* gold chip)
  - `Shop Settings`: `/admin/settings` (Icon: `Sliders` / `Settings`)
- **Active Navigation State:** Solid `--primary` background (`#5B0617` light / `#D4707F` dark), `--on-primary` text, bold weight, `rounded-lg` with subtle ambient shadow.
- **Inactive State:** `--muted-foreground` with hover background `--surface-container` and smooth transition.
- **Footer Links:** Quick link to *View Public Website* (opens in new tab), theme toggle (Light / Dark / System), and *Sign Out / Logout*.

### 8.3. Data Tables & List Component
- **Paper Matting Aesthetic:** Clean tabular rows styled like artisanal spec sheets resting on `--surface-lowest` cards.
- **Header:** Sticky or static table header on `--surface-container` with uppercase labels (`font-label-sm`).
- **Columns:**
  1. Multi-select Checkbox
  2. Product Specimen & Title (48px square image thumbnail, English title, bilingual Devanagari subtext)
  3. SKU / Code (monospaced badge, e.g. `RM-W-101`)
  4. Category (colored dot + category label)
  5. Catalog Status (Published / Draft badge)
  6. Showcase Star (toggle featured on homepage)
  7. Last Modified Date
  8. Actions (Edit button, Quick View, More menu / Delete)
- **Mobile Fallback (`ProductCardList`):** Responsive touch-friendly card stack for screen widths under 768px displaying thumbnail, title, SKU, price, status badge, and swipe/tap action buttons.
- **Bulk Action Ribbon:** Floats above table when 1 or more items are checked, offering *Publish Selected*, *Move to Draft*, and *Delete Selected*.
- **Pagination:** Per-page dropdown (10, 25, 50), page indicator (*Showing 1 to 10 of 48*), and previous/next stepper.

### 8.4. Forms & Product Editor (`ProductForm`)
- **Structured Sections (`FormSection`):** Grouped into cards with title, icon, and bilingual caption:
  1. *Basic Information:* Product Title, URL Slug (with auto-generation and availability check), Internal SKU Code, Category Selector, Short Description, and Full Artisanal Description.
  2. *Product Images & Gallery (`ImageUploader`):* Drag-and-drop file dropzone, image gallery preview grid, hero selection pill (*MAIN HERO*), alt-text input per image, reorder buttons (Move Up/Down), and delete button.
  3. *Product Options & Specifications:* Dimensions / Sizes, Paper Stocks & GSM, Foil & Print Finishes, Supported Scripts.
  4. *Pricing & Minimum Order:* "Show Price on Public Site" switch toggle. When ON, reveals Starting Price (₹) and Maximum Price (₹) inputs. Minimum Order Quantity (MOQ) input.
  5. *Search, Hindi Keywords & SEO (`TagInput`, `SeoPreview`):* English & Hindi search tags chip manager, plus real-time Google SERP search result crawler preview card.
  6. *Related Products:* Cross-sell product link selector for wedding suites.
  7. *Danger Zone:* Irreversible deletion action with explicit modal confirmation.
- **Sticky Save Bar (`StickySaveBar`):** Persistent bar at bottom of the viewport with *Discard Changes*, *Save Draft*, and *Save & Publish* buttons.
- **Validation:** Zod schema validation with React Hook Form, displaying field-level inline error messages.

### 8.5. Status Badges (`StatusBadge`)
- **Published:** Emerald pill (`bg-tertiary/15 text-tertiary dark:bg-tertiary/20 dark:text-tertiary-foreground`), green pulse dot, label *Published*.
- **Draft:** Amber/Gold pill (`bg-secondary/15 text-secondary dark:bg-secondary/20 dark:text-secondary-foreground`), label *Draft*.
- **Pending Proof / Action Needed:** Rose pill (`bg-destructive/10 text-destructive`).
- **View Only / Fixed:** Surface high container (`bg-surface-high text-muted-foreground`).

### 8.6. Confirm Dialog (`ConfirmDialog`)
- High-contrast modal overlay with backdrop blur, warning insignia, item title & SKU confirmation, explanation of consequences, and explicit *Cancel* and *Delete Product* buttons.

---

## 9. Studio Identity & Business Context

- **Business Name:** Sanwaliya Printing Press (सांवलिया प्रिंटिंग प्रेस)
- **Tagline:** Fine Print Studio & Wedding Stationery • Estd. 1994
- **Physical Studio:** Ramsnehi Patidar Complex, Sadar Bazar, Suwasra (Dist. Mandsaur, M.P.)
- **Studio Timings:** Monday – Saturday: 10:00 AM – 8:30 PM
- **Concierge Phone:** `+91 98765 43210`
- **WhatsApp Concierge Link:** `https://wa.me/919876543210`

---
*Generated directly from Stitch design tokens and screen specifications for Sanwaliya Printing Press.*

