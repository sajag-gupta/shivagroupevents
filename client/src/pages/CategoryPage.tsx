import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle, Star, ChevronLeft, ChevronRight,
  X, Camera, MapPin, Phone,
} from "lucide-react";
import { useListPortfolio, useGetService } from "@/lib/api";
import { GetIcon } from "@/components/GetIcon";
import { CinematicEventJourney, Chapter } from "@/components/CinematicEventJourney";
import { BehindEveryEvent } from "@/components/BehindEveryEvent";

/* ─── TYPES ─────────────────────────────────────────────────────────────────── */

export interface GalleryPhoto {
  src: string;
  cat: string;
  aspect?: "square" | "tall" | "wide";
}

export interface CaseStudy {
  title: string;
  client: string;
  venue: string;
  guests: number;
  image: string;
  review: string;
  highlight: string;
  tags: string[];
}

export interface CategoryPageConfig {
  accentColor: string;         // e.g. "#C9A227"
  categorySlug: string;        // matches admin portfolio category value e.g. "luxury-weddings"
  bgVideo?: string;            // optional – /path/to/video.mp4
  bgImage: string;             // fallback / hero image URL
  eyebrow: string;             // "Shiva Group Events · Corporate Division"
  headline: string;            // big heading text
  subline: string;             // paragraph below heading
  heroCTALabel: string;        // "Explore Events"
  statsLabel: string;          // "Events Executed"
  stats: { value: string; label: string }[];
  services: { cat: string; items: string[] }[];
  galleryFilters: string[];
  gallery: GalleryPhoto[];     // fallback gallery if admin has no items yet
  caseStudies: CaseStudy[];
  testimonials: { name: string; event: string; venue: string; rating: number; review: string; image: string; clientImg: string }[];
  processSteps: { step: string; title: string; desc: string; icon: string }[];
  whyUs: { icon: string; title: string; desc: string }[];
}

/* ─── HELPER COMPONENTS ─────────────────────────────────────────────────────── */

function SectionTag({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <p className="text-xs tracking-[0.4em] uppercase mb-4 font-sans font-semibold" style={{ color }}>
      {children}
    </p>
  );
}

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button className="absolute top-4 right-4 text-white/60 hover:text-white" onClick={onClose}>
        <X size={26} />
      </button>
      <motion.img
        src={src} alt="Gallery"
        className="max-w-full max-h-full object-contain"
        initial={{ scale: 0.88 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 20 }}
        onClick={e => e.stopPropagation()}
      />
    </motion.div>
  );
}

/* ─── MAIN TEMPLATE ─────────────────────────────────────────────────────────── */

