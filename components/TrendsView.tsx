import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";

type StadiumFactor = {
  team: string;
  name: string;
  park_factor: number;
  hr_factor: number;
};

type WeatherFactor = {
  condition: string;
  run_factor: number;
  hr_factor: number;
};

type Momentum = {
  team: string;
  last10: string;
  momentum: number;
};

type LeagueScoringTrends = {
  avg_runs_per_game: number;
  avg_hr_per_game: number;
  run_trend_7d: number;
  hr_trend_7d: number;
  run_trend_30d: number;
  hr_trend_30d: number;
};

type TeamStreak = {
  team: string;
  streak: string;
  type: "hot" | "cold";
};

type Trends = {
  stadium_factors: StadiumFactor[];
  weather_factors: WeatherFactor[];
  momentum: Momentum[];
  league_scoring_trends: LeagueScoringTrends;
  team_streaks: TeamStreak[];
};

export default function TrendsView({ trends }: { trends: Trends }) {
  if (!trends) {
    return <div className="text-gray-400 p-4">No trends data available.</div>;
  }

  const {
    stadium_factors = [],
    weather_factors = [],
    momentum = [],
    league_scoring_trends = {},
    team_streaks = [],
  } = trends;

  return (
    <div className="space-y-10">

      {/* Stadium HR Factors */}
      <section>
        <SectionHeader title="Stadium HR Factors" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stadium_factors.map((s, idx) => (
            <Card key={idx}>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-white font-semibold">{s.name}</div>
                  <div className="text-gray-500 text-xs">{s.team}</div>
                </div>
                <div className="text-xs text-gray-400">
                  HR Factor: {s.hr_factor.toFixed(2)}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Weather Factors */}
      <section>
        <SectionHeader title="Weather Impact" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {weather_factors.map((w, idx) => (
            <Card key={idx}>
              <div className="flex justify-between items-center">
                <div className="text-white font-semibold">{w.condition}</div>
                <div className="text-xs text-gray-400">
                  Runs: {w.run_factor} | HRs: {w.hr_factor}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Momentum */}
      <section>
        <SectionHeader title="Team Momentum (Last 10)" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {momentum.map((m, idx) => (
            <Card key={idx}>
              <div className="flex justify-between items-center">
                <div className="text-white font-semibold">{m.team}</div>
                <div className="text-xs text-gray-400">
                  {m.last10} — {(m.momentum * 100).toFixed(0)}%
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* League Scoring Trends */}
      <section>
        <SectionHeader title="League Scoring Trends" />
        <Card>
          <div className="text-sm text-gray-300 space-y-1">
            <div>Avg Runs/Game: {league_scoring_trends.avg_runs_per_game}</div>
            <div>Avg HR/Game: {league_scoring_trends.avg_hr_per_game}</div>
            <div>7‑Day Run Trend: {league_scoring_trends.run_trend_7d}</div>
            <div>7‑Day HR Trend: {league_scoring_trends.hr_trend_7d}</div>
            <div>30‑Day Run Trend: {league_scoring_trends.run_trend_30d}</div>
            <div>30‑Day HR Trend: {league_scoring_trends.hr_trend_30d}</div>
          </div>
        </Card>
      </section>

      {/* Hot / Cold Teams */}
      <section>
        <SectionHeader title="Hot & Cold Teams" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team_streaks.map((t, idx) => (
            <Card
              key={idx}
              >
              <div className="flex justify-between items-center">
                <div className="text-white font-semibold">{t.team}</div>
                <div className="text-xs text-gray-300">{t.streak}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

    </div>
  );
}
