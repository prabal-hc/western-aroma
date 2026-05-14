import { motion, useMotionValue, useSpring } from "motion/react";
import { useState, useRef, useEffect, useCallback } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  primary?: boolean;
}

function useMagneticEffect(strength = 0.4) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 22 });
  const springY = useSpring(y, { stiffness: 120, damping: 22 });

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

/** Magnetic CTA button */
export function MagneticButton({
  children,
  className,
  onClick,
  primary = false,
}: MagneticButtonProps) {
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
