/**
 * =============================================================================
 * SALEM'S PORTFOLIO - CENTRALIZED CONTENT CONFIGURATION
 * =============================================================================
 *
 * This file serves as the single source of truth for all portfolio content.
 * Salem: Modify the values below to customize your portfolio. Each exported
 * constant is documented with its purpose, expected format, and usage context.
 *
 * TABLE OF CONTENTS:
 *   1. Global Settings
 *   2. Personal Identity
 *   3. Navigation
 *   4. Hero Section Content
 *   5. About Section Content
 *   6. Blog/Writing Section Content
 *   7. Contact Section Content
 *   8. Skills & Expertise
 *   9. Social/Contact Links
 *   10. Footer Configuration
 */

// =============================================================================
// 1. GLOBAL SETTINGS
// =============================================================================

/**
 * VIEW TRANSITIONS toggle
 * - Enables/disables Astro's built-in page transition animations
 * - Set to FALSE if you experience issues during development
 * - Portfolio Use Case: Leave TRUE for smooth navigation between pages
 */
export const isTransitionEnabled = true;

// =============================================================================
// 2. PERSONAL IDENTITY
// =============================================================================

/**
 * PORTFOLIO OWNER NAME
 * - Displayed prominently in the Hero Section (MainSection)
 * - Format: String (your artistic/dev name or full name)
 * - Example: 'Salem' or 'Salem Dev Studio'
 */
export const myName = 'Salem, developer';

/**
 * NAVIGATION LOGO TEXT
 * - Appears in the top-left corner of the Navbar
 * - Format: String (typically your name or brand identifier)
 * - Portfolio Use Case: Could be 'Salem', 'Slem', or your creative alias
 */
export const navLogoText = '{}';

// =============================================================================
// 3. NAVIGATION
// =============================================================================

/**
 * NAVIGATION LINKS
 * - Defines the navigation menu items shown in Navbar and Footer
 * - Format: Array of objects { name: string, href: string }
 * - Portfolio Use Case: Add/remove links as your portfolio sections grow
 * - Note: The href '/#about' format enables smooth scroll to sections
 */
export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Blog', href: '/#blog' },
  { name: 'Contact', href: '/#contact' },
];

// =============================================================================
// 4. HERO SECTION CONTENT (MainSection)
// =============================================================================

/**
 * HERO BIOGRAPHY
 * - The introductory paragraph that appears below your name in the hero
 * - Format: String (supports multi-line with backticks)
 * - Portfolio Use Case: Write a compelling 2-3 sentence introduction that
 *   captures your artistic dev approach and current focus
 */
export const myBio = `A passionate Fullstack developer. I like to construct cross-platform software and I'm huge IA enthusiast. Always contribuiting for plus collabs and team growth.`;

// =============================================================================
// 5. ABOUT SECTION CONTENT (AboutSection)
// =============================================================================

/**
 * EXTENDED BIOGRAPHY
 * - Longer biography text displayed in the About section
 * - Format: String (supports multi-line with backticks)
 * - Portfolio Use Case: Share your background, interests, and what drives you
 *   as an artistic developer
 */
export const aboutMe =
  'I work mainly with Laravel, PHP and MySQL. I`m open for the best adaptive front framework according needs.';

// =============================================================================
// 6. BLOG/WRITING SECTION CONTENT (BlogSection)
// =============================================================================

/**
 * WRITING SECTION SUBTEXT
 * - Descriptive text that appears below the "Writing" heading
 * - Format: String (supports multi-line with backticks)
 * - Portfolio Use Case: Set the tone for your blog - could be philosophical,
 *   technical, or artistically phrased like the current example
 */
export const writingText = `I'm currently studying at the IT Academy at Barcelona Activa. Here's a quick shot of my latest webb appliction, an Incident Manager with tags, nested comments and filter search for statisics.`;

// =============================================================================
// 7. CONTACT SECTION CONTENT (ContactSection)
// =============================================================================

/**
 * CONTACT SECTION SUBTEXT
 * - Introductory text before the social link buttons
 * - Format: String (supports multi-line with backticks)
 * - Portfolio Use Case: Invite visitors to connect, collaborate, or reach out
 */
export const contactText = `Based in Barcelona, do not hesitate to contact me if any inquier, collab idea or just simply conect and share knowledge, this would the best!.`;

// =============================================================================
// 8. SKILLS & EXPERTISE (SkillsBox in AboutSection)
// =============================================================================

/**
 * TECHNICAL SKILLS LIST
 * - Skills displayed as pill badges in the About section
 * - Format: Array of strings
 * - Portfolio Use Case: List technologies, tools, and creative skills
 * - Note: Order matters - most important/recent should be first
 */
export const skills = [
  'Laravel',
  'API REST',
  'PHP',
  'React',
  'Tailwind CSS',
  'IA',
  'MySQL',
  'GitFlow',
  'LLM',
];

// =============================================================================
// 9. SOCIAL/CONTACT LINKS (ContactSection)
// =============================================================================

/**
 * CONTACT & SOCIAL MEDIA LINKS
 * - Links displayed in the Contact section (GitHub, LinkedIn, etc.)
 * - Format: Array of objects { name: string, link: string }
 * - Portfolio Use Case: Point to your professional profiles and presence
 * - Modification Note: Currently limited to 4 links displayed vertically;
 *   consider adding an email link (mailto:) as an alternative
 */
export const contactOptions = [
  { name: 'Github', link: 'https://github.com/malmental' },
  { name: 'LinkedIN', link: 'https://www.linkedin.com/in/orlando-rojas-oyarz%C3%BAn/' },
];

// =============================================================================
// 10. FOOTER CONFIGURATION
// =============================================================================

/**
 * FOOTER ATTRIBUTION TOGGLE
 * - Reserved for future use if attribution is needed
 * - Format: Boolean (true = show, false = hide)
 */
export const showDeveloperText = false;
