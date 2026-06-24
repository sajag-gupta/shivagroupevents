import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <section className="py-24 bg-foreground">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-5">Our Story</p>
            <h1 className="font-serif text-5xl md:text-7xl text-background leading-tight">
              We don't manage events.<br />We create experiences.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-primary text-xs tracking-widest uppercase mb-5">The Beginning</p>
            <h2 className="font-serif text-3xl mb-5">Born from a Passion for Excellence</h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Shiva Group Events was founded in 2012 in the heart of Meerut with a single conviction: that every celebration deserves to be extraordinary. What began as a boutique wedding planning service has grown into North India's most trusted premium event management company.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm mt-4">
              Over more than a decade, we have transformed over 1,500 occasions — from intimate family ceremonies to grand corporate spectacles — always holding the same standard: perfection in every detail.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-primary text-xs tracking-widest uppercase mb-5">Our Philosophy</p>
            <h2 className="font-serif text-3xl mb-5">The Art of Listening</h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              We believe that every great event begins with a conversation. Our process starts not with presentations of packages, but with listening deeply to our clients — their dreams, their values, the emotions they wish to create.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm mt-4">
              Only when we truly understand the vision do we begin to craft the experience. Every vendor, every decoration choice, every scheduling decision flows from that understanding.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div className="text-center mb-14" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">What Drives Us</p>
            <h2 className="font-serif text-4xl">Our Core Values</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              { title: "Excellence Without Compromise", body: "We set an impossibly high bar and then clear it. Every detail matters because your moments matter." },
              { title: "Trust Through Transparency", body: "Honest pricing, clear communication, and absolute reliability. We earn trust by being worthy of it." },
              { title: "Creative Courage", body: "We don't repeat ourselves. Every event is a blank canvas — and we approach it with fresh eyes and bold imagination." },
            ].map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-background p-8">
                <div className="w-8 h-0.5 bg-primary mb-5" />
                <h3 className="font-serif text-xl mb-3">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border-l-4 border-primary pl-8">
            <p className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed italic mb-6">
              "I started this company with the belief that North India deserved world-class event experiences. Today, every event we produce is a testament to that belief."
            </p>
            <p className="text-primary text-sm tracking-wider">— Founder, Shiva Group Events</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-foreground text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="font-serif text-3xl text-background mb-5">Ready to Create Something Unforgettable?</h2>
          <Link href="/contact">
            <span className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground text-sm tracking-widest uppercase cursor-pointer hover:bg-primary/90 transition-colors">
              Start a Conversation <ArrowRight size={16} />
            </span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
