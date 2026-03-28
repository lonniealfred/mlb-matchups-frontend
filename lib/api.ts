// lib/api.ts

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://mlb-matchups-backend.onrender.com";

export async function fetchDashboard() {
  try {
    const res = await fetch(`${API_URL}/dashboard`, {
      method: "GET",
      cache: "no-store", // critical: prevents stale data
      next: { revalidate: 0 }, // Next.js 14: force dynamic fetch
    });

    if (!res.ok) {
      throw new Error(`Backend error: ${res.status}`);
    }

    const data = await res.json();

    // Ensure frontend always receives the correct shape
    return {
      mode: data.mode ?? "demo",
      games: Array.isArray(data.games) ? data.games : [],
      hitters: Array.isArray(data.hitters) ? data.hitters : [],
      trends: Array.isArray(data.trends) ? data.trends : [],
    };
  } catch (err) {
    console.error("fetchDashboard error:", err);

    // Safe fallback for UI stability
    return {
      mode: "demo",
      games: [],
      hitters: [],
      trends: [],
    };
  }
}
