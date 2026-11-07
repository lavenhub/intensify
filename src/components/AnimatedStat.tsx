import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type AnimatedStatProps = {
  value: number;
  suffix?: string;
  label: string;
  unverified?: boolean;
};

export function AnimatedStat({ value, suffix = "", label, unverified }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);
  const isFloat = !Number.isInteger(value);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value]);

  const shown = isFloat ? display.toFixed(1) : Math.round(display).toString();

  return (
    <div ref={ref} className="text-center sm:text-left">
      <div className="font-display text-5xl font-extrabold tracking-tightest text-yellow sm:text-6xl">
        {shown}
        <span>{suffix}</span>
      </div>
      <div className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
        {label}
        {unverified && <span className="ml-1 align-super text-yellow/80">*</span>}
      </div>
    </div>
  );
}
