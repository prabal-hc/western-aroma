import { AnimatePresence, motion } from "motion/react";
import { EASE_IN_OUT } from "@/components/motion";

/** Full-screen panel that slides up over the page, then off the top, while pages swap underneath. */
export const CURTAIN_COVER_MS = 750;

export function PageCurtain({ label }: { label: string | null }) {
  return (
    <AnimatePresence>
      {label && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[10000] pointer-events-auto"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: CURTAIN_COVER_MS / 1000, ease: EASE_IN_OUT }}
        >
          {/* leading curved edge */}
          <svg className="absolute -top-[10vh] left-0 w-full h-[10vh]" viewBox="0 0 100 10" preserveAspectRatio="none">
            <path d="M0 10 Q50 0 100 10 Z" fill="#1a130b" />
          </svg>
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ background: "radial-gradient(circle at 50% 60%, #2a1c0e 0%, #1a130b 55%, #0c0c0a 100%)" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: 0.25, ease: EASE_IN_OUT }}
              className="text-[11px] tracking-[0.45em] uppercase text-[#b48246] mb-4"
            >
              Western Aroma
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE_IN_OUT }}
              className="font-display text-5xl md:text-7xl text-white capitalize"
            >
              {label}
            </motion.span>
          </div>
          {/* trailing curved edge */}
          <svg className="absolute -bottom-[10vh] left-0 w-full h-[10vh]" viewBox="0 0 100 10" preserveAspectRatio="none">
            <path d="M0 0 Q50 10 100 0 Z" fill="#0c0c0a" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
