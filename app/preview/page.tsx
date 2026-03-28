"use client";

import MatchupCard from "@/components/MatchupCard";

export default function PreviewPage() {
  const demo = {
    home_team: "Yankees",
    away_team: "Red Sox",

    home_pitcher: {
      name: "Gerrit Cole",
      era: "2.63",
      whip: "1.04",
    },

    away_pitcher: {
      name: "Chris Sale",
      era: "3.12",
      whip: "1.09",
    },

    home_lineup: {
      hitters: [
        { name: "Aaron Judge", avg: ".287", hr: 37 },
        { name: "Juan Soto", avg: ".301", hr: 29 },
      ],
    },

    away_lineup: {
      hitters: [
        { name: "Rafael Devers", avg: ".281", hr: 33 },
        { name: "Triston Casas", avg: ".266", hr: 22 },
      ],
    },

    stadium: "Yankee Stadium",
    stadium_hr_factor: 112,

    weather: {
      temp: 68,
      wind_speed: 7,
      wind_dir: "NW",
      condition: "Clear",
    },

    // ⭐ REQUIRED FIELD (fixes your build)
    start_time: "7:05 PM ET",
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-10">
      <MatchupCard game={demo} />
    </div>
  );
}
