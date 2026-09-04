import { ResumeData } from '../types';

export const resumeData: ResumeData = {
  name: 'Nilam Panchal',
  title: 'Python & Full-Stack Web Developer',
  subtitle: 'Specializing in Flask, MySQL, REST APIs, Authentication & Role-Based Access Control',
  location: 'Surat, Gujarat, India',
  email: 'nilampanchal944@gmail.com',
  phone: '+917984182221',
  linkedin: 'https://linkedin.com/in/nilam-panchal-934241293',
  linkedinDisplay: 'linkedin.com/in/nilam-panchal-934241293',
  github: 'https://github.com/nilampanchal',
  githubDisplay: 'github.com/nilampanchal',
  summary:
    'Experienced Python Developer proficient in Flask, MySQL, HTML, CSS, JavaScript, and full-stack web development. Skilled in creating academic and internship projects with CRUD operations, authentication, and role-based access control.',
  
  experiences: [
    {
      id: 'unistar-softech',
      company: 'Unistar Softech Private Limited',
      role: 'Python Development Intern',
      period: '01/2026 - 06/2026',
      location: 'Gujarat, India',
      type: 'Internship',
      description: [
        'Developed and maintained full-stack web applications using Python, Flask, MySQL, HTML, CSS, Bootstrap, and JavaScript.',
        'Implemented robust CRUD operations, secure user authentication systems, and optimized database management workflows.',
        'Conducted rigorous application testing, debugging, and performance optimization to ensure high reliability and responsive load times.'
      ],
      technologies: ['Python', 'Flask', 'MySQL', 'HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'Git'],
      highlights: [
        'Full-stack web application development & maintenance',
        'Authentication & Role-Based Access Control implementation',
        'Database query optimization & debugging'
      ]
    },
    {
      id: 'codveda-technologies',
      company: 'Codveda Technologies Private Limited',
      role: 'Python Development Intern',
      period: '11/2025 - 12/2025',
      location: 'Gujarat, India',
      type: 'Internship',
      description: [
        'Worked on Python-based application development and backend architecture.',
        'Implemented core programming concepts, relational database operations, debugging, and testing routines.',
        'Executed code optimization strategies to improve overall application throughput, reliability, and functional stability.'
      ],
      technologies: ['Python', 'Relational Databases', 'Code Optimization', 'Unit Testing', 'Debugging'],
      highlights: [
        'Python application architecture & logic implementation',
        'Database operations and query structuring',
        'Application testing, profiling, and bug resolution'
      ]
    }
  ],

  projects: [
    {
      id: 'equipment-rental-system',
      title: 'Online Equipment & Tool Rental Management System',
      category: 'python',
      period: '01/2026 - 05/2026',
      summary:
        'A comprehensive full-stack rental platform equipped with role-based access control, booking lifecycle tracking, and admin management.',
      description: [
        'Developed an Online Equipment & Tool Rental Management System using Python, Flask, MySQL, HTML, CSS, Bootstrap, and JavaScript.',
        'Designed and implemented Role-Based Access Control (RBAC) to differentiate permissions between regular users, rental partners, and administrative staff.',
        'Engineered features for equipment catalog booking, digital document verification, payment tracking, and automated inventory status updates.',
        'Built an intuitive admin dashboard with full CRUD operations for equipment listings, user oversight, and transactional reports.'
      ],
      features: [
        'Role-Based Access Control (Admin, Vendor, Customer)',
        'Equipment catalog browsing with dynamic availability filters',
        'Customer booking & reservation management pipeline',
        'Document verification & user credential checks',
        'Payment tracking & invoice status monitoring',
        'Comprehensive Admin Dashboard with CRUD operations'
      ],
      technologies: ['Python', 'Flask', 'MySQL', 'HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
      architecturePoints: [
        'MVC Application Structure with modular Flask blueprints',
        'Normalized relational schema in MySQL for users, rentals, and inventory',
        'Session-based authentication with bcrypt password hashing',
        'Responsive client interface designed with Bootstrap & vanilla JavaScript'
      ],
      tags: ['Featured', 'Full-Stack', 'Flask', 'MySQL', 'RBAC']
    },
    {
      id: 'library-management-system',
      title: 'Automated Library Management System',
      category: 'python',
      period: '01/2024 - 06/2024',
      summary:
        'An automated software solution that streamlines library operations, catalog record maintenance, and automated patron reminders.',
      description: [
        'Library Management System (LMS) is software that helps librarians manage day-to-day library operations with speed and precision.',
        'Maintains detailed book catalog records, member directories, and logs every checkout and return transaction.',
        'Configured an automated notification system that sends email reminders to users for upcoming due dates and overdue returns.'
      ],
      features: [
        'Complete book cataloging with ISBN, category, and author index',
        'Streamlined check-in and check-out tracking workflow',
        'Automated email reminders dispatched for due dates and overdue fines',
        'Patron account management and borrowing history logs',
        'Inventory audit reports and overdue item tracking'
      ],
      technologies: ['Python', 'MySQL', 'SMTP Email Automation', 'HTML5', 'CSS3'],
      architecturePoints: [
        'Automated background notification scheduler for patron emails',
        'Structured database schema handling circular check-out relationships',
        'Transaction-safe operations for book copy quantity increments and decrements'
      ],
      tags: ['Python', 'Automation', 'Email Alerts', 'Database']
    },
    {
      id: 'charity-donation-app',
      title: 'Charity Donation Web Application',
      category: 'fullstack',
      period: '06/2022 - 12/2022',
      summary:
        'A secure charity donation platform built with React.js and MongoDB featuring donor accounts and transaction tracking.',
      description: [
        'Developed a charity donation platform using React.js and MongoDB with authentication, donation tracking, and user management.',
        'Implemented authentication and user management for secure access across donors and charity campaign organizers.',
        'Provided donors with transparent records of past contributions and progress indicators for ongoing charitable campaigns.'
      ],
      features: [
        'Donor and organizer user authentication and session management',
        'Real-time charity campaign listing with progress bars',
        'Donation pledge tracking with transaction history ledger',
        'Secure user profile and receipt download capabilities'
      ],
      technologies: ['React.js', 'MongoDB', 'JavaScript', 'CSS3', 'REST APIs'],
      architecturePoints: [
        'Component-driven frontend architecture with React hooks',
        'Document-based data models in MongoDB for campaigns and donations',
        'RESTful API communication for asynchronous pledge submission'
      ],
      tags: ['React.js', 'MongoDB', 'REST APIs', 'Auth']
    },
    {
      id: 'college-management-system',
      title: 'College Management System',
      category: 'frontend',
      period: '01/2021 - 05/2021',
      summary:
        'An interactive academic portal providing college information, course catalogs, and quick student registration.',
      description: [
        'Designed and developed a College Management System using HTML, CSS, and JavaScript for the front-end.',
        'Created accessible, responsive interfaces where prospective and current users can view college details and academic notices.',
        'Implemented a streamlined registration module enabling new students to register quickly with client-side form validation.'
      ],
      features: [
        'College information hub with departmental overviews and notices',
        'Interactive quick-registration portal for incoming students',
        'Form validation preventing invalid submissions',
        'Mobile-friendly layout with structured navigational hierarchy'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design'],
      architecturePoints: [
        'Clean semantic HTML5 structure with high accessibility',
        'Modular CSS styles optimized for cross-device responsiveness',
        'DOM manipulation and regex validation routines in JavaScript'
      ],
      tags: ['Frontend', 'UI/UX', 'JavaScript', 'Portal']
    }
  ],

  education: [
    {
      id: 'gtu-mca',
      institution: 'Gujarat Technological University',
      degree: 'Master of Computer Applications (MCA)',
      period: '07/2024 - 07/2026',
      location: 'Gujarat, India',
      details: 'Postgraduate program covering advanced software engineering, distributed systems, web architectures, and advanced database management.',
      status: 'In Progress'
    },
    {
      id: 'vnsgu-bca',
      institution: 'Veer Narmad South Gujarat University',
      degree: 'Bachelor of Computer Application (BCA)',
      period: '06/2021 - 06/2024',
      location: 'Surat, Gujarat, India',
      details: 'Undergraduate study in core computer science, programming in Python/PHP/JavaScript, database systems, and full-stack software development.',
      status: 'Completed'
    },
    {
      id: 'gseb-hsc',
      institution: 'Gujarat Secondary & Higher Secondary Education Board, Gandhinagar',
      degree: 'H.S.C. Commerce',
      period: '06/2019 - 06/2021',
      location: 'Gandhinagar, Gujarat, India',
      details: 'Higher Secondary Certificate with focus on business fundamentals, analytical thinking, and quantitative reasoning.',
      status: 'Completed'
    }
  ],

  skillCategories: [
    {
      title: 'Languages',
      iconName: 'Code',
      skills: [
        { name: 'Python', level: 'Advanced', featured: true },
        { name: 'JavaScript', level: 'Intermediate', featured: true },
        { name: 'PHP', level: 'Intermediate', featured: false }
      ]
    },
    {
      title: 'Frameworks & Web',
      iconName: 'Layers',
      skills: [
        { name: 'Flask', level: 'Advanced', featured: true },
        { name: 'React.js', level: 'Intermediate', featured: true },
        { name: 'ASP.NET', level: 'Intermediate', featured: false }
      ]
    },
    {
      title: 'Databases',
      iconName: 'Database',
      skills: [
        { name: 'MySQL', level: 'Advanced', featured: true },
        { name: 'MongoDB', level: 'Intermediate', featured: true },
        { name: 'Oracle', level: 'Intermediate', featured: false }
      ]
    },
    {
      title: 'Frontend Development',
      iconName: 'Layout',
      skills: [
        { name: 'HTML5', level: 'Advanced', featured: true },
        { name: 'CSS3', level: 'Advanced', featured: true },
        { name: 'Bootstrap', level: 'Advanced', featured: true }
      ]
    },
    {
      title: 'Developer Tools',
      iconName: 'Wrench',
      skills: [
        { name: 'Git', level: 'Proficient', featured: true },
        { name: 'GitHub', level: 'Proficient', featured: true },
        { name: 'VS Code', level: 'Proficient', featured: true }
      ]
    },
    {
      title: 'Architecture & Practices',
      iconName: 'ShieldCheck',
      skills: [
        { name: 'REST APIs', level: 'Advanced', featured: true },
        { name: 'MVC Architecture', level: 'Advanced', featured: true },
        { name: 'Database Design', level: 'Advanced', featured: true },
        { name: 'Role-Based Access Control', level: 'Advanced', featured: true },
        { name: 'CRUD Operations', level: 'Advanced', featured: true },
        { name: 'Debugging & Testing', level: 'Proficient', featured: true },
        { name: 'Unit Testing', level: 'Intermediate', featured: false }
      ]
    }
  ],

  keyCompetencies: [
    'Git & GitHub',
    'REST APIs',
    'MVC Architecture',
    'Database Design',
    'Debugging',
    'Unit Testing',
    'CRUD Operations',
    'Role-Based Access Control (RBAC)',
    'Full-Stack Web Development',
    'User Authentication'
  ],

  achievements: [
    {
      id: 'ir4-course',
      title: 'Foundation Course on IR4.0 Technologies',
      type: 'Certification',
      description: 'Completed comprehensive foundational training covering Industry 4.0 paradigms, modern smart systems, and emerging technologies.',
      iconName: 'Award'
    },
    {
      id: 'nature-club',
      title: 'Volunteer - The Nature Club Event',
      type: 'Volunteering',
      description: 'Actively participated as an environmental volunteer organizing awareness initiatives, sustainability drives, and community coordination.',
      iconName: 'HeartHandshake'
    },
    {
      id: 'elocution-competition',
      title: 'Cultural Elocution Competition',
      type: 'Competition',
      description: 'Participated in the cultural elocution competition, demonstrating articulate public speaking, debate, and verbal presentation skills.',
      iconName: 'Mic'
    },
    {
      id: 'presentation-competition',
      title: 'Presentation Competition',
      type: 'Competition',
      description: 'Participated in competitive academic presentation showcasing structured problem analysis, slide design, and technical communication.',
      iconName: 'Sparkles'
    }
  ]
};
