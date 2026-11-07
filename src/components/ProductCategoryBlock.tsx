import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { ProductCategory } from "@/data/products";
import { Reveal } from "./Reveal";

type Props = {
  category: ProductCategory;
  /** Flip image to the right for alternating rhythm. */
  flip?: boolean;
  /** Hide the summary line below the media (e.g. when shown in a section header). */
  hideSummary?: boolean;
};

export function ProductCategoryBlock({ category, flip, hideSummary }: Props) {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Media / category card */}
      <Reveal
        className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}
      >
        <div className="lg:sticky lg:top-28">
          <div className="group relative overflow-hidden">
            <img
              src={category.image}
              alt={category.title}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover grayscale transition-all duration-700 ease-premium group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-yellow">
                Category {category.id}
              </span>
              <h3 className="mt-1 text-2xl text-white sm:text-3xl">{category.title}</h3>
            </div>
          </div>
          {!hideSummary && <p className="mt-5 text-muted">{category.summary}</p>}
        </div>
      </Reveal>

      {/* Product cards — responsive grid fills the wide column intelligently */}
      <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
        <ul className="grid content-start gap-4 sm:grid-cols-2">
          {category.products.map((p, i) => (
            <motion.li
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={`/products/${p.slug}`}
                className="group flex flex-col border border-light-grey bg-white p-6 transition-all duration-300 ease-premium hover:border-ink hover:shadow-card-hover lg:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-xs font-bold text-muted/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-light-grey text-ink transition-all duration-300 ease-premium group-hover:border-ink group-hover:bg-yellow">
                    <ArrowUpRight className="h-5 w-5" aria-hidden />
                  </span>
                </div>
                <h4 className="mt-4 text-xl font-bold text-ink sm:text-2xl">{p.name}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
