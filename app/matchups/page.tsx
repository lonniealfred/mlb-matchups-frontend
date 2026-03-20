"use client";

import { useEffect, useState } from "react";
import MatchupInsightsCard from "@/components/MatchupInsightsCard";

export default function MatchupsInsightsPage() {
  const [matchups, setMatchups] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matchups`);
        const data = await res.json();
        setMatchups(data.matchups || []);
      } catch (err) {
        console.error("Failed to load matchups", err);
      }
    }
    load();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-white">Matchup Insights</h1>

      <div className="space-y-6">
        {matchups.map((m, idx) => (
          <MatchupInsightsCard key={idx} matchup={m} />
        ))}
      </div>
    </div>
  );
}
