"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, inView, staggerContainer } from "@/lib/motion";

/** Intrinsic elements we render motion versions of. */
type RevealTag = "div" | "section" | "ul" | "li" | "article" | "p" | "span";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Render as a different element (e.g. "section", "ul", "li"). */
  as?: RevealTag;
  /** Override the motion variants. Defaults to a fade-up. */
  variants?: Variants;
  /** When true, this element staggers its direct children. */
  stagger?: boolean;
  /** Extra delay before the reveal begins, in seconds. */
  delay?: number;
};

/**
 * whileInView reveal wrapper. Content renders fully by default and the
 * animation only enhances it, so it never ships blank on a headless render.
 * Honors prefers-reduced-motion automatically via Framer's reducedMotion.
 *
 * Uses `motion[tag]` (the built-in proxy) rather than `motion(tag)` so no
 * component is recreated on render and there's no deprecation path.
 */
export function Reveal({
  children,
  className,
  as = "div",
  variants,
  stagger = false,
  delay = 0,
}: RevealProps) {
  const MotionTag = motion[as];
  const resolved = variants ?? (stagger ? staggerContainer : fadeUp);

  return (
    <MotionTag
      className={className}
      variants={resolved}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
