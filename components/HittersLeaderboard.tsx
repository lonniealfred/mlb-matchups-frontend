"use client";

import { useState } from "react";
import Image from "next/image";
import teamData from "@/lib/teamData";

function getTier(score: number) {
  if (score >= 90) return "bg-green-600 text-white";
  if (score >= 75) return "bg-yellow-500 text-black";
  if (score >= 60) return "bg-blue-500 text-white";
  return "bg-red-600 text-white";
}

type HitterScore = {
  bvp_hr_points: number;
  bvp_avg_points: number;
  hit_streak_points: number;
  ballpark_hr_factor: number;
  raw_score: number;
  final_score: number;
};

type Hitter = {
  name: string;
  team: string;
  avg: number;
  hr: number;
  rbi: number;
  streak: number;
  opponent_pitcher: string;
  photo_url?: string;
  score: HitterScore;
};

type Props = {
  hitters: Hitter[];
};

export default function HittersLeaderboard({ hitters }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {hitters.map((hitter, idx) => {
        const team = teamData[hitter.team] || {};
        const accent = team.primary || "#3b82f6";
        const tier = getTier(hitter.score.final_score);
        const isOpen = openIndex === idx;

        return (
          <div
            key={idx}
            className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between px-4 py-3 text-left"
            >
              {/* Left: Photo + Name */}
              <div className="flex items-center gap-3">
                <Image
                  src={hitter.photo_url || "/players/default.png"}
                  alt={hitter.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="text-white font-semibold">{hitter.name}</div>
                  <div className="text-xs text-gray-400">{hitter.team}</div>
                </div>
              </div>

              {/* Score */}
              <div className="text-center">
                <div className={`px-3 py-1 rounded-lg text-sm font-bold ${tier}`}>
                  {hitter.score.final_score.toFixed(1)}
                </div>
                <div className="text-xs text-gray-400 mt-1">Score</div>
              </div>

              {/* Streak */}
              <div className="text-right">
                <div className="text-white font-semibold">
                  {hitter.streak}-game
                </div>
                <div className="text-xs text-gray-400">Streak</div>
              </div>
            </button>

            {/* Accent bar */}
            <div className="h-[3px] w-full" style={{ background: accent }} />

            {/* Expanded breakdown */}
            {isOpen && (
              <div
                className="px-4 py-3 space-y-3 bg-gray-950 border-t border-gray-800"
                style={{ backgroundColor: `${accent}22` }}
              >
                <div className="flex justify-between text-sm text-gray-300">
                  <span>BvP HR Points</span>
                  <span className="text-white font-semibold">
                    {hitter.score.bvp_hr_points}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-300">
                  <span>BvP AVG Points</span>
                  <span className="text-white font-semibold">
                    {hitter.score.bvp_avg_points}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-300">
                  <span>Hit Streak Points</span>
                  <span className="text-white font-semibold">
                    {hitter.score.hit_streak_points}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-300">
                  <span>Ballpark HR Factor</span>
                  <span className="text-white font-semibold">
                    {hitter.score.ballpark_hr_factor}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-300">
                  <span>Raw Score</span>
                  <span className="text-white font-semibold">
                    {hitter.score.raw_score.toFixed(1)}
                  </span>
                </div>

                <div className="pt-2 text-xs text-gray-400">
                  vs {hitter.opponent_pitcher}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
