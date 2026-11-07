import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <Reveal
      className={`${isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow && (
        <span
          className={`eyebrow mb-5 ${
            tone === "dark" ? "text-yellow" : "text-ink"
          }`}
        >
          <span className="h-2 w-2 bg-yellow" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-4xl leading-[0.98] sm:text-5xl lg:text-[3.4rem] ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-6 text-lg leading-relaxed ${
            tone === "dark" ? "text-white/70" : "text-muted"
          } ${isCenter ? "mx-auto" : ""}`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
