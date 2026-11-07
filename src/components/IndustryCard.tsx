import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Industry } from "@/data/industries";

export function IndustryCard({ industry, index = 0 }: { industry: Industry; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/industries/${industry.slug}`}
        className="group relative block overflow-hidden"
      >
        <img
          src={industry.image}
          alt={industry.name}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover grayscale transition-all duration-700 ease-premium group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent transition-opacity duration-300 group-hover:from-ink/95" />

        <span className="absolute left-4 top-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-yellow">
          {industry.sector}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="flex items-end justify-between gap-3">
            <h3 className="text-xl font-bold leading-tight text-white">{industry.name}</h3>
            <span className="flex h-9 w-9 shrink-0 translate-y-1 items-center justify-center bg-yellow text-ink opacity-0 transition-all duration-300 ease-premium group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight className="h-5 w-5" aria-hidden />
            </span>
          </div>
          <p className="mt-2 max-h-0 overflow-hidden text-sm text-white/70 opacity-0 transition-all duration-500 ease-premium group-hover:max-h-24 group-hover:opacity-100">
            {industry.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
