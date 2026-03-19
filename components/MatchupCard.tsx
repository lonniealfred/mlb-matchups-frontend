import Image from "next/image";
import teamData from "@/lib/teamData";

export default function MatchupCard({ game }: { game: any }) {
  const home = teamData[game.home_team] || {};
  const away = teamData[game.away_team] || {};

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex flex-col items-center text-center gap-1">

      {/* Top Row: Logos + Teams + Records */}
      <div className="flex items-center justify-between w-full">
        {away.logo && (
          <Image src={away.logo} alt={game.away_team} width={40} height={40} />
        )}

        <div className="flex flex-col items-center px-2">
          <div className="text-white font-semibold text-sm">
            {game.away_team} ({game.away_record}) vs {game.home_team} ({game.home_record})
          </div>

          {typeof game.hr_factor === "number" && (
            <div className="text-green-400 text-xs font-mono">
              HR Factor {game.hr_factor.toFixed(2)}
            </div>
          )}
        </div>

        {home.logo && (
          <Image src={home.logo} alt={game.home_team} width={40} height={40} />
        )}
      </div>

      {/* Pitchers */}
      <div className="text-gray-300 text-sm">
        {game.away_pitcher} vs {game.home_pitcher}
      </div>

      {/* Hitters */}
      {game.away_hitter && game.home_hitter && (
        <div className="text-gray-400 text-xs">
          {game.away_hitter} vs {game.home_hitter}
        </div>
      )}

      {/* Game Time */}
      <div className="text-gray-500 text-xs mt-1">
        {game.game_time}
      </div>

      {/* Betting Line (optional) */}
      {game.line && (
        <div className="w-full mt-1 text-xs text-gray-300 flex justify-between">
          <span>{game.line}</span>
        </div>
      )}
    </div>
  );
}
