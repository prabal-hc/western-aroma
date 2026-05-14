/**
 * HeroSection.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * DROP-IN replacement for the <section ref={heroRef}> block in your HomePage.
 *
 * Usage in HomePage.tsx:
 *   1. Replace the existing hero <section>…</section> with <HeroSection heroRef={heroRef} />
 *   2. Keep all other sections (Products, Heritage, Features, etc.) unchanged.
 *   3. Import scrollYProgress transforms from the parent as before.
 *
 * What this does:
 *   - Mounts Hero3DScene as an absolute overlay on top of the existing hero
 *   - Keeps ALL existing parallax, text, buttons, scroll indicator intact
 *   - Existing hero content is hidden during intro (via opacity/pointer-events)
 *   - After intro completes, existing hero fades in seamlessly
 *   - Grain overlay, cursor glow, scroll progress remain untouched (managed by parent)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useRef, useState, useCallback, Suspense, lazy } from "react";
import { motion, useTransform, MotionValue } from "motion/react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { MagneticButton } from "./MagneticButton"; // your existing component
import { SplitReveal } from "./SplitReveal"; // your existing component
import { Orb } from "./Orb"; // your existing component

// Lazy-load the heavy R3F scene — zero cost until it mounts
const Hero3DScene = lazy(() =>
  import("./Hero3DScene").then((m) => ({ default: m.Hero3DScene })),
);

// ─────────────────────────────────────────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────────────────────────────────────────

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLElement | null>;
  /** Motion values passed down from parent's useScroll() */
  heroImageY: MotionValue<string>;
  heroScale: MotionValue<number>;
  heroOpacity: MotionValue<number>;
  heroTextY: MotionValue<string>;
  scrollIndicatorOpacity: MotionValue<number>;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function HeroSection({
  heroRef,
  heroImageY,
  heroScale,
  heroOpacity,
  heroTextY,
  scrollIndicatorOpacity,
}: HeroSectionProps) {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/*
       * ── EXISTING HERO CONTENT ───────────────────────────────────────────
       * Hidden during intro (opacity 0, pointer-events none)
       * Fades in once intro is complete
       */}
      <motion.div
        className="absolute inset-0 z-10"
        animate={{
          opacity: introComplete ? 1 : 0,
          pointerEvents: introComplete ? "auto" : "none",
        }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Background orbs */}
        <Orb
          size={600}
          color="radial-gradient(circle, #b48246 0%, transparent 70%)"
          style={{ top: "-10%", left: "-5%" }}
        />
        <Orb
          size={400}
          color="radial-gradient(circle, #3a2a15 0%, transparent 70%)"
          style={{ bottom: "10%", right: "-5%" }}
        />

        {/* Parallax background image */}
        <motion.div
          style={{ y: heroImageY, scale: heroScale }}
          className="absolute inset-0 z-0 origin-center"
        >
          <img
            className="w-full h-full object-cover opacity-55"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEMNQj9KrHeWo-_50sr5IDUhG8xlfnxLvvSricnFIJSxONjKK3xmhSXh_cUG7IIK9NjyukS_1JET36iQQket_j5CFXSPn559Ha278StAdy7ZTurY4XktdfpI445Tj91soZn64sUr6SKJHZONrg0_81CYa-d0FZT_kVjfe0X_w6bHE_91iLXj7odDnQaOd0b7w76qXY5WB82DkEEXUqDO_QM6oqXlQ0ShctVG202RpUukITpN79xVDffR3sdvIHlyjyvSf8P4qsbC"
            alt="Mist-covered coffee plantation"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0a]/50 via-transparent to-[#0c0c0a]" />
        </motion.div>

        {/* Hero text — your existing SplitReveal + content */}
        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl pt-24 mx-auto flex flex-col items-center justify-center h-full"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "1.5em" }}
            animate={
              introComplete ? { opacity: 1, letterSpacing: "0.35em" } : {}
            }
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
            className="text-label-caps text-brand-primary mb-6 block text-xs"
          >
            ESTATE TO CUP EXPERIENCE
          </motion.span>

          <div
            className="font-display text-5xl md:text-8xl text-white mb-8 leading-[1.05] overflow-hidden"
            style={{ perspective: "800px" }}
          >
            <SplitReveal
              text="From the Hills"
              className="block"
              delay={introComplete ? 0.1 : 9999}
            />
            <SplitReveal
              text="to Your Cup"
              className="block"
              delay={introComplete ? 0.35 : 9999}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={introComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="text-lg md:text-xl text-brand-text-muted mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Discover the soul of the Malabar coast through our artisanal,
            single-origin coffee and handcrafted spices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-5"
          >
            <MagneticButton primary>
              Shop Now <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton>Explore Flavours</MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-label-caps text-xs text-brand-text-muted tracking-widest">
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} className="text-brand-primary" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/*
       * ── 3D INTRO SCENE ──────────────────────────────────────────────────
       * Lazy-loaded, plays once per session, then unmounts
       */}
      {!introComplete && (
        <Suspense fallback={null}>
          <Hero3DScene onIntroComplete={handleIntroComplete} />
        </Suspense>
      )}

      {/*
       * ── DARK CINEMATIC BASE ─────────────────────────────────────────────
       * Always visible as deep dark backdrop. The R3F canvas renders on top.
       */}
      <div className="absolute inset-0 z-0" style={{ background: "#090907" }} />
    </section>
  );
}

export default HeroSection;
