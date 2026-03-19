import Image from "next/image";

interface MatchupRowProps {
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  homeRecord?: string;
  awayRecord?: string;
  homePitcher?: string;
  awayPitcher?: string;
  homeHitter?: string;
  awayHitter?: string;
  gameTime?: string;
}

export default function MatchupRow({
  homeTeam,
  awayTeam,
  homeLogo,
  awayLogo,
  homeRecord,
  awayRecord,
  homePitcher,
  awayPitcher,
  homeHitter,
  awayHitter,
  gameTime,
}: MatchupRowProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-2 hover:bg-gray-800 transition">
      {/* Top Row: Logos + Teams */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src={awayLogo} alt={awayTeam} width={32} height={32} />
          <div className="text-white font-semibold">
            {awayTeam} {awayRecord && <span className="text-gray-400 text-sm">{awayRecord}</span>}
          </div>
        </div>

        <div className="text-gray-400 text-sm">vs</div>

        <div className="flex items-center gap-3">
          <div className="text-white font-semibold">
            {homeTeam} {homeRecord && <span className="text-gray-400 text-sm">{homeRecord}</span>}
          </div>
          <Image src={homeLogo} alt={homeTeam} width={32} height={32} />
        </div>
      </div>

      {/* Pitchers */}
      <div className="text-gray-300 text-sm">
        {awayPitcher} vs {homePitcher}
      </div>

      {/* Featured Hitters */}
      <div className="text-gray-400 text-xs">
        {awayHitter} · {homeHitter}
      </div>

      {/* Game Time */}
      <div className="text-gray-500 text-xs">{gameTime}</div>
    </div>
  );
}
