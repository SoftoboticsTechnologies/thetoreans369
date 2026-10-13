# Toreans Diagnostics – Static Homepage

A responsive, dependency-free rebuild of the homepage at https://thetoreans369.com/,
using the original logo, photographs, copy, packages, prices and contact details.

Built with plain **HTML5, CSS3 and vanilla JavaScript**. No build step, backend or database.

## Run locally

Open `index.html` directly in a browser, or serve the folder (recommended, so paths behave
exactly as they will in production):

```bash
# Python 3
python -m http.server 8080
# or Node
npx serve .
```

Then visit http://localhost:8080.

## Structure

```text
toreans-diagnostics/
├── index.html          # homepage: header, all sections, footer, inline SVG icon sprite
├── faq/index.html      # FAQ page (keeps the live /faq/ URL)
├── blood-tests/index.html  # Blood Tests page (keeps the live /blood-tests/ URL)
├── popular-tests/index.html  # Popular Tests page (keeps the live /popular-tests/ URL)
├── health-risks-tests/index.html  # Health Risks Tests page (/health-risks-tests/)
├── best-packages/index.html       # Best Packages page (/best-packages/)
├── about-us/index.html            # About Us (/about-us/)
├── our-services/index.html        # Our Services (/our-services/) – target of the homepage "View More"
├── echo/ ecg/ ultrasound/ digital-x-ray/   # service pages, each with index.html
├── news/index.html          # News listing (/news/)
├── why-regular-blood-tests-are-important-for-your-health/index.html
├── 7-healthy-heart-tips-you-need-to-know/index.html
├── 5-easy-tips-to-stay-healthy-during-the-monsoon/index.html   # article pages, live slugs kept
├── css/style.css       # design tokens, layout, components, breakpoints
├── js/main.js          # nav drawer, dropdowns, sticky header, hero slideshow,
│                       # form validation, testimonial carousel, WhatsApp float
├── assets/
│   ├── logos/          # original logo (transparent PNG + original non-transparent)
│   ├── icons/          # original favicons
│   └── images/         # original photos and service icons
└── README.md
```

## Design system

| Token | Value | Source |
|---|---|---|
| `--color-primary` | `#0EB0BF` | brand teal used throughout the source site |
| `--color-primary-strong` | `#087C88` | same teal, darkened so white button text / teal link text meets WCAG AA |
| `--color-navy` | `#1C2A4D` | source global primary colour / logo navy |
| `--color-overlay` | `#000F47` | source hero overlay gradient |
| `--color-section` | `#F1FBFB` | source pale aqua (`#F3FFFE`), very slightly deepened so it reads on screens |
| Fonts | Lato (headings), Source Sans 3 (body) | source site uses Lato and Source Sans Pro |

Breakpoints: ≥1440 large desktop · 1140 nav collapses to drawer · 1023 tablet (stacked layouts) · 767 mobile · 359 small mobile.

## Asset map (all downloaded from the live site, `wp-content/uploads/2024/08/`)

| Section | Local file | Original file |
|---|---|---|
| Logo (header, drawer, footer) | `logos/toreans-logo.png` | `Screenshot_2024-09-08_045548-removebg-preview.png` |
| Hero slideshow (3 slides, fade + Ken Burns, as on source) | `hero-1/2/3.jpg` | `friendly-hospital-phlebotomist-…-1-scaled.jpg`, `lab-3498584_1920.jpg`, `laboratory-3827745_1280.jpg` |
| What We Offer icons | `service-blood-tests/ultrasound/ecg.png` | `Screenshot-2024-08-22-073820/073550/073633.png` |
| Affordable Check-Up Packages | `packages-1.jpg`, `packages-2.jpg` | `2149404714.jpg`, `coronavirus-blood-samples-assortment-lab-scaled.jpg` |
| Vision / Mission / Values | `vision-1.jpg`, `vision-2.jpg` | `skillful-nurse-is-doing-blood-test-…jpg`, `hand-doctor-holding-blood-test-tube-…jpg` |
| Highly Competent Team (background) | `team-bg.jpg` | `48114.jpg` |
| Why Toreans Diagnostics? | `why-1/2/3.jpg` | `biology-220005_1280.jpg`, `lab-3498585_1280.jpg`, `lab-313864_1280.jpg` |
| Advanced Equipment | `equipment.jpg` | `equipment-3089883_1280.jpg` |
| Testimonials | `testimonials.jpg` | `13862360_5374800-1.jpg` |
| News & Article | `news-blood-tests/heart/monsoon.jpg` | `close-up-doctor-holding-blood-sample-scaled.jpg`, `2148631023.jpg`, `corn-on-the-cob-4432372_1920.jpg` |
| Have Any Question? (background) | `contact-bg.jpg` | `hand-with-protective-gloves-holding-blood-samples-covid-test-scaled.jpg` |

