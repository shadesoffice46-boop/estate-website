"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;
const AUTO_MS = 6000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion();
  const count = testimonials.length;

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((prev) => (prev + dir + count) % count);
    },
    [count],
  );

  // Auto-advance, paused for reduced-motion users.
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => go(1), AUTO_MS);
    return () => clearInterval(id);
  }, [go, reduce, index]);

  const active = testimonials[index];

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-page">
        <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-xl text-h2 font-bold text-blue">
            What it&apos;s like on the other side of the deal
          </h2>

          {/* Slider controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-blue/15 text-blue transition-colors hover:border-blue hover:bg-blue hover:text-white"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-blue/15 text-blue transition-colors hover:border-blue hover:bg-blue hover:text-white"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </Reveal>

        <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-card sm:p-12 md:p-16">
          <Quote
            size={64}
            aria-hidden
            className="absolute right-8 top-8 text-brown-taupe/25"
            fill="currentColor"
          />

          <div className="relative min-h-[14rem]" aria-live="polite">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={active.id}
                custom={direction}
                initial={
                  reduce
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction * 40 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  reduce ? { opacity: 0 } : { opacity: 0, x: direction * -40 }
                }
                transition={{ duration: 0.5, ease: EASE }}
              >
                <blockquote className="max-w-3xl text-balance text-2xl font-medium leading-snug text-blue sm:text-[1.75rem]">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-brown/30">
                    <Image
                      src={active.image}
                      alt={active.alt}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">
                      {active.name}
                    </span>
                    <span className="block text-sm text-brown">
                      {active.role}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="mt-10 flex items-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-brown"
                    : "w-2.5 bg-blue/20 hover:bg-blue/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
