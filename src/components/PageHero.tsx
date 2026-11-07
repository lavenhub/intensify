import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type Crumb = { label: string; to?: string };

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  image?: string;
  crumbs?: Crumb[];
};

export function PageHero({ eyebrow, title, intro, image, crumbs }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40"
            aria-hidden
          />
        </>
      )}
      {/* accent bar */}
      <div className="absolute inset-x-0 top-0 h-[76px] bg-ink/40" aria-hidden />
      <div className="absolute bottom-0 left-0 h-1.5 w-40 bg-yellow" aria-hidden />

      <div className="container-px relative pb-20 pt-36 lg:pb-28 lg:pt-44">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/50">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  {c.to ? (
                    <Link to={c.to} className="transition-colors hover:text-yellow">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white/80">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && (
                    <ChevronRight className="h-3 w-3" aria-hidden />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <motion.span
          className="eyebrow text-yellow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="h-2 w-2 bg-yellow" aria-hidden />
          {eyebrow}
        </motion.span>

        <motion.h1
          className="mt-5 max-w-4xl text-5xl leading-[0.95] sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        >
          {title}
        </motion.h1>

        {intro && (
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  );
}
