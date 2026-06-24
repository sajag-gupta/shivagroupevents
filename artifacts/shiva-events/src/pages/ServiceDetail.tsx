import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useGetService, getGetServiceQueryKey } from "@workspace/api-client-react";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: service, isLoading, isError } = useGetService(slug ?? "", {
    query: { enabled: !!slug, queryKey: getGetServiceQueryKey(slug ?? "") },
  });

  if (isLoading) {
    return <div className="min-h-screen pt-20 bg-background flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (isError || !service) {
    return (
      <div className="min-h-screen pt-20 bg-background flex flex-col items-center justify-center gap-4">
        <p className="font-serif text-2xl">Service not found</p>
        <Link href="/services"><span className="text-primary text-sm cursor-pointer">← Back to Services</span></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {service.heroImage ? (
        <div className="relative h-[50vh] overflow-hidden">
          <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute bottom-0 max-w-4xl mx-auto px-6 pb-12 left-0 right-0">
            <p className="text-primary text-xs tracking-widest uppercase mb-3">{service.category}</p>
            <h1 className="font-serif text-5xl text-foreground">{service.title}</h1>
          </div>
        </div>
      ) : (
        <div className="py-20 bg-foreground text-center">
          <p className="text-5xl mb-4">{service.icon}</p>
          <p className="text-primary text-xs tracking-widest uppercase mb-3">{service.category}</p>
          <h1 className="font-serif text-5xl text-background">{service.title}</h1>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/services">
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer mb-10">
            <ArrowLeft size={16} /> All Services
          </span>
        </Link>

        <p className="text-foreground/80 text-lg leading-relaxed mb-10">{service.description}</p>

        {service.longDescription && (
          <p className="text-muted-foreground leading-relaxed mb-10">{service.longDescription}</p>
        )}

        {service.features && service.features.length > 0 && (
          <div>
            <p className="text-primary text-xs tracking-widest uppercase mb-6">What's Included</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-4 border border-border">
                  <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80">{f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-14 p-8 bg-foreground text-center">
          <h3 className="font-serif text-2xl text-background mb-3">Interested in {service.title}?</h3>
          <p className="text-background/60 text-sm mb-6">Let's discuss your vision and create something extraordinary.</p>
          <Link href="/contact">
            <span className="inline-block px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase cursor-pointer hover:bg-primary/90 transition-colors">
              Get a Quote
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
