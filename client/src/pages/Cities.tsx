import { motion } from "framer-motion";
import { Link } from "wouter";
import { MapPin, ArrowRight, Phone } from "lucide-react";
import { useSEO, breadcrumbSchema } from "@/lib/seo";

const cities = [
  {
    name: "Meerut",
    region: "Uttar Pradesh",
    desc: "Our home base since 2012. As Meerut's top event management company, we have deep local expertise and established venue relationships across the city. From Meerut Club to farmhouses and banquet halls, we know every premium space.",
    keywords: "event planner Meerut, wedding planner Meerut, corporate event organizer Meerut",
    highlight: "Headquarters",
  },
  {
    name: "Delhi",
    region: "NCT of Delhi",
    desc: "The capital deserves capital-level events. We deliver high-profile corporate galas, premium weddings, and brand activations across Delhi's iconic venues — from 5-star hotel ballrooms to open-air luxury setups.",
    keywords: "event management Delhi, luxury wedding planner Delhi, corporate events Delhi",
    highlight: "Metro City",
  },
  {
    name: "Noida",
    region: "Uttar Pradesh",
    desc: "Serving Noida's booming corporate and social sector with world-class event production. From tech company annual meets to grand weddings at Noida's premium banquet venues.",
    keywords: "event organizer Noida, corporate event management Noida, wedding planner Noida",
    highlight: "NCR Hub",
  },
  {
    name: "Greater Noida",
    region: "Uttar Pradesh",
    desc: "Grand venues, grand events. We have executed 100+ events in Greater Noida — from university fests to multi-thousand-guest wedding receptions at the city's finest banquets.",
    keywords: "event management Greater Noida, wedding planner Greater Noida, event company Gautam Buddh Nagar",
    highlight: "Growing City",
  },
  {
    name: "Ghaziabad",
    region: "Uttar Pradesh",
    desc: "From intimate corporate meetings to large multi-day celebrations, we bring premium production quality to every event in Ghaziabad. Trusted by leading families and corporates alike.",
    keywords: "event management Ghaziabad, corporate events Ghaziabad, wedding planner Ghaziabad",
    highlight: "NCR City",
  },
  {
    name: "Gurugram",
    region: "Haryana",
    desc: "World-class corporate events for Gurugram's global business community. Annual galas, product launches, and leadership conferences — produced with the professional precision that corporate Gurugram demands.",
    keywords: "corporate event management Gurugram, event company Gurgaon, luxury events Gurugram",
    highlight: "Corporate Hub",
  },
  {
    name: "Faridabad",
    region: "Haryana",
    desc: "Premium event execution across Faridabad's finest venues. From industrial corporate events to classic family weddings, we blend elegance with scale for every occasion.",
    keywords: "event management Faridabad, wedding planner Faridabad, corporate events Faridabad",
    highlight: "Industrial City",
  },
  {
    name: "Jaipur",
    region: "Rajasthan",
    desc: "Luxury events in the Pink City — where tradition meets contemporary elegance. Royal palace weddings, Rajasthani-themed corporate events, and destination celebrations are our specialty in Jaipur.",
    keywords: "destination wedding planner Jaipur, luxury wedding Jaipur, royal wedding organizer Rajasthan",
    highlight: "Destination Events",
  },
  {
    name: "Chandigarh",
    region: "Punjab/Haryana",
    desc: "The City Beautiful deserves beautiful events. We deliver premium corporate conferences, luxury Punjabi weddings, and high-energy concerts across Chandigarh's best venues.",
    keywords: "event management Chandigarh, wedding planner Chandigarh, corporate events Punjab",
    highlight: "City Beautiful",
  },
  {
    name: "Dehradun",
    region: "Uttarakhand",
    desc: "Mountain-setting celebrations with warmth and grandeur of the Doon Valley. Corporate retreats, destination weddings, and exclusive private events set against the scenic Himalayan backdrop.",
    keywords: "destination event Dehradun, wedding planner Dehradun, mountain event organizer Uttarakhand",
    highlight: "Mountain Events",
  },
];

