interface StadiumFactorRowProps {
  parkName: string;
  team: string;
  hrFactor: number;
}

export default function StadiumFactorRow({
  parkName,
  team,
  hrFactor,
}: StadiumFactorRowProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex justify-between items-center hover:bg-gray-800 transition">
      <div>
        <div className="text-white font-semibold">{parkName}</div>
        <div className="text-gray-500 text-xs">{team}</div>
      </div>

      <div className="text-green-400 font-mono">HR Factor: {hrFactor}</div>
    </div>
  );
}
