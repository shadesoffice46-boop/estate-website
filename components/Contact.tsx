import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ContactForm";

const details = [
  { icon: Phone, label: "Call", value: "+1 (310) 555-0100", href: "tel:+13105550100" },
  { icon: Mail, label: "Email", value: "hello@estate.com", href: "mailto:hello@estate.com" },
  { icon: MapPin, label: "Office", value: "240 Wilshire Blvd, Los Angeles, CA", href: undefined },
  { icon: Clock, label: "Hours", value: "Mon–Sat, 9am – 7pm", href: undefined },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 bg-cream py-24 md:py-32">
      <div className="container-page grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Left: intro + contact details */}
        <Reveal>
          <h2 className="text-h2 font-bold text-blue">
            Ask us anything
          </h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-ink/70">
            Send a question about any listing, the market, or your own move.
            A real person reads every message, and you&apos;ll get a clear
            answer back, fast.
          </p>

          <ul className="mt-10 space-y-6">
            {details.map((item) => (
              <li key={item.label} className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-blue/8 text-blue">
                  <item.icon size={19} aria-hidden />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-ink/45">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-0.5 block text-[0.95rem] font-medium text-ink transition-colors hover:text-brown"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="mt-0.5 block text-[0.95rem] font-medium text-ink">
                      {item.value}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Right: the form */}
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
