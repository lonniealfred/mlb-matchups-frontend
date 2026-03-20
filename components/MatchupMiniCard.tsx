import Image from "next/image";

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

type Pitcher = {
  name: string;
  team: string;
  era: number;
  whip: number;
  photo_url?: string;
};

type MatchupMiniCardProps = {
  hitter: Hitter;
  pitcher: Pitcher;
};

export default function MatchupMiniCard({ hitter, pitcher }: MatchupMiniCardProps) {
  return (
    <div className="rounded-xl bg-gray-900 border border-gray-800 p-4 space-y-3">
      {/* Hitter */}
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

      {/* VS */}
      <div className="text-center text-gray-500 text-xs">vs</div>

      {/* Pitcher */}
      <div className="flex items-center gap-3">
        <Image
          src={pitcher.photo_url || "/players/default.png"}
          alt={pitcher.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <div className="text-white font-semibold">{pitcher.name}</div>
          <div className="text-xs text-gray-400">{pitcher.team}</div>
        </div>
      </div>

      {/* Advantage bar */}
      <div className="mt-2 h-2 w-full bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-600"
          style={{ width: `${hitter.score.final_score}%` }}
        />
      </div>
    </div>
  );
}
