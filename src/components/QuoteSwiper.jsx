import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Bookmark, MessageCircle } from "lucide-react";

const QUOTES = [
  { id: 1, text: "Chaque jour compte. Fais que le tien soit légendaire.", author: "Anon", theme: "Motivation" },
  { id: 2, text: "Le code est comme l'humour. Quand tu dois l'expliquer, il n'est pas bon.", author: "Cory House", theme: "Tech" },
  { id: 3, text: "L'amour, c'est vouloir le bonheur de l'autre, parfois avant le sien.", author: "JP Sartre", theme: "Amour" },
  { id: 4, text: "Si tu ne construis pas ton rêve, quelqu'un t'embauchera pour construire le sien.", author: "Tony Gaskins", theme: "Business" },
  { id: 5, text: "Ton esprit est ton arme secrète. Hacke-le avec des habitudes.", author: "Anon", theme: "Mind Hacks" },
  { id: 6, text: "Le meilleur moyen de résister à la tentation, c'est d'y céder… à la productivité.", author: "Oscar Wilde (remix)", theme: "Humour" },
  { id: 7, text: "Ils ne savaient pas que c'était impossible, alors ils l'ont fait.", author: "Mark Twain", theme: "Célèbres" },
];

export default function QuoteSwiper({ selectedThemes, gradientClass, typographyClass }) {
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});

  const filtered = useMemo(() => {
    if (!selectedThemes?.length) return QUOTES;
    return QUOTES.filter((q) => selectedThemes.includes(q.theme));
  }, [selectedThemes]);

  const current = filtered[index % filtered.length] || filtered[0];

  const handleSwipe = (direction) => {
    if (direction === "next") {
      setIndex((i) => (i + 1) % filtered.length);
    } else {
      setIndex((i) => (i - 1 + filtered.length) % filtered.length);
    }
  };

  const onDragEnd = (_e, info) => {
    const threshold = 80;
    if (info.offset.y > threshold || info.velocity.y > 600) {
      handleSwipe("next");
    } else if (info.offset.y < -threshold || info.velocity.y < -600) {
      handleSwipe("prev");
    }
  };

  const onShare = async (q) => {
    const payload = `${q.text} — ${q.author}`;
    if (navigator.share) {
      try {
        await navigator.share({ text: payload });
      } catch (e) {
        // ignore
      }
    } else {
      try {
        await navigator.clipboard.writeText(payload);
        alert("Copié dans le presse-papiers ✨");
      } catch (e) {
        // ignore
      }
    }
  };

  return (
    <section className="relative">
      <div className="max-w-5xl mx-auto px-4 mt-4">
        <div className={`relative h-[70vh] sm:h-[76vh] rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 bg-gradient-to-br ${gradientClass}`}>
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />

          <div className="absolute inset-0 p-6 sm:p-10 flex flex-col">
            <div className="flex items-center justify-between text-white/90">
              <span className="text-xs uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">{current.theme}</span>
              <span className="text-xs">{index + 1}/{filtered.length}</span>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={current.id}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  onDragEnd={onDragEnd}
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 500, damping: 40, mass: 1 }}
                  className={`text-center text-white drop-shadow-xl ${typographyClass}`}
                >
                  <blockquote className="text-2xl sm:text-4xl md:text-5xl font-semibold leading-tight">
                    “{current.text}”
                  </blockquote>
                  <p className="mt-4 text-white/80 text-sm sm:text-base">— {current.author}</p>
                  <p className="mt-6 text-xs text-white/70">Swipe vers le haut ou le bas</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <IconButton
                active={!!liked[current.id]}
                onClick={() => setLiked((s) => ({ ...s, [current.id]: !s[current.id] }))}
                icon={<Heart className={liked[current.id] ? "fill-white" : ""} />}
                label="Like"
              />
              <IconButton onClick={() => onShare(current)} icon={<Share2 />} label="Partager" />
              <IconButton
                active={!!saved[current.id]}
                onClick={() => setSaved((s) => ({ ...s, [current.id]: !s[current.id] }))}
                icon={<Bookmark className={saved[current.id] ? "fill-white" : ""} />}
                label="Sauvegarder"
              />
              <IconButton onClick={() => alert("Commentaires bientôt disponibles ✨") } icon={<MessageCircle />} label="Commenter" />
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-black/60 dark:text-white/60">
          <span className="hidden sm:block">Astuce:</span>
          <button className="underline decoration-dotted" onClick={() => handleSwipe("prev")}>Précédent</button>
          <span>•</span>
          <button className="underline decoration-dotted" onClick={() => handleSwipe("next")}>Suivant</button>
        </div>
      </div>
    </section>
  );
}

function IconButton({ icon, label, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-white bg-white/15 hover:bg-white/25 backdrop-blur border border-white/20 transition-colors ${
        active ? "ring-2 ring-white/70" : ""
      }`}
    >
      {icon}
      <span className="text-sm hidden sm:inline">{label}</span>
    </button>
  );
}
