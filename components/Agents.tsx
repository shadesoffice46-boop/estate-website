"use client";

import { motion } from "framer-motion";
import { AgentCard } from "@/components/AgentCard";
import { Reveal } from "@/components/ui/Reveal";
import { staggerContainer, inView } from "@/lib/motion";
import { agents } from "@/lib/data";

export function Agents() {
  return (
    <section id="agents" className="scroll-mt-24 bg-white py-24 md:py-32">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <h2 className="text-h2 font-bold text-blue">The people you&apos;ll work with</h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-ink/70">
            Three specialists, one shared standard. You&apos;ll have a direct line
            to yours from the first viewing to the closing table.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
