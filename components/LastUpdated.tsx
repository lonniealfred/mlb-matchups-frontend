"use client";

import { useEffect, useState } from "react";

export default function LastUpdated({ mode }) {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    // Generate timestamp on the client to avoid hydration mismatch
    const formatted = new Date().toLocaleString(undefined, {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    });
    setTimestamp(formatted);
  }, []);

  const badgeColor =
    mode === "live"
      ? "bg-green-600 text-white"
      : mode === "demo"
      ? "bg-yellow-500 text-black"
      : "bg-gray-600 text-white";

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
      {/* Timestamp */}
      <div className="text-gray-300 text-sm">
        Last Updated:{" "}
        <span className="text-white font-medium">{timestamp}</span>
      </div>

      {/* Mode Badge */}
      <div
        className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide ${badgeColor}`}
      >
        {mode}
      </div>
    </div>
  );
}
