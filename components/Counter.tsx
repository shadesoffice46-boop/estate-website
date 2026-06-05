"use client";

import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useReducedMotion,
  animate,
} from "framer-motion";

type CounterProps = {
  value: number;
  suffix?: string;
  /** Decimal places to render (e.g. 1 for "2.4"). */
  decimals?: number;
  durationMs?: number;
};

/**
 * Counts up from 0 to `value` when scrolled into view.
 * Respects prefers-reduced-motion by rendering the final value immediately.
 */
export function Counter({
  value,
  suffix = "",
  decimals = 0,
  durationMs = 1600,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduce) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, value, {
      duration: durationMs / 1000,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    });

    return () => controls.stop();
  }, [inView, value, reduce, durationMs]);

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
}
