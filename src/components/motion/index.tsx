/**
 * Motion kit — shared scroll & slide animation primitives used across pages.
 *
 *  SmoothScroll      Lenis inertial scrolling (pauses itself while a modal locks the body)
 *  Reveal            element slides/fades/blurs in when it enters the viewport
 *  TextReveal        words rise out of a mask, one after another
 *  ScrollHighlight   paragraph lights up word by word as you scroll through it
 *  ImageReveal       image wipes open, then drifts with scroll parallax
 *  Parallax          moves children at a different speed to the page
 *  Counter           counts a number up when it comes into view
 *  VelocityMarquee   ticker whose speed & direction follow the scroll
 *  HorizontalScroll  pinned section that turns vertical scroll into a sideways slide
 *  ScaleOnScroll     card that grows into place as it scrolls up
 */

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

// ─── Smooth scroll ──────────────────────────────────────────────────────────

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ duration: 1.15, smoothWheel: true, allowNestedScroll: true });
    let raf = requestAnimationFrame(function loop(time) {
      l.raf(time);
      raf = requestAnimationFrame(loop);
    });

    // Cart, lightbox, search etc. lock the page with body overflow:hidden —
    // stop Lenis while that's in place so the page doesn't scroll behind them.
    const sync = () => (document.body.style.overflow === "hidden" ? l.stop() : l.start());
    const mo = new MutationObserver(sync);
    mo.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    setLenis(l);
    return () => {
      mo.disconnect();
      cancelAnimationFrame(raf);
      l.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

// ─── Reveal ─────────────────────────────────────────────────────────────────

type From = "up" | "down" | "left" | "right" | "scale" | "blur";

const OFFSETS: Record<From, (d: number) => Record<string, number | string>> = {
  up: (d) => ({ y: d }),
  down: (d) => ({ y: -d }),
  left: (d) => ({ x: -d }),
  right: (d) => ({ x: d }),
  scale: () => ({ scale: 0.88 }),
  blur: () => ({ filter: "blur(14px)", y: 20 }),
};

export function Reveal({
  children,
  from = "up",
  delay = 0,
  duration = 1,
  distance = 60,
  amount = 0.25,
  className,
  style,
}: {
  children: ReactNode;
  from?: From;
  delay?: number;
  duration?: number;
  distance?: number;
  amount?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, ...OFFSETS[from](distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

// ─── Text reveal ────────────────────────────────────────────────────────────

type TextTag = "h1" | "h2" | "h3" | "p" | "span" | "div";

/**
 * Splits text into words that slide up out of a clipping mask.
 * Use "\n" in `text` for a forced line break. With `play` set, the reveal
 * waits for that flag instead of the viewport (e.g. after an intro).
 */
export function TextReveal({
  text,
  as = "h2",
  className,
  style,
  wordStyle,
  delay = 0,
  stagger = 0.05,
  duration = 1,
  play,
}: {
  text: string;
  as?: TextTag;
  className?: string;
  style?: CSSProperties;
  wordStyle?: CSSProperties;
  delay?: number;
  stagger?: number;
  duration?: number;
  play?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const show = play ?? inView;
  const Tag = motion[as] as typeof motion.div;
  const lines = text.split("\n");
  let i = 0;

  return (
    <Tag ref={ref as never} className={className} style={style} aria-label={text.replace(/\n/g, " ")}>
      {lines.map((line, li) => (
        <span key={li} aria-hidden className="block">
          {line.split(" ").map((word, wi) => {
            const idx = i++;
            return (
              <span
                key={wi}
                className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] mr-[0.25em] last:mr-0"
              >
                <motion.span
                  className="inline-block will-change-transform"
                  style={{ ...wordStyle, transformOrigin: "0% 100%" }}
                  initial={{ y: "115%", rotate: 4 }}
                  animate={show ? { y: "0%", rotate: 0 } : undefined}
                  transition={{ duration, delay: delay + idx * stagger, ease: EASE_OUT }}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

// ─── Scroll highlight ───────────────────────────────────────────────────────

function HighlightWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block mr-[0.25em]">
      {word}
    </motion.span>
  );
}

export function ScrollHighlight({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <HighlightWord key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
}

// ─── Image reveal ───────────────────────────────────────────────────────────

const CLIP_FROM = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
  center: "inset(50% 50% 50% 50%)",
};

export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  from = "bottom",
  delay = 0,
  parallax = 10,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  from?: keyof typeof CLIP_FROM;
  delay?: number;
  /** parallax travel in % of the image height (0 disables) */
  parallax?: number;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className ?? ""}`}
      initial={{ clipPath: CLIP_FROM[from] }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.4, delay, ease: EASE_IN_OUT }}
    >
      <motion.div className="absolute inset-[-12%]" style={{ y: parallax ? y : 0 }}>
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          className={`w-full h-full object-cover ${imgClassName ?? ""}`}
          initial={{ scale: 1.3 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.8, delay, ease: EASE_OUT }}
        />
      </motion.div>
      {children}
    </motion.div>
  );
}

// ─── Parallax ───────────────────────────────────────────────────────────────

export function Parallax({
  children,
  speed = 0.2,
  className,
}: {
  children: ReactNode;
  /** positive = slower than the page, negative = faster */
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 200, speed * -200]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Counter ────────────────────────────────────────────────────────────────

/** Counts up the leading number in `value` ("150+", "100%", "4+"); other strings render as-is. */
export function Counter({ value, className, duration = 2 }: { value: string; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const m = /^(\d+)([^\d]*)$/.exec(value);
  const [shown, setShown] = useState(m ? `0${m[2]}` : value);

  useEffect(() => {
    if (!m || !inView) return;
    const target = Number(m[1]);
    const ctl = animate(0, target, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => setShown(`${Math.round(v)}${m[2]}`),
    });
    return () => ctl.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}

// ─── Velocity marquee ───────────────────────────────────────────────────────

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

export function VelocityMarquee({
  children,
  baseVelocity = 3,
  className,
}: {
  children: ReactNode;
  /** % of one copy per second; negative runs right-to-left the other way */
  baseVelocity?: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className={`overflow-hidden whitespace-nowrap flex flex-nowrap ${className ?? ""}`}>
      <motion.div className="flex whitespace-nowrap flex-nowrap" style={{ x }}>
        {[0, 1, 2, 3].map((k) => (
          <span key={k} className="block shrink-0" aria-hidden={k > 0}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Horizontal scroll ──────────────────────────────────────────────────────

/**
 * Pins itself to the viewport and slides its row of children sideways as the
 * page scrolls. The section is made exactly tall enough for the row to travel
 * its full width. `header` renders above the track inside the pinned frame.
 */
export function HorizontalScroll({
  children,
  className,
  header,
}: {
  children: ReactNode;
  className?: string;
  header?: ReactNode;
}) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const smoothX = useSpring(x, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section ref={section} className={`relative ${className ?? ""}`} style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {header}
        <motion.div ref={track} style={{ x: smoothX }} className="flex gap-6 md:gap-10 px-6 md:px-20 w-max">
          {children}
        </motion.div>
        <div className="absolute bottom-8 left-6 right-6 md:left-20 md:right-20 h-px bg-white/10">
          <motion.div className="h-full origin-left bg-[#b48246]" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </section>
  );
}

// ─── Scale on scroll ────────────────────────────────────────────────────────

export function ScaleOnScroll({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  return (
    <motion.div ref={ref} className={className} style={{ ...style, scale, opacity }}>
      {children}
    </motion.div>
  );
}
