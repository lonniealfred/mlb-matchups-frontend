"use client";

import { useEffect, useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL ||
  "http://localhost:8000";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/dashboard`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        setData(await res.json());
      } catch (err: any) {
        setError(err.message);
      }
    }
    load();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return <div className="text-gray-400">Loading…</div>;

  return (
    <pre className="text-white text-sm">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
