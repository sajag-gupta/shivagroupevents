import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useListServices } from "@/lib/api";

/* ─── SERVICE CATEGORIES ─────────────────────────────────────────────────────── */

const CATEGORIES = [
  {
    slug: "weddings",
    label: "Luxury Weddings",
    tagline: "Royal ceremonies crafted for eternity",
    accent: "#C9A227",
    icon: "💍",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    stat: "500+ Weddings",
    heroVideo: "/weddingpage.mp4",
  },
  {
    slug: "corporate",
    label: "Corporate Events",
    tagline: "Where business meets brilliance",
    accent: "#3B82F6",
    icon: "🏢",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80",
    stat: "300+ Events",
    heroVideo: "/corporate_events.mp4",
  },
  {
    slug: "celebrity-shows",
    label: "Celebrity & Live Shows",
    tagline: "Concerts & shows that electrify",
    accent: "#A855F7",
    icon: "🎤",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    stat: "200+ Shows",
    heroVideo: "/celebrity_show.mp4",
  },
  {
    slug: "award-ceremonies",
    label: "Award Ceremonies",
    tagline: "Recognition moments that inspire",
    accent: "#F59E0B",
    icon: "🏆",
    image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80",
    stat: "150+ Awards",
    heroVideo: "/awardspage.mp4",
  },
  {
    slug: "concerts",
    label: "Concerts",
    tagline: "Live music that moves every soul",
    accent: "#EF4444",
    icon: "🎸",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    stat: "100+ Concerts",
    heroVideo: "/concertspage.mp4",
  },
  {
    slug: "brand-activations",
    label: "Brand Activations",
    tagline: "Activations that amplify brands",
    accent: "#10B981",
    icon: "📣",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    stat: "250+ Brands",
    heroVideo: "/brand-activation.mp4",
  },
  {
    slug: "private-events",
    label: "Private Events",
    tagline: "Your private moment, perfected",
    accent: "#EC4899",
    icon: "🥂",
    image: "https://images.unsplash.com/photo-1524824267900-2b35b8f38c1b?w=800&q=80",
    stat: "400+ Celebrations",
    heroVideo: "/private_event.mp4",
  },
  {
    slug: "college-festivals",
    label: "College Festivals",
    tagline: "College fests that build legends",
    accent: "#F97316",
    icon: "🎓",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
    stat: "180+ Fests",
    heroVideo: "/College-Festivals.mp4",
  },
];

/* ─── ANIMATIONS ─────────────────────────────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

/* ─── COMPONENT ──────────────────────────────────────────────────────────────── */

export default function Services() {
  const { data: dbServices } = useListServices();

  const mergedCategories = CATEGORIES.map(cat => {
    const dbSvc = dbServices?.find(s => s.slug === cat.slug);
    if (!dbSvc) return cat;
    return {
      ...cat,
      label: dbSvc.title || cat.label,
      tagline: dbSvc.description || cat.tagline,
      image: dbSvc.heroImage || cat.image,
      icon: dbSvc.icon || cat.icon,
      heroVideo: dbSvc.heroVideo || cat.heroVideo,
    };
  });

  const extraServices = (dbServices ?? [])
    .filter(s => !CATEGORIES.some(cat => cat.slug === s.slug))
    .map(s => ({
      slug: s.slug,
      label: s.title,
      tagline: s.description,
      accent: "#C9A227",
      icon: s.icon || "✨",
      image: s.heroImage || "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
      stat: s.category || "Exclusive Setup",
      heroVideo: s.heroVideo || undefined,
    }));

  const allCategories = [...mergedCategories, ...extraServices];

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 text-center px-6 overflow-hidden">
        {/* Subtle radial glow */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-10 blur-[120px]"
          style={{ background: "radial-gradient(circle, #C9A227 0%, transparent 70%)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <p className="text-xs tracking-[0.5em] uppercase mb-5 font-sans" style={{ color: "#C9A227" }}>
            Shiva Group Events · What We Do
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-gray-900 leading-tight mb-6">
            Every Occasion,<br />
            <span style={{ color: "#C9A227" }}>Perfected</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-sans font-light leading-relaxed">
            From intimate gatherings to grand celebrations — we craft premium experiences
            across our specialist event categories.
          </p>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-10 md:gap-16 border-t border-gray-200/60 pt-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          {[
            { value: "15+", label: "Years of Excellence" },
            { value: "2000+", label: "Events Delivered" },
            { value: "50+", label: "Cities Covered" },
            { value: "500+", label: "Happy Clients" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-4xl md:text-5xl" style={{ color: "#C9A227" }}>{s.value}</p>
              <p className="text-gray-400 text-xs tracking-widest uppercase mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── CATEGORY CARDS GRID ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {allCategories.map((cat) => (
            <motion.div key={cat.slug} variants={cardVariants}>
              <Link href={`/services/${cat.slug}`}>
                <div className="group relative bg-white border border-gray-100 hover:border-[#C9A227]/40 shadow-sm hover:shadow-lg transition-all duration-500 rounded-sm overflow-hidden flex flex-col h-[400px] cursor-pointer">
                  {/* Image or Video container */}
                  <div className="relative overflow-hidden aspect-[16/10] w-full shrink-0 bg-gray-100">
                    {cat.heroVideo ? (
                      <video
                        src={cat.heroVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <img
                        src={cat.image}
                        alt={cat.label}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Stat badge */}
                      <p
                        className="text-[10px] tracking-[0.3em] uppercase mb-2 font-sans font-semibold"
                        style={{ color: cat.accent }}
                      >
                        {cat.stat}
                      </p>

                      <h3 className="font-serif text-xl text-gray-900 mb-2 leading-tight group-hover:text-[#C9A227] transition-colors">
                        {cat.label}
                      </h3>

                      <p className="text-gray-500 text-xs leading-relaxed font-sans group-hover:text-gray-600 transition-colors">
                        {cat.tagline}
                      </p>
                    </div>

                    {/* CTA arrow */}
                    <div className="flex items-center gap-1.5 mt-4 text-[11px] tracking-widest uppercase font-semibold font-sans">
                      <span style={{ color: cat.accent }}>
                        Explore
                      </span>
                      <ArrowRight
                        size={12}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        style={{ color: cat.accent }}
                      />
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: cat.accent }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-gray-50/50 py-20 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gray-400 text-xs tracking-[0.4em] uppercase mb-4">Not sure where to start?</p>
          <h2 className="font-serif text-3xl md:text-5xl text-gray-900 mb-6">
            Let Us Plan Your Perfect Event
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed mb-10">
            Tell us your vision and our expert team will craft a bespoke proposal tailored to your occasion, budget, and venue.
          </p>
          <Link href="/contact">
            <span
              className="inline-flex items-center gap-3 px-10 py-4 text-black text-sm tracking-widest uppercase font-semibold cursor-pointer transition-all duration-300 hover:scale-105"
              style={{ background: "#C9A227" }}
            >
              Get a Free Consultation <ArrowRight size={15} />
            </span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
