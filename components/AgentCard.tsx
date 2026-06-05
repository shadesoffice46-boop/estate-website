"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Instagram } from "lucide-react";
import { staggerItem } from "@/lib/motion";
import type { Agent } from "@/lib/data";

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <motion.article
      variants={staggerItem}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={agent.image}
          alt={agent.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out-quart group-hover:scale-105"
        />
        {/* Gradient base for legible overlay content */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-blue/90 via-blue/30 to-transparent"
        />

        {/* Social icons slide up on hover */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="flex translate-y-2 items-center gap-2.5 opacity-0 transition-all duration-400 ease-out-quart group-hover:translate-y-0 group-hover:opacity-100">
            <a
              href={`mailto:${agent.email}`}
              aria-label={`Email ${agent.name}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-brown"
            >
              <Mail size={17} />
            </a>
            <a
              href={`tel:${agent.phone.replace(/[^\d+]/g, "")}`}
              aria-label={`Call ${agent.name}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-brown"
            >
              <Phone size={17} />
            </a>
            <a
              href="#contact"
              aria-label={`${agent.name} on LinkedIn`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-brown"
            >
              <Linkedin size={17} />
            </a>
            <a
              href="#contact"
              aria-label={`${agent.name} on Instagram`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-brown"
            >
              <Instagram size={17} />
            </a>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-blue">{agent.name}</h3>
        <p className="mt-1 text-sm font-medium text-brown">{agent.title}</p>
      </div>
    </motion.article>
  );
}
