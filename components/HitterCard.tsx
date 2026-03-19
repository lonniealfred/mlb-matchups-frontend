import Image from "next/image";
import teamLogos from "@/data/teamLogos";
import playerPhotos from "@/data/playerPhotos";
import teamColors from "@/data/teamColors";

interface HitterCardProps {
  hitter: {
    name: string;
    avg: number;
    hr: number;
    rbi: number;
    hitter_score: number;
  };
  team: string;
  rank?: number;
}

export default function HitterCard({ hitter, team, rank }: HitterCardProps) {
  if (!hitter || !hitter.name) return null;

  const photo = playerPhotos[hitter.name] || playerPhotos.default;
  const logo = teamLogos[team] || "/logos/default.png";
  const color = teamColors[team] || "#555";

  const scoreColor =
    hitter.hitter_score >= 90
      ? "bg-green-700"
      : hitter.hitter_score >= 80
      ? "bg-green-600"
      : "bg-green-500";

  return (
    <div
      className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl p-4
                 hover:bg-gray-850 hover:border-gray-700 hover:shadow-lg transition-all duration-150"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      {/* Left side */}
      <div className="flex items-center gap-4">
        {rank !== undefined && (
          <div className="text-gray-500 font-bold w-6 text-right">{rank}</div>
        )}

        <Image
          src={photo}
          alt={hitter.name}
          width={48}
          height={48}
          className="rounded-full border border-gray-700 object-cover"
        />

        <div>
          <div className="text-white font-semibold">{hitter.name}</div>

          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            ></span>

            <Image
              src={logo}
              alt={team}
              width={20}
              height={20}
              className="rounded-sm"
            />

            <span>{team}</span>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="grid grid-cols-4 text-center w-[260px] text-sm">
        <div>
          <div className="font-mono text-gray-300">{hitter.avg.toFixed(3)}</div>
          <div className="text-gray-500 text-xs">AVG</div>
        </div>

        <div>
          <div className="font-mono text-gray-300">{hitter.hr}</div>
          <div className="text-gray-500 text-xs">HR</div>
        </div>

        <div>
          <div className="font-mono text-gray-300">{hitter.rbi}</div>
          <div className="text-gray-500 text-xs">RBI</div>
        </div>

        <div>
          <span
            className={`${scoreColor} text-white px-3 py-1 rounded-lg font-bold`}
          >
            {hitter.hitter_score}
          </span>
        </div>
      </div>
    </div>
  );
}
