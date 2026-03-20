import Image from "next/image";
import teamData from "@/lib/teamData";

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

type TopHittersGridProps = {
  hitters: Hitter[];
};

export default function TopHittersGrid({ hitters }: TopHittersGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {hitters.slice(0, 10).map((hitter, idx) => {
        const team = teamData[hitter.team] || {};
        const accent = team.primary || "#3b82f6";

        return (
          <div
            key={idx}
            className="rounded-xl border bg-gray-900 p-4 flex items-center gap-4"
            style={{ borderColor: accent }}
          >
            <Image
              src={hitter.photo_url || "/players/default.png"}
              alt={hitter.name}
              width={48}
              height={48}
              className="rounded-full"
            />

            <div className="flex-1">
              <div className="text-white font-semibold">{hitter.name}</div>
              <div className="text-xs text-gray-400">{hitter.team}</div>

              <div className="mt-2 flex gap-3 text-xs text-gray-300">
                <span>AVG {hitter.avg}</span>
                <span>HR {hitter.hr}</span>
                <span>RBI {hitter.rbi}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-bold" style={{ color: accent }}>
                {hitter.score.final_score.toFixed(1)}
              </div>
              <div className="text-xs text-gray-400">Score</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
