// Adapted from the Spell UI Highlighted Text component supplied by the user.
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type From = "left" | "right" | "top" | "bottom";

interface HighlightedTextProps {
  children: ReactNode;
  className?: string;
  from?: From;
  delay?: number;
  inView?: boolean;
  once?: boolean;
}

const fromVariants = {
  left: { hidden: { x: "-100%" }, visible: { x: "0%" } },
  right: { hidden: { x: "100%" }, visible: { x: "0%" } },
  top: { hidden: { y: "-100%" }, visible: { y: "0%" } },
  bottom: { hidden: { y: "100%" }, visible: { y: "0%" } },
};

export function HighlightedText({ children, className, from = "bottom", delay = 0, inView = false, once = true }: HighlightedTextProps) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.span
      className={cn("relative inline-block overflow-hidden align-baseline", className)}
      initial={reducedMotion ? "visible" : "hidden"}
      {...(inView ? { whileInView: "visible" } : { animate: "visible" })}
      viewport={{ once }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 bg-primary"
        variants={fromVariants[from]}
        transition={reducedMotion ? { duration: 0 } : { type: "spring", damping: 30, stiffness: 300, delay }}
      />
      <span className="relative z-10 inline-block px-[0.15em] py-[0.2em] leading-[1.15] text-primary-foreground">{children}</span>
    </motion.span>
  );
}

export default HighlightedText;