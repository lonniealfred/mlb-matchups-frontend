// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import MatchupsView from "@/components/MatchupsView";
import PitchersView from "@/components/PitchersView";
import HittersView from "@/components/HittersView";
import TrendsView from "@/components/TrendsView";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function HomePage() {
  const [tab, setTab] = useState<"matchups" | "pitchers" | "hitters" | "trends">("matchups");
  const [loading, setLoading] = useState(true);
  const [matchups, setMatchups] = useState<any[]>([]);
  const [pitchers, setPitchers] = useState<any[]>([]);
  const [hitters, setHitters] = useState<any[]>([]);
  const [trends, setTrends] = useState<any | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/dashboard`);
        const data = await res.json();

        setMatchups(data.matchups || []);
        setPitchers(data.pitchers || []);
        setHitters(data.hitters || []);
        setTrends(data.trends || null);
      } catch (e) {
        console.error("Failed to load dashboard data", e);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold">MLB Matchups Dashboard</h1>
          <p className="text-gray-400">
            Live lineups, hitters, and game insights
          </p>
          <p className="text-sm text-gray-500 mt-2">
            All game times in Eastern Time (ET)
          </p>
        </header>

        {/* Tabs */}
        <div className="mb-6">
          <Tabs tab={tab} setTab={setTab} />
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-gray-400">Loading today&apos;s slate...</div>
        ) : (
          <>
            {tab === "matchups" && <MatchupsView games={matchups} />}
            {tab === "pitchers" && <PitchersView pitchers={pitchers} />}
            {tab === "hitters" && <HittersView hitters={hitters} />}
            {tab === "trends" && trends && <TrendsView trends={trends} />}
          </>
        )}
      </div>
    </main>
  );
}
