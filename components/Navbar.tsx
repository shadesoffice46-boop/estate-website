"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const links = [
  { label: "Home", href: "#home" },
  { label: "Properties", href: "#properties" },
  { label: "About", href: "#about" },
  { label: "Agents", href: "#agents" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-nav transition-all duration-500 ease-out-quart ${
        solid
          ? "border-b border-blue/10 bg-white/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="container-page flex h-[72px] items-center justify-between"
      >
        {/* Text logo */}
        <Link
          href="#home"
          onClick={() => setOpen(false)}
          className={`text-2xl font-bold tracking-tightest transition-colors duration-300 ${
            solid ? "text-blue" : "text-white"
          }`}
        >
          ESTATE
          <span className="text-brown">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`group relative text-sm font-medium transition-colors duration-300 ${
                  solid
                    ? "text-ink/80 hover:text-blue"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px w-0 transition-all duration-300 ease-out-quart group-hover:w-full ${
                    solid ? "bg-brown" : "bg-white"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button href="#contact" variant="secondary" size="md">
            Book a Viewing
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`-mr-1 inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors md:hidden ${
            solid ? "text-blue hover:bg-blue/5" : "text-white hover:bg-white/10"
          }`}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-blue/10 bg-white md:hidden ${
          open ? "max-h-[420px]" : "max-h-0"
        } transition-[max-height] duration-500 ease-out-quart`}
      >
        <ul className="container-page flex flex-col gap-1 py-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-base font-medium text-ink/80 transition-colors hover:bg-cream hover:text-blue"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="px-1 pb-2 pt-3">
            <Button
              href="#contact"
              variant="secondary"
              size="lg"
              className="w-full"
            >
              Book a Viewing
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
