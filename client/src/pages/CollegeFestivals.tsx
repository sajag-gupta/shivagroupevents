import CategoryPage, { CategoryPageConfig } from "./CategoryPage";
import { useSEO, serviceSchema, breadcrumbSchema } from "@/lib/seo";

const config: CategoryPageConfig = {
  accentColor: "#F97316",
  categorySlug: "college-festivals",
  bgImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1920&q=80",
  eyebrow: "Shiva Group Events · College & Youth Events",
  headline: "College Fests That\nBuild Legends",
  subline: "Annual fests, cultural nights, sports events, technical symposiums, and inter-college competitions — managed with energy, creativity, and professional-grade production.",
  heroCTALabel: "See Past Fests",
  statsLabel: "College Events",
  stats: [
    { value: "200+", label: "College Events" },
    { value: "500K+", label: "Students Engaged" },
    { value: "100+", label: "Colleges Served" },
    { value: "8+", label: "States Covered" },
  ],
  services: [
    {
      cat: "Cultural Fests",
      items: ["Main Stage Production", "Dance Competition", "Music Night", "Fashion Show", "Stand-Up Comedy", "Cultural Performances"],
    },
    {
      cat: "Technical Events",
      items: ["Tech Symposium Setup", "Hackathon Production", "Exhibition Hall", "Sponsorship Display", "Registration Desk", "Stage for Speaker"],
    },
    {
      cat: "Sports Events",
      items: ["Sports Day Setup", "Awards & Trophies", "Commentator System", "LED Scoreboard", "Outdoor Stage", "Guest of Honour Protocol"],
    },
    {
      cat: "Production",
      items: ["Multi-Stage Setup", "Sound & Light", "Drone Coverage", "Photo & Video", "Social Media Wall", "Live Stream"],
    },
  ],
  processSteps: [
    { step: "01", title: "Fest Brief", desc: "Understand the theme, events, and budget.", icon: "ClipboardList" },
    { step: "02", title: "Concept", desc: "Design the visual identity and stage concept for your fest.", icon: "Palette" },
    { step: "03", title: "Stage Build", desc: "Multi-stage construction and AV installation.", icon: "Wrench" },
    { step: "04", title: "Rehearsals", desc: "Technical rehearsals with student performers.", icon: "Mic" },
    { step: "05", title: "Event Days", desc: "Full multi-day fest management with our crew.", icon: "PartyPopper" },
    { step: "06", title: "Coverage", desc: "Complete photo/video documentation delivered.", icon: "Video" },
  ],
  galleryFilters: ["Main Stage", "Dance", "Music Night", "Fashion Show", "Sports", "Crowd"],
  gallery: [
    { src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80", cat: "Main Stage", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80", cat: "Crowd", aspect: "square" },
    { src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80", cat: "Music Night", aspect: "tall" },
    { src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&q=80", cat: "Dance", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&q=80", cat: "Fashion Show", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80", cat: "Main Stage", aspect: "square" },
    { src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80", cat: "Music Night", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80", cat: "Crowd", aspect: "tall" },
  ],
  caseStudies: [
    {
      title: "Rendezvous — IIT Delhi Annual Fest",
      client: "IIT Delhi Students Union",
      venue: "IIT Delhi Campus",
      guests: 30000,
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
      review: "The production quality was on par with professional music festivals. Students were amazed.",
      highlight: "4-day fest with 3 stages, 15 celebrity acts, and drone light show finale",
      tags: ["Annual Fest", "IIT Delhi", "Celebrity Acts", "Multi-Stage"],
    },
    {
      title: "Spandan — Amity Cultural Festival",
      client: "Amity University",
      venue: "Amity Campus, Noida",
      guests: 15000,
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80",
      review: "Shiva Group Events delivered the best fest production we've ever had. Every night was a highlight.",
      highlight: "Fashion show runway built over the university swimming pool",
      tags: ["Cultural Fest", "Fashion Show", "Music", "Dance"],
    },
    {
      title: "Sports Day — DPS RK Puram",
      client: "DPS RK Puram School",
      venue: "School Campus, Delhi",
      guests: 5000,
      image: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80",
      review: "The LED scoreboard, commentary, and awards ceremony were exactly what our annual sports day needed.",
      highlight: "First school sports day with live LED scoreboard and professional commentary",
      tags: ["Sports Day", "School", "LED Scoreboard", "Commentary"],
    },
  ],
  testimonials: [
    {
      name: "Arjun Mehta, Fest Secretary",
      event: "Rendezvous Annual Fest",
      venue: "IIT Delhi",
      rating: 5,
      review: "Shiva Group Events handled 30,000 students across 4 days without a single issue. The production, artist management, and crowd control were all world-class.",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
      clientImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    },
  ],
  whyUs: [
    { icon: "GraduationCap", title: "College Specialists", desc: "200+ college events managed across IITs, NITs, DUs, and private universities." },
    { icon: "CircleDollarSign", title: "Student-Friendly Budgets", desc: "Premium production quality designed to fit college budgets." },
    { icon: "Zap", title: "High Energy Shows", desc: "We understand youth culture and deliver high-energy, trend-led events." },
    { icon: "Mic", title: "Artist Connections", desc: "Best pricing on celebrity bookings for college audiences." },
    { icon: "Smartphone", title: "Social Media Buzz", desc: "We design events that go viral on Instagram and YouTube." },
    { icon: "Award", title: "Competition Management", desc: "End-to-end management of inter-college competitions and tournaments." },
  ],
};

export default function CollegeFestivals() {
  useSEO({
    title: "College Festival Organizers in Meerut | Campus Events North India",
    description: "Shiva Group Events — leading college festival and campus event organizers in Meerut, UP & North India. Celebrity performances, EDM nights, inter-college competitions, and complete fest management for universities.",
    canonical: "/services/college-festivals",
    keywords: "college festival organizer Meerut, campus event company UP, college fest management North India, inter-college event organizer, university event company Meerut, EDM night organizer colleges",
    schema: [
      serviceSchema("College Festivals", "Expert college festival and campus event management in North India — celebrity shows, EDM nights, and complete fest organization.", "/services/college-festivals", "College Festivals"),
      breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: "College Festivals", url: "/services/college-festivals" }]),
    ],
  });
  return <CategoryPage config={config} />;
}
