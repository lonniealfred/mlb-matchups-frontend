"use client";

import { useEffect, useState } from "react";
import DashboardTabs from "@/components/DashboardTabs";
import DifficultyBadge from "@/components/DifficultyBadge";
import { fetchDashboard } from "@/lib/api";
import playerPhotos from "@/data/playerPhotos";

function getPhoto(name: string) {
  return playerPhotos[name] || playerPhotos["default"];
}

export default function HittersPage() {
  const [hitters, setHitters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchDashboard();
        setHitters(data.hitters || []);
      } catch (err) {
        console.error("Hitter leaderboard fetch failed:", err);
        setHitters([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 tracking-tight">Hitter Leaderboard</h1>
      <DashboardTabs />

      {loading ? (
        <p className="text-gray-500 mt-6">Loading hitters...</p>
      ) : hitters.length === 0 ? (
        <p className="text-gray-500 mt-6">No hitter data available.</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700 text-gray-300 text-sm">
                <th className="py-2">Hitter</th>
                <th className="py-2">Team</th>
                <th className="py-2">AVG</th>
                <th className="py-2">HR</th>
                <th className="py-2">RBI</th>
                <th className="py-2">OPS</th>
                <th className="py-2">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {hitters.map((h, i) => (
                <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/40">
                  <td className="py-2 flex items-center gap-3">
                    <img
                      src={getPhoto(h.name)}
                      alt={h.name}
                      className="w-8 h-8 rounded-full object-cover border border-white/10"
                    />
                    <span className="font-medium">{h.name}</span>
                  </td>

                  <td className="py-2">{h.team}</td>
                  <td className="py-2">{h.avg}</td>
                  <td className="py-2">{h.hr}</td>
                  <td className="py-2">{h.rbi}</td>
                  <td className="py-2">{h.ops}</td>

                  <td className="py-2">
                    <DifficultyBadge value={h.difficulty ?? 0} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
