import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Users } from "lucide-react";
import { useGetPortfolioItem, getGetPortfolioItemQueryKey } from "@/lib/api";

export default function PortfolioDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: item, isLoading, isError } = useGetPortfolioItem(slug ?? "", {
    query: { enabled: !!slug, queryKey: getGetPortfolioItemQueryKey(slug ?? "") },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="min-h-screen pt-20 bg-background flex flex-col items-center justify-center gap-4">
        <p className="font-serif text-2xl">Event not found</p>
        <Link href="/portfolio"><span className="text-primary text-sm cursor-pointer">← Back to Portfolio</span></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden">
        <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-primary text-xs tracking-widest uppercase mb-3">{item.category.replace(/-/g, " ")}</p>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-4">{item.title}</h1>
            <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-primary" />{item.location}</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary" />{item.eventDate}</span>
              {item.guestCount && <span className="flex items-center gap-1.5"><Users size={14} className="text-primary" />{item.guestCount.toLocaleString()} Guests</span>}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/portfolio">
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer mb-10">
            <ArrowLeft size={16} /> Back to Portfolio
          </span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p className="text-foreground/80 text-lg leading-relaxed mb-10">{item.description}</p>

          {item.story && (
            <div className="border-l-2 border-primary pl-8 mb-12">
              <p className="text-primary text-xs tracking-widest uppercase mb-4">The Story</p>
              <p className="font-serif text-xl text-foreground leading-relaxed">{item.story}</p>
            </div>
          )}
        </motion.div>

        {/* Image Gallery */}
        {item.images && item.images.length > 0 && (
          <div className="mt-12">
            <p className="text-primary text-xs tracking-widest uppercase mb-6">Gallery</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {item.images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.07 }}
                  className="aspect-square overflow-hidden"
                >
                  <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {item.clientName && (
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground text-sm">Client: <span className="text-foreground">{item.clientName}</span></p>
          </div>
        )}
      </div>
    </div>
  );
}
