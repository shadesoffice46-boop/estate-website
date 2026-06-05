import type { Variants } from "framer-motion";

/**
 * Shared Framer Motion variants.
 * Reveals enhance an already-visible default — content is never gated behind
 * a class that fails to fire on headless renders. We animate transform/opacity
 * only, with an exponential ease-out for a calm, premium feel.
 */

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

/** Parent container that staggers its children into view. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

/** Single staggered child (pairs with staggerContainer). */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

/** Default viewport config for whileInView reveals. */
export const inView = { once: true, amount: 0.2, margin: "0px 0px -10% 0px" };