export default function CategoryPage({ config }: { config: CategoryPageConfig }) {
  const [activePhotoFilter, setActivePhotoFilter] = useState("All");
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const c = config.accentColor;

  /* ── Fetch admin-managed service config ── */
  const serviceSlug = config.categorySlug === "corporate-events"
    ? "corporate"
    : config.categorySlug === "luxury-weddings"
      ? "weddings"
      : config.categorySlug;

  const { data: dbService } = useGetService(serviceSlug);

  // Merge database values with local config fallback
  const headline = dbService?.title || config.headline;
  const subline = dbService?.description || config.subline;
  const bgImage = dbService?.heroImage || config.bgImage;
  const bgVideo = dbService?.heroVideo || config.bgVideo;
  const displayServices = dbService?.features && dbService.features.length > 0
    ? [{ cat: "Our Core Offerings", items: dbService.features }]
    : config.services;

  /* ── Fetch admin-managed gallery for this category ── */
  const { data: portfolioData } = useListPortfolio(
    { category: config.categorySlug, published: true, limit: 30 } as any,
    { query: { staleTime: 60_000 } } as any
  );
  const apiGallery: GalleryPhoto[] = (portfolioData?.items ?? []).map(item => ({
    src: item.coverImage,
    cat: "Gallery",
    aspect: "square" as const,
  }));
  const galleryItems = apiGallery.length > 0 ? apiGallery : config.gallery;

  const filteredPhotos = galleryItems.filter(p =>
    activePhotoFilter === "All" || p.cat === activePhotoFilter
  );

  // Generate category-specific storyline simulation chapters
  const getChapters = (): Chapter[] => {
    const slug = config.categorySlug;
    if (slug === "corporate-events" || slug === "corporate") {
      return [
        {
          id: "corp_ch01",
          number: "01",
          title: "Rigging & Truss Staging",
          quote: "Your stage isn't built. It's engineered.",
          desc: "Assembling modular trusses, mounting curved LED backdrops, and aligning primary staging structures.",
          video: "/corporate_events.mp4",
          operations: ["Truss structure assembly", "LED screen panel locking", "Speech timer system sync", "Spotlight rigging"],
          chordFreqs: [110.00, 196.00, 246.94], // A2, G3, B3
        },
        {
          id: "corp_ch02",
          number: "02",
          title: "Staging Rehearsals & Keynotes",
          quote: "What you see on the day is the result of a hundred rehearsals nobody sees.",
          desc: "Conducting dynamic microphone checks, slide transitions lock, and speaker positioning sweeps.",
          video: "/brand-activation.mp4",
          operations: ["Presenter lapel mic frequency lock", "Slide visual deck run", "Direct visual monitor calibration", "Live streaming stream checks"],
          chordFreqs: [110.00, 196.00, 246.94, 293.66], // A2, G3, B3, D4
        },
        {
          id: "corp_ch03",
          number: "03",
          title: "Awards Night & Dinner",
          quote: "Excellence deserves a moment to itself.",
          desc: "Opening dynamic graphics sync, trophy alignment check, and VIP catering hospitality execution.",
          video: "/awardspage.mp4",
          operations: ["Opening laser sequence triggers", "Trophy sequence coordination", "Background sound check", "Ambient walk-in lounge control"],
          chordFreqs: [174.61, 261.63, 329.63], // F3, C4, E4
        },
      ];
    } else if (slug === "celebrity-shows") {
      return [
        {
          id: "cel_ch01",
          number: "01",
          title: "Backstage Setup & Artist Liaison",
          quote: "What happens behind the curtain makes what happens on stage possible.",
          desc: "Coordinating with celebrity security, green room preparation, and backstage catering checks.",
          video: "/corporate_events.mp4",
          operations: ["Green room security briefing", "Artist rider check", "VIP entrance locks", "Press briefing setup"],
          chordFreqs: [110.00, 220.00, 293.66], // A2, A3, D4
        },
        {
          id: "cel_ch02",
          number: "02",
          title: "Red Carpet & Opening Act",
          quote: "The red carpet doesn't celebrate arrival. It celebrates achievement.",
          desc: "Lighting up the entrance, emcee announcements, guest arrival coordination, and live opener DJ act.",
          video: "/celebrity_show.mp4",
          operations: ["Red carpet lighting active", "Emcee microphone check", "Fan barricade security check", "Stage projection sync"],
          chordFreqs: [110.00, 220.00, 293.66, 329.63], // A2, A3, D4, E4
        },
        {
          id: "cel_ch03",
          number: "03",
          title: "Main Star Show",
          quote: "Nights that become legends.",
          desc: "High-impact laser beam triggers, CO2 jet releases, and headliner performance stage sync.",
          video: "/concertspage.mp4",
          operations: ["CO2 jets triggers", "Stage lighting sweeps", "Live camera feed sync", "Confetti cannon release"],
          chordFreqs: [110.00, 220.00, 293.66, 440.00], // A2, A3, D4, A4
        },
      ];
    } else if (slug === "concerts") {
      return [
        {
          id: "con_ch01",
          number: "01",
          title: "Line-Array Rigging & Tuning",
          quote: "Before the music, there is obsession.",
          desc: "Sound pressure level tuning, speaker hanging, and monitor feedback checks.",
          video: "/corporate_events.mp4",
          operations: ["Line-array speaker tuning", "Bass subwoofers sync", "Truss rigging safety check", "Backstage pass validation"],
          chordFreqs: [82.41, 164.81, 246.94], // E2, E3, B3
        },
        {
          id: "con_ch02",
          number: "02",
          title: "Fan Admission & Security",
          quote: "One stadium. Fifty thousand stories.",
          desc: "Opening stadium gates, coordinating ticket scanning lanes, and launching warm-up DJ set.",
          video: "/celebrity_show.mp4",
          operations: ["Ticket barcode system check", "Crowd barrier check", "Medical team briefing", "Warm-up audio loop"],
          chordFreqs: [82.41, 164.81, 246.94, 329.63], // E2, E3, B3, E4
        },
        {
          id: "con_ch03",
          number: "03",
          title: "Headliner Live Set",
          quote: "This is what 120 decibels of pure joy sounds like.",
          desc: "Synchronized CO2 bursts, custom laser graphics projections, and audio equalizers active.",
          video: "/concertspage.mp4",
          operations: ["Heavy bass sound lock", "Laser visual projection sync", "Pyro/firework cue triggers", "Crowd exit pathways lock"],
          chordFreqs: [110.00, 220.00, 293.66, 440.00], // A2, A3, D4, A4
        },
      ];
    } else if (slug === "award-ceremonies") {
      return [
        {
          id: "aw_ch01",
          number: "01",
          title: "Stage Styling & Trophy Prep",
          quote: "Before the applause, there is silence.",
          desc: "Polishing awards, placing stage podiums, and setting up multi-view camera tracking.",
          video: "/corporate_events.mp4",
          operations: ["Trophy inventory check", "Podium positioning", "VIP seating placeholders", "Stage lighting cues lock"],
          chordFreqs: [130.81, 196.00, 261.63], // C3, G3, C4
        },
        {
          id: "aw_ch02",
          number: "02",
          title: "Opening Act & Red Carpet",
          quote: "The red carpet doesn't celebrate arrival. It celebrates achievement.",
          desc: "Opening corporate choreography, welcoming VIPs, and starting live webcast stream.",
          video: "/celebrity_show.mp4",
          operations: ["Live webcast feed check", "VIP registration desk sync", "Anchor script run-through", "Staged sound cues lock"],
          chordFreqs: [130.81, 196.00, 261.63, 329.63], // C3, G3, C4, E4
        },
        {
          id: "aw_ch03",
          number: "03",
          title: "Awards Presentation & Reveal",
          quote: "Every name called is a story that deserves to be told.",
          desc: "Spotlight sweeps on nominees, screen graphics sync, and live fanfare sound triggers.",
          video: "/awardspage.mp4",
          operations: ["Nomination video graphics sync", "Spotlight triggers", "Envelope delivery coordination", "Stage exit flow checks"],
          chordFreqs: [174.61, 261.63, 329.63, 392.00], // F3, C4, E4, G4
        },
      ];
    } else if (slug === "college-festivals") {
      return [
        {
          id: "fest_ch01",
          number: "01",
          title: "Day Stage Setup & Sound Check",
          quote: "For one night, your campus becomes an arena.",
          desc: "Campus coordination, gate credential passes check, and daytime student band soundchecks.",
          video: "/celebrity_show.mp4",
          operations: ["Student volunteer briefing", "ID credentials scan check", "Stage audio level calibration", "Laser show visual check"],
          chordFreqs: [130.81, 196.00, 261.63], // C3, G3, C4
        },
        {
          id: "fest_ch02",
          number: "02",
          title: "Headline EDM Artist Set",
          quote: "They'll remember this night for the rest of their lives.",
          desc: "High-impact strobe flashes, CO2 jet triggers, and pyrotechnics coordination.",
          video: "/College-Festivals.mp4",
          operations: ["Equalizer display loop lock", "CO2 jet triggers check", "Confetti cannon locking", "Campus security liaison check"],
          chordFreqs: [196.00, 293.66, 392.00, 493.88], // G3, D4, G4, B4
        },
      ];
    } else if (slug === "brand-activations") {
      return [
        {
          id: "brand_ch01",
          number: "01",
          title: "Experiential Booth Construction",
          quote: "Your brand deserves more than a banner stand.",
          desc: "Building custom interactive kiosks, wrapping graphics, and assembling visual banners.",
          video: "/corporate_events.mp4",
          operations: ["Kiosk display fabrication", "Tech visual feed verification", "Branding banners check", "Promoter briefing"],
          chordFreqs: [130.81, 196.00, 261.63],
        },
        {
          id: "brand_ch02",
          number: "02",
          title: "Live Interaction & Campaigns",
          quote: "Don't show them your brand. Let them live inside it.",
          desc: "Launching promoter interaction games, AR/VR experiences, and capturing guest feedback.",
          video: "/brand-activation.mp4",
          operations: ["VR headset alignment check", "Social wall display feed lock", "Feedback system calibration", "Giveaways inventory check"],
          chordFreqs: [130.81, 196.00, 261.63, 329.63],
        },
        {
          id: "brand_ch03",
          number: "03",
          title: "Evening Footfall Peak",
          quote: "Turn attention into experience.",
          desc: "Transitioning to neon lighting, launching live announcements, and executing lucky draws.",
          video: "/private_event.mp4",
          operations: ["Neon ambient lighting sync", "Keynote speaker sound check", "Flash mob coordination", "Lead capture sync"],
          chordFreqs: [174.61, 261.63, 329.63],
        },
      ];
    } else {
      // General fallbacks for private-events or others
      return [
        {
          id: "priv_ch01",
          number: "01",
          title: "Venue Decor & Theme Setup",
          quote: "The best celebrations don't need thousands of guests. Just the right ones.",
          desc: "Arranging dining tables, setting up modular cocktail bars, and testing mood lighting.",
          video: "/corporate_events.mp4",
          operations: ["Tables styling checks", "Cocktail bar setup verification", "Uplighting color locks", "Backstage catering check"],
          chordFreqs: [130.81, 196.00, 261.63],
        },
        {
          id: "priv_ch02",
          number: "02",
          title: "Cocktails & Guest Arrival",
          quote: "Intimacy is a style of luxury.",
          desc: "Hosting guest registration, serving welcome drinks, and starting background acoustic set.",
          video: "/brand-activation.mp4",
          operations: ["Welcome hospitality desk active", "Beverage inventory verify", "Background acoustic sound set", "Photo booth alignment"],
          chordFreqs: [130.81, 196.00, 261.63, 329.63],
        },
        {
          id: "priv_ch03",
          number: "03",
          title: "Live Celebration & DJ",
          quote: "The moments that become family stories.",
          desc: "Transitioning to high-energy dance lighting, cake cutting ceremony, and live DJ sets.",
          video: "/private_event.mp4",
          operations: ["Staging lights sync", "Champagne show presentation", "Cake cutting visuals cue", "DJ sound check"],
          chordFreqs: [174.61, 261.63, 329.63],
        },
      ];
    }
  };

  const chapters = getChapters();

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ── HERO — dark overlay on video/image stays dark for readability ───── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          {bgVideo ? (
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-55">
              <source src={bgVideo} type="video/mp4" />
              <img src={bgImage} alt="Hero" className="w-full h-full object-cover" />
            </video>
          ) : (
            <img src={bgImage} alt="Hero" className="w-full h-full object-cover opacity-50" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        </div>

        <motion.div
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <motion.p
            className="text-xs tracking-[0.5em] uppercase mb-6 font-sans font-semibold"
            style={{ color: c }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          >
            {config.eyebrow}
          </motion.p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-8 whitespace-pre-line">
            {headline}
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-sans font-light leading-relaxed whitespace-pre-line">
            {subline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#gallery">
              <span
                className="inline-flex items-center gap-2 px-10 py-4 text-black text-sm tracking-widest uppercase font-semibold cursor-pointer transition-all duration-300 hover:opacity-90"
                style={{ background: c }}
              >
                {config.heroCTALabel} <ArrowRight size={15} />
              </span>
            </a>
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 px-10 py-4 border border-white/40 text-white text-sm tracking-widest uppercase cursor-pointer hover:border-white transition-all duration-300">
                Get a Quote
              </span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronRight className="rotate-90" size={22} />
        </motion.div>
      </section>

      {/* ── CINEMATIC EVENT JOURNEY ────────────────────────────────────────── */}
      {chapters.length > 0 && (
        <CinematicEventJourney
          categoryName={config.eyebrow.split("·")[1]?.trim() || "Live Event"}
          chapters={chapters}
          accentColor={c}
        />
      )}

      {/* ── STATS STRIP ───────────────────────────────────────────────────────── */}
      <section className="py-14 border-b border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {config.stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            >
              <p className="font-serif text-4xl md:text-5xl font-semibold mb-2" style={{ color: c }}>
                {s.value}
              </p>
              <p className="text-gray-400 text-xs tracking-widest uppercase font-sans">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTag color={c}>What We Provide</SectionTag>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900">Our Services</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayServices.map((cat, i) => (
              <motion.div
                key={cat.cat}
                className="bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              >
                <h3 className="font-serif text-base mb-4" style={{ color: c }}>{cat.cat}</h3>
                <ul className="space-y-2">
                  {cat.items.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle size={11} className="mt-0.5 shrink-0" style={{ color: c, opacity: 0.7 }} />
                      <span className="text-gray-500 text-xs font-sans leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTag color={c}>How We Work</SectionTag>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900">Our Process</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {config.processSteps.map((s, i) => (
              <motion.div
                key={s.step}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.09 }}
              >
                <div
                  className="relative z-10 w-16 h-16 rounded-full border flex flex-col items-center justify-center mb-4 bg-gray-50"
                  style={{ borderColor: `${c}50` }}
                >
                  <GetIcon name={s.icon} color={c} size={22} />
                </div>
                <p className="text-xs tracking-widest font-sans mb-1" style={{ color: c }}>{s.step}</p>
                <h4 className="font-serif text-sm text-gray-800 mb-1.5">{s.title}</h4>
                <p className="text-gray-400 text-xs font-sans leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ──────────────────────────────────────────────────────── */}
      {config.caseStudies.length > 0 && (
        <section className="py-24 bg-gray-50" id="portfolio">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionTag color={c}>Case Studies</SectionTag>
              <h2 className="font-serif text-4xl md:text-5xl text-gray-900">Featured Events</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {config.caseStudies.map((cs, i) => (
                <motion.div
                  key={cs.title}
                  className="group cursor-pointer bg-white shadow-sm hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  onClick={() => setActiveCaseStudy(cs)}
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img src={cs.image} alt={cs.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute top-3 right-3 px-2.5 py-1 border backdrop-blur-sm" style={{ borderColor: `${c}60`, background: `${c}20` }}>
                      <span className="text-xs font-sans text-white">{cs.guests.toLocaleString()} Guests</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-xs tracking-widest uppercase mb-1 font-sans" style={{ color: c }}>{cs.client}</p>
                      <h3 className="font-serif text-lg text-white mb-1">{cs.title}</h3>
                      <p className="text-white/60 text-sm font-sans flex items-center gap-1"><MapPin size={11} />{cs.venue}</p>
                      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs tracking-widest uppercase font-sans flex items-center gap-1.5" style={{ color: c }}>View Details <ArrowRight size={11} /></span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeCaseStudy && (
          <motion.div
            className="fixed inset-0 z-[150] bg-black/80 overflow-y-auto"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="max-w-4xl mx-auto px-6 py-12">
              <button onClick={() => setActiveCaseStudy(null)} className="mb-8 flex items-center gap-2 text-white/60 hover:text-white text-sm tracking-widest uppercase font-sans transition-colors">
                <X size={14} /> Back
              </button>
              <div className="bg-white grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
                <img src={activeCaseStudy.image} alt={activeCaseStudy.title} className="w-full aspect-[4/3] object-cover" />
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <p className="text-xs tracking-[0.4em] uppercase mb-3 font-sans" style={{ color: c }}>Event Case Study</p>
                  <h2 className="font-serif text-3xl text-gray-900 mb-6">{activeCaseStudy.title}</h2>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      { label: "Client", value: activeCaseStudy.client },
                      { label: "Venue", value: activeCaseStudy.venue },
                      { label: "Guests", value: activeCaseStudy.guests.toLocaleString() },
                    ].map(({ label, value }) => (
                      <div key={label} className="p-3.5 bg-gray-50 border border-gray-100">
                        <p className="text-gray-400 text-xs tracking-widest uppercase font-sans mb-1">{label}</p>
                        <p className="text-gray-900 text-sm font-serif">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {activeCaseStudy.tags.map(t => (
                      <span key={t} className="px-3 py-1 border text-xs font-sans" style={{ borderColor: `${c}40`, color: c }}>{t}</span>
                    ))}
                  </div>
                  <div className="p-4 mb-5 border" style={{ background: `${c}08`, borderColor: `${c}25` }}>
                    <p className="text-xs tracking-widest uppercase font-sans mb-2 flex items-center gap-1" style={{ color: c }}>
                      <Star size={12} className="fill-current" /> Highlight
                    </p>
                    <p className="text-gray-600 text-sm font-sans">{activeCaseStudy.highlight}</p>
                  </div>
                  <p className="text-gray-500 text-sm font-sans italic leading-relaxed mb-6">"{activeCaseStudy.review}"</p>
                  <Link href="/contact">
                    <span className="inline-flex items-center gap-2 px-8 py-3.5 text-black text-sm tracking-widest uppercase font-semibold cursor-pointer transition-all hover:opacity-90" style={{ background: c }}>
                      Plan Your Event <ArrowRight size={15} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PHOTO GALLERY ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white" id="gallery">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTag color={c}>Photography</SectionTag>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900">Event Gallery</h2>
            {apiGallery.length > 0 && (
              <p className="text-gray-400 text-xs mt-3 font-sans">Managed via admin · {apiGallery.length} items</p>
            )}
          </motion.div>

          {/* Filter pills */}
          {apiGallery.length === 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {["All", ...config.galleryFilters].map(f => (
                <button
                  key={f}
                  onClick={() => setActivePhotoFilter(f)}
                  className="px-4 py-2 text-xs tracking-widest uppercase font-sans transition-all duration-300"
                  style={
                    activePhotoFilter === f
                      ? { background: c, color: "#000" }
                      : { border: "1px solid #e5e7eb", color: "#9ca3af" }
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          )}

          {/* Masonry grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {filteredPhotos.map((photo, i) => (
              <motion.div
                key={`${photo.src}-${i}`}
                className="break-inside-avoid group cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: (i % 4) * 0.06 }}
                onClick={() => setLightboxSrc(photo.src)}
              >
                <div className={`relative overflow-hidden ${photo.aspect === "tall" ? "aspect-[2/3]" : photo.aspect === "wide" ? "aspect-[3/2]" : "aspect-square"}`}>
                  <img src={photo.src} alt={photo.cat} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <Camera size={18} className="text-white opacity-0 group-hover:opacity-80 transition-opacity" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-16">No gallery items yet — add them via the admin panel.</p>
          )}
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────────── */}
      {config.testimonials.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionTag color={c}>Client Stories</SectionTag>
              <h2 className="font-serif text-4xl md:text-5xl text-gray-900">What Clients Say</h2>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden border border-gray-100 shadow-sm"
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.45 }}
              >
                <img src={config.testimonials[activeTestimonial].image} alt="Event" className="w-full h-72 lg:h-full object-cover" />
                <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: config.testimonials[activeTestimonial].rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-[#C9A227] text-[#C9A227]" />
                    ))}
                  </div>
                  <blockquote className="font-serif text-xl text-gray-800 leading-relaxed mb-6 italic">
                    "{config.testimonials[activeTestimonial].review}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <img src={config.testimonials[activeTestimonial].clientImg} alt="Client" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                    <div>
                      <p className="text-gray-900 text-sm font-medium font-sans">{config.testimonials[activeTestimonial].name}</p>
                      <p className="text-xs font-sans" style={{ color: c }}>{config.testimonials[activeTestimonial].event} · {config.testimonials[activeTestimonial].venue}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button onClick={() => setActiveTestimonial(i => Math.max(0, i - 1))} className="text-gray-300 hover:text-gray-600 transition-colors">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2.5">
                {config.testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActiveTestimonial(i)}
                    className="transition-all duration-300"
                    style={activeTestimonial === i ? { width: "28px", height: "3px", background: c } : { width: "14px", height: "3px", background: "#e5e7eb" }}
                  />
                ))}
              </div>
              <button onClick={() => setActiveTestimonial(i => Math.min(config.testimonials.length - 1, i + 1))} className="text-gray-300 hover:text-gray-600 transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── BEHIND EVERY GRAND EVENT ───────────────────────────────────────── */}
      <BehindEveryEvent accentColor={c} />

      {/* ── WHY CHOOSE US ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTag color={c}>Why Choose Shiva Group</SectionTag>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900">Our Advantage</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {config.whyUs.map((w, i) => (
              <motion.div
                key={w.title}
                className="flex gap-4 p-6 bg-gray-50 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-300"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              >
                <div className="w-9 h-9 shrink-0 flex items-center justify-center border bg-white" style={{ borderColor: `${c}35` }}>
                  <GetIcon name={w.icon} color={c} size={16} />
                </div>
                <div>
                  <h4 className="font-serif text-gray-900 text-sm mb-1.5">{w.title}</h4>
                  <p className="text-gray-400 text-xs font-sans leading-relaxed">{w.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={config.bgImage} alt="CTA" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gray-900/85" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTag color={c}>Get Started</SectionTag>
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
              Ready to Plan Your<br />
              <span style={{ color: c }}>Next Event?</span>
            </h2>
            <p className="text-white/50 text-lg font-sans mb-10">Let's create an unforgettable experience. Talk to our specialists today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 px-10 py-5 text-black text-sm tracking-widest uppercase font-semibold cursor-pointer transition-all duration-300 hover:opacity-90" style={{ background: c }}>
                  Book Consultation <ArrowRight size={15} />
                </span>
              </Link>
              <a href="tel:+917060061117">
                <span className="inline-flex items-center gap-2 px-10 py-5 border border-white/30 text-white text-sm tracking-widest uppercase cursor-pointer hover:border-white/60 transition-all duration-300">
                  <Phone size={14} /> Call Now
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Lightbox */}
      <AnimatePresence>
        {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
      </AnimatePresence>
    </div>
  );
}
