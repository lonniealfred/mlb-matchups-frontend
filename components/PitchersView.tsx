import PitcherCard from "@/components/PitcherCard";

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

export default function PitchersView({ pitchers }: { pitchers: Pitcher[] }) {
  if (!pitchers || pitchers.length === 0) {
    return (
      <div className="text-gray-400 p-4">
        No pitcher data available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {pitchers.map((p, idx) => (
        <PitcherCard key={idx} pitcher={p} />
      ))}
    </div>
  );
}
