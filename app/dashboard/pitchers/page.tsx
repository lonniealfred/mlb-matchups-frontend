"use client";

import { useEffect, useState } from "react";
import DashboardTabs from "@/components/DashboardTabs";
import DifficultyBadge from "@/components/DifficultyBadge";
import { fetchDashboard } from "@/lib/api";
import playerPhotos from "@/data/playerPhotos";

function getPhoto(name: string) {
  return playerPhotos[name] || playerPhotos["default"];
}

export default function PitchersPage() {
  const [pitchers, setPitchers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchDashboard();
        setPitchers(data.pitchers || []);
      } catch (err) {
        console.error("Pitcher leaderboard fetch failed:", err);
        setPitchers([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 tracking-tight">Pitcher Leaderboard</h1>
      <DashboardTabs />

      {loading ? (
        <p className="text-gray-500 mt-6">Loading pitchers...</p>
      ) : pitchers.length === 0 ? (
        <p className="text-gray-500 mt-6">No pitcher data available.</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700 text-gray-300 text-sm">
                <th className="py-2">Pitcher</th>
                <th className="py-2">Team</th>
                <th className="py-2">ERA</th>
                <th className="py-2">WHIP</th>
                <th className="py-2">K/9</th>
                <th className="py-2">Opponent AVG</th>
                <th className="py-2">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {pitchers.map((p, i) => (
                <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/40">
                  <td className="py-2 flex items-center gap-3">
                    <img
                      src={getPhoto(p.name)}
                      alt={p.name}
                      className="w-8 h-8 rounded-full object-cover border border-white/10"
                    />
                    <span className="font-medium">{p.name}</span>
                  </td>

                  <td className="py-2">{p.team}</td>
                  <td className="py-2">{p.era}</td>
                  <td className="py-2">{p.whip}</td>
                  <td className="py-2">{p.k9}</td>
                  <td className="py-2">{p.opp_avg}</td>

                  <td className="py-2">
                    <DifficultyBadge value={p.difficulty ?? 0} />
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
