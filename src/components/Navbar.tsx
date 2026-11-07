import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { useScrolled } from "@/hooks/useScrolled";
import { primaryNav } from "@/data/site";
import { productCategories } from "@/data/products";
import { industries } from "@/data/industries";

export function Navbar() {
  const scrolled = useScrolled(20);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-premium ${
        solid
          ? "border-b border-light-grey bg-white/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-px flex h-[76px] items-center justify-between">
        {/* Logo */}
        <Link to="/" aria-label="Intensify Technologies — home" className="relative z-50">
          <span className="inline-flex items-center bg-white px-2.5 py-1.5 shadow-sm">
            <Logo height={34} />
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const hasMenu =
              item.label === "Products" || item.label === "Industries";
            return (
              <li key={item.to} className="group relative">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold tracking-wide transition-colors ${
                      solid ? "text-ink/80 hover:text-ink" : "text-white/90 hover:text-white"
                    } ${isActive ? (solid ? "text-ink" : "text-white") : ""}`
                  }
                >
                  {item.label}
                  {hasMenu && (
                    <ChevronDown
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180"
                      aria-hidden
                    />
                  )}
                </NavLink>

                {/* Active underline */}
                <span
                  className={`pointer-events-none absolute -bottom-0.5 left-4 right-4 h-0.5 origin-left scale-x-0 bg-yellow transition-transform duration-300 ease-premium group-hover:scale-x-100`}
                  aria-hidden
                />

                {hasMenu && (
                  <div className="invisible absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 ease-premium group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="border border-light-grey bg-white p-6 shadow-card-hover">
                      {item.label === "Products" ? (
                        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                          {productCategories.map((cat) => (
                            <div key={cat.slug}>
                              <p className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted">
                                {cat.title}
                              </p>
                              <ul className="space-y-1">
                                {cat.products.map((p) => (
                                  <li key={p.slug}>
                                    <Link
                                      to={`/products/${p.slug}`}
                                      className="block py-0.5 text-sm font-medium text-ink/80 transition-colors hover:text-ink"
                                    >
                                      {p.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                          {industries.map((ind) => (
                            <Link
                              key={ind.slug}
                              to={`/industries/${ind.slug}`}
                              className="flex items-center gap-2 py-1 text-sm font-medium text-ink/80 transition-colors hover:text-ink"
                            >
                              <span className="h-1.5 w-1.5 shrink-0 bg-yellow" aria-hidden />
                              {ind.name}
                            </Link>
                          ))}
                        </div>
                      )}
                      <Link
                        to={item.to}
                        className="mt-5 inline-flex items-center gap-1.5 border-t border-light-grey pt-4 text-sm font-bold text-ink link-underline"
                      >
                        View all {item.label.toLowerCase()}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            );
          })}

          <li className="ml-3">
            <Link to="/contact" className="btn-dark group text-xs">
              Get a Quote
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`relative z-50 inline-flex h-11 w-11 items-center justify-center lg:hidden ${
            solid ? "text-ink" : "text-white"
          }`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 z-40 h-[100dvh] bg-ink px-6 pb-10 pt-28 lg:hidden"
          >
            <ul className="flex flex-col divide-y divide-white/10">
              {primaryNav.map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.05 }}
                >
                  <Link
                    to={item.to}
                    className="flex items-center justify-between py-5 font-display text-3xl font-bold tracking-tightest text-white"
                  >
                    {item.label}
                    <ArrowRight className="h-5 w-5 text-yellow" aria-hidden />
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Link to="/contact" className="btn-primary mt-8 w-full">
              Get a Quote
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
