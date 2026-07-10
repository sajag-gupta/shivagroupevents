import { useEffect } from "react";
import { useLocation } from "wouter";

/** Scrolls to top of page on every route change */
export function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}
