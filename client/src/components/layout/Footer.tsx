import { Link } from "wouter";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useGetSettings } from "@/lib/api";

const logoImg = "/logo.png";

const services = ["Luxury Weddings", "Corporate Events", "Social Celebrations", "Entertainment Management", "Event Production", "Technical Solutions"];
const cities = ["Meerut", "Delhi", "Noida", "Greater Noida", "Ghaziabad", "Gurugram", "Faridabad", "Jaipur", "Chandigarh", "Dehradun"];

export function Footer() {
  const { data: settings } = useGetSettings();
  const phone = settings?.phone ?? "+91 70600 61117";
  const email = settings?.email ?? "rajeev.event@gmail.com";
  const rawPhone = phone.replace(/[^0-9]/g, "");

  return (
    <footer className="bg-[#0F0F0F] text-white/70">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={logoImg} alt="Shiva Group Events" className="h-16 w-auto object-contain mb-4" />
            <p className="text-sm leading-relaxed text-white/50 mb-2">
              Creating extraordinary experiences across North India since 2012.
            </p>
            <p className="text-xs text-white/40 mb-5">
              Founded by <span className="text-primary">Rajeev Gupta</span>
            </p>
            <a
              href={`https://wa.me/${rawPhone}?text=Hi%20Shiva%20Group%20Events%2C%20I%20would%20like%20to%20enquire%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm px-4 py-2.5 transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </a>
          </div>

          {/* Services */}
          <div>
            <p className="text-white text-xs tracking-widest uppercase mb-5">Services</p>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <Link href="/services">
                    <span className="text-sm text-white/50 hover:text-primary transition-colors cursor-pointer">{s}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <p className="text-white text-xs tracking-widest uppercase mb-5">Cities We Serve</p>
            <ul className="space-y-2.5 columns-2">
              {cities.map((c) => (
                <li key={c}>
                  <Link href="/cities">
                    <span className="text-sm text-white/50 hover:text-primary transition-colors cursor-pointer">{c}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white text-xs tracking-widest uppercase mb-5">Contact</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/50">
                <MapPin size={15} className="mt-0.5 shrink-0 text-primary" />
                <span>Meerut, Uttar Pradesh, India</span>
              </li>
              <li>
                <a href={`tel:${rawPhone}`} className="flex items-center gap-3 text-sm text-white/50 hover:text-primary transition-colors">
                  <Phone size={15} className="shrink-0 text-primary" />
                  {phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-white/50 hover:text-primary transition-colors">
                  <Mail size={15} className="shrink-0 text-primary" />
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Shiva Group Events. All rights reserved. | Rajeev Gupta</p>
          <div className="flex gap-6">
            <Link href="/about"><span className="hover:text-white/60 cursor-pointer transition-colors">About</span></Link>
            <Link href="/contact"><span className="hover:text-white/60 cursor-pointer transition-colors">Contact</span></Link>
            <Link href="/admin"><span className="hover:text-white/60 cursor-pointer transition-colors">Admin</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
