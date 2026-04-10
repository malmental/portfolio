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
      <div className='flex justify-between items-center p-5'>
        <a href='/' className='logo text-md font-bold'>
          {navLogoText ? navLogoText : 'Aether.'}
        </a>
        <div className='links'>
          <ul className='hidden md:flex items-center gap-3'>
            {navLinks.map((link) => (
              <li key={link.name} className={MenuLinkStyles}>
                <a href={`${link.href}`}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <motion.div
          className={`flex flex-col md:hidden gap-[3.5px] cursor-pointer z-50 ${
            isToggled ? 'fixed top-6 right-5' : ''
          }`}
          onClick={() => setIsToggled((prev) => !prev)}
        >
          <motion.span
            animate={{
              rotate: isToggled ? 45 : 0,
              translateY: isToggled ? 7 : 0,
              width: isToggled ? 30 : 30,
            }}
            className='w-[30px] h-[2px] bg-black'
          />
          <motion.span
            animate={{ opacity: isToggled ? 0 : 1, width: isToggled ? 0 : 25 }}
            className='w-[20px] h-[2px] bg-black'
          />
          <motion.span
            animate={{
              rotate: isToggled ? -45 : 0,
              translateY: isToggled ? -5 : 0,
              width: isToggled ? 30 : 15,
            }}
            className='w-[15px] h-[2px] bg-black'
          />
        </motion.div>
      </div>
      {isToggled && (
        <motion.div className='md:hidden fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center z-30 bg-white'>
          <motion.ul
            className='flex md:hidden flex-col items-center gap-3'
            variants={container}
            initial='hidden'
            animate='show'
          >
            {navLinks.map((link) => (
              <motion.li variants={item} key={link.name}>
                <a
                  href={link.href}
                  className={subMenuLinkStyles}
                  onClick={() => setIsToggled(false)}
                >
                  {link.name}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </nav>
  );
}
