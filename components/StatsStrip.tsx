"use client";

import { motion } from "framer-motion";
import { Counter } from "@/components/Counter";
import { staggerContainer, staggerItem, inView } from "@/lib/motion";
import { stats } from "@/lib/data";

export function StatsStrip() {
  return (
    <section className="grain bg-blue py-20 md:py-24">
      <div className="container-page">
        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4"
        >
          {stats.map((stat) => {
            const decimals = stat.id === "st4" ? 1 : 0;
            const prefix = stat.id === "st4" ? "$" : "";
            return (
              <motion.div
                key={stat.id}
                variants={staggerItem}
                className="relative text-center lg:text-left"
              >
                <dd className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none tracking-tightest text-white">
                  {prefix}
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={decimals}
                  />
                </dd>
                <dt className="mt-3 text-sm font-medium text-brown-taupe">
                  {stat.label}
                </dt>
                {/* Brown accent underscore */}
                <span className="mx-auto mt-4 block h-0.5 w-10 rounded-full bg-brown lg:mx-0" />
              </motion.div>
            );
          })}
        </motion.dl>
      </div>
    </section>
  );
}
