"use client";

import { getPitcherTier } from "@/lib/pitchingTiers";

interface Pitcher {
  name: string;
  team: string;
  score: number;
  score_breakdown: Record<string, number>;
}

export default function PitchingCard({ pitcher }: { pitcher: Pitcher }) {
  if (!pitcher) return null;

  const tier = getPitcherTier(pitcher.score);
  const breakdown = pitcher.score_breakdown || {};

  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-white">{pitcher.name}</h2>
        <span
          className={`px-3 py-1 rounded-md text-xs font-semibold ${
            tier.color || "bg-gray-700 text-gray-300"
          }`}
        >
          {tier.label}
        </span>
      </div>

      {/* Score */}
      <div className="text-center mb-4">
        <p className="text-gray-400 text-xs">Pitcher Score</p>
        <p className="text-3xl font-bold text-white">{pitcher.score}</p>
      </div>

      {/* Breakdown */}
      <div className="bg-[#0d0d0d] p-3 rounded-lg border border-gray-800">
        <h3 className="text-sm text-gray-400 mb-2">Score Breakdown</h3>

        <ul className="text-xs text-gray-300 space-y-1">
          {Object.entries(breakdown).map(([key, value]) => (
            <li key={key} className="flex justify-between">
              <span className="capitalize">{key.replace(/_/g, " ")}</span>
              <span className="font-semibold">{value}</span>
            </li>
          ))}

          {Object.keys(breakdown).length === 0 && (
            <li className="text-gray-500">No breakdown available</li>
          )}
        </ul>
      </div>
    </div>
  );
}
