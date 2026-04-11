import { motion } from 'framer-motion';
import { useState } from 'react';
import { navLogoText } from '../data';

/**
 * =============================================================================
 * NAVBAR.JSX - RESPONSIVE NAVIGATION BAR (REACT COMPONENT)
 * =============================================================================
 *
 * PURPOSE:
 *   Top navigation bar component with responsive behavior. On desktop, displays
 *   horizontal link list. On mobile, transforms into hamburger menu with full-
 *   screen overlay navigation. Uses Framer Motion for smooth animations.
 *
 * PORTFOLIO USE CASE:
 *   - Primary navigation for the entire portfolio
 *   - Appears on all pages (imported in MainSection, BlogLayout, etc.)
 *   - Mobile hamburger menu is a key UI pattern for the artistic, clean aesthetic
 *
 * PROPS:
 *   - navLinks: Array<{ name: string, href: string }> - Navigation link items
 *
 * BEHAVIOR:
 *   - Desktop (md+): Horizontal link list, always visible
 *   - Mobile: Hamburger icon (3 animated spans) that toggles full-screen overlay
 *   - Toggle State: isToggled controls menu open/close with animated transitions
 *   - Animation: Framer Motion stagger for menu item reveal
 *
 * ANIMATION DETAILS:
 *   - Hamburger → X transform: 3 spans animate rotation/position
 *   - Menu reveal: Staggered opacity + slide-in from right (x: 100 → 0)
 *   - Duration: 0.3s transition on links, 1s stagger for menu items
 *
 * MODIFICATION NOTES:
 *   - To change logo behavior: modify navLogoText in data.js
 *   - To add dropdown menus: would need state expansion and conditional rendering
 *   - To change animation: modify Framer Motion variants (container, item)
 *   - Styling: Uses Tailwind classes; lg breakpoint for desktop/mobile toggle
 */

export default function Navbar({ navLinks }) {
  const [isToggled, setIsToggled] = useState(false);
  const subMenuLinkStyles = `text-xl text-slate-700 hover:text-slate-950 transition-all duration-[0.3s]`;
  const MenuLinkStyles = `text-lg text-slate-700 hover:text-slate-950 transition-all duration-[0.3s]`;
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: 100 },
    show: { opacity: 1, x: 0 },
  };
  return (
    <nav className='relative top-0 left-0 w-full'>
      <div className='flex items-center p-5'>
        <span className='logo text-2xl md:text-3xl font-bold text-current'>
          {navLogoText ? navLogoText : 'Ⱦ'}
        </span>
      </div>
    </nav>
  );
}
