import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useGetService, useListPortfolio } from "@/lib/api";
import { GetIcon } from "@/components/GetIcon";
import { CinematicEventJourney, Chapter } from "@/components/CinematicEventJourney";
import { BehindEveryEvent } from "@/components/BehindEveryEvent";
import {
  Play,
  X,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  Camera,
  Music,
  Users,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle,
  Sparkles,
  Crown,
  Flame,
  Zap,
} from "lucide-react";

/* ─── DATA ──────────────────────────────────────────────────────────────────── */

const JOURNEY_STEPS = [
  { id: "engagement", label: "Engagement", icon: "Heart", color: "#C9A227" },
  { id: "haldi", label: "Haldi", icon: "Sparkles", color: "#F59E0B" },
  { id: "mehendi", label: "Mehendi", icon: "Sparkles", color: "#EC4899" },
  { id: "sangeet", label: "Sangeet", icon: "Music", color: "#8B5CF6" },
  { id: "cocktail", label: "Cocktail", icon: "GlassWater", color: "#06B6D4" },
  { id: "baraat", label: "Baraat", icon: "Compass", color: "#EF4444" },
  { id: "ceremony", label: "Wedding Ceremony", icon: "Flame", color: "#C9A227" },
  { id: "reception", label: "Reception", icon: "Sparkles", color: "#10B981" },
];

const WEDDING_TYPES = [
  {
    id: 1,
    title: "Royal Palace Wedding",
    subtitle: "Heritage venues · Regal décor · Timeless grandeur",
    description: "Magnificent heritage venues with royal décor, luxury lighting, traditional setups fit for royalty. We transform grand palaces into unforgettable wedding stages.",
    tags: ["Heritage Venues", "Royal Décor", "Luxury Lighting", "Traditional Setups"],
    image: "https://papajiphotography.com/assets/img/portfolio/wedding/nirav-purvakshi/1.webp",
    gallery: [
      "https://papajiphotography.com/assets/img/portfolio/wedding/nirav-purvakshi/3.webp",
      "https://papajiphotography.com/assets/img/portfolio/wedding/nirav-purvakshi/5.webp",
      "https://papajiphotography.com/assets/img/portfolio/wedding/nirav-purvakshi/10.webp",
      "https://papajiphotography.com/assets/img/portfolio/wedding/nirav-purvakshi/15.webp",
    ],
    color: "#C9A227",
  },
  {
    id: 2,
    title: "Luxury Destination Wedding",
    subtitle: "Beach · Resort · Mountain · Palace",
    description: "From Goa's sun-kissed beaches to Rajasthan's desert palaces — we orchestrate destination weddings that feel like a dream come true across India's most magical locations.",
    tags: ["Beach Weddings", "Resort Venues", "Mountain Settings", "Palace Destinations"],
    image: "https://korofilms.com/wp-content/uploads/2022/02/Vin-Sweet-Wedding-Doli-Logo-4-1200x800.jpg",
    gallery: [
      "https://primehouseproductions.com/wp-content/uploads/2024/05/kn_20-scaled.jpg",
      "https://korofilms.com/wp-content/uploads/2022/02/Vin-Sweet-Bride-Menhdi-Logo-1-1200x800.jpg",
      "https://korofilms.com/wp-content/uploads/2022/02/Vin-Sweet-Youngster-Party-Logo-1-1-1200x800.jpg",
      "https://korofilms.com/wp-content/uploads/2022/02/Vin-Sweet-Bride-Menhdi-Logo-5-1200x800.jpg",
    ],
    color: "#06B6D4",
  },
  {
    id: 3,
    title: "Traditional Indian Wedding",
    subtitle: "Sacred rituals · Mandap · Pheras",
    description: "Honouring every ritual with devotion — beautifully designed mandaps, pheras, and family traditions executed with cultural authenticity and artistic precision.",
    tags: ["Mandap Design", "Pheras Setup", "Family Rituals", "Cultural Décor"],
    image: "https://www.candidred.com/wp-content/uploads/2022/12/Candid-Red-Studios_Hindu_Wedding_Photography_01.jpg",
    gallery: [
      "https://www.candidred.com/wp-content/uploads/2022/12/Candid-Red-Studios_Hindu_Wedding_Photography_05.jpg",
      "https://www.candidred.com/wp-content/uploads/2022/12/Candid-Red-Studios_Hindu_Wedding_Photography_10.jpg",
      "https://www.candidred.com/wp-content/uploads/2022/12/Candid-Red-Studios_Hindu_Wedding_Photography_15.jpg",
      "https://www.candidred.com/wp-content/uploads/2022/12/Candid-Red-Studios_Hindu_Wedding_Photography_20.jpg",
    ],
    color: "#EF4444",
  },
  {
    id: 4,
    title: "Theme Wedding",
    subtitle: "Royal · Boho · Vintage · Garden · Floral",
    description: "Your story, your theme. From enchanting garden florals to vintage cinema, from boho dreamscapes to regal royal themes — we bring every creative vision to life.",
    tags: ["Royal Themes", "Boho Décor", "Vintage Style", "Garden & Floral"],
    image: "https://ryimage.pro/wp-content/uploads/2024/04/DD-4.jpg",
    gallery: [
      "https://ryimage.pro/wp-content/uploads/2024/04/DD-24.jpg",
      "https://ryimage.pro/wp-content/uploads/2024/04/DD-5.jpg",
      "https://ryimage.pro/wp-content/uploads/2024/04/DD-9.jpg",
      "https://ryimage.pro/wp-content/uploads/2024/04/DD-14.jpg",
    ],
    color: "#EC4899",
  },
  {
    id: 5,
    title: "Outdoor Garden Wedding",
    subtitle: "Natural lighting · Open lawns · Al fresco",
    description: "Nature as the backdrop. Lush lawns, open skies, and natural light create an ethereal setting for your ceremony, enhanced with elegant floral arrangements.",
    tags: ["Open Lawns", "Natural Light", "Floral Archways", "Al Fresco Dining"],
    image: "https://www.weddingsutra.com/images/wedding-images/desti_wed/ankur_saloni_01.jpg",
    gallery: [
      "https://image.wedmegood.com/resized/450X/uploads/member/464262/1629803785_Monika___Anil_631.jpeg",
      "https://images.wedmegood.com/wp-content/uploads/2018/12/W42.jpg",
      "https://images.wedmegood.com/wp-content/uploads/2025/04/Collage_Fotor14.jpg",
      "https://images.wedmegood.com/wp-content/uploads/2025/01/Collage.jpg",
    ],
    color: "#22C55E",
  },
];

