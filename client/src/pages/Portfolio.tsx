import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useListPortfolio } from "@/lib/api";
import Weddings from "@/pages/Weddings";
import CorporateEvents from "@/pages/CorporateEvents";
import AwardCeremonies from "@/pages/AwardCeremonies";
import CelebrityShows from "@/pages/CelebrityShows";
import Concerts from "@/pages/Concerts";
import BrandActivations from "@/pages/BrandActivations";
import PrivateEvents from "@/pages/PrivateEvents";
import CollegeFestivals from "@/pages/CollegeFestivals";

/* All portfolio categories */
const categories = [
  { key: "", label: "All" },
  { key: "luxury-weddings", label: "Luxury Weddings" },
  { key: "corporate-events", label: "Corporate Events" },
  { key: "award-ceremonies", label: "Award Ceremonies" },
  { key: "celebrity-shows", label: "Celebrity Shows" },
  { key: "concerts", label: "Concerts" },
  { key: "brand-activations", label: "Brand Activations" },
  { key: "private-events", label: "Private Events" },
  { key: "college-festivals", label: "College Festivals" },
];

/* Map category keys to their dedicated page components */
const CATEGORY_PAGES: Record<string, React.ComponentType> = {
  "luxury-weddings": Weddings,
  "corporate-events": CorporateEvents,
  "award-ceremonies": AwardCeremonies,
  "celebrity-shows": CelebrityShows,
  "concerts": Concerts,
  "brand-activations": BrandActivations,
  "private-events": PrivateEvents,
  "college-festivals": CollegeFestivals,
};

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("");
  const hasDedicatedPage = activeCategory && activeCategory in CATEGORY_PAGES;

  /* Only hit the API when showing the generic "All" grid */
  const { data, isLoading } = useListPortfolio(
    !hasDedicatedPage && activeCategory ? { category: activeCategory } : undefined
  );
  const items = data?.items ?? [];

  const DedicatedPage = hasDedicatedPage ? CATEGORY_PAGES[activeCategory] : null;

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header — only shown on "All" view */}
      {!hasDedicatedPage && (
        <section className="py-20 bg-foreground text-background text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">Our Portfolio</p>
            <h1 className="font-serif text-5xl md:text-6xl">Every Event, a Masterpiece</h1>
          </motion.div>
        </section>
      )}

      {/* Category tab bar — always sticky */}
      <div className="sticky top-20 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
          <div className="flex gap-0 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-4 text-xs tracking-widest uppercase transition-colors whitespace-nowrap ${
                  activeCategory === cat.key
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content area */}
      {DedicatedPage ? (
        /* Dedicated category page */
        <DedicatedPage />
      ) : (
        /* Generic "All" grid */
        <div className="max-w-7xl mx-auto px-6 py-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-muted animate-pulse" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              <p className="font-serif text-2xl mb-3">No events found</p>
              <p className="text-sm">Try another category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/portfolio/${item.slug}`}>
                    <div className="group relative overflow-hidden aspect-[4/5] cursor-pointer">
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-primary text-xs tracking-widest uppercase mb-1">{item.category.replace(/-/g, " ")}</p>
                        <h3 className="font-serif text-xl text-white mb-1">{item.title}</h3>
                        <p className="text-white/60 text-sm">{item.location}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
