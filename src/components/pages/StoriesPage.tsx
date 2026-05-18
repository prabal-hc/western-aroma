/**
 * Stories Page — Western Aroma
 * Brand narratives · Customer stories · Estate chronicles
 * Premium 2026 aesthetic — matches OurEstatePage, CoffeePage & SpicesPage
 */

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "motion/react";
import { Heart, ArrowRight, Check } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────────
const STORIES = [
  {
    title: "From Bean to Cup: The Journey of Chikmagalur Monsooned",
    excerpt:
      "Discover how the unique monsoon winds of Karnataka's coast transform estate-grown coffee cherries into the legendary Chikmagalur Monsooned — a process unlike any other in the world.",
    category: "Process",
    readTime: "5 min",
    emoji: "☕",
    image:
      "https://images.unsplash.com/photo-1514432324607-2e467f4af445?q=80&w=800&auto=format&fit=crop",
    accent: "rgba(180,130,70,0.18)",
  },
  {
    title: "Arjun's Coffee Ritual: A Morning Transformed",
    excerpt:
      "Meet Arjun, a Bengaluru architect who transformed his mornings by switching to our Chikmagalur Monsooned. A quiet story of discovery, patience, and the ritual of a perfect cup.",
    category: "Customer",
    readTime: "4 min",
    emoji: "🫖",
    image:
      "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=800&auto=format&fit=crop",
    accent: "rgba(100,160,120,0.15)",
  },
  {
    title: "The Spice Routes: Malnad's Ancient Trade Legacy",
    excerpt:
      "Long before the British arrived, the Western Ghats were already famous across continents. Explore how Malnad's black pepper, cardamom and cloves shaped centuries of world trade.",
    category: "History",
    readTime: "7 min",
    emoji: "🌿",
    image:
      "https://images.unsplash.com/photo-1599599810694-b5ac4dd87282?q=80&w=800&auto=format&fit=crop",
    accent: "rgba(160,100,60,0.18)",
  },
  {
    title: "Growing Slower: Our Commitment to Shade Farming",
    excerpt:
      "At Western Aroma, we believe speed is the enemy of flavour. Our shade-grown approach means slower maturation, richer beans, and an estate in harmony with the forest around it.",
    category: "Sustainability",
    readTime: "6 min",
    emoji: "🌱",
    image:
      "https://images.unsplash.com/photo-1518611505868-48d0f0a0a0b5?q=80&w=800&auto=format&fit=crop",
    accent: "rgba(60,140,80,0.15)",
  },
  {
    title: "Inside the Roastery: The Art of Small-Batch Craft",
    excerpt:
      "Step inside our estate roastery and follow the heat curves, sensory checks and patience that our roast master puts into every single batch — and why small batch always wins.",
    category: "Process",
    readTime: "5 min",
    emoji: "🔥",
    image:
      "https://images.unsplash.com/photo-1559057748-3ff42f0d4e5d?q=80&w=800&auto=format&fit=crop",
    accent: "rgba(180,80,60,0.15)",
  },
  {
    title: "Priya's Kitchen: Malnad Spices in Modern Cooking",
    excerpt:
      "Chef Priya Krishnamurthy shares her favourite recipes from her Malnad grandmother's kitchen — reinterpreted with our estate pepper, cardamom, and turmeric for today's home cook.",
    category: "Customer",
    readTime: "8 min",
    emoji: "🫙",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop",
    accent: "rgba(200,130,60,0.15)",
  },
];

const CATEGORIES = [
  "All Stories",
  "Process",
  "Customer",
  "History",
  "Sustainability",
];

const CATEGORY_EMOJIS: Record<string, string> = {
  "All Stories": "✦",
  Process: "⚙",
  Customer: "💬",
  History: "📜",
  Sustainability: "🌿",
};

// ─── Ambient helpers (shared design language) ─────────────────────────────────
function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9990] opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "128px 128px",
      }}
    />
  );
}

