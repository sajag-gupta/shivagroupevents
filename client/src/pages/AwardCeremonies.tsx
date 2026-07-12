import CategoryPage, { CategoryPageConfig } from "./CategoryPage";
import { useSEO, serviceSchema, breadcrumbSchema } from "@/lib/seo";

const config: CategoryPageConfig = {
  accentColor: "#F59E0B",
  categorySlug: "award-ceremonies",
  bgVideo: "/awardspage.mp4",
  bgImage: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1920&q=80",
  eyebrow: "Shiva Group Events · Prestige Awards Division",
  headline: "Award Ceremonies\nThat Inspire",
  subline: "Every accolade deserves a stage worthy of the achievement. We design award ceremonies that elevate brands, celebrate excellence, and create unforgettable recognition moments.",
  heroCTALabel: "View Our Work",
  statsLabel: "Award Nights Managed",
  stats: [
    { value: "150+", label: "Award Ceremonies" },
    { value: "10K+", label: "Awards Presented" },
    { value: "80+", label: "Industry Clients" },
    { value: "12+", label: "Years Experience" },
  ],
  services: [
    {
      cat: "Stage & Décor",
      items: ["Trophy Stage Design", "LED Backdrop", "Red Carpet Setup", "Step & Repeat Banners", "Gala Dinner Setup", "VIP Lounge"],
    },
    {
      cat: "Audio Visual",
      items: ["High-Def Screens", "Sound Design", "Live Camera Crew", "Highlight Reel", "Professional Photography", "Live Streaming"],
    },
    {
      cat: "Award Presentation",
      items: ["Award Reveal Concepts", "Trophy Handover", "Citation Reading", "Video Tribute", "Celebrity Presenter", "Winner Spotlight"],
    },
    {
      cat: "Event Experience",
      items: ["Emcee / Anchor", "Entertainment Act", "Cocktail Hour", "Gala Dinner", "After-Party", "Guest Gifting"],
    },
  ],
  processSteps: [
    { step: "01", title: "Categories", desc: "Define award categories and criteria with your team.", icon: "Award" },
    { step: "02", title: "Design", desc: "Custom stage, red carpet, and branding concept.", icon: "Palette" },
    { step: "03", title: "Production", desc: "AV, lighting, and video tribute production.", icon: "Film" },
    { step: "04", title: "Rehearsal", desc: "Full ceremony rehearsal with presenters.", icon: "Mic" },
    { step: "05", title: "Event Night", desc: "Seamless ceremony execution with live crew.", icon: "Sparkles" },
    { step: "06", title: "Highlights", desc: "Post-event video reel and photo delivery.", icon: "Video" },
  ],
  galleryFilters: ["Red Carpet", "Stage", "Trophy", "Gala Dinner", "Entertainment", "VIP"],
  gallery: [
    { src: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&q=80", cat: "Stage", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&q=80", cat: "Trophy", aspect: "square" },
    { src: "https://images.unsplash.com/photo-1560439513-74b037a25d84?w=600&q=80", cat: "Red Carpet", aspect: "tall" },
    { src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80", cat: "Gala Dinner", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80", cat: "Stage", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&q=80", cat: "Entertainment", aspect: "square" },
    { src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80", cat: "Trophy", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80", cat: "VIP", aspect: "square" },
    { src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80", cat: "Gala Dinner", aspect: "wide" },
  ],
  caseStudies: [
    {
      title: "National Business Excellence Awards",
      client: "Industry Federation",
      venue: "The Leela, Mumbai",
      guests: 1200,
      image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80",
      review: "The ceremony was presidential in its presentation. Every winner felt truly honoured.",
      highlight: "60-second personalised video tribute played before each award announcement",
      tags: ["National Awards", "Gala Dinner", "Video Tributes", "Celebrity Host"],
    },
    {
      title: "Real Estate Leadership Awards",
      client: "Property Council of India",
      venue: "JW Marriott, Delhi",
      guests: 800,
      image: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80",
      review: "The red carpet setup and stage design were world-class. The event exceeded our expectations.",
      highlight: "Hollywood-style red carpet entry with press wall and step-and-repeat",
      tags: ["Real Estate", "Red Carpet", "Press Coverage", "Networking"],
    },
    {
      title: "Healthcare Innovation Awards",
      client: "Medical Association",
      venue: "Taj Lands End, Mumbai",
      guests: 500,
      image: "https://images.unsplash.com/photo-1560439513-74b037a25d84?w=800&q=80",
      review: "The emotional video tributes before each award left the audience in tears. Beautifully done.",
      highlight: "Doctors honoured with family video messages on the big screen",
      tags: ["Healthcare", "Emotional Storytelling", "Gala", "Awards"],
    },
  ],
  testimonials: [
    {
      name: "Sanjay Kapoor, Event Director",
      event: "National Business Excellence Awards",
      venue: "The Leela, Mumbai",
      rating: 5,
      review: "Shiva Group Events handled every detail of our national award ceremony with precision and grace. The video tributes they produced brought the audience to their feet.",
      image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80",
      clientImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    },
  ],
  whyUs: [
    { icon: "Award", title: "Award Ceremony Experts", desc: "150+ award ceremonies managed across industries in India." },
    { icon: "Film", title: "In-House Video Production", desc: "We produce personalised video tributes and highlight reels in-house." },
    { icon: "Mic", title: "Celebrity Anchors", desc: "Access to top TV anchors and celebrity hosts for your ceremony." },
    { icon: "Sparkles", title: "Premium Décor", desc: "Luxury stage, red carpet, trophy display, and gala dinner styling." },
    { icon: "Tv", title: "Live Stream Ready", desc: "Broadcast-quality live streaming to unlimited online viewers." },
    { icon: "Camera", title: "Press Coverage", desc: "Media management, step-and-repeat walls, and press pack coordination." },
  ],
};

export default function AwardCeremonies() {
  useSEO({
    title: "Award Ceremony Organizers in Meerut & North India",
    description: "Shiva Group Events — premium award ceremony organizers in Meerut and North India. We design and execute red-carpet awards nights, corporate recognition events, and prestige galas with flawless production.",
    canonical: "/services/award-ceremonies",
    keywords: "award ceremony organizer Meerut, awards night management North India, corporate award event company UP, red carpet event organizer Delhi, recognition ceremony planner, gala night organizer Meerut",
    schema: [
      serviceSchema("Award Ceremonies", "Premium award ceremony organization in North India — red carpet events, corporate recognition nights, and prestige galas.", "/services/award-ceremonies", "Award Ceremonies"),
      breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: "Award Ceremonies", url: "/services/award-ceremonies" }]),
    ],
  });
  return <CategoryPage config={config} />;
}
