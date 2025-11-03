import { Trophy, Flame, Star, BadgeCheck } from "lucide-react";

export default function StatsPanel({ stats }) {
  return (
    <section className="max-w-5xl mx-auto px-4 mt-4">
      <div className="rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-black/5 dark:divide-white/10">
          <StatTile icon={<Flame size={16} />} label="Streak" value={`${stats.streak}j`} />
          <StatTile icon={<Star size={16} />} label="Likes" value={stats.likes} />
          <StatTile icon={<BadgeCheck size={16} />} label="Badges" value={stats.badges.length} />
          <StatTile icon={<Trophy size={16} />} label="Niveau" value={stats.level} />
        </div>
        <div className="p-4">
          <p className="text-sm text-black/70 dark:text-white/70">Défi en cours</p>
          <div className="mt-2 h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500"
              style={{ width: `${Math.min((stats.challengeProgress / stats.challengeGoal) * 100, 100)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-black/60 dark:text-white/60">
            Swipe {stats.challengeGoal} phrases cette semaine. Progrès: {stats.challengeProgress}/{stats.challengeGoal}
          </p>
        </div>
      </div>
    </section>
  );
}

function StatTile({ icon, label, value }) {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 text-black/70 dark:text-white/70 text-sm">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}
