"use client";

import Image from "next/image";

export default function PitchersList({ pitchers }) {
  return (
    <div className="space-y-3">
      {pitchers.map((p, i) => (
        <div
          key={i}
          className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            {p.logo ? (
              <Image
                src={p.logo}
                alt={p.team}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-700" />
            )}

            <div>
              <div className="text-white font-semibold">{p.name}</div>
              <div className="text-gray-400 text-sm">{p.team}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 text-right">
            <div>
              <div className="text-gray-400 text-xs">ERA</div>
              <div className="text-white font-semibold">{p.era}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">WHIP</div>
              <div className="text-white font-semibold">{p.whip}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">Score</div>
              <div className="text-white font-semibold">{p.score || "--"}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
