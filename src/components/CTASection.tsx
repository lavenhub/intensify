import { Reveal } from "./Reveal";
import { ButtonLink } from "./ButtonLink";

type CTASectionProps = {
  heading?: string;
  text?: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
  variant?: "yellow" | "dark";
};

export function CTASection({
  heading = "Ready to Elevate Your Production?",
  text = "Partner with Intensify Technologies for precision-engineered solutions designed around your manufacturing challenges.",
  primary = { label: "Request Consultation", to: "/contact" },
  secondary = { label: "Explore Our Solutions", to: "/products" },
  variant = "yellow",
}: CTASectionProps) {
  const isYellow = variant === "yellow";
  return (
    <section
      className={`relative overflow-hidden ${
        isYellow ? "bg-yellow text-ink" : "bg-ink text-white"
      }`}
    >
      {/* subtle accent geometry */}
      <div
        className={`pointer-events-none absolute -right-24 -top-24 h-80 w-80 rotate-12 ${
          isYellow ? "bg-ink/5" : "bg-yellow/10"
        }`}
        aria-hidden
      />
      <div className="container-px relative py-20 text-center lg:py-28">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="text-4xl leading-[1] sm:text-5xl lg:text-6xl">{heading}</h2>
          <p
            className={`mx-auto mt-6 max-w-2xl text-lg ${
              isYellow ? "text-ink/75" : "text-white/70"
            }`}
          >
            {text}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink to={primary.to} variant={isYellow ? "dark" : "primary"} arrow>
              {primary.label}
            </ButtonLink>
            <ButtonLink
              to={secondary.to}
              variant={isYellow ? "outline" : "ghost-light"}
            >
              {secondary.label}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