function Orb({
  size,
  color,
  style,
  duration = 10,
}: {
  size: number;
  color: string;
  style?: React.CSSProperties;
  duration?: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{
        width: size,
        height: size,
        background: color,
        filter: "blur(90px)",
        opacity: 0.25,
        ...style,
      }}
      animate={{ y: [0, -20, 0], scale: [1, 1.07, 1] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function SpiceAccent({
  x,
  y,
  size = 4,
  delay = 0,
}: {
  x: string;
  y: string;
  size?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full bg-brand-primary pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, opacity: 0 }}
      animate={{ opacity: [0, 0.28, 0], scale: [0.8, 1.6, 0.8] }}
      transition={{ duration: 4.5, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

// ─── Story Card ────────────────────────────────────────────────────────────────
function StoryCard({
  story,
  idx,
}: {
  story: (typeof STORIES)[0];
  idx: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }, []);

  const categoryColors: Record<
    string,
    { bg: string; border: string; text: string }
  > = {
    Process: {
      bg: "rgba(180,130,70,0.18)",
      border: "rgba(180,130,70,0.4)",
      text: "rgba(220,170,90,0.95)",
    },
    Customer: {
      bg: "rgba(100,160,120,0.18)",
      border: "rgba(100,180,130,0.4)",
      text: "rgba(130,210,160,0.9)",
    },
    History: {
      bg: "rgba(160,100,60,0.18)",
      border: "rgba(180,120,60,0.4)",
      text: "rgba(220,160,100,0.9)",
    },
    Sustainability: {
      bg: "rgba(60,140,80,0.18)",
      border: "rgba(60,160,80,0.4)",
      text: "rgba(100,200,120,0.9)",
    },
  };
  const cc = categoryColors[story.category] ?? categoryColors.Process;

  return (
    <motion.article
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
      className="group relative rounded-3xl overflow-hidden flex flex-col cursor-pointer"
      style={{ outline: "none" }}
      tabIndex={0}
      role="article"
      aria-label={story.title}
    >
      {/* Glass base */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        animate={{
          boxShadow: hovered
            ? "inset 0 0 0 1px rgba(180,130,70,0.5), 0 32px 80px rgba(0,0,0,0.55)"
            : "inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
        transition={{ duration: 0.4 }}
        style={{
          background:
            "linear-gradient(145deg, rgba(26,18,8,0.96) 0%, rgba(14,9,3,0.98) 100%)",
        }}
      />

      {/* Inner sheen */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.025) 0%, transparent 55%)",
        }}
      />

      {/* Cursor spotlight */}
      {hovered && (
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle 200px at ${spot.x}% ${spot.y}%, rgba(180,130,70,0.13) 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Image */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ height: 220, zIndex: 5 }}
      >
        <motion.img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(14,9,3,0.12) 0%, rgba(14,9,3,0.85) 100%)",
          }}
        />

        {/* Emoji accent */}
        <motion.div
          className="absolute top-4 left-4 w-10 h-10 rounded-2xl flex items-center justify-center text-xl"
          style={{
            background: "rgba(12,8,4,0.68)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
          animate={{ y: hovered ? -3 : 0 }}
          transition={{ duration: 0.35 }}
        >
          {story.emoji}
        </motion.div>

        {/* Category badge */}
        <div
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-label-caps tracking-widest"
          style={{
            background: cc.bg,
            border: `1px solid ${cc.border}`,
            color: cc.text,
          }}
        >
          {story.category}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col flex-grow p-7">
        <motion.h3
          className="font-display text-xl mb-3 text-white leading-snug"
          animate={{
            color: hovered ? "rgba(220,170,90,1)" : "rgba(255,255,255,1)",
          }}
          transition={{ duration: 0.3 }}
        >
          {story.title}
        </motion.h3>

        <p className="text-sm text-brand-text-muted mb-6 leading-relaxed flex-grow line-clamp-3">
          {story.excerpt}
        </p>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span className="text-label-caps text-[10px] tracking-widest text-brand-text-muted">
            {story.readTime} READ
          </span>
          <motion.div
            className="flex items-center gap-2 text-brand-primary text-label-caps text-xs tracking-widest"
            animate={{ x: hovered ? 5 : 0 }}
            transition={{ duration: 0.25 }}
          >
            READ STORY
            <ArrowRight size={14} />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Category Filter Pill ──────────────────────────────────────────────────────
function CategoryPill({
  label,
  active,
  onClick,
  delay,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  delay: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 12, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      aria-pressed={active}
      className="relative flex items-center gap-2 px-5 py-2.5 rounded-full text-xs tracking-widest font-label-caps overflow-hidden transition-all"
      style={{
        background: active
          ? "rgba(180,130,70,0.18)"
          : "rgba(255,255,255,0.025)",
        border: active
          ? "1px solid rgba(180,130,70,0.5)"
          : "1px solid rgba(255,255,255,0.07)",
        color: active ? "rgba(220,170,90,0.95)" : "rgba(160,150,135,0.8)",
        transition: "background 0.3s, border 0.3s, color 0.3s",
      }}
    >
      {/* Active glow */}
      {active && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(180,130,70,0.12) 0%, transparent 70%)",
          }}
          layoutId="pill-glow"
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      <span className="relative z-10">{CATEGORY_EMOJIS[label]}</span>
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}

// ─── Featured Testimonial ──────────────────────────────────────────────────────
function FeaturedQuote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="relative rounded-3xl p-1 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(180,130,70,0.2) 0%, rgba(255,255,255,0.04) 50%, rgba(180,130,70,0.1) 100%)",
      }}
    >
      <div
        className="rounded-[22px] p-12 md:p-20 relative overflow-hidden text-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(20,14,6,0.98) 0%, rgba(12,8,3,0.99) 100%)",
        }}
      >
        {/* Aurora */}
        <motion.div
          className="pointer-events-none absolute -inset-[100%] opacity-12"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, #b48246 10%, transparent 25%, #4a3520 45%, transparent 60%, #b48246 75%, transparent 100%)",
            filter: "blur(70px)",
          }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-brand-primary pointer-events-none"
            style={{ left: `${10 + i * 16}%`, top: `${20 + (i % 3) * 30}%` }}
            animate={{
              y: [0, -14, 0],
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3.5 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            animate={{ scale: [1, 1.06, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mb-8 w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(180,130,70,0.12)",
              border: "1px solid rgba(180,130,70,0.28)",
            }}
          >
            <Heart className="text-brand-primary" size={28} />
          </motion.div>

          <blockquote
            className="font-display text-2xl md:text-4xl text-white leading-[1.25] mb-8 italic"
            style={{
              background:
                "linear-gradient(135deg, #e8d5b0 0%, #b48246 50%, #e8d5b0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            "Western Aroma isn't just about coffee and spices. It's about
            connecting with a legacy, supporting sustainability, and
            experiencing flavours that genuinely matter."
          </blockquote>

          <div className="flex items-center justify-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-display text-sm text-brand-primary"
              style={{
                background: "rgba(180,130,70,0.15)",
                border: "1px solid rgba(180,130,70,0.3)",
              }}
            >
              WA
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-label-caps tracking-widest">
                Aroma Club Member
              </p>
              <p className="text-brand-text-muted text-[10px] tracking-widest">
                Coffee & Spice Enthusiast
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Newsletter CTA ────────────────────────────────────────────────────────────
function NewsletterStrip() {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setEmail("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="relative rounded-3xl p-12 md:p-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(28,20,8,0.96) 0%, rgba(18,12,4,0.98) 100%)",
        border: "1px solid rgba(180,130,70,0.18)",
        boxShadow:
          "0 40px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(180,130,70,0.08)",
      }}
    >
      {/* Aurora */}
      <motion.div
        className="pointer-events-none absolute -inset-[100%] opacity-15"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, #b48246 12%, transparent 28%, #4a3520 48%, transparent 62%, #b48246 78%, transparent 100%)",
          filter: "blur(70px)",
        }}
      />

      {/* Floating dots */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-brand-primary pointer-events-none"
          style={{ left: `${15 + i * 18}%`, top: `${25 + (i % 3) * 25}%` }}
          animate={{
            y: [0, -14, 0],
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i * 0.45,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <span className="text-label-caps text-brand-primary text-xs tracking-widest block mb-4">
          STAY IN THE STORY
        </span>
        <h2 className="font-display text-4xl md:text-5xl text-white mb-5 leading-tight">
          Subscribe for Stories
        </h2>
        <p className="text-brand-text-muted mb-10 leading-relaxed">
          Get curated estate chronicles, seasonal harvest updates, recipes from
          Malnad kitchens, and exclusive member insights delivered weekly.
        </p>

        <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
          <div className="relative flex-grow">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Enter your email address"
              className="w-full bg-transparent py-4 px-2 text-white placeholder:text-brand-text-muted/50 focus:outline-none text-base"
              style={{
                borderBottom: `1px solid ${focused ? "rgba(180,130,70,0.8)" : "rgba(180,130,70,0.2)"}`,
                transition: "border-color 0.3s",
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 h-[1px] bg-brand-primary"
              animate={{ width: focused ? "100%" : "0%" }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <motion.button
            onClick={handleSubmit}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 16px 50px rgba(180,130,70,0.28)",
            }}
            whileTap={{ scale: 0.97 }}
            className="flex-shrink-0 flex items-center justify-center gap-2 px-10 py-4 rounded-full font-label-caps text-sm tracking-widest text-brand-on-primary relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #b48246 0%, #d4a060 50%, #b48246 100%)",
            }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.span
                  key="done"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="flex items-center gap-2"
                >
                  <Check size={15} />
                  Subscribed
                </motion.span>
              ) : (
                <motion.span
                  key="sub"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                >
                  Subscribe
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <p className="mt-8 text-label-caps text-[10px] text-brand-text-muted/40 tracking-widest">
          BY SUBSCRIBING, YOU AGREE TO OUR PRIVACY POLICY · NO SPAM, EVER
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export function StoriesPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  const [activeCategory, setActiveCategory] = useState(0);

  const filteredStories =
    activeCategory === 0
      ? STORIES
      : STORIES.filter((s) => s.category === CATEGORIES[activeCategory]);

  return (
    <div className="min-h-screen bg-[#0c0c0a] text-white overflow-x-hidden pt-24">
      <GrainOverlay />

      {/* ── HERO ───────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative py-28 px-6 md:px-20 overflow-hidden"
      >
        <Orb
          size={700}
          color="radial-gradient(circle, rgba(180,130,70,0.2) 0%, transparent 70%)"
          style={{ top: "-18%", left: "-6%" }}
          duration={11}
        />
        <Orb
          size={450}
          color="radial-gradient(circle, rgba(50,35,15,0.55) 0%, transparent 70%)"
          style={{ bottom: "0%", right: "-6%" }}
          duration={13}
        />

        {/* Accent dots */}
        <SpiceAccent x="8%" y="24%" size={5} delay={0} />
        <SpiceAccent x="88%" y="32%" size={3} delay={1.3} />
        <SpiceAccent x="62%" y="76%" size={4} delay={2.0} />
        <SpiceAccent x="94%" y="58%" size={3} delay={0.9} />

        {/* Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[520, 820].map((s, i) => (
            <motion.div
              key={s}
              className="absolute rounded-full"
              style={{
                width: s,
                height: s,
                border: "1px solid rgba(180,130,70,0.055)",
              }}
              animate={{
                scale: [1, 1.04 + i * 0.02, 1],
                opacity: [0.22, 0.5, 0.22],
              }}
              transition={{
                duration: 9 + i * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5,
              }}
            />
          ))}
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-[1440px] mx-auto text-center relative z-10"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "1.8em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-label-caps text-brand-primary mb-6 block text-xs"
          >
            WESTERN AROMA · STORIES & CHRONICLES
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-7xl mb-8 leading-[1.05]"
            style={{
              background:
                "linear-gradient(135deg, #e8d5b0 0%, #b48246 40%, #c9975a 70%, #e8d5b0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Stories from
            <br />
            the Estate
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-brand-text-muted max-w-2xl mx-auto leading-relaxed"
          >
            Behind every cup and spice blend are stories of passion, heritage,
            and dedication. Explore the narratives that shape who we are — from
            the Malnad hills to your table.
          </motion.p>
        </motion.div>
      </section>

      {/* ── CATEGORY FILTER ────────────────────────── */}
      <section className="py-10 px-6 md:px-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex justify-center gap-3 flex-wrap">
            {CATEGORIES.map((category, idx) => (
              <CategoryPill
                key={category}
                label={category}
                active={activeCategory === idx}
                onClick={() => setActiveCategory(idx)}
                delay={idx * 0.06}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── STORIES GRID ───────────────────────────── */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="text-label-caps text-brand-text-muted text-xs tracking-widest block mb-2">
                ESTATE CHRONICLES
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-white">
                {activeCategory === 0
                  ? "All Stories"
                  : CATEGORIES[activeCategory]}
              </h2>
            </div>
            <motion.span
              className="hidden md:block text-label-caps text-brand-primary text-xs tracking-widest"
              whileHover={{ x: 4 }}
            >
              {filteredStories.length}{" "}
              {filteredStories.length === 1 ? "Story" : "Stories"} →
            </motion.span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              style={{ perspective: "1400px" }}
            >
              {filteredStories.map((story, idx) => (
                <StoryCard key={story.title} story={story} idx={idx} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredStories.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 text-brand-text-muted font-display text-2xl"
            >
              No stories yet in this category.
            </motion.div>
          )}
        </div>
      </section>

      {/* ── STATS BELT ─────────────────────────────── */}
      <section className="py-16 px-6 md:px-20 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(12,12,10,1) 0%, rgba(28,20,10,0.4) 50%, rgba(12,12,10,1) 100%)",
          }}
        />
        <Orb
          size={450}
          color="radial-gradient(circle, rgba(40,28,12,0.5) 0%, transparent 70%)"
          style={{ top: "-20%", left: "38%" }}
          duration={12}
        />

        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Stories Published", value: "50+" },
              { label: "Customer Features", value: "24" },
              { label: "Estate Chronicles", value: "12" },
              { label: "Avg. Read Time", value: "6 min" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="font-display text-3xl md:text-4xl text-brand-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-label-caps text-[10px] tracking-widest text-brand-text-muted">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ─────────────────────────────── */}
      <section className="py-20 px-6 md:px-20 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(180,130,70,0.2), transparent)",
          }}
        />
        <Orb
          size={600}
          color="radial-gradient(circle, rgba(50,35,15,0.45) 0%, transparent 70%)"
          style={{ top: "-10%", right: "-8%" }}
          duration={14}
        />
        <div className="max-w-[1440px] mx-auto">
          <NewsletterStrip />
        </div>
      </section>

      {/* ── FEATURED QUOTE ─────────────────────────── */}
      <section className="py-20 px-6 md:px-20">
        <div
          className="absolute left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(180,130,70,0.15), transparent)",
          }}
        />
        <div className="max-w-[1440px] mx-auto">
          <FeaturedQuote />
        </div>
      </section>
    </div>
  );
}
