import { motion } from "motion/react";

interface OrbProps {
  size: number;
  color: string;
  style?: React.CSSProperties;
}

export function Orb({ size, color, style }: OrbProps) {
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
