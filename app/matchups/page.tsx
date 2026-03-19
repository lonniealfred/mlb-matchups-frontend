"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import Section from "@/components/Section";
import MatchupCard from "@/components/MatchupCard";

export default function MatchupsPage() {
  const [matchups, setMatchups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mlb-matchups-backend.onrender.com/matchups")
      .then((res) => res.json())
      .then((data) => {
        setMatchups(data.matchups || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        {/* Hero Header */}
        <DashboardHeader
          title="Today's MLB Matchups"
          subtitle="Live lineups, hitters, and game insights"
          date={new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        />

        {/* Tabs */}
        <div className="flex gap-6 text-gray-400 border-b border-gray-800 pb-3">
          <span className="text-white font-semibold border-b-2 border-white pb-1">
            Matchups
          </span>
          <a href="/pitchers" className="hover:text-white">Pitchers</a>
          <a href="/hitters" className="hover:text-white">Hitters</a>
          <a href="/trends" className="hover:text-white">Trends</a>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-gray-400 pt-4">Loading matchups...</div>
        )}

        {/* Matchups Section */}
        {!loading && (
          <Section
            title="Today's Matchups"
            description="All game times in Eastern Time (ET)"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchups.map((g, idx) => (
                <MatchupCard key={idx} game={g} />
              ))}
            </div>
          </Section>
        )}

      </main>
    </div>
  );
}
