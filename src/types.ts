export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string[];
  technologies: string[];
  highlights?: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'all' | 'python' | 'fullstack' | 'frontend';
  period: string;
  summary: string;
  description: string[];
  features: string[];
  technologies: string[];
  architecturePoints: string[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location?: string;
  details?: string;
  status: 'In Progress' | 'Completed';
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level?: string;
    featured?: boolean;
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  type: 'Certification' | 'Extracurricular' | 'Competition' | 'Volunteering';
  description: string;
  date?: string;
  iconName: string;
}

export interface ResumeData {
  name: string;
  title: string;
  subtitle: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  linkedinDisplay: string;
  github: string;
  githubDisplay: string;
  summary: string;
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  skillCategories: SkillCategory[];
  keyCompetencies: string[];
  achievements: Achievement[];
}
