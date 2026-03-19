import Image from "next/image";
import teamData from "@/lib/teamData";

export default function PitchingMatchupRow({
  homeTeam,
  awayTeam,
  homePitcher,
  awayPitcher,
  homeEra,
  awayEra,
  homeWhip,
  awayWhip,
  homeScore,
  awayScore
}: any) {
  const home = teamData[homeTeam] || { primary: "#555", logo: null };
  const away = teamData[awayTeam] || { primary: "#555", logo: null };

  return (
    <div className="p-3 rounded-lg border border-gray-800 bg-gray-900 flex justify-between items-center">
      {/* Away */}
      <div className="flex items-center gap-3">
        {away.logo && (
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
            <Image src={away.logo} alt={awayTeam} width={40} height={40} />
          </div>
        )}
        <div>
          <div className="text-white font-semibold">{awayPitcher}</div>
          <div className="text-gray-400 text-xs">{awayTeam}</div>
          <div className="text-gray-500 text-xs">
            ERA {awayEra} · WHIP {awayWhip}
          </div>
        </div>
      </div>

      {/* Score */}
      <div className="text-center">
        <div className="text-green-400 font-mono">{awayScore} – {homeScore}</div>
      </div>

      {/* Home */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-white font-semibold">{homePitcher}</div>
          <div className="text-gray-400 text-xs">{homeTeam}</div>
          <div className="text-gray-500 text-xs">
            ERA {homeEra} · WHIP {homeWhip}
          </div>
        </div>
        {home.logo && (
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
            <Image src={home.logo} alt={homeTeam} width={40} height={40} />
          </div>
        )}
      </div>
    </div>
  );
}