Large backgrounds were resized to ≤1920px and recompressed (JPEG q80); WordPress's
pre-generated 768/1024/1536px sizes were used for the other images.

## FAQ page (`faq/index.html`)

Rebuilt from https://thetoreans369.com/faq/ using the live page's own style values:
- teal top bar `#0EB0BF`
- "FAQs" heading, with the six Q&As in a 2-column grid (1 column on mobile) and the solid
  Font Awesome `question-circle` icon in teal at 22px
- "Have Any Question?" banner using the original lab photo, the source overlay
  `linear-gradient(280deg, #1C2A4D, #1C2A4D61)` and a fixed background on desktop
- black three-column footer (brand · Quick Links · Contact Info) with the copyright line
  and social links in the bottom row

The answers are visible by default. The source page has no accordion, so none was added.

These source-page variants are opt-in modifier classes (`.topbar--brand`, `.cta--classic`,
`.site-footer--classic`), so the homepage keeps its own navy bar and 4-column footer. Header
and footer markup is repeated in each HTML file because there is no build step. Keep them in
sync when editing.

Two deliberate deviations, both for WCAG AA contrast:
- FAQ answers use the muted grey-blue `#6B7889`. The source's `#8B8B8B` is 3.5:1 on white.
- The footer logo sits on a white plate, because the logo's navy lettering is invisible on black.

The source's white text on the teal top bar is about 2.6:1. It was kept to match the
reference, but it fails AA. Switching that text to navy (`#1C2A4D`) would bring it to 5.4:1.

## Blood Tests page (`blood-tests/index.html`)

Rebuilt from https://thetoreans369.com/blood-tests/. It uses the same source-site header and
footer as the FAQ page.

Sections, in source order:
1. Main image (`assets/images/blood-tests-main.jpg`, originally `2149107259.jpg`) with
   "Blood Tests in Patna", "Our Blood Tests", "Home-Based Sample Collection" and
   "Competent Staff"
2. A sticky sidebar holding the navy "Book Lab Tests at Home" card (corners 40/40/40/10px, as
   on the source) and the "Other Service" links
3. The booking form in a teal card, beside the testimonial carousel, on the source's
   pale-aqua/white split background
4. News & Article
5. The "Have Any Question?" banner

Content notes:
- **The test list follows the live page,** not the reference brief: Blood Glucose Testing,
  Lipid Profile, Liver Function Test, Kidney Function Test.
- **Kept verbatim from the source:** the typo "Toneans Diagnostic" (flagged with an HTML
  comment), the singular heading "Other Service", and "Book Lab Tests at Home".
- **Teal form card:** it uses `#087C88` rather than the source's `#1FAF9E`, so the white
  labels meet AA contrast. Error messages show as white pills, so they stay readable on teal.

## Popular Tests page (`popular-tests/index.html`)

Rebuilt from https://thetoreans369.com/popular-tests/ on the same template as Blood Tests.

Sections, in source order:
1. Main image (`assets/images/popular-tests-main.jpg`, originally
   `pharmacist-writing-on-clipboard-and-holding-medicine-jar-at-the-hospital-pharmacy.jpg`),
   the source's headline and full article text, and the same sidebar as Blood Tests
2. "Our Best Packages", reusing the homepage pricing component. It is part of the source page.
3. Booking form and testimonials
4. News & Article, placed after the main content
5. The "Have Any Question?" banner

The three "Quick Peek" items are plain paragraphs on the source. Here they are shown as a list,
with the label before each colon in bold. The wording is unchanged.

