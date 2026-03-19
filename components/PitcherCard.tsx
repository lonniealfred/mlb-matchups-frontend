import Image from "next/image";
import teamData from "@/lib/teamData";

type Pitcher = {
  name: string;
  team: string;
  era?: number;
  whip?: number;
  pitcher_score?: number;
  k9?: number;
  bb9?: number;
  hr9?: number;
};

export default function PitcherCard({ pitcher }: { pitcher: Pitcher }) {
  const team = teamData[pitcher.team] || {};

  // Safe fallbacks for undefined values
  const score = pitcher.pitcher_score ?? 0;
  const era = pitcher.era ?? 0;
  const whip = pitcher.whip ?? 0;
  const k9 = pitcher.k9 ?? 0;
  const bb9 = pitcher.bb9 ?? 0;
  const hr9 = pitcher.hr9 ?? 0;

  // Color tiering based on score
  const scoreColor =
    score >= 90
      ? "bg-blue-700"
      : score >= 80
      ? "bg-blue-600"
      : score >= 70
      ? "bg-blue-500"
      : "bg-blue-400";

  return (
    <div
      className="
        bg-gray-900 border border-gray-800 rounded-xl p-4 
        flex flex-col gap-2 hover:bg-gray-800 transition-all
      "
      style={{ borderLeft: `4px solid ${team.primary || "#666"}` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-white font-semibold text-lg">{pitcher.name}</div>
        <div
          className={`text-white text-xs px-2 py-1 rounded ${scoreColor}`}
        >
          {score}
        </div>
      </div>

      {/* Team */}
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        {team.logo && (
          <Image
            src={team.logo}
            alt={pitcher.team}
            width={28}
            height={28}
            className="rounded-full"
          />
        )}
        <span>{pitcher.team}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 text-center text-xs text-gray-300 mt-2">
        <div>
          <div className="font-semibold text-white">{era.toFixed(2)}</div>
          <div className="text-gray-500">ERA</div>
        </div>
        <div>
          <div className="font-semibold text-white">{whip.toFixed(2)}</div>
          <div className="text-gray-500">WHIP</div>
        </div>
        <div>
          <div className="font-semibold text-white">{k9.toFixed(1)}</div>
          <div className="text-gray-500">K/9</div>
        </div>
      </div>

      <div className="grid grid-cols-2 text-center text-xs text-gray-300 mt-2">
        <div>
          <div className="font-semibold text-white">{bb9.toFixed(1)}</div>
          <div className="text-gray-500">BB/9</div>
        </div>
        <div>
          <div className="font-semibold text-white">{hr9.toFixed(1)}</div>
          <div className="text-gray-500">HR/9</div>
        </div>
      </div>
    </div>
  );
}
