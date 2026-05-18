/**
 * Coffee Page — Western Aroma
 * Chikkamagaluru · Single Origin · Estate Roasts
 * Premium 2026 aesthetic — matches OurEstatePage design language
 */

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "motion/react";
import {
  Star,
  ArrowRight,
  Leaf,
  ShoppingCart,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import { CartItem } from "@/components/Cart";
import { useRef, useState, useEffect, useCallback } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────
export interface CoffeePageProps {
  onAddToCart?: (item: CartItem) => void;
  cartItems?: CartItem[];
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const COFFEE_PRODUCTS = [
  {
    id: "coffee-1",
    name: "Chikmagalur Monsooned AA",
    origin: "Malnad Highlands · 1400m",
    process: "Wet Processed",
    roast: "Medium",
    notes: ["Earthy", "Mellow", "Smoky"],
    description:
      "Earthy, mellow and exceptionally smooth coffee processed by the monsoon winds of the Arabian Sea. A rare expression of Malabar terroir.",
    price: "₹650.00",
    priceNum: 650,
    rating: 4.9,
    reviews: 214,
    badge: "Bestseller",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAyqg6CUmB4WMSH-f9K4dsiJ-LEs0yHWbOAdIcERtNQOv93s1rms7Vtu6ID_4m5mRCeErxkdFEKo56xi4FvCYvAEfs_Cx3iqJ51FCBADFIRHsT3hn0lBoZbWJ-SfZG82YPY0YPcNkwPwVa7phmX3daNvovkSTADU_cB1pbrnsaJNZ8--MHO6-1ze71C-sdXRH7NDCpYsG-LRRViuGboHSKninOG6CCtrGpEz5S54uPgW8iRT8Ih3CbX-oOvm8jjFBXK6pItxZRt_EJi",
  },
  {
    id: "coffee-2",
    name: "Filter Kaapi Blend",
    origin: "Coorg · Chikkamagaluru",
    process: "Natural Dried",
    roast: "Dark",
    notes: ["Chicory", "Smooth", "Rich"],
    description:
      "Rich, smooth, and the aroma fills the whole room. Crafted for the south Indian filter coffee ritual—bold, grounded, and deeply satisfying.",
    price: "₹350.00",
    priceNum: 350,
    rating: 4.8,
    reviews: 187,
    badge: "Classic",
    image:
      "https://tarunaturalslite.myshopify.com/cdn/shop/products/top-view-coffee-powder-strainer-coffee-beans_23-2148453615.jpg?v=1611484682",
  },
  {
    id: "coffee-3",
    name: "Arabica Single Origin",
    origin: "Bababudangiri · 1800m",
    process: "Honey Processed",
    roast: "Light",
    notes: ["Floral", "Fruity", "Bright"],
    description:
      "Premium single-origin arabica beans with distinct floral and fruity notes. A high-altitude expression of India's oldest coffee-growing hills.",
    price: "₹750.00",
    priceNum: 750,
    rating: 4.9,
    reviews: 93,
    badge: "Limited",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB5e_JlZGaIjJ4moHKGPS-hC7KDOz0OYL4qYxasLBMw0hLgZz2EWGqDhHFPUVIZSI_Ou3KfiDIXSqZflUFaXiZDCpjxgVmRoQJcvLnrGtkHs3Sj1--wMkS8ZIla4t94el8rbWef2CB3XCISeC_AbAyy1whMd9BJQvt3bwx6szDHtwlgXyOQqTVP75HBZbGY-WyMfsSFlekJxJHPad9rs5Bztl1HK_q7beUIcivYO95hoDtJO7ULwTLVOxzVzYr3BwphpBjR6Y53Vmin",
  },
  {
    id: "coffee-4",
    name: "Estate Espresso Blend",
    origin: "Sakleshpur · 1200m",
    process: "Washed",
    roast: "Medium-Dark",
    notes: ["Bold", "Chocolate", "Balanced"],
    description:
      "Bold, intense, and perfectly balanced for espresso shots and milk-based drinks. Sourced from shade-grown estates with deep mineral character.",
    price: "₹600.00",
    priceNum: 600,
    rating: 4.7,
    reviews: 156,
    badge: "Estate",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgiU5NSKIF0WokXAriqu0woa-YkQ1SrfqTzJXP2NGRDTrutbS7iG7J7xLv_IxXWf_EcNqItlPQ4GyU_412M9iDYzOVKuxOqlze4fsM55JEsdyQ6r-BWiw9Phdaqi3VhswnD9ZD2DQUyLNxlEXdqsSX9U97voAHpHYFiu7bRkaxiirqBHUzJMfmR8M_tzbZGT6pEsObl_jP05lLOJEEXCCmYchwWRMkWltYG1L5XWX9Y-X1uzs3TEcvfaTavjRLT6BjCyH6Oc7QiBUu",
  },
];

const BENEFITS = [
  {
    icon: "🌿",
    title: "Direct from Estate",
    description:
      "Sourced directly from shade-grown coffee estates across Chikkamagaluru and Malnad — no middlemen, full traceability.",
  },
  {
    icon: "🔥",
    title: "Small-Batch Roasted",
    description:
      "Every lot is roasted in small batches to peak freshness — ensuring you taste the terroir, not the warehouse shelf.",
  },
  {
    icon: "🌱",
    title: "Shade-Grown & Sustainable",
    description:
      "Our coffee grows beneath native forest canopy, supporting biodiversity, slower maturation, and richer flavour.",
  },
];

// ─── Ambient helpers ───────────────────────────────────────────────────────────
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
        opacity: 0.26,
        ...style,
      }}
      animate={{ y: [0, -22, 0], scale: [1, 1.07, 1] }}
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
      animate={{ opacity: [0, 0.3, 0], scale: [0.8, 1.5, 0.8] }}
      transition={{ duration: 4.5, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

// 3D tilt hook
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

// ─── Coffee Product Card ───────────────────────────────────────────────────────
function CoffeeCard({
  product,
  idx,
  onAddToCart,
  cartQuantity,
}: {
  product: (typeof COFFEE_PRODUCTS)[0];
  idx: number;
  onAddToCart?: (item: CartItem) => void;
  cartQuantity: number;
}) {
  const { ref, rotX, rotY } = useTilt(5);
  const [hovered, setHovered] = useState(false);
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [justAdded, setJustAdded] = useState(false);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }, []);

  const handleAdd = () => {
    onAddToCart?.({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  // Badge color map
  const badgeColors: Record<string, string> = {
    Bestseller: "rgba(180,130,70,0.2)",
    Classic: "rgba(120,100,60,0.2)",
    Limited: "rgba(200,80,60,0.18)",
    Estate: "rgba(60,100,80,0.2)",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
      className="group relative rounded-3xl overflow-hidden flex flex-col cursor-pointer"
      aria-label={product.name}
    >
      {/* Glass container */}
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
            "linear-gradient(135deg, rgba(28,20,10,0.95) 0%, rgba(16,12,6,0.98) 100%)",
        }}
      />

      {/* Dynamic spotlight */}
      {hovered && (
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle 180px at ${spot.x}% ${spot.y}%, rgba(180,130,70,0.16) 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Image */}
      <div
        className="relative overflow-hidden h-56 flex-shrink-0"
        style={{ zIndex: 5 }}
      >
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,12,10,0.15) 0%, rgba(12,12,10,0.85) 100%)",
          }}
        />

        {/* Badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-label-caps tracking-widest"
          style={{
            background: badgeColors[product.badge] ?? "rgba(180,130,70,0.2)",
            border: "1px solid rgba(180,130,70,0.35)",
            color: "rgba(220,170,90,0.95)",
          }}
        >
          {product.badge}
        </div>

        {/* Rating pill */}
        <div
          className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full text-[10px]"
          style={{
            background: "rgba(12,12,10,0.7)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Star size={10} className="text-brand-primary fill-brand-primary" />
          <span className="text-white font-medium">{product.rating}</span>
          <span className="text-brand-text-muted">({product.reviews})</span>
        </div>

        {/* Roast strip */}
        <div className="absolute bottom-3 left-4 right-4 flex gap-2">
          {product.notes.map((note) => (
            <span
              key={note}
              className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(180,130,70,0.15)",
                border: "1px solid rgba(180,130,70,0.2)",
                color: "rgba(200,160,90,0.9)",
              }}
            >
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div
        className="relative z-20 flex flex-col flex-grow p-6"
        style={{ transform: "translateZ(12px)" }}
      >
        {/* Origin + process meta */}
        <div className="flex items-center justify-between mb-3">
          {/* <span className="text-[10px] tracking-widest text-brand-text-muted text-label-caps">
            {product.origin}
          </span> */}
          {/* <span
            className="text-[10px] tracking-widest px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(180,160,120,0.8)",
            }}
          >
            {product.roast}
          </span> */}
        </div>

        <motion.h3
          className="font-display text-xl mb-2 text-white leading-snug"
          animate={{
            color: hovered ? "rgba(220,170,90,1)" : "rgba(255,255,255,1)",
          }}
          transition={{ duration: 0.3 }}
        >
          {product.name}
        </motion.h3>

        <p className="text-sm text-brand-text-muted mb-4 leading-relaxed flex-grow line-clamp-3">
          {product.description}
        </p>

        {/* Process badge */}
        <div className="flex items-center gap-2 mb-5">
          <Leaf size={12} className="text-brand-primary" />
          <span className="text-[10px] text-brand-text-muted tracking-widest">
            {product.process}
          </span>
        </div>

        {/* Price + CTA row */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <div className="flex flex-col">
            <motion.span
              className="font-display text-2xl text-brand-primary"
              animate={hovered ? { scale: 1.04 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {product.price}
            </motion.span>
            {cartQuantity > 0 && (
              <span className="text-[10px] text-brand-primary/70 tracking-widest">
                {cartQuantity} in cart
              </span>
            )}
          </div>

          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.93 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-label-caps tracking-wider transition-all"
            style={{
              background: justAdded
                ? "rgba(60,140,90,0.25)"
                : "rgba(180,130,70,0.15)",
              border: justAdded
                ? "1px solid rgba(60,200,100,0.4)"
                : "1px solid rgba(180,130,70,0.35)",
              color: justAdded
                ? "rgba(100,220,130,0.95)"
                : "rgba(220,170,90,0.95)",
              transition: "background 0.35s, border 0.35s, color 0.35s",
            }}
          >
            <AnimatePresence mode="wait">
              {justAdded ? (
                <motion.span
                  key="check"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="flex items-center gap-1.5"
                >
                  <Check size={14} />
                  Added
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="flex items-center gap-1.5"
                >
                  <ShoppingCart size={14} />
                  Add to Cart
                  {cartQuantity > 0 && (
                    <span
                      className="w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold"
                      style={{
                        background: "rgba(180,130,70,0.4)",
                        color: "rgba(220,170,90,1)",
                      }}
                    >
                      {cartQuantity}
                    </span>
                  )}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Benefit Card ──────────────────────────────────────────────────────────────
function BenefitCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: string;
  title: string;
  description: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-2xl p-8 cursor-default"
      style={{
        background: hovered
          ? "linear-gradient(135deg, rgba(180,130,70,0.07) 0%, rgba(255,255,255,0.025) 100%)"
          : "rgba(255,255,255,0.025)",
        border: hovered
          ? "1px solid rgba(180,130,70,0.38)"
          : "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        transition: "background 0.4s, border 0.4s",
      }}
    >
      {/* Inner glass sheen */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 55%)",
        }}
      />

      <motion.div
        className="text-4xl mb-6"
        animate={{ y: hovered ? -5 : 0 }}
        transition={{ duration: 0.35 }}
      >
        {icon}
      </motion.div>

      <h3 className="font-display text-2xl mb-3 text-white relative z-10">
        {title}
      </h3>
      <p className="text-sm text-brand-text-muted leading-relaxed relative z-10">
        {description}
      </p>

      <motion.div
        className="flex items-center gap-2 mt-6 text-brand-primary text-label-caps text-xs tracking-widest"
        animate={{ x: hovered ? 4 : 0 }}
        transition={{ duration: 0.25 }}
      >
        LEARN MORE <ArrowRight size={13} />
      </motion.div>
    </motion.div>
  );
}

// ─── Flavour Wheel Strip ───────────────────────────────────────────────────────
const FLAVOUR_NODES = [
  "Earthy",
  "Floral",
  "Fruity",
  "Chocolate",
  "Smoky",
  "Nutty",
  "Spiced",
  "Bright",
];

function FlavourStrip() {
  return (
    <div className="flex gap-3 flex-wrap justify-center">
      {FLAVOUR_NODES.map((node, i) => (
        <motion.div
          key={node}
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            delay: i * 0.07,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.1, borderColor: "rgba(180,130,70,0.7)" }}
          className="px-4 py-2 rounded-full text-xs tracking-widest text-brand-text-muted cursor-default select-none"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.08)",
            transition: "border-color 0.3s",
          }}
        >
          {node}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export function CoffeePage({ onAddToCart, cartItems = [] }: CoffeePageProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  const getCartQuantity = (productId: string) =>
    cartItems.find((item) => item.id === productId)?.quantity ?? 0;

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
          color="radial-gradient(circle, rgba(180,130,70,0.22) 0%, transparent 70%)"
          style={{ top: "-20%", left: "-8%" }}
          duration={10}
        />
        <Orb
          size={450}
          color="radial-gradient(circle, rgba(50,35,15,0.6) 0%, transparent 70%)"
          style={{ bottom: "5%", right: "-6%" }}
          duration={13}
        />

        {/* Decorative floating dots */}
        <SpiceAccent x="8%" y="25%" size={5} delay={0} />
        <SpiceAccent x="85%" y="30%" size={3} delay={1.4} />
        <SpiceAccent x="60%" y="75%" size={4} delay={2.2} />
        <SpiceAccent x="92%" y="60%" size={3} delay={0.9} />

        {/* Concentric ring decorations */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[600, 900].map((s, i) => (
            <motion.div
              key={s}
              className="absolute rounded-full"
              style={{
                width: s,
                height: s,
                border: "1px solid rgba(180,130,70,0.06)",
              }}
              animate={{
                scale: [1, 1.04 + i * 0.02, 1],
                opacity: [0.3 - i * 0.1, 0.6 - i * 0.1, 0.3 - i * 0.1],
              }}
              transition={{
                duration: 8 + i * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i,
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
            WESTERN AROMA · COFFEE COLLECTION
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
            Coffee from the
            <br />
            Birthplace of India
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-brand-text-muted max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Crafted from shade-grown estates across Chikkamagaluru and Malnad,
            our coffee collection brings the deep character of Western Ghats
            terroir directly to your cup.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            <FlavourStrip />
          </motion.div>
        </motion.div>
      </section>

      {/* ── PRODUCT GRID ───────────────────────────── */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="text-label-caps text-brand-text-muted text-xs tracking-widest block mb-2">
                SINGLE ORIGINS & BLENDS
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-white">
                Our Coffee Catalogue
              </h2>
            </div>
            <motion.span
              className="hidden md:block text-label-caps text-brand-primary text-xs tracking-widest"
              whileHover={{ x: 4 }}
            >
              {COFFEE_PRODUCTS.length} Varieties →
            </motion.span>
          </motion.div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            style={{ perspective: "1400px" }}
          >
            {COFFEE_PRODUCTS.map((product, idx) => (
              <CoffeeCard
                key={product.id}
                product={product}
                idx={idx}
                onAddToCart={onAddToCart}
                cartQuantity={getCartQuantity(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── ORIGIN BELT ────────────────────────────── */}
      <section className="py-16 px-6 md:px-20 overflow-hidden relative">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(12,12,10,1) 0%, rgba(28,20,10,0.4) 50%, rgba(12,12,10,1) 100%)",
          }}
        />
        <Orb
          size={500}
          color="radial-gradient(circle, rgba(40,28,12,0.6) 0%, transparent 70%)"
          style={{ top: "-20%", left: "30%" }}
          duration={12}
        />

        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Estates Sourced", value: "4+" },
              { label: "Altitude Range", value: "1100–1800m" },
              { label: "Processing Types", value: "4" },
              { label: "Roast Profiles", value: "Light to Dark" },
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

      {/* ── BENEFITS ───────────────────────────────── */}
      <section className="py-24 px-6 md:px-20 relative overflow-hidden">
        <Orb
          size={600}
          color="radial-gradient(circle, rgba(50,35,15,0.5) 0%, transparent 70%)"
          style={{ bottom: "-10%", right: "-8%" }}
          duration={14}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(180,130,70,0.2), transparent)",
          }}
        />

        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-label-caps text-brand-primary text-xs tracking-widest block mb-4">
              THE WESTERN AROMA PROMISE
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white">
              Why Our Coffee is Different
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BENEFITS.map((b, idx) => (
              <BenefitCard key={b.title} {...b} delay={idx * 0.12} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ──────────────────────────────── */}
      <section className="py-20 px-6 md:px-20 max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative rounded-3xl p-12 md:p-20 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(28,20,8,0.96) 0%, rgba(18,12,4,0.98) 100%)",
            border: "1px solid rgba(180,130,70,0.18)",
            boxShadow:
              "0 40px 100px rgba(0,0,0,0.6), inset 0 1px 0 rgba(180,130,70,0.08)",
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

          <div className="relative z-10 flex-1">
            <span className="text-label-caps text-brand-primary text-xs tracking-widest block mb-4">
              GIFT THE HIGHLANDS
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-white leading-[1.1] mb-4">
              Build Your Coffee Experience
            </h2>
            <p className="text-brand-text-muted leading-relaxed max-w-md">
              Mix and match our estate coffees to create a personalised tasting
              journey—or gift a curated hamper from the Malnad highlands.
            </p>
          </div>

          <motion.button
            whileHover={{
              scale: 1.04,
              boxShadow: "0 20px 55px rgba(180,130,70,0.28)",
            }}
            whileTap={{ scale: 0.97 }}
            className="relative z-10 flex-shrink-0 flex items-center gap-3 px-10 py-5 rounded-full font-label-caps text-sm tracking-widest text-brand-on-primary"
            style={{
              background:
                "linear-gradient(135deg, #b48246 0%, #d4a060 50%, #b48246 100%)",
            }}
          >
            Shop All Coffee
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
