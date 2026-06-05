"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const promises = [
  "One dedicated broker, start to close",
  "Pricing built on local data, not guesswork",
  "Off-market access through our network",
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-white py-24 md:py-32">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Image column with overlapping accent card */}
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-card-hover">
            <Image
              src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80"
              alt="Interior designer reviewing plans in a bright, calm studio"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Floating brown accent card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="absolute -bottom-8 -left-4 max-w-[15rem] rounded-2xl bg-brown p-6 text-white shadow-float sm:-left-8"
          >
            <p className="text-4xl font-bold leading-none tracking-tight">
              4.9<span className="text-brown-taupe">/5</span>
            </p>
            <p className="mt-2 text-sm leading-snug text-white/85">
              Average client rating across 600+ closed sales.
            </p>
          </motion.div>
        </Reveal>

        {/* Copy column */}
        <Reveal stagger className="lg:pl-4">
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            className="text-h2 font-bold text-blue"
          >
            A small team that
            <br className="hidden sm:block" /> takes the whole brief.
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            className="mt-6 max-w-prose text-base leading-relaxed text-ink/70"
          >
            ESTATE has spent fifteen years matching people to the right address.
            We keep the roster small on purpose: fewer clients, deeper attention,
            and a broker who actually remembers what you said you wanted. The
            result is a calmer move and a sharper deal.
          </motion.p>

          <motion.ul
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            className="mt-8 space-y-3.5"
          >
            {promises.map((promise) => (
              <li key={promise} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-blue/10 text-blue">
                  <Check size={15} strokeWidth={2.5} />
                </span>
                <span className="text-[0.95rem] text-ink/80">{promise}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            className="mt-10"
          >
            <Button href="#agents" variant="secondary" size="lg">
              Meet the team
            </Button>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
