import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit } from "lucide-react";
import {
  useAdminListTestimonials,
  useAdminCreateTestimonial,
  useAdminUpdateTestimonial,
  useAdminDeleteTestimonial,
  getAdminListTestimonialsQueryKey,
} from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

const emptyForm = { clientName: "", designation: "", company: "", eventType: "", rating: "5", content: "", photoUrl: "", published: true };

export default function AdminTestimonials() {
  const queryClient = useQueryClient();
  const { data: testimonials = [], isLoading } = useAdminListTestimonials({ query: { queryKey: getAdminListTestimonialsQueryKey() } });
  const createMutation = useAdminCreateTestimonial();
  const updateMutation = useAdminUpdateTestimonial();
  const deleteMutation = useAdminDeleteTestimonial();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: getAdminListTestimonialsQueryKey() });
  const set = (k: keyof typeof emptyForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { clientName: form.clientName, designation: form.designation || undefined, company: form.company || undefined, eventType: form.eventType || undefined, rating: Number(form.rating), content: form.content, photoUrl: form.photoUrl || undefined, published: form.published };
    if (editingId) {
      updateMutation.mutate({ id: editingId, data }, { onSuccess: () => { invalidate(); setShowForm(false); setEditingId(null); setForm(emptyForm); } });
    } else {
      createMutation.mutate({ data }, { onSuccess: () => { invalidate(); setShowForm(false); setForm(emptyForm); } });
    }
  };

  const handleEdit = (t: any) => {
    setForm({ clientName: t.clientName, designation: t.designation ?? "", company: t.company ?? "", eventType: t.eventType ?? "", rating: t.rating.toString(), content: t.content, photoUrl: t.photoUrl ?? "", published: t.published });
    setEditingId(t.id);
    setShowForm(true);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl text-white">Testimonials</h1>
          <p className="text-white/40 text-sm mt-1">{testimonials.length} total</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors">
          <Plus size={15} /> Add Testimonial
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 bg-[#181818] border border-white/10 p-6">
          <h2 className="text-white text-sm tracking-widest uppercase mb-5">{editingId ? "Edit Testimonial" : "New Testimonial"}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {([["clientName", "Client Name *", "text"], ["designation", "Designation", "text"], ["company", "Company", "text"], ["eventType", "Event Type", "text"], ["photoUrl", "Photo URL", "text"]] as [keyof typeof emptyForm, string, string][]).map(([key, label]) => (
              <div key={key}>
                <label className="text-white/40 text-xs tracking-widest uppercase block mb-1.5">{label}</label>
                <input value={form[key] as string} onChange={set(key)} className="w-full bg-[#0F0F0F] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" required={label.includes("*")} />
              </div>
            ))}
            <div>
              <label className="text-white/40 text-xs tracking-widest uppercase block mb-1.5">Rating</label>
              <select value={form.rating} onChange={set("rating")} className="w-full bg-[#0F0F0F] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-primary">
                {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} stars</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-white/40 text-xs tracking-widest uppercase block mb-1.5">Testimonial Content *</label>
              <textarea value={form.content} onChange={set("content")} required rows={4} className="w-full bg-[#0F0F0F] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-primary resize-none" />
            </div>
            <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={set("published")} className="accent-primary" /> Published
            </label>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="px-6 py-2.5 bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors disabled:opacity-50">
                {editingId ? "Update" : "Create"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="px-6 py-2.5 border border-white/20 text-white/60 text-sm">Cancel</button>
            </div>
          </form>
        </motion.div>
      )}

      {isLoading ? (
        <div className="text-white/40 text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-[#181818] border border-white/10 p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-0.5">{Array.from({ length: t.rating }).map((_, i) => <span key={i} className="text-primary text-sm">★</span>)}</div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(t)} className="text-white/30 hover:text-white transition-colors"><Edit size={14} /></button>
                  <button onClick={() => { if (confirm("Delete?")) deleteMutation.mutate({ id: t.id }, { onSuccess: invalidate }); }} className="text-white/30 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
              <p className="text-white/70 text-sm italic mb-4">"{t.content}"</p>
              <div>
                <p className="text-white text-sm font-medium">{t.clientName}</p>
                {t.designation && <p className="text-white/40 text-xs">{t.designation}{t.company ? `, ${t.company}` : ""}</p>}
              </div>
              {!t.published && <span className="mt-2 inline-block text-xs text-white/30">Draft</span>}
            </div>
          ))}
          {testimonials.length === 0 && <p className="text-white/30 col-span-2 text-center py-8">No testimonials yet</p>}
        </div>
      )}
    </div>
  );
}
