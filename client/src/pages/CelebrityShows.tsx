import CategoryPage, { CategoryPageConfig } from "./CategoryPage";
import { useSEO, serviceSchema, breadcrumbSchema } from "@/lib/seo";

const config: CategoryPageConfig = {
  accentColor: "#A855F7",
  categorySlug: "celebrity-shows",
  bgVideo: "/celebrity_show.mp4",
  bgImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&q=80",
  eyebrow: "Shiva Group Events · Celebrity & Live Shows",
  headline: "Concerts & Shows\nThat Electrify",
  subline: "Celebrity concerts, live music events, and large-scale shows managed with concert-grade production. We bring your favourite artists to your stage.",
  heroCTALabel: "View Past Shows",
  statsLabel: "Shows Managed",
  stats: [
    { value: "200+", label: "Celebrity Shows" },
    { value: "500K+", label: "Audience Served" },
    { value: "50+", label: "Celebrity Performers" },
    { value: "25+", label: "Cities" },
  ],
  services: [
    {
      cat: "Artist Management",
      items: ["Celebrity Booking", "Contract Negotiation", "Rider Management", "Artist Travel", "Green Room Setup", "Backstage Management"],
    },
    {
      cat: "Stage Production",
      items: ["Concert Stage Design", "Truss & Rigging", "LED Wall & Screens", "Stage Lighting Design", "SFX & Pyro", "Stage Monitoring"],
    },
    {
      cat: "Sound & AV",
      items: ["Line Array PA System", "FOH Sound Engineer", "Monitor Engineer", "Wireless RF Systems", "IEM Systems", "Recording"],
    },
    {
      cat: "Event Operations",
      items: ["Crowd Management", "Security Deployment", "Gate Management", "Ticketing Support", "Medical Teams", "Emergency Planning"],
    },
  ],
  processSteps: [
    { step: "01", title: "Artist Booking", desc: "Source and book the right artist for your audience.", icon: "Mic" },
    { step: "02", title: "Stage Design", desc: "Custom concert stage concept and structural planning.", icon: "Wrench" },
    { step: "03", title: "Tech Advance", desc: "AV, lighting, and SFX planning with artist's technical team.", icon: "Zap" },
    { step: "04", title: "Load-In", desc: "Multi-day stage construction and equipment setup.", icon: "Truck" },
    { step: "05", title: "Sound Check", desc: "Artist sound check and full technical rehearsal.", icon: "Music" },
    { step: "06", title: "Show Night", desc: "Concert execution with our 100+ crew on the ground.", icon: "Sparkles" },
  ],
  galleryFilters: ["Stage", "Concert", "Artist", "Crowd", "SFX", "Lighting"],
  gallery: [
    { src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80", cat: "Stage", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&q=80", cat: "Concert", aspect: "square" },
    { src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80", cat: "SFX", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80", cat: "Crowd", aspect: "tall" },
    { src: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80", cat: "Lighting", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80", cat: "Artist", aspect: "square" },
    { src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80", cat: "Concert", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=80", cat: "Stage", aspect: "tall" },
    { src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80", cat: "Lighting", aspect: "square" },
  ],
  caseStudies: [
    {
      title: "Bollywood Night — 20,000 Audience",
      client: "State Tourism Board",
      venue: "Ramlila Ground, Delhi",
      guests: 20000,
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
      review: "The stage was enormous, the sound was perfect, and the pyro finale gave everyone goosebumbs.",
      highlight: "80-foot wide main stage with 200-foot LED span and 15-minute pyrotechnic finale",
      tags: ["Bollywood", "Outdoor Concert", "20K Audience", "Pyrotechnics"],
    },
    {
      title: "Private Celebrity Sangeet Performance",
      client: "Kapoor Family Wedding",
      venue: "ITC Maurya, Delhi",
      guests: 800,
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80",
      review: "The A-list celebrity performed for 45 minutes and the crowd went absolutely crazy. Perfect execution.",
      highlight: "A-list celebrity booking with full concert-grade production for a private wedding",
      tags: ["Private Event", "Celebrity Performance", "Concert Production", "Wedding"],
    },
    {
      title: "College Rock Festival",
      client: "University of Delhi",
      venue: "Talkatora Stadium",
      guests: 8000,
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
      review: "Three-stage simultaneous festival managed without a single hitch. The students were thrilled.",
      highlight: "Three simultaneous performance stages with a 8000-student audience",
      tags: ["College Fest", "Multi-Stage", "Rock Concert", "Youth Event"],
    },
  ],
  testimonials: [
    {
      name: "Deepak Verma, Cultural Secretary",
      event: "Bollywood Night Concert",
      venue: "Delhi",
      rating: 5,
      review: "Managing 20,000 people is no small feat. Shiva Group Events pulled it off perfectly — zero crowd incidents, amazing production, and the artists loved working with their team.",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
      clientImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    },
  ],
  whyUs: [
    { icon: "Mic", title: "Direct Artist Access", desc: "Established relationships with top Bollywood, Punjabi, and regional artists." },
    { icon: "Volume2", title: "Concert-Grade AV", desc: "We own d&b audiotechnik and L-Acoustics line array systems." },
    { icon: "Flame", title: "Pyro & SFX Experts", desc: "Licensed pyrotechnic team for indoor cold pyro and outdoor fireworks." },
    { icon: "Shield", title: "Crowd & Security", desc: "Trained crowd management and security force for large audiences." },
    { icon: "Globe", title: "Pan-India Shows", desc: "Concert tour management across 25+ cities simultaneously." },
    { icon: "Video", title: "Show Recording", desc: "Multi-camera recording and live streaming for unlimited digital reach." },
  ],
};

export default function CelebrityShows() {
  useSEO({
    title: "Celebrity Show Organizers in Meerut & North India | Bollywood Events",
    description: "Shiva Group Events — premium celebrity show organizers in North India. We manage Bollywood concerts, live music shows, celebrity events, and entertainment nights across Meerut, Delhi, Noida & more. Book top artists today.",
    canonical: "/services/celebrity-shows",
    keywords: "celebrity show organizer Meerut, Bollywood event organizer North India, celebrity concert management UP, live show organizer Delhi NCR, entertainment event company Meerut, Bollywood night organizer",
    schema: [
      serviceSchema("Celebrity & Live Shows", "Premium celebrity show and Bollywood event management in North India. Complete artist booking, stage production, and crowd management.", "/services/celebrity-shows", "Celebrity Events"),
      breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: "Celebrity Shows", url: "/services/celebrity-shows" }]),
    ],
  });
  return <CategoryPage config={config} />;
}
