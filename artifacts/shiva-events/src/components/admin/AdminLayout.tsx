import { Link, useLocation } from "wouter";
import { LayoutDashboard, Users, Image, MessageSquare, LogOut } from "lucide-react";
import { useGetAdminMe, useAdminLogout } from "@workspace/api-client-react";
import { useEffect } from "react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/leads", icon: Users, label: "Leads" },
  { href: "/admin/portfolio", icon: Image, label: "Portfolio" },
  { href: "/admin/testimonials", icon: MessageSquare, label: "Testimonials" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, navigate] = useLocation();
  const { data: me, isLoading } = useGetAdminMe();
  const logoutMutation = useAdminLogout();

  useEffect(() => {
    if (!isLoading && me && !me.authenticated) {
      navigate("/admin/login");
    }
  }, [me, isLoading]);

  const handleLogout = () => {
    logoutMutation.mutate(undefined as any);
    navigate("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-[#181818] border-r border-white/10 flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <p className="font-serif text-white text-lg">Shiva Events</p>
          <p className="text-xs text-white/40 mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href}>
              <span
                className={`flex items-center gap-3 px-3 py-2.5 text-sm cursor-pointer transition-colors rounded-sm ${
                  location === href
                    ? "bg-primary/15 text-primary"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={16} />
                {label}
              </span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/40 hover:text-red-400 transition-colors w-full"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
