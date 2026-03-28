"use client";

import DashboardTabs from "@/components/DashboardTabs";

export default function TrendsPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 tracking-tight">League Trends</h1>
      <DashboardTabs />

      <p className="text-gray-400 mt-6">
        Trends coming soon — stadium HR factors, weather impact, team momentum, and scoring patterns.
      </p>
    </div>
  );
}
