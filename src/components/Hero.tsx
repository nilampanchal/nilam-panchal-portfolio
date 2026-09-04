import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { Mail, Phone, MapPin, ExternalLink, Copy, ArrowRight, FileText, CheckCircle2, Terminal, ZoomIn, X, Sparkles, Upload, RotateCcw, Layers, Download, Share2 } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { useProfilePhoto } from '../hooks/useProfilePhoto';
import { playHoverTick, playClickSound } from '../utils/audioFeedback';

interface HeroProps {
  onOpenResume: () => void;
  onCopy: (text: string, label: string) => void;
}

export function Hero({ onOpenResume, onCopy }: HeroProps) {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [showOriginalBackground, setShowOriginalBackground] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { photoUrl, hasCustomPhoto, uploadPhoto, resetPhoto } = useProfilePhoto('/nilam_clean_background.jpg');

  const displayedPhoto = !hasCustomPhoto && showOriginalBackground
    ? '/IMG_20260713_220710_646.jpg'
    : photoUrl;

  const handleFile = async (file: File) => {
    try {
      setUploadStatus('Loading photo...');
      await uploadPhoto(file);
      setUploadStatus('Photo applied!');
      setTimeout(() => setUploadStatus(null), 3000);
    } catch (err: any) {
      setUploadStatus(err.message || 'Upload failed');
      setTimeout(() => setUploadStatus(null), 4000);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <section
      id="about"
      className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden border-b border-slate-200 dark:border-slate-850"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-teal-500/10 dark:bg-teal-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-slate-900/90 border border-emerald-500/20 dark:border-slate-800 text-xs font-medium text-emerald-800 dark:text-slate-300 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-500"></span>
              </span>
              <span>Available for Software Development Roles</span>
            </div>

            {/* Title & Introduction */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400">
                  {resumeData.name}
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-emerald-700 dark:text-emerald-400/90 flex items-center gap-2">
                <span>{resumeData.title}</span>
              </p>
            </div>

            {/* Summary */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300/90 max-w-2xl leading-relaxed">
              {resumeData.summary}
            </p>

            {/* Contact Pills & Actions */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {/* Location */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 shadow-xs">
                <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{resumeData.location}</span>
              </div>

              {/* Email with copy button */}
              <div className="inline-flex items-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 overflow-hidden shadow-xs">
                <a
                  id="hero-email-link"
                  href={`mailto:${resumeData.email}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{resumeData.email}</span>
                </a>
                <button
                  id="hero-copy-email"
                  type="button"
                  onMouseEnter={playHoverTick}
                  onClick={() => {
                    onCopy(resumeData.email, 'Email address');
                  }}
                  className="px-2 py-1.5 border-l border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                  title="Copy email"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </div>

              {/* Phone with copy button */}
              <div className="inline-flex items-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 overflow-hidden shadow-xs">
                <a
                  id="hero-phone-link"
                  href={`tel:${resumeData.phone}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{resumeData.phone}</span>
                </a>
                <button
                  id="hero-copy-phone"
                  type="button"
                  onMouseEnter={playHoverTick}
                  onClick={() => {
                    onCopy(resumeData.phone, 'Phone number');
                  }}
                  className="px-2 py-1.5 border-l border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                  title="Copy phone"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </div>

              {/* LinkedIn */}
              <a
                id="hero-linkedin-link"
                href={resumeData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverTick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 shadow-xs transition-all"
              >
                <span>LinkedIn</span>
                <ExternalLink className="h-3 w-3 text-cyan-500" />
              </a>

              {/* GitHub */}
              <a
                id="hero-github-link"
                href={resumeData.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverTick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/40 shadow-xs transition-all"
              >
                <span>GitHub</span>
                <ExternalLink className="h-3 w-3 text-emerald-500" />
              </a>

              {/* Share Live on LinkedIn */}
              <a
                id="hero-share-linkedin-link"
                href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fais-pre-gnmr4o5grensvs4fmwi7hb-365893322122.asia-southeast1.run.app"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverTick}
                onClick={playClickSound}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/80 text-xs font-semibold text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900/60 shadow-xs transition-all"
                title="Publish or share this live portfolio directly to your LinkedIn network"
              >
                <Share2 className="h-3 w-3 text-sky-600 dark:text-sky-400" />
                <span>Share on LinkedIn</span>
              </a>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                id="hero-btn-explore-projects"
                href="#projects"
                onMouseEnter={playHoverTick}
                onClick={playClickSound}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-md shadow-emerald-900/20 transition-all hover:translate-y-[-1px]"
              >
                <span>Explore Projects</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                id="hero-btn-download-resume"
                type="button"
                onMouseEnter={playHoverTick}
                onClick={() => {
                  playClickSound();
                  onOpenResume();
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-sm font-medium border border-emerald-500/30 transition-all shadow-xs"
                title="Download or Print Resume"
              >
                <Download className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Download Resume</span>
              </button>

              <button
                id="hero-btn-view-resume"
                type="button"
                onMouseEnter={playHoverTick}
                onClick={() => {
                  playClickSound();
                  onOpenResume();
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-medium border border-slate-200 dark:border-slate-800 shadow-xs transition-all"
              >
                <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>View Full Resume</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
                  R
                </kbd>
              </button>

              <a
                id="hero-btn-contact-me"
                href="#contact"
                onMouseEnter={playHoverTick}
                onClick={playClickSound}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-white text-sm font-medium transition-colors"
              >
                <span>Contact Direct</span>
              </a>
            </div>
          </div>

          {/* Interactive Profile Showcase Column with Photo & Terminal */}
          <div className="lg:col-span-5 space-y-5">
            {/* Featured Portrait Photo Card with Drag & Drop */}
            <div
              id="hero-portrait-card"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative rounded-2xl bg-white dark:bg-slate-900/90 border transition-all p-3 sm:p-4 shadow-xl shadow-slate-200/50 dark:shadow-black/40 group overflow-hidden ${
                isDragging
                  ? 'border-emerald-500 ring-4 ring-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20'
                  : 'border-slate-200 dark:border-slate-800/90'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload profile photo"
              />

              <div className="relative rounded-xl overflow-hidden aspect-[3/4] max-h-[380px] w-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
                <img
                  src={displayedPhoto}
                  alt={resumeData.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Drag-and-drop overlay */}
                {isDragging && (
                  <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4 text-center z-20">
                    <Upload className="h-10 w-10 text-emerald-400 mb-2 animate-bounce" />
                    <p className="font-semibold text-sm">Drop your photo here</p>
                    <p className="text-xs text-emerald-200">Will be applied as profile photo</p>
                  </div>
                )}

                {/* Gradient scrim for label legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Top Action Buttons (Toggle Background, Upload, Reset, Zoom) */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                  {!hasCustomPhoto && (
                    <button
                      type="button"
                      onMouseEnter={playHoverTick}
                      onClick={() => {
                        playClickSound();
                        setShowOriginalBackground((prev) => !prev);
                      }}
                      className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-md flex items-center gap-1.5 text-xs font-medium ${
                        showOriginalBackground
                          ? 'bg-amber-500/90 hover:bg-amber-600 text-white'
                          : 'bg-slate-900/70 hover:bg-slate-900 text-white'
                      }`}
                      title={showOriginalBackground ? 'Switch to Clean Studio Background' : 'View Original Wall Background'}
                      aria-label="Toggle background"
                    >
                      <Layers className="h-3.5 w-3.5 text-cyan-300" />
                      <span className="hidden sm:inline">
                        {showOriginalBackground ? 'Orig BG' : 'Clean BG'}
                      </span>
                    </button>
                  )}

                  <button
                    type="button"
                    onMouseEnter={playHoverTick}
                    onClick={() => {
                      playClickSound();
                      fileInputRef.current?.click();
                    }}
                    className="p-2 rounded-xl bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md transition-all shadow-md flex items-center gap-1.5 text-xs font-medium"
                    title="Upload original photo"
                    aria-label="Upload original photo"
                  >
                    <Upload className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">Upload</span>
                  </button>

                  {hasCustomPhoto && (
                    <button
                      type="button"
                      onMouseEnter={playHoverTick}
                      onClick={() => {
                        playClickSound();
                        resetPhoto();
                      }}
                      className="p-2 rounded-xl bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md transition-all shadow-md"
                      title="Reset photo"
                      aria-label="Reset photo"
                    >
                      <RotateCcw className="h-3.5 w-3.5 text-amber-400" />
                    </button>
                  )}

                  <button
                    type="button"
                    onMouseEnter={playHoverTick}
                    onClick={() => {
                      playClickSound();
                      setIsPhotoModalOpen(true);
                    }}
                    className="p-2 rounded-xl bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md transition-all shadow-md"
                    title="View full photo"
                    aria-label="View full photo"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                </div>

                {/* Status toast message */}
                {uploadStatus && (
                  <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-xl bg-slate-900/90 text-emerald-300 text-xs font-medium backdrop-blur-md shadow-md border border-emerald-500/30">
                    {uploadStatus}
                  </div>
                )}

                {/* Floating identity pill at bottom of photo */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base leading-tight">
                      {resumeData.name}
                    </h3>
                    <p className="text-[11px] text-emerald-300 font-mono">
                      {resumeData.title}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <Sparkles className="h-3 w-3" />
                    Surat, IN
                  </span>
                </div>
              </div>

              {/* Quick Tech Tag Pills */}
              <div className="flex items-center justify-between gap-1.5 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-[11px] font-mono text-slate-600 dark:text-slate-400 px-1">
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  Python
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  Flask
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  MySQL
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  React
                </span>
              </div>
            </div>

            {/* Quick Spec Terminal Widget */}
            <div
              id="hero-profile-terminal-card"
              className="relative rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/90 p-4 sm:p-5 shadow-md shadow-slate-200/50 dark:shadow-black/40 backdrop-blur-sm"
            >
              {/* Terminal Window Controls */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5 mb-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Terminal className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  nilam_panchal.py
                </span>
              </div>

              {/* Quick Stat Tiles */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                  <span className="text-lg font-bold text-slate-900 dark:text-white block">2</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Tech Internships</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 block">4+</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Web Projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Size Photo Lightbox Modal */}
      {isPhotoModalOpen && (
        <div
          id="photo-lightbox-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsPhotoModalOpen(false)}
        >
          <div
            className="relative max-w-lg w-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsPhotoModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white transition-colors"
              aria-label="Close photo preview"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={displayedPhoto}
              alt={resumeData.name}
              referrerPolicy="no-referrer"
              className="w-full h-auto rounded-xl object-cover max-h-[80vh]"
            />
            <div className="p-3 text-center">
              <h4 className="font-bold text-slate-900 dark:text-white">{resumeData.name}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{resumeData.title} • {resumeData.location}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
