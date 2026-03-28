// pitchingTiers.ts
// Maps pitcher total score → tier label + color styling

export type PitcherTier = {
  label: string;
  color: string;       // Tailwind text color
  bg: string;          // Tailwind background color
};

export function getPitcherTier(score: number): PitcherTier {
  if (score >= 12) {
    return {
      label: "Elite",
      color: "text-green-400",
      bg: "bg-green-900/40",
    };
  }

  if (score >= 8) {
    return {
      label: "Strong",
      color: "text-blue-400",
      bg: "bg-blue-900/40",
    };
  }

  if (score >= 4) {
    return {
      label: "Average",
      color: "text-yellow-400",
      bg: "bg-yellow-900/40",
    };
  }

  if (score >= 1) {
    return {
      label: "Weak",
      color: "text-orange-400",
      bg: "bg-orange-900/40",
    };
  }

  return {
    label: "Vulnerable",
    color: "text-red-400",
    bg: "bg-red-900/40",
  };
}
