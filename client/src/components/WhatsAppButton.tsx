import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { useGetSettings } from "@/lib/api";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_MESSAGE = "Hi Shiva Group Events, I would like to enquire about your event services. Please get in touch.";

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const { data: settings } = useGetSettings();

  const phone = settings?.phone ?? "+91 98970 15153";
  const rawPhone = phone.replace(/[^0-9]/g, "");
  const href = `https://wa.me/${rawPhone}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div className="fixed bottom-24 right-5 z-50 flex flex-col items-end gap-2.5">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 6 }}
            transition={{ duration: 0.18 }}
            className="relative bg-white text-[#0F0F0F] text-sm px-3.5 py-2.5 shadow-xl max-w-[200px] text-right rounded-sm"
          >
            <button
              className="absolute -top-1.5 -right-1.5 bg-gray-200 rounded-full p-0.5 hover:bg-gray-300 transition-colors"
              onClick={(e) => { e.preventDefault(); setShowTooltip(false); }}
            >
              <X size={9} />
            </button>
            <p className="font-semibold text-xs mb-0.5 text-gray-800">Chat on WhatsApp</p>
            <p className="text-[11px] text-gray-400">Usually replies in minutes</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 bg-[#25D366] hover:bg-[#20BF5A] flex items-center justify-center shadow-lg transition-colors rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 220 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={22} className="text-white" />
      </motion.a>
    </div>
  );
}
