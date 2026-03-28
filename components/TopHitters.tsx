"use client";

import { useEffect, useState } from "react";
import HitterCard from "@/components/HitterCard";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL ||
  "http://localhost:8000";

export default function TopHitters() {
  const [hitters, setHitters] = useState<any[]>([]);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/top-hitters`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data = await res.json();
        setHitters(data.hitters || []);
        setStatus("ok");
      } catch (err) {
        console.error("TopHitters fetch error:", err);
        setStatus("error");
      }
    }

    load();
  }, []);

  if (status === "loading") {
    return (
      <div className="text-center text-gray-400 mt-6">
        Loading top hitters…
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center text-red-400 mt-6">
        Error loading top hitters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {hitters.map((hitter: any) => (
        <HitterCard key={hitter.player_id} hitter={hitter} />
      ))}
    </div>
  );
}
