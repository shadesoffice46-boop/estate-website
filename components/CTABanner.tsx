"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function CTABanner() {
  return (
    <section className="py-24 md:py-28">
      <div className="container-page">
        <div className="grain relative overflow-hidden rounded-[2rem] bg-blue px-8 py-20 text-center sm:px-12 md:py-28">
          {/* Subtle architectural image, low opacity, blue-drenched */}
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover opacity-15"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-blue/70 to-blue/95"
          />

          <Reveal className="relative mx-auto max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-brown-taupe">
              Ready when you are
            </p>
            <h2 className="text-balance text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tightest text-white">
              Let&apos;s find the address that fits.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Book a viewing or a fifteen-minute call. No pressure, no script,
              just a straight read on what&apos;s possible.
            </p>
            <div className="mt-10">
              <Button href="#contact" variant="secondary" size="lg">
                Book a Viewing
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
