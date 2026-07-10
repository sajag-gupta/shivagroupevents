import CategoryPage, { CategoryPageConfig } from "./CategoryPage";

const config: CategoryPageConfig = {
  accentColor: "#3B82F6",
  categorySlug: "corporate-events",
  bgVideo: "/corporate_events.mp4",
  bgImage: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1920&q=80",
  eyebrow: "Shiva Group Events · Corporate Division",
  headline: "Where Business Meets\nBrilliance",
  subline: "From large-scale annual conferences to leadership summits and product launches — we deliver corporate events that inspire, engage, and leave lasting impressions.",
  heroCTALabel: "Explore Events",
  statsLabel: "Events Executed",
  stats: [
    { value: "300+", label: "Corporate Events" },
    { value: "50K+", label: "Delegates Managed" },
    { value: "100+", label: "Corporate Clients" },
    { value: "100%", label: "On-Time Delivery" },
  ],
  services: [
    {
      cat: "Conferences & Summits",
      items: ["Keynote Stage Setup", "Panel Discussion Setup", "Simultaneous Interpretation", "Live Streaming", "Q&A System", "Networking Zone"],
    },
    {
      cat: "Product Launches",
      items: ["Brand-Led Stage Design", "LED Wall & Lighting", "Media Coverage", "Press Invitation", "Product Display Setup", "Launch Moment FX"],
    },
    {
      cat: "Team Events",
      items: ["Team Building Activities", "Award Ceremony", "Annual Day", "Employee Recognition", "Corporate Dinner", "Entertainment Program"],
    },
    {
      cat: "Technical Production",
      items: ["Sound System", "LED Screens", "Wireless Mics", "Recording Studio", "Broadcast Setup", "Backup Power"],
    },
  ],
  processSteps: [
    { step: "01", title: "Brief", desc: "Understand your brand objectives, audience, and budget.", icon: "ClipboardList" },
    { step: "02", title: "Concept", desc: "Create a tailored event concept and design proposal.", icon: "Palette" },
    { step: "03", title: "Planning", desc: "Detailed timeline, vendor selection, and logistics plan.", icon: "Calendar" },
    { step: "04", title: "Tech Rehearsal", desc: "Full AV and stage rehearsal before the event day.", icon: "Volume2" },
    { step: "05", title: "Execution", desc: "Flawless event day with our on-ground team.", icon: "Target" },
    { step: "06", title: "Wrap-Up", desc: "Post-event reporting, recordings, and vendor settlement.", icon: "CheckCircle" },
  ],
  galleryFilters: ["Conference", "Product Launch", "Annual Day", "Team Building", "Award Ceremony", "Stage"],
  gallery: [
    { src: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&q=80", cat: "Conference", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", cat: "Conference", aspect: "square" },
    { src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80", cat: "Stage", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80", cat: "Product Launch", aspect: "tall" },
    { src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80", cat: "Annual Day", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&q=80", cat: "Award Ceremony", aspect: "square" },
    { src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80", cat: "Team Building", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", cat: "Conference", aspect: "tall" },
    { src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80", cat: "Annual Day", aspect: "square" },
    { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80", cat: "Stage", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=600&q=80", cat: "Product Launch", aspect: "square" },
    { src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80", cat: "Award Ceremony", aspect: "wide" },
  ],
  caseStudies: [
    {
      title: "National Sales Conference 2024",
      client: "Fortune 500 FMCG Brand",
      venue: "Hyatt Regency, Delhi",
      guests: 2000,
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80",
      review: "The AV setup was world-class. Delegates kept complimenting the production quality all day.",
      highlight: "60-foot LED curved stage with simultaneous 5-city live stream",
      tags: ["Conference", "Live Streaming", "Multi-City", "LED Stage"],
    },
    {
      title: "EV Product Launch Event",
      client: "Leading Automotive Group",
      venue: "Bombay Exhibition Centre",
      guests: 800,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
      review: "The product reveal moment with the drone cameras was absolutely spectacular. Media loved it.",
      highlight: "Drone camera fly-over product reveal with pyrotechnic effects",
      tags: ["Product Launch", "Drones", "Pyro Effects", "Press Coverage"],
    },
    {
      title: "Annual Leadership Awards Night",
      client: "Global IT Consulting Firm",
      venue: "ITC Grand Maratha, Mumbai",
      guests: 600,
      image: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80",
      review: "Every award moment felt cinematic and personal. The trophy presentation reveal was brilliant.",
      highlight: "Personalised video tribute before each award presentation",
      tags: ["Award Ceremony", "Corporate Gala", "Video Production", "Entertainment"],
    },
  ],
  testimonials: [
    {
      name: "Rajiv Mehra, VP Marketing",
      event: "National Sales Conference",
      venue: "Delhi",
      rating: 5,
      review: "Shiva Group Events handled our 2000-person national conference flawlessly. The production value was outstanding — our leadership team was genuinely impressed.",
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80",
      clientImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    },
    {
      name: "Priya Singh, HR Director",
      event: "Annual Day",
      venue: "Bengaluru",
      rating: 5,
      review: "Our employees couldn't stop talking about how well-organised and entertaining the annual day was. We'll definitely work with them again.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      clientImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    },
  ],
  whyUs: [
    { icon: "Building", title: "Corporate Specialists", desc: "10+ years exclusively managing Fortune 500 and mid-market corporate events." },
    { icon: "Radio", title: "Advanced AV Technology", desc: "We own and operate professional-grade LED walls, PA systems, and broadcast equipment." },
    { icon: "Globe", title: "Pan-India Presence", desc: "Event execution capability across 25+ cities in India simultaneously." },
    { icon: "Timer", title: "Zero Delay Policy", desc: "Military-grade timeline management ensures every session runs on schedule." },
    { icon: "Mic", title: "Top Speakers & Artists", desc: "Access to keynote speakers, motivators, artists, and corporate entertainers." },
    { icon: "BarChart2", title: "Post-Event Analytics", desc: "Detailed attendance, engagement, and media coverage report for every event." },
  ],
};

export default function CorporateEvents() {
  return <CategoryPage config={config} />;
}
