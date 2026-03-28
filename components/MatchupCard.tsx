"use client";

import Image from "next/image";

export default function MatchupCard({ game }) {
  if (!game) return null;

  const {
    home_team,
    away_team,
    home_logo,
    away_logo,
    home_pitcher,
    away_pitcher,
    game_time,
    home_colors,
    away_colors,
    home_featured_hitter,
    away_featured_hitter,
    stadium_hr_factor,
  } = game;

  const homeColor = home_colors?.primary ?? "#1e293b";
  const awayColor = away_colors?.primary ?? "#1e293b";

  const isValidImg = (url) =>
    typeof url === "string" &&
    url.startsWith("https://") &&
    url.length > 10;

  return (
    <div
      className="rounded-xl p-4 border border-gray-800"
      style={{
        background: `linear-gradient(135deg, ${awayColor}, ${homeColor})`,
      }}
    >
      {/* TEAMS ROW */}
      <div className="flex justify-between items-center mb-4">
        {/* AWAY TEAM */}
        <div className="flex items-center gap-3">
          {isValidImg(away_logo) ? (
            <Image
              src={away_logo}
              alt={away_team}
              width={40}
              height={40}
              className="rounded-md"
            />
          ) : (
            <div className="w-10 h-10 bg-slate-700 rounded-md" />
          )}

          <div>
            <div className="text-white font-semibold">{away_team}</div>

            {away_featured_hitter?.name && (
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <span>{away_featured_hitter.name}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-700/30 text-emerald-300 font-bold">
                  {away_featured_hitter.score ?? 0}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="text-gray-200 font-bold">at</div>

        {/* HOME TEAM */}
        <div className="flex items-center gap-3">
          {isValidImg(home_logo) ? (
            <Image
              src={home_logo}
              alt={home_team}
              width={40}
              height={40}
              className="rounded-md"
            />
          ) : (
            <div className="w-10 h-10 bg-slate-700 rounded-md" />
          )}

          <div>
            <div className="text-white font-semibold">{home_team}</div>

            {home_featured_hitter?.name && (
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <span>{home_featured_hitter.name}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-700/30 text-emerald-300 font-bold">
                  {home_featured_hitter.score ?? 0}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* GAME TIME + HR FACTOR BADGE */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-200 text-sm">{game_time}</div>

        {stadium_hr_factor && (
          <div className="text-xs font-semibold bg-purple-700/30 text-purple-200 px-2 py-1 rounded">
            HR Factor: {stadium_hr_factor}
          </div>
        )}
      </div>

      {/* PITCHERS */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <p className="font-semibold text-gray-100">Away Pitcher</p>
          <p className="text-gray-200">{away_pitcher}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-100">Home Pitcher</p>
          <p className="text-gray-200">{home_pitcher}</p>
        </div>
      </div>

      {/* FEATURED HITTERS */}
      <div className="grid grid-cols-2 gap-3">
        {away_featured_hitter && (
          <div className="bg-black/40 border border-gray-700 rounded-lg p-2">
            <div className="text-white font-semibold text-sm">
              {away_featured_hitter.name}
            </div>
            <div className="text-gray-300 text-xs">
              AVG {away_featured_hitter.avg ?? "—"} • HR{" "}
              {away_featured_hitter.hr ?? "—"}
            </div>
          </div>
        )}

        {home_featured_hitter && (
          <div className="bg-black/40 border border-gray-700 rounded-lg p-2">
            <div className="text-white font-semibold text-sm">
              {home_featured_hitter.name}
            </div>
            <div className="text-gray-300 text-xs">
              AVG {home_featured_hitter.avg ?? "—"} • HR{" "}
              {home_featured_hitter.hr ?? "—"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
