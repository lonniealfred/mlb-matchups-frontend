"use client";

import Image from "next/image";

export default function TopHittersCard({ hitters }) {
  const items = Array.isArray(hitters) ? hitters : [];

  return (
    <div className="space-y-4">
      {items.map((h, i) => {
        // ⭐ Safe headshot URL guard
        const headshotUrl = h.player_id
          ? `https://a.espncdn.com/i/headshots/mlb/players/full/${h.player_id}.png`
          : "/default-headshot.png"; // fallback stored in /public

        return (
          <div
            key={i}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex gap-4"
          >
            {/* Team color stripe */}
            <div
              className="w-2 rounded-lg"
              style={{ backgroundColor: h.team_color }}
            />

            {/* Headshot */}
            <Image
              src={headshotUrl}
              alt={h.name}
              width={56}
              height={56}
              className="w-14 h-14 rounded-full object-cover"
            />

            {/* Info */}
            <div className="flex-1">
              <div className="text-white font-semibold">{h.name}</div>
              <div className="text-gray-400 text-sm">{h.team}</div>

              <div className="text-green-400 font-bold text-lg mt-1">
                {h.score}
              </div>

              {/* Score breakdown */}
              <div className="text-gray-400 text-xs mt-2 space-y-1">
                <div>BvP HRs: {h.bvp_hr} ({h.bvp_hr_points} pts)</div>
                <div>BvP AVG: {h.bvp_avg} ({h.bvp_avg_points} pts)</div>
                <div>Streak: {h.streak} ({h.streak_points} pts)</div>
                <div>
                  Ballpark Factor: {h.ballpark_hr_factor} ({h.ballpark_points} pts)
                </div>
                <div>Season OPS: {h.season_ops} ({h.season_points} pts)</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
