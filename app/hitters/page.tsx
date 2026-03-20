"use client";

import { useEffect, useState } from "react";
import TopHittersGrid from "@/components/TopHittersGrid";
import HittersLeaderboard from "@/components/HittersLeaderboard";

export default function HittersPage() {
  const [hitters, setHitters] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hitters`);
        const data = await res.json();
        setHitters(data.hitters || []);
      } catch (err) {
        console.error("Failed to load hitters", err);
      }
    }
    load();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-white">Top Hitters</h1>

      {/* Top 10 Grid */}
      <TopHittersGrid hitters={hitters} />

      {/* Full Leaderboard */}
      <HittersLeaderboard hitters={hitters} />
    </div>
  );
}
