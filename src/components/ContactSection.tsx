import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, ExternalLink, Copy, Send, CheckCircle2, MessageSquare, Linkedin, Github } from 'lucide-react';
import { resumeData } from '../data/resumeData';

interface ContactSectionProps {
  onCopy: (text: string, label: string) => void;
}

export function ContactSection({ onCopy }: ContactSectionProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Job Opportunity',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    // Create mailto link with encoded query parameters
    const subjectLine = encodeURIComponent(`[Portfolio Contact] ${formState.subject} from ${formState.name}`);
    const bodyContent = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\nSubject: ${formState.subject}\n\nMessage:\n${formState.message}`
    );
    
    // Open default email client
    window.location.href = `mailto:${resumeData.email}?subject=${subjectLine}&body=${bodyContent}`;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-3">
              <Mail className="h-3.5 w-3.5" />
              Get In Touch
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Let's Connect & Collaborate
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
            Open for software developer roles, Python/Flask backend opportunities, and technical projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Direct Contact Cards Column */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div
              id="contact-card-email"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all group shadow-sm dark:shadow-none"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  Email Address
                </span>
                <button
                  id="btn-copy-contact-email"
                  type="button"
                  onClick={() => onCopy(resumeData.email, 'Email address')}
                  className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-800"
                  title="Copy email"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
              <a
                href={`mailto:${resumeData.email}`}
                className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors break-all"
              >
                {resumeData.email}
              </a>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Drop me a direct email anytime
              </p>
            </div>

            {/* Phone Card */}
            <div
              id="contact-card-phone"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all group shadow-sm dark:shadow-none"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  Phone & WhatsApp
                </span>
                <button
                  id="btn-copy-contact-phone"
                  type="button"
                  onClick={() => onCopy(resumeData.phone, 'Phone number')}
                  className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-800"
                  title="Copy phone"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
              <a
                href={`tel:${resumeData.phone}`}
                className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors"
              >
                {resumeData.phone}
              </a>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Available during regular working hours
              </p>
            </div>

            {/* Location & Socials Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm dark:shadow-none">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Location
                  </span>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {resumeData.location}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-850 flex flex-col gap-2">
                <a
                  id="contact-link-linkedin"
                  href={resumeData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 transition-colors text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    LinkedIn Profile
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                </a>

                <a
                  id="contact-link-github"
                  href={resumeData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 transition-colors text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <Github className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    GitHub Profile
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Message Form Column */}
          <div className="lg:col-span-7">
            <div
              id="contact-form-container"
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none"
            >
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                <MessageSquare className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Send a Direct Message
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Pre-fills an inquiry to Nilam Panchal
                  </p>
                </div>
              </div>

              {submitted ? (
                <div
                  id="contact-success-state"
                  className="p-6 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 rounded-xl"
                >
                  <div className="h-10 w-10 mx-auto rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Message Ready to Dispatch!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    Your email client has been opened with your message. If it didn't open automatically, you can write directly to{' '}
                    <span className="text-emerald-700 dark:text-emerald-400 font-mono">{resumeData.email}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-input-name"
                        className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-input-name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-input-email"
                        className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        Your Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-input-email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-input-subject"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Inquiry Type
                    </label>
                    <select
                      id="contact-input-subject"
                      value={formState.subject}
                      onChange={(e) =>
                        setFormState({ ...formState, subject: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                      <option value="Job Opportunity">Full-Time / Internship Opportunity</option>
                      <option value="Project Collaboration">Project Collaboration</option>
                      <option value="Freelance Web Development">Web Application Development</option>
                      <option value="General Inquiry">General Connect / Networking</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-input-message"
                      className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="contact-input-message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Hi Nilam, I came across your portfolio and would like to connect regarding..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    id="btn-submit-contact-form"
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-md shadow-emerald-900/20 transition-all hover:translate-y-[-1px]"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
