import { ArrowUp, Github, Linkedin, Mail, FileText, Share2, Globe } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { playHoverTick, playClickSound } from '../utils/audioFeedback';

interface FooterProps {
  onOpenResume: () => void;
}

const LIVE_URL = 'https://ais-pre-gnmr4o5grensvs4fmwi7hb-365893322122.asia-southeast1.run.app';

export function Footer({ onOpenResume }: FooterProps) {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="site-footer"
      className="border-t border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 py-12 text-slate-500 dark:text-slate-400 text-xs sm:text-sm transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Summary */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white text-base">
                {resumeData.name}
              </span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs font-medium">
                {resumeData.title}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              Based in {resumeData.location}. Crafting robust backend APIs and responsive applications.
            </p>
          </div>

          {/* Socials & Actions */}
          <div className="flex items-center gap-2.5">
            <button
              id="footer-btn-resume"
              type="button"
              onClick={onOpenResume}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Resume Preview [R]"
            >
              <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Resume</span>
              <kbd className="px-1 py-0.2 rounded bg-white dark:bg-slate-800 text-[10px] font-mono border border-slate-300 dark:border-slate-700">
                R
              </kbd>
            </button>

            <a
              id="footer-link-github"
              href={resumeData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="h-4 w-4" />
            </a>

            <a
              id="footer-link-linkedin"
              href={resumeData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverTick}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="LinkedIn Profile"
              title="Visit LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            {/* Direct Share on LinkedIn */}
            <a
              id="footer-btn-share-linkedin"
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(LIVE_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverTick}
              onClick={playClickSound}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-xs font-medium transition-colors"
              title="Share Live Portfolio on LinkedIn Feed"
            >
              <Share2 className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
              <span className="hidden sm:inline">Share on LinkedIn</span>
            </a>

            <a
              id="footer-link-email"
              href={`mailto:${resumeData.email}`}
              onMouseEnter={playHoverTick}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Email Nilam"
            >
              <Mail className="h-4 w-4" />
            </a>

            <button
              id="footer-btn-scroll-top"
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors ml-1"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Nilam Panchal. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
