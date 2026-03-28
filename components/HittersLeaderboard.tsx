// app/components/HittersLeaderboard.tsx

"use client";

import Image from "next/image";

export default function HittersLeaderboard({ hitters }) {
  return (
    <div className="bg-gray-900 rounded-xl p-4 shadow-lg border border-gray-800">
      <h2 className="text-xl font-bold text-white mb-4">Hitters Leaderboard</h2>

      <div className="space-y-3">
        {hitters.map((h, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-gray-800 rounded-lg p-3"
          >
            {/* LEFT SIDE: Rank + Logo + Name */}
            <div className="flex items-center gap-3">
              <span className="text-gray-400 w-6 text-center">{i + 1}</span>

              {/* SAFE FALLBACK LOGO */}
              {h.logo ? (
                <Image
                  src={h.logo}
                  alt={h.team}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
              ) : (
                <div className="w-[28px] h-[28px] rounded-full bg-gray-700" />
              )}

              <div className="flex flex-col">
                <span className="text-white font-semibold">{h.name}</span>
                <span className="text-gray-400 text-sm">{h.team}</span>
              </div>
            </div>

            {/* RIGHT SIDE: Score */}
            <div className="text-right">
              <span className="text-white font-bold text-lg">{h.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
