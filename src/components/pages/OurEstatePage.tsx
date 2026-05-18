/**
 * Our Estate Page — Western Aroma
 * Chikkamagaluru highlands · Malnad spice heritage · Western Ghats terroir
 */

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "motion/react";
import { Leaf, Droplets, Wind, Mountain, ArrowRight } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

// ─── Shared ambient helpers (inline, no external deps) ────────────────────────

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
  duration = 9,
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
        opacity: 0.28,
        ...style,
      }}
      animate={{ y: [0, -24, 0], scale: [1, 1.08, 1] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// Floating mist layer
function MistLayer({ className }: { className?: string }) {
  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
      style={{
        background:
          "linear-gradient(180deg, rgba(180,130,70,0.04) 0%, transparent 40%, transparent 60%, rgba(180,130,70,0.03) 100%)",
      }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// Animated decorative spice/coffee dot accent
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
      animate={{ opacity: [0, 0.35, 0], scale: [0.8, 1.4, 0.8] }}
      transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

// Tilt card hook
function useTilt(max = 6) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rotX = useSpring(useMotionValue(0), { stiffness: 80, damping: 22 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 80, damping: 22 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      rotY.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
      rotX.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
    };
    const onLeave = () => {
      rotX.set(0);
      rotY.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [rotX, rotY, max]);
  return { ref, rotX, rotY };
}

// Premium stat card
function StatCard({
  label,
  value,
  delay,
}: {
  label: string;
  value: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.025)",
        border: hovered
          ? "1px solid rgba(180,130,70,0.45)"
          : "1px solid rgba(255,255,255,0.07)",
        boxShadow: hovered
          ? "0 0 28px rgba(180,130,70,0.12), inset 0 1px 0 rgba(180,130,70,0.08)"
          : "none",
        transition: "border 0.35s, box-shadow 0.35s",
      }}
      className="p-7 rounded-2xl relative overflow-hidden cursor-default"
    >
      {/* Subtle corner glow on hover */}
      <motion.div
        className="absolute top-0 right-0 w-20 h-20 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(180,130,70,0.18) 0%, transparent 70%)",
          filter: "blur(12px)",
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />
      <motion.p
        className="font-display text-3xl mb-2 text-brand-primary relative z-10"
        animate={hovered ? { scale: 1.04 } : { scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        {value}
      </motion.p>
      <p className="text-sm text-brand-text-muted text-label-caps tracking-widest relative z-10">
        {label}
      </p>
    </motion.div>
  );
}

// Practice card with animated icon glow + glass
function PracticeCard({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "linear-gradient(135deg, rgba(180,130,70,0.07) 0%, rgba(255,255,255,0.03) 100%)"
          : "rgba(255,255,255,0.025)",
        border: hovered
          ? "1px solid rgba(180,130,70,0.35)"
          : "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        transition: "background 0.4s, border 0.4s",
      }}
      className="p-8 rounded-2xl text-center cursor-default relative overflow-hidden"
    >
      {/* Layered glass depth */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)",
        }}
      />

      {/* Icon with pulse glow */}
      <motion.div
        className="relative mx-auto mb-5 flex items-center justify-center"
        style={{ width: 64, height: 64 }}
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ duration: 0.35 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "rgba(180,130,70,0.15)", filter: "blur(8px)" }}
          animate={{
            scale: hovered ? [1, 1.5, 1.3] : [1, 1.15, 1],
            opacity: hovered ? 1 : 0.5,
          }}
          transition={{
            duration: hovered ? 0.6 : 2.5,
            repeat: hovered ? 0 : Infinity,
          }}
        />
        <div
          className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(180,130,70,0.1)",
            border: "1px solid rgba(180,130,70,0.25)",
          }}
        >
          <Icon className="text-brand-primary" size={28} />
        </div>
      </motion.div>

      <h3 className="font-display text-xl mb-3 text-white relative z-10">
        {title}
      </h3>
      <p className="text-sm text-brand-text-muted leading-relaxed relative z-10">
        {description}
      </p>
    </motion.div>
  );
}

