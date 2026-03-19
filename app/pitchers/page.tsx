"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import Section from "@/components/Section";
import PitchingMatchupRow from "@/components/PitchingMatchupRow";

export default function PitchersPage() {
  const [pitchers, setPitchers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mlb-matchups-backend.onrender.com/pitchers")
      .then(r => r.json())
      .then(d => {
        setPitchers(d.pitchers || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-10">

        <DashboardHeader
          title="Pitchers"
          subtitle="ERA, WHIP, K/9, matchup scoring"
          date={new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric"
          })}
        />

        <div className="flex gap-6 text-gray-400 border-b border-gray-800 pb-3">
          <a href="/" className="hover:text-white">Matchups</a>
          <span className="text-white font-semibold border-b-2 border-white pb-1">Pitchers</span>
          <a href="/hitters" className="hover:text-white">Hitters</a>
          <a href="/trends" className="hover:text-white">Trends</a>
        </div>

        {loading && <div className="text-gray-400">Loading pitchers...</div>}

        {!loading && (
          <Section title="Pitching Matchups">
            <div className="space-y-4">
              {pitchers.map((p, i) => (
                <PitchingMatchupRow key={i} {...p} />
              ))}
            </div>
          </Section>
        )}

      </main>
    </div>
  );
}
