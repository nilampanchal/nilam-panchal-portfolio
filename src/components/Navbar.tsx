import { useState, useEffect } from 'react';
import { Menu, X, FileText, Send, Sun, Moon, Keyboard } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenShortcuts: () => void;
}

export function Navbar({ onOpenResume, theme, onToggleTheme, onOpenShortcuts }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-md shadow-slate-900/5 dark:shadow-black/20 py-2.5 sm:py-3'
          : 'bg-transparent py-3.5 sm:py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          id="nav-brand-logo"
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-mono font-bold text-white shadow-md shadow-emerald-900/40 group-hover:scale-105 transition-transform">
            NP
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 dark:text-white tracking-tight text-base sm:text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Nilam Panchal
            </span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline-block">
              Python & Full-Stack Dev
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/80 dark:bg-slate-900/70 border border-slate-200/90 dark:border-slate-800/80 rounded-full px-3 py-1.5 backdrop-blur-sm shadow-xs">
          {navLinks.map((link) => (
            <a
              key={link.name}
              id={`nav-link-${link.name.toLowerCase()}`}
              href={link.href}
              className="px-3.5 py-1 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-all duration-150"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Theme Toggle Button with M shortcut hint */}
          <button
            id="btn-nav-theme-toggle"
            type="button"
            onClick={onToggleTheme}
            className="group relative inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-800 transition-all"
            title={`Toggle Theme [M] (Current: ${theme === 'dark' ? 'Dark' : 'Light'})`}
            aria-label={`Toggle Theme. Shortcut: M. Current: ${theme}`}
          >
            {theme === 'dark' ? (
              <Sun className="h-3.5 w-3.5 text-amber-400 transition-transform group-hover:rotate-45" />
            ) : (
              <Moon className="h-3.5 w-3.5 text-cyan-600 transition-transform group-hover:-rotate-12" />
            )}
            <kbd className="hidden lg:inline-block px-1.5 py-0.2 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[10px] font-mono text-slate-500 dark:text-slate-400">
              M
            </kbd>
          </button>

          {/* Shortcuts Info Button */}
          <button
            id="btn-nav-shortcuts"
            type="button"
            onClick={onOpenShortcuts}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-all"
            title="Keyboard Shortcuts [?]"
            aria-label="View keyboard shortcuts"
          >
            <Keyboard className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          </button>

          {/* Resume Modal Trigger */}
          <button
            id="btn-nav-resume"
            type="button"
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-700/80 transition-all"
            title="View Resume [R]"
            aria-label="View Printable Resume. Shortcut: R"
          >
            <FileText className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Resume</span>
            <kbd className="hidden lg:inline-block px-1 py-0.2 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[10px] font-mono text-slate-500 dark:text-slate-400 ml-0.5">
              R
            </kbd>
          </button>

          {/* Hire Me CTA */}
          <a
            id="btn-nav-hire"
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-900/20 transition-all hover:shadow-emerald-900/40"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Hire Me</span>
          </a>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex items-center gap-1.5 md:hidden">
          {/* Mobile Theme Toggle */}
          <button
            id="btn-nav-mobile-theme-toggle"
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-cyan-600" />
            )}
          </button>

          {/* Mobile Resume Quick Button */}
          <button
            id="btn-nav-resume-mobile-quick"
            type="button"
            onClick={onOpenResume}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            title="Preview Resume"
            aria-label="View Resume"
          >
            <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="btn-mobile-menu-toggle"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-5 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`mobile-nav-${link.name.toLowerCase()}`}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-col gap-2">
            <button
              id="btn-mobile-drawer-resume"
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
            >
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>View / Print Resume</span>
              </span>
              <kbd className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-xs font-mono font-bold border border-slate-300 dark:border-slate-700">
                R
              </kbd>
            </button>

            <button
              id="btn-mobile-drawer-theme"
              type="button"
              onClick={() => {
                onToggleTheme();
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
            >
              <span className="flex items-center gap-2">
                {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-cyan-600" />}
                <span>Theme: {theme === 'dark' ? 'Dark' : 'Light'} Mode</span>
              </span>
              <kbd className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-xs font-mono font-bold border border-slate-300 dark:border-slate-700">
                M
              </kbd>
            </button>

            <a
              id="btn-mobile-drawer-contact"
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all shadow-md shadow-emerald-950/20"
            >
              <Send className="h-4 w-4" />
              <span>Get in Touch</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