export default function Cities() {
  useSEO({
    title: "Event Management Services Across North India | 15+ Cities",
    description: "Shiva Group Events provides premium event management services across 15+ cities in North India — Meerut, Delhi, Noida, Greater Noida, Ghaziabad, Gurugram, Faridabad, Jaipur, Chandigarh, Dehradun and more. Expert wedding & corporate event planning.",
    canonical: "/cities",
    keywords: "event management North India, event planner Delhi Meerut Noida, wedding planner UP, corporate events Haryana Rajasthan, luxury events North India cities, Shiva Group Events service areas",
    schema: [
      breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Cities We Serve", url: "/cities" }]),
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Cities served by Shiva Group Events",
        itemListElement: cities.map((city, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `Event Management in ${city.name}`,
          description: city.desc,
        })),
      },
    ],
  });

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <section className="py-20 bg-foreground text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">Where We Work</p>
          <h1 className="font-serif text-5xl md:text-6xl text-background">Cities We Serve</h1>
          <p className="mt-5 text-background/50 max-w-2xl mx-auto px-6">
            Premium luxury event management across North India — from the business hubs of Delhi NCR to the royal venues of Jaipur and the scenic hills of Dehradun.
          </p>
        </motion.div>
      </section>

      {/* Intro paragraph for SEO */}
      <section className="max-w-4xl mx-auto px-6 py-12 text-center">
        <p className="text-muted-foreground leading-relaxed text-base">
          Since 2012, <strong className="text-foreground">Shiva Group Events</strong> has grown from our headquarters in <strong className="text-foreground">Meerut, Uttar Pradesh</strong> to serve clients across <strong className="text-foreground">15+ cities in North India</strong>. Whether you are planning a royal destination wedding, a large corporate conference, a Bollywood celebrity show, or an intimate private celebration — our team brings the same level of luxury, precision, and passion to every city we operate in.
        </p>
      </section>

      {/* City grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-border">
          {cities.map((city, i) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-background p-8 group hover:bg-primary/5 transition-colors"
              itemScope
              itemType="https://schema.org/City"
            >
              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-primary mt-1 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="font-serif text-xl group-hover:text-primary transition-colors" itemProp="name">{city.name}</h2>
                    <span className="text-xs border border-primary/40 text-primary px-2 py-0.5 tracking-wide">{city.highlight}</span>
                  </div>
                  <p className="text-muted-foreground/60 text-xs mb-2">{city.region}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{city.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-3">Planning an event in another city? We travel across India for premium events.</p>
          <p className="text-muted-foreground/70 text-sm mb-8">Call us: <a href="tel:+919897015153" className="text-primary hover:underline">+91 98970 15153</a> / <a href="tel:+919219708567" className="text-primary hover:underline">+91 92197 08567</a></p>
          <Link href="/contact">
            <span className="inline-flex items-center gap-2 px-8 py-3.5 border border-primary text-primary text-sm tracking-widest uppercase cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
              Get a Free Quote <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </section>

      {/* SEO keyword-rich closing section */}
      <section className="bg-secondary/10 border-t border-border py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-foreground mb-6 text-center">Why Choose Shiva Group Events for Your City?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <p className="text-4xl mb-3">🗺️</p>
              <h3 className="font-semibold text-foreground mb-2">Local Expertise</h3>
              <p className="text-muted-foreground text-sm">Deep knowledge of venues, vendors, and logistics in every city we operate.</p>
            </div>
            <div className="p-6">
              <p className="text-4xl mb-3">🚀</p>
              <h3 className="font-semibold text-foreground mb-2">Pan-India Capability</h3>
              <p className="text-muted-foreground text-sm">Our team and network can execute events simultaneously across multiple cities.</p>
            </div>
            <div className="p-6">
              <p className="text-4xl mb-3">⭐</p>
              <h3 className="font-semibold text-foreground mb-2">Consistent Quality</h3>
              <p className="text-muted-foreground text-sm">Same 5-star luxury production standards regardless of the event location.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
