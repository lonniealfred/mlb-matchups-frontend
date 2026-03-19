"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import Section from "@/components/Section";
import HitterBreakdownRow from "@/components/HitterBreakdownRow";

export default function HittersPage() {
  const [hitters, setHitters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mlb-matchups-backend.onrender.com/hitters")
      .then(r => r.json())
      .then(h => {
        setHitters(h.hitters || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-10">

        <DashboardHeader
          title="Top Hitters"
          subtitle="Daily hitter performance scores and matchup insights"
          date={new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric"
          })}
        />

        <div className="flex gap-6 text-gray-400 border-b border-gray-800 pb-3">
          <a href="/" className="hover:text-white">Matchups</a>
          <a href="/pitchers" className="hover:text-white">Pitchers</a>
          <span className="text-white font-semibold border-b-2 border-white pb-1">Hitters</span>
          <a href="/trends" className="hover:text-white">Trends</a>
        </div>

        {loading && <div className="text-gray-400 pt-4">Loading hitters...</div>}

        {!loading && (
          <Section title="Top Hitters Breakdown">
            <div className="space-y-4">
              {hitters.map((h, idx) => (
                <HitterBreakdownRow
                  key={idx}
                  rank={idx + 1}
                  name={h.hitter.name}
                  team={h.hitter.team}
                  avg={h.hitter.avg}
                  hr={h.hitter.hr}
                  rbi={h.hitter.rbi}
                  score={h.hitter.hitter_score}
                />
              ))}
            </div>
          </Section>
        )}

      </main>
    </div>
  );
}
