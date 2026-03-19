// components/MatchupRow.tsx
import teamData from "@/lib/teamData";

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

export default function MatchupRow({ game }: { game: Game }) {
  const home = teamData[game.home_team] || {};
  const away = teamData[game.away_team] || {};

  return (
    <div className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
      {/* Left: Teams + records */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-white font-semibold">
            {game.away_team}
          </div>
          {game.away_record && (
            <div className="text-xs text-gray-400">
              {game.away_record}
            </div>
          )}
        </div>
        <div className="text-gray-500 text-xs">at</div>
        <div>
          <div className="text-white font-semibold">
            {game.home_team}
          </div>
          {game.home_record && (
            <div className="text-xs text-gray-400">
              {game.home_record}
            </div>
          )}
        </div>
      </div>

      {/* Middle: time + pitchers */}
      <div className="text-center text-xs text-gray-300">
        {game.game_time && (
          <div className="text-sm text-white mb-1">
            {game.game_time}
          </div>
        )}
        <div>
          {game.away_pitcher}{" "}
          <span className="text-gray-500">vs</span>{" "}
          {game.home_pitcher}
        </div>
      </div>

      {/* Right: featured hitters */}
      <div className="flex flex-col text-xs text-gray-300 text-right">
        {game.away_featured_hitter && (
          <div>
            <span className="text-white font-semibold">
              {game.away_featured_hitter.name}
            </span>{" "}
            <span className="text-gray-400">
              {game.away_featured_hitter.avg} AVG,{" "}
              {game.away_featured_hitter.hr} HR
            </span>
          </div>
        )}
        {game.home_featured_hitter && (
          <div>
            <span className="text-white font-semibold">
              {game.home_featured_hitter.name}
            </span>{" "}
            <span className="text-gray-400">
              {game.home_featured_hitter.avg} AVG,{" "}
              {game.home_featured_hitter.hr} HR
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
