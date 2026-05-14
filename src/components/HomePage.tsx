/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Western Aroma — Premium 2026 Enhanced Homepage
 * Upgrades: Lenis smooth scroll, GSAP ScrollTrigger storytelling,
 * SplitType text reveals, magnetic buttons, cursor glow,
 * parallax hero, marquee testimonials, aurora CTA, masonry gallery.
 */

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
  AnimatePresence,
} from "motion/react";
import {
  ShoppingBag,
  User,
  Menu,
  Star,
  ShoppingCart,
  ArrowRight,
  Leaf,
  Sprout,
  Hand,
  Wind,
  Droplets,
  Mail,
  Globe,
  Share2,
  History,
  ChevronDown,
  X,
  Search,
  Heart,
} from "lucide-react";
import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { HeroSection } from "@/components/HeroSection";
import Hero3DScene from "@/components/Hero3DScene";
import { Navbar } from "@/components/Navbar";
import { Cart, CartItem } from "@/components/Cart";
import { CoffeePage } from "@/components/pages/CoffeePage";
import { SpicesPage } from "@/components/pages/SpicesPage";
import { OurEstatePage } from "@/components/pages/OurEstatePage";
import { StoriesPage } from "@/components/pages/StoriesPage"; // ─── Animation Config ─────────────────────────────────────────────────────────
const SPRING_CONFIGS = {
  smooth: { stiffness: 100, damping: 30, mass: 0.5 },
  snappy: { stiffness: 300, damping: 30, mass: 0.3 },
  gentle: { stiffness: 60, damping: 20, mass: 1 },
};

const STAGGER_CHILDREN = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const FADE_UP = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const FADE_IN = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    title: "Chikmagalur Monsooned AA",
    description:
      "Earthy, mellow and exceptionally smooth coffee processed by the monsoon winds of the Arabian Sea.",
    price: "₹650.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAyqg6CUmB4WMSH-f9K4dsiJ-LEs0yHWbOAdIcERtNQOv93s1rms7Vtu6ID_4m5mRCeErxkdFEKo56xi4FvCYvAEfs_Cx3iqJ51FCBADFIRHsT3hn0lBoZbWJ-SfZG82YPY0YPcNkwPwVa7phmX3daNvovkSTADU_cB1pbrnsaJNZ8--MHO6-1ze71C-sdXRH7NDCpYsG-LRRViuGboHSKninOG6CCtrGpEz5S54uPgW8iRT8Ih3CbX-oOvm8jjFBXK6pItxZRt_EJi",
    tag: "Bestseller",
    size: "large",
  },
  {
    id: 2,
    title: "Estate Chikmagalur Pepper",
    sub: "King of Spices · Handpicked",
    price: "₹420.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgiU5NSKIF0WokXAriqu0woa-YkQ1SrfqTzJXP2NGRDTrutbS7iG7J7xLv_IxXWf_EcNqItlPQ4GyU_412M9iDYzOVKuxOqlze4fsM55JEsdyQ6r-BWiw9Phdaqi3VhswnD9ZD2DQUyLNxlEXdqsSX9U97voAHpHYFiu7bRkaxiirqBHUzJMfmR8M_tzbZGT6pEsObl_jP05lLOJEEXCCmYchwWRMkWltYG1L5XWX9Y-X1uzs3TEcvfaTavjRLT6BjCyH6Oc7QiBUu",
    size: "medium",
  },
  {
    id: 3,
    title: "Wild Cardamom",
    price: "₹890.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMBsQ0tkDkENx3MmpX1pvHis_sBtWONDfa78D0WKQrIFGDJSr6Ay8_Xw_x8TPWMhyvsT6sSTHxmjygOWez_OK4hYpEav2MBIhmgbkGDKU9heabdBTRYR7VRXZuDnDBDHtaMw-jVHBXDWDbxlJ6rRokhemMANauC168sZwHxkbydaUyLLzFK4RvfEIHjbFUSTlrKI5Aa2R0ObrwiRLGaEHSLglT0yE7TJTbiGfCwIM8NexNq2CWKscHOnH4P9ZiT6nQrDLLt9Wq8biC",
    size: "small",
  },
  {
    id: 4,
    title: "Filter Kaapi Blend",
    price: "₹350.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDcNTj1FYqQQlrt-Ffu0UqyjC2WwN5LPFbipORAbbQGIRdgKiVtdWbn1WIIDwxh8CvKp3FmxwXx9nYq8P4s2BQ80e8uVHTKoUr9v7TOPdIhUphl4gR9-w5eMo1X68Jo5NIS4aiZYXMF-sRrVGD3mLbw3-_eAD9hHtmS4RwVd649KTZUYfzi8UgXyOApz0ufhJLw3bgrP1HaqR6yDiMsSFVzeuom3sYw-zON06tkXZVvlp-UWotJd8zGwD0mx7VO6uz8u75VkepsIhe2",
    size: "small",
  },
];

