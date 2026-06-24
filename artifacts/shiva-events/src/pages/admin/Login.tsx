import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useAdminLogin } from "@workspace/api-client-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, navigate] = useLocation();
  const loginMutation = useAdminLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate(
      { data: { password } },
      {
        onSuccess: (data) => {
          if (data?.authenticated) {
            navigate("/admin");
          } else {
            setError("Invalid credentials");
          }
        },
        onError: () => setError("Invalid credentials"),
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-6">
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-10">
          <p className="font-serif text-2xl text-white mb-1">Shiva Group Events</p>
          <p className="text-xs text-white/30 tracking-widest uppercase">Admin Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs tracking-widest uppercase text-white/40 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#181818] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter admin password"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full py-3.5 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loginMutation.isPending ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-white/20 mt-8">
          Default password: <span className="text-white/40">shivaevents2024</span>
        </p>
      </motion.div>
    </div>
  );
}
