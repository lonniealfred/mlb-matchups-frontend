import Image from "next/image";
import teamColors from "@/lib/teamColors";
import teamLogos from "@/lib/teamLogos";

export default function HitterBreakdownRow({
  rank,
  name,
  team,
  avg,
  hr,
  rbi,
  score
}: {
  rank: number;
  name: string;
  team: string;
  avg: number;
  hr: number;
  rbi: number;
  score: number;
}) {
  const colors = teamColors[team] || { primary: "#444", secondary: "#666" };
  const logo = teamLogos[team] || null;

  return (
    <div
      className="flex items-center justify-between p-3 rounded-lg border border-gray-800 bg-gray-900"
      style={{ borderLeft: `4px solid ${colors.primary}` }}
    >
      <div className="flex items-center gap-3">
        <div className="text-xl font-bold text-gray-400 w-6 text-right">{rank}</div>

        {logo && (
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
            <Image src={logo} alt={team} width={40} height={40} />
          </div>
        )}

        <div>
          <div className="text-white font-semibold">{name}</div>
          <div className="text-gray-400 text-xs">{team}</div>
        </div>
      </div>

      <div className="text-right">
        <div className="text-green-400 font-mono text-sm">Score: {score}</div>
        <div className="text-gray-400 text-xs">
          AVG {avg.toFixed(3)} · {hr} HR · {rbi} RBI
        </div>
      </div>
    </div>
  );
}
