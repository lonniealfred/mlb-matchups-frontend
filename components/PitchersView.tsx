import Image from "next/image";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";

type Pitcher = {
  name: string;
  team: string;
  era?: number;
  whip?: number;
  kbb?: number;
  logo?: string;
  colors?: { primary: string; secondary: string };
};

export default function PitchersView({ pitchers }: { pitchers: Pitcher[] }) {
  if (!pitchers || pitchers.length === 0) {
    return <div className="text-gray-400">No pitcher data available.</div>;
  }

  return (
    <div>
      <SectionHeader title="Pitching Matchups" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pitchers.map((p, idx) => {
          const colors = p.colors || { primary: "#111" };

          return (
            <Card key={idx}>
              <div
                className="rounded-lg p-4 flex items-center gap-4"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, #000)` }}
              >
                {p.logo && (
                  <Image src={p.logo} alt={p.team} width={50} height={50} className="rounded" />
                )}

                <div className="flex-1">
                  <div className="text-white font-semibold text-lg">{p.name}</div>
                  <div className="text-gray-400 text-sm">{p.team}</div>

                  <div className="mt-2 text-xs text-gray-300 space-y-1">
                    <div>ERA: {p.era ?? "—"}</div>
                    <div>WHIP: {p.whip ?? "—"}</div>
                    <div>K/BB: {p.kbb ?? "—"}</div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
