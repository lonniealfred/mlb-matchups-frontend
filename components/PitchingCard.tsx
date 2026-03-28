"use client";

import { getPitcherTier } from "@/lib/pitchingTiers";

export default function PitchingCard({ pitcher }) {
  const tier = getPitcherTier(pitcher.score);

  const b = pitcher.score_breakdown;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-white font-semibold">{pitcher.name}</div>
          <div className="text-gray-400 text-sm">
            {pitcher.team} vs {pitcher.opponent}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">
            {pitcher.score}
          </div>
          <div
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs text-white ${tier.color}`}
          >
            {tier.label}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
        <div>
          <div className="text-gray-500">Opp Team AVG</div>
          <div>{pitcher.opponent_team_avg?.toFixed(3) ?? "---"}</div>
          <div className="text-gray-500">Rule 1</div>
          <div>{b.rule1_opponent_avg} pts</div>
        </div>

        <div>
          <div className="text-gray-500">ERA (Last 5)</div>
          <div>{pitcher.era_last5?.toFixed(2) ?? "---"}</div>
          <div className="text-gray-500">Rule 2</div>
          <div>{b.rule2_last5_era} pts</div>
        </div>

        <div>
          <div className="text-gray-500">HR Factor</div>
          <div>{pitcher.hr_factor ?? "---"}</div>
          <div className="text-gray-500">Rule 3</div>
          <div>{b.rule3_stadium_factor} pts</div>
        </div>

        <div>
          <div className="text-gray-500">Avg K (Last 4)</div>
          <div>{pitcher.avg_k_last4?.toFixed(1) ?? "---"}</div>
          <div className="text-gray-500">Rule 4</div>
          <div>{b.rule4_last4_k} pts</div>
        </div>
      </div>
    </div>
  );
}
