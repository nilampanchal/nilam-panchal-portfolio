import { Code2, Layers, Database, Layout, Wrench, ShieldCheck, CheckCircle, Sparkles } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export function SkillsSection() {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      case 'Layers':
        return <Layers className="h-4 w-4 text-teal-600 dark:text-teal-400" />;
      case 'Database':
        return <Database className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />;
      case 'Layout':
        return <Layout className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      case 'Wrench':
        return <Wrench className="h-4 w-4 text-teal-600 dark:text-teal-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />;
      default:
        return <Code2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  return (
    <section
      id="skills"
      className="py-16 sm:py-24 border-b border-slate-200 dark:border-slate-850 relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-3">
              <Code2 className="h-3.5 w-3.5" />
              Technical Stack
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Skills & Architecture
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
            Proficient in full-stack Python ecosystems, relational database schemas, and modern web frameworks.
          </p>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeData.skillCategories.map((category) => (
            <div
              key={category.title}
              id={`skill-category-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 p-6 transition-all duration-300 shadow-sm dark:shadow-none"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800/80">
                <div className="h-8 w-8 rounded-lg bg-slate-50 dark:bg-slate-950 flex items-center justify-center border border-slate-200 dark:border-slate-800">
                  {getCategoryIcon(category.iconName)}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {category.title}
                </h3>
              </div>

              {/* Skills Items */}
              <div className="space-y-2.5">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-850 hover:border-slate-300 dark:hover:border-slate-800 transition-colors"
                  >
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      {skill.name}
                    </span>
                    {skill.level && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-slate-900 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 font-medium">
                        {skill.level}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Key Competencies Strip */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Key Engineering Competencies & Methodologies
            </h3>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {resumeData.keyCompetencies.map((comp) => (
              <span
                key={comp}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-xs"
              >
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{comp}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
