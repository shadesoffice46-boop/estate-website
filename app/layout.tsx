import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Poppins everywhere — 700 carries the display headlines.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ESTATE — Distinctive Homes & Trusted Advice",
  description:
    "ESTATE is a boutique real estate agency pairing standout homes with negotiation that protects your number. Buy, sell, rent, and invest with confidence.",
  openGraph: {
    title: "ESTATE — Distinctive Homes & Trusted Advice",
    description:
      "Buy, sell, rent, and invest with a boutique agency that understands the brief in one conversation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="bg-cream text-ink font-sans antialiased">
        <a
          href="#properties"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-modal focus:rounded-full focus:bg-blue focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to properties
        </a>
        {children}
      </body>
    </html>
  );
}
