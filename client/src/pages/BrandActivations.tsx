import CategoryPage, { CategoryPageConfig } from "./CategoryPage";

const config: CategoryPageConfig = {
  accentColor: "#10B981",
  categorySlug: "brand-activations",
  bgImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
  eyebrow: "Shiva Group Events · Brand Activations",
  headline: "Activations That\nAmplify Brands",
  subline: "360° brand activation experiences that create real connections between your brand and its audience — on-ground, in-mall, at events, or at scale across cities.",
  heroCTALabel: "See Activations",
  statsLabel: "Brands Activated",
  stats: [
    { value: "250+", label: "Brand Activations" },
    { value: "1M+", label: "Consumer Touchpoints" },
    { value: "75+", label: "Brand Clients" },
    { value: "25+", label: "Cities" },
  ],
  services: [
    {
      cat: "On-Ground Activation",
      items: ["Mall Activations", "Market Activations", "Road Shows", "Pop-Up Stalls", "Brand Sampling", "Consumer Engagement"],
    },
    {
      cat: "Event Branding",
      items: ["Branded Stage", "Experiential Zones", "Photobooth Setup", "LED Brand Display", "Brand Ambassador Hiring", "Uniform Branding"],
    },
    {
      cat: "Digital Integration",
      items: ["Social Media Wall", "Hashtag Campaign", "AR/VR Experiences", "Interactive Kiosks", "QR Code Campaigns", "Data Capture"],
    },
    {
      cat: "Logistics & Ops",
      items: ["Multi-City Rollout", "Van Branding", "Setup & Teardown", "Field Team Management", "Reporting & Analytics", "Brand Safety"],
    },
  ],
  processSteps: [
    { step: "01", title: "Brand Briefing", desc: "Deep dive into brand objectives, target audience, and KPIs.", icon: "BarChart2" },
    { step: "02", title: "Concept", desc: "Creative activation concept and experience design.", icon: "Lightbulb" },
    { step: "03", title: "Fabrication", desc: "Design and build branded stalls, kiosks, and displays.", icon: "Wrench" },
    { step: "04", title: "Team Hiring", desc: "Hire and train brand ambassadors for the activation.", icon: "Users" },
    { step: "05", title: "Activation", desc: "On-ground activation execution with real-time reporting.", icon: "Rocket" },
    { step: "06", title: "Report", desc: "Post-activation analytics, photos, and impact report.", icon: "TrendingUp" },
  ],
  galleryFilters: ["Mall Activation", "Pop-Up", "Road Show", "Stage Branding", "Photobooth", "Experiential"],
  gallery: [
    { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", cat: "Mall Activation", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80", cat: "Pop-Up", aspect: "square" },
    { src: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=600&q=80", cat: "Stage Branding", aspect: "tall" },
    { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80", cat: "Experiential", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80", cat: "Road Show", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80", cat: "Photobooth", aspect: "square" },
    { src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80", cat: "Mall Activation", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80", cat: "Stage Branding", aspect: "tall" },
  ],
  caseStudies: [
    {
      title: "FMCG Summer Sampling Drive",
      client: "Leading Beverage Brand",
      venue: "50 Locations · Pan India",
      guests: 50000,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      review: "50,000 samples distributed across 50 cities in 2 weeks. The field team was professional and brand-aligned.",
      highlight: "50 simultaneous city activations with 100-person field team",
      tags: ["Sampling Drive", "Pan-India", "Multi-City", "FMCG"],
    },
    {
      title: "EV Brand Pop-Up Mall Tour",
      client: "Electric Vehicle Startup",
      venue: "25 Premium Malls · India",
      guests: 25000,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
      review: "The interactive AR experience in our pop-up stall generated massive buzz. The leads quality was excellent.",
      highlight: "AR test-drive simulation booth in 25 premium malls across India",
      tags: ["EV Brand", "AR Experience", "Mall Pop-Up", "Lead Generation"],
    },
  ],
  testimonials: [
    {
      name: "Neha Bhatt, Brand Manager",
      event: "Summer Sampling Drive",
      venue: "Pan India",
      rating: 5,
      review: "Executing a 50-city simultaneous activation felt impossible — Shiva Group Events made it seamless. Real-time reports, on-brand execution, and fantastic consumer feedback.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      clientImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    },
  ],
  whyUs: [
    { icon: "Globe", title: "Pan-India Network", desc: "On-ground activation capability across 25+ cities simultaneously." },
    { icon: "Users", title: "Brand Ambassador Pool", desc: "500+ trained brand ambassadors available across India for quick deployment." },
    { icon: "BarChart2", title: "Real-Time Reporting", desc: "Live dashboards tracking impressions, leads, and consumer touchpoints." },
    { icon: "Wrench", title: "In-House Fabrication", desc: "Custom stall design and build with our in-house fabrication team." },
    { icon: "Lightbulb", title: "Creative Concepts", desc: "Award-winning creative team designing immersive brand experiences." },
    { icon: "Smartphone", title: "Digital Integration", desc: "Seamless social media wall, AR, and data capture integration." },
  ],
};

export default function BrandActivations() {
  return <CategoryPage config={config} />;
}
