"use client";

import { ChevronDown, MapPin, Home, Wallet, Search } from "lucide-react";
import { motion } from "framer-motion";
import { locations, propertyTypes, priceRanges } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

type FieldProps = {
  id: string;
  label: string;
  icon: React.ReactNode;
  options: string[];
  placeholder: string;
};

function SelectField({ id, label, icon, options, placeholder }: FieldProps) {
  return (
    <div className="flex flex-1 items-center gap-3 px-5 py-4">
      <span className="text-brown" aria-hidden>
        {icon}
      </span>
      <span className="flex-1">
        <label
          htmlFor={id}
          className="block text-[0.7rem] font-semibold uppercase tracking-wider text-ink/50"
        >
          {label}
        </label>
        <span className="relative block">
          <select
            id={id}
            defaultValue=""
            className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-[0.95rem] font-medium text-blue outline-none"
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            aria-hidden
            className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-ink/40"
          />
        </span>
      </span>
    </div>
  );
}

export function SearchBar() {
  return (
    <div className="container-page relative z-overlay -mt-16 md:-mt-14">
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE }}
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-blue/10 shadow-float md:grid-cols-[1fr_1fr_1fr_auto]"
        aria-label="Search properties"
      >
        <div className="bg-white">
          <SelectField
            id="search-location"
            label="Location"
            icon={<MapPin size={20} />}
            options={locations}
            placeholder="Any location"
          />
        </div>
        <div className="bg-white">
          <SelectField
            id="search-type"
            label="Property Type"
            icon={<Home size={20} />}
            options={propertyTypes}
            placeholder="Any type"
          />
        </div>
        <div className="bg-white">
          <SelectField
            id="search-price"
            label="Price Range"
            icon={<Wallet size={20} />}
            options={priceRanges}
            placeholder="Any price"
          />
        </div>
        <div className="flex bg-white p-3">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue px-7 py-4 text-sm font-semibold text-white transition-all duration-300 ease-out-quart hover:bg-blue-accent hover:shadow-card-hover md:w-auto"
          >
            <Search size={18} />
            Search
          </button>
        </div>
      </motion.form>
    </div>
  );
}
