"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";

const quickLinks = [
  { label: "Properties", href: "#properties" },
  { label: "About", href: "#about" },
  { label: "Our Agents", href: "#agents" },
  { label: "Services", href: "#about" },
];

const contact = [
  { icon: MapPin, text: "240 Wilshire Blvd, Los Angeles, CA 90025" },
  { icon: Phone, text: "+1 (310) 555-0100" },
  { icon: Mail, text: "hello@estate.com" },
];

const socials = [
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="grain bg-[#0f2747] text-white">
      <div className="container-page py-20 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          {/* Brand + tagline */}
          <div>
            <Link
              href="#home"
              className="text-3xl font-bold tracking-tightest text-white"
            >
              ESTATE<span className="text-brown">.</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
              A boutique agency matching distinctive homes with the people who
              were always meant to live in them.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#contact"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-brown hover:bg-brown hover:text-white"
                >
                  <s.icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brown-taupe">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brown-taupe">
              Contact
            </h3>
            <ul className="mt-5 space-y-4">
              {contact.map((item) => (
                <li
                  key={item.text}
                  className="flex items-start gap-3 text-sm text-white/70"
                >
                  <item.icon
                    size={17}
                    className="mt-0.5 flex-none text-brown"
                    aria-hidden
                  />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brown-taupe">
              New listings, first
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-white/65">
              Join the list for off-market homes before they go public.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSent(true);
              }}
              className="mt-5"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 pl-5 transition-colors focus-within:border-brown">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brown text-white transition-colors hover:bg-[#7a5234]"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
              {sent && (
                <p
                  role="status"
                  className="mt-3 text-sm text-brown-taupe"
                >
                  Thanks — you&apos;re on the list.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} ESTATE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
