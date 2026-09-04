import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  if (!message) return null;

  return (
    <div
      id="clipboard-toast"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900/95 text-slate-100 border border-emerald-500/40 px-4 py-3 rounded-xl shadow-2xl shadow-emerald-950/40 backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
        <Check className="h-4 w-4" />
      </div>
      <p className="text-sm font-medium">{message}</p>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-slate-200 transition-colors"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
