import { GraduationCap, Award, Calendar, MapPin, Sparkles, HeartHandshake, Mic } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export function EducationSection() {
  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className="h-5 w-5 text-amber-500 dark:text-amber-400" />;
      case 'HeartHandshake':
        return <HeartHandshake className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Mic':
        return <Mic className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />;
      case 'Sparkles':
        return <Sparkles className="h-5 w-5 text-teal-600 dark:text-teal-400" />;
      default:
        return <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  return (
    <section
      id="education"
      className="py-16 sm:py-24 border-b border-slate-200 dark:border-slate-850 relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-3">
              <GraduationCap className="h-3.5 w-3.5" />
              Academic Foundation
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Education & Achievements
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
            Strong academic background in computer applications supplemented with certifications and extracurricular leadership.
          </p>
        </div>

        {/* Education & Achievements 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Education Column */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Degrees & Formal Education
            </h3>

            <div className="space-y-4">
              {resumeData.education.map((edu) => (
                <div
                  key={edu.id}
                  id={`edu-card-${edu.id}`}
                  className="rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 transition-all hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {edu.degree}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-medium">
                      <Calendar className="h-3 w-3" />
                      {edu.period}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400/90 mb-2">
                    {edu.institution}
                  </p>

                  {edu.location && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <MapPin className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                      <span>{edu.location}</span>
                    </div>
                  )}

                  {edu.details && (
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-850">
                      {edu.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Achievements & Activities Column */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500 dark:text-amber-400" />
              Achievements & Extracurriculars
            </h3>

            <div className="space-y-4">
              {resumeData.achievements.map((ach) => (
                <div
                  key={ach.id}
                  id={`achievement-card-${ach.id}`}
                  className="rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-5 transition-all hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center border border-slate-200 dark:border-slate-800 shrink-0">
                      {getAchievementIcon(ach.iconName)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {ach.title}
                        </h4>
                      </div>
                      <span className="inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 mb-2">
                        {ach.type}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {ach.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
