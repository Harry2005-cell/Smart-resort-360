"use client";

import { Bot } from "lucide-react";
import { PageHeader, PageContainer } from "@/components/dashboard/page-header";
import ConciergeChat from "@/app/(dashboard)/guests/concierge/concierge-chat";

export default function CopilotPage() {
  return (
    <PageContainer>
      <PageHeader title="AI Copilot" description="Conversational AI with full resort context" icon={Bot} badge="AI" />
      <div className="h-[calc(100vh-220px)]">
        <ConciergeChat />
      </div>
    </PageContainer>
  );
}
