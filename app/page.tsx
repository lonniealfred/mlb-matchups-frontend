"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import Section from "@/components/Section";
import GameRow from "@/components/GameRow";

export default function HomePage() {
  const [unified, setUnified] = useState<any[]>([]);
  const [pitchingMatchups, setPitchingMatchups] = useState<any[]>([]);
  const [stadiumFactors, setStadiumFactors] = useState<any[]>([]);
  const [topHitters, setTopHitters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("https://mlb-matchups-backend.onrender.com/matchups").then(r => r.json()),
      fetch("https://mlb-matchups-backend.onrender.com/pitchers").then(r => r.json()),
      fetch("https://mlb-matchups-backend.onrender.com/hitters").then(r => r.json()),
      fetch("https://mlb-matchups-backend.onrender.com/trends").then(r => r.json())
    ])
      .then(([m, p, h, t]) => {
        const matchups = m.matchups || [];
        const pitchers = p.pitchers || [];
        const hitters = h.hitters || [];
        const trends = t || {};

        const merged = matchups.map((game: any) => {
          const pitcher = pitchers.find((pp: any) => pp.game_id === game.game_id);
          const hitter = hitters.find((hh: any) => hh.game_id === game.game_id);
          const factor = trends.stadium_factors?.find((ff: any) => ff.game_id === game.game_id);

          return {
            ...game,
            ...pitcher,
            ...hitter,
            hr_factor: factor?.hr_factor
          };
        });

        setUnified(merged);
        setPitchingMatchups(trends.top_pitchers || []);
        setStadiumFactors(trends.stadium_factors || []);
        setTopHitters(trends.top_hitters || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-10">

        <DashboardHeader
          title="Today's MLB Matchups"
          subtitle="Live lineups, hitters, and game insights"
          date={new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric"
          })}
        />

        <div className="flex gap-6 text-gray-400 border-b border-gray-800 pb-3">
          <span className="text-white font-semibold border-b-2 border-white pb-1">
            Matchups
          </span>
          <a href="/pitchers" className="hover:text-white">Pitchers</a>
          <a href="/hitters" className="hover:text-white">Hitters</a>
          <a href="/trends" className="hover:text-white">Trends</a>
        </div>

        <div className="text-xs text-gray-500">
          All game times in Eastern Time (ET)
        </div>

        {loading && (
          <div className="text-gray-400 pt-4">Loading today&apos;s slate...</div>
        )}

        {!loading && (
          <div className="space-y-10">

            <Section title="Today's MLB Matchups">
              <div className="space-y-4">
                {unified.map(game => (
                  <GameRow key={game.game_id} game={game} />
                ))}
              </div>
            </Section>

            <Section title="Pitching Matchups">
              <div className="space-y-3">
                {pitchingMatchups.map((p: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-gray-900 border border-gray-800 rounded-lg px-3 py-2"
                  >
                    <div className="text-white font-semibold">
                      {p.name} ({p.team})
                    </div>
                    <div className="text-xs text-gray-400">
                      ERA: {p.era} · WHIP: {p.whip}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Stadium HR Factors">
              <div className="space-y-3">
                {stadiumFactors.map((s: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-gray-900 border border-gray-800 rounded-lg px-3 py-2"
                  >
                    <div className="text-white font-semibold">
                      {s.park_name || `${s.home_team} Stadium`}
                    </div>
                    <div className="text-xs text-gray-400">
                      HR Factor: {s.hr_factor}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Top Hitters">
              <div className="space-y-3">
                {topHitters.map((h: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-gray-900 border border-gray-800 rounded-lg px-3 py-2"
                  >
                    <div>
                      <div className="text-white font-semibold">
                        {h.name} ({h.team})
                      </div>
                      <div className="text-xs text-gray-400">
                        Score: {h.score}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      BvP HRs: {h.bvp_hrs} ({h.bvp_hr_points} pts)
                      <br />
                      BvP AVG: {h.bvp_avg} ({h.bvp_avg_points} pts)
                      <br />
                      Hit Streak: {h.hit_streak} games ({h.hit_streak_points} pts)
                    </div>
                  </div>
                ))}
              </div>
            </Section>

          </div>
        )}

      </main>
    </div>
  );
}
