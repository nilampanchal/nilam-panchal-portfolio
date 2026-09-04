import { X, Calendar, Layers, CheckCircle, ExternalLink, GitBranch, Shield } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <div
      id="project-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`project-modal-title-${project.id}`}
    >
      <div
        id={`project-modal-${project.id}`}
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 text-slate-800 dark:text-slate-200 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button with Esc Hint */}
        <div className="absolute top-5 right-5 flex items-center gap-2">
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
            Esc
          </kbd>
          <button
            id="btn-close-project-modal"
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors border border-slate-200 dark:border-slate-700/50"
            aria-label="Close modal (Esc)"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Header */}
        <div className="pr-16">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
              <Calendar className="h-3 w-3" />
              {project.period}
            </span>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3
            id={`project-modal-title-${project.id}`}
            className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight"
          >
            {project.title}
          </h3>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
            <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Key Features & Functionality
          </h4>
          <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Architecture & Engineering Highlights */}
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            Architecture & Implementation Highlights
          </h4>
          <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {project.architecturePoints.map((point, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80"
              >
                <GitBranch className="h-4 w-4 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                <span className="text-xs sm:text-sm leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-8 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-end gap-3">
          <button
            id="btn-dismiss-modal"
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Close (Esc)
          </button>
          <a
            id="btn-project-github-link"
            href="https://github.com/nilampanchal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-all shadow-md shadow-emerald-900/20"
          >
            <ExternalLink className="h-4 w-4" />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
