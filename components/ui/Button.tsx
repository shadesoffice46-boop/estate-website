import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight " +
  "transition-all duration-300 ease-out-quart focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-blue-accent focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-cream disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Filled blue — the trust anchor, one primary action per view.
  primary:
    "bg-blue text-white shadow-card hover:bg-blue-accent hover:shadow-card-hover hover:-translate-y-0.5",
  // Filled brown — warm secondary CTA.
  secondary:
    "bg-brown text-white shadow-card hover:bg-[#7a5234] hover:shadow-card-hover hover:-translate-y-0.5",
  // Outline — sits over imagery, inverts on hover.
  outline:
    "border border-white/70 text-white hover:bg-white hover:text-blue backdrop-blur-[2px]",
  // Ghost — quiet tertiary action.
  ghost:
    "text-blue hover:bg-blue/5 hover:text-blue-accent",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[0.95rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children" | "href"> & {
    href: string;
  };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...rest
  } = props;

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    const { href, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {children}
    </button>
  );
}
