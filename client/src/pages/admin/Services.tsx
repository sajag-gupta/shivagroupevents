import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit, LayoutGrid } from "lucide-react";
import {
  useAdminListServices,
  useAdminCreateService,
  useAdminUpdateService,
  useAdminDeleteService,
  getAdminListServicesQueryKey,
} from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

const emptyForm = {
  title: "",
  slug: "",
  category: "",
  description: "",
  longDescription: "",
  icon: "",
  heroImage: "",
  heroVideo: "",
  features: "",
  sortOrder: "0",
};

export default function AdminServices() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useAdminListServices({ query: { queryKey: getAdminListServicesQueryKey() } });
  const createMutation = useAdminCreateService();
  const updateMutation = useAdminUpdateService();
  const deleteMutation = useAdminDeleteService();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const items = data?.items ?? [];
  const invalidate = () => queryClient.invalidateQueries({ queryKey: getAdminListServicesQueryKey() });

  const set = (k: keyof typeof emptyForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      slug: form.slug,
      category: form.category,
      description: form.description,
      longDescription: form.longDescription || undefined,
      icon: form.icon,
      heroImage: form.heroImage || undefined,
      heroVideo: form.heroVideo || undefined,
      features: form.features.split("\n").map(line => line.trim()).filter(Boolean),
      sortOrder: Number(form.sortOrder) || 0,
    };

    if (editingId) {
      updateMutation.mutate(
        { id: editingId, data: payload },
        {
          onSuccess: () => {
            invalidate();
            setShowForm(false);
            setEditingId(null);
            setForm(emptyForm);
          },
        }
      );
    } else {
      createMutation.mutate(
        { data: payload },
        {
          onSuccess: () => {
            invalidate();
            setShowForm(false);
            setForm(emptyForm);
          },
        }
      );
    }
  };

  const handleEdit = (item: any) => {
    setForm({
      title: item.title,
      slug: item.slug,
      category: item.category,
      description: item.description,
      longDescription: item.longDescription ?? "",
      icon: item.icon,
      heroImage: item.heroImage ?? "",
      heroVideo: item.heroVideo ?? "",
      features: item.features?.join("\n") ?? "",
      sortOrder: item.sortOrder?.toString() ?? "0",
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this service? Public pages that rely on this slug will fall back to their default layouts.")) return;
    deleteMutation.mutate({ id }, { onSuccess: invalidate });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl text-white flex items-center gap-2">
            <LayoutGrid size={22} className="text-primary" />
            Services Categories
          </h1>
          <p className="text-white/40 text-sm mt-1">{items.length} services configured in database</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setForm(emptyForm);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors"
        >
          <Plus size={15} /> Add Custom Service
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 bg-[#181818] border border-white/10 p-6">
          <h2 className="text-white text-sm tracking-widest uppercase mb-5">
            {editingId ? "Edit Service" : "New Service Configuration"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white/40 text-xs tracking-widest uppercase block mb-1.5">Service Title *</label>
              <input type="text" value={form.title} onChange={set("title")} className="w-full bg-[#0F0F0F] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" placeholder="e.g. Corporate Events" required />
            </div>
            <div>
              <label className="text-white/40 text-xs tracking-widest uppercase block mb-1.5">Slug (route matching) *</label>
              <input type="text" value={form.slug} onChange={set("slug")} className="w-full bg-[#0F0F0F] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" placeholder="e.g. corporate" required />
            </div>
            <div>
              <label className="text-white/40 text-xs tracking-widest uppercase block mb-1.5">Category *</label>
              <input type="text" value={form.category} onChange={set("category")} className="w-full bg-[#0F0F0F] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" placeholder="e.g. Corporate" required />
            </div>
            <div>
              <label className="text-white/40 text-xs tracking-widest uppercase block mb-1.5">Icon Class/Name *</label>
              <input type="text" value={form.icon} onChange={set("icon")} className="w-full bg-[#0F0F0F] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" placeholder="e.g. Briefcase or Heart" required />
            </div>
            <div>
              <label className="text-white/40 text-xs tracking-widest uppercase block mb-1.5">Hero Image URL (or Unsplash link)</label>
              <input type="text" value={form.heroImage} onChange={set("heroImage")} className="w-full bg-[#0F0F0F] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" placeholder="https://..." />
            </div>
            <div>
              <label className="text-white/40 text-xs tracking-widest uppercase block mb-1.5">Hero Video URL (e.g. /corporate_events.mp4)</label>
              <input type="text" value={form.heroVideo} onChange={set("heroVideo")} className="w-full bg-[#0F0F0F] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" placeholder="/video.mp4" />
            </div>
            <div>
              <label className="text-white/40 text-xs tracking-widest uppercase block mb-1.5">Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={set("sortOrder")} className="w-full bg-[#0F0F0F] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" />
            </div>
            <div className="md:col-span-2">
              <label className="text-white/40 text-xs tracking-widest uppercase block mb-1.5">Short Description / Tagline *</label>
              <textarea value={form.description} onChange={set("description")} required rows={2} className="w-full bg-[#0F0F0F] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-primary resize-none" placeholder="Short description displayed on cards." />
            </div>
            <div className="md:col-span-2">
              <label className="text-white/40 text-xs tracking-widest uppercase block mb-1.5">Long Description (Hero content)</label>
              <textarea value={form.longDescription} onChange={set("longDescription")} rows={3} className="w-full bg-[#0F0F0F] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-primary resize-none" placeholder="Extended description shown in the hero block." />
            </div>
            <div className="md:col-span-2">
              <label className="text-white/40 text-xs tracking-widest uppercase block mb-1.5">Features / Offerings List (One per line)</label>
              <textarea value={form.features} onChange={set("features")} rows={4} className="w-full bg-[#0F0F0F] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-primary font-mono" placeholder="Bespoke Floral Decor&#10;Stage & Entry Design&#10;VIP Hospitality Management" />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="px-6 py-2.5 bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors disabled:opacity-50">
                {editingId ? "Update" : "Create"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="px-6 py-2.5 border border-white/20 text-white/60 text-sm hover:border-white/40 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {isLoading ? (
        <div className="text-white/40 text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-[#181818] border border-white/10 overflow-hidden group flex flex-col justify-between">
              <div>
                <div className="relative aspect-video overflow-hidden bg-black flex items-center justify-center">
                  {item.heroVideo ? (
                    <video src={item.heroVideo} className="w-full h-full object-cover opacity-60" muted playsInline />
                  ) : item.heroImage ? (
                    <img src={item.heroImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="text-white/20 flex flex-col items-center gap-2">
                      <LayoutGrid size={24} />
                      <span className="text-xs">No Hero Media</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-black/60 text-primary text-xs px-2 py-0.5 border border-white/10 rounded-sm">
                    /{item.slug}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-primary text-xs tracking-widest uppercase mb-1 flex items-center gap-1">
                    <span>{item.category}</span>
                  </p>
                  <p className="text-white text-base font-serif mb-1.5">{item.title}</p>
                  <p className="text-white/40 text-xs line-clamp-3 mb-4">{item.description}</p>
                  
                  {item.features && item.features.length > 0 && (
                    <div className="border-t border-white/5 pt-3">
                      <p className="text-white/50 text-[10px] tracking-widest uppercase mb-1.5">Offerings checklist</p>
                      <div className="flex flex-wrap gap-1">
                        {item.features.slice(0, 3).map((feat, idx) => (
                          <span key={idx} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 text-white/70">
                            {feat}
                          </span>
                        ))}
                        {item.features.length > 3 && (
                          <span className="text-[10px] text-white/40 px-1 py-0.5">+{item.features.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4 pt-0">
                <div className="flex gap-3 border-t border-white/5 pt-3 mt-2">
                  <button onClick={() => handleEdit(item)} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors">
                    <Edit size={12} /> Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-red-400 transition-colors">
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
