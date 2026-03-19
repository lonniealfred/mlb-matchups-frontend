import Image from "next/image";
import teamData from "@/lib/teamData";

export default function TeamBadge({
  team,
  size = 36
}: {
  team: string;
  size?: number;
}) {
  const data = teamData[team] || {
    primary: "#555",
    secondary: "#999",
    logo: null
  };

  return (
    <div className="flex items-center gap-2">
      {data.logo && (
        <div
          className="rounded-full overflow-hidden flex items-center justify-center"
          style={{
            width: size,
            height: size,
            backgroundColor: data.secondary
          }}
        >
          <Image
            src={data.logo}
            alt={team}
            width={size}
            height={size}
            style={{ objectFit: "contain" }}
          />
        </div>
      )}

      <span
        className="font-semibold tracking-tight"
        style={{ color: data.primary }}
      >
        {team}
      </span>
    </div>
  );
}
