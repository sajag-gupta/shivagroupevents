import { db } from "./database.js";
import { servicesTable, portfolioTable, testimonialsTable } from "../models/index.js";
import { logger } from "../utils/logger.js";

export async function seedDatabase() {
  try {
    // 1. Seed Services
    const existingServices = await db.select().from(servicesTable).limit(1);
    if (existingServices.length === 0) {
      logger.info("Database is empty. Seeding default services...");
      await db.insert(servicesTable).values([
        {
          title: "Luxury Weddings",
          slug: "weddings",
          category: "Weddings",
          description: "Royal ceremonies crafted for eternity. Bespoke floral setups and grand designer entries designed around your dream themes.",
          longDescription: "Our wedding services cover everything from design, decor setup, lighting management, guest coordination, and artist booking. We ensure a grand and memorable wedding experience.",
          icon: "Heart",
          sortOrder: 1,
          features: ["Bespoke Floral Decor", "Stage & Entry Design", "VIP Hospitality Management", "Celebrity Artist Bookings"],
          heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
          heroVideo: "/weddingpage.mp4"
        },
        {
          title: "Corporate Events",
          slug: "corporate",
          category: "Corporate",
          description: "Where business meets brilliance. High-end corporate annual meets, stage fabrication, awards nights, and product launches.",
          longDescription: "We deliver flawless event production including high-end audio-visual systems, staging, LED backdrops, and complete guest coordinate setups.",
          icon: "Briefcase",
          sortOrder: 2,
          features: ["LED Backdrop Setup", "Flawless AV & Sound", "Stage Fabrication", "Emcee & Entertainment"],
          heroImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
          heroVideo: "/corporate_events.mp4"
        },
        {
          title: "Celebrity & Live Shows",
          slug: "celebrity-shows",
          category: "Celebrity Shows",
          description: "Concerts & shows that electrify. Live celebrity gigs, multi-city roadshows, and cultural festivals managed flawlessly.",
          longDescription: "End-to-end concert production including artist hospitality, security planning, crowd management, and light shows.",
          icon: "Music",
          sortOrder: 3,
          features: ["Artist Booking & Liaison", "Security & Crowd Control", "Stage Lights & Laser Shows", "Ticketing & RSVP Setup"],
          heroImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80",
          heroVideo: "/celebrity_show.mp4"
        },
        {
          title: "Award Ceremonies",
          slug: "award-ceremonies",
          category: "Award Ceremonies",
          description: "Recognition moments that inspire. Premium trophies setups, celebrity hosts, and flawless stage management.",
          longDescription: "Complete award night design with customized screen graphics, background themes, custom lights, sound, and VIP hosting.",
          icon: "Award",
          sortOrder: 4,
          features: ["Graphic Stage Production", "Nomination Video Design", "Celebrity Guests coordination", "Premium AV & Lightings"],
          heroImage: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1200&q=80",
          heroVideo: "/awardspage.mp4"
        },
        {
          title: "Concerts",
          slug: "concerts",
          category: "Concerts",
          description: "Live music that moves every soul. Arena design, ticketing coordination, and world-class line-array sound systems.",
          longDescription: "High-octane sound and light design, truss layouts, crowd control setups, and artist backstage hospitality design.",
          icon: "Music",
          sortOrder: 5,
          features: ["Line-Array Sound Systems", "Arena Production", "Truss & Lighting Rigging", "Crowd Barriers & Security"],
          heroImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&q=80",
          heroVideo: "/concertspage.mp4"
        },
        {
          title: "Brand Activations",
          slug: "brand-activations",
          category: "Brand Activations",
          description: "Activations that amplify brands. High-impact experiential booths, roadshows, and interactive setups.",
          longDescription: "Engage your customers with high-quality custom fabrications, LED setups, promoter integrations, and campaign reporting.",
          icon: "Megaphone",
          sortOrder: 6,
          features: ["Experiential Booths Design", "Trademall setup & fabrication", "Promoters & Hosts Liaison", "Interactive Tech Activations"],
          heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
          heroVideo: "/brand-activation.mp4"
        },
        {
          title: "Private Events",
          slug: "private-events",
          category: "Private Events",
          description: "Your private moment, perfected. Milestone birthdays, anniversaries, and VIP private bashes.",
          longDescription: "Tailor-made private parties with custom theme design, top catering configurations, DJ bookings, and premium venue selection.",
          icon: "GlassWater",
          sortOrder: 7,
          features: ["Custom Thematic decor", "Catering & Beverage coordination", "Live DJ & Sound setups", "Guest lists & VIP hosting"],
          heroImage: "https://images.unsplash.com/photo-1524824267900-2b35b8f38c1b?w=1200&q=80",
          heroVideo: "/private_event.mp4"
        },
        {
          title: "College Festivals",
          slug: "college-festivals",
          category: "College Festivals",
          description: "College fests that build legends. High-energy celebrity singer nights, EDM staging, and youth events.",
          longDescription: "Flawless staging, artist security, campus coordination, sound systems, and laser shows for massive student gatherings.",
          icon: "GraduationCap",
          sortOrder: 8,
          features: ["Massive Stage & AV Systems", "Celebrity Artist Management", "Trussing & Laser Lights", "Pan-India College Liaison"],
          heroImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&q=80",
          heroVideo: "/College-Festivals.mp4"
        }
      ]);
    }

    // 2. Seed Portfolio Items
    const existingPortfolio = await db.select().from(portfolioTable).limit(1);
    if (existingPortfolio.length === 0) {
      logger.info("Seeding default portfolio items...");
      await db.insert(portfolioTable).values([
        {
          title: "A Royal Palace Wedding in Meerut",
          slug: "royal-palace-wedding-meerut",
          category: "luxury-weddings",
          coverImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
          images: [
            "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80"
          ],
          location: "Meerut, UP",
          eventDate: "November 2024",
          description: "A gorgeous palace-themed wedding decoration designed with grand entry setups and exotic florals.",
          story: "The Gupta wedding was set in a luxury resort. The client desired a regal, royal aesthetic. We designed custom archways, imported orchids, and established a multi-tiered crystal chandelier entry.",
          clientName: "Gupta Family",
          guestCount: 1800,
          featured: true,
          published: true
        },
        {
          title: "Premium Tech Summit 2024",
          slug: "premium-tech-summit-2024",
          category: "corporate-events",
          coverImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
          images: [
            "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80"
          ],
          location: "Noida, Delhi NCR",
          eventDate: "October 2024",
          description: "Production and stage setup for an annual corporate summit serving leading global technology partners.",
          story: "We designed a custom 60-foot curved LED screen, absolute sound cancellation stages, and managed dynamic laser entries for product reveals.",
          clientName: "TechCorp Global",
          guestCount: 650,
          featured: true,
          published: true
        },
        {
          title: "Celebrity Live Night Show",
          slug: "celebrity-live-night-show",
          category: "celebrity-shows",
          coverImage: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80",
          images: [
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80"
          ],
          location: "Delhi, India",
          eventDate: "December 2024",
          description: "A high-octane live concert with international standard light setup, AV production, and VIP hosting.",
          story: "This show required top-tier crowd control systems, barricades, multi-level stages, and custom LED backdrop animations synched directly to the live tracks.",
          clientName: "Shiva Entertainment",
          guestCount: 5000,
          featured: true,
          published: true
        }
      ]);
    }

    // 3. Seed Testimonials
    const existingTestimonials = await db.select().from(testimonialsTable).limit(1);
    if (existingTestimonials.length === 0) {
      logger.info("Seeding default testimonials...");
      await db.insert(testimonialsTable).values([
        {
          clientName: "Rajesh & Ritu Verma",
          designation: "Parents of the Bride",
          eventType: "Luxury Wedding",
          rating: 5,
          content: "Shiva Group Events turned our daughter's wedding into a literal fairytale. The entry setups, flower decorations, and service coordination were absolutely perfect. Highly recommended!",
          photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
          published: true
        },
        {
          clientName: "Vikram Malhotra",
          designation: "VP HR",
          company: "Axis Logistics Solutions",
          eventType: "Corporate Meet",
          rating: 5,
          content: "The annual meet was executed flawlessly. The sound setup, curved screens, and stage entry transitions were world-class. Thank you for a premium experience.",
          photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
          published: true
        }
      ]);
    }
  } catch (error) {
    logger.error({ error }, "Error seeding database");
  }
}
