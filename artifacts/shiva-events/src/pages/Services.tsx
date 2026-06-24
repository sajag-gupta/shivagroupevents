import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useListServices } from "@workspace/api-client-react";

export default function Services() {
  const { data: services = [], isLoading } = useListServices();

  return (
    <div className="min-h-screen bg-background pt-20">
      <section className="py-20 bg-foreground text-background text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">Our Services</p>
          <h1 className="font-serif text-5xl md:text-6xl">Every Occasion, Perfected</h1>
          <p className="mt-5 text-background/60 max-w-xl mx-auto">From intimate gatherings to grand celebrations, we craft experiences that leave lasting impressions.</p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-background p-8 h-48 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link href={`/services/${service.slug}`}>
                  <div className="bg-background p-8 min-h-[220px] cursor-pointer group hover:bg-primary/5 transition-colors duration-300 flex flex-col">
                    <span className="text-4xl mb-4">{service.icon}</span>
                    <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{service.description}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-primary text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
