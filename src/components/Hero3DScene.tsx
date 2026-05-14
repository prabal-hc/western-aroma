"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Phase = "split" | "merge" | "whole" | "text" | "fade";

function BeanHalf({ side, phase }: { side: "left" | "right"; phase: Phase }) {
  return (
    <motion.div
      initial={{
        x: side === "left" ? -1100 : 1100,
        y: side === "left" ? -120 : 120,
        rotateY: side === "left" ? -90 : 90,
        rotateZ: side === "left" ? -15 : 15,
        opacity: 0,
        scale: 0.82,
        filter: "blur(16px)",
      }}
      animate={{
        x:
          phase === "split"
            ? side === "left"
              ? -20
              : 20
            : phase === "merge"
              ? 0
              : 0,
        y: phase === "split" ? (side === "left" ? -10 : 10) : 0,
        rotateY: phase === "split" ? (side === "left" ? -8 : 8) : 0,
        rotateZ: 0,
        opacity: phase === "whole" || phase === "text" ? 0 : 1,
        scale: phase === "merge" ? 1.02 : 1,
        filter: phase === "split" ? "blur(0px)" : "blur(0px)",
      }}
      transition={{
        duration: 2.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute"
      style={{
        width: "220px",
        height: "320px",
        perspective: "1400px",
        transformStyle: "preserve-3d",
        filter:
          "drop-shadow(0 0 40px rgba(180,130,70,0.22)) drop-shadow(0 25px 50px rgba(0,0,0,0.5))",
      }}
    >
      <img
        src="/images/coffee-bean.png"
        alt="Coffee Bean Half"
        draggable={false}
        className="absolute pointer-events-none select-none"
        style={{
          width: "260px",
          height: "360px",
          objectFit: "contain",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          clipPath:
            side === "left"
              ? "polygon(0 0, 50% 0, 50% 100%, 0 100%)"
              : "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
        }}
      />
    </motion.div>
  );
}

function WholeBean({ phase }: { phase: Phase }) {
  return (
    <AnimatePresence>
      {(phase === "whole" || phase === "text") && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.5,
            rotateY: 90,
            y: 0,
          }}
          animate={{
            opacity: phase === "whole" || phase === "text" ? 1 : 0,
            scale: phase === "whole" ? 1 : phase === "text" ? 0.42 : 0.7,
            rotateY: 0,
            y: phase === "text" ? -180 : 0,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute z-20"
          style={{
            width: "220px",
            height: "320px",
            filter:
              "drop-shadow(0 0 40px rgba(180,130,70,0.25)) drop-shadow(0 20px 50px rgba(0,0,0,0.5))",
          }}
        >
          <img
            src="/images/coffee-bean.png"
            alt="Coffee Bean"
            className="w-full h-full object-contain select-none pointer-events-none"
            draggable={false}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FloatingParticles() {
  return (
    <>
      {[...Array(14)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#b48246]/30"
          style={{
            width: 4 + Math.random() * 6,
            height: 4 + Math.random() * 6,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: "blur(2px)",
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.15, 0.7, 0.15],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

export default function Hero3DScene({
  onIntroComplete,
}: {
  onIntroComplete: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("split");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("merge"), 2200),
      setTimeout(() => setPhase("whole"), 2350),
      setTimeout(() => setPhase("text"), 3600),
      setTimeout(() => setPhase("fade"), 5200),
      setTimeout(() => onIntroComplete(), 6000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onIntroComplete]);

  return (
    <AnimatePresence>
      {phase !== "fade" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-[120] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at center, rgba(28,16,8,0.96), rgba(5,5,5,1))",
          }}
        >
          {/* ambient glow */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-[800px] h-[800px] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(180,130,70,0.18), transparent 70%)",
            }}
          />

          <FloatingParticles />

          <BeanHalf side="left" phase={phase} />
          <BeanHalf side="right" phase={phase} />
          <WholeBean phase={phase} />

          {phase === "text" && (
            <motion.h1
              initial={{
                opacity: 0,
                y: 80,
                filter: "blur(14px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute z-30 text-white text-center px-6"
              style={{
                fontSize: "clamp(2rem, 5vw, 5rem)",
                fontFamily: "serif",
                textShadow: "0 0 40px rgba(180,130,70,0.25)",
              }}
            >
              From the Hills to Your Cup
            </motion.h1>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
