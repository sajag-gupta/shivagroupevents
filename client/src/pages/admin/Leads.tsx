import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import {
  useAdminListLeads,
  useAdminUpdateLead,
  getAdminListLeadsQueryKey,
} from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

const STATUSES = ["new", "contacted", "qualified", "proposal-sent", "converted", "closed"];

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400",
  contacted: "bg-yellow-500/20 text-yellow-400",
  qualified: "bg-purple-500/20 text-purple-400",
  "proposal-sent": "bg-orange-500/20 text-orange-400",
  converted: "bg-green-500/20 text-green-400",
  closed: "bg-gray-500/20 text-gray-400",
};

export default function AdminLeads() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const params = { search: search || undefined, status: statusFilter || undefined };
  const { data, isLoading } = useAdminListLeads(params, {
    query: { queryKey: getAdminListLeadsQueryKey(params) },
  });
  const updateMutation = useAdminUpdateLead();

  const leads = data?.items ?? [];

  const handleStatusChange = (id: number, status: string) => {
    updateMutation.mutate(
      { id, data: { status } },
      { onSuccess: () => queryClient.invalidateQueries({ queryKey: getAdminListLeadsQueryKey({}) }) }
    );
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-serif text-2xl text-white">Lead Management</h1>
        <p className="text-white/40 text-sm mt-1">{data?.total ?? 0} total inquiries</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone..."
            className="w-full bg-[#181818] border border-white/10 pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#181818] border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s.replace(/-/g, " ")}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#181818] border border-white/10 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-white/40">Loading...</div>
        ) : leads.length === 0 ? (
          <div className="p-8 text-center text-white/30">No leads found</div>
        ) : (
          <div className="divide-y divide-white/5">
            {leads.map((lead) => (
              <div key={lead.id}>
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-white/3 transition-colors"
                  onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{lead.name}</p>
                    <p className="text-white/40 text-xs">{lead.phone} · {lead.email}</p>
                  </div>
                  <div className="hidden sm:block text-white/60 text-xs">{lead.eventType}</div>
                  <div className="hidden md:block text-white/40 text-xs">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </div>
                  <select
                    value={lead.status}
                    onChange={(e) => { e.stopPropagation(); handleStatusChange(lead.id, e.target.value); }}
                    className={`text-xs px-2 py-1 bg-transparent border-0 focus:outline-none cursor-pointer ${STATUS_COLORS[lead.status] ?? ""}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {STATUSES.map((s) => <option key={s} value={s} className="bg-[#181818] text-white">{s.replace(/-/g, " ")}</option>)}
                  </select>
                </div>

                {expandedId === lead.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="px-5 pb-5 bg-white/2 border-t border-white/5"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-xs">
                      {[
                        ["Location", lead.location],
                        ["Event Date", lead.eventDate],
                        ["Guests", lead.guestCount?.toString()],
                        ["Budget", lead.budgetRange],
                      ].map(([label, val]) => val && (
                        <div key={label}>
                          <p className="text-white/30 uppercase tracking-wider mb-1">{label}</p>
                          <p className="text-white/70">{val}</p>
                        </div>
                      ))}
                    </div>
                    {lead.message && (
                      <div className="mt-4">
                        <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Message</p>
                        <p className="text-white/60 text-sm">{lead.message}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
