"use client";

import { Brain, Sparkles, FlaskConical, Bot, Target } from "lucide-react";
import { PageHeader, PageContainer } from "@/components/dashboard/page-header";

const SUB = [
  { href: "/ai/copilot", label: "AI Copilot", icon: Bot, description: "Conversational intelligence", color: "from-ai-DEFAULT to-purple-700", badge: "AI" },
  { href: "/ai/actions", label: "Next Best Actions", icon: Sparkles, description: "Prioritized recommendations", color: "from-accent-500 to-warning-DEFAULT", badge: "AI" },
  { href: "/ai/predictions", label: "Predictions", icon: FlaskConical, description: "Predictive analytics", color: "from-brand-500 to-ai-DEFAULT" },
  { href: "/ai/simulator", label: "Scenario Simulator", icon: Target, description: "What-if analysis", color: "from-emerald-500 to-brand-500" },
];

export default function AIPage() {
  return (
    <PageContainer>
      <PageHeader title="AI Intelligence" description="Predictive models, recommendations, and scenario planning" icon={Brain} badge="AI" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SUB.map((p) => (
          <a key={p.href} href={p.href} className="glass-card-hover p-6 group block">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow-ai`}>
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
