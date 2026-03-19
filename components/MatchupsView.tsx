// components/MatchupsView.tsx
import MatchupRow from "@/components/MatchupRow";

type Hitter = {
  name: string;
  avg: string;
  hr: number;
};

type Game = {
  game_id: string;
  home_team: string;
  away_team: string;
  home_record?: string;
  away_record?: string;
  game_time?: string;
  home_pitcher?: string;
  away_pitcher?: string;
  home_featured_hitter?: Hitter;
  away_featured_hitter?: Hitter;
};

export default function MatchupsView({ games }: { games: Game[] }) {
  if (!games || games.length === 0) {
    return (
      <div className="text-gray-400">
        No matchups available for today.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {games.map((g) => (
        <MatchupRow key={g.game_id} game={g} />
      ))}
    </div>
  );
}
