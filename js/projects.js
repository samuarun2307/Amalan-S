/**
 * AMALAN S — Portfolio · projects.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Central data source for the Selected Work / Portfolio section.
 *
 * HOW TO UPDATE:
 *   • Replace every  "PLACEHOLDER — …"  Behance URL with your real project URL.
 *   • To add a project, copy one object and paste it into the PROJECTS array.
 *   • Categories must match one of the CATEGORIES values below.
 *
 * BEHANCE PROFILE URL:
 *   Update BEHANCE_PROFILE_URL with your Behance profile link.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Your Behance profile — used for the section header link and "View All" card */
var BEHANCE_PROFILE_URL = 'https://www.behance.net/samalanbetech';

/**
 * Category keys — must match the data-category attributes on filter buttons in index.html
 */
var CATEGORIES = {
  ALL:              'all',
  UIUX:             'uiux',
  LOGOS:            'logos',
  CREATIVE_POSTERS: 'creative-posters',
  PACKAGING:        'packaging',
  VIDEO_EDITING:    'video-editing',
};

/**
 * PROJECTS array — each object defines one project card.
 *
 * Fields:
 *   id          — unique slug (no spaces)
 *   title       — card heading text
 *   subtitle    — short label shown under title on compact cards
 *   category    — one of the CATEGORIES values
 *   image       — relative path to cover image from index.html
 *   imageAlt    — descriptive alt text for accessibility
 *   objectPos   — CSS object-position for image crop control
 *   year        — optional year string
 *   behanceUrl  — full Behance project URL (replace PLACEHOLDERs below)
 *   cardStyle   — 'large' (top/mid rows, tall image + full button)
 *                 'small' (compact card, arrow-icon button)
 *
 * ⚠️  BEHANCE URLs NEEDED:
 *   All 8 project URLs below are marked PLACEHOLDER.
 *   Replace each with your real Behance project link.
 */
var PROJECTS = [

  /* ── TOP ROW: 3 large UIUX cards ── */
  {
    id:        'farmer-application',
    title:     'Farmer Application',
    subtitle:  'UI/UX Design',
    category:  CATEGORIES.UIUX,
    image:     'assets/images/projects/farmer-application.png',
    imageAlt:  'Farmer Application — mobile app UI on two iPhone mockups with green agricultural branding',
    objectPos: 'center center',
    year:      '2024',
    behanceUrl:'https://www.behance.net/gallery/227710989/UIUX-Case-Study-for-PAYIR-THOLAN',
    cardStyle: 'large',
  },
  {
    id:        'cleaning-services',
    title:     'Cleaning Services',
    subtitle:  'UI/UX Design',
    category:  CATEGORIES.UIUX,
    image:     'assets/images/projects/cleaning-services.png',
    imageAlt:  'Cleaning Services — website UI on desktop and tablet mockup with purple colour scheme',
    objectPos: 'center center',
    year:      '2024',
    behanceUrl:'https://www.behance.net/gallery/228093089/Website-Redesign-For-Al-Allam-Cleaning-Services',
    cardStyle: 'large',
  },
  {
    id:        'healthcare',
    title:     'Healthcare',
    subtitle:  'UI/UX Design',
    category:  CATEGORIES.UIUX,
    image:     'assets/images/projects/healthcare.png',
    imageAlt:  'Healthcare app — mobile UI on three iPhone mockups with teal and white medical branding',
    objectPos: 'center center',
    year:      '2024',
    behanceUrl:'https://www.behance.net/gallery/230320295/UIUX-Case-study-For-%28Nalanai-Thedi%29-Healthcare',
    cardStyle: 'large',
  },

  /* ── MIDDLE ROW: 1 large UIUX card + 2 small cards ── */
  {
    id:        'social-media-influencer',
    title:     'Social Media',
    subtitle:  'UI/UX Design',
    category:  CATEGORIES.UIUX,
    image:     'assets/images/projects/social-media-influencer.png',
    imageAlt:  'Influnex social media platform — landing page UI on a laptop mockup with dark green background',
    objectPos: 'center center',
    year:      '2024',
    behanceUrl:'PLACEHOLDER_SOCIAL_MEDIA_UIUX',
    cardStyle: 'large',
  },
  {
    id:        'logo-design-collection',
    title:     'Logo Design Collection',
    subtitle:  'Branding / Identity',
    category:  CATEGORIES.LOGOS,
    image:     'assets/images/projects/logo-design-collection.png',
    imageAlt:  'Logo Design Collection — grid of various logo designs on dark background',
    objectPos: 'center center',
    year:      '2024',
    behanceUrl:'PLACEHOLDER_LOGO_COLLECTION',
    cardStyle: 'small',
  },
  {
    id:        'social-media-design',
    title:     'Social Media Design',
    subtitle:  'Creative Poster',
    category:  CATEGORIES.CREATIVE_POSTERS,
    image:     'assets/images/projects/social-media-design.png',
    imageAlt:  'Social Media Design — vibrant social media posters including a purple 3D badge and movie posters',
    objectPos: 'center center',
    year:      '2024',
    behanceUrl:'PLACEHOLDER_SOCIAL_POSTER',
    cardStyle: 'small',
  },

  /* ── BOTTOM ROW: 2 small cards ── */
  {
    id:        'menu-card-design',
    title:     'Menu Card Design',
    subtitle:  'For SAARAL Bakery',
    category:  CATEGORIES.CREATIVE_POSTERS,
    image:     'assets/images/projects/menu-card-design.png',
    imageAlt:  'Menu Card Design — food menu spread open showing burger and drinks for SAARAL Bakery',
    objectPos: 'center top',
    year:      '2024',
    behanceUrl:'PLACEHOLDER_MENU_CARD',
    cardStyle: 'small',
  },
  {
    id:        'packaging-design',
    title:     'Packaging Design',
    subtitle:  'Diwali Sweet Box',
    category:  CATEGORIES.PACKAGING,
    image:     'assets/images/projects/packaging-design.png',
    imageAlt:  'Packaging Design — Diwali sweet box in red and gold next to a plate of sweets',
    objectPos: 'center center',
    year:      '2024',
    behanceUrl:'PLACEHOLDER_PACKAGING',
    cardStyle: 'small',
  },
];