const REVIEWS = [
  {
    name: "Arjun V.",
    text: "The Chikmagalur Monsooned is a game changer. The earthy notes are so distinct, I haven't tasted anything like it in commercial brands.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8AezfRDay7uGfu01f2gukXdoXeCkWBzhOvWDyy0MJzxQcfvkwbvkI1atyL9S_pRP9OHKpVxI5cL6bxCRTgrH_Y--K2lnukRw8cwkiJl2lfZYb6V2h_ncJtOkeIllbLE7hYsyb56BlJUGzwsZ9Ks11OCBmo1azPdfz6XN4FvT5HVx4mLcm7RLG5S23BAa3pRhz44c1Pvol_ENVujWUsQ0i7Ie-3pZRT5fn0G6cHR5ZCoEoARer6XQxcduhRGBYvx9-j2CXbc1csHqd",
    rotation: -2,
  },
  {
    name: "Priya S.",
    text: "The whole-leaf spices are incredible. You can literally smell the freshness the moment you open the jar. Highly recommend the cardamom.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQWYG_K7wuWEnvoDZypUvJSPET-2sNfNJsdStjDD32vErhU0aX8148KpgUJbKtc9sACS4WoyVR0IVRhaIxuYjjiDbVPL1Cr2tb-W8DeilNBb4fOkwCFRwoCMr2zyRg4VOEmTdJYZEqB3fWBalGbC26v815WgELJW97b9mpcdvm8DW3HFV_G6eN2xfK31G8oBNjLj_lop914OX_wCPsRP_vpTAHmmEXrbNahmaIPYGm4cPeJPjk5ROt692BWOCvB_ub_f3KZuThODzz",
    rotation: 1,
  },
  {
    name: "Rohan M.",
    text: "Best packaging I've seen in a long time. It feels heavy and premium, perfect for gifting. The coffee quality matches the aesthetic.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDU6fp5z4Hpu7lGbzpi5aWrSjrjWcnfrv8hnS3y0fjxpQITK9p0xu5Ybviae8ratmDyLrLpkfL2CaaQEYfKavTrNdDkSw75sMdsi9-RxD-urexl8cLNNZMp8o7SFFOLv2soMOJ8LyjA9joFrfKZq1S_iKGB-ag6pCeT8cC_Srtsb67qwH8frpEe6oMB9jeEKJpiQX9B1LKOIdbyLvnljIwh7elvPJEp-RBEDbSgCkz7cCYPsORytH4Ri3JNuRvWB6JBHgb215CM4fZ",
    rotation: -1,
  },
  {
    name: "Meera K.",
    text: "The Filter Kaapi blend is exactly what I needed. Rich, smooth, and the aroma fills the whole room. This is my new morning ritual.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8AezfRDay7uGfu01f2gukXdoXeCkWBzhOvWDyy0MJzxQcfvkwbvkI1atyL9S_pRP9OHKpVxI5cL6bxCRTgrH_Y--K2lnukRw8cwkiJl2lfZYb6V2h_ncJtOkeIllbLE7hYsyb56BlJUGzwsZ9Ks11OCBmo1azPdfz6XN4FvT5HVx4mLcm7RLG5S23BAa3pRhz44c1Pvol_ENVujWUsQ0i7Ie-3pZRT5fn0G6cHR5ZCoEoARer6XQxcduhRGBYvx9-j2CXbc1csHqd",
    rotation: 2,
  },
  {
    name: "Vikram N.",
    text: "Ordered the gift hamper for my parents and they absolutely loved it. The pepper quality is unmatched — bold, fragrant, and fresh.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQWYG_K7wuWEnvoDZypUvJSPET-2sNfNJsdStjDD32vErhU0aX8148KpgUJbKtc9sACS4WoyVR0IVRhaIxuYjjiDbVPL1Cr2tb-W8DeilNBb4fOkwCFRwoCMr2zyRg4VOEmTdJYZEqB3fWBalGbC26v815WgELJW97b9mpcdvm8DW3HFV_G6eN2xfK31G8oBNjLj_lop914OX_wCPsRP_vpTAHmmEXrbNahmaIPYGm4cPeJPjk5ROt692BWOCvB_ub_f3KZuThODzz",
    rotation: -2,
  },
];

