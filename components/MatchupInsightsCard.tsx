"use client";

import { useState } from "react";
import Image from "next/image";
import teamData from "@/lib/teamData";

type Pitcher = {
  name: string;
  team: string;
  era: number;
  whip: number;
  photo_url?: string;
};

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

type Matchup = {
  home_team: string;
  away_team: string;
  home_pitcher: Pitcher;
  away_pitcher: Pitcher;
  top_hitters: Hitter[];
};

type MatchupInsightsCardProps = {
  matchup: Matchup;
};

export default function MatchupInsightsCard({ matchup }: MatchupInsightsCardProps) {
  const [open, setOpen] = useState(false);

  const home = teamData[matchup.home_team] || {};
  const away = teamData[matchup.away_team] || {};

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-3">
          <Image
            src={home.logo || "/teams/default.png"}
            alt={matchup.home_team}
            width={32}
            height={32}
          />
          <span className="text-white font-semibold">{matchup.home_team}</span>

          <span className="text-gray-400 text-sm">vs</span>

          <span className="text-white font-semibold">{matchup.away_team}</span>
          <Image
            src={away.logo || "/teams/default.png"}
            alt={matchup.away_team}
            width={32}
            height={32}
          />
        </div>

        <div className="text-gray-400 text-xs">
          {open ? "Hide" : "Show"} insights
        </div>
      </button>

      {/* Expanded */}
      {open && (
        <div className="px-4 py-3 space-y-4 bg-gray-950 border-t border-gray-800">
          {/* Pitchers */}
          <div className="flex justify-between">
            <div>
              <div className="text-white font-semibold">
                {matchup.home_pitcher.name}
              </div>
              <div className="text-xs text-gray-400">
                ERA {matchup.home_pitcher.era} • WHIP {matchup.home_pitcher.whip}
              </div>
            </div>

            <div className="text-right">
              <div className="text-white font-semibold">
                {matchup.away_pitcher.name}
              </div>
              <div className="text-xs text-gray-400">
                ERA {matchup.away_pitcher.era} • WHIP {matchup.away_pitcher.whip}
              </div>
            </div>
          </div>

          {/* Top Hitters */}
          <div className="space-y-2">
            <div className="text-gray-300 text-sm font-semibold">
              Top Hitters
            </div>

            {matchup.top_hitters.map((hitter, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-lg px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={hitter.photo_url || "/players/default.png"}
                    alt={hitter.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div>
                    <div className="text-white font-semibold">{hitter.name}</div>
                    <div className="text-xs text-gray-400">{hitter.team}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-white font-bold">
                    {hitter.score.final_score.toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-400">Score</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
