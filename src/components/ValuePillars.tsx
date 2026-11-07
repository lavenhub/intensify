import { Target, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

export const pillars = [
  {
    icon: Target,
    title: "Precision First",
    text: "We believe tolerance is not just a number, but a promise of quality. Every micron counts.",
  },
  {
    icon: Users,
    title: "Human-Centric Innovation",
    text: "Technology designed to augment human capability — maximising safety and productivity.",
  },
  {
    icon: Award,
    title: "Global Excellence",
    text: "Standards engineered to meet rigorous international benchmarks for quality, safety, and sustainability.",
  },
];

type Props = {
  tone?: "light" | "dark";
  layout?: "row" | "stack";
};

export function ValuePillars({ tone = "light", layout = "row" }: Props) {
  const dark = tone === "dark";
  return (
    <div
      className={
        layout === "row"
          ? "grid gap-px overflow-hidden border bg-light-grey sm:grid-cols-3 " +
            (dark ? "border-white/10 bg-white/10" : "border-light-grey")
          : "space-y-10"
      }
    >
      {pillars.map((p, i) => {
        const Icon = p.icon;
        if (layout === "stack") {
          return (
            <motion.div
              key={p.title}
              className="flex gap-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span
                className={`inline-flex h-12 w-12 shrink-0 items-center justify-center ${
                  i === 0 ? "bg-yellow text-ink" : dark ? "bg-white/10 text-white" : "border-2 border-ink text-ink"
                }`}
              >
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <h3 className={`text-xl font-bold ${dark ? "text-white" : "text-ink"}`}>
                  {p.title}
                </h3>
                <p className={`mt-2 ${dark ? "text-white/60" : "text-muted"}`}>{p.text}</p>
              </div>
            </motion.div>
          );
        }
        return (
          <motion.div
            key={p.title}
            className={`p-8 lg:p-10 ${dark ? "bg-navy" : "bg-white"}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className={`inline-flex h-14 w-14 items-center justify-center ${
                dark ? "bg-yellow text-ink" : "bg-ink text-yellow"
              }`}
            >
              <Icon className="h-7 w-7" aria-hidden />
            </span>
            <h3 className={`mt-6 text-2xl ${dark ? "text-white" : "text-ink"}`}>{p.title}</h3>
            <p className={`mt-3 leading-relaxed ${dark ? "text-white/60" : "text-muted"}`}>
              {p.text}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
