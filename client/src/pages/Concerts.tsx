import CategoryPage, { CategoryPageConfig } from "./CategoryPage";
import { useSEO, serviceSchema, breadcrumbSchema } from "@/lib/seo";

const config: CategoryPageConfig = {
  accentColor: "#EF4444",
  categorySlug: "concerts",
  bgVideo: "/concertspage.mp4",
  bgImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1920&q=80",
  eyebrow: "Shiva Group Events · Live Music & Concerts",
  headline: "Music That Moves\nEvery Soul",
  subline: "Live music events, band concerts, music festivals, and cultural programs — produced with professional precision and premium sound engineering that sets the stage on fire.",
  heroCTALabel: "See Our Shows",
  statsLabel: "Concerts Produced",
  stats: [
    { value: "100+", label: "Concerts Produced" },
    { value: "300K+", label: "Music Lovers" },
    { value: "30+", label: "Music Festivals" },
    { value: "100%", label: "Sold-Out Shows" },
  ],
  services: [
    {
      cat: "Live Music",
      items: ["Band Performance Setup", "Acoustic Concerts", "Orchestra Stage", "Instrumental Shows", "Folk Music Events", "Classical Concerts"],
    },
    {
      cat: "Sound Engineering",
      items: ["Concert PA System", "Stage Monitors", "FOH Mixing", "Studio Recording", "Live Broadcast Audio", "Acoustic Treatment"],
    },
    {
      cat: "Staging",
      items: ["Concert Stage Build", "Instrument Risers", "Drum Riser", "Backline Rental", "Stage Lighting Rig", "Followspot Ops"],
    },
    {
      cat: "Festival Production",
      items: ["Multi-Stage Festivals", "Artist Scheduling", "Zone Management", "Food Court Layout", "Ticketing Support", "Sponsorship Display"],
    },
  ],
  processSteps: [
    { step: "01", title: "Lineup", desc: "Curate the perfect artist lineup for your audience.", icon: "Music" },
    { step: "02", title: "Venue", desc: "Select and design the ideal acoustic venue.", icon: "Building" },
    { step: "03", title: "Tech Rider", desc: "Match artist technical requirements with our inventory.", icon: "FileText" },
    { step: "04", title: "Stage Build", desc: "3-day stage construction and AV installation.", icon: "Wrench" },
    { step: "05", title: "Sound Check", desc: "Individual artist sound checks before show time.", icon: "Music" },
    { step: "06", title: "Concert", desc: "Live event execution with our dedicated crew.", icon: "Music" },
  ],
  galleryFilters: ["Concert", "Band", "Festival", "Stage", "Crowd", "Lights"],
  gallery: [
    { src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80", cat: "Concert", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80", cat: "Band", aspect: "square" },
    { src: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=80", cat: "Stage", aspect: "tall" },
    { src: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80", cat: "Lights", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80", cat: "Crowd", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80", cat: "Festival", aspect: "square" },
    { src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80", cat: "Lights", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&q=80", cat: "Concert", aspect: "tall" },
    { src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80", cat: "Festival", aspect: "wide" },
  ],
  caseStudies: [
    {
      title: "Sufi Night — Open Air Concert",
      client: "State Cultural Festival",
      venue: "Qutub Amphitheatre, Delhi",
      guests: 5000,
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
      review: "The sound was perfect in every corner of the amphitheatre. The artists were deeply impressed.",
      highlight: "Custom acoustic design achieving perfect sound coverage across entire amphitheatre",
      tags: ["Sufi Music", "Amphitheatre", "Acoustic Design", "Cultural"],
    },
    {
      title: "Indie Music Festival 3-Day Event",
      client: "Music Promoter Consortium",
      venue: "Leisure Valley, Gurugram",
      guests: 15000,
      image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80",
      review: "Three stages, 30 artists, 3 days — Shiva Group Events managed everything without a single glitch.",
      highlight: "3 simultaneous stages with 30 indie artists across 3 days",
      tags: ["Indie Music", "Music Festival", "Multi-Stage", "Multi-Day"],
    },
  ],
  testimonials: [
    {
      name: "Arjun Rao, Festival Director",
      event: "Indie Music Festival",
      venue: "Gurugram",
      rating: 5,
      review: "Running three simultaneous stages is a logistical nightmare — unless you have Shiva Group Events. They made it look effortless. Our artists and audience were blown away.",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
      clientImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    },
  ],
  whyUs: [
    { icon: "Volume2", title: "Premium Sound Systems", desc: "World-class line array systems for perfect audio at any venue size." },
    { icon: "Music", title: "Backline Rental", desc: "Full backline — drums, amps, keys, DJ gear — available for artists." },
    { icon: "Music", title: "Genre Specialists", desc: "From Sufi to EDM, Bollywood to Classical — we handle all genres." },
    { icon: "Building", title: "Any Venue Type", desc: "Amphitheatres, indoor arenas, rooftops, fields — we set up anywhere." },
    { icon: "Mic", title: "Artist Comfort", desc: "Dedicated crew for artist hospitality, rider management, and IEMs." },
    { icon: "Radio", title: "Live Stream", desc: "Professional multi-camera concert live streaming available." },
  ],
};

export default function Concerts() {
  useSEO({
    title: "Concert Organizers in North India | Live Music Event Company",
    description: "Shiva Group Events — expert concert organizers and live music event managers in Meerut, Delhi, UP & North India. Professional staging, line-array sound systems, lighting, crowd management. 100+ concerts delivered.",
    canonical: "/services/concerts",
    keywords: "concert organizer Meerut, live music event company North India, concert management UP, music festival organizer Delhi, line array sound North India, large concert organizer Meerut",
    schema: [
      serviceSchema("Concert & Live Music Events", "Professional concert organization and live music event management across North India with premium sound and staging.", "/services/concerts", "Concerts"),
      breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: "Concerts", url: "/services/concerts" }]),
    ],
  });
  return <CategoryPage config={config} />;
}
