import MatchupCard from "@/components/MatchupCard";

export default function Preview() {
  const demo = {
    home_team: "BOS",
    away_team: "NYY",
    home_record: "10-9",
    away_record: "12-8",
    home_pitcher: "Sale",
    away_pitcher: "Cole",
    home_hitter: "Devers",
    away_hitter: "Judge",
    game_time: "1:05 PM"
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-10">
      <MatchupCard game={demo} />
    </div>
  );
}
