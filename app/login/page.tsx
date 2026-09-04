"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Building2, Eye, EyeOff, Zap, BarChart3, 
  Bot, Users, Wifi, Star 
} from "lucide-react";

const DEMO_ACCOUNTS = [
  { label: "Resort Manager", email: "manager@azurehills.com", role: "RESORT_MANAGER", color: "from-brand-500 to-brand-700" },
  { label: "Revenue Manager", email: "revenue@azurehills.com", role: "REVENUE_MANAGER", color: "from-accent-500 to-accent-700" },
  { label: "Operations Manager", email: "operations@azurehills.com", role: "OPERATIONS_MANAGER", color: "from-emerald-500 to-emerald-700" },
  { label: "Super Admin", email: "admin@azurehills.com", role: "SUPER_ADMIN", color: "from-ai-DEFAULT to-purple-700" },
];

const FEATURES = [
  { icon: BarChart3, label: "Revenue Intelligence" },
  { icon: Bot, label: "AI Copilot" },
  { icon: Building2, label: "Digital Twin" },
  { icon: Users, label: "Guest Experience" },
  { icon: Wifi, label: "Real-time Monitoring" },
  { icon: Zap, label: "Smart Automation" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/overview");
    } else {
      setError("Invalid email or password. Try a demo account below.");
      setLoading(false);
    }
  };

  const loginAsDemo = async (demoEmail: string) => {
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      email: demoEmail,
      password: "resort360",
      redirect: false,
    });
    if (result?.ok) {
      router.push("/overview");
    } else {
      setError("Demo login failed. Please run npm run db:seed first.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-950 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-surface-900 to-surface-950" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-ai-DEFAULT/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-brand-gradient rounded-xl flex items-center justify-center shadow-glow-brand">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-display font-bold text-lg leading-none">Smart Resort 360</div>
              <div className="text-white/40 text-xs mt-0.5">AI-Powered Intelligence</div>
            </div>
          </div>

          {/* Hero text */}
          <div className="mb-12">
            <h1 className="text-5xl font-display font-bold text-white leading-tight mb-4">
              Predict.
              <br />
              <span className="gradient-text">Optimize.</span>
              <br />
              Automate.
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-md">
              The AI-powered intelligence layer for modern resort operations, 
              guest experience, and revenue optimization.
            </p>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-2 gap-3">
            {FEATURES.map((f) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2.5 glass-card px-3 py-2.5"
              >
                <f.icon className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span className="text-white/70 text-sm font-medium">{f.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom resort info */}
        <div className="relative z-10">
          <div className="glass-card p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-accent-gradient rounded-xl flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-white font-semibold">Azure Hills Resort</div>
              <div className="text-white/50 text-sm">Coorg, Karnataka • 5-Star Luxury</div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-2xl font-display font-bold text-success-light">87%</div>
              <div className="text-white/40 text-xs">Occupancy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-brand-gradient rounded-xl flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div className="text-white font-display font-bold">Smart Resort 360</div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-display font-bold text-white mb-1">
              Welcome back
            </h2>
            <p className="text-white/40 text-sm mb-8">
              Sign in to your resort management dashboard
            </p>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4 mb-6">
              <div>
                <label className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1.5 block">
                  Email Address
                </label>
                <input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@azurehills.com"
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1.5 block">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password-input"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="alert-critical text-sm text-danger-light"
                >
                  {error}
                </motion.div>
              )}

              <button
                id="login-btn"
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/30 text-xs font-medium">QUICK DEMO ACCESS</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Demo accounts */}
            <div className="grid grid-cols-2 gap-3">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  id={`demo-${acc.role.toLowerCase()}`}
                  onClick={() => loginAsDemo(acc.email)}
                  disabled={loading}
                  className="glass-card p-3 text-left hover:border-brand-500/30 transition-all duration-200 hover:shadow-glow-brand group disabled:opacity-50"
                >
                  <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${acc.color} mb-2 flex-shrink-0 transition-transform group-hover:scale-110`} />
                  <div className="text-white text-xs font-semibold">{acc.label}</div>
                  <div className="text-white/30 text-xs mt-0.5 truncate">resort360</div>
                </button>
              ))}
            </div>

            <p className="text-center text-white/20 text-xs mt-6">
              Password for all demo accounts: <span className="text-white/40 font-mono">resort360</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
