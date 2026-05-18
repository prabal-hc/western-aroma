/**
 * Spices Page — Western Aroma
 * Malnad Spice Trails · Handpicked · Estate-Grown
 * Premium 2026 aesthetic — matches OurEstatePage & CoffeePage design language
 */

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "motion/react";
import { Star, ArrowRight, Check, ShoppingCart } from "lucide-react";
import { CartItem } from "@/components/Cart";
import { useRef, useState, useEffect, useCallback } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────
export interface SpicesPageProps {
  onAddToCart?: (item: CartItem) => void;
  cartItems?: CartItem[];
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const SPICES_PRODUCTS = [
  {
    id: "spice-1",
    name: "Estate Tellicherry Pepper",
    origin: "Malnad · Climbing Vines",
    category: "Peppercorn",
    intensity: 5,
    notes: ["Bold", "Warm", "Pungent"],
    description:
      "King of Spices. Handpicked premium whole black peppercorns grown on silver oak trees across our Malnad estate—bold, fragrant, and intensely alive.",
    price: "₹420.00",
    rating: 4.9,
    reviews: 231,
    badge: "Bestseller",
    emoji: "🌿",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgiU5NSKIF0WokXAriqu0woa-YkQ1SrfqTzJXP2NGRDTrutbS7iG7J7xLv_IxXWf_EcNqItlPQ4GyU_412M9iDYzOVKuxOqlze4fsM55JEsdyQ6r-BWiw9Phdaqi3VhswnD9ZD2DQUyLNxlEXdqsSX9U97voAHpHYFiu7bRkaxiirqBHUzJMfmR8M_tzbZGT6pEsObl_jP05lLOJEEXCCmYchwWRMkWltYG1L5XWX9Y-X1uzs3TEcvfaTavjRLT6BjCyH6Oc7QiBUu",
  },
  {
    id: "spice-2",
    name: "Wild Forest Cardamom",
    origin: "Shade Pockets · 1100m+",
    category: "Cardamom",
    intensity: 4,
    notes: ["Floral", "Cooling", "Sweet"],
    description:
      "Premium green cardamom harvested from shaded forest pockets on our estate. Intense aromatic character with a lingering floral sweetness unique to Malnad's cool elevations.",
    price: "₹890.00",
    rating: 4.8,
    reviews: 142,
    badge: "Rare",
    emoji: "🫛",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMBsQ0tkDkENx3MmpX1pvHis_sBtWONDfa78D0WKQrIFGDJSr6Ay8_Xw_x8TPWMhyvsT6sSTHxmjygOWez_OK4hYpEav2MBIhmgbkGDKU9heabdBTRYR7VRXZuDnDBDHtaMw-jVHBXDWDbxlJ6rRokhemMANauC168sZwHxkbydaUyLLzFK4RvfEIHjbFUSTlrKI5Aa2R0ObrwiRLGaEHSLglT0yE7TJTbiGfCwIM8NexNq2CWKscHOnH4P9ZiT6nQrDLLt9Wq8biC",
  },
  {
    id: "spice-3",
    name: "Organic Estate Turmeric",
    origin: "Monsoon Soil · Malnad",
    category: "Root Spice",
    intensity: 3,
    notes: ["Earthy", "Warm", "Vibrant"],
    description:
      "Sun-dried turmeric root from our monsoon-fed estate soil. Vibrant golden colour, warm earthy flavour, and naturally high curcumin content—nothing added, nothing taken away.",
    price: "₹280.00",
    rating: 4.7,
    reviews: 198,
    badge: "Organic",
    emoji: "🌾",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMBsQ0tkDkENx3MmpX1pvHis_sBtWONDfa78D0WKQrIFGDJSr6Ay8_Xw_x8TPWMhyvsT6sSTHxmjygOWez_OK4hYpEav2MBIhmgbkGDKU9heabdBTRYR7VRXZuDnDBDHtaMw-jVHBXDWDbxlJ6rRokhemMANauC168sZwHxkbydaUyLLzFK4RvfEIHjbFUSTlrKI5Aa2R0ObrwiRLGaEHSLglT0yE7TJTbiGfCwIM8NexNq2CWKscHOnH4P9ZiT6nQrDLLt9Wq8biC",
  },
  {
    id: "spice-4",
    name: "True Ceylon Cinnamon",
    origin: "Small-Batch · Seasonal",
    category: "Bark Spice",
    intensity: 3,
    notes: ["Sweet", "Delicate", "Aromatic"],
    description:
      "Premium true Ceylon cinnamon bark with a gentle sweetness and subtle warmth—worlds apart from the cassia variety. Sourced in small seasonal lots for peak fragrance.",
    price: "₹320.00",
    rating: 4.9,
    reviews: 176,
    badge: "Estate",
    emoji: "🌸",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB5e_JlZGaIjJ4moHKGPS-hC7KDOz0OYL4qYxasLBMw0hLgZz2EWGqDhHFPUVIZSI_Ou3KfiDIXSqZflUFaXiZDCpjxgVmRoQJcvLnrGtkHs3Sj1--wMkS8ZIla4t94el8rbWef2CB3XCISeC_AbAyy1whMd9BJQvt3bwx6szDHtwlgXyOQqTVP75HBZbGY-WyMfsSFlekJxJHPad9rs5Bztl1HK_q7beUIcivYO95hoDtJO7ULwTLVOxzVzYr3BwphpBjR6Y53Vmin",
  },
  {
    id: "spice-5",
    name: "Malnad Fenugreek",
    origin: "Estate Grown · Seasonal",
    category: "Seed Spice",
    intensity: 2,
    notes: ["Maple", "Bitter", "Nutty"],
    description:
      "Aromatic methi seeds with characteristic bitter complexity and a subtle maple-like depth. A cornerstone of Malnad cuisine and Ayurvedic tradition.",
    price: "₹150.00",
    rating: 4.6,
    reviews: 89,
    badge: "Traditional",
    emoji: "🌱",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgiU5NSKIF0WokXAriqu0woa-YkQ1SrfqTzJXP2NGRDTrutbS7iG7J7xLv_IxXWf_EcNqItlPQ4GyU_412M9iDYzOVKuxOqlze4fsM55JEsdyQ6r-BWiw9Phdaqi3VhswnD9ZD2DQUyLNxlEXdqsSX9U97voAHpHYFiu7bRkaxiirqBHUzJMfmR8M_tzbZGT6pEsObl_jP05lLOJEEXCCmYchwWRMkWltYG1L5XWX9Y-X1uzs3TEcvfaTavjRLT6BjCyH6Oc7QiBUu",
  },
  {
    id: "spice-6",
    name: "Whole Star Anise",
    origin: "Small Harvest · Dried",
    category: "Aromatic",
    intensity: 4,
    notes: ["Licorice", "Spiced", "Deep"],
    description:
      "Premium whole star anise with strong, complex licorice notes. Carefully dried to preserve the essential oils that make this spice essential to slow-cooked dishes and festive blends.",
    price: "₹220.00",
    rating: 4.8,
    reviews: 107,
    badge: "Artisan",
    emoji: "✨",
    image:
      "https://tildaricelive.s3.eu-central-1.amazonaws.com/wp-content/uploads/2022/04/22150646/Star-anise-copy.jpg",
  },
];

const QUALITY_PROMISES = [
  {
    emoji: "🫙",
    title: "100% Pure & Natural",
    description:
      "No additives, fillers, preservatives, or artificial colours. What you get is exactly what the estate grows—nothing more, nothing less.",
  },
  {
    emoji: "✋",
    title: "Handpicked Selection",
    description:
      "Every batch is hand-selected at peak ripeness by our estate team, ensuring the highest potency and freshest aroma in each jar.",
  },
  {
    emoji: "🌿",
    title: "Certified Organic",
    description:
      "Grown without synthetic fertilisers or pesticides on shade-grown, forest-integrated estate land—certified organic from root to jar.",
  },
];

// Flavour profile dots → intensity indicator
const INTENSITY_DOTS = 5;

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

// 3D tilt hook
function useTilt(max = 5) {
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

// Intensity dot indicator
function IntensityDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: INTENSITY_DOTS }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: 6,
            height: 6,
            background:
              i < level ? "rgba(180,130,70,0.9)" : "rgba(255,255,255,0.1)",
            border:
              i < level
                ? "1px solid rgba(180,130,70,0.5)"
                : "1px solid rgba(255,255,255,0.06)",
          }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{
            delay: i * 0.06,
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          viewport={{ once: true }}
        />
      ))}
    </div>
  );
}

