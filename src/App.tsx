import { useState, useEffect, useCallback } from 'react';
import { resumeData } from './data/resumeData';
import { Project } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ResumeModal } from './components/ResumeModal';
import { ShortcutsModal } from './components/ShortcutsModal';
import { ShortcutsBar } from './components/ShortcutsBar';
import { Toast } from './components/Toast';
import { playCopySuccessSound, playClickSound, isAudioEnabled, setAudioEnabled } from './utils/audioFeedback';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize theme from localStorage or default to dark
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  // Keep documentElement class in sync with theme state
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  // Toggle Theme with toast feedback
  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      setToastMessage(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} Mode (Press M to toggle)`);
      setTimeout(() => setToastMessage(null), 3000);
      return next;
    });
  }, []);

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    playCopySuccessSound();
    navigator.clipboard.writeText(text).then(
      () => {
        setToastMessage(`${label} copied to clipboard!`);
        setTimeout(() => setToastMessage(null), 3500);
      },
      () => {
        setToastMessage(`Copied: ${text}`);
        setTimeout(() => setToastMessage(null), 3500);
      }
    );
  };

  // Global accessibility keyboard shortcuts listener ('m', 'r', 'Escape', '?')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. If Escape, close any open modal
      if (e.key === 'Escape') {
        if (isShortcutsOpen) {
          setIsShortcutsOpen(false);
          return;
        }
        if (selectedProject) {
          setSelectedProject(null);
          return;
        }
        if (isResumeOpen) {
          setIsResumeOpen(false);
          return;
        }
        return;
      }

      // 2. Do not trigger shortcuts when typing inside form inputs
      const activeEl = document.activeElement;
      const isInput =
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.tagName === 'SELECT' ||
          (activeEl as HTMLElement).isContentEditable);

      if (isInput) return;

      // 3. Do not trigger if system modifier keys are pressed (e.g. Cmd+R refresh or Ctrl+M)
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      // 4. 'm' or 'M' -> Toggle Theme
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        handleToggleTheme();
      }
      // 5. 'r' or 'R' -> Toggle Resume Modal
      else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        setIsResumeOpen((prev) => {
          const next = !prev;
          setToastMessage(next ? 'Resume opened (Press Esc or R to close)' : 'Resume closed');
          setTimeout(() => setToastMessage(null), 3000);
          return next;
        });
      }
      // 6. 's' or 'S' -> Toggle Button Audio Feedback
      else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        const current = isAudioEnabled();
        const next = !current;
        setAudioEnabled(next);
        if (next) {
          playClickSound();
        }
        setToastMessage(next ? 'Sound effects enabled (Press S to mute)' : 'Sound effects muted');
        setTimeout(() => setToastMessage(null), 3000);
      }
      // 7. '?' -> Open Shortcuts Modal
      else if (e.key === '?') {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleToggleTheme, isResumeOpen, selectedProject, isShortcutsOpen]);

  return (
    <div
      id="portfolio-app-root"
      className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-500 transition-colors duration-200"
    >
      {/* Top Fixed Navigation */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onCopy={handleCopy}
        />

        <ExperienceSection />

        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <SkillsSection />

        <EducationSection />

        <ContactSection onCopy={handleCopy} />
      </main>

      {/* Footer */}
      <Footer onOpenResume={() => setIsResumeOpen(true)} />

      {/* Floating Shortcuts Indicator */}
      <ShortcutsBar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Interactive Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Resume Viewer / Print Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        data={resumeData}
      />

      {/* Accessibility Keyboard Shortcuts Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
