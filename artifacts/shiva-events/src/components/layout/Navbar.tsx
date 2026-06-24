import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
const logoImg = "/logo.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/cities", label: "Cities" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
      }`}
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

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`text-sm tracking-wider uppercase cursor-pointer transition-colors duration-200 hover:text-primary ${
                  location === link.href ? "text-primary" : "text-foreground/70"
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <Link href="/contact">
            <span className="ml-2 px-5 py-2 border border-primary text-primary text-sm tracking-wider uppercase cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              Enquire Now
            </span>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/98 backdrop-blur-lg border-b border-border"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="text-foreground/80 text-sm tracking-widest uppercase cursor-pointer hover:text-primary transition-colors">
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/contact">
                <span className="mt-2 inline-block px-5 py-2.5 border border-primary text-primary text-sm tracking-wider uppercase cursor-pointer text-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  Enquire Now
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
