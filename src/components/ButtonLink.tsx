import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "dark" | "outline" | "ghost-light";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  dark: "btn-dark",
  outline: "btn-outline",
  "ghost-light": "btn-ghost-light",
};

type ButtonLinkProps = {
  to: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
};

/** Internal router link styled as a button. */
export function ButtonLink({
  to,
  children,
  variant = "primary",
  arrow = false,
  className = "",
}: ButtonLinkProps) {
  return (
    <Link to={to} className={`group ${variantClass[variant]} ${className}`}>
      {children}
      {arrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
          aria-hidden
        />
      )}
    </Link>
  );
}
