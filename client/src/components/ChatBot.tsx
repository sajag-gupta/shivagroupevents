import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, ChevronDown, Maximize2, Minimize2 } from "lucide-react";
import { IoChatbubblesOutline } from "react-icons/io5";
import { HiUser } from "react-icons/hi2";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AVATAR_URL = "/Chatbot-Photo.png";

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hi ! I am Shivya.<br>How can I help you today?",
};

const POPULAR_QUESTIONS = [
  "Plan my dream destination wedding",
  "Show me the best wedding venues",
  "Suggest top photographer in Delhi"
];

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  async function sendMessage(customText?: string) {
    const text = (customText || input).trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I am having trouble connecting right now. Please <a href='/contact' class='text-primary hover:underline font-semibold'>contact us</a> or WhatsApp us directly at +91 98970 15153 / +91 92197 08567."
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5 font-sans">
      <style>{`
        .Shivya-rich-text ul {
          list-style-type: disc !important;
          margin-left: 1.25rem !important;
          margin-top: 0.5rem !important;
          margin-bottom: 0.5rem !important;
        }
        .Shivya-rich-text li {
          margin-bottom: 0.25rem !important;
        }
        .Shivya-rich-text a {
          color: #C9A227 !important;
          text-decoration: underline !important;
          font-weight: 600 !important;
        }
        .Shivya-rich-text a:hover {
          color: #a78218 !important;
        }
        .Shivya-rich-text p {
          margin-bottom: 0.5rem !important;
        }
      `}</style>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={`bg-white border border-pink-200/50 shadow-2xl flex flex-col overflow-visible rounded-[28px] transition-all duration-300 relative ${isExpanded
                ? "w-[480px] h-[640px] max-h-[85vh]"
                : "w-[360px] h-[520px] max-h-[75vh]"
              }`}
          >
            {/* Gradient Top Bar with Overlapping Avatar */}
            <div className="bg-gradient-to-b from-[#E0D7FF]/60 via-[#F4EFFF]/40 to-[#FFF5F8]/20 px-6 pt-14 pb-4 flex flex-col items-center justify-center shrink-0 rounded-t-[28px] relative border-b border-pink-100/30">
              {/* Overlapping Avatar */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="relative w-[78px] h-[78px] rounded-full p-[3px] bg-gradient-to-tr from-[#2563EB] via-[#C084FC] to-[#DB2777] shadow-lg">
                  <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-white bg-white">
                    <img
                      src={AVATAR_URL}
                      alt="Shivya AI Assistant"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Status Indicator */}
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#22C55E] border-2 border-white rounded-full"></span>
                </div>
              </div>

              {/* Controls */}
              <div className="absolute top-3.5 right-4 flex items-center gap-2">
                <button
                  onClick={() => setIsExpanded(e => !e)}
                  title={isExpanded ? "Collapse width" : "Expand width"}
                  className="w-7 h-7 bg-white/70 hover:bg-white text-gray-500 rounded-full flex items-center justify-center transition-colors border border-gray-100 shadow-sm"
                >
                  {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  title="Minimize chat"
                  className="w-7 h-7 bg-white/70 hover:bg-white text-gray-500 rounded-full flex items-center justify-center transition-colors border border-gray-100 shadow-sm"
                >
                  <ChevronDown size={15} />
                </button>
              </div>

              {/* Identity Header */}
              <h2 className="text-[#374151] text-lg font-bold tracking-tight mt-1">Shivya AI</h2>
              <p className="text-gray-500 text-[11px] font-medium tracking-wide flex items-center gap-1 mt-0.5">
                <span className="text-[#DB2777] text-[10px]">✦</span> Indian Wedding & Event Assistant
              </p>
            </div>

            {/* Conversation Flow */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 bg-gradient-to-b from-[#FFF5F8]/10 via-white to-white">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {/* Small Avatar on left for assistant */}
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-pink-100 shrink-0 shadow-sm bg-white self-end mb-1">
                      <img
                        src={AVATAR_URL}
                        alt="Shivya avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`text-[13px] leading-relaxed px-4 py-2.5 shadow-sm ${msg.role === "user"
                        ? "bg-[#C9A227] text-white rounded-[18px] rounded-tr-none max-w-[75%]"
                        : "bg-white text-[#374151] border border-pink-100/50 rounded-[18px] rounded-tl-none max-w-[75%]"
                      }`}
                  >
                    {msg.role === "user" ? (
                      msg.content
                    ) : (
                      <div
                        className="Shivya-rich-text"
                        dangerouslySetInnerHTML={{ __html: msg.content }}
                      />
                    )}
                  </div>
                </div>
              ))}

              {/* Dynamic Suggestions (Shown when only the initial welcome message is present) */}
              {messages.length === 1 && (
                <div className="pl-9 pr-4 pt-1 space-y-2.5">
                  <p className="text-[#374151] text-xs font-semibold tracking-wide">Popular questions</p>
                  <div className="flex flex-col gap-2">
                    {POPULAR_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendMessage(q)}
                        className="w-full text-left bg-white border border-[#DB2777]/25 hover:border-[#DB2777]/50 text-gray-700 hover:bg-[#FFF5F8]/50 text-xs px-4 py-2.5 rounded-full transition-all flex items-center gap-2 font-medium shadow-sm cursor-pointer"
                      >
                        <span className="text-[#DB2777] font-semibold text-xs">✦</span>
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {loading && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-pink-100 shrink-0 shadow-sm bg-white self-end mb-1">
                    <img
                      src={AVATAR_URL}
                      alt="Shivya avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-white text-[#374151] border border-pink-100/50 px-4 py-2.5 flex items-center gap-2 rounded-[18px] rounded-tl-none shadow-sm">
                    <Loader2 size={12} className="animate-spin text-[#DB2777]" />
                    <span className="text-[11px] text-gray-400 font-medium">Thinking…</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Area */}
            <div className="p-3 bg-white border-t border-gray-100 shrink-0 rounded-b-[28px]">
              <div className="bg-gray-50 border border-gray-200/80 rounded-full pl-4 pr-1.5 py-1 flex items-center gap-2 focus-within:border-[#DB2777]/40 focus-within:bg-white transition-all shadow-inner">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask Question"
                  className="flex-1 bg-transparent text-gray-800 text-xs py-2 outline-none placeholder:text-gray-400"
                  disabled={loading}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  className="w-8 h-8 rounded-full bg-[#10B981] hover:bg-[#059669] text-white flex items-center justify-center transition-colors disabled:opacity-40 shadow-md cursor-pointer shrink-0"
                >
                  <Send size={12} />
                </button>
              </div>
              <div className="text-center mt-2.5 mb-1">
                <p className="text-[10px] text-gray-400 font-sans tracking-wide">
                  Shivya may make mistakes. Please verify key info.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all cursor-pointer border border-pink-100/10 relative ${
          open 
            ? "bg-[#374151] text-white hover:bg-[#2d3543]" 
            : "p-[3px] bg-gradient-to-tr from-[#2563EB] via-[#C084FC] to-[#DB2777]"
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 220 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Toggle Shivya AI Assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full h-full relative"
            >
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-white">
                <img 
                  src={AVATAR_URL} 
                  alt="Shivya avatar icon" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Online status indicator dot */}
              <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-[#22C55E] border-2 border-white rounded-full"></span>
              {/* Sparkles overlaying the ring */}
              <span className="absolute -right-1 top-[20%] text-white text-[11px] select-none pointer-events-none drop-shadow-md animate-pulse">✦</span>
              <span className="absolute -right-2 top-[48%] text-white text-[8px] select-none pointer-events-none drop-shadow-md animate-pulse">✦</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

