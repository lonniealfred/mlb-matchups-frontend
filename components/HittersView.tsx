"use client";

import { useEffect, useState } from "react";
import HitterCard from "@/components/HitterCard";

export default function HittersView() {
  const [hitters, setHitters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mlb-matchups-backend.onrender.com/hitters")
      .then((res) => res.json())
      .then((data) => {
        setHitters(data.hitters || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-gray-400 p-6">Loading hitters...</div>;
  }

  if (!hitters || hitters.length === 0) {
    return <div className="text-gray-400 p-6">No hitter data available.</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-white mb-4">Top Hitters</h2>

      {hitters.map((h, idx) => {
        if (!h || !h.hitter) return null;

        return (
          <HitterCard
            key={idx}
            hitter={h.hitter}
            team={h.team}
            rank={idx + 1}
          />
        );
      })}
    </div>
  );
}