## Health Risks Tests page (`health-risks-tests/index.html`)

Rebuilt from https://thetoreans369.com/health-risks-tests/ on the Popular Tests template. It
uses the same pharmacist photo as the source, which is also the Popular Tests image.

**Article text:** all 391 words match the source.
- The "Packages We Offer" and "Why Torean Diagnostics?" points are shown as lists with bold
  labels.
- The source runs some sentences together ("results.Advanced", "needs.Book"). A space was added
  at those joins, and "Book your health checkup today." is set as its own line.

**Packages:** as on the source, "Our Best Packages" sits inside the article column, below the
text. It has 3 cards:

| Package | Price | MRP |
|---|---:|---:|
| Arthritis Basic Screening | ₹1,199 | ₹4,000 |
| Diabetic Screening | ₹999 | ₹3,000 |
| Fever Profile | ₹1,499 | ₹4,290 |

The cards show 3 per row on desktop, 2 on tablet and 1 on mobile.

**Content flagged for review (kept verbatim, marked with HTML comments):**
- **"At Portea, we believe that quality healthcare…"** names a different healthcare company.
  It almost certainly should say Toreans Diagnostics.
- The heading reads **"Why Torean Diagnostics?"**, not "Toreans".
- Typos in the test names:
  - "Calcuim"
  - "Rheumatoid factor (RF)" listed twice
  - "Hbac1"
  - "28 OH Vitamin D", probably "25 OH"
  - "Transferrain"
  - "Urnine Complete"

## Best Packages page (`best-packages/index.html`)

Rebuilt from https://thetoreans369.com/best-packages/ on the Health Risks Tests template. It
uses the same pharmacist photo as the source.

**Article text:** all 312 words match the source. The two "Specialized Health Packages" items
(Cardiac and Diabetes) are shown as a list with bold labels.

**Packages:** "Our Best Packages" sits inside the article column, as on the source.
- The four cards are copied from the homepage component. Prices, MRPs and test lists were
  verified against the source page:

  | Package | Price | MRP | Tests |
  |---|---:|---:|---:|
  | Basic Health Checkup | ₹899 | ₹2,532 | 6 |
  | Full Body Checkup | ₹1,299 | ₹4,000 | 9 |
  | Women Health Checkup | ₹2,199 | ₹7,330 | 10 |
  | Summer Health Checkup | ₹2,199 | ₹4,290 | 14 |

- **Layout:** 4 across at 1280px and wider; 2 across from 768px up to 1279px, including 1024px
  with the sidebar beside them; 1 across on mobile.
- **Alignment:** headers reserve two lines for the package name, so prices and dividers line
  up. Book Now buttons align along the bottom.

## About Us and the four service pages

**`about-us/index.html`** follows https://thetoreans369.com/about-us/ in this order:
1. The "Keep Yourself Healthy and Fit" title.
2. The doctor photo beside "Our Journey…" and the "Home Sample Collection Available" card.
   The source uses this photo twice (`17818.jpg` and `17818-1.jpg` are byte-identical), so it
   is shown once.
3. "We Always Serve you Better Everydays" (Vision/Mission/Values), reusing the homepage
   component on light cyan.
4. "Our Commitment to Excellence", over the original `64606.jpg` with the source's navy gradient.
5. The "Have Any Question?" banner.

Like the source, it has no testimonials or News section. All 236 words match the source.

**`echo/`, `ecg/`, `ultrasound/`, `digital-x-ray/`** are generated from the Blood Tests template.

- **Article text** is generated directly from the extracted source text and verified word for
  word across the whole article: 330, 388, 389 and 445 words.
- **Original images:**

  | Page | Image | Original file |
  |---|---|---|
  | Echo | `echo-main.jpg` | `29063.jpg` |
  | ECG | `ecg-main.jpg` | `65797.jpg` |
  | Ultrasound | `ultrasound-main.jpg` | `2149353023.jpg` |
  | Digital X-Ray | `digital-x-ray-main.jpg` | `14350.jpg` |

- **"Other Service":** each page lists the same five services as the source, with the page
  itself replaced by Blood Tests in its slot.
