"use client";

import { useEffect, useState } from "react";
import PitchingCard from "./PitchingCard";

export default function PitchingLeaderboard() {
  const [pitchers, setPitchers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pitching")
      .then((r) => r.json())
      .then((data) => {
        setPitchers(data.pitchers || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-gray-400 text-sm">Loading pitching matchups…</div>;
  }

  if (!pitchers.length) {
    return <div className="text-gray-400 text-sm">No pitching data available.</div>;
  }

  return (
    <div className="space-y-4">
      {pitchers.map((p, i) => (
        <PitchingCard key={i} pitcher={p} />
      ))}
    </div>
  );
}
