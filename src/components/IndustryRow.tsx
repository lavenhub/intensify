import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Industry } from "@/data/industries";

type Props = {
  industry: Industry;
  index: number;
};

export function IndustryRow({ industry, index }: Props) {
  const flip = index % 2 === 1;
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      {/* Image */}
      <motion.div
        className={`relative ${flip ? "lg:order-2" : ""}`}
        initial={{ opacity: 0, x: flip ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="group relative overflow-hidden border-2 border-ink shadow-offset-sm">
          <img
            src={industry.image}
            alt={industry.name}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover grayscale transition-all duration-700 ease-premium group-hover:scale-105 group-hover:grayscale-0"
          />
          <span className="absolute left-0 top-0 bg-ink px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-yellow">
            Sector {industry.sector}
          </span>
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        className={flip ? "lg:order-1" : ""}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <h3 className="text-3xl leading-[1] sm:text-4xl">{industry.name}</h3>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
          {industry.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {industry.metrics.map((m) => (
            <span
              key={m}
              className="border-2 border-ink px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink"
            >
              {m}
            </span>
          ))}
        </div>

        <Link
          to={`/industries/${industry.slug}`}
          className="group mt-7 inline-flex items-center gap-2 bg-ink px-5 py-3 text-xs font-bold uppercase tracking-wider text-yellow transition-colors hover:bg-yellow hover:text-ink"
        >
          Explore {industry.name.replace(" Industry", "")}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </motion.div>
    </div>
  );
}
