import { motion } from "framer-motion";
import { services } from "@/data/services";

type Props = {
  /** Use the shorter blurb (home) vs full description (services page). */
  full?: boolean;
};

export function ServicesGrid({ full = false }: Props) {
  return (
    <div className="grid gap-px overflow-hidden border border-light-grey bg-light-grey sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.article
            key={s.slug}
            className="group relative bg-white p-8 transition-colors duration-300 hover:bg-offwhite"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* top accent */}
            <span
              className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-yellow transition-transform duration-300 ease-premium group-hover:scale-x-100"
              aria-hidden
            />
            <div className="flex items-center justify-between">
              <span className="inline-flex h-12 w-12 items-center justify-center bg-yellow text-ink transition-transform duration-300 ease-premium group-hover:-translate-y-1">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <span className="font-display text-sm font-bold text-light-grey transition-colors group-hover:text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-6 text-xl font-bold text-ink">{s.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {full ? s.description : s.short}
            </p>
          </motion.article>
        );
      })}
    </div>
  );
}
