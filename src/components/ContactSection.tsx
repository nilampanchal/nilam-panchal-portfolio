import { useState, useEffect, FormEvent } from 'react';
import { Mail, Phone, MapPin, ExternalLink, Copy, Send, CheckCircle2, MessageSquare, Linkedin, Github, Clock, RotateCcw, Check, Inbox, Trash2, Loader2, Sparkles } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { useProfilePhoto } from '../hooks/useProfilePhoto';
import { playHoverTick, playClickSound, playCopySuccessSound } from '../utils/audioFeedback';

interface ContactSectionProps {
  onCopy: (text: string, label: string) => void;
}

interface SavedMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

const STORAGE_KEY = 'portfolio_saved_contact_messages';

export function ContactSection({ onCopy }: ContactSectionProps) {
  const { photoUrl } = useProfilePhoto('/nilam_clean_background.jpg');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Job Opportunity',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<SavedMessage | null>(null);
  const [copiedPrepared, setCopiedPrepared] = useState(false);
  const [savedMessages, setSavedMessages] = useState<SavedMessage[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load saved message history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedMessages(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage read errors
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) return;

    playClickSound();
    setIsSending(true);

    const newMessage: SavedMessage = {
      id: Date.now().toString(),
      name: formState.name.trim(),
      email: formState.email.trim(),
      subject: formState.subject,
      message: formState.message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })
    };

    // Save to local storage so messages are never lost
    try {
      const updated = [newMessage, ...savedMessages];
      setSavedMessages(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }

    // Try safe popup mailto (may be blocked by browser iframe sandboxes)
    const subjectLine = encodeURIComponent(`[Portfolio Inquiry] ${newMessage.subject} from ${newMessage.name}`);
    const bodyContent = encodeURIComponent(
      `Hi Nilam,\n\nName: ${newMessage.name}\nEmail: ${newMessage.email}\nInquiry: ${newMessage.subject}\n\nMessage:\n${newMessage.message}\n\n---\nSent via Nilam Panchal Portfolio`
    );
    const mailtoUrl = `mailto:${resumeData.email}?subject=${subjectLine}&body=${bodyContent}`;

    try {
      // Safe attempt to launch desktop client
      window.open(mailtoUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Suppress any iframe navigation block exception
    }

    setTimeout(() => {
      setIsSending(false);
      setSubmittedMessage(newMessage);
    }, 450);
  };

  const handleCopyFullMessage = () => {
    if (!submittedMessage) return;
    const fullText = `To: ${resumeData.email}\nSubject: [Portfolio Inquiry] ${submittedMessage.subject} from ${submittedMessage.name}\nFrom: ${submittedMessage.name} <${submittedMessage.email}>\n\n${submittedMessage.message}`;
    navigator.clipboard.writeText(fullText).then(() => {
      playCopySuccessSound();
      setCopiedPrepared(true);
      onCopy(fullText, 'Formatted message');
      setTimeout(() => setCopiedPrepared(false), 2500);
    });
  };

  const handleResetForm = () => {
    playClickSound();
    setSubmittedMessage(null);
    setFormState({
      name: '',
      email: '',
      subject: 'Job Opportunity',
      message: ''
    });
  };

  const handleClearHistory = () => {
    playClickSound();
    setSavedMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Generate webmail direct links for zero-fail dispatch
  const getGmailUrl = (msg: SavedMessage) => {
    const su = encodeURIComponent(`[Portfolio Inquiry] ${msg.subject} from ${msg.name}`);
    const body = encodeURIComponent(
      `Hi Nilam,\n\nName: ${msg.name}\nEmail: ${msg.email}\nInquiry: ${msg.subject}\n\nMessage:\n${msg.message}\n\n---\nSent via Nilam Panchal Portfolio`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(resumeData.email)}&su=${su}&body=${body}`;
  };

  const getOutlookUrl = (msg: SavedMessage) => {
    const su = encodeURIComponent(`[Portfolio Inquiry] ${msg.subject} from ${msg.name}`);
    const body = encodeURIComponent(
      `Hi Nilam,\n\nName: ${msg.name}\nEmail: ${msg.email}\nInquiry: ${msg.subject}\n\nMessage:\n${msg.message}\n\n---\nSent via Nilam Panchal Portfolio`
    );
    return `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(resumeData.email)}&subject=${su}&body=${body}`;
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
            {/* Quick Profile Bio Card */}
            <div
              id="contact-profile-card"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4"
            >
              <div className="h-14 w-14 rounded-xl overflow-hidden border border-emerald-500/30 shrink-0 bg-slate-100 dark:bg-slate-800">
                <img
                  src={photoUrl}
                  alt={resumeData.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight">
                  {resumeData.name}
                </h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  {resumeData.title}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Based in {resumeData.location} • Ready to work
                </p>
              </div>
            </div>

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
                  onMouseEnter={playHoverTick}
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
                  onMouseEnter={playHoverTick}
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
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Send a Direct Message
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Pre-fills an inquiry to Nilam Panchal with instant webmail support
                    </p>
                  </div>
                </div>

                {savedMessages.length > 0 && (
                  <button
                    id="btn-toggle-message-history"
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setShowHistory(!showHistory);
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 text-xs font-medium transition-colors"
                    title="View previously recorded messages"
                  >
                    <Inbox className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>History ({savedMessages.length})</span>
                  </button>
                )}
              </div>

              {/* Message History Drawer */}
              {showHistory && (
                <div
                  id="contact-messages-history"
                  className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in duration-150"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-emerald-500" />
                      Locally Saved Inquiries ({savedMessages.length})
                    </span>
                    <button
                      type="button"
                      onClick={handleClearHistory}
                      className="inline-flex items-center gap-1 text-[11px] text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                      Clear History
                    </button>
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                    {savedMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                      >
                        <div className="flex items-center justify-between font-medium text-slate-900 dark:text-white mb-0.5">
                          <span>{msg.subject}</span>
                          <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 line-clamp-1">
                          {msg.name} ({msg.email}): {msg.message}
                        </p>
                        <div className="mt-1.5 flex items-center gap-2">
                          <a
                            href={getGmailUrl(msg)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-emerald-600 hover:underline inline-flex items-center gap-1"
                          >
                            Open in Gmail <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {submittedMessage ? (
                <div
                  id="contact-success-state"
                  className="p-6 space-y-4 bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl animate-in fade-in duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        Message Prepared & Saved Locally!
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        Select your preferred email service below to dispatch directly:
                      </p>
                    </div>
                  </div>

                  {/* Direct Webmail Launch Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {/* Gmail Web (Zero-fail, opens new tab) */}
                    <a
                      id="btn-dispatch-gmail"
                      href={getGmailUrl(submittedMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHoverTick}
                      onClick={playClickSound}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-emerald-900/20 transition-all hover:translate-y-[-1px]"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Open in Gmail Web</span>
                      <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                    </a>

                    {/* Outlook Web */}
                    <a
                      id="btn-dispatch-outlook"
                      href={getOutlookUrl(submittedMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHoverTick}
                      onClick={playClickSound}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold transition-all hover:translate-y-[-1px]"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Open in Outlook Web</span>
                    </a>

                    {/* Default Mail Client Trigger */}
                    <a
                      id="btn-dispatch-mailto"
                      href={`mailto:${resumeData.email}?subject=${encodeURIComponent(`[Portfolio Inquiry] ${submittedMessage.subject} from ${submittedMessage.name}`)}&body=${encodeURIComponent(`Hi Nilam,\n\nName: ${submittedMessage.name}\nEmail: ${submittedMessage.email}\nTopic: ${submittedMessage.subject}\n\nMessage:\n${submittedMessage.message}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHoverTick}
                      onClick={playClickSound}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      <Send className="h-3.5 w-3.5 text-emerald-500" />
                      <span>Desktop Mail Client</span>
                    </a>

                    {/* 1-Click Copy Formatted Message */}
                    <button
                      id="btn-copy-formatted-message"
                      type="button"
                      onClick={handleCopyFullMessage}
                      onMouseEnter={playHoverTick}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      {copiedPrepared ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-slate-500" />
                          <span>Copy Message Text</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Message Summary Preview */}
                  <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 font-medium">
                      <span>Recipient: {resumeData.email}</span>
                      <span>{submittedMessage.timestamp}</span>
                    </div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      Subject: [Portfolio Inquiry] {submittedMessage.subject}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-lg font-mono text-[11px] max-h-28 overflow-y-auto">
                      {submittedMessage.message}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      id="btn-send-another-message"
                      type="button"
                      onClick={handleResetForm}
                      onMouseEnter={playHoverTick}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Send Another Message</span>
                    </button>
                    <span className="text-[11px] text-slate-400">
                      Saved to browser history
                    </span>
                  </div>
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
                    disabled={isSending}
                    onMouseEnter={playHoverTick}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-75 text-white text-sm font-semibold shadow-md shadow-emerald-900/20 transition-all hover:translate-y-[-1px]"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Preparing & Saving Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
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
