import { Crown, Settings, Flame } from "lucide-react";

export default function NavBar({ onOpenPremium }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/30 bg-white/70 dark:bg-black/40 border-b border-black/5 dark:border-white/10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-indigo-500 grid place-items-center text-white">
            <Flame size={18} />
          </div>
          <div className="leading-tight">
            <h1 className="text-lg font-semibold tracking-tight">DailySwipe</h1>
            <p className="text-xs text-black/60 dark:text-white/60">Swipe. Inspire. Repeat.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPremium}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white text-sm shadow hover:shadow-md transition-shadow"
          >
            <Crown size={16} /> Premium
          </button>
          <button
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="Settings"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
