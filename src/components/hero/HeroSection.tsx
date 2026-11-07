import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Move3d } from "lucide-react";
import { MachineFallback } from "./MachineFallback";
import { useMachineInteraction } from "@/hooks/useMachineInteraction";
import { isWebGLAvailable } from "@/utils/webgl";
import factoryBg from "@/assets/automotive.jpg";

const sceneLoader = () => import("./MachineScene");
const MachineScene = lazy(sceneLoader);

/** Transparent loading placeholder — no image, so there is no "flash" of a
 *  static poster before the live 3D scene appears. */
function MachineLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center" aria-hidden>
      <span className="h-2.5 w-2.5 animate-ping rounded-full bg-yellow/40" />
    </div>
  );
}

export function HeroSection() {
  const profile = useMachineInteraction();
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState(true);

  // Warm the 3D chunk immediately (parallel with first paint) and mount the
  // scene on the next frame so the hero text paints without being blocked.
  useEffect(() => {
    setWebgl(isWebGLAvailable());
    sceneLoader(); // preload the lazy chunk right away
    const id = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const show3D = mounted && webgl;

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col justify-start overflow-hidden bg-ink pt-24 text-white lg:justify-center lg:pt-0"
    >
      {/* ---- Shared hero environment (visible through the transparent canvas) ---- */}
      <img
        src={factoryBg}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-[0.1] blur-[6px]"
      />
      <div className="absolute inset-0 -z-20 bg-ink/85" aria-hidden />
      {/* floor-fade gradient so the machine melts into the page at the bottom */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-ink to-transparent"
        aria-hidden
      />
      {/* ambient glow behind the machine */}
      <div
        className="pointer-events-none absolute right-[-5%] top-1/2 -z-10 hidden h-[90vh] w-[60vw] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,208,0,0.12),rgba(255,208,0,0.03)_45%,transparent_70%)] blur-2xl lg:block"
        aria-hidden
      />

      {/* ---- 3D machine turntable: centred in the right half on desktop ---- */}
      <div className="relative order-2 h-[46vh] min-h-[320px] w-full lg:absolute lg:inset-y-0 lg:right-[7%] lg:order-none lg:h-full lg:w-[52%] 2xl:right-[5%]">
        {!webgl ? (
          // Permanent fallback only when WebGL is unavailable.
          <MachineFallback />
        ) : show3D ? (
          <Suspense fallback={<MachineLoading />}>
            <MachineScene profile={profile} />
          </Suspense>
        ) : (
          <MachineLoading />
        )}

        {show3D && (
          <motion.div
            className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-wider text-white/40 lg:left-auto lg:right-10 lg:translate-x-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <Move3d className="h-3.5 w-3.5" aria-hidden />
            Drag to rotate · tap points to explore
          </motion.div>
        )}
      </div>

      {/* ---- Hero copy (left) ---- */}
      <div className="container-px pointer-events-none relative z-10 order-1 lg:order-none">
        <div className="max-w-xl">
          <motion.span
            className="eyebrow text-yellow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="h-2 w-2 bg-yellow" aria-hidden />
            Engineering the Future
          </motion.span>

          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.92] tracking-tightest sm:text-6xl lg:text-7xl xl:text-[5.2rem]">
            <motion.span
              className="block drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            >
              Engineering Precision.
            </motion.span>
            <motion.span
              className="block text-yellow drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              Enabling Progress.
            </motion.span>
          </h1>

          <motion.p
            className="mt-7 max-w-lg text-lg leading-relaxed text-white/75 [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42 }}
          >
            Intensify Technologies delivers advanced industrial cleaning, precision
            engineering, and intelligent manufacturing solutions designed to help
            industries achieve greater efficiency, reliability, and performance.
          </motion.p>

          <motion.div
            className="pointer-events-auto mt-9 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.54 }}
          >
            <Link to="/products" className="btn-primary group">
              Explore Our Solutions
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
            <Link to="/services" className="btn-ghost-light">
              Discover Our Capabilities
            </Link>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        className="pointer-events-none absolute bottom-6 left-6 z-10 text-white/40 lg:left-1/2 lg:-translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-5 w-5" aria-hidden />
        </motion.div>
      </motion.div>
    </section>
  );
}
