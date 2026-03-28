"use client";

export default function PitchingMatchupsCard({ games }) {
  // Defensive fallback — ensures no crashes if backend hiccups
  const items = Array.isArray(games) ? games : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((g, i) => (
        <div
          key={i}
          className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex justify-between items-center"
        >
          {/* LEFT — Home Pitcher */}
          <div>
            <div className="text-white font-semibold">{g.home_pitcher}</div>
            <div className="text-gray-400 text-sm">{g.home_team}</div>
          </div>

          {/* VS Divider */}
          <div className="text-gray-500 font-bold text-sm mx-4">vs</div>

          {/* RIGHT — Away Pitcher */}
          <div className="text-right">
            <div className="text-white font-semibold">{g.away_pitcher}</div>
            <div className="text-gray-400 text-sm">{g.away_team}</div>
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <div className="text-gray-400 text-sm">
          No pitching matchup data available.
        </div>
      )}
    </div>
  );
}
