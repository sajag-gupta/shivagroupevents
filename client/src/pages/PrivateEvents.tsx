import CategoryPage, { CategoryPageConfig } from "./CategoryPage";
import { useSEO, serviceSchema, breadcrumbSchema } from "@/lib/seo";

const config: CategoryPageConfig = {
  accentColor: "#EC4899",
  categorySlug: "private-events",
  bgImage: "https://images.unsplash.com/photo-1524824267900-2b35b8f38c1b?w=1920&q=80",
  eyebrow: "Shiva Group Events · Private Events",
  headline: "Your Private\nMoment, Perfected",
  subline: "Birthdays, anniversaries, private dinners, house parties, and milestone celebrations — crafted with the same luxury precision we bring to our grandest events.",
  heroCTALabel: "View Events",
  statsLabel: "Private Events",
  stats: [
    { value: "500+", label: "Private Events" },
    { value: "50K+", label: "Guests Hosted" },
    { value: "100%", label: "Personalised" },
    { value: "5★", label: "Client Rating" },
  ],
  services: [
    {
      cat: "Birthday Parties",
      items: ["Themed Décor", "Cake Design", "Entertainment", "DJ & Dance Floor", "Photo Booth", "Return Gifts"],
    },
    {
      cat: "Anniversaries",
      items: ["Romantic Setup", "Candlelight Dinner", "Flower Décor", "Live Music", "Photo Album", "Surprise Elements"],
    },
    {
      cat: "House Parties",
      items: ["Venue Transformation", "Cocktail Bar Setup", "Catering", "DJ", "LED Dance Floor", "Photo Wall"],
    },
    {
      cat: "Special Celebrations",
      items: ["Baby Shower", "Graduation Party", "Retirement Party", "Farewell Party", "Kitty Party", "Reunion Party"],
    },
  ],
  processSteps: [
    { step: "01", title: "Your Vision", desc: "Share your dream celebration concept with us.", icon: "Sparkles" },
    { step: "02", title: "Theme Design", desc: "We design a personalised theme just for you.", icon: "Palette" },
    { step: "03", title: "Vendor Setup", desc: "Décor, catering, entertainment, and cake organised.", icon: "Package" },
    { step: "04", title: "Setup", desc: "Full setup completed before your guests arrive.", icon: "Gift" },
    { step: "05", title: "Event Day", desc: "Dedicated coordinator ensures everything is perfect.", icon: "PartyPopper" },
    { step: "06", title: "Memories", desc: "Photos and videos delivered after the event.", icon: "Camera" },
  ],
  galleryFilters: ["Birthday", "Anniversary", "House Party", "Surprise", "Décor", "Night View"],
  gallery: [
    { src: "https://images.unsplash.com/photo-1524824267900-2b35b8f38c1b?w=600&q=80", cat: "Birthday", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?w=600&q=80", cat: "Décor", aspect: "square" },
    { src: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?w=600&q=80", cat: "Anniversary", aspect: "tall" },
    { src: "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=600&q=80", cat: "Night View", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80", cat: "House Party", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80", cat: "Surprise", aspect: "square" },
    { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80", cat: "Birthday", aspect: "wide" },
    { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80", cat: "Night View", aspect: "tall" },
  ],
  caseStudies: [
    {
      title: "Surprise 50th Birthday Party",
      client: "Sharma Family",
      venue: "Private Villa, Noida",
      guests: 120,
      image: "https://images.unsplash.com/photo-1524824267900-2b35b8f38c1b?w=800&q=80",
      review: "My wife had no idea until she walked in and saw 120 people. She cried. It was absolute perfection.",
      highlight: "Complete surprise setup — venue, décor, catering, guests — all managed secretly",
      tags: ["Surprise Party", "Birthday", "Private Villa", "Intimate"],
    },
    {
      title: "Golden Anniversary Dinner",
      client: "Patel Family",
      venue: "Rooftop Terrace, Gurgaon",
      guests: 80,
      image: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?w=800&q=80",
      review: "The candlelit rooftop, rose petal path, and live violin created a magical evening. Pure romance.",
      highlight: "Rooftop candlelight dinner with live violin quartet and 50-year photo exhibition",
      tags: ["Anniversary", "Rooftop", "Candlelight", "Live Music"],
    },
  ],
  testimonials: [
    {
      name: "Rohit Sharma",
      event: "Surprise Birthday Party",
      venue: "Noida",
      rating: 5,
      review: "I didn't believe they could pull off a complete surprise for 120 people — but they did, flawlessly. My wife's reaction was priceless. Shiva Group Events are magicians.",
      image: "https://images.unsplash.com/photo-1524824267900-2b35b8f38c1b?w=800&q=80",
      clientImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    },
  ],
  whyUs: [
    { icon: "Heart", title: "Personalised Planning", desc: "Every element designed around your unique story and preferences." },
    { icon: "Gift", title: "Surprise Experts", desc: "Masters of coordinating secret surprise parties without a single slip." },
    { icon: "Sparkles", title: "Premium Décor", desc: "Fresh flowers, luxury linens, and curated décor for every occasion." },
    { icon: "Utensils", title: "Custom Catering", desc: "Cuisine from simple home-style to 5-star gourmet menus." },
    { icon: "Camera", title: "Photography", desc: "Professional photo and video for all your precious moments." },
    { icon: "Music", title: "Entertainment", desc: "Live musicians, DJs, performers, and games for any crowd size." },
  ],
};

export default function PrivateEvents() {
  useSEO({
    title: "Private Event Planners in Meerut | Birthday, Anniversary & VIP Parties",
    description: "Shiva Group Events — premium private event planners in Meerut and North India. Expert birthday parties, anniversaries, engagement ceremonies, and VIP private gatherings with bespoke themes and luxury setups.",
    canonical: "/services/private-events",
    keywords: "private event planner Meerut, birthday party organizer Meerut, anniversary event planner UP, VIP party organizer North India, intimate celebration planner, private party company Meerut",
    schema: [
      serviceSchema("Private Events", "Premium private event planning in Meerut — birthday parties, anniversaries, engagement ceremonies, and VIP gatherings.", "/services/private-events", "Private Events"),
      breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: "Private Events", url: "/services/private-events" }]),
    ],
  });
  return <CategoryPage config={config} />;
}
