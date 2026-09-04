"use client";

import { useEffect, useState } from "react";
import { Users, Activity, Coffee, BedDouble, Sparkles } from "lucide-react";
import { PageHeader, PageContainer } from "@/components/dashboard/page-header";
import { cn } from "@/lib/utils";

const DEPARTMENTS = [
  { name: "Housekeeping", count: 18, util: 94, color: "from-brand-500 to-brand-700" },
  { name: "F&B", count: 24, util: 71, color: "from-accent-500 to-accent-700" },
  { name: "Spa", count: 12, util: 52, color: "from-ai-DEFAULT to-purple-700" },
  { name: "Maintenance", count: 9, util: 83, color: "from-warning-DEFAULT to-accent-500" },
  { name: "Concierge", count: 8, util: 68, color: "from-emerald-500 to-emerald-700" },
  { name: "Front Desk", count: 6, util: 76, color: "from-brand-500 to-ai-DEFAULT" },
  { name: "Security", count: 5, util: 45, color: "from-danger-DEFAULT to-warning-DEFAULT" },
  { name: "Management", count: 4, util: 88, color: "from-ai-DEFAULT to-pink-500" },
];

const STAFF = [
  { name: "Kiran Bose", role: "Floor Supervisor", dept: "Housekeeping", status: "ON_DUTY", zone: "Block A, Floor 3", workload: 0.92, performance: 0.88 },
  { name: "Meera Singh", role: "Room Attendant", dept: "Housekeeping", status: "ON_DUTY", zone: "East Wing, Floor 2", workload: 0.78, performance: 0.94 },
  { name: "Arjun Das", role: "Technician", dept: "Maintenance", status: "ON_DUTY", zone: "Pool Area", workload: 0.65, performance: 0.86 },
  { name: "Ananya Sharma", role: "Spa Therapist", dept: "Spa", status: "BREAK", zone: "Azure Spa", workload: 0.32, performance: 0.91 },
  { name: "Vikram Iyer", role: "Chef de Partie", dept: "F&B", status: "ON_DUTY", zone: "Spice Garden", workload: 0.84, performance: 0.95 },
  { name: "Priya Reddy", role: "Concierge", dept: "Concierge", status: "ON_DUTY", zone: "Lobby", workload: 0.56, performance: 0.89 },
  { name: "Suresh Menon", role: "Bell Captain", dept: "Concierge", status: "OFF_DUTY", zone: "—", workload: 0, performance: 0.87 },
  { name: "Ravi Kumar", role: "Receptionist", dept: "Front Desk", status: "ON_DUTY", zone: "Reception", workload: 0.71, performance: 0.82 },
];

const STATUS_BADGE: Record<string, string> = {
  ON_DUTY: "badge-green",
  BREAK: "badge-yellow",
  OFF_DUTY: "badge-gray",
  ON_LEAVE: "badge-gray",
};

export default function StaffPage() {
  return (
    <PageContainer>
      <PageHeader title="Staff Management" description="Workforce optimization and real-time allocation" icon={Users} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Staff", value: 86, icon: Users, color: "brand" },
          { label: "On Duty", value: 64, icon: Activity, color: "success" },
          { label: "On Break", value: 12, icon: Coffee, color: "warning" },
          { label: "Avg Utilization", value: 76.4, icon: Sparkles, color: "ai", format: "percent" },
        ].map((s, i) => (
          <div key={i} className="kpi-card">
            <div className="flex items-center justify-between">
              <div className="metric-label">{s.label}</div>
              <s.icon className="w-4 h-4 text-white/30" />
            </div>
            <div className="metric-value">{(s.format === "percent" ? `${s.value}%` : s.value)}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 glass-card p-5">
          <div className="section-header mb-4">Department Utilization</div>
          <div className="space-y-3">
            {DEPARTMENTS.map((d) => (
              <div key={d.name}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={cn("w-2 h-2 rounded-full bg-gradient-to-br", d.color)} />
                    <span className="text-white font-medium">{d.name}</span>
                    <span className="text-white/40 text-xs">({d.count} staff)</span>
                  </div>
                  <span className={cn("text-sm font-semibold", d.util > 85 ? "text-danger-light" : d.util > 70 ? "text-warning-light" : "text-success-light")}>{d.util}%</span>
                </div>
                <div className="progress-bar">
                  <div className={cn("h-full rounded-full bg-gradient-to-r", d.color)} style={{ width: `${d.util}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="section-header mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-ai-light" /> AI Reallocation</div>
          <div className="space-y-3 text-sm">
            <div className="glass-card p-3 border-warning-DEFAULT/30">
              <div className="text-warning-light text-xs font-semibold mb-1">⚠️ Overloaded</div>
              <div className="text-white">Housekeeping at 94% — 8 rooms pending</div>
              <div className="text-white/50 text-xs mt-1">Move 2 spa therapists (idle until 3 PM) → Housekeeping for 90 min</div>
            </div>
            <div className="glass-card p-3 border-success-DEFAULT/30">
              <div className="text-success-light text-xs font-semibold mb-1">✓ Underutilized</div>
              <div className="text-white">Security at 45% — 3 idle officers</div>
              <div className="text-white/50 text-xs mt-1">Reassign to valet parking during 6-9 PM peak</div>
            </div>
            <button className="btn-ai w-full text-xs">Apply All Recommendations</button>
          </div>
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="section-header">Active Staff Roster</div>
          <span className="text-white/40 text-xs">{STAFF.length} shown</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 text-xs uppercase border-b border-white/5">
                <th className="text-left py-2 px-3">Name</th>
                <th className="text-left py-2 px-3">Role</th>
                <th className="text-left py-2 px-3">Department</th>
                <th className="text-left py-2 px-3">Zone</th>
                <th className="text-left py-2 px-3">Status</th>
                <th className="text-left py-2 px-3">Workload</th>
                <th className="text-left py-2 px-3">Performance</th>
              </tr>
            </thead>
            <tbody>
              {STAFF.map((s) => (
                <tr key={s.name} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="py-3 px-3 text-white font-medium">{s.name}</td>
                  <td className="py-3 px-3 text-white/70">{s.role}</td>
                  <td className="py-3 px-3 text-white/70">{s.dept}</td>
                  <td className="py-3 px-3 text-white/50 text-xs">{s.zone}</td>
                  <td className="py-3 px-3"><span className={STATUS_BADGE[s.status]}>{s.status.replace("_", " ")}</span></td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-gradient" style={{ width: `${s.workload * 100}%` }} />
                      </div>
                      <span className="text-white/60 text-xs">{(s.workload * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-success-light text-xs">{(s.performance * 100).toFixed(0)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
}
