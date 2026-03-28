"use client";

import Image from "next/image";
import teamLogos from "@/data/teamLogos";
import { playerPhotos } from "@/data/playerPhotos";
import teamColors from "@/data/teamColors";

interface HitterCardProps {
  hitter: any;
}

export default function HitterCard({ hitter }: HitterCardProps) {
  const photo =
    playerPhotos[hitter.name] || playerPhotos["default"] || "/players/default.png";

  const logo = teamLogos[hitter.team] || "/teams/default.png";
  const color = teamColors[hitter.team] || "#444";

  return (
    <div
      className="p-4 rounded-lg border border-gray-800 bg-[#111] flex items-center space-x-4"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      {/* Player Photo */}
      <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-700">
        <Image src={photo} alt={hitter.name} fill sizes="64px" />
      </div>

      <div className="flex-1">
        {/* Name + Team */}
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-bold text-white">{hitter.name}</h2>
          <Image
            src={logo}
            alt={hitter.team}
            width={24}
            height={24}
            className="rounded-sm"
          />
        </div>

        {/* Stats */}
        <div className="text-gray-300 text-sm mt-1">
          <p>AVG: {hitter.avg}</p>
          <p>OBP: {hitter.obp}</p>
          <p>SLG: {hitter.slg}</p>
          <p>OPS: {hitter.ops}</p>
        </div>
      </div>
    </div>
  );
}
