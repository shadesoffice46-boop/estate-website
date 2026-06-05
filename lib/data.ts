/**
 * Sample content for the ESTATE landing page.
 * All UI maps over these typed arrays — nothing is hardcoded per-card.
 */

export type Property = {
  id: string;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: "House" | "Apartment" | "Villa" | "Penthouse";
  status: "For Sale" | "For Rent" | "New";
  image: string;
  alt: string;
};

export type Agent = {
  id: string;
  name: string;
  title: string;
  image: string;
  alt: string;
  email: string;
  phone: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  image: string;
  alt: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: "buy" | "sell" | "rent" | "invest";
};

export type Stat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
};

/* ---------------------------------------------------------------- Properties */

export const properties: Property[] = [
  {
    id: "p1",
    title: "Hillcrest Modern Villa",
    address: "412 Vista Ridge, Bel Air, CA",
    price: 4250000,
    beds: 5,
    baths: 4,
    sqft: 4800,
    type: "Villa",
    status: "New",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
    alt: "Modern hillside villa with floor-to-ceiling glass at dusk",
  },
  {
    id: "p2",
    title: "Harborview Penthouse",
    address: "88 Marina Blvd, San Francisco, CA",
    price: 3120000,
    beds: 3,
    baths: 3,
    sqft: 2600,
    type: "Penthouse",
    status: "For Sale",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    alt: "Bright contemporary penthouse interior with open living space",
  },
  {
    id: "p3",
    title: "The Aspen Residence",
    address: "27 Birch Lane, Aspen, CO",
    price: 2870000,
    beds: 4,
    baths: 3,
    sqft: 3400,
    type: "House",
    status: "For Sale",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    alt: "Warm modern house exterior with manicured front lawn",
  },
  {
    id: "p4",
    title: "Cedar & Stone Estate",
    address: "5 Greenfield Way, Austin, TX",
    price: 1950000,
    beds: 4,
    baths: 4,
    sqft: 3900,
    type: "House",
    status: "New",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80",
    alt: "Stone and cedar estate home with large windows",
  },
  {
    id: "p5",
    title: "Skyline Loft 21B",
    address: "210 Dearborn St, Chicago, IL",
    price: 8900,
    beds: 2,
    baths: 2,
    sqft: 1750,
    type: "Apartment",
    status: "For Rent",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
    alt: "Sunlit city loft with neutral furnishings and tall windows",
  },
  {
    id: "p6",
    title: "Coastal Glass House",
    address: "19 Shoreline Dr, Malibu, CA",
    price: 6480000,
    beds: 6,
    baths: 5,
    sqft: 5600,
    type: "Villa",
    status: "For Sale",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    alt: "Oceanfront glass house with pool overlooking the water",
  },
];

/* ------------------------------------------------------------------- Agents */

export const agents: Agent[] = [
  {
    id: "a1",
    name: "Eleanor Whitfield",
    title: "Principal Broker",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
    alt: "Portrait of Eleanor Whitfield, principal broker",
    email: "eleanor@estate.com",
    phone: "+1 (310) 555-0118",
  },
  {
    id: "a2",
    name: "Marcus Lindqvist",
    title: "Luxury Specialist",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
    alt: "Portrait of Marcus Lindqvist, luxury property specialist",
    email: "marcus@estate.com",
    phone: "+1 (310) 555-0142",
  },
  {
    id: "a3",
    name: "Priya Raman",
    title: "Investment Advisor",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80",
    alt: "Portrait of Priya Raman, investment advisor",
    email: "priya@estate.com",
    phone: "+1 (310) 555-0173",
  },
];

/* -------------------------------------------------------------- Testimonials */

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "They understood the brief in one conversation and brought us three homes that all fit. We closed on the second in under a month.",
    name: "Daniel & Sara Cole",
    role: "Bought in Bel Air",
    image:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=300&q=80",
    alt: "Portrait of Daniel and Sara Cole",
  },
  {
    id: "t2",
    quote:
      "Selling felt effortless. The staging advice alone added six figures to our final number, and the listing photos were genuinely beautiful.",
    name: "Rebecca Tan",
    role: "Sold in San Francisco",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    alt: "Portrait of Rebecca Tan",
  },
  {
    id: "t3",
    quote:
      "As a first-time investor I had a hundred questions. Priya answered every one and steered me toward a property that's already cash-flow positive.",
    name: "James Okoro",
    role: "Invested in Austin",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    alt: "Portrait of James Okoro",
  },
];

/* ----------------------------------------------------------------- Services */

export const services: Service[] = [
  {
    id: "s1",
    title: "Buying",
    description:
      "Hand-picked listings, private viewings, and negotiation that protects your number from offer to keys.",
    icon: "buy",
  },
  {
    id: "s2",
    title: "Selling",
    description:
      "Staging, photography, and a pricing strategy built on local data so your home moves at its true value.",
    icon: "sell",
  },
  {
    id: "s3",
    title: "Renting",
    description:
      "Vetted tenants, transparent leases, and end-to-end management that keeps your property earning.",
    icon: "rent",
  },
  {
    id: "s4",
    title: "Investment",
    description:
      "Yield analysis and portfolio guidance grounded in real numbers, not optimism, for long-term growth.",
    icon: "invest",
  },
];

/* -------------------------------------------------------------------- Stats */

export const stats: Stat[] = [
  { id: "st1", value: 1200, suffix: "+", label: "Properties Sold" },
  { id: "st2", value: 15, suffix: "", label: "Years of Experience" },
  { id: "st3", value: 98, suffix: "%", label: "Client Satisfaction" },
  { id: "st4", value: 2.4, suffix: "B", label: "In Closed Sales" },
];

/* ------------------------------------------------------------ Filter options */

export const locations = [
  "Los Angeles, CA",
  "San Francisco, CA",
  "Austin, TX",
  "Aspen, CO",
  "Chicago, IL",
  "Malibu, CA",
];

export const propertyTypes = [
  "House",
  "Apartment",
  "Villa",
  "Penthouse",
];

export const priceRanges = [
  "Up to $1M",
  "$1M – $3M",
  "$3M – $5M",
  "$5M+",
];

/* ----------------------------------------------------------------- Helpers */

export function formatPrice(property: Property): string {
  if (property.status === "For Rent") {
    return `$${property.price.toLocaleString("en-US")}/mo`;
  }
  return `$${property.price.toLocaleString("en-US")}`;
}
