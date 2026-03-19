"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import Section from "@/components/Section";

export default function TrendsPage() {
  const [trends, setTrends] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mlb-matchups-backend.onrender.com/trends")
      .then(r => r.json())
      .then(t => {
        setTrends(t || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-10">

        <DashboardHeader
          title="Trends"
          subtitle="League-wide analytics and ballpark factors"
          date={new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric"
          })}
        />

        <div className="flex gap-6 text-gray-400 border-b border-gray-800 pb-3">
          <a href="/" className="hover:text-white">Matchups</a>
          <a href="/pitchers" className="hover:text-white">Pitchers</a>
          <a href="/hitters" className="hover:text-white">Hitters</a>
          <span className="text-white font-semibold border-b-2 border-white pb-1">Trends</span>
        </div>

        {loading && <div className="text-gray-400 pt-4">Loading trends...</div>}

        {!loading && trends && (
          <div className="space-y-10">

            <Section title="Stadium HR Factors">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(trends.stadium_factors || []).map((s: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-gray-900 border border-gray-800 rounded-lg p-3 flex justify-between items-center"
                  >
                    <div>
                      <div className="text-white font-semibold">
                        {s.park_name || `${s.home_team} Stadium`}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {s.home_team} vs {s.away_team}
                      </div>
                    </div>
                    <div className="text-green-400 font-mono">
                      HR Factor: {s.hr_factor?.toFixed?.(2) ?? "–"}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="League Trends (Raw Data)">
              <pre className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-sm overflow-x-auto">
                {JSON.stringify(trends, null, 2)}
              </pre>
            </Section>

          </div>
        )}

      </main>
    </div>
  );
}
