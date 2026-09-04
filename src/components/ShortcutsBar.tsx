import { useState } from 'react';
import { Keyboard, Sun, Moon, FileText, X, Volume2, VolumeX } from 'lucide-react';
import { useAudioFeedback } from '../hooks/useAudioFeedback';

interface ShortcutsBarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenResume: () => void;
  onOpenShortcuts: () => void;
}

export function ShortcutsBar({
  theme,
  onToggleTheme,
  onOpenResume,
  onOpenShortcuts,
}: ShortcutsBarProps) {
  const [minimized, setMinimized] = useState(false);
  const { soundEnabled, toggleSound, playHover } = useAudioFeedback();

  if (minimized) {
    return (
      <button
        id="btn-expand-shortcuts"
        type="button"
        onClick={() => setMinimized(false)}
        className="fixed bottom-4 left-4 z-30 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-lg backdrop-blur-md text-xs font-medium hover:border-emerald-500/50 transition-all hover:scale-105"
        title="Keyboard shortcuts available (Press ?)"
        aria-label="Show keyboard shortcuts indicator"
      >
        <Keyboard className="h-3.5 w-3.5 text-emerald-500" />
        <span className="font-mono text-[11px] font-bold">[?]</span>
      </button>
    );
  }

  return (
    <div
      id="shortcuts-floating-bar"
      className="fixed bottom-4 left-4 z-30 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-slate-800/90 shadow-xl shadow-black/10 dark:shadow-black/40 backdrop-blur-md text-xs transition-all duration-200"
    >
      <button
        type="button"
        onClick={onOpenShortcuts}
        className="flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        title="View all shortcuts"
      >
        <Keyboard className="h-3.5 w-3.5 text-emerald-500" />
        <span className="text-[11px] font-semibold">Shortcuts:</span>
      </button>

      <div className="h-3 w-px bg-slate-300 dark:bg-slate-700" />

      {/* Theme Shortcut */}
      <button
        id="shortcut-indicator-theme"
        type="button"
        onClick={onToggleTheme}
        className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        title="Toggle Theme (Press M)"
      >
        <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[10px] font-mono font-bold text-slate-800 dark:text-emerald-400">
          M
        </kbd>
        <span className="text-[11px] flex items-center gap-1">
          {theme === 'dark' ? <Sun className="h-3 w-3 text-amber-400" /> : <Moon className="h-3 w-3 text-cyan-500" />}
          Theme
        </span>
      </button>

      <div className="h-3 w-px bg-slate-300 dark:bg-slate-700" />

      {/* Resume Shortcut */}
      <button
        id="shortcut-indicator-resume"
        type="button"
        onClick={onOpenResume}
        className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        title="View Resume (Press R)"
      >
        <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[10px] font-mono font-bold text-slate-800 dark:text-emerald-400">
          R
        </kbd>
        <span className="text-[11px] flex items-center gap-1">
          <FileText className="h-3 w-3 text-emerald-500" />
          Resume
        </span>
      </button>

      <div className="h-3 w-px bg-slate-300 dark:bg-slate-700" />

      {/* Audio Shortcut */}
      <button
        id="shortcut-indicator-audio"
        type="button"
        onMouseEnter={playHover}
        onClick={toggleSound}
        className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        title={soundEnabled ? 'Mute audio (Press S)' : 'Enable audio (Press S)'}
      >
        <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[10px] font-mono font-bold text-slate-800 dark:text-emerald-400">
          S
        </kbd>
        <span className="text-[11px] flex items-center gap-1">
          {soundEnabled ? (
            <Volume2 className="h-3 w-3 text-emerald-500" />
          ) : (
            <VolumeX className="h-3 w-3 text-slate-400" />
          )}
          Sound
        </span>
      </button>

      <div className="h-3 w-px bg-slate-300 dark:bg-slate-700" />

      {/* Minimize */}
      <button
        type="button"
        onClick={() => setMinimized(true)}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors ml-0.5"
        title="Minimize indicator"
        aria-label="Minimize shortcut indicator"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}
