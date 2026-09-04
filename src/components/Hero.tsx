import { Mail, Phone, MapPin, ExternalLink, Copy, ArrowRight, FileText, CheckCircle2, Terminal, Code2, Database } from 'lucide-react';
import { resumeData } from '../data/resumeData';

interface HeroProps {
  onOpenResume: () => void;
  onCopy: (text: string, label: string) => void;
}

export function Hero({ onOpenResume, onCopy }: HeroProps) {
  return (
    <section
      id="about"
      className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden border-b border-slate-200 dark:border-slate-850"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-teal-500/10 dark:bg-teal-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Hero Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-slate-900/90 border border-emerald-500/20 dark:border-slate-800 text-xs font-medium text-emerald-800 dark:text-slate-300 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-500"></span>
              </span>
              <span>Available for Software Development Roles</span>
            </div>

            {/* Title & Introduction */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400">
                  {resumeData.name}
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-emerald-700 dark:text-emerald-400/90 flex items-center gap-2">
                <span>{resumeData.title}</span>
              </p>
            </div>

            {/* Summary */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300/90 max-w-2xl leading-relaxed">
              {resumeData.summary}
            </p>

            {/* Contact Pills & Actions */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {/* Location */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 shadow-xs">
                <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{resumeData.location}</span>
              </div>

              {/* Email with copy button */}
              <div className="inline-flex items-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 overflow-hidden shadow-xs">
                <a
                  id="hero-email-link"
                  href={`mailto:${resumeData.email}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{resumeData.email}</span>
                </a>
                <button
                  id="hero-copy-email"
                  type="button"
                  onClick={() => onCopy(resumeData.email, 'Email address')}
                  className="px-2 py-1.5 border-l border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                  title="Copy email"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </div>

              {/* Phone with copy button */}
              <div className="inline-flex items-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 overflow-hidden shadow-xs">
                <a
                  id="hero-phone-link"
                  href={`tel:${resumeData.phone}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{resumeData.phone}</span>
                </a>
                <button
                  id="hero-copy-phone"
                  type="button"
                  onClick={() => onCopy(resumeData.phone, 'Phone number')}
                  className="px-2 py-1.5 border-l border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                  title="Copy phone"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </div>

              {/* LinkedIn */}
              <a
                id="hero-linkedin-link"
                href={resumeData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 shadow-xs transition-all"
              >
                <span>LinkedIn</span>
                <ExternalLink className="h-3 w-3 text-cyan-500" />
              </a>

              {/* GitHub */}
              <a
                id="hero-github-link"
                href={resumeData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/40 shadow-xs transition-all"
              >
                <span>GitHub</span>
                <ExternalLink className="h-3 w-3 text-emerald-500" />
              </a>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                id="hero-btn-explore-projects"
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-md shadow-emerald-900/20 transition-all hover:translate-y-[-1px]"
              >
                <span>Explore Projects</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                id="hero-btn-view-resume"
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-medium border border-slate-200 dark:border-slate-800 shadow-xs transition-all"
              >
                <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>View Full Resume</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
                  R
                </kbd>
              </button>

              <a
                id="hero-btn-contact-me"
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-white text-sm font-medium transition-colors"
              >
                <span>Contact Direct</span>
              </a>
            </div>
          </div>

          {/* Interactive Technical Profile Showcase Card */}
          <div className="lg:col-span-4">
            <div
              id="hero-profile-terminal-card"
              className="relative rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/90 p-5 sm:p-6 shadow-xl shadow-slate-200/50 dark:shadow-black/40 backdrop-blur-sm"
            >
              {/* Terminal Window Controls */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Terminal className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  nilam_panchal.py
                </span>
              </div>

              {/* Code Snippet / Quick Spec */}
              <div className="space-y-3 font-mono text-xs">
                <div className="text-slate-500 dark:text-slate-400">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">class</span>{' '}
                  <span className="text-teal-700 dark:text-teal-300 font-bold">PythonDeveloper</span>:
                </div>

                <div className="pl-4 space-y-1.5 text-slate-700 dark:text-slate-300">
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">name:</span>{' '}
                    <span className="text-amber-700 dark:text-amber-200">'Nilam Panchal'</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">role:</span>{' '}
                    <span className="text-cyan-700 dark:text-cyan-300">'Full-Stack Engineer'</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">education:</span>{' '}
                    <span className="text-emerald-700 dark:text-emerald-300">'MCA Candidate (GTU)'</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">stack:</span>{' '}
                    <span className="text-slate-600 dark:text-slate-300">[</span>
                    <span className="text-teal-700 dark:text-teal-300">'Python'</span>,{' '}
                    <span className="text-teal-700 dark:text-teal-300">'Flask'</span>,{' '}
                    <span className="text-teal-700 dark:text-teal-300">'MySQL'</span>,{' '}
                    <span className="text-teal-700 dark:text-teal-300">'React'</span>
                    <span className="text-slate-600 dark:text-slate-300">]</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">strengths:</span>{' '}
                    <span className="text-amber-700 dark:text-amber-200">'RBAC, REST, CRUD'</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Ready to deploy
                  </span>
                  <span>Surat, India</span>
                </div>
              </div>

              {/* Quick Stat Tiles */}
              <div className="grid grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                  <span className="text-xl font-bold text-slate-900 dark:text-white block">2</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Tech Internships</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                  <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 block">4+</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Web Projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
