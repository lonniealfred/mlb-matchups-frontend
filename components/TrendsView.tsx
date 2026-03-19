type StadiumFactor = {
  park_name: string;
  hr_factor: number;
};

type TopHitter = {
  name: string;
  team: string;
  score: number;
  bvp_hrs?: number;
  bvp_hr_points?: number;
  bvp_avg?: number;
  bvp_avg_points?: number;
  hit_streak?: number;
  hit_streak_points?: number;
};

type Trends = {
  stadium_factors: StadiumFactor[];
  top_hitters: TopHitter[];
};

export default function TrendsView({ trends }: { trends: Trends }) {
  if (!trends) {
    return (
      <div className="text-gray-400 p-4">
        No trends data available.
      </div>
    );
  }

  const { stadium_factors, top_hitters } = trends;

  return (
    <div className="space-y-10">

      {/* Stadium HR Factors */}
      <div>
        <h2 className="text-white font-semibold text-lg mb-3">
          Stadium HR Factors
        </h2>
        <div className="space-y-3">
          {stadium_factors.map((s, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-gray-900 border border-gray-800 rounded-lg px-3 py-2"
            >
              <div className="text-white font-semibold">
                {s.park_name}
              </div>
              <div className="text-xs text-gray-400">
                HR Factor: {s.hr_factor}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Hitters */}
      <div>
        <h2 className="text-white font-semibold text-lg mb-3">
          Top Hitters
        </h2>
        <div className="space-y-3">
          {top_hitters.map((h, idx) => (
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
                BvP HRs: {h.bvp_hrs ?? 0} ({h.bvp_hr_points ?? 0} pts)
                <br />
                BvP AVG: {h.bvp_avg ?? 0} ({h.bvp_avg_points ?? 0} pts)
                <br />
                Hit Streak: {h.hit_streak ?? 0} games ({h.hit_streak_points ?? 0} pts)
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