- **Source wording kept:** "…for Your Echo **Tests**?" and the em dash in "Patna—Toreans
  Diagnostics".
- **Content flagged for review:** on `/ecg/`, the **"What is an ECG Test?"** paragraph is an
  exact duplicate of "Affordable ECG Testing Services". The source never says what an ECG is.
  It is kept verbatim and marked with an HTML comment.

**Canonical URLs:** every page's `<link rel="canonical">` and `og:url` are the absolute live
URL for its route. The homepage now has one too: `https://thetoreans369.com/`.

**Not rebuilt locally (links still go to the live site):**
- `/surgical/` (Our Services "Surgical Tests" card)
- `/category/health/`
- the pingback source `/elementor-756/`

## Our Services page (`our-services/index.html`)

Rebuilt from https://thetoreans369.com/our-services/. The homepage "What We Offer" → **View
More** button now links here.

**Layout, as on the source:**
1. The "What We Offer" intro with the source subtitle, beside the booking form (the homepage's
   form component).
2. The five service cards: 3 per row with the last two centred; 2 per row on tablet; 1 on
   mobile.
3. The testimonials block with its illustration and "Trusted Diagnostic" label.
4. News & Article, the "Have Any Question?" banner, and the footer.

**Services:** the descriptions are verbatim from the source.

| Service | Icon | Read More |
|---|---|---|
| Blood Tests | existing icon | `../blood-tests/index.html` |
| ECG | existing icon | `../ecg/index.html` |
| Ultrasound | existing icon | `../ultrasound/index.html` |
| Digital X-Ray | new: `service-digital-x-ray.png` (`8329980-removebg-preview.png`) | `../digital-x-ray/index.html` |
| Surgical Tests | new: `service-surgical.png` (`8206777.png`) | live `/surgical/` (not rebuilt locally) |

The icons are shown at a consistent 92px height.

**Content to review:** the homepage's three "What We Offer" cards still use the source
homepage's "Lorem ipsum" placeholder copy. This page has real one-line descriptions for the same
services, which could replace the placeholders. They were left unchanged here because the
homepage wasn't in scope.

## News listing and article pages

**`news/index.html`** follows https://thetoreans369.com/news/:
- the sidebar on the left: News Category (Health), Event News (the 3 articles with their
  August 22, 2024 dates), and the "Contact Us for Detail." card
- the card uses the original pill photo (`assets/images/news-contact-bg.jpg`, originally
  `flying-pill-tablet-capsule-levitation-…jpg`) with the source's `#1A1A1A` overlay at 60% and
  40/5/40/30px corners
- the 3 article cards on the right, with their original images, dates and excerpts
- like the source, the page has no "Have Any Question?" banner

**The three article folders** keep the live slugs at the site root:
- The body text is extracted from the live pages and is verified word for word (396, 764 and
  686 words), with every heading and inline link. Only WordPress block classes and stray
  leading `<br>`s were removed.
- Inline links to Blood Tests and Popular Tests point at the local pages. The ECG link stays live.
- The live pages show no title heading. A heading with the article title, date and Health tag
  was added for semantics and SEO.
- The blood-tests article keeps its one "response". It is a **pingback** from the site's own
  `Elementor #756` page, not a reader comment, and is shown as one. The other two articles have
  no responses.

**Comment forms** keep the WordPress fields:
- Comment, Name, Email, Website, the "Save my name…" checkbox and Post Comment
- the hidden `comment_post_ID` for each post (552, 549 and 546)

They post natively to the existing backend, `https://thetoreans369.com/wp-comments-post.php`.
WordPress then handles moderation and its own confirmation page, so the visitor ends up on the
live site after submitting. The site adds client-side validation before the form is sent. It
also stores the saved name, email and website in `localStorage`, which stands in for
WordPress's cookie on a static site.

**Not built locally:** the "Health" category archive (`/category/health/`) still links to the
live site.

## Footer attribution ("Powered by DripFunnel")

Every page's footer bottom bar has "Powered by" plus the existing
`assets/images/dripfunnel-logo.png` in the far right.
- The copyright stays on the left. The social icons sit beside the attribution.
- The whole attribution is one link to https://www.dripfunnel.com/in/. It opens in a new tab
  with `rel="noopener noreferrer"`.
