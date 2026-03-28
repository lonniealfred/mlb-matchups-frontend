"use client";

console.log("Matchups file loaded");

import { useEffect, useState } from "react";
import MatchupCard from "@/components/MatchupCard";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL ||
  "http://localhost:8000";

export default function Matchups() {
  console.log("Matchups component rendered");

  const [games, setGames] = useState([]);
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("useEffect starting");

    async function load() {
      try {
        console.log("API_BASE =", API_BASE);
        console.log("Fetching:", `${API_BASE}/dashboard`);

        const res = await fetch(`${API_BASE}/dashboard`, {
          cache: "no-store",
        });

        console.log("Response status:", res.status);

        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data = await res.json();

        console.log("Response JSON:", data);

        setGames(data.games || []);
        setStatus("ok");
      } catch (err) {
        console.error("Fetch error:", err);
        setStatus("error");
        setMessage("Failed to load matchups");
      }
    }

    load();
  }, []);

  if (status === "loading") {
    return (
      <div className="text-center text-gray-400 mt-6">
        Loading today’s matchups…
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center text-red-400 mt-6">
        Error loading matchups.
      </div>
    );
  }

  return (
    <div className="w-full">
      {message && (
        <p className="text-center text-gray-400 text-sm mb-4">{message}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {games.map((game: any) => (
          <MatchupCard key={game.game_id} game={game} />
        ))}
      </div>
    </div>
  );
}
