import MatchupCard from "./MatchupCard";

type Game = {
  game_id: string;
  home_team: string;
  away_team: string;
  home_record?: string;
  away_record?: string;
  home_pitcher?: string;
  away_pitcher?: string;
  home_hitter?: string;
  away_hitter?: string;
  game_time?: string;
  hr_factor?: number;
};

export default function MatchupsGrid({ games }: { games: Game[] }) {
  if (!games || games.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        No matchups available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {games.map((game) => (
        <MatchupCard key={game.game_id} game={game} />
      ))}
    </div>
  );
}
