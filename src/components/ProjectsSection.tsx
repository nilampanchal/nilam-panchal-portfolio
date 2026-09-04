import { useState, useMemo } from 'react';
import { FolderGit2, Calendar, ArrowUpRight, ExternalLink } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { Project } from '../types';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'python', label: 'Python & Flask' },
    { id: 'fullstack', label: 'Full-Stack & React' },
    { id: 'frontend', label: 'Frontend Portals' }
  ];

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return resumeData.projects;
    return resumeData.projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 border-b border-slate-200 dark:border-slate-850 relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-3">
              <FolderGit2 className="h-3.5 w-3.5" />
              Featured Work
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Projects & Web Applications
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
            Production-focused software projects implementing role-based authentication, database transactions, and intuitive interfaces.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`filter-project-${cat.id}`}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/20 font-semibold'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-xs'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 p-6 sm:p-7 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-emerald-950/10 dark:hover:shadow-emerald-950/20"
            >
              <div>
                {/* Header with period & badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                    <Calendar className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    {project.period}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors leading-snug">
                  {project.title}
                </h3>

                {/* Summary */}
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.summary}
                </p>

                {/* Bullet details */}
                <div className="mt-4 space-y-2">
                  {project.description.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Technologies & Actions */}
              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80">
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <button
                    id={`btn-view-details-${project.id}`}
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                  >
                    <span>View Architecture Details</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>

                  <a
                    id={`btn-github-${project.id}`}
                    href="https://github.com/nilampanchal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                    title="View Source on GitHub"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
