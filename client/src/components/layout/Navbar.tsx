import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useExperience } from "@/context/ExperienceContext";

const logoImg = "/logo.png";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/cities", label: "Cities" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { cinematicScrollActive } = useExperience();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLinkActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  const isDarkThemePage = location === "/" || location.startsWith("/services");

  // Determine if text color should be light (when overlaying dark background hero sections)
  const isHeaderDark = isDarkThemePage || cinematicScrollActive;

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? cinematicScrollActive
            ? "bg-transparent text-white"
            : isDarkThemePage
            ? "bg-black/85 backdrop-blur-md border-b border-white/10 shadow-lg text-white"
            : "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <span className="cursor-pointer flex items-center gap-2">
            <img
              src={logoImg}
              alt="Shiva Group Events"
              className="h-12 w-auto object-contain"
            />
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={cn(
                  "text-sm tracking-wider uppercase cursor-pointer transition-colors duration-200 font-medium px-3 py-2",
                  isHeaderDark
                    ? isLinkActive(link.href)
                      ? "text-primary"
                      : "text-white/80 hover:text-white"
                    : isLinkActive(link.href)
                    ? "text-primary"
                    : "text-foreground/75 hover:text-primary"
                )}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Right side: Action Button & Mobile Popover */}
        <div className="flex items-center gap-3">
          <Link href="/contact">
            <span
              className={cn(
                "hidden sm:inline-flex px-5 py-2.5 border text-sm tracking-wider uppercase cursor-pointer transition-all duration-300 font-medium",
                isHeaderDark
                  ? "border-white/30 text-white hover:border-primary hover:text-primary"
                  : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              )}
            >
              Enquire Now
            </span>
          </Link>

          {/* Mobile Popover menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className={cn(
                  "group size-10 md:hidden flex items-center justify-center p-0 hover:bg-transparent",
                  isHeaderDark ? "text-white" : "text-foreground"
                )}
                variant="ghost"
                size="icon"
                aria-label="Toggle menu"
              >
                <svg
                  className="pointer-events-none"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-56 p-2 md:hidden bg-background border border-border shadow-xl rounded-md z-[100] mt-2"
            >
              <ul className="flex flex-col gap-1 w-full">
                {navigationLinks.map((link, index) => (
                  <li key={index} className="w-full">
                    <Link href={link.href}>
                      <span
                        className={cn(
                          "block py-2.5 px-3 text-sm font-semibold tracking-wider uppercase rounded-sm transition-colors cursor-pointer",
                          isLinkActive(link.href)
                            ? "text-primary font-bold bg-primary/5"
                            : "text-foreground/80 hover:text-primary hover:bg-muted/50"
                        )}
                      >
                        {link.label}
                      </span>
                    </Link>
                    {/* Add divider line */}
                    {index < navigationLinks.length - 1 && (
                      <div
                        role="separator"
                        aria-orientation="horizontal"
                        className="bg-border/60 my-1 h-px w-full"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </motion.header>
  );
}
