import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle } from "lucide-react";
import { useSubmitLead } from "@/lib/api";

const eventTypes = ["Luxury Wedding", "Corporate Event", "Social Celebration", "Award Ceremony", "Concert / Show", "Brand Activation", "Private Event", "College Festival", "Other"];
const budgetRanges = ["₹5L – ₹15L", "₹15L – ₹30L", "₹30L – ₹50L", "₹50L – ₹1Cr", "₹1Cr+", "Prefer not to say"];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", eventType: "", location: "", eventDate: "", guestCount: "", budgetRange: "", message: "" });
  const submitMutation = useSubmitLead();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate({
      data: {
        name: form.name,
        phone: form.phone,
        email: form.email,
        eventType: form.eventType,
        location: form.location || undefined,
        eventDate: form.eventDate || undefined,
        guestCount: form.guestCount ? Number(form.guestCount) : undefined,
        budgetRange: form.budgetRange || undefined,
        message: form.message || undefined,
      },
    }, {
      onSuccess: () => setSubmitted(true),
    });
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 bg-background flex flex-col items-center justify-center text-center px-6">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}>
          <CheckCircle size={56} className="text-primary mx-auto mb-5" />
          <h2 className="font-serif text-4xl mb-4">Thank You</h2>
          <p className="text-muted-foreground text-lg mb-2">Your inquiry has been received.</p>
          <p className="text-muted-foreground text-sm">Our team will reach out to you within 24 hours.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <section className="py-20 bg-foreground text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">Get in Touch</p>
          <h1 className="font-serif text-5xl md:text-6xl text-background">Start Your Event Journey</h1>
          <p className="mt-5 text-background/50 max-w-xl mx-auto">Share your vision with us. We'll transform it into an extraordinary experience.</p>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Form */}
        <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Full Name *</label>
                <input required value={form.name} onChange={set("name")} className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Phone *</label>
                <input required value={form.phone} onChange={set("phone")} className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Email *</label>
              <input required type="email" value={form.email} onChange={set("email")} className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="your@email.com" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Event Type *</label>
                <select required value={form.eventType} onChange={set("eventType")} className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors">
                  <option value="">Select event type</option>
                  {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">City / Location</label>
                <input value={form.location} onChange={set("location")} className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="e.g. Delhi, Meerut" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Event Date</label>
                <input type="date" value={form.eventDate} onChange={set("eventDate")} className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Expected Guests</label>
                <input type="number" value={form.guestCount} onChange={set("guestCount")} className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="Approximate guest count" />
              </div>
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Budget Range</label>
              <select value={form.budgetRange} onChange={set("budgetRange")} className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors">
                <option value="">Select budget range</option>
                {budgetRanges.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Your Vision</label>
              <textarea rows={5} value={form.message} onChange={set("message")} className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Tell us about your dream event..." />
            </div>
            <button
              type="submit"
              disabled={submitMutation.isPending}
              className="w-full py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {submitMutation.isPending ? "Sending..." : "Submit Inquiry"}
            </button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
          <div>
            <p className="text-primary text-xs tracking-widest uppercase mb-5">Direct Contact</p>
            <ul className="space-y-5">
              <li>
                <a href="https://wa.me/917060061117" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                  <MessageCircle size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">WhatsApp</p>
                    <p className="text-muted-foreground text-sm">+91 7060061117</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="tel:+917060061117" className="flex items-start gap-4 group">
                  <Phone size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Phone</p>
                    <p className="text-muted-foreground text-sm">+91 7060061117</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:[EMAIL_ADDRESS]" className="flex items-start gap-4 group">
                  <Mail size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Email</p>
                    <p className="text-muted-foreground text-sm">[EMAIL_ADDRESS]</p>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Office</p>
                  <p className="text-muted-foreground text-sm">Meerut, Uttar Pradesh, India</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-primary text-xs tracking-widest uppercase mb-3">Response Time</p>
            <p className="text-sm text-muted-foreground leading-relaxed">We respond to all inquiries within 24 hours. For urgent events, please WhatsApp or call directly.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
