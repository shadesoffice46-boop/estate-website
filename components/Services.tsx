"use client";

import { motion } from "framer-motion";
import { KeyRound, Tag, Building2, TrendingUp, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { staggerContainer, staggerItem, inView } from "@/lib/motion";
import { services, type Service } from "@/lib/data";

const icons: Record<Service["icon"], typeof KeyRound> = {
  buy: KeyRound,
  sell: Tag,
  rent: Building2,
  invest: TrendingUp,
};

export function Services() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <h2 className="text-h2 font-bold text-blue">
            Whatever the move, we run it end to end.
          </h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-ink/70">
            Four ways we work with you, each handled by a specialist rather than
            a generalist juggling fifty files.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-blue/10 bg-blue/10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <motion.article
                key={service.id}
                variants={staggerItem}
                className="group relative flex flex-col bg-white p-8 transition-colors duration-500 ease-out-quart hover:bg-blue"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue/8 text-blue transition-colors duration-500 group-hover:bg-white/15 group-hover:text-white">
                    <Icon size={22} />
                  </span>
                  <span className="text-sm font-semibold text-brown-taupe/80 transition-colors duration-500 group-hover:text-white/50">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="mt-6 text-h3 font-bold text-blue transition-colors duration-500 group-hover:text-white">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65 transition-colors duration-500 group-hover:text-white/80">
                  {service.description}
                </p>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brown transition-colors duration-500 group-hover:text-white">
                  Learn more
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