- The logo is shown at 116px wide on a small white plate. Its dark-blue lettering is
  unreadable directly on the dark footer; the footer's own logo gets the same treatment.
- On mobile the items stack.
- The floating WhatsApp button hides while the bottom bar is on screen, so it can't cover the
  attribution.

## Links and functionality

- **Inner pages** (About, FAQ, Blood Tests, Popular Tests, Health Risks Tests, Best Packages,
  News, ECHO, ECG, Ultrasound, Digital X-Ray, Our Services, articles) link to their existing
  URLs on https://thetoreans369.com/. All were verified to return HTTP 200. When those pages
  are rebuilt, swap the absolute URLs for local paths.
- **Booking / WhatsApp:** every booking CTA uses the source site's destination,
  `https://api.whatsapp.com/send?phone=916287995812`. The floating button uses the same number
  as the source "Start a Conversation" widget and hides while the booking form is on screen.
- **Service "Read More" links** were `#` on the source. They now point to the matching existing
  pages (`/blood-tests/`, `/ultrasound/`, `/ecg/`).
- **Footer "Home"** was `#` on the source. It now links to `index.html`.
- **FAQ** links (About submenu, footer) now point to the local `faq/index.html`.
- **Blood Tests** links (Pathology submenu, footer, homepage service card) now point to the local `blood-tests/index.html`.
- **Popular Tests** links (Pathology submenu, homepage "Popular Health Packages" card, homepage footer) now point to the local `popular-tests/index.html`.
- **Our Services** links (homepage "View More" button and footer "Our Services") now point to the local `our-services/index.html`.
- **About Us, ECHO, ECG, Ultrasound, Digital X-Ray** links (nav, footer Quick Links, "Other Service" sidebars, article inline links) now point to the local pages.
- **Best Packages** links (Pathology submenu, homepage footer) now point to the local `best-packages/index.html`.
- **Health Risks Tests** links (Pathology submenu, homepage card and footer, "Other Service" sidebars) now point to the local `health-risks-tests/index.html`.
- **News** links (nav, the "News & Article" Read More button) and the **article** links (titles, images, Read More) on every page now point to the local pages.

### Booking form – needs configuration for real submissions

The source form used WordPress Contact Form 7, which a static site cannot run. The form keeps
the original three fields (Name, Number, Subject with a "Message" placeholder) and validates
them on the client.

- **Default (no setup):** on a valid submit it opens WhatsApp to +91 62879 95812 with the
  details pre-filled. The user still has to press send, and the form says so. Nothing is
  sent silently and no fake "success" is shown.
- **To send directly:** set `FORM_ENDPOINT` at the top of `js/main.js` to a form service URL
  (Formspree, Getform, Web3Forms, or your own API). The form will then POST its fields
  (`your-name`, `tel-956`, `Subject`) and report the real success or failure.

## Content flagged for review (kept verbatim from the source, not rewritten)

1. **What We Offer:** all three service descriptions are "Lorem ipsum" placeholder text on the
   live site. They are marked in `index.html` with an HTML comment and
   `data-content-review="placeholder"`. Supply approved copy before launch.
2. **Source typos preserved as-is:** "Everydays" (Vision heading), "wwhether" (Full Testing),
   "Hba1c (While Blood)" (probably "Whole Blood"), "FSH/LH/Protaction" (probably "Prolactin"),
   "CBS (Complete Blood Count- 28)" (probably "CBC"), "What Our Customer Say".
3. **Article excerpts** are cut off mid-sentence on the source. An ellipsis was added; the text is otherwise unchanged.
4. **Package cards** on the source contained empty "-" filler rows to equalise heights. These
   were dropped; card heights are now equalised with CSS. No package was marked
   "recommended", because the source gives no basis for it.

## Not available / not included

- The three screenshots referenced in the brief were **not present** in the project folder.
  The live website was used as the sole source of truth.
- No source images are missing; every image referenced on the homepage was downloaded.
- Eyebrow labels above section headings (e.g. "Our Services", "Why Choose Us") are short
  navigational labels added for the new design; they make no medical or business claims and
  can be removed in `index.html`.
