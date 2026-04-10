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
 *   8. Project Showcase
 *   9. Skills & Expertise
 *   10. Work History
 *   11. Social/Contact Links
 *   12. Footer Configuration
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
export const myName = 'John Doe';

/**
 * NAVIGATION LOGO TEXT
 * - Appears in the top-left corner of the Navbar
 * - Format: String (typically your name or brand identifier)
 * - Portfolio Use Case: Could be 'Salem', 'Slem', or your creative alias
 */
export const navLogoText = 'John Doe';

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
export const myBio = `A passionate web developer with a knack for creating dynamic and responsive web applications. With a background in computer science and a love for coding, I thrive on turning ideas into reality through technology.`;

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
  'I specialize in front-end development with a focus on creating user-friendly interfaces. My skills include HTML, CSS, JavaScript, and frameworks like React and Vue.js. I also have experience in back-end development using Node.js and Express, making me a versatile full-stack developer.';

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
export const writingText = `I typically keep my words few, but when I do pen them, it's a glimpse into my passions and my adventure through the digital landscape.`;

// =============================================================================
// 7. CONTACT SECTION CONTENT (ContactSection)
// =============================================================================

/**
 * CONTACT SECTION SUBTEXT
 * - Introductory text before the social link buttons
 * - Format: String (supports multi-line with backticks)
 * - Portfolio Use Case: Invite visitors to connect, collaborate, or reach out
 */
export const contactText = `I'd love to hear from you! Whether you have questions, collaboration ideas, or just want to connect, feel free to reach out. I'm always open to engaging conversations and exploring new opportunities.`;

// =============================================================================
// 8. PROJECT SHOWCASE (SelectedProjectBox in MainSection)
// =============================================================================

/**
 * FEATURED PROJECTS SIDEBAR
 * - Projects displayed in the right sidebar of the Hero Section
 * - Format: Array of objects { name: string, link: string }
 * - Portfolio Use Case: Showcase your best 3-5 recent works with links to
 *   live demos, repositories, or case studies
 * - Modification Note: These appear ONLY in the hero section; if you want a
 *   full projects page, that would require a new section component
 */
export const selectedProjects = [
  { name: 'Project 1', link: '#' },
  { name: 'Project 2', link: '#' },
  { name: 'Project 3', link: '#' },
  { name: 'Project 4', link: '#' },
];

// =============================================================================
// 9. SKILLS & EXPERTISE (SkillsBox in AboutSection)
// =============================================================================

/**
 * TECHNICAL SKILLS LIST
 * - Skills displayed as pill badges in the About section
 * - Format: Array of strings
 * - Portfolio Use Case: List technologies, tools, and creative skills
 * - Note: Order matters - most important/recent should be first
 */
export const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Express',
  'Nodejs',
  'MongoDB',
  'Git',
  'GitHub',
  'Astrojs',
  'TailwindCSS',
];

// =============================================================================
// 10. WORK HISTORY (WorkExperienceBox in AboutSection)
// =============================================================================

/**
 * PROFESSIONAL EXPERIENCE
 * - Work history displayed in the About section sidebar
 * - Format: Array of objects with:
 *     - organisationName: string (company/client name)
 *     - position: string (your role/title)
 *     - date: string (employment period)
 *     - info: array of strings (bullet points describing achievements)
 * - Portfolio Use Case: Highlight relevant professional experiences,
 *   collaborations, or notable projects
 * - Note: Displayed in sidebar on desktop, stacked on mobile
 */
export const workExperiences = [
  {
    organisationName: 'company 1',
    position: 'Intern',
    date: '2022 - 2023',
    info: ['I worked on this', 'I showed this skills'],
  },
  {
    organisationName: 'company 2',
    position: 'UI/UX Designer',
    date: '2024 - present',
    info: ['I worked on this', 'I showed this skills'],
  },
  {
    organisationName: 'company 3',
    position: 'React Developer',
    date: '2022 - 2023',
    info: ['I worked on this', 'I showed this skills'],
  },
];

// =============================================================================
// 11. SOCIAL/CONTACT LINKS (ContactSection)
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
  { name: 'Github', link: 'https://github.com' },
  { name: 'Instagram', link: 'https://instagram.com' },
  { name: 'LinkedIN', link: 'https://linkedin.com' },
  { name: 'X', link: 'https://x.com' },
];

// =============================================================================
// 12. FOOTER CONFIGURATION
// =============================================================================

/**
 * FOOTER ATTRIBUTION TOGGLE
 * - Controls whether "maintained by" text appears in the footer
 * - Format: Boolean (true = show, false = hide)
 * - Portfolio Use Case: Set to FALSE once you've customized the theme
 *   beyond recognition (or if you want to remove the original author credit)
 */
export const showDeveloperText = true;
