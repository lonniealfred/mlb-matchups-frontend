"use client";

import { useEffect, useState } from "react";
import MatchupInsightsCard from "@/components/MatchupInsightsCard";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL ||
  "http://localhost:8000";

export default function MatchupsInsightsPage() {
  const [matchups, setMatchups] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        // Fetch from the correct backend route
        const res = await fetch(`${API_BASE}/dashboard`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data = await res.json();

        // Your backend returns "games", not "matchups"
        setMatchups(data.games || []);
      } catch (err: any) {
        console.error("Failed to load matchups", err);
        setError(err.message);
      }
    }
    load();
  }, []);

  if (error) return <div className="text-red-500">Error loading matchups</div>;

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
