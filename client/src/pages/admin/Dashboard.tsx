import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Image, MessageSquare, TrendingUp, Settings as SettingsIcon } from "lucide-react";
import {
  useAdminGetDashboard,
  getAdminGetDashboardQueryKey,
  useGetSettings,
  useAdminUpdateSettings
} from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-500",
  contacted: "bg-yellow-500",
  qualified: "bg-purple-500",
  "proposal-sent": "bg-orange-500",
  converted: "bg-green-500",
  closed: "bg-gray-500",
};

export default function AdminDashboard() {
  const { data, isLoading } = useAdminGetDashboard({
    query: { queryKey: getAdminGetDashboardQueryKey() },
  });

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    { label: "Total Leads", value: data?.totalLeads ?? 0, icon: Users, color: "text-blue-400" },
    { label: "New Leads", value: data?.newLeads ?? 0, icon: TrendingUp, color: "text-green-400" },
    { label: "Portfolio Items", value: data?.totalPortfolio ?? 0, icon: Image, color: "text-primary" },
    { label: "Testimonials", value: data?.totalTestimonials ?? 0, icon: MessageSquare, color: "text-purple-400" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-2xl text-white">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Overview of your events platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-[#181818] border border-white/10 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/40 text-xs tracking-widest uppercase">{s.label}</p>
              <s.icon size={16} className={s.color} />
            </div>
            <p className={`font-serif text-3xl ${s.color}`}>{s.value.toLocaleString()}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Pipeline */}
        <div className="bg-[#181818] border border-white/10 p-6">
          <h2 className="text-white text-sm tracking-widest uppercase mb-5">Lead Pipeline</h2>
          <div className="space-y-3">
            {data?.leadsByStatus?.map((s) => (
              <div key={s.status} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${STATUS_COLORS[s.status] ?? "bg-gray-400"}`} />
                <span className="text-white/60 text-sm capitalize flex-1">{s.status.replace(/-/g, " ")}</span>
                <span className="text-white text-sm font-medium">{s.count}</span>
              </div>
            ))}
            {(!data?.leadsByStatus || data.leadsByStatus.length === 0) && (
              <p className="text-white/30 text-sm">No leads yet</p>
            )}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-[#181818] border border-white/10 p-6">
          <h2 className="text-white text-sm tracking-widest uppercase mb-5">Recent Inquiries</h2>
          <div className="space-y-4">
            {data?.recentLeads?.map((lead) => (
              <div key={lead.id} className="flex items-start justify-between">
                <div>
                  <p className="text-white text-sm">{lead.name}</p>
                  <p className="text-white/40 text-xs">{lead.eventType} · {lead.location ?? "—"}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-sm ${STATUS_COLORS[lead.status] ?? "bg-gray-500"} text-white`}>
                  {lead.status}
                </span>
              </div>
            ))}
            {(!data?.recentLeads || data.recentLeads.length === 0) && (
              <p className="text-white/30 text-sm">No recent inquiries</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
