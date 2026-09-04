"use client";

import { Flame, AlertTriangle, Activity, Cloud, Zap, Shield } from "lucide-react";
import { PageHeader, PageContainer } from "@/components/dashboard/page-header";

const CRISES = [
  { type: "WEATHER", severity: "HIGH", title: "Heavy Monsoon Approaching", description: "Rain probability 92% in 18 hours. Outdoor operations will be impacted.", affected: ["Pool Deck", "Garden Tours", "Outdoor Yoga"], status: "MONITORING", startedAt: "12m ago" },
  { type: "DEMAND", severity: "MEDIUM", title: "Villa Demand Spike", description: "Booking velocity +340% in 2 hours. Possible event/news trigger.", affected: ["Villas", "Suites"], status: "MONITORING", startedAt: "45m ago" },
];

export default function CrisisPage() {
  return (
    <PageContainer>
      <PageHeader title="Crisis Center" description="Real-time threat detection and automated response coordination" icon={Flame} badge="LIVE" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="kpi-card border-danger-DEFAULT/30"><div className="metric-label">Active Crises</div><div className="metric-value text-danger-light">{CRISES.length}</div></div>
        <div className="kpi-card border-warning-DEFAULT/30"><div className="metric-label">Weather Risk</div><div className="metric-value text-warning-light">HIGH</div></div>
        <div className="kpi-card border-brand-500/30"><div className="metric-label">Response Time</div><div className="metric-value">3.2m</div></div>
        <div className="kpi-card border-success-DEFAULT/30"><div className="metric-label">Crises Resolved (30d)</div><div className="metric-value text-success-light">14</div></div>
      </div>

      {CRISES.map((c, i) => (
        <div key={i} className="glass-card p-5 mb-4 border-danger-DEFAULT/30">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-danger-gradient flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">{c.title}</span>
                  <span className="badge-red">{c.severity}</span>
                  <span className="badge-yellow">{c.status}</span>
                </div>
                <div className="text-white/50 text-xs mt-0.5">Detected {c.startedAt} • {c.type}</div>
              </div>
            </div>
            <button className="btn-primary text-xs">Activate Response Plan</button>
          </div>
          <div className="text-white/80 text-sm mb-3">{c.description}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="text-white/40 text-xs uppercase font-semibold mb-2">Affected Areas</div>
              <div className="space-y-1">
                {c.affected.map((a) => (
                  <div key={a} className="text-white/80 text-sm flex items-center gap-2"><Activity className="w-3 h-3 text-danger-light" /> {a}</div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-white/40 text-xs uppercase font-semibold mb-2">AI Recommended Actions</div>
              <div className="space-y-1.5 text-xs">
                <div className="glass-card p-2"><span className="text-success-light">✓</span> Reallocate 3 outdoor staff to Spa & Restaurant</div>
                <div className="glass-card p-2"><span className="text-success-light">✓</span> Push notification to 47 guests (indoor activities)</div>
                <div className="glass-card p-2"><span className="text-success-light">✓</span> Increase spa therapist shifts by 2</div>
                <div className="glass-card p-2"><span className="text-success-light">✓</span> Pre-order +20% juices, +15% vegetables</div>
                <div className="glass-card p-2"><span className="text-success-light">✓</span> Activate rainy day F&B menu</div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="glass-card p-5">
        <div className="section-header mb-3">Crisis Playbooks</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          {[
            { name: "Severe Weather", icon: Cloud, color: "from-brand-500 to-cyan-500", steps: 8, lastTriggered: "2 weeks ago" },
            { name: "Power Outage", icon: Zap, color: "from-warning-DEFAULT to-accent-500", steps: 12, lastTriggered: "Never" },
            { name: "Security Threat", icon: Shield, color: "from-danger-DEFAULT to-pink-500", steps: 15, lastTriggered: "Never" },
          ].map((p) => (
            <div key={p.name} className="glass-card p-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-2`}>
                <p.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-white font-semibold">{p.name}</div>
              <div className="text-white/50 text-xs mt-1">{p.steps} automated steps • Last: {p.lastTriggered}</div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
