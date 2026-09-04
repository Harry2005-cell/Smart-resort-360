"use client";

import { useEffect, useState } from "react";
import { Users, Search, Crown, AlertCircle } from "lucide-react";
import { PageHeader, PageContainer } from "@/components/dashboard/page-header";
import { cn, formatINR } from "@/lib/utils";

interface Guest {
  id: string; name: string; email: string; phone: string; nationality: string;
  loyaltyTier: string; loyaltyPoints: number; totalStays: number; totalSpend: number;
  isVIP: boolean; frictionScore: number; satisfactionScore: number;
  currentRoom: string | null; openIssues: number;
  dna: { luxury: number; adventure: number; food: number; spa: number; priceSensitivity: number; family: number; };
}

const TIER_COLORS: Record<string, string> = {
  BRONZE: "text-amber-700",
  SILVER: "text-white/70",
  GOLD: "text-accent-400",
  PLATINUM: "text-cyan-300",
  DIAMOND: "text-purple-300",
};

export default function GuestsListPage() {
  const [data, setData] = useState<{ guests: Guest[]; total: number } | null>(null);
  const [search, setSearch] = useState("");
  const [tier, setTier] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (tier) params.set("tier", tier);
    params.set("limit", "30");
    const t = setTimeout(() => {
      fetch(`/api/guests?${params}`).then((r) => r.json()).then(setData);
    }, 200);
    return () => clearTimeout(t);
  }, [search, tier]);

  return (
    <PageContainer>
      <PageHeader title="Guest Directory" description="Active guest profiles with AI-driven insights" icon={Users} />

      <div className="glass-card p-4 mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email..." className="input pl-9" />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {["", "DIAMOND", "PLATINUM", "GOLD", "SILVER", "BRONZE"].map((t) => (
            <button key={t || "ALL"} onClick={() => setTier(t)} className={cn("px-3 py-1.5 rounded-lg text-xs font-semibold", tier === t ? "bg-brand-500/30 text-white border border-brand-500/40" : "bg-white/5 text-white/60 hover:text-white")}>
              {t || "All"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {(data?.guests || []).map((g) => (
          <div key={g.id} className="glass-card-hover p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold">
                  {g.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="text-white font-semibold flex items-center gap-1.5">
                    {g.name}
                    {g.isVIP && <Crown className="w-3.5 h-3.5 text-accent-400" />}
                  </div>
                  <div className={cn("text-xs font-semibold", TIER_COLORS[g.loyaltyTier])}>{g.loyaltyTier}</div>
                </div>
              </div>
              {g.openIssues > 0 && (
                <span className="badge-red text-[9px] flex items-center gap-1"><AlertCircle className="w-2.5 h-2.5" />{g.openIssues}</span>
              )}
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between"><span className="text-white/40">Nationality</span><span className="text-white/80">{g.nationality}</span></div>
              <div className="flex justify-between"><span className="text-white/40">Stays</span><span className="text-white/80">{g.totalStays}</span></div>
              <div className="flex justify-between"><span className="text-white/40">Total Spend</span><span className="text-white/80 font-semibold">{formatINR(g.totalSpend)}</span></div>
              <div className="flex justify-between"><span className="text-white/40">Current Room</span><span className="text-white/80">{g.currentRoom || "—"}</span></div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
              <div className="text-center glass-card p-1.5"><div className="text-white/40">Satis.</div><div className={cn("font-bold", g.satisfactionScore > 85 ? "text-success-light" : g.satisfactionScore > 70 ? "text-warning-light" : "text-danger-light")}>{g.satisfactionScore.toFixed(0)}</div></div>
              <div className="text-center glass-card p-1.5"><div className="text-white/40">Friction</div><div className={cn("font-bold", g.frictionScore < 30 ? "text-success-light" : g.frictionScore < 60 ? "text-warning-light" : "text-danger-light")}>{g.frictionScore.toFixed(0)}</div></div>
              <div className="text-center glass-card p-1.5"><div className="text-white/40">Pts</div><div className="text-white font-bold">{g.loyaltyPoints}</div></div>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
