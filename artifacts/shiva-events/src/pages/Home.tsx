import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  useGetFeaturedPortfolio,
  useListServices,
  useListTestimonials,
  useGetSiteStats,
} from "@workspace/api-client-react";

const HERO_VIDEOS = [
  "https://assets.mixkit.co/videos/preview/mixkit-guests-at-a-wedding-reception-2168-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-wedding-ceremony-from-above-2167-large.mp4",
];

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const step = end / (duration * 60);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, end);
      setCount(Math.floor(current));
      if (current >= end) clearInterval(timer);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

function Preloader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#0F0F0F] flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center px-6"
      >
        <img src="/logo.png" alt="Shiva Group Events" className="h-24 w-auto object-contain mx-auto mb-6" />
        <motion.div
          className="mt-2 h-0.5 bg-primary"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        <p className="mt-4 text-xs text-white/40 tracking-[0.3em] uppercase">Creating Extraordinary Experiences</p>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(() => !sessionStorage.getItem("sge_visited"));
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { data: featured = [] } = useGetFeaturedPortfolio();
  const { data: services = [] } = useListServices();
  const { data: testimonials = [] } = useListTestimonials();
  const { data: stats } = useGetSiteStats();

  const handlePreloaderDone = () => {
    sessionStorage.setItem("sge_visited", "1");
    setPreloaderDone(true);
    setTimeout(() => setShowPreloader(false), 700);
  };

  return (
    <>
      {showPreloader && (
        <motion.div animate={preloaderDone ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.6 }}>
          <Preloader onDone={handlePreloaderDone} />
        </motion.div>
      )}

      {/* Hero — Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0F0F0F]">
        <div className="absolute inset-0 z-0">
          {/* Gradient overlay */}
          <div className="w-full h-full bg-gradient-to-b from-[#0F0F0F]/70 via-[#0F0F0F]/30 to-[#0F0F0F]/80 absolute inset-0 z-10" />

          {/* Video */}
          {!videoError ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover opacity-60"
            >
              <source src={HERO_VIDEOS[0]} type="video/mp4" />
              <source src={HERO_VIDEOS[1]} type="video/mp4" />
            </video>
          ) : (
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80"
              alt="Luxury Event"
              className="w-full h-full object-cover opacity-50"
            />
          )}
        </div>

        <motion.div
          className="relative z-20 text-center px-6 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: showPreloader ? 0 : 1, y: showPreloader ? 40 : 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-primary text-xs tracking-[0.4em] uppercase mb-6">Meerut · Delhi NCR · North India</p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
            Creating Extraordinary<br />Experiences Across<br />North India
          </h1>
          <p className="text-white/60 text-lg mb-10 tracking-wide">
            Luxury Weddings &nbsp;·&nbsp; Corporate Events &nbsp;·&nbsp; Celebrity Shows &nbsp;·&nbsp; Entertainment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/portfolio">
              <span className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground text-sm tracking-widest uppercase cursor-pointer hover:bg-primary/90 transition-colors">
                View Our Work <ArrowRight size={16} />
              </span>
            </Link>
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/40 text-white text-sm tracking-widest uppercase cursor-pointer hover:border-primary hover:text-primary transition-colors">
                Enquire Now
              </span>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/40 hidden sm:block"
            style={{ position: "absolute", bottom: "-80px" }}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-foreground">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Years of Excellence", value: stats?.yearsOfExperience ?? 12, suffix: "+" },
            { label: "Events Executed", value: stats?.eventsExecuted ?? 1500, suffix: "+" },
            { label: "Cities Served", value: stats?.citiesServed ?? 15, suffix: "+" },
            { label: "Happy Clients", value: stats?.happyClients ?? 850, suffix: "+" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <p className="font-serif text-4xl md:text-5xl text-primary font-semibold">
                <CountUp end={stat.value} />{stat.suffix}
              </p>
              <p className="text-xs text-background/60 tracking-widest uppercase mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Portfolio */}
      {featured.length > 0 && (
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="mb-14 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">Our Work</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">Featured Experiences</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {featured.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link href={`/portfolio/${item.slug}`}>
                    <div className="group relative overflow-hidden aspect-[4/5] cursor-pointer">
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-primary text-xs tracking-widest uppercase mb-1">{item.category.replace(/-/g, " ")}</p>
                        <h3 className="font-serif text-xl text-white mb-1">{item.title}</h3>
                        <p className="text-white/60 text-sm">{item.location}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/portfolio">
                <span className="inline-flex items-center gap-2 text-sm text-primary tracking-widest uppercase cursor-pointer hover:gap-3 transition-all">
                  View All Work <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Services */}
      {services.length > 0 && (
        <section className="py-24 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="mb-14 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">What We Do</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">Our Experiences</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {services.slice(0, 6).map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link href={`/services/${service.slug}`}>
                    <div className="bg-background p-8 cursor-pointer group hover:bg-primary/5 transition-colors duration-300 min-h-[200px]">
                      <p className="text-3xl mb-4">{service.icon}</p>
                      <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                      <p className="mt-4 text-primary text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn More →
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/services">
                <span className="inline-flex items-center gap-2 text-sm text-primary tracking-widest uppercase cursor-pointer hover:gap-3 transition-all">
                  Explore All Services <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="mb-14 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">Client Stories</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">What Our Clients Say</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border p-8"
                >
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <span key={j} className="text-primary text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-foreground/80 text-sm leading-relaxed mb-6 italic font-serif">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    {t.photoUrl ? (
                      <img src={t.photoUrl} alt={t.clientName} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-serif text-sm">
                        {t.clientName[0]}
                      </div>
                    )}
                    <div>
                      <p className="text-foreground text-sm font-medium">{t.clientName}</p>
                      {t.designation && <p className="text-muted-foreground text-xs">{t.designation}{t.company ? `, ${t.company}` : ""}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Founder Strip */}
      <section className="py-14 bg-secondary/20 border-y border-border">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary font-serif text-2xl shrink-0">
            R
          </div>
          <div>
            <p className="font-serif text-xl md:text-2xl text-foreground italic leading-relaxed">
              "Every event we produce carries my personal commitment to excellence. Shiva Group Events is not just a company — it's a promise."
            </p>
            <p className="text-primary text-sm tracking-wider mt-3">— Rajeev Gupta, Founder & Director</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-foreground text-background">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">Begin Your Journey</p>
            <h2 className="font-serif text-4xl md:text-5xl text-background mb-6">Let's Create Something Extraordinary</h2>
            <p className="text-background/60 text-lg mb-10">Tell us about your event. We'll take care of the rest.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase cursor-pointer hover:bg-primary/90 transition-colors">
                  Start Planning <ArrowRight size={16} />
                </span>
              </Link>
              <a
                href="https://wa.me/919999999999?text=Hi%2C%20I%20want%20to%20enquire%20about%20event%20planning."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-10 py-4 border border-white/30 text-white text-sm tracking-widest uppercase cursor-pointer hover:border-primary hover:text-primary transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