const FUNCTIONS = [
  { id: 1, title: "Engagement / Ring Ceremony", icon: "Heart", desc: "Proposal stage · Ring exchange · Family moments", image: "https://korofilms.com/wp-content/uploads/2022/02/Vin-Sweet-Bride-Menhdi-Logo-1-1200x800.jpg" },
  { id: 2, title: "Haldi Ceremony", icon: "Sparkles", desc: "Haldi setup · Yellow décor · Flower shower", image: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/20.jpg" },
  { id: 3, title: "Mehendi Ceremony", icon: "Sparkles", desc: "Henna artists · Live music · Bride portraits", image: "https://papajiphotography.com/assets/img/portfolio/wedding/nirav-purvakshi/5.webp" },
  { id: 4, title: "Sangeet Night", icon: "Music", desc: "Dance performances · LED stage · Special effects", image: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/35.jpg" },
  { id: 5, title: "Cocktail Party", icon: "GlassWater", desc: "Luxury lounge · Bar setup · DJ", image: "https://ryimage.pro/wp-content/uploads/2024/04/DD-9.jpg" },
  { id: 6, title: "Baraat", icon: "Compass", desc: "Horse · Vintage car · Band · Dhol · Fireworks", image: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/08.jpg" },
  { id: 7, title: "Groom Welcome", icon: "PartyPopper", desc: "Tilak · Aarti · Flower shower", image: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/02.jpg" },
  { id: 8, title: "Bride Entry", icon: "Heart", desc: "Slow motion cinematic entry · Flower shower", image: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/10.jpg" },
  { id: 9, title: "Varmala", icon: "Sparkles", desc: "Emotional moments · Garland exchange", image: "https://www.candidred.com/wp-content/uploads/2022/12/Candid-Red-Studios_Hindu_Wedding_Photography_26.jpg" },
  { id: 10, title: "Wedding Ceremony", icon: "Flame", desc: "Mandap · Pheras · Sacred rituals", image: "https://www.candidred.com/wp-content/uploads/2022/12/Candid-Red-Studios_Hindu_Wedding_Photography_01.jpg" },
  { id: 11, title: "Vidaai", icon: "Heart", desc: "Emotional storytelling · Farewell", image: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/15.jpg" },
  { id: 12, title: "Reception", icon: "Sparkles", desc: "Luxury reception · Cake · Speeches", image: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/30.jpg" },
];

const SERVICES = [
  { cat: "Venue & Décor", items: ["Venue Selection", "Venue Decoration", "Floral Decoration", "Luxury Mandap Design", "Stage Design", "Lighting Design"] },
  { cat: "Audio & Visual", items: ["Sound System", "LED Wall Installation", "DJ Setup", "Live Streaming", "Drone Photography", "Cinematography"] },
  { cat: "Entertainment", items: ["Live Singer", "Celebrity Singer", "Anchor / Emcee", "Live Music Band", "Dhol Team", "Dance Performers", "Traditional Folk Artists"] },
  { cat: "Special Effects", items: ["Fireworks", "Cold Pyro", "CO₂ Effects", "Fog Effects", "Laser Show"] },
  { cat: "Entry Concepts", items: ["Bride Entry Concepts", "Groom Entry Concepts", "Baraat Management", "Horse", "Vintage Cars", "Luxury Cars", "Buggy"] },
  { cat: "Guest Experience", items: ["Guest Welcome", "Saafa Tying", "Garland Welcome", "Rose Petal Shower", "Welcome Girls", "Hospitality Desk", "VIP Management"] },
  { cat: "Operations", items: ["Guest Registration", "Crowd Management", "Security Team", "Parking Management", "Vendor Management", "Power Backup", "Emergency Medical"] },
  { cat: "Logistics", items: ["Accommodation", "Airport Pickup", "Hotel Coordination", "Transportation", "Timeline Management", "Complete Wedding Planning"] },
];

const PROCESS_STEPS = [
  { step: "01", title: "First Meeting", desc: "We listen to your story, understand your vision, and align on your dream wedding concept.", icon: "Handshake" },
  { step: "02", title: "Planning", desc: "Detailed planning document covering every function, service, vendor, and timeline.", icon: "ClipboardList" },
  { step: "03", title: "Venue Visit", desc: "Physical venue inspection, measurements, layout planning, and logistics assessment.", icon: "Building" },
  { step: "04", title: "Vendor Finalization", desc: "Curated vendor selection, contract negotiation, and quality assurance.", icon: "CheckCircle2" },
  { step: "05", title: "Production", desc: "Setup begins 2–3 days before. Our team manages every installation with precision.", icon: "Settings" },
  { step: "06", title: "Wedding Execution", desc: "Full event day management with a dedicated 50+ crew ensuring seamless execution.", icon: "Target" },
  { step: "07", title: "Post Event Support", desc: "Teardown, vendor payments, highlight video delivery, and final review.", icon: "Star" },
];

const BEHIND_SCENES = [
  { label: "Team Coordination", image: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/35.jpg", desc: "Walkie-talkie crew ensuring zero miscommunication" },
  { label: "Stage Inspection", image: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/50.jpg", desc: "Structural safety checks before every event" },
  { label: "Decoration Install", image: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/06.jpg", desc: "Overnight decoration setup by skilled artisans" },
  { label: "Sound Check", image: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/08.jpg", desc: "Professional AV calibration for perfect acoustics" },
  { label: "Drone Operations", image: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/45.jpg", desc: "Cinematic aerial coverage planning" },
  { label: "Guest Assistance", image: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/01.jpg", desc: "Dedicated hospitality crew for VIP guests" },
];

const FEATURED_WEDDINGS = [
  {
    id: 1,
    title: "The Royal Gupta Wedding",
    bride: "Priya",
    groom: "Arjun",
    venue: "Umaid Bhawan, Jodhpur",
    guests: 1800,
    budget: "₹2.5 Cr+",
    image: "https://payalfilms.in/wp-content/uploads/2026/05/payal-films-indian-bride-red-bridal-portrait-wedding-photography.jpg",
    review: "Shiva Group Events turned our wedding into a fairytale. Every detail was crafted to absolute perfection.",
    rating: 5,
    functions: ["Haldi", "Mehendi", "Sangeet", "Baraat", "Wedding", "Reception"],
    highlight: "Drone fireworks display during baraat entry",
    story: "The Gupta family desired a royal Rajasthan wedding with 1800 guests across 4 days. We managed 12 functions including celebrity performances, drone shows, and a custom-designed mandap.",
  },
  {
    id: 2,
    title: "The Malhotra Destination Wedding",
    bride: "Isha",
    groom: "Rohan",
    venue: "Leela Palace, Udaipur",
    guests: 600,
    budget: "₹1.8 Cr+",
    image: "https://primehouseproductions.com/wp-content/uploads/2024/05/kn_19-683x1024.jpg",
    review: "From the lake view baraat to the rose petal bride entry — each moment felt cinematic and magical.",
    rating: 5,
    functions: ["Cocktail", "Sangeet", "Baraat", "Ceremony", "Reception"],
    highlight: "Bride arrived on a boat across the lake",
    story: "A 3-day destination celebration at Udaipur's most iconic venue. The bride's entry across Lake Pichola became a viral moment.",
  },
  {
    id: 3,
    title: "The Sharma Grand Wedding",
    bride: "Divya",
    groom: "Vikram",
    venue: "Radisson Blu, Meerut",
    guests: 2200,
    budget: "₹3 Cr+",
    image: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/25.jpg",
    review: "2200 guests, flawless execution — not a single moment went wrong. The fireworks finale was epic!",
    rating: 5,
    functions: ["Haldi", "Mehendi", "Sangeet", "Baraat", "Wedding", "Reception"],
    highlight: "Simultaneous fireworks across 3 stages",
    story: "North India's largest wedding managed by Shiva Group Events with 2200 guests, 12 food stations, 3 simultaneous stages, and a 45-minute fireworks grand finale.",
  },
  {
    id: 4,
    title: "An Intimate Garden Wedding",
    bride: "Ananya",
    groom: "Rahul",
    venue: "Private Villa, Delhi NCR",
    guests: 150,
    budget: "₹45 Lakh",
    image: "https://ryimage.pro/wp-content/uploads/2024/04/DD-24.jpg",
    review: "Small but absolutely stunning. Every corner was Instagram-perfect. Our guests couldn't stop complimenting.",
    rating: 5,
    functions: ["Engagement", "Mehendi", "Ceremony", "Reception"],
    highlight: "Boho floral canopy ceremony under open sky",
    story: "A breathtaking intimate celebration for 150 loved ones with a boho floral theme, custom saree-inspired backdrop, and a live quartet for the ceremony.",
  },
  {
    id: 5,
    title: "The Celebrity Style Kapoor Wedding",
    bride: "Nisha",
    groom: "Dev",
    venue: "ITC Maurya, New Delhi",
    guests: 1200,
    budget: "₹5 Cr+",
    image: "https://payalfilms.in/wp-content/uploads/2026/05/indian-bride-red-lehenga-wedding-portrait-payal-films-scaled.jpeg",
    review: "People thought it was a Bollywood production. The LED stage reveal gave everyone goosebumps!",
    rating: 5,
    functions: ["Cocktail", "Sangeet", "Baraat", "Ceremony", "Reception"],
    highlight: "A-list celebrity singer performance at sangeet",
    story: "A celebrity-grade production with international sound systems, 80-foot curved LED wall, celebrity singer at sangeet, and a drone light show for the baraat.",
  },
  {
    id: 6,
    title: "The Traditional Agarwal Wedding",
    bride: "Kavya",
    groom: "Manish",
    venue: "Paras Mahal, Agra",
    guests: 900,
    budget: "₹90 Lakh",
    image: "https://www.makingthemoment.com/wordpress/wp-content/uploads/2020/03/MakingTheMoment_-SF_P_031.jpg",
    review: "The mandap design brought tears to our eyes. Every ritual was honoured beautifully.",
    rating: 5,
    functions: ["Haldi", "Mehendi", "Sangeet", "Baraat", "Wedding", "Reception"],
    highlight: "Triple-tiered mandap with 50,000 flowers",
    story: "A deeply traditional 4-day celebration with an awe-inspiring triple-tiered mandap featuring 50,000 imported flowers and sacred Vedic ceremony arrangements.",
  },
];

const WEDDINGS_CHAPTERS: Chapter[] = [
  {
    id: "ch01",
    number: "01",
    title: "The Vision Begins",
    quote: "Every unforgettable celebration begins long before the first guest arrives.",
    desc: "SGE pre-production crews inspect the vacant grounds at dawn, securing structure certifications and checking layout schematics.",
    video: "/wedding-video-ch-1.mp4",
    audioPath: "/wedding-audio-ch-1.mp3",
    operations: ["Site survey at 5 AM", "Vendor permit clearance check", "Safety structure verification", "Power backups lock"],
    chordFreqs: [146.83, 220.00, 277.18], // D3, A3, C#4 (Flute vibe chords)
  },
  {
    id: "ch02",
    number: "02",
    title: "Transformation",
    quote: "Your venue doesn't just get decorated. It gets reimagined.",
    desc: "250 floral workers, electricians, and fabricators coordinate over 72 hours to transform empty lawns into bespoke palaces.",
    video: "/wedding-video-ch-2.mp4",
    audioPath: "/wedding-audio-ch-2.mp3",
    operations: ["Floral trucks unloading", "Truss and lighting rigging", "Fabric styling & draping check", "LED test run"],
    chordFreqs: [146.83, 220.00, 277.18, 369.99], // D3, A3, C#4, F#4
  },
  {
    id: "ch03",
    number: "03",
    title: "The Details",
    quote: "Luxury is in the details nobody thinks to notice.",
    desc: "Handcrafted name cards, napkin folds, and crystal prisms are aligned with geometric precision to create curated aesthetics.",
    video: "/wedding-video-ch-3.mp4",
    audioPath: "/wedding-audio-ch-3.mp3",
    operations: ["Invitation cards alignment", "Napkin folds styling", "Silverware styling inspection", "Crystal prisms lock"],
    chordFreqs: [220.00, 277.18, 329.63, 440.00], // A3, C#4, E4, A4 (Soft piano)
  },
  {
    id: "ch04",
    number: "04",
    title: "The Anticipation",
    quote: "Your guests deserve an experience from the moment they arrive.",
    desc: "Valet briefings, hospitality hostess check-ins, and VVIP lounges ensure every guest is treated like royalty.",
    video: "/wedding-video-ch-4.mp4",
    audioPath: "/wedding-audio-ch-4.mp3",
    operations: ["Valet briefing complete", "Hospitality desk active", "VVIP lane marking validation", "Guest welcome drinks service"],
    chordFreqs: [220.00, 277.18, 329.63, 440.00, 554.37], // A3, C#4, E4, A4, C#5
  },
  {
    id: "ch05",
    number: "05",
    title: "The Grand Reveal",
    quote: "This is the moment they remember forever.",
    desc: "Curtains open, stage spotlights sweep, and the complete venue is revealed in all its grandeur before the crowds enter.",
    video: "/wedding-video-ch-5.mp4",
    audioPath: "/wedding-audio-ch-5.mp3",
    operations: ["Stage spotlight sweep lock", "Chandelier dimming sync", "Checklist run complete", "Contingency team briefing"],
    chordFreqs: [185.00, 277.18, 329.63, 440.00], // F#3, C#4, E4, A4 (Strings)
  },
  {
    id: "ch06",
    number: "06",
    title: "The Sacred Varmala",
    quote: "Some moments don't need words.",
    desc: "The bride enters under the phoolon ki chadar, father holds her hand, and cold pyro bursts as vows are spoken.",
    video: "/wedding-video-ch-6.mp4",
    audioPath: "/wedding-audio-ch-6.mp3",
    operations: ["Bride coordinators ready", "Drone camera tracking active", "Cold pyro sequence triggered", "Rose petal shower execution"],
    chordFreqs: [164.81, 246.94, 329.63, 392.00], // E3, B3, E4, G4 (Epic Strings)
  },
  {
    id: "ch07",
    number: "07",
    title: "Celebration",
    quote: "This is what six months of planning looks like in its final form.",
    desc: "High-energy dance floors, live celebrity bands, champagne cascades, and grand fireworks light up the night.",
    video: "/wedding-video-ch-7.mp4",
    audioPath: "/wedding-audio-ch-7.mp3",
    operations: ["DJ sound levels lock", "Celebrity artist briefing", "Fireworks cue sequence", "Buffet catering checks"],
    chordFreqs: [196.00, 293.66, 392.00, 493.88], // G3, D4, G4, B4 (Dhol/Percussion)
  },
  {
    id: "ch08",
    number: "08",
    title: "Memories",
    quote: "The event ends. The memory never does.",
    desc: "Family hugs, late-night tea lounges, and quiet goodbyes as the lights fade on a perfect day.",
    video: "/wedding-video-ch-8.mp4",
    audioPath: "/wedding-audio-ch-8.mp3",
    operations: ["Client handover signoff", "Media assets copy secure", "Hospitality logs close", "Venue return inspection"],
    chordFreqs: [130.81, 196.00, 261.63, 329.63], // C3, G3, C4, E4 (Solo piano fade)
  },
];

const VIDEO_CATEGORIES = ["Bride Entry", "Baraat", "Drone View", "Sangeet", "Reception", "Stage Reveal", "Fireworks", "Dance", "Venue Reveal"];

const VIDEO_GALLERY = [
  { cat: "Bride Entry", thumb: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/10.jpg", title: "Cinematic Slow-Mo Bride Entry" },
  { cat: "Baraat", thumb: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/08.jpg", title: "Baraat with Dhol & Fireworks" },
  { cat: "Drone View", thumb: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/45.jpg", title: "Aerial Venue Reveal" },
  { cat: "Sangeet", thumb: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/35.jpg", title: "Sangeet LED Performance" },
  { cat: "Reception", thumb: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/30.jpg", title: "Grand Reception Entrance" },
  { cat: "Stage Reveal", thumb: "https://payalfilms.in/wp-content/uploads/2026/05/payal-films-night-bridal-portrait-red-lehenga-indian-wedding.jpg", title: "Stage Curtain Drop Reveal" },
  { cat: "Fireworks", thumb: "https://payalfilms.in/wp-content/uploads/2025/08/payal-films-cinematic-wedding-couple-moment-bihar-scaled.jpg", title: "Grand Fireworks Finale" },
  { cat: "Dance", thumb: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/25.jpg", title: "Couple's First Dance" },
  { cat: "Venue Reveal", thumb: "https://www.candidred.com/wp-content/uploads/2022/12/Candid-Red-Studios_Hindu_Wedding_Photography_01.jpg", title: "Decorated Ballroom Reveal" },
  { cat: "Bride Entry", thumb: "https://www.candidred.com/wp-content/uploads/2022/12/Candid-Red-Studios_Hindu_Wedding_Photography_26.jpg", title: "Phool Barsha Entry" },
  { cat: "Baraat", thumb: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/03.jpg", title: "Vintage Car Baraat" },
  { cat: "Drone View", thumb: "https://primehouseproductions.com/wp-content/uploads/2024/05/kn_20-scaled.jpg", title: "Palace Venue Aerial" },
];

const PHOTO_CATEGORIES = ["All", "Bride", "Groom", "Couple", "Venue", "Décor", "Stage", "Mandap", "Dance", "Guests", "Lighting", "Night View", "Behind Scenes"];

const PHOTO_GALLERY = [
  { cat: "Bride", src: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/10.jpg", aspect: "tall" },
  { cat: "Venue", src: "https://www.candidred.com/wp-content/uploads/2022/12/Candid-Red-Studios_Hindu_Wedding_Photography_01.jpg", aspect: "wide" },
  { cat: "Décor", src: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/06.jpg", aspect: "square" },
  { cat: "Stage", src: "https://payalfilms.in/wp-content/uploads/2026/05/payal-films-night-bridal-portrait-red-lehenga-indian-wedding.jpg", aspect: "wide" },
  { cat: "Couple", src: "https://payalfilms.in/wp-content/uploads/2026/05/payal-films-indian-bride-red-bridal-portrait-wedding-photography.jpg", aspect: "tall" },
  { cat: "Mandap", src: "https://www.candidred.com/wp-content/uploads/2022/12/Candid-Red-Studios_Hindu_Wedding_Photography_26.jpg", aspect: "square" },
  { cat: "Night View", src: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/30.jpg", aspect: "wide" },
  { cat: "Dance", src: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/35.jpg", aspect: "square" },
  { cat: "Guests", src: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/01.jpg", aspect: "tall" },
  { cat: "Lighting", src: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/03.jpg", aspect: "wide" },
  { cat: "Bride", src: "https://papajiphotography.com/assets/img/portfolio/wedding/nirav-purvakshi/5.webp", aspect: "tall" },
  { cat: "Venue", src: "https://primehouseproductions.com/wp-content/uploads/2024/05/kn_20-scaled.jpg", aspect: "wide" },
  { cat: "Décor", src: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/15.jpg", aspect: "square" },
  { cat: "Groom", src: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/02.jpg", aspect: "tall" },
  { cat: "Behind Scenes", src: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/35.jpg", aspect: "square" },
  { cat: "Night View", src: "https://payalfilms.in/wp-content/uploads/2025/08/payal-films-cinematic-wedding-couple-moment-bihar-scaled.jpg", aspect: "wide" },
  { cat: "Couple", src: "https://korofilms.com/wp-content/uploads/2022/02/Vin-Sweet-Youngster-Party-Logo-1-1-1200x800.jpg", aspect: "square" },
  { cat: "Stage", src: "https://tasveerbyvipinbisht.com/wp-content/uploads/2025/07/08.jpg", aspect: "wide" },
];

const TESTIMONIALS = [
  { name: "Priya & Arjun Gupta", event: "Royal Palace Wedding", venue: "Udaipur", rating: 5, review: "Words cannot describe how flawlessly Shiva Group Events executed our wedding. From the grand mandap to the fireworks finale — every single moment was magazine-worthy perfection.", image: "https://ryimage.pro/wp-content/uploads/2024/04/DD-4.jpg", clientImg: "https://papajiphotography.com/assets/img/portfolio/wedding/nirav-purvakshi/20.webp" },
  { name: "Isha & Rohan Malhotra", event: "Destination Lake Wedding", venue: "Leela Palace, Udaipur", rating: 5, review: "Our boat bride entry made 600 guests emotional in silence. I still get calls from guests saying it's the most beautiful wedding they've ever attended. Thank you, Shiva Group!", image: "https://primehouseproductions.com/wp-content/uploads/2024/05/kn_26-1024x683.jpg", clientImg: "https://papajiphotography.com/assets/img/portfolio/wedding/nirav-purvakshi/30.webp" },
  { name: "Kavya & Manish Agarwal", event: "Traditional Grand Wedding", venue: "Agra", rating: 5, review: "The 50,000-flower mandap was beyond imagination. Our pandit said he'd never seen such a beautifully arranged sacred space. We are eternally grateful to the entire team.", image: "https://www.candidred.com/wp-content/uploads/2022/12/Candid-Red-Studios_Hindu_Wedding_Photography_01.jpg", clientImg: "https://papajiphotography.com/assets/img/portfolio/wedding/nirav-purvakshi/40.webp" },
];

const STATS = [
  { value: 500, suffix: "+", label: "Weddings Executed" },
  { value: 100000, suffix: "+", label: "Guests Managed" },
  { value: 50, suffix: "+", label: "Professional Vendors" },
  { value: 100, suffix: "%", label: "On-Time Execution" },
];

/* ─── SUB COMPONENTS ─────────────────────────────────────────────────────────── */

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const step = end / (duration * 60);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, end);
      setCount(Math.floor(current));
      if (current >= end) clearInterval(timer);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return <span ref={ref}>{count >= 1000 ? (count / 1000).toFixed(0) + "K" : count.toLocaleString()}</span>;
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return <p className="text-[#C9A227] text-xs tracking-[0.4em] uppercase mb-4 font-sans">{children}</p>;
}

function LightboxModal({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);
  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button className="absolute top-4 right-4 text-white/60 hover:text-white z-10" onClick={onClose}><X size={28} /></button>
      <motion.img
        src={src} alt="Gallery"
        className="max-w-full max-h-full object-contain"
        initial={{ scale: 0.85 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────────── */

export default function Weddings() {
  const [activeJourney, setActiveJourney] = useState("engagement");
  const [activeWeddingType, setActiveWeddingType] = useState<number | null>(null);
  const [activeFeatured, setActiveFeatured] = useState<number | null>(null);
  const [activeVideoCategory, setActiveVideoCategory] = useState("Bride Entry");
  const [activePhotoCategory, setActivePhotoCategory] = useState("All");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const { data: dbService } = useGetService("weddings");
  const { data: portfolioData } = useListPortfolio({ category: "luxury-weddings", published: true, limit: 50 } as any);

  const headline = dbService?.title || "Creating Weddings That Become Family Stories";
  const subline = dbService?.description || "From intimate ceremonies to grand destination weddings, we plan, design, execute, and manage every detail with absolute perfection.";
  const bgImage = dbService?.heroImage || "https://images.wedmegood.com/wp-content/uploads/2024/01/Collage_Fotor52.jpg";
  const bgVideo = dbService?.heroVideo || "/drone_aerial.mp4";

  // Process and flatten portfolio cover images + secondary gallery images
  const apiPhotos = (portfolioData?.items ?? []).flatMap(item => {
    const photos = [{
      src: item.coverImage,
      cat: item.title || "Wedding Design",
      aspect: "square" as const
    }];
    if (item.images && Array.isArray(item.images)) {
      item.images.forEach(img => {
        photos.push({
          src: img,
          cat: item.title || "Wedding Detail",
          aspect: "square" as const
        });
      });
    }
    return photos;
  });

  const displayPhotos = apiPhotos.length > 0 ? apiPhotos : PHOTO_GALLERY;

  const selectedWedding = WEDDING_TYPES.find(w => w.id === activeWeddingType);
  const selectedFeatured = FEATURED_WEDDINGS.find(w => w.id === activeFeatured);
  const filteredVideos = VIDEO_GALLERY.filter(v => activeVideoCategory === "All" || v.cat === activeVideoCategory);

  const filteredPhotos = displayPhotos.filter(p => {
    if (activePhotoCategory === "All") return true;
    // For database photos, check substring match in title/description metadata
    return p.cat.toLowerCase().includes(activePhotoCategory.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Drone Aerial Video Background */}
        <div className="absolute inset-0 z-0 bg-black">
          {bgVideo ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-55"
              key={bgVideo}
            >
              <source src={bgVideo} type="video/mp4" />
              <img
                src={bgImage}
                alt="Wedding Hero"
                className="w-full h-full object-cover"
              />
            </video>
          ) : (
            <img
              src={bgImage}
              alt="Wedding Hero"
              className="w-full h-full object-cover opacity-50"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/50 via-transparent to-[#0A0A0A]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/40 via-transparent to-[#0A0A0A]/20" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-[#C9A227]/40 to-transparent" />
        <div className="absolute top-1/4 right-8 w-px h-32 bg-gradient-to-b from-transparent via-[#C9A227]/40 to-transparent" />

        <motion.div
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.p
            className="text-[#C9A227] text-xs tracking-[0.5em] uppercase mb-6 font-sans font-semibold"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          >
            Shiva Group Events · Premium Wedding Division
          </motion.p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-8 whitespace-pre-line">
            {headline}
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-sans font-light leading-relaxed whitespace-pre-line">
            {subline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#featured">
              <span className="inline-flex items-center gap-2 px-10 py-4 bg-[#C9A227] text-black text-sm tracking-widest uppercase font-semibold cursor-pointer hover:bg-[#B8911E] transition-all duration-300">
                Explore Portfolio <ArrowRight size={16} />
              </span>
            </a>
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 px-10 py-4 border border-white/30 text-white text-sm tracking-widest uppercase cursor-pointer hover:border-[#C9A227] hover:text-[#C9A227] transition-all duration-300">
                Plan Your Wedding
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* ── CINEMATIC EVENT JOURNEY ────────────────────────────────────────── */}
      <CinematicEventJourney
        categoryName="Luxury Weddings"
        chapters={WEDDINGS_CHAPTERS}
        accentColor="#C9A227"
      />

      {/* ── 2. WEDDING JOURNEY TIMELINE ─────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTag>Complete Wedding Journey</SectionTag>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900">Every Function, Planned Perfectly</h2>
          </motion.div>

          {/* Timeline — horizontal scroll on mobile */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0">
              {JOURNEY_STEPS.map((step, i) => (
                <motion.button
                  key={step.id}
                  onClick={() => setActiveJourney(step.id)}
                  className={`relative flex flex-col items-center gap-3 px-4 py-4 group transition-all duration-300 ${activeJourney === step.id ? "scale-110" : "hover:scale-105"}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  {/* Dot */}
                  <div className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center text-3xl border-2 transition-all duration-300 ${activeJourney === step.id ? "border-[#C9A227] bg-[#C9A227]/10 shadow-[0_0_20px_rgba(201,162,39,0.2)]" : "border-gray-200 bg-white group-hover:border-[#C9A227]/50"}`}>
                    <GetIcon name={step.icon} color={activeJourney === step.id ? "#C9A227" : "#9CA3AF"} size={32} />
                  </div>
                  <p className={`text-xs tracking-widest uppercase font-sans transition-colors text-center ${activeJourney === step.id ? "text-[#C9A227]" : "text-gray-400 group-hover:text-gray-700"}`}>
                    {step.label}
                  </p>
                  {/* Arrow between steps */}
                  {i < JOURNEY_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-12 text-[#C9A227]/30 z-20">
                      <ChevronRight size={16} />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Active step detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeJourney}
              className="mt-12 p-8 bg-white border border-gray-100 shadow-sm text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {(() => {
                const step = JOURNEY_STEPS.find(s => s.id === activeJourney)!;
                return (
                  <>
                    <div className="flex justify-center mb-2">
                      <GetIcon name={step.icon} color="#C9A227" size={48} />
                    </div>
                    <h3 className="font-serif text-2xl text-gray-900 mt-4 mb-3">{step.label}</h3>
                    <p className="text-gray-500 text-sm font-sans">We manage every ritual, decoration, and moment of your <strong className="text-[#C9A227]">{step.label}</strong> with dedicated coordinators, specialized décor teams, and seamless vendor management.</p>
                    <Link href="/contact">
                      <span className="mt-6 inline-flex items-center gap-2 text-[#C9A227] text-xs tracking-widest uppercase cursor-pointer hover:gap-3 transition-all">
                        Enquire for {step.label} <ArrowRight size={14} />
                      </span>
                    </Link>
                  </>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── 3. OUR WEDDING SPECIALTIES ──────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTag>5 Premium Wedding Styles</SectionTag>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900">Our Wedding Specialties</h2>
            <p className="text-gray-400 mt-4 text-sm font-sans max-w-xl mx-auto">Every couple is unique. We specialize in 5 distinct wedding styles — each crafted with signature excellence.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
            {WEDDING_TYPES.map((wedding, i) => (
              <motion.div
                key={wedding.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
              >
                <div
                  className="group relative overflow-hidden cursor-pointer bg-white"
                  onClick={() => setActiveWeddingType(wedding.id)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={wedding.image} alt={wedding.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    {/* Number */}
                    <div className="absolute top-4 left-4 w-8 h-8 border border-[#C9A227]/40 flex items-center justify-center">
                      <span className="text-[#C9A227] text-xs font-serif">{String(wedding.id).padStart(2, "0")}</span>
                    </div>
                    {/* View Gallery pill */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="px-3 py-1 bg-[#C9A227] text-black text-xs tracking-widest uppercase font-semibold">View Gallery</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 bg-white border-t border-gray-100">
                    <h3 className="font-serif text-xl text-gray-900 mb-2 group-hover:text-[#C9A227] transition-colors">{wedding.title}</h3>
                    <p className="text-gray-400 text-xs tracking-wide mb-4 font-sans">{wedding.subtitle}</p>
                    <div className="flex flex-wrap gap-2">
                      {wedding.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 border border-gray-200 text-gray-500 font-sans">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Type Lightbox */}
      <AnimatePresence>
        {selectedWedding && (
          <motion.div
            className="fixed inset-0 z-[150] bg-black/95 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-6xl mx-auto px-6 py-12">
              <button onClick={() => setActiveWeddingType(null)} className="mb-8 flex items-center gap-2 text-white/50 hover:text-white text-sm tracking-widest uppercase font-sans transition-colors">
                <X size={16} /> Close
              </button>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <p className="text-[#C9A227] text-xs tracking-[0.4em] uppercase mb-3 font-sans">Wedding Type {String(selectedWedding.id).padStart(2, "0")}</p>
                  <h2 className="font-serif text-4xl text-white mb-4">{selectedWedding.title}</h2>
                  <p className="text-white/50 font-sans leading-relaxed mb-8">{selectedWedding.description}</p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {selectedWedding.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 border border-[#C9A227]/30 text-[#C9A227] text-xs tracking-widest uppercase font-sans">{tag}</span>
                    ))}
                  </div>
                  <Link href="/contact">
                    <span className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C9A227] text-black text-sm tracking-widest uppercase font-semibold cursor-pointer hover:bg-[#B8911E] transition-all">
                      Plan This Wedding <ArrowRight size={16} />
                    </span>
                  </Link>
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-2">
                    <img src={selectedWedding.image} alt={selectedWedding.title} className="col-span-2 aspect-video object-cover cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setLightboxSrc(selectedWedding.image)} />
                    {selectedWedding.gallery.map((img, i) => (
                      <img key={i} src={img} alt={`Gallery ${i}`} className="aspect-square object-cover cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setLightboxSrc(img)} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 4. FUNCTIONS WE MANAGE ──────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50" id="functions">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTag>Complete Coverage</SectionTag>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900">Functions We Manage</h2>
            <p className="text-gray-500 mt-4 text-sm font-sans max-w-xl mx-auto">From the first ritual to the final farewell — we orchestrate every function of your wedding with dedicated teams and specialised production.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {FUNCTIONS.map((fn, i) => (
              <motion.div
                key={fn.id}
                className="group relative overflow-hidden cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setLightboxSrc(fn.image)}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={fn.image} alt={fn.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-[#C9A227]/20 border border-[#C9A227]/60 flex items-center justify-center backdrop-blur-sm">
                      <Play size={16} className="text-[#C9A227] ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="mb-2">
                      <GetIcon name={fn.icon} color="#C9A227" size={24} />
                    </div>
                    <h3 className="font-serif text-sm text-white leading-tight mb-1">{fn.title}</h3>
                    <p className="text-white/40 text-xs font-sans leading-tight">{fn.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. EVENT MANAGEMENT SERVICES ────────────────────────────────────── */}
      <section className="py-24 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTag>40+ Specialised Services</SectionTag>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900">Event Management Services</h2>
            <p className="text-gray-500 mt-4 text-sm font-sans max-w-2xl mx-auto">Every element of your wedding handled under one roof — from fireworks to florals, celebrity singers to crowd control.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((cat, i) => (
              <motion.div
                key={cat.cat}
                className="bg-gray-50 border border-gray-100 p-6 hover:border-[#C9A227]/30 hover:bg-white hover:shadow-md transition-all duration-300 group rounded-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <h3 className="font-serif text-lg text-[#C9A227] mb-4 group-hover:text-[#D4AF37] transition-colors">{cat.cat}</h3>
                <ul className="space-y-2.5">
                  {cat.items.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle size={12} className="text-[#C9A227] mt-1 shrink-0 opacity-70" />
                      <span className="text-gray-600 text-xs font-sans leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. OUR EXECUTION PROCESS ─────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTag>How We Work</SectionTag>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900">Our Execution Process</h2>
          </motion.div>

          {/* Horizontal timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/20 to-transparent" />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
              {PROCESS_STEPS.map((s, i) => (
                <motion.div
                  key={s.step}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 }}
                >
                  <div className="relative z-10 w-20 h-20 rounded-full bg-white border border-[#C9A227]/20 flex flex-col items-center justify-center mb-4 hover:border-[#C9A227] transition-all duration-300 hover:shadow-[0_0_15px_rgba(201,162,39,0.2)]">
                    <GetIcon name={s.icon} color="#C9A227" size={24} />
                  </div>
                  <p className="text-[#C9A227] text-xs tracking-widest font-sans mb-1">{s.step}</p>
                  <h4 className="font-serif text-sm text-gray-900 mb-2">{s.title}</h4>
                  <p className="text-gray-500 text-xs font-sans leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. BEHIND THE SCENES ─────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTag>Documentary</SectionTag>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">Behind The Scenes</h2>
            <p className="text-gray-500 text-sm font-sans max-w-xl">The magic you see on wedding day is built by an invisible army working with precision 48 hours before. Here's a glimpse into our world.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BEHIND_SCENES.map((item, i) => (
              <motion.div
                key={item.label}
                className="group relative overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setLightboxSrc(item.image)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={item.image} alt={item.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0 transition-all" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-[#C9A227] text-xs tracking-widest uppercase font-sans mb-1">{item.label}</p>
                    <p className="text-white/60 text-sm font-sans">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FEATURED WEDDINGS ─────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50" id="featured">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTag>Case Studies</SectionTag>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900">Featured Weddings</h2>
            <p className="text-gray-500 mt-4 text-sm font-sans max-w-xl mx-auto">Real couples, real stories, extraordinary celebrations crafted by Shiva Group Events.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_WEDDINGS.map((wedding, i) => (
              <motion.div
                key={wedding.id}
                className="group cursor-pointer bg-white shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveFeatured(wedding.id)}
              >
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img src={wedding.image} alt={wedding.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  {/* Guest badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#C9A227]/20 border border-[#C9A227]/40 backdrop-blur-sm">
                    <span className="text-[#C9A227] text-xs font-sans">{wedding.guests.toLocaleString()} Guests</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[#C9A227] text-xs tracking-widest uppercase mb-2 font-sans">Luxury Wedding</p>
                    <h3 className="font-serif text-xl text-white mb-1">{wedding.title}</h3>
                    <p className="text-white/50 text-sm font-sans flex items-center gap-1"><MapPin size={12} /> {wedding.venue}</p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[#C9A227] text-xs tracking-widest uppercase font-sans flex items-center gap-2">View Case Study <ArrowRight size={12} /></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Wedding Modal */}
      <AnimatePresence>
        {selectedFeatured && (
          <motion.div
            className="fixed inset-0 z-[150] bg-black/80 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-5xl mx-auto px-6 py-12">
              <button onClick={() => setActiveFeatured(null)} className="mb-8 flex items-center gap-2 text-white/60 hover:text-white text-sm tracking-widest uppercase font-sans transition-colors">
                <X size={16} /> Back to Weddings
              </button>
              <div className="bg-white grid grid-cols-1 lg:grid-cols-2 overflow-hidden shadow-2xl rounded-sm text-gray-900">
                <div className="p-8 lg:p-12">
                  <img src={selectedFeatured.image} alt={selectedFeatured.title} className="w-full aspect-[4/3] object-cover mb-6 rounded-sm" />
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: selectedFeatured.rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-[#C9A227] text-[#C9A227]" />
                    ))}
                  </div>
                  <p className="text-gray-600 font-sans text-sm italic leading-relaxed">"{selectedFeatured.review}"</p>
                  <p className="text-[#C9A227] text-sm mt-3 font-sans font-semibold">— {selectedFeatured.bride} & {selectedFeatured.groom}</p>
                </div>
                <div className="p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-gray-100 flex flex-col justify-between">
                  <div>
                    <p className="text-[#C9A227] text-xs tracking-[0.4em] uppercase mb-3 font-sans font-semibold">Wedding Case Study</p>
                    <h2 className="font-serif text-3xl text-gray-900 mb-6">{selectedFeatured.title}</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { label: "Venue", value: selectedFeatured.venue },
                        { label: "Guests", value: selectedFeatured.guests.toLocaleString() },
                        { label: "Budget", value: selectedFeatured.budget },
                        { label: "Bride × Groom", value: `${selectedFeatured.bride} × ${selectedFeatured.groom}` },
                      ].map(({ label, value }) => (
                        <div key={label} className="p-4 bg-gray-50 border border-gray-100 rounded-sm">
                          <p className="text-gray-400 text-xs tracking-widest uppercase font-sans mb-1">{label}</p>
                          <p className="text-gray-900 text-sm font-serif">{value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mb-6">
                      <p className="text-gray-400 text-xs tracking-widest uppercase font-sans mb-3 font-semibold">Functions Managed</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedFeatured.functions.map(fn => (
                          <span key={fn} className="px-3 py-1 border border-gray-200 text-gray-600 text-xs font-sans rounded-sm">{fn}</span>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-[#C9A227]/5 border border-[#C9A227]/20 mb-6 rounded-sm">
                      <p className="text-[#C9A227] text-xs tracking-widest uppercase font-sans mb-2 font-semibold flex items-center gap-1.5"><Star size={14} className="fill-[#C9A227] text-[#C9A227]" /> Highlight Moment</p>
                      <p className="text-gray-700 text-sm font-sans">{selectedFeatured.highlight}</p>
                    </div>
                    <p className="text-gray-500 text-sm font-sans leading-relaxed">{selectedFeatured.story}</p>
                  </div>
                  <Link href="/contact">
                    <span className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 bg-[#C9A227] text-black text-sm tracking-widest uppercase font-semibold cursor-pointer hover:bg-[#B8911E] transition-all self-start">
                      Plan Your Wedding <ArrowRight size={16} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 9. CINEMATIC VIDEO GALLERY ───────────────────────────────────────── */}
      <section className="py-24 bg-white" id="videos">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTag>Cinematic Productions</SectionTag>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900">Video Gallery</h2>
          </motion.div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {VIDEO_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveVideoCategory(cat)}
                className={`px-4 py-2 text-xs tracking-widest uppercase font-sans transition-all duration-300 ${activeVideoCategory === cat ? "bg-[#C9A227] text-black" : "border border-gray-200 text-gray-400 hover:border-[#C9A227]/40 hover:text-gray-700"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            layout
          >
            <AnimatePresence>
              {filteredVideos.map((vid, i) => (
                <motion.div
                  key={vid.title}
                  className="group relative overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setLightboxSrc(vid.thumb)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img src={vid.thumb} alt={vid.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300" />
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-[#C9A227]/20 border-2 border-[#C9A227]/60 flex items-center justify-center backdrop-blur-sm group-hover:bg-[#C9A227]/40 group-hover:scale-110 transition-all duration-300">
                        <Play size={20} className="text-[#C9A227] ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-[#C9A227] text-xs tracking-widest uppercase font-sans mb-1">{vid.cat}</p>
                      <p className="text-white text-sm font-serif">{vid.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="text-center mt-10">
            <p className="text-gray-400 text-sm font-sans">25–40 videos will be embedded here. Sample thumbnails shown above.</p>
          </div>
        </div>
      </section>

      {/* ── 10. PHOTO GALLERY (MASONRY) ──────────────────────────────────────── */}
      <section className="py-24 bg-gray-50" id="photos">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTag>250–500 Photos</SectionTag>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900">Photo Gallery</h2>
          </motion.div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {PHOTO_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActivePhotoCategory(cat)}
                className={`px-4 py-2 text-xs tracking-widest uppercase font-sans transition-all duration-300 ${activePhotoCategory === cat ? "bg-[#C9A227] text-black" : "border border-gray-200 text-gray-400 hover:border-[#C9A227]/40 hover:text-gray-700"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry-style grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {filteredPhotos.map((photo, i) => (
              <motion.div
                key={`${photo.src}-${i}`}
                className="break-inside-avoid group cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.05 }}
                onClick={() => setLightboxSrc(photo.src)}
              >
                <div className={`relative overflow-hidden ${photo.aspect === "tall" ? "aspect-[2/3]" : photo.aspect === "wide" ? "aspect-[3/2]" : "aspect-square"}`}>
                  <img
                    src={photo.src} alt={photo.cat}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <Camera size={20} className="text-white opacity-0 group-hover:opacity-70 transition-opacity" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[#C9A227] text-xs tracking-widest uppercase font-sans">{photo.cat}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEHIND EVERY GRAND EVENT ───────────────────────────────────────── */}
      <BehindEveryEvent accentColor="#C9A227" />

      {/* ── 11. TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-white" id="reviews">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTag>Client Stories</SectionTag>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900">What Our Couples Say</h2>
          </motion.div>

          {/* Main testimonial */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden border border-gray-100 shadow-sm"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Image */}
              <div className="relative">
                <img src={TESTIMONIALS[activeTestimonial].image} alt="Wedding" className="w-full h-80 lg:h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white hidden lg:block" />
              </div>

              {/* Content */}
              <div className="p-10 lg:p-14 flex flex-col justify-center bg-gray-50">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: TESTIMONIALS[activeTestimonial].rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-[#C9A227] text-[#C9A227]" />
                  ))}
                </div>
                <blockquote className="font-serif text-xl md:text-2xl text-gray-800 leading-relaxed mb-8 italic">
                  "{TESTIMONIALS[activeTestimonial].review}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <img src={TESTIMONIALS[activeTestimonial].clientImg} alt="Client" className="w-12 h-12 rounded-full object-cover border border-[#C9A227]/30" />
                  <div>
                    <p className="text-gray-900 font-medium font-sans">{TESTIMONIALS[activeTestimonial].name}</p>
                    <p className="text-[#C9A227] text-xs font-sans">{TESTIMONIALS[activeTestimonial].event} · {TESTIMONIALS[activeTestimonial].venue}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button onClick={() => setActiveTestimonial(i => Math.max(0, i - 1))} className="text-gray-300 hover:text-gray-600 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-3">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} className={`transition-all duration-300 ${activeTestimonial === i ? "w-8 h-1 bg-[#C9A227]" : "w-4 h-1 bg-gray-200 hover:bg-gray-300"}`} />
              ))}
            </div>
            <button onClick={() => setActiveTestimonial(i => Math.min(TESTIMONIALS.length - 1, i + 1))} className="text-white/30 hover:text-white transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Google Review note */}
          <div className="text-center mt-8">
            <span className="text-gray-400 text-xs font-sans tracking-widest uppercase flex items-center justify-center gap-1.5"><Star size={14} className="fill-[#C9A227] text-[#C9A227]" /> 4.9/5 Rating · 200+ Google Reviews</span>
          </div>
        </div>
      </section>

      {/* ── 12. WHY CHOOSE US — STATS ────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTag>Why Choose Us</SectionTag>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900">North India's Most Trusted Wedding Company</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="font-serif text-5xl md:text-6xl text-[#C9A227] font-semibold mb-3">
                  <CountUp end={stat.value} />{stat.suffix}
                </p>
                <p className="text-gray-500 text-xs tracking-widest uppercase font-sans">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Why choose feature list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Crown, title: "Luxury Expertise", desc: "12+ years of crafting India's most prestigious weddings with an eye for every detail." },
              { icon: Users, title: "50+ Member Crew", desc: "Dedicated team of coordinators, decorators, technical crew and hospitality staff." },
              { icon: Zap, title: "On-Time Guarantee", desc: "100% on-time execution backed by military-grade timeline management." },
              { icon: Heart, title: "Personalized Planning", desc: "Your love story drives every decision. We build each wedding from scratch." },
              { icon: Sparkles, title: "Premium Vendors Only", desc: "Curated network of India's best photographers, florists, chefs, and performers." },
              { icon: Flame, title: "24×7 Support", desc: "Dedicated event managers available round-the-clock before, during and after your wedding." },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                className="flex gap-4 p-6 bg-white border border-gray-100 hover:border-[#C9A227]/30 hover:shadow-sm transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <div className="w-10 h-10 shrink-0 flex items-center justify-center border border-[#C9A227]/30">
                  <feat.icon size={18} className="text-[#C9A227]" />
                </div>
                <div>
                  <h4 className="font-serif text-gray-900 mb-2">{feat.title}</h4>
                  <p className="text-gray-500 text-sm font-sans leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13. MEDIA RECOMMENDATION NOTE ──────────────────────────────────── */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-xs tracking-widest uppercase font-sans mb-4">Content Placeholder Note</p>
          <p className="text-gray-500 text-sm font-sans leading-relaxed">
            This page is designed to hold <strong className="text-gray-700">25–40 real videos</strong>, <strong className="text-gray-700">250–500 photos</strong>, and <strong className="text-gray-700">20+ client testimonial videos</strong>.
            Replace sample Unsplash images with actual wedding footage. Embed YouTube/Vimeo links in the Video Gallery section.
          </p>
        </div>
      </section>

      {/* ── 14. CALL TO ACTION ───────────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.wedmegood.com/wp-content/uploads/2024/01/Collage_Fotor52.jpg" alt="Wedding CTA" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-[#0A0A0A]/90" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionTag>Begin Your Journey</SectionTag>
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
              Ready to Plan Your<br />
              <span className="text-[#C9A227]">Dream Wedding?</span>
            </h2>
            <p className="text-white/50 text-lg font-sans mb-12">Let's create memories that last a lifetime. Talk to our wedding specialists today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 px-10 py-5 bg-[#C9A227] text-black text-sm tracking-widest uppercase font-semibold cursor-pointer hover:bg-[#B8911E] transition-all duration-300">
                  Book Consultation <ArrowRight size={16} />
                </span>
              </Link>
              <a href="tel:+919897015153">
                <span className="inline-flex items-center gap-2 px-6 py-5 border border-white/20 text-white text-sm tracking-widest uppercase cursor-pointer hover:border-[#C9A227] hover:text-[#C9A227] transition-all duration-300">
                  <Phone size={16} /> Call: 98970 15153
                </span>
              </a>
              <a href="tel:+919219708567">
                <span className="inline-flex items-center gap-2 px-6 py-5 border border-white/20 text-white text-sm tracking-widest uppercase cursor-pointer hover:border-[#C9A227] hover:text-[#C9A227] transition-all duration-300">
                  <Phone size={16} /> Call: 92197 08567
                </span>
              </a>
              <a href="https://wa.me/919897015153" target="_blank" rel="noopener noreferrer">
                <span className="inline-flex items-center gap-2 px-6 py-5 border border-white/20 text-white text-sm tracking-widest uppercase cursor-pointer hover:border-green-500 hover:text-green-400 transition-all duration-300">
                  <MessageCircle size={16} /> WhatsApp: 98970 15153
                </span>
              </a>
              <a href="https://wa.me/919219708567" target="_blank" rel="noopener noreferrer">
                <span className="inline-flex items-center gap-2 px-6 py-5 border border-white/20 text-white text-sm tracking-widest uppercase cursor-pointer hover:border-green-500 hover:text-green-400 transition-all duration-300">
                  <MessageCircle size={16} /> WhatsApp: 92197 08567
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Lightbox */}
      <AnimatePresence>
        {lightboxSrc && <LightboxModal src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
      </AnimatePresence>
    </div>
  );
}
