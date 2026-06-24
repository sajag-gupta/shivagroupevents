import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const WHATSAPP_NUMBER = "919999999999";
const WHATSAPP_MESSAGE = "Hi Shiva Group Events, I would like to enquire about your event services. Please get in touch.";

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            transition={{ duration: 0.2 }}
            className="bg-white text-[#0F0F0F] text-sm px-4 py-3 shadow-xl max-w-[220px] text-right"
          >
            <button
              className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-0.5"
              onClick={(e) => { e.preventDefault(); setShowTooltip(false); }}
            >
              <X size={10} />
            </button>
            <p className="font-semibold text-xs mb-0.5">Chat with us</p>
            <p className="text-xs text-gray-500">Typically replies within minutes</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 hover:bg-green-400 flex items-center justify-center shadow-2xl transition-colors"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} className="text-white" fill="white" />
      </motion.a>
    </div>
  );
}
