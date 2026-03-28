"use client";

import { useEffect, useState } from "react";
import TopHittersCard from "@/components/TopHittersCard";

export default function TopHitters() {
  const [hitters, setHitters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setHitters(data.hitters || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-gray-400 text-sm">
        Loading top hitters…
      </div>
    );
  }

  if (!hitters.length) {
    return (
      <div className="text-gray-400 text-sm">
        No hitter data available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {hitters.map((hitter, i) => (
        <TopHittersCard key={i} hitters={[hitter]} />
      ))}
    </div>
  );
}
