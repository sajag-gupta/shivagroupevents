import { motion } from "framer-motion";
import { Link } from "wouter";
import { MapPin } from "lucide-react";

const cities = [
  { name: "Meerut", desc: "Our home base — serving clients with unmatched local expertise for over a decade." },
  { name: "Delhi", desc: "The capital deserves capital-level events. Premium productions for Delhi's discerning clients." },
  { name: "Noida", desc: "Corporate and social celebrations for the NCR's fastest-growing community." },
  { name: "Greater Noida", desc: "Grand venues, grand events — we know every premium space in Greater Noida." },
  { name: "Ghaziabad", desc: "From intimate gatherings to large celebrations in the City of Nawabs." },
  { name: "Gurugram", desc: "World-class corporate events for Gurugram's global business community." },
  { name: "Faridabad", desc: "Premium event execution across Faridabad's finest venues." },
  { name: "Jaipur", desc: "Luxury events in the Pink City — where tradition meets contemporary elegance." },
  { name: "Chandigarh", desc: "The City Beautiful deserves beautiful events. We deliver exactly that." },
  { name: "Dehradun", desc: "Mountain-setting celebrations with the warmth and grandeur of the Doon Valley." },
];

export default function Cities() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <section className="py-20 bg-foreground text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">Where We Work</p>
          <h1 className="font-serif text-5xl md:text-6xl text-background">Cities We Serve</h1>
          <p className="mt-5 text-background/50 max-w-xl mx-auto">Premium event experiences across North India — from the plains of Meerut to the hills of Dehradun.</p>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-border">
          {cities.map((city, i) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-background p-8 group hover:bg-primary/5 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <h2 className="font-serif text-xl mb-2 group-hover:text-primary transition-colors">{city.name}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">{city.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm mb-6">Planning an event in another city?</p>
          <Link href="/contact">
            <span className="inline-block px-8 py-3.5 border border-primary text-primary text-sm tracking-widest uppercase cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
              Reach Out to Us
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
