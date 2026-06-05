"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Bed, Bath, Maximize, ArrowUpRight } from "lucide-react";
import { staggerItem } from "@/lib/motion";
import { formatPrice, type Property } from "@/lib/data";

const statusStyles: Record<Property["status"], string> = {
  New: "bg-brown text-white",
  "For Sale": "bg-blue text-white",
  "For Rent": "bg-white text-blue",
};

export function PropertyCard({ property }: { property: Property }) {
  const specs = [
    { icon: Bed, value: property.beds, label: "beds" },
    { icon: Bath, value: property.baths, label: "baths" },
    {
      icon: Maximize,
      value: property.sqft.toLocaleString("en-US"),
      label: "sqft",
    },
  ];

  return (
    <motion.article
      variants={staggerItem}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image}
          alt={property.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out-quart group-hover:scale-105"
        />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
            statusStyles[property.status]
          }`}
        >
          {property.status}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-black/30 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {property.type}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-2xl font-bold tracking-tight text-blue">
          {formatPrice(property)}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-ink">
          {property.title}
        </h3>
        <p className="mt-1 text-sm text-ink/60">{property.address}</p>

        {/* Specs */}
        <ul className="mt-5 flex items-center gap-5 border-t border-blue/10 pt-5 text-sm text-ink/70">
          {specs.map((spec) => (
            <li key={spec.label} className="flex items-center gap-1.5">
              <spec.icon size={17} className="text-brown" aria-hidden />
              <span className="font-medium text-ink">{spec.value}</span>
              <span className="text-ink/55">{spec.label}</span>
            </li>
          ))}
        </ul>

        {/* View link */}
        <a
          href="#contact"
          className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-blue transition-colors hover:text-brown"
          aria-label={`View ${property.title}`}
        >
          View details
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </motion.article>
  );
}
