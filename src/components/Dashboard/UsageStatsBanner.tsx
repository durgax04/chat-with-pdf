"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { getUserUsageStats } from "@/lib/action/chatActions";

export const UsageStatsBanner = () => {
  const [stats, setStats] = useState({ pdfCount: 0, messageCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const data = await getUserUsageStats(); // calls
      if (!data.error) {
        setStats({ pdfCount: data.pdfCount, messageCount: data.messageCount });
      }
      setLoading(false);
    }
    fetchStats();
  }, []);

  if (loading) return null;

  const messagesLeft = Math.max(0, 4 - stats.messageCount);

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 p-4 rounded-xl bg-card border border-border shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-sm">Account Usage Credits</h4>
          <p className="text-xs text-muted-foreground">
            Track your free plan tier allocations.
          </p>
        </div>
      </div>

      <div className="flex gap-4 text-sm font-medium">
        <div className="px-3 py-1.5 rounded-lg bg-muted text-card-foreground">
          PDFs: <span className="font-bold text-primary">{stats.pdfCount}/2</span> used
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-muted text-card-foreground">
          Messages: <span className="font-bold text-primary">{messagesLeft}</span> left
        </div>
      </div>
    </div>
  );
};