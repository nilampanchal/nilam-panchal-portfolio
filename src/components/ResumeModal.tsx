import { X, Printer, Mail, Phone, MapPin, ExternalLink, Briefcase, GraduationCap, Code2, Award, FolderGit2 } from 'lucide-react';
import { ResumeData } from '../types';
import { useProfilePhoto } from '../hooks/useProfilePhoto';
import { playHoverTick, playClickSound } from '../utils/audioFeedback';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ResumeData;
}

export function ResumeModal({ isOpen, onClose, data }: ResumeModalProps) {
  const { photoUrl } = useProfilePhoto('/nilam_clean_background.jpg');

  if (!isOpen) return null;

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        id="resume-modal-content"
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl text-slate-800 dark:text-slate-200 my-6 max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-2">
            <span id="resume-modal-title" className="font-semibold text-slate-900 dark:text-white text-base sm:text-lg">
              Resume Preview
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
              Print / Save Ready
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-print-resume"
              type="button"
              onMouseEnter={playHoverTick}
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-medium transition-all shadow-md shadow-emerald-950/20"
              title="Print or Save as PDF"
            >
              <Printer className="h-4 w-4" />
              <span>Print / Save PDF</span>
            </button>

            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
              Esc
            </kbd>

            <button
              id="btn-close-resume-modal"
              type="button"
              onMouseEnter={playHoverTick}
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close modal (Esc)"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Resume Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
          {/* Header */}
          <div className="text-center border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="flex justify-center mb-3">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-md">
                <img
                  src={photoUrl}
                  alt={data.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              {data.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                {data.location}
              </span>
              <span>•</span>
              <a
                href={`mailto:${data.email}`}
                className="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                {data.email}
              </a>
              <span>•</span>
              <a
                href={`tel:${data.phone}`}
                className="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                {data.phone}
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                LinkedIn: {data.linkedinDisplay}
              </a>
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                GitHub: {data.githubDisplay}
              </a>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed text-center sm:text-justify">
              {data.summary}
            </p>
          </div>

          {/* Professional Experience */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-1 border-b border-slate-200 dark:border-slate-800">
              <Briefcase className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Professional Experience
              </h2>
            </div>
            <div className="space-y-6">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                        {exp.company}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-400">
                        {exp.role}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="leading-relaxed pl-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-1 border-b border-slate-200 dark:border-slate-800">
              <FolderGit2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Projects
              </h2>
            </div>
            <div className="space-y-5">
              {data.projects.map((proj) => (
                <div key={proj.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                      {proj.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{proj.period}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {proj.description.map((desc, idx) => (
                      <li key={idx} className="leading-relaxed pl-1">
                        {desc}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-1 border-b border-slate-200 dark:border-slate-800">
              <GraduationCap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Education
              </h2>
            </div>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
                >
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                      {edu.institution}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">{edu.degree}</p>
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills & Key Skills */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-1 border-b border-slate-200 dark:border-slate-800">
              <Code2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Technical Skills & Key Competencies
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400 block mb-1">Languages:</span>
                <span className="text-slate-700 dark:text-slate-300">Python, PHP, JavaScript</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400 block mb-1">Data & Analytics:</span>
                <span className="text-slate-700 dark:text-slate-300">Statistical Data Analysis, Data Analysis, Requirements Analysis, Problem Solving</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400 block mb-1">Frameworks:</span>
                <span className="text-slate-700 dark:text-slate-300">Flask, React.js, ASP.NET</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400 block mb-1">Databases:</span>
                <span className="text-slate-700 dark:text-slate-300">MySQL, MongoDB, Oracle</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400 block mb-1">Frontend:</span>
                <span className="text-slate-700 dark:text-slate-300">HTML5, CSS3, Bootstrap</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400 block mb-1">Tools:</span>
                <span className="text-slate-700 dark:text-slate-300">Git, GitHub, VS Code</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 sm:col-span-2">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400 block mb-1">Key Competencies:</span>
                <span className="text-slate-700 dark:text-slate-300">
                  Statistical Data Analysis, Requirements Analysis, Problem Solving, REST APIs, MVC Architecture, Database Design, Debugging, Unit Testing, RBAC, CRUD
                </span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-1 border-b border-slate-200 dark:border-slate-800">
              <Award className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Achievements & Activities
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {data.achievements.map((ach) => (
                <li key={ach.id} className="leading-relaxed pl-1">
                  <strong className="text-slate-900 dark:text-white">{ach.title}</strong> — {ach.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
