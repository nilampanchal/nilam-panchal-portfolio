import { X, Keyboard, Sun, Moon, FileText, CornerDownLeft, Eye, Volume2 } from 'lucide-react';
import { useAudioFeedback } from '../hooks/useAudioFeedback';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenResume: () => void;
}

export function ShortcutsModal({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  onOpenResume,
}: ShortcutsModalProps) {
  const { soundEnabled, toggleSound } = useAudioFeedback();

  if (!isOpen) return null;

  const shortcuts = [
    {
      key: 'M',
      label: 'Toggle Theme',
      description: `Switch between dark and light themes (currently ${theme === 'dark' ? 'Dark' : 'Light'})`,
      action: onToggleTheme,
      icon: theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-cyan-500" />,
    },
    {
      key: 'S',
      label: 'Toggle Sound Effects',
      description: `Turn subtle button click and copy audio feedback on or off (currently ${soundEnabled ? 'Enabled' : 'Muted'})`,
      action: toggleSound,
      icon: <Volume2 className="h-4 w-4 text-emerald-500" />,
    },
    {
      key: 'R',
      label: 'View Resume',
      description: 'Open the printable resume modal with full details',
      action: () => {
        onClose();
        onOpenResume();
      },
      icon: <FileText className="h-4 w-4 text-emerald-500" />,
    },
    {
      key: 'Esc',
      label: 'Close Active Modal',
      description: 'Dismiss any open dialog, modal, or overlay',
      action: onClose,
      icon: <CornerDownLeft className="h-4 w-4 text-slate-400" />,
    },
    {
      key: '?',
      label: 'Keyboard Shortcuts',
      description: 'Show or hide this accessibility shortcuts cheat sheet',
      action: onClose,
      icon: <Keyboard className="h-4 w-4 text-teal-400" />,
    },
  ];

  return (
    <div
      id="shortcuts-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-modal-title"
    >
      <div
        id="shortcuts-modal-content"
        className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-800 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Keyboard className="h-4 w-4" />
            </div>
            <div>
              <h3 id="shortcuts-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                Keyboard Shortcuts
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Quick navigation for enhanced accessibility
              </p>
            </div>
          </div>

          <button
            id="btn-close-shortcuts-modal"
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close shortcuts dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Shortcuts list */}
        <div className="mt-4 space-y-2.5">
          {shortcuts.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-500/40 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">{item.icon}</div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    {item.description}
                  </div>
                </div>
              </div>

              <kbd className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-emerald-400 border border-slate-300 dark:border-slate-700 shadow-xs shrink-0 ml-3">
                {item.key}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Shortcuts disabled while typing in forms</span>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