// ─── Spice Product Card ────────────────────────────────────────────────────────
function SpiceCard({
  product,
  idx,
  onAddToCart,
  cartQuantity,
}: {
  product: (typeof SPICES_PRODUCTS)[0];
  idx: number;
  onAddToCart?: (item: CartItem) => void;
  cartQuantity: number;
}) {
  const { ref, rotX, rotY } = useTilt(4);
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

  const badgeColors: Record<
    string,
    { bg: string; border: string; text: string }
  > = {
    Bestseller: {
      bg: "rgba(180,130,70,0.18)",
      border: "rgba(180,130,70,0.4)",
      text: "rgba(220,170,90,0.95)",
    },
    Rare: {
      bg: "rgba(160,80,200,0.15)",
      border: "rgba(160,80,200,0.35)",
      text: "rgba(200,140,240,0.9)",
    },
    Organic: {
      bg: "rgba(60,140,80,0.15)",
      border: "rgba(60,160,80,0.35)",
      text: "rgba(100,210,120,0.9)",
    },
    Estate: {
      bg: "rgba(80,120,180,0.15)",
      border: "rgba(80,140,200,0.35)",
      text: "rgba(120,180,240,0.9)",
    },
    Traditional: {
      bg: "rgba(180,120,60,0.15)",
      border: "rgba(180,140,60,0.35)",
      text: "rgba(220,180,100,0.9)",
    },
    Artisan: {
      bg: "rgba(200,80,100,0.15)",
      border: "rgba(200,80,100,0.35)",
      text: "rgba(240,130,150,0.9)",
    },
  };
  const bc = badgeColors[product.badge] ?? badgeColors.Bestseller;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.15 }}
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
            "linear-gradient(145deg, rgba(28,20,10,0.96) 0%, rgba(14,10,4,0.98) 100%)",
        }}
      />

      {/* Glass inner sheen */}
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
            background: `radial-gradient(circle 180px at ${spot.x}% ${spot.y}%, rgba(180,130,70,0.14) 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Product image */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ height: 240, zIndex: 5 }}
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
              "linear-gradient(180deg, rgba(12,8,4,0.12) 0%, rgba(12,8,4,0.82) 100%)",
          }}
        />

        {/* Emoji accent */}
        <motion.div
          className="absolute top-4 left-4 w-10 h-10 rounded-2xl flex items-center justify-center text-xl"
          style={{
            background: "rgba(12,8,4,0.65)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
          animate={{ y: hovered ? -3 : 0 }}
          transition={{ duration: 0.35 }}
        >
          {product.emoji}
        </motion.div>

        {/* Badge */}
        <div
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-label-caps tracking-widest"
          style={{
            background: bc.bg,
            border: `1px solid ${bc.border}`,
            color: bc.text,
          }}
        >
          {product.badge}
        </div>

        {/* Flavour note pills at bottom of image */}
        <div className="absolute bottom-3 left-4 right-4 flex gap-2 flex-wrap">
          {product.notes.map((note) => (
            <span
              key={note}
              className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(180,130,70,0.14)",
                border: "1px solid rgba(180,130,70,0.22)",
                color: "rgba(200,160,90,0.9)",
              }}
            >
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* Card content */}
      <div
        className="relative z-20 flex flex-col flex-grow p-6"
        style={{ transform: "translateZ(12px)" }}
      >
        {/* Origin + category */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] tracking-widest text-brand-text-muted text-label-caps">
            {product.origin}
          </span>
          <span
            className="text-[10px] tracking-widest px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(180,160,120,0.8)",
            }}
          >
            {product.category}
          </span>
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

        {/* Intensity + rating row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] tracking-widest text-brand-text-muted uppercase">
              Intensity
            </span>
            <IntensityDots level={product.intensity} />
          </div>
          <div className="flex items-center gap-1.5">
            <Star size={12} className="text-brand-primary fill-brand-primary" />
            <span className="text-sm text-white font-medium">
              {product.rating}
            </span>
            <span className="text-[10px] text-brand-text-muted">
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Price + CTA */}
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
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-label-caps tracking-wider overflow-hidden"
            style={{
              background: justAdded
                ? "rgba(60,140,90,0.25)"
                : "rgba(180,130,70,0.14)",
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

// ─── Quality Promise Card ──────────────────────────────────────────────────────
function PromiseCard({
  emoji,
  title,
  description,
  delay,
}: {
  emoji: string;
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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.025) 0%, transparent 55%)",
        }}
      />
      <motion.div
        className="text-4xl mb-6"
        animate={{ y: hovered ? -5 : 0 }}
        transition={{ duration: 0.35 }}
      >
        {emoji}
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

// Aromas strip — scrolling flavour tags
const AROMA_TAGS = [
  "Bold",
  "Warm",
  "Floral",
  "Earthy",
  "Sweet",
  "Pungent",
  "Cooling",
  "Bitter",
  "Spiced",
  "Nutty",
  "Licorice",
  "Aromatic",
];

function AromaStrip() {
  return (
    <div className="flex gap-3 flex-wrap justify-center">
      {AROMA_TAGS.map((tag, i) => (
        <motion.div
          key={tag}
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            delay: i * 0.055,
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.1, borderColor: "rgba(180,130,70,0.65)" }}
          className="px-4 py-2 rounded-full text-xs tracking-widest text-brand-text-muted cursor-default select-none"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.08)",
            transition: "border-color 0.3s",
          }}
        >
          {tag}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export function SpicesPage({ onAddToCart, cartItems = [] }: SpicesPageProps) {
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
          color="radial-gradient(circle, rgba(180,130,70,0.2) 0%, transparent 70%)"
          style={{ top: "-18%", right: "-6%" }}
          duration={11}
        />
        <Orb
          size={500}
          color="radial-gradient(circle, rgba(50,35,15,0.55) 0%, transparent 70%)"
          style={{ bottom: "0%", left: "-8%" }}
          duration={13}
        />

        {/* Floating accent dots */}
        <SpiceAccent x="10%" y="22%" size={5} delay={0} />
        <SpiceAccent x="82%" y="28%" size={3} delay={1.3} />
        <SpiceAccent x="65%" y="72%" size={4} delay={2.1} />
        <SpiceAccent x="92%" y="55%" size={3} delay={0.8} />
        <SpiceAccent x="30%" y="85%" size={4} delay={1.9} />

        {/* Concentric rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[550, 850].map((s, i) => (
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
                opacity: [0.25 - i * 0.08, 0.55 - i * 0.08, 0.25 - i * 0.08],
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
            WESTERN AROMA · SPICE COLLECTION
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
            The Spice Trails
            <br />
            of Malnad
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-brand-text-muted max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Discover the finest whole spices from the heartland of Karnataka's
            Malnad region. Each spice carries centuries of flavour heritage,
            grown and handpicked on our Western Ghats estate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            <AromaStrip />
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
                WHOLE SPICES · ESTATE GROWN
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-white">
                Our Spice Catalogue
              </h2>
            </div>
            <motion.span
              className="hidden md:block text-label-caps text-brand-primary text-xs tracking-widest"
              whileHover={{ x: 4 }}
            >
              {SPICES_PRODUCTS.length} Varieties →
            </motion.span>
          </motion.div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            style={{ perspective: "1400px" }}
          >
            {SPICES_PRODUCTS.map((product, idx) => (
              <SpiceCard
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

      {/* ── PROVENANCE BELT ────────────────────────── */}
      <section className="py-16 px-6 md:px-20 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(12,12,10,1) 0%, rgba(28,20,10,0.4) 50%, rgba(12,12,10,1) 100%)",
          }}
        />
        <Orb
          size={500}
          color="radial-gradient(circle, rgba(40,28,12,0.55) 0%, transparent 70%)"
          style={{ top: "-30%", left: "35%" }}
          duration={12}
        />

        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Spice Varieties", value: "6+" },
              { label: "Estate Sourced", value: "100%" },
              { label: "Processing Method", value: "Sun-Dried" },
              { label: "Farming Standard", value: "Organic" },
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

      {/* ── QUALITY PROMISE ────────────────────────── */}
      <section className="py-24 px-6 md:px-20 relative overflow-hidden">
        <Orb
          size={600}
          color="radial-gradient(circle, rgba(50,35,15,0.5) 0%, transparent 70%)"
          style={{ top: "-10%", left: "-8%" }}
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
              Our Quality Standard
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {QUALITY_PROMISES.map((p, idx) => (
              <PromiseCard key={p.title} {...p} delay={idx * 0.12} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SPICE STORY STRIP ──────────────────────── */}
      <section className="py-20 px-6 md:px-20 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(180,130,70,0.18), transparent)",
          }}
        />

        <div className="max-w-[1440px] mx-auto">
          <div
            className="relative rounded-3xl p-1 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(180,130,70,0.15) 0%, rgba(255,255,255,0.03) 50%, rgba(180,130,70,0.08) 100%)",
            }}
          >
            <div
              className="rounded-[22px] p-12 md:p-16 relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(18,12,5,0.98) 0%, rgba(12,8,3,0.99) 100%)",
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
                  style={{
                    left: `${12 + i * 14}%`,
                    top: `${20 + (i % 3) * 28}%`,
                  }}
                  animate={{
                    y: [0, -16, 0],
                    opacity: [0.12, 0.55, 0.12],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3.5 + i * 0.4,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              ))}

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <span className="text-label-caps text-brand-primary text-xs tracking-widest block mb-4">
                    MALNAD HERITAGE
                  </span>
                  <h2 className="font-display text-3xl md:text-5xl text-white leading-[1.1] mb-6">
                    Centuries of Spice.
                    <br />
                    <span className="text-brand-primary">One Estate.</span>
                  </h2>
                  <p className="text-brand-text-muted leading-relaxed max-w-lg">
                    Long before coffee reached Chikkamagaluru, the Malnad region
                    was already famous for its black pepper and cardamom—traded
                    across ancient routes from the Western Ghats to the world.
                    Our estate honours that legacy with every jar we pack.
                  </p>
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 20px 55px rgba(180,130,70,0.28)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-shrink-0 flex items-center gap-3 px-10 py-5 rounded-full font-label-caps text-sm tracking-widest text-brand-on-primary relative z-10"
                  style={{
                    background:
                      "linear-gradient(135deg, #b48246 0%, #d4a060 50%, #b48246 100%)",
                  }}
                >
                  Explore All Spices
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
