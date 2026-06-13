import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect for logo
  const fullName = 'Pramod Kumar';
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    if (!isDeleting) {
      // Typing
      if (displayText.length < fullName.length) {
        setDisplayText(fullName.slice(0, displayText.length + 1));
      } else {
        // Pause at full name, then start deleting
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
    } else {
      // Deleting
      if (displayText.length > 1) {
        setDisplayText(fullName.slice(0, displayText.length - 1));
      } else {
        // Pause at 'P', then start typing again
        setTimeout(() => setIsDeleting(false), 1200);
        return;
      }
    }
  }, [displayText, isDeleting, fullName]);

  useEffect(() => {
    const speed = isDeleting ? 80 : 120;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' }
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
          ? 'py-4 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/10 text-white'
          : 'py-6 bg-transparent text-white'
          }`}
      >
        <div className="max-w-6xl w-[90%] mx-auto flex items-center justify-between">

          {/* Monogram Logo "G|" */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-0.5 font-sans font-black text-2xl tracking-tighter select-none text-white"
          >
            <span className="inline-block min-w-[1ch]">{displayText}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
              className="text-[#d4f534] inline-block"
            >
              |
            </motion.span>
          </a>

          {/* Nav links (Desktop) */}
          <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-[0.25em]">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className="relative py-1 group transition-colors duration-300 text-white/80 hover:text-[#d4f534] select-none"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#d4f534] transition-all duration-300 group-hover:w-[80%]" />
              </a>
            ))}

            {/* Pill Contact & Circle Arrow Double CTA Buttons */}
            <div className="flex items-center gap-1.5 ml-4 group/contact">
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="px-5 py-2.5 rounded-full text-xs font-mono tracking-wider font-bold transition-all duration-300 bg-white text-black hover:bg-[#d4f534] hover:text-black hover:shadow-[0_0_15px_rgba(212,245,52,0.4)]"
              >
                Contact
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 bg-white text-black hover:bg-[#d4f534] hover:text-black hover:shadow-[0_0_15px_rgba(212,245,52,0.4)]"
              >
                <span className="inline-block transition-transform duration-300 group-hover/contact:rotate-45">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            <span className={`w-6 h-[2px] transition-transform duration-300 bg-white ${mobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
            <span className={`w-6 h-[2px] transition-opacity duration-300 bg-white ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`w-6 h-[2px] transition-transform duration-300 bg-white ${mobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#0A0A0A] z-40 flex flex-col items-center justify-center gap-8 text-white md:hidden"
          >
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className="font-sans font-bold text-3xl tracking-wide hover:text-[#d4f534] transition-colors"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="px-6 py-3 rounded-full border border-white/20 hover:border-[#d4f534] hover:text-[#d4f534] transition-colors font-mono text-sm tracking-widest flex items-center gap-2"
            >
              <span>CONTACT</span>
              <span>↗</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
