"use client";

import { TrendingUp, DollarSign, LineChart, Target, Megaphone } from "lucide-react";
import { PageHeader, PageContainer } from "@/components/dashboard/page-header";

const SUB = [
  { href: "/revenue/pricing", label: "Dynamic Pricing", icon: DollarSign, description: "AI-powered rate optimization", color: "from-brand-500 to-ai-DEFAULT", badge: "AI" },
  { href: "/revenue/forecast", label: "Forecasting", icon: LineChart, description: "30-day revenue predictions", color: "from-success-DEFAULT to-emerald-500" },
  { href: "/revenue/segmentation", label: "Guest Segmentation", icon: Target, description: "RFM & behavior clusters", color: "from-accent-500 to-warning-DEFAULT" },
  { href: "/revenue/marketing", label: "Marketing", icon: Megaphone, description: "Campaigns & attribution", color: "from-pink-500 to-rose-700" },
];

export default function RevenuePage() {
  return (
    <PageContainer>
      <PageHeader title="Revenue Intelligence" description="Maximize ADR, RevPAR, and total revenue with AI" icon={TrendingUp} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SUB.map((p) => (
          <a key={p.href} href={p.href} className="glass-card-hover p-6 group block">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <p.icon className="w-6 h-6 text-white" />
              </div>
              {p.badge && <span className="badge-purple">{p.badge}</span>}
            </div>
            <div className="text-white font-semibold mb-1">{p.label}</div>
            <div className="text-white/50 text-sm">{p.description}</div>
          </a>
        ))}
      </div>
    </PageContainer>
  );
}
