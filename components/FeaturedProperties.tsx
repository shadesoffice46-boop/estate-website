"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { Reveal } from "@/components/ui/Reveal";
import { staggerContainer, inView } from "@/lib/motion";
import { properties } from "@/lib/data";

export function FeaturedProperties() {
  return (
    <section id="properties" className="scroll-mt-24 py-24 md:py-32">
      <div className="container-page">
        {/* Header — heading and a quiet link, not an eyebrow-on-every-section */}
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-h2 font-bold text-blue">
              Featured properties
            </h2>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-ink/70">
              A short list, chosen by hand. Each home below is currently active
              with one of our brokers.
            </p>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-brown transition-colors hover:text-blue md:self-auto"
          >
            View all listings
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </Reveal>

        {/* Grid — staggered reveal */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
