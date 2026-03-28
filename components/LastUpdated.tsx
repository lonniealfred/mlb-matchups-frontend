"use client";

import { useEffect, useState } from "react";

interface LastUpdatedProps {
  mode?: string; // optional now
}

export default function LastUpdated({ mode = "dark" }: LastUpdatedProps) {
  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    // Generate timestamp client-side to avoid hydration mismatch
    const now = new Date();
    const formatted = now.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    setTimestamp(formatted);
  }, []);

  return (
    <div className="text-xs text-gray-400">
      <span className="font-semibold text-gray-300">Last Updated:</span>{" "}
      {timestamp || "—"}
    </div>
  );
}
