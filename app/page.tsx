"use client";

import { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import MatchupsView from "@/components/MatchupsView";
import PitchersView from "@/components/PitchersView";
import HittersLeaderboard from "@/components/HittersLeaderboard";
import TrendsView from "@/components/TrendsView";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

type Matchup = any;   // replace with your real types
type Pitcher = any;
type Hitter = any;
type Trend = any;

type TabType = "matchups" | "pitchers" | "hitters" | "trends";

export default function HomePage() {
  const [tab, setTab] = useState<TabType>("matchups");

  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [pitchers, setPitchers] = useState<Pitcher[]>([]);
  const [hitters, setHitters] = useState<Hitter[]>([]);
  const [trends, setTrends] = useState<Trend | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [matchupsRes, pitchersRes, hittersRes, trendsRes] =
          await Promise.all([
            fetch(`${API_BASE}/matchups`),
            fetch(`${API_BASE}/pitchers`),
            fetch(`${API_BASE}/hitters`),
            fetch(`${API_BASE}/trends`),
          ]);

        const [matchupsData, pitchersData, hittersData, trendsData] =
          await Promise.all([
            matchupsRes.json(),
            pitchersRes.json(),
            hittersRes.json(),
            trendsRes.json(),
          ]);

        setMatchups(matchupsData.games || matchupsData.matchups || []);
        setPitchers(pitchersData.pitchers || []);
        setHitters(hittersData.hitters || []);
        setTrends(trendsData || null);
      } catch (err) {
        console.error(err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold">MLB Matchups Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">
            Daily matchups, pitchers, hitters, and trends.
          </p>
        </header>

        {/* Tabs */}
        <div className="mb-6">
          <Tabs tab={tab} setTab={setTab} />
        </div>

        {/* Loading / Error */}
        {loading && (
          <div className="text-gray-400 text-sm">Loading today&apos;s slate…</div>
        )}
        {error && (
          <div className="text-red-500 text-sm mb-4">{error}</div>
        )}

        {/* Content */}
        {!loading && !error && (
          <div className="space-y-4">
            {tab === "matchups" && <MatchupsView games={matchups} />}
            {tab === "pitchers" && <PitchersView pitchers={pitchers} />}
            {tab === "hitters" && <HittersLeaderboard hitters={hitters} />}
            {tab === "trends" && trends && <TrendsView trends={trends} />}
          </div>
        )}
      </div>
    </main>
  );
}
