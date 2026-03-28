"use client";

import Image from "next/image";
import teamLogos from "@/data/teamLogos";
import teamColors from "@/data/teamColors";

interface Pitcher {
  name: string;
  era?: string;
  whip?: string;
}

interface Hitter {
  name: string;
  avg?: string;
  hr?: number;
}

interface Lineup {
  hitters: Hitter[];
}

interface Weather {
  temp?: number;
  wind_speed?: number;
  wind_dir?: string;
  condition?: string;
}

interface Game {
  home_team: string;
  away_team: string;

  home_pitcher?: Pitcher;
  away_pitcher?: Pitcher;

  home_lineup?: Lineup;
  away_lineup?: Lineup;

  stadium?: string;
  stadium_hr_factor?: number;

  weather?: Weather;

  start_time: string;
}

export default function MatchupCard({ game }: { game: Game }) {
  if (!game) return null;

  const {
    home_team,
    away_team,
    home_pitcher,
    away_pitcher,
    home_lineup,
    away_lineup,
    stadium,
    stadium_hr_factor,
    weather,
    start_time,
  } = game;

  const homeLogo = teamLogos[home_team] || "/teams/default.png";
  const awayLogo = teamLogos[away_team] || "/teams/default.png";

  const homeColor = teamColors[home_team]?.[0] || "#444";
  const awayColor = teamColors[away_team]?.[0] || "#444";

  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition">
      {/* Header */}
      <div
        className="rounded-md p-3 mb-3 text-center text-white font-semibold"
        style={{
          background: `linear-gradient(90deg, ${awayColor}, ${homeColor})`,
        }}
      >
        {away_team} @ {home_team}
      </div>

      {/* Teams Row */}
      <div className="flex items-center justify-between mb-4">
        {/* Away */}
        <div className="flex items-center space-x-2">
          <Image src={awayLogo} alt={away_team} width={40} height={40} />
          <span className="text-lg font-bold">{away_team}</span>
        </div>

        <span className="text-gray-400 text-sm">vs</span>

        {/* Home */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold">{home_team}</span>
          <Image src={homeLogo} alt={home_team} width={40} height={40} />
        </div>
      </div>

      {/* Pitchers */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Away Pitcher */}
        <div className="bg-[#0d0d0d] p-3 rounded-lg border border-gray-800">
          <h3 className="text-sm text-gray-400 mb-1">Away Pitcher</h3>
          <p className="font-semibold text-white">{away_pitcher?.name ?? "—"}</p>
          <p className="text-gray-400 text-xs">
            ERA: {away_pitcher?.era ?? "—"} | WHIP: {away_pitcher?.whip ?? "—"}
          </p>
        </div>

        {/* Home Pitcher */}
        <div className="bg-[#0d0d0d] p-3 rounded-lg border border-gray-800">
          <h3 className="text-sm text-gray-400 mb-1">Home Pitcher</h3>
          <p className="font-semibold text-white">{home_pitcher?.name ?? "—"}</p>
          <p className="text-gray-400 text-xs">
            ERA: {home_pitcher?.era ?? "—"} | WHIP: {home_pitcher?.whip ?? "—"}
          </p>
        </div>
      </div>

      {/* Stadium + HR Factor */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-gray-400 text-xs">Stadium</p>
          <p className="text-white font-semibold">{stadium ?? "Unknown"}</p>
        </div>

        <div className="bg-blue-900 text-blue-300 px-3 py-1 rounded-md text-xs font-semibold">
          HR Factor: {stadium_hr_factor ?? "—"}
        </div>
      </div>

      {/* Weather */}
      <div className="bg-[#0d0d0d] p-3 rounded-lg border border-gray-800 mb-4">
        <h3 className="text-sm text-gray-400 mb-1">Weather</h3>
        <p className="text-gray-300 text-xs">
          {weather?.condition ?? "—"} | {weather?.temp ?? "—"}°F | Wind:{" "}
          {weather?.wind_speed ?? "—"} mph {weather?.wind_dir ?? ""}
        </p>
      </div>

      {/* Lineups */}
      <div className="grid grid-cols-2 gap-4">
        {/* Away Lineup */}
        <div>
          <h3 className="text-sm text-gray-400 mb-1">{away_team} Lineup</h3>
          <ul className="text-xs text-gray-300 space-y-1">
            {away_lineup?.hitters?.length ? (
              away_lineup.hitters.map((h, i) => (
                <li key={i}>
                  {i + 1}. {h.name} — AVG {h.avg ?? "—"} | HR {h.hr ?? "—"}
                </li>
              ))
            ) : (
              <li>No lineup available</li>
            )}
          </ul>
        </div>

        {/* Home Lineup */}
        <div>
          <h3 className="text-sm text-gray-400 mb-1">{home_team} Lineup</h3>
          <ul className="text-xs text-gray-300 space-y-1">
            {home_lineup?.hitters?.length ? (
              home_lineup.hitters.map((h, i) => (
                <li key={i}>
                  {i + 1}. {h.name} — AVG {h.avg ?? "—"} | HR {h.hr ?? "—"}
                </li>
              ))
            ) : (
              <li>No lineup available</li>
            )}
          </ul>
        </div>
      </div>

      {/* Start Time */}
      <div className="text-center text-gray-400 text-xs mt-4">
        First Pitch: {start_time}
      </div>
    </div>
  );
}