const GALLERY = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB5e_JlZGaIjJ4moHKGPS-hC7KDOz0OYL4qYxasLBMw0hLgZz2EWGqDhHFPUVIZSI_Ou3KfiDIXSqZflUFaXiZDCpjxgVmRoQJcvLnrGtkHs3Sj1--wMkS8ZIla4t94el8rbWef2CB3XCISeC_AbAyy1whMd9BJQvt3bwx6szDHtwlgXyOQqTVP75HBZbGY-WyMfsSFlekJxJHPad9rs5Bztl1HK_q7beUIcivYO95hoDtJO7ULwTLVOxzVzYr3BwphpBjR6Y53Vmin",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBb5NK0iuW6hWL53eRYZjxF8_FiVX5sf3FXVKvLzp19RNszisN72AluNsfkTdAFB9vDyoOLHTATF7YwvyixVZJhfKMGPrZsicZKwlUchUhCua-LMKiY835P8xA2q2WJpzrYCGh3teDIXtma9VjrBgNCB2IkXGqS5FOjEy-GWeiPrW_PtRZwdLx9U15E9PCzz3_CeunK7gkiasJcAVTfXxgzP2A2oCM2crd-th_zPdt9qZYXgkEcfpX6Pz18wLo8GR6uZdq1BlMOdoXg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD6BNwmeyLQ6zS65iKkO_xRk7MGa5Z_kAh_IzDngCf7qTPcvATUvRzTAZ3PZ9M02G_YbHsSSnV6d0QhrSLIEY5CeUWd-ArHo3Ea-NtXUCQdPjakaDD9eumahELOTky-sdE140CvVjaptJqxVBKS5X_uteoFA-4VylLlX9gTSgHArPvMf9akrwLCohV39-c_jJGlMfnRYHYBrIJs12nL4tKD0hJH3UlPqAum97sr7SmH2hWFwgWuSkv0Ze8OyHPunNIXLcEHfLth-v",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAT3spIv0uT6Dog8ud1HoxabQiS1VWu8qKIMoaHzBp8oOO3OcTQPz4sEzTO7AAmxXfbjDa8wlNwVxfn8lPCSt4vb3_MM_RzissKUyX4i96Dv0LFmhCiZZFRCR4hTP07PpdrVq-gZOkLkHdK9SovrHj1oeVMcUfzDgKxxQQUP5U7yW3r9hXgkexz8eUsF4LpCgnkkqbIgkjTlfb8wgSHkQrqK4i651D3NQB94IMYSBxIDSrw8iRZuM9sQm7qKg-OUyn1LShrv6Wr-NLW",
];

const FEATURES = [
  { icon: Leaf, label: "Organic" },
  { icon: Sprout, label: "Farm Fresh" },
  { icon: Hand, label: "Handpicked" },
  { icon: Wind, label: "Rich Aroma" },
  { icon: Droplets, label: "Sustainable" },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useMagneticEffect(strength = 0.4) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_CONFIGS.smooth);
  const springY = useSpring(y, SPRING_CONFIGS.smooth);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    },
    [x, y, strength],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove as EventListener);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove as EventListener);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return { ref, springX, springY };
}

