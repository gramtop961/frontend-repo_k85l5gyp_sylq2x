import { useState, useEffect } from "react";
import { SlidersHorizontal, Palette, Type } from "lucide-react";

const ALL_THEMES = [
  "Motivation",
  "Humour",
  "Amour",
  "Business",
  "Tech",
  "Mind Hacks",
  "Célèbres",
];

const GRADIENTS = [
  { id: "sunset", label: "Sunset", class: "from-amber-400 via-pink-500 to-fuchsia-600" },
  { id: "ocean", label: "Ocean", class: "from-cyan-400 via-sky-500 to-indigo-600" },
  { id: "forest", label: "Forest", class: "from-emerald-400 via-teal-500 to-cyan-600" },
  { id: "royal", label: "Royal", class: "from-violet-500 via-purple-600 to-indigo-700" },
  { id: "mono", label: "Mono", class: "from-zinc-200 via-zinc-300 to-zinc-400 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-900" },
];

const TYPOGRAPHIES = [
  { id: "sans", label: "Sans (Inter)", class: "font-sans" },
  { id: "serif", label: "Serif (Plex)", class: "font-serif" },
  { id: "mono", label: "Mono (IBM Plex Mono)", class: "font-mono" },
];

export default function ThemeFilters({
  selectedThemes,
  onThemesChange,
  gradient,
  onGradientChange,
  typography,
  onTypographyChange,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Close on escape
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleTheme = (t) => {
    const exists = selectedThemes.includes(t);
    const next = exists
      ? selectedThemes.filter((x) => x !== t)
      : [...selectedThemes, t];
    onThemesChange(next);
  };

  return (
    <section className="max-w-5xl mx-auto px-4 mt-4">
      <button
        className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <SlidersHorizontal size={18} />
        <span className="text-sm font-medium">Thèmes & Filtres</span>
      </button>

      {open && (
        <div className="mt-3 grid gap-4 rounded-2xl p-4 bg-white/70 dark:bg-black/40 backdrop-blur border border-black/5 dark:border-white/10">
          <div>
            <p className="text-xs uppercase tracking-widest text-black/60 dark:text-white/60 mb-2">Thèmes</p>
            <div className="flex flex-wrap gap-2">
              {ALL_THEMES.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleTheme(t)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                    selectedThemes.includes(t)
                      ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                      : "bg-transparent border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-black/60 dark:text-white/60 mb-2 flex items-center gap-2"><Palette size={16}/> Dégradé</p>
            <div className="flex flex-wrap gap-3">
              {GRADIENTS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => onGradientChange(g)}
                  className={`h-10 px-3 rounded-xl border text-sm flex items-center gap-2 bg-gradient-to-r ${g.class} ${
                    gradient?.id === g.id
                      ? "ring-2 ring-offset-2 ring-black/60 dark:ring-white/70"
                      : "border-black/10 dark:border-white/10"
                  }`}
                >
                  <span className="inline-block h-5 w-5 rounded-full bg-white/80" />
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-black/60 dark:text-white/60 mb-2 flex items-center gap-2"><Type size={16}/> Typographie</p>
            <div className="flex gap-2">
              {TYPOGRAPHIES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onTypographyChange(t)}
                  className={`px-3 py-1.5 rounded-xl border text-sm ${
                    typography?.id === t.id
                      ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                      : "bg-transparent border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
