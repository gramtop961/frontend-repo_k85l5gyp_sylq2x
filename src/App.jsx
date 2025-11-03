import { useMemo, useState } from "react";
import NavBar from "./components/NavBar";
import ThemeFilters from "./components/ThemeFilters";
import QuoteSwiper from "./components/QuoteSwiper";
import StatsPanel from "./components/StatsPanel";

export default function App() {
  const [selectedThemes, setSelectedThemes] = useState(["Motivation", "Tech", "Business"]);
  const [gradient, setGradient] = useState({ id: "sunset", class: "from-amber-400 via-pink-500 to-fuchsia-600" });
  const [typography, setTypography] = useState({ id: "sans", class: "font-sans" });
  const [premiumOpen, setPremiumOpen] = useState(false);

  const gradientClass = useMemo(() => `from-20% via-30% to-90% ${gradient.class}`, [gradient]);
  const typographyClass = typography.class;

  const stats = {
    streak: 5,
    likes: 128,
    badges: ["Starter", "Streak 3j"],
    level: 3,
    challengeProgress: 22,
    challengeGoal: 35,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-100 dark:from-black dark:to-zinc-950 text-zinc-900 dark:text-zinc-100">
      <NavBar onOpenPremium={() => setPremiumOpen(true)} />

      <ThemeFilters
        selectedThemes={selectedThemes}
        onThemesChange={setSelectedThemes}
        gradient={gradient}
        onGradientChange={setGradient}
        typography={typography}
        onTypographyChange={setTypography}
      />

      <QuoteSwiper
        selectedThemes={selectedThemes}
        gradientClass={gradientClass}
        typographyClass={typographyClass}
      />

      <StatsPanel stats={stats} />

      {premiumOpen && (
        <PremiumSheet onClose={() => setPremiumOpen(false)} />
      )}

      <FooterNote />
    </div>
  );
}

function PremiumSheet({ onClose }) {
  return (
    <div className="fixed inset-0 z-30 grid place-items-end sm:place-items-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full sm:w-[520px] max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 shadow-2xl">
        <div className="p-6">
          <h3 className="text-xl font-semibold">Passe Premium</h3>
          <p className="mt-1 text-sm text-black/60 dark:text-white/60">
            Débloque des thèmes exclusifs, supprime les pubs et accède aux effets d'animation premium.
          </p>
          <ul className="mt-4 space-y-2 text-sm list-disc pl-5">
            <li>Accès aux citations premium et packs thématiques</li>
            <li>Personnalisation avancée (couleurs, typo, animations)</li>
            <li>Mode Nuit & Relax sans interruption</li>
            <li>Badges et effets exclusifs sur le profil</li>
          </ul>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl p-4 border border-black/10 dark:border-white/10">
              <p className="text-sm font-medium">Mensuel</p>
              <p className="text-2xl font-semibold mt-1">3,99 €</p>
              <p className="text-xs text-black/60 dark:text-white/60">Annulable à tout moment</p>
              <button className="mt-3 w-full py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black">Choisir</button>
            </div>
            <div className="rounded-2xl p-4 border border-amber-400/40 bg-amber-50/40 dark:bg-amber-500/10">
              <p className="text-sm font-medium">Annuel</p>
              <p className="text-2xl font-semibold mt-1">29,99 €</p>
              <p className="text-xs text-black/60 dark:text-white/60">2 mois offerts</p>
              <button className="mt-3 w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white">Recommandé</button>
            </div>
          </div>
          <button onClick={onClose} className="mt-6 w-full py-2 rounded-xl border border-black/10 dark:border-white/10">Fermer</button>
        </div>
      </div>
    </div>
  );
}

function FooterNote() {
  return (
    <footer className="max-w-5xl mx-auto px-4 py-8 text-center text-xs text-black/60 dark:text-white/60">
      Concept UI "DailySwipe" — démo frontend (swipe type TikTok, thèmes, gamification, premium). Partagez, likez, sauvegardez — et revenez chaque jour pour garder votre streak.
    </footer>
  );
}
