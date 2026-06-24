import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit, Star } from "lucide-react";
import {
  useAdminListPortfolio,
  useAdminCreatePortfolio,
  useAdminUpdatePortfolio,
  useAdminDeletePortfolio,
  getAdminListPortfolioQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

const CATEGORIES = ["luxury-weddings", "corporate-events", "award-ceremonies", "celebrity-shows", "concerts", "brand-activations", "private-events", "college-festivals"];

const emptyForm = { title: "", slug: "", category: "", coverImage: "", location: "", eventDate: "", description: "", story: "", clientName: "", guestCount: "", featured: false, published: true };

export default function AdminPortfolio() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useAdminListPortfolio({ query: { queryKey: getAdminListPortfolioQueryKey() } });
  const createMutation = useAdminCreatePortfolio();
  const updateMutation = useAdminUpdatePortfolio();
  const deleteMutation = useAdminDeletePortfolio();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const items = data?.items ?? [];
  const invalidate = () => queryClient.invalidateQueries({ queryKey: getAdminListPortfolioQueryKey() });

  const set = (k: keyof typeof emptyForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title: form.title, slug: form.slug, category: form.category,
      coverImage: form.coverImage, location: form.location, eventDate: form.eventDate,
      description: form.description, story: form.story || undefined,
      clientName: form.clientName || undefined,
      guestCount: form.guestCount ? Number(form.guestCount) : undefined,
      featured: form.featured, published: form.published,
    };
    if (editingId) {
      updateMutation.mutate({ id: editingId, data }, { onSuccess: () => { invalidate(); setShowForm(false); setEditingId(null); setForm(emptyForm); } });
    } else {
      createMutation.mutate({ data }, { onSuccess: () => { invalidate(); setShowForm(false); setForm(emptyForm); } });
    }
  };

  const handleEdit = (item: any) => {
    setForm({ title: item.title, slug: item.slug, category: item.category, coverImage: item.coverImage, location: item.location, eventDate: item.eventDate, description: item.description, story: item.story ?? "", clientName: item.clientName ?? "", guestCount: item.guestCount?.toString() ?? "", featured: item.featured, published: item.published });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this portfolio item?")) return;
    deleteMutation.mutate({ id }, { onSuccess: invalidate });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl text-white">Portfolio</h1>
          <p className="text-white/40 text-sm mt-1">{items.length} items</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors">
          <Plus size={15} /> Add Item
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 bg-[#181818] border border-white/10 p-6">
          <h2 className="text-white text-sm tracking-widest uppercase mb-5">{editingId ? "Edit Item" : "New Portfolio Item"}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {([["title", "Title *", "text"], ["slug", "Slug *", "text"], ["location", "Location *", "text"], ["eventDate", "Event Date *", "text"], ["coverImage", "Cover Image URL *", "text"], ["clientName", "Client Name", "text"], ["guestCount", "Guest Count", "number"]] as [keyof typeof emptyForm, string, string][]).map(([key, label, type]) => (
              <div key={key}>
                <label className="text-white/40 text-xs tracking-widest uppercase block mb-1.5">{label}</label>
                <input type={type} value={form[key] as string} onChange={set(key)} className="w-full bg-[#0F0F0F] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" required={label.includes("*")} />
              </div>
            ))}
            <div>
              <label className="text-white/40 text-xs tracking-widest uppercase block mb-1.5">Category *</label>
              <select value={form.category} onChange={set("category")} required className="w-full bg-[#0F0F0F] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-primary">
                <option value="">Select...</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c.replace(/-/g, " ")}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-white/40 text-xs tracking-widest uppercase block mb-1.5">Description *</label>
              <textarea value={form.description} onChange={set("description")} required rows={3} className="w-full bg-[#0F0F0F] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-primary resize-none" />
            </div>
            <div className="md:col-span-2 flex gap-6">
              <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={set("featured")} className="accent-primary" /> Featured
              </label>
              <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={set("published")} className="accent-primary" /> Published
              </label>
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
            <div key={item.id} className="bg-[#181818] border border-white/10 overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {item.featured && <div className="absolute top-2 right-2 bg-primary/90 text-white text-xs px-2 py-0.5 flex items-center gap-1"><Star size={10} /> Featured</div>}
                {!item.published && <div className="absolute top-2 left-2 bg-gray-800/90 text-white/60 text-xs px-2 py-0.5">Draft</div>}
              </div>
              <div className="p-4">
                <p className="text-primary text-xs tracking-widest uppercase mb-1">{item.category.replace(/-/g, " ")}</p>
                <p className="text-white text-sm font-medium mb-0.5">{item.title}</p>
                <p className="text-white/40 text-xs">{item.location}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleEdit(item)} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"><Edit size={12} /> Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-red-400 transition-colors"><Trash2 size={12} /> Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
