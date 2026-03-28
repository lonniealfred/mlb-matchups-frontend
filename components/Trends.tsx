"use client";

import { useEffect, useState } from "react";

export default function Trends() {
  const [trends, setTrends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/trends")
      .then((res) => res.json())
      .then((data) => {
        setTrends(data.trends || []);   // ⭐ ALWAYS fallback to []
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-gray-400">Loading trends…</div>;
  }

  if (!trends.length) {
    return <div className="text-gray-400">No trend data available.</div>;
  }

  return (
    <div className="space-y-3">
      {trends.map((t, i) => (
        <div
          key={i}
          className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex justify-between"
        >
          <div>
            <div className="text-white font-semibold">{t.label}</div>
            <div className="text-gray-400 text-sm">{t.description}</div>
          </div>

          <div className="text-right">
            <div className="text-white font-bold">{t.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
