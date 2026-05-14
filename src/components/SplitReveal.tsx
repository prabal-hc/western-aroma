import { motion } from "motion/react";

interface SplitRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function SplitReveal({ text, className, delay = 0 }: SplitRevealProps) {
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
