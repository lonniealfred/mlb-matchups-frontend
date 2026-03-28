"use client";

export default function StadiumFactorsCard({ trends }) {
  return (
    <div className="space-y-4">
      {trends.map((t, i) => {
        const factor = t.value;
        const pct = Math.min(factor / 1.5, 1) * 100;

        const color =
          factor > 1.15 ? "bg-green-500" :
          factor >= 1.0 ? "bg-yellow-500" :
          "bg-red-500";

        return (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="text-white font-semibold">{t.label}</div>
            <div className="text-gray-400 text-sm mb-2">HR Factor: {factor}</div>

            <div className="w-full h-2 bg-gray-700 rounded">
              <div
                className={`h-2 rounded ${color}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