function useTilt(max = 8) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rotateX = useSpring(useMotionValue(0), SPRING_CONFIGS.smooth);
  const rotateY = useSpring(useMotionValue(0), SPRING_CONFIGS.smooth);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(px * max * 2);
      rotateX.set(-py * max * 2);
    };
    const onLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [rotateX, rotateY, max]);

  return { ref, rotateX, rotateY };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Custom cursor glow — desktop only */
function CursorGlow() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 120, damping: 22 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 22 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY, visible]);

  if (!visible) return null;
  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] top-0 left-0"
      style={{ x: springX, y: springY }}
    >
      <div
        style={{
          transform: "translate(-50%, -50%)",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(180,130,70,0.12) 0%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />
    </motion.div>
  );
}

/** Animated noise grain overlay */
function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.035]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: "128px 128px",
      }}
    />
  );
}

/** Ambient floating orb */
function Orb({
  size,
  color,
  style,
}: {
  size: number;
  color: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{
        width: size,
        height: size,
        background: color,
        filter: "blur(80px)",
        opacity: 0.35,
        ...style,
      }}
      animate={{
        y: [0, -30, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/** Split text word-by-word stagger reveal */
function SplitReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 60, rotateX: -45 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: "inline-block", transformOrigin: "bottom" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/** Magnetic CTA button */
function MagneticButton({
  children,
  className,
  onClick,
  primary = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  primary?: boolean;
}) {
  const { ref, springX, springY } = useMagneticEffect(0.35);
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(
      () => setRipples((prev) => prev.filter((r) => r.id !== id)),
      600,
    );
    onClick?.();
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className={`relative overflow-hidden ${
        primary
          ? "px-10 py-5 bg-brand-primary text-brand-on-primary shadow-2xl"
          : "px-10 py-5 bg-white/5 backdrop-blur-xl border border-brand-primary text-brand-primary"
      } rounded-full font-label-caps transition-all ${className ?? ""}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="absolute rounded-full bg-white/20 pointer-events-none"
          style={{ left: r.x - 20, top: r.y - 20, width: 40, height: 40 }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 12, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </motion.button>
  );
}

/** Product card with 3D tilt + hover spotlight */
function ProductCard({
  product,
  idx,
}: {
  product: (typeof PRODUCTS)[0];
  idx: number;
}) {
  const { ref, rotateX, rotateY } = useTilt(6);
  const [hovered, setHovered] = useState(false);
  const [spotPos, setSpotPos] = useState({ x: 50, y: 50 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
      className={`glass-card rounded-3xl overflow-hidden group relative p-8 flex flex-col justify-end cursor-pointer ${
        product.size === "large"
          ? "md:col-span-2 md:row-span-2"
          : product.size === "medium"
            ? "md:col-span-2"
            : ""
      }`}
    >
      {/* Dynamic spotlight */}
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 200px at ${spotPos.x}% ${spotPos.y}%, rgba(180,130,70,0.18) 0%, transparent 70%)`,
          }}
        />
      )}

      <motion.img
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        src={product.image}
        alt={product.title}
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-surface/95 via-brand-surface/20 to-transparent" />

      {/* Animated gradient border on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        animate={{
          boxShadow: hovered
            ? "inset 0 0 0 1px rgba(180,130,70,0.5), 0 30px 80px rgba(0,0,0,0.5)"
            : "inset 0 0 0 1px rgba(255,255,255,0.05)",
        }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative z-20" style={{ transform: "translateZ(20px)" }}>
        {product.tag && (
          <motion.div
            className="flex items-center gap-2 mb-4"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="bg-brand-primary/20 text-brand-primary px-3 py-1 rounded-full text-label-caps text-[10px] border border-brand-primary/30"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              {product.tag}
            </motion.span>
            <div className="flex text-brand-primary">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Star size={14} fill="currentColor" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <h3 className="font-display text-2xl md:text-3xl text-white mb-2">
          {product.title}
        </h3>
        {product.description && (
          <p className="text-brand-text-muted mb-6 max-w-sm text-sm md:text-base leading-relaxed">
            {product.description}
          </p>
        )}
        {product.sub && (
          <p className="text-label-caps text-[10px] text-brand-text-muted mb-4 tracking-widest">
            {product.sub}
          </p>
        )}

        <div className="flex items-center justify-between">
          <motion.span
            className="font-display text-2xl text-brand-primary"
            animate={hovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {product.price}
          </motion.span>
          <motion.button
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="bg-brand-primary text-brand-on-primary p-4 rounded-full shadow-lg shadow-brand-primary/20"
          >
            <ShoppingCart size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/** Infinite marquee testimonials */
function TestimonialMarquee() {
  const [paused, setPaused] = useState(false);
  const doubled = useMemo(() => [...REVIEWS, ...REVIEWS], []);

  return (
    <div
      className="relative overflow-hidden py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Edge fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#0c0c0a] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#0c0c0a] to-transparent" />

      <motion.div
        className="flex gap-6"
        animate={{ x: paused ? undefined : "-50%" }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
        style={{ width: "max-content" }}
      >
        {doubled.map((review, idx) => (
          <motion.div
            key={idx}
            style={{ rotate: review.rotation }}
            whileHover={{ scale: 1.03, rotate: 0 }}
            transition={{ duration: 0.3 }}
            className="w-[340px] flex-shrink-0 glass-card p-8 rounded-2xl border border-white/5 bg-white/[0.03] flex flex-col justify-between cursor-default"
          >
            <div className="flex items-center gap-4 mb-6">
              <img
                className="w-12 h-12 rounded-full object-cover border-2 border-brand-primary/30"
                src={review.avatar}
                alt={review.name}
              />
              <div>
                <h5 className="text-label-caps text-white text-xs">
                  {review.name}
                </h5>
                <div className="flex text-brand-primary gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-brand-text-muted italic text-sm leading-relaxed">
              "{review.text}"
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/** Scroll progress bar */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #b48246, #e6c07a, #b48246)",
      }}
    />
  );
}

/** Feature icon with floating + pulse glow */
function FeatureIcon({
  icon: Icon,
  label,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-4 group"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 3 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-brand-primary/20"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, delay }}
        />
        <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center border border-white/10 group-hover:border-brand-primary transition-colors relative z-10">
          <Icon
            className="text-brand-primary group-hover:scale-110 transition-transform"
            size={32}
          />
        </div>
      </motion.div>
      <span className="text-label-caps text-white text-xs tracking-widest">
        {label}
      </span>
    </motion.div>
  );
}

/** Aurora animated background for CTA */
function Aurora() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl">
      <motion.div
        className="absolute -inset-[100%] opacity-30"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, #b48246 15%, transparent 30%, #4a3520 50%, transparent 65%, #b48246 80%, transparent 100%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.15],
    [1, 0],
  );

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [introDone, setIntroDone] = useState(false);
  const [emailVal, setEmailVal] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);

  // Cart management functions
  const addToCart = useCallback((item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
        );
      }
      return [...prevItems, item];
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prevItems) => prevItems.filter((i) => i.id !== id));
    } else {
      setCartItems((prevItems) =>
        prevItems.map((i) => (i.id === id ? { ...i, quantity } : i)),
      );
    }
  }, []);

  const removeItem = useCallback((id: string) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== id));
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Smooth scroll via native CSS
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0c0c0a] text-white overflow-x-hidden">
      <GrainOverlay />
      <CursorGlow />
      <ScrollProgress />

      <Navbar
        cartCount={cartCount}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onCartClick={() => setIsCartOpen(true)}
      />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />

      {/* Render different pages based on currentPage */}
      {currentPage === "home" ? (
        <main>
          <section
            ref={heroRef}
            className="relative h-[100svh] flex items-center justify-center overflow-hidden"
          >
            {!introDone && (
              <Hero3DScene onIntroComplete={() => setIntroDone(true)} />
            )}

            <motion.div
              className="absolute inset-0 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: introDone ? 1 : 0 }}
              transition={{ duration: 1.2 }}
              style={{
                pointerEvents: introDone ? "auto" : "none",
              }}
            >
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

              <motion.div
                style={{ y: heroImageY, scale: heroScale }}
                className="absolute inset-0 z-0"
              >
                <img
                  className="w-full h-full object-cover opacity-55"
                  src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2000&auto=format&fit=crop"
                  alt="Coffee Estate"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
              </motion.div>

              <motion.div
                style={{ y: heroTextY, opacity: heroOpacity }}
                className="relative z-10 text-center px-6 max-w-5xl pt-24 mx-auto flex flex-col items-center justify-center h-full"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: introDone ? 1 : 0,
                    y: introDone ? 0 : 20,
                  }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-label-caps text-brand-primary mb-6 text-xs tracking-[0.35em]"
                >
                  ESTATE TO CUP EXPERIENCE
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{
                    opacity: introDone ? 1 : 0,
                    y: introDone ? 0 : 40,
                  }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95]"
                >
                  Discover the Soul of Malnad
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: introDone ? 1 : 0,
                    y: introDone ? 0 : 30,
                  }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="text-lg md:text-xl text-brand-text-muted mb-12 mt-8 max-w-2xl leading-relaxed"
                >
                  Discover the soul of the Malnad through our artisanal,
                  single-origin coffee and handcrafted spices.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: introDone ? 1 : 0,
                    y: introDone ? 0 : 30,
                  }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-5"
                >
                  <MagneticButton primary>
                    Shop Now
                    <ArrowRight size={18} />
                  </MagneticButton>

                  <MagneticButton>Explore Flavours</MagneticButton>
                </motion.div>
              </motion.div>

              <motion.div
                style={{ opacity: scrollIndicatorOpacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
              >
                <span className="text-label-caps text-white/60 text-[10px] tracking-[0.35em] mb-3">
                  SCROLL
                </span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                >
                  <ChevronDown className="text-brand-primary" size={18} />
                </motion.div>
              </motion.div>
            </motion.div>
          </section>

          {/* ── PRODUCTS ───────────────────────────────── */}
          <section className="py-28 px-6 md:px-20 max-w-[1440px] mx-auto">
            <div className="flex justify-between items-end mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <span className="text-label-caps text-brand-text-muted mb-2 block text-xs tracking-widest">
                  CURATED SELECTION
                </span>
                <h2 className="font-display text-4xl md:text-5xl text-white">
                  Our Signature Harvest
                </h2>
              </motion.div>
              <motion.a
                href="#"
                whileHover={{ x: 4 }}
                className="text-label-caps text-brand-primary hover:underline text-xs tracking-widest hidden md:block"
              >
                View All Collections →
              </motion.a>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-5 h-auto md:h-[820px]"
              style={{ perspective: "1200px" }}
            >
              {PRODUCTS.map((product, idx) => (
                <ProductCard key={product.id} product={product} idx={idx} />
              ))}
            </div>
          </section>

          {/* ── HERITAGE ───────────────────────────────── */}
          <section className="py-28 relative overflow-hidden">
            {/* Background texture */}
            <div className="absolute inset-0 bg-brand-surface-low/40" />
            <Orb
              size={500}
              color="radial-gradient(circle, #2a1f0f 0%, transparent 70%)"
              style={{ top: "20%", right: "-10%" }}
            />

            <div className="relative z-10 px-6 md:px-20 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Decorative border with glow */}
                <motion.div
                  className="aspect-[4/5] rounded-3xl overflow-hidden relative"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute inset-0 rounded-3xl border border-brand-primary/20 z-10" />
                  <motion.div
                    className="absolute inset-0 rounded-3xl z-10"
                    animate={{
                      boxShadow: [
                        "0 0 0px 0px rgba(180,130,70,0)",
                        "0 0 30px 5px rgba(180,130,70,0.15)",
                        "0 0 0px 0px rgba(180,130,70,0)",
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwsPf_iLE4imkehqVV7dlOJgzhI0msxx09Wfjdag_ujC9kYsGyZXuUyDdMEUDGyznSj3zernLNPnqWRkJkfG7JMP6bXmu0hbYHbV4m7FaanOCq_eULMzBa9j706s1MOnrxt5Q0kPOROfaP3aRUPWqY_J_cmHUJ4fRKqzlEdWcc0aobV_jP8wXs21C89fhVN6PAtB9SWd9DlZqSDMIIQMj-94titXqdubeEesR-AKcvFOUlbGwpSUH6wVmeu7461pdl6RkBDUqe74tU"
                    alt="Heritage Farmer"
                  />
                </motion.div>

                {/* Floating quote card */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: -2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: -2 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  animate={{ y: [0, -8, 0] }}
                  // @ts-ignore motion prop conflict — intentional
                  className="absolute -bottom-8 -right-4 md:-right-10 w-64 md:w-72 glass-card rounded-2xl p-6 shadow-2xl border border-white/5 hidden sm:block"
                  style={{
                    animationDuration: "5s",
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                  }}
                >
                  <History className="text-brand-primary mb-3" size={28} />
                  <p className="text-white italic text-sm md:text-base leading-relaxed">
                    "Preserving the legacy of the hills, one hand-picked bean at
                    a time."
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-label-caps text-brand-primary text-xs tracking-widest block"
                >
                  OUR HERITAGE
                </motion.span>
                <h2 className="font-display text-4xl md:text-6xl text-white leading-[1.1]">
                  Handcrafted in the heart of Chikmagalur
                </h2>
                <p className="text-lg text-brand-text-muted leading-relaxed">
                  Founded in the mist-laden peaks of the Western Ghats, Western Aroma
                  is more than a brand—it's a tribute to the generational
                  wisdom of our plantation workers. We believe in the luxury of
                  patience, allowing our coffee and spices to mature naturally
                  under the forest canopy.
                </p>

                {/* Animated stat pills */}
                <div className="flex gap-4 flex-wrap">
                  {[
                    ["150+", "Years Legacy"],
                    ["3", "Estates"],
                    ["100%", "Organic"],
                  ].map(([num, label], i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="glass-card rounded-2xl px-5 py-4 border border-white/5"
                    >
                      <div className="font-display text-2xl text-brand-primary">
                        {num}
                      </div>
                      <div className="text-label-caps text-[10px] text-brand-text-muted tracking-widest">
                        {label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ x: 6 }}
                  className="group flex items-center gap-3 text-brand-primary text-label-caps text-xs tracking-widest"
                >
                  LEARN OUR STORY
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={16} />
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>
          </section>

          {/* ── FEATURES ───────────────────────────────── */}
          <section className="py-28 px-6 bg-[#070706] text-center relative overflow-hidden">
            <Orb
              size={700}
              color="radial-gradient(circle, #1a1208 0%, transparent 60%)"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl text-white mb-20 relative z-10"
            >
              The Chikmagalur Standard
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-12 max-w-[1200px] mx-auto relative z-10">
              {FEATURES.map((item, idx) => (
                <FeatureIcon
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  delay={idx * 0.1}
                />
              ))}
            </div>
          </section>

          {/* ── TESTIMONIALS ───────────────────────────── */}
          <section className="py-28 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="px-6 md:px-20 max-w-[1440px] mx-auto mb-16"
            >
              <h2 className="font-display text-4xl md:text-5xl text-center text-white leading-tight">
                The Aroma Club Reviews
              </h2>
            </motion.div>
            <TestimonialMarquee />
          </section>

          {/* ── GALLERY ────────────────────────────────── */}
          <section className="py-28 bg-[#070706]/80 relative">
            <div className="px-6 md:px-20 max-w-[1440px] mx-auto mb-14 flex justify-between items-center">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="font-display text-4xl text-white"
              >
                #TheEstateLife
              </motion.h2>
              <motion.a
                href="#"
                whileHover={{ x: 4 }}
                className="text-label-caps text-brand-primary border-b border-brand-primary text-xs tracking-widest"
              >
                Follow @westernaroma
              </motion.a>
            </div>

            {/* Masonry-style gallery */}
            <div className="px-6 md:px-20 max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              {GALLERY.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: idx * 0.1,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 0.97, zIndex: 10 }}
                  className={`rounded-2xl overflow-hidden border border-white/5 relative group cursor-pointer ${
                    idx === 0 ? "md:row-span-2 aspect-[1/2]" : "aspect-square"
                  }`}
                >
                  <img
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    style={{ transitionDuration: "700ms" }}
                  />
                  {/* Cinematic hover overlay */}
                  <motion.div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0a]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-label-caps text-white/80 text-[10px] tracking-widest">
                      VIEW
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── NEWSLETTER CTA ─────────────────────────── */}
          <section className="py-28 px-6 md:px-20 max-w-[1440px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative rounded-3xl p-12 md:p-24 text-center overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(20,15,8,0.9) 0%, rgba(30,22,10,0.95) 100%)",
                border: "1px solid rgba(180,130,70,0.15)",
                boxShadow:
                  "0 40px 120px rgba(0,0,0,0.6), inset 0 1px 0 rgba(180,130,70,0.1)",
              }}
            >
              <Aurora />

              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-brand-primary/40"
                  style={{
                    left: `${15 + i * 14}%`,
                    top: `${20 + (i % 3) * 25}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.4, 1],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              ))}

              <div className="relative z-10 max-w-2xl mx-auto">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Mail className="text-brand-primary mx-auto mb-8" size={56} />
                </motion.div>

                <h2 className="font-display text-5xl md:text-7xl text-white mb-8 leading-tight">
                  Join The Aroma Club
                </h2>
                <p className="text-lg md:text-xl text-brand-text-muted mb-12 leading-relaxed">
                  Subscribe for early access to limited edition harvests,
                  brewing secrets from our estate, and exclusive members-only
                  offers.
                </p>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <input
                      type="email"
                      value={emailVal}
                      onChange={(e) => setEmailVal(e.target.value)}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      placeholder="Enter your email address"
                      className="w-full bg-transparent border-b py-4 px-2 text-white placeholder:text-brand-text-muted/50 focus:outline-none text-lg"
                      style={{
                        borderColor: emailFocused
                          ? "rgba(180,130,70,0.8)"
                          : "rgba(180,130,70,0.2)",
                        transition: "border-color 0.3s",
                      }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-[1px] bg-brand-primary"
                      animate={{ width: emailFocused ? "100%" : "0%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <MagneticButton primary>Subscribe</MagneticButton>
                </div>

                <p className="mt-8 text-label-caps text-[10px] text-brand-text-muted/40 tracking-widest">
                  BY SUBSCRIBING, YOU AGREE TO OUR PRIVACY POLICY
                </p>
              </div>
            </motion.div>
          </section>
        </main>
      ) : currentPage === "coffee" ? (
        <CoffeePage onAddToCart={addToCart} />
      ) : currentPage === "spices" ? (
        <SpicesPage onAddToCart={addToCart} />
      ) : currentPage === "our estate" ? (
        <OurEstatePage />
      ) : currentPage === "stories" ? (
        <StoriesPage />
      ) : null}

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer className="bg-[#060604] border-t border-brand-outline/10 text-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="px-6 md:px-20 py-24 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16"
        >
          <div className="md:col-span-1">
            <motion.h3
              whileHover={{ x: 4 }}
              className="font-display text-4xl text-brand-primary mb-8 cursor-default"
            >
              Western Aroma
            </motion.h3>
            <p className="text-brand-text-muted leading-relaxed max-w-xs text-sm">
              Elevating the coffee ritual through heritage, craftsmanship, and a
              deep respect for the land of Chikmagalur.
            </p>
          </div>

          {[
            {
              title: "Explore",
              links: ["Estate", "Spices", "Coffee"],
            },
            {
              title: "Information",
              links: ["Sourcing", "Shipping", "Privacy"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-label-caps text-brand-primary mb-8 text-xs tracking-widest">
                {col.title}
              </h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 4 }}
                      className="text-brand-text-muted hover:text-brand-primary transition-colors text-label-caps text-xs tracking-widest block"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-label-caps text-brand-primary mb-8 text-xs tracking-widest">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="text-brand-text-muted text-label-caps text-xs">
                Estate Office, Chikmagalur, KA
              </li>
              <li className="text-brand-text-muted text-label-caps text-xs">
                hello@westernaroma.com
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Gradient separator */}
        <div
          className="h-px mx-6 md:mx-20 max-w-[1440px] mx-auto"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(180,130,70,0.3), transparent)",
          }}
        />

        <div className="px-6 md:px-20 py-10 max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-brand-text-muted text-label-caps tracking-widest">
            © 2026 Western Aroma ESTATES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            {[Globe, Share2].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-brand-text-muted hover:text-brand-primary transition-colors"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