// Spice feature card (luxury glassmorphism)
function SpiceCard({
  emoji,
  title,
  subtitle,
  description,
  delay,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  delay: number;
}) {
  const { ref, rotX, rotY } = useTilt(5);
  const [hovered, setHovered] = useState(false);
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        background:
          "linear-gradient(135deg, rgba(30,22,10,0.95) 0%, rgba(20,14,6,0.98) 100%)",
        border: hovered
          ? "1px solid rgba(180,130,70,0.5)"
          : "1px solid rgba(180,130,70,0.15)",
        boxShadow: hovered
          ? "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(180,130,70,0.1)"
          : "0 8px 32px rgba(0,0,0,0.3)",
        backdropFilter: "blur(20px)",
        transition: "border 0.35s, box-shadow 0.35s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
      className="p-8 rounded-3xl relative overflow-hidden cursor-default"
    >
      {/* Spotlight */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle 140px at ${spot.x}% ${spot.y}%, rgba(180,130,70,0.14) 0%, transparent 70%)`,
          }}
        />
      )}

      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(180,130,70,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-20" style={{ transform: "translateZ(16px)" }}>
        <div className="text-4xl mb-5">{emoji}</div>
        <span className="text-label-caps text-[10px] tracking-widest text-brand-primary/70 block mb-2">
          {subtitle}
        </span>
        <h3 className="font-display text-2xl text-white mb-4">{title}</h3>
        <p className="text-sm text-brand-text-muted leading-relaxed">
          {description}
        </p>

        <motion.div
          className="flex items-center gap-2 mt-6 text-brand-primary text-label-caps text-xs tracking-widest"
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.25 }}
        >
          EXPLORE <ArrowRight size={14} />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export function OurEstatePage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: imgProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0.2]);
  const imgScale = useTransform(imgProgress, [0, 1], [1.08, 1]);
  const imgY = useTransform(imgProgress, [0, 1], ["0%", "12%"]);

  return (
    <div className="min-h-screen bg-[#0c0c0a] text-white overflow-x-hidden pt-24">
      <GrainOverlay />

      {/* ── HERO ───────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative py-28 px-6 md:px-20 overflow-hidden"
      >
        {/* Ambient orbs */}
        <Orb
          size={700}
          color="radial-gradient(circle, rgba(180,130,70,0.25) 0%, transparent 70%)"
          style={{ top: "-15%", left: "-5%" }}
          duration={10}
        />
        <Orb
          size={450}
          color="radial-gradient(circle, rgba(60,40,18,0.6) 0%, transparent 70%)"
          style={{ bottom: "0", right: "-8%" }}
          duration={13}
        />
        <MistLayer />

        {/* Decorative spice dots */}
        <SpiceAccent x="12%" y="20%" size={5} delay={0} />
        <SpiceAccent x="78%" y="35%" size={3} delay={1.2} />
        <SpiceAccent x="55%" y="70%" size={4} delay={2.4} />
        <SpiceAccent x="90%" y="15%" size={3} delay={0.8} />
        <SpiceAccent x="25%" y="80%" size={4} delay={1.8} />

        {/* Animated ring accent */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <motion.div
            className="rounded-full border border-brand-primary/8"
            style={{ width: 600, height: 600 }}
            animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full border border-brand-primary/5"
            style={{ width: 900, height: 900 }}
            animate={{ scale: [1, 1.04, 1], opacity: [0.15, 0.35, 0.15] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </motion.div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-[1440px] mx-auto text-center relative z-10"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "1.8em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="text-label-caps text-brand-primary mb-6 block text-xs"
          >
            WESTERN AROMA · CHIKKAMAGALURU
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-7xl mb-8 leading-[1.06]"
            style={{
              background:
                "linear-gradient(135deg, #e8d5b0 0%, #b48246 40%, #c9975a 70%, #e8d5b0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            From the Misty Hills
            <br />
            of Chikkamagaluru
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-lg md:text-xl text-brand-text-muted max-w-2xl mx-auto leading-relaxed"
          >
            Nestled in the rain-kissed highlands of Chikkamagaluru, our estate
            is where mountain-grown coffee meets the rich spice heritage of
            Malnad. Every harvest carries the aroma of mist, monsoon soil, and
            generations of craftsmanship.
          </motion.p>
        </motion.div>
      </section>

      {/* ── HERO IMAGE ─────────────────────────────── */}
      <section className="py-8 px-6 md:px-20">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="rounded-3xl overflow-hidden relative"
            style={{
              height: "520px",
              border: "1px solid rgba(180,130,70,0.15)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
            }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2400&auto=format&fit=crop"
              alt="Chikkamagaluru coffee estate — misty Western Ghats highlands"
              style={{ y: imgY, scale: imgScale }}
              className="w-full h-full object-cover"
            />
            {/* Cinematic vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(12,12,10,0.3) 0%, transparent 30%, transparent 70%, rgba(12,12,10,0.7) 100%)",
              }}
            />
            {/* Estate caption */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-8 left-8 flex flex-col gap-1"
            >
              <span className="text-label-caps text-[10px] text-white/50 tracking-widest">
                1100–1450M ABOVE SEA LEVEL
              </span>
              <span className="font-display text-2xl text-white">
                Malnad Highlands
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── ESTATE STORY ───────────────────────────── */}
      <section className="py-24 px-6 md:px-20">
        <div
          className="max-w-[1440px] mx-auto relative overflow-hidden rounded-3xl"
          style={{
            background: "rgba(255,255,255,0.015)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <MistLayer />
          <div className="p-12 md:p-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                <span className="text-label-caps text-brand-primary text-xs tracking-widest block mb-4">
                  THE LAND THAT SHAPES OUR AROMA
                </span>
                <h2 className="font-display text-4xl md:text-5xl mb-10 text-white leading-[1.1]">
                  Rooted in Chikkamagaluru's
                  <span className="text-brand-primary"> Living Soil</span>
                </h2>
                <div className="space-y-6 text-brand-text-muted leading-relaxed">
                  <p>
                    Western Aroma begins in the elevated slopes of
                    Chikkamagaluru—the birthplace of Indian coffee. Surrounded
                    by dense forests, drifting mist, and monsoon-fed soil, our
                    estate reflects the timeless agricultural traditions of
                    Karnataka's Malnad region.
                  </p>
                  <p>
                    Alongside carefully cultivated coffee plants, our land
                    nurtures black pepper vines climbing silver oak trees,
                    aromatic cardamom pockets hidden beneath shade, and seasonal
                    spices shaped by the mountain climate.
                  </p>
                  <p>
                    This unique terroir creates complexity in every cup and
                    depth in every spice—earthy, floral, warm, and unmistakably
                    of the Western Ghats.
                  </p>
                  <p
                    className="font-display text-xl text-white italic border-l-2 border-brand-primary pl-6"
                    style={{ borderColor: "rgba(180,130,70,0.6)" }}
                  >
                    "What we harvest is not simply produce—it is a living
                    expression of geography, climate, heritage, and
                    craftsmanship."
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-5"
              >
                {[
                  { label: "Elevation", value: "1100–1450m" },
                  { label: "Annual Rainfall", value: "200–300cm" },
                  { label: "Coffee & Spice Estate", value: "Malnad Grown" },
                  { label: "Heritage", value: "Generational Craft" },
                ].map((stat, idx) => (
                  <StatCard
                    key={stat.label}
                    label={stat.label}
                    value={stat.value}
                    delay={idx * 0.1}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FARMING PRACTICES ──────────────────────── */}
      <section className="py-24 px-6 md:px-20 relative overflow-hidden">
        <Orb
          size={500}
          color="radial-gradient(circle, rgba(60,40,18,0.5) 0%, transparent 70%)"
          style={{ top: "20%", right: "-8%" }}
          duration={11}
        />

        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-label-caps text-brand-primary text-xs tracking-widest block mb-4">
              OUR PHILOSOPHY
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white">
              How Nature Leads Our Process
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: Leaf,
                title: "Shade-Grown Cultivation",
                description:
                  "Our coffee thrives beneath native canopy cover, allowing slower maturation, richer flavour development, and healthier biodiversity.",
              },
              {
                icon: Mountain,
                title: "Western Ghats Terroir",
                description:
                  "Cool elevations, mist-heavy mornings, and mineral-rich mountain soil shape the distinct character of both our coffee and spices.",
              },
              {
                icon: Droplets,
                title: "Monsoon Nourished",
                description:
                  "Seasonal rains naturally replenish the estate, creating ideal growing conditions for pepper, coffee cherries, and aromatic spice crops.",
              },
              {
                icon: Wind,
                title: "Handcrafted Harvesting",
                description:
                  "From ripe coffee cherry picking to careful spice selection, every harvest reflects patient human craftsmanship over industrial shortcuts.",
              },
            ].map((p, idx) => (
              <PracticeCard
                key={p.title}
                icon={p.icon}
                title={p.title}
                description={p.description}
                delay={idx * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SPICE TRAILS ───────────────────────────── */}
      <section className="py-24 px-6 md:px-20 relative overflow-hidden">
        {/* Decorative divider */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(180,130,70,0.25), transparent)",
          }}
        />
        <Orb
          size={600}
          color="radial-gradient(circle, rgba(40,28,12,0.7) 0%, transparent 70%)"
          style={{ bottom: "-10%", left: "-8%" }}
          duration={14}
        />

        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6"
          >
            <span className="text-label-caps text-brand-primary text-xs tracking-widest block mb-4">
              MALNAD SPICE HERITAGE
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
              The Spice Trails of Malnad
            </h2>
            <p className="text-lg text-brand-text-muted max-w-2xl mx-auto leading-relaxed">
              Western Aroma is not only about coffee. Our estate also celebrates
              Malnad's rich spice traditions—black pepper, cardamom, cloves, and
              seasonal aromatics that have defined this region's kitchens and
              trade routes for centuries.
            </p>
          </motion.div>

          <div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            style={{ perspective: "1200px" }}
          >
            {[
              {
                emoji: "🌿",
                title: "Malnad Black Pepper",
                subtitle: "BOLD · MOUNTAIN-GROWN",
                description:
                  "Bold, warm, and naturally intense—our pepper grows climbing through shaded estate trees, absorbing mountain moisture and rich soil character.",
              },
              {
                emoji: "🫛",
                title: "Forest Cardamom Notes",
                subtitle: "AROMATIC · SHADE-GROWN",
                description:
                  "Grown in cool shaded pockets, cardamom brings sweet aromatic complexity that complements our coffee heritage beautifully.",
              },
              {
                emoji: "🌸",
                title: "Seasonal Aromatic Harvest",
                subtitle: "CLOVES · SMALL BATCH",
                description:
                  "Small-batch spice harvests selected for fragrance, depth, and freshness—when the estate is ready, not when the calendar says.",
              },
            ].map((spice, idx) => (
              <SpiceCard key={spice.title} {...spice} delay={idx * 0.12} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HERITAGE CTA ───────────────────────────── */}
      <section className="py-24 px-6 md:px-20 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(180,130,70,0.2), transparent)",
          }}
        />

        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative rounded-3xl p-16 md:p-28 text-center overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(28,20,8,0.96) 0%, rgba(18,12,4,0.98) 100%)",
              border: "1px solid rgba(180,130,70,0.18)",
              boxShadow:
                "0 60px 140px rgba(0,0,0,0.7), inset 0 1px 0 rgba(180,130,70,0.08)",
            }}
          >
            {/* Aurora soft glow */}
            <motion.div
              className="pointer-events-none absolute -inset-[100%] opacity-20"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0%, #b48246 12%, transparent 28%, #4a3520 48%, transparent 62%, #b48246 78%, transparent 100%)",
                filter: "blur(70px)",
              }}
            />

            {/* Floating particle dots */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-brand-primary pointer-events-none"
                style={{
                  left: `${12 + i * 11}%`,
                  top: `${18 + (i % 4) * 22}%`,
                }}
                animate={{
                  y: [0, -18, 0],
                  opacity: [0.15, 0.6, 0.15],
                  scale: [1, 1.6, 1],
                }}
                transition={{
                  duration: 3.5 + i * 0.4,
                  repeat: Infinity,
                  delay: i * 0.35,
                }}
              />
            ))}

            <div className="relative z-10 max-w-2xl mx-auto">
              {/* Decorative emblem */}
              <motion.div
                className="mx-auto mb-10 w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(180,130,70,0.12)",
                  border: "1px solid rgba(180,130,70,0.3)",
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-2xl">☕</span>
              </motion.div>

              <h2 className="font-display text-4xl md:text-6xl text-white mb-8 leading-[1.1]">
                More Than a Farm.
                <br />
                <span className="text-brand-primary">A Living Heritage.</span>
              </h2>

              <p className="text-lg md:text-xl text-brand-text-muted mb-12 leading-relaxed">
                Western Aroma is built on the belief that extraordinary flavour
                begins at origin—where land, climate, patience, and tradition
                come together.
              </p>

              <motion.button
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 20px 60px rgba(180,130,70,0.3)",
                }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden px-12 py-5 rounded-full font-label-caps text-brand-on-primary text-sm tracking-widest"
                style={{
                  background:
                    "linear-gradient(135deg, #b48246 0%, #d4a060 50%, #b48246 100%)",
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Discover Our Collection
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
