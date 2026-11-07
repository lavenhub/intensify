import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to top on route change (ignores in-page hash links). */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);
  return null;
}
