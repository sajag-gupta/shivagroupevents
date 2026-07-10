import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Components
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ChatBot } from "@/components/ChatBot";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ExperienceProvider } from "@/context/ExperienceContext";
import { ParticleCanvas } from "@/components/ParticleCanvas";
import { AudioEngine } from "@/components/AudioEngine";

// Pages
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Cities from "@/pages/Cities";

// Category Service Pages
import Weddings from "@/pages/Weddings";
import CorporateEvents from "@/pages/CorporateEvents";
import CelebrityShows from "@/pages/CelebrityShows";
import AwardCeremonies from "@/pages/AwardCeremonies";
import Concerts from "@/pages/Concerts";
import BrandActivations from "@/pages/BrandActivations";
import PrivateEvents from "@/pages/PrivateEvents";
import CollegeFestivals from "@/pages/CollegeFestivals";

// Admin
import AdminLayout from "@/components/admin/AdminLayout";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminLeads from "@/pages/admin/Leads";
import AdminPortfolio from "@/pages/admin/Portfolio";
import AdminTestimonials from "@/pages/admin/Testimonials";
import AdminServices from "@/pages/admin/Services";

import { useGetService } from "@/lib/api";
import CategoryPage, { CategoryPageConfig } from "@/pages/CategoryPage";

function DynamicServicePage({ slug }: { slug: string }) {
  const { data: service, isLoading, error } = useGetService(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !service) {
    return <NotFound />;
  }

  const config: CategoryPageConfig = {
    accentColor: "#C9A227",
    categorySlug: service.slug,
    bgVideo: service.heroVideo || undefined,
    bgImage: service.heroImage || "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80",
    eyebrow: `Shiva Group Events · ${service.category || "Specialist Division"}`,
    headline: service.title,
    subline: service.description,
    heroCTALabel: "Enquire Now",
    statsLabel: "Events Executed",
    stats: [
      { value: "150+", label: "Successful Events" },
      { value: "100%", label: "Satisfaction Rate" },
    ],
    services: [
      {
        cat: "Core Deliverables",
        items: service.features && service.features.length > 0 ? service.features : ["Premium Production", "Bespoke Styling", "On-Ground Management"],
      },
    ],
    galleryFilters: ["Gallery"],
    gallery: [],
    caseStudies: [],
    testimonials: [],
    processSteps: [
      { step: "01", title: "Briefing", desc: "Understand your objectives and design requirements.", icon: "📋" },
      { step: "02", title: "Concept", desc: "Tailored concept designs and budget planning.", icon: "🎨" },
      { step: "03", title: "Setup", desc: "Premium staging and fabrication process.", icon: "🛠️" },
      { step: "04", title: "Execution", desc: "Flawless on-ground coordination and show run.", icon: "🎯" }
    ],
    whyUs: [
      { icon: "🏢", title: "Event Specialists", desc: "Years of experience in premium event productions." },
      { icon: "📡", title: "Tech Mastery", desc: "Access to advanced audio-visual layouts and staging." }
    ],
  };

  return <CategoryPage config={config} />;
}

const queryClient = new QueryClient();

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col relative">
      <ScrollToTop />
      <Navbar />
      <ParticleCanvas />
      <AudioEngine />
      <main className="flex-1 z-10 relative">{children}</main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin">
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      </Route>
      <Route path="/admin/:*">
        <AdminLayout>
          <Switch>
            <Route path="/admin/leads" component={AdminLeads} />
            <Route path="/admin/services" component={AdminServices} />
            <Route path="/admin/portfolio" component={AdminPortfolio} />
            <Route path="/admin/testimonials" component={AdminTestimonials} />
            <Route component={NotFound} />
          </Switch>
        </AdminLayout>
      </Route>

      {/* Public Routes */}
      <Route path="/*">
        <MainLayout>
          <Switch>
            <Route path="/" component={Home} />

            {/* Redirect old /portfolio routes → /services */}
            <Route path="/portfolio">
              <Redirect to="/services" />
            </Route>
            <Route path="/portfolio/:slug">
              <Redirect to="/services" />
            </Route>

            <Route path="/services" component={Services} />
            <Route path="/services/weddings" component={Weddings} />
            <Route path="/services/corporate" component={CorporateEvents} />
            <Route path="/services/celebrity-shows" component={CelebrityShows} />
            <Route path="/services/award-ceremonies" component={AwardCeremonies} />
            <Route path="/services/concerts" component={Concerts} />
            <Route path="/services/brand-activations" component={BrandActivations} />
            <Route path="/services/private-events" component={PrivateEvents} />
            <Route path="/services/college-festivals" component={CollegeFestivals} />
            
            {/* Dynamic fallback for custom admin-created services */}
            <Route path="/services/:slug">
              {({ slug }) => <DynamicServicePage slug={slug} />}
            </Route>

            <Route path="/contact" component={Contact} />
            <Route path="/about" component={About} />
            <Route path="/cities" component={Cities} />
            <Route component={NotFound} />
          </Switch>
        </MainLayout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter>
          <ExperienceProvider>
            <Router />
            {/* Floating widgets — shown on all public pages */}
            <WhatsAppButton />
            <ChatBot />
          </ExperienceProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
