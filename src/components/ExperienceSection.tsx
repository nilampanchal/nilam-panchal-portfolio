import { Briefcase, Calendar, MapPin, CheckCircle2, Cpu } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="py-16 sm:py-24 border-b border-slate-200 dark:border-slate-850 relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-3">
              <Briefcase className="h-3.5 w-3.5" />
              Career Journey
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Professional Experience
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
            Hands-on internship experience in full-stack Python development, database engineering, and application optimization.
          </p>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-6 sm:space-y-8">
          {resumeData.experiences.map((exp) => (
            <div
              key={exp.id}
              id={`experience-card-${exp.id}`}
              className="group relative rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 p-6 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-emerald-950/10 dark:hover:shadow-emerald-950/20"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-slate-800/80">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                      {exp.company}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                      {exp.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400/90">{exp.role}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-emerald-700 dark:text-emerald-400 self-start sm:self-auto font-medium">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Responsibilities list */}
              <div className="mt-5 space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Key Responsibilities & Deliverables
                </h4>
                <ul className="space-y-2.5">
                  {exp.description.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-1 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Technologies Used */}
              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  Technologies:
                </span>
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
